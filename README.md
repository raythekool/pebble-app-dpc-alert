# pebble-app-dpc-alert

Pebble app that shows Protezione Civile (DPC) alerts from Home Assistant and can push them as pins to the Pebble / Rebble timeline.

## Overview

- Uses the Home Assistant custom component [DPC Alert](https://github.com/caiosweet/Home-Assistant-custom-components-DPC-Alert) to get Civil Protection alerts as HA entities.[web:40]
- Reuses the same data model and configuration concepts you already use in [ha-awtrix-dpc-alert](https://github.com/raythekool/ha-awtrix-dpc-alert) (region, minimum level, etc.).[cite:56]
- Pebble watchapp written in C + PebbleKit JS for talking to Home Assistant and eventually pushing timeline pins via the Rebble timeline API.[web:41][web:43]

This repository currently contains a clean SDK 4 project scaffolding and placeholder code. You can build on top of it to implement the full logic.

## Requirements

- Pebble SDK 4 (Rebble/Core Devices) installed locally.
- A Pebble Time / Pebble Time 2 (or emulator).
- A reachable Home Assistant instance with the DPC Alert integration configured.

## Project layout

- `package.json` – Pebble app metadata and configuration.
- `wscript` – Pebble SDK build script.
- `src/` – C source code for the watch app UI and logic.
- `src/js/` – PebbleKit JS files for HTTP calls to Home Assistant and timeline pin creation.
- `resources/` – Images and other static assets.
- `docs/` – Additional documentation (e.g. setup instructions).

## Next steps

- Implement the real HTTP endpoint towards Home Assistant (similar to what you do in `ha-awtrix-dpc-alert`).[cite:56][web:40]
- Implement a config web page to let the user set HA URL, token, region and minimum alert level.
- Wire up the Rebble timeline API to create user pins when new critical alerts are detected.[web:41][web:51]
