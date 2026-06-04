import { NextResponse } from "next/server";

import type { AuthFunnelEvent } from "@/lib/auth/funnel";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

async function trackFunnel(userId: string, event: AuthFunnelEvent) {
  const admin = createAdminClient();
  if (!admin) return;
  const columnMap: Record<AuthFunnelEvent, string> = {
    user_signup: "user_signup_at",
    email_sent: "email_sent_at",
    email_verified: "email_verified_at",
    signup_completed: "signup_completed_at",
  };
  const now = new Date().toISOString();
  await admin.from("user_auth_funnel").upsert(
    { user_id: userId, [columnMap[event]]: now, updated_at: now },
    { onConflict: "user_id" }
  );
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const type = url.searchParams.get("type");
  const origin = url.origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) await trackFunnel(user.id, "email_verified");

  if (type === "recovery") {
    return NextResponse.redirect(`${origin}/reset-password`);
  }

  if (type === "email_change") {
    return NextResponse.redirect(`${origin}/settings?email_updated=1`);
  }

  if (user) await trackFunnel(user.id, "signup_completed");

  return NextResponse.redirect(`${origin}/welcome`);
}
