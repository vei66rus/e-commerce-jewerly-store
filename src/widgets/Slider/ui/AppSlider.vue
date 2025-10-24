<template>
  <section class="slider">
    <Swiper
      class="slider__container container"
      :modules="[Manipulation, Pagination, Autoplay]"
      loop
      :autoplay="{ delay: 5000 }"
      :pagination="paginationConfig"
    >
      <SwiperSlide
        v-for="slide in props.slidesData"
        :key="slide.id"
        class="slider__item slide"
        :style="getSliderBgStyle(slide.desktopImage)"
      >
        <h3 class="slide__title">{{ slide.product.title }}</h3>
        <span class="slide__price">
          &dollar; {{ formatPrice(slide.product.price) }}
        </span>
        <ButtonUi
          :size="btnSize"
          white
          @click="router.push(`/products/${slide.product.documentId}`)"
        >
          View Product
        </ButtonUi>
      </SwiperSlide>
      <div class="slider__control"></div>
    </Swiper>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Manipulation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ButtonUi } from '@shoppe/shared/ui';
import { useWindowSize } from '@shoppe/shared/lib';
import { formatPrice } from '@shoppe/shared/utils';
import type { PopulatedSlide } from '@shoppe/shared/types';
import type { PaginationOptions } from 'swiper/types';

type AppSliderProps = {
  slidesData: PopulatedSlide[];
};

const props = defineProps<AppSliderProps>();

const { isMobileDevice } = useWindowSize();

const paginationConfig: PaginationOptions = {
  el: '.slider__control',
  bulletClass: 'slider__controller',
  bulletActiveClass: 'slider__controller--active',
  clickable: true,
  renderBullet: function (_: number, className: string): string {
    return `<button class="${className}"></button>`;
  },
};

const router = useRouter();

const btnSize = computed(() => (isMobileDevice.value ? 'sm' : 'lg'));

const getSliderBgStyle = (url: string) => ({
  'background-image': 'url(' + url + ')',
});
</script>

<style lang="scss" src="./AppSlider.scss"></style>
