"use client"

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import clsx from "clsx";

export interface Item {
  key: string;
  name: string;
  slug?: string;
  segment?: string;
}

export interface TabGroupProps {
  path: string;
  items: Item[];
}

export function TabGroup({ path, items }: TabGroupProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {items.map((item) => (
        <Tab
          path={path}
          item={item}
          key={path + `_${item.key}`}
        />
      ))}
    </div>
  )
}

export interface TabProps {
  path: string;
  item: Item;
}

export function Tab({ path, item }: TabProps) {
  const segment = useSelectedLayoutSegment();

  const href = !item.slug ? path : path + `/${item.key}`;

  const isActive = segment === null && !item.slug || segment === item.slug;

  return (
    <Link
      href={href}
      className={clsx("transition-colors px-3 py-0.5 text-sm capitalize rounded-lg font-light", {
        ["bg-zinc-700 hover:bg-zinc-500"]: !isActive,
        ["bg-[#5B9A8B]"]: isActive,
      })}
    >
      {item.name}
    </Link>
  )
}