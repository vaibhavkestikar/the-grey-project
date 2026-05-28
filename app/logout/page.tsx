"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function LogoutPage() {

  const router = useRouter();

  useEffect(() => {

    async function logout() {

      const supabase =
        createClient();

      await supabase.auth.signOut();

      router.push("/");

    }

    logout();

  }, [router]);

  return (

    <main className="flex min-h-screen items-center justify-center bg-slate-50">

      <h1 className="text-2xl font-bold">
        Logging out...
      </h1>

    </main>

  );
}