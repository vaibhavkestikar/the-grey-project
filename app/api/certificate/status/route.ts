import { NextResponse } from "next/server";

import {
  getCertificatePath,
  hasCertificateIssued,
  isPathFullyComplete,
} from "@/lib/learning/certificate";
import { splitFullName } from "@/lib/utils/name";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const pathId =
      new URL(request.url).searchParams.get("path_id") ?? "curious-builders";
    const config = getCertificatePath(pathId);

    if (!config) {
      return NextResponse.json({ error: "Unknown learning path." }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({
        signedIn: false,
        eligible: false,
        issued: false,
      });
    }

    const { data: progress, error } = await supabase
      .from("lesson_progress")
      .select("lesson_slug, completed, certificate_issued, updated_at")
      .eq("user_id", user.id)
      .eq("course_slug", pathId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rows = progress ?? [];
    const eligible = isPathFullyComplete(pathId, rows);
    const issued = hasCertificateIssued(pathId, rows);

    const { data: profile } = await supabase
      .from("user_profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle();

    const { firstName, lastName } = splitFullName(profile?.full_name);

    const issuedRow = rows.find(
      (row) => row.lesson_slug === config.lastLessonSlug && row.certificate_issued
    );

    return NextResponse.json({
      signedIn: true,
      eligible,
      issued,
      recipientName: issued ? profile?.full_name?.trim() || null : null,
      firstName,
      lastName,
      pathTitle: config.title,
      pathDescription: config.description,
      completedAt: issuedRow?.updated_at ?? null,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
