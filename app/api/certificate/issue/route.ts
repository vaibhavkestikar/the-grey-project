import { NextResponse } from "next/server";

import {
  getCertificatePath,
  hasCertificateIssued,
  isPathFullyComplete,
} from "@/lib/learning/certificate";
import { formatCertificateName } from "@/lib/utils/name";
import { createClient } from "@/lib/supabase/server";

type IssueBody = {
  path_id?: string;
  first_name?: string;
  last_name?: string;
};

async function getProfileName(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("full_name")
    .eq("id", userId)
    .maybeSingle();

  return profile?.full_name?.trim() || null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as IssueBody;
    const pathId = body.path_id ?? "curious-builders";
    const config = getCertificatePath(pathId);

    if (!config) {
      return NextResponse.json({ error: "Unknown learning path." }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }

    const { data: progress, error: progressError } = await supabase
      .from("lesson_progress")
      .select("lesson_slug, completed, certificate_issued, updated_at")
      .eq("user_id", user.id)
      .eq("course_slug", pathId);

    if (progressError) {
      return NextResponse.json({ error: progressError.message }, { status: 500 });
    }

    const rows = progress ?? [];

    if (!isPathFullyComplete(pathId, rows)) {
      return NextResponse.json(
        { error: "Complete every lesson in this path first." },
        { status: 400 }
      );
    }

    const issuedRow = rows.find(
      (row) => row.lesson_slug === config.lastLessonSlug
    );

    if (hasCertificateIssued(pathId, rows)) {
      const recipientName = await getProfileName(supabase, user.id);

      return NextResponse.json({
        issued: true,
        alreadyIssued: true,
        recipientName: recipientName ?? "Learner",
        pathTitle: config.title,
        pathDescription: config.description,
        completedAt: issuedRow?.updated_at ?? new Date().toISOString(),
      });
    }

    const firstName = body.first_name?.trim() ?? "";
    const lastName = body.last_name?.trim() ?? "";

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First name and last name are required for your certificate." },
        { status: 400 }
      );
    }

    const recipientName = formatCertificateName(firstName, lastName);

    const { error: profileError } = await supabase.from("user_profiles").upsert(
      {
        id: user.id,
        email: user.email,
        full_name: recipientName,
      },
      { onConflict: "id" }
    );

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    const { error: updateError } = await supabase
      .from("lesson_progress")
      .update({
        certificate_issued: true,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .eq("course_slug", pathId)
      .eq("lesson_slug", config.lastLessonSlug);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      issued: true,
      alreadyIssued: false,
      recipientName,
      pathTitle: config.title,
      pathDescription: config.description,
      completedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
