import { NextResponse } from "next/server";

import { GREY_POINT_VALUES } from "@/lib/grey/config";
import { getGreySummary } from "@/lib/grey/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({
        profile: {
          totalPoints: 0,
          spentPoints: 0,
          availablePoints: 0,
          currentStreak: 0,
          longestStreak: 0,
          lastActivityDate: null,
        },
        pathProgress: [],
        badges: [],
        store: [],
        recentEvents: [],
        pointValues: GREY_POINT_VALUES,
      });
    }

    const summary = await getGreySummary(supabase, user.id);
    return NextResponse.json({ ...summary, pointValues: GREY_POINT_VALUES });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not load Grey Points summary." },
      { status: 500 }
    );
  }
}
