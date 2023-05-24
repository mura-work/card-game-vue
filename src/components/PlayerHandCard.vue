<script setup lang="ts">
import Card from '../models/Card';
import CardFront from '../assets/images/cards/torannpu-omote.png';
import { useStore } from 'vuex';

interface Props {
  readonly playerHands: Card[];
  readonly playerName: string;
  readonly playerPoint?: number;
  readonly isCardFront?: boolean;
}

const store = useStore();
const cardImageList = store.getters.getCardImageList;

const props = withDefaults(defineProps<Props>(), {
  playerName: '',
  playerPoint: 0,
  isCardFront: false,
});

const getCardImage = (imageId: number) => {
  return cardImageList[String(imageId)];
};
</script>

<template>
  <div class="mb-6">
    <h2 class="text-white font-bold text-xl mb-4">
      {{ props.playerName }}：{{ props.playerPoint ?? '--' }} pt
    </h2>
    <div class="w-auto h-auto">
      <template v-for="(card, i) in props.playerHands" :key="card.imageId">
        <v-img
          v-if="props.isCardFront && i === 0"
          class="card-front font-bold inline-flex mr-8"
          height="140"
          width="100"
          :src="CardFront"
          cover
        />
        <v-img
          v-else
          class="font-bold inline-flex mr-8"
          height="140"
          width="100"
          :src="getCardImage(card.imageId)"
          cover
        />
      </template>
    </div>
  </div>
</template>
