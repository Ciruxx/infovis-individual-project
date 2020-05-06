# Dynamic Rect

## Informazioni tecniche

Il progetto è stato sviluppato con il framework [React.js](https://it.reactjs.org/) e ovviamente [D3.js](https://d3js.org/).

Tutti i path specificati in questo README.md sono relativi alla root di questo progetto.
 
Per avviare questo progetto è necessario installare [Node.js](https://nodejs.org/it/) e [NPM](https://www.npmjs.com/), 
per entrambi basta seguire questa [guida ufficiale](https://nodejs.org/it/download/).

## Struttura del progetto

Dal punto di vista del progetto sono interessanti: 
 - Il file `./src/components/d3/charts/RectsChart.js`
    - Il quale contiene il codice D3.js rilevante ai fini di questo progetto.
 - La cartella `./src/data`
    - La cartella che contiene i dati iniziali.

### Struttura del componente RectsChart

RectsChart.js è una classe Javascript che estende un componente React.

I metodi della classe sono i seguenti: 
 - `constructor`
    - Il costruttore della classe, vengono inizializzate tutte le variabili globali.
 - `draw`
    - Questo metodo inizializza D3.js con le informazioni prese dai dati iniziali, viene eseguito solo quando il componente 
    viene inizializzato.
 - `handleClick`
    - Questo metodo intercetta il click sinistro e il click destro e chiama il metodo `update` con i giusti input
 - `update`
    - Questo metodo aggiorna tutte le rect D3.js con le nuove informazioni, vengono passati in input due parametri:
        - baseCharacteristic
            - Può essere x o y, a seconda del click del mouse.
        - changeCharacteristic
            - Può essere una qualsiasi delle caratteristiche di una rect.
 - `getRandomColor`
    - Questo metodo restituisce un colore random =)

## Test

**Solo la prima volta** che si scarica questo repository bisogna installare le dipendenze: 

### `npm install`

Nella root del progetto puoi avviare l'app con il comando:

### `npm start`

Questo comando avvia l'app in modalità development.

Apri [http://localhost:3000](http://localhost:3000) sul tuo browser per accedere all'app.

La pagina si ricaricherà automaticamente se fai una modifica al codice, gli eventuali errori verranno stampati sulla console.