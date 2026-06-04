"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthHeader from "@/components/auth/auth-header";
import { createClient } from "@/lib/supabase/client";

export default function WelcomePage() {
  const router = useRouter();
  const supabase = createClient();
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }
      if (!user.email_confirmed_at) {
        router.replace(`/verify-email?email=${encodeURIComponent(user.email ?? "")}`);
        return;
      }
      const first =
        (user.user_metadata?.full_name as string | undefined)?.split(" ")[0] ?? "";
      setName(first);
      setReady(true);
    })();
  }, [router, supabase.auth]);

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
            Welcome To The Grey Project{name ? `, ${name}` : ""}
          </h1>
          <p className="mt-6 text-xl text-slate-600">
            Let&apos;s understand AI together.
          </p>
          <div className="mt-10 flex flex-col gap-4">
            <Link
              href="/try/prediction"
              className="rounded-2xl bg-violet-600 py-4 font-semibold text-white"
            >
              Start Sample
            </Link>
            <Link
              href="/learning/curious-builders/prediction"
              className="rounded-2xl border py-4 font-semibold text-slate-800"
            >
              Continue Learning
            </Link>
            <Link
              href="/learning"
              className="rounded-2xl bg-slate-50 py-4 font-semibold text-slate-700"
            >
              Explore learning paths
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
