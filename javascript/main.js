import { initHouse, animatieNaarKamer, toonKamer, bijwerkTotaalBadge, bijwerkStatsStrip, initTariefPicker, loadLeveranciers } from './UI/house_view.js';
import { openToestel, initModalHandlers, berekenVerbruik, gebruikGemiddelde,  } from './UI/modal_view.js';

await loadLeveranciers();

// Koppel modal handlers zodat sluitModal() en toonStap() de kamer kunnen vernieuwen
initModalHandlers({
  toonKamerHandler: (id) => toonKamer(id, openToestel),
  bijwerkTotaalBadgeHandler: bijwerkTotaalBadge,
  bijwerkStatsStripHandler: bijwerkStatsStrip,
});

initHouse((kamerId) => animatieNaarKamer(kamerId, (id) => toonKamer(id, openToestel)));

bijwerkStatsStrip();
initTariefPicker();