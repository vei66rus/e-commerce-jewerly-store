import type {
  DefaultApiResponse,
  SuccessResponse,
  PopulatedSlide,
  Pagination,
  FiltersParams,
  Product,
  PopulatedProduct,
  PostReviewPayload,
  ProductReview,
} from '@shoppe/shared/types';

export type GetSlidesResponse = DefaultApiResponse<
  PopulatedSlide[],
  { pagination: Pagination }
>;

export type GetSlidesResult = SuccessResponse<
  PopulatedSlide[],
  { pagination: Pagination }
>;

export type GetSlidesFn = () => Promise<GetSlidesResult>;

export type GetCatalogResponse = DefaultApiResponse<
  Product[],
  { pagination: Pagination }
>;

export type GetCatalogResult = SuccessResponse<
  Product[],
  { pagination: Pagination }
>;

export type GetCatalogFn = (
  params?: Partial<FiltersParams>,
) => Promise<GetCatalogResult>;

export type GetProductInfoResponse = DefaultApiResponse<PopulatedProduct>;

export type GetProductInfoResult = SuccessResponse<PopulatedProduct>;

export type GetProductInfoFn = ({
  documentId,
}: {
  documentId: string;
}) => Promise<GetProductInfoResult>;

export type PostReviewResponse = DefaultApiResponse<ProductReview>;

export type PostReviewResult = SuccessResponse<ProductReview>;

export type PostReviewFn = (
  data: PostReviewPayload,
) => Promise<PostReviewResult>;
