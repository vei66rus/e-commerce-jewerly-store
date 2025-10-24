import { computed, type ComputedRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';

type UseCatalogPaginationComposable = () => {
  currentPage: ComputedRef<number>;
  goToPage: GoToPageFn;
};

type GoToPageFn = (page: number) => void;

const useCatalogPagination: UseCatalogPaginationComposable = () => {
  const route = useRoute();
  const router = useRouter();

  const currentPage = computed<number>(() => Number(route.query.page || 1));

  const goToPage: GoToPageFn = (page) => {
    router.push({ query: { ...route.query, page } });
  };

  return { currentPage, goToPage };
};

export default useCatalogPagination;