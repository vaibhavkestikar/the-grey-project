export function firstNameFromEmail(email?: string | null): string {
  if (!email) return "there";
  const local = email.split("@")[0] ?? "";
  const first = local.split(/[._+-]/)[0] || local;
  if (!first) return "there";
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

export function firstNameFrom(
  fullName?: string | null,
  email?: string | null
): string {
  const name = (fullName ?? "").trim();
  if (name) return name.split(/\s+/)[0];
  return firstNameFromEmail(email);
}
