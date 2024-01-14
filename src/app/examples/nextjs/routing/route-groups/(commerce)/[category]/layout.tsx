"use client";

import { movieCategories, apparelCategory } from "@/data/categories";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import clsx from "clsx";

import { Button } from "@/components/ui/button";
import { TabGroup } from "@/components/ui/tab-group";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();

  const categories = params.category === "movie" ? movieCategories : apparelCategory;

  const [clicks, setClicks] = useState(0);

  const handleClick = useCallback(() => {
    setClicks((prev) => prev + 1);
  }, []);

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
        <Button variant="secondary" size="sm" onClick={handleClick} className="hover:bg-zinc-500 transition-colors px-3 py-0.5 text-sm capitalize rounded-lg font-light">
          {clicks} Clicks
        </Button>
      </div>
      <div className="px-2">{children}</div>
    </div>
  );
}
