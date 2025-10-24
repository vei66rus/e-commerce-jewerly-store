<template>
  <div class="shopping-cart">
    <div class="shopping-cart__overlay" @click.stop="emit('close-cart')"></div>
    <div class="shopping-cart__wrapper">
      <button class="shopping-cart__close" @click="emit('close-cart')">
        <svg width="16" height="10">
          <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#chevron-down" />
        </svg>
      </button>
      <div class="shopping-cart__title">Shopping bag</div>
      <span class="shopping-cart__total-qty" v-if="cartStore.productsQuantity">
        {{ cartStore.productsQuantity }} items
      </span>
      <div class="shopping-cart__items" v-if="isCartLoadedAndNotEmpty">
        <div
          class="shopping-cart__item cart-item"
          v-for="item in cartItems"
          :key="item.data.documentId"
        >
          <button
            class="cart-item__remove"
            @click="handleDeleteFromCart(item.data.documentId)"
          >
            &times;
          </button>
          <img
            class="cart-item__image"
            :src="item.data.image"
            alt="jewelry picture"
          />
          <div class="cart-item__info">
            <div class="cart-item__title">{{ item.data.title }}</div>
            <div class="cart-item__properties">
              {{ item.data.color }} / {{ item.data.material }}
            </div>
            <div class="cart-item__price">
              <span
                :class="[
                  'cart-item__primary-price',
                  {
                    'cart-item__primary-price--crossed':
                      item.data.discountPercent,
                  },
                ]"
              >
                &dollar; {{ formatPrice(item.data.price) }}
              </span>
              <span
                v-if="item.data.discountPercent"
                class="cart-item__discounted-price"
              >
                &dollar;
                {{
                  formatPrice(
                    calculateDiscountedPrice(
                      item.data.price,
                      item.data.discountPercent,
                    ),
                  )
                }}
              </span>
            </div>
            <div class="cart-item__qty">
              <label for="qty-input">QTY:</label>
              <button
                :disabled="getItemsInCartQuantity(item.data.documentId) <= 1"
                @click="
                  cartStore.decrementQuantity({
                    documentId: item.data.documentId,
                  })
                "
              >
                -
              </button>
              <input
                type="text"
                id="qty-input"
                disabled
                :value="getItemsInCartQuantity(item.data.documentId)"
              />
              <button
                :disabled="
                  getItemsInCartQuantity(item.data.documentId) >=
                  item.data.itemsInStock
                "
                @click="
                  cartStore.incrementQuantity({
                    documentId: item.data.documentId,
                  })
                "
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="shopping-cart__loader" v-else-if="isCartItemsLoading">
        <LoaderUi />
      </div>
      <div class="shopping-cart__empty" v-else-if="isCartLoadedButEmpty">
        <span class="shopping-cart__empty-msg">Your cart is empty.</span>
        <button
          class="shopping-cart__empty-action"
          @click="handleGoShoppingClick"
        >
          <span> Go shopping </span>
          <svg width="12" height="7">
            <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#chevron-down" />
          </svg>
        </button>
      </div>
    </div>
    <div class="shopping-cart__footer">
      <div class="shopping-cart__footer-info">
        <span class="shopping-cart__footer-qty">
          Subtotal ({{ cartStore.productsQuantity }} items)
        </span>
        <span
          v-if="isCartItemsLoading"
          class="shopping-cart__footer-total-price"
        >
          Calculating...
        </span>
        <span v-if="!isCartItemsLoading" :class="totalPriceClasses">
          &dollar; {{ formatPrice(totalPrice) }}
        </span>
        <span
          v-if="isTotalDiscountedPriceShown"
          class="shopping-cart__footer-discounted-price"
        >
          &dollar; {{ formatPrice(discountedPrice) }}
        </span>
      </div>
      <div class="shopping-cart__footer-action">
        <ButtonUi full-width size="md" @click="handleViewCartClick">
          View Cart
        </ButtonUi>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ButtonUi, LoaderUi } from '@shoppe/shared/ui';
import { useCartStore } from '@shoppe/entities/cart';
import {
  ApiRequestError,
  getProductInfo,
  type GetProductInfoResult,
} from '@shoppe/shared/api';
import { formatPrice, calculateDiscountedPrice } from '@shoppe/shared/utils';

const emit = defineEmits<{ (e: 'close-cart'): void }>();
const router = useRouter();
const cartStore = useCartStore();
const cartItems = ref<GetProductInfoResult[] | null>(null);
const isCartItemsLoading = ref<boolean>(false);

function getItemsInCartQuantity(documentId: string) {
  const item = cartStore.cart.find((item) => item.documentId === documentId);

  return item ? item.quantity : 0;
}

const isCartLoadedAndNotEmpty = computed(
  () =>
    !isCartItemsLoading.value && cartItems.value && cartItems.value.length > 0,
);

const isCartLoadedButEmpty = computed(
  () =>
    (!isCartItemsLoading.value && !cartItems.value) ||
    (!isCartItemsLoading.value && cartItems.value?.length === 0),
);

const isTotalDiscountedPriceShown = computed(
  () => !isCartItemsLoading.value && totalPrice.value !== discountedPrice.value,
);

const totalPriceClasses = computed(() => [
  'shopping-cart__footer-total-price',
  {
    'shopping-cart__footer-total-price--crossed':
      totalPrice.value !== discountedPrice.value,
  },
]);

const totalPrice = computed(() =>
  cartItems.value
    ? cartItems.value.reduce(
        (acc, item) =>
          acc + item.data.price * getItemsInCartQuantity(item.data.documentId),
        0,
      )
    : 0,
);

const discountedPrice = computed(() =>
  cartItems.value
    ? cartItems.value.reduce(
        (acc, item) =>
          acc +
          (item.data.price -
            item.data.price * ((item.data.discountPercent || 0) / 100)) *
            getItemsInCartQuantity(item.data.documentId),
        0,
      )
    : 0,
);

onMounted(async () => {
  document.body.style.overflow = 'hidden';

  isCartItemsLoading.value = true;

  try {
    cartItems.value = await Promise.all(
      cartStore.cart.map((item) =>
        getProductInfo({ documentId: item.documentId }),
      ),
    );
  } catch (err) {
    if (err instanceof ApiRequestError) {
      console.error(err.errorMessage);
    } else if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  } finally {
    isCartItemsLoading.value = false;
  }
});

onUnmounted(() => {
  document.body.style.overflow = 'auto';
});

function handleDeleteFromCart(documentId: string) {
  if (
    cartItems.value &&
    cartItems.value.some((item) => item.data.documentId === documentId)
  ) {
    cartItems.value = cartItems.value.filter(
      (item) => item.data.documentId !== documentId,
    );
  }

  cartStore.removeFromCart({ documentId });
}

function handleViewCartClick(): void {
  emit('close-cart');
  router.push('/');
}

function handleGoShoppingClick(): void {
  emit('close-cart');
  router.push('/products');
}
</script>

<style lang="scss" src="./AppShoppingCart.scss"></style>
