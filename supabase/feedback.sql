-- Feedback tables for The Grey Project
-- Run this in the Supabase SQL editor.

-- ---------------------------------------------------------------------------
-- 1. Site-wide feedback (NPS + key metrics)
-- ---------------------------------------------------------------------------
CREATE TABLE site_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT,
  nps_score SMALLINT NOT NULL CHECK (nps_score >= 0 AND nps_score <= 10),
  overall_rating SMALLINT NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  clarity_rating SMALLINT NOT NULL CHECK (clarity_rating >= 1 AND clarity_rating <= 5),
  interactivity_rating SMALLINT NOT NULL CHECK (interactivity_rating >= 1 AND interactivity_rating <= 5),
  open_feedback TEXT,
  build_next TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX site_feedback_created_at_idx ON site_feedback (created_at DESC);
CREATE INDEX site_feedback_nps_score_idx ON site_feedback (nps_score);
CREATE INDEX site_feedback_user_id_idx ON site_feedback (user_id);

-- One submission per logged-in user (optional: remove if you want repeat feedback)
CREATE UNIQUE INDEX site_feedback_user_unique
  ON site_feedback (user_id)
  WHERE user_id IS NOT NULL;

ALTER TABLE site_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own site feedback"
  ON site_feedback FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own site feedback"
  ON site_feedback FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 2. Learning path completion feedback
-- ---------------------------------------------------------------------------
CREATE TABLE path_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT,
  path_id TEXT NOT NULL,
  path_title TEXT,
  nps_score SMALLINT NOT NULL CHECK (nps_score >= 0 AND nps_score <= 10),
  intuition_rating SMALLINT NOT NULL CHECK (intuition_rating >= 1 AND intuition_rating <= 5),
  interactivity_rating SMALLINT NOT NULL CHECK (interactivity_rating >= 1 AND interactivity_rating <= 5),
  favorite_part TEXT,
  missing_part TEXT,
  would_return BOOLEAN NOT NULL DEFAULT false,
  open_feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX path_feedback_path_id_idx ON path_feedback (path_id);
CREATE INDEX path_feedback_created_at_idx ON path_feedback (created_at DESC);
CREATE INDEX path_feedback_user_id_idx ON path_feedback (user_id);

CREATE UNIQUE INDEX path_feedback_user_path_unique
  ON path_feedback (user_id, path_id)
  WHERE user_id IS NOT NULL;

ALTER TABLE path_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own path feedback"
  ON path_feedback FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own path feedback"
  ON path_feedback FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 3. Helpful queries (run anytime)
-- ---------------------------------------------------------------------------

-- Site NPS (last 90 days)
-- Promoters: 9-10, Passives: 7-8, Detractors: 0-6
-- NPS = (promoters - detractors) / total * 100
/*
SELECT
  COUNT(*) AS responses,
  ROUND(100.0 * COUNT(*) FILTER (WHERE nps_score >= 9) / NULLIF(COUNT(*), 0), 1) AS promoter_pct,
  ROUND(100.0 * COUNT(*) FILTER (WHERE nps_score <= 6) / NULLIF(COUNT(*), 0), 1) AS detractor_pct,
  ROUND(
    100.0 * (
      COUNT(*) FILTER (WHERE nps_score >= 9)
      - COUNT(*) FILTER (WHERE nps_score <= 6)
    ) / NULLIF(COUNT(*), 0),
    1
  ) AS nps
FROM site_feedback
WHERE created_at >= NOW() - INTERVAL '90 days';
*/

-- Average key metrics (site)
/*
SELECT
  ROUND(AVG(overall_rating), 2) AS avg_overall,
  ROUND(AVG(clarity_rating), 2) AS avg_clarity,
  ROUND(AVG(interactivity_rating), 2) AS avg_interactivity,
  ROUND(AVG(nps_score), 2) AS avg_nps
FROM site_feedback;
*/

-- Path NPS by learning path
/*
SELECT
  path_id,
  path_title,
  COUNT(*) AS responses,
  ROUND(
    100.0 * (
      COUNT(*) FILTER (WHERE nps_score >= 9)
      - COUNT(*) FILTER (WHERE nps_score <= 6)
    ) / NULLIF(COUNT(*), 0),
    1
  ) AS nps,
  ROUND(AVG(intuition_rating), 2) AS avg_intuition,
  ROUND(AVG(interactivity_rating), 2) AS avg_interactivity,
  ROUND(100.0 * COUNT(*) FILTER (WHERE would_return) / NULLIF(COUNT(*), 0), 1) AS would_return_pct
FROM path_feedback
GROUP BY path_id, path_title
ORDER BY responses DESC;
*/

-- Recent open-ended feedback
/*
SELECT created_at, nps_score, open_feedback, build_next
FROM site_feedback
WHERE open_feedback IS NOT NULL OR build_next IS NOT NULL
ORDER BY created_at DESC
LIMIT 50;
*/
