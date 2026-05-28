"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function ProtectedLink({
  href,
  children,
  className,
}: Props) {

  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {

    async function checkAuth() {

      const supabase =
        createClient();

      const {
        data: { session },
      } =
        await supabase.auth.getSession();

      setAuthenticated(
        !!session
      );

    }

    checkAuth();

  }, []);

  return (

    <Link
      href={
        authenticated
          ? href
          : "/register"
      }
      className={className}
    >
      {children}
    </Link>

  );
}