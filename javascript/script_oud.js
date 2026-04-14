/* =================================================
   ██████╗  █████╗ ████████╗ █████╗
   ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
   ██║  ██║███████║   ██║   ███████║
   ██║  ██║██╔══██║   ██║   ██╔══██║
   ██████╔╝██║  ██║   ██║   ██║  ██║
   ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝

   HOOFDSTRUCTUUR:
   KAMERS_DATA  →  kamers  →  toestellen  →  parameters & vaste waarden

   HOE DE BEREKENING WERKT:
   Voor elk toestel schrijf je een functie berekenVerbruikToestel(params)
   die een getal (kWh/dag) teruggeeft.
   De parameters zijn de ingevulde waarden van de gebruiker.

   HOE TOEVOEGEN / VERWIJDEREN:
   – Toestel toevoegen:  voeg een object toe aan de 'toestellen'-array van een kamer.
   – Toestel verwijderen: verwijder het object uit de array.
   – Parameter toevoegen: voeg een object toe aan de 'parameters'-array van een toestel.
   – Parameter verwijderen: verwijder het object.
   – Kamer toevoegen: voeg een nieuw object toe aan KAMERS_DATA EN maak een .kamer-box
                      in de HTML aan met hetzelfde data-kamer attribuut.
================================================= */

const KAMERS_DATA = {

  /* ══════════════════════════════════════════════
     KAMER: WOONKAMER
  ══════════════════════════════════════════════ */
  woonkamer: {
    label: "Woonkamer",
    intro: "Ontdek hoeveel energie jouw woonkamer-toestellen verbruiken.",

    toestellen: [

      /* ──────────────────────────────────────────
         TOESTEL 1 – TELEVISIE
         positie: top/left/width/height als % van kamer-beeld
      ────────────────────────────────────────── */
      {
        id: "woonkamer_tv",
        label: "Televisie",
        afbeelding: "../icons/png/023-television.png", // ← vervang door jouw bestandspad
        positie: { top:"30%", left:"5%", width:"20%", height:"35%" },

        parameters: [
          /* PARAMETER 1 */
          {
            id: "type",
            label: "Type televisie",
            type: "select",  // 'select' | 'number' | 'text'
            opties: [
              /* [ weergave-tekst,  watt-waarde ] */
              ["LCD / LED  (40–50 inch)",  80],
              ["OLED (50–60 inch)",        120],
              ["Plasma (oud)",             200],
            ]
            // ← voor 'number': voeg toe: min:0, max:24, stap:0.5, eenheid:"uur"
          },
          /* PARAMETER 2 */
          {
            id: "uren",
            label: "Uren per dag aan",
            type: "number",
            min: 0, max: 24, stap: 0.5, eenheid: "uur"
          },
          /* PARAMETER 3 – VOORBEELD STAND-BY */
          {
            id: "standby",
            label: "Stand-by 's nachts?",
            type: "select",
            opties: [
              ["Ja (+ 1W standby)",  1],
              ["Nee",                0],
            ]
          },
          /* PARAMETERS 4–8 – beschikbaar voor uitbreiding
             Verwijder de hieronder staan comments en vul in:
          */
          // {
          //   id: "parameter4",
          //   label: "Naam parameter 4",
          //   type: "number",
          //   min: 0, max: 100, stap: 1, eenheid: "eenheid"
          // },
          // {
          //   id: "parameter5",
          //   label: "Naam parameter 5",
          //   type: "select",
          //   opties: [["Optie A", 0], ["Optie B", 10]]
          // },
          // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
        ],

        /* BEREKENING – pas de formule aan */
        berekenVerbruik: function(params) {
          // params.type      = geselecteerde watt-waarde van type televisie
          // params.uren      = aantal uren per dag
          // params.standby   = standby-watt
          const watt    = parseFloat(params.type)   || 0;
          const uren    = parseFloat(params.uren)   || 0;
          const standby = parseFloat(params.standby)|| 0;
          const kwhPerDag = (watt * uren + standby * 24) / 1000;
          return Math.round(kwhPerDag * 100) / 100;
        },

        /* RESULTAAT EENHEID */
        eenheid: "kWh per dag",

        /* GEMIDDELDE / CONTEXT */
        // ← vul hier de tekst in die de gebruiker te zien krijgt boven de tips
        gemiddelde: "Een gemiddeld gezin gebruikt een televisie ~4 uur/dag, goed voor ±0,32 kWh/dag.",

        /* TIPS & WEETJES */
        // ← voeg hier je tips toe of verwijder items
        tips: [
          "Zet de tv volledig uit in plaats van op stand-by.",
          "Een energielabel A-scherm verbruikt tot 50% minder.",
          "Gebruik de slaaptimer zodat de tv 's nachts niet aan blijft.",
          "Verlaag de helderheid van het scherm met 20% voor merkbaar minder verbruik.",
        ],
      }, // ← EINDE TOESTEL televisie

      /* ──────────────────────────────────────────
         TOESTEL 2 – RADIO / STEREO-SET
      ────────────────────────────────────────── */
      {
        id: "woonkamer_radio",
        label: "Radio / Stereo",
        afbeelding: "img/toestellen/radio.png",
        positie: { top:"30%", left:"30%", width:"15%", height:"25%" },

        parameters: [
          {
            id: "type",
            label: "Type",
            type: "select",
            opties: [
              ["Kleine DAB+ radio",       5],
              ["Stereo-set / soundbar",  30],
              ["Hi-fi installatie",      80],
            ]
          },
          {
            id: "uren",
            label: "Uren per dag aan",
            type: "number",
            min: 0, max: 24, stap: 0.5, eenheid: "uur"
          },
          // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
        ],

        berekenVerbruik: function(params) {
          const watt = parseFloat(params.type) || 0;
          const uren = parseFloat(params.uren) || 0;
          return Math.round((watt * uren / 1000) * 100) / 100;
        },

        eenheid: "kWh per dag",
        gemiddelde: "Een gemiddeld huishouden heeft de radio ±3 uur/dag aan.",
        tips: [
          "Zet de stereo volledig uit wanneer je de kamer verlaat.",
          "Bluetooth-speakers verbruiken minder dan volledige stereo-installaties.",
          // ← voeg tips toe of verwijder
        ],
      }, // ← EINDE TOESTEL radio

      /* ──────────────────────────────────────────
         TOESTEL 3 – SLOT (vrij in te vullen)
      ────────────────────────────────────────── */
      {
        id: "woonkamer_slot3",
        label: "Toestel 3",                   // ← geef een naam
        afbeelding: "img/toestellen/slot3.png",
        positie: { top:"30%", left:"50%", width:"15%", height:"25%" },

        parameters: [
          { id:"parameter1", label:"Parameter 1", type:"select", opties:[["Type A", 0],["Type B", 10]] },
          { id:"parameter2", label:"Uren per dag", type:"number", min:0, max:24, stap:0.5, eenheid:"uur" },
          // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
        ],

        berekenVerbruik: function(params) {
          // ← schrijf hier je formule
          const watt = parseFloat(params.parameter1) || 0;
          const uren = parseFloat(params.parameter2) || 0;
          return Math.round((watt * uren / 1000) * 100) / 100;
        },

        eenheid: "kWh per dag",
        gemiddelde: "← schrijf hier een gemiddelde/context voor de gebruiker.",
        tips: [
          "← Tip 1",
          "← Tip 2",
        ],
      }, // ← EINDE TOESTEL slot 3

      /* ──────────────────────────────────────────
         TOESTEL 4 – SLOT
      ────────────────────────────────────────── */
      {
        id: "woonkamer_slot4",
        label: "Toestel 4",
        afbeelding: "img/toestellen/slot4.png",
        positie: { top:"65%", left:"5%", width:"15%", height:"25%" },
        parameters: [
          { id:"parameter1", label:"Parameter 1", type:"select", opties:[["Type A",0],["Type B",10]] },
          { id:"parameter2", label:"Uren per dag", type:"number", min:0, max:24, stap:0.5, eenheid:"uur" },
          // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
        ],
        berekenVerbruik: function(params) {
          const watt = parseFloat(params.parameter1)||0;
          const uren = parseFloat(params.parameter2)||0;
          return Math.round((watt*uren/1000)*100)/100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "← gemiddelde/context voor gebruiker.",
        tips: ["← Tip 1","← Tip 2"],
      },

      /* TOESTEL 5 – SLOT */
      {
        id: "woonkamer_slot5",
        label: "Toestel 5",
        afbeelding: "img/toestellen/slot5.png",
        positie: { top:"65%", left:"25%", width:"15%", height:"25%" },
        parameters: [
          { id:"parameter1", label:"Parameter 1", type:"select", opties:[["Type A",0],["Type B",10]] },
          { id:"parameter2", label:"Uren per dag", type:"number", min:0, max:24, stap:0.5, eenheid:"uur" },
          // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
        ],
        berekenVerbruik: function(params) {
          const watt = parseFloat(params.parameter1)||0;
          const uren = parseFloat(params.parameter2)||0;
          return Math.round((watt*uren/1000)*100)/100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "← gemiddelde/context voor gebruiker.",
        tips: ["← Tip 1","← Tip 2"],
      },

      /* TOESTEL 6 – SLOT */
      {
        id: "woonkamer_slot6",
        label: "Toestel 6",
        afbeelding: "img/toestellen/slot6.png",
        positie: { top:"65%", left:"45%", width:"15%", height:"25%" },
        parameters: [
          { id:"parameter1", label:"Parameter 1", type:"select", opties:[["Type A",0],["Type B",10]] },
          { id:"parameter2", label:"Uren per dag", type:"number", min:0, max:24, stap:0.5, eenheid:"uur" },
          // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
        ],
        berekenVerbruik: function(params) {
          const watt = parseFloat(params.parameter1)||0;
          const uren = parseFloat(params.parameter2)||0;
          return Math.round((watt*uren/1000)*100)/100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "← gemiddelde/context voor gebruiker.",
        tips: ["← Tip 1","← Tip 2"],
      },

      /* TOESTEL 7 – SLOT */
      {
        id: "woonkamer_slot7",
        label: "Toestel 7",
        afbeelding: "img/toestellen/slot7.png",
        positie: { top:"65%", left:"65%", width:"15%", height:"25%" },
        parameters: [
          { id:"parameter1", label:"Parameter 1", type:"select", opties:[["Type A",0],["Type B",10]] },
          { id:"parameter2", label:"Uren per dag", type:"number", min:0, max:24, stap:0.5, eenheid:"uur" },
          // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
        ],
        berekenVerbruik: function(params) {
          const watt = parseFloat(params.parameter1)||0;
          const uren = parseFloat(params.parameter2)||0;
          return Math.round((watt*uren/1000)*100)/100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "← gemiddelde/context voor gebruiker.",
        tips: ["← Tip 1","← Tip 2"],
      },

      /* TOESTEL 8 – SLOT */
      {
        id: "woonkamer_slot8",
        label: "Toestel 8",
        afbeelding: "img/toestellen/slot8.png",
        positie: { top:"65%", left:"82%", width:"14%", height:"25%" },
        parameters: [
          { id:"parameter1", label:"Parameter 1", type:"select", opties:[["Type A",0],["Type B",10]] },
          { id:"parameter2", label:"Uren per dag", type:"number", min:0, max:24, stap:0.5, eenheid:"uur" },
          // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
        ],
        berekenVerbruik: function(params) {
          const watt = parseFloat(params.parameter1)||0;
          const uren = parseFloat(params.parameter2)||0;
          return Math.round((watt*uren/1000)*100)/100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "← gemiddelde/context voor gebruiker.",
        tips: ["← Tip 1","← Tip 2"],
      },

    ], // ← EINDE toestellen woonkamer
  }, // ← EINDE KAMER woonkamer


  /* ══════════════════════════════════════════════
     KAMER: KEUKEN
  ══════════════════════════════════════════════ */
  keuken: {
    label: "Keuken",
    intro: "Ontdek hoeveel energie de toestellen in je keuken verbruiken.",

    toestellen: [

      /* TOESTEL 1 – KOELKAST */
      {
        id: "keuken_koelkast",
        label: "Koelkast",
        afbeelding: "../icons/png/015-refrigerator-1.png",
        positie: { top:"10%", left:"5%", width:"15%", height:"70%" },

        parameters: [
          {
            id: "type",
            label: "Type koelkast",
            type: "select",
            opties: [
              ["Compacte koelkast (A++)",  80],   // ← jaarlijks kWh / 365 = dagelijks Wh
              ["Vrijstaande koelkast (A)", 150],
              ["Koelkast + vriezer (A++)", 220],
              ["Amerikaans model",        400],
            ]
          },
          {
            id: "vulling",
            label: "Gemiddelde vulling",
            type: "select",
            opties: [
              ["Vol (meer compressor-werk, +10%)", 1.10],
              ["Half vol (normaal)",               1.00],
              ["Bijna leeg (-5%)",                 0.95],
            ]
          },
          // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
        ],

        berekenVerbruik: function(params) {
          // type = jaarlijks kWh × factor vulling ÷ 365 geeft kWh/dag
          const jaarKwh  = parseFloat(params.type)    || 0;
          const vulFact  = parseFloat(params.vulling)  || 1;
          return Math.round((jaarKwh * vulFact / 365) * 100) / 100;
        },

        eenheid: "kWh per dag",
        gemiddelde: "Een gemiddelde koelkast verbruikt ±150–250 kWh per jaar (~0,41–0,68 kWh/dag).",
        tips: [
          "Zet de koelkast op 4–5 °C en de vriezer op -18 °C voor optimale efficiëntie.",
          "Laat warme gerechten afkoelen vóór je ze in de koelkast zet.",
          "Controleer de deurrubbers regelmatig op lekken.",
        ],
      },

      /* TOESTEL 2 – VAATWASSER */
      {
        id: "keuken_vaatwasser",
        label: "Vaatwasser",
        afbeelding: "../icons/png/026-dishwasher-1.png",
        positie: { top:"10%", left:"25%", width:"15%", height:"70%" },
        parameters: [
          {
            id: "type",
            label: "Type programma",
            type: "select",
            opties: [
              ["Eco-programma (50°C)",      0.8],
              ["Normaal (65°C)",            1.2],
              ["Intensief (70°C)",          1.6],
            ]
          },
          {
            id: "beurten",
            label: "Aantal keer per dag",
            type: "number",
            min: 0, max: 5, stap: 0.5, eenheid: "keer"
          },
          // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
        ],
        berekenVerbruik: function(params) {
          const kwh    = parseFloat(params.type)    || 0; // kWh per beurt
          const aantal = parseFloat(params.beurten) || 0;
          return Math.round(kwh * aantal * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een vaatwasser op eco-stand verbruikt ±0,8 kWh per beurt. Dat is minder dan handwassen!",
        tips: [
          "Gebruik de eco-stand – die bespaart tot 40% energie.",
          "Laat de vaatwasser volladen voor je hem aanzet.",
          "Gebruik de droogfunctie uit en laat vaten luchten.",
        ],
      },

      /* TOESTEL 3 – MICROGOLFOVEN */
      {
        id: "keuken_microgolf",
        label: "Microgolfoven",
        afbeelding: "../icons/png/029-oven.png",
        positie: { top:"10%", left:"45%", width:"20%", height:"35%" },
        parameters: [
          {
            id: "vermogen",
            label: "Vermogen",
            type: "select",
            opties: [
              ["700 W",  700],
              ["900 W",  900],
              ["1100 W", 1100],
            ]
          },
          {
            id: "minuten",
            label: "Minuten per dag gebruikt",
            type: "number",
            min: 0, max: 120, stap: 1, eenheid: "min"
          },
          // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
        ],
        berekenVerbruik: function(params) {
          const watt = parseFloat(params.vermogen) || 0;
          const min  = parseFloat(params.minuten)  || 0;
          return Math.round((watt * min / 60 / 1000) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een microgolfoven van 900 W die 10 min/dag werkt, verbruikt ±0,15 kWh/dag.",
        tips: [
          "Verwarmen in de microgolf is 2–5× energiezuiniger dan in een oven.",
          "Gebruik de juiste vermogensstand voor het gerecht.",
        ],
      },

      /* TOESTEL 4 – SLOT */
      {
        id: "keuken_slot4", label:"Toestel 4", afbeelding:"../icons/png/007-mixer-blender-1.png",
        positie: { top:"50%", left:"45%", width:"20%", height:"35%" },
        parameters: [
          { id:"parameter1", label:"Parameter 1", type:"select", opties:[["Type A",0],["Type B",10]] },
          { id:"parameter2", label:"Uren per dag", type:"number", min:0, max:24, stap:0.5, eenheid:"uur" },
          // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
        ],
        berekenVerbruik: function(params) {
          return Math.round((parseFloat(params.parameter1)||0)*(parseFloat(params.parameter2)||0)/1000*100)/100;
        },
        eenheid:"kWh per dag", gemiddelde:"← gemiddelde voor gebruiker.", tips:["← Tip 1","← Tip 2"],
      },

      /* TOESTEL 5 – SLOT */
      // {
      //   id: "keuken_slot5", label:"Toestel 5", afbeelding:"img/toestellen/keuken_slot5.png",
      //   positie: { top:"10%", left:"70%", width:"15%", height:"35%" },
      //   parameters: [
      //     { id:"parameter1", label:"Parameter 1", type:"select", opties:[["Type A",0],["Type B",10]] },
      //     { id:"parameter2", label:"Uren per dag", type:"number", min:0, max:24, stap:0.5, eenheid:"uur" },
      //     // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //   ],
      //   berekenVerbruik: function(params) {
      //     return Math.round((parseFloat(params.parameter1)||0)*(parseFloat(params.parameter2)||0)/1000*100)/100;
      //   },
      //   eenheid:"kWh per dag", gemiddelde:"← gemiddelde voor gebruiker.", tips:["← Tip 1","← Tip 2"],
      // },

      /* TOESTEL 6 – SLOT */
      // {
      //   id: "keuken_slot6", label:"Toestel 6", afbeelding:"img/toestellen/keuken_slot6.png",
      //   positie: { top:"50%", left:"70%", width:"15%", height:"35%" },
      //   parameters: [
      //     { id:"parameter1", label:"Parameter 1", type:"select", opties:[["Type A",0],["Type B",10]] },
      //     { id:"parameter2", label:"Uren per dag", type:"number", min:0, max:24, stap:0.5, eenheid:"uur" },
      //     // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //   ],
      //   berekenVerbruik: function(params) {
      //     return Math.round((parseFloat(params.parameter1)||0)*(parseFloat(params.parameter2)||0)/1000*100)/100;
      //   },
      //   eenheid:"kWh per dag", gemiddelde:"← gemiddelde voor gebruiker.", tips:["← Tip 1","← Tip 2"],
      // },

      /* TOESTEL 7 – SLOT */
      // {
      //   id: "keuken_slot7", label:"Toestel 7", afbeelding:"img/toestellen/keuken_slot7.png",
      //   positie: { top:"10%", left:"88%", width:"10%", height:"35%" },
      //   parameters: [
      //     { id:"parameter1", label:"Parameter 1", type:"select", opties:[["Type A",0],["Type B",10]] },
      //     { id:"parameter2", label:"Uren per dag", type:"number", min:0, max:24, stap:0.5, eenheid:"uur" },
      //     // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //   ],
      //   berekenVerbruik: function(params) {
      //     return Math.round((parseFloat(params.parameter1)||0)*(parseFloat(params.parameter2)||0)/1000*100)/100;
      //   },
      //   eenheid:"kWh per dag", gemiddelde:"← gemiddelde voor gebruiker.", tips:["← Tip 1","← Tip 2"],
      // },

      /* TOESTEL 8 – SLOT */
      // {
      //   id: "keuken_slot8", label:"Toestel 8", afbeelding:"img/toestellen/keuken_slot8.png",
      //   positie: { top:"50%", left:"88%", width:"10%", height:"35%" },
      //   parameters: [
      //     { id:"parameter1", label:"Parameter 1", type:"select", opties:[["Type A",0],["Type B",10]] },
      //     { id:"parameter2", label:"Uren per dag", type:"number", min:0, max:24, stap:0.5, eenheid:"uur" },
      //     // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
      //     // { id:"parameter8", label:"Naam parameter 8", type:"nummer", min:0, max:100, stap:1, eenheid:"" },
      //   ],
      //   berekenVerbruik: function(params) {
      //     return Math.round((parseFloat(params.parameter1)||0)*(parseFloat(params.parameter2)||0)/1000*100)/100;
      //   },
      //   eenheid:"kWh per dag", gemiddelde:"← gemiddelde voor gebruiker.", tips:["← Tip 1","← Tip 2"],
      // },

    ], // ← EINDE toestellen keuken
  }, // ← EINDE KAMER keuken


  /* ══════════════════════════════════════════════
     KAMER: BADKAMER
     ─ vul toestellen in (8 slots voorzien) ─
  ══════════════════════════════════════════════ */
  badkamer: {
    label: "Badkamer",
    intro: "Ontdek hoeveel energie de badkamer-toestellen verbruiken.",
    toestellen: [
      {
        id:"badkamer_haardroger", label:"Haardroger", afbeelding:"img/toestellen/haardroger.png",
        positie:{ top:"20%", left:"5%", width:"16%", height:"35%" },
        parameters:[
          { id:"type", label:"Type haardroger", type:"select", opties:[["600 W – goedkoop",600],["1200 W – normaal",1200],["2000 W – professioneel",2000]] },
          { id:"minuten", label:"Minuten per dag", type:"number", min:0, max:60, stap:1, eenheid:"min" },
          // { id:"parameter3", label:"Naam parameter 3", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter4", label:"Naam parameter 4", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter5", label:"Naam parameter 5", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter6", label:"Naam parameter 6", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter7", label:"Naam parameter 7", type:"number", min:0, max:100, stap:1, eenheid:"" },
          // { id:"parameter8", label:"Naam parameter 8", type:"number", min:0, max:100, stap:1, eenheid:"" },
        ],
        berekenVerbruik:function(params){
          return Math.round(((parseFloat(params.type)||0)*(parseFloat(params.minuten)||0)/60/1000)*100)/100;
        },
        eenheid:"kWh per dag",
        gemiddelde:"Een haardroger van 1200 W gedurende 10 min/dag verbruikt ±0,2 kWh/dag.",
        tips:["Gebruik een lagere stand – werkt bijna even snel.","Gebruik een microvezel-handdoek om haar voor te drogen."],
      },
      /* SLOTS 2–8 – badkamer */
      { id:"badkamer_slot2",label:"Toestel 2",afbeelding:"img/toestellen/badkamer_slot2.png",positie:{top:"20%",left:"26%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"badkamer_slot3",label:"Toestel 3",afbeelding:"img/toestellen/badkamer_slot3.png",positie:{top:"20%",left:"47%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"badkamer_slot4",label:"Toestel 4",afbeelding:"img/toestellen/badkamer_slot4.png",positie:{top:"20%",left:"68%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"badkamer_slot5",label:"Toestel 5",afbeelding:"img/toestellen/badkamer_slot5.png",positie:{top:"60%",left:"5%", width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"badkamer_slot6",label:"Toestel 6",afbeelding:"img/toestellen/badkamer_slot6.png",positie:{top:"60%",left:"26%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"badkamer_slot7",label:"Toestel 7",afbeelding:"img/toestellen/badkamer_slot7.png",positie:{top:"60%",left:"47%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"badkamer_slot8",label:"Toestel 8",afbeelding:"img/toestellen/badkamer_slot8.png",positie:{top:"60%",left:"68%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
    ],
  }, // ← EINDE KAMER badkamer


  /* ══════════════════════════════════════════════
     KAMER: SLAAPKAMER
  ══════════════════════════════════════════════ */
  slaapkamer: {
    label: "Slaapkamer",
    intro: "Bekijk het energieverbruik van toestellen in de slaapkamer.",
    toestellen: [
      { id:"slaapkamer_slot1",label:"Toestel 1",afbeelding:"img/toestellen/slaapkamer_slot1.png",positie:{top:"20%",left:"5%", width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"slaapkamer_slot2",label:"Toestel 2",afbeelding:"img/toestellen/slaapkamer_slot2.png",positie:{top:"20%",left:"26%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"slaapkamer_slot3",label:"Toestel 3",afbeelding:"img/toestellen/slaapkamer_slot3.png",positie:{top:"20%",left:"47%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"slaapkamer_slot4",label:"Toestel 4",afbeelding:"img/toestellen/slaapkamer_slot4.png",positie:{top:"20%",left:"68%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"slaapkamer_slot5",label:"Toestel 5",afbeelding:"img/toestellen/slaapkamer_slot5.png",positie:{top:"60%",left:"5%", width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"slaapkamer_slot6",label:"Toestel 6",afbeelding:"img/toestellen/slaapkamer_slot6.png",positie:{top:"60%",left:"26%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"slaapkamer_slot7",label:"Toestel 7",afbeelding:"img/toestellen/slaapkamer_slot7.png",positie:{top:"60%",left:"47%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"slaapkamer_slot8",label:"Toestel 8",afbeelding:"img/toestellen/slaapkamer_slot8.png",positie:{top:"60%",left:"68%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
    ],
  }, // ← EINDE KAMER slaapkamer


  /* ══════════════════════════════════════════════
     KAMER: BERGING
  ══════════════════════════════════════════════ */
  berging: {
    label: "Berging",
    intro: "Bekijk het energieverbruik van toestellen in de berging.",
    toestellen: [
      { id:"berging_slot1",label:"Toestel 1",afbeelding:"../icons/png/016-washing-machine-3.png",positie:{top:"20%",left:"5%", width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"berging_slot2",label:"Toestel 2",afbeelding:"../icons/png/021-dryer.png",positie:{top:"20%",left:"26%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"berging_slot3",label:"Toestel 3",afbeelding:"../icons/png/014-vacuum-cleaner.png",positie:{top:"20%",left:"47%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      // { id:"berging_slot4",label:"Toestel 4",afbeelding:"img/toestellen/berging_slot4.png",positie:{top:"20%",left:"68%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      // { id:"berging_slot5",label:"Toestel 5",afbeelding:"img/toestellen/berging_slot5.png",positie:{top:"60%",left:"5%", width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      // { id:"berging_slot6",label:"Toestel 6",afbeelding:"img/toestellen/berging_slot6.png",positie:{top:"60%",left:"26%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      // { id:"berging_slot7",label:"Toestel 7",afbeelding:"img/toestellen/berging_slot7.png",positie:{top:"60%",left:"47%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      // { id:"berging_slot8",label:"Toestel 8",afbeelding:"img/toestellen/berging_slot8.png",positie:{top:"60%",left:"68%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
    ],
  }, // ← EINDE KAMER berging


  /* ══════════════════════════════════════════════
     KAMER: GARAGE
  ══════════════════════════════════════════════ */
  garage: {
    label: "Garage",
    intro: "Bekijk het energieverbruik van toestellen in de garage.",
    toestellen: [
      { id:"garage_slot1",label:"Toestel 1",afbeelding:"img/toestellen/garage_slot1.png",positie:{top:"20%",left:"5%", width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"garage_slot2",label:"Toestel 2",afbeelding:"img/toestellen/garage_slot2.png",positie:{top:"20%",left:"26%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"garage_slot3",label:"Toestel 3",afbeelding:"img/toestellen/garage_slot3.png",positie:{top:"20%",left:"47%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"garage_slot4",label:"Toestel 4",afbeelding:"img/toestellen/garage_slot4.png",positie:{top:"20%",left:"68%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"garage_slot5",label:"Toestel 5",afbeelding:"img/toestellen/garage_slot5.png",positie:{top:"60%",left:"5%", width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"garage_slot6",label:"Toestel 6",afbeelding:"img/toestellen/garage_slot6.png",positie:{top:"60%",left:"26%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"garage_slot7",label:"Toestel 7",afbeelding:"img/toestellen/garage_slot7.png",positie:{top:"60%",left:"47%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
      { id:"garage_slot8",label:"Toestel 8",afbeelding:"img/toestellen/garage_slot8.png",positie:{top:"60%",left:"68%",width:"16%",height:"35%"},parameters:[{id:"parameter1",label:"Parameter 1",type:"select",opties:[["Type A",0],["Type B",10]]},{id:"parameter2",label:"Uren per dag",type:"number",min:0,max:24,stap:0.5,eenheid:"uur"}],berekenVerbruik:function(p){return Math.round((parseFloat(p.parameter1)||0)*(parseFloat(p.parameter2)||0)/1000*100)/100;},eenheid:"kWh per dag",gemiddelde:"← gemiddelde.",tips:["← Tip 1"]},
    ],
  }, // ← EINDE KAMER garage

}; // ← EINDE KAMERS_DATA


/* =================================================
   APPLICATIE LOGICA
   (geen aanpassingen nodig hieronder)
================================================= */

document.querySelectorAll(".kamer-boxSVG").forEach(kamer => {
  kamer.addEventListener("click", () => {
    toonKamer(kamer.dataset.kamer);
  });
});

let huidigKamer   = null;
let huidigToestel = null;

/* ── Schermnavigatie ── */
function toonHuis() {
  document.getElementById('scherm-huis').style.display  = 'block';
  document.getElementById('scherm-kamer').style.display = 'none';
  sluitModal();
  document.getElementById('bc-kamer').style.display   = 'none';
  document.getElementById('bc-toestel').style.display = 'none';
  huidigKamer = null; huidigToestel = null;
}

function toonKamer(kamerId) {
  const kamer = KAMERS_DATA[kamerId];
  if (!kamer) return;
  huidigKamer = kamerId;

  // breadcrumb
  document.getElementById('bc-kamer').style.display    = 'inline';
  document.getElementById('bc-kamer-naam').textContent = kamer.label;
  document.getElementById('bc-toestel').style.display  = 'none';

  // titels
  document.getElementById('kamer-titel').textContent = kamer.label;
  document.getElementById('kamer-intro').textContent  = kamer.intro;

  // schermen wisselen
  document.getElementById('scherm-huis').style.display  = 'none';
  document.getElementById('scherm-kamer').style.display = 'block';

  // kamer-beeld class voor CSS achtergrond
  const beeld = document.getElementById('kamer-beeld');
  beeld.className = '';
  beeld.classList.add(kamerId);

  // verwijder bestaande toestel-boxen
  beeld.querySelectorAll('.toestel-box').forEach(el => el.remove());

  // toestel-boxen aanmaken
  kamer.toestellen.forEach(toestel => {
    const div = document.createElement('div');
    div.className = 'toestel-box';
    div.setAttribute('data-toestel', toestel.id);
    div.style.top    = toestel.positie.top;
    div.style.left   = toestel.positie.left;
    div.style.width  = toestel.positie.width;
    div.style.height = toestel.positie.height;

    // afbeelding (optioneel)
    const img = document.createElement('img');
    img.className = 'toestel-img';
    img.src = toestel.afbeelding;
    img.alt = toestel.label;
    img.onerror = () => img.style.display = 'none'; // verberg als foto ontbreekt
    div.appendChild(img);

    // label
    const lbl = document.createElement('span');
    lbl.className = 'toestel-label';
    lbl.textContent = toestel.label;
    div.appendChild(lbl);

    div.onclick = () => openToestel(toestel.id);
    beeld.appendChild(div);
  });
}

/* ── Toestel modaal openen ── */
function openToestel(toestelId) {
  const kamer   = KAMERS_DATA[huidigKamer];
  const toestel = kamer.toestellen.find(t => t.id === toestelId);
  if (!toestel) return;
  huidigToestel = toestelId;

  // breadcrumb
  document.getElementById('bc-toestel').style.display = 'inline';
  document.getElementById('bc-toestel-naam').textContent = toestel.label;

  document.getElementById('modal-titel').textContent = toestel.label;

  // parameters opbouwen
  const container = document.getElementById('parameters-container');
  container.innerHTML = '';
  toestel.parameters.forEach(param => {
    const rij = document.createElement('div');
    rij.className = 'parameter-rij';

    const lbl = document.createElement('label');
    lbl.textContent = param.label;
    lbl.setAttribute('for', 'param-' + param.id);
    rij.appendChild(lbl);

    let input;
    if (param.type === 'select') {
      input = document.createElement('select');
      param.opties.forEach(([tekst, waarde]) => {
        const opt = document.createElement('option');
        opt.value       = waarde;
        opt.textContent = tekst;
        input.appendChild(opt);
      });
    } else {
      input = document.createElement('input');
      input.type = param.type === 'number' ? 'number' : 'text';
      if (param.type === 'number') {
        input.min  = param.min  ?? 0;
        input.max  = param.max  ?? 9999;
        input.step = param.stap ?? 1;
        input.value = 0;
        if (param.eenheid) {
          const wrap = document.createElement('div');
          wrap.style.cssText = 'display:flex;gap:6px;align-items:center';
          wrap.appendChild(input);
          const unit = document.createElement('span');
          unit.textContent  = param.eenheid;
          unit.style.cssText = 'color:var(--grijs);font-size:.85rem;';
          wrap.appendChild(unit);
          input = null;
          rij.appendChild(wrap);
        }
      }
    }
    if (input) {
      input.id   = 'param-' + param.id;
      input.name = param.id;
      rij.appendChild(input);
    } else {
      // fix id op het inner input-element
      rij.querySelector('input').id   = 'param-' + param.id;
      rij.querySelector('input').name = param.id;
    }
    container.appendChild(rij);
  });

  toonStap('parameters');
  document.getElementById('modal-overlay').classList.add('actief');
}

/* ── Berekening ── */
function berekenVerbruik() {
  const kamer   = KAMERS_DATA[huidigKamer];
  const toestel = kamer.toestellen.find(t => t.id === huidigToestel);

  const params = {};
  toestel.parameters.forEach(param => {
    const el = document.getElementById('param-' + param.id) ||
               document.querySelector(`[name="${param.id}"]`);
    params[param.id] = el ? el.value : 0;
  });

  const resultaat = toestel.berekenVerbruik(params);

  document.getElementById('resultaat-getal').textContent  = resultaat;
  document.getElementById('resultaat-eenheid').textContent = toestel.eenheid;

  // tips vullen
  document.getElementById('gemiddelde-box').textContent = toestel.gemiddelde;
  const lijst = document.getElementById('tips-lijst');
  lijst.innerHTML = '';
  toestel.tips.forEach(tip => {
    const li = document.createElement('li');
    li.textContent = tip;
    lijst.appendChild(li);
  });

  toonStap('resultaat');
}

/* ── Stap-navigatie in modaal ── */
function toonStap(stap) {
  document.getElementById('stap-parameters').style.display = stap === 'parameters' ? '' : 'none';
  document.getElementById('stap-resultaat').style.display  = stap === 'resultaat'  ? '' : 'none';
  document.getElementById('stap-tips').style.display       = stap === 'tips'       ? '' : 'none';
}

/* ── Modaal sluiten ── */
function sluitModal() {
  document.getElementById('modal-overlay').classList.remove('actief');
  huidigToestel = null;
  document.getElementById('bc-toestel').style.display = 'none';
}

// Klik buiten modaal sluit het
document.getElementById('modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) sluitModal();
});