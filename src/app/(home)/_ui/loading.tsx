"use client";

import { useSetAtom } from "jotai";
import { homeAtom } from "@/state/atom/home";

import { Button } from "@/components/ui/button";

export default function Loading() {
  const setHomeValue = useSetAtom(homeAtom);

  const handleClick = () => {
    setHomeValue({
      isStarted: true,
    });
  };

  return (
    <div className="relative z-10 flex items-center justify-center w-full h-full min-h-screen">
      <div className="w-full h-full mx-auto max-w-7xl">
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={handleClick}
            className="relative px-2 text-lg uppercase before:absolute before:left-0 before:bottom-0 before:w-full before:bg-blue-700 before:z-10 before:h-[4px] before:scale-x-0 before:transition-transform hover:before:scale-100 hover:bg-transparent"
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}
