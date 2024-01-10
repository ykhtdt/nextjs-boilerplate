"use client";

import { useSetAtom } from "jotai";
import { loadingAtom } from "@/state/atom/loading";

import styles from "./loading.module.scss";

export default function Loading() {
  const setIntroValue = useSetAtom(loadingAtom);

  const handleClick = () => {
    setIntroValue({
      isStarted: true,
    });
  };

  return (
    <div className="relative z-10 flex items-center justify-center w-full h-full min-h-screen">
      <div className="w-full h-full mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <button className={styles.button} onClick={handleClick} type="button">
            start
          </button>
        </div>
      </div>
    </div>
  );
}
