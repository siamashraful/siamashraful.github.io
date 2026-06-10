# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Siam Ashraful's personal site (siamashraful.github.io) — an Investment & Data Analyst portfolio built with Jekyll, deployed automatically by GitHub Pages on push to `main`. No separate CI, no test suite. Design language: "capital-markets terminal meets editorial" — dark-first with a full light theme, hand-rolled animations, zero external requests (system fonts, no trackers).

## Commands

```bash
bundle install                         # needs Ruby 3.x (NOT 4.x — commonmarker pin); use /opt/homebrew/opt/ruby@3.4
bundle exec jekyll serve --livereload  # local preview at http://localhost:4000
bundle exec jekyll build               # one-off build into _site/
```

Build with a UTF-8 locale (`LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8`) or the Sass converter dies on non-ASCII characters. The extra stdlib gems in the Gemfile (csv, base64, webrick…) exist for local modern-Ruby builds only; GitHub Pages ignores them. `_site/` and `.jekyll-cache/` are gitignored build output — never commit or hand-edit them.

## Architecture

- **Content is data-driven.** `_data/resume.yml` is the single source of truth for roles, education, skills, and projects — it renders `/profile/`, the home timeline, and project cards. It carries an `updated:` field (owner-verified date) shown on /profile/; bump it when facts change. `_data/coverage.yml` holds the placeholder research cards; `_data/nav.yml` drives the header.
- **SCSS is token-driven partials** under `_sass/` (`_tokens.scss` → base → `components/` → `pages/` → `_animations.scss`), imported by the `assets/css/main.scss` manifest. GitHub Pages runs old Ruby Sass: **`@import` only — `@use`/`@forward` and modern media-query syntax (`@media not (...)`) break the build.** Light theme lives in a mixin in `_tokens.scss` shared by `[data-theme="light"]` and the `prefers-color-scheme` fallback.
- **JS is native ES modules** in `assets/js/` entered via `main.js` (one bundle, modules no-op when their root element is absent; the hero chart dynamic-imports only on home). No Liquid in any JS file — `search.js` reads its index URL from a `data-search-url` attribute. `lunr.min.js` is vendored and loads classically on /blog/ only.
- **Animation contract:** pre-animation hidden states only apply under `html.motion-ok`, set by an inline head script when JS runs AND the user hasn't requested reduced motion — so no-JS and reduced-motion visitors always get the finished static page. Every module also early-returns via `lib/motion.js#prefersReducedMotion()`. Canvases read live theme colors via `lib/theme.js` and repaint on `data-theme` mutation.
- **Theme system:** inline no-flash script in `_layouts/default.html` head sets `data-theme` from localStorage → prefers-color-scheme; `theme-toggle.js` swaps it with a View Transitions circular reveal (feature-detected).
- **Search contract:** `search.js` hard-codes `#search-input`, `#search-results`, `#post-list`, `#load-more`, `.post-list-item`. The /blog/ markup (blog.md + `_includes/post-card.html`) must keep them.
- **URL invariants:** `/`, `/about/`, `/profile/`, `/projects/`, `/blog/`, `/contact/`, `/YYYY/MM/DD/title/` posts, `/search.json`, `/assets/resume/resume.pdf`. The permalink pattern contains `:categories` — never add `categories` to post front matter or URLs shift. Nav labels (Experience, Notes) intentionally differ from URLs (/profile/, /blog/).
- **Facts policy:** site copy must stay truthful to `_data/resume.yml`. "Investment Analyst" is Siam's actual title at Invest Nova Scotia (Jan 2026–); never invent credentials, metrics, deal names, tickers, or returns. Coverage cards stay placeholders until the owner supplies real write-ups.

## Gotchas

- A `[hidden] { display: none !important }` utility exists because component display rules would otherwise defeat the `hidden` attribute (search depends on it).
- `{% raw %}{{ }}{% endraw %}` — layouts are Liquid-processed; escape literal braces in any inline script.
- CLAUDE.md, README.md, LICENSE, and `docs/` are in `_config.yml`'s `exclude:` list — editing them never affects the published site.
- `docs/website-overhaul-plan.md` is historical (superseded by the June 2026 redesign); don't treat its open questions as blocking.
