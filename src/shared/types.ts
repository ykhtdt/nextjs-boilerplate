type BaseProps = {
  children: React.ReactNode;
};

export type LayoutProps<Params = undefined> = Params extends undefined
  ? BaseProps & { params?: {} }
  : BaseProps & { params: Params };

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type UnionToIntersection<T> = Prettify<
  (T extends any ? (x: T) => any : never) extends (x: infer R) => any
  ? R
  : never
>;

export type PageProps<
  TParams extends string = never,
  TSearchParams extends string = never
> = {
  params: UnionToIntersection<
    {
      [K in TParams]: {
        [F in K extends `...${infer U}` ? U : K]: K extends `...${string}`
        ? string[]
        : string;
      };
    }[TParams]
  >;
  searchParams: { [K in TSearchParams]?: string | string[] };
}
