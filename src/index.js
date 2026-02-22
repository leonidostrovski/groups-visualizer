import { LitElement, html } from 'lit';
import { cardStyles } from './card-styles.js';
import { fetchAllData, buildTabs, buildSubTabs, makeTimestamp } from './card-data.js';
import { refreshStates, renderGraph, countNodes } from './card-actions.js';

customElements.define('groups-visualizer', class GroupsVisualizer extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      config: { attribute: false },
      _tabs: { state: true },
      _activeTab: { state: true },
      _activeSubTab: { state: true },
      _loading: { state: true },
      _timestamp: { state: true }
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

    this._buildInProgress = false;
    this._buildDone = false;
    this._stateUpdatePending = false;
    this._lastHassRef = null;

    // bind once
    this._onBadgeClick = this._onBadgeClick.bind(this);
  }

  // Capture-phase click delegation so badge clicks are always caught
  firstUpdated() {
    this.shadowRoot.addEventListener('click', this._onBadgeClick, { capture: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    if (this.shadowRoot) {
      this.shadowRoot.removeEventListener('click', this._onBadgeClick, { capture: true });
    }
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
    const { roots, pairs, lookup, group_ids, registry } =
      await fetchAllData(this.hass); // existing helper  [1](blob:https://www.microsoft365.com/fd5b1d87-2e32-4224-9963-9b6c15a343eb)

    this._pairs = pairs;
    this._lookup = lookup;
    this._group_ids = group_ids;
    this._registry = registry;
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
    // Find element (or its ancestors) having data-state-badge
    const path = e.composedPath ? e.composedPath() : [];
    let badge = null;
    for (const n of path) {
      if (n && n.dataset && n.dataset.stateBadge) { badge = n; break; }
      if (n === this.shadowRoot) break;
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

  render() {
    if (this._loading)
      return html`<ha-card><div class="loading">Loading groups...</div></ha-card>`;
    if (!this._tabs || !Object.keys(this._tabs).length)
      return html`<ha-card><div class="loading">No groups found.</div></ha-card>`;

    const tabKeys = Object.keys(this._tabs);
    const activeTab = this._activeTab;
    const activeRoots = this._tabs[activeTab] || [];
    const activeRid = this._activeSubTab[activeTab];

    return html`
      <ha-card>

        <div class="header">
          <div>
            <div class="header-title">Group Visualizer</div>
            <div class="header-subtitle">Color by type - Entity ID - Voice labels</div>
          </div>
          <div class="header-actions">
            <button class="refresh-btn" title="Rebuild current tree"
              @click=${() => this._rebuildCurrentTree()}>
              Rebuild
            </button>
            <button class="refresh-btn" title="Full rebuild current tree (re-fetch data)"
              @click=${() => this._fullRebuildCurrentTree()}>
              Full Rebuild
            </button>
            <div class="header-timestamp">${this._timestamp || '...'}</div>
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
                title="${name} — ${n} nodes"
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

      </ha-card>`;
  }
});