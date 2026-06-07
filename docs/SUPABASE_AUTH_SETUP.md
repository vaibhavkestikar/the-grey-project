# Supabase setup (V2)

## Redirect URLs

Add these under Authentication → URL Configuration → Redirect URLs:

```
https://thegreyproject.com/auth/callback
https://thegreyproject.com/auth/callback/recovery
https://thegreyproject.com/auth/callback?type=recovery
https://thegreyproject.com/auth/callback?type=email_change
http://localhost:3000/auth/callback
http://localhost:3000/auth/callback/recovery
http://localhost:3000/auth/callback?type=email_change
```

If your site is also reachable via `www`, add those variants too:

```
https://www.thegreyproject.com/auth/callback
https://www.thegreyproject.com/auth/callback/recovery
```

Set **Site URL** to your production domain:

```
https://thegreyproject.com
```

## Confirm email

Keep **enabled** under Authentication → Providers → Email.

## Email template (Confirm signup)

**Subject:** Welcome To The Grey Project

**Body:** You're one click away from understanding AI deeply. [Verify Email]({{ .ConfirmationURL }})

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

Important: auth email links use the browser origin on the client, so signup and reset from production will point to production. If old emails still open localhost, those were generated during local testing. Resend verification or request a new reset link from production.
