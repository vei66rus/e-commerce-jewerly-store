<template>
  <main class="product">
    <div
      class="product__container container"
      v-if="productData && !isProductDataLoading"
    >
      <div class="product__info">
        <AppImagesGallery
          class-name="product__images-gallery"
          :images="productImages!"
        />
        <AppProductInfo
          class-name="product__primary-info"
          :product-data="productData"
          :average-rating="averageRating"
          :is-mobile="isMobileDevice"
        />
      </div>
      <AppProductTabs
        v-if="!isMobileDevice"
        class-name="product__additional-info"
        :product-data="productData"
      />
      <AppProductAccordeon
        v-else
        class-name="product__additional-info"
        :product-data="productData"
      />
      <div class="product__similar" v-if="!isProductDataLoading">
        <h4 class="product__similar-title">Similar Items</h4>
        <div class="product__similar-cards">
          <AppProductCard
            class-name="product__similar-card"
            v-for="product in similarItems"
            :key="product.documentId"
            :product="product"
          />
        </div>
      </div>
      <RouterLink class="product__bottom-link" to="/products">
        <span>Continue shopping</span>
        <svg width="10" height="6">
          <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#chevron-down" />
        </svg>
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { AppImagesGallery } from '@shoppe/features/product/gallery';
import { AppProductInfo } from '@shoppe/features/product/info';
import { AppProductTabs } from '@shoppe/features/product/tabs';
import { AppProductAccordeon } from '@shoppe/features/product/accordeon';
import { AppProductCard } from '@shoppe/features/product/card';
import { useProductDetails } from '../model/useProductDetails';
import { useWindowSize } from '@shoppe/shared/lib';
import { provide } from 'vue';
import { sumbitReviewKey } from '@shoppe/entities/reviewForm';

const {
  productData,
  productImages,
  averageRating,
  similarItems,
  isProductDataLoading,
  addReview,
} = useProductDetails();

const { isMobileDevice } = useWindowSize();

provide(sumbitReviewKey, addReview);
</script>

<style lang="scss" src="./ProductPage.scss"></style>
