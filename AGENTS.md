<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep Pakka's single-page experience composed from focused landing components with editable copy and sample workspace data in `src/lib/landing-content.ts`; this allows the demo to be replaced with live analysis later without changing the presentation structure.
- Keep sample-order messages, field evidence IDs, and change history together in editable landing content; this keeps the workspace presentation independent from future analysis data sources.
