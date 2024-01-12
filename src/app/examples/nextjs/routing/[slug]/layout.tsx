"use client";

import { movieCategories } from "@/data/categories";

import Link from "next/link";
import { useParams, useSelectedLayoutSegments } from "next/navigation";

import clsx from "clsx";

import { Lock } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const segments = useSelectedLayoutSegments();

  return (
    <div className="p-4 space-y-4 border border-slate-600">
      <div className="flex items-center gap-4 px-2 py-2 text-sm">
        <Lock className="w-4 h-4" />
        <div>
          <span className="text-muted-foreground">jgpark.in</span>
        </div>
        <span className="text-slate-500">/</span>
        {segments.map((segment) => (
          <span className="text-slate-200" key={segment}>
            {segment}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4 px-2">
        {movieCategories.map((category) => (
          <Link
            href={`/examples/nextjs/routing/${params.slug}/${category.key}`}
            className={clsx("hover:bg-slate-500 transition-colors px-3 py-0.5 text-sm capitalize rounded-lg bg-slate-700 font-light", {
              ["bg-[#596FB7]"]: params.category === category.key,
            })}
            key={category.key}
          >
            {category.name}
          </Link>
        ))}
      </div>
      <div className="p-4 border border-dashed border-slate-600">{children}</div>
    </div>
  );
}
