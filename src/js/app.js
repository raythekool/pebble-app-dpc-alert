/* global Pebble */

var CONFIG = {
  region: null,
  severityMin: null,
  apiBaseUrl: null // e.g. https://your-ha-instance.example.com
};

function log() {
  console.log.apply(console, arguments);
}

function sendAlertToWatch(alert) {
  var dict = {
    'ALERT_TITLE': alert.title || 'Nessun alert',
    'ALERT_LEVEL': alert.level || '',
    'ALERT_DESCRIPTION': alert.description || '',
    'ALERT_START': alert.start || '',
    'ALERT_END': alert.end || ''
  };
  Pebble.sendAppMessage(dict, function() {
    log('Alert inviato alla watchapp');
  }, function(e) {
    log('Errore invio alert', e);
  });
}

function fetchLatestAlert() {
  if (!CONFIG.apiBaseUrl) {
    log('apiBaseUrl non configurato');
    return;
  }

  // Qui ti allinei al backend che già usi per ha-awtrix-dpc-alert
  var url = CONFIG.apiBaseUrl + '/dpc-alert/latest';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        var data = JSON.parse(xhr.responseText);
        sendAlertToWatch({
          title: data.title,
          level: data.level,
          description: data.description,
          start: data.start,
          end: data.end
        });
      } catch (e) {
        log('Errore parsing JSON', e);
      }
    } else {
      log('HTTP error', xhr.status);
    }
  };
  xhr.onerror = function(e) {
    log('Errore rete', e);
  };
  xhr.send();
}

Pebble.addEventListener('ready', function() {
  log('JS pronto, richiedo alert');
  fetchLatestAlert();
});

Pebble.addEventListener('appmessage', function(e) {
  log('AppMessage dalla watch', e.payload);
});
