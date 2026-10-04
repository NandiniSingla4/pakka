import { ArrowDown, ArrowUpRight, MousePointer2 } from "lucide-react";
import { hero } from "@/lib/landing-content";
import { Button } from "@/components/ui/button";

export function Hero() {
  return <section id="overview" className="scroll-mt-16 px-4 pt-10 pb-9 sm:px-8 sm:pt-12 sm:pb-12">
    <div className="mx-auto max-w-6xl">
      <div className="rise-in inline-flex items-center gap-2 rounded-sm border border-primary/20 bg-accent px-2.5 py-1.5 text-[11px] font-bold uppercase text-primary"><span className="size-1.5 rounded-full bg-primary" />{hero.badge}</div>
      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.65fr)] lg:items-end lg:gap-12">
        <h1 className="rise-in max-w-4xl font-display text-[2.5rem] leading-[1.08] font-bold text-foreground sm:text-5xl lg:text-[3.55rem]">Before you start the order, make sure the order is actually <span className="text-primary">pakka.</span></h1>
        <div className="rise-in pb-1 [animation-delay:90ms]"><p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">{hero.subheadline}</p><div className="mt-5 flex flex-wrap items-center gap-3"><Button asChild className="h-11 px-5 font-bold shadow-sm"><a href="#try-pakka">{hero.primaryCta}<ArrowUpRight /></a></Button><Button asChild variant="ghost" className="h-11 px-2 font-semibold text-foreground"><a href="#why-pakka">See how it works <ArrowDown /></a></Button></div></div>
      </div>
      <div className="mt-8 flex items-center gap-2 border-t border-border pt-3 text-[11px] font-semibold text-muted-foreground sm:mt-10"><MousePointer2 className="size-3.5 text-primary" /> EXPLORE THREE SAMPLE ORDERS <span className="ml-auto">01 / 03</span></div>
    </div>
  </section>;
}
