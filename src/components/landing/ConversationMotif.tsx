import { Check, Link2, MessageCircle } from "lucide-react";

/** Decorative shorthand for the path from a cited message to a reviewed order detail. */
export function ConversationMotif({ dark = false }: { dark?: boolean }) {
  return <div aria-hidden="true" className="pointer-events-none select-none">
    <div className={`relative w-64 ${dark ? "text-shell-foreground" : "text-primary"}`}>
      <div className={`w-40 rounded-lg rounded-bl-sm border px-3 py-2 shadow-sm ${dark ? "border-lilac/35 bg-shell-foreground/10" : "border-primary/15 bg-card/80"}`}>
        <div className="flex items-center gap-1.5 text-[9px] font-bold opacity-70"><MessageCircle className="size-3" /> MESSAGE #04</div>
        <div className="mt-2 h-1.5 w-24 rounded-full bg-lilac/60" /><div className="mt-1.5 h-1.5 w-16 rounded-full bg-lilac/35" />
      </div>
      <div className="ml-12 flex h-10 items-center gap-2 pl-3"><div className="h-full border-l border-dashed border-coral/65" /><Link2 className="size-4 text-coral" /><div className="w-12 border-t border-dashed border-coral/65" /></div>
      <div className={`ml-20 flex w-44 items-center justify-between rounded-lg border px-3 py-2 shadow-sm ${dark ? "border-lilac/35 bg-shell-foreground/10" : "border-primary/15 bg-card/85"}`}><div><div className="text-[9px] font-bold opacity-70">ORDER DETAIL</div><div className="mt-1 h-1.5 w-14 rounded-full bg-lilac/60" /></div><span className="flex items-center gap-1 rounded-full bg-agreed-soft px-2 py-1 text-[9px] font-bold text-agreed"><Check className="size-3" /> Agreed</span></div>
    </div>
  </div>;
}