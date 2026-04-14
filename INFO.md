1. Algemene structuur

De applicatie is opgebouwd uit drie lagen:



Frontend (structuur en styling)

&#x09;index.html
	style4.css



JavaScript (logica)

&#x20;main.js          → centrale samenkoming van alle JS files

/UI

&#x20; ├── house\_view.js   → visualisatie huis + kamers + zoom

&#x20; ├── modal\_view.js   → toestel modal + berekening



/state

&#x20; └── app\_state.js    → globale state



/data

&#x20; ├── kamer\_data.js  -> alle informatie rond parameters van appliances

&#x20; ├── appliance\_kwh.js  -> gemiddelde ADEME db (MOET GECHECKT WORDEN EN VIA CSV)

&#x20; ├── svg\_kamer.js   ->tekeningen zelf gemaakt via svg voor achtergrond in elke kamer\_data



/config

&#x20; ├── app\_config.js       -> positie kamers

&#x20; ├── icons.js            -> icon mapping 

&#x09;

De modules worden geïmporteerd in main.js, waar alles samenkomt en wordt aangestuurd.



!!! Samenbrengen van alle files in main.js adv export variabelen
!!! Onderaan functies in main.js met "window.naamfunctie"









2\. Werking van de applicatie

2.1 Kamerweergave

De functie toonKamer(kamerId):



toont titel en beschrijving van de kamer

laadt een SVG-achtergrond

genereert alle toestellen in de kamer



De toestellen komen uit de datastructuur KAMERS\_DATA.





3.2 Toestellen

Voor elk toestel wordt dynamisch een element toegevoegd met:



positie in de kamer

icoon of emoji

naam

huidige berekening (indien beschikbaar)

(ZIE KAMER\_DATA)



Klikken op een toestel opent een modal.



3.4 Modal (interactie per toestel)

De modal bevat drie stappen:



Parameters invullen

Resultaat bekijken

Tips en informatie



De gebruiker kan kiezen tussen:



eigen gegevens invoeren

gemiddelde waarden gebruiken (ADEME-data)





3.5 Berekeningen

Elke appliance heeft een eigen functie:



berekenVerbruik(p) in KAMER\_DATA



Deze functie:

gebruikt de ingevulde parameters

berekent het verbruik in kWh per dag

geeft een afgerond resultaat terug



De resultaten worden opgeslagen in een globale variabele (berekeningen) en opnieuw gebruikt in de UI.







