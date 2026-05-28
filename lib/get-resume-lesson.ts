import { createClient } from "@/lib/supabase/server";

export async function getResumeLesson() {

  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) return null;

  const {
    data,
  } =
    await supabase
      .from("lesson_progress")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", {
        ascending: false,
      })
      .limit(1)
      .single();

  return data;

}