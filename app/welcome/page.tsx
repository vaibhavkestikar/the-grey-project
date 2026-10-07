"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthHeader from "@/components/auth/auth-header";
import { createClient } from "@/lib/supabase/client";

async function waitForVerifiedUser(
  supabase: ReturnType<typeof createClient>,
  attempts = 8
) {
  for (let i = 0; i < attempts; i += 1) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email_confirmed_at) {
      return user;
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  return null;
}

export default function WelcomePage() {
  const router = useRouter();
  const supabase = createClient();
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void (async () => {
      const user = await waitForVerifiedUser(supabase);
      if (!user) {
        const {
          data: { user: latestUser },
        } = await supabase.auth.getUser();

        if (!latestUser) {
          router.replace("/login");
          return;
        }

        router.replace(
          `/verify-email?email=${encodeURIComponent(latestUser.email ?? "")}`
        );
        return;
      }

      const first =
        (user.user_metadata?.full_name as string | undefined)?.split(" ")[0] ??
        "";
      setName(first);
      setReady(true);
    })();
  }, [router, supabase]);

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading...</p>
      </main>
    );
  }

  return (
    <>
      <AuthHeader />
      <main className="flex min-h-[calc(100dvh-68px)] items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-2xl md:p-14">
          <h1 className="text-4xl font-black md:text-5xl">
            Welcome to The Grey Project{name ? `, ${name}` : ""}
          </h1>
          <p className="mt-6 text-xl text-slate-600">
            Your account is ready. Browse workshops or manage your profile.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/workshops" className="btn-cta min-h-[48px] px-6 py-3">
              See workshops
            </Link>
            <Link
              href="/account"
              className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-800"
            >
              Go to account
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
