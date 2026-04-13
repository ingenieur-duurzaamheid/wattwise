/* ===================================================
   KAMER CONFIGURATIE – posities op het huis (% van wrapper)
   Huis afbeelding: 1536x1024 (3:2)
   Kamers gebaseerd op de doorkijk-illustratie:
   - Verdieping 1 (boven): links=slaapkamer, rechts=berging
   - Verdieping 0 (midden): links=woonkamer, rechts=keuken
   - Begane grond (onder): links=garage, rechts=badkamer
=================================================== */
const KAMER_POSITIES = {
  slaapkamer: { top:32.5, left:19,  width:26.6, height:13.4 },
  berging:    { top:32.4, left:52.2, width:22.8, height:13.5 },
  woonkamer:  { top:46.7, left:13.2,  width:26.8, height:13.3 },
  keuken:     { top:60.9, left:50.4, width:24.8, height:13.3 },
  garage:     { top:61, left:13.2,  width:33, height:19 },
  badkamer:   { top:46.7, left:50.4, width:24.8, height:13.3 },
};

// Zoom target per kamer: { x, y } = focal point as % of image
// The zoom-in will center on this point
const KAMER_ZOOM = {
  slaapkamer: { x:22,  y:41, scale:2.2 },
  berging:    { x:70,  y:41, scale:2.4 },
  woonkamer:  { x:22,  y:61, scale:2.4 },
  keuken:     { x:70,  y:61, scale:2.4 },
  garage:     { x:20,  y:79, scale:2.4 },
  badkamer:   { x:70,  y:79, scale:2.4 },
};

const KAMERS_DATA = {
  woonkamer: {
    label:"Woonkamer", emoji:"🛋️",
    intro:"Ontdek hoeveel energie jouw woonkamer-toestellen verbruiken.",
    toestellen:[
      { id:"wk_tv", label:"Televisie", emoji:"📺",
        pos:{left:"5%",bottom:"22%"},
        parameters:[
          {id:"type",label:"Type televisie",type:"select",opties:[["LCD/LED (40–50)",80],["OLED (50–60)",120],["Plasma (oud)",200]]},
          {id:"uren",label:"Uren per dag",type:"number",min:0,max:24,stap:.5,eenheid:"uur"},
          {id:"sb",label:"Stand-by 's nachts?",type:"select",opties:[["Ja (+1W)",1],["Nee",0]]},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.uren||0)+(+p.sb||0)*24)/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Een gemiddeld gezin kijkt ~4 uur/dag tv, goed voor ±0,32 kWh/dag.",
        tips:["Zet de tv volledig uit i.p.v. stand-by.","Energielabel A verbruikt tot 50% minder.","Gebruik de slaaptimer.","Verlaag helderheid 20% = merkbaar minder."],
      },
      { id:"wk_verlichting", label:"Verlichting", emoji:"💡",
        pos:{left:"35%",top:"8%"},
        parameters:[
          {id:"type",label:"Type lamp",type:"select",opties:[["LED (10W)",10],["Spaarlamp (15W)",15],["Halogeenlamp (50W)",50],["Gloeilamp (60W)",60]]},
          {id:"n",label:"Aantal lampen",type:"number",min:1,max:20,stap:1,eenheid:"stuks"},
          {id:"uren",label:"Uren per dag",type:"number",min:0,max:24,stap:.5,eenheid:"uur"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.n||1)*(+p.uren||0))/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Verlichting is goed voor ±15% van het totale thuisverbruik.",
        tips:["Vervang gloeilampen door LED — 80% besparing!","Gebruik bewegingssensoren.","Daglicht is gratis!"],
      },
      { id:"wk_laptop", label:"Laptop / PC", emoji:"💻",
        pos:{left:"60%",bottom:"22%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["Laptop (45W)",45],["Desktop (150W)",150],["Gaming PC (300W)",300]]},
          {id:"uren",label:"Uren per dag",type:"number",min:0,max:24,stap:.5,eenheid:"uur"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.uren||0))/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Een laptop verbruikt 4× minder dan een desktop PC.",
        tips:["Gebruik energiespaarstand.","Shutdown 's nachts volledig.","Laptop > desktop qua verbruik."],
      },
      { id:"wk_radio", label:"Stereo", emoji:"🎵",
        pos:{left:"80%",bottom:"25%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["DAB+ radio (5W)",5],["Soundbar (30W)",30],["Hi-fi (80W)",80]]},
          {id:"uren",label:"Uren per dag",type:"number",min:0,max:24,stap:.5,eenheid:"uur"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.uren||0))/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Een radio ±3 uur/dag = ±0,015–0,24 kWh/dag.",
        tips:["Volledig uitschakelen bij weggaan.","Bluetooth-speaker < stereo-installatie."],
      },
    ],
  },
  keuken: {
    label:"Keuken", emoji:"🍳",
    intro:"Ontdek hoeveel energie de toestellen in je keuken verbruiken.",
    toestellen:[
      { id:"kk_koelkast", label:"Koelkast", emoji:"🧊",
        pos:{left:"5%",bottom:"22%"},
        parameters:[
          {id:"type",label:"Type koelkast",type:"select",opties:[["Compact (A++, 80kWh/j)",80],["Vrijstaand (A, 150kWh/j)",150],["+ vriezer (A++, 220kWh/j)",220],["Amerikaans (400kWh/j)",400]]},
          {id:"vul",label:"Vulling",type:"select",opties:[["Vol (+10%)",1.10],["Half vol",1.00],["Bijna leeg (-5%)",0.95]]},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.vul||1))/365)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Een koelkast loopt 24/7: ±0,22–1,1 kWh/dag afhankelijk van type.",
        tips:["Stel in op 4–5°C.","Laat warme gerechten eerst afkoelen.","Controleer deurrubbers."],
      },
      { id:"kk_vaatwasser", label:"Vaatwasser", emoji:"🍽️",
        pos:{left:"30%",bottom:"22%"},
        parameters:[
          {id:"type",label:"Programma",type:"select",opties:[["Eco 50°C (0.8kWh)",0.8],["Normaal 65°C (1.2kWh)",1.2],["Intensief 70°C (1.6kWh)",1.6]]},
          {id:"keer",label:"Keer per dag",type:"number",min:0,max:5,stap:.5,eenheid:"keer"},
        ],
        berekenVerbruik(p){return Math.round((+p.type*(+p.keer||0))*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Eco-stand: 0,8 kWh/beurt — minder dan handwassen!",
        tips:["Eco-stand = tot 40% besparing.","Volladen voor aanzetten.","Droogfunctie uit."],
      },
      { id:"kk_microgolf", label:"Microgolf", emoji:"📡",
        pos:{left:"58%",top:"8%"},
        parameters:[
          {id:"v",label:"Vermogen",type:"select",opties:[["700W",700],["900W",900],["1100W",1100]]},
          {id:"min",label:"Minuten/dag",type:"number",min:0,max:120,stap:1,eenheid:"min"},
        ],
        berekenVerbruik(p){return Math.round(((+p.v*(+p.min||0))/60/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"900W × 10 min/dag = ±0,15 kWh/dag.",
        tips:["2–5× zuiniger dan oven.","Juiste vermogensstand gebruiken."],
      },
      { id:"kk_oven", label:"Oven", emoji:"🫕",
        pos:{left:"80%",bottom:"22%"},
        parameters:[
          {id:"type",label:"Type oven",type:"select",opties:[["Gewone oven (2200W)",2200],["Hetelucht (1800W)",1800],["Compact (1200W)",1200]]},
          {id:"min",label:"Minuten/dag",type:"number",min:0,max:180,stap:5,eenheid:"min"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.min||0))/60/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Oven ±1,5 kWh per uur gebruik.",
        tips:["Hetelucht = 20% zuiniger.","Niet te lang voorverwarmen.","Gebruik restwarmte."],
      },
    ],
  },
  badkamer: {
    label:"Badkamer", emoji:"🚿",
    intro:"Ontdek hoeveel energie de badkamer-toestellen verbruiken.",
    toestellen:[
      { id:"bk_droger", label:"Haardroger", emoji:"💨",
        pos:{left:"10%",bottom:"22%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["600W – goedkoop",600],["1200W – normaal",1200],["2000W – pro",2000]]},
          {id:"min",label:"Minuten/dag",type:"number",min:0,max:60,stap:1,eenheid:"min"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.min||0))/60/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"1200W × 10 min/dag = ±0,2 kWh/dag.",
        tips:["Lagere stand = bijna even snel.","Microvezel-handdoek voor het drogen."],
      },
      { id:"bk_boiler", label:"Boiler", emoji:"🌡️",
        pos:{left:"42%",bottom:"22%"},
        parameters:[
          {id:"inhoud",label:"Inhoud",type:"select",opties:[["80 liter",80],["120 liter",120],["200 liter",200]]},
          {id:"personen",label:"Aantal personen",type:"number",min:1,max:8,stap:1,eenheid:"pers."},
        ],
        berekenVerbruik(p){
          const l=Math.min(+p.inhoud,+p.personen*50);
          return Math.round(l*0.052*100)/100;
        },
        eenheid:"kWh per dag",
        gemiddelde:"Elektrische boiler 120L = ±3–5 kWh/dag voor gemiddeld gezin.",
        tips:["Instellen op 55–60°C.","Leidingen isoleren.","Warmtepompboiler: 3× zuiniger."],
      },
      { id:"bk_scheer", label:"Scheerapparaat", emoji:"🪒",
        pos:{left:"72%",top:"10%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["Eenvoudig (5W)",5],["Geavanceerd (15W)",15]]},
          {id:"min",label:"Minuten/dag",type:"number",min:0,max:30,stap:1,eenheid:"min"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.min||0))/60/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Scheerapparaat verbruikt slechts ±0,002 kWh/gebruik.",
        tips:["Laad op wanneer nodig.","Volledig opladen en loskoppelen."],
      },
    ],
  },
  slaapkamer: {
    label:"Slaapkamer", emoji:"🛏️",
    intro:"Bekijk het energieverbruik van toestellen in de slaapkamer.",
    toestellen:[
      { id:"sk_lamp", label:"Verlichting", emoji:"🕯️",
        pos:{left:"10%",top:"8%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["LED (8W)",8],["Nachtlampje (2W)",2],["Halogeenlamp (28W)",28]]},
          {id:"uren",label:"Uren/dag",type:"number",min:0,max:24,stap:.5,eenheid:"uur"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.uren||0))/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"LED nachtlampje: <0,05 kWh/nacht.",
        tips:["LED in de slaapkamer.","Timer of sensor is handig."],
      },
      { id:"sk_gsm", label:"Telefoon laden", emoji:"📱",
        pos:{left:"42%",bottom:"25%"},
        parameters:[
          {id:"type",label:"Oplader",type:"select",opties:[["Normaal (5W)",5],["Snellader (20W)",20],["Draadloos (15W)",15]]},
          {id:"uren",label:"Uren/dag",type:"number",min:0,max:12,stap:.5,eenheid:"uur"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.uren||0))/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Smartphone laden: ±0,01–0,04 kWh/dag — relatief weinig.",
        tips:["Laad overdag op.","Kabelopladen > draadloos."],
      },
      { id:"sk_deken", label:"El. deken", emoji:"🛌",
        pos:{left:"68%",bottom:"22%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["Enkeldeken (60W)",60],["Tweepersoons (100W)",100]]},
          {id:"uren",label:"Uren/nacht",type:"number",min:0,max:12,stap:.5,eenheid:"uur"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.uren||0))/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"8 uur elektrische deken = ±0,48 kWh/nacht.",
        tips:["Voorverwarmstand + lagere stand.","Warmwaterkruik verbruikt minder!"],
      },
    ],
  },
  berging: {
    label:"Berging", emoji:"📦",
    intro:"Bekijk het energieverbruik van toestellen in de berging.",
    toestellen:[
      { id:"bg_wm", label:"Wasmachine", emoji:"👕",
        pos:{left:"5%",bottom:"22%"},
        parameters:[
          {id:"label",label:"Energielabel",type:"select",opties:[["A-30% (0,36kWh/was)",0.36],["A (0,45kWh/was)",0.45],["B (0,51kWh/was)",0.51],["C (0,59kWh/was)",0.59],["D (0,69kWh/was)",0.69]]},
          {id:"cycli",label:"Wassen/week",type:"number",min:0,max:14,stap:1,eenheid:"keer"},
        ],
        berekenVerbruik(p){return Math.round(((+p.label*(+p.cycli||0))/7)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Gemiddeld 4–5 wassen/week. Ecostand spaart tot 30%.",
        tips:["Ecostand (40–60°C).","Volle trommel wassen.","30°C is voldoende voor normaal wasgoed."],
      },
      { id:"bg_droogkast", label:"Droogkast", emoji:"🌀",
        pos:{left:"38%",bottom:"22%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["Condensdroogkast A (2kWh)",2.0],["Warmtepomp A+++ (1kWh)",1.0],["Oude droogkast (3.5kWh)",3.5]]},
          {id:"keer",label:"Beurten/week",type:"number",min:0,max:14,stap:1,eenheid:"keer"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.keer||0))/7)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Warmtepompdroogkast: 50% minder dan gewone droogkast.",
        tips:["Luchten is energievrij.","Bij vervanging: warmtepompdroogkast.","Goed centrifugeren vóór drogen."],
      },
      { id:"bg_stofzuiger", label:"Stofzuiger", emoji:"🔌",
        pos:{left:"70%",bottom:"25%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["Stofzuiger (900W)",900],["Robotstofzuiger (30W)",30],["Snoerloos (60W)",60]]},
          {id:"min",label:"Minuten/dag",type:"number",min:0,max:120,stap:5,eenheid:"min"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.min||0))/60/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Robotstofzuiger: 30× minder dan klassiek.",
        tips:["Robot is zuiniger voor dagelijks gebruik.","Filter regelmatig vervangen."],
      },
    ],
  },
  garage: {
    label:"Garage", emoji:"🚗",
    intro:"Bekijk het energieverbruik van toestellen in de garage.",
    toestellen:[
      { id:"gr_eauto", label:"El. auto", emoji:"⚡",
        pos:{left:"5%",bottom:"22%"},
        parameters:[
          {id:"type",label:"Lader",type:"select",opties:[["Stopcontact (2.3kW)",2.3],["Wallbox (11kW)",11],["Snellader (22kW)",22]]},
          {id:"uren",label:"Uren/dag laden",type:"number",min:0,max:24,stap:.5,eenheid:"uur"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.uren||0)))*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"1 uur wallbox = ±11 kWh = ±70 km rijbereik.",
        tips:["Laad 's nachts bij daltarief.","Laad tot 80% voor dagelijks gebruik.","Zonnepanelen = goedkoper laden."],
      },
      { id:"gr_diepvriezer", label:"Diepvriezer", emoji:"🧊",
        pos:{left:"40%",bottom:"22%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["Klein 100L A++ (100kWh/j)",100],["Middelgroot 200L A+ (180kWh/j)",180],["Groot 300L A (280kWh/j)",280]]},
        ],
        berekenVerbruik(p){return Math.round(((+p.type)/365)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Diepvriezer 200L (A+): ±0,49 kWh/dag.",
        tips:["Ontdooi regelmatig (max 5mm ijs).","Volle vriezer = efficiënter.","Niet naast warmtebron plaatsen."],
      },
      { id:"gr_verlichting", label:"Verlichting", emoji:"💡",
        pos:{left:"73%",top:"8%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["LED TL (20W)",20],["Gewone TL (36W)",36],["Gloeilamp (60W)",60]]},
          {id:"n",label:"Aantal",type:"number",min:1,max:10,stap:1,eenheid:"stuks"},
          {id:"uren",label:"Uren/dag",type:"number",min:0,max:24,stap:.5,eenheid:"uur"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.n||1)*(+p.uren||0))/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"LED TL verbruikt ±45% minder dan gewone TL-lamp.",
        tips:["Vervang TL door LED TL.","Sensor of timer in de garage."],
      },
    ],
  },
};

/* ======================================================
   UI LOGICA
====================================================== */
let huidigKamer = null, huidigToestel = null;
const TARIEF = 0.28;
const berekeningen = {}; // cache berekende kWh per toestel-id

/* -- Overlay kamers op het huis aanmaken -- */
const houseWrap = document.getElementById("house-wrap");
Object.entries(KAMER_POSITIES).forEach(([id, pos]) => {
  const kamer = KAMERS_DATA[id];
  const el = document.createElement("div");
  el.className = "kamer-overlay";
  el.setAttribute("data-kamer", id);
  el.style.cssText = `top:${pos.top}%;left:${pos.left}%;width:${pos.width}%;height:${pos.height}%;`;
  el.innerHTML = `
    <div class="kamer-pulse">${kamer.emoji}</div>
    <div class="kamer-tag">${kamer.label}</div>
  `;
  el.onclick = () => animatieNaarKamer(id);
  houseWrap.appendChild(el);
});

function animatieNaarKamer(kamerId) {
  const zoom = KAMER_ZOOM[kamerId];
  const img = document.getElementById("house-img");
  const wrap = document.getElementById("house-wrap");

  // Zoom animatie
  wrap.classList.add("zooming");
  const ox = zoom.x, oy = zoom.y;
  img.style.transition = "transform .55s cubic-bezier(.4,0,.2,1), filter .3s";
  img.style.transformOrigin = `${ox}% ${oy}%`;
  img.style.transform = `scale(${zoom.scale})`;
  img.style.filter = "brightness(1.05)";

  // Hide overlays
  document.querySelectorAll(".kamer-overlay").forEach(o => {
    o.style.transition = "opacity .25s";
    o.style.opacity = "0";
    o.style.pointerEvents = "none";
  });
  

  setTimeout(() => toonKamer(kamerId), 480);
}

function toonHuis() {
  document.getElementById("scherm-kamer").style.display = "none";
  document.getElementById("scherm-huis").style.display = "block";
  sluitModal();

  document.getElementById("bc-kamer").style.display = "none";
  document.getElementById("bc-toestel").style.display = "none";
  huidigKamer = null; huidigToestel = null;

  // Reset zoom
  const img = document.getElementById("house-img");
  img.style.transition = "transform .5s cubic-bezier(.4,0,.2,1), filter .3s";
  img.style.transform = "scale(1)";
  img.style.filter = "";
  document.getElementById("house-wrap").classList.remove("zooming");

  // Restore overlays
  setTimeout(() => {
    document.querySelectorAll(".kamer-overlay").forEach(o => {
      o.style.transition = "opacity .3s";
      o.style.opacity = "1";
      o.style.pointerEvents = "";
    });
  }, 300);
}

function toonKamer(kamerId) {
  const kamer = KAMERS_DATA[kamerId];
  if (!kamer) return;
  huidigKamer = kamerId;

  document.getElementById("bc-kamer").style.display = "inline";
  document.getElementById("bc-kamer-naam").textContent = kamer.emoji + " " + kamer.label;
  document.getElementById("bc-toestel").style.display = "none";

  document.getElementById("kamer-titel").textContent = kamer.emoji + " " + kamer.label;
  document.getElementById("kamer-intro").textContent = kamer.intro;

  document.getElementById("scherm-huis").style.display = "none";
  document.getElementById("scherm-kamer").style.display = "block";

  // Kamer achtergrond
  const scene = document.getElementById("kamer-scene");
  scene.className = "kamer-scene " + kamerId;
  document.getElementById("kamer-scene-bg").className = "kamer-scene-bg " + kamerId;
  document.getElementById("kamer-floor").className = "kamer-floor " + kamerId;
  document.getElementById("room-label-badge").innerHTML = kamer.emoji + " " + kamer.label;

  // Verwijder oude appliances
  scene.querySelectorAll(".appliance-spot").forEach(e => e.remove());

  // Appliances plaatsen
  kamer.toestellen.forEach((t, i) => {
    const spot = document.createElement("div");
    spot.className = "appliance-spot";
    spot.style.cssText = Object.entries(t.pos).map(([k,v])=>`${k}:${v}`).join(";");
    spot.style.animationDelay = (i * 0.07) + "s";

    const kwh = berekeningen[t.id];
    const badge = kwh !== undefined
      ? `<div class="appliance-kwh-badge">${kwh} kWh/dag</div>`
      : `<div class="appliance-kwh-badge uncalc">klik om te meten</div>`;

    spot.innerHTML = `
      <div class="appliance-bubble">
        <div class="appliance-emoji">${t.emoji}</div>
        <div class="appliance-name">${t.label}</div>
      </div>
      ${badge}
    `;
    spot.style.animation = `fadeSlideUp .35s ease ${i*0.07}s both`;
    spot.onclick = () => openToestel(t.id);
    scene.appendChild(spot);
  });
}

function openToestel(toestelId) {
  const kamer = KAMERS_DATA[huidigKamer];
  const t = kamer.toestellen.find(x => x.id === toestelId);
  if (!t) return;
  huidigToestel = toestelId;

  document.getElementById("bc-toestel").style.display = "inline";
  document.getElementById("bc-toestel-naam").textContent = t.label;
  document.getElementById("modal-titel").textContent = t.label;
  document.getElementById("modal-icon").textContent = t.emoji;

  const container = document.getElementById("params-container");
  container.innerHTML = "";
  t.parameters.forEach(param => {
    const rij = document.createElement("div");
    rij.className = "param-row";
    const lbl = document.createElement("label");
    lbl.textContent = param.label;
    lbl.setAttribute("for", "p-" + param.id);
    rij.appendChild(lbl);

    let input;
    if (param.type === "select") {
      input = document.createElement("select");
      input.id = "p-" + param.id; input.name = param.id;
      param.opties.forEach(([tekst, waarde]) => {
        const o = document.createElement("option");
        o.value = waarde; o.textContent = tekst;
        input.appendChild(o);
      });
      rij.appendChild(input);
    } else {
      const wrap = document.createElement("div");
      wrap.style.cssText = "display:flex;gap:8px;align-items:center";
      input = document.createElement("input");
      input.type = "number";
      input.id = "p-" + param.id; input.name = param.id;
      input.min = param.min ?? 0; input.max = param.max ?? 9999;
      input.step = param.stap ?? 1; input.value = 0;
      wrap.appendChild(input);
      if (param.eenheid) {
        const u = document.createElement("span");
        u.textContent = param.eenheid;
        u.style.cssText = "color:var(--muted);font-size:.8rem;white-space:nowrap";
        wrap.appendChild(u);
      }
      rij.appendChild(wrap);
    }
    container.appendChild(rij);
  });

  toonStap("parameters");
  document.getElementById("modal-overlay").classList.add("actief");
}

function berekenVerbruik() {
  const kamer = KAMERS_DATA[huidigKamer];
  const t = kamer.toestellen.find(x => x.id === huidigToestel);
  const params = {};
  t.parameters.forEach(p => {
    const el = document.getElementById("p-" + p.id) || document.querySelector(`[name="${p.id}"]`);
    params[p.id] = el ? el.value : 0;
  });
  const kwh = t.berekenVerbruik(params);
  berekeningen[t.id] = kwh;

  document.getElementById("res-getal").textContent = kwh;
  document.getElementById("res-eenheid").textContent = t.eenheid;
  document.getElementById("c-dag").textContent  = "€" + (kwh * TARIEF).toFixed(2);
  document.getElementById("c-maand").textContent = "€" + (kwh * TARIEF * 30).toFixed(2);
  document.getElementById("c-jaar").textContent  = "€" + (kwh * TARIEF * 365).toFixed(0);

  document.getElementById("gem-box").textContent = t.gemiddelde;
  const lijst = document.getElementById("tips-lijst");
  lijst.innerHTML = "";
  t.tips.forEach(tip => {
    const li = document.createElement("li");
    li.textContent = tip;
    lijst.appendChild(li);
  });

  toonStap("resultaat");
}

function toonStap(stap) {
  document.getElementById("stap-parameters").style.display = stap === "parameters" ? "" : "none";
  document.getElementById("stap-resultaat").style.display  = stap === "resultaat"  ? "" : "none";
  document.getElementById("stap-tips").style.display       = stap === "tips"       ? "" : "none";
  const n = stap === "parameters" ? 0 : stap === "resultaat" ? 1 : 2;
  ["d1","d2","d3"].forEach((id,i) => document.getElementById(id).classList.toggle("on", i === n));
  document.getElementById("mpbar").style.width = ((n+1)/3*100) + "%";
}

function sluitModal() {
  document.getElementById("modal-overlay").classList.remove("actief");
  huidigToestel = null;
  document.getElementById("bc-toestel").style.display = "none";
  // Update kwh badges
  if (huidigKamer) toonKamer(huidigKamer);
}

document.getElementById("modal-overlay").addEventListener("click", function(e) {
  if (e.target === this) sluitModal();
});


document.querySelector('.house-wrap').addEventListener('click', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();

  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  console.log(`left: ${x.toFixed(1)}%, top: ${y.toFixed(1)}%`);
});