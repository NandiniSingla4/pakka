# Pakka Order Check

Build a polished, mobile-first one-page landing page for a product called **Pakka**.

Pakka is a GenAI product for custom and commission-based sellers who manage orders through WhatsApp or Instagram.

Core positioning:
**Before you start the order, make sure the order is actually pakka.**

The problem:
Custom-order conversations evolve over many messages. Customers change sizes, colours, references, deadlines, quantities, prices or other details. Before starting work, sellers often scroll back through the conversation trying to reconstruct what was actually agreed.

Pakka does not simply summarise the conversation. It turns the chat into a seller-verifiable order check showing:

- **Agreed** — details that appear clearly settled
- **Open** — details discussed but not safely treated as agreed
- **Missing** — relevant information that was never discussed
- **Changes** — a separate history showing how a requirement evolved

Every populated field should be visually linked to the source messages that support it. The AI interprets the conversation, but the seller remains the final authority.

Pakka does NOT:
- recommend prices;
- accept deadlines;
- make legal or contractual decisions;
- negotiate for the seller;
- make operational commitments.

Target users:
Custom and commission sellers such as artists, home bakers, gifting businesses, tailors, jewellery makers, designers and other sellers who take customised orders through WhatsApp or Instagram.

Build the page with these sections:

1. HERO
Headline:
**Before you start the order, make sure the order is actually pakka.**

Subheadline:
Turn messy customer chats into a clear, seller-verified order record before you begin work.

Primary CTA:
**Try a sample order**

Secondary CTA:
**Join early access**

Include a visual mockup of a messy chat transforming into a clean Pakka Order Check.

2. PROBLEM
Use a short founder-led narrative:
During lockdown, I sold paintings and custom caricatures through Instagram and WhatsApp. The difficult part was not always getting the order — it was going back through the chat before starting and figuring out what had actually been finalised.

Show a realistic sequence of changing messages such as:
“Can we do A3?”
“Actually A4.”
“Need it by Friday.”
“I’ll confirm the background.”
“Same price as before?”

End with:
**A long chat is not the same thing as a confirmed order.**

3. HOW PAKKA WORKS
Show a simple 3-step flow:
Paste conversation → Review Order Check → Lock the reviewed order

4. PRODUCT DEMO / ORDER CHECK
Create a realistic interactive-looking mockup with fields such as:

Size — A4 — Agreed
Evidence: Customer: “Let’s do A4.” / Seller: “Done, A4 works.”

Deadline — 12 Oct — Open
Reason: Customer requested it; seller has not confirmed.

Revisions — Missing
Not discussed in the conversation.

Show a separate “Changes detected” card:
Size: A3 → A4

Make this section visually strong because it communicates the core product.

5. WHY NOT JUST CHATGPT?
Use a concise comparison.

Generic AI summary:
“What was discussed?”

Pakka:
“What is agreed, what is still open, what is missing, and what messages support that conclusion?”

Explain that Pakka adds:
- a fixed custom-order workflow;
- evidence-backed fields;
- structured Agreed/Open/Missing states;
- seller review before anything becomes final.

Do not make exaggerated claims about proprietary technology or a technological moat.

6. WHO IT IS FOR
Use visual cards for:
Artists / Bakers / Tailors / Custom gifting / Jewellery / Designers

Keep this section concise.

7. SELLER CONTROL & TRUST
Highlight:
**AI interprets. You decide.**

Explain briefly that Pakka is designed to surface uncertainty rather than hide it.

Add privacy messaging:
- Personal identifiers can be removed before analysis.
- Raw conversations do not need to be permanently stored.
- Text-only MVP; no customer photos required.

Do not make legal/compliance claims.

8. EARLY ACCESS CTA
Headline:
**Ever scrolled back through a customer chat before starting the order?**

Copy:
We’re looking for custom sellers willing to test Pakka on real, anonymised conversations and tell us where it gets things right — and where it gets things wrong.

CTA:
**I want to test Pakka**

For Task 3 this CTA can be non-functional or scroll to a simple early-access form/placeholder. Do not build the Gemini analysis feature yet; that belongs to Task 4.

DESIGN DIRECTION:
- Modern, warm, minimal, slightly playful but professional
- Mobile-first
- Clean typography
- Generous whitespace
- Rounded cards
- Subtle messaging-app inspiration without copying WhatsApp branding
- Avoid generic AI gradients, robot imagery, glowing brains or futuristic visuals
- Do not make it look like a generic SaaS template
- The product UI mockup should be the visual hero
- Keep animations subtle
- Strong accessibility and readable contrast
- Responsive across mobile, tablet and desktop

TECHNICAL REQUIREMENTS:
- Build it so it can later be extended in Task 4 with Gemini API calls, Supabase storage and Vercel deployment.
- Keep components clean and reusable.
- Do not implement the actual AI analysis yet.
- Make all copy editable.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pakka.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7f044c29-66f8-46d5-b0a4-9960cabcf44d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
