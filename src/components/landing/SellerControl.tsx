import { ShieldCheck, EyeOff, Trash2, ImageOff } from "lucide-react";
import { trust } from "@/lib/landing-content";

const privacyIcons = [EyeOff, Trash2, ImageOff];

export function SellerControl() {
  return (
    <section className="px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-12">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <h2 className="mt-5 text-3xl font-semibold text-foreground sm:text-4xl">
          {trust.headline}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {trust.body}
        </p>

        <ul className="mt-8 space-y-3.5">
          {trust.privacy.map((point, i) => {
            const Icon = privacyIcons[i]!;
            return (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed text-foreground sm:text-base">
                  {point}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
