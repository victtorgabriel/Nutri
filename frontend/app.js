'use strict';

function normalizeText(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function filterServices(services, query = '', cost = 'all', type = 'Todos') {
  const search = normalizeText(query);
  return services.filter(service =>
    [service.name, service.city, service.neighborhood, service.state].some(value => normalizeText(value).includes(search)) &&
    (cost === 'all' || (cost === 'free' ? service.isFree : !service.isFree)) &&
    (type === 'Todos' || service.type === type)
  );
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}

function badgeColor(type) {
  return ({'Clínica-Escola':'blue','Serviço SUS':'green','Projeto Universitário':'purple','Ação Social':'pink','Ação Comunitária':'pink','Hospital Universitário':'amber'})[type] || 'green';
}

function serviceCard(service) {
  const e = escapeHTML;
  const phone = service.phone.replace(/\D/g, '');
  const contact = service.isWhatsApp ? `https://wa.me/55${phone}` : `tel:+55${phone}`;
  return `<article class="card service-card"><div class="service-heading"><h3>${e(service.name)}</h3><div class="badges"><span class="badge ${badgeColor(service.type)}">${e(service.type)}</span><span class="badge ${service.isFree ? 'green' : 'amber'}">${service.isFree ? 'Gratuito' : 'Valor Social'}</span></div></div>
    ${service.costValue ? `<p class="price">Valor: ${e(service.costValue)}</p>` : ''}
    <div class="service-info"><div><span class="symbol" aria-hidden="true">♧</span><span><strong>Público: </strong>${e(service.audience)}</span></div><div><span class="symbol" aria-hidden="true">⌖</span><span>${e(service.address)} — ${e(service.neighborhood)}, ${e(service.city)}/${e(service.state)}</span></div><div><span class="symbol" aria-hidden="true">☏</span><span>${service.phone ? `${service.isWhatsApp ? 'WhatsApp' : 'Tel'}: <a href="${contact}">${e(service.phone)}</a>` : 'Contato não disponível (exemplo)'}</span></div><div><span class="symbol" aria-hidden="true">◷</span><span>${e(service.hours)}</span></div><div><span class="symbol" aria-hidden="true">ⓘ</span><span><strong>Como solicitar: </strong>${e(service.howToRequest)}</span></div></div>
    <div class="service-footer"><span>${service.isExample ? 'Exemplo fictício' : `Atualizado em ${e(service.lastUpdated)}`}</span>${service.isExample ? '<span>Sem agendamento</span>' : service.contactLink ? `<a href="${e(service.contactLink)}" target="_blank" rel="noopener noreferrer">Acessar site ↗</a>` : `<a href="${contact}">Contato via ${service.isWhatsApp ? 'WhatsApp' : 'telefone'} ↗</a>`}</div></article>`;
}

function initApp() {
  const $ = selector => document.querySelector(selector);
  const types = ['Todos', 'Clínica-Escola', 'Serviço SUS', 'Projeto Universitário', 'Ação Social', 'Ação Comunitária', 'Hospital Universitário'];
  const state = { query: '', cost: 'all', type: 'Todos' };
  let visibleCount = 6;
  $('#type-filters').innerHTML = types.map(type => `<button class="chip" data-type="${escapeHTML(type)}" aria-pressed="${type === 'Todos'}">${escapeHTML(type)}</button>`).join('');

  function renderServices(resetPage = true) {
    if (resetPage) visibleCount = 6;
    const services = filterServices(SERVICES, state.query, state.cost, state.type);
    $('#service-results').innerHTML = services.slice(0, visibleCount).map(serviceCard).join('');
    $('#result-count').textContent = services.length > visibleCount
      ? `Mostrando ${visibleCount} de ${services.length} serviços`
      : `${services.length} serviço${services.length === 1 ? '' : 's'} encontrado${services.length === 1 ? '' : 's'}`;
    $('#empty-state').hidden = services.length > 0;
    $('#clear-query').hidden = !state.query;
    $('#clear-filters').hidden = !state.query && state.cost === 'all' && state.type === 'Todos';
    $('#filter-summary').textContent = [state.query.trim() ? `Busca: “${state.query.trim()}”` : '', state.cost === 'free' ? 'Gratuito' : state.cost === 'social' ? 'Valor social' : '', state.type === 'Todos' ? '' : state.type].filter(Boolean).join(' · ') || 'Todos os tipos e custos';
    $('#show-more').hidden = services.length <= visibleCount;
    $('#show-more').textContent = `Mostrar mais ${Math.min(6, Math.max(0, services.length - visibleCount))} serviços`;
    document.querySelectorAll('[data-cost]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.cost === state.cost)));
    document.querySelectorAll('[data-type]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.type === state.type)));
  }

  function updateSearch(query) {
    state.query = query;
    $('#hero-query').value = query;
    $('#service-query').value = query;
    renderServices();
  }

  $('#hero-search').addEventListener('submit', event => {
    event.preventDefault();
    updateSearch($('#hero-query').value);
    $('#atendimento').scrollIntoView();
    $('#service-query').focus({ preventScroll: true });
  });
  $('#service-query').addEventListener('input', event => updateSearch(event.target.value));
  $('#clear-query').addEventListener('click', () => { updateSearch(''); $('#service-query').focus(); });
  function resetFilters() { state.cost = 'all'; state.type = 'Todos'; updateSearch(''); $('#service-query').focus({ preventScroll: true }); }
  $('#reset-filters').addEventListener('click', resetFilters);
  $('#clear-filters').addEventListener('click', resetFilters);
  $('#show-more').addEventListener('click', () => {
    const firstNew = visibleCount;
    visibleCount += 6;
    renderServices(false);
    const card = $('#service-results').children[firstNew];
    if (card) { card.tabIndex = -1; card.focus({ preventScroll: true }); card.scrollIntoView({ block: 'nearest' }); }
  });
  document.querySelectorAll('[data-cost]').forEach(button => button.addEventListener('click', () => { state.cost = button.dataset.cost; renderServices(); }));
  document.querySelectorAll('[data-type]').forEach(button => button.addEventListener('click', () => { state.type = button.dataset.type; renderServices(); }));
  document.querySelectorAll('[data-quick-type], [data-quick-cost]').forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    state.type = button.dataset.quickType || 'Todos';
    state.cost = button.dataset.quickCost || 'all';
    updateSearch('');
    $('#atendimento').scrollIntoView();
  }));

  const menu = $('#main-nav');
  const toggle = $('#menu-toggle');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    toggle.textContent = open ? '×' : '☰';
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  window.matchMedia('(min-width: 1101px)').addEventListener('change', () => setMenu(false));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); } });
  document.addEventListener('click', event => { if (!$('#header').contains(event.target)) setMenu(false); });
  const syncHeader = () => $('#header').classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();
  const sectionLinks = [...menu.querySelectorAll('a')];
  const sections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  let navigationFrame = false;
  function updateNavigation() {
    let current = sections[0];
    for (const section of [...sections].sort((a, b) => a.offsetTop - b.offsetTop)) {
      if (section.getBoundingClientRect().top <= 140) current = section;
    }
    sectionLinks.forEach(link => {
      if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    navigationFrame = false;
  }
  window.addEventListener('scroll', () => {
    if (!navigationFrame) { navigationFrame = true; requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  updateNavigation();

  $('#clinic-cards').innerHTML = SERVICES.filter(service => service.type === 'Clínica-Escola').map(service => `<article class="clinic-card card"><span class="badge blue">Clínica-Escola</span> <span class="badge ${service.isFree ? 'green' : 'amber'}">${service.isFree ? 'Gratuito' : 'Valor Social'}</span><h3>${escapeHTML(service.name)}</h3><div class="service-info"><div>⌖ ${escapeHTML(service.neighborhood)}, ${escapeHTML(service.city)}/${service.state}</div><div>◷ ${escapeHTML(service.hours)}</div><div>☏ <a href="tel:+55${service.phone.replace(/\D/g, '')}">${escapeHTML(service.phone)}</a></div></div></article>`).join('');
  $('#article-list').innerHTML = ARTICLES.map((article, index) => `<article class="article-card card"><img class="article-image" src="${escapeHTML(article.imageUrl)}" alt="${escapeHTML(article.title)}" loading="lazy"><div class="article-body"><div class="article-meta"><span class="badge ${['green','amber','pink','purple'][index]}">${escapeHTML(article.category)}</span><small>${escapeHTML(article.readTime)} de leitura</small></div><h3>${escapeHTML(article.title)}</h3><p>${escapeHTML(article.excerpt)}</p><div class="article-author"><strong>${escapeHTML(article.author)}</strong>${escapeHTML(article.credential)}</div></div></article>`).join('');

  document.querySelectorAll('.photo > img, .article-image').forEach(image => {
    const fallback = () => { image.src = 'assets/logo.png'; image.style.objectFit = 'contain'; image.style.padding = '35px'; };
    image.addEventListener('error', fallback, { once: true });
    if (image.complete && image.naturalWidth === 0) fallback();
  });

  $('#contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = $('#contact-name');
    const message = $('#contact-message');
    for (const field of [name, message]) {
      field.setCustomValidity(field.value.trim() ? '' : 'Preencha este campo.');
      if (!field.reportValidity()) return;
    }
    const body = `Nome: ${name.value.trim()}\nE-mail: ${$('#contact-email').value.trim()}\n\n${message.value.trim()}`;
    const status = $('#contact-status');
    status.hidden = false;
    status.textContent = 'Mensagem preparada. Finalize o envio no seu aplicativo de e-mail. Se ele não abrir, copie sua mensagem e envie para contato@nutriacesso.org.br.';
    window.location.href = `mailto:contato@nutriacesso.org.br?subject=${encodeURIComponent('Contato NutriAcesso — ' + name.value.trim())}&body=${encodeURIComponent(body)}`;
  });
  $('#contact-form').addEventListener('input', event => event.target.setCustomValidity(''));
  $('#year').textContent = new Date().getFullYear();
  document.querySelector('[data-stat="services"]').textContent = SERVICES.length;
  document.querySelector('[data-stat="cities"]').textContent = new Set(SERVICES.map(s => s.city)).size;
  document.querySelector('[data-stat="states"]').textContent = new Set(SERVICES.map(s => s.state)).size;
  renderServices();
}

if (typeof document !== 'undefined') initApp();

