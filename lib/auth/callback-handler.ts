import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { EmailOtpType } from "@supabase/supabase-js";

import type { AuthFunnelEvent } from "@/lib/auth/funnel";
import { createAdminClient } from "@/lib/supabase/admin";

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

type CallbackOptions = {
  request: Request;
  redirectPath: string;
  trackSignupComplete?: boolean;
};

export async function completeAuthCallback({
  request,
  redirectPath,
  trackSignupComplete = false,
}: CallbackOptions): Promise<NextResponse> {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const origin = requestUrl.origin;

  if (!code && !(token_hash && type)) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback`);
  }

  const cookieStore = await cookies();
  let response = NextResponse.redirect(`${origin}${redirectPath}`);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              cookieStore.set(name, value, options);
            } catch {
              // Route handlers may throw when setting cookies outside setAll.
            }
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(`${origin}/login?error=auth_callback`);
    }
  } else if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (error) {
      return NextResponse.redirect(`${origin}/login?error=auth_callback`);
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await trackFunnel(user.id, "email_verified");
    if (trackSignupComplete) {
      await trackFunnel(user.id, "signup_completed");
    }
  }

  return response;
}
