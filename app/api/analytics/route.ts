import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import type { AnalyticsEvent } from "@/types/analytics";

export async function POST(request: Request) {
  const body = await request.json();
  const event = body.event as AnalyticsEvent | undefined;
  const properties = body.properties as Record<string, unknown> | undefined;
  const userId = body.userId as string | undefined;

  if (!event) {
    return NextResponse.json({ error: "Missing event" }, { status: 400 });
  }

  const admin = createAdminClient();

  if (admin) {
    await admin.from("analytics_events").insert({
      event_name: event,
      user_id: userId ?? null,
      properties: properties ?? {},
    });
  }

  return NextResponse.json({ success: true });
}
