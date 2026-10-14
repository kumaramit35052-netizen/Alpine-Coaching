/* Footer year */
document.getElementById('yr').textContent = new Date().getFullYear();

/* Mobile menu */
const burger = document.getElementById('burger'), links = document.getElementById('links');
burger.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

/* Navbar turns solid on scroll */
const nav = document.getElementById('nav');
if (!nav.classList.contains('solid')) {
  const onScroll = () => nav.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', onScroll); onScroll();
}

/* Count-up numbers (home page) */
const nums = document.querySelectorAll('[data-n]');
if (nums.length) {
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.n; let n = 0;
    const step = Math.max(1, Math.ceil(end / 50));
    const t = setInterval(() => {
      n = Math.min(end, n + step);
      el.textContent = n + (end >= 50 ? '+' : '');
      if (n >= end) clearInterval(t);
    }, 30);
    io.unobserve(el);
  }), { threshold: .6 });
  nums.forEach(n => io.observe(n));
}

/* Gallery: reveal + lightbox */
const items = document.querySelectorAll('.g-item');
if (items.length) {
  const reveal = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('show'), (e.target.dataset.i % 3) * 120);
      reveal.unobserve(e.target);
    }
  }), { threshold: .15 });
  items.forEach((it, i) => { it.dataset.i = i; reveal.observe(it); });

  const lb = document.getElementById('lb'), lbImg = lb.querySelector('img');
  items.forEach(it => it.addEventListener('click', () => {
    const img = it.querySelector('img');
    if (!img || !img.complete || !img.naturalWidth) return; // empty slot
    lbImg.src = img.src; lb.classList.add('open');
  }));
  lb.addEventListener('click', () => lb.classList.remove('open'));
  addEventListener('keydown', e => e.key === 'Escape' && lb.classList.remove('open'));

  /* Missing photo? Keep the placeholder instead of a broken icon */
  document.querySelectorAll('.g-item img').forEach(img =>
    img.addEventListener('error', () => img.remove()));
}

/* Contact form -> WhatsApp */
const form = document.getElementById('form');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const text = `Hello ALPINE, I am ${fname.value}. Class/course: ${fclass.value}. ${fmsg.value}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
});

/* Toppers slider: auto-slide, arrows, pause on hover */
const track = document.getElementById('tops');
if (track) {
  const step = () => track.querySelector('.top').offsetWidth + 24;
  const go = dir => {
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (dir > 0 && end) track.scrollTo({ left: 0 });
    else if (dir < 0 && track.scrollLeft <= 4) track.scrollTo({ left: track.scrollWidth });
    else track.scrollBy({ left: dir * step() });
  };
  document.getElementById('tnext').onclick = () => go(1);
  document.getElementById('tprev').onclick = () => go(-1);
  let timer = setInterval(() => go(1), 2800);
  const hold = () => clearInterval(timer), play = () => { clearInterval(timer); timer = setInterval(() => go(1), 2800); };
  track.addEventListener('mouseenter', hold); track.addEventListener('mouseleave', play);
  track.addEventListener('touchstart', hold, { passive: true }); track.addEventListener('touchend', play);
}

/* ===== EXTRA ANIMATIONS ===== */
/* scroll progress bar */
const bar = document.createElement('div'); bar.className = 'progress'; document.body.appendChild(bar);

/* tag elements for scroll reveal */
const tag = (sel, cls, gap) => document.querySelectorAll(sel).forEach((el, i) => {
  el.classList.add('rv'); if (cls) el.classList.add(cls);
  el.style.setProperty('--d', (i * gap) + 's');
});
tag('.head', '', 0);
tag('.stats .stat', 'z', .12);
tag('.courses .card', 'z', .12);
tag('.why li', 'l', .15);
tag('.cbox .info', 'l', 0);
tag('.cbox form', 'r', 0);
tag('footer', '', 0);
const rvIO = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target; el.classList.add('show'); if (el.classList.contains('head')) el.classList.add('ul');
  rvIO.unobserve(el);
  /* remove reveal classes afterwards so hover effects stay snappy */
  setTimeout(() => el.classList.remove('rv', 'show', 'l', 'r', 'z'), 1800 + parseFloat(el.style.getPropertyValue('--d') || 0) * 1000);
}), { threshold: .15 });
document.querySelectorAll('.rv').forEach(el => rvIO.observe(el));

/* 3D tilt on cards (mouse devices only) */
if (matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('.card,.stat,.top').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transition = 'transform .1s';
      el.style.transform = `perspective(700px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-8px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transition = ''; el.style.transform = ''; });
  });
}

/* floating WhatsApp button (home page, where the number is set) */
let wa = null;
if (typeof WHATSAPP !== 'undefined') {
  wa = document.createElement('a'); wa.className = 'wa'; wa.textContent = '💬';
  wa.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello ALPINE, I want to know more.')}`;
  wa.target = '_blank'; wa.setAttribute('aria-label', 'Chat on WhatsApp'); document.body.appendChild(wa);
}

/* scroll: progress bar, parallax, WhatsApp button */
const peaks = document.querySelector('.peaks'), bubs = document.querySelectorAll('.bub');
let tick = false;
addEventListener('scroll', () => {
  if (tick) return; tick = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (scrollY / max * 100) + '%';
    if (wa) wa.classList.toggle('show', scrollY > 300);
    if (peaks && scrollY < 1000) {
      peaks.style.transform = `translateY(${scrollY * .12}px)`;
      bubs.forEach((b, i) => b.style.translate = `0 ${scrollY * (.08 + i * .05)}px`);
    }
    tick = false;
  });
}, { passive: true });

/* form button feedback */
if (form) form.addEventListener('submit', () => {
  const b = form.querySelector('button'), old = b.textContent;
  b.textContent = 'Opening WhatsApp ✓'; b.classList.add('sent');
  setTimeout(() => { b.textContent = old; b.classList.remove('sent'); }, 2500);
});
