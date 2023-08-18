import { ref } from 'vue';

export function useDialog() {
  const isShow = ref(false);
  const title = ref('');
  const text = ref('');
  const message = ref('');

  const close = () => {
    isShow.value = false;
  };

  return { isShow, title, text, message, close };
}
