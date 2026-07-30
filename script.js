(function () {
  // ===== DADOS =====
  const essencias = [
    { nome: 'Tania Bulhoes', categoria: 'classicas' },
    { nome: 'Chá Branco', categoria: 'classicas' },
    { nome: 'Tuti-Fruti', categoria: 'frutais' },
    { nome: 'Pitanga Black', categoria: 'frutais' },
    { nome: 'Oskley', categoria: 'amadeiradas' },
    { nome: 'Dress to', categoria: 'classicas' },
    { nome: 'Gabardine', categoria: 'amadeiradas' },
    { nome: 'Suave Linho', categoria: 'classicas' },
  ];

  const opcoes = [
    { label: 'Difusor carro', preco: '25,00' },
    { label: 'Home 30ml', preco: '28,00' },
    { label: 'Home 60ml', preco: '38,00' },
    { label: 'Home 100ml', preco: '50,00' },
  ];

  // ===== ELEMENTOS =====
  const grid = document.getElementById('productGrid');
  const filterButtons = document.querySelectorAll('#filterTabs button');
  const slides = document.getElementById('carouselSlides');
  const indicators = document.querySelectorAll('#indicators .indicator');
  const pagBtns = document.querySelectorAll('#pagination button');

  let currentFilter = 'all';
  let currentSlide = 0;
  const totalSlides = 3;

  // ===== RENDERIZAR PRODUTOS =====
  function renderProducts(filter = 'all') {
    const filtered =
      filter === 'all'
        ? essencias
        : essencias.filter((e) => e.categoria === filter);

    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML = `
        <p style="grid-column:1/-1; text-align:center; padding:40px 0;">
          Nenhuma essência nesta categoria.
        </p>
      `;
      return;
    }

    filtered.forEach((essencia) => {
      const card = document.createElement('div');
      card.className = 'product-card';

      const icon = document.createElement('div');
      icon.className = 'product-image';
      icon.innerHTML = `<i class="fas fa-flask"></i>`;

      const name = document.createElement('div');
      name.className = 'product-name';
      name.textContent = essencia.nome;

      const variants = document.createElement('div');
      variants.className = 'product-variants';
      const opcoesMostradas = opcoes.slice(0, 3);
      opcoesMostradas.forEach((op) => {
        const badge = document.createElement('span');
        badge.className = 'variant-badge';
        badge.textContent = op.label;
        variants.appendChild(badge);
      });

      const preco = document.createElement('div');
      preco.className = 'product-price';
      preco.textContent = 'a partir de R$ 25,00';

      const small = document.createElement('small');
      small.textContent = '· 4 tamanhos disponíveis';

      card.appendChild(icon);
      card.appendChild(name);
      card.appendChild(variants);
      card.appendChild(preco);
      card.appendChild(small);
      grid.appendChild(card);
    });
  }

  // ===== FILTROS =====
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      filterButtons.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.filter;
      renderProducts(currentFilter);

      // Reset paginação
      pagBtns.forEach((p, idx) => {
        p.classList.toggle('active', idx === 0);
      });
    });
  });

  // ===== CARROSSEL =====
  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    slides.style.transform = `translateX(-${index * 100}%)`;
    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === index);
    });
  }

  indicators.forEach((ind) => {
    ind.addEventListener('click', function () {
      const idx = parseInt(this.dataset.index);
      goToSlide(idx);
    });
  });

  // Auto-play
  setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);

  // ===== PAGINAÇÃO =====
  pagBtns.forEach((btn, idx) => {
    btn.addEventListener('click', function () {
      pagBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      document
        .querySelector('.section-header')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ===== INICIALIZA =====
  renderProducts('all');
})();