"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import Link from "next/link";

import { useRouter } from "next/navigation";

import AuthHeader from "@/components/auth/auth-header";

import { getAuthCallbackUrl } from "@/lib/auth/redirect-url";

import { trackAuthFunnelEvent } from "@/lib/auth/funnel";

import { syncGuestFreeLessonsForSignup } from "@/lib/learning/guest-progress";

import { track } from "@/services/analytics/track";

import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {

  const router = useRouter();

  const supabase = createClient();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    current_job_role: "",
    learning_goal: "",
  });

  const [roleOther, setRoleOther] = useState("");

  const resolvedRole =
    form.current_job_role === "Other"
      ? roleOther.trim() || "Other"
      : form.current_job_role;

  useEffect(() => {
    syncGuestFreeLessonsForSignup();
  }, []);

  async function handleRegister(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);
      syncGuestFreeLessonsForSignup();

      track("signup_started");

      const nextPath = new URLSearchParams(window.location.search).get("next");
      const emailRedirectTo = nextPath?.startsWith("/")
        ? `${getAuthCallbackUrl()}&next=${encodeURIComponent(nextPath)}`
        : getAuthCallbackUrl();

      const {
        data,
        error,
      } =
        await supabase.auth.signUp({

          email: form.email,

          password: form.password,

          options: {

            emailRedirectTo,

            data: {

              full_name:
                form.full_name,

            },

          },

        });

      if (error) {

        toast.error(error.message);

        setLoading(false);

        return;

      }

      // Supabase returns a user with no identities when the email already exists
      // (no error, no verification email) to prevent email enumeration.
      if (data.user && (data.user.identities?.length ?? 0) === 0) {
        toast.error(
          "An account with this email already exists. Sign in instead, or reset your password if you forgot it."
        );

        setLoading(false);

        return;

      }

      const userId =
        data.user?.id;

      if (userId) {

        await supabase
          .from("user_profiles")
          .insert({

            id: userId,

            full_name:
              form.full_name,

            email:
              form.email,

            current_job_role:
              resolvedRole,

            learning_goal:
              form.learning_goal,

          });

        await trackAuthFunnelEvent(userId, "user_signup");
        await trackAuthFunnelEvent(userId, "email_sent");
      }

      sessionStorage.setItem("pending_verify_email", form.email);

      setLoading(false);

      toast.success(
        "Account created. Verify your email to continue."
      );

      router.push(
        `/verify-email?email=${encodeURIComponent(form.email)}`
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Something went wrong during registration."
      );

      setLoading(false);

    }

  }

  return (

    <>
      <AuthHeader />

      <main className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-surface px-4 py-10 md:px-6 md:py-16">

        <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />

        <div className="auth-shell max-w-2xl">

          <h1 className="text-4xl font-black leading-tight text-ink md:text-5xl">
            Join The Grey Project
          </h1>

          <p className="mt-4 text-base text-ink-muted md:text-lg">
            Learn AI deeply from first principles.
          </p>

          <form
            onSubmit={handleRegister}
            className="mt-8 grid gap-5 md:mt-10"
          >

            <input
              type="text"
              placeholder="Full Name"
              required
              value={form.full_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  full_name:
                    e.target.value,
                })
              }
              className="auth-input"
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email:
                    e.target.value,
                })
              }
              className="auth-input"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
              className="auth-input"
            />

            <select
              required
              value={form.current_job_role}
              onChange={(e) =>
                setForm({
                  ...form,
                  current_job_role:
                    e.target.value,
                })
              }
              className="auth-input"
            >

              <option value="">
                Current Role
              </option>

              <option>
                Student
              </option>

              <option>
                Software Engineer
              </option>

              <option>
                Data Analyst
              </option>

              <option>
                ML Engineer
              </option>

              <option>
                Product Manager
              </option>

              <option>
                Founder
              </option>

              <option>
                Data Scientist
              </option>

              <option>
                Other
              </option>

            </select>

            {form.current_job_role === "Other" && (
              <input
                type="text"
                placeholder="Please specify your role"
                required
                value={roleOther}
                onChange={(e) => setRoleOther(e.target.value)}
                className="auth-input"
              />
            )}

            <select
              required
              value={form.learning_goal}
              onChange={(e) =>
                setForm({
                  ...form,
                  learning_goal:
                    e.target.value,
                })
              }
              className="auth-input"
            >

              <option value="">
                Why are you learning AI?
              </option>

              <option>
                Get AI Job
              </option>

              <option>
                Build AI Startup
              </option>

              <option>
                Learn GenAI
              </option>

              <option>
                AI Research
              </option>

              <option>
                Production ML
              </option>

              <option>
                AI Agents
              </option>

            </select>

            <button
              type="submit"
              disabled={loading}
              className="btn-cta mt-2 w-full"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <div className="mt-8 text-center text-sm">

            <Link
              href="/login"
              className="font-medium text-brand-accent"
            >
              Already have an account?
            </Link>

          </div>

        </div>

      </main>
    </>

  );
}