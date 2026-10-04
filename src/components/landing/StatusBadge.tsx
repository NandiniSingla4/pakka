import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/landing-content";

const styles: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  agreed: {
    label: "Agreed",
    className:
      "bg-agreed-soft text-agreed border-agreed/25",
  },
  open: {
    label: "Open",
    className: "bg-open-soft text-open border-open/25",
  },
  missing: {
    label: "Missing",
    className: "bg-missing-soft text-missing border-missing/25",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: OrderStatus;
  className?: string;
}) {
  const s = styles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
        s.className,
        className,
      )}
    >
      {s.label}
    </span>
  );
}
