import { NextResponse } from "next/server";

import {
  CERTIFICATE_PATHS,
  getCertificatePath,
  hasCertificateIssued,
  isPathFullyComplete,
} from "@/lib/learning/certificate";
import { splitFullName } from "@/lib/utils/name";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ certificates: [] });
    }

    const { data: profile } = await supabase
      .from("user_profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle();

    const { firstName, lastName } = splitFullName(profile?.full_name);
    const certificates = [];

    for (const pathId of Object.keys(CERTIFICATE_PATHS)) {
      const config = getCertificatePath(pathId);
      if (!config) continue;

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
      const completedLessons = config.lessonSlugs.filter(
        (slug) => rows.find((row) => row.lesson_slug === slug)?.completed
      ).length;

      const issuedRow = rows.find(
        (row) => row.lesson_slug === config.lastLessonSlug && row.certificate_issued
      );

      certificates.push({
        pathId,
        pathTitle: config.title,
        pathDescription: config.description,
        lessonCount: config.lessonSlugs.length,
        completedLessons,
        eligible,
        issued,
        recipientName: issued ? profile?.full_name?.trim() || null : null,
        firstName,
        lastName,
        completedAt: issuedRow?.updated_at ?? null,
        href: `/learning/${pathId}/certificate`,
      });
    }

    return NextResponse.json({ certificates });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
