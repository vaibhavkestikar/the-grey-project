# Supabase setup (V2)

## Redirect URLs

```
https://thegreyproject.com/auth/callback
http://localhost:3000/auth/callback
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

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_SERVICE_ROLE_KEY=...
```
