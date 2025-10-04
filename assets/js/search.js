(function () {
  const input = document.getElementById('search-input');
  const resultsList = document.getElementById('search-results');
  const postList = document.getElementById('post-list');
  const loadMore = document.getElementById('load-more');
  const pagination = loadMore ? loadMore.closest('.pagination') : null;
  if (!input || !resultsList || !postList) return;

  const pageSize = parseInt(postList.dataset.pageSize, 10) || 8;
  const posts = Array.from(postList.querySelectorAll('.post-list-item'));
  let visibleCount = 0;

  function toggleLoadMore(hidden) {
    if (loadMore) {
      loadMore.hidden = hidden;
    }
    if (pagination) {
      pagination.hidden = hidden;
    }
  }

  function showNextPage() {
    const next = posts.slice(visibleCount, visibleCount + pageSize);
    next.forEach((item) => {
      item.hidden = false;
    });
    visibleCount += next.length;
    toggleLoadMore(visibleCount >= posts.length);
  }

  posts.forEach((item) => {
    item.hidden = true;
  });
  if (loadMore) {
    loadMore.addEventListener('click', showNextPage);
  }
  showNextPage();
  resultsList.hidden = true;

  let index;
  let documents = [];

  async function ensureIndex() {
    if (index || !window.lunr) return;
    try {
      const response = await fetch('/search.json');
      if (!response.ok) return;
      documents = await response.json();
      index = window.lunr(function () {
        this.ref('url');
        this.field('title');
        this.field('content');
        documents.forEach((doc) => this.add(doc));
      });
    } catch (err) {
      console.error('Search index failed', err);
    }
  }

  function clearResults() {
    resultsList.innerHTML = '';
    resultsList.hidden = true;
    postList.hidden = false;
    toggleLoadMore(visibleCount >= posts.length);
  }

  input.addEventListener('input', async (event) => {
    const query = event.target.value.trim();
    if (!query) {
      clearResults();
      return;
    }
    await ensureIndex();
    if (!index) return;

    const matches = index.search(`${query}*`).slice(0, 10);
    resultsList.innerHTML = '';
    resultsList.hidden = false;
    postList.hidden = true;
    toggleLoadMore(true);

    if (!matches.length) {
      const li = document.createElement('li');
      li.textContent = 'No results yet. Try another phrase.';
      resultsList.appendChild(li);
      return;
    }

    matches.forEach((match) => {
      const doc = documents.find((d) => d.url === match.ref);
      if (!doc) return;
      const li = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.href = doc.url;
      anchor.textContent = doc.title;
      li.appendChild(anchor);
      resultsList.appendChild(li);
    });
  });
})();
