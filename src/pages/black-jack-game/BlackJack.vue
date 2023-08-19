<script setup lang="ts">
import Deck from '../../models/Deck';
import { onMounted, reactive, ref, computed } from 'vue';
import { mdiInformation } from '@mdi/js';
import Card from '../../models/Card';
import { useStore } from 'vuex';
import PlayerHandCard from '../../components/PlayerHandCard.vue';
import { saveBlackJackHistory } from '../../services/BlackJackHistoryService';
import BasicDialog from '../../components/BasicDialog.vue';
import { useDialog } from '../../composable/dialog';
import PointBetting from './PointBetting.vue';

const RESULT_ALERT_PROPS = {
  WIN: {
    title: 'YOU WIN!!',
    text: 'point up',
    message: 'おめでとうございます！！',
  },
  LOSE: {
    title: 'YOU LOSE',
    text: 'BAD LUCK..........',
    message: '残念でした！！！',
  },
  DRAW: {
    title: 'DRAW',
    text: 'Good luck next time',
    message: '引き分け！！もっと攻めよう！！',
  },
};

type SceneType = 'loading' | 'betting' | 'actions' | 'result';
// type ActionType = 'surrender' | 'stand' | 'hit' | 'double';
// type ResultType = 'win' | 'lose' | 'draw';

const store = useStore();

const scene = ref<SceneType>('loading');
const playerPoint = ref<number>(0);
const bettingPoint = ref<number>(0);
const dealerHands = reactive<Card[]>([]);
const playerHands = reactive<Card[]>([]);
const deck = reactive<Deck>(new Deck());
let resultDialog = reactive<{
  display: boolean;
  title: string;
  text: string;
  message?: string;
}>({
  display: false,
  title: '',
  text: '',
  message: '',
});

const displayHelpActions = ref(false);
const isPlayerOneTurnEnd = ref(false);
const isDouble = ref(false);

onMounted(() => {
  init();
});

const dealerHandsProps = computed({
  get: () => dealerHands as Card[],
  set: (cards) => dealerHands.push(...cards),
});
const playerHandsProps = computed({
  get: () => playerHands as Card[],
  set: (cards) => playerHands.push(...cards),
});

const init = () => {
  store.dispatch('initializeGamePoint');
  playerPoint.value = store.getters.getGamePoint;
  isPlayerOneTurnEnd.value = false;
  bettingPoint.value = 0;
  dealerHands.splice(0);
  playerHands.splice(0);
  dealerHands.push(deck.pick(), deck.pick());
  playerHands.push(deck.pick(), deck.pick());
  scene.value = 'betting';
};

const confirmBettingPoint = (inputValue: number) => {
  bettingPoint.value = inputValue;
  scene.value = 'actions';
};

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

const hit = async () => {
  const newCard = deck.pick();
  playerHands.push(newCard);

  // プレイヤーの手札が21以上であればゲーム終了
  if (calculateHandTotal(playerHands as Card[]) > 21) {
    judge();
  }

  if (!isPlayerOneTurnEnd.value) {
    isPlayerOneTurnEnd.value = true;
    // ディーラーの手札が17以上になるように手札を引き続ける
    const recursionDealerHands = async () => {
      if (calculateHandTotal(dealerHands as Card[]) >= 17) {
        return;
      }
      dealerHands.push(deck.pick());
      await sleep(500);
      recursionDealerHands();
      return;
    };
    await recursionDealerHands();

    // ディーラーが21以上であればゲーム終了
    if (calculateHandTotal(dealerHands as Card[]) > 21) {
      judge();
    }
  }
};

const double = () => {
  isDouble.value = true;
  hit();
};

const calculateHandTotal = (hands: Card[]) => {
  return hands.reduce((prev, cur) => {
    const rank = cur.getRankNumber();
    const score = rank > 10 ? 10 : rank; // 11以上は10に揃える
    return prev + score;
  }, 0);
};

const judge = async () => {
  isPlayerOneTurnEnd.value = true;
  const [dealerScore, playerScore] = await Promise.all(
    [dealerHands, playerHands].map((hands) =>
      calculateHandTotal(hands as Card[])
    )
  );
  let resultAlertProps = null;
  let resultValue: 'WIN' | 'LOSE' | 'DRAW' = 'DRAW';
  if (playerScore > 21) {
    resultAlertProps = RESULT_ALERT_PROPS.LOSE;
    resultValue = 'LOSE';
  } else if (dealerScore > 21) {
    resultAlertProps = RESULT_ALERT_PROPS.WIN;
    resultValue = 'WIN';
  } else if (dealerScore === playerScore) {
    resultAlertProps = RESULT_ALERT_PROPS.DRAW;
    resultValue = 'DRAW';
  } else if (dealerScore > playerScore) {
    resultAlertProps = RESULT_ALERT_PROPS.LOSE;
    resultValue = 'LOSE';
  } else {
    resultAlertProps = RESULT_ALERT_PROPS.WIN;
    resultValue = 'WIN';
  }

  if (isDouble.value) {
    bettingPoint.value *= 2;
  }

  if (
    resultValue !== 'DRAW' &&
    (calculateHandTotal(dealerHands as Card[]) === 21 ||
      calculateHandTotal(playerHands as Card[]) === 21)
  ) {
    bettingPoint.value *= 2;
  }

  let differenceValue = 0;
  if (resultValue === 'LOSE') {
    differenceValue = -bettingPoint.value;
  } else if (resultValue === 'WIN') {
    differenceValue = Math.floor(bettingPoint.value * 1.5) - bettingPoint.value;
  }
  playerPoint.value += differenceValue;
  store.dispatch('setGamePointFromSessionAndStore', playerPoint.value);

  resultDialog = {
    ...resultAlertProps,
    display: true,
  };
  scene.value = 'result';

  saveBlackJackHistory(
    resultValue,
    playerHands as Card[],
    dealerHands as Card[],
    differenceValue
  );
};

const close = () => {
  resultDialog.display = false;
  scene.value = 'betting';
  store.dispatch('setGamePointFromSessionAndStore', playerPoint.value);
  init();
};

const surrender = () => {
  resultDialog = {
    display: true,
    title: '降伏',
    text: 'あなたは負けを認めました。',
  };
  scene.value = 'result';
  playerPoint.value -= bettingPoint.value;
  saveBlackJackHistory(
    'LOSE',
    playerHands as Card[],
    dealerHands as Card[],
    -bettingPoint.value
  );
};
</script>

<template>
  <div
    class="h-screen w-screen bg-green-800 flex justify-between flex-col p-12"
  >
    <!-- Bettingページ -->
    <PointBetting
      v-if="scene === 'betting'"
      @confirm-betting-point="confirmBettingPoint"
    />
    <!-- ディーラーの手札 -->
    <div
      v-if="['actions', 'result'].includes(scene)"
      class="w-3/5 max-w-3/5 w-auto text-center"
    >
      <PlayerHandCard
        :player-hands="dealerHandsProps"
        player-name="Dealer"
        :is-card-front="!isPlayerOneTurnEnd"
      />
    </div>
    <div
      v-if="['actions', 'result'].includes(scene)"
      class="max-w-3/5 w-auto w-3/5 text-center"
    >
      <PlayerHandCard
        :player-hands="playerHandsProps"
        player-name="Me"
        :player-point="playerPoint"
        :is-card-front="false"
      />
      <div v-if="['actions', 'result'].includes(scene)">
        <v-btn class="mr-8 bg-red" @click="surrender()"> surrender </v-btn>
        <v-btn class="mr-8 bg-yellow" @click="judge()"> stand </v-btn>
        <v-btn class="mr-8 bg-green" @click="hit()"> hit </v-btn>
        <v-btn class="mr-8 bg-blue" @click="double()"> double </v-btn>
        <v-dialog v-model="displayHelpActions" width="auto">
          <template #activator="{ props }">
            <v-icon
              :icon="mdiInformation"
              v-bind="props"
              size="large"
              color="white"
            />
          </template>
          <v-card max-width="800px">
            <v-card-title class="font-bold"> アクションの説明 </v-card-title>
            <v-card-text class="leading-3">
              <div class="mb-4">
                surrender：最初に配られた
                2枚のカードの時点で、プレイヤーが自ら負けを認めること。サレンダーした場合には、ゲームに賭けた金額の半分が戻ってきます。<br />
              </div>
              <div class="mb-4">
                stang：カードの追加をストップし、現在のハンド（手元にあるカード）で勝負をすること。<br />
              </div>
              <div class="mb-4">
                hit：手札に更に 1 枚のカードを追加すること。手札の合計が
                21を超えてしまうことをバスト（bust）と呼び、直ちにプレイヤーの負けとなってしまうので注意が必要です。<br />
              </div>
              <div class="mb-4">
                double：ベットを 2 倍にして、もう
                1枚だけカードを引くことができます。このアクションは最初に
                2枚カードが配られた後しか行うことはできません。
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block @click="displayHelpActions = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
  <!-- 勝敗の結果ダイアログ -->
  <BasicDialog
    :is-show="resultDialog.display"
    :title="resultDialog.title"
    :main-message="resultDialog.text"
    :sub-message="resultDialog.message"
    @close="close()"
  />
</template>
