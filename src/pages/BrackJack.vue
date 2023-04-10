<script setup lang="ts">
import Deck from "../models/Deck.ts";
import { onMounted, reactive, ref, computed } from "vue";
import { imageUrl } from "../utils/index.ts";
import { mdiInformation } from "@mdi/js";
const CONST_SCENE = {
  BETTING: "betting", // ベット
  ACTIONS: "actions", // 各アクションの実施
  RESULT: "result", // 最終結果
};

const CONST_ACTION = {
  SURRENDER: "surrender",
  STAND: "stand",
  HIT: "hit",
  DOUBLE: "double",
};

const RESULT_ALERT_VALUES = {
  WIN: {
    title: "YOU WIN!!",
    text: "point up",
  },
  LOSE: {
    title: "YOU LOSE",
    text: "BAD LUCK..........",
  },
  DRAW: {
    title: "DRAW",
    text: "Good luck next time",
  },
};

type SceneType = "betting" | "actions" | "result";
type ActionType = "surrender" | "stand" | "hit" | "double";
type ResultType = "win" | "lose" | "draw";

let scene = ref<SceneType>(CONST_SCENE.BETTING);
let playerPoint = ref<number>(1000); // 初期値 ローカルセッションで保持する
const bettingPoint = ref(0);
const dealerHands = reactive([]);
const playerHands = reactive([]);
let resultDialog = reactive({
  display: false,
  title: "",
  text: "",
});
const displayHelpActions = ref(false);

onMounted(() => {
  const deck = new Deck();
  console.log({ deck });
  dealerHands.push(...[deck.pick(), deck.pick()]);
  playerHands.push(...[deck.pick(), deck.pick()]);
});

const confirmBettingPoint = () => {
  console.log({ bettingPoint }, bettingPoint.value);
  if (bettingPoint.value <= 0) {
    console.log("ポイントが入力されていません");
    return;
  } else if (bettingPoint.value > playerPoint.value) {
    console.log(
      "所持ポイントよりも入力ポイントの方が多いです。所持ポイントを上回らないようにしてください"
    );
    return;
  }
  scene.value = CONST_SCENE.ACTIONS;
};

const actions = (actions: ActionType) => {
  console.log({ actions });
};

const calculateHandTotal = (hands: Hand[]) => {
  return hands.reduce((prev, cur) => {
    const rank = Number(cur.rank);
    const score = rank > 10 ? 10 : rank;
    return prev + score;
  }, 0);
};

const judge = async () => {
  const [dealerScore, playerScore] = await Promise.all(
    [dealerHands, playerHands].map((hands) => calculateHandTotal(hands))
  );
  if (playerScore > 21) {
    resultDialog = {
      title: RESULT_ALERT_VALUES.LOSE.title,
      text: RESULT_ALERT_VALUES.LOSE.text,
      display: true,
    };
  } else if (dealerScore > 21) {
    resultDialog = {
      title: RESULT_ALERT_VALUES.WIN.title,
      text: RESULT_ALERT_VALUES.WIN.text,
      display: true,
    };
  } else if (dealerScore === playerScore) {
    resultDialog = {
      title: RESULT_ALERT_VALUES.DRAW.title,
      text: RESULT_ALERT_VALUES.DRAW.text,
      display: true,
    };
  } else if (dealerScore > playerScore) {
    resultDialog = {
      title: RESULT_ALERT_VALUES.LOSE.title,
      text: RESULT_ALERT_VALUES.LOSE.text,
      display: true,
    };
  } else {
    resultDialog = {
      title: RESULT_ALERT_VALUES.WIN.title,
      text: RESULT_ALERT_VALUES.WIN.text,
      display: true,
    };
  }
  scene.value = CONST_SCENE.RESULT;
};

const close = () => {
  resultDialog.display = false;
  scene.value = CONST_SCENE.BETTING;
};
</script>

<template>
  <div class="h-screen w-screen bg-green-800 flex justify-center flex-col">
    <div v-if="scene === CONST_SCENE.BETTING" class="text-center">
      <h2 class="text-white font-bold text-4xl mb-16">Betting</h2>
      <div class="text-white font-bold mb-4 text-center">
        現在の所持Pt: {{ playerPoint }}
      </div>
      <div class="flex justify-center mb-8">
        <input
          v-model="bettingPoint"
          class="bg-white text-right h-7"
          type="number"
          min="1"
          :max="playerPoint"
        />
        <v-btn
          @click="confirmBettingPoint"
          :disabled="bettingPoint <= 0"
          class="ml-4 bg-blue"
          size="small"
        >
          確定
        </v-btn>
      </div>
      <span class="text-white font-bold">掛け金を入力してください。</span>
    </div>
    <div
      class="w-3/5 max-w-3/5 w-auto text-center mb-16"
      v-if="[CONST_SCENE.ACTIONS, CONST_SCENE.RESULT].includes(scene)"
    >
      <h2 class="text-white font-bold text-4xl mb-8">Dealer</h2>
      <div class="w-auto h-auto">
        <template v-for="card in dealerHands" :key="card.imageId">
          <v-img
            class="font-bold inline-block mr-8"
            height="180"
            width="120"
            :src="imageUrl(card.imageId)"
            cover
          />
        </template>
      </div>
    </div>
    <div
      class="max-w-3/5 w-auto w-3/5 text-center"
      v-if="[CONST_SCENE.ACTIONS, CONST_SCENE.RESULT].includes(scene)"
    >
      <h2 class="text-white font-bold text-4xl mb-4">Player</h2>
      <div class="w-auto h-auto mb-8">
        <template v-for="card in playerHands" :key="card.imageId">
          <v-img
            class="font-bold inline-block mr-8"
            height="180"
            width="120"
            :src="imageUrl(card.imageId)"
            cover
          />
        </template>
      </div>
      <div v-if="[CONST_SCENE.ACTIONS, CONST_SCENE.RESULT].includes(scene)">
        <v-btn @click="actions(CONST_ACTION.SURRENDER)" class="mr-8 bg-red">
          surrender
        </v-btn>
        <v-btn @click="judge()" class="mr-8 bg-yellow">stand</v-btn>
        <v-btn @click="actions(CONST_ACTION.HIT)" class="mr-8 bg-green">
          hit
        </v-btn>
        <v-btn @click="actions(CONST_ACTION.DOUBLE)" class="mr-8 bg-blue">
          double
        </v-btn>
        <v-dialog v-model="displayHelpActions" width="auto">
          <template v-slot:activator="{ props }">
            <v-icon
              :icon="mdiInformation"
              v-bind="props"
              size="large"
              color="white"
            ></v-icon>
          </template>
          <v-card max-width="800px">
            <v-card-title class="font-bold">アクションの説明</v-card-title>
            <v-card-text class="leading-3">
              <div class="mb-4">surrender：最初に配られた 2枚のカードの時点で、プレイヤーが自ら負けを認めること。サレンダーした場合には、ゲームに賭けた金額の半分が戻ってきます。<br></div>
              <div class="mb-4">stang：カードの追加をストップし、現在のハンド（手元にあるカード）で勝負をすること。<br></div>
              <div class="mb-4">hit：手札に更に 1 枚のカードを追加すること。手札の合計が 21を超えてしまうことをバスト（bust）と呼び、直ちにプレイヤーの負けとなってしまうので注意が必要です。<br></div>
              <div class="mb-4">double：ベットを 2 倍にして、もう 1枚だけカードを引くことができます。このアクションは最初に 2枚カードが配られた後しか行うことはできません。</div>
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
  <v-dialog :model-value="resultDialog.display" persistent width="auto">
    <v-card>
      <v-card-title>{{ resultDialog.title }}</v-card-title>
      <v-card-text>
        {{ resultDialog.text }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="close()"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
