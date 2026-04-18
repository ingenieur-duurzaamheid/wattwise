import { KAMERS_DATA } from '../data/kamer_data.js';
import { KAMER_SVG } from './svg_kamer.js';
import { ICON_BASE } from '../config/icons.js';
import { KAMER_POSITIES, KAMER_ZOOM } from '../config/app_config.js';
import { berekeningen, setHuidigKamer, setHuidigToestel, resetNavigatie, getTarief, setTarief, getHuidigKamer } from '../state/app_state.js';

export function initHouse(animatieNaarKamerHandler) {
  const houseWrap = document.getElementById('house-wrap');
  if (!houseWrap) return;

  houseWrap.querySelectorAll('.kamer-overlay').forEach((el) => el.remove());

  Object.entries(KAMER_POSITIES).forEach(([id, pos]) => {
    const kamer = KAMERS_DATA[id];
    if (!kamer) return;

    const el = document.createElement('div');
    el.className = 'kamer-overlay';
    el.setAttribute('data-kamer', id);
    el.style.cssText = `top:${pos.top}%;left:${pos.left}%;width:${pos.width}%;height:${pos.height}%;`;
    el.innerHTML = `
      <div class="kamer-pulse">${kamer.emoji}</div>
      <div class="kamer-tag">${kamer.label}</div>
    `;
    el.addEventListener('click', () => animatieNaarKamerHandler(id));
    houseWrap.appendChild(el);
  });

//   houseWrap.addEventListener('click', logOverlayKlik);
}

// function logOverlayKlik(e) {
//   if (!e.target.closest('.kamer-overlay')) return;
//   const rect = e.currentTarget.getBoundingClientRect();
//   const x = ((e.clientX - rect.left) / rect.width) * 100;
//   const y = ((e.clientY - rect.top) / rect.height) * 100;
//   console.log(`left: ${x.toFixed(1)}%, top: ${y.toFixed(1)}%`);
// }

export function animatieNaarKamer(kamerId, toonKamerHandler) {
  const zoom = KAMER_ZOOM[kamerId];
  const img = document.getElementById('house-img');
  const wrap = document.getElementById('house-wrap');
  if (!zoom || !img || !wrap) return;

  wrap.classList.add('zooming');
  img.style.transition = 'transform .55s cubic-bezier(.4,0,.2,1), filter .3s';
  img.style.transformOrigin = `${zoom.x}% ${zoom.y}%`;
  img.style.transform = `scale(${zoom.scale})`;
  img.style.filter = 'brightness(1.05)';

  document.querySelectorAll('.kamer-overlay').forEach((o) => {
    o.style.transition = 'opacity .25s';
    o.style.opacity = '0';
    o.style.pointerEvents = 'none';
  });

  window.setTimeout(() => toonKamerHandler(kamerId), 480);
}

export function toonHuis() {
  const huis = document.getElementById('scherm-huis');
  const kamer = document.getElementById('scherm-kamer');
  const modal = document.getElementById('modal-overlay');
  const bcKamer = document.getElementById('bc-kamer');
  const bcToestel = document.getElementById('bc-toestel');
  const img = document.getElementById('house-img');
  const wrap = document.getElementById('house-wrap');

  if (kamer) kamer.style.display = 'none';
  if (huis) huis.style.display = 'block';
  if (modal) modal.classList.remove('actief');
  if (bcKamer) bcKamer.style.display = 'none';
  if (bcToestel) bcToestel.style.display = 'none';

  resetNavigatie();
  setHuidigToestel(null);

  if (img) {
    img.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1), filter .3s';
    img.style.transform = 'scale(1)';
    img.style.filter = '';
  }

  if (wrap) {
    wrap.classList.remove('zooming');
    window.setTimeout(() => {
      wrap.querySelectorAll('.kamer-overlay').forEach((o) => {
        o.style.transition = 'opacity .3s';
        o.style.opacity = '1';
        o.style.pointerEvents = '';
      });
    }, 300);
  }
}

export function toonKamer(kamerId, openToestelHandler) {
  const kamer = KAMERS_DATA[kamerId];
  if (!kamer) return;

  setHuidigKamer(kamerId);

  const bcKamer = document.getElementById('bc-kamer');
  const bcKamerNaam = document.getElementById('bc-kamer-naam');
  const bcToestel = document.getElementById('bc-toestel');
  const kamerTitel = document.getElementById('kamer-titel');
  const kamerIntro = document.getElementById('kamer-intro');
  const huis = document.getElementById('scherm-huis');
  const kamerScherm = document.getElementById('scherm-kamer');
  const scene = document.getElementById('kamer-scene');
  const bgEl = document.getElementById('kamer-scene-bg');
  const floor = document.getElementById('kamer-floor');
  const badge = document.getElementById('room-label-badge');

  if (bcKamer) bcKamer.style.display = 'inline';
  if (bcKamerNaam) bcKamerNaam.textContent = `${kamer.emoji} ${kamer.label}`;
  if (bcToestel) bcToestel.style.display = 'none';
  if (kamerTitel) kamerTitel.textContent = `${kamer.emoji} ${kamer.label}`;
  if (kamerIntro) kamerIntro.textContent = kamer.intro;
  if (huis) huis.style.display = 'none';
  if (kamerScherm) kamerScherm.style.display = 'block';

  if (!scene) return;
  scene.className = `kamer-scene ${kamerId}`;

  if (bgEl) {
    bgEl.className = `kamer-scene-bg ${kamerId}`;
    bgEl.innerHTML = KAMER_SVG[kamerId] || '';
  }

  if (floor) floor.className = `kamer-floor ${kamerId}`;
  if (badge) badge.innerHTML = `${kamer.emoji} ${kamer.label}`;

  scene.querySelectorAll('.appliance-spot').forEach((e) => e.remove());
  const oudeTotal = document.getElementById('kamer-totaal-badge');
  if (oudeTotal) oudeTotal.remove();

  kamer.toestellen.forEach((t, i) => {
    const spot = document.createElement('div');
    spot.className = 'appliance-spot';
    spot.id = `spot-${t.id}`;
    spot.style.cssText = Object.entries(t.pos).map(([k, v]) => `${k}:${v}`).join(';');
    spot.style.animationDelay = `${i * 0.08}s`;

    const kwh = berekeningen[t.id];
    const badgeHtml = kwh !== undefined
      ? `<div class="appliance-kwh-badge">${kwh} kWh/dag</div>`
      : '<div class="appliance-kwh-badge uncalc">klik om te meten</div>';

    if (kwh !== undefined) {
      spot.classList.add('berekend');
      spot.classList.remove('energie-laag', 'energie-middel', 'energie-hoog');
      if (kwh < 0.3) spot.classList.add('energie-laag');
      else if (kwh < 1.0) spot.classList.add('energie-middel');
      else spot.classList.add('energie-hoog');
    }

    const iconHtml = t.icon
      ? `<img src="${ICON_BASE}${t.icon}" alt="${t.label}" class="appliance-img" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
         <span class="appliance-emoji" style="display:none">${t.emoji}</span>`
      : `<span class="appliance-emoji">${t.emoji}</span>`;

    spot.innerHTML = `
      <div class="appliance-bubble">${iconHtml}
        <div class="appliance-name">${t.label}</div>
      </div>
      ${badgeHtml}
    `;
    spot.style.animation = `fadeSlideUp .35s ease ${i * 0.08}s both`;
    spot.addEventListener('click', () => openToestelHandler(t.id));
    scene.appendChild(spot);
  });

  bijwerkTotaalBadge(kamerId);
}

export function bijwerkTotaalBadge(kamerId) {
  const kamer = KAMERS_DATA[kamerId];
  const scene = document.getElementById('kamer-scene');
  if (!kamer || !scene) return;

  const bestaand = document.getElementById('kamer-totaal-badge');
  if (bestaand) bestaand.remove();

  const berekendeToestellen = kamer.toestellen.filter((t) => berekeningen[t.id] !== undefined);
  if (berekendeToestellen.length === 0) return;

  const totaal = berekendeToestellen.reduce((sum, t) => sum + berekeningen[t.id], 0);
  const tarief = getTarief();
  const badge = document.createElement('div');
  badge.id = 'kamer-totaal-badge';
  badge.className = 'kamer-totaal-badge';
  badge.innerHTML = `
    <span class="tot-lbl">📊 Totaal berekend (${berekendeToestellen.length}/${kamer.toestellen.length} toestellen)</span>
    <span class="tot-kwh">${totaal.toFixed(2)} kWh/dag</span>
    <span class="tot-eur">≈ €${(totaal * tarief * 365).toFixed(0)}/jaar</span>
  `;
  scene.appendChild(badge);
}

export function bijwerkStatsStrip() {
  _bijwerkTariefBadge();
  _bijwerkVerbruikBadge();
  _bijwerkKamersBadge();
}

function _bijwerkTariefBadge() {
  const el = document.getElementById('stat-tarief-num');
  if (el) el.textContent = `€${getTarief().toFixed(3)}`;
}

function _bijwerkVerbruikBadge() {
  const el = document.getElementById('stat-verbruik-num');
  if (!el) return;
  const totaal = Object.values(berekeningen).reduce((s, v) => s + v, 0);
  el.textContent = totaal > 0 ? totaal.toFixed(2) : '-';
}

function _bijwerkKamersBadge() {
  const el = document.getElementById('stat-kamers-num');
  if (!el) return;
  const totaalKamers = Object.keys(KAMERS_DATA).length;
  const berekend = Object.keys(KAMERS_DATA).filter(kamerId =>
    KAMERS_DATA[kamerId].toestellen.some(t => berekeningen[t.id] !== undefined)
  ).length;
  const teGaan = totaalKamers - berekend;
  el.textContent = teGaan;

  const lbl = document.getElementById('stat-kamers-lbl');
  if (lbl) lbl.innerHTML = teGaan === 0
    ? 'kamers<br><span style="color:var(--g3)">✓ klaar!</span>'
    : 'kamers<br>nog te verkennen';
}

const LEVERANCIERS = [
  { naam: 'Engie', tarief: 0.330 }, // easy fixed (vast contract)
  { naam: 'Luminus', tarief: 0.341 }, // maxxfix 2jaar (vast contract)
  { naam: 'Fluvius', tarief: 0.328 }, // maximumtarief voor midden-vlaanderen
  { naam: 'TotalEnergies', tarief: 0.279 }, // elektriciteit VARIABEL
  { naam: 'Mega', tarief: 0.287 },  // smart fixed (vast contract)
  { naam: 'Eneco', tarief: 0.324 }, // zon & wind vast
  { naam: 'Zelf ingeven', tarief: null },
];

export function initTariefPicker() {
  const badge = document.getElementById('stat-badge-tarief');
  if (!badge) return;
  badge.style.cursor = 'pointer';
  badge.title = 'Klik om tarief te wijzigen';
  badge.addEventListener('click', _openTariefPopup);
}

function _openTariefPopup() {
  document.getElementById('tarief-popup')?.remove();

  const popup = document.createElement('div');
  popup.id = 'tarief-popup';
  popup.className = 'tarief-popup';
  popup.innerHTML= `
    <div class="tarief-popup-titel">⚡ Kies jouw leverancier</div>
    <div class="tarief-popup-lijst">
      ${LEVERANCIERS.map(l => `
        <button class="tarief-optie${l.tarief === getTarief() ? ' actief' : ''}"
                data-tarief="${l.tarief ?? ''}"
                data-naam="${l.naam}">
          <span class="tarief-naam">${l.naam}</span>
          ${l.tarief ? `<span class="tarief-val">€${l.tarief.toFixed(3)}/kWh</span>` : ''}
        </button>
      `).join('')}
    </div>
    <div id="tarief-eigen-wrap" style="display:none;margin-top:8px;">
      <label style="font-size:.8rem;font-weight:700;display:block;margin-bottom:4px;">
        Jouw tarief (€/kWh)
      </label>
      <div style="display:flex;gap:6px;align-items:center;">
        <input id="tarief-eigen-inp" type="number" min="0.01" max="1"
               step="0.001" value="${getTarief().toFixed(3)}"
               style="width:90px;padding:6px 8px;border-radius:8px;border:1.5px solid var(--border);font-size:.9rem;">
        <button id="tarief-eigen-ok" class="tarief-optie" style="padding:6px 14px;">OK</button>
      </div>
    </div>
    <button class="tarief-sluit" id="tarief-sluit">✕</button>
  `;

  const badge = document.getElementById('stat-badge-tarief');
  const rect = badge.getBoundingClientRect();
  popup.style.cssText = `
    position:fixed;
    top:${rect.bottom + 8}px;
    left:${Math.max(8, rect.left - 20)}px;
    z-index:9999;
  `;

  document.body.appendChild(popup);

  const sluitBuiten = (e) => {
    if (!popup.contains(e.target) && e.target !== badge) {
      popup.remove();
      document.removeEventListener('click', sluitBuiten);
    }
  };

  setTimeout(() => document.addEventListener('click', sluitBuiten), 10);

  popup.querySelector('#tarief-sluit').addEventListener('click', () => popup.remove());

  popup.querySelectorAll('.tarief-optie[data-naam]').forEach(btn => {
    btn.addEventListener('click', () => {
      const naam = btn.dataset.naam;
      const tarief = btn.dataset.tarief;

      if (naam === 'Zelf ingeven') {
        popup.querySelector('#tarief-eigen-wrap').style.display = '';
        return;
      }
      setTarief(tarief);
      _herbereken();
      bijwerkStatsStrip();
      popup.remove();
    });
  });

  popup.querySelector('#tarief-eigen-ok')?.addEventListener('click', () => {
    const val = popup.querySelector('#tarief-eigen-inp').value;
    setTarief(val);
    _herbereken();
    bijwerkStatsStrip();
    popup.remove();
  });

  
}

function _herbereken() {
  const tarief = getTarief();

  const dagEl = document.getElementById('c-dag');
  const maandEl = document.getElementById('c-maand');
  const jaarEl = document.getElementById('c-jaar');
  const resGetal = document.getElementById('res-getal');

  if (dagEl && resGetal) {
    const kwh = parseFloat(resGetal.textContent);
    if (!isNaN(kwh)){
      dagEl.textContent = `€${(kwh * tarief).toFixed(2)}`;
      maandEl.textContent = `€${(kwh * tarief * 30).toFixed(2)}`;
      jaarEl.textContent  = `€${(kwh * tarief * 365).toFixed(0)}`;
    }
  }

  const kamerId = getHuidigKamer();
  if (kamerId) bijwerkTotaalBadge(kamerId);

  Object.keys(KAMERS_DATA).forEach(kamerId => {
    const kamer = KAMERS_DATA[kamerId];
    const totaalEl = document.getElementById('kamer-totaal-badge');
    if (totaalEl) bijwerkTotaalBadge(kamerId);
  })

}

window.toonHuis = toonHuis;
window.toonKamer = toonKamer;
window.bijwerkTotaalBadge = bijwerkTotaalBadge;
window.animatieNaarKamer = animatieNaarKamer;
window.resetNavigatie = resetNavigatie;
window.setHuidigKamer = setHuidigKamer;
window.setHuidigToestel = setHuidigToestel;
window.animatieNaarKamer = animatieNaarKamer;