<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue';
import { fetchBlackJackHistory } from '../../services/BlackJackHistoryService';
import { fetchedBlackJackHistoryType } from '../../types/index';
import { useStore } from 'vuex';

const gameHistories = reactive<fetchedBlackJackHistoryType[]>([]);
const store = useStore();
const cardImageList = store.getters.getCardImageList;

onMounted(async () => {
  const histories = await fetchBlackJackHistory();
  console.log({ histories });
  gameHistories.push(...histories);
});

const getCardImage = (imageId: number) => {
  return cardImageList[String(imageId)];
};
</script>

<template>
  <div class="h-screen w-screen bg-green-800 text-white">
    <h2 class="font-bold text-2xl p-8 text-center">BlackJackHistory</h2>
    <v-table density="compact" class="mx-4">
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left">UserId</th>
          <th class="text-left">Result</th>
          <th class="text-left">PlayerHands</th>
          <th class="text-left">DealerHands</th>
          <th class="text-left">PointDifference</th>
          <th class="text-left">TotalPoint</th>
          <th class="text-left">playingDateTime</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in gameHistories" :key="game.id">
          <th>{{ game.id }}</th>
          <th>{{ game.userId }}</th>
          <th>{{ game.result }}</th>
          <th>
            <div class="flex">
              <v-img
                v-for="card in game.playerBlackJackHands"
                :key="card.id"
                class="card-front font-bold inline-block mr-8"
                height="50"
                width="40"
                :src="getCardImage(card.imageId)"
                cover
              />
            </div>
          </th>
          <th>
            <div class="flex">
              <v-img
                v-for="card in game.dealerBlackJackHands"
                :key="card.id"
                class="card-front font-bold inline-block mr-8"
                height="50"
                width="40"
                :src="getCardImage(card.imageId)"
                cover
              />
            </div>
          </th>
          <th>{{ game.playingDateTime }}</th>
          <th>{{ game.pointDifference }}</th>
          <th>{{ game.totalPoint }}</th>
          <th>{{ game.playingDateTime }}</th>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped></style>
