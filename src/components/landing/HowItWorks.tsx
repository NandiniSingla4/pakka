import { ClipboardPaste, ScanSearch, LockKeyhole } from "lucide-react";
import { steps } from "@/lib/landing-content";

const icons = [ClipboardPaste, ScanSearch, LockKeyhole] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-y border-border bg-secondary/35 px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">How it works</h2>
        <ol className="relative mt-6 grid gap-5 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => {
            const Icon = icons[i] ?? ClipboardPaste;
            return (
              <li key={step.title} className="relative flex items-start gap-3 border-l border-primary/30 pl-4 md:border-l-0 md:border-t md:pl-0 md:pt-5">
                <span className="absolute -left-3 top-0 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground md:-top-3 md:left-0">{i + 1}</span>
                <Icon className="mt-0.5 size-5 shrink-0 text-primary md:ml-1" />
                <div><h3 className="text-sm font-semibold text-foreground">{step.title}</h3><p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{step.description}</p></div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
