import { NextResponse } from "next/server";
import { z } from "zod";

import type { AuthFunnelEvent } from "@/lib/auth/funnel";
import { logError } from "@/lib/logger";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const EVENT_COLUMNS: Record<AuthFunnelEvent, string> = {
  user_signup: "user_signup_at",
  email_sent: "email_sent_at",
  email_verified: "email_verified_at",
  signup_completed: "signup_completed_at",
};

const funnelSchema = z.object({
  event: z.enum([
    "user_signup",
    "email_sent",
    "email_verified",
    "signup_completed",
  ]),
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = funnelSchema.parse(await request.json());
    const admin = createAdminClient();
    if (!admin) return NextResponse.json({ success: true, skipped: true });

    const now = new Date().toISOString();
    const { error } = await admin.from("user_auth_funnel").upsert(
      {
        user_id: user.id,
        [EVENT_COLUMNS[body.event]]: now,
        updated_at: now,
      },
      { onConflict: "user_id" }
    );

    if (error) {
      logError("api.auth.funnel", { userId: user.id }, error);
      return NextResponse.json({ error: "Could not update funnel." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    logError("api.auth.funnel", {}, err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}