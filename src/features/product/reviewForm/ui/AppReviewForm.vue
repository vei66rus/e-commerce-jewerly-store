<template>
  <form :class="reviewFormClasses">
    <h4 class="review-form__title">Add a Review</h4>
    <p class="review-form__note">Required Fields Are Markered *</p>
    <div :class="reviewInputWrapperClasses">
      <label for="review">Your Review*</label>
      <input
        type="text"
        id="review"
        v-model="formData.review.value"
        @focusout="formData.review.isTouched = true"
      />
    </div>
    <div :class="nameInputWrapperClasses">
      <label for="name">Enter your name*</label>
      <input
        type="text"
        id="name"
        v-model="formData.name.value"
        @focusout="formData.name.isTouched = true"
      />
    </div>
    <div class="review-form__checkbox-input">
      <input
        type="checkbox"
        id="remember"
        v-model="formData.rememberMe.value"
      />
      <label for="remember">
        Save my name, and website in this browser for the next time I comment
      </label>
    </div>
    <div :class="ratingInputWrapperClasses">
      <span>Your Rating*</span>
      <RatingUi
        v-model="formData.rating.value"
        @click="formData.rating.isTouched = true"
      />
    </div>
    <ButtonUi
      class-name="review-form__button"
      :size="submitFormBtnSize"
      :full-width="isMobileDevice"
      filled
      @click="handleSubmitForm"
    >
      Submit
    </ButtonUi>
  </form>
</template>

<script setup lang="ts">
import { ref, toRaw, computed, watch, onMounted, inject } from 'vue';
import { RatingUi, ButtonUi } from '@shoppe/shared/ui';
import { useWindowSize } from '@shoppe/shared/lib';
import { useReviewFormStore } from '../model/useReviewFormStore';
import type { ReviewFormData, AddReviewFn } from '@shoppe/shared/types';
import { sumbitReviewKey } from '@shoppe/entities/reviewForm';

const props = defineProps({ className: String });

const submitReview = inject<AddReviewFn>(sumbitReviewKey);

const { isMobileDevice } = useWindowSize();
const reviewFormStore = useReviewFormStore();

type FormDataFieldData<T> = {
  value: T;
  isTouched: boolean;
};

type FormDataLocalState = {
  review: FormDataFieldData<string>;
  name: FormDataFieldData<string>;
  rememberMe: Omit<FormDataFieldData<boolean>, 'isTouched'>;
  rating: FormDataFieldData<number>;
};

const formDataInitialState: FormDataLocalState = {
  review: {
    value: '',
    isTouched: false,
  },
  name: {
    value: '',
    isTouched: false,
  },
  rememberMe: {
    value: false,
  },
  rating: {
    value: 0,
    isTouched: false,
  },
};

const formData = ref<FormDataLocalState>(formDataInitialState);

onMounted(() => {
  if (reviewFormStore.name) {
    formData.value.name.value = reviewFormStore.name;
    formData.value.rememberMe.value = true;
  }
});

const isFormValid = computed(
  () =>
    !!formData.value.review.value &&
    !!formData.value.name.value &&
    !!formData.value.rating.value,
);

const reviewFormClasses = computed(() => [
  props.className,
  'review-form',
  {
    'review-form--invalid':
      !isFormValid.value &&
      formData.value.review.isTouched &&
      formData.value.name.isTouched &&
      formData.value.rating.isTouched,
  },
]);

const reviewInputWrapperClasses = computed(() => [
  'review-form__text-input',
  {
    'review-form__text-input--dirty': formData.value.review.value,
    'review-form__text-input--invalid':
      !formData.value.review.value && formData.value.review.isTouched,
  },
]);

const nameInputWrapperClasses = computed(() => [
  'review-form__text-input',
  {
    'review-form__text-input--dirty': formData.value.name.value,
    'review-form__text-input--invalid':
      !formData.value.name.value && formData.value.name.isTouched,
  },
]);

const ratingInputWrapperClasses = computed(() => [
  'review-form__rating-input',
  {
    'review-form__rating-input--invalid':
      !formData.value.rating.value && formData.value.rating.isTouched,
  },
]);

const submitFormBtnSize = computed(() => (isMobileDevice ? 'sm' : 'md'));

watch(
  () => [formData.value.name.value, formData.value.rememberMe.value],
  ([nameValue, rememberMeValue]) => {
    if (rememberMeValue && typeof nameValue === 'string') {
      reviewFormStore.name = nameValue;
    } else {
      reviewFormStore.name = '';
    }
  },
);

function handleSubmitForm() {
  if (isFormValid.value) {
    const formDataToSubmit = Object.fromEntries(
      Object.entries(toRaw(formData.value)).map(([key, obj]) => [
        key,
        obj.value,
      ]),
    );

    if (isCompleteFormData(formDataToSubmit)) {
      submitReview!(formDataToSubmit);
      formData.value.review.value = '';
      formData.value.rating.value = 0;
      if (!formData.value.rememberMe.value) formData.value.name.value = '';
    }
  } else {
    formData.value.review.isTouched = true;
    formData.value.name.isTouched = true;
    formData.value.rating.isTouched = true;
  }
}

function isCompleteFormData(formData: unknown): formData is ReviewFormData {
  if (
    typeof formData === 'object' &&
    formData !== null &&
    'review' in formData &&
    'name' in formData &&
    'rating' in formData
  ) {
    const data = formData as Record<string, unknown>;

    return (
      typeof data.review === 'string' &&
      typeof data.name === 'string' &&
      typeof data.rating === 'number'
    );
  }

  return false;
}
</script>

<style lang="scss" src="./AppReviewForm.scss"></style>
