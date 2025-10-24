<template>
  <header class="header">
    <div class="header__container container">
      <RouterLink to="/" class="header__logo">
        <img src="@shoppe/shared/assets/images/header-logo.webp" alt="logotype" />
      </RouterLink>
      <nav class="header__menu">
        <ul class="header__menu-list">
          <li class="header__menu-item">
            <RouterLink class="header__menu-link" to="/products">
              Shop
            </RouterLink>
          </li>
        </ul>
      </nav>
      <div class="header__divider"></div>
      <ul class="header__actions-list">
        <li class="header__actions-item">
          <button class="header__actions-link" @click="emit('open-cart')">
            <svg width="21" height="21">
              <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#cart" />
            </svg>
            <span
              class="header__actions-counter"
              v-if="cartStore.productsQuantity"
            >
              {{ cartStore.productsQuantity }}
            </span>
          </button>
        </li>
        <li class="header__actions-item">
          <button class="header__actions-link">
            <svg width="22" height="22">
              <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#user" />
            </svg>
          </button>
        </li>
        <li class="header__actions-item">
          <button
            class="header__actions-link"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <svg v-if="!isMobileMenuOpen" width="22" height="17">
              <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#burger" />
            </svg>
            <svg v-if="isMobileMenuOpen" width="22" height="18">
              <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#cross" />
            </svg>
          </button>
        </li>
      </ul>
      <AppNotification
        v-if="isNotificationShown"
        :notification-data="notificationStore.notification"
        class-name="header__notification"
        @show-cart="$emit('open-cart')"
      />
    </div>
    <AppMobileMenu
      class-name="header__mobile-menu"
      v-if="isMobileMenuShown"
      @close-menu="isMobileMenuOpen = false"
    />
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useNotificationStore } from '@shoppe/entities/notification';
import { AppNotification } from '@shoppe/widgets/Notification';
import { AppMobileMenu } from '@shoppe/widgets/MobileMenu';
import { useCartStore } from '@shoppe/entities/cart';
import { useWindowSize } from '@shoppe/shared/lib';

const cartStore = useCartStore();
const notificationStore = useNotificationStore();

const { isMobileDevice } = useWindowSize();

const isMobileMenuOpen = ref(false);

const emit = defineEmits<{ (e: 'open-cart'): void }>();

const isNotificationShown = computed(
  () => !isMobileDevice.value && notificationStore.notification,
);

const isMobileMenuShown = computed<boolean>(
  () => isMobileDevice.value && isMobileMenuOpen.value,
);
</script>

<style lang="scss" src="./AppHeader.scss"></style>
