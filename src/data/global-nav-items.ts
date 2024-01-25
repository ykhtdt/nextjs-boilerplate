import type { GlobalNavAccordionTrigger, GlobalNavAccordionContent } from "@/components/ui/global-nav";

type SubItem = GlobalNavAccordionTrigger & {
  children?: GlobalNavAccordionContent[];
};

export const items: { name: string; key: string; subItem: SubItem[] }[] = [
  {
    name: "Getting Started",
    key: "start",
    subItem: [
      {
        name: "Introduction",
        key: "intro",
        href: "/docs",
      },
    ],
  },
  {
    name: "Next.js",
    key: "framework",
    subItem: [
      {
        name: "Routing",
        key: "routing",
        href: "/docs/nextjs/routing",
        children: [
          {
            name: "Nesting Layouts",
            key: "nesting layouts",
            slug: "nesting-layouts",
          },
          {
            name: "Route Groups",
            key: "route groups",
            slug: "route-groups",
          },
        ],
      },
    ],
  },
  {
    name: "Jotai",
    key: "state management",
    subItem: [
      {
        name: "Provider",
        key: "provider",
        href: "/docs/jotai/provider",
      },
      {
        name: "Store",
        key: "store",
        href: "/docs/jotai/store",
      },
      {
        name: "Atom",
        key: "atom",
        href: "/docs/jotai/atom",
      },
    ],
  },
];
