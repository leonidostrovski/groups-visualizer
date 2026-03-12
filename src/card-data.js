import { detectWrapperPairs, get_tab_category } from './ha-api.js';

// ---------------------------------------------------------------------------
// Member-list cache (localStorage)
// HA strips entity_id/lights attributes from group helpers when all members
// are unavailable.  We cache the last known member lists so the hierarchy can
// be reconstructed even when groups are fully unavailable.
// ---------------------------------------------------------------------------
const MEMBER_CACHE_KEY = 'gv_member_cache_v1';

function loadMemberCache() {
  try { return JSON.parse(localStorage.getItem(MEMBER_CACHE_KEY) || '{}'); }
  catch { return {}; }
}

function saveMemberCache(cache) {
  try { localStorage.setItem(MEMBER_CACHE_KEY, JSON.stringify(cache)); }
  catch {}
}

// Fetch one WS call safely — returns [] on failure.
// Handles both the legacy plain-array response and the newer
// { entities: [...] } / { areas: [...] } object wrapper that some HA
// versions return.
async function _ws(hass, type) {
  try {
    const result = await hass.callWS({ type });
    if (Array.isArray(result)) return result;
    // Newer HA may wrap the list: { entities:[...] }, { areas:[...] }, etc.
    const firstArray = Object.values(result || {}).find(v => Array.isArray(v));
    if (firstArray) return firstArray;
    return [];
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
    _ws(hass, 'config/label_registry/list'),
  ]);

  // Convert arrays to keyed dictionaries
  const entities = {};
  entity_list.forEach(e => { if (e.entity_id) entities[e.entity_id] = e; });

  // entity_registry/list omits the `aliases` field in some HA versions.
  // Fetch full entries for group entities (small set) to get their aliases.
  const group_eids = entity_list
    .filter(e => e.platform === 'group' || e.entity_id?.startsWith('group.'))
    .map(e => e.entity_id);

  const alias_entries = await Promise.all(
    group_eids.map(eid =>
      hass.callWS({ type: 'config/entity_registry/get', entity_id: eid }).catch(() => null)
    )
  );
  alias_entries.forEach(entry => {
    if (entry?.entity_id && entities[entry.entity_id]) {
      entities[entry.entity_id].aliases = entry.aliases || [];
    }
  });

  const areas = {};
  area_list.forEach(a => { if (a.area_id) areas[a.area_id] = a; });

  // area_registry/list may omit `aliases` in some HA versions — fetch individually.
  const area_detail_entries = await Promise.all(
    area_list.map(a =>
      hass.callWS({ type: 'config/area_registry/get', area_id: a.area_id }).catch(() => null)
    )
  );
  area_detail_entries.forEach(entry => {
    if (entry?.area_id && areas[entry.area_id]) {
      areas[entry.area_id].aliases = entry.aliases || [];
    }
  });

  const labels = {};
  label_list.forEach(l => { if (l.label_id) labels[l.label_id] = l; });

  const registry = { entities, areas, labels };

  // Update member cache with any member lists visible in current states,
  // then inject cached lists back into entities whose attributes are missing.
  const cache = loadMemberCache();
  all_states.forEach(e => {
    const members = e.attributes?.entity_id ?? e.attributes?.lights;
    if (Array.isArray(members) && members.length > 0) cache[e.entity_id] = { attr: e.attributes?.lights ? 'lights' : 'entity_id', ids: members };
  });
  saveMemberCache(cache);

  const patched_states = all_states.map(e => {
    const existing = e.attributes?.entity_id ?? e.attributes?.lights;
    if (Array.isArray(existing) && existing.length > 0) return e;
    const hit = cache[e.entity_id];
    if (!hit) return e;
    return { ...e, attributes: { ...e.attributes, [hit.attr]: hit.ids } };
  });

  const { roots, pairs, lookup, group_ids, _debug } =
    detectWrapperPairs(patched_states, entities);

  return { roots, pairs, lookup, group_ids, registry, _debug };
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
