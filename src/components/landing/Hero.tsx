import { ArrowDown, ArrowUpRight, Link2, MessageCircle } from "lucide-react";
import { hero } from "@/lib/landing-content";
import { Button } from "@/components/ui/button";
import { ConversationMotif } from "./ConversationMotif";

export function Hero() {
  return <section id="overview" className="relative scroll-mt-16 overflow-hidden bg-porcelain px-4 pb-8 pt-9 sm:px-8 sm:pb-10 sm:pt-11">
    <MessageCircle aria-hidden="true" className="pointer-events-none absolute right-5 top-8 size-12 text-coral-soft sm:right-10 lg:hidden" strokeWidth={1.5} />
    <div className="absolute right-[7%] top-7 hidden opacity-70 lg:block"><ConversationMotif /></div>
    <div className="relative mx-auto max-w-6xl">
      <div className="rise-in inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card px-3 py-1.5 text-[11px] font-bold text-primary shadow-sm"><span className="size-2 rounded-full bg-coral" />{hero.badge}</div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.65fr)] lg:items-end lg:gap-12">
        <h1 className="rise-in max-w-4xl font-display text-[2.5rem] leading-[1.1] font-extrabold text-foreground sm:text-5xl lg:text-[3.4rem]">Before you start the order, make sure the order is actually <span className="relative whitespace-nowrap text-primary">pakka<span className="text-coral">.</span><span aria-hidden="true" className="absolute -bottom-1 left-0 h-2 w-[94%] -rotate-2 rounded-full bg-butter/80 -z-10" /></span></h1>
        <div className="rise-in pb-1 [animation-delay:90ms]"><p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">{hero.subheadline}</p><div className="mt-5 flex flex-wrap items-center gap-3"><Button asChild className="h-11 rounded-full bg-coral px-5 font-bold text-foreground shadow-sm transition-transform hover:scale-[1.03] hover:bg-coral/90"><a href="#try-pakka">{hero.primaryCta}<ArrowUpRight /></a></Button><Button asChild variant="ghost" className="h-11 rounded-full px-3 font-semibold text-primary"><a href="#why-pakka">See how it works <ArrowDown /></a></Button></div></div>
      </div>
      <div className="mt-7 flex items-center gap-2 border-t border-border/70 pt-3 text-[11px] font-semibold text-muted-foreground sm:mt-9"><Link2 className="size-3.5 text-coral" /> A LITTLE LESS GUESSWORK, ONE ORDER AT A TIME <span className="ml-auto hidden sm:inline">EXPLORE BELOW ↓</span></div>
    </div>
  </section>;
}
