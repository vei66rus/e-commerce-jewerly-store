export function debounce<Args extends unknown[], This = unknown>(
  fn: (this: This, ...args: Args) => void,
  delay: number = 500,
) {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: This, ...args: Args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
