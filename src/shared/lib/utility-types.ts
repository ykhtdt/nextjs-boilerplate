export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type UnionToIntersection<T> = Prettify<
  (T extends any ? (x: T) => any : never) extends (x: infer R) => any
  ? R
  : never
>;
