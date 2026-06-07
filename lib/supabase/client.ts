import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // Route all code exchange through /auth/callback server routes.
        // Prevents the browser from logging in on the homepage when a reset
        // link lands on / with a ?code= param (common prod Supabase fallback).
        detectSessionInUrl: false,
      },
    }
  );
}
