import { useState } from "react";
import { Palette, Cake, Scissors, Gift, Gem, PenTool, type LucideIcon } from "lucide-react";
import { audiences } from "@/lib/landing-content";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = { palette: Palette, cake: Cake, scissors: Scissors, gift: Gift, gem: Gem, pen: PenTool };
export function WhoItsFor() {
  const [selected, setSelected] = useState<string | null>(null);
  return <section className="border-y border-border bg-secondary/35 px-4 py-7 sm:px-8"><div className="mx-auto max-w-6xl"><div className="flex flex-wrap items-baseline gap-x-4 gap-y-1"><h2 className="text-lg font-bold">Who it’s for</h2><p className="text-sm text-muted-foreground">For anyone whose custom order evolves through conversation.</p></div><div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Seller types">{audiences.map(a => { const Icon = iconMap[a.icon] ?? Palette; return <Button key={a.label} type="button" variant="outline" aria-pressed={selected === a.label} onClick={() => setSelected(selected === a.label ? null : a.label)} className={cn("h-10 gap-2 rounded-md border-border bg-card px-3 text-xs font-semibold transition-colors sm:text-sm", selected === a.label && "border-changed bg-changed-soft text-changed")}><Icon className="size-4" strokeWidth={2} />{a.label}</Button>; })}</div></div></section>;
}
