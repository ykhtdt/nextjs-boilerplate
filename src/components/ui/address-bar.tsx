"use client";

import { Fragment } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

import { Lock } from "lucide-react";

export function AddressBar() {
  const segments = useSelectedLayoutSegments();

  const segmentsWithoutRouteGroup = segments.filter((segment) => !segment.includes("("));

  return (
    <div className="flex items-center gap-4 px-2 py-2 text-sm">
      <Lock className="w-4 h-4" />
      <div>
        <span className="text-muted-foreground">jgpark.in</span>
      </div>
      <span className="text-zinc-500">/</span>
      {segmentsWithoutRouteGroup.map((segment) => (
        <Fragment key={segment}>
          <span className="text-zinc-200">
            {segment}
          </span>
          <span className="text-zinc-500">/</span>
        </Fragment>
      ))}
    </div>
  );
}
