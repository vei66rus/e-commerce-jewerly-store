<template>
  <div v-if="isGalleryShown" :class="imageGalleryClasses">
    <div class="image-gallery__thumbnails">
      <img
        class="image-gallery__thumbnail"
        v-for="(url, index) of galleryState.thumbnails"
        :key="url!"
        :src="url!"
        alt="product picture"
        @click="handleChangeImage(index)"
      />
    </div>
    <img
      class="image-gallery__title-image"
      :src="galleryState.mainImage!"
      alt="product picture"
    />
  </div>
</template>

<script setup lang="ts">
import type { ProductImagesObject } from '@shoppe/entities/product';
import { ref, watch, computed } from 'vue';

const props = defineProps<{
  className?: string;
  images: ProductImagesObject;
}>();

const galleryState = ref<{
  mainImage: string | null;
  thumbnails: (string | null)[];
}>({
  mainImage: null,
  thumbnails: [],
});

watch(
  () => props.images,
  (imagesData) => {
    galleryState.value.mainImage = imagesData.primaryImage;
    galleryState.value.thumbnails = imagesData.secondaryImages;
  },
  { immediate: true },
);

function handleChangeImage(index: number) {
  galleryState.value.mainImage = galleryState.value.thumbnails.splice(
    index,
    1,
    galleryState.value.mainImage,
  )[0];
}

const imageGalleryClasses = computed<(string | undefined)[]>(() => [
  props.className,
  'image-gallery',
]);

const isGalleryShown = computed<boolean>(
  () =>
    !!galleryState.value.mainImage && galleryState.value.thumbnails.length > 0,
);
</script>

<style lang="scss" src="./AppImagesGallery.scss"></style>
