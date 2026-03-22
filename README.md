# Groups Visualizer

A Home Assistant Lovelace Card for Visualizing Groups and Hierarchies

**Repository:** https://github.com/leonidostrovski/groups-visualizer

## Overview

Groups Visualizer transforms smart home group hierarchies into interactive visual graphs. The tool displays all groups, subgroups, lights, switches, fans, and sensors in a single map view, with automatic organization by Home Assistant Area.

## Key Capabilities

- Nodes automatically organized by Home Assistant Area — each area shown as a distinct visual block
- Area voice assistant names displayed directly on the area block
- Group voice assistant names shown on every group node
- Click-to-toggle entities and click-to-copy functionality for entity IDs and voice names
- Complete group connection visualization
- **Used in Automations** — each group node shows which automations reference it, with count badges (×N when used multiple times) and section badges (trigger / condition / action)
- **Voice exposure warning** — groups with voice aliases that are not exposed to any voice assistant display a clear alert
- **Open automation in new tab** — pencil icon on each automation entry opens the automation editor directly in a new browser tab

## Installation Methods

**HACS Installation (Recommended):**
Search for "Groups Visualizer" within HACS and install directly.

**Manual Installation:**
1. Download the latest release from GitHub
2. Place `groups-visualizer.js` in `/config/www/groups-visualizer/`
3. Register the resource at Settings → Dashboards → Resources
4. Add the card with appropriate YAML configuration

## Core Features

The visualization includes graph auto-generation, area-aware layout with styled boxes, domain color-coded node cards, and live entity toggling. The interface organizes content through domain tabs and sub-tabs for root groups, with Rebuild / Full Rebuild buttons and fetch timestamps.

## Attribution

Initiated and maintained by Leonid Ostrovski. Source code, architecture, and documentation generated with AI assistance. Human effort focused on integration, testing, debugging, and verification.

**License:** MIT License
