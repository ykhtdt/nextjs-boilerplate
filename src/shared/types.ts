type BaseProps = {
  children: React.ReactNode;
};

export type LayoutProps<Params = undefined> = Params extends undefined
  ? BaseProps & { params?: {} }
  : BaseProps & { params: Params };
