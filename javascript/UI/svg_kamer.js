
/* ===================================================
   SVG KAMER ACHTERGRONDEN
   Elke kamer heeft een inline SVG als decoratieve achtergrond.
   viewBox: 800x350 (past bij aspect-ratio 16/7 van .kamer-scene)
=================================================== */
export const KAMER_SVG = {
 
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
 