<script setup lang="ts">
import Deck from "../models/Deck";
import { onMounted, reactive, ref, computed } from "vue";
import { imageUrl } from "../utils/index";
import { mdiInformation } from "@mdi/js";
import Card from "../models/Card";
import { useStore } from "vuex";

const CONST_ACTION = {
  SURRENDER: "surrender",
  STAND: "stand",
  HIT: "hit",
  DOUBLE: "double",
};

const RESULT_ALERT_PROPS = {
  WIN: {
    title: "YOU WIN!!",
    text: "point up",
    message: "おめでとうございます！！",
  },
  LOSE: {
    title: "YOU LOSE",
    text: "BAD LUCK..........",
    message: "残念でした！！！",
  },
  DRAW: {
    title: "DRAW",
    text: "Good luck next time",
    message: "引き分け！！もっと攻めよう！！",
  },
};

type SceneType = "betting" | "actions" | "result";
type ActionType = "surrender" | "stand" | "hit" | "double";
type ResultType = "win" | "lose" | "draw";

const store = useStore();

let scene = ref<SceneType>("betting");
let playerPoint = ref<number>(0); // 初期値 ローカルセッションで保持する
const bettingPoint = ref(0);
let isDoublePoint = ref<boolean>(false);
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
  title: "",
  text: "",
  message: "",
});
const displayHelpActions = ref(false);

onMounted(() => {
  const gamePoint = sessionStorage.getItem("game-point") ?? 0;
  store.commit("setGamePoint", gamePoint);
  playerPoint.value = store.getters.getGamePoint;
  init();
});

const init = () => {
  dealerHands.splice(0);
  playerHands.splice(0);
  dealerHands.push(...[deck.pick(), deck.pick()]);
  playerHands.push(...[deck.pick(), deck.pick()]);
};

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
  scene.value = "actions";
};

const hit = () => {
  const newCard = deck.pick();
  playerHands.push(newCard);
};

const double = () => {
  hit(); // 一旦一枚引くようにする
  isDoublePoint = true;
};

const calculateHandTotal = (hands: Card[]) => {
  return hands.reduce((prev, cur) => {
    const rank = cur.getRankNumber();
    const score = rank > 10 ? 10 : rank; // 11以上は10に揃える
    return prev + score;
  }, 0);
};

const judge = async () => {
  const [dealerScore, playerScore] = await Promise.all(
    [dealerHands, playerHands].map((hands) =>
      calculateHandTotal(hands as Card[])
    )
  );
  let resultAlertProps = null;
  let resultValue: "WIN" | "LOSE" | "DRAW" = "WIN"; // 一旦初期値WIN
  if (playerScore > 21) {
    resultAlertProps = RESULT_ALERT_PROPS.LOSE;
    resultValue = "LOSE";
  } else if (dealerScore > 21) {
    resultAlertProps = RESULT_ALERT_PROPS.WIN;
    resultValue = "WIN";
  } else if (dealerScore === playerScore) {
    resultAlertProps = RESULT_ALERT_PROPS.DRAW;
    resultValue = "DRAW";
  } else if (dealerScore > playerScore) {
    resultAlertProps = RESULT_ALERT_PROPS.LOSE;
    resultValue = "LOSE";
  } else {
    resultAlertProps = RESULT_ALERT_PROPS.WIN;
    resultValue = "WIN";
  }

  if (resultValue === "LOSE") {
    playerPoint.value -= bettingPoint.value * (isDoublePoint ? 2 : 1)
  } else if (resultValue === "WIN") {
		playerPoint.value += bettingPoint.value * (isDoublePoint ? 2 : 1)
	}

  resultDialog = {
    ...resultAlertProps,
    display: true,
  };
  scene.value = "result";
};

const close = () => {
  resultDialog.display = false;
  scene.value = "betting";
  init();
};

const surrender = () => {
  resultDialog = {
    display: true,
    title: "降伏",
    text: "あなたは負けを認めました。",
  };
  scene.value = "result";
  playerPoint.value -= bettingPoint.value;
};
</script>

<template>
  <div class="h-screen w-screen bg-green-800 flex justify-center flex-col">
    <div v-if="scene === 'betting'" class="text-center">
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
      v-if="['actions', 'result'].includes(scene)"
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
      v-if="['actions', 'result'].includes(scene)"
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
      <div v-if="['actions', 'result'].includes(scene)">
        <v-btn @click="surrender()" class="mr-8 bg-red"> surrender </v-btn>
        <v-btn @click="judge()" class="mr-8 bg-yellow">stand</v-btn>
        <v-btn @click="hit()" class="mr-8 bg-green"> hit </v-btn>
        <v-btn @click="double()" class="mr-8 bg-blue"> double </v-btn>
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
  <v-dialog :model-value="resultDialog.display" persistent width="auto">
    <v-card>
      <v-card-title>{{ resultDialog.title }}</v-card-title>
      <v-card-text>
        {{ resultDialog.text }}
      </v-card-text>
      <v-card-text>
        {{ resultDialog.message }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="close()"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
