import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useReviewFormStore = defineStore(
  'reviewForm',
  () => {
    const name = ref<string>('');

    return { name };
  },
  {
    persist: true,
  },
);
