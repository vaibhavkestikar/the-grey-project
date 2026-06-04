export type AnalyticsEvent =
  | "page_view"
  | "sample_started"
  | "sample_completed"
  | "signup_started"
  | "user_signup"
  | "email_sent"
  | "email_verified"
  | "signup_completed"
  | "lesson_started"
  | "lesson_completed"
  | "checkpoint_passed"
  | "playground_used"
  | "waitlist_joined";

export type AnalyticsPayload = {
  event: AnalyticsEvent;
  properties?: Record<string, string | number | boolean>;
  userId?: string;
};
