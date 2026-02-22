import {
  get_domain_color,
  get_domain_display_name,
  get_state_badge,
  get_entity_members
} from './ha-api.js';

// Friendly toggles for empty sections
const HIDE_EMPTY_SECTIONS = { labels: false, voice: false, aliases: false };

function _esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function _copyclick(text) {
  const jsEscaped = String(text)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '')
    .replace(/\n/g, ' ');
  const safe = jsEscaped
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');

  return `onclick="(function(el,txt){
    var _legacy=function(t){
      try{
        var ta=document.createElement('textarea');
        ta.value=t;
        ta.style.cssText='position:fixed;top:-999px;left:-999px;opacity:0';
        document.body.appendChild(ta);ta.focus();ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }catch(e){}
    };
    if(navigator.clipboard){
      navigator.clipboard.writeText(txt).catch(function(){_legacy(txt);});
    }else{
      _legacy(txt);
    }
    el.style.outline='2px solid #4CAF50';
    el.style.borderRadius='3px';
    setTimeout(function(){el.style.outline='';},1500);
    var preview=txt.length>45?txt.substring(0,45)+'...':txt;
    var toast=document.createElement('div');
    toast.innerText='Copied: '+preview;
    toast.style.cssText=[
      'position:fixed','bottom:32px','left:50%','transform:translateX(-50%)',
      'background:#323232','color:#fff','padding:10px 24px','border-radius:24px',
      'font-size:13px','font-family:Segoe UI,Arial,sans-serif','z-index:999999',
      'pointer-events:none','box-shadow:0 4px 16px rgba(0,0,0,0.35)',
      'opacity:1','transition:opacity 0.4s ease'
    ].join(';');
    document.body.appendChild(toast);
    setTimeout(function(){toast.style.opacity='0';},1200);
    setTimeout(function(){ if(toast.parentNode)toast.parentNode.removeChild(toast); },1650);
  })(this,'${safe}');event.stopPropagation();" title="Click to copy"`;
}

const _nonePill =
  '<span style="display:inline-block;background:#EEE;color:#111;font-size:10px;font-weight:700;padding:3px 10px;border-radius:10px;margin:2px 4px 2px 0;border:1.5px solid rgba(0,0,0,0.35);white-space:nowrap">None</span>';

const _noneText =
  '<span style="color:#666;font-size:10px">None</span>';

export function create_node_table(
  entity, lookup, pairs, group_ids,
  show_voice_labels = true,
  registry = {},
  wrappedSwitchIds = null
) {
  const eid  = entity.entity_id;
  const name = entity.attributes?.friendly_name || eid;

  const headerColor = get_domain_color(eid);
  const domainLabel = get_domain_display_name(eid);
  const isWrapper   = eid in pairs;
  const isWrappedSw = wrappedSwitchIds ? wrappedSwitchIds.has(eid) : Object.values(pairs).includes(eid);
  const icon = isWrapper ? ' [W]' : (isWrappedSw ? ' [S]' : '');

  const voice_label = (show_voice_labels && entity.attributes?.voice_label) || '';

  const [all_members] = get_entity_members(entity);
  const child_groups  = all_members.filter(m => group_ids.has(m));
  const leaf_members  = all_members.filter(m => !group_ids.has(m));

  const { text: stateText, bg: stateBg } = get_state_badge(eid, lookup);
  const stats = `${child_groups.length} Groups / ${leaf_members.length} Entities`;

  // Registry lookups
  const reg_entry = (registry.entities || {})[eid] || {};
  const area_id   = reg_entry.area_id || null;
  const area_obj  = area_id ? (registry.areas || {})[area_id] : null;
  const area_name = area_obj ? (area_obj.name || area_id) : null;

  const label_ids = Array.isArray(reg_entry.labels) ? reg_entry.labels : [];
  const aliases   = Array.isArray(reg_entry.aliases) ? reg_entry.aliases : [];

  const label_items = label_ids.map(lid => {
    const l = (registry.labels || {})[lid];
    return l ? { name: l.name || lid, color: l.color || '#607D8B' }
             : { name: lid, color: '#607D8B' };
  });

  // Label chips (black text + border)
  const chips = label_items.map(l =>
    `<span style="display:inline-block;background:${l.color};color:#111;font-size:10px;font-weight:700;padding:3px 10px;border-radius:10px;margin:2px 4px 2px 0;box-shadow:0 1px 2px rgba(0,0,0,0.18);white-space:nowrap;border:1.5px solid rgba(0,0,0,0.35);">${_esc(l.name)}</span>`
  ).join('');

  const alias_rows = aliases.map(a =>
    `<div ${_copyclick(a)} style="font-size:10px;color:#444;padding:1px 0;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="Click to copy">– ${_esc(a)}</div>`
  ).join('');

  let rows = '';

  // Row 1: Domain header
  rows += `<tr><td style="background:${headerColor};color:#fff;font-size:11px;font-weight:bold;padding:5px 10px;letter-spacing:1px;border-radius:3px 3px 0 0;border-bottom:2px solid rgba(0,0,0,0.15)">${domainLabel}${icon}</td></tr>`;

  // Row 2: Friendly name
  rows += `<tr><td ${_copyclick(name)} style="font-weight:bold;font-size:13px;padding:7px 10px 4px;color:#111;word-wrap:break-word;white-space:normal;line-height:1.4;border-bottom:2px solid #e0e0e0;background:#fafafa;cursor:pointer">${_esc(name)}</td></tr>`;

  // Row 3: Entity ID
  rows += `<tr><td ${_copyclick(eid)} style="font-size:10px;color:#888;padding:3px 10px 7px;word-break:break-all;line-height:1.3;border-bottom:2px solid #e0e0e0;background:#f5f5f5;cursor:pointer;font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${eid}</td></tr>`;

  // Row 4: State badge (CLICKABLE — no inline stopPropagation)
  rows += `<tr><td style="padding:7px 10px;text-align:center;border-bottom:2px solid #e0e0e0;background:#fff">
    <span data-state-badge="1" data-entity-id="${eid}"
      title="Toggle"
      style="display:inline-block;background:${stateBg};color:#fff;
             font-size:12px;font-weight:bold;padding:5px 28px;border-radius:4px;
             min-width:80px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.2);
             cursor:pointer;user-select:none;">
      ${stateText}
    </span>
  </td></tr>`;

  // Row 5: Stats
  rows += `<tr><td style="font-size:10px;color:#777;padding:4px 10px 6px;text-align:center;border-bottom:2px solid #e0e0e0;font-style:italic;background:#fafafa">${stats}</td></tr>`;

  // Row 6: Area
  rows += `<tr><td ${area_name ? _copyclick(area_name) : ''} style="font-size:10px;color:#333;padding:5px 10px;border-bottom:2px solid #e0e0e0;background:#E3F2FD;${area_name ? 'cursor:pointer;' : ''}">
    <span style="color:#111;font-weight:bold;margin-right:6px">[Area]</span>
    ${area_name ? _esc(area_name) : _noneText}
  </td></tr>`;

  // Row 7: Labels
  if (label_items.length === 0 && HIDE_EMPTY_SECTIONS.labels) {
    // hide
  } else {
    rows += `<tr><td style="padding:5px 10px;border-bottom:2px solid #e0e0e0;background:#F3E5F5">
      <div style="font-size:10px;color:#111;font-weight:bold;margin-bottom:3px">[Labels]</div>
      ${chips ? `<div style="line-height:1.8">${chips}</div>` : _nonePill}
    </td></tr>`;
  }

  // Row 8: Voice
  if ((!voice_label || voice_label.trim() === '') && HIDE_EMPTY_SECTIONS.voice) {
    // hide
  } else {
    rows += `<tr><td ${voice_label ? _copyclick(voice_label) : ''} style="font-size:10px;color:#333;padding:5px 10px;border-bottom:2px solid #e0e0e0;background:#f9f4ff;${voice_label ? 'cursor:pointer;' : ''}">
      <span style="color:#111;font-weight:bold;margin-right:4px">[Voice]</span>
      ${voice_label ? _esc(voice_label) : _noneText}
    </td></tr>`;
  }

  // Row 9: Aliases
  if (aliases.length === 0 && HIDE_EMPTY_SECTIONS.aliases) {
    // hide
  } else {
    rows += `<tr><td style="padding:5px 10px;border-bottom:2px solid #e0e0e0;background:#FFF8E1">
      <div style="font-size:10px;color:#111;font-weight:bold;margin-bottom:3px">[Aliases]${aliases.length > 0 ? ` (${aliases.length})` : ''}</div>
      ${alias_rows || _noneText}
    </td></tr>`;
  }

  // Leaf members
  if (leaf_members.length > 0) {
    rows += `<tr><td style="font-size:10px;color:#444;font-weight:bold;padding:5px 10px 3px;border-bottom:1px solid #e0e0e0;background:#f0f4ff">Entities (${leaf_members.length}):</td></tr>`;

    const show_n = Math.min(leaf_members.length, 10);
    for (let i = 0; i < show_n; i++) {
      const mid   = leaf_members[i];
      const mname = lookup[mid]?.attributes?.friendly_name || mid;
      const { text: ms, bg: mb } = get_state_badge(mid, lookup);
      const rowBg = i % 2 === 0 ? '#ffffff' : '#f8f8f8';

      rows += `<tr><td ${_copyclick(mid)} style="font-size:10px;padding:6px 10px;border-bottom:1px solid #e8e8e8;background:${rowBg};cursor:pointer">
        <span data-state-badge="1" data-entity-id="${mid}"
          title="Toggle"
          style="float:right;background:${mb};color:#fff;font-size:9px;
                 padding:2px 7px;border-radius:3px;margin-left:6px;
                 white-space:nowrap;font-weight:bold;cursor:pointer;user-select:none;">
          ${ms}
        </span>
        <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#333;font-size:11px;font-weight:600">${_esc(mname)}</div>
        <div style="margin-top:2px;color:#888;font-size:10px;line-height:1.2;font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${mid}</div>
      </td></tr>`;
    }

    if (leaf_members.length > 10) {
      rows += `<tr><td style="font-size:9px;color:#aaa;padding:3px 10px 5px;font-style:italic;background:#f8f8f8">+${leaf_members.length - 10} more...</td></tr>`;
    }
  }

  return `<table style="border-collapse:collapse;width:100%;background:#fff;border-radius:4px;border:3px solid ${headerColor};box-shadow:0 3px 10px rgba(0,0,0,0.2);font-family:Segoe UI,Arial,sans-serif;table-layout:fixed;word-wrap:break-word">
    ${rows}
  </table>`;
}