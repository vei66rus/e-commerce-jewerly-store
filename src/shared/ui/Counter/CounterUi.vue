<template>
  <div class="counter">
    <button
      class="counter__decrease"
      @click="handleDecreaseCount"
      :disabled="props.modelValue <= 1"
    >
      -
    </button>
    <input
      class="counter__input"
      type="text"
      :value="props.modelValue"
      @input="handleInputChange"
      disabled
    />
    <button
      class="counter__increase"
      @click="handleIncreaseCount"
      :disabled="props.modelValue >= props.maxValue"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: number; maxValue: number }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>();

function handleInputChange(event: Event): void {
  const newValue = parseInt((event.target as HTMLInputElement).value, 10);
  emit('update:modelValue', newValue);
}

function handleIncreaseCount(): void {
  emit('update:modelValue', props.modelValue + 1);
}

function handleDecreaseCount(): void {
  emit('update:modelValue', props.modelValue - 1);
}
</script>

<style lang="scss" src="./CounterUi.scss"></style>
