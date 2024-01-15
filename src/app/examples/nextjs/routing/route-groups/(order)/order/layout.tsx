import { BadgeLayout } from "@/components/layout/badge-layout";
import { ClickCounter } from "@/components/ui/click-counter";
import { TabGroup } from "@/components/ui/tab-group";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BadgeLayout display="Children Layout">
      <div className="px-2">{children}</div>
    </BadgeLayout>
  )
}