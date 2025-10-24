<template>
  <div :class="notificationClasses">
    <svg class="notification__icon" width="20" height="20">
      <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#notification-success" />
    </svg>
    <span class="notification__text">
      {{ props.notificationData?.text }}
    </span>
    <button class="notification__link" @click="$emit('show-cart')">
      View Cart
    </button>
  </div>
</template>

<script setup lang="ts">
import type { NotificationState } from '@shoppe/entities/notification';
import { computed } from 'vue';

const props = defineProps<{
  notificationData: NotificationState;
  className: string;
}>();

defineEmits<{ (e: 'show-cart'): void }>();

const notificationClasses = computed(() => [props.className, 'notification']);
</script>

<style lang="scss" src="./AppNotification.scss"></style>
