# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Siam Ashraful's personal site and blog (siamashraful.github.io), built with Jekyll and deployed automatically by GitHub Pages on push to `main`. There is no separate build/deploy CI and no test suite.

## Commands

```bash
bundle install            # install dependencies (Ruby >= 3.1, github-pages gem)
bundle exec jekyll serve  # local preview at http://localhost:4000
```

## Architecture

- **Custom layouts override the declared theme.** `_config.yml` declares the Minimal Mistakes remote theme, but the site actually renders through fully local layouts (`_layouts/default.html`, `page.html`, `post.html`) and includes (`_includes/`). The theme dependency is effectively vestigial — don't assume Minimal Mistakes conventions, features, or classes apply.
- **Styling is one monolithic file.** Nearly all CSS lives in `assets/css/main.scss` (~1000 lines), driven by CSS custom properties for light/dark theming. `_sass/_variables.scss` is nearly empty.
- **Dark mode** is a no-flash inline script in the `<head>` of `_layouts/default.html`: sets `data-theme` on `<html>` from `localStorage`, falling back to `prefers-color-scheme`. Theme-dependent styles key off `[data-theme]`.
- **Search** is client-side Lunr: `assets/js/lunr.min.js` (vendored), `assets/js/search.js` (has Liquid front matter — it's processed by Jekyll), and `search.json` as the generated index. Posts live in `_posts/` (`YYYY-MM-DD-title.md`).
- **Known content duplication** (intentional debt, documented in the overhaul plan): Home (`index.md`) and `about.md` both render `_includes/about-me.md`; résumé facts exist in `resume.md`, `_data/resume.yml` (currently unused for rendering), and `assets/resume/resume.pdf`, which can drift apart. When changing biography or résumé content, check all of these.
- `.github/workflows/` and `.github/steps/` are leftovers from the GitHub Skills "GitHub Pages" tutorial template — not real CI for this site.

## Planned overhaul — read before large changes

`docs/website-overhaul-plan.md` is the working brief for a major redesign (audit, content model, phased delivery, owner questionnaire). Its key constraint: **broad implementation must not begin until the launch-blocking questions in its section 10 are answered by the owner.** Much of the site's current content (roles, projects, skills, contact details) is flagged there as requiring owner verification — do not present or extend it as confirmed fact. Small fixes and content edits requested by the owner are fine.
