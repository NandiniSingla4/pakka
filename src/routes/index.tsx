import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { Navigation } from "@/components/landing/Navigation";
import { OrderCheckDemo } from "@/components/landing/OrderCheckDemo";
import { WhyPakka } from "@/components/landing/WhyPakka";
import { WhoItsFor } from "@/components/landing/WhoItsFor";
import { EarlyAccess } from "@/components/landing/EarlyAccess";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Pakka — Confirm custom orders before you start" },
    { name: "description", content: "Explore Pakka's sample order checks: see what's agreed, what's open, what's missing, and the customer messages behind each detail." },
    { property: "og:title", content: "Pakka — Confirm custom orders before you start" },
    { property: "og:description", content: "Turn messy customer chats into a clear, seller-verified order record before you begin work." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Landing,
});
function Landing() {
  return <main className="min-h-screen bg-background"><Navigation /><Hero /><OrderCheckDemo /><WhyPakka /><WhoItsFor /><EarlyAccess /><footer className="border-t border-border px-4 py-5 sm:px-8"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 text-xs text-muted-foreground"><span className="font-display text-lg font-semibold text-foreground">pakka<span className="text-primary">.</span></span><span>AI interprets. You decide.</span></div></footer></main>;
}
