"use client";

import { ReactNode } from "react";

import { Provider, createStore } from "jotai";

// import { loadingAtom } from "./atom/loading";

const store = createStore();
// store.set(loadingAtom, { isStarted: false });

export const CustomProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
