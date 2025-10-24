import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  type Ref,
  type ComputedRef,
} from 'vue';

type UseWindowSizeComposable = () => {
  windowWidth: Ref<number>;
  isMobileDevice: ComputedRef<boolean>;
};

const useWindowSize: UseWindowSizeComposable = () => {
  const windowWidth = ref<number>(window.innerWidth);

  onMounted((): void => {
    const handleResize: () => void = () => {
      windowWidth.value = window.innerWidth;
    };

    window.addEventListener('resize', handleResize);

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });
  });

  const isMobileDevice = computed<boolean>(() => windowWidth.value <= 576);

  return { windowWidth, isMobileDevice };
};

export default useWindowSize;