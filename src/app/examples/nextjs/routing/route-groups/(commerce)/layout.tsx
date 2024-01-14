"use client";

import { categories } from "@/data/categories";

import { useSelectedLayoutSegments } from "next/navigation";

import { Lock } from "lucide-react";

import { TabGroup } from "@/components/ui/tab-group";
import { ClickCounter } from "@/components/ui/click-counter";

export default function Layout({ children }: { children: React.ReactNode }) {
  const segments = useSelectedLayoutSegments();

  const segmentsWithoutRouteGroup = segments.filter(segment => !segment.includes("("))

  return (
    <div className="p-4 space-y-4 border border-zinc-600">
      <div className="flex items-center gap-4 px-2 py-2 text-sm">
        <Lock className="w-4 h-4" />
        <div>
          <span className="text-muted-foreground">jgpark.in</span>
        </div>
        <span className="text-zinc-500">/</span>
        {segmentsWithoutRouteGroup.map((segment) => (
          <>
            <span className="text-zinc-200" key={segment}>
              {segment}
            </span>
            <span className="text-zinc-500">/</span>
          </>
        ))}
      </div>
      <div className="flex items-center justify-between px-2">
        <TabGroup
          path={`/examples/nextjs/routing/route-groups`}
          items={[
            {
              key: 'home',
              name: 'Home',
            },
            ...categories.map((c) => ({
              key: c.key,
              name: c.name,
              slug: c.key,
            })),
            {
              key: 'checkout',
              name: 'Checkout',
              slug: 'checkout',
            },
            {
              key: 'campaign',
              name: 'Campaign',
              slug: 'checkout',
            },
          ]}
        />
        <ClickCounter />
      </div>
      <div className="px-2">
        {children}
      </div>
    </div>
  );
}
