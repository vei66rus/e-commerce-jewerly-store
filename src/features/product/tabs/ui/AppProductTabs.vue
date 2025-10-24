<template>
  <div :class="tabsClasses">
    <div class="tabs__controls">
      <button
        :class="descriptionTabControlClasses"
        @click="activeTab = TAB_NAMES.DESCRIPTION"
      >
        Description
      </button>
      <button
        :class="informationTabControlClasses"
        @click="activeTab = TAB_NAMES.INFORMATION"
      >
        Aditional infromation
      </button>
      <button
        :class="reviewsTabControlClasses"
        @click="activeTab = TAB_NAMES.REVIEWS"
      >
        Reviews({{ productData.reviews.length }})
      </button>
    </div>
    <div class="tabs__contents">
      <div
        class="tabs__content description-content"
        v-show="activeTab === TAB_NAMES.DESCRIPTION"
      >
        <p class="description-content__paragraph">
          {{ productData.description }}
        </p>
      </div>
      <div
        class="tabs__content information-content"
        v-show="activeTab === TAB_NAMES.INFORMATION"
      >
        <ul class="information-content__items">
          <li class="information-content__item">
            <span>Weight:</span>
            {{ productData.weight }} kg
          </li>
          <li class="information-content__item">
            <span>Dimensions:</span>
            {{ productData.dimensions }} cm
          </li>
          <li class="information-content__item">
            <span>Colours:</span>
            {{ productData.color }}
          </li>
          <li class="information-content__item">
            <span>Material:</span>
            {{ productData.material }}
          </li>
        </ul>
      </div>
      <div
        class="tabs__content reviews-content"
        v-show="activeTab === TAB_NAMES.REVIEWS"
      >
        <div class="reviews-content__reviews-block">
          <h4 class="reviews-content__reviews-title">
            {{ productData.reviews.length }} Reviews for
            {{ productData.title }}
          </h4>
          <div class="reviews-content__reviews-list">
            <div
              class="reviews-content__reviews-item review"
              v-for="review in productData.reviews"
              :key="review.id"
            >
              <h4 class="review__author">{{ review.author }}</h4>
              <div class="review__rating">
                <StarIcon
                  class="review__rating-star"
                  v-for="item in 5"
                  :key="item"
                  :state="getStarState(item, review.rate)"
                />
              </div>
              <p class="review__text">{{ review.text }}</p>
            </div>
          </div>
        </div>
        <AppReviewForm class-name="reviews-content__add-review-block" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { StarIcon } from '@shoppe/shared/ui';
import { AppReviewForm } from '@shoppe/features/product/reviewForm';
import type { PopulatedProduct } from '@shoppe/shared/types';

const props = defineProps<{
  productData: PopulatedProduct;
  className?: string;
}>();

const TAB_NAMES = {
  DESCRIPTION: 'description',
  INFORMATION: 'information',
  REVIEWS: 'reviews',
} as const;

type TabNames = (typeof TAB_NAMES)[keyof typeof TAB_NAMES];

const activeTab = ref<TabNames>(TAB_NAMES.DESCRIPTION);

const tabsClasses = computed(() => [props.className, 'tabs']);

const descriptionTabControlClasses = computed(() => [
  'tabs__control',
  {
    'tabs__control--active': activeTab.value === TAB_NAMES.DESCRIPTION,
  },
]);

const informationTabControlClasses = computed(() => [
  'tabs__control',
  {
    'tabs__control--active': activeTab.value === TAB_NAMES.INFORMATION,
  },
]);

const reviewsTabControlClasses = computed(() => [
  'tabs__control',
  {
    'tabs__control--active': activeTab.value === TAB_NAMES.REVIEWS,
  },
]);

function getStarState(index: number, value: number): string {
  return index > value ? 'empty' : 'filled';
}
</script>

<style lang="scss" src="./AppProductTabs.scss"></style>
