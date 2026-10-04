import { ArrowRight, MessageCircle, ArrowUpRight, Sparkle } from "lucide-react";
import { hero } from "@/lib/landing-content";
import { StatusBadge } from "./StatusBadge";

export function Hero() {
  return (
    <section id="overview" className="scroll-mt-16 px-5 pb-12 pt-10 sm:px-8 lg:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <div className="rise-in">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase text-primary"><span className="size-2 rounded-full bg-primary" /> {hero.badge}</p>
          <h1 className="mt-4 max-w-xl font-display text-[2.35rem] font-semibold leading-[1.12] text-foreground sm:text-5xl lg:text-[3.25rem]">{hero.headline}</h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">{hero.subheadline}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href="#try-pakka" className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-ring">{hero.primaryCta} <ArrowUpRight className="size-4" /></a>
            <a href="#how-it-works" className="inline-flex min-h-11 items-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-ring">{hero.secondaryCta}</a>
          </div>
        </div>
        <div className="rise-in min-w-0 [animation-delay:100ms]">
          <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">From conversation to clarity</p>
          <div className="grid grid-cols-[minmax(0,1fr)_26px_minmax(0,1.25fr)] items-center gap-1.5 sm:gap-3">
            <div className="min-w-0 overflow-hidden rounded-md border border-border bg-card shadow-sm">
              <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-2.5 py-2.5 text-[10px] font-semibold sm:px-3 sm:text-xs"><MessageCircle className="size-3.5 shrink-0 text-primary" /> Customer chat</div>
              <div className="space-y-2 px-2 py-3 text-[10px] leading-snug sm:px-3 sm:text-xs">
                <p className="w-fit max-w-full rounded-md bg-secondary px-2 py-1.5">Can we do A3?</p>
                <p className="ml-auto w-fit max-w-full rounded-md bg-primary/10 px-2 py-1.5">Sure!</p>
                <p className="w-fit max-w-full rounded-md bg-secondary px-2 py-1.5">Actually A4.</p>
                <p className="w-fit max-w-full rounded-md bg-secondary px-2 py-1.5">Need it by 12 Oct?</p>
                <p className="w-fit max-w-full rounded-md bg-secondary px-2 py-1.5">Revisions…?</p>
              </div>
            </div>
            <span aria-hidden="true" className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground"><ArrowRight className="size-3.5" /></span>
            <div className="min-w-0 overflow-hidden rounded-md border border-border bg-card shadow-md">
              <div className="flex items-center gap-1.5 border-b border-border bg-card px-2 py-2.5 text-[10px] font-bold sm:px-3 sm:text-xs"><Sparkle className="size-3.5 shrink-0 text-primary" /> Pakka Order Check</div>
              <div className="divide-y divide-border px-2 sm:px-3">
                {([{label: "Size", value: "A4", status: "agreed"}, {label: "Deadline", value: "12 Oct requested", status: "open"}, {label: "Revisions", value: "—", status: "missing"}] as const).map((item) => <div key={item.label} className="py-2"><span className="block text-[10px] text-muted-foreground">{item.label}</span><div className="flex flex-wrap items-center justify-between gap-1"><span className="text-[10px] font-semibold sm:text-xs">{item.value}</span><StatusBadge status={item.status} className="px-1.5 text-[9px] sm:px-2.5 sm:text-[11px]" /></div></div>)}
              </div>
              <div className="border-t border-border bg-changed-soft px-2 py-2 text-[10px] font-semibold text-changed sm:px-3 sm:text-xs">Changes: A3 → A4</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
