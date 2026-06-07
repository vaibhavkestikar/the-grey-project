export function firstNameFromEmail(email?: string | null): string {
  if (!email) return "there";
  const local = email.split("@")[0] ?? "";
  const first = local.split(/[._+-]/)[0] || local;
  if (!first) return "there";
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

export function splitFullName(fullName?: string | null): {
  firstName: string;
  lastName: string;
} {
  const parts = (fullName ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export function formatCertificateName(
  firstName: string,
  lastName: string
): string {
  return `${firstName.trim()} ${lastName.trim()}`.trim();
}

export function firstNameFrom(
  fullName?: string | null,
  email?: string | null
): string {
  const name = (fullName ?? "").trim();
  if (name) return name.split(/\s+/)[0];
  return firstNameFromEmail(email);
}
