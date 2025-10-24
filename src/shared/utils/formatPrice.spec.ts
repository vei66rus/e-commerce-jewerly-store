import { expect, test } from 'vitest';
import { formatPrice } from './formatPrice';

test('12 like number must be return 12,00 like string', () => {
  expect(formatPrice(12)).toBe('12,00');
});
