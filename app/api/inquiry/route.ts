import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

function asString(value: unknown, max = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = asString(body.name, 120);
    const email = asString(body.email, 200).toLowerCase();
    const college = asString(body.college, 200);
    const role = asString(body.role, 120);
    const preferredDates = asString(body.preferred_dates, 200);
    const phone = asString(body.phone, 40);
    const notes = asString(body.notes, 2000);
    const studentCountRaw = body.student_count;

    if (!name || !email || !college || !role) {
      return NextResponse.json(
        { error: "Name, email, college, and role are required." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    let studentCount: number | null = null;
    if (studentCountRaw !== "" && studentCountRaw != null) {
      const n = Number(studentCountRaw);
      if (!Number.isFinite(n) || n < 1 || n > 10000) {
        return NextResponse.json(
          { error: "Number of students should be a whole number." },
          { status: 400 }
        );
      }
      studentCount = Math.round(n);
    }

    const admin = createAdminClient();
    if (!admin) {
      return NextResponse.json(
        { error: "Inquiry form is not configured. Email us directly." },
        { status: 500 }
      );
    }

    const { error } = await admin.from("workshop_inquiries").insert({
      name,
      email,
      college,
      role,
      student_count: studentCount,
      preferred_dates: preferredDates || null,
      phone: phone || null,
      notes: notes || null,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Could not send inquiry. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not send inquiry." }, { status: 500 });
  }
}
