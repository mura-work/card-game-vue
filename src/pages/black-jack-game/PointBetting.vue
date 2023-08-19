<script setup lang="ts">
import { ref, readonly, reactive } from 'vue';
import { useStore } from 'vuex';
import BasicDialog from '../../components/BasicDialog.vue';

const store = useStore();

const bettingPoint = ref<number>(0);
const playerPoint = readonly(store.getters.getGamePoint);
const alertDialog = reactive({
  display: false,
  title: '',
  text: '',
});

const emit = defineEmits(['confirmBettingPoint']);

const validate = () => {
  if (bettingPoint.value <= 0) {
    Object.assign(alertDialog, {
      display: true,
      title: '警告',
      text: 'ポイントが入力されていません。入力をやり直してください',
    });
    return;
  } else if (bettingPoint.value > playerPoint) {
    Object.assign(alertDialog, {
      display: true,
      title: '警告',
      text: '所持ポイントよりも入力ポイントの方が多いです。所持ポイントを上回らないようにしてください',
    });
    return;
  }
  emit('confirmBettingPoint', bettingPoint.value);
};
</script>

<template>
  <div class="text-center">
    <h2 class="text-white font-bold text-4xl mb-16">Betting</h2>
    <div class="text-white font-bold mb-4 text-center">
      現在の所持Pt: {{ playerPoint }}
    </div>
    <div class="flex justify-center mb-8">
      <input
        v-model="bettingPoint"
        class="bg-white text-right h-7"
        type="number"
        min="1"
        :max="playerPoint"
      />
      <v-btn
        :disabled="bettingPoint <= 0"
        class="ml-4 bg-blue"
        size="small"
        @click="validate()"
      >
        確定
      </v-btn>
    </div>
    <span class="text-white font-bold">掛け金を入力してください。</span>
  </div>
  <!-- ベットポイントに関するエラーダイアログ -->
  <BasicDialog
    :is-show="alertDialog.display"
    :title="alertDialog.title"
    :main-message="alertDialog.text"
    @close="alertDialog.display = false"
  />
</template>
