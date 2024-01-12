"use client"

import { movieCategories, clothinglCategory } from "@/data/categories";

import Link from "next/link";
import { useParams } from "next/navigation";

import clsx from "clsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();

  const categories = params.category === 'movie' ? movieCategories : clothinglCategory;

  return (
    <div className="p-4 space-y-4 border border-slate-600">
      <div className="flex items-center gap-4 px-2">
        <Link
          href={`/examples/nextjs/routing/${params.slug}/${params.category}`}
          className={clsx("hover:bg-slate-500 transition-colors px-3 py-0.5 text-sm capitalize rounded-lg font-light", {
            ["bg-slate-700"]: params.category,
            ["bg-[#596FB7]"]: !params.category,
          })}

        >
          Home
        </Link>
        {categories.map((category) => (
          <Link
            href={`/examples/nextjs/routing/${params.slug}/${params.category}/${category.key}`}
            className={clsx("hover:bg-slate-500 transition-colors px-3 py-0.5 text-sm capitalize rounded-lg font-light", {
              ["bg-slate-700"]: params.category !== category.key,
              ["bg-[#596FB7]"]: params.category === category.key,
            })}
            key={category.key}
          >
            {category.name}
          </Link>
        ))}
      </div>
      <div className="px-2">{children}</div>
    </div>
  )
}