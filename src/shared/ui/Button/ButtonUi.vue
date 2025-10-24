<template>
  <button
    :class="computedClasses"
    :disabled="props.disabled"
    @click.prevent="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonUiProps } from './ButtonUi.props';

const props = withDefaults(defineProps<ButtonUiProps>(), { size: 'sm' });

const computedClasses = computed(() => [
  props.className,
  'ui-btn',
  `ui-btn--${{ sm: 'sm', md: 'md', lg: 'lg' }[props.size]}`,
  `ui-btn--${props.filled ? 'filled' : 'transparent'}`,
  `ui-btn--${props.white ? 'white' : 'black'}`,
  {
    'ui-btn--selected': props.selected,
    'ui-btn--full-width': props.fullWidth,
  },
]);

defineEmits<{ (e: 'click'): void }>();
</script>

<style lang="scss" src="./ButtonUi.scss"></style>
