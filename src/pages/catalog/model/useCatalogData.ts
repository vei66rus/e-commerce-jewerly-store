import { ref, watch, type Ref } from 'vue';
import { ApiRequestError, getCatalog } from '@shoppe/shared/api';
import { useCatalogPagination } from '@shoppe/features/catalog/pagination';
import { useCatalogFilters } from '@shoppe/features/catalog/filters';
import type { Product, Pagination, FiltersParams } from '@shoppe/shared/types';

type UseCatalogDataComposable = () => {
  catalogData: Ref<Product[] | null>;
  paginationData: Ref<Pagination | null>;
  isCatalogLoading: Ref<boolean>;
};

type LoadDataFn = (
  page: number,
  filters: Omit<FiltersParams, 'page' | 'limit'>,
) => Promise<void>;

export const useCatalogData: UseCatalogDataComposable = () => {
  const catalogData = ref<Product[] | null>(null);
  const paginationData = ref<Pagination | null>(null);
  const isCatalogLoading = ref<boolean>(false);

  const { currentPage } = useCatalogPagination();
  const { appliedFilters } = useCatalogFilters();

  const loadData: LoadDataFn = async (page, filters) => {
    isCatalogLoading.value = true;
    try {
      const res = await getCatalog({ page, ...filters });
      catalogData.value = res.data;
      paginationData.value = res.meta.pagination;
    } catch (err) {
      if (err instanceof ApiRequestError) {
        console.error(err.errorMessage);
      } else if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    } finally {
      isCatalogLoading.value = false;
    }
  };

  watch(
    [currentPage, appliedFilters],
    ([page, filters]) => {
      loadData(page, filters);
    },
    { immediate: true },
  );

  return { catalogData, paginationData, isCatalogLoading };
};
