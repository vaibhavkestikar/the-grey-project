# V2 Architecture

```
app/
  page.tsx                 # Marketing home
  try/                     # Free sample (no auth)
  (auth)/                  # login, register, verify-email, welcome
  learning/                # Course paths (existing + engine)
  account/                 # Profile, XP, streak
  api/analytics/           # Event ingestion
  auth/callback/           # Supabase OAuth/email

components/
  marketing/               # Home sections
  learning/                # Lesson engine, course UI
  playgrounds/             # Interactive sandboxes
  growth/                  # Waitlist, CTAs
  shared/                  # Container, layout

content/
  courses/                 # MDX (legacy + migration)
  lessons/                 # Structured JSON lessons (V2)

types/                     # Lesson schema, user, analytics
services/analytics/        # track(), providers
lib/auth/                  # Redirects, errors
supabase/migrations/       # V2 schema
```

## Lesson content engine (V2)

Each lesson = ordered blocks: `hook` | `visual` | `play` | `checkpoint` | `build` | `reflect`

See `types/lesson.ts` and `content/lessons/lesson-*.ts`.
