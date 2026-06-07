import { Suspense } from "react";

import PasswordResetSentView from "@/components/auth/password-reset-sent-view";

export default function PasswordResetSentPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-slate-600">Loading...</p>
        </main>
      }
    >
      <PasswordResetSentView />
    </Suspense>
  );
}
