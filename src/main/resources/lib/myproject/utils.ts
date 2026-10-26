export function notNullOrUndefined<T>(val: T | null | undefined): val is T {
  return val !== null && val !== undefined;
}

export function assertIsDefined<T>(value: T, name?: string): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`${name ?? value} is not defined`);
  }
}
