export type SiteFeedbackPayload = {
  nps_score: number;
  overall_rating: number;
  clarity_rating: number;
  interactivity_rating: number;
  open_feedback?: string;
  build_next?: string;
  email?: string;
};

export type PathFeedbackPayload = {
  path_id: string;
  path_title: string;
  nps_score: number;
  intuition_rating: number;
  interactivity_rating: number;
  favorite_part?: string;
  missing_part?: string;
  would_return: boolean;
  open_feedback?: string;
  email?: string;
};
