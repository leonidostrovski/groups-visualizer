import { GroupsGraph } from './graph.js';

/**
 * Refresh all visible state badges without full rebuild
 */
export function refreshStates(shadowRoot, hass) {
  if (!hass || !shadowRoot) return;
  shadowRoot.querySelectorAll('[data-state-badge]').forEach(el => {
    const eid = el.getAttribute('data-entity-id');
    if (!eid) return;
    const entity = hass.states[eid];
    if (!entity) return;

    const rawState = entity.state || 'unknown';
    const state    = rawState.toLowerCase();
    const unit     = (el.getAttribute('data-unit') || '').trim();
    const isNum    = unit && !isNaN(parseFloat(rawState));
    const text = state === 'on'  ? 'ON'
      : state === 'off' ? 'OFF'
      : isNum           ? `${rawState} ${unit}`
      : rawState.substring(0, 8).toUpperCase();
    const bg = state === 'on' ? '#4CAF50'
      : state === 'off' ? '#9E9E9E'
      : '#2196F3';

    if (el.textContent.trim() !== text) el.textContent = text;
    if (el.style.background !== bg) el.style.background = bg;
  });
}

/**
 * Render a single root tree into its container div
 *
 * NOTE: We now safely handle tab switches:
 * - If a cached graph exists BUT the current container is empty (new DOM),
 *   we drop the cache and rebuild into the new container.
 * - If the container already has content for this graph, we no-op.
 */
export function renderGraph(
  entity_id,
  shadowRoot,
  lookup,
  pairs,
  group_ids,
  show_voice_labels,
  registry,
  graphCache
) {
  if (!entity_id) return;

  const container = shadowRoot?.querySelector(`#graph-${CSS.escape(entity_id)}`);
  if (!container) return;

  // If graph was cached but the container is empty (new DOM after tab change),
  // drop cache so we can rebuild into the new container.
  if (graphCache && graphCache[entity_id]) {
    if (container.childElementCount === 0) {
      delete graphCache[entity_id];
    } else {
      // Already rendered into this container; nothing to do
      return;
    }
  }

  container.innerHTML = '';

  const w =
    container.parentElement?.clientWidth ||
    window.innerWidth ||
    1400;

  const root_entity = lookup[entity_id];
  if (!root_entity) return;

  const graph = new GroupsGraph(container, w);
  graph.build_graph(
    [root_entity],
    lookup,
    pairs,
    group_ids,
    show_voice_labels,
    registry
  );
  const { svgWidth, svgHeight } = graph.render();

  container.style.width = svgWidth + 'px';
  container.style.height = svgHeight + 'px';

  graphCache[entity_id] = graph;
}

/**
 * Count all nodes in a root tree recursively
 */
export function countNodes(root, pairs, lookup, group_ids) {
  const visited = new Set();
  const walk = (entity) => {
    const id = entity.entity_id;
    if (visited.has(id)) return 0;
    visited.add(id);

    let n = 1;

    if (pairs[id]) {
      const sw = lookup[pairs[id]];
      if (sw) n += walk(sw);
    }

    const attrs = entity.attributes || {};
    const members = Array.isArray(attrs.entity_id) ? attrs.entity_id
      : Array.isArray(attrs.lights) ? attrs.lights : [];

    members.forEach(mid => {
      if (group_ids.has(mid) && lookup[mid]) n += walk(lookup[mid]);
    });

    return n;
  };
  return walk(root);
}