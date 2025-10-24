<template>
  <div :class="productCardClasses">
    <div class="product-card__cover" :style="productCardCoverBgStyle">
      <div class="product-card__badge" v-if="!props.product.itemsInStock">
        Sold Out
      </div>
      <div
        class="product-card__badge"
        v-else-if="props.product.discountPercent"
      >
        - {{ props.product.discountPercent }} &percnt;
      </div>
      <div class="product-card__actions">
        <button
          :class="addToCartActionClasses"
          :disabled="!props.product.itemsInStock"
          @click="handleCartClick"
        >
          <svg width="25" height="25">
            <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#cart" />
          </svg>
        </button>
        <button class="product-card__action" @click="handleGoToProductPage">
          <svg width="32" height="18">
            <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#eye" />
          </svg>
        </button>
        <button
          :class="addToFavoritesActionClasses"
          @click="favoritesStore.toggleFavorite(props.product.documentId)"
        >
          <svg width="25" height="23">
            <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#like" />
          </svg>
        </button>
      </div>
      <div class="product-card__overlay">
        <button class="product-card__overlay-btn" @click="handleCartClick">
          {{ productCardOverlayText }}
        </button>
      </div>
    </div>
    <RouterLink
      v-if="!props.disabled"
      :to="productLink"
      class="product-card__title"
    >
      {{ props.product.title }}
    </RouterLink>
    <span v-else class="product-card__title">
      {{ props.product.title }}
    </span>
    <div class="product-card__price">
      <span :class="productCardPrimaryPriceClasses">
        &dollar; {{ rawPrice }}
      </span>
      <span
        class="product-card__price-discounted"
        v-if="props.product.discountPercent"
      >
        &dollar; {{ discountedPrice }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useCartStore } from '@shoppe/entities/cart';
import { useFavoritesStore } from '@shoppe/entities/favorites';
import { formatPrice, calculateDiscountedPrice } from '@shoppe/shared/utils';
import type { Product } from '@shoppe/shared/types';

type AppProductCardProps = {
  product: Product;
  className?: string;
  disabled?: boolean;
};

const router = useRouter();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

const props = withDefaults(defineProps<AppProductCardProps>(), {
  disabled: false,
});

const isProductInCart = computed<boolean>(() =>
  cartStore.isInCart({ documentId: props.product.documentId }),
);

const isProductInFavorites = computed<boolean>(() =>
  favoritesStore.isInFavorites(props.product.documentId),
);

const rawPrice = computed(() => formatPrice(props.product.price));

const discountedPrice = computed<string>(() =>
  formatPrice(
    calculateDiscountedPrice(
      props.product.price,
      props.product.discountPercent,
    ),
  ),
);

const productLink = computed<string>(
  () => `/products/${props.product.documentId}`,
);

const productCardClasses = computed(() => [
  props.className,
  'product-card',
  { 'product-card--disabled': props.disabled },
]);

const productCardCoverBgStyle = computed(() => ({
  'background-image': 'url(' + props.product.image + ')',
}));

const addToCartActionClasses = computed(() => [
  'product-card__action',
  {
    'product-card__action--active': isProductInCart.value,
  },
]);

const addToFavoritesActionClasses = computed(() => [
  'product-card__action',
  {
    'product-card__action--active': isProductInFavorites.value,
  },
]);

const productCardOverlayText = computed(() =>
  isProductInCart.value ? 'Remove from cart' : 'Add to cart',
);

const productCardPrimaryPriceClasses = computed(() => [
  'product-card__price-primary',
  {
    'product-card__price-primary--crossed': props.product.discountPercent,
  },
]);

function handleCartClick(): void {
  if (isProductInCart.value) {
    cartStore.removeFromCart({ documentId: props.product.documentId });
  } else {
    cartStore.addToCart({
      documentId: props.product.documentId,
      productName: props.product.title,
    });
  }
}

function handleGoToProductPage(): void {
  router.push(productLink.value);
}
</script>

<style lang="scss" src="./AppProductCard.scss"></style>
