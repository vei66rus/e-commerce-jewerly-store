import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

type UseCatalogFiltersComposable = () => {
  filters: Ref<FiltersObject>;
  appliedFilters: ComputedRef<AppliedFiltersObject>;
};

const SORTING_OPTIONS = {
  PRICE: 'price',
  RATING: 'rating',
  DATE: 'createdAt',
} as const;

type FiltersObject = {
  searchQuery: string;
  sortBy: string;
  inStock: boolean;
  onSale: boolean;
};

type AppliedFiltersObject = {
  search: string;
  sort: string;
  inStock: boolean;
  onSale: boolean;
};

const useCatalogFilters: UseCatalogFiltersComposable = () => {
  const router = useRouter();
  const route = useRoute();

  const filters = ref<FiltersObject>({
    searchQuery: route.query.search ? route.query.search.toString() : '',
    sortBy: route.query.sort ? route.query.sort.toString() : '',
    inStock: String(route.query.inStock) === 'true',
    onSale: String(route.query.inSale) === 'true',
  });

  watch(
    filters,
    (newFilters) => {
      router.push({
        query: {
          ...route.query,
          search: newFilters.searchQuery || undefined,
          sort: newFilters.sortBy || undefined,
          inStock: newFilters.inStock ? 'true' : undefined,
          onSale: newFilters.onSale ? 'true' : undefined,
          page: undefined,
        },
      });
    },
    { deep: true },
  );

  const appliedFilters = computed<AppliedFiltersObject>(() => ({
    search: route.query.search ? route.query.search.toString() : '',
    sort: route.query.sort ? route.query.sort.toString() : '',
    inStock: String(route.query.inStock) === 'true',
    onSale: String(route.query.onSale) === 'true',
  }));

  return {
    filters,
    appliedFilters,
  };
};

export { useCatalogFilters, SORTING_OPTIONS, type FiltersObject };