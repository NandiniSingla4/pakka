import { ClipboardPaste, ScanSearch, LockKeyhole } from "lucide-react";
import { steps } from "@/lib/landing-content";

const icons = [ClipboardPaste, ScanSearch, LockKeyhole];

export function HowItWorks() {
  return (
    <section className="px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-semibold text-foreground sm:text-4xl">
          How Pakka works
        </h2>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <li
                key={step.title}
                className="relative rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
                >
                  {i + 1}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-foreground">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
