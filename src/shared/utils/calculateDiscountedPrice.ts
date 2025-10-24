export function calculateDiscountedPrice(
  rawPrice: number,
  discountPercent: number,
): number {
  return rawPrice - rawPrice * ((discountPercent || 0) / 100);
}
