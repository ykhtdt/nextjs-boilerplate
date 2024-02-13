"use client";

import { useEffect, useState } from "react";

export default function Background() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted) {
    return (
      <div className="fixed inset-0 w-screen min-h-screen h-screen-dvh -z-50">
        <div className="fixed inset-0 w-screen min-h-screen pointer-events-none h-screen-dvh">
          <div className="w-full h-full [&_video]:w-full [&_video]:h-full [&_video]:m-auto [&_video]:object-cover [&_video]:bg-[50%] [&_video]:bg-cover [&_video]:-top-full [&_video]:-bottom-full [&_video]:-left-full [&_video]:-right-full">
            <video autoPlay muted loop playsInline style={{ backgroundImage: "url(/intro/space.png)", backgroundPosition: "50%" }}>
              <source src="/intro/space.webp" />
              <source src="/intro/space.mp4" />
            </video>
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
