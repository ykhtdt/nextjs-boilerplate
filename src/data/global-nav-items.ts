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
        href: "/examples",
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
        href: "/examples/nextjs/routing",
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
        href: "/examples/jotai/provider",
      },
      {
        name: "Store",
        key: "store",
        href: "/examples/jotai/store",
      },
      {
        name: "Atom",
        key: "atom",
        href: "/examples/jotai/atom",
      },
    ],
  },
];
