<template>
  <aside :class="filtersClasses">
    <form class="filters__form" @submit.prevent>
      <label class="filters__search">
        <input
          type="text"
          placeholder="Search..."
          :value="searchValue"
          @input="
            debouncedHandleFilterChange(
              ($event.target as HTMLInputElement).value,
              'searchQuery',
            )
          "
        />
        <button type="submit">
          <svg width="19" height="19">
            <use xlink:href="@shoppe/shared/assets/icons/primary-icons.svg#search" />
          </svg>
        </button>
      </label>
      <select
        class="filters__sort"
        :value="sortValue"
        @change="
          handleFilterChange(
            ($event.target as HTMLSelectElement).value,
            'sortBy',
          )
        "
      >
        <option value="" disabled selected style="display: none">
          Sort By
        </option>
        <option value="">Default</option>
        <option :value="SORTING_OPTIONS.PRICE">Price</option>
        <option :value="SORTING_OPTIONS.DATE">Newest</option>
      </select>
      <div class="filters__params">
        <div class="filters__param">
          <label for="on-sale-chkbx">On sale</label>
          <input
            type="checkbox"
            id="on-sale-chkbx"
            :checked="props.modelValue.onSale"
            @change="
              handleFilterChange(
                ($event.target as HTMLInputElement).checked,
                'onSale',
              )
            "
          />
        </div>
        <div class="filters__param">
          <label for="in-stock-chkbx">In stock</label>
          <input
            type="checkbox"
            id="in-stock-chkbx"
            :checked="props.modelValue.inStock"
            @change="
              handleFilterChange(
                ($event.target as HTMLInputElement).checked,
                'inStock',
              )
            "
          />
        </div>
      </div>
      <div class="filters__actions">
        <ButtonUi
          class-name="filters__action"
          size="md"
          full-width
          @click="$emit('close-filters')"
        >
          Apply filters
        </ButtonUi>
        <ButtonUi
          class-name="filters__action"
          size="md"
          full-width
          @click="handleResetFilters"
        >
          Reset filters
        </ButtonUi>
      </div>
    </form>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ButtonUi } from '@shoppe/shared/ui';
import {
  SORTING_OPTIONS,
  type FiltersObject,
} from '../model/useCatalogFilters';
import { debounce } from '@shoppe/shared/utils';

const props = defineProps<{ modelValue: FiltersObject; className: string }>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: FiltersObject): void;
  (e: 'close-filters'): void;
}>();

const filtersClasses = computed(() => [props.className, 'filters']);

const searchValue = computed(() => props.modelValue?.searchQuery ?? '');
const sortValue = computed(() => props.modelValue?.sortBy ?? '');

function handleFilterChange<K extends keyof FiltersObject>(
  value: FiltersObject[K],
  field: K,
): void {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  });
}

const debouncedHandleFilterChange = debounce(
  (value: string | boolean, field: keyof FiltersObject) => {
    handleFilterChange(value, field);
  },
  1000,
);

function handleResetFilters(): void {
  emit('update:modelValue', {
    ...props.modelValue,
    searchQuery: '',
    sortBy: '',
    onSale: false,
    inStock: false,
  });
  emit('close-filters');
}
</script>

<style lang="scss" src="./AppCatalogFilters.scss"></style>
