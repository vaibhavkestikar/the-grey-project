-- Track completion certificate issuance on lesson progress rows

ALTER TABLE public.lesson_progress
  ADD COLUMN IF NOT EXISTS certificate_issued BOOLEAN NOT NULL DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_lesson_progress_certificate
  ON public.lesson_progress (user_id, course_slug, certificate_issued)
  WHERE certificate_issued = TRUE;
