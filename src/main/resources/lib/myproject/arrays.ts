export function forceArray<A>(data: A | Array<A> | undefined | null): Array<A>;
export function forceArray<A>(data: A | ReadonlyArray<A> | undefined | null): ReadonlyArray<A>;
export function forceArray<A>(data: A | Array<A> | undefined | null): ReadonlyArray<A> {
  data = data ?? [];
  return Array.isArray(data) ? data : [data];
}

/**
 * Returns the first value from an Array that matches a predicate
 */
export function find<T, S extends T>(arr: T[], predicate: (value: T) => value is S): S | undefined;
export function find<T>(arr: T[], predicate: (value: T) => boolean): T | undefined;
export function find<T>(arr: T[], predicate: (value: T) => boolean): T | undefined {
  for (const arrItem of arr) {
    if (predicate(arrItem)) {
      return arrItem;
    }
  }
}
