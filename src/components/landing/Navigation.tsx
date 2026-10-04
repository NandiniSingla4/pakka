import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Overview", href: "#overview" },
  { label: "Try Pakka", href: "#try-pakka" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Why Pakka", href: "#why-pakka" },
  { label: "Early access", href: "#early-access" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <nav aria-label="Main navigation" className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8 lg:flex lg:justify-between">
        <a href="#overview" onClick={() => setOpen(false)} className="w-fit font-display text-2xl font-bold text-foreground">pakka<span className="text-primary">.</span></a>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring">{link.label}</a>
          ))}
        </div>
        <a href="#try-pakka" className="hidden items-center gap-1 rounded-md border border-primary/25 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 lg:inline-flex">Explore the demo <ArrowUpRight className="size-4" /></a>
        <Button type="button" variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </Button>
      </nav>
      {open && <div id="mobile-menu" className="border-t border-border bg-background px-5 py-2 shadow-sm lg:hidden">
        {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-border/60 py-3 text-sm font-medium text-foreground last:border-0">{link.label}</a>)}
      </div>}
    </header>
  );
}