/* 📷 APNA INSTAGRAM LINK YAHAN LIKHO (poora link, jaise https://www.instagram.com/alpine_coaching) */
const INSTAGRAM = "https://www.instagram.com/alpinecareerinstitute";
document.querySelectorAll('[data-insta]').forEach(a => { a.href = INSTAGRAM; a.target = '_blank'; a.rel = 'noopener'; });

/* 🏆 TOPPERS KI LIST: har topper ke liye naam, class, subject aur percentage yahan badlo.
   Subject nahi dikhana ho to subject: '' likh do.
   Photo isi folder mein hai (T1 ... T15, jpg ya png dono chalenge). Naya topper: ek line copy karo.
   Kisi ko hatana ho to uski line delete kar do. */
const TOPPERS = [
  { img: 'T1', name: 'VAISHNAVI', cls: 'Class 12', subject: 'CHEMISTRY', score: '82%' },
  { img: 'T2', name: 'SHIVANI SINGH', cls: 'Class 10', subject: 'SCIENCE', score: '89.2%' },
  { img: 'T3', name: 'SHAGUN RAJAWAT', cls: 'Class  10', subject: 'SCIENCE', score: '86.2%' },
  { img: 'T4', name: 'HAPPY', cls: 'Class 12', subject: 'CHEMISTRY', score: '91%' },
  { img: 'T5', name: 'MEDHAVI', cls: 'Class 10', subject: 'SCIENCE', score: '92%' },
  { img: 'T6', name: 'MAYANK', cls: 'Class 10', subject: 'SCIENCE', score: '91%' },
  { img: 'T7', name: 'HARSH VARSHAN', cls: 'Class 10', subject: 'SCIENCE', score: '90%' },
  { img: 'T8', name: 'DIPIKA', cls: 'Class 10', subject: 'SCIENCE', score: '94%' },
  { img: 'T9', name: 'CHETANIYA PANDEY', cls: 'Class 10', subject: 'SCIENCE', score: '92%' },
  { img: 'T10', name: 'AYUSH YADAV', cls: 'Class 10', subject: 'SCIENCE', score: '90%' },
  { img: 'T11', name: 'AYUSHI', cls: 'Class 10', subject: 'SCIENCE', score: '88%' },
  { img: 'T12', name: 'ASTHA', cls: 'Class 10', subject: 'SCIENCE', score: '95%' },
  { img: 'T13', name: 'APARNA YADAV', cls: 'Class 10', subject: 'SCIENCE', score: '92%' },
  { img: 'T14', name: 'AKANSHA PANDEY', cls: 'Class 10', subject: 'SCIENCE', score: '94.2%' },
  { img: 'T15', name: 'AANCHAL PANDEY', cls: 'Class 10', subject: 'SCIENCE', score: '82.2%' }
];
/* photo .jpg, .png, .jpeg ya .webp kisi bhi format mein ho to chalegi */
const EXTS = ['jpg', 'png', 'jpeg', 'webp', 'JPG', 'PNG', 'JPEG', 'WEBP']; /* bade akshar wale (.JPG) bhi chalenge */
function nextExt(img) {
  const i = +img.dataset.i + 1;
  if (i < EXTS.length) { img.dataset.i = i; img.src = `${img.dataset.base}.${EXTS[i]}`; } else img.remove();
}
const topsBox = document.getElementById('tops');
if (topsBox) topsBox.innerHTML = TOPPERS.map(t =>
  `<div class="top"><div class="pic">🎓<img src="${t.img}.jpg" data-base="${t.img}" data-i="0" alt="${t.name}" onerror="nextExt(this)"></div><div class="score">${t.score}</div><h3>${t.name}</h3><span>${t.cls}</span>${t.subject ? `<b class="tsub">${t.subject}</b>` : ''}</div>`
).join('');

/* 🖼️ GALLERY: isi folder mein G1 ... G32 photos (jpg/png/jpeg/webp kuch bhi chalega).
   Photos kam ya zyada hon to GALLERY_COUNT badlo. Pehle SHOW_FIRST photos dikhti hain, baaki "Show more" se. */
const GALLERY_COUNT = 32, SHOW_FIRST = 12;
const galBox = document.getElementById('gallery-grid');
if (galBox) {
  galBox.innerHTML = Array.from({ length: GALLERY_COUNT }, (_, i) =>
    `<figure class="g-item${i % 5 === 1 ? ' tall' : ''}${i >= SHOW_FIRST ? ' hide' : ''}"><span class="ph">Photo ${i + 1}</span><img src="G${i + 1}.jpg" data-base="G${i + 1}" data-i="0" alt="ALPINE photo ${i + 1}" loading="lazy" onerror="nextExt(this)"></figure>`
  ).join('');
  const more = document.getElementById('gmore');
  if (GALLERY_COUNT <= SHOW_FIRST) more.remove();
  else more.onclick = () => { galBox.querySelectorAll('.hide').forEach(f => f.classList.remove('hide')); more.remove(); };
}

/* 🔔 TICKER (upar chalti patti): yahan likha text badlo, ya naya jodo */
const TICKER = ['ENROLL NOW!', 'CBSE / ICSE BOARD', 'CLASS 1 TO 12', 'ENGLISH CLASSES AVAILABLE', 'MORNING BATCHES FOR K.V SECOND SHIFT', 'CALL 88299 56645'];
const ttrack = document.getElementById('ttrack');
if (ttrack) ttrack.innerHTML = [...TICKER, ...TICKER].map(t => `<span>${t}</span>`).join('');

/* 🕒 BATCH TIMINGS & FEES: jab tak list khali hai, ye section chhupa rehta hai.
   Aise likho (har class ke liye ek line):
   { cls: 'Class 9 – 12', timing: '4:00 PM – 6:00 PM', fee: '₹ 1000 / month' }, */
const BATCHES = [];

/* ⭐ REVIEWS: jab tak list khali hai, ye section chhupa rehta hai.
   Aise likho: { name: 'Parent of Rahul, Class 10', text: 'Bahut accha padhate hain.' }, */
const REVIEWS = [];

const addNav = (href, label) => { const b = document.querySelector('#links .btn'); if (b) { const a = document.createElement('a'); a.href = href; a.textContent = label; b.before(a); } };
if (BATCHES.length) {
  const sec = document.getElementById('timings'), tabs = document.getElementById('ttabs'), panel = document.getElementById('tpanel');
  sec.hidden = false; addNav('#timings', 'Fees');
  const showB = i => {
    const b = BATCHES[i];
    tabs.querySelectorAll('button').forEach((x, j) => x.classList.toggle('on', i === j));
    panel.innerHTML = `<div class="tcell"><span>🕒 Timing</span><b>${b.timing || '-'}</b></div><div class="tcell"><span>💰 Fees</span><b>${b.fee || '-'}</b></div><a class="btn" href="#contact">Enquire now</a>`;
    panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
  };
  BATCHES.forEach((b, i) => { const x = document.createElement('button'); x.textContent = b.cls; x.onclick = () => showB(i); tabs.appendChild(x); });
  showB(0);
}
if (REVIEWS.length) {
  document.getElementById('reviews').hidden = false; addNav('#reviews', 'Reviews');
  document.getElementById('rgrid').innerHTML = REVIEWS.map(r => `<div class="rcard"><p>${r.text}</p><b>${r.name}</b></div>`).join('');
}

/* 🧠 QUIZ: sawal badalne ho to yahan badlo (a = sahi option ka number, 0 se shuru) */
const QUIZ = [
  { q: 'Approximate value of π?', o: ['2.14', '3.14', '4.13', '3.41'], a: 1 },
  { q: 'Chemical formula of water?', o: ['CO₂', 'O₂', 'H₂O', 'NaCl'], a: 2 },
  { q: 'SI unit of force?', o: ['Joule', 'Watt', 'Newton', 'Pascal'], a: 2 },
  { q: 'Which is the powerhouse of the cell?', o: ['Nucleus', 'Mitochondria', 'Ribosome', 'Vacuole'], a: 1 },
  { q: 'What is 15% of 200?', o: ['20', '25', '30', '35'], a: 2 }
];
const qbox = document.getElementById('qbox');
if (qbox) {
  let qi = 0, score = 0;
  const draw = () => {
    if (qi >= QUIZ.length) {
      const msg = score >= 4 ? 'Excellent! 🎉' : score >= 2 ? 'Good try! 👍' : 'Keep practising! 💪';
      qbox.innerHTML = `<div class="qres"><div class="qscore">${score}/${QUIZ.length}</div><h3>${msg}</h3><p>Want to score even better? Join ALPINE.</p><a class="btn" href="#contact">Join now</a> <button class="btn ghost2" id="qagain">Try again</button></div>`;
      document.getElementById('qagain').onclick = () => { qi = 0; score = 0; draw(); };
      if (score >= 4) { const r = qbox.getBoundingClientRect(); confetti(r.left + r.width / 2, r.top + 60); }
      return;
    }
    const q = QUIZ[qi];
    qbox.innerHTML = `<div class="qbar"><i style="width:${qi / QUIZ.length * 100}%"></i></div><small>Question ${qi + 1} of ${QUIZ.length}</small><h3>${q.q}</h3><div class="qopts">${q.o.map((o, i) => `<button data-i="${i}">${o}</button>`).join('')}</div>`;
    qbox.querySelectorAll('.qopts button').forEach(b => b.onclick = () => {
      const pick = +b.dataset.i; if (pick === q.a) score++;
      qbox.querySelectorAll('.qopts button').forEach((x, i) => { x.disabled = true; if (i === q.a) x.classList.add('ok'); });
      if (pick !== q.a) b.classList.add('no');
      setTimeout(() => { qi++; draw(); }, 1000);
    });
  };
  draw();
}

/* save number + share */
const vcfBtn = document.getElementById('vcf'), shareBtn = document.getElementById('share');
if (vcfBtn) vcfBtn.onclick = () => {
  const v = `BEGIN:VCARD\nVERSION:3.0\nFN:ALPINE Career Institute\nORG:ALPINE Career Institute\nTEL;TYPE=CELL:+918829956645\nEMAIL:alpinecareerinstitute@gmail.com\nADR;TYPE=WORK:;;Sadhana Sadan B-140 UPSIDC Navipur;Kanpur;Uttar Pradesh;209311;India\n${location.protocol.startsWith('http') ? 'URL:' + location.href + '\n' : ''}END:VCARD`;
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([v], { type: 'text/vcard' })); a.download = 'ALPINE-Career-Institute.vcf'; a.click();
};
if (shareBtn) shareBtn.onclick = () => {
  const text = 'ALPINE Career Institute, Kanpur: CBSE / ICSE coaching for Class 1 to 12.';
  if (navigator.share) navigator.share({ title: 'ALPINE Career Institute', text, url: location.href }).catch(() => {});
  else window.open('https://wa.me/?text=' + encodeURIComponent(text + ' ' + location.href), '_blank');
};

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
      el.textContent = n + (el.dataset.s || '');
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
  let list = [], li = 0;
  const showAt = i => { li = (i + list.length) % list.length; lbImg.src = list[li].querySelector('img').src; };
  items.forEach(it => it.addEventListener('click', () => {
    list = [...items].filter(f => { const im = f.querySelector('img'); return im && im.naturalWidth && !f.classList.contains('hide'); });
    if (!list.includes(it)) return; // empty slot
    showAt(list.indexOf(it)); lb.classList.add('open');
  }));
  lb.querySelector('.prev').addEventListener('click', e => { e.stopPropagation(); showAt(li - 1); });
  lb.querySelector('.next').addEventListener('click', e => { e.stopPropagation(); showAt(li + 1); });
  lb.addEventListener('click', () => lb.classList.remove('open'));
  addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') lb.classList.remove('open');
    if (e.key === 'ArrowRight') showAt(li + 1);
    if (e.key === 'ArrowLeft') showAt(li - 1);
  });

}

/* Contact form: class -> subject dropdowns, then WhatsApp */
/* 📚 COURSES BADLO TO YAHAN BHI BADLO: class ka naam aur uske subjects */
const CLASS_SUBJECTS = {
  'Class 1 – 5': ['All subjects'],
  'Class 6 – 8': ['Math', 'Science', 'English'],
  'Class 9 – 12': ['Physics', 'Maths', 'Chemistry', 'Biology', 'Accountancy', 'BST (Business Studies)', 'Economics', 'English']
};
const form = document.getElementById('form');
if (form) {
  const clsSel = document.getElementById('fclass'), subSel = document.getElementById('fsub');
  const opt = (v, text = v, sel = false) => { const o = document.createElement('option'); o.value = v; o.textContent = text; o.selected = sel; return o; };
  Object.keys(CLASS_SUBJECTS).forEach(k => clsSel.appendChild(opt(k)));
  clsSel.addEventListener('change', () => {
    const list = CLASS_SUBJECTS[clsSel.value];
    subSel.innerHTML = ''; subSel.disabled = false;
    if (list.length === 1) subSel.appendChild(opt(list[0], list[0], true));
    else {
      const ph = opt('', 'Select subject', true); ph.disabled = true; subSel.appendChild(ph);
      list.forEach(x => subSel.appendChild(opt(x)));
      subSel.appendChild(opt('Multiple subjects (write in message)'));
    }
    subSel.classList.remove('pop'); void subSel.offsetWidth; subSel.classList.add('pop');
  });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = `Hello ALPINE Career Institute, I am ${fname.value}. Class: ${clsSel.value}. Subject: ${subSel.value}. ${fmsg.value}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
  });
}

/* Toppers slider: auto-slide, arrows, pause on hover/touch */
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
  const hold = () => clearInterval(timer);
  const play = () => { clearInterval(timer); timer = setInterval(() => go(1), 2800); };
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
tag('.ibox', 'z', 0);
tag('.note', '', .15);
tag('.fphoto', 'l', 0);
tag('.fbio', 'r', 0);
tag('.cbox .info', 'l', 0);
tag('.cbox form', 'r', 0);
tag('.step', 'z', .12);
tag('.rcard', 'z', .12);
tag('.qbox', 'z', 0);
tag('details', '', .1);
tag('.mapbox', '', 0);
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

/* founder photo: wipe-in reveal */
const fp = document.querySelector('.fphoto');
if (fp) new IntersectionObserver((en, o) => en.forEach(e => { if (e.isIntersecting) { fp.classList.add('in'); o.disconnect(); } }), { threshold: .3 }).observe(fp);

/* rotating subject word in hero */
const rot = document.getElementById('rot');
if (rot) {
  const words = ['Physics', 'Maths', 'Chemistry', 'Biology', 'Accountancy', 'Economics', 'English'];
  let wi = 0;
  setInterval(() => { wi = (wi + 1) % words.length; rot.textContent = words[wi]; rot.classList.remove('swap'); void rot.offsetWidth; rot.classList.add('swap'); }, 2200);
}

/* hero light follows the mouse */
const heroEl = document.querySelector('.hero');
if (heroEl) heroEl.addEventListener('mousemove', e => {
  const r = heroEl.getBoundingClientRect();
  heroEl.style.setProperty('--mx', (e.clientX - r.left) + 'px'); heroEl.style.setProperty('--my', (e.clientY - r.top) + 'px');
});

/* mobile bar WhatsApp link, scroll-to-top button, menu highlight */
if (typeof WHATSAPP !== 'undefined') document.querySelectorAll('[data-wa]').forEach(a => a.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello ALPINE, I want to know more.')}`);
const up = document.createElement('button'); up.className = 'totop'; up.textContent = '↑'; up.setAttribute('aria-label', 'Back to top');
up.onclick = () => scrollTo({ top: 0, behavior: 'smooth' }); document.body.appendChild(up);
addEventListener('scroll', () => up.classList.toggle('show', scrollY > 600), { passive: true });
const spy = new IntersectionObserver(en => en.forEach(e => {
  if (e.isIntersecting) links.querySelectorAll('a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(sec => spy.observe(sec));

/* magnetic buttons, hero parallax, confetti */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, hover = matchMedia('(hover:hover)').matches;
if (hover && !reduce) {
  document.querySelectorAll('.btn').forEach(b => {
    b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; });
    b.addEventListener('mouseleave', () => b.style.transform = '');
  });
  const emb = document.querySelector('.emblem');
  if (heroEl && emb) heroEl.addEventListener('mousemove', e => {
    const r = heroEl.getBoundingClientRect();
    emb.style.translate = `${((e.clientX - r.left) / r.width - .5) * -26}px ${((e.clientY - r.top) / r.height - .5) * -20}px`;
  });
}
function confetti(x, y) {
  if (reduce) return;
  const cols = ['#fcc200', '#35b6ff', '#0050b3', '#ffffff', '#25d366'];
  for (let i = 0; i < 32; i++) {
    const p = document.createElement('span');
    p.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:9px;height:14px;border-radius:2px;background:${cols[i % 5]};z-index:1000;pointer-events:none`;
    document.body.appendChild(p);
    const a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 190;
    p.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d + 120}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }],
      { duration: 900 + Math.random() * 700, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => p.remove();
  }
}
document.querySelectorAll('.hero .cta .btn, #form button').forEach(b => b.addEventListener('click', e => confetti(e.clientX, e.clientY)));

/* card spotlight + custom cursor ring (desktop) */
document.querySelectorAll('.card,.step,.stat,.rcard').forEach(el => {
  el.classList.add('glow');
  el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); el.style.setProperty('--gx', (e.clientX - r.left) + 'px'); el.style.setProperty('--gy', (e.clientY - r.top) + 'px'); });
});
if (hover && !reduce) {
  const ring = document.createElement('div'); ring.className = 'cur'; document.body.appendChild(ring);
  let cx = -50, cy = -50, tx = -50, ty = -50;
  addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; ring.classList.toggle('big', !!e.target.closest('a,button,summary,.g-item,.card,.top')); }, { passive: true });
  (function loop() { cx += (tx - cx) * .18; cy += (ty - cy) * .18; ring.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })();
}
