<template>
  <div :class="mobileMenuClasses">
    <nav class="mobile-menu__links">
      <ul class="mobile-menu__links-list">
        <li class="mobile-menu__links-item" @click="$emit('close-menu')">
          <RouterLink to="/"> Home </RouterLink>
        </li>
        <li class="mobile-menu__links-item" @click="$emit('close-menu')">
          <RouterLink to="/products"> Shop </RouterLink>
        </li>
      </ul>
    </nav>
    <div class="mobile-menu__actions">
      <ul class="mobile-menu__actions-list">
        <li class="mobile-menu__actions-item" @click="$emit('close-menu')">
          <RouterLink to="/">
            <svg width="22" height="22">
              <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#user" />
            </svg>
            <span> My account </span>
          </RouterLink>
        </li>
        <li class="mobile-menu__actions-item" @click="$emit('close-menu')">
          <button>
            <svg width="20" height="20">
              <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#logout" />
            </svg>
            <span> Logout </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{ className?: string }>();
defineEmits<{ (e: 'close-menu'): void }>();

onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.body.style.overflow = 'auto';
});

const mobileMenuClasses = computed<(string | undefined)[]>(() => [
  props.className,
  'mobile-menu',
]);
</script>

<style lang="scss" src="./AppMobileMenu.scss"></style>
