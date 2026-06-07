import { createClient } from "@/lib/supabase/server";

export async function getResumeLesson() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from("lesson_progress")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("getResumeLesson:", error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error("getResumeLesson failed:", err);
    return null;
  }
}
