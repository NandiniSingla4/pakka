import { useState } from "react";
import {
  Check,
  ChevronDown,
  CircleDashed,
  CircleQuestionMark,
  Quote,
  ArrowRight,
} from "lucide-react";
import { demoFields, demoChanges, type OrderStatus } from "@/lib/landing-content";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

const statusIcons: Record<OrderStatus, typeof Check> = {
  agreed: Check,
  open: CircleDashed,
  missing: CircleQuestionMark,
};

const statusColors: Record<OrderStatus, string> = {
  agreed: "text-agreed",
  open: "text-open",
  missing: "text-missing",
};

function DemoFieldRow({
  field,
  expanded,
  onToggle,
}: {
  field: (typeof demoFields)[number];
  expanded: boolean;
  onToggle: () => void;
}) {
  const Icon = statusIcons[field.status];

  return (
    <li className="overflow-hidden rounded-2xl border border-border bg-card">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-5"
      >
        <span className="flex min-w-0 items-center gap-3">
          <Icon className={cn("h-5 w-5 shrink-0", statusColors[field.status])} />
          <span className="min-w-0">
            <span className="block text-sm text-muted-foreground">{field.label}</span>
            <span className="block truncate font-semibold text-foreground">
              {field.value ?? "Not discussed"}
            </span>
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2.5">
          <StatusBadge status={field.status} />
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              expanded && "rotate-180",
            )}
          />
        </span>
      </button>

      {expanded && (
        <div className="border-t border-border px-4 py-4 sm:px-5">
          {field.evidence ? (
            <>
              <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Quote className="h-3.5 w-3.5" /> Evidence from the chat
              </p>
              <ul className="space-y-2">
                {field.evidence.map((e) => (
                  <li
                    key={e.speaker + e.text}
                    className="flex items-baseline gap-2 rounded-xl bg-muted px-3 py-2"
                  >
                    <span className="shrink-0 text-xs font-semibold text-foreground">
                      {e.speaker}:
                    </span>
                    <span className="text-sm text-muted-foreground">“{e.text}”</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {field.reason ? (
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Why {field.status}: </span>
              {field.reason}
            </p>
          ) : null}
          <p className="mt-3 text-xs text-muted-foreground">
            The AI suggests — you confirm or correct before anything is final.
          </p>
        </div>
      )}
    </li>
  );
}

export function OrderCheckDemo() {
  const [expandedId, setExpandedId] = useState<string | null>("size");

  return (
    <section
      id="order-check"
      className="scroll-mt-6 px-5 py-16 sm:px-8 md:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            The Order Check
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            One screen that tells you what is settled before you start work. Tap any
            field to see the messages behind it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Fields */}
          <ul className="space-y-3">
            {demoFields.map((field) => (
              <DemoFieldRow
                key={field.id}
                field={field}
                expanded={expandedId === field.id}
                onToggle={() =>
                  setExpandedId(expandedId === field.id ? null : field.id)
                }
              />
            ))}
          </ul>

          {/* Changes detected */}
          <aside
            aria-label="Changes detected"
            className="h-fit rounded-3xl border border-changed/25 bg-changed-soft p-5"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-changed">
              {demoChanges.title}
            </h3>
            <ul className="mt-4 space-y-4">
              {demoChanges.entries.map((entry) => (
                <li key={entry.field}>
                  <p className="flex items-center gap-2 font-semibold text-foreground">
                    {entry.field}
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-sm shadow-sm">
                      <span className="text-muted-foreground line-through">
                        {entry.from}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-changed" />
                      <span>{entry.to}</span>
                    </span>
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {entry.note}
                  </p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
