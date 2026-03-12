import dagre from 'dagre';
import { NODE_WIDTH, AREA_PAD_X, AREA_PAD_TOP, AREA_PAD_BOTTOM } from './constants.js';
import { get_entity_members, get_domain_color } from './ha-api.js';
import { create_node_table } from './ha-node-table.js';
import { measureHeights } from './graph-measure.js';

export function buildLayout(roots, lookup, pairs, group_ids, show_voice_labels, registry) {
  const nodeLabels = new Map();
  const nodeEdges  = [];
  const visited    = new Set();

  const collect = (entity) => {
    const id = entity.entity_id;
    if (visited.has(id)) return;
    visited.add(id);
    nodeLabels.set(id, create_node_table(entity, lookup, pairs, group_ids, show_voice_labels, registry, wrappedSwitchIds));
    if (pairs[id]) {
      const sw = lookup[pairs[id]];
      if (sw) {
        collect(sw);
        nodeEdges.push({ from: id, to: pairs[id], style: 'dashed', color: '#FF9800', width: 2.5, marker: 'url(#arrow-dashed)', label: 'wraps' });
      }
    }

    const [children] = get_entity_members(entity);
    children.forEach(child_id => {
      if (!group_ids.has(child_id)) return;
      const child = lookup[child_id];
      if (!child) return;
      collect(child);
      nodeEdges.push({ from: id, to: child_id, color: get_domain_color(child_id), width: 2.5, marker: 'url(#arrow)', label: '' });
    });
  };

  const wrappedSwitchIds = new Set(Object.values(pairs));
  roots.forEach(r => collect(r));


  const measuredHeights = measureHeights(nodeLabels);

  // -- Build area map ---------------------------------------------------------
  const areaMap = {};
  nodeLabels.forEach((_, id) => {
    const reg_entry = (registry.entities || {})[id] || {};
    const area_id   = reg_entry.area_id;
    if (!area_id) return;
    const area_obj  = (registry.areas || {})[area_id];
    if (!area_obj) return;
    if (!areaMap[area_id]) {
      const aliases    = (Array.isArray(area_obj.aliases) ? area_obj.aliases : []).slice(0, 3);
      const aliasRows  = Math.max(aliases.length, 1); // always at least 1 row ("None")
      // 8px from top + lblH(≈62) + 8px gap + aliasRows*26px + 8px before nodes
      const topPad     = 86 + aliasRows * 26;
      areaMap[area_id] = { name: area_obj.name || area_id, aliases, topPad, node_ids: [] };
    }
    areaMap[area_id].node_ids.push(id);
  });

  // -- Build compound dagre graph ---------------------------------------------
  const clusterIds = new Set();

  const dagreGraph = new dagre.graphlib.Graph({ compound: true })
    .setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir:  'TB',
    // Generous spacing so edges have wide corridors between area boxes
    ranksep:  120,
    nodesep:  90,
    marginx:  80,
    marginy:  80
  });

  // -- Cluster nodes � tell dagre the EXACT visual padding of each area box --
  // By setting paddingLeft/Right/Top/Bottom equal to our visual AREA_PAD values,
  // dagre knows the real visual boundary of each cluster and will route edges
  // with clearance from those boundaries, not just from the node edges.
  Object.keys(areaMap).forEach(area_id => {
    const cid = `__area__${area_id}`;
    clusterIds.add(cid);
    dagreGraph.setNode(cid, {
      label:         '',
      width:         1,
      height:        1,
      paddingLeft:   AREA_PAD_X,
      paddingRight:  AREA_PAD_X,
      paddingTop:    areaMap[area_id].topPad,
      paddingBottom: AREA_PAD_BOTTOM
    });
  });

  // -- Entity nodes -----------------------------------------------------------
  nodeLabels.forEach((label, id) => {
    dagreGraph.setNode(id, {
      label,
      width:  NODE_WIDTH,
      height: measuredHeights[id] || 160
    });
  });

  // -- Assign entity nodes to their area cluster ------------------------------
  Object.entries(areaMap).forEach(([area_id, { node_ids }]) => {
    const cid = `__area__${area_id}`;
    node_ids.forEach(id => {
      try { dagreGraph.setParent(id, cid); }
      catch (e) { console.warn('[groups-visualizer] setParent failed', id, e); }
    });
  });

  // -- Edges ------------------------------------------------------------------
  const edgeMeta = {};
  nodeEdges.forEach(e => {
    edgeMeta[`${e.from}|${e.to}`] = e;
    dagreGraph.setEdge(e.from, e.to, {});
  });

  dagre.layout(dagreGraph);

  return { dagreGraph, edgeMeta, measuredHeights, areaMap, clusterIds };
}
