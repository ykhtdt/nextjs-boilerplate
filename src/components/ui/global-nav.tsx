'use client';

import { items } from '@/data/global-nav-items';

import Link from "next/link";
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

export default function GlobalNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <div className="relative h-full py-6 pr-6 overflow-hidden lg:py-8">
        <div className="h-full w-full rounded-[inherit]">
          <div className="table min-w-full">
            <div className="w-full">
              {items.map((item, i) => (
                <div className="pb-4" key={item.key}>
                  <h4 className="px-2 py-1 mb-1 text-sm font-semibold rounded-md">
                    {item.name}
                  </h4>
                  <div className="grid grid-flow-row text-sm auto-rows-max">
                    {item.subItem.map((sub, j) => {
                      const isActive = sub.href === pathname;

                      return (
                        <Link
                          href={sub.href}
                          className={clsx(
                            "flex items-center w-full px-2 py-1 border border-transparent rounded-md group hover:text-[#596FB7]", {
                            ['text-[#F6ECA9] font-medium']: isActive,
                            ['text-muted-foreground']: !isActive,
                          })}
                          key={sub.key}
                        >
                          {sub.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}