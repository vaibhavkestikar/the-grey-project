export type SiteFeedbackPayload = {
  nps_score: number;
  overall_rating: number;
  clarity_rating: number;
  interactivity_rating: number;
  open_feedback?: string;
  build_next?: string;
  email?: string;
};
