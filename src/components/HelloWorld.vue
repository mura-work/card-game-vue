<script setup lang="ts">
interface Props {
  readonly message: string;
}

const props = withDefaults(defineProps<Props>(), {
  message: 'sample',
});
</script>

<template>
  <div>{{ props.message }}</div>
</template>
