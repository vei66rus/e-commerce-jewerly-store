import type { ReviewFormData } from "./reviewFormData.type";

export type AddReviewFn = (params: ReviewFormData) => Promise<void>;