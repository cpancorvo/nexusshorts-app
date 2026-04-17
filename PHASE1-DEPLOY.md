# Phase 1 — Auth + Database

This adds real user accounts and a Postgres database to nexusshorts.studio. After this phase, users can sign up, log in, and create their own series (which save to the database).

---

## Step 1: Create free accounts (10 min)

### Clerk (authentication)
1. Go to **[clerk.com](https://clerk.com)** → **Sign up** with GitHub
2. Click **Create application**
3. Name: `NexusShorts`. Enable: Email, Google, Apple (whichever you want as sign-in methods)
4. Click **Create application**
5. On the left sidebar, click **API Keys**. Leave this tab open — you'll copy two values from here in Step 3.

### Neon (database)
1. Go to **[neon.tech](https://neon.tech)** → **Sign up** with GitHub
2. Create a project: name it `nexusshorts`, region closest to you, Postgres 16
3. Once created, click **Dashboard** → **Connection string**
4. You'll see two strings — you need **both**:
   - The **Pooled connection** (has `-pooler` in the hostname) → this is `DATABASE_URL`
   - Click the dropdown and switch to **Direct connection** → this is `DIRECT_DATABASE_URL`
5. Keep this tab open too.

---

## Step 2: Copy these files into your local repo (5 min)

You have a GitHub Desktop folder for `nexusshorts.studio-` on your computer. Open it in File Explorer.

Unzip `phase1-files.zip` and copy **everything inside** into your repo folder, overwriting existing files when prompted:

- `package.json` (replaces existing — adds Clerk, Prisma, Svix)
- `middleware.ts` (new, at root)
- `.env.example` (replaces existing)
- `prisma/` folder (new, at root)
- `lib/` folder (new, at root)
- `app/layout.tsx` (replaces — wraps in ClerkProvider)
- `app/dashboard/page.tsx` (replaces — reads real DB data)
- `app/sign-in/` folder (new)
- `app/sign-up/` folder (new)
- `app/api/` folder (new — webhook + series routes)
- `app/dashboard/series/` folder (new — new-series wizard)

---

## Step 3: Add environment variables in Vercel (5 min)

1. Go to **vercel.com → your project → Settings → Environment Variables**
2. Add each of these. Apply to **Production, Preview, and Development**:

| Key | Where to find the value |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk → API Keys → Publishable key |
| `CLERK_SECRET_KEY` | Clerk → API Keys → Secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | type `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | type `/sign-up` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | type `/dashboard` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | type `/dashboard` |
| `DATABASE_URL` | Neon pooled connection string |
| `DIRECT_DATABASE_URL` | Neon direct connection string |
| `CLERK_WEBHOOK_SECRET` | **leave blank for now** — fill in at Step 5 |

3. Save each one.

---

## Step 4: Push the schema to Neon (3 min)

On your computer, open a terminal (Mac: Terminal; Windows: PowerShell) and navigate to your repo folder. Then:

```bash
npm install
```

Wait for it to finish (~30 seconds). Then create a temporary `.env` file with just the database URLs:

```bash
# Mac/Linux
echo 'DATABASE_URL="paste-your-pooled-url-here"' > .env
echo 'DIRECT_DATABASE_URL="paste-your-direct-url-here"' >> .env

# Windows (PowerShell)
'DATABASE_URL="paste-your-pooled-url-here"' | Out-File -FilePath .env -Encoding utf8
'DIRECT_DATABASE_URL="paste-your-direct-url-here"' | Out-File -FilePath .env -Append -Encoding utf8
```

Then push the schema:

```bash
npx prisma db push
```

Expected output: `🚀 Your database is now in sync with your Prisma schema.`

**Delete the local `.env` file after** — Vercel has the real ones for production.

---

## Step 5: Commit and deploy (3 min)

In GitHub Desktop:
1. You'll see all the changed files in the left panel
2. Summary: `phase 1: auth and database`
3. Click **Commit to main**
4. Click **Push origin**

Vercel auto-deploys in ~90 seconds. Watch the deployment — first load after deploy might take 20 seconds because Prisma is cold-starting.

---

## Step 6: Set up the Clerk webhook (5 min)

Once deployed, the webhook keeps the User table in sync with Clerk:

1. Go to **Clerk dashboard → Webhooks → Add Endpoint**
2. Endpoint URL: `https://nexusshorts.studio/api/webhooks/clerk`
3. Subscribe to events: `user.created`, `user.updated`, `user.deleted`
4. Click **Create**
5. Copy the **Signing Secret** (starts with `whsec_...`)
6. Back in Vercel → Environment Variables → set `CLERK_WEBHOOK_SECRET` to that value
7. Redeploy (Vercel → Deployments → three-dot menu on latest → Redeploy)

---

## Step 7: Test it end-to-end

1. Open `https://nexusshorts.studio` in incognito
2. Click **Start free** → redirects to `/sign-up`
3. Sign up with email or Google
4. You land on `/dashboard` with the empty state
5. Click **+ New series**, fill the form, click **Create**
6. You're back on the dashboard with one series showing
7. Sign out, sign back in — your series is still there (persistent in Postgres ✓)

---

## Verify the database

Want to see your data? Run locally:
```bash
npx prisma studio
```
Opens a DB browser at `http://localhost:5555`. You'll see the `User` and `Series` tables.

---

## What works now
- ✅ Sign up / sign in with email, Google, Apple
- ✅ Protected `/dashboard` route
- ✅ User profile synced from Clerk to our DB
- ✅ Creating series (saves to Postgres)
- ✅ Dashboard reads real data per-user
- ✅ Usage meter tracking monthly quota
- ✅ Plan-aware UI (shows "Upgrade" for FREE users)

## What's still placeholder
- Clicking a series card links to `/dashboard/series/[id]` — that page doesn't exist yet (Phase 2)
- No way to generate episodes yet (Phase 3)
- No payments yet (Phase 2)
- "Library", "Schedule", "Analytics", "Voices" nav links all point back to dashboard

## Next: Phase 2 — Stripe
Once you've confirmed signup + series creation works, we wire in Stripe so people can actually pay for Starter/Creator/Agency plans. About 30 min of code on my end, ~20 min of clicks on yours.
