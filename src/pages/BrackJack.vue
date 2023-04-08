<script setup lang="ts">
import Deck from "../models/Deck.ts";
import { onMounted, reactive, ref } from "vue";
import { imageUrl } from "../utils/index.ts";
const CONST_SCENE = {
  BETTING: "betting", // ベット
  ACTIONS: "actions", // 各アクションの実施
  RESULT: "result", // 最終結果
};

type SceneType = "betting" | "actions" | "result";
let scene = ref<SceneType>(CONST_SCENE.BETTING);
const bettingPrice = ref(0);
const dealerHands = reactive([]);
const plyaerHands = reactive([]);

onMounted(() => {
  const deck = new Deck();
  console.log({ deck });
  dealerHands.push(...[deck.pick(), deck.pick()]);
  plyaerHands.push(...[deck.pick(), deck.pick()]);
});

const confirmBettingPrice = () => {
	console.log({bettingPrice}, bettingPrice.value)
	if (bettingPrice.value <= 0) return
	scene.value = CONST_SCENE.ACTIONS
}
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
      <h2 class="text-white font-bold text-4xl mb-8">Player</h2>
      <div v-if="scene === CONST_SCENE.BETTING">
				<div class="flex justify-center mb-8">
					<input
						v-model="bettingPrice"
						class="bg-white text-right h-7"
						type="number"
						min="1"
						max="10000"
					/>
					<v-btn @click="confirmBettingPrice" :disabled="bettingPrice <= 0" class="ml-4 bg-blue" size="small">確定</v-btn>
				</div>
				<span class="text-white font-bold">掛け金を入力してください。<br>1ptから10000ptまでかけることができます.</span>
      </div>
      <div v-if="scene === CONST_SCENE.ACTIONS" class="w-auto h-auto">
        <template v-for="card in plyaerHands" :key="card.imageId">
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
  </div>
</template>
