import { categories } from "@/data/categories";

import { ClickCounter } from "@/components/ui/click-counter";
import { BadgeLayout } from "@/components/layout/badge-layout";
import { TabGroup } from "@/components/ui/tab-group";
import { AddressBar } from "@/components/ui/address-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BadgeLayout display="Layout">
      <AddressBar />
      <div className="flex items-center justify-between px-2">
        <TabGroup
          path="/docs/nextjs/routing/nesting-layouts"
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
