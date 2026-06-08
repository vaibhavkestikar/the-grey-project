-- Ensure lesson progress is readable/writable by owners and uniquely keyed per path lesson.

CREATE UNIQUE INDEX IF NOT EXISTS idx_lesson_progress_user_course_lesson
  ON public.lesson_progress (user_id, course_slug, lesson_slug);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'lesson_progress'
      AND policyname = 'Users read own lesson progress'
  ) THEN
    CREATE POLICY "Users read own lesson progress" ON public.lesson_progress
      FOR SELECT USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'lesson_progress'
      AND policyname = 'Users insert own lesson progress'
  ) THEN
    CREATE POLICY "Users insert own lesson progress" ON public.lesson_progress
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'lesson_progress'
      AND policyname = 'Users update own lesson progress'
  ) THEN
    CREATE POLICY "Users update own lesson progress" ON public.lesson_progress
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

-- Repair rows that reached the final step but never got completed=true.
UPDATE public.lesson_progress
SET
  completed = TRUE,
  progress_percent = 100,
  updated_at = NOW()
WHERE completed = FALSE
  AND progress_percent >= 100;
