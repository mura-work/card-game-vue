<script setup lang="ts">
import Deck from "../models/Deck.ts";
import { onMounted } from "vue";
import SampleCard1 from "../assets/images/cards/torannpu-illust1.png";
import SampleCard2 from "../assets/images/cards/torannpu-illust2.png";

onMounted(() => {
  const deck = new Deck();
  console.log({ deck });
});
</script>

<template>
  <div class="h-screen w-screen bg-green-800 flex justify-center flex-col">
    <div class="w-3/5 max-w-3/5 w-auto flex justify-center flex-col">
      <h2 class="text-white font-bold text-4xl">Dealer</h2>
      <div class="w-1/2">
        <v-img
          class="font-bold inline-block mr-8"
          height="180"
          width="120"
          :src="SampleCard1"
          cover
        />
        <v-img
          class="font-bold inline-block"
          height="180"
          width="120"
          :src="SampleCard1"
          cover
        />
      </div>
    </div>
    <div class="max-w-3/5 w-auto w-3/5">
      <h2 class="text-white font-bold text-4xl">Player</h2>
			<div class="w-auto">
        <v-img
          class="font-bold inline-block mr-8"
          height="180"
          width="120"
          :src="SampleCard1"
          cover
        />
        <v-img
          class="font-bold inline-block"
          height="180"
          width="120"
          :src="SampleCard1"
          cover
        />
      </div>
    </div>
  </div>
</template>
