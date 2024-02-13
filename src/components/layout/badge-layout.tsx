import { Badge } from "@/components/ui/badge";

type Props = {
  display: string;
  children: React.ReactNode;
}

export function BadgeLayout({ display, children }: Props) {
  return (
    <div className="relative px-6 py-8 border border-zinc-800">
      <Badge variant="secondary" className="absolute font-normal uppercase tracking-widest -top-2.5 bg-zinc-800 text-[10px]">
        {display}
      </Badge>
      <div className="space-y-6">{children}</div>
    </div>
  );
}
