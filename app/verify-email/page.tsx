import { Suspense } from "react";

import VerifyEmailView from "@/components/auth/verify-email-view";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center">Loading...</main>}>
      <VerifyEmailView />
    </Suspense>
  );
}
