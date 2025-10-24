export type PostReviewData = {
  text: string;
  author: string;
  rate: number;
  product: string;
};

export type PostReviewPayload = {
  data: PostReviewData;
};
