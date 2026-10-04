import { useState } from "react";
import { ArrowRight, ChevronDown, MessageCircle, ScanSearch, History, Quote } from "lucide-react";
import { conversation, demoFields, demoChanges } from "@/lib/landing-content";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

function Evidence({ evidence }: { evidence: { speaker: string; text: string }[] }) {
  return <div className="space-y-1.5">
    <p className="flex items-center gap-1 text-[11px] font-semibold uppercase text-muted-foreground"><Quote className="size-3" /> Source messages</p>
    {evidence.map((line) => <p key={line.speaker + line.text} className="rounded-md bg-secondary/60 px-3 py-2 text-xs leading-relaxed"><span className="font-semibold">{line.speaker}:</span> “{line.text}”</p>)}
  </div>;
}

function DemoFieldRow({
  field,
  expanded,
  onToggle,
}: {
  field: (typeof demoFields)[number];
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="border-b border-border last:border-0">
      <Button
        variant="ghost"
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="h-auto min-h-16 w-full justify-between gap-2 rounded-none px-3 py-3 text-left hover:bg-secondary/40 sm:px-5"
      >
        <span className="grid min-w-0 flex-1 grid-cols-1 gap-0.5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:items-center sm:gap-4">
          <span className="min-w-0 text-xs font-medium text-muted-foreground sm:text-sm">{field.label}</span>
          <span className="min-w-0 whitespace-normal text-xs font-semibold text-foreground sm:text-sm">{field.value}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1 sm:gap-3">
          <StatusBadge status={field.status} />
          <ChevronDown aria-label={expanded ? "Hide evidence" : "View evidence"} className={cn("size-4 text-muted-foreground transition-transform", expanded && "rotate-180")} />
        </span>
      </Button>
      {expanded && <div className="border-t border-border bg-secondary/20 px-3 py-3 sm:px-5">
        {field.reason && <p className="mb-2 text-xs text-muted-foreground"><span className="font-semibold text-foreground">Reason: </span>{field.reason}</p>}
        {field.evidence && <Evidence evidence={field.evidence} />}
        {!field.evidence && <p className="text-xs text-muted-foreground">No messages about {field.label.toLowerCase()} were found.</p>}
        </div>
      }
    </li>
  );
}

export function OrderCheckDemo() {
  const [expandedId, setExpandedId] = useState<string | null>("size");
  return (
    <section id="try-pakka" className="scroll-mt-20 px-5 pb-12 sm:px-8 lg:pb-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-xs font-bold uppercase text-primary">A closer look</p><h2 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">Try Pakka</h2></div>
          <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">Sample order · Portrait commission</span>
        </div>
        <div className="overflow-hidden rounded-md border border-border bg-card shadow-sm">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-border bg-secondary/35 px-4 py-3 sm:px-5">
            <div className="min-w-0"><p className="truncate text-sm font-bold">Portrait commission <span className="font-normal text-muted-foreground">/ Sample order</span></p></div>
            <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground"><span className="size-1.5 rounded-full bg-agreed" /> Demo</span>
          </div>
          <Tabs defaultValue="order" className="w-full">
            <div className="border-b border-border px-2 sm:px-4"><TabsList className="h-12 w-full justify-start gap-1 rounded-none bg-transparent p-0">
              <TabsTrigger value="conversation" className="h-full gap-1.5 rounded-none border-b-2 border-transparent px-2 text-xs shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none sm:px-4 sm:text-sm"><MessageCircle className="size-4" /> Conversation</TabsTrigger>
              <TabsTrigger value="order" className="h-full gap-1.5 rounded-none border-b-2 border-transparent px-2 text-xs shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none sm:px-4 sm:text-sm"><ScanSearch className="size-4" /> Order Check</TabsTrigger>
              <TabsTrigger value="changes" className="h-full gap-1.5 rounded-none border-b-2 border-transparent px-2 text-xs shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none sm:px-4 sm:text-sm"><History className="size-4" /> Changes</TabsTrigger>
            </TabsList></div>
            <TabsContent value="conversation" className="m-0 min-h-96 p-4 sm:p-6">
              <div className="mx-auto max-w-xl"><p className="mb-4 text-xs font-semibold uppercase text-muted-foreground">Customer conversation · Sample</p><div className="space-y-2">
                {conversation.map((line) => <div key={line.id} className={cn("flex", line.from === "seller" && "justify-end")}><p className={cn("max-w-[85%] rounded-md px-3 py-2 text-sm leading-relaxed", line.from === "seller" ? "bg-primary/10 text-foreground" : "bg-secondary text-foreground")}>{line.text}</p></div>)}
              </div></div>
            </TabsContent>
            <TabsContent value="order" className="m-0 min-h-96 p-3 sm:p-6">
              <div className="mx-auto max-w-4xl">
                <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">{([ {label: "Agreed", count: 3, className: "border-agreed/25 bg-agreed-soft text-agreed"}, {label: "Open", count: 2, className: "border-open/25 bg-open-soft text-open"}, {label: "Missing", count: 1, className: "border-missing/25 bg-missing-soft text-missing"} ]).map((item) => <div key={item.label} className={cn("flex items-baseline justify-between gap-1 rounded-md border px-2 py-2 sm:px-4", item.className)}><span className="text-xs font-semibold sm:text-sm">{item.label}</span><strong className="text-lg sm:text-xl">{item.count}</strong></div>)}</div>
                <div className="overflow-hidden rounded-md border border-border"><div className="hidden grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto] gap-2 border-b border-border bg-secondary/50 px-5 py-2 text-xs font-semibold uppercase text-muted-foreground sm:grid"><span>Field</span><span>Current detail</span><span className="pr-7">Status</span></div><ul>{demoFields.map((field) => <DemoFieldRow key={field.id} field={field} expanded={expandedId === field.id} onToggle={() => setExpandedId(expandedId === field.id ? null : field.id)} />)}</ul></div>
                <p className="mt-3 text-xs text-muted-foreground">Sample interpretation only. The seller reviews every detail before anything becomes final.</p>
              </div>
            </TabsContent>
            <TabsContent value="changes" className="m-0 min-h-96 p-4 sm:p-6"><div className="mx-auto max-w-3xl"><p className="mb-4 text-xs font-semibold uppercase text-changed">{demoChanges.title}</p>
              {demoChanges.entries.map((entry) => <div key={entry.field} className="rounded-md border border-changed/25 bg-changed-soft p-4 sm:p-5"><p className="text-xs font-semibold text-changed">{entry.field} was updated</p><p className="mt-2 flex items-center gap-2 text-lg font-semibold"><span className="text-muted-foreground line-through">{entry.from}</span><ArrowRight className="size-4 text-changed" /><span>{entry.to}</span></p><p className="mt-2 text-sm text-muted-foreground">{entry.note}</p><div className="mt-4"><Evidence evidence={entry.evidence} /></div></div>)}
            </div></TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
