import { ref, computed, type Ref, type ComputedRef, watch } from 'vue';
import {
  ApiRequestError,
  getCatalog,
  getProductInfo,
  postReview,
} from '@shoppe/shared/api';
import type {
  PopulatedProduct,
  Product,
  PostReviewData,
  AddReviewFn,
} from '@shoppe/shared/types';
import { useRoute } from 'vue-router';
import type { ProductImagesObject } from '@shoppe/entities/product';

type UseProductDetailsComposable = () => {
  productData: Ref<PopulatedProduct | null>;
  similarItems: Ref<Product[] | null>;
  isProductDataLoading: Ref<boolean>;
  isProductDataUpdating: Ref<boolean>;
  productImages: ComputedRef<ProductImagesObject | null>;
  averageRating: ComputedRef<number>;
  updateProductInfo: () => Promise<void>;
  addReview: AddReviewFn;
};

export const useProductDetails: UseProductDetailsComposable = () => {
  const productData = ref<PopulatedProduct | null>(null);
  const similarItems = ref<Product[] | null>(null);
  const isProductDataLoading = ref<boolean>(false);
  const isProductDataUpdating = ref<boolean>(false);

  const route = useRoute();
  const documentId = computed(() => route.params.id as string);

  async function fetchProductInfo(documentId: string) {
    isProductDataLoading.value = true;

    const productInfoPromise = getProductInfo({ documentId });
    const similarItemsPromise = getCatalog({ limit: 3 });

    try {
      const [productInfoResult, similarItemsResult] = await Promise.all([
        productInfoPromise,
        similarItemsPromise,
      ]);

      productData.value = productInfoResult.data;
      similarItems.value = similarItemsResult.data;
    } catch (err) {
      if (err instanceof ApiRequestError) {
        console.error(err.errorMessage);
      } else if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    } finally {
      isProductDataLoading.value = false;
    }
  }

  watch(documentId, (documentId) => fetchProductInfo(documentId), {
    immediate: true,
  });

  async function updateProductInfo(): Promise<void> {
    isProductDataUpdating.value = true;

    try {
      const newProductData = await getProductInfo({
        documentId: documentId.value,
      });
      productData.value = newProductData.data;
    } catch (err) {
      if (err instanceof ApiRequestError) {
        console.error(err.errorMessage);
      } else if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    } finally {
      isProductDataUpdating.value = false;
    }
  }

  const addReview: AddReviewFn = async ({ name, review, rating }) => {
    const data: PostReviewData = {
      author: name,
      text: review,
      rate: rating,
      product: documentId.value,
    };

    try {
      await postReview({ data });
      await updateProductInfo();
    } catch (err) {
      if (err instanceof ApiRequestError) {
        console.error(err.errorMessage);
      } else if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    }
  };

  const productImages = computed<ProductImagesObject | null>(() => {
    if (!productData.value) {
      return null;
    } else {
      return {
        primaryImage: productData.value.image,
        secondaryImages: Object.values(
          productData.value.additionalImages.additionalImages[0],
        ),
      };
    }
  });

  const averageRating = computed<number>(() => {
    const reviews = productData.value?.reviews;

    if (!reviews || !reviews.length) return 0;

    const sum = reviews.reduce((acc, review) => acc + review.rate, 0);
    const rawRes = sum / reviews.length;

    return Math.round(rawRes * 2) / 2;
  });

  return {
    productData,
    productImages,
    averageRating,
    similarItems,
    isProductDataLoading,
    isProductDataUpdating,
    updateProductInfo,
    addReview,
  };
};
