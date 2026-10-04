import { problem } from "@/lib/landing-content";

export function Problem() {
  return (
    <section className="px-5 py-16 sm:px-8 md:py-24">
      <div className="mx-auto max-w-2xl">
        <figure className="rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-10">
          <blockquote className="text-lg leading-relaxed text-foreground sm:text-xl">
            <span className="mr-1 font-display text-4xl leading-none text-primary">
              “
            </span>
            {problem.narrative}
          </blockquote>
          <figcaption className="mt-4 text-sm text-muted-foreground">
            — the founder, on why Pakka exists
          </figcaption>
        </figure>

        <div
          aria-label="Example of a changing customer conversation"
          className="mx-auto mt-10 flex max-w-md flex-col gap-2.5"
        >
          {problem.chat.map((m) => (
            <div key={m.text} className="flex justify-start">
              <p className="rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5 text-sm text-secondary-foreground">
                {m.text}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center font-display text-2xl font-semibold text-foreground sm:text-3xl">
          {problem.closing}
        </p>
      </div>
    </section>
  );
}
