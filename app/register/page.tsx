"use client";

import { useState } from "react";

import { toast } from "sonner";

import Link from "next/link";

import { useRouter } from "next/navigation";

import AuthHeader from "@/components/auth/auth-header";

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

  async function handleRegister(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/login`
          : "http://localhost:3000/login";

      const {
        data,
        error,
      } =
        await supabase.auth.signUp({

          email: form.email,

          password: form.password,

          options: {

            emailRedirectTo:
              redirectUrl,

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
              form.current_job_role,

            learning_goal:
              form.learning_goal,

          });

      }

      setLoading(false);

      toast.success(
        "Account created successfully"
      );

      router.push("/login");

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

      <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-10 md:px-6 md:py-16">

        <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />

        <div className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl md:p-10">

          <h1 className="text-4xl font-black leading-tight text-slate-900 md:text-5xl">
            Join The Grey Project
          </h1>

          <p className="mt-4 text-base text-slate-600 md:text-lg">
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
              className="rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-violet-500"
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
              className="rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-violet-500"
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
              className="rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-violet-500"
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
              className="rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-violet-500"
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

            </select>

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
              className="rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-violet-500"
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
              className="mt-2 rounded-2xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <div className="mt-8 text-center text-sm">

            <Link
              href="/login"
              className="font-medium text-violet-600"
            >
              Already have an account?
            </Link>

          </div>

        </div>

      </main>
    </>

  );
}