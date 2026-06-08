# Supabase setup (V2)

## Redirect URLs

Add these under Authentication → URL Configuration → Redirect URLs:

```
https://thegreyproject.com/auth/callback
https://thegreyproject.com/auth/callback?type=signup
https://thegreyproject.com/auth/callback/recovery
https://thegreyproject.com/auth/callback/recovery?type=recovery
https://thegreyproject.com/auth/callback?type=recovery
https://thegreyproject.com/auth/callback?type=email_change
http://localhost:3000/auth/callback
http://localhost:3000/auth/callback?type=signup
http://localhost:3000/auth/callback/recovery
http://localhost:3000/auth/callback/recovery?type=recovery
http://localhost:3000/auth/callback?type=email_change
```

If your site is also reachable via `www`, add those variants too:

```
https://www.thegreyproject.com/auth/callback
https://www.thegreyproject.com/auth/callback?type=signup
https://www.thegreyproject.com/auth/callback/recovery
```

Set **Site URL** to your production domain (non-www):

```
https://thegreyproject.com
```

Also set in Vercel:

```
NEXT_PUBLIC_SITE_URL=https://thegreyproject.com
```

This keeps auth links, cookies, and redirects on one canonical host.

## Confirm email

Keep **enabled** under Authentication → Providers → Email.

## Email template (Confirm signup)

Use a direct token link so verification works on mobile even when the signup
browser tab is gone (PKCE verifier cookie not required):

**Subject:** Welcome To The Grey Project

**Body:**

You're one click away from understanding AI deeply.

[Verify Email]({{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=signup)

Do **not** rely on `{{ .ConfirmationURL }}` alone for mobile signup verification.
That path can require the original browser session and fail in mobile Gmail/Chrome.

## Email template (Reset password)

Use a direct token link so password reset works on mobile even when the request
browser tab is gone (PKCE verifier cookie not required):

**Subject:** Reset your Grey Project password

**Body:**

Click below to choose a new password.

[Reset Password]({{ .SiteURL }}/auth/callback/recovery?token_hash={{ .TokenHash }}&type=recovery)

Do **not** rely on `{{ .ConfirmationURL }}` alone for mobile password reset.
That path can fail in mobile Gmail/Chrome for the same PKCE reason as signup verification.

## Email template (Change email address)

Supabase sends this when a user confirms a new email from **Authentication → Email Templates →
Change email address** (or "Confirm email change" depending on dashboard version).

Use a direct token link so confirmation works on mobile:

**Subject:** Confirm your new email for The Grey Project

**Body:**

Confirm your new email address:

[Confirm new email]({{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email_change)

Do **not** rely on `{{ .ConfirmationURL }}` alone. It can fail on mobile for the same PKCE reason.

## Migrations

Run in order:

1. `supabase/migrations/001_user_auth_funnel.sql` (if not applied)
2. `supabase/migrations/002_v2_schema.sql`

## Env

Local development:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_SERVICE_ROLE_KEY=...
```

Production (Vercel):

```
NEXT_PUBLIC_SITE_URL=https://thegreyproject.com
```

Important: auth email links use `NEXT_PUBLIC_SITE_URL` in production. If old emails
still open localhost, those were generated during local testing. Resend verification
from production after deploy.
