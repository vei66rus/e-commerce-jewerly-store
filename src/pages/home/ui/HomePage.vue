<template>
  <div class="home-wrapper" v-if="slidesData && isContentLoaded">
    <AppSlider :slides-data="slidesData" />
    <section class="latest">
      <div class="latest__container container">
        <div class="latest__header">
          <h2 class="latest__title">Shop The Latest</h2>
          <RouterLink to="/products" class="latest__link">View All</RouterLink>
        </div>
        <div class="latest__items">
          <AppProductCard
            v-for="product in productsData"
            :key="product.documentId"
            :product="product"
          />
        </div>
      </div>
    </section>
  </div>
  <div class="home-loader" v-else>
    <LoaderUi />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { LoaderUi } from '@shoppe/shared/ui';
import { AppProductCard } from '@shoppe/features/product/card';
import { AppSlider, useSlidesData } from '@shoppe/widgets/Slider';
import { useHomeProducts } from '@shoppe/entities/product';

const { slidesData, isSlidesLoading } = useSlidesData();
const { productsData, isProductsLoading } = useHomeProducts();

const isContentLoaded = computed<boolean | null>(
  () =>
    productsData.value &&
    !isProductsLoading.value &&
    slidesData.value &&
    !isSlidesLoading.value,
);
</script>

<style lang="scss" src="./HomePage.scss"></style>
