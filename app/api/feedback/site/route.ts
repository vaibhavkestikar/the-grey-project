import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { parseRating } from "@/lib/api/rating";
import type { SiteFeedbackPayload } from "@/types/feedback";

export async function POST(request: Request) {
  const body = (await request.json()) as SiteFeedbackPayload;

  const nps = parseRating(body.nps_score, 0, 10);
  const overall = parseRating(body.overall_rating, 1, 5);
  const clarity = parseRating(body.clarity_rating, 1, 5);
  const interactivity = parseRating(body.interactivity_rating, 1, 5);

  if (nps === null || overall === null || clarity === null || interactivity === null) {
    return NextResponse.json({ error: "Please answer all rating questions." }, { status: 400 });
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
      { error: "Add your email so I know who to thank (or apologize to)." },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Feedback is not configured yet." }, { status: 500 });
  }

  const row = {
    user_id: userId,
    email,
    nps_score: nps,
    overall_rating: overall,
    clarity_rating: clarity,
    interactivity_rating: interactivity,
    open_feedback: body.open_feedback?.trim() || null,
    build_next: body.build_next?.trim() || null,
  };

  const { error } = await admin.from("site_feedback").insert(row);

  if (error?.code === "23505") {
    return NextResponse.json(
      { error: "You already shared site feedback. Thank you. I read every one." },
      { status: 409 }
    );
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
