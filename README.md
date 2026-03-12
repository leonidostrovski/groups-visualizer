# AI-Generated Project Notice
This project was created entirely with the assistance of AI tools.

---

## Author & AI Transparency

This project was initiated and maintained by:

Email: leonidostrovski@gmail.com
Country: Israel

All source code, architecture, optimization, and documentation were generated with the assistance of AI tools.
Human work was applied for integration, testing, debugging, and verification.

---

# Groups Visualizer
A Home Assistant Lovelace Card for Visualizing Groups and Hierarchies
[![GitHub release](https://img.shields.io/github/v/release/leonidostrovski/groups-visualizer)](https://img.shields.io/github/v/release/leonidostrovski/groups-visualizer)

## Screenshots

![Example](screenshots/example.png)

`groups-visualizer` is an interactive Lovelace custom card that displays Home Assistant groups, switches, lights, fans, sensors, and hierarchical relationships as clean area-aware graph diagrams.

The card automatically reads:
- Entity relationships
- Areas and their voice aliases
- Entity registry (labels, aliases)
- Label registry
- Voice assistant names

and converts them into a zoomable, multi-layer DAG graph.

---

## What's New in v1.1.0

### Area Voice Assistant Block
Each area box now shows a dedicated **Area voice assistant** card — a unified block with a colored header and the area's voice aliases as clickable chips. Clicking any alias copies it to clipboard.

### Group Labels Card
Each group node now has a **Group Labels** mini-card with a colored header (blue when labels are assigned, gray when none). Labels are shown as colored chips inside the white content section.

### Group Voice Assistant Card
Each group node now has a **Group voice assistant** mini-card showing the entity's registry aliases (the real voice assistant names). The header is colored purple when aliases exist, gray when none. Voice names are larger and bold for readability, and each is clickable to copy.

### Improved Edge Visualization
The dashed orange "wraps" edge label pill (which previously overlapped node cards) has been replaced with a small dot at the midpoint — keeping the spatial relationship clear without obscuring content.

### Sensor Units in State Badges
Numeric sensor values now display their unit of measurement (e.g. `6.04 A`, `21.5 °C`) directly in the state badge and in entity rows inside node cards.

### Copy-on-Click for Area Elements
- Click the area name header → copies the area name
- Click a voice alias chip → copies the alias
- Pen icon → opens the area edit popup (pen icon only, not the whole header)

### UI Cleanup
- Removed `[W]` / `[S]` wrapper/switch indicators from node headers
- Consistent section styling across Labels and Voice cards
- Cleaner section headers (no more `[BRACKETS]` debug-style labels)

---

## Installation

### HACS Installation (Recommended)

1. Open Home Assistant.
2. Go to: **HACS > Frontend > Custom Repositories**.
3. Add this repository as a **Custom Repository** with category: "Lovelace".
4. Install **Groups Visualizer** from HACS.
5. Restart Home Assistant if required.

---

### Adding the Card to the Dashboard

1. Go to: **Settings > Dashboards**.
2. Select the dashboard where the card should appear.
3. Click the three-dots menu (top right) > **Edit Dashboard**.
4. Click **+ Add View**.
5. In "View Type", select: **Panel (single card)**.
6. Name the view, for example: `Groups Visualizer`.
7. Save the view.

Add the card:

1. Click **Add Card**.
2. Choose **Manual**.
3. Paste:

```yaml
type: custom:groups-visualizer
show_domains: {}
show_voice_labels: true
```

---

## Manual Installation (Alternative)

1. Download the latest release from GitHub.
2. Copy `dist/groups-visualizer.js` into:

```
/config/www/community/groups-visualizer/
```

3. Add this resource in Home Assistant:
   **Settings > Dashboards > (three dots) > Resources > Add Resource**

Resource URL:

```
/local/community/groups-visualizer/groups-visualizer.js
```

Type must be: **JavaScript Module**

4. Add the card manually to any dashboard:

```yaml
type: custom:groups-visualizer
show_domains: {}
show_voice_labels: true
```

---

## Features

### Graph Visualization
- Auto-generated graphs for groups and nested groups
- Cross-area edge routing with corridor separation
- Smooth edges and arrowheads
- Clickable ON/OFF state badges for lights, switches, fans and groups

### Area-Aware Layout
- Nodes grouped visually by Home Assistant Areas
- Styled area boxes with name pill, node count badge, and glow effects
- **Area voice assistant block** — voice aliases shown as chips inside each area box
- Automatic node height measurement
- Dagre compound hierarchical layout

### Node Cards
- Domain color-coded header (LIGHT, SWITCH, GROUP, FAN, SENSOR…)
- Gear icon → opens entity settings dialog
- Friendly name and entity ID (click to copy)
- State badge with live ON/OFF/sensor value + unit of measurement
- Member entity list with state badges (up to 10 shown)
- **Group Labels card** — colored chips for assigned HA labels
- **Group voice assistant card** — voice alias names (click to copy)

### Live Interaction
- Toggle entities directly from the graph (lights, switches, fans, groups)
- Click-to-copy: entity ID, friendly name, voice aliases, area name, area aliases
- Area pen icon → opens area edit popup with entity list and link to area settings
- Automatic state refresh on every hass update (no full rebuild needed)

### User Interface
- Tabs by domain (Lights, Switches, Groups, etc.)
- Sub-tabs for each root group
- Rebuild / Full Rebuild buttons
- Timestamp of last data fetch

---

## Project File Structure

```
groups-visualizer/
├── dist/
│   └── groups-visualizer.js
├── src/
│   ├── index.js              # Main Lovelace card (UI, tabs, rebuild)
│   ├── card-styles.js        # All card styles
│   ├── card-data.js          # Loads states, registries, builds tab structure
│   ├── card-actions.js       # Rendering and state refresh
│   ├── ha-api.js             # Entity utilities and helpers
│   ├── ha-node-table.js      # Node HTML generator
│   ├── graph-layout.js       # Dagre layout generator
│   ├── graph-render.js       # SVG rendering engine
│   ├── graph-measure.js      # DOM height measurement engine
│   └── constants.js          # Shared constants
├── hacs.json
├── LICENSE
├── package.json
└── README.md
```

---

## License

This project is licensed under the MIT License.
See the included `LICENSE` file for full details.

---

# Final AI-Generated Notice

This project — including code, structure, and documentation — was generated with the assistance of AI tools.
