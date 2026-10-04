# Pakka future-first redesign
- [x] Replace the warm editorial identity with a high-contrast digital visual system and compact navigation/hero.
- [x] Rework the sample-order workspace with linked evidence, status filters, responsive views, and separate Changes.
- [x] Restyle the supporting content and move early access into a compact modal; verify interactions at phone, tablet, and desktop sizes.

# Pakka empathetic future redesign
- [x] Replace cool corporate colors and type with a porcelain, plum, coral, lilac, butter, and mint visual system.
- [x] Warm the existing hero, workspace, evidence, supporting sections, and early-access modal without changing demo logic.
- [x] Verify sample switching, evidence, filters, changes, modal, and mobile/desktop presentation.

# Pakka thematic polish
- [x] Replace unrelated hero and early-access shapes with conversation-to-order motifs.
- [x] Remove em dashes from visible copy and refine the review language.
- [x] Verify the polished page and existing interactions at mobile and desktop sizes.

# Final responsive QA
- [x] Audit phone, tablet, and desktop widths for overflow, clipping, readability, and scrolling.
- [x] Verify navigation, workspace state, evidence, tabs, and early access across breakpoints; fix issues found.
- [x] Rename the demo pill to INTERACTIVE DEMO and confirm visible copy consistency.

## Task 4: Live Check Your Order
- [ ] Sample Demo / Check Your Order mode toggle in Try Pakka
- [ ] /api/check-order: split M1.., guardrails, Gemini (GEMINI_API_KEY), conservative validation, Supabase log (SUPABASE_URL, SUPABASE_SERVICE_KEY)
- [ ] /api/stats: orders checked + % open/missing from pakka_interactions
- [ ] Render results in existing workspace UI; loading/error states
- [ ] Verify no secrets in frontend code
