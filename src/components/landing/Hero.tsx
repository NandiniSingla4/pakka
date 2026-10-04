import {
  ArrowDown,
  Check,
  MessageCircle,
  CircleDashed,
  CircleQuestionMark,
} from "lucide-react";
import { hero, demoFields, demoChanges } from "@/lib/landing-content";
import { StatusBadge } from "./StatusBadge";

function ChatBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-secondary px-3.5 py-2 text-[13px] leading-snug text-secondary-foreground">
        {text}
      </p>
    </div>
  );
}

function MiniOrderCheck() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pakka Order Check
        </p>
      </div>
      <ul className="space-y-2.5">
        <li className="flex items-center justify-between gap-2">
          <span className="text-sm text-muted-foreground">Size</span>
          <span className="flex items-center gap-2">
            <span className="text-sm font-semibold">A4</span>
            <StatusBadge status="agreed" />
          </span>
        </li>
        <li className="flex items-center justify-between gap-2">
          <span className="text-sm text-muted-foreground">Deadline</span>
          <span className="flex items-center gap-2">
            <span className="text-sm font-semibold">12 Oct</span>
            <StatusBadge status="open" />
          </span>
        </li>
        <li className="flex items-center justify-between gap-2">
          <span className="text-sm text-muted-foreground">Revisions</span>
          <StatusBadge status="missing" />
        </li>
      </ul>
      <div className="mt-3 rounded-xl bg-changed-soft px-3 py-2">
        <p className="text-[11px] font-semibold text-changed">
          Changes detected: Size A3 → A4
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-10 sm:px-8 md:pb-24 md:pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="rise-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {hero.badge}
            </span>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-[3.4rem]">
              {hero.headline}
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              {hero.subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#order-check"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {hero.primaryCta}
              </a>
              <a
                href="#early-access"
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {hero.secondaryCta}
              </a>
            </div>
          </div>

          {/* Mockup: messy chat → clean Order Check */}
          <div className="rise-in flex items-center gap-4 [animation-delay:150ms] sm:gap-5">
            <div className="flex-1 rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <p className="text-xs font-medium">Customer chat</p>
              </div>
              <div className="space-y-2">
                <ChatBubble text="Can we do A3? 🙂" />
                <ChatBubble text="Actually A4." />
                <ChatBubble text="Need it by Friday." />
                <ChatBubble text="I’ll confirm the background." />
                <ChatBubble text="Same price as before?" />
              </div>
            </div>

            <div
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
            >
              <ArrowDown className="h-4 w-4 rotate-90 lg:rotate-0" />
            </div>

            <div className="flex-1">
              <MiniOrderCheck />
            </div>
          </div>
        </div>

        {/* Status legend */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-agreed" /> Agreed — clearly settled
          </span>
          <span className="inline-flex items-center gap-2">
            <CircleDashed className="h-4 w-4 text-open" /> Open — discussed, not settled
          </span>
          <span className="inline-flex items-center gap-2">
            <CircleQuestionMark className="h-4 w-4 text-missing" /> Missing — never discussed
          </span>
        </div>
      </div>
    </section>
  );
}
