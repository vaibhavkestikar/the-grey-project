import { NextResponse } from "next/server";
import { z } from "zod";

import { logError } from "@/lib/logger";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const analyticsSchema = z.object({
  event: z.enum([
    "page_view",
    "sample_started",
    "sample_completed",
    "signup_started",
    "user_signup",
    "email_sent",
    "email_verified",
    "signup_completed",
    "lesson_started",
    "lesson_completed",
    "checkpoint_passed",
    "playground_used",
    "waitlist_joined",
    "feedback_submitted",
  ]),
  properties: z
    .record(z.union([z.string(), z.number(), z.boolean()]))
    .optional(),
});

export async function POST(request: Request) {
  try {
    const body = analyticsSchema.parse(await request.json());
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const admin = createAdminClient();
    if (admin) {
      await admin.from("analytics_events").insert({
        event_name: body.event,
        user_id: user?.id ?? null,
        properties: body.properties ?? {},
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    logError("api.analytics", {}, err);
    return NextResponse.json({ error: "Invalid analytics event" }, { status: 400 });
  }
}