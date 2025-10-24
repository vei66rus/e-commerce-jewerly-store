import type { ApiError } from './apiError.type';

export type ErrorResponse = {
  data: null;
  meta?: never;
  error: ApiError;
};

export type SuccessResponse<T, K = unknown> = {
  data: T;
  meta: K;
  error?: never;
};

export type DefaultApiResponse<T, K = undefined> =
  | ErrorResponse
  | SuccessResponse<T, K>;
