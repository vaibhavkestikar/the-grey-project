"use client";

import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

type Props = {
  moduleName: string;
};

export default function NotifyButton({
  moduleName,
}: Props) {

  const [loading, setLoading] =
    useState(false);

  const [subscribed, setSubscribed] =
    useState(false);

  async function handleNotify() {

    try {

      setLoading(true);

      const supabase =
        createClient();

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {

        alert(
          "Please login first."
        );

        return;

      }

      const {
        error,
      } =
        await supabase
          .from("module_waitlist")
          .insert({

            user_id:
              user.id,

            email:
              user.email,

            module_name:
              moduleName,

          });

      if (error) {

        if (
          error.message.includes(
            "duplicate"
          )
        ) {

          alert(
            "You already joined the waitlist."
          );

          return;

        }

        alert(error.message);

        return;

      }

      setSubscribed(true);

    } catch (err) {

      console.error(err);

      alert(
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }

  }

  if (subscribed) {

    return (

      <div className="inline-flex items-center rounded-2xl bg-green-100 px-6 py-4 font-semibold text-green-700">

        ✓ You'll be notified

      </div>

    );

  }

  return (

    <button
      onClick={handleNotify}
      disabled={loading}
      className="inline-flex rounded-2xl bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
    >

      {loading
        ? "Saving..."
        : "Notify Me"}

    </button>

  );
}