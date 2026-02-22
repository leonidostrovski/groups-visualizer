import { detectWrapperPairs, get_tab_category } from './ha-api.js';

// Fetch one WS call safely — returns [] on failure
async function _ws(hass, type) {
  try {
    const result = await hass.callWS({ type });
    return Array.isArray(result) ? result : [];
  } catch (e) {
    console.warn(`[groups-visualizer] WS ${type} failed:`, e);
    return [];
  }
}

// Fetch all states + registries in parallel, return structured data
export async function fetchAllData(hass) {
  const [all_states, entity_list, area_list, label_list] = await Promise.all([
    _ws(hass, 'get_states'),
    _ws(hass, 'config/entity_registry/list'),
    _ws(hass, 'config/area_registry/list'),
    _ws(hass, 'config/label_registry/list')
  ]);

  // Convert arrays to keyed dictionaries
  const entities = {};
  entity_list.forEach(e => { if (e.entity_id) entities[e.entity_id] = e; });

  const areas = {};
  area_list.forEach(a => { if (a.area_id) areas[a.area_id] = a; });

  const labels = {};
  label_list.forEach(l => { if (l.label_id) labels[l.label_id] = l; });

  const registry = { entities, areas, labels };

  const { roots, pairs, lookup, group_ids } = detectWrapperPairs(all_states);

  return { roots, pairs, lookup, group_ids, registry };
}

// Group roots by domain tab category, respecting config filter
export function buildTabs(roots, config) {
  const show_domains = config?.show_domains || {};
  const filtered = roots.filter(r => {
    const domain = r.entity_id.split('.')[0];
    return Object.keys(show_domains).length === 0 || show_domains[domain] === true;
  });

  const tabs = {};
  filtered.forEach(root => {
    const cat = get_tab_category(root);
    if (!tabs[cat]) tabs[cat] = [];
    tabs[cat].push(root);
  });
  return tabs;
}

// Build { category: first_entity_id } map, preserving existing valid selections
export function buildSubTabs(tabs, prevSubTabs) {
  const result = {};
  Object.entries(tabs).forEach(([cat, roots_list]) => {
    const existing   = prevSubTabs[cat];
    const stillValid = existing && roots_list.find(r => r.entity_id === existing);
    result[cat]      = stillValid ? existing : roots_list[0]?.entity_id;
  });
  return result;
}

// Generate display timestamp
export function makeTimestamp() {
  return new Date().toLocaleString('en-GB', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });
}
