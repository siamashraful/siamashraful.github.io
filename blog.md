---
layout: page
title: Notes
eyebrow: "Notes — Working in public"
heading: "Working notes on markets, data, and building things"
permalink: /blog/
description: "Freeform writing. The structured research lives in the coverage section."
---

<div class="search" role="search">
  <label class="sr-only" for="search-input">Search notes</label>
  {% include search.html %}
</div>

<ul id="post-list" class="post-list" data-page-size="8">
  {% for post in site.posts %}
  {% include post-card.html post=post index=forloop.index0 %}
  {% endfor %}
</ul>

<nav class="pagination" aria-label="Notes pagination">
  <button id="load-more" class="btn btn--ghost btn--small" type="button">Load more</button>
</nav>
