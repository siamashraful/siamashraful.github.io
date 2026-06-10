---
layout: page
title: Experience
eyebrow: "Experience — Career ledger"
heading: "The record so far"
permalink: /profile/
description: "Roles, education, and skills — rendered from one source of truth."
---

<div class="resume">
  <div class="resume__actions">
    <a class="btn" data-magnetic href="{{ '/assets/resume/resume.pdf' | relative_url }}" download>Download résumé (PDF)</a>
    <span class="mono text-muted">Verified {{ site.data.resume.updated }}</span>
  </div>

  <section class="resume__section" aria-label="Core strengths">
    <h2 class="resume__heading eyebrow">Core strengths</h2>
    <ul class="resume__strengths">
      {% for strength in site.data.resume.strengths %}
      <li data-reveal style="--reveal-i: {{ forloop.index0 }};">{{ strength }}</li>
      {% endfor %}
    </ul>
  </section>

  <section class="resume__section" aria-label="Experience">
    <h2 class="resume__heading eyebrow">Experience</h2>
    {% include timeline.html %}
  </section>

  <section class="resume__section" aria-label="Education">
    <h2 class="resume__heading eyebrow">Education</h2>
    {% for edu in site.data.resume.education %}
    <div class="resume__edu" data-reveal>
      <div class="timeline__head">
        <h3>{{ edu.degree }}</h3>
        <span class="timeline__dates numeric">{{ edu.year }}</span>
      </div>
      <span class="timeline__org">{{ edu.school }} · {{ edu.location }}</span>
      {% if edu.note %}<p class="text-muted">{{ edu.note }}</p>{% endif %}
    </div>
    {% endfor %}
  </section>

  <section class="resume__section" aria-label="Skills">
    <h2 class="resume__heading eyebrow">Skills</h2>
    <div class="resume__skills">
      {% for group in site.data.resume.skills %}
      <div class="resume__skill-group" data-reveal style="--reveal-i: {{ forloop.index0 }};">
        <h3 class="mono">{{ group.group }}</h3>
        <div class="chip-row">
          {% for item in group.items %}<span class="chip">{{ item }}</span>{% endfor %}
        </div>
      </div>
      {% endfor %}
    </div>
  </section>

  <section class="resume__section" aria-label="Selected projects">
    <h2 class="resume__heading eyebrow">Selected projects</h2>
    <ul class="resume__strengths">
      {% for project in site.data.resume.projects %}
      <li data-reveal style="--reveal-i: {{ forloop.index0 }};"><strong>{{ project.name }}.</strong> {{ project.summary }}</li>
      {% endfor %}
    </ul>
  </section>
</div>
