import { useState } from "react";
import { Palette, Cake, Scissors, Gift, Gem, PenTool, type LucideIcon } from "lucide-react";
import { audiences } from "@/lib/landing-content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = { palette: Palette, cake: Cake, scissors: Scissors, gift: Gift, gem: Gem, pen: PenTool };
export function WhoItsFor() {
  const [selected, setSelected] = useState<string | null>(null);
  return <section className="border-t border-border/70 bg-coral-soft/45 px-4 py-8 sm:px-8"><div className="mx-auto max-w-6xl"><div className="flex flex-wrap items-baseline gap-x-5 gap-y-1"><h2 className="font-display text-lg font-extrabold">Made for makers.</h2><p className="text-sm text-muted-foreground">For anyone whose custom order evolves through conversation.</p></div><div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Seller types">{audiences.map(a => { const Icon = iconMap[a.icon] ?? Palette; return <Button key={a.label} type="button" variant="outline" aria-pressed={selected === a.label} onClick={() => setSelected(selected === a.label ? null : a.label)} className={cn("h-9 gap-2 rounded-full border-primary/15 bg-card px-3 text-xs font-semibold shadow-none transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-accent/70 hover:text-primary", selected === a.label && "border-primary bg-accent text-primary shadow-sm")}><Icon className="size-3.5 text-coral" />{a.label}</Button>; })}</div></div></section>;
}
