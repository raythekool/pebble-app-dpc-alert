/* global Pebble */

// Stub per l'invio di PIN alla timeline Rebble.
// Per i dettagli vedi: https://developer.rebble.io/guides/pebble-timeline/timeline-public/

var Timeline = (function() {
  function sendPin(alert, userToken) {
    var pin = {
      id: 'dpc-alert-' + alert.id,
      time: alert.start,
      layout: {
        type: 'genericPin',
        title: alert.title,
        body: alert.description || '',
        tinyIcon: 'system://images/NOTIFICATION_FLAG'
      }
    };

    console.log('TODO: inviare PIN alla timeline Rebble', JSON.stringify(pin));

    // Esempio di chiamata (da spostare lato backend se preferisci):
    // var xhr = new XMLHttpRequest();
    // xhr.open('PUT', 'https://timeline-api.rebble.io/v1/user/pins/' + encodeURIComponent(pin.id));
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.setRequestHeader('X-User-Token', userToken);
    // xhr.send(JSON.stringify(pin));
  }

  return {
    sendPin: sendPin
  };
})();
