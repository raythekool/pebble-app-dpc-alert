#include <pebble.h>
#include "dpc_alert_ui.h"

static Window *s_main_window;
static TextLayer *s_title_layer;
static TextLayer *s_level_layer;

static void prv_update_alert(const char *title, const char *level) {
  text_layer_set_text(s_title_layer, title ? title : "Nessun alert");
  text_layer_set_text(s_level_layer, level ? level : "");
}

static void inbox_received_callback(DictionaryIterator *iter, void *context) {
  Tuple *title_t = dict_find(iter, MESSAGE_KEY_ALERT_TITLE);
  Tuple *level_t = dict_find(iter, MESSAGE_KEY_ALERT_LEVEL);

  prv_update_alert(title_t ? title_t->value->cstring : NULL,
                   level_t ? level_t->value->cstring : NULL);
}

static void main_window_load(Window *window) {
  Layer *window_layer = window_get_root_layer(window);
  GRect bounds = layer_get_bounds(window_layer);

  s_title_layer = text_layer_create(GRect(4, 20, bounds.size.w - 8, 60));
  text_layer_set_font(s_title_layer, fonts_get_system_font(FONT_KEY_GOTHIC_24_BOLD));
  text_layer_set_text_alignment(s_title_layer, GTextAlignmentCenter);
  text_layer_set_text(s_title_layer, "Caricamento...");
  layer_add_child(window_layer, text_layer_get_layer(s_title_layer));

  s_level_layer = text_layer_create(GRect(4, 80, bounds.size.w - 8, 30));
  text_layer_set_font(s_level_layer, fonts_get_system_font(FONT_KEY_GOTHIC_18));
  text_layer_set_text_alignment(s_level_layer, GTextAlignmentCenter);
  layer_add_child(window_layer, text_layer_get_layer(s_level_layer));
}

static void main_window_unload(Window *window) {
  text_layer_destroy(s_title_layer);
  text_layer_destroy(s_level_layer);
}

void dpc_alert_ui_init(void) {
  s_main_window = window_create();
  window_set_window_handlers(s_main_window, (WindowHandlers) {
    .load = main_window_load,
    .unload = main_window_unload,
  });
  window_stack_push(s_main_window, true);

  app_message_register_inbox_received(inbox_received_callback);
  app_message_open(512, 64);
}

void dpc_alert_ui_deinit(void) {
  window_destroy(s_main_window);
}
