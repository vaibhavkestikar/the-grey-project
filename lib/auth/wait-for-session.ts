import type { Session } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

type SupabaseClient = ReturnType<typeof createClient>;

export async function waitForAuthSession(
  supabase: SupabaseClient,
  attempts = 8,
  delayMs = 250
): Promise<Session | null> {
  for (let i = 0; i < attempts; i += 1) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      return session;
    }

    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  return null;
}
