import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { OrderCheckDemo } from "@/components/landing/OrderCheckDemo";
import { WhyNotChatgpt } from "@/components/landing/WhyNotChatgpt";
import { WhoItsFor } from "@/components/landing/WhoItsFor";
import { SellerControl } from "@/components/landing/SellerControl";
import { EarlyAccess } from "@/components/landing/EarlyAccess";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pakka — Confirm custom orders before you start" },
      {
        name: "description",
        content:
          "Pakka turns messy WhatsApp and Instagram chats into a seller-verified order check: what's agreed, what's open, what's missing — before you begin work.",
      },
      { property: "og:title", content: "Pakka — Confirm custom orders before you start" },
      {
        property: "og:description",
        content:
          "Turn messy customer chats into a clear, seller-verified order record before you begin work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Problem />
      <HowItWorks />
      <OrderCheckDemo />
      <WhyNotChatgpt />
      <WhoItsFor />
      <SellerControl />
      <EarlyAccess />
      <footer className="px-5 pb-10 pt-4 text-center sm:px-8">
        <p className="text-sm text-muted-foreground">
          Pakka · AI interprets. You decide.
        </p>
      </footer>
    </main>
  );
}
