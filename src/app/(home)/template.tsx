"use client";

import { ReactNode, Fragment } from "react";

import { useAtomValue } from "jotai";
import { homeAtom } from "@/state/atom/home";

import Background from "./_ui/background";
import Loading from "./_ui/loading";

export default function HomeTemplate({ children }: { children: ReactNode }) {
  const { isStarted } = useAtomValue(homeAtom);

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
