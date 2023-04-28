<script setup lang="ts">
import Card from "../models/Card";
import { imageUrl } from "../utils/index";
import CardFront from "../assets/images/cards/torannpu-omote.png";

const { playerHands, playerName, playerPoint, isCardFront } = defineProps({
  playerHands: {
    type: Array,
    default: () => [],
  },
  playerName: {
    type: String,
    default: '',
  },
  playerPoint: {
    type: Number,
    default: 0,
  },
  isCardFront: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="mb-6">
    <h2 class="text-white font-bold text-xl mb-4">
      {{ playerName }}：{{ playerPoint ?? "--" }} pt
    </h2>
    <div class="w-auto h-auto">
      <template v-for="(card, i) in playerHands" :key="card.imageId">
        <v-img
          v-if="isCardFront && i === 0"
          class="card-front font-bold inline-block mr-8"
          height="140"
          width="100"
          :src="CardFront"
          cover
        />
        <v-img
          v-else
          class="font-bold inline-block mr-8"
          height="140"
          width="100"
          :src="imageUrl(card.imageId)"
          cover
        />
      </template>
    </div>
  </div>
</template>
