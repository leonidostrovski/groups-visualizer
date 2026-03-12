export function get_entity_members(entity) {
  const attrs = entity?.attributes || {};
  const list  = attrs.entity_id;
  if (Array.isArray(list)   && list.length   > 0) return [list,   'entity_id'];
  const lights = attrs.lights;
  if (Array.isArray(lights) && lights.length > 0) return [lights, 'lights'];
  return [[], null];
}

export function has_entity_list(entity) {
  const [members] = get_entity_members(entity);
  return members.length > 0;
}

export function get_tab_category(entity) {
  const domain = entity.entity_id.split('.')[0];
  const labels = {
    switch:  'Switches',
    light:   'Lights',
    sensor:  'Sensors',
    fan:     'Fans',
    climate: 'Climate',
    group:   'Groups'
  };
  return labels[domain] || domain.charAt(0).toUpperCase() + domain.slice(1);
}

export function get_domain_color(entity_id) {
  const domain = entity_id.split('.')[0];
  const colors = {
    light:   '#FFA726',
    switch:  '#42A5F5',
    sensor:  '#66BB6A',
    fan:     '#26C6DA',
    climate: '#EF5350',
    group:   '#9C27B0'
  };
  return colors[domain] || '#9E9E9E';
}

export function get_domain_display_name(entity_id) {
  const domain = entity_id.split('.')[0];
  const names = {
    light:   'LIGHT',
    switch:  'SWITCH',
    sensor:  'SENSOR',
    fan:     'FAN',
    climate: 'CLIMATE',
    group:   'GROUP'
  };
  return names[domain] || domain.toUpperCase();
}

export function is_problem_state(entity) {
  if (!entity) return true;
  const s = (entity.state || '').toLowerCase();
  return s === 'unknown' || s === 'unavailable';
}

export function get_state_badge(entity_id, lookup) {
  const entity = lookup[entity_id];
  if (!entity) return { text: 'UNKN', bg: '#F44336', unit: '' };
  const rawState = entity.state || 'unknown';
  const state    = rawState.toLowerCase();
  if (state === 'on')  return { text: 'ON',  bg: '#4CAF50', unit: '' };
  if (state === 'off') return { text: 'OFF', bg: '#9E9E9E', unit: '' };
  const unit = (entity.attributes?.unit_of_measurement || '').trim();
  if (unit && !isNaN(parseFloat(rawState))) {
    return { text: `${rawState} ${unit}`, bg: '#2196F3', unit };
  }
  return { text: rawState.substring(0, 8).toUpperCase(), bg: '#2196F3', unit: '' };
}

export function detectWrapperPairs(all_states, entity_registry = {}) {
  const lookup = {};
  all_states.forEach(e => { lookup[e.entity_id] = e; });

  const groups    = all_states.filter(e => has_entity_list(e));
  const group_ids = new Set(groups.map(e => e.entity_id));

  // HA Helper groups (switch.*, light.*, etc.) with no members are "unavailable"
  // and HA omits the entity_id attribute from their state entirely.  They are
  // still real group nodes — add them to group_ids so that any parent group
  // which lists them as a member is correctly detected as hierarchical.
  Object.entries(entity_registry).forEach(([eid, reg]) => {
    if (reg.platform === 'group') group_ids.add(eid);
  });

  // YAML-configured group.* entities are NOT stored in the entity_registry, so
  // the platform check above cannot catch them.  An empty YAML group has state
  // "unknown" and no entity_id attribute, but it is still a valid group node.
  all_states.forEach(e => {
    if (e.entity_id.startsWith('group.')) group_ids.add(e.entity_id);
  });

  const pairs = {};
  all_states.forEach(entity => {
    const eid = entity.entity_id;
    if (!eid.startsWith('light.')) return;
    const switch_id = eid.replace('light.', 'switch.');
    if (!lookup[switch_id]) return;
    const [sw_members] = get_entity_members(lookup[switch_id]);
    if (sw_members.length > 0) {
      pairs[eid] = switch_id;
      group_ids.add(eid);
    }
  });

  const wrapped_switch_ids = new Set(Object.values(pairs));
  const hierarchical = [];

  groups.forEach(g => {
    const [children] = get_entity_members(g);
    const hasChildGroups  = children.some(c => group_ids.has(c));
    const isWrappedSwitch = wrapped_switch_ids.has(g.entity_id);
    if (hasChildGroups || isWrappedSwitch) hierarchical.push(g);
  });

  Object.keys(pairs).forEach(light_id => {
    const le = lookup[light_id];
    if (le && !hierarchical.find(h => h.entity_id === light_id))
      hierarchical.push(le);
  });

  const all_children = new Set();
  hierarchical.forEach(g => {
    const [children] = get_entity_members(g);
    children.filter(c => group_ids.has(c)).forEach(c => all_children.add(c));
  });
  Object.entries(pairs).forEach(([, switch_id]) => {
    if (group_ids.has(switch_id)) all_children.add(switch_id);
  });

  const roots = hierarchical
    .filter(g => !all_children.has(g.entity_id))
    .sort((a, b) => get_entity_members(b)[0].length - get_entity_members(a)[0].length);

  // --- Debug snapshot ---------------------------------------------------------
  // Capture entities that are unavailable/unknown and might be missing from
  // the tree so we can display them in the card for diagnosis.
  const unavailable_group_candidates = all_states.filter(e => {
    const s = (e.state || '').toLowerCase();
    if (s !== 'unavailable' && s !== 'unknown') return false;
    const reg = entity_registry[e.entity_id];
    const isRegGroup = reg && reg.platform === 'group';
    const isDomainGroup = e.entity_id.startsWith('group.');
    return isRegGroup || isDomainGroup;
  }).map(e => ({
    id:      e.entity_id,
    state:   e.state,
    members: e.attributes?.entity_id ?? e.attributes?.lights ?? null,
    in_group_ids: group_ids.has(e.entity_id),
    reg_platform: entity_registry[e.entity_id]?.platform ?? '(not in reg)',
  }));

  const _debug = {
    total_states:   all_states.length,
    entity_reg_size: Object.keys(entity_registry).length,
    reg_group_platform: Object.entries(entity_registry)
      .filter(([, r]) => r.platform === 'group').map(([id]) => id),
    group_domain_states: all_states
      .filter(e => e.entity_id.startsWith('group.'))
      .map(e => ({ id: e.entity_id, state: e.state, members: e.attributes?.entity_id ?? e.attributes?.lights ?? null })),
    groups_with_members: groups.map(g => ({
      id: g.entity_id,
      members: get_entity_members(g)[0]
    })),
    hierarchical: hierarchical.map(h => h.entity_id),
    roots: roots.map(r => r.entity_id),
    unavailable_group_candidates,
  };

  return { roots, pairs, lookup, group_ids, _debug };
}
