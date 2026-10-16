# AgentIndex
Proven AI agent use cases you can copy today. Next.js 14 (App Router) + TypeScript + Tailwind.

## Run locally
```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Content
- `data/usecases.json` — directory entries (slug, title, category, description, tags, tools, steps, link, optional `sponsored` / `sponsorRank`)
- `data/sponsor.json` — featured homepage sponsor slot (empty name = "Your brand here")
- `data/subscribers.json` — local newsletter signups (gitignored; replace with Resend in production)

## Sponsored listings
Listings with `"sponsored": true` in `data/usecases.json` appear **above organic results** when they match the current search/category filter. Among sponsored matches, lower `sponsorRank` wins, then title A–Z. Sponsored entries that do not match the filter stay hidden (same as organic).

Cards and detail pages show a clear **Sponsored** badge.

### How to add a sponsor (V1 — no payments yet)
1. Edit `data/usecases.json`
2. Set `"sponsored": true` on the use case
3. Optionally set `"sponsorRank": 1` (lower = higher among sponsored)
4. Commit and deploy

Read-only status checklist (temporary, **no auth** — do not expose as a real admin console): `/admin/sponsors`

Payments / Stripe for sponsored listings come later; the public `/sponsor` page remains for homepage/newsletter packages.

## Env vars
See `.env.example`. Stripe Payment Link URLs go in `NEXT_PUBLIC_STRIPE_LINK_HOMEPAGE` / `NEXT_PUBLIC_STRIPE_LINK_NEWSLETTER`; if unset, sponsor buttons fall back to a mailto.

## Deploy
Push to GitHub, import in Vercel, set env vars, deploy.

## Contact
Owner: robertozanatta1@gmail.com

## Payments (Stripe) & newsletter (Resend)

Set these in Vercel → Project `agentindex` → Settings → Environment Variables. Everything degrades gracefully if unset.

| Var | Purpose |
|---|---|
| `STRIPE_SECRET_KEY` | Server key for Checkout (`/api/checkout`) |
| `STRIPE_SPONSOR_PRICE_ID` | Price ID for "Sponsored listing". Default plan: **$99/month recurring**. Create in Stripe Dashboard → Products → Add product → recurring $99/mo → copy `price_...` |
| `STRIPE_SPONSOR_MODE` | Optional. `payment` for a one-time price (e.g. $149); default `subscription` |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks → endpoint `https://getagentindex.com/api/stripe/webhook`, event `checkout.session.completed` → copy `whsec_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Reserved for future embedded checkout (not required for hosted Checkout) |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_AUDIENCE_ID` | Optional. Adds signups to a Resend Audience |
| `NEWSLETTER_FROM` | Verified sender, e.g. `AgentIndex <hello@getagentindex.com>` (domain must be verified in Resend) |
| `CONTACT_EMAIL` | Owner inbox for new-sponsorship notifications |
| `NEXT_PUBLIC_SITE_URL` | `https://getagentindex.com` (Checkout redirect URLs) |

**Sponsorship persistence:** listings are static (`data/usecases.json`). The webhook logs and emails `CONTACT_EMAIL`; set `sponsored: true` + `sponsorRank` on the listing and redeploy (see `/admin/sponsors`). TODO: move to Vercel KV/Postgres for automatic activation.

**Newsletter fallback:** without Resend, signups go to `data/subscribers.json` (works locally only; Vercel FS is read-only).
