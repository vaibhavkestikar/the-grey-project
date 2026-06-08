-- Grey Points gamification core

CREATE TABLE IF NOT EXISTS public.grey_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_points INTEGER NOT NULL DEFAULT 0,
  spent_points INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.grey_points_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_key TEXT NOT NULL,
  event_type TEXT NOT NULL,
  path_id TEXT NOT NULL,
  lesson_slug TEXT,
  step_index INTEGER,
  points INTEGER NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, event_key)
);

CREATE TABLE IF NOT EXISTS public.grey_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  path_id TEXT NOT NULL,
  lesson_slug TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, badge_id)
);

CREATE TABLE IF NOT EXISTS public.grey_store_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  points_spent INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, item_id)
);

CREATE INDEX IF NOT EXISTS idx_grey_points_ledger_user_created
  ON public.grey_points_ledger (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_grey_badges_user_earned
  ON public.grey_badges (user_id, earned_at DESC);

ALTER TABLE public.grey_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grey_points_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grey_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grey_store_redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own grey profile" ON public.grey_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own grey profile" ON public.grey_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own grey profile" ON public.grey_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users read own grey ledger" ON public.grey_points_ledger
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own grey ledger" ON public.grey_points_ledger
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users read own grey badges" ON public.grey_badges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own grey badges" ON public.grey_badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users read own grey redemptions" ON public.grey_store_redemptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own grey redemptions" ON public.grey_store_redemptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
