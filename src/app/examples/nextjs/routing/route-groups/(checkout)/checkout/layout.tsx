import Link from "next/link";

import { BadgeLayout } from "@/components/layout/badge-layout";
import { AddressBar } from "@/components/ui/address-bar";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BadgeLayout display="Checkout Layout">
      <AddressBar />
      <div className="flex items-center justify-between px-2">
        <Button
          variant="secondary"
          size="sm"
          className="p-0 transition-colors rounded-lg hover:bg-zinc-500 align"
        >
          <Link href="/examples/nextjs/routing/route-groups" className="px-3 py-0.5 text-sm capitalize font-light">
            Back
          </Link>
        </Button>
      </div>
      <div className="px-2">
        {children}
      </div>
    </BadgeLayout>
  )
}