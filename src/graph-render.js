import * as d3 from 'd3';
import {
  AREA_PAD_X, AREA_PAD_TOP, AREA_PAD_BOTTOM,
  AREA_LABEL_FONT_SIZE, AREA_COUNT_FONT_SIZE
} from './constants.js';

const AREA_PALETTE = [
  { fill: 'rgba(21,101,192,0.14)',  border: '#1565C0' },
  { fill: 'rgba(106,27,154,0.14)', border: '#6A1B9A' },
  { fill: 'rgba(46,125,50,0.14)',  border: '#2E7D32' },
  { fill: 'rgba(230,81,0,0.14)',   border: '#E65100' },
  { fill: 'rgba(136,14,79,0.14)',  border: '#880E4F' },
  { fill: 'rgba(0,96,100,0.14)',   border: '#006064' },
  { fill: 'rgba(85,139,47,0.14)', border: '#558B2F'  },
  { fill: 'rgba(183,28,28,0.14)', border: '#B71C1C'  },
  { fill: 'rgba(49,27,146,0.14)', border: '#311B92'  },
  { fill: 'rgba(1,87,155,0.14)',  border: '#01579B'  },
];

// -- Area box utilities --------------------------------------------------------

function _buildAreaBoxes(areaMap, finalPos) {
  const boxes = {};
  if (!areaMap) return boxes;
  Object.entries(areaMap).forEach(([areaId, { node_ids }]) => {
    const pos = node_ids.map(id => finalPos.get(id)).filter(Boolean);
    if (!pos.length) return;
    boxes[areaId] = {
      x1: Math.min(...pos.map(p => p.x))       - AREA_PAD_X,
      y1: Math.min(...pos.map(p => p.y))       - AREA_PAD_TOP,
      x2: Math.max(...pos.map(p => p.x + p.w)) + AREA_PAD_X,
      y2: Math.max(...pos.map(p => p.y + p.h)) + AREA_PAD_BOTTOM,
    };
  });
  return boxes;
}

function _getNodeArea(nodeId, areaMap) {
  if (!areaMap) return null;
  for (const [areaId, { node_ids }] of Object.entries(areaMap)) {
    if (node_ids.includes(nodeId)) return areaId;
  }
  return null;
}

// -- Corridor routing for cross-area edges -------------------------------------

function _routeCrossArea(fromId, toId, srcBox, tgtBox, finalPos) {
  const from = finalPos.get(fromId);
  const to   = finalPos.get(toId);
  if (!from || !to) return null;

  const sx = from.x + from.w / 2;
  const sy = from.y + from.h;
  const tx = to.x + to.w / 2;
  const ty = to.y;
  const PAD = 28;

  if (tgtBox.y1 >= srcBox.y2 - PAD) {
    const cY = (srcBox.y2 + tgtBox.y1) / 2;
    return [
      { x: sx, y: sy  },
      { x: sx, y: cY  },
      { x: tx, y: cY  },
      { x: tx, y: ty  },
    ];
  }

  if (srcBox.y1 >= tgtBox.y2 - PAD) {
    const cY = (tgtBox.y2 + srcBox.y1) / 2;
    return [
      { x: sx, y: sy              },
      { x: sx, y: srcBox.y1 - PAD },
      { x: sx, y: cY              },
      { x: tx, y: cY              },
      { x: tx, y: tgtBox.y2 + PAD },
      { x: tx, y: ty              },
    ];
  }

  const midY = (sy + ty) / 2;

  if (tgtBox.x1 >= srcBox.x2 - PAD) {
    const gapX = (srcBox.x2 + tgtBox.x1) / 2;
    return [
      { x: sx,   y: sy   },
      { x: sx,   y: midY },
      { x: gapX, y: midY },
      { x: tx,   y: midY },
      { x: tx,   y: ty   },
    ];
  }

  if (srcBox.x1 >= tgtBox.x2 - PAD) {
    const gapX = (tgtBox.x2 + srcBox.x1) / 2;
    return [
      { x: sx,   y: sy   },
      { x: sx,   y: midY },
      { x: gapX, y: midY },
      { x: tx,   y: midY },
      { x: tx,   y: ty   },
    ];
  }

  const belowY = Math.max(srcBox.y2, tgtBox.y2) + PAD * 2;
  return [
    { x: sx, y: sy     },
    { x: sx, y: belowY },
    { x: tx, y: belowY },
    { x: tx, y: ty     },
  ];
}

// -- SVG helpers ---------------------------------------------------------------

function _midpoint(points) {
  if (!points || !points.length) return { x: 0, y: 0 };
  return points[Math.floor(points.length / 2)];
}

function _ensureShadowFilter(svg) {
  let defs = svg.select('defs');
  if (defs.empty()) defs = svg.insert('defs', ':first-child');
  if (defs.select('#area-shadow').empty()) {
    const f = defs.append('filter')
      .attr('id', 'area-shadow')
      .attr('x', '-12%').attr('y', '-12%')
      .attr('width', '124%').attr('height', '124%');
    f.append('feDropShadow')
      .attr('dx', 0).attr('dy', 5)
      .attr('stdDeviation', 10)
      .attr('flood-color', 'rgba(0,0,0,0.28)');
  }
}

// -- Area pill + badge drawing helpers -----------------------------------------

function _drawAreaLabel(layer, name, border, lblX, lblY) {
  // Derive pill dimensions from AREA_LABEL_FONT_SIZE
  const lblH  = AREA_LABEL_FONT_SIZE * 2.2;
  const lblW  = Math.max(name.length * (AREA_LABEL_FONT_SIZE * 0.65) + 36, 90);

  // Pill shadow
  layer.append('rect')
    .attr('x', lblX + 3).attr('y', lblY + 3)
    .attr('width', lblW).attr('height', lblH)
    .attr('rx', lblH / 2).attr('ry', lblH / 2)
    .attr('fill', 'rgba(0,0,0,0.28)');

  // Pill body
  layer.append('rect')
    .attr('x', lblX).attr('y', lblY)
    .attr('width', lblW).attr('height', lblH)
    .attr('rx', lblH / 2).attr('ry', lblH / 2)
    .attr('fill', border)
    .attr('stroke', 'rgba(255,255,255,0.4)').attr('stroke-width', 1.5);

  // Pill text
  layer.append('text')
    .attr('x', lblX + lblW / 2).attr('y', lblY + lblH / 2)
    .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
    .style('font-size',      `${AREA_LABEL_FONT_SIZE}px`)
    .style('font-family',    'Segoe UI, Arial, sans-serif')
    .style('font-weight',    'bold')
    .style('fill',           '#ffffff')
    .style('letter-spacing', '0.5px')
    .style('pointer-events', 'none')
    .text(name);

  return { lblW, lblH };
}

function _drawCountBadge(layer, count, border, cx, cy) {
  const ctxt = `${count} node${count > 1 ? 's' : ''}`;
  const cw   = ctxt.length * (AREA_COUNT_FONT_SIZE * 0.65) + 20;
  const ch   = AREA_COUNT_FONT_SIZE * 2;

  // Badge shadow
  layer.append('rect')
    .attr('x', cx + 2).attr('y', cy + 2)
    .attr('width', cw).attr('height', ch)
    .attr('rx', ch / 2).attr('ry', ch / 2)
    .attr('fill', 'rgba(0,0,0,0.18)');

  // Badge body
  layer.append('rect')
    .attr('x', cx).attr('y', cy)
    .attr('width', cw).attr('height', ch)
    .attr('rx', ch / 2).attr('ry', ch / 2)
    .attr('fill', '#ffffff').attr('stroke', border).attr('stroke-width', 2.5);

  // Badge text
  layer.append('text')
    .attr('x', cx + cw / 2).attr('y', cy + ch / 2)
    .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
    .style('font-size',      `${AREA_COUNT_FONT_SIZE}px`)
    .style('font-family',    'Segoe UI, Arial, sans-serif')
    .style('fill',           border)
    .style('font-weight',    'bold')
    .style('pointer-events', 'none')
    .text(ctxt);

  return { cw, ch };
}

// -- Main render ---------------------------------------------------------------

export function renderGraph(
  svg, svgG, svgEdge, svgEdgeG, zoom,
  dagreGraph, edgeMeta, measuredHeights,
  containerWidth,
  areaMap, clusterIds
) {
  svgG.selectAll('*').remove();
  svgEdgeG.selectAll('*').remove();
  _ensureShadowFilter(svg);

  const areaLayer = svgG.append('g').attr('class', 'area-layer');
  const nodeLayer = svgG.append('g').attr('class', 'node-layer');
  const edgeLayer = svgEdgeG;

  // -- Step 1: Render nodes --------------------------------------------------
  const foMap = new Map();

  dagreGraph.nodes().forEach(v => {
    if (clusterIds && clusterIds.has(v)) return;
    const node = dagreGraph.node(v);
    if (!node) return;

    const h  = measuredHeights[v] || node.height;
    const fo = nodeLayer.append('foreignObject')
      .attr('x',      node.x - node.width / 2)
      .attr('y',      node.y - h / 2)
      .attr('width',  node.width)
      .attr('height', h);

    const inner = fo.append('xhtml:div')
      .style('width',    node.width + 'px')
      .style('overflow', 'visible');

    inner.html(node.label);
    foMap.set(v, { fo, inner: inner.node(), node, measuredH: h });
  });

  // -- Step 2: Correct heights + record bounding boxes -----------------------
  let maxX = 0, maxY = 0;
  const finalPos = new Map();

  foMap.forEach(({ fo, inner, node, measuredH }, v) => {
    const finalH = Math.max(measuredH, inner.scrollHeight + 8);
    if (finalH !== measuredH) {
      fo.attr('height', finalH);
      fo.attr('y',      node.y - finalH / 2);
    }
    const fx = node.x - node.width / 2;
    const fy = node.y - finalH / 2;
    finalPos.set(v, { x: fx, y: fy, w: node.width, h: finalH });
    maxX = Math.max(maxX, fx + node.width + 60);
    maxY = Math.max(maxY, fy + finalH + 60);
  });

  // -- Step 3: Build area boxes from real rendered positions -----------------
  const areaBoxes = _buildAreaBoxes(areaMap, finalPos);

  // -- Step 4: Draw area backgrounds ----------------------------------------
  if (areaMap && Object.keys(areaMap).length > 0) {
    let ci = 0;
    Object.entries(areaMap).forEach(([areaId, areaData]) => {
      const { name, node_ids } = areaData;
      const box = areaBoxes[areaId];
      if (!box) return;

      const positions = node_ids.map(id => finalPos.get(id)).filter(Boolean);
      if (!positions.length) return;

      const { fill, border } = AREA_PALETTE[ci % AREA_PALETTE.length];
      ci++;

      const bx1 = box.x1, by1 = box.y1;
      const bw  = box.x2 - box.x1, bh = box.y2 - box.y1;

      maxX = Math.max(maxX, box.x2 + 60);
      maxY = Math.max(maxY, box.y2 + 40);

      // Outer glow halo
      areaLayer.append('rect')
        .attr('x', bx1 - 6).attr('y', by1 - 6)
        .attr('width', bw + 12).attr('height', bh + 12)
        .attr('rx', 24).attr('ry', 24)
        .attr('fill', 'none').attr('stroke', border)
        .attr('stroke-width', 10).attr('opacity', 0.15);

      // Main box
      areaLayer.append('rect')
        .attr('x', bx1).attr('y', by1)
        .attr('width', bw).attr('height', bh)
        .attr('rx', 18).attr('ry', 18)
        .attr('fill', fill).attr('stroke', border)
        .attr('stroke-width', 5)
        .attr('filter', 'url(#area-shadow)');

      // Top stripe
      areaLayer.append('rect')
        .attr('x', bx1).attr('y', by1)
        .attr('width', bw).attr('height', 12)
        .attr('rx', 18).attr('ry', 18)
        .attr('fill', border).attr('stroke', 'none');

      // Area name pill — left side, vertically centered in the top stripe gap
      const { lblH } = _drawAreaLabel(
        areaLayer, name, border,
        bx1 + 18,           // lblX
        by1 + 12            // lblY
      );

      // Node count badge — right side, same vertical center as label
      const badgeY = by1 + 12 + (lblH - AREA_COUNT_FONT_SIZE * 2) / 2;
      const { cw } = _drawCountBadge(
        areaLayer, positions.length, border,
        box.x2 - 18,        // cx — will be adjusted by cw inside helper
        badgeY
      );
      // Re-draw at correct x (helper returns cw so we can right-align)
      // Remove last two elements (badge shadow + body + text = 3 elements)
      // Simpler: just pass the right-aligned x directly
      // (The helper above draws at cx; we need cx = box.x2 - cw - 18)
      // So we do a two-pass: compute cw first then draw.
      // Achieved cleanly by calling a sizing helper first:
    });
  }

  // -- Step 4b: Redraw badges right-aligned (clean two-pass) ----------------
  // The helper above drew the badge at a temporary x. We redo step 4 cleanly:
  // (Refactored below — the block above is replaced entirely by this one)

  // ... Actually let's just inline it cleanly in a single pass:

  // -- Step 4 CLEAN: Draw area backgrounds ----------------------------------
  areaLayer.selectAll('*').remove();

  if (areaMap && Object.keys(areaMap).length > 0) {
    let ci = 0;
    Object.entries(areaMap).forEach(([areaId, areaData]) => {
      const { name, node_ids } = areaData;
      const box = areaBoxes[areaId];
      if (!box) return;

      const positions = node_ids.map(id => finalPos.get(id)).filter(Boolean);
      if (!positions.length) return;

      const { fill, border } = AREA_PALETTE[ci % AREA_PALETTE.length];
      ci++;

      const bx1 = box.x1, by1 = box.y1;
      const bw  = box.x2 - box.x1, bh = box.y2 - box.y1;

      maxX = Math.max(maxX, box.x2 + 60);
      maxY = Math.max(maxY, box.y2 + 40);

      // Outer glow halo
      areaLayer.append('rect')
        .attr('x', bx1 - 6).attr('y', by1 - 6)
        .attr('width', bw + 12).attr('height', bh + 12)
        .attr('rx', 24).attr('ry', 24)
        .attr('fill', 'none').attr('stroke', border)
        .attr('stroke-width', 10).attr('opacity', 0.15);

      // Main box
      areaLayer.append('rect')
        .attr('x', bx1).attr('y', by1)
        .attr('width', bw).attr('height', bh)
        .attr('rx', 18).attr('ry', 18)
        .attr('fill', fill).attr('stroke', border)
        .attr('stroke-width', 5)
        .attr('filter', 'url(#area-shadow)');

      // Top stripe
      areaLayer.append('rect')
        .attr('x', bx1).attr('y', by1)
        .attr('width', bw).attr('height', 12)
        .attr('rx', 18).attr('ry', 18)
        .attr('fill', border).attr('stroke', 'none');

      // -- Pre-compute both pill + badge sizes for vertical alignment --------
      const lblH  = AREA_LABEL_FONT_SIZE * 2.2;
      const lblW  = Math.max(name.length * (AREA_LABEL_FONT_SIZE * 0.65) + 36, 90);
      const bdgH  = AREA_COUNT_FONT_SIZE * 2;
      const count = positions.length;
      const ctxt  = `${count} node${count > 1 ? 's' : ''}`;
      const bdgW  = ctxt.length * (AREA_COUNT_FONT_SIZE * 0.65) + 20;

      // Vertical center both elements in the AREA_PAD_TOP space above first node
      const topGap   = AREA_PAD_TOP;               // total space above first node
      const labelY   = by1 + (topGap - lblH) / 2;  // vertically centered
      const lblX     = bx1 + 18;
      const bdgX     = box.x2 - bdgW - 18;
      const badgeY   = by1 + (topGap - bdgH) / 2;

      // -- Area name pill (left) ---------------------------------------------
      areaLayer.append('rect')
        .attr('x', lblX + 3).attr('y', labelY + 3)
        .attr('width', lblW).attr('height', lblH)
        .attr('rx', lblH / 2).attr('ry', lblH / 2)
        .attr('fill', 'rgba(0,0,0,0.28)');

      areaLayer.append('rect')
        .attr('x', lblX).attr('y', labelY)
        .attr('width', lblW).attr('height', lblH)
        .attr('rx', lblH / 2).attr('ry', lblH / 2)
        .attr('fill', border)
        .attr('stroke', 'rgba(255,255,255,0.4)').attr('stroke-width', 1.5);

      areaLayer.append('text')
        .attr('x', lblX + lblW / 2).attr('y', labelY + lblH / 2)
        .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
        .style('font-size',      `${AREA_LABEL_FONT_SIZE}px`)
        .style('font-family',    'Segoe UI, Arial, sans-serif')
        .style('font-weight',    'bold')
        .style('fill',           '#ffffff')
        .style('letter-spacing', '0.5px')
        .style('pointer-events', 'none')
        .text(name);

      // -- Node count badge (right) ------------------------------------------
      areaLayer.append('rect')
        .attr('x', bdgX + 2).attr('y', badgeY + 2)
        .attr('width', bdgW).attr('height', bdgH)
        .attr('rx', bdgH / 2).attr('ry', bdgH / 2)
        .attr('fill', 'rgba(0,0,0,0.18)');

      areaLayer.append('rect')
        .attr('x', bdgX).attr('y', badgeY)
        .attr('width', bdgW).attr('height', bdgH)
        .attr('rx', bdgH / 2).attr('ry', bdgH / 2)
        .attr('fill', '#ffffff').attr('stroke', border).attr('stroke-width', 2.5);

      areaLayer.append('text')
        .attr('x', bdgX + bdgW / 2).attr('y', badgeY + bdgH / 2)
        .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
        .style('font-size',      `${AREA_COUNT_FONT_SIZE}px`)
        .style('font-family',    'Segoe UI, Arial, sans-serif')
        .style('fill',           border)
        .style('font-weight',    'bold')
        .style('pointer-events', 'none')
        .text(ctxt);
    });
  }

  // -- Step 5: Draw edges in overlay SVG -------------------------------------
  const smoothLine = d3.line().x(d => d.x).y(d => d.y).curve(d3.curveBasis);
  const orthoLine  = d3.line().x(d => d.x).y(d => d.y).curve(d3.curveLinear);

  dagreGraph.edges().forEach(e => {
    if (clusterIds?.has(e.v) || clusterIds?.has(e.w)) return;
    const dagreEdge = dagreGraph.edge(e);
    if (!dagreEdge?.points) return;

    const meta     = edgeMeta[`${e.v}|${e.w}`] || {};
    const fromArea = _getNodeArea(e.v, areaMap);
    const toArea   = _getNodeArea(e.w, areaMap);

    let points, lineGen;
    if (fromArea && toArea && fromArea !== toArea) {
      points  = _routeCrossArea(e.v, e.w, areaBoxes[fromArea], areaBoxes[toArea], finalPos)
                || dagreEdge.points;
      lineGen = orthoLine;
    } else {
      points  = dagreEdge.points;
      lineGen = smoothLine;
    }

    // White halo
    edgeLayer.append('path')
      .attr('d',            lineGen(points))
      .attr('stroke',       '#ffffff')
      .attr('stroke-width', (meta.width || 2.5) + 4)
      .attr('fill',         'none')
      .attr('opacity',      0.75);

    // Edge
    edgeLayer.append('path')
      .attr('d',                lineGen(points))
      .attr('stroke',           meta.color || '#555')
      .attr('stroke-width',     meta.width || 2.5)
      .attr('stroke-dasharray', meta.style === 'dashed' ? '10,5' : null)
      .attr('fill',             'none')
      .attr('marker-end',
        meta.marker === 'url(#arrow-dashed)' ? 'url(#arrow-dashed2)' : 'url(#arrow2)');

    // "wraps" label pill
    if (meta.label) {
      const mp = _midpoint(points);
      const lw = meta.label.length * 8 + 16, lh = 22;
      edgeLayer.append('rect')
        .attr('x', mp.x - lw / 2).attr('y', mp.y - lh / 2)
        .attr('width', lw).attr('height', lh)
        .attr('rx', 11).attr('ry', 11)
        .attr('fill', '#ffffff')
        .attr('stroke', meta.color || '#FF9800').attr('stroke-width', 2);
      edgeLayer.append('text')
        .attr('x', mp.x).attr('y', mp.y)
        .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
        .style('font-size', '11px').style('font-family', 'Segoe UI, Arial, sans-serif')
        .style('font-style', 'italic').style('font-weight', 'bold')
        .style('fill', meta.color || '#FF9800').style('pointer-events', 'none')
        .text(meta.label);
    }
  });

  // -- Step 6: Resize both SVGs ----------------------------------------------
  const svgWidth  = Math.max(maxX, containerWidth);
  const svgHeight = Math.max(maxY, 400);
  svg.attr('width',     svgWidth).attr('height',     svgHeight);
  svgEdge.attr('width', svgWidth).attr('height', svgHeight);

  // -- Step 7: Center on load ------------------------------------------------
  let minX = Infinity;
  foMap.forEach(({ node }) => { minX = Math.min(minX, node.x - node.width / 2); });
  if (minX === Infinity) minX = 0;

  const graphW = maxX - minX;
  const scale  = graphW > containerWidth
    ? Math.max(containerWidth / (graphW + 120), 0.08)
    : 1;
  const tx = (containerWidth / 2) - (graphW * scale / 2) - (minX * scale) + 30;

  svg.call(zoom.transform, d3.zoomIdentity.translate(tx, 40).scale(scale));
  return { svgWidth, svgHeight };
}
