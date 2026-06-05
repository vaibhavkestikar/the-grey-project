import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { PathFeedbackPayload } from "@/types/feedback";

function rating(n: unknown, min: number, max: number): number | null {
  if (typeof n !== "number" || !Number.isInteger(n) || n < min || n > max) {
    return null;
  }
  return n;
}

export async function GET(request: Request) {
  const pathId = new URL(request.url).searchParams.get("path_id");
  if (!pathId) {
    return NextResponse.json({ error: "path_id required" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ submitted: false });
  }

  const { data } = await supabase
    .from("path_feedback")
    .select("id")
    .eq("user_id", user.id)
    .eq("path_id", pathId)
    .maybeSingle();

  return NextResponse.json({ submitted: Boolean(data) });
}

export async function POST(request: Request) {
  const body = (await request.json()) as PathFeedbackPayload;

  const pathId = body.path_id?.trim();
  const pathTitle = body.path_title?.trim();
  const nps = rating(body.nps_score, 0, 10);
  const intuition = rating(body.intuition_rating, 1, 5);
  const interactivity = rating(body.interactivity_rating, 1, 5);

  if (!pathId || !pathTitle || nps === null || intuition === null || interactivity === null) {
    return NextResponse.json({ error: "Please answer all required questions." }, { status: 400 });
  }

  let userId: string | null = null;
  let email = body.email?.trim() || null;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id ?? null;
    if (user?.email) email = user.email;
  } catch {
    userId = null;
  }

  if (!userId && !email) {
    return NextResponse.json(
      { error: "Sign in or add an email so this feedback reaches a human." },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Feedback is not configured yet." }, { status: 500 });
  }

  const { error } = await admin.from("path_feedback").insert({
    user_id: userId,
    email,
    path_id: pathId,
    path_title: pathTitle,
    nps_score: nps,
    intuition_rating: intuition,
    interactivity_rating: interactivity,
    favorite_part: body.favorite_part?.trim() || null,
    missing_part: body.missing_part?.trim() || null,
    would_return: Boolean(body.would_return),
    open_feedback: body.open_feedback?.trim() || null,
  });

  if (error?.code === "23505") {
    return NextResponse.json({ success: true, duplicate: true });
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
