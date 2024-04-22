export function partPathToId(partPath: string): string {
  return partPath.substring(1).replace(/\//g, "-");
}

export function notNullOrUndefined<T>(val: T | null | undefined): val is T {
  return val !== null && val !== undefined;
}

export function notEmptyOrUndefined(str?: string | null): str is string {
  return str !== undefined && str !== null && str.length > 0;
}

export function isEmptyOrUndefined(str?: string | null): str is string {
  return str === undefined || str === null || str === "";
}

export function assertIsDefined<T>(value: T, name?: string): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`${name ?? value} is not defined`);
  }
}

export function objectKeys<Obj extends object>(obj: Obj): (keyof Obj)[] {
  return Object.keys(obj) as (keyof Obj)[];
}
