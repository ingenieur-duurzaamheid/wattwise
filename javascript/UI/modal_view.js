import { KAMERS_DATA } from '../data/kamer_data.js';
import { ADEME, LABEL_KLEUREN } from '../data/appliance_kwh.js';
import { berekeningen, getHuidigKamer, getHuidigToestel, setHuidigToestel, getTarief } from '../state/app_state.js';
import { ICON_BASE } from '../config/icons.js';
import { bijwerkStatsStrip } from './house_view.js';
// import { TARIEF } from '../config/app_config.js';


// Deze twee variabelen worden later gevuld via initModalHandlers().
// Ze houden een verwijzing bij naar functies uit andere modules,
// zodat de modal na gebruik de kamerpagina kan vernieuwen.
let refreshRoom = null;   // Functie om de kamerpagina opnieuw op te bouwen
let updateRoomTotal = null;  // Functie om de totaalverbruik-badge in de kamer bij te werken

let updateStatsStrip = null; // om de stats badges op de huispagina bij te werken

/**
 * NIET ZO BELANGRIJK
 * Deze functie moet één keer worden aangeroepen bij het opstarten van de app
 * (in main.js), vóór de modal ooit wordt geopend.
 *
 * @param {Object} handlers - Object met twee callback-functies:
 *   - toonKamerHandler: wordt aangeroepen na het sluiten van de modal
 *     om de kamer opnieuw te tekenen (zodat nieuwe kWh-badges zichtbaar zijn).
 *   - bijwerkTotaalBadgeHandler: wordt aangeroepen na een berekening
 *     om de totaalbadge onderaan de kamerscène bij te werken.
 */
export function initModalHandlers({ toonKamerHandler, bijwerkTotaalBadgeHandler, bijwerkStatsStripHandler }) {
  refreshRoom = toonKamerHandler;
  updateRoomTotal = bijwerkTotaalBadgeHandler;
  updateStatsStrip = bijwerkStatsStripHandler;

  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === this) sluitModal();
    });
  }

  window.setModus = setModus;
  window.berekenVerbruik = berekenVerbruik;
  window.gebruikGemiddelde = gebruikGemiddelde;
}

/**
 * BELANGRIJK
 * Opent de modal voor een specifiek toestel.
 *
 * Zoekt het toestel op in de data van de huidige kamer, vult de modal-header
 * in met naam en icoon, bouwt het invoerformulier op en maakt de modal zichtbaar.
 * Werkt ook de breadcrumb bovenaan de pagina bij (bijv. "🏠 Huis › 🛋️ Woonkamer › Televisie").
 *
 * @param {string} toestelId - De unieke ID van het te openen toestel (bijv. "wk_tv").
 */
export function openToestel(toestelId) {

  //zoeken van informatie toestel uit KAMERS_DATA
  const kamer = KAMERS_DATA[getHuidigKamer()];
  if (!kamer) return;

  const t = kamer.toestellen.find((x) => x.id === toestelId);
  if (!t) return;

  // Sla het actieve toestel op in de globale app-staat
  setHuidigToestel(toestelId);

  //weergeven toestel
  const bcToestel = document.getElementById('bc-toestel');
  const bcToestelNaam = document.getElementById('bc-toestel-naam');
  const modalTitel = document.getElementById('modal-titel');
  const modalIcon = document.getElementById('modal-icon');
  const overlay = document.getElementById('modal-overlay');

  if (bcToestel) bcToestel.style.display = 'inline';
  if (bcToestelNaam) bcToestelNaam.textContent = t.label;
  if (modalTitel) modalTitel.textContent = t.label;

  // Icoon instellen: gebruik een PNG-afbeelding als die beschikbaar is,
  // val anders terug op een emoji.
  if (modalIcon) {
    if (t.icon) {
      modalIcon.innerHTML = `<img src="${ICON_BASE}${t.icon}" alt="${t.label}" style="width:28px;height:28px;object-fit:contain;" onerror="this.parentElement.textContent='${t.emoji}'">`;
    } else {
      modalIcon.textContent = t.emoji;
    }
  }

  // Formulier opbouwen, stap 1 tonen en modal zichtbaar maken
  bouwParameterFormulier(t);
  toonStap('parameters');
  if (overlay) overlay.classList.add('actief');
}


/**
 * BELANGRIJK
 * Bouwt het invoerformulier op voor een toestel in de modal (stap 1 van 3).
 *
 * Het formulier bestaat uit twee secties die de gebruiker kan wisselen:
 *   1. "Eigen invoer": de gebruiker vult zelf parameters in (uren, wattage, enz.).
 *   2. "Gemiddelde": toont het ADEME-gemiddelde (Franse dataset, n=500 huishoudens).
 *
 * Ondersteunde parameter-types per toestel (gedefinieerd in kamer_data.js):
 *   - 'label_select': dropdown met EU-energielabels (A t/m G) + gekleurde badges
 *   - 'select':       gewone dropdown met vaste opties
 *   - 'number':       numeriek invoerveld, optioneel met preset-knoppen (bijv. "Kort / Normaal / Lang")
 *   - 'preset':       wordt niet direct getekend, maar koppelt aan een number-veld
 *
 * @param {Object} t - Het toestel-object uit kamer_data.js (met id, label, parameters, enz.)
 */
export function bouwParameterFormulier(t) {
  const container = document.getElementById('params-container');
  if (!container) return;
  container.innerHTML = '';

  // Toggle-knoppen bovenaan: "Ik ken mijn toestel" vs. "Gebruik gemiddelde"
  const ademe = ADEME[t.ademeKey];
  const toggleDiv = document.createElement('div');
  toggleDiv.className = 'modus-toggle';
  toggleDiv.innerHTML = `
    <button class="modus-btn actief" id="btn-eigen" type="button">🔧 Ik ken mijn toestel</button>
    <button class="modus-btn" id="btn-gemiddelde" type="button">📊 Gebruik gemiddelde</button>
  `;
  container.appendChild(toggleDiv);
  //---------------------------------------------------------------------------------------------------------
  // Sectie 1: eigen invoer
  //---------------------------------------------------------------------------------------------------------

  const eigenDiv = document.createElement('div');
  eigenDiv.id = 'eigen-invoer';

  // Loop over alle parameters van het toestel en maak voor elk een invoerblok aan
  t.parameters.forEach((param) => {
    if (param.type === 'preset') return;

    const rij = document.createElement('div');
    rij.className = 'param-row';

    // Label + optionele tooltip-indicator (ⓘ)
    //HIERONDER WORDEN ALLE SOORTEN LABELS WEERGEGEVEN
    const lblWrap = document.createElement('div');
    lblWrap.style.cssText = 'display:flex;align-items:center;gap:6px;margin-bottom:5px;';
    const lbl = document.createElement('label');
    lbl.textContent = param.label;
    lbl.setAttribute('for', `p-${param.id}`);
    lbl.style.cssText = "font-weight:700;font-size:.83rem;color:var(--text);font-family:'Nunito',sans-serif;";
    lblWrap.appendChild(lbl);

    //WEERGEVEN TOOLTIP
    if (param.tooltip) {
      const tip = document.createElement('span');
      tip.className = 'param-tooltip';
      tip.title = param.tooltip;
      tip.textContent = 'ⓘ';
      lblWrap.appendChild(tip);
    }
    rij.appendChild(lblWrap);

    //WEERGEVEN ENERGIELABELS A - G
    if (param.type === 'label_select') {
      // Energielabel-dropdown: elke optie stelt een EU-label voor (A-30% t/m G).
      // De rand van de dropdown kleurt mee met het gekozen label.
      const sel = document.createElement('select');
      sel.id = `p-${param.id}`;
      sel.name = param.id;

      param.labelOpties.forEach((label) => {
        const o = document.createElement('option');
        o.value = label;
        o.textContent = label;
        sel.appendChild(o);
      });

      sel.value = 'Onbekend';
      sel.addEventListener('change', () => {
        const kleur = LABEL_KLEUREN[sel.value];
        sel.style.borderLeftColor = kleur || 'var(--border)';
        sel.style.borderLeftWidth = kleur ? '5px' : '1.5px';
      });
      sel.dispatchEvent(new Event('change'));
      rij.appendChild(sel);

      // Visuele kleurlegenda: klikbare gekleurde labels waarmee je snel kunt kiezen
      const legenda = document.createElement('div');
      legenda.className = 'label-legenda';
      Object.entries(LABEL_KLEUREN).slice(0, 7).forEach(([label, kleur]) => {
        const b = document.createElement('span');
        b.className = 'lbl-badge';
        b.style.background = kleur;
        b.textContent = label.replace('-30%', '−30%').replace('-20%', '−20%').replace('-10%', '−10%');
        b.title = label;
        b.addEventListener('click', () => {
          sel.value = label;
          sel.dispatchEvent(new Event('change'));
        });
        legenda.appendChild(b);
      });
      rij.appendChild(legenda);


      //WEERGEVEN GEWONE DROPDOWN
      // (bijv. "Type televisie", "Programma vaatwasser")
    } else if (param.type === 'select') {
      const sel = document.createElement('select');
      sel.id = `p-${param.id}`;
      sel.name = param.id;
      param.opties.forEach(([tekst, waarde]) => {
        const o = document.createElement('option');
        o.value = waarde;
        o.textContent = tekst;
        sel.appendChild(o);
      });
      if (param.defaultVal !== undefined) sel.selectedIndex = param.defaultVal;
      rij.appendChild(sel);

      //WEERGEVEN NUMERIEKE INVOER
      // Numeriek invoerveld, eventueel voorafgegaan door preset-knoppen
      // (bijv. "Kort – 5 min / Normaal – 10 min / Lang – 20 min" voor de haardroger).
      // De preset-knoppen vullen automatisch de waarde in het number-veld.
    } else if (param.type === 'number') {
      const presetParam = t.parameters.find((p) => p.type === 'preset' && p.targetParam === param.id);
      if (presetParam) {
        const presetDiv = document.createElement('div');
        presetDiv.className = 'preset-knoppen';

        presetParam.opties.forEach(([label, waarde]) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'preset-btn';
          btn.textContent = label;
          btn.addEventListener('click', () => {
            const input = document.getElementById(`p-${param.id}`);
            if (input) input.value = waarde;
            presetDiv.querySelectorAll('.preset-btn').forEach((b) => b.classList.remove('actief'));
            btn.classList.add('actief');
          });
          presetDiv.appendChild(btn);
        });

        rij.appendChild(presetDiv);
      }

      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;gap:8px;align-items:center;';

      const inp = document.createElement('input');
      inp.type = 'number';
      inp.id = `p-${param.id}`;
      inp.name = param.id;
      inp.min = param.min ?? 0;
      inp.max = param.max ?? 9999;
      inp.step = param.stap ?? 1;
      inp.value = param.defaultVal ?? 0;
      wrap.appendChild(inp);

      if (param.eenheid) {
        const u = document.createElement('span');
        u.textContent = param.eenheid;
        u.style.cssText = 'color:var(--muted);font-size:.8rem;white-space:nowrap;';
        wrap.appendChild(u);
      }
      rij.appendChild(wrap);

      // Speciale behandeling voor het elektrisch voertuig (gr_eauto):
      // de velden "km/week" en "laaduren" worden verborgen/getoond
      // naargelang de geselecteerde invoermodus (zie invoerModusSel hieronder).
      if (param.id === 'km_week') {
        rij.id = 'rij-km_week';
        rij.style.display = 'none';
      }
      if (param.id === 'uren' && t.id === 'gr_eauto') {
        rij.id = 'rij-uren-ev';
      }
    }

    eigenDiv.appendChild(rij);
  });

  // Speciale logica voor het elektrisch voertuig (gr_eauto):
  // de gebruiker kiest of hij invoert via "laaduren per dag" of "km per week".
  // Afhankelijk van de keuze wordt het overeenkomstige invoerveld getoond.
  const invoerModusSel = eigenDiv.querySelector('#p-invoer_modus');
  if (invoerModusSel) {
    invoerModusSel.addEventListener('change', () => {
      const modus = invoerModusSel.value;
      const rijUren = eigenDiv.querySelector('#rij-uren-ev');
      const rijKm = eigenDiv.querySelector('#rij-km_week');
      if (rijUren) rijUren.style.display = modus === 'uren' ? '' : 'none';
      if (rijKm) rijKm.style.display = modus === 'km' ? '' : 'none';
    });
    invoerModusSel.value = 'km';
    invoerModusSel.dispatchEvent(new Event('change'));
  }

  container.appendChild(eigenDiv);

  //---------------------------------------------------------------------------------------------------------
  // Sectie 2: ADEME-gemiddelde (verborgen totdat de gebruiker wisselt van modus)
  //---------------------------------------------------------------------------------------------------------
  const ademeDiv = document.createElement('div');
  ademeDiv.id = 'ademe-invoer';
  ademeDiv.style.display = 'none';
  ademeDiv.innerHTML = `
    <div class="ademe-uitleg">
      <div class="ademe-icon">📊</div>
      <div>
        <strong>Gemiddelde uit ADEME-database</strong><br>
        <span style="font-size:.82rem;color:var(--muted);">${ademe ? ademe.label : 'Franse dataset'}</span>
      </div>
    </div>
    <div class="ademe-getal-box">
      <div class="ademe-getal">${ademe ? ademe.kwh : '—'}</div>
      <div class="ademe-eenheid">kWh per dag</div>
    </div>
    <p class="ademe-nota">Dit is het gemiddelde van 500 Franse huishoudens. Jouw situatie kan afwijken.</p>
  `;
  container.appendChild(ademeDiv);

  // Koppel de toggle-knoppen aan setModus()
  document.getElementById('btn-eigen')?.addEventListener('click', () => setModus('eigen'));
  document.getElementById('btn-gemiddelde')?.addEventListener('click', () => setModus('gemiddelde'));
  setModus('eigen');
}


 
/**
 * NIET BELANGRIJK
 * Schakelt de formuliermodus in de modal om tussen eigen invoer en ADEME-gemiddelde.
 *
 * Toont of verbergt de juiste sectie en past de actieve knop aan.
 * Wisselt ook de actie-knop onderaan: "Bereken" (eigen) of "Gebruik dit gemiddelde" (ADEME).
 *
 * @param {'eigen' | 'gemiddelde'} modus - De gewenste weergavemodus.
 */
export function setModus(modus) {
  const eigen = document.getElementById('eigen-invoer');
  const ademe = document.getElementById('ademe-invoer');
  const btnEigen = document.getElementById('btn-eigen');
  const btnGem = document.getElementById('btn-gemiddelde');
  const btnBereken = document.getElementById('btn-bereken');
  const btnGebruikGem = document.getElementById('btn-gebruik-gem');

  if (eigen) eigen.style.display = modus === 'eigen' ? '' : 'none';
  if (ademe) ademe.style.display = modus === 'gemiddelde' ? '' : 'none';
  btnEigen?.classList.toggle('actief', modus === 'eigen');
  btnGem?.classList.toggle('actief', modus === 'gemiddelde');
  if (btnBereken) btnBereken.style.display = modus === 'eigen' ? '' : 'none';
  if (btnGebruikGem) btnGebruikGem.style.display = modus === 'gemiddelde' ? '' : 'none';
}


/**
 * BELANGRIJK
 * Leest de ingevulde waarden uit het formulier en berekent het dagelijks
 * energieverbruik op basis van de eigen invoer van de gebruiker.
 *
 * Verzamelt alle parameterwaarden uit de DOM (via de id's "p-<paramId>"),
 * roept de berekenVerbruik()-methode van het toestel aan (gedefinieerd in kamer_data.js)
 * en geeft het resultaat door aan toonResultaat().
 */
// export function berekenVerbruik() {
//   const kamer = KAMERS_DATA[getHuidigKamer()];
//   if (!kamer) return;
//   const t = kamer.toestellen.find((x) => x.id === getHuidigToestel());
//   if (!t) return;

//   // Bouw een params-object op: { paramId: invoerwaarde, ... }
//   const params = {};
//   t.parameters.forEach((p) => {
//     const el = document.getElementById(`p-${p.id}`);
//     if (el) params[p.id] = el.value;
//   });

//   const kwh = t.berekenVerbruik(params);
//   toonResultaat(kwh, false);
// }
export function berekenVerbruik() {
  console.log('kamer:', getHuidigKamer());
  console.log('toestel:', getHuidigToestel());

  const kamer = KAMERS_DATA[getHuidigKamer()];
  if (!kamer) {
    console.log('STOP: geen kamer');
    return;
  }

  const t = kamer.toestellen.find((x) => x.id === getHuidigToestel());
  if (!t) {
    console.log('STOP: geen toestel');
    return;
  }

  const params = {};
  t.parameters.forEach((p) => {
    const el = document.getElementById(`p-${p.id}`);
    if (el) params[p.id] = el.value;
  });

  console.log('params:', params);

  const kwh = t.berekenVerbruik(params);
  console.log('kwh:', kwh);

  toonResultaat(kwh, false);
}


/**
 * BELANGRIJK
 * Gebruikt het ADEME-gemiddelde als verbruikswaarde in plaats van eigen invoer.
 *
 * Zoekt het bijhorende gemiddelde op uit de ADEME-dataset op basis van de
 * ademeKey van het toestel en geeft het door aan toonResultaat().
 * Als er geen ADEME-waarde beschikbaar is, wordt 0 gebruikt.
 */
export function gebruikGemiddelde() {
  const kamer = KAMERS_DATA[getHuidigKamer()];
  if (!kamer) return;
  const t = kamer.toestellen.find((x) => x.id === getHuidigToestel());
  if (!t) return;

  const ademe = ADEME[t.ademeKey];
  const kwh = ademe ? ademe.kwh : 0;
  toonResultaat(kwh, true);
}



/**
 * ZEER BELANGRIJK
 * Toont het berekende verbruik op stap 2 van de modal (het resultaatscherm).
 *
 * Vult de volgende onderdelen in:
 *   - Het kWh-getal en de eenheid
 *   - De kostenpillen (€/dag, €/maand, €/jaar) op basis van het gekozen tarief (standaard €0,28/kWh)
 *   - Een bronlabel dat aangeeft of het resultaat eigen invoer of een gemiddelde is
 *   - Een vergelijkingsbalk "Jij vs. gemiddeld Frans huishouden"
 *   - Slaat het resultaat op in het globale berekeningen-object (zodat de kamer
 *     de kWh-badge op het toestel-icoon kan tonen)
 *
 * Na het invullen navigeert de functie automatisch naar stap 2.
 *
 * @param {number} kwh         - Het berekende dagelijkse verbruik in kWh.
 * @param {boolean} isGemiddelde - True als de waarde van ADEME komt, false bij eigen invoer.
 */
export function toonResultaat(kwh, isGemiddelde) {
  const kamer = KAMERS_DATA[getHuidigKamer()];
  if (!kamer) return;
  const t = kamer.toestellen.find((x) => x.id === getHuidigToestel());
  if (!t) return;

  // Sla het resultaat op zodat de kamer-scene het kWh-badge kan tonen
  berekeningen[t.id] = kwh;

  document.getElementById('res-getal').textContent = kwh;
  document.getElementById('res-eenheid').textContent = t.eenheid;
  document.getElementById('c-dag').textContent = `€${(kwh * getTarief()).toFixed(2)}`;
  document.getElementById('c-maand').textContent = `€${(kwh * getTarief() * 30).toFixed(2)}`;
  document.getElementById('c-jaar').textContent = `€${(kwh * getTarief() * 365).toFixed(0)}`;

  // Bronlabel: geeft transparantie over de herkomst van de waarde
  const bronLabel = document.getElementById('res-bron');
  if (bronLabel) {
    bronLabel.textContent = isGemiddelde
      ? '📊 Gebaseerd op ADEME-gemiddelde (500 huishoudens)'
      : '🔧 Berekend op basis van jouw invoer';
    bronLabel.style.color = isGemiddelde ? 'var(--muted)' : 'var(--g3)';
  }

  // Vergelijkingsbalk: toont visueel hoe de gebruiker scoort t.o.v. het ADEME-gemiddelde.
  // De breedtes van de balken worden procentueel berekend t.o.v. de hoogste waarde.
  const ademe = ADEME[t.ademeKey];
  const cmpBox = document.getElementById('cmp-box');
  if (cmpBox && ademe) {
    const ref = ademe.kwh;
    const pctJij = Math.min(100, (kwh / Math.max(kwh, ref)) * 100);
    const pctRef = Math.min(100, (ref / Math.max(kwh, ref)) * 100);
    const beter = kwh <= ref;

    cmpBox.innerHTML = `
      <div class="cmp-titel">Jij vs. gemiddeld Frans huishouden</div>
      <div class="cmp-rij">
        <span class="cmp-lbl">Jij</span>
        <div class="cmp-balk-wrap"><div class="cmp-balk jij" style="width:${pctJij}%"></div></div>
        <span class="cmp-val">${kwh} kWh/dag</span>
      </div>
      <div class="cmp-rij">
        <span class="cmp-lbl">Gemiddeld</span>
        <div class="cmp-balk-wrap"><div class="cmp-balk gem" style="width:${pctRef}%"></div></div>
        <span class="cmp-val">${ref} kWh/dag</span>
      </div>
      <div class="cmp-verdict ${beter ? 'goed' : 'slecht'}">
        ${beter ? '✅ Jij verbruikt minder dan gemiddeld!' : '⚠️ Jij verbruikt meer dan gemiddeld.'}
      </div>
    `;
    cmpBox.style.display = '';
  }

  // Vul ook alvast de tips-sectie (stap 3) in, zodat die klaar staat
  const gemBox = document.getElementById('gem-box');
  if (gemBox) gemBox.textContent = t.gemiddelde;

  const lijst = document.getElementById('tips-lijst');
  if (lijst) {
    lijst.innerHTML = '';
    t.tips.forEach((tip) => {
      const li = document.createElement('li');
      li.textContent = tip;
      lijst.appendChild(li);
    });
  }

  if (typeof updateStatsStrip === 'function') updateStatsStrip();

  toonStap('resultaat');
  // // handmatig schakelen (zoals jouw test)
  // document.getElementById('stap-parameters').style.display = 'none';
  // document.getElementById('stap-resultaat').style.display = 'block';
  // document.getElementById('stap-tips').style.display = 'none';
}



/**
 * NIET ZO BELANGRIJK
 * Navigeert naar een bepaalde stap in de modal en werkt de voortgangsindicatoren bij.
 *
 * De modal bestaat uit drie stappen:
 *   1. 'parameters' – invoerformulier
 *   2. 'resultaat'  – berekend verbruik + vergelijking
 *   3. 'tips'       – bespaartips en gemiddelde
 *
 * Per stap worden ook bijgewerkt:
 *   - De drie voortgangsdots bovenaan de modal (●○○ / ●●○ / ●●●)
 *   - De groene voortgangsbalk (33% / 66% / 100%)
 *   - De totaalverbruik-badge in de kamer-scene (enkel op stap 2 en 3)
 *
 * @param {'parameters' | 'resultaat' | 'tips'} stap - De naam van de te tonen stap.
 */
export function toonStap(stap) {
  const stappen = {
    parameters: document.getElementById('stap-parameters'),
    resultaat: document.getElementById('stap-resultaat'),
    tips: document.getElementById('stap-tips')
  };

  Object.values(stappen).forEach(el => {
    if (el) el.style.display = 'none';
  });

  if (stappen[stap]) {
    stappen[stap].style.display = 'block';
  }
}




/**
 * NIET ZO BELANGRIJK
 * Sluit de modal en verbergt de toestel-breadcrumb.
 *
 * Optioneel bouwt het de kamerpagina opnieuw op (refresh = true, de standaard),
 * zodat de bijgewerkte kWh-badges en energiekleur-indicators (groen/oranje/rood)
 * op de toestel-iconen meteen zichtbaar zijn nadat de gebruiker de modal sluit.
 *
 * @param {boolean} [refresh=true] - Als true, wordt de kamer opnieuw opgebouwd na sluiten.
 *   Zet op false als je de modal wilt sluiten zonder de kamer te hertekenen.
 */
export function sluitModal(refresh = true) {
  document.getElementById('modal-overlay')?.classList.remove('actief');
  setHuidigToestel(null);

  const bcToestel = document.getElementById('bc-toestel');
  if (bcToestel) bcToestel.style.display = 'none';

  if (refresh && getHuidigKamer() && typeof refreshRoom === 'function') {
    refreshRoom(getHuidigKamer());
  }
}

window.sluitModal = sluitModal;
window.openToestel = openToestel;
window.toonStap = toonStap; 
window.toonResultaat = toonResultaat;
window.setModus = setModus;
window.initModalHandlers= initModalHandlers;



