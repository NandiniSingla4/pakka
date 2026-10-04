/**
 * All landing-page copy lives here so it can be edited in one place.
 * No AI-analysis logic in this file — Task 4 will add that.
 */

export const hero = {
  badge: "Early access · built for custom sellers",
  headline: "Before you start the order, make sure the order is actually pakka.",
  subheadline:
    "Turn messy customer chats into a clear, seller-verified order record before you begin work.",
  primaryCta: "Try a sample order",
  secondaryCta: "Join early access",
};

export const problem = {
  narrative:
    "During lockdown, I sold paintings and custom caricatures through Instagram and WhatsApp. The difficult part was not always getting the order — it was going back through the chat before starting and figuring out what had actually been finalised.",
  chat: [
    { from: "customer", text: "Can we do A3?" },
    { from: "customer", text: "Actually A4." },
    { from: "customer", text: "Need it by Friday." },
    { from: "customer", text: "I\u2019ll confirm the background." },
    { from: "customer", text: "Same price as before?" },
  ],
  closing: "A long chat is not the same thing as a confirmed order.",
};

export const steps = [
  {
    title: "Paste conversation",
    description:
      "Copy the WhatsApp or Instagram chat and paste it into Pakka. Nothing else to set up.",
  },
  {
    title: "Review Order Check",
    description:
      "See what is Agreed, what is Open and what is Missing — every field linked to the messages behind it.",
  },
  {
    title: "Lock the reviewed order",
    description:
      "Confirm or correct each detail yourself. The locked order is the one you work from.",
  },
];

export type OrderStatus = "agreed" | "open" | "missing";

export interface DemoField {
  id: string;
  label: string;
  value: string | null;
  status: OrderStatus;
  evidence?: { speaker: string; text: string }[];
  reason?: string;
}

export const demoFields: DemoField[] = [
  {
    id: "size",
    label: "Size",
    value: "A4",
    status: "agreed",
    evidence: [
      { speaker: "Customer", text: "Let\u2019s do A4." },
      { speaker: "Seller", text: "Done, A4 works." },
    ],
  },
  {
    id: "deadline",
    label: "Deadline",
    value: "12 Oct",
    status: "open",
    evidence: [{ speaker: "Customer", text: "Need it by 12 Oct \u2014 possible?" }],
    reason: "Customer requested it; seller has not confirmed.",
  },
  {
    id: "revisions",
    label: "Revisions",
    value: null,
    status: "missing",
    reason: "Not discussed in the conversation.",
  },
];

export const demoChanges = {
  title: "Changes detected",
  entries: [
    {
      field: "Size",
      from: "A3",
      to: "A4",
      note: "Customer first asked for A3, later changed to A4. Both messages support this.",
    },
  ],
};

export const comparison = {
  genericTitle: "Generic AI summary",
  genericQuestion: "\u201CWhat was discussed?\u201D",
  pakkaTitle: "Pakka",
  pakkaQuestion:
    "\u201CWhat is agreed, what is still open, what is missing, and what messages support that conclusion?\u201D",
  additions: [
    "A fixed custom-order workflow",
    "Evidence-backed fields",
    "Structured Agreed / Open / Missing states",
    "Seller review before anything becomes final",
  ],
};

export const audiences = [
  { icon: "palette", label: "Artists" },
  { icon: "cake", label: "Bakers" },
  { icon: "scissors", label: "Tailors" },
  { icon: "gift", label: "Custom gifting" },
  { icon: "gem", label: "Jewellery" },
  { icon: "pen", label: "Designers" },
];

export const trust = {
  headline: "AI interprets. You decide.",
  body: "Pakka is designed to surface uncertainty rather than hide it. The AI reads the conversation, but every conclusion stays visible, checkable and editable by you.",
  privacy: [
    "Personal identifiers can be removed before analysis.",
    "Raw conversations do not need to be permanently stored.",
    "Text-only MVP; no customer photos required.",
  ],
};

export const earlyAccess = {
  headline: "Ever scrolled back through a customer chat before starting the order?",
  copy: "We\u2019re looking for custom sellers willing to test Pakka on real, anonymised conversations and tell us where it gets things right \u2014 and where it gets things wrong.",
  cta: "I want to test Pakka",
};
