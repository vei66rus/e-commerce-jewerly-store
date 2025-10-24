<template>
  <div :class="accordeonClasses">
    <div :class="descriptionAccordeonBlockClasses">
      <button
        class="accordeon__control"
        @click="handleSwithTab(TAB_NAMES.DESCRIPTION)"
      >
        <span> Description </span>
        <svg width="8" height="5">
          <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#chevron-down" />
        </svg>
      </button>
      <div class="accordeon__content description-content">
        <p class="description-content__paragraph">
          {{ props.productData.description }}
        </p>
      </div>
    </div>
    <div :class="informationAccordeonBlockClasses">
      <button
        class="accordeon__control"
        @click="handleSwithTab(TAB_NAMES.INFORMATION)"
      >
        <span> Aditional information </span>
        <svg width="8" height="5">
          <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#chevron-down" />
        </svg>
      </button>
      <div class="accordeon__content information-content">
        <ul class="information-content__items">
          <li class="information-content__item">
            <span>Weight:</span>
            {{ props.productData.weight }} kg
          </li>
          <li class="information-content__item">
            <span>Dimensions:</span>
            {{ props.productData.dimensions }} cm
          </li>
          <li class="information-content__item">
            <span>Colours:</span>
            {{ props.productData.color }}
          </li>
          <li class="information-content__item">
            <span>Material:</span>
            {{ props.productData.material }}
          </li>
        </ul>
      </div>
    </div>
    <div :class="reviewsAccordeonBlockClasses">
      <button
        class="accordeon__control"
        @click="handleSwithTab(TAB_NAMES.REVIEWS)"
      >
        <span> Reviews({{ props.productData.reviews.length }}) </span>
        <svg width="8" height="5">
          <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#chevron-down" />
        </svg>
      </button>
      <div class="accordeon__content reviews-content">
        <AppReviewForm class-name="reviews-content__add-review" />
        <h4 class="reviews-content__reviews-title">
          {{ props.productData.reviews.length }} Reviews for
          {{ props.productData.title }}
        </h4>
        <div class="reviews-content__reviews-list">
          <div
            class="reviews-content__reviews-item review"
            v-for="review in props.productData.reviews"
            :key="review.id"
          >
            <h4 class="review__author">{{ review.author }}</h4>
            <div class="review__rating">
              <StarIcon
                class="review__rating-star"
                v-for="item in 5"
                :key="item"
                :state="item > review.rate ? 'empty' : 'filled'"
              />
            </div>
            <p class="review__text">{{ review.text }}</p>
          </div>
        </div>
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

type TabName = (typeof TAB_NAMES)[keyof typeof TAB_NAMES];

const activeTab = ref<TabName | null>(null);

function handleSwithTab(tabName: TabName) {
  if (activeTab.value === tabName) {
    activeTab.value = null;
  } else {
    activeTab.value = tabName;
  }
}

const accordeonClasses = computed<(string | undefined)[]>(() => [
  props.className,
  'accordeon',
]);

const descriptionAccordeonBlockClasses = computed(() => [
  'accordeon__block',
  {
    'accordeon__block--open': activeTab.value === TAB_NAMES.DESCRIPTION,
  },
]);

const informationAccordeonBlockClasses = computed(() => [
  'accordeon__block',
  {
    'accordeon__block--open': activeTab.value === TAB_NAMES.INFORMATION,
  },
]);

const reviewsAccordeonBlockClasses = computed(() => [
  'accordeon__block',
  {
    'accordeon__block--open': activeTab.value === TAB_NAMES.REVIEWS,
  },
]);
</script>

<style lang="scss" src="./AppProductAccordeon.scss"></style>
