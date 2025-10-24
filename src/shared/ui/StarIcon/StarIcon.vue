<template>
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="black"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <defs>
      <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="50%" stop-color="black" />
        <stop offset="50%" stop-color="transparent" />
      </linearGradient>
    </defs>
    <path
      d="
        M9 0.886475C9.16051 0.886475 9.30671 0.969445 9.38965 1.10425L9.4209 
        1.16479L11.4746 5.97144L11.5918 6.24585L11.8887 6.27319L17.085 
        6.74487C17.2437 6.75924 17.3822 6.85507 17.4521 6.99585L17.4775 
        7.05835C17.5274 7.21212 17.4931 7.37714 17.3916 7.49683L17.3438 
        7.54468L13.416 10.989L13.1924 11.1853L13.2588 11.4763L14.416 
        16.575V16.5759C14.4518 16.7341 14.4029 16.8952 14.291 17.0046L14.2393 
        17.0486C14.1093 17.1427 13.9419 17.1611 13.7969 17.1013L13.7363 
        17.071L9.25684 14.3923L9 14.239L8.74316 14.3923L4.2627 17.071C4.19034 
        17.1143 4.10987 17.1354 4.0293 17.1355C3.95871 17.1355 3.88832 17.12 
        3.82422 17.0876L3.76172 17.0496L3.76074 17.0486L3.70898 17.0046C3.59712 
        16.8952 3.54824 16.7341 3.58398 16.5759L3.58301 16.575L4.74121 
        11.4763L4.80762 11.1853L4.58398 10.989L0.65625 7.54468C0.518906 7.42422 
        0.465936 7.23398 0.522461 7.05933C0.579966 6.88445 0.734493 6.76162 
        0.916016 6.74487L0.915039 6.7439L6.1123 6.27319L6.40918 6.24585L6.52637 
        5.97144L8.58008 1.16382C8.65213 0.994895 8.81634 0.886484 9 0.886475Z
      "
      :fill="computedFill"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ state: string }>();

const gradientId: string = 'half-filled-gradient';
const mainColor: string = 'black';

const computedFill = computed<string>(() => {
  if (props.state === 'filled') return mainColor;
  if (props.state === 'half') return `url(#${gradientId})`;
  return 'none';
});
</script>
