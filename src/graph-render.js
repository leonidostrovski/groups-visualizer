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
  Object.entries(areaMap).forEach(([areaId, { node_ids, topPad }]) => {
    const pos = node_ids.map(id => finalPos.get(id)).filter(Boolean);
    if (!pos.length) return;
    const top = topPad !== undefined ? topPad : AREA_PAD_TOP;
    boxes[areaId] = {
      x1: Math.min(...pos.map(p => p.x))       - AREA_PAD_X,
      y1: Math.min(...pos.map(p => p.y))       - top,
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

      // Area name pill � left side, vertically centered in the top stripe gap
      const { lblH } = _drawAreaLabel(
        areaLayer, name, border,
        bx1 + 18,           // lblX
        by1 + 12            // lblY
      );

      // Node count badge � right side, same vertical center as label
      const badgeY = by1 + 12 + (lblH - AREA_COUNT_FONT_SIZE * 2) / 2;
      const { cw } = _drawCountBadge(
        areaLayer, positions.length, border,
        box.x2 - 18,        // cx � will be adjusted by cw inside helper
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
  // (Refactored below � the block above is replaced entirely by this one)

  // ... Actually let's just inline it cleanly in a single pass:

  // -- Step 4 CLEAN: Draw area backgrounds ----------------------------------
  areaLayer.selectAll('*').remove();

  if (areaMap && Object.keys(areaMap).length > 0) {
    let ci = 0;
    Object.entries(areaMap).forEach(([areaId, areaData]) => {
      const { name, node_ids, aliases = [], topPad = AREA_PAD_TOP } = areaData;
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

      // -- Unified card: area name header + voice aliases --------------------
      const CHAR_W    = AREA_LABEL_FONT_SIZE * 0.62;
      const nameRowH  = Math.round(AREA_LABEL_FONT_SIZE * 2.2);
      const penSize   = Math.round(nameRowH * 0.48);
      const penPad    = (nameRowH - penSize) / 2;
      const penScale  = penSize / 24;
      const bRx       = 12;
      const chipH     = 24;
      const chipGapX  = 6;
      const chipGapY  = 5;
      const chipPadX  = 12;
      const chipPadY  = 7;
      const voiceHdrH = 18;

      // Content-fit width: enough for name row or chip row, capped at box width
      const maxBlockW    = Math.min(bw - 28, 600);
      const nameContentW = penPad + 4 + penSize + 8 + name.length * CHAR_W + 20;
      const chipDefs     = aliases.map(a => ({ alias: a, cw: Math.min(a.length * 7.5 + 42, 300) }));
      const singleRowW   = chipDefs.reduce((s, c) => s + c.cw + chipGapX, 2 * chipPadX - chipGapX);
      const blockW       = Math.min(Math.max(nameContentW, aliases.length ? singleRowW : 0, 120), maxBlockW);

      // Lay out chips with wrapping
      const chipAreaW = blockW - 2 * chipPadX;
      const chipRows  = [[]];
      let rowW = 0;
      chipDefs.forEach(c => {
        const cw = Math.min(c.cw, chipAreaW);
        if (rowW > 0 && rowW + cw + chipGapX > chipAreaW) { chipRows.push([]); rowW = 0; }
        chipRows[chipRows.length - 1].push({ alias: c.alias, cw });
        rowW += cw + chipGapX;
      });

      const hasAliases = aliases.length > 0;
      const aliasPartH = voiceHdrH + chipPadY
        + (hasAliases ? chipRows.length * (chipH + chipGapY) - chipGapY : chipH)
        + chipPadY;
      const blockX = bx1 + 18;
      const blockY = by1 + 8;
      const blockH = nameRowH + aliasPartH;

      // Drop shadow
      areaLayer.append('rect')
        .attr('x', blockX + 3).attr('y', blockY + 3)
        .attr('width', blockW).attr('height', blockH)
        .attr('rx', bRx).attr('ry', bRx)
        .attr('fill', 'rgba(0,0,0,0.22)');

      // Name header — top-rounded, flat bottom
      const nhP = `M${blockX+bRx} ${blockY} L${blockX+blockW-bRx} ${blockY} Q${blockX+blockW} ${blockY} ${blockX+blockW} ${blockY+bRx} L${blockX+blockW} ${blockY+nameRowH} L${blockX} ${blockY+nameRowH} L${blockX} ${blockY+bRx} Q${blockX} ${blockY} ${blockX+bRx} ${blockY}Z`;
      areaLayer.append('path').attr('d', nhP).attr('fill', border)
        .attr('data-copy-text', name).style('cursor', 'copy');

      // Alias section — flat top, bottom-rounded
      const asP = `M${blockX} ${blockY+nameRowH} L${blockX+blockW} ${blockY+nameRowH} L${blockX+blockW} ${blockY+blockH-bRx} Q${blockX+blockW} ${blockY+blockH} ${blockX+blockW-bRx} ${blockY+blockH} L${blockX+bRx} ${blockY+blockH} Q${blockX} ${blockY+blockH} ${blockX} ${blockY+blockH-bRx} L${blockX} ${blockY+nameRowH}Z`;
      areaLayer.append('path').attr('d', asP).attr('fill', 'rgba(255,255,255,0.97)');

      // Outer border (full card)
      areaLayer.append('rect')
        .attr('x', blockX).attr('y', blockY).attr('width', blockW).attr('height', blockH)
        .attr('rx', bRx).attr('ry', bRx).attr('fill', 'none')
        .attr('stroke', border).attr('stroke-width', 2);

      // Separator between name and alias section
      areaLayer.append('line')
        .attr('x1', blockX).attr('y1', blockY + nameRowH)
        .attr('x2', blockX + blockW).attr('y2', blockY + nameRowH)
        .attr('stroke', border).attr('stroke-width', 1.5).style('pointer-events', 'none');

      // Pen click overlay — transparent rect over pen area, opens popup
      areaLayer.append('rect')
        .attr('x', blockX).attr('y', blockY)
        .attr('width', penPad + 2 + penSize + penPad).attr('height', nameRowH)
        .attr('fill', 'rgba(0,0,0,0)')
        .attr('data-area-nav', '1').attr('data-area-id', areaId).style('cursor', 'pointer');

      // Pencil icon in name header
      areaLayer.append('g')
        .attr('transform', `translate(${blockX+penPad+2},${blockY+penPad}) scale(${penScale})`)
        .style('pointer-events', 'none')
        .selectAll('path')
        .data([
          'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7',
          'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'
        ])
        .enter().append('path').attr('d', d => d).attr('fill', 'none')
        .attr('stroke', 'rgba(255,255,255,0.9)').attr('stroke-width', 2)
        .attr('stroke-linecap', 'round').attr('stroke-linejoin', 'round');

      // Area name text
      const iconRightX = blockX + penPad + 2 + penSize;
      const textX      = (iconRightX + 10 + blockX + blockW) / 2;
      areaLayer.append('text')
        .attr('x', textX).attr('y', blockY + nameRowH / 2)
        .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
        .style('font-size', `${AREA_LABEL_FONT_SIZE}px`).style('font-family', 'Segoe UI, Arial, sans-serif')
        .style('font-weight', 'bold').style('fill', '#ffffff')
        .style('letter-spacing', '0.5px').style('pointer-events', 'none').text(name);

      // "Area voice asst." sub-header — black text, always readable on white bg
      areaLayer.append('text')
        .attr('x', blockX + chipPadX).attr('y', blockY + nameRowH + voiceHdrH / 2 + 1)
        .attr('dominant-baseline', 'middle')
        .style('font-size', '9px').style('font-family', 'Segoe UI, Arial, sans-serif')
        .style('font-weight', '700').style('letter-spacing', '0.6px')
        .style('fill', '#111111').style('pointer-events', 'none').text('Area voice assistant');

      const chipsStartY = blockY + nameRowH + voiceHdrH + chipPadY;

      if (hasAliases) {
        chipRows.forEach((row, ri) => {
          const cy = chipsStartY + ri * (chipH + chipGapY);
          let cx = blockX + chipPadX;
          row.forEach(({ alias, cw }) => {
            areaLayer.append('rect')
              .attr('x', cx).attr('y', cy).attr('width', cw).attr('height', chipH)
              .attr('rx', chipH / 2).attr('ry', chipH / 2)
              .attr('fill', '#ffffff').attr('stroke', border).attr('stroke-width', 1.5)
              .attr('data-copy-text', alias).style('cursor', 'copy');
            areaLayer.append('text')
              .attr('x', cx + 10).attr('y', cy + chipH / 2).attr('dominant-baseline', 'middle')
              .style('font-size', '11px').style('font-family', 'Segoe UI, Arial, sans-serif')
              .style('font-weight', '600').style('fill', '#333333')
              .style('pointer-events', 'none').text('\uD83D\uDCAC\u00A0' + alias);
            cx += cw + chipGapX;
          });
        });
      } else {
        areaLayer.append('text')
          .attr('x', blockX + chipPadX).attr('y', chipsStartY + chipH / 2)
          .attr('dominant-baseline', 'middle')
          .style('font-size', '11px').style('font-family', 'Segoe UI, Arial, sans-serif')
          .style('font-style', 'italic').style('fill', '#999999')
          .style('pointer-events', 'none').text('None');
      }

      // -- Node count badge (right, aligned with name row) ------------------
      const count  = positions.length;
      const ctxt   = `${count} node${count > 1 ? 's' : ''}`;
      const bdgH   = AREA_COUNT_FONT_SIZE * 2;
      const bdgW   = ctxt.length * (AREA_COUNT_FONT_SIZE * 0.65) + 20;
      const bdgX   = box.x2 - bdgW - 18;
      const badgeY = blockY + (nameRowH - bdgH) / 2;

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
        .style('font-size', `${AREA_COUNT_FONT_SIZE}px`)
        .style('font-family', 'Segoe UI, Arial, sans-serif')
        .style('fill', border).style('font-weight', 'bold')
        .style('pointer-events', 'none').text(ctxt);
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

    // "wraps" indicator — small dot at midpoint, no overlapping pill
    if (meta.label) {
      const mp = _midpoint(points);
      edgeLayer.append('circle')
        .attr('cx', mp.x).attr('cy', mp.y).attr('r', 5)
        .attr('fill', meta.color || '#FF9800')
        .attr('stroke', '#ffffff').attr('stroke-width', 2);
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
