import {
  Palette,
  Cake,
  Scissors,
  Gift,
  Gem,
  PenTool,
  type LucideIcon,
} from "lucide-react";
import { audiences } from "@/lib/landing-content";

const iconMap: Record<string, LucideIcon> = {
  palette: Palette,
  cake: Cake,
  scissors: Scissors,
  gift: Gift,
  gem: Gem,
  pen: PenTool,
};

export function WhoItsFor() {
  return (
    <section className="border-y border-border bg-secondary/35 px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">Made for makers</h2>
        <p className="mt-1 text-sm text-muted-foreground">For anyone whose custom order evolves through conversation.</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {audiences.map((a) => {
            const Icon = iconMap[a.icon] ?? Palette;
            return (
              <li
                key={a.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground sm:text-sm"
              >
                <Icon className="size-4 text-primary" strokeWidth={2} /> {a.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
