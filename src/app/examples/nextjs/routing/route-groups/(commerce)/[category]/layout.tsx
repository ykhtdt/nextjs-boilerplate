"use client";

import { movieCategories, apparelCategory } from "@/data/categories";

import { useParams } from "next/navigation";

import { TabGroup } from "@/components/ui/tab-group";
import { ClickCounter } from "@/components/ui/click-counter";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();

  const categories = params.category === "movie" ? movieCategories : apparelCategory;

  return (
    <div className="p-4 space-y-4 border border-zinc-600">
      <div className="flex items-center justify-between px-2">
        <TabGroup
          path={`/examples/nextjs/routing/route-groups/${params.category}`}
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
          ]}
        />
        <ClickCounter />
      </div>
      <div className="px-2">{children}</div>
    </div>
  );
}
