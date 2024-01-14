"use client";

import { categories } from "@/data/categories";

import Link from "next/link";
import { useParams, useSelectedLayoutSegments } from "next/navigation";

import clsx from "clsx";
import { Lock } from "lucide-react";

import { ClickCounter } from "@/components/ui/click-counter";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const segments = useSelectedLayoutSegments();

  return (
    <div className="p-4 space-y-4 border border-zinc-600">
      <div className="flex items-center gap-4 px-2 py-2 text-sm">
        <Lock className="w-4 h-4" />
        <div>
          <span className="text-muted-foreground">jgpark.in</span>
        </div>
        <span className="text-zinc-500">/</span>
        {segments.map((segment) => (
          <>
            <span className="text-zinc-200" key={segment}>
              {segment}
            </span>
            <span className="text-zinc-500">/</span>
          </>
        ))}
      </div>
      <div className="flex items-center justify-between px-2">
        <div className="flex gap-4">
          <Link
            href="/examples/nextjs/routing/nesting-layouts"
            className={clsx("transition-colors px-3 py-0.5 text-sm capitalize rounded-lg font-light", {
              ["bg-zinc-700 hover:bg-zinc-500"]: params.category,
              ["bg-[#5B9A8B]"]: !params.category,
            })}
          >
            Home
          </Link>
          {categories.map((category) => (
            <Link
              href={`/examples/nextjs/routing/nesting-layouts/${category.key}`}
              className={clsx("transition-colors px-3 py-0.5 text-sm capitalize rounded-lg font-light", {
                ["bg-zinc-700 hover:bg-zinc-500"]: params.category !== category.key,
                ["bg-[#5B9A8B]"]: params.category === category.key,
              })}
              key={category.key}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <ClickCounter />
      </div>
      <div className="px-2">
        {children}
      </div>
    </div>
  );
}
