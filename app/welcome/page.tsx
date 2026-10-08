"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AuthHeader from "@/components/auth/auth-header";
import PostSignupActions from "@/components/learning/post-signup-actions";
import { mergeGuestProgressOnSignIn } from "@/lib/learning/merge-guest-progress";
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
      void mergeGuestProgressOnSignIn();
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
            Your brain is about to get an upgrade. Let&apos;s understand AI together,
            for real this time.
          </p>
          <PostSignupActions />
        </div>
      </main>
    </>
  );
}
