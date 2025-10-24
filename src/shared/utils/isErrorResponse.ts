import type {
  DefaultApiResponse,
  ErrorResponse,
} from '@shoppe/shared/types';

export function isErrorResponse<T, K>(
  response: DefaultApiResponse<T, K>,
): response is ErrorResponse {
  return response.data === null && typeof response.error === 'object';
}
