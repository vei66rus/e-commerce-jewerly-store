<template>
  <div :class="ratingUiClasses">
    <StarIcon
      class="rating-ui__star"
      v-for="item in 5"
      :key="item"
      :state="getStarState(item)"
      @click="$emit('update:modelValue', item)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { StarIcon } from '@shoppe/shared/ui';

const props = defineProps<{ modelValue: number; className?: string }>();

defineEmits<{ (e: 'update:modelValue', value: number): void }>();

function getStarState(index: number): string {
  if (props.modelValue >= index) return 'filled';
  return 'empty';
}

const ratingUiClasses = computed(() => [props.className, 'rating-ui']);
</script>

<style lang="scss" src="./RatingUi.scss"></style>
