<script setup lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
  },
});

const onClick = () => console.log('emit');
</script>

<template>
  <v-btn @click="onClick()">{{ label }}</v-btn>
</template>
