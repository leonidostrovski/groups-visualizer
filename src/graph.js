import * as d3 from 'd3';
import { buildLayout } from './graph-layout.js';
import { renderGraph } from './graph-render.js';

export class GroupsGraph {
  constructor(container, width) {
    this.container = container;
    this.width     = width || 1400;

    // Container must be relative so the edge overlay SVG can be
    // positioned absolutely on top of the node SVG
    d3.select(container).style('position', 'relative');

    // -- SVG 1: area backgrounds + nodes (foreignObject) ------------------
    this.svg = d3.select(container).append('svg')
      .attr('width',  this.width)
      .attr('height', 600)
      .style('display', 'block');

    const defs = this.svg.append('defs');
    defs.append('marker')
      .attr('id', 'arrow').attr('viewBox', '0 -8 16 16')
      .attr('refX', 15).attr('refY', 0)
      .attr('markerWidth', 12).attr('markerHeight', 12)
      .attr('orient', 'auto')
      .append('path').attr('d', 'M0,-8L16,0L0,8Z').attr('fill', '#555');

    defs.append('marker')
      .attr('id', 'arrow-dashed').attr('viewBox', '0 -8 16 16')
      .attr('refX', 15).attr('refY', 0)
      .attr('markerWidth', 12).attr('markerHeight', 12)
      .attr('orient', 'auto')
      .append('path').attr('d', 'M0,-8L16,0L0,8Z').attr('fill', '#FF9800');

    this.svgG = this.svg.append('g');

    // -- SVG 2: edges only — absolutely on top, pointer-events: none -------
    // Because foreignObject HTML always composites above SVG siblings,
    // the ONLY reliable way to draw edges on top of nodes is a separate
    // SVG element layered via CSS z-index / absolute positioning.
    this.svgEdge = d3.select(container).append('svg')
      .attr('width',  this.width)
      .attr('height', 600)
      .style('position',       'absolute')
      .style('top',            '0')
      .style('left',           '0')
      .style('pointer-events', 'none');   // clicks pass through to nodes below

    const defs2 = this.svgEdge.append('defs');
    defs2.append('marker')
      .attr('id', 'arrow2').attr('viewBox', '0 -8 16 16')
      .attr('refX', 15).attr('refY', 0)
      .attr('markerWidth', 12).attr('markerHeight', 12)
      .attr('orient', 'auto')
      .append('path').attr('d', 'M0,-8L16,0L0,8Z').attr('fill', '#555');

    defs2.append('marker')
      .attr('id', 'arrow-dashed2').attr('viewBox', '0 -8 16 16')
      .attr('refX', 15).attr('refY', 0)
      .attr('markerWidth', 12).attr('markerHeight', 12)
      .attr('orient', 'auto')
      .append('path').attr('d', 'M0,-8L16,0L0,8Z').attr('fill', '#FF9800');

    this.svgEdgeG = this.svgEdge.append('g');

    // -- Zoom: applied to main SVG, synced to edge SVG --------------------
    this.zoom = d3.zoom()
      .scaleExtent([0.05, 3])
      .on('zoom', e => {
        this.svgG.attr('transform',     e.transform);
        this.svgEdgeG.attr('transform', e.transform);  // keep in sync
      });
    this.svg.call(this.zoom);
  }

  build_graph(roots, lookup, pairs, group_ids, show_voice_labels = true, registry = {}) {
    const { dagreGraph, edgeMeta, measuredHeights, areaMap, clusterIds } =
      buildLayout(roots, lookup, pairs, group_ids, show_voice_labels, registry);

    this._dagreGraph      = dagreGraph;
    this._edgeMeta        = edgeMeta;
    this._measuredHeights = measuredHeights;
    this._areaMap         = areaMap;
    this._clusterIds      = clusterIds;
  }

  render() {
    return renderGraph(
      this.svg,
      this.svgG,
      this.svgEdge,
      this.svgEdgeG,
      this.zoom,
      this._dagreGraph,
      this._edgeMeta,
      this._measuredHeights,
      this.width,
      this._areaMap,
      this._clusterIds
    );
  }
}
