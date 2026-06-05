-- Prevent duplicate waitlist signups for the same email on the same learning path.
-- Run in Supabase SQL editor after cleaning any existing duplicates (see below).

-- Optional: remove duplicate rows first (keeps earliest signup per email + path)
/*
DELETE FROM module_waitlist a
USING module_waitlist b
WHERE a.id > b.id
  AND lower(a.email) = lower(b.email)
  AND a.module_name = b.module_name;
*/

CREATE UNIQUE INDEX IF NOT EXISTS module_waitlist_email_module_unique
  ON module_waitlist (lower(email), module_name);
