import { useState, type FormEvent } from "react";
import { earlyAccess } from "@/lib/landing-content";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const inputClasses =
  "w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function EarlyAccess() {
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="early-access"
      className="scroll-mt-20 px-5 py-12 sm:px-8"
    >
      <div className="mx-auto max-w-6xl border-t border-border pt-9">
        <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr] md:gap-12">
          <div><p className="mb-2 text-xs font-bold uppercase text-primary">Early access</p><h2 className="max-w-xl text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
            {earlyAccess.headline}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {earlyAccess.copy}
          </p></div>

          <div className="md:self-center">{submitted ? (
            <div
              role="status"
              className="rounded-md bg-agreed-soft px-5 py-4 text-foreground"
            >
              <p className="font-semibold">Thanks for your interest.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This preview doesn’t send signups yet. Please check back when early access opens.
              </p>
            </div>
          ) : !revealed ? <Button type="button" onClick={() => setRevealed(true)} className="h-11 px-5">{earlyAccess.cta} <ArrowRight className="size-4" /></Button> : (
            <form onSubmit={handleSubmit} className="space-y-3 rounded-md border border-border bg-card p-4 shadow-sm sm:p-5">
              <p className="text-sm font-semibold">A little about you</p>
              <div>
                <label
                  htmlFor="ea-name"
                  className="mb-1 block text-xs font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="ea-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Priya"
                  className={inputClasses}
                />
              </div>
              <div>
                <label
                  htmlFor="ea-handle"
                  className="mb-1 block text-xs font-medium text-foreground"
                >
                  Instagram/WhatsApp handle
                </label>
                <input
                  id="ea-handle"
                  name="handle"
                  type="text"
                  required
                  placeholder="e.g. @priya.creates"
                  className={inputClasses}
                />
              </div>
              <div>
                <label
                  htmlFor="ea-craft"
                  className="mb-1 block text-xs font-medium text-foreground"
                >
                  What do you make?
                </label>
                <input
                  id="ea-craft"
                  name="craft"
                  type="text"
                  placeholder="e.g. custom cakes, portraits, blouses…"
                  className={inputClasses}
                />
              </div>
              <Button
                type="submit"
                className="h-10 w-full"
              >
                Register interest <ArrowRight className="size-4" />
              </Button>
              <p className="text-xs text-muted-foreground">Preview only — your details are not sent or saved yet.</p>
            </form>
          )}</div>
        </div>
      </div>
    </section>
  );
}
