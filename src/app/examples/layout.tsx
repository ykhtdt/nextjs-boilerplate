"use client";

import { usePathname } from "next/navigation";

import { ChevronRight } from "lucide-react";

import GlobalNav from "@/components/ui/global-nav";
import Breadcrumb from "@/components/ui/breadcrumb";

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isIntro = pathname === "/examples";

  return (
    <div className="flex-1">
      <div className="border-b">
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <GlobalNav />
          <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_200px]">
            <div className="w-full min-w-0 mx-auto">
              {isIntro ? (
                <div className="-mt-4 mb-7 md:mb-10">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">Examples</span>
                    <span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                    <span className="overflow-hidden font-medium text-ellipsis whitespace-nowrap">Introduction</span>
                  </div>
                </div>
              ) : (
                <Breadcrumb />
              )}
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
