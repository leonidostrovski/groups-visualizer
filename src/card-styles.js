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
  .header-version { font-size: 11px; font-weight: normal; opacity: 0.65; margin-left: 6px; }
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

  /* -- Area popup -------------------------------------------------------- */
  .area-popup-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.45);
    display: flex; align-items: center; justify-content: center;
  }
  .area-popup {
    background: #fff; border-radius: 12px;
    min-width: 320px; max-width: 480px; width: 90%;
    max-height: 80vh; overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0,0,0,0.35);
    font-family: Segoe UI, Arial, sans-serif;
    display: flex; flex-direction: column;
  }
  .area-popup-header {
    display: flex; align-items: center; justify-content: space-between;
    background: #1a237e; color: #fff;
    padding: 14px 16px; border-radius: 12px 12px 0 0;
    font-size: 16px; font-weight: bold; flex-shrink: 0;
  }
  .area-popup-close {
    background: none; border: none; color: #fff;
    font-size: 20px; cursor: pointer; padding: 0 4px; line-height: 1;
  }
  .area-popup-close:hover { opacity: 0.75; }
  .area-popup-section {
    padding: 10px 16px; border-bottom: 1px solid #eee;
  }
  .area-popup-label {
    font-size: 10px; font-weight: bold; color: #777;
    text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 6px;
  }
  .area-popup-alias { font-size: 12px; color: #444; padding: 2px 0; }
  .area-popup-entity {
    display: flex; flex-direction: column;
    padding: 5px 0; border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
  }
  .area-popup-entity:hover { background: #f5f5f5; margin: 0 -16px; padding: 5px 16px; }
  .area-popup-entity:last-child { border-bottom: none; }
  .area-popup-entity-name { font-size: 12px; color: #222; font-weight: 500; }
  .area-popup-eid { font-size: 10px; color: #999; font-family: monospace; margin-top: 1px; }
  .area-popup-none { font-size: 12px; color: #aaa; }
  .area-popup-footer {
    padding: 12px 16px; text-align: right; flex-shrink: 0;
  }
  .area-popup-btn {
    background: #1a237e; color: #fff;
    border: none; border-radius: 8px;
    padding: 8px 18px; font-size: 13px;
    cursor: pointer; font-weight: 600;
  }
  .area-popup-btn:hover { background: #283593; }
`;