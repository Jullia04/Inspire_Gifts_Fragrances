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
    { nome: 'Frutas Vermelhas', categoria: 'frutais' },
    { nome: 'Cedro', categoria: 'amadeiradas' },
    { nome: 'Lavanda', categoria: 'classicas' },
    { nome: 'Flor de Laranjeira', categoria: 'frutais' },
  ];

  const opcoes = [
    { label: 'Difusor carro', preco: '25,00' },
    { label: 'Home 30ml', preco: '28,00' },
    { label: 'Home 60ml', preco: '38,00' },
    { label: 'Home 100ml', preco: '50,00' },
  ];

  // ===== CONFIGURAÇÕES DE PAGINAÇÃO =====
  const ITEMS_PER_PAGE = 6;
  let currentPage = 1;
  let currentFilter = 'all';
  let searchTerm = '';

  // ===== ELEMENTOS =====
  const grid = document.getElementById('productGrid');
  const filterButtons = document.querySelectorAll('#filterTabs button');
  const searchInput = document.getElementById('searchInput');
  const paginationContainer = document.getElementById('pagination');
  const slides = document.getElementById('carouselSlides');
  const indicators = document.querySelectorAll('#indicators .indicator');

  let currentSlide = 0;
  const totalSlides = 3;

  // ===== FUNÇÕES DE FILTRAGEM =====
  function getFilteredProducts() {
    let filtered = essencias;

    // Aplicar filtro de categoria
    if (currentFilter !== 'all') {
      filtered = filtered.filter((e) => e.categoria === currentFilter);
    }

    // Aplicar busca por texto
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((e) => 
        e.nome.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  // ===== RENDERIZAR PRODUTOS =====
  function renderProducts() {
    const filtered = getFilteredProducts();
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    // Ajustar página atual se necessário
    if (currentPage > totalPages) currentPage = 1;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
    const pageItems = filtered.slice(startIndex, endIndex);

    // Limpar grid
    grid.innerHTML = '';

    if (pageItems.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search" style="font-size: 2rem; color: #a67c5b; margin-bottom: 16px;"></i>
          <p style="font-size: 1.1rem; color: #7e6e62;">Nenhuma essência encontrada</p>
          <p style="font-size: 0.9rem; color: #bbb0a6;">Tente ajustar os filtros ou a busca</p>
        </div>
      `;
      grid.style.display = 'flex';
      grid.style.justifyContent = 'center';
      grid.style.alignItems = 'center';
      grid.style.minHeight = '200px';
    } else {
      grid.style.display = 'grid';
      grid.style.justifyContent = 'normal';
      grid.style.alignItems = 'normal';
      grid.style.minHeight = 'auto';

      pageItems.forEach((essencia) => {
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

        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = `https://wa.me/5522999878656?text=Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20ess%C3%AAncia%20${encodeURIComponent(essencia.nome)}`;
        whatsappBtn.target = '_blank';
        whatsappBtn.className = 'whatsapp-product-btn';
        whatsappBtn.innerHTML = `<i class="fab fa-whatsapp"></i> Comprar`;
        whatsappBtn.style.cssText = `
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #25D366;
          color: white;
          padding: 8px 16px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.85rem;
          margin-top: 12px;
          transition: background 0.2s, transform 0.2s;
          width: fit-content;
        `;

        whatsappBtn.onmouseover = function() {
          this.style.background = '#128C7E';
          this.style.transform = 'scale(1.02)';
        };
        whatsappBtn.onmouseout = function() {
          this.style.background = '#25D366';
          this.style.transform = 'scale(1)';
        };

        card.appendChild(icon);
        card.appendChild(name);
        card.appendChild(variants);
        card.appendChild(preco);
        card.appendChild(small);
        card.appendChild(whatsappBtn);
        grid.appendChild(card);
      });
    }

    // Atualizar paginação
    renderPagination(totalPages, totalItems);
  }

  // ===== RENDERIZAR PAGINAÇÃO =====
  function renderPagination(totalPages, totalItems) {
    paginationContainer.innerHTML = '';

    if (totalItems === 0) {
      paginationContainer.innerHTML = '<span class="pagination-info">Nenhum resultado</span>';
      return;
    }

    // Info do total
    const info = document.createElement('span');
    info.className = 'pagination-info';
    info.textContent = `Mostrando ${Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalItems)} - ${Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} de ${totalItems}`;
    paginationContainer.appendChild(info);

    // Botão Anterior
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.className = 'pagination-nav';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderProducts();
        scrollToProducts();
      }
    });
    paginationContainer.appendChild(prevBtn);

    // Botões de página
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      const firstBtn = createPageButton(1);
      paginationContainer.appendChild(firstBtn);
      if (startPage > 2) {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '…';
        ellipsis.className = 'pagination-ellipsis';
        paginationContainer.appendChild(ellipsis);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const btn = createPageButton(i);
      paginationContainer.appendChild(btn);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '…';
        ellipsis.className = 'pagination-ellipsis';
        paginationContainer.appendChild(ellipsis);
      }
      const lastBtn = createPageButton(totalPages);
      paginationContainer.appendChild(lastBtn);
    }

    // Botão Próximo
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.className = 'pagination-nav';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
        scrollToProducts();
      }
    });
    paginationContainer.appendChild(nextBtn);
  }

  function createPageButton(pageNum) {
    const btn = document.createElement('button');
    btn.textContent = pageNum;
    btn.className = 'pagination-page' + (pageNum === currentPage ? ' active' : '');
    btn.addEventListener('click', () => {
      currentPage = pageNum;
      renderProducts();
      scrollToProducts();
    });
    return btn;
  }

  function scrollToProducts() {
    const header = document.querySelector('.section-header');
    if (header) {
      header.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ===== FILTROS =====
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      filterButtons.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.filter;
      currentPage = 1;
      renderProducts();
    });
  });

  // ===== BUSCA =====
  let searchTimeout;
  searchInput.addEventListener('input', function () {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchTerm = this.value;
      currentPage = 1;
      renderProducts();
    }, 300);
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

  // Auto-play do carrossel
  let carouselInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);

  // Pausar auto-play ao passar o mouse
  const carousel = document.getElementById('carousel');
  carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
  });
  carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  });

  // ===== INICIALIZA =====
  renderProducts();
})();