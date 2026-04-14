import { initHouse, animatieNaarKamer, toonKamer, bijwerkTotaalBadge } from './UI/house_view.js';
import { openToestel, initModalHandlers, berekenVerbruik, gebruikGemiddelde,  } from './UI/modal_view.js';

// Koppel modal handlers zodat sluitModal() en toonStap() de kamer kunnen vernieuwen
initModalHandlers({
  toonKamerHandler: (id) => toonKamer(id, openToestel),
  bijwerkTotaalBadgeHandler: bijwerkTotaalBadge,
});

initHouse((kamerId) => animatieNaarKamer(kamerId, (id) => toonKamer(id, openToestel)));

