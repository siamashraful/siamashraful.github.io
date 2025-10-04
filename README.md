# Siam Ashraful — GitHub Pages site

Modern personal site and blog for Siam Ashraful using GitHub Pages + Jekyll.

## Features
- Responsive layouts with prefers-color-scheme dark mode toggle
- Résumé page with downloadable PDF
- Projects, blog, contact, and about pages
- Lunr-powered client-side search and JSON index
- Built-in SEO tags and sitemap via GitHub Pages plugins

## Quick start
1. Install Ruby (>= 3.1 recommended) and Bundler.
2. Install dependencies:
   ```bash
   bundle install
   ```
3. Run a local preview:
   ```bash
   bundle exec jekyll serve
   ```
4. Visit [http://localhost:4000](http://localhost:4000) in your browser.

## Customization checklist
- Update `_config.yml` with your GitHub username and any analytics IDs.
- Update `resume.md` and the PDF in `assets/resume/` to modify résumé content.
- Add new posts in `_posts/` using the `YYYY-MM-DD-title.md` naming pattern.
- Replace placeholder images in `assets/img/` with your own optimized `.webp` files.

## Deployment
Push changes to the default branch (usually `main`). GitHub Pages will build the site automatically—no additional CI is required.

For custom domains, add a `CNAME` file with your domain and configure DNS records.
