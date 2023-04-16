<script setup lang="ts">
import Card from "../models/Card";
import { imageUrl } from "../utils/index";

interface Props {
  playerHands: Card[];
  playerName: String;
}
const { playerHands, playerName } = defineProps<Props>();
</script>

<template>
  <div class="mb-4">
    <h2 class="text-white font-bold text-2xl mb-8">{{ playerName }}</h2>
    <div class="w-auto h-auto">
      <template v-for="card in playerHands" :key="card.imageId">
        <v-img
          class="font-bold inline-block mr-8"
          height="120"
          width="80"
          :src="imageUrl(card.imageId)"
          cover
        />
      </template>
    </div>
  </div>
</template>
