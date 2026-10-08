export const GREY_POINTS_SOUND_EVENT = "grey-points-sound-change";
export const GREY_POINTS_SOUND_STORAGE_KEY = "grey-points-sound";

// Next serves files from /public at the site root.
const GREY_POINTS_SOUND_SRC = "/Audio/grey_points_ping.wav";

export function isGreyPointsSoundEnabled() {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(GREY_POINTS_SOUND_STORAGE_KEY) !== "off";
}

export function setGreyPointsSoundEnabled(enabled: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GREY_POINTS_SOUND_STORAGE_KEY, enabled ? "on" : "off");
  window.dispatchEvent(
    new CustomEvent(GREY_POINTS_SOUND_EVENT, { detail: { enabled } })
  );
}

export function subscribeToGreyPointsSound(
  callback: (enabled: boolean) => void
) {
  if (typeof window === "undefined") return () => {};

  function handleChange() {
    callback(isGreyPointsSoundEnabled());
  }

  window.addEventListener(GREY_POINTS_SOUND_EVENT, handleChange);
  window.addEventListener("storage", handleChange);

  return () => {
    window.removeEventListener(GREY_POINTS_SOUND_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
}

export function playGreyPointsSound() {
  if (typeof window === "undefined" || !isGreyPointsSoundEnabled()) return;

  const audio = new Audio(GREY_POINTS_SOUND_SRC);
  audio.volume = 0.55;
  void audio.play().catch(() => {
    // Browsers can block audio before user interaction. Points still count.
  });
}
