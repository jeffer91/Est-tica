(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        nav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const cards = [...document.querySelectorAll('[data-treatment-card]')];
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const search = document.querySelector('#treatment-search');
  const emptyState = document.querySelector('#empty-state');
  let activeFilter = 'all';

  function applyFilters() {
    const query = (search?.value || '').trim().toLowerCase();
    let shown = 0;
    cards.forEach(card => {
      const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
      const searchMatch = !query || (card.dataset.search || '').includes(query);
      const visible = categoryMatch && searchMatch;
      card.hidden = !visible;
      if (visible) shown++;
    });
    if (emptyState) emptyState.hidden = shown !== 0;
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filterButtons.forEach(b => b.classList.toggle('is-active', b === button));
      applyFilters();
    });
  });
  search?.addEventListener('input', applyFilters);
})();
