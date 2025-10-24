import type { Product } from './product.type';
import type { Slide } from './slide.type';

export interface PopulatedSlide extends Slide {
  product: Product;
}
