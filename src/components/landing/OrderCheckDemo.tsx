import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, History, MessageCircle, Palette, Cake, Scissors, ScanSearch, X, Heart } from "lucide-react";
import { sampleOrders, type ConversationMessage, type DemoField, type SampleOrder, type OrderStatus } from "@/lib/landing-content";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type View = "conversation" | "check" | "changes";
type Filter = "all" | OrderStatus;

function Conversation({ order, evidenceIds, selectedLabel }: { order: SampleOrder; evidenceIds: number[]; selectedLabel: string | null }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!selectedLabel || !evidenceIds.length || !scrollRef.current) return;
    const target = scrollRef.current.querySelector(`[data-message-id="${evidenceIds[0]}"]`);
    if (target instanceof HTMLElement) scrollRef.current.scrollTo({ top: target.offsetTop - scrollRef.current.offsetTop - 110, behavior: "smooth" });
  }, [evidenceIds, order.id, selectedLabel]);
  return <div className="flex h-[470px] min-h-0 flex-col bg-chat md:h-[570px]">
    <div className="flex shrink-0 items-center justify-between border-b border-border/70 bg-card px-4 py-3.5"><div className="flex min-w-0 items-center gap-2.5"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-coral-soft font-display text-xs font-extrabold text-missing">{order.customer[0]}</span><div className="min-w-0"><p className="truncate text-xs font-bold text-foreground">{order.customer} <span className="font-normal text-muted-foreground">· Customer</span></p><p className="text-[11px] text-muted-foreground">{order.channel} · Sample conversation</p></div></div><MessageCircle className="size-4 shrink-0 text-coral" aria-hidden="true" /></div>
    <div ref={scrollRef} className="relative min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4 sm:px-5">
      {order.conversation.map((message: ConversationMessage) => {
        const highlighted = evidenceIds.includes(message.id);
        return <div key={message.id} data-message-id={message.id} className={cn("relative flex items-end gap-2 transition-opacity duration-300", message.from === "seller" && "flex-row-reverse", selectedLabel && !highlighted && "opacity-50")}>
          <span className={cn("grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold tabular-nums", highlighted ? "bg-coral text-foreground" : "bg-secondary text-muted-foreground")}>{message.id}</span>
          <p className={cn("max-w-[85%] rounded-2xl border px-3.5 py-2.5 text-xs leading-relaxed shadow-sm transition-all duration-300 sm:text-[13px]", message.from === "seller" ? "rounded-br-sm border-primary/10 bg-seller-bubble text-foreground" : "rounded-bl-sm border-border/75 bg-card text-foreground", highlighted && "border-coral bg-coral-soft/55 ring-2 ring-coral/25 shadow-md scale-[1.015]")}>{message.text}</p>
        </div>;
      })}
    </div>
    <div className="shrink-0 border-t border-border/70 bg-card px-4 py-2.5 text-[11px] text-muted-foreground">{selectedLabel ? evidenceIds.length ? <>From the chat: <strong className="text-primary">{selectedLabel}</strong> · {evidenceIds.map(id => `#${id}`).join("  ·  ")}</> : <>Nothing in the chat about <strong className="text-primary">{selectedLabel}</strong> yet.</> : "Choose an order detail to see where it came from."}</div>
  </div>;
}

function EvidencePanel({ order, field, onSeeMessages, onClose, reviewed, onReview }: { order: SampleOrder; field: DemoField; onSeeMessages: () => void; onClose: () => void; reviewed: boolean; onReview: () => void }) {
  const evidence = field.evidenceIds.map(id => order.conversation.find(message => message.id === id)).filter((line): line is ConversationMessage => Boolean(line));
  return <div className="soft-pop fixed inset-x-0 bottom-0 z-30 max-h-[55vh] overflow-y-auto rounded-t-2xl border-t border-primary/20 bg-porcelain p-4 shadow-xl shadow-foreground/15 md:static md:max-h-none md:rounded-none md:bg-secondary/55 md:p-5 md:shadow-none" role="region" aria-label={`Evidence for ${field.label}`}>
    <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase text-primary">HERE’S WHAT WE FOUND / {field.label}</p><p className="mt-1 text-sm font-bold text-foreground">{field.reason ?? (field.status === "agreed" ? "You both confirmed this in the chat." : "This detail is still open for your review.")}</p></div><Button size="icon" variant="ghost" onClick={onClose} aria-label="Close evidence" className="-mt-1 size-8 shrink-0 rounded-full"><X className="size-4" /></Button></div>
    {evidence.length ? <div className="mt-3 space-y-2">{evidence.map(line => <div key={line.id} className="flex gap-2 rounded-lg border-l-[3px] border-lilac bg-card/80 px-3 py-2 text-xs leading-relaxed"><span className="shrink-0 font-bold text-primary">#{line.id}</span><span><strong>{line.from === "seller" ? "Seller" : "Customer"}:</strong> “{line.text}”</span></div>)}</div> : <p className="mt-3 text-xs text-muted-foreground">Not discussed yet. You can check this with your customer.</p>}
    <div className="mt-3 flex flex-wrap items-center gap-2"><Button type="button" size="sm" variant={reviewed ? "secondary" : "default"} aria-pressed={reviewed} onClick={onReview} className="h-8 rounded-full px-3 text-xs font-bold">{reviewed ? <><Check className="size-3.5" /> Reviewed</> : "Mark as reviewed"}</Button>{evidence.length > 0 && <Button variant="ghost" size="sm" className="px-1 text-xs font-bold text-primary md:hidden" onClick={onSeeMessages}>View in conversation <ArrowUpRight /></Button>}</div>
  </div>;
}

function OrderCheck({ order, selectedId, onSelect, onClear, onSeeMessages, reviewedIds, onReview }: { order: SampleOrder; selectedId: string | null; onSelect: (id: string) => void; onClear: () => void; onSeeMessages: () => void; reviewedIds: string[]; onReview: (id: string) => void }) {
  const [filter, setFilter] = useState<Filter>("all");
  const counts = { agreed: order.fields.filter(f => f.status === "agreed").length, open: order.fields.filter(f => f.status === "open").length, missing: order.fields.filter(f => f.status === "missing").length };
  const selectedField = order.fields.find(f => f.id === selectedId);
  const visibleFields = order.fields.filter(f => filter === "all" || f.status === filter);
  return <div className="flex min-h-[470px] flex-col bg-card md:h-[570px]">
    <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border/70 px-4 py-3.5 sm:px-5"><div><p className="text-xs font-extrabold text-foreground">Your Order Check</p><p className="text-[11px] text-muted-foreground">Here’s what we found · You decide what’s final</p></div><ScanSearch className="size-4 shrink-0 text-coral" /></div>
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 border-b border-border/70 px-3 py-3 sm:px-5"><div className="grid grid-cols-3 gap-1.5" aria-label="Filter order fields by status">{([ ["agreed", "Agreed", counts.agreed], ["open", "Still open", counts.open], ["missing", "Worth checking", counts.missing] ] as const).map(([status, label, count]) => <Button key={status} variant="ghost" type="button" onClick={() => setFilter(filter === status ? "all" : status)} aria-pressed={filter === status} className={cn("h-10 min-w-0 justify-between gap-1 rounded-full border px-2 text-[10px] font-bold transition-all hover:-translate-y-0.5 hover:shadow-sm sm:px-3 sm:text-[11px]", status === "agreed" ? "border-agreed/20 bg-agreed-soft text-agreed hover:bg-agreed-soft" : status === "open" ? "border-open/20 bg-open-soft text-open hover:bg-open-soft" : "border-missing/20 bg-missing-soft text-missing hover:bg-missing-soft", filter === status && "ring-2 ring-current ring-offset-1 ring-offset-card")}><span className="min-w-0 text-left leading-tight">{label}</span><span className="text-sm tabular-nums">{count}</span></Button>)}</div></div>
      <div className="min-h-0 flex-1 overflow-y-auto"><div className="flex items-center justify-between px-4 py-2.5 text-[10px] font-bold uppercase text-muted-foreground sm:px-5"><span>ORDER DETAILS <span className="ml-1 text-primary">{visibleFields.length.toString().padStart(2, "0")}</span></span>{filter !== "all" && <Button variant="ghost" size="sm" className="h-6 px-1 text-[10px] text-primary" onClick={() => setFilter("all")}>Show all <X className="size-3" /></Button>}</div>
        <ul className="space-y-1 px-2 pb-2 sm:px-3">{visibleFields.map(field => <li key={field.id}><Button variant="ghost" type="button" onClick={() => onSelect(field.id)} aria-pressed={selectedId === field.id} aria-label={`${field.label}, ${field.value}, ${field.status}. View evidence`} className={cn("group h-auto min-h-[61px] w-full justify-between gap-2 rounded-lg border border-transparent bg-porcelain/55 px-3 py-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/15 hover:bg-secondary/65 hover:shadow-sm", selectedId === field.id && "border-primary/35 bg-accent/65 shadow-sm hover:bg-accent/75") }><span className="flex min-w-0 flex-col gap-0.5"><span className="text-[10px] font-semibold uppercase text-muted-foreground">{field.label}</span><span className="truncate text-xs font-bold text-foreground sm:text-sm">{field.value}</span></span><span className="flex shrink-0 items-center gap-1.5">{reviewedIds.includes(field.id) && <Check className="size-3 text-agreed" aria-label="Reviewed" />}<StatusBadge status={field.status} /><ChevronRight className={cn("size-3.5 text-muted-foreground", selectedId === field.id && "text-primary")} /></span></Button></li>)}</ul>
      </div>
      {selectedField && <EvidencePanel key={selectedField.id} order={order} field={selectedField} reviewed={reviewedIds.includes(selectedField.id)} onReview={() => onReview(selectedField.id)} onSeeMessages={onSeeMessages} onClose={onClear} />}
      <div aria-live="polite" className={cn("shrink-0 border-t border-border/70 px-4 py-2.5 text-[11px] text-muted-foreground sm:px-5", reviewedIds.length === order.fields.length && "bg-agreed-soft text-agreed")}><Heart className="mr-1 inline size-3 text-coral" /> {reviewedIds.length === order.fields.length ? "You’ve looked through every detail. Final decisions are still yours." : `Nothing gets locked without you. ${reviewedIds.length ? `${reviewedIds.length}/${order.fields.length} details reviewed.` : ""}`}</div>
    </div>
  </div>;
}

function Changes({ order, onSelect, selectedChangeId, onSeeMessages }: { order: SampleOrder; onSelect: (id: string) => void; selectedChangeId: string | null; onSeeMessages: () => void }) {
  return <div className="rise-in border-t border-border bg-changed-soft/45 p-4 sm:p-5"><div className="mb-3 flex items-center gap-2"><History className="size-4 text-changed" /><p className="text-xs font-bold text-foreground">What changed <span className="font-normal text-muted-foreground">· Separate from current status</span></p></div><div className="grid gap-2 sm:grid-cols-2">{order.changes.map(change => <Button key={change.id} variant="ghost" type="button" onClick={() => onSelect(change.id)} aria-pressed={selectedChangeId === change.id} className={cn("h-auto min-h-20 items-start justify-between rounded-lg border border-changed/15 bg-card p-3 text-left transition-all hover:-translate-y-0.5 hover:bg-changed-soft", selectedChangeId === change.id && "border-changed bg-changed-soft shadow-sm")}><span className="min-w-0"><span className="block text-[10px] font-bold uppercase text-muted-foreground">{change.field}</span><span className="mt-1.5 flex items-center gap-2 text-sm font-bold text-foreground"><span className="text-muted-foreground line-through">{change.from}</span><ArrowRight className="size-3.5 text-changed" />{change.to}</span><span className="mt-1 block text-[10px] text-changed">Messages {change.evidenceIds.map(id => `#${id}`).join(" → ")}</span></span><ChevronRight className="size-4 shrink-0 text-changed" /></Button>)}</div>{selectedChangeId && <Button variant="ghost" size="sm" className="mt-2 px-0 text-xs font-bold text-changed md:hidden" onClick={onSeeMessages}>View in conversation <ArrowUpRight /></Button>}</div>;
}

export function OrderCheckDemo() {
  const [orderId, setOrderId] = useState(sampleOrders[0]?.id ?? "caricature");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedChangeId, setSelectedChangeId] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<View>("check");
  const [showChanges, setShowChanges] = useState(false);
  const [reviewedByOrder, setReviewedByOrder] = useState<Record<string, string[]>>({});
  const order = sampleOrders.find(sample => sample.id === orderId) ?? sampleOrders[0];
  if (!order) return null;
  const selectedField = order.fields.find(field => field.id === selectedId);
  const selectedChange = order.changes.find(change => change.id === selectedChangeId);
  const evidenceIds = selectedField?.evidenceIds ?? selectedChange?.evidenceIds ?? [];
  const selectedLabel = selectedField?.label ?? (selectedChange ? `${selectedChange.field} change` : null);
  const SampleIcon = order.id === "cake" ? Cake : order.id === "tailoring" ? Scissors : Palette;
  const reviewedIds = reviewedByOrder[order.id] ?? [];
  const currentOrderId = order.id;
  function toggleReviewed(id: string) { setReviewedByOrder(previous => { const current = previous[currentOrderId] ?? []; return { ...previous, [currentOrderId]: current.includes(id) ? current.filter(value => value !== id) : [...current, id] }; }); }
  function selectOrder(next: SampleOrder) { setOrderId(next.id); setSelectedId(null); setSelectedChangeId(null); setShowChanges(false); setMobileTab("check"); }
  function selectField(id: string) { setSelectedId(id); setSelectedChangeId(null); }
  function selectChange(id: string) { setSelectedChangeId(id); setSelectedId(null); }
  return <section id="try-pakka" className="scroll-mt-18 bg-porcelain px-4 pb-10 sm:px-8 sm:pb-14">
    <div className="mx-auto max-w-6xl">
      <div className="mb-4 flex items-end justify-between gap-3"><div><p className="text-[10px] font-bold uppercase text-coral">01 / TAKE A LOOK</p><h2 className="mt-1 font-display text-2xl font-extrabold text-foreground sm:text-[28px]">Try Pakka <span className="text-coral">↗</span></h2></div><span className="hidden text-xs text-muted-foreground sm:block">Pick an order. See what’s clear and what still needs you.</span></div>
      <div className="mb-3 grid grid-cols-3 gap-1.5 sm:gap-2" role="group" aria-label="Sample orders">{sampleOrders.map(sample => { const Icon = sample.id === "cake" ? Cake : sample.id === "tailoring" ? Scissors : Palette; return <Button key={sample.id} type="button" variant="ghost" onClick={() => selectOrder(sample)} aria-pressed={sample.id === order.id} className={cn("h-12 min-w-0 justify-start gap-1.5 rounded-lg border border-border bg-card px-2 text-[10px] font-bold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-secondary/60 hover:shadow-sm sm:gap-3 sm:px-4 sm:text-sm", sample.id === order.id && "border-primary/45 bg-accent/75 text-primary shadow-sm")}><span className={cn("grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-primary", sample.id === order.id && "bg-coral-soft text-missing")}><Icon aria-hidden="true" className="size-4" /></span><span className="truncate sm:hidden">{sample.shortTitle}</span><span className="hidden truncate sm:inline">{sample.title}</span>{sample.id === order.id && <span className="ml-auto hidden size-1.5 shrink-0 rounded-full bg-coral sm:block" />}</Button>; })}</div>
      <div className="overflow-hidden rounded-lg border border-primary/20 bg-card shadow-xl shadow-primary/10">
        <div className="flex items-center justify-between gap-3 bg-shell px-4 py-3 text-shell-foreground sm:px-5"><div className="flex min-w-0 items-center gap-2.5"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-lilac text-shell"><SampleIcon className="size-4" /></span><div className="min-w-0"><p className="truncate font-display text-sm font-bold">{order.title}</p><p className="text-[10px] text-shell-foreground/75">A sample order, just for you to explore</p></div></div><span className="flex shrink-0 items-center gap-1.5 rounded-full border border-shell-foreground/30 px-2 py-1 text-[10px] font-bold text-shell-foreground"><span className="size-1.5 rounded-full bg-butter" /> DEMO</span></div>
        <div className="flex border-b border-border md:hidden" role="tablist" aria-label="Workspace views">{([ ["conversation", "Conversation", MessageCircle], ["check", "Order Check", ScanSearch], ["changes", "Changes", History] ] as const).map(([key, label, Icon]) => <Button key={key} type="button" role="tab" aria-selected={mobileTab === key} variant="ghost" onClick={() => setMobileTab(key)} className={cn("h-11 min-w-0 flex-1 gap-1 rounded-none border-b-2 border-transparent px-1 text-[10px] font-bold text-muted-foreground hover:bg-secondary/50 sm:gap-2 sm:text-xs", mobileTab === key && "border-coral bg-coral-soft/30 text-primary")}><Icon className="size-3.5 shrink-0" />{label}</Button>)}</div>
        <div key={order.id} className="soft-pop md:grid md:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)]">
          <div className={cn("md:min-w-0 md:border-r md:border-border", mobileTab !== "conversation" && "hidden md:block")}><Conversation order={order} evidenceIds={evidenceIds} selectedLabel={selectedLabel} /></div>
          <div className={cn("md:min-w-0", mobileTab !== "check" && "hidden md:block")}><OrderCheck order={order} selectedId={selectedId} onSelect={selectField} onClear={() => setSelectedId(null)} onSeeMessages={() => setMobileTab("conversation")} reviewedIds={reviewedIds} onReview={toggleReviewed} /></div>
          <div className={cn("md:hidden", mobileTab !== "changes" && "hidden")}><Changes order={order} selectedChangeId={selectedChangeId} onSelect={selectChange} onSeeMessages={() => setMobileTab("conversation")} /></div>
        </div>
        <div className="hidden items-center justify-between border-t border-border bg-card px-5 py-2.5 md:flex"><p className="text-xs text-muted-foreground">Select a detail to see the messages behind it.</p><Button variant="ghost" size="sm" className="h-8 gap-2 text-xs font-bold text-changed" aria-expanded={showChanges} onClick={() => setShowChanges(!showChanges)}><History className="size-4" /> {showChanges ? "Hide changes" : `Changes (${order.changes.length})`}</Button></div>
        {showChanges && <div className="hidden md:block"><Changes order={order} selectedChangeId={selectedChangeId} onSelect={selectChange} onSeeMessages={() => setMobileTab("conversation")} /></div>}
      </div>
    </div>
  </section>;
}
