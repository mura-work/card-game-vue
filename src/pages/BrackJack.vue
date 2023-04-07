<script setup lang="ts">
import Deck from "../models/Deck.ts";
import { onMounted, reactive } from "vue";
import { imageUrl } from "../utils/index.ts";

const dealerHands = reactive([]);
const plyaerHands = reactive([]);
onMounted(() => {
  const deck = new Deck();
  console.log({ deck });
  dealerHands.push(...[deck.pick(), deck.pick()]);
  plyaerHands.push(...[deck.pick(), deck.pick()]);
});
</script>

<template>
  <div class="h-screen w-screen bg-green-800 flex justify-center flex-col">
    <div class="w-3/5 max-w-3/5 w-auto text-center mb-16">
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
    <div class="max-w-3/5 w-auto w-3/5 text-center">
      <h2 class="text-white font-bold text-4xl mb-8">Player</h2>
      <div class="w-auto h-auto">
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
