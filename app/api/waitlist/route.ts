import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const email = (body.email as string | undefined)?.trim().toLowerCase();
  const moduleName = body.module_name as string | undefined;

  if (!email || !moduleName) {
    return NextResponse.json(
      { error: "Email and module are required." },
      { status: 400 }
    );
  }

  let userId: string | null = null;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {
    userId = null;
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Waitlist is not configured." },
      { status: 500 }
    );
  }

  const { data: existing } = await admin
    .from("module_waitlist")
    .select("id")
    .eq("module_name", moduleName)
    .ilike("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      {
        already_joined: true,
        error: "This email is already on the waitlist for this learning path.",
      },
      { status: 409 }
    );
  }

  const { error } = await admin.from("module_waitlist").insert({
    email,
    module_name: moduleName,
    user_id: userId,
  });

  if (error?.code === "23505") {
    return NextResponse.json(
      {
        already_joined: true,
        error: "This email is already on the waitlist for this learning path.",
      },
      { status: 409 }
    );
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
