import { ref, onMounted, type Ref } from 'vue';
import { ApiRequestError, getCatalog } from '@shoppe/shared/api';
import type { Product } from '@shoppe/shared/types';

type UseHomeProductsComposable = () => {
  productsData: Ref<Product[] | null>;
  isProductsLoading: Ref<boolean>;
};

const useHomeProducts: UseHomeProductsComposable = () => {
  const productsData = ref<Product[] | null>(null);
  const isProductsLoading = ref<boolean>(false);

  onMounted(async () => {
    isProductsLoading.value = true;

    try {
      const res = await getCatalog();
      productsData.value = res.data;
    } catch (error) {
      if (error instanceof ApiRequestError) {
        console.error(error.errorMessage);
      } else if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    } finally {
      isProductsLoading.value = false;
    }
  });

  return { productsData, isProductsLoading };
};

export default useHomeProducts;