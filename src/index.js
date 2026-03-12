import { LitElement, html } from 'lit';
import { cardStyles } from './card-styles.js';
import { fetchAllData, buildTabs, buildSubTabs, makeTimestamp } from './card-data.js';
import { refreshStates, renderGraph, countNodes } from './card-actions.js';
import { CARD_VERSION } from './constants.js';

customElements.define('groups-visualizer', class GroupsVisualizer extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      config: { attribute: false },
      _tabs: { state: true },
      _activeTab: { state: true },
      _activeSubTab: { state: true },
      _loading: { state: true },
      _timestamp: { state: true },
      _areaPopup: { state: true }
    };
  }

  static get styles() { return cardStyles; }

  static getStubConfig() {
    return { show_domains: {}, show_voice_labels: true };
  }

  constructor() {
    super();
    this._tabs = {};
    this._activeTab = null;
    this._activeSubTab = {};
    this._loading = true;

    this._graphCache = {};             // rootId -> GroupsGraph
    this._pairs = {};
    this._lookup = {};
    this._group_ids = new Set();
    this._registry = { entities: {}, areas: {}, labels: {} };
    this._timestamp = null;
    this._debug = null;

    this._buildInProgress = false;
    this._buildDone = false;
    this._stateUpdatePending = false;
    this._lastHassRef = null;
    this._areaPopup = null;

    // bind once
    this._onBadgeClick = this._onBadgeClick.bind(this);
  }

  // Capture-phase click delegation — re-attached on every connect so
  // back-navigation (which re-inserts the element) keeps clicks working.
  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.addEventListener('click', this._onBadgeClick, { capture: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.shadowRoot.removeEventListener('click', this._onBadgeClick, { capture: true });
  }

  setConfig(config) {
    const prev = this.config;
    this.config = config;
    if (this._buildDone && JSON.stringify(prev) !== JSON.stringify(config)) {
      this._graphCache = {};
      this._triggerBuild();
    }
  }

  updated(changedProps) {
    if (!changedProps.has('hass') || !this.hass) return;
    if (this.hass === this._lastHassRef) return;
    this._lastHassRef = this.hass;

    if (!this._buildDone) {
      this._triggerBuild();
    } else {
      // quick badge repaint on state updates
      if (!this._stateUpdatePending) {
        this._stateUpdatePending = true;
        requestAnimationFrame(() => {
          this._stateUpdatePending = false;
          refreshStates(this.shadowRoot, this.hass);
        });
      }
    }
  }

  _triggerBuild() {
    if (this._buildInProgress) return;
    this._buildGraph();
  }

  async _buildGraph() {
    if (!this.hass) return;
    this._buildInProgress = true;
    if (!this._buildDone) this._loading = true;

    // Fetch states + registries and compute roots/pairs/lookup/registry
    const { roots, pairs, lookup, group_ids, registry, _debug } =
      await fetchAllData(this.hass); // existing helper  [1](blob:https://www.microsoft365.com/fd5b1d87-2e32-4224-9963-9b6c15a343eb)

    this._pairs = pairs;
    this._lookup = lookup;
    this._group_ids = group_ids;
    this._registry = registry;
    this._debug = _debug;
    this._timestamp = makeTimestamp();

    this._tabs = buildTabs(roots, this.config);
    this._activeSubTab = buildSubTabs(this._tabs, this._activeSubTab);

    if (!this._activeTab || !this._tabs[this._activeTab])
      this._activeTab = Object.keys(this._tabs)[0] || null;

    this._graphCache = {};
    this._loading = false;
    this._buildDone = true;
    this._buildInProgress = false;

    this.requestUpdate();
    this.updateComplete.then(() => {
      const rid = this._activeSubTab[this._activeTab];
      if (rid) this._doRender(rid);
    });
  }

  _showMainTab(tab) {
    this._activeTab = tab;
    this._graphCache = {}; // new DOM canvas ? render fresh
    this.requestUpdate();
    this.updateComplete.then(() => {
      const rid = this._activeSubTab[tab];
      if (rid) this._doRender(rid);
    });
  }

  _showSubTab(cat, entity_id) {
    this._activeSubTab = { ...this._activeSubTab, [cat]: entity_id };
    this.requestUpdate();
    this.updateComplete.then(() => this._doRender(entity_id));
  }

  _doRender(entity_id) {
    renderGraph(
      entity_id,
      this.shadowRoot,
      this._lookup,
      this._pairs,
      this._group_ids,
      this.config?.show_voice_labels !== false,
      this._registry,
      this._graphCache
    ); // renders only the requested root tree  [1](blob:https://www.microsoft365.com/fd5b1d87-2e32-4224-9963-9b6c15a343eb)
  }

  // ---------- Header actions ----------
  _rebuildCurrentTree() {
    const rid = this._activeSubTab?.[this._activeTab];
    if (!rid) return;
    if (this._graphCache && this._graphCache[rid]) delete this._graphCache[rid];
    this._doRender(rid);
  }

  async _fullRebuildCurrentTree() {
    if (!this.hass) return;

    const currentTab = this._activeTab;
    const currentRid = this._activeSubTab?.[currentTab] || null;

    const { roots, pairs, lookup, group_ids, registry } =
      await fetchAllData(this.hass); // fresh snapshot  [1](blob:https://www.microsoft365.com/fd5b1d87-2e32-4224-9963-9b6c15a343eb)

    this._pairs = pairs;
    this._lookup = lookup;
    this._group_ids = group_ids;
    this._registry = registry;
    this._timestamp = makeTimestamp();

    this._tabs = buildTabs(roots, this.config);
    this._activeSubTab = buildSubTabs(this._tabs, this._activeSubTab);

    if (!this._activeTab || !this._tabs[this._activeTab]) {
      this._activeTab = Object.keys(this._tabs)[0] || null;
    }

    let rid = currentRid;
    const stillExists = rid && Object.values(this._tabs).flat().find(r => r.entity_id === rid);
    if (!stillExists) rid = this._activeSubTab[this._activeTab] || null;

    if (rid && this._graphCache && this._graphCache[rid]) delete this._graphCache[rid];

    this.requestUpdate();
    this.updateComplete.then(() => {
      if (rid) this._doRender(rid);
    });
  }

  // ---------- Clickable ON/OFF badge ----------
  async _onBadgeClick(e) {
    // Find element (or its ancestors) having data-state-badge or data-more-info
    const path = e.composedPath ? e.composedPath() : [];
    let badge = null;
    let moreInfo = null;
    let areaNave = null;
    let copyEl = null;
    for (const n of path) {
      if (n && n.dataset) {
        if (n.dataset.stateBadge)              { badge = n; break; }
        if (n.dataset.moreInfo)                { moreInfo = n; break; }
        if (n.dataset.areaNav)                 { areaNave = n; break; }
        if (n.dataset.copyText !== undefined)  { copyEl = n; break; }
      }
      if (n === this.shadowRoot) break;
    }

    if (moreInfo) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const eid = moreInfo.getAttribute('data-entity-id');
      if (eid) {
        this.dispatchEvent(new CustomEvent('hass-more-info', {
          detail: { entityId: eid },
          bubbles: true,
          composed: true
        }));
      }
      return;
    }

    if (areaNave) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const areaId = areaNave.getAttribute('data-area-id');
      if (areaId) this._openAreaPopup(areaId);
      return;
    }

    if (copyEl) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const txt = copyEl.getAttribute('data-copy-text') || '';
      if (!txt) return;
      const _legacyCopy = t => {
        try {
          const ta = document.createElement('textarea');
          ta.value = t; ta.style.cssText = 'position:fixed;top:-999px;opacity:0';
          document.body.appendChild(ta); ta.focus(); ta.select();
          document.execCommand('copy'); document.body.removeChild(ta);
        } catch(_) {}
      };
      if (navigator.clipboard) navigator.clipboard.writeText(txt).catch(() => _legacyCopy(txt));
      else _legacyCopy(txt);
      const preview = txt.length > 45 ? txt.substring(0, 45) + '...' : txt;
      const toast = document.createElement('div');
      toast.innerText = 'Copied: ' + preview;
      toast.style.cssText = 'position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:#323232;color:#fff;padding:10px 24px;border-radius:24px;font-size:13px;z-index:999999;pointer-events:none;opacity:1;transition:opacity 0.4s ease';
      document.body.appendChild(toast);
      setTimeout(() => { toast.style.opacity = '0'; }, 1200);
      setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 1650);
      return;
    }

    if (!badge) return;

    e.preventDefault();
    e.stopImmediatePropagation(); // prevent row copy handlers

    const eid = badge.getAttribute('data-entity-id');
    if (!eid || !this.hass) return;

    const domain = eid.split('.')[0];
    const supported = new Set(['switch', 'light', 'fan', 'group']);
    if (!supported.has(domain)) return;

    const cur = (this.hass.states?.[eid]?.state || 'unknown').toLowerCase();
    const turnOn = (cur !== 'on');
    const service = turnOn ? 'turn_on' : 'turn_off';

    try {
      await this.hass.callService(domain, service, { entity_id: eid });
      // repaint badge text/bg using current hass.states
      refreshStates(this.shadowRoot, this.hass);
    } catch (err) {
      console.error('[groups-visualizer] toggle failed', domain, service, eid, err);
    }
  }

  _openAreaPopup(areaId) {
    const area = (this._registry?.areas || {})[areaId];
    const entities = Object.entries(this._registry?.entities || {})
      .filter(([, e]) => e.area_id === areaId)
      .map(([eid]) => ({
        eid,
        name: this._lookup[eid]?.attributes?.friendly_name || eid
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    this._areaPopup = { areaId, area, entities };
  }

  _closeAreaPopup() {
    this._areaPopup = null;
  }

  _openAreaPage(areaId) {
    this._areaPopup = null;
    history.pushState(null, '', `/config/areas/area/${areaId}`);
    window.dispatchEvent(new CustomEvent('location-changed', { bubbles: false }));
  }

  _renderAreaPopup() {
    const { areaId, area, entities } = this._areaPopup;
    const name    = area?.name || areaId;
    const aliases = Array.isArray(area?.aliases) ? area.aliases : [];

    return html`
      <div class="area-popup-overlay"
           @click=${(e) => { if (e.target === e.currentTarget) this._closeAreaPopup(); }}>
        <div class="area-popup">

          <div class="area-popup-header">
            <span>${name}</span>
            <button class="area-popup-close" @click=${() => this._closeAreaPopup()}>✕</button>
          </div>

          ${aliases.length ? html`
            <div class="area-popup-section">
              <div class="area-popup-label">Voice Aliases</div>
              ${aliases.map(a => html`<div class="area-popup-alias">💬 ${a}</div>`)}
            </div>` : ''}

          <div class="area-popup-section">
            <div class="area-popup-label">Entities (${entities.length})</div>
            ${entities.length === 0
              ? html`<div class="area-popup-none">No entities assigned</div>`
              : entities.map(({ eid, name: en }) => html`
                  <div class="area-popup-entity"
                       @click=${() => this.dispatchEvent(new CustomEvent('hass-more-info',
                                  { detail: { entityId: eid }, bubbles: true, composed: true }))}>
                    <span class="area-popup-entity-name">${en}</span>
                    <span class="area-popup-eid">${eid}</span>
                  </div>`)}
          </div>

          <div class="area-popup-footer">
            <button class="area-popup-btn" @click=${() => this._openAreaPage(areaId)}>
              Open Area Settings ↗
            </button>
          </div>

        </div>
      </div>`;
  }

  render() {
    if (this._loading)
      return html`<ha-card><div class="loading">Loading groups...</div></ha-card>`;
    if (!this._tabs || !Object.keys(this._tabs).length) {
      const d = this._debug;
      return html`<ha-card><div class="loading" style="font-size:11px;text-align:left;padding:12px;font-family:monospace;white-space:pre-wrap">No groups found (v${CARD_VERSION}).
${d ? `states: ${d.total_states}  entity_reg: ${d.entity_reg_size}  reg[platform=group]: ${d.reg_group_platform.length}
group.* in states: ${d.group_domain_states.length}
  ${d.group_domain_states.map(g=>`${g.id} [${g.state}] members=${JSON.stringify(g.members)}`).join('\n  ')}
groups with members: ${d.groups_with_members.length}
  ${d.groups_with_members.map(g=>`${g.id} -> [${g.members.join(', ')}]`).join('\n  ')}
hierarchical: [${d.hierarchical.join(', ')}]
roots: [${d.roots.join(', ')}]` : '(debug unavailable)'}
</div></ha-card>`;
    }

    const tabKeys = Object.keys(this._tabs);
    const activeTab = this._activeTab;
    const activeRoots = this._tabs[activeTab] || [];
    const activeRid = this._activeSubTab[activeTab];

    return html`
      <ha-card>

        <div class="header">
          <div>
            <div class="header-title">Group Visualizer <span class="header-version">v${CARD_VERSION}</span></div>
            <div class="header-subtitle">Color by type - Entity ID - Voice labels</div>
          </div>
          <div class="header-actions">
            <button class="refresh-btn" title="Full rebuild (re-fetch data)"
              @click=${() => this._fullRebuildCurrentTree()}>
              Rebuild
            </button>
            <div class="header-timestamp"><span style="opacity:0.7;font-family:Segoe UI,Arial,sans-serif;font-size:10px;margin-right:5px">Last rebuild:</span>${this._timestamp || '...'}</div>
          </div>
        </div>

        <div class="main-tabs">
          ${tabKeys.map(tab => html`
            <button class="main-tab ${tab === activeTab ? 'active' : ''}"
              @click=${() => this._showMainTab(tab)}>
              ${tab} (${this._tabs[tab].length})
            </button>`)}
        </div>

        <div class="sub-tabs">
          ${activeRoots.map(root => {
            const rid = root.entity_id;
            const name = root.attributes?.friendly_name || rid;
            const n = countNodes(root, this._pairs, this._lookup, this._group_ids);
            return html`
              <button class="sub-tab ${rid === activeRid ? 'active' : ''}"
                title="${name} � ${n} nodes"
                @click=${() => this._showSubTab(activeTab, rid)}>
                ${name}
              </button>`;
          })}
        </div>

        <div class="graph-viewport">
          ${activeRoots.map(root => {
            const rid = root.entity_id;
            return html`
              <div style="display:${rid === activeRid ? 'block' : 'none'}"
                   class="graph-canvas">
                <div id="graph-${rid}"></div>
              </div>`;
          })}
        </div>

      </ha-card>

      ${this._areaPopup ? this._renderAreaPopup() : ''}`;
  }
});