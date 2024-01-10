"use client";

import { ReactNode, Fragment } from "react";

import { useAtomValue } from "jotai";
import { loadingAtom } from "@/state/atom/loading";

import Background from "./_components/background";
import Loading from "./_components/loading";

export default function HomeTemplate({ children }: { children: ReactNode }) {
  const { isStarted } = useAtomValue(loadingAtom);

  if (!isStarted) {
    return (
      <Fragment>
        <Loading />
        <Background />
      </Fragment>
    );
  }

  return (
    <Fragment>
      {children}
      <Background />
    </Fragment>
  );
}
