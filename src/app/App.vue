<template>
  <AppHeader @open-cart="isCartOpen = true" />
  <div class="main-content">
    <RouterView />
  </div>
  <AppFooter />

  <Teleport to="body">
    <AppShoppingCart v-if="isCartOpen" @close-cart="isCartOpen = false" />
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { AppHeader } from '@shoppe/widgets/Header';
import { AppFooter } from '@shoppe/widgets/Footer';
import { AppShoppingCart } from '@shoppe/widgets/ShoppingCart';

const isCartOpen = ref<boolean>(false);
</script>

<style lang="scss" src="./App.scss"></style>
