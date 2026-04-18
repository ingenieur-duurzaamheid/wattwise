export let huidigKamer = null;
export let huidigToestel = null;
export const berekeningen = {};

export let huidigTarief = 0.28;
export function setTarief(val) {
  const n = parseFloat(val);
  if (!isNaN(n) && n > 0) huidigTarief = Math.round(n * 1000) / 1000;
}

export function setHuidigKamer(val) {
  huidigKamer = val;
}

export function setHuidigToestel(val) {
  huidigToestel = val;
}

export function resetNavigatie() {
  huidigKamer = null;
  huidigToestel = null;
}

export function getTarief() { return huidigTarief; }
export function getHuidigKamer() { return huidigKamer; }
export function getHuidigToestel() { return huidigToestel; }


window.resetNavigatie = resetNavigatie;
window.setHuidigKamer = setHuidigKamer;
window.setHuidigToestel = setHuidigToestel  