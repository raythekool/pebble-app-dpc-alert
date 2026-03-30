#include <pebble.h>
#include "dpc_alert_ui.h"

static void init(void) {
  dpc_alert_ui_init();
}

static void deinit(void) {
  dpc_alert_ui_deinit();
}

int main(void) {
  init();
  app_event_loop();
  deinit();
}
