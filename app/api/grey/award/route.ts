import { NextResponse } from "next/server";

import { awardGreyPoints, type GreyAwardInput } from "@/lib/grey/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ pointsAwarded: 0, badgesAwarded: [] });
    }

    const input = (await request.json()) as GreyAwardInput;
    const result = await awardGreyPoints(supabase, user, input);
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not award Grey Points." },
      { status: 500 }
    );
  }
}
