import { BadgeLayout } from "@/components/layout/badge-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BadgeLayout display="Layout">
      {children}
    </BadgeLayout>
  );
}
