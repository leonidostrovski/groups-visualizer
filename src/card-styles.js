import { css } from 'lit';
export const cardStyles = css`
  :host { display: block; width: 100%; }
  ha-card { width: 100%; box-sizing: border-box; padding: 0; }

  /* -- Header ---------------------------------------------------------- */
  .header {
    display: flex; align-items: center; justify-content: space-between;
    background: #1a237e; color: #fff; padding: 10px 16px;
    font-family: Segoe UI, Arial, sans-serif;
  }
  .header-title { font-size: 16px; font-weight: bold; }
  .header-subtitle { font-size: 11px; opacity: 0.75; margin-top: 2px; }

  .header-actions { display: flex; align-items: center; gap: 8px; }
  .header-timestamp {
    font-size: 12px; background: rgba(255,255,255,0.15);
    padding: 4px 12px; border-radius: 12px;
    font-family: monospace; white-space: nowrap;
  }
  .refresh-btn {
    border: 2px solid rgba(255,255,255,0.85);
    background: #ffffff; color: #1a237e;
    font-weight: 700; font-size: 12px; padding: 6px 12px;
    border-radius: 14px; cursor: pointer; transition: background .15s ease, transform .05s ease;
  }
  .refresh-btn:hover { background: #f2f2f2; }
  .refresh-btn:active { transform: translateY(1px); }

  /* -- Main category tabs ---------------------------------------------- */
  .main-tabs {
    display: flex; flex-wrap: wrap; gap: 4px;
    background: #283593; padding: 8px 12px;
    position: sticky; top: 0; z-index: 20;
    border-bottom: 3px solid #1a237e;
  }
  .main-tab {
    padding: 6px 18px; border: none;
    background: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.8);
    cursor: pointer; border-radius: 20px;
    font-weight: 500; font-size: 13px;
    font-family: Segoe UI, Arial, sans-serif;
    transition: background 0.15s;
  }
  .main-tab:hover { background: rgba(255,255,255,0.22); color: #fff; }
  .main-tab.active { background: #fff; color: #1a237e; font-weight: bold; }

  /* -- Sub-tabs per tree ----------------------------------------------- */
  .sub-tabs {
    display: flex; flex-wrap: wrap; gap: 4px;
    background: var(--card-background-color, #f5f5f5);
    padding: 6px 12px;
    border-bottom: 2px solid var(--divider-color, #ddd);
    position: sticky; top: 49px; z-index: 19;
  }
  .sub-tab {
    padding: 4px 14px; border: 2px solid transparent;
    background: transparent; color: var(--secondary-text-color);
    cursor: pointer; border-radius: 14px;
    font-size: 12px; font-weight: 500;
    font-family: Segoe UI, Arial, sans-serif;
    transition: all 0.15s; white-space: nowrap;
    max-width: 260px; overflow: hidden; text-overflow: ellipsis;
  }
  .sub-tab:hover {
    background: var(--secondary-background-color);
    border-color: var(--primary-color);
  }
  .sub-tab.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: #fff; font-weight: bold;
  }

  /* -- Graph viewport -------------------------------------------------- */
  .graph-viewport {
    width: 100%; height: calc(100vh - 200px);
    min-height: 500px; overflow: auto;
    background: #ececec; box-sizing: border-box;
  }
  .graph-canvas {
    width: 100%; overflow-x: auto;
    background: #f5f5f5; cursor: grab;
  }
  .graph-canvas:active { cursor: grabbing; }

  .loading {
    text-align: center; padding: 60px;
    color: var(--secondary-text-color); font-size: 16px;
  }
`;