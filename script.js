(function () {
  // ===== DADOS COM IMAGENS =====
  const essencias = [
    { 
      nome: 'Tania Bulhoes', 
      categoria: 'classicas',
      imagem: './assets/img/1.png',
      descricao: 'Fragrância floral sofisticada'
    },
    { 
      nome: 'Chá Branco', 
      categoria: 'classicas',
      imagem: './assets/img/2.png',
      descricao: 'Aroma suave e relaxante'
    },
    { 
      nome: 'Tuti-Fruti', 
      categoria: 'frutais',
      imagem: './assets/img/3.png',
      descricao: 'Explosão de frutas vermelhas'
    },
    { 
      nome: 'Pitanga Black', 
      categoria: 'frutais',
      imagem: './assets/img/4.png',
      descricao: 'Aroma tropical intenso'
    },
    { 
      nome: 'Suave Linho', 
      categoria: 'amadeiradas',
      imagem: './assets/img/5.png',
      descricao: 'Notas amadeiradas e marcantes'
    },
    { 
      nome: 'Gabardine', 
      categoria: 'classicas',
      imagem: './assets/img/6.png',
      descricao: 'Elegância em cada nota'
    },
    { 
      nome: 'Gabardine', 
      categoria: 'amadeiradas',
      imagem: './assets/img/7.png',
      descricao: 'Aroma sofisticado e duradouro'
    },
    { 
      nome: 'Suave Linho', 
      categoria: 'classicas',
      imagem: './assets/img/8.png',
      descricao: 'Frescor de linho lavado'
    }
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

    if (currentFilter !== 'all') {
      filtered = filtered.filter((e) => e.categoria === currentFilter);
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((e) => 
        e.nome.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  // ===== RENDERIZAR PRODUTOS COM IMAGENS =====
  function renderProducts() {
    const filtered = getFilteredProducts();
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    if (currentPage > totalPages) currentPage = 1;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
    const pageItems = filtered.slice(startIndex, endIndex);

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
      grid.style.minHeight = '300px';
    } else {
      grid.style.display = 'grid';
      grid.style.justifyContent = 'normal';
      grid.style.alignItems = 'normal';
      grid.style.minHeight = 'auto';

      pageItems.forEach((essencia) => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // ===== IMAGEM DO PRODUTO =====
        const imageContainer = document.createElement('div');
        imageContainer.className = 'product-image-container';
        
        const img = document.createElement('img');
        img.src = essencia.imagem;
        img.alt = essencia.nome;
        img.className = 'product-image';
        img.loading = 'lazy';
        img.onerror = function() {
          // Fallback se a imagem não carregar
          this.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.className = 'product-image-fallback';
          fallback.innerHTML = `<i class="fas fa-flask"></i>`;
          this.parentNode.appendChild(fallback);
        };
        
        imageContainer.appendChild(img);

        // ===== INFORMAÇÕES DO PRODUTO =====
        const infoContainer = document.createElement('div');
        infoContainer.className = 'product-info';

        const name = document.createElement('div');
        name.className = 'product-name';
        name.textContent = essencia.nome;

        const descricao = document.createElement('div');
        descricao.className = 'product-description';
        descricao.textContent = essencia.descricao || 'Essência exclusiva Inspire Gifts';

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

        // ===== BOTÃO WHATSAPP =====
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
          padding: 8px 20px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.85rem;
          margin-top: 12px;
          transition: all 0.3s ease;
          width: fit-content;
          border: none;
          cursor: pointer;
        `;

        whatsappBtn.onmouseenter = function() {
          this.style.background = '#128C7E';
          this.style.transform = 'scale(1.05)';
          this.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.3)';
        };
        whatsappBtn.onmouseleave = function() {
          this.style.background = '#25D366';
          this.style.transform = 'scale(1)';
          this.style.boxShadow = 'none';
        };

        // Montar o card
        infoContainer.appendChild(name);
        infoContainer.appendChild(descricao);
        infoContainer.appendChild(variants);
        infoContainer.appendChild(preco);
        infoContainer.appendChild(small);
        infoContainer.appendChild(whatsappBtn);

        card.appendChild(imageContainer);
        card.appendChild(infoContainer);
        grid.appendChild(card);
      });
    }

    renderPagination(totalPages, totalItems);
  }

  // ===== RENDERIZAR PAGINAÇÃO =====
  function renderPagination(totalPages, totalItems) {
    paginationContainer.innerHTML = '';

    if (totalItems === 0) {
      paginationContainer.innerHTML = '<span class="pagination-info">Nenhum resultado</span>';
      return;
    }

    const info = document.createElement('span');
    info.className = 'pagination-info';
    info.textContent = `Mostrando ${Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalItems)} - ${Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} de ${totalItems}`;
    paginationContainer.appendChild(info);

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

  let carouselInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);

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