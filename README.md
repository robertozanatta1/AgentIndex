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
- `data/usecases.json` — directory entries (slug, title, category, description, tags, tools, steps, link)
- `data/sponsor.json` — featured sponsor (empty name = "Your brand here")
- `data/subscribers.json` — local newsletter signups (gitignored; replace with Resend in production)

## Env vars
See `.env.example`. Stripe Payment Link URLs go in `NEXT_PUBLIC_STRIPE_LINK_HOMEPAGE` / `NEXT_PUBLIC_STRIPE_LINK_NEWSLETTER`; if unset, sponsor buttons fall back to a mailto.

## Deploy
Push to GitHub, import in Vercel, set env vars, deploy.

## Contact
Owner: robertozanatta1@gmail.com
