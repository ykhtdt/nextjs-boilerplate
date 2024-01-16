import { categories } from "@/data/categories";

import { BadgeLayout } from "@/components/layout/badge-layout";
import { AddressBar } from "@/components/ui/address-bar";
import { TabGroup } from "@/components/ui/tab-group";
import { ClickCounter } from "@/components/ui/click-counter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BadgeLayout display="Home Layout">
      <AddressBar />
      <div className="flex items-center justify-between px-2">
        <TabGroup
          path="/examples/nextjs/routing/route-groups"
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
            {
              key: "order",
              name: "Order",
              slug: "order",
            },
            {
              key: "campaign",
              name: "Campaign",
              slug: "campaign",
            },
          ]}
        />
        <ClickCounter />
      </div>
      <div className="px-2">{children}</div>
    </BadgeLayout>
  );
}
