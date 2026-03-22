# Groups Visualizer
http://github.com/leonidostrovski/groups-visualizer

A Home Assistant Lovelace Card for Visualizing Groups and Hierarchies

[![GitHub release](https://img.shields.io/github/v/release/leonidostrovski/groups-visualizer)](https://github.com/leonidostrovski/groups-visualizer/releases/latest)

Groups Visualizer helps you understand your Home Assistant setup at a glance.

As your smart home grows, groups, rooms, voice names, and automations quickly become hard to follow. What looks simple at first can turn into guesswork later — especially when something stops working the way you expect.

Groups Visualizer turns that complexity into a clear visual map. You can instantly see how your groups are connected, where each group belongs, how it is named for voice control, and where it is being used in automations.

Instead of digging through menus, YAML, and settings screens, you get one place to understand the structure of your home. That makes it easier to spot mistakes, clean up old setups, and build a smarter system with confidence.

---

## Screenshots
![Demo](screenshots/groups-visualizer-demo.gif)
---

## Installation

### HACS (Recommended)

1. In Home Assistant, open **HACS**
2. Search for **Groups Visualizer** and install it

---

### Adding the Card to the Dashboard

1. Go to **Settings → Dashboards**
2. Select the dashboard where the card should appear
3. Click the three-dots menu (top right) → **Edit Dashboard**
4. Click **+ Add View**
5. In "View Type", select **Panel (single card)**
6. Name the view, for example: `Groups Visualizer`
7. Save the view

Add the card to the new view:

1. Click **Add Card**
2. Select **Manual**
3. Paste:

```yaml
type: custom:groups-visualizer
show_domains: {}
show_voice_labels: true
```
<details>
<summary>Troubleshooting: card not loading?</summary>

Hard-refresh your browser (Ctrl+Shift+R / Cmd+Shift+R) if the card doesn't appear

Check that the resource was registered automatically:
**Settings → Dashboards → (three dots) → Resources**

You should see an entry like:
```
/hacsfiles/groups-visualizer/groups-visualizer.js?hacstag=...
```

If it's missing, try reinstalling via HACS or adding it manually.
</details>

---

### Manual Installation (Alternative)

1. Download the latest release from GitHub
2. Copy `groups-visualizer.js` into:

```
/config/www/groups-visualizer/
```

3. Add a resource in Home Assistant:
   **Settings → Dashboards → (three dots) → Resources → Add Resource**

   Resource URL:
   ```
   /local/groups-visualizer/groups-visualizer.js
   ```
   Type: **JavaScript Module**

4. Add the card to any dashboard:

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
  
## Node cards

Each node in the graph is rendered as a compact “card” that surfaces the most important information about a single Home Assistant entity at a glance.

A node card typically includes:

- **Header row** – Friendly name and domain badge (e.g. light, switch, sensor), with a subtle background color per domain.
- **Entity ID** – The full `entity_id` shown under the title to make copy‑paste into YAML easy.
- **State row** – Current state (e.g. `on` / `off` / numeric value) with color highlighting so you can visually scan which entities are active.
- **Area row** – The assigned Area name, displayed with a dedicated style and 📍 icon when available, or an explicit “No area” indicator when missing.
- **Voice assistant aliases** – Up to a few aliases used by voice assistants, shown with a 🎤 icon; additional aliases are collapsed behind a `+N more` indicator.
- **Labels / tags** – Home Assistant labels for the entity, rendered as small 🏷️ pills to help you spot groups of related entities.
- **Statistics row** – Per‑node stats such as number of direct children, total descendants, and depth inside the tree, which helps identify oversized or deeply nested groups.

All metadata (area, labels, voice aliases) is read from Home Assistant’s registries at render time, so changes in Settings are reflected automatically without rebuilding the graph. When a field is not set for a given entity, the row stays visible with a neutral “none” state instead of disappearing, which makes it easy to see what is missing from your configuration.

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

## Author & AI Transparency

This project was initiated and maintained by:

Email: leonidostrovski@gmail.com
Country: Israel

All source code, architecture, optimization, and documentation were generated with the assistance of AI tools.
Human work was applied for integration, testing, debugging, and verification.

---

## License

This project is licensed under the MIT License.
See the included `LICENSE` file for full details.

---
