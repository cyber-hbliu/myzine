const zines = [
  { title: '01 — AFTER THE RAIN', spreads: [
    [{ type: 'text', tone: 'acid', num: '01 / 08', title: 'After<br>the rain', copy: 'A record of surfaces, pressure and the light that arrives after.' }, { type: 'image', src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85', caption: 'Untitled, 2024' }],
    [{ type: 'image', src: 'https://images.unsplash.com/photo-1519608487953-e999c86e7451?auto=format&fit=crop&w=1200&q=85', className: 'blue', caption: 'Study for a weather system' }, { type: 'text', num: 'FIELD NOTE / 02', title: 'There is<br>no clear<br>view.', copy: 'The lens collects what the body misses.' }]
  ]},
  { title: "02 — ANGEL'S SHARE", spreads: [
    [{ type: 'text', tone: 'red', num: '02 / 12', title: "Angel's<br>share", copy: 'Photographs from rooms where the air had already changed.' }, { type: 'image', src: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85', caption: 'Interior / no date' }],
    [{ type: 'image', src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=85', className: 'warm', caption: 'Dust, 5:43 PM' }, { type: 'text', num: '02 / 12', title: 'What<br>remains', copy: 'A temporary architecture of waiting.' }]
  ]},
  { title: '03 — FROM A DISTANCE', spreads: [
    [{ type: 'text', num: '03 / 10', title: 'From a<br>distance', copy: 'A sequence of images made while moving too quickly to name the place.' }, { type: 'image', src: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85', caption: 'No. 03, 2025' }],
    [{ type: 'image', src: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85', className: 'blue', caption: 'Distance is a material' }, { type: 'text', tone: 'acid', num: 'TRANSIT', title: 'A line<br>keeps<br>moving.', copy: 'Even after the picture is made.' }]
  ]},
  { title: '04 — UNTITLED STUDIES', spreads: [
    [{ type: 'text', tone: 'red', num: '04 / 06', title: 'Untitled<br>studies', copy: 'Experiments in gesture, crop and interruption.' }, { type: 'image', src: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1200&q=85', caption: 'Study 04 / 2022' }],
    [{ type: 'image', src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85', className: 'warm', caption: 'The image resists its title' }, { type: 'text', num: 'END', title: 'Not yet<br>a picture.', copy: 'A page from an unfinished index.' }]
  ]},
  { title: '05 — A SOFTER ERROR', spreads: [
    [{ type: 'text', tone: 'acid', num: '05 / 16', title: 'A softer<br>error', copy: 'New work about malfunction, softness and the excess of a photograph.' }, { type: 'image', src: 'https://images.unsplash.com/photo-1519608487953-e999c86e7451?auto=format&fit=crop&w=1200&q=85', caption: 'New edition / 2026' }],
    [{ type: 'image', src: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85', className: 'blue', caption: 'The room after the signal' }, { type: 'text', tone: 'red', num: '05 / 16', title: 'Error is<br>also a<br>texture.', copy: 'To be continued.' }]
  ]}
];
const reader = document.querySelector('#reader');
let activeZine = 0; let activeSpread = 0;
function renderPage(page) {
  if (page.type === 'image') return `<img class="photo ${page.className || ''}" src="${page.src}" alt="${page.caption || ''}"><p class="caption">${page.caption || ''}</p>`;
  return `<div class="text-page ${page.tone || ''}"><span class="num">${page.num}</span><h2>${page.title}</h2><p>${page.copy}</p></div>`;
}
function render() {
  const zine = zines[activeZine]; const spread = zine.spreads[activeSpread];
  document.querySelector('#readerTitle').textContent = zine.title;
  document.querySelector('#pageCount').textContent = `${String(activeSpread * 2 + 1).padStart(2, '0')}—${String(activeSpread * 2 + 2).padStart(2, '0')} / ${String(zine.spreads.length * 2).padStart(2, '0')}`;
  document.querySelector('#leftPage').innerHTML = renderPage(spread[0]);
  document.querySelector('#rightPage').innerHTML = renderPage(spread[1]);
}
function openZine(index) { activeZine = index; activeSpread = 0; render(); reader.showModal(); }
function turn(change) { const max = zines[activeZine].spreads.length - 1; const next = Math.min(max, Math.max(0, activeSpread + change)); if (next === activeSpread) return; document.querySelector('#zine').animate([{ opacity: .25, transform: `translateX(${change * 35}px)` }, { opacity: 1, transform: 'translateX(0)' }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' }); activeSpread = next; render(); }
document.querySelectorAll('.book').forEach(book => book.addEventListener('click', () => openZine(Number(book.dataset.zine))));
document.querySelector('#closeReader').addEventListener('click', () => reader.close());
document.querySelector('#prevPage').addEventListener('click', () => turn(-1)); document.querySelector('#nextPage').addEventListener('click', () => turn(1));
document.querySelector('#prevButton').addEventListener('click', () => turn(-1)); document.querySelector('#nextButton').addEventListener('click', () => turn(1));
document.addEventListener('keydown', event => { if (!reader.open) return; if (event.key === 'ArrowLeft') turn(-1); if (event.key === 'ArrowRight') turn(1); });
document.querySelector('#infoButton').addEventListener('click', event => { const about = document.querySelector('#about'); const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true'; about.hidden = expanded; event.currentTarget.setAttribute('aria-expanded', String(!expanded)); });
