"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import SiteNavbar from "@/components/marketing/site-navbar";
import { useAuth } from "@/components/providers/auth-provider";
import { getEmailChangeCallbackUrl } from "@/lib/auth/redirect-url";
import { waitForAuthSession } from "@/lib/auth/wait-for-session";
import { createClient } from "@/lib/supabase/client";

function SettingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [learningGoal, setLearningGoal] = useState("");
  const [country, setCountry] = useState("");
  const [experience, setExperience] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailChangeError, setEmailChangeError] = useState(false);

  useEffect(() => {
    if (searchParams.get("error") === "email_change_callback") {
      setEmailChangeError(true);
      toast.error(
        "That email confirmation link expired or opened in a different browser tab. Request a new one below."
      );
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.get("email_updated") !== "1" || authLoading || !user) {
      return;
    }

    void (async () => {
      await waitForAuthSession(supabase);
      const {
        data: { user: latestUser },
      } = await supabase.auth.getUser();

      if (latestUser?.email) {
        setEmail(latestUser.email);
        await supabase
          .from("user_profiles")
          .update({ email: latestUser.email })
          .eq("id", latestUser.id);
      }

      toast.success("Email address updated.");
      router.replace("/settings");
    })();
  }, [authLoading, router, searchParams, supabase, user]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    setEmail(user.email || "");

    void (async () => {
      setProfileLoading(true);

      const { data: profile, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
        toast.error("Could not load your profile.");
      } else if (profile) {
        setFullName(profile.full_name || "");
        setJobRole(profile.current_job_role || "");
        setLearningGoal(profile.learning_goal || "");
        setCountry(profile.country || "");
        setExperience(profile.years_of_experience || "");
        setLinkedin(profile.linkedin_url || "");
      }

      setProfileLoading(false);
    })();
  }, [authLoading, user, router, supabase]);

  async function updateProfile() {
    if (!user) return;

    try {
      setLoading(true);

      const { error } = await supabase.from("user_profiles").upsert(
        {
          id: user.id,
          email: user.email,
          full_name: fullName,
          current_job_role: jobRole,
          learning_goal: learningGoal,
          country,
          years_of_experience: experience,
          linkedin_url: linkedin,
        },
        { onConflict: "id" }
      );

      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Profile updated.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function updateEmail() {
    if (!user) return;

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser(
        { email },
        { emailRedirectTo: getEmailChangeCallbackUrl() }
      );
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Confirmation sent to your new email address.");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updatePassword() {
    if (!user) return;

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Password updated.");
      setNewPassword("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const input =
    "w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-violet-500";

  if (authLoading || profileLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <p className="text-slate-600">Loading your profile...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <SiteNavbar />

      <section className="px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">
            <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
              Account settings
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Your profile
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Manage your learning identity and account preferences.
            </p>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-black text-slate-950">
                Profile information
              </h2>
              <div className="mt-6 grid gap-4">
                <label className="text-sm font-semibold text-slate-500">
                  Full name
                  <input
                    type="text"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`mt-2 ${input}`}
                  />
                </label>
                <label className="text-sm font-semibold text-slate-500">
                  Current role
                  <input
                    type="text"
                    placeholder="Current role"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className={`mt-2 ${input}`}
                  />
                </label>
                <label className="text-sm font-semibold text-slate-500">
                  Learning goal
                  <input
                    type="text"
                    placeholder="Learning goal"
                    value={learningGoal}
                    onChange={(e) => setLearningGoal(e.target.value)}
                    className={`mt-2 ${input}`}
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-500">
                    Country
                    <input
                      type="text"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className={`mt-2 ${input}`}
                    />
                  </label>
                  <label className="text-sm font-semibold text-slate-500">
                    Years of experience
                    <input
                      type="text"
                      placeholder="e.g. 3"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className={`mt-2 ${input}`}
                    />
                  </label>
                </div>
                <label className="text-sm font-semibold text-slate-500">
                  LinkedIn URL
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/you"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className={`mt-2 ${input}`}
                  />
                </label>
                <button
                  onClick={updateProfile}
                  disabled={loading}
                  className="mt-2 rounded-2xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
                >
                  Save profile
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-black text-slate-950">Change email</h2>
              <p className="mt-2 text-sm text-slate-500">
                Current email: <span className="font-semibold text-slate-800">{email}</span>
              </p>
              {emailChangeError && (
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
                  Your confirmation link expired or opened outside the browser where you
                  requested the change. Enter the new email and click Update email again.
                </div>
              )}
              <div className="mt-6 space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={input}
                />
                <button
                  onClick={updateEmail}
                  disabled={loading}
                  className="rounded-2xl bg-slate-950 px-8 py-4 font-semibold text-white transition hover:bg-slate-800"
                >
                  Update email
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-black text-slate-950">
                Change password
              </h2>
              <div className="mt-6 space-y-4">
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={input}
                />
                <button
                  onClick={updatePassword}
                  disabled={loading}
                  className="rounded-2xl bg-slate-950 px-8 py-4 font-semibold text-white transition hover:bg-slate-800"
                >
                  Update password
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
          <p className="text-slate-600">Loading your profile...</p>
        </main>
      }
    >
      <SettingsContent />
    </Suspense>
  );
}
