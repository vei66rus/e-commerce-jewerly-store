import type { Product } from './product.type';
import type { ProductReview } from './productReview.type';
import type { ProductCover } from './productCover.type';
import type { ProductCategory } from './productCategory.type';

export interface PopulatedProduct extends Product {
  reviews: ProductReview[];
  cover: ProductCover;
  categories: ProductCategory[];
}
