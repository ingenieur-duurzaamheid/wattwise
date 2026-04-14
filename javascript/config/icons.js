/* ===================================================
   ICON MAPPING – relatief pad naar de PNG-icons map
   Pas het pad aan naar jullie mappenstructuur.
   Verwacht formaat: ../icons/appliances/NNN-naam.png
=================================================== */



export const ICON_BASE = '../icons/png/';
export const ICONS = {
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
