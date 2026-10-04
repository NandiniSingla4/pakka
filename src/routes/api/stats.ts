import { createFileRoute } from "@tanstack/react-router";
import { getStats } from "@/lib/pakka-supabase.server";

export const Route = createFileRoute("/api/stats")({
  server: {
    handlers: {
      GET: async () => {
        try {
          return Response.json(await getStats(), { headers: { "Cache-Control": "no-store" } });
        } catch (error) {
          console.error(error);
          return Response.json({ error: "unavailable" }, { status: 503 });
        }
      },
    },
  },
});
