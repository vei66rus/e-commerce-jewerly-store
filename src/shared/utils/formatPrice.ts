export function formatPrice(value: number): string {
  return value.toFixed(2).split('.').join(',');
}
