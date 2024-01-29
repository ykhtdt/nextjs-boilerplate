"use client";

import { items } from "@/data/global-nav-items";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface GlobalNavAccordionContent {
  key: string;
  name: string;
  slug: string;
}

export interface GlobalNavAccordionTrigger {
  key: string;
  name: string;
  href: string;
}

export interface GlobalNavAccordionProps {
  trigger: GlobalNavAccordionTrigger;
  item: GlobalNavAccordionContent[];
}

export default function GlobalNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full md:sticky md:block">
      <div className="relative h-full py-8 overflow-hidden">
        <div className="h-full w-full rounded-[inherit] mt-2">
          <div className="table min-w-full">
            <div className="w-full">
              {items.map((item) => (
                <div className="pb-4" key={item.key}>
                  <div className="px-2 mb-2 text-sm font-semibold rounded-md">{item.name}</div>
                  <div className="grid grid-flow-row text-sm auto-rows-max px-0.5">
                    {item.subItem.map((sub) => {
                      const isActive = sub.href === pathname;

                      if (sub.children && sub.children.length > 0) {
                        const props = { key: sub.key, name: sub.name, href: sub.href };

                        return <GlobalNavAccordion item={sub.children} trigger={props} key={sub.key} />;
                      }

                      return (
                        <Link
                          href={sub.href}
                          className={clsx("flex items-center w-full px-2 py-1 rounded-md hover:text-teal-700 hover:font-medium", {
                            ["text-yellow-200 font-medium"]: isActive,
                            ["text-muted-foreground"]: !isActive,
                          })}
                          key={sub.key}
                        >
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function GlobalNavAccordion({ trigger, item }: GlobalNavAccordionProps) {
  const pathname = usePathname();
  const [value, setValue] = useState<string[]>([]);

  const handleValueChange = useCallback((value: string[]) => {
    setValue(value);
  }, []);

  useEffect(() => {
    if (pathname.includes(trigger.href)) {
      setValue([trigger.key]);
    } else {
      setValue([]);
    }
  }, [trigger, pathname]);

  return (
    <Accordion type="multiple" value={value} onValueChange={handleValueChange} className="pr-2">
      <AccordionItem value={trigger.key}>
        <AccordionTrigger className="relative pt-1 pb-2">
          <Link
            href={trigger.href}
            className={clsx(
              "absolute flex items-center w-[calc(100%-1rem)] px-2 py-1 border border-transparent rounded-md no-underline hover:text-teal-700 hover:font-medium",
              {
                ["text-yellow-200 font-medium"]: trigger.href === pathname,
                ["text-muted-foreground"]: trigger.href !== pathname,
              }
            )}
            key={trigger.key}
          >
            {trigger.name}
          </Link>
          <div className="flex w-full h-full" />
        </AccordionTrigger>
        <div className="px-3 mx-4 border-l">
          {item.map((child) => (
            <AccordionContent key={child.key}>
              <Link
                href={`${trigger.href}/${child.slug}`}
                className={clsx("relative hover:text-teal-700 hover:font-medium", {
                  ["text-yellow-200 font-medium border-yellow-200"]: pathname.includes(`${trigger.href}/${child.slug}`),
                  ["text-muted-foreground"]: !pathname.includes(`${trigger.href}/${child.slug}`),
                })}
              >
                {child.name}
              </Link>
            </AccordionContent>
          ))}
        </div>
      </AccordionItem>
    </Accordion>
  );
}
