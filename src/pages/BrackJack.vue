<script setup lang="ts">
import Deck from "../models/Deck.ts";
import { onMounted, reactive, ref } from "vue";
import { imageUrl } from "../utils/index.ts";
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

type SceneType = "betting" | "actions" | "result";
type ActionType = "surrender" | "stand" | "hit" | "double";
let scene = ref<SceneType>(CONST_SCENE.BETTING);
let playerPoint = ref<number>(1000); // 初期値 ローカルセッションで保持する
const bettingPoint = ref(0);
const dealerHands = reactive([]);
const playerHands = reactive([]);

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
  const result = playerScore > dealerScore;
  console.log({ result, playerScore, dealerScore });
};
</script>

<template>
  <div class="h-screen w-screen bg-green-800 flex justify-center flex-col">
    <div class="w-3/5 max-w-3/5 w-auto text-center mb-16">
      <h2 class="text-white font-bold text-4xl mb-8">Dealer</h2>
      <div v-if="scene === CONST_SCENE.ACTIONS" class="w-auto h-auto">
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
    <div class="max-w-3/5 w-auto w-3/5 text-center">
      <h2 class="text-white font-bold text-4xl mb-4">Player</h2>
      <div v-if="scene === CONST_SCENE.BETTING">
        <div class="text-white font-bold mb-4">
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
            >確定</v-btn
          >
        </div>
        <span class="text-white font-bold"
          >掛け金を入力してください。<br />1ptから10000ptまでかけることができます.</span
        >
      </div>
      <div v-if="scene === CONST_SCENE.ACTIONS" class="w-auto h-auto mb-8">
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
      <div v-if="scene === CONST_SCENE.ACTIONS">
        <v-btn @click="actions(CONST_ACTION.SURRENDER)" class="mr-4 bg-red"
          >サレンダー</v-btn
        >
        <v-btn @click="judge()" class="mr-4 bg-yellow">スタンド</v-btn>
        <v-btn @click="actions(CONST_ACTION.HIT)" class="mr-4 bg-green"
          >ヒット</v-btn
        >
        <v-btn @click="actions(CONST_ACTION.DOUBLE)" class="mr-4 bg-blue"
          >ダブル</v-btn
        >
      </div>
    </div>
  </div>
</template>
