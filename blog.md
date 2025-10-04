---
layout: page
title: Blog
permalink: /blog/
description: "Blog posts and notes by Siam Ashraful"
---

<div class="blog-controls">
  <label class="search-label" for="search-input">Search posts</label>
  {% include search.html %}
</div>

<ul id="post-list" class="post-list" data-page-size="8">
  {% for post in site.posts %}
  <li class="post-list-item" data-title="{{ post.title | escape }}" data-date="{{ post.date | date: '%Y-%m-%d' }}">
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <small>{{ post.date | date: "%b %d, %Y" }}</small>
    <p>{{ post.description | default: post.excerpt | strip_html | truncate: 160 }}</p>
  </li>
  {% endfor %}
</ul>

<nav class="pagination" aria-label="Blog pagination">
  <button id="load-more" type="button">Load more</button>
</nav>
