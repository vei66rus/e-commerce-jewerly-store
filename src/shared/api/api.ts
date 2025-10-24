import { isErrorResponse } from '@shoppe/shared/utils';
import * as ApiTypes from './api.types';

const BASE_URL: string = 'https://api.dev.cwe.su/api';

class ApiRequestError extends Error {
  private readonly _status: number;

  constructor(status: number, name: string, message: string) {
    super(message);
    this.name = name;
    this._status = status;
  }

  get errorMessage(): string {
    return `Error. Status: ${this._status} | Name: ${this.name} | Message: ${this.message}`;
  }
}

const getSlides: ApiTypes.GetSlidesFn = async () => {
  const response = await fetch(`${BASE_URL}/promos/?populate=*`);
  const result: ApiTypes.GetSlidesResponse = await response.json();

  if (isErrorResponse(result))
    throw new ApiRequestError(
      result.error.status,
      result.error.name,
      result.error.message,
    );

  return result;
};

const getCatalog: ApiTypes.GetCatalogFn = async ({
  page = 1,
  limit = 6,
  search = '',
  sort = '',
  onSale = false,
  inStock = false,
} = {}) => {
  const params: URLSearchParams = new URLSearchParams();

  params.append('pagination[page]', page.toString());
  params.append('pagination[pageSize]', limit.toString());

  if (search) params.append('filters[title][$containsi]', search);
  if (onSale) params.append('filters[discountPercent][$gt]', String(0));
  if (inStock) params.append('filters[itemsInStock][$gt]', String(0));
  if (sort) params.append('sort', sort);

  const response = await fetch(`${BASE_URL}/products/?${params.toString()}`);
  const result: ApiTypes.GetCatalogResponse = await response.json();

  if (isErrorResponse(result))
    throw new ApiRequestError(
      result.error.status,
      result.error.name,
      result.error.message,
    );

  return result;
};

const getProductInfo: ApiTypes.GetProductInfoFn = async ({ documentId }) => {
  const response = await fetch(`${BASE_URL}/products/${documentId}?populate=*`);
  const result: ApiTypes.GetProductInfoResponse = await response.json();

  if (isErrorResponse(result))
    throw new ApiRequestError(
      result.error.status,
      result.error.name,
      result.error.message,
    );

  return result;
};

const postReview: ApiTypes.PostReviewFn = async (data) => {
  const response = await fetch(`${BASE_URL}/reviews/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  const result: ApiTypes.PostReviewResponse = await response.json();

  if (isErrorResponse(result))
    throw new ApiRequestError(
      result.error.status,
      result.error.name,
      result.error.message,
    );

  return result;
};

export { ApiRequestError, getSlides, getCatalog, getProductInfo, postReview };
