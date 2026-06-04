-- The Grey Project V2 schema

CREATE TABLE IF NOT EXISTS public.user_auth_funnel (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_signup_at TIMESTAMPTZ,
  email_sent_at TIMESTAMPTZ,
  email_verified_at TIMESTAMPTZ,
  signup_completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_name
  ON public.analytics_events (event_name, created_at DESC);

CREATE TABLE IF NOT EXISTS public.learner_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  knowledge_score INTEGER DEFAULT 0,
  last_active_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.lesson_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  blocks_completed INTEGER DEFAULT 0
);

ALTER TABLE public.user_auth_funnel ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own funnel" ON public.user_auth_funnel
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users read own learner profile" ON public.learner_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users update own learner profile" ON public.learner_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users insert own learner profile" ON public.learner_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);
