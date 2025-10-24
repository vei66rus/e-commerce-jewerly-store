import { ref, onMounted, type Ref } from 'vue';
import { ApiRequestError, getSlides } from '@shoppe/shared/api';
import type { PopulatedSlide } from '@shoppe/shared/types';

type UseSlidesDataComposable = () => {
  slidesData: Ref<null | PopulatedSlide[]>;
  isSlidesLoading: Ref<boolean>;
};

const useSlidesData: UseSlidesDataComposable = () => {
  const slidesData = ref<null | PopulatedSlide[]>(null);
  const isSlidesLoading = ref<boolean>(false);

  onMounted(async (): Promise<void> => {
    isSlidesLoading.value = true;

    try {
      const res = await getSlides();
      slidesData.value = res.data;
    } catch (error) {
      if (error instanceof ApiRequestError) {
        console.error(error.errorMessage);
      } else if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    } finally {
      isSlidesLoading.value = false;
    }
  });

  return { slidesData, isSlidesLoading };
};

export default useSlidesData;