"use client";

import { useState } from "react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

type Props = {
  moduleName: string;
};

export default function NotifyButton({ moduleName }: Props) {
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  async function handleNotify() {
    try {
      setLoading(true);

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please log in first.");
        return;
      }

      const { error } = await supabase.from("module_waitlist").insert({
        user_id: user.id,
        email: user.email,
        module_name: moduleName,
      });

      if (error) {
        if (error.code === "23505" || error.message.includes("duplicate")) {
          setAlreadyJoined(true);
          toast.info("You are already on the waitlist for this path.");
          return;
        }

        toast.error(error.message);
        return;
      }

      setSubscribed(true);
      toast.success("You are on the waitlist.");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (subscribed) {
    return (
      <div className="inline-flex items-center rounded-2xl bg-green-100 px-6 py-4 font-semibold text-green-700">
        ✓ You&apos;ll be notified
      </div>
    );
  }

  if (alreadyJoined) {
    return (
      <div className="inline-flex items-center rounded-2xl bg-amber-100 px-6 py-4 font-semibold text-amber-800">
        ✓ Already on the waitlist
      </div>
    );
  }

  return (
    <button
      onClick={handleNotify}
      disabled={loading}
      className="inline-flex rounded-2xl bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
    >
      {loading ? "Saving..." : "Notify Me. Limited Seats"}
    </button>
  );
}
