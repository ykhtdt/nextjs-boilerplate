import { BadgeLayout } from "@/components/layout/badge-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BadgeLayout display="Campaign Layout">
      <div className="px-2">{children}</div>
    </BadgeLayout>
  );
}
