"use client"

import { ReactNode } from 'react';

import { Provider, createStore, } from 'jotai'

const baseStore = createStore();

type Props = {
  store?: ReturnType<typeof createStore>;
  children: ReactNode;
}

export const ExampleProvider = ({ store, children }: Props) => {
  return <Provider store={store || baseStore}>{children}</Provider>;
};
