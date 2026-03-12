import {
  get_domain_color,
  get_domain_display_name,
  get_state_badge,
  get_entity_members,
  is_problem_state
} from './ha-api.js';

// Friendly toggles for empty sections
const HIDE_EMPTY_SECTIONS = { labels: false, voice: false, aliases: true };

function _gearIcon(size) {
  return `<ha-icon icon="mdi:cog-outline"
    style="display:block;margin:0 auto;width:${size}px;height:${size}px;
           --mdc-icon-size:${size}px;pointer-events:none">
  </ha-icon>`;
}

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

  const headerColor  = get_domain_color(eid);
  const domainLabel  = get_domain_display_name(eid);
  const badState     = is_problem_state(entity);
  const borderColor  = badState ? '#F44336' : headerColor;
  const icon = '';

  const voice_label = (show_voice_labels && entity.attributes?.voice_label) || '';

  const [all_members] = get_entity_members(entity);
  const child_groups  = all_members.filter(m => group_ids.has(m));
  const leaf_members  = all_members.filter(m => !group_ids.has(m));

  const { text: stateText, bg: stateBg, unit: stateUnit } = get_state_badge(eid, lookup);
  const stats = `${child_groups.length} Groups / ${leaf_members.length} Entities`;

  // Registry lookups
  const reg_entry = (registry.entities || {})[eid] || {};

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
    `<div ${_copyclick(a)} style="font-size:10px;color:#444;padding:1px 0;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="Click to copy">� ${_esc(a)}</div>`
  ).join('');

  let rows = '';

  // Row 1: Domain header
  rows += `<tr><td colspan="2" style="background:${headerColor};color:#fff;font-size:11px;font-weight:bold;padding:5px 10px;letter-spacing:1px;border-radius:3px 3px 0 0;border-bottom:2px solid rgba(0,0,0,0.15)">${domainLabel}${icon}</td></tr>`;

  // Rows 2+3: gear cell (rowspan=2) | friendly name / entity ID
  const nameColor = badState ? '#c62828' : '#111';
  const eidColor  = badState ? '#c62828' : '#888';
  rows += `<tr>
    <td rowspan="2" data-more-info="1" data-entity-id="${eid}" title="Open settings"
      style="cursor:pointer;vertical-align:middle;
             padding:4px 0;background:#fafafa;
             border-bottom:2px solid #e0e0e0;
             display:table-cell;text-align:center">
      ${_gearIcon(46)}
    </td>
    <td ${_copyclick(name)} style="font-weight:bold;font-size:13px;padding:6px 10px 3px 8px;
      color:${nameColor};word-wrap:break-word;white-space:normal;line-height:1.4;
      border-bottom:1px solid #ebebeb;background:#fafafa;cursor:pointer">
      ${_esc(name)}
    </td>
  </tr>
  <tr>
    <td ${_copyclick(eid)} style="font-size:10px;color:${eidColor};padding:3px 10px 7px 8px;
      word-break:break-all;line-height:1.3;border-bottom:2px solid #e0e0e0;
      background:#f5f5f5;cursor:pointer;
      font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace">
      ${eid}
    </td>
  </tr>`;

  // Row 4: State badge (CLICKABLE for toggleable domains only)
  const _toggleDomains = new Set(['switch', 'light', 'fan', 'group']);
  const _toggleTitle = _toggleDomains.has(eid.split('.')[0]) ? 'title="Toggle"' : '';
  rows += `<tr><td colspan="2" style="padding:7px 10px;text-align:center;border-bottom:2px solid #e0e0e0;background:#fff">
    <span data-state-badge="1" data-entity-id="${eid}" data-unit="${_esc(stateUnit)}"
      ${_toggleTitle}
      style="display:inline-block;background:${stateBg};color:#fff;
             font-size:12px;font-weight:bold;padding:5px 28px;border-radius:4px;
             min-width:80px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.2);
             cursor:pointer;user-select:none;">
      ${stateText}
    </span>
  </td></tr>`;

  // Row 5: Stats
  rows += `<tr><td colspan="2" style="font-size:10px;color:#777;padding:4px 10px 6px;text-align:center;border-bottom:2px solid #e0e0e0;font-style:italic;background:#fafafa">${stats}</td></tr>`;


  // Row 7: Labels — mini-card matching voice assistant style
  if (label_items.length === 0 && HIDE_EMPTY_SECTIONS.labels) {
    // hide
  } else {
    const _hasLabels   = label_items.length > 0;
    const _lblHdrBg    = _hasLabels ? '#1976D2' : '#e0e0e0';
    const _lblHdrColor = _hasLabels ? '#fff'    : '#999';
    const _lblBorder   = _hasLabels ? '#1976D2' : '#ccc';
    rows += `<tr><td colspan="2" style="padding:5px 10px 4px;border-bottom:1px solid #e8e8e8;background:#fafafa">
      <div style="border-radius:6px;overflow:hidden;border:1.5px solid ${_lblBorder}">
        <div style="background:${_lblHdrBg};color:${_lblHdrColor};font-size:9px;font-weight:700;letter-spacing:0.6px;padding:3px 8px">Group Labels</div>
        <div style="background:#fff;padding:4px 8px">
          ${_hasLabels ? `<div style="display:flex;flex-wrap:wrap;gap:3px;line-height:1.8">${chips}</div>` : _noneText}
        </div>
      </div>
    </td></tr>`;
  }

  // Row 8+9: Group voice assistant — unified card showing entity registry aliases
  const _hasVoice   = aliases.length > 0;
  const _hdrBg      = _hasVoice ? '#7B1FA2' : '#e0e0e0';
  const _hdrColor   = _hasVoice ? '#fff'    : '#999';
  const _cardBorder = _hasVoice ? '#7B1FA2' : '#ccc';
  rows += `<tr><td colspan="2" style="padding:5px 10px 4px;border-bottom:2px solid #e0e0e0;background:#fafafa">
    <div style="border-radius:6px;overflow:hidden;border:1.5px solid ${_cardBorder}">
      <div style="background:${_hdrBg};color:${_hdrColor};font-size:9px;font-weight:700;letter-spacing:0.6px;padding:3px 8px">Group voice assistant</div>
      <div style="background:#fff;padding:4px 8px">
        ${_hasVoice
          ? aliases.map(a => `<div ${_copyclick(a)} style="font-size:12px;color:#000;font-weight:600;cursor:pointer;padding:2px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">\uD83D\uDCAC ${_esc(a)}</div>`).join('')
          : _noneText
        }
      </div>
    </div>
  </td></tr>`;

  // Leaf members
  if (leaf_members.length > 0) {
    rows += `<tr><td colspan="2" style="font-size:10px;color:#444;font-weight:bold;padding:5px 10px 3px;border-bottom:1px solid #e0e0e0;background:#f0f4ff">Entities (${leaf_members.length}):</td></tr>`;

    const show_n = Math.min(leaf_members.length, 10);
    for (let i = 0; i < show_n; i++) {
      const mid   = leaf_members[i];
      const mname = lookup[mid]?.attributes?.friendly_name || mid;
      const { text: ms, bg: mb } = get_state_badge(mid, lookup);
      const rowBg = i % 2 === 0 ? '#ffffff' : '#f8f8f8';

      const _mToggleTitle = _toggleDomains.has(mid.split('.')[0]) ? 'title="Toggle"' : '';
      const munit     = (lookup[mid]?.attributes?.unit_of_measurement || '').trim();
      const mrawstate = lookup[mid]?.state || '';
      const mbadgeText = munit && !isNaN(parseFloat(mrawstate)) ? `${mrawstate} ${munit}` : ms;
      rows += `<tr><td colspan="2" style="font-size:10px;padding:5px 10px;border-bottom:1px solid #e8e8e8;background:${rowBg}">
        <div style="display:flex;align-items:center;gap:6px">
          <span data-more-info="1" data-entity-id="${mid}" title="Open settings"
            style="flex-shrink:0;cursor:pointer;line-height:0">${_gearIcon(34)}</span>
          <div style="overflow:hidden;flex:1;min-width:0">
            <div ${_copyclick(mname)} style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#333;font-size:11px;font-weight:600;cursor:pointer">${_esc(mname)}</div>
            <div ${_copyclick(mid)} style="margin-top:1px;color:#888;font-size:10px;line-height:1.2;cursor:pointer;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace">${mid}</div>
          </div>
          <span data-state-badge="1" data-entity-id="${mid}" data-unit="${_esc(munit)}"
            ${_mToggleTitle}
            style="flex-shrink:0;background:${mb};color:#fff;font-size:9px;
                   padding:2px 7px;border-radius:3px;
                   white-space:nowrap;font-weight:bold;cursor:pointer;user-select:none;">
            ${mbadgeText}
          </span>
        </div>
      </td></tr>`;
    }

    if (leaf_members.length > 10) {
      rows += `<tr><td colspan="2" style="font-size:9px;color:#aaa;padding:3px 10px 5px;font-style:italic;background:#f8f8f8">+${leaf_members.length - 10} more...</td></tr>`;
    }
  }

  return `<table style="border-collapse:collapse;width:100%;background:#fff;border-radius:4px;border:3px solid ${borderColor};box-shadow:0 3px 10px rgba(0,0,0,0.2);font-family:Segoe UI,Arial,sans-serif;table-layout:fixed;word-wrap:break-word">
    <colgroup><col style="width:56px"><col></colgroup>
    ${rows}
  </table>`;
}