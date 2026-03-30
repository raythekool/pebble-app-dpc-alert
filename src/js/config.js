/* global Pebble */

// Stub per gestione configurazione da app Pebble
// Qui in futuro aprirai una pagina web (es. GitHub Pages) che salverà:
// - URL Home Assistant / backend
// - Token di accesso
// - Regione DPC
// - Livello minimo di allerta

var CONFIG_URL = 'https://example.com/pebble-dpc-config.html';

Pebble.addEventListener('showConfiguration', function() {
  Pebble.openURL(CONFIG_URL);
});

Pebble.addEventListener('webviewclosed', function(e) {
  if (!e || !e.response) {
    return;
  }
  try {
    var config = JSON.parse(decodeURIComponent(e.response));
    localStorage.setItem('config', JSON.stringify(config));

    Pebble.sendAppMessage({
      'CONFIG_REGION': config.region,
      'CONFIG_SEVERITY_MIN': config.severityMin
    });
  } catch (err) {
    console.log('Errore parsing config', err);
  }
});
