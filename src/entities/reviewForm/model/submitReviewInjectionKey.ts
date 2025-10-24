import type { AddReviewFn } from '@shoppe/shared/types/addReviewFn.type';
import type { InjectionKey } from 'vue';

const sumbitReviewKey = Symbol() as InjectionKey<AddReviewFn>;

export default sumbitReviewKey;
