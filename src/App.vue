<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';

onMounted(async () => {
  const store = useStore();
  await store.dispatch('initializeCardImageList');
});
</script>

<template>
  <div class="h-screen w-screen">
    <router-view />
  </div>
</template>

<style scoped></style>
