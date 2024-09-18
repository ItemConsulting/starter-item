type KeyValuePair<K extends string | number | symbol, V> = [K, V];

export const dict = <K extends string | number | symbol, V>(arr: KeyValuePair<K, V>[]): Record<K, V> => Object.fromEntries(arr) as Record<K, V>;

