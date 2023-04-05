<script setup lang="ts">
import ComingSoonImg from "../assets/images/coming-soon.png";
import BlackJackImg from "../assets/images/brack-jack-image.png";
import { useRouter } from "vue-router";

const router = useRouter();
const openGame = (path: string) => router.push(path);
</script>

<template>
  <div class="h-1/5">
    <h2 class="pt-8 text-6xl text-center">Play Card Games!</h2>
  </div>
  <div class="h-4/5 flex items-center justify-center">
    <div class="flex w-4/5 justify-around">
      <v-card
        class="mx-auto"
        max-width="300"
        min-width="300"
        @click="() => openGame('/brack-jack')"
      >
        <v-img
          class="align-end font-bold"
          height="200"
          :src="BlackJackImg"
          cover
        >
          <v-card-title>Brack Jack</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4"> 2023-04 </v-card-subtitle>

        <v-card-text>
          Get as close as possible so that the total of 2 or more cards does not
          exceed 21 points.
        </v-card-text>
      </v-card>
      <v-card class="mx-auto" max-width="300" min-width="300">
        <v-img
          class="align-end text-white"
          height="200"
          :src="ComingSoonImg"
          cover
        >
          <v-card-title>Coming Soon</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4"> coming soon </v-card-subtitle>

        <v-card-text>
          <div>thinking...</div>
        </v-card-text>
      </v-card>
      <v-card class="mx-auto" max-width="300" min-width="300">
        <v-img
          class="align-end text-white"
          height="200"
          :src="ComingSoonImg"
          cover
        >
          <v-card-title>Coming Soon</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4"> coming soon </v-card-subtitle>

        <v-card-text>
          <div>thinking...</div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>



