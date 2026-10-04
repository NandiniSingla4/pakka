import { Check, EyeOff, Trash2, ImageOff } from "lucide-react";
import { problem, comparison, trust } from "@/lib/landing-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function WhyPakka() {
  return <section id="why-pakka" className="scroll-mt-20 px-5 py-10 sm:px-8">
    <div className="mx-auto max-w-6xl"><h2 className="text-xl font-semibold sm:text-2xl">Why Pakka</h2>
      <Tabs defaultValue="problem" className="mt-5">
        <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-none border-b border-border bg-transparent p-0">
          {[{ value: "problem", label: "The problem" }, { value: "comparison", label: "Why not ChatGPT?" }, { value: "control", label: "Seller control" }].map((tab) => <TabsTrigger key={tab.value} value={tab.value} className="min-h-11 shrink-0 rounded-none border-b-2 border-transparent px-3 text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none sm:px-5 sm:text-sm">{tab.label}</TabsTrigger>)}
        </TabsList>
        <TabsContent value="problem" className="m-0 py-6"><div className="grid items-center gap-5 md:grid-cols-[1.4fr_1fr] md:gap-12"><p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{problem.narrative}</p><p className="border-l-2 border-primary pl-5 font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">{problem.closing}</p></div></TabsContent>
        <TabsContent value="comparison" className="m-0 py-6"><div className="grid gap-3 sm:grid-cols-2"><div className="border-l-2 border-border pl-4"><p className="text-xs font-bold uppercase text-muted-foreground">{comparison.genericTitle}</p><p className="mt-2 text-sm">{comparison.genericQuestion}</p></div><div className="border-l-2 border-primary pl-4"><p className="text-xs font-bold uppercase text-primary">{comparison.pakkaTitle}</p><p className="mt-2 text-sm font-medium">{comparison.pakkaQuestion}</p></div></div><ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">{comparison.additions.map((item) => <li key={item} className="flex items-center gap-1.5 text-xs text-foreground sm:text-sm"><Check className="size-4 text-primary" />{item}</li>)}</ul></TabsContent>
        <TabsContent value="control" className="m-0 py-6"><div className="grid gap-6 md:grid-cols-[1fr_1.3fr]"><div><h3 className="font-display text-xl font-semibold sm:text-2xl">{trust.headline}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{trust.body}</p></div><ul className="grid gap-2 sm:grid-cols-3">{trust.privacy.map((item, i) => { const Icon = [EyeOff, Trash2, ImageOff][i] ?? EyeOff; return <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-foreground"><Icon className="size-4 shrink-0 text-primary" />{item}</li>; })}</ul></div></TabsContent>
      </Tabs>
    </div>
  </section>;
}