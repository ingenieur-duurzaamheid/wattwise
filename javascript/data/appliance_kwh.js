/* ── ADEME GEMIDDELDEN (kWh/dag, n=500 Franse huishoudens) ── */

export const ADEME = {
  tv:           { kwh: 1.125, label: "TV (ADEME, 500 huishoudens)" },
  verlichting:  { kwh: 1.116, label: "Verlichting (ADEME)" },
  computer:     { kwh: 1.124, label: "Computer/laptop (ADEME)" },
  koelkast:     { kwh: 0.307, label: "Koelkast (ADEME)" },
  vaatwasser:   { kwh: 1.130, label: "Vaatwasser (ADEME)" },
  microgolf:    { kwh: 1.128, label: "Microgolf (ADEME)" },
  oven:         { kwh: 1.133, label: "Oven (ADEME)" },
  wasmachine:   { kwh: 1.131, label: "Wasmachine (ADEME)" },
  // Niet in ADEME → eigen schattingen op basis van literatuur
  waterkoker:   { kwh: 0.10,  label: "Waterkoker (schatting literatuur)" },
  haardroger:   { kwh: 0.20,  label: "Haardroger (schatting literatuur)" },
  boiler:       { kwh: 3.50,  label: "Boiler (schatting literatuur)" },
  droogkast:    { kwh: 0.71,  label: "Droogkast (schatting literatuur)" },
  stofzuiger:   { kwh: 0.15,  label: "Stofzuiger (schatting literatuur)" },
  ev_lader:     { kwh: 8.50,  label: "EV-lader (schatting literatuur)" },
  ebike_lader:  { kwh: 0.12,  label: "E-bike lader (schatting literatuur)" },
  slaaplamp:    { kwh: 0.05,  label: "Slaapkamerlamp (schatting literatuur)" },
  gsm:          { kwh: 0.02,  label: "GSM opladen (schatting literatuur)" },
  el_deken:     { kwh: 0.48,  label: "Elektrische deken (schatting literatuur)" },
  scheerapparaat:{ kwh: 0.002, label: "Scheerapparaat (schatting literatuur)" },
  radio:        { kwh: 0.04,  label: "Radio/stereo (schatting literatuur)" },
};


/* ── ENERGIELABEL HELPERS ── */
// kWh/cyclus per label (EU-normering, eco 40–60°)
export const WM_LABELS = {
  "A-30%": 0.36, "A-20%": 0.37, "A-10%": 0.41,
  "A": 0.45, "B": 0.51, "C": 0.59, "D": 0.69, "E": 0.78,
};
// kWh/jaar per label voor koelkasten (kastmodel ~300L)
export const KOEL_LABELS = {
  "A": 150, "B": 200, "C": 260, "D": 330, "E": 400, "F": 500, "G": 600,
};
export const LABEL_KLEUREN = {
  "A-30%":"#007a33","A-20%":"#1a9e40","A-10%":"#2eb84d",
  "A":"#3dcf5a","B":"#8bc34a","C":"#cddc39",
  "D":"#ffeb3b","E":"#ff9800","F":"#ff5722","G":"#d32f2f",
};
 