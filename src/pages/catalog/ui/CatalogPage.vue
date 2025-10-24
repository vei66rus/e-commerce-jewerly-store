<template>
  <main class="catalog">
    <div class="catalog__container container">
      <h2 class="catalog__title">Shop The Latest</h2>
      <button class="catalog__toggler" @click="isFiltersOpen = !isFiltersOpen">
        <svg width="14" height="14">
          <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#filters" />
        </svg>
        Filters
      </button>
      <div class="catalog__wrapper">
        <AppCatalogFilters
          v-show="isFiltersVisible"
          class-name="catalog__filters"
          @close-filters="isFiltersOpen = false"
          v-model="filters"
        />
        <section class="catalog__content">
          <div class="catalog__loader" v-if="isLoaderVisible">
            <LoaderUi />
          </div>
          <div class="catalog__items" v-else-if="isCatalogItemsShown">
            <AppProductCard
              class-name="catalog__item"
              v-for="catalogItem in catalogData"
              :key="catalogItem.documentId"
              :product="catalogItem"
              :disabled="isCatalogLoading"
            />
          </div>
          <div class="catalog__empty" v-else>
            <span>Nothing was found.</span>
          </div>
          <AppCatalogPagination
            class-name="catalog__pagination"
            v-if="isPaginationVisible"
            :current-page="currentPage"
            :pages-count="paginationData!.pageCount"
            :disabled="isCatalogLoading"
            @page-change="goToPage"
          />
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { AppProductCard } from '@shoppe/features/product/card';
import { LoaderUi } from '@shoppe/shared/ui';
import { AppCatalogFilters, useCatalogFilters } from '@shoppe/features/catalog/filters';
import { AppCatalogPagination, useCatalogPagination } from '@shoppe/features/catalog/pagination';
import { useCatalogData } from '../model/useCatalogData';
import { useWindowSize } from '@shoppe/shared/lib';

const { windowWidth } = useWindowSize();
const { catalogData, paginationData, isCatalogLoading } = useCatalogData();
const { currentPage, goToPage } = useCatalogPagination();
const { filters } = useCatalogFilters();

const isFiltersOpen = ref(false);

const isCatalogItemsShown = computed(
  () => catalogData.value && catalogData.value.length > 0,
);

const isFiltersVisible = computed(
  () => isFiltersOpen.value || windowWidth.value > 1024,
);

const isPaginationVisible = computed(
  () => paginationData.value && paginationData.value.pageCount > 1,
);

const isLoaderVisible = computed(
  () => !catalogData.value && isCatalogLoading.value,
);
</script>

<style lang="scss" src="./CatalogPage.scss"></style>
