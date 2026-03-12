# Changelog
All notable changes to this project will be documented in this file.

This project follows semantic versioning: MAJOR.MINOR.PATCH

---

## [1.1.0] - 2026-03-12

### Added
- **Area voice assistant block** — each area box now shows a unified card with a colored header and the area's voice aliases as clickable chips (click to copy).
- **Group Labels card** — mini-card in each node with a colored header (blue when labels exist, gray when none); label chips shown in white content section.
- **Group voice assistant card** — mini-card in each node showing entity registry aliases as the voice assistant names; header colored purple when aliases exist, gray when none; names are large, bold, and click-to-copy.
- **Sensor units in state badges** — numeric sensor values now show their unit of measurement (e.g. `6.04 A`, `21.5 °C`) in state badges and entity rows.
- **Copy-on-click for area elements** — clicking the area name copies it; clicking a voice alias chip copies the alias; pen icon opens the area edit popup.

### Changed
- Area name header click now copies the area name (previously opened the edit popup); only the pen icon opens the popup.
- "Wraps" edge label pill replaced with a small dot at the midpoint — no longer overlaps node cards.
- Section headers redesigned — removed `[BRACKETS]` debug-style labels; replaced with clean mini-card style headers.
- Labels and voice assistant sections now use consistent mini-card layout matching the area voice block style.
- "Area voice asst." and "Group voice asst." renamed to full "Area voice assistant" and "Group voice assistant".

### Removed
- `[W]` / `[S]` wrapper/switch indicators from node domain headers.
- Separate "Aliases" row from node cards — merged into the Group voice assistant card.
- Area information from node cards — area details are now shown exclusively in area rectangle boxes.

---

## [1.0.0] - 2026-02-22

### Added
- First public release of Groups Visualizer.
- Full graph layout engine using Dagre.
- Area-aware rendering with clusters and labels.
- Wrapper-pair (light → switch) detection.
- Automatic node height measurement.
- Live ON/OFF toggle badges.
- Copy-to-clipboard for entity ID, name, alias, and voice label.
- Multi-tab and sub-tab support.
- Rebuild and Full Rebuild functions.
- Vite build with stable output.
- MIT license included.

---

## [Unreleased]
- Additional improvements will appear here after future updates.
