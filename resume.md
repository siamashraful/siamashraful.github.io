---
layout: page
title: Résumé
permalink: /resume/
description: "Résumé of Siam Ashraful"
---

Below is a condensed résumé. A structured source of truth powers this page: [`_data/resume.yml`](/_data/resume.yml).

{% assign r = site.data.resume %}

## Experience
{% for role in r.experience %}
### {{ role.title }} — {{ role.company }} ({{ role.location }})
*{{ role.start }}–{{ role.end | default: "Present" }}*
{% for point in role.points %}- {{ point }}
{% endfor %}
{% endfor %}

## Projects
{% for p in r.projects %}- **{{ p.name }}** — {{ p.summary }} ({{ p.stack | join: ", " }})
{% endfor %}

## Education
{% for e in r.education %}- **{{ e.degree }}**, {{ e.school }} — {{ e.location }} ({{ e.year }})
{% endfor %}

## Skills
**Languages:** {{ r.skills.languages | join: ", " }}  
**Data/Tools:** {{ r.skills.data | join: ", " }}  
**Design:** {{ r.skills.design | join: ", " }}
