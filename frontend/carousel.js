'use strict';

function createCarousel(count, onChange, schedule = setInterval, cancel = clearInterval) {
  let index = 0;
  let timer = null;
  return {
    move(step) { index = (index + step + count) % count; onChange(index); },
    select(next) { index = next; onChange(index); },
    start() { if (timer === null) timer = schedule(() => this.move(1), 5000); },
    stop() { if (timer !== null) cancel(timer); timer = null; }
  };
}

function initCarousel() {
  const root = document.querySelector('.hero-photo');
  const original = root.querySelector('img');
  const slides = [
    [original.getAttribute('src'), original.alt, 'Encontre cuidado perto de você', 'Nutrição acessível em todo o Brasil'],
    ['https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=900&h=600&fit=crop&auto=format', 'Alimentos variados para uma alimentação equilibrada', 'Alimentação que cabe na sua rotina', 'Conheça nossos conteúdos sobre nutrição'],
    ['https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=900&h=600&fit=crop&auto=format', 'Seleção de vegetais frescos', 'Mais saúde, mais possibilidades', 'Explore projetos e ações da comunidade']
  ];
  root.setAttribute('role', 'region');
  root.setAttribute('aria-roledescription', 'carrossel');
  root.setAttribute('aria-label', 'Destaques do NutriAcesso');
  const images = slides.map((slide, index) => {
    const image = index === 0 ? original : document.createElement('img');
    if (index > 0) { image.src = slide[0]; image.alt = slide[1]; root.insertBefore(image, root.firstChild); }
    image.classList.add('carousel-slide');
    image.classList.toggle('active', index === 0);
    image.setAttribute('aria-hidden', String(index !== 0));
    image.addEventListener('error', () => { image.src = 'assets/logo.png'; image.style.objectFit = 'contain'; }, { once: true });
    return image;
  });
  const controls = document.createElement('div');
  controls.className = 'carousel-controls';
  controls.innerHTML = '<button type="button" data-previous aria-label="Imagem anterior">‹</button><div class="carousel-dots">' + slides.map((_, index) => `<button type="button" data-slide="${index}" aria-label="Mostrar imagem ${index + 1}" aria-pressed="${index === 0}"></button>`).join('') + '</div><button type="button" data-next aria-label="Próxima imagem">›</button>';
  root.appendChild(controls);



  const dots = controls.querySelectorAll('[data-slide]');
  const caption = root.querySelector('.floating-card');
  const carousel = createCarousel(slides.length, index => {
    images.forEach((image, i) => { image.classList.toggle('active', i === index); image.setAttribute('aria-hidden', String(i !== index)); });
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index)));
    caption.querySelector('strong').textContent = slides[index][2];
    caption.querySelector('small').textContent = slides[index][3];
  });
  function sync() {
    carousel.stop();
    if (!document.hidden) carousel.start();


  }
  controls.querySelector('[data-previous]').addEventListener('click', () => carousel.move(-1));
  controls.querySelector('[data-next]').addEventListener('click', () => carousel.move(1));
  dots.forEach(dot => dot.addEventListener('click', () => carousel.select(Number(dot.dataset.slide))));

  document.addEventListener('visibilitychange', sync);

  sync();
}

if (typeof document !== 'undefined') initCarousel();

