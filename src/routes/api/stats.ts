import { createFileRoute } from "@tanstack/react-router";
import { getStats } from "@/lib/pakka-supabase.server";

export const Route = createFileRoute("/api/stats")({
  server: {
    handlers: {
      GET: async () => {
        try {
          return Response.json(await getStats(), { headers: { "Cache-Control": "no-store" } });
        } catch (error) {
          console.warn("stats unavailable:", error instanceof Error ? error.message : error);
          // Stats are optional; the UI hides the line when they are unavailable.
          return Response.json({ available: false }, { headers: { "Cache-Control": "no-store" } });
        }
      },
    },
  },
});
