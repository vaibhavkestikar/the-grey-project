-- College workshop inquiry leads (TPOs, clubs, admins)

CREATE TABLE IF NOT EXISTS public.workshop_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  college TEXT NOT NULL,
  role TEXT NOT NULL,
  student_count INTEGER,
  preferred_dates TEXT,
  phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_workshop_inquiries_created
  ON public.workshop_inquiries (created_at DESC);

ALTER TABLE public.workshop_inquiries ENABLE ROW LEVEL SECURITY;
