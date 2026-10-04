import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { hero } from "@/lib/landing-content";
import { Button } from "@/components/ui/button";

export function Hero() {
  return <section id="overview" className="scroll-mt-16 px-4 pb-9 pt-9 sm:px-8 sm:pb-12 sm:pt-12 lg:pt-14">
    <div className="mx-auto grid max-w-6xl items-end gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-12">
      <div className="rise-in"><p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase text-primary"><span className="size-2 rounded-full bg-primary" /> {hero.badge}</p><h1 className="mt-3 max-w-3xl font-display text-[2.35rem] font-semibold leading-[1.12] text-foreground sm:text-5xl lg:text-[3.35rem]">{hero.headline}</h1></div>
      <div className="rise-in pb-1 [animation-delay:100ms]"><p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">{hero.subheadline}</p><Button asChild className="mt-5 h-11 gap-2 px-5 text-sm font-bold"><a href="#try-pakka">{hero.primaryCta} <ArrowUpRight className="size-4" /></a></Button><p className="mt-3 flex items-center gap-1 text-xs font-medium text-changed"><ArrowDownRight className="size-4" /> Three real-feeling orders to explore</p></div>
    </div>
  </section>;
}
