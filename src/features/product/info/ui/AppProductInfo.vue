<template>
  <div :class="productInfoClasses">
    <span class="product-info__title">{{ props.productData.title }}</span>
    <div class="product-info__price">
      <span :class="priceClasses"> &dollar; {{ rawPrice }} </span>
      <span
        class="product-info__price-discounted"
        v-if="props.productData.discountPercent"
      >
        &dollar; {{ discountedPrice }}
      </span>
    </div>
    <div class="product-info__inner-wrapper">
      <div class="product-info__rating">
        <span class="product-info__rating-stars">
          <StarIcon
            class="product-info__rating-star"
            v-for="(item, index) in 5"
            :key="item"
            :state="getStarState(index)"
          />
        </span>
        <span class="product-info__rating-info">
          {{ props.productData.reviews.length }} customer review
        </span>
      </div>
      <div :class="productInfoAboutClasses">
        <span>{{ props.productData.description }}</span>
        <button v-if="props.isMobile" @click="isAboutOpen = !isAboutOpen">
          View {{ productInfoVisibilityTogglerText }}
          <svg width="8" height="5">
            <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#chevron-down" />
          </svg>
        </button>
      </div>
      <div class="product-info__actions">
        <CounterUi
          v-if="!props.isMobile"
          class="product-info__actions-counter"
          v-model="quantityBinding"
          :max-value="props.productData.itemsInStock"
        />
        <ButtonUi
          full-width
          :size="addToCartBtnSize"
          @click="handleAddToCart"
          :disabled="localProductQuantity > props.productData.itemsInStock"
        >
          {{ addToCartBtnText }}
        </ButtonUi>
      </div>
    </div>
    <div v-if="!props.isMobile" class="product-info__favorite">
      <button
        :class="favoriteBtnClasses"
        @click="favoritesStore.toggleFavorite(props.productData.documentId)"
      >
        <svg width="20" height="18">
          <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#favorite" />
        </svg>
      </button>
    </div>
    <div v-if="!props.isMobile" class="product-info__specifications">
      <ul class="product-info__specifications-items">
        <li class="product-info__specifications-item">
          <span>SKU:</span> {{ props.productData.SKU }}
        </li>
        <li class="product-info__specifications-item">
          <span>Categories:</span>
          {{ productCategories }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { StarIcon, CounterUi, ButtonUi } from '@shoppe/shared/ui';
import { useFavoritesStore } from '@shoppe/entities/favorites';
import { useCartStore } from '@shoppe/entities/cart';
import type { PopulatedProduct } from '@shoppe/shared/types';
import { calculateDiscountedPrice, formatPrice } from '@shoppe/shared/utils';

const props = defineProps<{
  productData: PopulatedProduct;
  averageRating: number;
  className?: string;
  isMobile: boolean;
}>();

const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();

const localProductQuantity = ref(1);
const isAboutOpen = ref(false);

function getStarState(index: number) {
  if (index + 1 <= props.averageRating) return 'filled';
  if (index < props.averageRating && props.averageRating < index + 1)
    return 'half';
  return 'empty';
}

const discountedPrice = computed(() =>
  props.productData.discountPercent
    ? formatPrice(
        calculateDiscountedPrice(
          props.productData.price,
          props.productData.discountPercent,
        ),
      )
    : props.productData.price,
);

const priceClasses = computed(() => [
  'product-info__price-raw',
  { 'product-info__price-raw--crossed': props.productData.discountPercent },
]);

const productInfoClasses = computed(() => [props.className, 'product-info']);

const rawPrice = computed(() =>
  props.productData.price.toFixed(2).split('.').join(','),
);

const isProductInfoAboutShown = computed(
  () => props.isMobile && isAboutOpen.value,
);

const productInfoAboutClasses = computed(() => [
  'product-info__about',
  { 'product-info__about--open': isProductInfoAboutShown.value },
]);

const productInfoVisibilityTogglerText = computed(() =>
  isProductInfoAboutShown.value ? 'less' : 'more',
);

const addToCartBtnSize = computed(() => (props.isMobile ? 'sm' : 'md'));

const addToCartBtnText = computed(() =>
  cartStore.isInCart({ documentId: props.productData.documentId })
    ? 'Remove from cart'
    : 'Add to cart',
);

const quantityBinding = computed({
  get() {
    const itemInCart = cartStore.findItemInCart({
      documentId: props.productData.documentId,
    });
    return itemInCart ? itemInCart.quantity : localProductQuantity.value;
  },
  set(value) {
    const itemInCart = cartStore.findItemInCart({
      documentId: props.productData.documentId,
    });
    if (itemInCart) {
      itemInCart.quantity = value;
    } else {
      localProductQuantity.value = value;
    }
  },
});

const favoriteBtnClasses = computed(() => [
  'product-info__favorite-btn',
  {
    'product-info__favorite-btn--active': favoritesStore.favorites.includes(
      props.productData.documentId,
    ),
  },
]);

const productCategories = computed(() =>
  props.productData.categories.length > 0
    ? props.productData.categories.map((item) => item.value).join(', ')
    : 'No categories*',
);

function handleAddToCart() {
  const itemInCart = cartStore.findItemInCart({
    documentId: props.productData.documentId,
  });

  if (itemInCart) {
    if (props.isMobile) {
      localProductQuantity.value = 1;
    } else {
      localProductQuantity.value = itemInCart.quantity;
    }
    cartStore.removeFromCart({ documentId: props.productData.documentId });
  } else {
    cartStore.addToCart({
      documentId: props.productData.documentId,
      productName: props.productData.title,
      quantity: localProductQuantity.value,
    });
  }
}
</script>

<style lang="scss" src="./AppProductInfo.scss"></style>
