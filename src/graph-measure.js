import { NODE_WIDTH } from './constants.js';

// Renders each node HTML into a hidden off-screen container
// and reads offsetHeight for accurate pre-layout measurement.
export function measureHeights(nodeLabels) {
  const host = document.createElement('div');
  host.style.cssText = [
    'position:absolute',
    'left:-99999px',
    'top:0',
    'visibility:hidden',
    'pointer-events:none',
    `width:${NODE_WIDTH}px`,
    'font-family:Segoe UI,Arial,sans-serif',
    'font-size:12px'
  ].join(';');
  document.body.appendChild(host);

  const heights = {};
  nodeLabels.forEach((html, id) => {
    const wrapper       = document.createElement('div');
    wrapper.style.width = NODE_WIDTH + 'px';
    wrapper.innerHTML   = html;
    host.appendChild(wrapper);
    heights[id] = wrapper.offsetHeight + 16;
    host.removeChild(wrapper);
  });

  document.body.removeChild(host);
  return heights;
}
