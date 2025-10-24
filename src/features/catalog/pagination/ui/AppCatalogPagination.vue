<template>
  <div :class="paginationClasses">
    <button
      class="pagination__button pagination__button--text"
      :disabled="isPrevBtnDisabled"
      @click="$emit('page-change', props.currentPage - 1)"
    >
      Prev
    </button>
    <button
      v-for="page in props.pagesCount"
      :key="page"
      :class="[
        'pagination__button',
        { 'pagination__button--active': props.currentPage === page },
      ]"
      :disabled="props.disabled"
      @click="$emit('page-change', page)"
    >
      {{ page }}
    </button>
    <button
      class="pagination__button pagination__button--text"
      :disabled="isNextBtnDisabled"
      @click="$emit('page-change', props.currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  className?: string;
  currentPage: number;
  pagesCount: number;
  disabled: boolean;
}>();

defineEmits<{ (e: 'page-change', value: number): void }>();

const paginationClasses = computed(() => [
  props.className,
  'pagination',
  { 'pagination--disabled': props.disabled },
]);

const isPrevBtnDisabled = computed<boolean>(
  () => props.currentPage === 1 || props.disabled,
);

const isNextBtnDisabled = computed<boolean>(
  () => props.currentPage === props.pagesCount || props.disabled,
);
</script>

<style lang="scss" src="./AppCatalogPagination.scss"></style>
