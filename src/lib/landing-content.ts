/** Editable page copy and sample-only product data. No AI analysis yet. */
export const hero = {
  badge: "Built for custom sellers",
  headline: "Before you start the order, make sure the order is actually pakka.",
  subheadline: "Turn messy custom-order chats into a clear, seller-verified order record.",
  primaryCta: "Try Pakka",
};

export type OrderStatus = "agreed" | "open" | "missing";
export type ConversationMessage = { id: number; from: "customer" | "seller"; text: string };
export type DemoField = {
  id: string;
  label: string;
  value: string;
  status: OrderStatus;
  evidenceIds: number[];
  reason?: string;
};
export type DemoChange = { id: string; field: string; from: string; to: string; evidenceIds: number[] };
export type SampleOrder = {
  id: string;
  icon: string;
  title: string;
  shortTitle: string;
  channel: string;
  customer: string;
  conversation: ConversationMessage[];
  fields: DemoField[];
  changes: DemoChange[];
};

export const sampleOrders: SampleOrder[] = [
  {
    id: "caricature", icon: "🎨", title: "Caricature order", shortTitle: "Caricature", channel: "Instagram DM", customer: "Riya", 
    conversation: [
      { id: 1, from: "customer", text: "Hi! Can you make a caricature of my parents? Maybe A3?" },
      { id: 2, from: "seller", text: "Yes, I can make that!" },
      { id: 3, from: "customer", text: "A blue background like the reference would be nice." },
      { id: 4, from: "customer", text: "Actually A4." },
      { id: 5, from: "seller", text: "Done, A4 works." },
      { id: 6, from: "customer", text: "And beige instead of blue for the background?" },
      { id: 7, from: "seller", text: "Yes, beige background it is." },
      { id: 8, from: "customer", text: "Need it by 12 Oct — possible?" },
      { id: 9, from: "customer", text: "Digital file is fine." },
      { id: 10, from: "seller", text: "Great, digital file it is." },
      { id: 11, from: "customer", text: "Can I send the photos tomorrow?" },
    ],
    fields: [
      { id: "size", label: "Size", value: "A4", status: "agreed", evidenceIds: [4, 5] },
      { id: "deadline", label: "Deadline", value: "12 Oct requested", status: "open", evidenceIds: [8], reason: "No clear seller confirmation found." },
      { id: "revisions", label: "Revisions", value: "Not discussed", status: "missing", evidenceIds: [], reason: "No messages about revisions found." },
      { id: "background", label: "Background", value: "Beige", status: "agreed", evidenceIds: [6, 7] },
      { id: "format", label: "Delivery format", value: "Digital file", status: "agreed", evidenceIds: [9, 10] },
      { id: "photos", label: "Reference photos", value: "Sending tomorrow?", status: "open", evidenceIds: [11], reason: "Photos have not been shared yet." },
    ],
    changes: [
      { id: "size-change", field: "Size", from: "A3", to: "A4", evidenceIds: [1, 4, 5] },
      { id: "background-change", field: "Background", from: "Blue", to: "Beige", evidenceIds: [3, 6, 7] },
    ],
  },
  {
    id: "cake", icon: "🎂", title: "Custom cake order", shortTitle: "Cake", channel: "WhatsApp chat", customer: "Ananya",
    conversation: [
      { id: 1, from: "customer", text: "Hi! I need a cake for my sister's birthday." },
      { id: 2, from: "customer", text: "Could we do chocolate, 1 kg?" },
      { id: 3, from: "seller", text: "Chocolate 1 kg, yes!" },
      { id: 4, from: "customer", text: "Maybe pink frosting? Wait, make it lavender instead." },
      { id: 5, from: "seller", text: "Lavender frosting, noted." },
      { id: 6, from: "customer", text: "Can you write Happy 25th, Meera on it?" },
      { id: 7, from: "seller", text: "Yes, I'll add that message." },
      { id: 8, from: "customer", text: "Need it on Saturday morning if possible." },
      { id: 9, from: "customer", text: "I'll let you know the delivery address later." },
    ],
    fields: [
      { id: "flavour", label: "Flavour & weight", value: "Chocolate · 1 kg", status: "agreed", evidenceIds: [2, 3] },
      { id: "frosting", label: "Frosting", value: "Lavender", status: "agreed", evidenceIds: [4, 5] },
      { id: "message", label: "Cake message", value: "Happy 25th, Meera", status: "agreed", evidenceIds: [6, 7] },
      { id: "deadline", label: "Pickup time", value: "Saturday morning requested", status: "open", evidenceIds: [8], reason: "No clear seller confirmation found." },
      { id: "address", label: "Delivery address", value: "To be shared", status: "open", evidenceIds: [9], reason: "Customer has not shared an address yet." },
      { id: "allergies", label: "Allergies", value: "Not discussed", status: "missing", evidenceIds: [], reason: "No messages about allergies found." },
    ],
    changes: [{ id: "frosting-change", field: "Frosting", from: "Pink", to: "Lavender", evidenceIds: [4, 5] }],
  },
  {
    id: "tailoring", icon: "👗", title: "Tailoring order", shortTitle: "Tailoring", channel: "Instagram DM", customer: "Sana",
    conversation: [
      { id: 1, from: "customer", text: "Can you stitch a blouse for my saree?" },
      { id: 2, from: "seller", text: "Of course. What sleeve style?" },
      { id: 3, from: "customer", text: "I was thinking long sleeves, but short sleeves might look better." },
      { id: 4, from: "seller", text: "Short sleeves it is." },
      { id: 5, from: "customer", text: "Square neckline, please." },
      { id: 6, from: "seller", text: "Yes, square neckline." },
      { id: 7, from: "customer", text: "I'll bring the fabric tomorrow." },
      { id: 8, from: "customer", text: "Could I collect it by the 18th?" },
      { id: 9, from: "customer", text: "I'll send my measurements tonight." },
    ],
    fields: [
      { id: "sleeves", label: "Sleeves", value: "Short sleeves", status: "agreed", evidenceIds: [3, 4] },
      { id: "neckline", label: "Neckline", value: "Square", status: "agreed", evidenceIds: [5, 6] },
      { id: "garment", label: "Garment", value: "Saree blouse", status: "agreed", evidenceIds: [1, 2] },
      { id: "collection", label: "Collection date", value: "18th requested", status: "open", evidenceIds: [8], reason: "No clear seller confirmation found." },
      { id: "measurements", label: "Measurements", value: "Sending tonight?", status: "open", evidenceIds: [9], reason: "Measurements have not been shared yet." },
      { id: "lining", label: "Lining", value: "Not discussed", status: "missing", evidenceIds: [], reason: "No messages about lining found." },
    ],
    changes: [{ id: "sleeves-change", field: "Sleeves", from: "Long", to: "Short", evidenceIds: [3, 4] }],
  },
];

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
