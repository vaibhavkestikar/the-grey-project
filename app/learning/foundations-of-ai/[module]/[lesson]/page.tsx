import { redirect } from "next/navigation";

import { LEGACY_LESSON_REDIRECT } from "@/data/curious-builders-path";

type Props = {
  params: Promise<{ module: string; lesson: string }>;
};

export default async function LegacyLessonRedirect({ params }: Props) {
  const { lesson } = await params;
  const target = LEGACY_LESSON_REDIRECT[lesson] ?? "prediction";
  redirect(`/learning/curious-builders/${target}`);
}
