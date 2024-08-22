import type { UnionToIntersection } from "@/(shared)/lib/utility-types"

type BaseProps = {
  children: React.ReactNode;
};

export type LayoutProps<Params = undefined> = Params extends undefined
  ? BaseProps & { params?: {} }
  : BaseProps & { params: Params };

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
