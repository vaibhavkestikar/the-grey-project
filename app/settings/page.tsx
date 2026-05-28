"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/layout/navbar";

import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {

  const supabase =
    createClient();

  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [jobRole, setJobRole] =
    useState("");

  const [learningGoal, setLearningGoal] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  useEffect(() => {

    async function loadProfile() {

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      setEmail(
        user.email || ""
      );

      const {
        data: profile,
      } =
        await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

      if (profile) {

        setFullName(
          profile.full_name || ""
        );

        setJobRole(
          profile.current_job_role || ""
        );

        setLearningGoal(
          profile.learning_goal || ""
        );

      }

    }

    loadProfile();

  }, []);

  async function updateProfile() {

    try {

      setLoading(true);

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      const { error } =
        await supabase
          .from("user_profiles")
          .update({

            full_name:
              fullName,

            current_job_role:
              jobRole,

            learning_goal:
              learningGoal,

          })
          .eq("id", user.id);

      if (error) {

        alert(error.message);

        return;

      }

      alert(
        "Profile updated successfully."
      );

    } catch (err) {

      console.error(err);

      alert(
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }

  }

  async function updateEmail() {

    try {

      setLoading(true);

      const { error } =
        await supabase.auth.updateUser({

          email,

        });

      if (error) {

        alert(error.message);

        return;

      }

      alert(
        "Confirmation email sent to your new email address."
      );

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  async function updatePassword() {

    try {

      setLoading(true);

      const { error } =
        await supabase.auth.updateUser({

          password:
            newPassword,

        });

      if (error) {

        alert(error.message);

        return;

      }

      alert(
        "Password updated successfully."
      );

      setNewPassword("");

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="min-h-screen bg-[#f8fafc]">

      <Navbar />

      <section className="py-20">

        <div className="mx-auto max-w-4xl px-6">

          <div className="mb-14">

            <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
              ACCOUNT SETTINGS
            </div>

            <h1 className="mt-6 text-6xl font-black tracking-tight text-slate-950">
              Your Profile
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-600">

              Manage your learning identity,
              account settings, and AI learning preferences.

            </p>

          </div>

          <div className="space-y-10">

            {/* PROFILE */}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">

              <h2 className="text-3xl font-black text-slate-950">
                Profile Information
              </h2>

              <div className="mt-8 grid gap-5">

                <input
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  className="rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-violet-500"
                />

                <input
                  type="text"
                  placeholder="Current role"
                  value={jobRole}
                  onChange={(e) =>
                    setJobRole(
                      e.target.value
                    )
                  }
                  className="rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-violet-500"
                />

                <input
                  type="text"
                  placeholder="Learning goal"
                  value={learningGoal}
                  onChange={(e) =>
                    setLearningGoal(
                      e.target.value
                    )
                  }
                  className="rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-violet-500"
                />

                <button
                  onClick={updateProfile}
                  disabled={loading}
                  className="rounded-2xl bg-violet-600 py-4 font-semibold text-white transition hover:bg-violet-700"
                >
                  Save Profile
                </button>

              </div>

            </div>

            {/* EMAIL */}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">

              <h2 className="text-3xl font-black text-slate-950">
                Change Email
              </h2>

              <div className="mt-8 space-y-5">

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-violet-500"
                />

                <button
                  onClick={updateEmail}
                  disabled={loading}
                  className="rounded-2xl bg-slate-950 px-8 py-4 font-semibold text-white transition hover:bg-slate-800"
                >
                  Update Email
                </button>

              </div>

            </div>

            {/* PASSWORD */}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl">

              <h2 className="text-3xl font-black text-slate-950">
                Change Password
              </h2>

              <div className="mt-8 space-y-5">

                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-violet-500"
                />

                <button
                  onClick={updatePassword}
                  disabled={loading}
                  className="rounded-2xl bg-slate-950 px-8 py-4 font-semibold text-white transition hover:bg-slate-800"
                >
                  Update Password
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>

  );
}