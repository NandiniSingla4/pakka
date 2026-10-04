/** Editable page copy and sample-only product data. No AI analysis yet. */
export const hero = {
  badge: "Built for custom sellers",
  headline: "Before you start the order, make sure the order is actually pakka.",
  subheadline: "Turn messy custom-order chats into a clear, seller-verified order record.",
  primaryCta: "Try Pakka",
  secondaryCta: "See how it works",
};

export const conversation = [
  { id: 1, from: "customer", text: "Can we do an A3 portrait?" },
  { id: 2, from: "seller", text: "Yes, I can do that." },
  { id: 3, from: "customer", text: "Actually, let’s do A4." },
  { id: 4, from: "seller", text: "Done, A4 works." },
  { id: 5, from: "customer", text: "Need it by 12 Oct — possible?" },
  { id: 6, from: "customer", text: "I’ll confirm the background later." },
  { id: 7, from: "customer", text: "Digital file is fine." },
  { id: 8, from: "seller", text: "Great, digital file it is." },
  { id: 9, from: "customer", text: "Same reference style as the sample?" },
  { id: 10, from: "seller", text: "Yes, same style." },
] as const;

export const steps = [
  { title: "Paste chat", description: "Bring the conversation into Pakka." },
  { title: "Review Pakka Order Check", description: "See what’s settled and what isn’t." },
  { title: "Lock the reviewed order", description: "You confirm the details before work starts." },
];

export type OrderStatus = "agreed" | "open" | "missing";
export interface DemoField {
  id: string;
  label: string;
  value: string;
  status: OrderStatus;
  evidence?: { speaker: string; text: string }[];
  reason?: string;
}

export const demoFields: DemoField[] = [
  { id: "size", label: "Size", value: "A4", status: "agreed", evidence: [
    { speaker: "Customer", text: "Actually, let’s do A4." },
    { speaker: "Seller", text: "Done, A4 works." },
  ] },
  { id: "deadline", label: "Deadline", value: "12 Oct requested", status: "open", evidence: [
    { speaker: "Customer", text: "Need it by 12 Oct — possible?" },
  ], reason: "No seller confirmation" },
  { id: "revisions", label: "Revisions", value: "Not discussed", status: "missing", reason: "Not discussed in the conversation" },
  { id: "delivery", label: "Delivery format", value: "Digital file", status: "agreed", evidence: [
    { speaker: "Customer", text: "Digital file is fine." },
    { speaker: "Seller", text: "Great, digital file it is." },
  ] },
  { id: "style", label: "Reference style", value: "Same as sample", status: "agreed", evidence: [
    { speaker: "Customer", text: "Same reference style as the sample?" },
    { speaker: "Seller", text: "Yes, same style." },
  ] },
  { id: "background", label: "Background", value: "To be confirmed", status: "open", evidence: [
    { speaker: "Customer", text: "I’ll confirm the background later." },
  ], reason: "Customer hasn’t confirmed a background" },
];

export const demoChanges = {
  title: "Changes detected",
  entries: [{ field: "Size", from: "A3", to: "A4", note: "The customer changed the size during the conversation.", evidence: [
    { speaker: "Customer", text: "Can we do an A3 portrait?" },
    { speaker: "Customer", text: "Actually, let’s do A4." },
  ] }],
};

export const problem = {
  narrative: "During lockdown, I sold paintings and custom caricatures through Instagram and WhatsApp. Before starting an order, I often found myself scrolling back through the chat trying to reconstruct what had actually been finalised.",
  closing: "A long chat is not the same thing as a confirmed order.",
};
export const comparison = {
  genericTitle: "Generic AI summary",
  genericQuestion: "“What was discussed?”",
  pakkaTitle: "Pakka",
  pakkaQuestion: "“What is Agreed, what is Open, what is Missing, and what messages support that conclusion?”",
  additions: ["Evidence-backed fields", "Fixed custom-order workflow", "Agreed / Open / Missing states", "Seller review before anything becomes final"],
};
export const audiences = [
  { icon: "palette", label: "Artists" }, { icon: "cake", label: "Bakers" },
  { icon: "scissors", label: "Tailors" }, { icon: "gift", label: "Custom gifting" },
  { icon: "gem", label: "Jewellery" }, { icon: "pen", label: "Designers" },
];
export const trust = {
  headline: "AI interprets. You decide.",
  body: "Pakka surfaces uncertainty instead of hiding it. Every conclusion stays visible, checkable and editable by the seller.",
  privacy: ["Identifiers can be removed before analysis", "Raw conversations do not need to be stored permanently", "Text-only MVP; no customer photos required"],
};
export const earlyAccess = {
  headline: "Ever scrolled back through a customer chat before starting the order?",
  copy: "We're looking for custom sellers willing to test Pakka on real, anonymised conversations and tell us where it gets things right — and where it gets things wrong.",
  cta: "Join early access",
};
