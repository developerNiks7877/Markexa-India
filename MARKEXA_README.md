# Markexa — build notes

Run: `npm install && npm run dev` (http://localhost:3000)

## Replace temporary content (no component edits needed)
| What | Where |
|---|---|
| Hero brand film | `data/media.ts` → `heroVideo: { mp4, webm?, mobileMp4?, poster? }` (files in `public/videos`, `public/images`) |
| Portfolio images | `data/media.ts` → `projectImages` keyed by project id; edit projects in `data/projects.ts` (all are labelled *Demo*) |
| Team | `data/team.ts` + `data/media.ts` → `teamImages` |
| Service / About images | `data/media.ts` → `serviceImages`, `aboutImage` |
| Email, phone, location, socials | `data/site.ts` (empty values show "Add …" and are not linked) |
| Partner logos | `data/services.ts` → `partners` (slots only, no invented partners) |

## Contact form
`/api/contact` validates server-side. Without env vars it runs in **demo mode** (nothing is sent; UI says so).
Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` to send real mail via Resend.

## Notes
- No new animation/3D dependencies. Added only two font packages: `@fontsource/instrument-serif`, `@fontsource-variable/schibsted-grotesk` (self-hosted).
- Twin-ring particle scene is an original canvas implementation (no paid ReactBits/OriginKit code). Two instances (hero, footer), each pauses offscreen/hidden tab.
- Reduced motion: no smooth scroll, no scroll-scrubbed motion, static particle frame, no hero video download.
