"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import SiteNavbar from "@/components/marketing/site-navbar";
import SiteFooter from "@/components/marketing/site-footer";
import { useAuth } from "@/components/providers/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { firstNameFrom } from "@/lib/utils/name";

type Profile = {
  full_name?: string | null;
  email?: string | null;
  current_job_role?: string | null;
  country?: string | null;
  years_of_experience?: string | null;
  linkedin_url?: string | null;
};

export default function AccountPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<Profile>({});

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    setEmail(user.email ?? "");

    void (async () => {
      const supabase = createClient();
      const { data: prof } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (prof) setProfile(prof);
      setReady(true);
    })();
  }, [authLoading, user, router]);

  if (!ready) {
    return (
      <main className="site-page flex min-h-screen items-center justify-center">
        <p className="text-slate-400">Loading profile…</p>
      </main>
    );
  }

  const firstName = firstNameFrom(profile.full_name, email);

  const profileRows: { label: string; value?: string | null }[] = [
    { label: "Full name", value: profile.full_name },
    { label: "Email", value: email },
    { label: "Current role", value: profile.current_job_role },
    { label: "Country", value: profile.country },
    { label: "Experience", value: profile.years_of_experience },
    { label: "LinkedIn", value: profile.linkedin_url },
  ].filter((r) => r.value);

  return (
    <main className="site-page">
      <SiteNavbar />
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">Account</p>
        <h1 className="mt-2 text-3xl font-black text-slate-50 md:text-4xl">
          Welcome back, {firstName}
        </h1>

        <div className="premium-card mt-8 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-50">Profile details</h2>
          <dl className="mt-6 divide-y divide-slate-700/60">
            {profileRows.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <dt className="text-sm font-semibold text-slate-500">{row.label}</dt>
                <dd className="break-all text-slate-200 sm:text-right">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/settings" className="btn-home-secondary min-h-[48px] px-6 py-3">
            Edit profile
          </Link>
          <Link
            href="/logout"
            className="btn-home-secondary min-h-[48px] px-6 py-3 hover:border-red-400/50 hover:text-red-300"
          >
            Logout
          </Link>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
