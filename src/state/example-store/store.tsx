"use client"

import { ReactNode } from 'react';

import { Provider, createStore } from 'jotai'

const store = createStore();

export const ExampleProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
