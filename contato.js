(function () {
  // ===== FORMULÁRIO DE CONTATO =====
  const form = document.getElementById('contactForm');
  const successDiv = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Coletar dados do formulário
      const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        assunto: document.getElementById('assunto').value,
        mensagem: document.getElementById('mensagem').value
      };

      // Validar campos obrigatórios
      if (!formData.nome || !formData.email || !formData.mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      // Aqui você pode enviar os dados para um servidor
      // Por enquanto, vamos apenas simular o envio
      console.log('Dados do formulário:', formData);

      // Simular envio com delay
      const submitBtn = form.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;

      setTimeout(() => {
        // Mostrar mensagem de sucesso
        form.style.display = 'none';
        successDiv.style.display = 'block';
        
        // Criar link para WhatsApp com os dados
        const mensagemWhatsApp = `Olá Inspire Gifts! Me chamo ${formData.nome}. ${formData.mensagem}`;
        const whatsappLink = `https://wa.me/5522999878656?text=${encodeURIComponent(mensagemWhatsApp)}`;
        
        // Adicionar botão para WhatsApp
        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = whatsappLink;
        whatsappBtn.target = '_blank';
        whatsappBtn.className = 'submit-btn';
        whatsappBtn.style.marginTop = '12px';
        whatsappBtn.style.display = 'inline-flex';
        whatsappBtn.style.alignItems = 'center';
        whatsappBtn.style.gap = '8px';
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Falar no WhatsApp agora';
        successDiv.appendChild(whatsappBtn);
        
      }, 1500);
    });
  }

  // ===== MÁSCARA DE TELEFONE =====
  const telefoneInput = document.getElementById('telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function (e) {
      let value = this.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      
      if (value.length <= 2) {
        this.value = value;
      } else if (value.length <= 6) {
        this.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length <= 10) {
        this.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
      } else {
        this.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
      }
    });
  }

  // ===== ANIMAÇÃO DE SCROLL =====
  const contactCards = document.querySelectorAll('.contact-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  contactCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
})();