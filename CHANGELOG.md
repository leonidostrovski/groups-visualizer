# Changelog
All notable changes to this project will be documented in this file.

This project follows semantic versioning: MAJOR.MINOR.PATCH

---

## [1.1.2] - 2026-03-15

### Added
- **Hidden entity badge** — groups that are hidden in the HA entity registry now display a `Hidden` badge (with eye-off icon) inline in the domain header row. Hovering shows a tooltip explaining the impact: hidden entities are excluded from auto-populated dashboards and area/label references, but their history is still tracked and they remain actionable.
- **Voice exposure section** — each group node now shows a "Voice exposure" mini-card listing which voice assistants (Alexa, Google, HA Voice/Conversation) the entity is exposed to. Exposed assistants are shown in full teal; non-exposed assistants are shown at reduced opacity.
- **Voice assistant alias fix for wrapper pairs** — for light/switch wrapper pairs (e.g. `light.X` backed by `switch.X`), voice assistant aliases are now merged from both the light entity and its paired switch entity, so aliases set on either side are always displayed.
- **Wrapper light alias fetch fix** — alias data is now fetched for wrapper light entities even when their platform is not `group`, preventing "None" from appearing for groups that have voice aliases configured.

### Fixed
- Alexa voice exposure chip now renders correctly using `mdi:microphone` (the `mdi:amazon-alexa` icon is not bundled in HA's icon set and caused the chip label to appear missing).
- Voice exposure chip background color now consistently matches the "Voice exposure" section header (`#00695C` teal) for all assistants.

---

## [1.1.1] - 2026-02-xx

### Added
- Member-list cache (localStorage) so group hierarchy is preserved even when all member entities are unavailable.
- Wrapper-pair alias merging: voice aliases from the paired switch entity are shown on the light node.

### Fixed
- Area registry alias fetch for HA versions that omit the `aliases` field from `area_registry/list`.

---

## [1.1.0] - 2026-01-xx

### Added
- Area voice assistant aliases shown as chips inside area boxes.
- Group voice assistant section in each node card showing entity registry aliases.
- Group Labels section in each node card showing HA entity labels with their configured colors.
- Pencil/edit icon in area name header for quick navigation.
- Node count badge on area boxes.

### Changed
- Improved area box two-pass badge rendering for correct right-alignment.

---

## [1.0.0] - Initial Release
- First public release of Groups Visualizer.
- Full graph layout engine using Dagre.
- Area-aware rendering with clusters and labels.
- Wrapper-pair (light <-> switch) detection.
- Automatic node height measurement.
- Live ON/OFF toggle badges.
- Copy-to-clipboard for entity ID, name, alias, and voice label.
- Multi-tab and sub-tab support.
- Rebuild and Full Rebuild functions.
- Vite build with stable, hash, and versioned outputs.
- MIT license included.
