# Personal Website Overhaul: Discovery and Delivery Plan

**Status:** Superseded — the June 2026 redesign implemented an Investment & Data
Analyst portfolio at the owner's direction (hybrid positioning, placeholder
coverage section, blog rebranded "Notes"), bypassing this discovery process.
Kept for historical reference; its open questions are no longer blocking.
**Prepared:** June 8, 2026
**Site:** `siamashraful.github.io`

## 1. Why this document exists

This document is the working brief for a substantial refresh of the site. It separates facts from assumptions, records the decisions that still need to be made, and defines a phased delivery process. The goal is not merely to apply a new visual theme. The finished site should present accurate information, make Siam's value clear to the intended audience, and be maintainable without repeatedly editing the same information in different files.

No broad implementation should begin until the **launch-blocking questions** in section 10 have answers. The remaining questions can be resolved during content and design work.

## 2. Current-state audit

### Platform and implementation

- The site is a Jekyll site deployed through GitHub Pages.
- It uses the `github-pages` gem and declares the Minimal Mistakes remote theme, while also maintaining custom layouts, includes, JavaScript, and a large custom SCSS file.
- The main pages are Home, Profile, Projects, Blog, and Contact. An About page exists but is not linked in the primary navigation.
- Light and dark themes are supported with a saved browser preference.
- Blog search uses a locally stored Lunr script and a generated JSON index.
- SEO tags and a sitemap are enabled.

### Content inventory

| Area | Current source | Audit note |
| --- | --- | --- |
| Site identity | `_config.yml` | Positions Siam around “Data & Design,” lineage, metadata, and human-centered systems. This positioning needs confirmation. |
| Home and About | `_includes/about-me.md` | Both pages render the same biography, creating duplicate content and no purpose-built home page. |
| Profile | `resume.md` | Contains manually written résumé content and a PDF link. It says “Last updated” using the build date, not the date the facts were verified. |
| Structured résumé data | `_data/resume.yml` | Overlaps with `resume.md` but is not used to render the profile page. The two sources can drift. |
| Projects | `projects.md` | Contains two brief project cards without links, dates, screenshots, outcomes, responsibilities, or case-study detail. |
| Blog | `_posts/` | Contains two short posts from January and February 2025. The desired role of the blog is unclear. |
| Contact | `contact.md` and `_config.yml` | Publicly exposes email, LinkedIn, GitHub, location, and pronouns. Privacy preferences need confirmation. |
| Resume download | `assets/resume/resume.pdf` | Must be checked by the owner for accuracy before being promoted as current. |
| Visual assets | `assets/img/avatar.svg`, `assets/img/hero.svg` | Generic/current assets need to be evaluated against the new brand direction and desired use of a real photo. |

### Information currently presented as fact but requiring owner verification

The overhaul must not silently assume these details remain current in June 2026:

- Current employer, contract/employment arrangement, title, team, location, and start/end dates.
- The description and measurable impact of work at RBC/Apex Systems, Outlier AI, TSX Trust/NTT Data, and any newer roles.
- Education details, graduation date, and whether the GPA should remain public.
- Current technical, data, design, and domain skills.
- Project names, status, ownership, screenshots, repositories, live demos, collaborators, and results.
- Halifax location, public email address, pronouns, LinkedIn URL, GitHub URL, and résumé PDF.
- Whether banking-related work can be described publicly and which details are confidential.
- Whether the blog entries accurately represent work that can be shared publicly.

### UX and maintainability findings

1. **The home page does not act as a landing page.** It begins with “About Me” and offers no clear headline, audience-specific value proposition, featured work, proof, or primary action.
2. **The information architecture has overlap.** Home and About are duplicates; “Profile” functions as a résumé; projects are disconnected from résumé project entries.
3. **Content has multiple sources of truth.** Biography and résumé facts appear in `_config.yml`, `_includes/about-me.md`, `resume.md`, `_data/resume.yml`, and the PDF.
4. **The project section lacks evidence.** It says what was built, but not why it mattered, what Siam personally did, how the work was approached, or what resulted.
5. **The current visual system may dominate the content.** Animated background effects, glass panels, gradients, and scan-line styling create a strong “coder” aesthetic, but the intended personal brand and target audience have not been established.
6. **The CSS architecture will be costly to evolve.** Most styling is in one large file. A component/token structure would make a broad redesign safer and easier to maintain.
7. **The declared remote theme and custom layouts overlap.** The implementation should either intentionally use the remote theme or remove that dependency and own the local design system.
8. **The site lacks an explicit content freshness model.** A build-time date can make old content appear freshly verified. Each time-sensitive content area should have an owner-confirmed update date where useful.
9. **The site currently has limited trust signals.** There are no detailed case studies, testimonials, talks, certifications, quantified outcomes, downloadable artifacts beyond the résumé, or prominent links to shipped work.
10. **The content strategy is unresolved.** It is unclear whether the site primarily supports recruiting, professional networking, consulting/freelance work, startup credibility, writing, or a combination.

## 3. Product outcomes

The final site should:

1. Explain who Siam is, what he does, and why that matters within the first screen on common desktop and mobile sizes.
2. Provide one obvious next action for the primary audience and sensible secondary actions for other visitors.
3. Present only owner-verified, appropriately public information.
4. Use projects and experience as evidence rather than as unsubstantiated lists.
5. Feel distinct and personal without sacrificing readability, accessibility, speed, or professional credibility.
6. Work well on mobile, tablet, keyboard-only navigation, screen readers, reduced-motion settings, dark/light preferences, and slow connections.
7. Give each fact a clear source of truth so future updates are straightforward.
8. Support the amount of writing Siam realistically intends to publish.
9. Produce good search and social previews for the homepage, projects, case studies, and articles.
10. Remain deployable on GitHub Pages unless a requirement justifies changing platforms.

### Initial measurable targets

These are proposed targets and should be confirmed during discovery:

- No known WCAG 2.2 AA violations in automated checks, plus a manual keyboard review.
- Lighthouse targets on representative production pages: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+.
- No broken internal links or missing local assets.
- Primary navigation and primary call to action usable at 320 CSS pixels wide.
- Images sized responsively and optimized; decorative motion disabled under `prefers-reduced-motion`.
- A new visitor should be able to identify Siam's role/focus, location or work eligibility if intentionally public, strongest evidence, and contact path in under 30 seconds.

These scores are quality signals, not substitutes for manual accessibility and content review.

## 4. Proposed audience and positioning exercise

The site needs one primary audience. Trying to give equal visual priority to every possible visitor usually produces vague messaging.

### Candidate primary audiences

- Recruiters and hiring managers for data governance, data analysis, business systems, product/data, or adjacent roles.
- Technical and data leaders looking for evidence of lineage, metadata, controls, analytics, and cross-functional communication work.
- Potential consulting or freelance clients.
- Founders and collaborators interested in product, AI, or startup work.
- Peers and readers interested in data systems, design, AI workflows, and career notes.

### Positioning template

After discovery, the core message should be expressible as:

> I help **[specific audience]** achieve **[valuable outcome]** through **[distinct capabilities or approach]**, supported by **[credible evidence]**.

Until the owner chooses the audience and desired opportunity, all headings, navigation labels, calls to action, and visual concepts are provisional.

## 5. Information architecture options

### Option A — Focused professional portfolio (recommended starting point)

- **Home:** Hero, positioning, selected outcomes, featured work, compact experience, current focus, final contact call to action.
- **Work:** Case-study index covering professional work that can be shared and personal/academic projects.
- **Experience:** Timeline or résumé-style page generated from structured data, with a PDF download.
- **Writing:** Articles only if there is a realistic publication plan; otherwise label it “Notes” or omit it at launch.
- **About:** Personal story, principles, interests, and selected details that do not duplicate the résumé.
- **Contact:** Clear invitation, availability expectations, social links, and spam-conscious contact method.

### Option B — Data professional and writer

- **Home**
- **Expertise:** Data lineage, metadata, controls, analysis, systems thinking.
- **Case Studies**
- **Writing**
- **About**
- **Contact / Résumé**

This works only if there is enough original, public material to substantiate the expertise pages.

### Option C — Multidisciplinary builder

- **Home**
- **Projects:** Data, software, product/design, and experiments with filters.
- **Experience**
- **Lab / Notes**
- **About**
- **Contact**

This is appropriate if the goal is to foreground range rather than specialize around data governance and traceability.

### Recommendation pending discovery

Start from Option A because it offers the clearest recruiting and networking journey while allowing multidisciplinary evidence. Modify it only after the primary audience and next desired opportunity are explicit.

## 6. Content model and source-of-truth proposal

The redesign should replace repeated hand-written facts with structured content where practical.

### Proposed structure

- `_data/profile.yml`: name, short/long positioning, location visibility, availability, social/contact links, and verified date.
- `_data/experience.yml`: roles, dates, context, responsibilities, outcomes, tools, confidentiality-safe descriptions, and display controls.
- `_data/education.yml`: programs, institutions, dates, optional achievements, and display controls.
- `_data/skills.yml`: categorized, curated capabilities with optional proficiency/context—not a keyword dump.
- `_projects/`: one document per project/case study, including summary, problem, role, process, results, stack, media, links, dates, status, and featured flag.
- `_posts/` or `_notes/`: writing content only.
- `assets/resume/`: owner-approved PDF, with its real revision date visible.

The rendered résumé can consume structured data, while the PDF remains a separately reviewed artifact. Content that is legally or professionally sensitive should be generalized or omitted rather than stored in the public repository.

## 7. Visual and interaction direction

Visual design should be chosen after content hierarchy and positioning are known. Three useful exploration lanes are:

1. **Editorial systems:** Strong typography, generous whitespace, clear diagrams, restrained color, and a thoughtful data/publication feel.
2. **Modern technical professional:** Crisp modular layouts, subtle data-flow motifs, controlled motion, and highly legible light/dark modes.
3. **Warm multidisciplinary portfolio:** More personality, photography or illustration, richer color, narrative case studies, and less enterprise formality.

The next design phase should produce low-fidelity wireframes before polished styling. At least the Home, Work index, case study, Experience, and mobile navigation should be reviewed in wireframe form.

### Design-system requirements

- Semantic color, typography, spacing, border, shadow, radius, and motion tokens.
- Reusable components for buttons, links, cards, metadata, timelines, project media, callouts, article lists, and calls to action.
- Visible hover, focus, active, disabled, and visited states where applicable.
- Typography appropriate for long-form reading and concise portfolio scanning.
- Dark mode only if both themes can be maintained to the same standard; otherwise launch one excellent theme first.
- Motion used to explain hierarchy or create delight, never to obstruct reading.
- No dependence on color alone to communicate state.

## 8. Technical direction

### Recommended baseline

Keep Jekyll and GitHub Pages for this overhaul unless discovery identifies a concrete requirement it cannot meet. The current stack is adequate for a fast, secure, low-maintenance portfolio and blog.

### Proposed technical work

1. Decide whether to retain Minimal Mistakes or remove the remote theme and use fully local layouts. Avoid an ambiguous hybrid.
2. Normalize structured data and collections before rebuilding templates.
3. Break the monolithic stylesheet into tokens, base styles, layout primitives, components, utilities, and page-specific partials.
4. Move inline theme behavior to a small documented script while preserving no-flash theme initialization where necessary.
5. Add automated build and quality checks in GitHub Actions.
6. Add HTML/link validation and automated accessibility checks for representative pages.
7. Add responsive image conventions and social preview images.
8. Preserve useful URLs or add redirects where navigation/permalinks change.
9. Minimize third-party scripts, fonts, analytics, and trackers. Document every external request.
10. Add a content update guide and launch checklist.

### Platform-change triggers

Consider Astro, Eleventy, or another static framework only if the final requirements need capabilities such as a component ecosystem the owner will actively maintain, richer content schemas, a headless CMS, extensive interactive demos, or a workflow that is materially harder in Jekyll. A framework migration should solve a demonstrated problem, not serve as the redesign itself.

## 9. Delivery phases

### Phase 0 — Discovery and factual verification

**Inputs:** Answers to section 10, current résumé, project artifacts, approved links, desired opportunities, privacy/confidentiality constraints, and visual references.
**Outputs:** Approved brief, audience, positioning, content inventory, launch scope, and decision log.
**Exit criteria:** All launch-blocking questions answered; stale claims identified; content owners and missing assets known.

### Phase 1 — Content strategy and architecture

**Work:** Final sitemap, visitor journeys, page purposes, content model, voice guidelines, URL plan, and case-study outline.
**Outputs:** Content matrix and page-by-page outlines.
**Exit criteria:** Every proposed section has an audience need, source, owner, and call to action.

### Phase 2 — Content production

**Work:** Rewrite positioning, biography, experience, project case studies, contact copy, metadata, and résumé content. Gather and optimize media.
**Outputs:** Reviewable copy and assets independent of the final visual design.
**Exit criteria:** Owner approves factual accuracy, confidentiality, tone, and project claims.

### Phase 3 — UX and visual design

**Work:** Mobile-first wireframes, design directions, selected direction, component inventory, responsive states, and interactive behavior.
**Outputs:** Approved wireframes and visual specification.
**Exit criteria:** Major templates and responsive behavior are agreed before full implementation.

### Phase 4 — Foundation implementation

**Work:** Data model, collections, layouts, design tokens, navigation, footer, SEO defaults, theme decision, and test workflow.
**Outputs:** Stable site shell and reusable components.
**Exit criteria:** Core layout passes build, keyboard, responsive, and baseline accessibility checks.

### Phase 5 — Page and content implementation

**Work:** Home, Work index, case studies, Experience, About, Writing/Notes, Contact, résumé download, 404, feeds/search if retained, and social previews.
**Outputs:** Feature-complete preview site.
**Exit criteria:** All launch-scope pages complete with approved content and no placeholder claims.

### Phase 6 — Quality assurance and launch

**Work:** Browser/device review, content proofread, broken links, accessibility, performance, metadata, analytics/privacy decision, redirects, and production smoke test.
**Outputs:** Launch report and known-issues list.
**Exit criteria:** Acceptance checklist signed off and production URLs verified.

### Phase 7 — Maintenance

**Work:** Quarterly factual review, dependency updates, résumé synchronization, link checks, analytics review if enabled, and content cadence review.
**Outputs:** Small, repeatable maintenance checklist.
**Exit criteria:** The site has a named update routine rather than another large catch-up redesign.

## 10. Discovery questionnaire

Answer directly beneath each question or copy the response template in section 11. “Unknown” or “not decided” is a valid answer. Links to documents, profiles, screenshots, or inspiration are especially useful.

### A. Launch-blocking decisions

1. What is the single most important outcome the redesigned site should create over the next 12 months?
2. Who is the primary audience: recruiters, hiring managers, consulting clients, collaborators/founders, readers, or someone else?
3. What specific role, opportunity, industry, or relationship should the site help you obtain next?
4. If a visitor does only one thing, what should it be: contact you, download your résumé, view a case study, visit LinkedIn/GitHub, read an article, or something else?
5. What are the top three ideas a visitor should remember about you?
6. Which current content is definitely inaccurate as of June 8, 2026?
7. What is your current title, employer/client relationship, team or function, location/remote status, and start date?
8. Are you actively job seeking, selectively open, unavailable, or open to consulting/collaboration? Should that status be public?
9. Which professional details are confidential, employer-owned, covered by an NDA, security-sensitive, or otherwise unsafe to publish?
10. Do you have a current résumé source document and approved PDF? Which should be authoritative?
11. Which two to four projects or work examples best support the opportunity you want?
12. Do you want a headshot or personal photo on the site? If yes, do you have an approved high-resolution image?
13. Should the site continue to use Jekyll/GitHub Pages, or are you open to a platform change when justified?
14. Is there a target launch date or external deadline? State the exact date and what drives it.
15. Who besides you must approve content, design, or publication?

### B. Identity and positioning

16. What name should appear publicly: Siam Ashraful, a longer legal name, or another professional form?
17. What headline or professional label feels most accurate today?
18. Which labels feel inaccurate or limiting—for example “Data Analyst,” “Data & Design,” “developer,” or “designer”?
19. Which areas should lead your positioning: data governance, lineage, metadata, controls, analytics, software, product/design, AI, entrepreneurship, or another specialty?
20. What do you do unusually well compared with peers at a similar career stage?
21. What kinds of complex problems do people repeatedly ask you to solve?
22. What values or working principles should come through?
23. Should the voice feel concise and executive, technical and precise, warm and conversational, bold and experimental, or a blend?
24. Should first-person language (“I”) or a more formal résumé voice dominate?
25. Are there words, clichés, claims, or tones you want to avoid?
26. Do you have a preferred short bio (25–40 words), medium bio (75–120 words), or speaker bio?
27. How personal should the site be beyond professional information?
28. Should pronunciation, pronouns, nationality/cultural background, or languages be included?
29. Is “Data & Design” still the right site identity? If not, what should replace it?

### C. Audience and visitor journeys

30. What do primary visitors already know before arriving?
31. What doubts or objections should the site resolve for them?
32. What evidence would make them trust you?
33. What information are recruiters or hiring managers currently unable to learn from LinkedIn or your résumé?
34. Are there distinct secondary audiences that need dedicated paths?
35. Should visitors be directed to GitHub, or does it contain inactive/private/coursework repositories that need context first?
36. Is LinkedIn the preferred contact/follow-up channel, or should the site reduce reliance on it?
37. Should the site support downloadable/printable material besides the résumé?
38. Do you expect visitors from Canada only, or should location, time zone, relocation, and work authorization be clarified for international audiences?
39. What would count as site success: interviews, messages, résumé downloads, article readership, project inquiries, or qualitative feedback?

### D. Employment and experience content

40. List every role that should appear, with exact title, organization, employment type, location, and month/year dates.
41. For each role, what was the business context and why did the work matter?
42. What were your specific responsibilities versus the team's responsibilities?
43. What outcomes can be quantified: time saved, records reviewed, systems mapped, defects reduced, users supported, turnaround improved, or audit milestones met?
44. Which tools, platforms, methods, and domain concepts are accurate and useful to name?
45. Can Collibra, Visio, internal reporting/origination systems, Critical Data Elements, or regulatory/audit work be mentioned publicly?
46. May client/company logos be displayed, or should organizations be text-only?
47. Should contract staffing relationships such as “via Apex Systems” or “NTT Data” be shown, simplified, or clarified?
48. Are promotions, expanded scope, awards, praise, leadership moments, or cross-functional work missing?
49. Are there volunteer, community, teaching, mentorship, hackathon, or leadership experiences to include?
50. Should older or less relevant work be omitted, summarized, or shown in a complete timeline?
51. Can you provide sanitized work samples, diagrams, templates, or before/after artifacts?
52. Do you have testimonials or recommendations you have permission to publish?

### E. Projects and case studies

53. What are the exact names, dates, and current statuses of your strongest projects?
54. For each project, was it individual, academic, professional, freelance, volunteer, or team work?
55. Who collaborated, and what portion did you personally own?
56. What problem and audience/user need did each project address?
57. What constraints shaped the solution?
58. What process did you follow—research, requirements, architecture, prototyping, implementation, testing, iteration?
59. What was the result, and how was success measured?
60. What would you do differently now?
61. Which technologies are still accurate, and which were peripheral rather than central?
62. Are source repositories public and presentable? Provide URLs.
63. Are live demos available and reliable? Provide URLs.
64. Do you own the right to publish screenshots, code excerpts, brand marks, datasets, and other media?
65. Do you have screenshots, recordings, diagrams, sketches, Figma files, presentations, or reports for each project?
66. Should incomplete experiments appear in a “Lab,” or should the portfolio contain only polished work?
67. Should professional data work be represented as generalized case studies when exact details cannot be shared?
68. Would you be comfortable writing one detailed case study before launch, with others marked as shorter project summaries?
69. Are Library Seat Reservation and Android Buy/Sell still among your best examples? Why or why not?
70. Are there newer projects, AI workflows, dashboards, data analyses, startup concepts, or open-source contributions missing from the site?

### F. Education, credentials, and skills

71. Confirm institution, degree name, specialization/minor, city, and graduation month/year.
72. Should the approximate GPA remain public? If yes, confirm the exact value and scale.
73. Are relevant courses, capstone work, awards, scholarships, clubs, or leadership roles worth including?
74. What certifications, training, badges, or current learning should appear?
75. Which five to ten skills should be most prominent for the target audience?
76. Which listed skills are stale, beginner-level, or no longer representative?
77. Should skills be grouped by outcomes/capabilities rather than tools?
78. Which tools do you use frequently enough to discuss confidently in an interview?
79. Do you want to show a “currently learning” section, or would it date too quickly?
80. What languages do you speak, and are they professionally relevant?

### G. Writing and thought leadership

81. Do you genuinely want to maintain a blog or notes section after launch?
82. Who is the intended reader, and what should they gain?
83. What themes can you discuss credibly and publicly?
84. Are the two existing 2025 posts drafts, complete articles, placeholders, or content to remove?
85. What realistic publishing cadence can you sustain?
86. Would fewer, deeper essays be preferable to frequent short notes?
87. Do you want tags, categories, search, an RSS feed, reading time, related posts, or newsletter integration?
88. Should article comments or reactions exist? If so, through what privacy-conscious mechanism?
89. Do you have writing published elsewhere that can be linked, excerpted, or migrated with permission?
90. Should unpublished writing be hidden until there are enough pieces to justify a navigation item?

### H. About and personal content

91. What parts of your story explain how you arrived at your current focus?
92. Which interests outside work are you comfortable making public?
93. Do accessibility, sustainability, community work, AI experimentation, and startup ideas remain important themes? What concrete examples support them?
94. Would you like a short “now” section describing current focus, or would it create a maintenance burden?
95. Do you want a values/principles section? If yes, what are the principles and evidence behind them?
96. Should the site mention career goals explicitly?
97. Are there personal details that must be removed from public pages or search indexing?
98. Should your exact city be public, region-only, or omitted?

### I. Contact, privacy, and conversion

99. Which contact methods should be public: email, LinkedIn, GitHub, a form, calendar link, or something else?
100. Is the current Gmail address the right professional address to expose publicly?
101. If using a form, where should submissions go and what anti-spam/privacy approach is acceptable?
102. What kinds of inquiries do you welcome, and which should be discouraged?
103. What response-time expectation, if any, should be stated?
104. Should a calendar booking link be available, and to whom?
105. Do you want analytics? If yes, which questions must analytics answer?
106. Are privacy-friendly analytics preferred over Google Analytics?
107. Do you need a privacy notice because of analytics, forms, embeds, or newsletter tools?
108. Should downloadable files contain personal phone number/address information that is not shown on the website?

### J. Visual brand and creative direction

109. Choose three to five adjectives for the desired visual impression.
110. Choose three adjectives the site must not evoke.
111. Should the site feel more like an editorial publication, polished corporate portfolio, technical interface, creative studio, or personal journal?
112. Which existing visual elements should remain: green accent, glass panels, animated background, grid, scan line, dark mode, or none?
113. Does the current “coder aesthetic” represent you and the opportunities you want?
114. What colors do you strongly prefer or dislike?
115. Do you have an existing personal logo, monogram, signature, brand palette, or typography?
116. Do you prefer a text-first site, headshot-led site, illustration-led site, or project-imagery-led site?
117. Should photography feel formal, candid, environmental, or absent?
118. How much animation feels appropriate: none, subtle transitions, selective storytelling, or highly interactive?
119. Should dark mode be retained if it increases design and testing scope?
120. Share three to five websites you admire and explain exactly what works in each.
121. Share one or two websites/styles you dislike and explain why.
122. Are there cultural motifs, locations, interests, or visual metaphors that could make the design personally meaningful without becoming gimmicky?
123. Would abstract data-lineage diagrams or system maps be an authentic visual motif?
124. How experimental can the design be before it risks feeling unprofessional to the primary audience?

### K. Navigation and page structure

125. Which pages are essential at launch?
126. Should “Profile” be renamed “Experience” or “Résumé”?
127. Should About remain separate from Home, and what unique job should each page perform?
128. Should Projects become “Work” to include both professional case studies and personal projects?
129. Should the résumé download appear globally or only on Experience/Contact?
130. Should email/contact be a prominent navigation button?
131. Do you want a one-page experience, a compact multi-page site, or a richer case-study site?
132. Should the blog be called “Writing,” “Notes,” “Insights,” or removed from the primary navigation?
133. Are there existing URLs that must not change because they are shared externally?
134. Do you need a custom 404 page, print résumé view, uses/now page, media kit, or speaking page?

### L. Technical and operational preferences

135. How comfortable are you maintaining Markdown, YAML, HTML/Liquid, SCSS, and JavaScript?
136. Who will update the site after launch?
137. Would you prefer editing content directly in GitHub, through a lightweight CMS, or locally in code?
138. Is GitHub Pages' build/deployment workflow working reliably today?
139. Do you own or plan to buy a custom domain?
140. Should the site remain dependency-light and JavaScript-light even if that limits interactive effects?
141. Are there required integrations: analytics, scheduling, newsletter, contact forms, GitHub activity, or social feeds?
142. Should search remain if the writing library is small?
143. Are third-party web fonts acceptable, or should fonts be system/local for privacy and speed?
144. Which browsers/devices matter most, and do you know of any current failures?
145. Do you want automated checks on every pull request?
146. Should content drafts be previewable without being published?
147. Is bilingual or multilingual support needed now or later?
148. Do you need a downloadable vCard, structured résumé schema, or machine-readable project data?

### M. Scope, process, and tradeoffs

149. What is the desired scope for version 1 versus later enhancements?
150. If time is constrained, rank these: accurate content, case studies, visual originality, animation, blog, dark mode, CMS, analytics, and platform migration.
151. Are you willing to delay launch for missing case-study assets, or should the site launch with concise project summaries?
152. How many review rounds are practical for content, wireframes, and visual design?
153. Do you prefer one complete reveal or incremental review page by page?
154. What is your tolerance for changing existing copy and navigation substantially?
155. What would make you consider the overhaul unsuccessful even if it looks polished?
156. What future additions should the architecture anticipate without building them now?

## 11. Suggested response template

The full questionnaire is intentionally comprehensive. To unblock the next phase quickly, reply with this minimum set first:

```text
Primary goal:
Primary audience:
Desired next opportunity:
Primary call to action:
Three things visitors should remember:
Target launch date (exact date or “none”):

Current role/title:
Current employer/arrangement:
Current location/remote status:
Public availability status:
Current résumé link or file:
Information that is stale:
Information that must remain private/confidential:

Top 2–4 projects/work examples:
Available project links/assets:
Current blog decision (keep / rename / hide / remove / unsure):

Preferred sitemap option (A / B / C / custom):
Essential launch pages:
Desired visual adjectives:
Visual elements to keep/remove:
Inspiration links and what you like:
Headshot preference:
Dark mode preference:

Platform preference:
Custom domain plans:
Analytics/contact-form preference:
Maintenance workflow preference:

Answers to any additional numbered questions:
```

## 12. Preliminary launch scope

This is a planning baseline, not an approved commitment.

### Must have

- Verified positioning, contact details, experience, education, skills, and résumé.
- Purpose-built home page with clear calls to action.
- Work/projects index with at least one substantive case study or an honest concise alternative.
- Responsive, accessible navigation and page templates.
- About and Experience pages with non-duplicative purposes.
- SEO/social metadata, favicon/identity assets, custom 404, and preserved/redirected URLs.
- Build, link, accessibility, and performance checks.
- Maintenance and content update documentation.

### Should have

- Additional case studies and richer project media.
- Writing/notes section if the owner commits to it.
- Print-friendly experience page.
- Dark mode if both themes are approved and tested.
- Privacy-friendly analytics if there is a defined measurement need.

### Could have later

- CMS editing.
- Newsletter integration.
- Interactive diagrams or data visualizations.
- Advanced filtering/search.
- Speaking, media, uses, or now pages.
- Multilingual content.

### Explicitly avoid until justified

- Framework migration for novelty.
- Decorative 3D or heavy animation before core content is complete.
- Skill percentage bars or unsupported proficiency ratings.
- Employer-confidential screenshots or unverifiable metrics.
- A contact form, analytics, or embeds without a privacy and maintenance decision.
- Empty sections added only because portfolio templates commonly include them.

## 13. Acceptance checklist

### Content

- [ ] Every time-sensitive claim is owner-verified and has an intentional update process.
- [ ] Professional claims are specific, truthful, and safe to publish.
- [ ] Home, About, Experience, and Work do not repeat the same paragraphs.
- [ ] Each featured project states the problem, Siam's role, approach, and result.
- [ ] Résumé page and PDF agree on material facts.
- [ ] No placeholder copy, fake testimonials, or invented metrics remain.

### UX and accessibility

- [ ] Clear page hierarchy and primary action on mobile and desktop.
- [ ] Complete keyboard navigation with visible focus.
- [ ] Semantic headings, landmarks, links/buttons, forms, and image alternatives.
- [ ] Color contrast and non-color state cues meet the agreed standard.
- [ ] Reduced-motion preference is respected.
- [ ] Content remains usable when JavaScript is unavailable except for explicitly enhanced features.

### Engineering and operations

- [ ] Clean production Jekyll build with no actionable warnings.
- [ ] Automated checks run on pull requests.
- [ ] Internal links and assets validate.
- [ ] Redirects preserve important existing URLs.
- [ ] Page metadata and social previews are correct.
- [ ] Third-party dependencies and data collection are documented.
- [ ] Update instructions are understandable to the future maintainer.

## 14. Decision log

| Decision | Status | Owner | Notes |
| --- | --- | --- | --- |
| Primary audience and desired opportunity | Open | Siam | Launch-blocking. |
| Core positioning | Open | Siam | Derived after audience decision. |
| Sitemap | Open | Siam | Option A is the preliminary recommendation. |
| Launch content and case studies | Open | Siam | Depends on public artifacts and confidentiality. |
| Visual direction | Open | Siam | Choose after content hierarchy. |
| Jekyll versus migration | Open | Siam / implementation | Keep Jekyll unless requirements justify change. |
| Dark mode | Open | Siam | Keep only if worth ongoing design/testing scope. |
| Blog/writing strategy | Open | Siam | Keep, rename, hide, or remove. |
| Analytics and forms | Open | Siam | Add only for a defined need. |
| Launch date | Open | Siam | Use an exact date when known. |
