import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const email = (body.email as string | undefined)?.trim();
  const moduleName = body.module_name as string | undefined;

  if (!email || !moduleName) {
    return NextResponse.json(
      { error: "Email and module are required." },
      { status: 400 }
    );
  }

  // Attach the user id when someone is logged in (optional).
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

  // Service role bypasses RLS so anonymous visitors can join too.
  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Waitlist is not configured." },
      { status: 500 }
    );
  }

  const { error } = await admin.from("module_waitlist").insert({
    email,
    module_name: moduleName,
    user_id: userId,
  });

  // Unique violation (already on the list) is a success from the user's view.
  if (error && error.code !== "23505") {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
