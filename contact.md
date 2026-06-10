---
layout: page
title: Contact
eyebrow: "Contact — Open line"
heading: "The fastest route is email."
permalink: /contact/
description: "Pitches, markets, data, collaborations — all welcome. If you're building in Nova Scotia, especially so."
---

<div class="contact-grid">
  <a class="card card--tilt contact-card" data-tilt data-reveal="scale" href="mailto:{{ site.author.email }}">
    <span class="card__meta"><span class="numeric">EMAIL</span><span class="chip chip--live">Primary</span></span>
    <span class="contact-card__value">{{ site.author.email }}</span>
    <span class="card__body">Best for anything substantive. I read everything.</span>
  </a>
  <a class="card card--tilt contact-card" data-tilt data-reveal="scale" style="--reveal-i: 1;" href="{{ site.author.social.linkedin }}">
    <span class="card__meta"><span class="numeric">LINKEDIN</span></span>
    <span class="contact-card__value">in/siam-ashraful</span>
    <span class="card__body">Professional updates and the formal record.</span>
  </a>
  <a class="card card--tilt contact-card" data-tilt data-reveal="scale" style="--reveal-i: 2;" href="{{ site.author.social.github }}">
    <span class="card__meta"><span class="numeric">GITHUB</span></span>
    <span class="contact-card__value">@siamashraful</span>
    <span class="card__body">Code, including this site.</span>
  </a>
</div>

<p class="mono text-muted contact-footnote" data-reveal>BASED IN {{ site.author.location | upcase }} · {{ site.author.pronouns | upcase }} · ATLANTIC TIME</p>
