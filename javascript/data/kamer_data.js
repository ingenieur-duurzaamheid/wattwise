import { ICONS } from '../config/icons.js';

export const KAMERS_DATA = {
  woonkamer: {
    label: "Woonkamer",
    emoji: "🛋️",
    intro: "Ontdek hoeveel energie jouw woonkamer-toestellen verbruiken.",
    toestellen: [
      {
        id: "wk_tv",
        label: "Televisie",
        emoji: "📺",
        icon: ICONS.tv,
        ademeKey: "tv",
        pos: { left: "8%", bottom: "28%" },
        parameters: [
          {
            id: "label_tv",
            label: "Energielabel (optioneel)",
            type: "label_select",
            labelOpties: ["A", "B", "C", "D", "E", "F", "G", "Onbekend"],
            tooltip: "Staat vaak achteraan op het toestel of in de handleiding. Het oude A++-label is niet meer geldig sinds 2021. Deze zijn lineair verschoven: A++ wordt A, A+ wordt B, A wordt C, enz. Kies Onbekend als je het label niet kent of als het een ouder toestel is zonder label."
          },
          {
            id: "type",
            label: "Type televisie (niet relevant als label bekend is)",
            type: "select",
            opties: [
              ['LCD/LED (40 inch)', 40],
              ['OLED (40 inch)', 100],
              ['Plasma (40 inch)', 250]
            ],
            defaultVal: 0
          },
          {
            id: "uren",
            label: "Uren per dag",
            type: "number",
            min: 0,
            max: 24,
            stap: 0.5,
            eenheid: "uur",
            defaultVal: 4
          },
          {
            id: "sb",
            label: "Stand-by aan?",
            type: "select",
            opties: [["Ja (+0,5W)", 0.5], ["Nee", 0]],
            defaultVal: 1,
            tooltip: "Zet je jouw TV volledig uit of op stand-by?"
          },
        ],
        berekenVerbruik(p) {
          if (p.label_tv && p.label_tv !== "Onbekend") {
            const labelWatt = { A: 30, B: 40, C: 50, D: 70, E: 100, F: 130, G: 165 };
            const w = labelWatt[p.label_tv] || +p.type;
            return Math.round(((w * (+p.uren || 0) + (+p.sb || 0) * (24 - (+p.uren || 0))) / 1000) * 100) / 100; // * 100 en / 100 om af te ronden op 2 decimalen
          }
          return Math.round((((+p.type) * (+p.uren || 0) + (+p.sb || 0) * (24 - (+p.uren || 0)) ) / 1000) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een gemiddeld gezin kijkt ongeveer 4 uur per dag tv.", // "weetjes"
        tips: [
          "Zet de tv volledig uit in plaats van stand-by.",
          "Een kleinere tv verbruikt minder dan een grote.",
          "Gebruik de slaaptimer.",
          "Verlaag de helderheid voor een lager verbruik."
        ],
      },
      {
        id: "wk_verlichting",
        label: "Verlichting",
        emoji: "💡",
        icon: ICONS.lamp,
        ademeKey: "verlichting",
        pos: { left: "38%", top: "10%" },
        parameters: [
          {
            id: "type",
            label: "Type lamp",
            type: "select",
            opties: [
              ["LED (10W)", 10],
              ["Spaarlamp (15W)", 15],
              ["Halogeenlamp (50W)", 50],
              ["Gloeilamp (60W)", 60]
            ],
            defaultVal: 0
          },
          {
            id: "n",
            label: "Aantal lampen",
            type: "number",
            min: 1,
            max: 20,
            stap: 1,
            eenheid: "stuks",
            defaultVal: 3
          },
          {
            id: "uren",
            label: "Uren per dag",
            type: "number",
            min: 0,
            max: 24,
            stap: 0.5,
            eenheid: "uur",
            defaultVal: 4
          },
        ],
        berekenVerbruik(p) {
          return Math.round(((+p.type * (+p.n || 1) * (+p.uren || 0)) / 1000) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Verlichting is goed voor een merkbaar deel van het totale thuisverbruik.",
        tips: [
          "Vervang gloeilampen door LED.",
          "Gebruik bewegingssensoren waar mogelijk.",
          "Maak maximaal gebruik van daglicht.",
          "Stem de verlichting af op wat nodig is met een dimmer."
        ],
      },
      {
        id: "wk_laptop",
        label: "Laptop / PC",
        emoji: "💻",
        icon: ICONS.laptop,
        ademeKey: "computer",
        pos: { left: "62%", bottom: "28%" },
        parameters: [
          {
            id: "type",
            label: "Type",
            type: "select",
            opties: [
              ["Laptop (45W)", 45],
              ["Desktop (150W)", 150],
              ["Gaming PC (300W)", 300]
            ],
            defaultVal: 0
          },
          {
            id: "uren",
            label: "Uren per dag",
            type: "number",
            min: 0,
            max: 24,
            stap: 0.5,
            eenheid: "uur",
            defaultVal: 4
          },
        ],
        berekenVerbruik(p) {
          return Math.round(((+p.type * (+p.uren || 0)) / 1000) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een laptop verbruikt veel minder dan een desktop.",
        tips: [
          "Gebruik energiespaarstand.",
          "Schakel het toestel volledig uit 's nachts.",
          "Een laptop is zuiniger dan een desktop PC."
        ],
      },
      {
        id: "wk_radio",
        label: "Stereo",
        emoji: "🎵",
        icon: ICONS.stereo,
        ademeKey: "radio",
        pos: { left: "82%", bottom: "30%" },
        parameters: [
          {
            id: "type",
            label: "Type",
            type: "select",
            opties: [
              ["DAB+ radio (5W)", 5],
              ["Soundbar (30W)", 30],
              ["Hi-fi (80W)", 80]
            ],
            defaultVal: 0
          },
          {
            id: "uren",
            label: "Uren per dag",
            type: "number",
            min: 0,
            max: 24,
            stap: 0.5,
            eenheid: "uur",
            defaultVal: 2
          },
        ],
        berekenVerbruik(p) {
          return Math.round(((+p.type * (+p.uren || 0)) / 1000) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een radio verbruikt meestal weinig, afhankelijk van hoe lang hij speelt.",
        tips: [
          "Schakel volledig uit als je weggaat.",
          "Een kleine speaker verbruikt minder dan een stereo-installatie."
        ],
      },
    ],
  },

  keuken: {
    label: "Keuken",
    emoji: "🍳",
    intro: "Ontdek hoeveel energie de toestellen in je keuken verbruiken.",
    toestellen: [
      {
        id: "kk_koelkast",
        label: "Koelkast",
        emoji: "🧊",
        icon: ICONS.koelkast,
        ademeKey: "koelkast",
        pos: { left: "6%", bottom: "26%" },
        parameters: [
          {
            id: "label_koel",
            label: "Energielabel",
            type: "label_select",
            labelOpties: ["A", "B", "C", "D", "E", "F", "G", "Onbekend"],
            tooltip: "Gebruik dit als je het label kent, anders het type hieronder"
          },
          {
            id: "type",
            label: "Type koelkast",
            type: "select",
            opties: [
              ["Compact (80 kWh/jaar)", 80],
              ["Vrijstaand (150 kWh/jaar)", 150],
              ["Met vriesvak (220 kWh/jaar)", 220],
              ["Amerikaans model (400 kWh/jaar)", 400]
            ],
            defaultVal: 1
          },
          {
            id: "vul",
            label: "Vulling",
            type: "select",
            opties: [
              ["Vol (+10%)", 1.10],
              ["Halfvol", 1.00],
              ["Bijna leeg (-5%)", 0.95]
            ],
            defaultVal: 1
          },
        ],
        berekenVerbruik(p) {
          if (p.label_koel && p.label_koel !== "Onbekend") {
            const labelJaar = { A: 150, B: 200, C: 260, D: 330, E: 400, F: 500, G: 600 };
            return Math.round(((labelJaar[p.label_koel] || 150) / 365) * 100) / 100;
          }
          return Math.round(((+p.type * (+p.vul || 1)) / 365) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een koelkast draait dag en nacht en heeft daardoor een constant basisverbruik.",
        tips: [
          "Stel in op 4 à 5°C.",
          "Laat warme gerechten eerst afkoelen.",
          "Controleer de deurrubbers regelmatig.",
          "Steek je koelkast niet te vol."
        ],
      },
      {
        id: "kk_vaatwasser",
        label: "Vaatwasser",
        emoji: "🍽️",
        icon: ICONS.vaatwasser,
        ademeKey: "vaatwasser",
        pos: { left: "30%", bottom: "26%" },
        parameters: [
          {
            id: "type",
            label: "Programma",
            type: "select",
            opties: [
              ["Eco 50°C (0.8 kWh)", 0.8],
              ["Normaal 65°C (1.2 kWh)", 1.2],
              ["Intensief 70°C (1.6 kWh)", 1.6]
            ],
            defaultVal: 0
          },
          {
            id: "keer",
            label: "Keer per dag",
            type: "number",
            min: 0,
            max: 5,
            stap: 0.5,
            eenheid: "keer",
            defaultVal: 1
          },
        ],
        berekenVerbruik(p) {
          return Math.round((+p.type * (+p.keer || 0)) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Eco-stand is vaak zuiniger dan handwassen.",
        tips: [
          "Gebruik bij voorkeur de eco-stand.",
          "Start pas als het toestel goed gevuld is.",
          "Laat indien mogelijk aan de lucht drogen.",
        ],
      },
      {
        id: "kk_microgolf",
        label: "Microgolf",
        emoji: "📡",
        icon: ICONS.microgolf,
        ademeKey: "microgolf",
        pos: { left: "57%", top: "10%" },
        parameters: [
          {
            id: "v",
            label: "Vermogen",
            type: "select",
            opties: [["700W", 700], ["900W", 900], ["1100W", 1100]],
            defaultVal: 1
          },
          {
            id: "min",
            label: "Minuten per dag",
            type: "number",
            min: 0,
            max: 120,
            stap: 1,
            eenheid: "min",
            defaultVal: 10
          },
        ],
        berekenVerbruik(p) {
          return Math.round(((+p.v * (+p.min || 0)) / 60 / 1000) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een microgolf is vaak zuiniger dan een oven voor korte bereidingen.",
        tips: [
          "Gebruik hem voor opwarmen in plaats van de oven.",
          "Kies een passend vermogen."
        ],
      },
      {
        id: "kk_waterkoker",
        label: "Waterkoker",
        emoji: "☕",
        icon: ICONS.waterkoker,
        ademeKey: "waterkoker",
        pos: { left: "72%", top: "10%" },
        parameters: [
          {
            id: "kopjes",
            label: "Kopjes per dag",
            type: "number",
            min: 0,
            max: 20,
            stap: 1,
            eenheid: "kopjes",
            defaultVal: 4,
            tooltip: "1 kopje (250ml) kost ±0,03 kWh"
          },
          {
            id: "vol",
            label: "Hoe vol zet je hem?",
            type: "select",
            opties: [
              ["Precies genoeg", 1.0],
              ["Iets te veel (+20%)", 1.2],
              ["Steeds vol (verspilling)", 1.6]
            ],
            defaultVal: 0
          },
        ],
        berekenVerbruik(p) {
          return Math.round((+p.kopjes || 0) * 0.031 * (+p.vol || 1) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een waterkoker kost ±0,03 kWh per kopje. Bij 4 kopjes/dag: ±0,12 kWh/dag.",
        tips: [
          "Kook enkel zoveel water als je nodig hebt.",
          "Ontkalken verhoogt de efficiëntie.",
          "Een waterkoker is zuiniger dan opwarmen op het gas.",
          "Bewaar heet water in een thermoskan."
        ],
      },
      {
        id: "kk_oven",
        label: "Oven",
        emoji: "🫕",
        icon: ICONS.oven,
        ademeKey: "oven",
        pos: { left: "79%", bottom: "26%" },
        parameters: [
          {
            id: "type",
            label: "Type oven",
            type: "select",
            opties: [
              ["Gewone oven (2200W)", 2200],
              ["Hetelucht (1800W)", 1800],
              ["Compact (1200W)", 1200]
            ],
            defaultVal: 1
          },
          {
            id: "min",
            label: "Minuten per dag",
            type: "number",
            min: 0,
            max: 180,
            stap: 5,
            eenheid: "min",
            defaultVal: 30
          },
        ],
        berekenVerbruik(p) {
          return Math.round(((+p.type * (+p.min || 0)) / 60 / 1000) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een oven kan een groot verbruik hebben bij frequent gebruik.",
        tips: [
          "Hetelucht is vaak zuiniger.",
          "Verwarm niet langer voor dan nodig.",
          "Gebruik restwarmte.",
          "Bak meerdere gerechten tegelijk."
        ],
      },
    ],
  },

  badkamer: {
    label: "Badkamer",
    emoji: "🚿",
    intro: "Ontdek hoeveel energie de badkamer-toestellen verbruiken.",
    toestellen: [
      {
        id: "bk_droger",
        label: "Haardroger",
        emoji: "💨",
        icon: ICONS.haardroger,
        ademeKey: "haardroger",
        pos: { left: "10%", bottom: "26%" },
        parameters: [
          {
            id: "type",
            label: "Type",
            type: "select",
            opties: [
              ["600W – goedkoop", 600],
              ["1200W – normaal", 1200],
              ["2000W – pro", 2000]
            ],
            defaultVal: 1
          },
          {
            id: "preset",
            label: "Hoe lang droog jij je haar?",
            type: "preset",
            opties: [
              ["Kort (5 min)", 5],
              ["Normaal (10 min)", 10],
              ["Lang (20 min)", 20]
            ],
            targetParam: "min"
          },
          {
            id: "min",
            label: "Minuten per dag",
            type: "number",
            min: 0,
            max: 60,
            stap: 1,
            eenheid: "min",
            defaultVal: 10
          },
        ],
        berekenVerbruik(p) {
          return Math.round(((+p.type * (+p.min || 0)) / 60 / 1000) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een haardroger kan op korte tijd behoorlijk wat vermogen vragen.",
        tips: [
          "Een lagere stand is vaak voldoende.",
          "Droog eerst met een handdoek."
        ],
      },
      {
        id: "bk_boiler",
        label: "Boiler",
        emoji: "🌡️",
        icon: ICONS.boiler,
        ademeKey: "boiler",
        pos: { left: "45%", bottom: "26%" },
        parameters: [
          {
            id: "inhoud",
            label: "Inhoud",
            type: "select",
            opties: [["80 liter", 80], ["120 liter", 120], ["200 liter", 200]],
            defaultVal: 1
          },
          {
            id: "personen",
            label: "Aantal personen",
            type: "number",
            min: 1,
            max: 8,
            stap: 1,
            eenheid: "pers.",
            defaultVal: 3
          },
        ],
        berekenVerbruik(p) {
          const l = Math.min(+p.inhoud, +p.personen * 50);
          return Math.round(l * 0.052 * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een elektrische boiler kan een van de grotere verbruikers in huis zijn.",
        tips: [
          "Stel in op 55 tot 60°C.",
          "Isoleer waar mogelijk de leidingen.",
          "Een warmtepompboiler is zuiniger."
        ],
      },
      {
        id: "bk_scheer",
        label: "Scheerapparaat",
        emoji: "🪒",
        icon: ICONS.scheerapparaat,
        ademeKey: "scheerapparaat",
        pos: { left: "76%", top: "12%" },
        parameters: [
          {
            id: "type",
            label: "Type",
            type: "select",
            opties: [["Eenvoudig (5W)", 5], ["Geavanceerd (15W)", 15]],
            defaultVal: 0
          },
          {
            id: "min",
            label: "Minuten per dag",
            type: "number",
            min: 0,
            max: 30,
            stap: 1,
            eenheid: "min",
            defaultVal: 5
          },
        ],
        berekenVerbruik(p) {
          return Math.round(((+p.type * (+p.min || 0)) / 60 / 1000) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een scheerapparaat verbruikt meestal erg weinig.",
        tips: [
          "Laad enkel op wanneer nodig.",
          "Koppel na het laden los."
        ],
      },
    ],
  },

  slaapkamer: {
    label: "Slaapkamer",
    emoji: "🛏️",
    intro: "Bekijk het energieverbruik van toestellen in de slaapkamer.",
    toestellen: [
      {
        id: "sk_lamp",
        label: "Verlichting",
        emoji: "🕯️",
        icon: ICONS.slaaplamp,
        ademeKey: "slaaplamp",
        pos: { left: "10%", top: "10%" },
        parameters: [
          {
            id: "type",
            label: "Type",
            type: "select",
            opties: [["LED (8W)", 8], ["Nachtlampje (2W)", 2], ["Halogeenlamp (28W)", 28]],
            defaultVal: 0
          },
          {
            id: "uren",
            label: "Uren/dag",
            type: "number",
            min: 0,
            max: 24,
            stap: 0.5,
            eenheid: "uur",
            defaultVal: 2
          },
        ],
        berekenVerbruik(p) {
          return Math.round(((+p.type * (+p.uren || 0)) / 1000) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Slaapkamerverlichting verbruikt meestal weinig, zeker met LED.",
        tips: [
          "Gebruik LED.",
          "Een timer of sensor kan handig zijn."
        ],
      },
      {
        id: "sk_gsm",
        label: "Telefoon laden",
        emoji: "📱",
        icon: ICONS.gsm,
        ademeKey: "gsm",
        pos: { left: "42%", bottom: "28%" },
        parameters: [
          {
            id: "type",
            label: "Oplader",
            type: "select",
            opties: [["Normaal (5W)", 5], ["Snellader (20W)", 20], ["Draadloos (15W)", 15]],
            defaultVal: 0
          },
          {
            id: "uren",
            label: "Uren/dag",
            type: "number",
            min: 0,
            max: 12,
            stap: 0.5,
            eenheid: "uur",
            defaultVal: 7
          },
        ],
        berekenVerbruik(p) {
          return Math.round(((+p.type * (+p.uren || 0)) / 1000) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Telefoons laden kost relatief weinig stroom per dag.",
        tips: [
          "Laad liever met kabel dan draadloos.",
          "Laat de lader niet onnodig in het stopcontact."
        ],
      },
      {
        id: "sk_deken",
        label: "El. deken",
        emoji: "🛌",
        icon: ICONS.elektrische_deken,
        ademeKey: "el_deken",
        pos: { left: "68%", bottom: "28%" },
        parameters: [
          {
            id: "type",
            label: "Type",
            type: "select",
            opties: [["Enkeldeken (60W)", 60], ["Tweepersoons (100W)", 100]],
            defaultVal: 0
          },
          {
            id: "uren",
            label: "Uren/nacht",
            type: "number",
            min: 0,
            max: 12,
            stap: 0.5,
            eenheid: "uur",
            defaultVal: 8
          },
        ],
        berekenVerbruik(p) {
          return Math.round(((+p.type * (+p.uren || 0)) / 1000) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een elektrische deken kan op jaarbasis toch oplopen.",
        tips: [
          "Voorverwarmen is zuiniger dan de hele nacht hoog zetten.",
          "Een warmwaterkruik verbruikt minder."
        ],
      },
    ],
  },

  berging: {
    label: "Berging",
    emoji: "📦",
    intro: "Bekijk het energieverbruik van toestellen in de berging.",
    toestellen: [
      {
        id: "bg_wm",
        label: "Wasmachine",
        emoji: "👕",
        icon: ICONS.wasmachine,
        ademeKey: "wasmachine",
        pos: { left: "6%", bottom: "26%" },
        parameters: [
          {
            id: "label_wm",
            label: "Energielabel",
            type: "label_select",
            labelOpties: ["A-30%", "A-20%", "A-10%", "A", "B", "C", "D", "E", "Onbekend"],
            tooltip: "Kies het label als je het kent, anders blijft Onbekend staan"
          },
          {
            id: "cycli",
            label: "Wassen/week",
            type: "number",
            min: 0,
            max: 14,
            stap: 1,
            eenheid: "keer",
            defaultVal: 4
          },
        ],
        berekenVerbruik(p) {
          const wmLabels = {
            "A-30%": 0.36,
            "A-20%": 0.37,
            "A-10%": 0.41,
            "A": 0.45,
            "B": 0.51,
            "C": 0.59,
            "D": 0.69,
            "E": 0.78,
          };
          const kwhPerWas = (p.label_wm && p.label_wm !== "Onbekend")
            ? (wmLabels[p.label_wm] || 0.45)
            : 0.45;
          return Math.round(((kwhPerWas * (+p.cycli || 0)) / 7) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een gemiddeld gezin doet meerdere wasbeurten per week.",
        tips: [
          "Gebruik de eco-stand.",
          "Was met volle trommel.",
          "30°C volstaat vaak voor normaal wasgoed.",
          "Centrifugeer op de hoogste stand als de was in de droger gaat."
        ],
      },
      {
        id: "bg_droogkast",
        label: "Droogkast",
        emoji: "🌀",
        icon: ICONS.droogkast,
        ademeKey: "droogkast",
        pos: { left: "38%", bottom: "26%" },
        parameters: [
          {
            id: "type",
            label: "Type",
            type: "select",
            opties: [
              ["Condensdroogkast A (2kWh)", 2.0],
              ["Warmtepomp A+++ (1kWh)", 1.0],
              ["Oude droogkast (3.5kWh)", 3.5]
            ],
            defaultVal: 1
          },
          {
            id: "keer",
            label: "Beurten/week",
            type: "number",
            min: 0,
            max: 14,
            stap: 1,
            eenheid: "keer",
            defaultVal: 3
          },
        ],
        berekenVerbruik(p) {
          return Math.round(((+p.type * (+p.keer || 0)) / 7) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een warmtepompdroogkast verbruikt duidelijk minder dan een oudere droogkast.",
        tips: [
          "Luchten is het zuinigst.",
          "Kies bij vervanging voor een warmtepompdroogkast.",
          "Goed centrifugeren helpt.",
          "Houd de filters proper."
        ],
      },
      {
        id: "bg_stofzuiger",
        label: "Stofzuiger",
        emoji: "🔌",
        icon: ICONS.stofzuiger,
        ademeKey: "stofzuiger",
        pos: { left: "70%", bottom: "28%" },
        parameters: [
          {
            id: "type",
            label: "Type",
            type: "select",
            opties: [
              ["Stofzuiger (900W)", 900],
              ["Robotstofzuiger (30W)", 30],
              ["Snoerloos (60W)", 60]
            ],
            defaultVal: 0
          },
          {
            id: "min",
            label: "Minuten/dag",
            type: "number",
            min: 0,
            max: 120,
            stap: 5,
            eenheid: "min",
            defaultVal: 20
          },
        ],
        berekenVerbruik(p) {
          return Math.round(((+p.type * (+p.min || 0)) / 60 / 1000) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een robotstofzuiger verbruikt meestal veel minder dan een klassieke stofzuiger.",
        tips: [
          "Een robot is zuiniger voor lichte dagelijkse schoonmaak.",
          "Vervang filters regelmatig."
        ],
      },
    ],
  },

  garage: {
    label: "Garage",
    emoji: "🚗",
    intro: "Bekijk het energieverbruik van toestellen in de garage.",
    toestellen: [
      {
        id: "gr_eauto",
        label: "El. auto",
        emoji: "⚡",
        icon: ICONS.elektrische_auto,
        ademeKey: "ev_lader",
        pos: { left: "6%", bottom: "26%" },
        parameters: [
          {
            id: "lader",
            label: "Lader",
            type: "select",
            opties: [
              ["Stopcontact (2.3kW)", 2.3],
              ["Wallbox (11kW)", 11],
              ["Snellader (22kW)", 22]
            ],
            defaultVal: 1
          },
          {
            id: "invoer_modus",
            label: "Hoe wil je invoeren?",
            type: "select",
            opties: [
              ["Laaduren per dag", "uren"],
              ["Km gereden per week", "km"]
            ],
            defaultVal: 1
          },
          {
            id: "uren",
            label: "Uren/dag laden",
            type: "number",
            min: 0,
            max: 24,
            stap: 0.5,
            eenheid: "uur",
            defaultVal: 3
          },
          {
            id: "km_week",
            label: "Km/week",
            type: "number",
            min: 0,
            max: 2000,
            stap: 10,
            eenheid: "km",
            defaultVal: 200
          },
        ],
        berekenVerbruik(p) {
          if (p.invoer_modus === "km") {
            return Math.round((((+p.km_week || 0) * 0.18 / 0.85) / 7) * 100) / 100;
          }
          return Math.round((+p.lader * (+p.uren || 0)) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Elektrisch laden kan een grote verbruiker zijn, afhankelijk van je rijgedrag.",
        tips: [
          "Laad 's nachts aan daltarief.",
          "Laad voor dagelijks gebruik meestal tot 80%.",
          "Zonnepanelen kunnen laden goedkoper maken."
        ],
      },
      {
        id: "gr_diepvriezer",
        label: "Diepvriezer",
        emoji: "🧊",
        icon: ICONS.diepvriezer,
        ademeKey: "koelkast",
        pos: { left: "40%", bottom: "26%" },
        parameters: [
          {
            id: "label_vr",
            label: "Energielabel",
            type: "label_select",
            labelOpties: ["A", "B", "C", "D", "E", "F", "G", "Onbekend"],
            tooltip: "Kies het label als je het kent, anders blijft Onbekend staan"
          },
          {
            id: "type",
            label: "Type",
            type: "select",
            opties: [
              ["Klein 100L A++ (100kWh/j)", 100],
              ["Middelgroot 200L A+ (180kWh/j)", 180],
              ["Groot 300L A (280kWh/j)", 280]
            ],
            defaultVal: 1
          },
        ],
        berekenVerbruik(p) {
          if (p.label_vr && p.label_vr !== "Onbekend") {
            const labelJaar = { A: 150, B: 200, C: 260, D: 330, E: 400, F: 500, G: 600 };
            return Math.round(((labelJaar[p.label_vr] || 180) / 365) * 100) / 100;
          }
          return Math.round(((+p.type) / 365) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een diepvriezer verbruikt doorlopend, dag en nacht.",
        tips: [
          "Ontdooi regelmatig.",
          "Een volle vriezer werkt efficiënter.",
          "Plaats hem niet naast een warmtebron."
        ],
      },
      {
        id: "gr_ebike",
        label: "E-bike lader",
        emoji: "🚲",
        icon: ICONS.ebike,
        ademeKey: "ebike_lader",
        pos: { left: "57%", bottom: "26%" },
        parameters: [
          {
            id: "cap",
            label: "Batterijcapaciteit",
            type: "select",
            opties: [
              ["Klein (250 Wh)", 250],
              ["Normaal (500 Wh)", 500],
              ["Groot (750 Wh)", 750]
            ],
            defaultVal: 1,
            tooltip: "Staat op het batterijpakket van de fiets"
          },
          {
            id: "keer",
            label: "Laadcycli/week",
            type: "number",
            min: 0,
            max: 14,
            stap: 1,
            eenheid: "keer",
            defaultVal: 3,
            tooltip: "Gemiddeld laad je een e-bike 2–4 keer per week"
          },
        ],
        berekenVerbruik(p) {
          return Math.round(((+p.cap / 1000 / 0.9) * (+p.keer || 0) / 7) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Een e-bike 3×/week laden kost ±0,24 kWh/dag — heel beperkt.",
        tips: [
          "Laad enkel wanneer nodig, niet constant op de lader.",
          "Trek de lader uit na het laden.",
          "Een volle lading kost ±0,06–0,09 kWh voor een normale batterij."
        ],
      },
      {
        id: "gr_verlichting",
        label: "Verlichting",
        emoji: "💡",
        icon: ICONS.garage_lamp,
        ademeKey: "verlichting",
        pos: { left: "74%", top: "10%" },
        parameters: [
          {
            id: "type",
            label: "Type",
            type: "select",
            opties: [
              ["LED TL (20W)", 20],
              ["Gewone TL (36W)", 36],
              ["Gloeilamp (60W)", 60]
            ],
            defaultVal: 0
          },
          {
            id: "n",
            label: "Aantal",
            type: "number",
            min: 1,
            max: 10,
            stap: 1,
            eenheid: "stuks",
            defaultVal: 2
          },
          {
            id: "uren",
            label: "Uren/dag",
            type: "number",
            min: 0,
            max: 24,
            stap: 0.5,
            eenheid: "uur",
            defaultVal: 1
          },
        ],
        berekenVerbruik(p) {
          return Math.round(((+p.type * (+p.n || 1) * (+p.uren || 0)) / 1000) * 100) / 100;
        },
        eenheid: "kWh per dag",
        gemiddelde: "Garageverlichting verbruikt relatief weinig, zeker met LED.",
        tips: [
          "Vervang TL door LED TL.",
          "Gebruik een sensor of timer."
        ],
      },
    ],
  },
};