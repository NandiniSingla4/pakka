import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Cake, Check, History, MessageCircle, Palette, PanelRightClose, PanelRightOpen, ScanSearch, Scissors } from "lucide-react";
import { sampleOrders, type ConversationMessage, type DemoField, type SampleOrder } from "@/lib/landing-content";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Conversation({ order, evidenceIds, selectedLabel }: { order: SampleOrder; evidenceIds: number[]; selectedLabel: string | null }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!selectedLabel || !evidenceIds.length || !scrollRef.current) return;
    const target = scrollRef.current.querySelector(`[data-message-id="${evidenceIds[0]}"]`);
    if (target instanceof HTMLElement) scrollRef.current.scrollTo({ top: target.offsetTop - scrollRef.current.offsetTop - 90, behavior: "smooth" });
  }, [evidenceIds, order.id, selectedLabel]);
  return <div className="flex min-h-0 flex-col bg-secondary/40 md:h-[610px]">
    <div className="flex shrink-0 items-center justify-between border-b border-border bg-card px-4 py-3">
      <div className="flex min-w-0 items-center gap-2"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-changed-soft text-xs font-bold text-changed">{order.customer[0]}</span><div className="min-w-0"><p className="truncate text-xs font-bold text-foreground">{order.customer} <span className="font-normal text-muted-foreground">· Customer</span></p><p className="text-[11px] text-muted-foreground">{order.channel} · Sample conversation</p></div></div>
      <MessageCircle className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
    </div>
    <div ref={scrollRef} className="relative min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-4 sm:px-5 md:py-5">
      {order.conversation.map((message: ConversationMessage) => {
        const highlighted = evidenceIds.includes(message.id);
        return <div key={message.id} data-message-id={message.id} className={cn("relative flex items-end gap-2 transition-opacity duration-200", message.from === "seller" && "flex-row-reverse", selectedLabel && !highlighted && "opacity-45")}>
          <span className={cn("flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold tabular-nums", highlighted ? "bg-changed text-primary-foreground" : "bg-card text-muted-foreground")}>{message.id}</span>
          <p className={cn("max-w-[82%] rounded-md border px-3 py-2 text-xs leading-relaxed shadow-sm transition-all duration-200 sm:text-[13px]", message.from === "seller" ? "border-primary/15 bg-primary/10 text-foreground" : "border-border bg-card text-foreground", highlighted && "border-changed bg-changed-soft ring-2 ring-changed/35 shadow-md")}>{message.text}</p>
        </div>;
      })}
    </div>
    <div className="shrink-0 border-t border-border bg-card px-4 py-2 text-[11px] text-muted-foreground">{selectedLabel ? evidenceIds.length ? <>Highlighted for <strong className="text-changed">{selectedLabel}</strong> · messages {evidenceIds.map(id => `#${id}`).join(", ")}</> : <>No messages found for <strong className="text-changed">{selectedLabel}</strong></> : "Select an order detail to trace its messages."}</div>
  </div>;
}

function EvidencePanel({ order, field, onSeeMessages }: { order: SampleOrder; field: DemoField; onSeeMessages: (() => void) | undefined }) {
  const evidence = field.evidenceIds.map(id => order.conversation.find(message => message.id === id)).filter((line): line is ConversationMessage => Boolean(line));
  return <div className="border-t border-changed/30 bg-changed-soft/45 px-4 py-3" role="region" aria-label={`Evidence for ${field.label}`}>
    <div className="flex items-center justify-between gap-2"><p className="text-[11px] font-bold uppercase text-changed">Evidence · {field.label}</p>{onSeeMessages && evidence.length > 0 && <Button variant="ghost" size="sm" onClick={onSeeMessages} className="h-7 gap-1 px-1 text-xs text-changed">See messages <ArrowUpRight className="size-3" /></Button>}</div>
    {field.reason && <p className="mt-1 text-xs font-medium text-foreground">{field.reason}</p>}
    {evidence.length ? <div className="mt-2 space-y-1.5">{evidence.map(line => <p key={line.id} className="flex gap-2 text-xs leading-relaxed text-foreground"><span className="shrink-0 font-bold text-changed">#{line.id}</span><span><strong>{line.from === "seller" ? "Seller" : "Customer"}:</strong> “{line.text}”</span></p>)}</div> : <p className="mt-2 text-xs text-muted-foreground">Nothing in this chat settles this detail.</p>}
  </div>;
}

function OrderCheck({ order, selectedId, onSelect, onSeeMessages }: { order: SampleOrder; selectedId: string | null; onSelect: (id: string) => void; onSeeMessages?: () => void }) {
  const counts = { agreed: order.fields.filter(f => f.status === "agreed").length, open: order.fields.filter(f => f.status === "open").length, missing: order.fields.filter(f => f.status === "missing").length };
  return <div className="flex min-h-0 flex-col bg-card md:h-[610px]">
    <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-5"><div><p className="text-xs font-bold text-foreground">Pakka Order Check</p><p className="text-[11px] text-muted-foreground">Sample interpretation · Review before finalising</p></div><ScanSearch className="size-4 shrink-0 text-primary" /></div>
    <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 sm:px-5">
      <div className="mb-3 grid grid-cols-3 gap-1.5 sm:gap-2" aria-label="Order status summary">
        {([ ["agreed", "Agreed", counts.agreed], ["open", "Open", counts.open], ["missing", "Missing", counts.missing] ] as const).map(([status, label, count]) => <div key={status} className={cn("flex min-w-0 items-center justify-between gap-1 rounded-md px-2 py-2 text-xs font-semibold sm:px-3", status === "agreed" ? "bg-agreed-soft text-agreed" : status === "open" ? "bg-open-soft text-open" : "bg-missing-soft text-missing")}><span>{label}</span><span className="text-base font-bold tabular-nums">{count}</span></div>)}
      </div>
      <div className="overflow-hidden rounded-md border border-border"><ul>{order.fields.map(field => <li key={field.id} className="border-b border-border last:border-0">
        <Button variant="ghost" type="button" onClick={() => onSelect(field.id)} aria-pressed={selectedId === field.id} aria-label={`${field.label}, ${field.value}, ${field.status}. View evidence`} className={cn("group h-auto min-h-[62px] w-full justify-between gap-3 rounded-none px-3 py-2.5 text-left transition-colors hover:bg-secondary/50", selectedId === field.id && "bg-changed-soft/50 hover:bg-changed-soft/60")}>
          <span className="flex min-w-0 flex-col gap-0.5"><span className="text-[11px] font-medium text-muted-foreground">{field.label}</span><span className="break-words text-xs font-bold leading-snug text-foreground sm:text-sm">{field.value}</span></span>
          <span className="flex shrink-0 items-center gap-2"><StatusBadge status={field.status} /><span className={cn("flex size-6 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors", selectedId === field.id && "border-changed bg-changed text-primary-foreground")}><ArrowRight className="size-3" /></span></span>
        </Button>
        {selectedId === field.id && <EvidencePanel order={order} field={field} onSeeMessages={onSeeMessages} />}
      </li>)}</ul></div>
      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">Nothing becomes final until the seller reviews it.</p>
    </div>
  </div>;
}

function Changes({ order }: { order: SampleOrder }) {
  return <div className="bg-card p-4 sm:p-5"><p className="mb-3 text-[11px] font-bold uppercase text-changed">Changes detected · Not a current status</p><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">{order.changes.map(change => <div key={change.id} className="rounded-md border border-changed/20 bg-changed-soft/55 p-3"><div className="flex items-center justify-between gap-2"><p className="text-xs font-bold text-foreground">{change.field}</p><History className="size-4 text-changed" /></div><p className="mt-2 flex items-center gap-2 text-sm font-semibold"><span className="text-muted-foreground line-through">{change.from}</span><ArrowRight className="size-3.5 text-changed" /><span className="text-foreground">{change.to}</span></p><p className="mt-2 text-[11px] text-changed">Messages {change.evidenceIds.map(id => `#${id}`).join(" → ")}</p></div>)}</div></div>;
}

export function OrderCheckDemo() {
  const [orderId, setOrderId] = useState(sampleOrders[0]?.id ?? "caricature");
  const [selectedId, setSelectedId] = useState<string | null>("size");
  const [mobileTab, setMobileTab] = useState<"conversation" | "check" | "changes">("check");
  const [showChanges, setShowChanges] = useState(false);
  const order = sampleOrders.find(sample => sample.id === orderId) ?? sampleOrders[0];
  if (!order) return null;
  const selectedField = order.fields.find(field => field.id === selectedId);
  const evidenceIds = selectedField?.evidenceIds ?? [];
  const selectedLabel = selectedField?.label ?? null;
  const SampleIcon = order.id === "cake" ? Cake : order.id === "tailoring" ? Scissors : Palette;
  function selectOrder(next: SampleOrder) { setOrderId(next.id); setSelectedId(next.fields[0]?.id ?? null); setShowChanges(false); setMobileTab("check"); }
  return <section id="try-pakka" className="scroll-mt-18 px-4 pb-12 sm:px-8 lg:pb-16">
    <div className="mx-auto max-w-6xl">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2"><div><p className="text-[11px] font-bold uppercase text-primary">The workspace</p><h2 className="mt-1 text-2xl font-bold text-foreground">Try Pakka</h2></div><span className="text-xs text-muted-foreground">Choose a sample order ↓</span></div>
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Sample orders">{sampleOrders.map(sample => { const Icon = sample.id === "cake" ? Cake : sample.id === "tailoring" ? Scissors : Palette; return <Button key={sample.id} type="button" variant={sample.id === order.id ? "default" : "outline"} onClick={() => selectOrder(sample)} aria-pressed={sample.id === order.id} className="h-11 shrink-0 gap-2 rounded-md px-3 text-xs font-semibold transition-colors sm:px-4 sm:text-sm"><Icon aria-hidden="true" className="size-4" /><span className="sm:hidden">{sample.shortTitle}</span><span className="hidden sm:inline">{sample.title}</span></Button>; })}</div>
      <div className="overflow-hidden rounded-md border border-border bg-card shadow-md">
        <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-3 sm:px-5"><div className="flex min-w-0 items-center gap-2"><SampleIcon className="size-5 shrink-0 text-primary" aria-hidden="true" /><div className="min-w-0"><p className="truncate text-sm font-bold">{order.title}</p><p className="text-[11px] text-muted-foreground">A sample order, not a live analysis</p></div></div><span className="flex shrink-0 items-center gap-1.5 rounded-full bg-agreed-soft px-2 py-1 text-[10px] font-bold text-agreed"><span className="size-1.5 rounded-full bg-agreed" /> DEMO</span></div>
        <div className="flex border-b border-border md:hidden" role="tablist" aria-label="Workspace views">{([ ["conversation", "Conversation", MessageCircle], ["check", "Order Check", ScanSearch], ["changes", "Changes", History] ] as const).map(([key, label, Icon]) => <Button key={key} type="button" role="tab" aria-selected={mobileTab === key} variant="ghost" onClick={() => setMobileTab(key)} className={cn("h-11 min-w-0 flex-1 gap-1 rounded-none border-b-2 border-transparent px-1 text-[11px] font-semibold text-muted-foreground hover:bg-secondary/30 sm:gap-2 sm:text-sm", mobileTab === key && "border-primary text-primary")}><Icon className="size-3.5 shrink-0 sm:size-4" />{label}</Button>)}</div>
        <div className="md:grid md:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]">
          <div className={cn("md:min-w-0 md:border-r md:border-border", mobileTab !== "conversation" && "hidden md:block")}><Conversation order={order} evidenceIds={evidenceIds} selectedLabel={selectedLabel} /></div>
          <div className={cn("md:min-w-0", mobileTab !== "check" && "hidden md:block")}><OrderCheck order={order} selectedId={selectedId} onSelect={setSelectedId} onSeeMessages={() => setMobileTab("conversation")} /></div>
          <div className={cn("md:hidden", mobileTab !== "changes" && "hidden")}><Changes order={order} /></div>
        </div>
        <div className="hidden items-center justify-between border-t border-border bg-secondary/30 px-5 py-2.5 md:flex"><p className="text-xs text-muted-foreground">Select any detail to see exactly where it came from.</p><Button variant="ghost" size="sm" className="h-8 gap-2 text-xs font-semibold text-changed" aria-expanded={showChanges} onClick={() => setShowChanges(!showChanges)}>{showChanges ? <PanelRightClose className="size-4" /> : <PanelRightOpen className="size-4" />} {showChanges ? "Hide changes" : `View changes (${order.changes.length})`}</Button></div>
        {showChanges && <div className="hidden border-t border-border md:block"><Changes order={order} /></div>}
      </div>
      <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground"><Check className="mt-0.5 size-3.5 shrink-0 text-primary" /> Pakka shows what’s settled, what’s still open, and what was never discussed. You make the final call.</p>
    </div>
  </section>;
}
