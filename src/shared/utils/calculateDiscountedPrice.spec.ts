import { expect, test } from 'vitest';
import { calculateDiscountedPrice } from './calculateDiscountedPrice';

test('Price 100 with discount 10 must be result 90', () => {
  expect(calculateDiscountedPrice(100, 10)).toBe(90);
});
