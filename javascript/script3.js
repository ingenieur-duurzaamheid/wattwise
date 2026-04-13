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
  berging:    { top:60.9, left:13.2,  width:12.5, height:13.3 },
  woonkamer:  { top:46.7, left:13.2,  width:26.8, height:13.3 },
  keuken:     { top:46.9, left:50.4, width:24.7, height:13.3 },
  garage:     { top:60.9, left:50.4,  width:20, height:13.3  },
  badkamer:   { top:32.4, left:52.2, width:22.8, height:13.5 },

};

const KAMER_ZOOM = {
  slaapkamer: { x:22,  y:41, scale:2.2 },
  berging:    { x:70,  y:41, scale:2.4 },
  woonkamer:  { x:22,  y:61, scale:2.4 },
  keuken:     { x:70,  y:61, scale:2.4 },
  garage:     { x:20,  y:79, scale:2.4 },
  badkamer:   { x:70,  y:79, scale:2.4 },
};

/* ===================================================
   ICON MAPPING – relatief pad naar de PNG-icons map
   Pas het pad aan naar jullie mappenstructuur.
   Verwacht formaat: ../icons/appliances/NNN-naam.png
=================================================== */
const ICON_BASE = '../icons/appliances/';
const ICONS = {
  // Televisie / schermen
  tv:           '024-tv.png',
  smart_tv:     '022-smart-tv.png',
  // Verlichting
  lamp:         null, // geen icon beschikbaar → emoji fallback
  // Computer
  laptop:       null,
  // Audio
  stereo:       null,
  // Keuken
  koelkast:     '006-refrigerator.png',
  vaatwasser:   '025-dishwasher.png',
  microgolf:    '012-microwave-oven.png',
  oven:         '029-oven.png',
  // Badkamer
  haardroger:   null,
  boiler:       null,
  scheerapparaat: null,
  // Slaapkamer
  slaaplamp:    null,
  gsm:          null,
  elektrische_deken: null,
  // Berging
  wasmachine:   '001-washing-machine.png',
  droogkast:    '021-dryer.png',
  stofzuiger:   '014-vacuum-cleaner.png',
  // Garage
  elektrische_auto: null,
  diepvriezer:  '015-refrigerator-1.png',
  garage_lamp:  null,
};

/* ===================================================
   SVG KAMER ACHTERGRONDEN
   Elke kamer heeft een inline SVG als decoratieve achtergrond.
   viewBox: 800x350 (past bij aspect-ratio 16/7 van .kamer-scene)
=================================================== */
const KAMER_SVG = {

  woonkamer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 350" preserveAspectRatio="xMidYMid slice">
    <!-- Wand -->
    <rect width="800" height="350" fill="#f5e6c8"/>
    <!-- Plint -->
    <rect x="0" y="273" width="800" height="4" fill="#c8a96e" opacity="0.5"/>
    <!-- Vloer -->
    <rect x="0" y="277" width="800" height="73" fill="#c8a060"/>
    <!-- Vloer planken -->
    <line x1="0" y1="295" x2="800" y2="295" stroke="#b08040" stroke-width="1" opacity="0.4"/>
    <line x1="0" y1="313" x2="800" y2="313" stroke="#b08040" stroke-width="1" opacity="0.4"/>
    <line x1="0" y1="331" x2="800" y2="331" stroke="#b08040" stroke-width="1" opacity="0.4"/>
    <line x1="133" y1="277" x2="133" y2="350" stroke="#b08040" stroke-width="1" opacity="0.3"/>
    <line x1="266" y1="277" x2="266" y2="350" stroke="#b08040" stroke-width="1" opacity="0.3"/>
    <line x1="399" y1="277" x2="399" y2="350" stroke="#b08040" stroke-width="1" opacity="0.3"/>
    <line x1="532" y1="277" x2="532" y2="350" stroke="#b08040" stroke-width="1" opacity="0.3"/>
    <line x1="665" y1="277" x2="665" y2="350" stroke="#b08040" stroke-width="1" opacity="0.3"/>
    <!-- Raam links -->
    <rect x="60" y="40" width="140" height="160" rx="4" fill="#b8d8f0" opacity="0.7" stroke="#c8a96e" stroke-width="3"/>
    <rect x="60" y="40" width="140" height="160" rx="4" fill="none" stroke="#c8a96e" stroke-width="3"/>
    <line x1="130" y1="40" x2="130" y2="200" stroke="#c8a96e" stroke-width="2"/>
    <line x1="60" y1="120" x2="200" y2="120" stroke="#c8a96e" stroke-width="2"/>
    <!-- Raambank -->
    <rect x="50" y="198" width="160" height="12" rx="2" fill="#d4b880"/>
    <!-- Licht door raam -->
    <rect x="60" y="40" width="140" height="160" fill="url(#wk-sun)" opacity="0.3"/>
    <defs>
      <linearGradient id="wk-sun" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fff8e0" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#fff8e0" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <!-- Gordijn links -->
    <path d="M52 30 Q72 80 60 160 Q68 120 80 160 Q90 100 88 40Z" fill="#e8c080" opacity="0.8"/>
    <path d="M208 30 Q188 80 200 160 Q192 120 180 160 Q170 100 172 40Z" fill="#e8c080" opacity="0.8"/>
    <!-- Bank (sofa) midden-rechts -->
    <rect x="340" y="220" width="300" height="55" rx="8" fill="#8b6f47"/>
    <rect x="340" y="210" width="300" height="22" rx="6" fill="#a08050"/>
    <rect x="334" y="210" width="22" height="65" rx="5" fill="#a08050"/>
    <rect x="644" y="210" width="22" height="65" rx="5" fill="#a08050"/>
    <!-- Bankkussens -->
    <rect x="350" y="216" width="80" height="18" rx="4" fill="#c4a46a" opacity="0.8"/>
    <rect x="445" y="216" width="80" height="18" rx="4" fill="#c4a46a" opacity="0.8"/>
    <rect x="540" y="216" width="80" height="18" rx="4" fill="#c4a46a" opacity="0.8"/>
    <!-- Salontafel -->
    <rect x="390" y="258" width="140" height="18" rx="4" fill="#7a5c30"/>
    <rect x="400" y="276" width="8" height="12" fill="#6a4c20"/>
    <rect x="512" y="276" width="8" height="12" fill="#6a4c20"/>
    <!-- Plant in hoek rechts -->
    <rect x="730" y="240" width="24" height="36" rx="3" fill="#8b6040"/>
    <circle cx="742" cy="230" r="28" fill="#4a8c3f" opacity="0.9"/>
    <circle cx="722" cy="238" r="16" fill="#3a7c30" opacity="0.8"/>
    <circle cx="762" cy="236" r="18" fill="#5a9c4a" opacity="0.8"/>
    <!-- Schilderij aan muur -->
    <rect x="300" y="60" width="100" height="70" rx="3" fill="#8b6040" stroke="#c8a96e" stroke-width="3"/>
    <rect x="308" y="68" width="84" height="54" fill="#d4a060" opacity="0.6"/>
    <circle cx="350" cy="95" r="20" fill="#e8b870" opacity="0.5"/>
  </svg>`,

  keuken: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 350" preserveAspectRatio="xMidYMid slice">
    <!-- Wand -->
    <rect width="800" height="350" fill="#e8f0e8"/>
    <!-- Tegelpatroon wand (boven aanrechtblad) -->
    <rect x="0" y="0" width="800" height="190" fill="#dceadc"/>
    <!-- Tegels -->
    <g stroke="#c8d8c8" stroke-width="0.8" opacity="0.6">
      <line x1="0" y1="40" x2="800" y2="40"/><line x1="0" y1="80" x2="800" y2="80"/>
      <line x1="0" y1="120" x2="800" y2="120"/><line x1="0" y1="160" x2="800" y2="160"/>
      <line x1="50" y1="0" x2="50" y2="190"/><line x1="100" y1="0" x2="100" y2="190"/>
      <line x1="150" y1="0" x2="150" y2="190"/><line x1="200" y1="0" x2="200" y2="190"/>
      <line x1="250" y1="0" x2="250" y2="190"/><line x1="300" y1="0" x2="300" y2="190"/>
      <line x1="350" y1="0" x2="350" y2="190"/><line x1="400" y1="0" x2="400" y2="190"/>
      <line x1="450" y1="0" x2="450" y2="190"/><line x1="500" y1="0" x2="500" y2="190"/>
      <line x1="550" y1="0" x2="550" y2="190"/><line x1="600" y1="0" x2="600" y2="190"/>
      <line x1="650" y1="0" x2="650" y2="190"/><line x1="700" y1="0" x2="700" y2="190"/>
      <line x1="750" y1="0" x2="750" y2="190"/>
    </g>
    <!-- Aanrechtblad -->
    <rect x="0" y="188" width="800" height="14" rx="2" fill="#b0c8a8"/>
    <rect x="0" y="188" width="800" height="4" fill="#c8dcc0"/>
    <!-- Onderkastjes -->
    <rect x="0" y="202" width="800" height="148" fill="#a8c090"/>
    <!-- Kastdeuren -->
    <rect x="8" y="210" width="88" height="110" rx="4" fill="#b8d0a0" stroke="#90a878" stroke-width="1.5"/>
    <rect x="104" y="210" width="88" height="110" rx="4" fill="#b8d0a0" stroke="#90a878" stroke-width="1.5"/>
    <rect x="200" y="210" width="88" height="110" rx="4" fill="#b8d0a0" stroke="#90a878" stroke-width="1.5"/>
    <rect x="296" y="210" width="88" height="110" rx="4" fill="#b8d0a0" stroke="#90a878" stroke-width="1.5"/>
    <rect x="504" y="210" width="88" height="110" rx="4" fill="#b8d0a0" stroke="#90a878" stroke-width="1.5"/>
    <rect x="600" y="210" width="88" height="110" rx="4" fill="#b8d0a0" stroke="#90a878" stroke-width="1.5"/>
    <rect x="696" y="210" width="96" height="110" rx="4" fill="#b8d0a0" stroke="#90a878" stroke-width="1.5"/>
    <!-- Kastgrepen -->
    <rect x="46" y="258" width="30" height="5" rx="2" fill="#88a068"/>
    <rect x="142" y="258" width="30" height="5" rx="2" fill="#88a068"/>
    <rect x="238" y="258" width="30" height="5" rx="2" fill="#88a068"/>
    <rect x="334" y="258" width="30" height="5" rx="2" fill="#88a068"/>
    <rect x="542" y="258" width="30" height="5" rx="2" fill="#88a068"/>
    <rect x="638" y="258" width="30" height="5" rx="2" fill="#88a068"/>
    <rect x="734" y="258" width="30" height="5" rx="2" fill="#88a068"/>
    <!-- Gootsteen -->
    <rect x="392" y="196" width="110" height="60" rx="4" fill="#8ab0a0" stroke="#70988a" stroke-width="1.5"/>
    <rect x="402" y="204" width="44" height="44" rx="3" fill="#6a9888"/>
    <rect x="452" y="204" width="44" height="44" rx="3" fill="#6a9888"/>
    <!-- Kraan -->
    <rect x="440" y="178" width="6" height="20" rx="2" fill="#909090"/>
    <rect x="430" y="175" width="26" height="6" rx="3" fill="#909090"/>
    <!-- Bovenkastjes -->
    <rect x="0" y="20" width="90" height="130" rx="4" fill="#b8d0a0" stroke="#90a878" stroke-width="1.5" opacity="0.9"/>
    <rect x="98" y="20" width="90" height="130" rx="4" fill="#b8d0a0" stroke="#90a878" stroke-width="1.5" opacity="0.9"/>
    <rect x="196" y="20" width="90" height="130" rx="4" fill="#b8d0a0" stroke="#90a878" stroke-width="1.5" opacity="0.9"/>
    <rect x="580" y="20" width="90" height="130" rx="4" fill="#b8d0a0" stroke="#90a878" stroke-width="1.5" opacity="0.9"/>
    <rect x="678" y="20" width="114" height="130" rx="4" fill="#b8d0a0" stroke="#90a878" stroke-width="1.5" opacity="0.9"/>
    <!-- Vloer -->
    <rect x="0" y="318" width="800" height="32" fill="#c8c0b0"/>
    <line x1="0" y1="318" x2="800" y2="318" stroke="#a8a098" stroke-width="2"/>
    <!-- Vloertegels -->
    <g stroke="#b0a898" stroke-width="0.6" opacity="0.5">
      <line x1="100" y1="318" x2="100" y2="350"/>
      <line x1="200" y1="318" x2="200" y2="350"/>
      <line x1="300" y1="318" x2="300" y2="350"/>
      <line x1="400" y1="318" x2="400" y2="350"/>
      <line x1="500" y1="318" x2="500" y2="350"/>
      <line x1="600" y1="318" x2="600" y2="350"/>
      <line x1="700" y1="318" x2="700" y2="350"/>
      <line x1="0" y1="334" x2="800" y2="334"/>
    </g>
  </svg>`,

  badkamer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 350" preserveAspectRatio="xMidYMid slice">
    <!-- Wand lichtblauw -->
    <rect width="800" height="350" fill="#d8eef8"/>
    <!-- Wandtegels -->
    <g stroke="#c0dff0" stroke-width="0.8" opacity="0.7">
      <line x1="0" y1="50" x2="800" y2="50"/><line x1="0" y1="100" x2="800" y2="100"/>
      <line x1="0" y1="150" x2="800" y2="150"/><line x1="0" y1="200" x2="800" y2="200"/>
      <line x1="0" y1="250" x2="800" y2="250"/>
      <line x1="50" y1="0" x2="50" y2="300"/><line x1="100" y1="0" x2="100" y2="300"/>
      <line x1="150" y1="0" x2="150" y2="300"/><line x1="200" y1="0" x2="200" y2="300"/>
      <line x1="250" y1="0" x2="250" y2="300"/><line x1="300" y1="0" x2="300" y2="300"/>
      <line x1="350" y1="0" x2="350" y2="300"/><line x1="400" y1="0" x2="400" y2="300"/>
      <line x1="450" y1="0" x2="450" y2="300"/><line x1="500" y1="0" x2="500" y2="300"/>
      <line x1="550" y1="0" x2="550" y2="300"/><line x1="600" y1="0" x2="600" y2="300"/>
      <line x1="650" y1="0" x2="650" y2="300"/><line x1="700" y1="0" x2="700" y2="300"/>
      <line x1="750" y1="0" x2="750" y2="300"/>
    </g>
    <!-- Accent tegels (blauw border) -->
    <rect x="0" y="98" width="800" height="4" fill="#90c0e0" opacity="0.4"/>
    <rect x="0" y="198" width="800" height="4" fill="#90c0e0" opacity="0.4"/>
    <!-- Vloer -->
    <rect x="0" y="290" width="800" height="60" fill="#c0d8e8"/>
    <line x1="0" y1="290" x2="800" y2="290" stroke="#a0c0d8" stroke-width="2"/>
    <!-- Vloertegels hexagonaal patroon (gesimuleerd) -->
    <g stroke="#a8c8d8" stroke-width="0.7" opacity="0.5">
      <line x1="80" y1="290" x2="80" y2="350"/>
      <line x1="160" y1="290" x2="160" y2="350"/>
      <line x1="240" y1="290" x2="240" y2="350"/>
      <line x1="320" y1="290" x2="320" y2="350"/>
      <line x1="400" y1="290" x2="400" y2="350"/>
      <line x1="480" y1="290" x2="480" y2="350"/>
      <line x1="560" y1="290" x2="560" y2="350"/>
      <line x1="640" y1="290" x2="640" y2="350"/>
      <line x1="720" y1="290" x2="720" y2="350"/>
      <line x1="0" y1="320" x2="800" y2="320"/>
    </g>
    <!-- Wastafel links -->
    <rect x="40" y="220" width="120" height="70" rx="10" fill="#e8f4fc" stroke="#a0c8e0" stroke-width="2"/>
    <ellipse cx="100" cy="255" rx="48" ry="30" fill="#d0e8f8" stroke="#a0c8e0" stroke-width="1.5"/>
    <ellipse cx="100" cy="255" rx="20" ry="12" fill="#b8d8f0"/>
    <!-- Kraan wastafel -->
    <rect x="96" y="210" width="8" height="16" rx="2" fill="#c0c0c0"/>
    <rect x="84" y="208" width="32" height="6" rx="3" fill="#c0c0c0"/>
    <!-- Spiegel boven wastafel -->
    <rect x="30" y="60" width="140" height="130" rx="4" fill="#e8f8ff" stroke="#a0c8e0" stroke-width="3" opacity="0.9"/>
    <rect x="38" y="68" width="124" height="114" fill="url(#mirror-grad)" opacity="0.4"/>
    <defs>
      <linearGradient id="mirror-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8"/>
        <stop offset="60%" stop-color="#d0ecf8" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#a8d4f0" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    <!-- Bad rechts -->
    <rect x="560" y="215" width="220" height="90" rx="16" fill="#e8f4fc" stroke="#a0c8e0" stroke-width="2"/>
    <rect x="572" y="228" width="196" height="64" rx="12" fill="#d0e8f8"/>
    <!-- Bad kraan -->
    <rect x="756" y="205" width="10" height="22" rx="3" fill="#c0c0c0"/>
    <rect x="746" y="203" width="30" height="6" rx="3" fill="#c0c0c0"/>
    <!-- Handdoekrek -->
    <rect x="340" y="195" width="5" height="80" rx="2" fill="#c0c0c0"/>
    <rect x="340" y="205" width="60" height="4" rx="2" fill="#c0c0c0"/>
    <rect x="340" y="230" width="60" height="4" rx="2" fill="#c0c0c0"/>
    <rect x="340" y="255" width="60" height="4" rx="2" fill="#c0c0c0"/>
    <rect x="395" y="195" width="5" height="80" rx="2" fill="#c0c0c0"/>
    <!-- Handdoeken -->
    <rect x="342" y="207" width="52" height="22" rx="2" fill="#f0e8d8" opacity="0.9"/>
    <rect x="342" y="233" width="52" height="20" rx="2" fill="#d8e8f0" opacity="0.9"/>
  </svg>`,

  slaapkamer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 350" preserveAspectRatio="xMidYMid slice">
    <!-- Wand zacht lila -->
    <rect width="800" height="350" fill="#ede0f5"/>
    <!-- Lambrisering onderaan -->
    <rect x="0" y="240" width="800" height="5" fill="#c8a8d8" opacity="0.5"/>
    <rect x="0" y="245" width="800" height="55" fill="#e0cef0"/>
    <!-- Vloer -->
    <rect x="0" y="300" width="800" height="50" fill="#c8b8a0"/>
    <line x1="0" y1="300" x2="800" y2="300" stroke="#a89880" stroke-width="2"/>
    <!-- Vloerplanken -->
    <g stroke="#b0a080" stroke-width="0.7" opacity="0.4">
      <line x1="0" y1="315" x2="800" y2="315"/>
      <line x1="0" y1="330" x2="800" y2="330"/>
      <line x1="0" y1="345" x2="800" y2="345"/>
      <line x1="133" y1="300" x2="133" y2="350"/>
      <line x1="266" y1="300" x2="266" y2="350"/>
      <line x1="399" y1="300" x2="399" y2="350"/>
      <line x1="532" y1="300" x2="532" y2="350"/>
      <line x1="665" y1="300" x2="665" y2="350"/>
    </g>
    <!-- Bed (groot tweepersoonsbed) midden -->
    <rect x="220" y="215" width="360" height="90" rx="8" fill="#8870a8"/>
    <!-- Hoofdeinde -->
    <rect x="210" y="185" width="380" height="40" rx="10" fill="#7060a0"/>
    <!-- Matras -->
    <rect x="228" y="220" width="344" height="80" rx="5" fill="#f0e8f8"/>
    <!-- Kussens -->
    <rect x="240" y="224" width="130" height="50" rx="8" fill="#fff8ff" stroke="#d0b8e8" stroke-width="1.5"/>
    <rect x="430" y="224" width="130" height="50" rx="8" fill="#fff8ff" stroke="#d0b8e8" stroke-width="1.5"/>
    <!-- Deken/sprei -->
    <rect x="228" y="264" width="344" height="36" rx="4" fill="#b898d8"/>
    <line x1="228" y1="272" x2="572" y2="272" stroke="#c8a8e8" stroke-width="1" opacity="0.6"/>
    <!-- Nachtkastje links -->
    <rect x="120" y="230" width="80" height="70" rx="5" fill="#7060a0"/>
    <rect x="128" y="240" width="64" height="28" rx="3" fill="#8070b0" stroke="#9080c0" stroke-width="0.5"/>
    <rect x="128" y="274" width="64" height="20" rx="3" fill="#8070b0" stroke="#9080c0" stroke-width="0.5"/>
    <!-- Lampje nacht links -->
    <rect x="148" y="210" width="16" height="22" rx="2" fill="#c0b0d0"/>
    <ellipse cx="156" cy="208" rx="18" ry="12" fill="#f5f0d8" opacity="0.9"/>
    <!-- Nachtkastje rechts -->
    <rect x="600" y="230" width="80" height="70" rx="5" fill="#7060a0"/>
    <rect x="608" y="240" width="64" height="28" rx="3" fill="#8070b0" stroke="#9080c0" stroke-width="0.5"/>
    <rect x="608" y="274" width="64" height="20" rx="3" fill="#8070b0" stroke="#9080c0" stroke-width="0.5"/>
    <!-- Lampje nacht rechts -->
    <rect x="636" y="210" width="16" height="22" rx="2" fill="#c0b0d0"/>
    <ellipse cx="644" cy="208" rx="18" ry="12" fill="#f5f0d8" opacity="0.9"/>
    <!-- Raam rechts -->
    <rect x="620" y="30" width="150" height="170" rx="4" fill="#c8d8f0" opacity="0.7" stroke="#b0a0c8" stroke-width="3"/>
    <line x1="695" y1="30" x2="695" y2="200" stroke="#b0a0c8" stroke-width="2"/>
    <line x1="620" y1="115" x2="770" y2="115" stroke="#b0a0c8" stroke-width="2"/>
    <!-- Gordijnen -->
    <path d="M612 20 Q632 80 622 170 Q630 130 642 170 Q652 100 650 20Z" fill="#c8a0d8" opacity="0.8"/>
    <path d="M780 20 Q760 80 770 170 Q762 130 752 170 Q742 100 744 20Z" fill="#c8a0d8" opacity="0.8"/>
    <!-- Kast links -->
    <rect x="20" y="80" width="90" height="215" rx="4" fill="#7060a0" stroke="#6050a0" stroke-width="1"/>
    <line x1="65" y1="80" x2="65" y2="295" stroke="#6050a0" stroke-width="1"/>
    <circle cx="58" cy="185" r="5" fill="#9880c0"/>
    <circle cx="72" cy="185" r="5" fill="#9880c0"/>
  </svg>`,

  berging: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 350" preserveAspectRatio="xMidYMid slice">
    <!-- Wand beige -->
    <rect width="800" height="350" fill="#ece4d4"/>
    <!-- Betonnen vloer -->
    <rect x="0" y="280" width="800" height="70" fill="#b8b0a0"/>
    <line x1="0" y1="280" x2="800" y2="280" stroke="#a0988a" stroke-width="2"/>
    <!-- Vloer lijnen (beton) -->
    <g stroke="#a8a090" stroke-width="0.7" opacity="0.4">
      <line x1="0" y1="300" x2="800" y2="300"/>
      <line x1="0" y1="320" x2="800" y2="320"/>
      <line x1="0" y1="340" x2="800" y2="340"/>
      <line x1="200" y1="280" x2="200" y2="350"/>
      <line x1="400" y1="280" x2="400" y2="350"/>
      <line x1="600" y1="280" x2="600" y2="350"/>
    </g>
    <!-- Plank systeem rechts -->
    <rect x="580" y="30" width="200" height="260" rx="4" fill="#c8c0b0" stroke="#a8a090" stroke-width="1.5"/>
    <rect x="580" y="100" width="200" height="6" fill="#a8a090"/>
    <rect x="580" y="170" width="200" height="6" fill="#a8a090"/>
    <rect x="580" y="240" width="200" height="6" fill="#a8a090"/>
    <!-- Spullen op planken -->
    <rect x="592" y="108" width="36" height="56" rx="3" fill="#c87040" opacity="0.8"/>
    <rect x="634" y="118" width="28" height="46" rx="3" fill="#4080c8" opacity="0.8"/>
    <rect x="668" y="112" width="40" height="52" rx="3" fill="#60a040" opacity="0.8"/>
    <rect x="714" y="120" width="30" height="44" rx="3" fill="#c84040" opacity="0.8"/>
    <rect x="592" y="178" width="60" height="56" rx="3" fill="#808080" opacity="0.8"/>
    <rect x="660" y="188" width="44" height="46" rx="3" fill="#a07840" opacity="0.8"/>
    <rect x="710" y="184" width="34" height="50" rx="3" fill="#406890" opacity="0.8"/>
    <!-- TL-lamp aan plafond -->
    <rect x="100" y="0" width="600" height="10" rx="3" fill="#d8d0c0"/>
    <rect x="120" y="10" width="560" height="8" rx="2" fill="#f0f0e8" opacity="0.9"/>
    <rect x="100" y="0" width="600" height="18" fill="url(#tl-light)" opacity="0.15"/>
    <defs>
      <linearGradient id="tl-light" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fffde0"/>
        <stop offset="100%" stop-color="#fffde0" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <!-- Waterleiding/buizen aan muur -->
    <rect x="0" y="60" width="10" height="220" fill="#909090" opacity="0.6"/>
    <rect x="14" y="60" width="6" height="220" fill="#b0b0b0" opacity="0.4"/>
    <circle cx="10" cy="160" r="10" fill="#808080" opacity="0.6"/>
  </svg>`,

  garage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 350" preserveAspectRatio="xMidYMid slice">
    <!-- Wand grijs beton -->
    <rect width="800" height="350" fill="#d8dce8"/>
    <!-- Garagedeur achtergrond -->
    <rect x="60" y="20" width="500" height="240" fill="#c0c8d8"/>
    <!-- Garagedeur panelen -->
    <g fill="none" stroke="#a8b0c0" stroke-width="1.5">
      <rect x="68" y="28" width="484" height="48"/>
      <rect x="68" y="84" width="484" height="48"/>
      <rect x="68" y="140" width="484" height="48"/>
      <rect x="68" y="196" width="484" height="48"/>
    </g>
    <!-- Deur details (schaduw) -->
    <line x1="68" y1="28" x2="552" y2="28" stroke="#b0b8c8" stroke-width="2"/>
    <line x1="68" y1="84" x2="552" y2="84" stroke="#b0b8c8" stroke-width="2"/>
    <line x1="68" y1="140" x2="552" y2="140" stroke="#b0b8c8" stroke-width="2"/>
    <line x1="68" y1="196" x2="552" y2="196" stroke="#b0b8c8" stroke-width="2"/>
    <!-- Garage deur rails -->
    <rect x="58" y="20" width="8" height="240" rx="2" fill="#a0a8b8"/>
    <rect x="554" y="20" width="8" height="240" rx="2" fill="#a0a8b8"/>
    <!-- Betonnen vloer -->
    <rect x="0" y="295" width="800" height="55" fill="#b8bcc8"/>
    <line x1="0" y1="295" x2="800" y2="295" stroke="#a0a4b0" stroke-width="2.5"/>
    <!-- Vloer dilatatievoeg -->
    <line x1="400" y1="295" x2="400" y2="350" stroke="#a0a4b0" stroke-width="1.5" stroke-dasharray="none"/>
    <!-- Werkbank rechts -->
    <rect x="615" y="175" width="175" height="120" rx="4" fill="#8090a0"/>
    <rect x="615" y="170" width="175" height="12" rx="2" fill="#90a0b0"/>
    <!-- Muur rechts (zijde) -->
    <rect x="600" y="0" width="15" height="295" fill="#c8ccd8"/>
    <!-- TL-lamp -->
    <rect x="150" y="0" width="500" height="8" rx="3" fill="#d0d4e0"/>
    <rect x="160" y="8" width="480" height="6" rx="2" fill="#f8f8f0" opacity="0.9"/>
    <!-- Licht schijnsel -->
    <rect x="150" y="0" width="500" height="200" fill="url(#garage-light)" opacity="0.08"/>
    <defs>
      <linearGradient id="garage-light" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stop-color="#fffde0"/>
        <stop offset="100%" stop-color="#fffde0" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <!-- Gereedschapsbord achter werkbank -->
    <rect x="618" y="60" width="170" height="105" rx="2" fill="#788090" stroke="#606878" stroke-width="1"/>
    <!-- Gereedschap silhouetten (simpel) -->
    <rect x="630" y="70" width="5" height="40" rx="1" fill="#50606a"/>
    <rect x="643" y="72" width="5" height="38" rx="1" fill="#50606a"/>
    <ellipse cx="660" cy="82" rx="10" ry="6" fill="#50606a"/>
    <rect x="656" y="86" width="8" height="20" rx="1" fill="#50606a"/>
  </svg>`,
};

const KAMERS_DATA = {
  woonkamer: {
    label:"Woonkamer", emoji:"🛋️",
    intro:"Ontdek hoeveel energie jouw woonkamer-toestellen verbruiken.",
    toestellen:[
      { id:"wk_tv", label:"Televisie", emoji:"📺", icon:ICONS.tv,
        pos:{left:"8%",bottom:"28%"},
        parameters:[
          {id:"type",label:"Type televisie",type:"select",opties:[["LCD/LED (40–50\")",80],["OLED (50–60\")",120],["Plasma (oud)",200]]},
          {id:"uren",label:"Uren per dag",type:"number",min:0,max:24,stap:.5,eenheid:"uur"},
          {id:"sb",label:"Stand-by 's nachts?",type:"select",opties:[["Ja (+1W)",1],["Nee",0]]},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.uren||0)+(+p.sb||0)*24)/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Een gemiddeld gezin kijkt ~4 uur/dag tv, goed voor ±0,32 kWh/dag.",
        tips:["Zet de tv volledig uit i.p.v. stand-by.","Energielabel A verbruikt tot 50% minder.","Gebruik de slaaptimer.","Verlaag helderheid 20% = merkbaar minder."],
      },
      { id:"wk_verlichting", label:"Verlichting", emoji:"💡", icon:ICONS.lamp,
        pos:{left:"38%",top:"10%"},
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
      { id:"wk_laptop", label:"Laptop / PC", emoji:"💻", icon:ICONS.laptop,
        pos:{left:"62%",bottom:"28%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["Laptop (45W)",45],["Desktop (150W)",150],["Gaming PC (300W)",300]]},
          {id:"uren",label:"Uren per dag",type:"number",min:0,max:24,stap:.5,eenheid:"uur"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.uren||0))/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Een laptop verbruikt 4× minder dan een desktop PC.",
        tips:["Gebruik energiespaarstand.","Shutdown 's nachts volledig.","Laptop > desktop qua verbruik."],
      },
      { id:"wk_radio", label:"Stereo", emoji:"🎵", icon:ICONS.stereo,
        pos:{left:"82%",bottom:"30%"},
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
      { id:"kk_koelkast", label:"Koelkast", emoji:"🧊", icon:ICONS.koelkast,
        pos:{left:"6%",bottom:"26%"},
        parameters:[
          {id:"type",label:"Type koelkast",type:"select",opties:[["Compact (A++, 80kWh/j)",80],["Vrijstaand (A, 150kWh/j)",150],["+ vriezer (A++, 220kWh/j)",220],["Amerikaans (400kWh/j)",400]]},
          {id:"vul",label:"Vulling",type:"select",opties:[["Vol (+10%)",1.10],["Half vol",1.00],["Bijna leeg (-5%)",0.95]]},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.vul||1))/365)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Een koelkast loopt 24/7: ±0,22–1,1 kWh/dag afhankelijk van type.",
        tips:["Stel in op 4–5°C.","Laat warme gerechten eerst afkoelen.","Controleer deurrubbers."],
      },
      { id:"kk_vaatwasser", label:"Vaatwasser", emoji:"🍽️", icon:ICONS.vaatwasser,
        pos:{left:"30%",bottom:"26%"},
        parameters:[
          {id:"type",label:"Programma",type:"select",opties:[["Eco 50°C (0.8kWh)",0.8],["Normaal 65°C (1.2kWh)",1.2],["Intensief 70°C (1.6kWh)",1.6]]},
          {id:"keer",label:"Keer per dag",type:"number",min:0,max:5,stap:.5,eenheid:"keer"},
        ],
        berekenVerbruik(p){return Math.round((+p.type*(+p.keer||0))*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Eco-stand: 0,8 kWh/beurt — minder dan handwassen!",
        tips:["Eco-stand = tot 40% besparing.","Volladen voor aanzetten.","Droogfunctie uit."],
      },
      { id:"kk_microgolf", label:"Microgolf", emoji:"📡", icon:ICONS.microgolf,
        pos:{left:"57%",top:"10%"},
        parameters:[
          {id:"v",label:"Vermogen",type:"select",opties:[["700W",700],["900W",900],["1100W",1100]]},
          {id:"min",label:"Minuten/dag",type:"number",min:0,max:120,stap:1,eenheid:"min"},
        ],
        berekenVerbruik(p){return Math.round(((+p.v*(+p.min||0))/60/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"900W × 10 min/dag = ±0,15 kWh/dag.",
        tips:["2–5× zuiniger dan oven.","Juiste vermogensstand gebruiken."],
      },
      { id:"kk_oven", label:"Oven", emoji:"🫕", icon:ICONS.oven,
        pos:{left:"79%",bottom:"26%"},
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
      { id:"bk_droger", label:"Haardroger", emoji:"💨", icon:ICONS.haardroger,
        pos:{left:"10%",bottom:"26%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["600W – goedkoop",600],["1200W – normaal",1200],["2000W – pro",2000]]},
          {id:"min",label:"Minuten/dag",type:"number",min:0,max:60,stap:1,eenheid:"min"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.min||0))/60/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"1200W × 10 min/dag = ±0,2 kWh/dag.",
        tips:["Lagere stand = bijna even snel.","Microvezel-handdoek voor het drogen."],
      },
      { id:"bk_boiler", label:"Boiler", emoji:"🌡️", icon:ICONS.boiler,
        pos:{left:"45%",bottom:"26%"},
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
      { id:"bk_scheer", label:"Scheerapparaat", emoji:"🪒", icon:ICONS.scheerapparaat,
        pos:{left:"76%",top:"12%"},
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
      { id:"sk_lamp", label:"Verlichting", emoji:"🕯️", icon:ICONS.slaaplamp,
        pos:{left:"10%",top:"10%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["LED (8W)",8],["Nachtlampje (2W)",2],["Halogeenlamp (28W)",28]]},
          {id:"uren",label:"Uren/dag",type:"number",min:0,max:24,stap:.5,eenheid:"uur"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.uren||0))/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"LED nachtlampje: <0,05 kWh/nacht.",
        tips:["LED in de slaapkamer.","Timer of sensor is handig."],
      },
      { id:"sk_gsm", label:"Telefoon laden", emoji:"📱", icon:ICONS.gsm,
        pos:{left:"42%",bottom:"28%"},
        parameters:[
          {id:"type",label:"Oplader",type:"select",opties:[["Normaal (5W)",5],["Snellader (20W)",20],["Draadloos (15W)",15]]},
          {id:"uren",label:"Uren/dag",type:"number",min:0,max:12,stap:.5,eenheid:"uur"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.uren||0))/1000)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Smartphone laden: ±0,01–0,04 kWh/dag — relatief weinig.",
        tips:["Laad overdag op.","Kabelopladen > draadloos."],
      },
      { id:"sk_deken", label:"El. deken", emoji:"🛌", icon:ICONS.elektrische_deken,
        pos:{left:"68%",bottom:"28%"},
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
      { id:"bg_wm", label:"Wasmachine", emoji:"👕", icon:ICONS.wasmachine,
        pos:{left:"6%",bottom:"26%"},
        parameters:[
          {id:"label",label:"Energielabel",type:"select",opties:[["A-30% (0,36kWh/was)",0.36],["A (0,45kWh/was)",0.45],["B (0,51kWh/was)",0.51],["C (0,59kWh/was)",0.59],["D (0,69kWh/was)",0.69]]},
          {id:"cycli",label:"Wassen/week",type:"number",min:0,max:14,stap:1,eenheid:"keer"},
        ],
        berekenVerbruik(p){return Math.round(((+p.label*(+p.cycli||0))/7)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Gemiddeld 4–5 wassen/week. Ecostand spaart tot 30%.",
        tips:["Ecostand (40–60°C).","Volle trommel wassen.","30°C is voldoende voor normaal wasgoed."],
      },
      { id:"bg_droogkast", label:"Droogkast", emoji:"🌀", icon:ICONS.droogkast,
        pos:{left:"38%",bottom:"26%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["Condensdroogkast A (2kWh)",2.0],["Warmtepomp A+++ (1kWh)",1.0],["Oude droogkast (3.5kWh)",3.5]]},
          {id:"keer",label:"Beurten/week",type:"number",min:0,max:14,stap:1,eenheid:"keer"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.keer||0))/7)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Warmtepompdroogkast: 50% minder dan gewone droogkast.",
        tips:["Luchten is energievrij.","Bij vervanging: warmtepompdroogkast.","Goed centrifugeren vóór drogen."],
      },
      { id:"bg_stofzuiger", label:"Stofzuiger", emoji:"🔌", icon:ICONS.stofzuiger,
        pos:{left:"70%",bottom:"28%"},
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
      { id:"gr_eauto", label:"El. auto", emoji:"⚡", icon:ICONS.elektrische_auto,
        pos:{left:"6%",bottom:"26%"},
        parameters:[
          {id:"type",label:"Lader",type:"select",opties:[["Stopcontact (2.3kW)",2.3],["Wallbox (11kW)",11],["Snellader (22kW)",22]]},
          {id:"uren",label:"Uren/dag laden",type:"number",min:0,max:24,stap:.5,eenheid:"uur"},
        ],
        berekenVerbruik(p){return Math.round(((+p.type*(+p.uren||0)))*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"1 uur wallbox = ±11 kWh = ±70 km rijbereik.",
        tips:["Laad 's nachts bij daltarief.","Laad tot 80% voor dagelijks gebruik.","Zonnepanelen = goedkoper laden."],
      },
      { id:"gr_diepvriezer", label:"Diepvriezer", emoji:"🧊", icon:ICONS.diepvriezer,
        pos:{left:"40%",bottom:"26%"},
        parameters:[
          {id:"type",label:"Type",type:"select",opties:[["Klein 100L A++ (100kWh/j)",100],["Middelgroot 200L A+ (180kWh/j)",180],["Groot 300L A (280kWh/j)",280]]},
        ],
        berekenVerbruik(p){return Math.round(((+p.type)/365)*100)/100;},
        eenheid:"kWh per dag",
        gemiddelde:"Diepvriezer 200L (A+): ±0,49 kWh/dag.",
        tips:["Ontdooi regelmatig (max 5mm ijs).","Volle vriezer = efficiënter.","Niet naast warmtebron plaatsen."],
      },
      { id:"gr_verlichting", label:"Verlichting", emoji:"💡", icon:ICONS.garage_lamp,
        pos:{left:"74%",top:"10%"},
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
const berekeningen = {};

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

  wrap.classList.add("zooming");
  img.style.transition = "transform .55s cubic-bezier(.4,0,.2,1), filter .3s";
  img.style.transformOrigin = `${zoom.x}% ${zoom.y}%`;
  img.style.transform = `scale(${zoom.scale})`;
  img.style.filter = "brightness(1.05)";

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

  const img = document.getElementById("house-img");
  img.style.transition = "transform .5s cubic-bezier(.4,0,.2,1), filter .3s";
  img.style.transform = "scale(1)";
  img.style.filter = "";
  document.getElementById("house-wrap").classList.remove("zooming");

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

  const scene = document.getElementById("kamer-scene");
  scene.className = "kamer-scene " + kamerId;

  // SVG achtergrond injecteren
  const bgEl = document.getElementById("kamer-scene-bg");
  bgEl.className = "kamer-scene-bg " + kamerId;
  if (KAMER_SVG[kamerId]) {
    bgEl.innerHTML = KAMER_SVG[kamerId];
    bgEl.style.opacity = "1";
  } else {
    bgEl.innerHTML = "";
  }

  document.getElementById("kamer-floor").className = "kamer-floor " + kamerId;
  document.getElementById("room-label-badge").innerHTML = kamer.emoji + " " + kamer.label;

  // Verwijder oude appliances
  scene.querySelectorAll(".appliance-spot").forEach(e => e.remove());

  // Appliances plaatsen
  kamer.toestellen.forEach((t, i) => {
    const spot = document.createElement("div");
    spot.className = "appliance-spot";
    spot.style.cssText = Object.entries(t.pos).map(([k,v])=>`${k}:${v}`).join(";");
    spot.style.animationDelay = (i * 0.08) + "s";

    const kwh = berekeningen[t.id];
    const badge = kwh !== undefined
      ? `<div class="appliance-kwh-badge">${kwh} kWh/dag</div>`
      : `<div class="appliance-kwh-badge uncalc">klik om te meten</div>`;

    // Gebruik PNG icon als beschikbaar, anders emoji
    const iconHtml = t.icon
      ? `<img src="${ICON_BASE}${t.icon}" alt="${t.label}" class="appliance-img" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">`
        + `<span class="appliance-emoji" style="display:none">${t.emoji}</span>`
      : `<span class="appliance-emoji">${t.emoji}</span>`;

    spot.innerHTML = `
      <div class="appliance-bubble">
        ${iconHtml}
        <div class="appliance-name">${t.label}</div>
      </div>
      ${badge}
    `;
    spot.style.animation = `fadeSlideUp .35s ease ${i*0.08}s both`;
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

  // Icon in modal: PNG of emoji
  const modalIcon = document.getElementById("modal-icon");
  if (t.icon) {
    modalIcon.innerHTML = `<img src="${ICON_BASE}${t.icon}" alt="${t.label}" style="width:28px;height:28px;object-fit:contain;" onerror="this.parentElement.textContent='${t.emoji}'">`;
  } else {
    modalIcon.textContent = t.emoji;
  }

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