import { MessageCircle, ClipboardCheck } from "lucide-react";
import { comparison } from "@/lib/landing-content";
import { Check } from "lucide-react";

export function WhyNotChatgpt() {
  return (
    <section className="px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-semibold text-foreground sm:text-4xl">
          Why not just ChatGPT?
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-foreground">
              <MessageCircle className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {comparison.genericTitle}
            </h3>
            <p className="mt-3 font-display text-xl leading-snug text-muted-foreground">
              {comparison.genericQuestion}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A paragraph that still leaves you scrolling back to double-check.
            </p>
          </div>

          <div className="rounded-3xl border border-primary/30 bg-card p-7 shadow-sm ring-1 ring-primary/20">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <ClipboardCheck className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {comparison.pakkaTitle}
            </h3>
            <p className="mt-3 font-display text-xl leading-snug text-foreground">
              {comparison.pakkaQuestion}
            </p>
          </div>
        </div>

        <ul className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
          {comparison.additions.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-agreed" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
