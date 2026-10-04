import { useState, type FormEvent } from "react";
import { earlyAccess } from "@/lib/landing-content";

const inputClasses =
  "w-full rounded-2xl border border-input bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function EarlyAccess() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="early-access"
      className="scroll-mt-6 px-5 py-16 sm:px-8 md:py-24"
    >
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-primary/25 bg-card p-8 shadow-sm sm:p-12">
          <h2 className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {earlyAccess.headline}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {earlyAccess.copy}
          </p>

          {submitted ? (
            <div
              role="status"
              className="mt-8 rounded-2xl bg-agreed-soft px-5 py-4 text-foreground"
            >
              <p className="font-semibold">Thanks — you’re on the list.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We’ll reach out when it’s your turn to test Pakka.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label
                  htmlFor="ea-name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Your name
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
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  WhatsApp or Instagram handle
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
                  className="mb-1.5 block text-sm font-medium text-foreground"
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
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {earlyAccess.cta}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
