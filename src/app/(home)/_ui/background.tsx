"use client";

import { useEffect, useState } from "react";

import ReactPlayer from "react-player";

import { useAtomValue } from "jotai";
import { homeAtom } from "@/state/atom/home";

export default function Background() {
  const { isStarted } = useAtomValue(homeAtom);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if (isStarted) {
      setPlaybackRate(5);
    }

    const reset = setTimeout(() => {
      setPlaybackRate(1);
    }, 2000);

    return () => {
      if (isStarted) {
        reset;
      }

      if (!isStarted) {
        clearTimeout(reset);
      }
    };
  }, [isStarted]);

  if (isMounted) {
    return (
      <div className="fixed inset-0 w-screen min-h-screen h-screen-dvh -z-50">
        <div className="fixed inset-0 w-screen min-h-screen pointer-events-none h-screen-dvh">
          <div className="w-full h-full [&_video]:w-full [&_video]:h-full [&_video]:m-auto [&_video]:object-cover [&_video]:bg-[50%] [&_video]:bg-cover [&_video]:-top-full [&_video]:-bottom-full [&_video]:-left-full [&_video]:-right-full">
            <ReactPlayer
              url={["/intro/space.webp", "/intro/space.mp4"]}
              width="100%"
              height="100%"
              playing
              muted
              loop
              playsinline
              playbackRate={playbackRate}
              style={{ backgroundImage: "url(/intro/space.png)", backgroundPosition: "50%" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 w-screen min-h-screen h-screen-dvh"
      style={{ backgroundImage: "url(/intro/space.png)", backgroundPosition: "50%" }}
    />
  );
}
