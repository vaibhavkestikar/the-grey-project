import { completeAuthCallback } from "@/lib/auth/callback-handler";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const next = url.searchParams.get("next");

  let redirectPath = "/welcome";
  if (type === "recovery" || next === "/reset-password") {
    redirectPath = "/reset-password";
  } else if (type === "email_change") {
    redirectPath = "/settings?email_updated=1";
  } else if (next?.startsWith("/")) {
    redirectPath = next;
  }

  return completeAuthCallback({
    request,
    redirectPath,
    trackSignupComplete: redirectPath === "/welcome",
  });
}
