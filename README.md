# Siam Ashraful — siamashraful.github.io

Investment & Data Analyst portfolio. Jekyll on GitHub Pages, hand-rolled design
system and animations, zero dependencies beyond the `github-pages` gem.

**Design:** "capital-markets terminal meets editorial" — dark-first with a full
light theme, hairline grids, mono tabular numerals, serif display type, and a
market-green accent system.

## Features

- Procedural canvas market chart that draws itself behind the hero and tracks the cursor
- Headline scramble/decode, staggered scroll reveals, scroll-drawn experience timeline
- 3D tilt + glare cards, magnetic CTAs, count-up stats, seeded decorative sparklines
- View Transitions theme toggle (circular reveal) and cross-page fades, feature-detected
- Every animation degrades to a finished static page under `prefers-reduced-motion` or without JS
- Content rendered from `_data/resume.yml` (one source of truth, owner-verified `updated` date)
- "Coverage & analysis" placeholder slots for upcoming research write-ups
- Notes (blog) with Lunr client-side search and editorial article pages
- System fonts only, no trackers, no external requests

## Local development

Requires Ruby 3.x (the `github-pages` gem does not support Ruby 4) and a UTF-8 locale:

```bash
bundle install
LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 bundle exec jekyll serve
# → http://localhost:4000
```

## Updating content

| What | Where |
| --- | --- |
| Roles, education, skills, projects | `_data/resume.yml` (bump `updated:`) |
| Coverage/research cards | `_data/coverage.yml` |
| Navigation | `_data/nav.yml` |
| Notes (posts) | `_posts/YYYY-MM-DD-title.md` |
| Résumé PDF | `assets/resume/resume.pdf` |

## Deployment

Push to `main`; GitHub Pages builds and deploys automatically.
