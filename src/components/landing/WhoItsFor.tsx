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
    <section className="px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-semibold text-foreground sm:text-4xl">
          Who it is for
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-lg text-muted-foreground">
          Anyone who takes customised orders through WhatsApp or Instagram.
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {audiences.map((a) => {
            const Icon = iconMap[a.icon]!;
            return (
              <li
                key={a.label}
                className="flex flex-col items-center gap-3 rounded-3xl border border-border bg-card px-4 py-6 text-center shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-foreground">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {a.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
