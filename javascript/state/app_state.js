export let huidigKamer = null;
export let huidigToestel = null;
export const berekeningen = {};

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

export function getHuidigKamer() { return huidigKamer; }
export function getHuidigToestel() { return huidigToestel; }


window.resetNavigatie = resetNavigatie;
window.setHuidigKamer = setHuidigKamer;
window.setHuidigToestel = setHuidigToestel  