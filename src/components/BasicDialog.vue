<script setup lang="ts">
import { ref } from 'vue';

// optionsAPIを
const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
    default: '',
  },
  mainMessage: {
    type: String,
    default: '',
  },
  subMessage: {
    type: String,
    default: '',
  },
});

defineEmits(['close']);
</script>

<template>
  <v-dialog
    :model-value="props.isShow"
    persistent
    width="auto"
    @update:model-value="$emit('close')"
  >
    <v-card>
      <v-card-title>{{ props.title }}</v-card-title>
      <v-card-text v-if="props.mainMessage">
        {{ props.mainMessage }}
      </v-card-text>
      <v-card-text v-if="props.subMessage">
        {{ props.subMessage }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="$emit('close')"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
