---
layout: page
title: Projects
eyebrow: "Projects — Shipped builds"
heading: "Built, not just listed"
permalink: /projects/
description: "Software I've designed and shipped, plus the slot where the next build lands."
---

<div class="card-grid projects-grid">
  {% for project in site.data.resume.projects %}
  <article class="card card--tilt" data-tilt data-reveal="scale" style="--reveal-i: {{ forloop.index0 }};">
    <div class="card__meta"><span class="numeric">BUILD 0{{ forloop.index }}</span><span class="chip chip--live">Shipped</span></div>
    <h3>{{ project.name }}</h3>
    <p class="card__body">{{ project.summary }}</p>
    <div class="chip-row">
      {% for tech in project.stack %}<span class="chip">{{ tech }}</span>{% endfor %}
    </div>
  </article>
  {% endfor %}
  <article class="card card--tilt card--coverage" data-tilt data-reveal="scale" style="--reveal-i: 2;">
    <div class="card__meta"><span class="numeric">BUILD 03</span><span class="chip chip--status">In design</span></div>
    <h3>Next build</h3>
    <p class="card__body">Slot reserved — likely something at the intersection of market data and the analysis published in the coverage section.</p>
    <div class="card__placeholder" aria-hidden="true"><span></span><span></span><span></span></div>
  </article>
</div>
