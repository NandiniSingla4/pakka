import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/landing-content";

const styles: Record<OrderStatus, string> = {
  agreed: "bg-agreed-soft text-agreed",
  open: "bg-open-soft text-open",
  missing: "bg-missing-soft text-missing",
};
export function StatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-[10px] font-bold uppercase", styles[status], className)}><span className="size-1.5 rounded-full bg-current" />{status}</span>;
}
