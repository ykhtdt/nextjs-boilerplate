"use client";

import { movieCategories, apparelCategory } from "@/data/categories";

import { useParams } from "next/navigation";

import { ClickCounter } from "@/components/ui/click-counter";
import { BadgeLayout } from "@/components/layout/badge-layout";
import { TabGroup } from "@/components/ui/tab-group";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();

  const categories = params.category === "movie" ? movieCategories : apparelCategory;

  return (
    <BadgeLayout display="Children Layout">
      <div className="flex items-center justify-between px-2">
        <TabGroup
          path={`/docs/nextjs/routing/nesting-layouts/${params.category}`}
          items={[
            {
              key: "home",
              name: "Home",
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
    </BadgeLayout>
  );
}
