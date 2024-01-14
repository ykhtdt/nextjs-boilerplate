"use client";

import { movieCategories, apparelCategory } from "@/data/categories";

import Link from "next/link";
import { useParams } from "next/navigation";

import clsx from "clsx";

import { ClickCounter } from "@/components/ui/click-counter";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();

  const categories = params.category === "movie" ? movieCategories : apparelCategory;

  return (
    <div className="p-4 space-y-4 border border-zinc-600">
      <div className="flex items-center justify-between px-2">
        <div className="flex gap-4">
          <Link
            href={`/examples/nextjs/routing/nesting-layouts/${params.category}`}
            className={clsx("transition-colors px-3 py-0.5 text-sm capitalize rounded-lg font-light", {
              ["bg-zinc-700 hover:bg-zinc-500"]: params.subCategory,
              ["bg-[#5B9A8B]"]: !params.subCategory,
            })}
          >
            Home
          </Link>
          {categories.map((category) => (
            <Link
              href={`/examples/nextjs/routing/nesting-layouts/${params.category}/${category.key}`}
              className={clsx("transition-colors px-3 py-0.5 text-sm capitalize rounded-lg font-light", {
                ["bg-zinc-700 hover:bg-zinc-500"]: params.subCategory !== category.key,
                ["bg-[#5B9A8B]"]: params.subCategory === category.key,
              })}
              key={category.key}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <ClickCounter />
      </div>
      <div className="px-2">{children}</div>
    </div>
  );
}
