import { NextResponse } from "next/server";

import type { AuthFunnelEvent } from "@/lib/auth/funnel";
import { createAdminClient } from "@/lib/supabase/admin";

const EVENT_COLUMNS: Record<AuthFunnelEvent, string> = {
  user_signup: "user_signup_at",
  email_sent: "email_sent_at",
  email_verified: "email_verified_at",
  signup_completed: "signup_completed_at",
};

export async function POST(request: Request) {
  const body = await request.json();
  const userId = body.userId as string | undefined;
  const event = body.event as AuthFunnelEvent | undefined;

  if (!userId || !event || !EVENT_COLUMNS[event]) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ success: true, skipped: true });

  const now = new Date().toISOString();
  const { error } = await admin.from("user_auth_funnel").upsert(
    {
      user_id: userId,
      [EVENT_COLUMNS[event]]: now,
      updated_at: now,
    },
    { onConflict: "user_id" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
