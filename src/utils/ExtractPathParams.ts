export type ExtractPathParams<T extends string> =
  T extends `${string}/:${infer Param}/${infer Rest}`
    ? { [K in Param]: string | number } & ExtractPathParams<`/${Rest}`>
    : T extends `${string}/:${infer Param}`
    ? { [K in Param]: string | number }
    : {};
