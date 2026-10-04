import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Overview", href: "#overview" },
  { label: "Try Pakka", href: "#try-pakka" },
  { label: "Why Pakka", href: "#why-pakka" },
  { label: "Early access", href: "#early-access" },
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl"><nav aria-label="Main navigation" className="mx-auto grid h-15 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-8 lg:flex lg:justify-between"><a href="#overview" onClick={() => setOpen(false)} className="w-fit font-display text-[22px] font-bold text-foreground">pakka<span className="text-primary">.</span></a><div className="hidden items-center gap-0.5 lg:flex">{links.map(link => <a key={link.href} href={link.href} className="rounded-sm px-3 py-2 text-[13px] font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-ring">{link.label}</a>)}</div><Button asChild className="hidden h-9 px-3 text-xs font-bold lg:inline-flex"><a href="#try-pakka">Try Pakka <ArrowUpRight /></a></Button><Button type="button" variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</Button></nav>{open && <div id="mobile-menu" className="border-t border-border bg-background px-4 py-2 shadow-md lg:hidden">{links.map(link => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-border py-3 text-sm font-semibold text-foreground last:border-0">{link.label}</a>)}</div>}</header>;
}
