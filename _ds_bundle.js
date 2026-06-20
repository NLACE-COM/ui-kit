/* @ds-bundle: {"format":3,"namespace":"NLACEDesignSystem_c5a5c6","components":[{"name":"Alert","sourcePath":"src/components/Alert.jsx"},{"name":"Badge","sourcePath":"src/components/Badge.jsx"},{"name":"Button","sourcePath":"src/components/Button.jsx"},{"name":"Card","sourcePath":"src/components/Card.jsx"},{"name":"NL_CHART_PALETTE","sourcePath":"src/components/Charts.jsx"},{"name":"BarChart","sourcePath":"src/components/Charts.jsx"},{"name":"LineChart","sourcePath":"src/components/Charts.jsx"},{"name":"AreaChart","sourcePath":"src/components/Charts.jsx"},{"name":"PieChart","sourcePath":"src/components/Charts.jsx"},{"name":"DonutChart","sourcePath":"src/components/Charts.jsx"},{"name":"Dropdown","sourcePath":"src/components/Dropdown.jsx"},{"name":"Input","sourcePath":"src/components/Input.jsx"},{"name":"Spinner","sourcePath":"src/components/Loaders.jsx"},{"name":"Skeleton","sourcePath":"src/components/Loaders.jsx"},{"name":"Modal","sourcePath":"src/components/Modal.jsx"},{"name":"NlaceLogo","sourcePath":"src/components/NlaceLogo.jsx"},{"name":"NlaceAvatar","sourcePath":"src/components/NlaceLogo.jsx"},{"name":"Switch","sourcePath":"src/components/Switch.jsx"},{"name":"Table","sourcePath":"src/components/Table.jsx"},{"name":"Tabs","sourcePath":"src/components/Tabs.jsx"},{"name":"Tooltip","sourcePath":"src/components/Tooltip.jsx"}],"sourceHashes":{"decks/deck-stage.js":"522102a1c71e","src/components/Alert.jsx":"4af691c150f9","src/components/Badge.jsx":"9e58008f170a","src/components/Button.jsx":"df1b15804e10","src/components/Card.jsx":"f6c6a55578d7","src/components/Charts.jsx":"c88e0eaf56b3","src/components/Dropdown.jsx":"479d48572485","src/components/Input.jsx":"2757dee2921a","src/components/Loaders.jsx":"c3ad7372ff9e","src/components/Modal.jsx":"f5dc1a209218","src/components/NlaceLogo.jsx":"e5a358176c3e","src/components/Switch.jsx":"3d65706bfa34","src/components/Table.jsx":"4e67c8dcf9c2","src/components/Tabs.jsx":"3433cb81a979","src/components/Tooltip.jsx":"ba032e6be91e","src/index.js":"49832d40b588","src/tailwind-preset.js":"d8afe49dedd8","ui_kits/ai-studio/components.jsx":"c6f202dbe989","ui_kits/ai-studio/screens.jsx":"3dad7bee301c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NLACEDesignSystem_c5a5c6 = window.NLACEDesignSystem_c5a5c6 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// decks/deck-stage.js
try { (() => {
/**
 * <deck-stage> — reusable web component for HTML decks.
 *
 * Handles:
 *  (a) speaker notes — reads <script type="application/json" id="speaker-notes">
 *      and posts {slideIndexChanged: N} to the parent window on nav.
 *  (b) keyboard navigation — ←/→, PgUp/PgDn, Space, Home/End, number keys.
 *  (c) press R to reset to slide 0 (with a tasteful keyboard hint).
 *  (d) bottom-center overlay showing slide count + hints, fades out on idle.
 *  (e) auto-scaling — inner canvas is a fixed design size (default 1920×1080)
 *      scaled with `transform: scale()` to fit the viewport, letterboxed.
 *      Set the `noscale` attribute to render at authored size (1:1) — the
 *      PPTX exporter sets this so its DOM capture sees unscaled geometry.
 *  (f) print — `@media print` lays every slide out as its own page at the
 *      design size, so the browser's Print → Save as PDF produces a clean
 *      one-page-per-slide PDF with no extra setup.
 *
 * Slides are HIDDEN, not unmounted. Non-active slides stay in the DOM with
 * `visibility: hidden` + `opacity: 0`, so their state (videos, iframes,
 * form inputs, React trees) is preserved across navigation.
 *
 * Lifecycle event — the component dispatches a `slidechange` CustomEvent on
 * itself whenever the active slide changes (including the initial mount).
 * The event bubbles and composes out of shadow DOM, so you can listen on
 * the <deck-stage> element or on document:
 *
 *   document.querySelector('deck-stage').addEventListener('slidechange', (e) => {
 *     e.detail.index         // new 0-based index
 *     e.detail.previousIndex // previous index, or -1 on init
 *     e.detail.total         // total slide count
 *     e.detail.slide         // the new active slide element
 *     e.detail.previousSlide // the prior slide element, or null on init
 *     e.detail.reason        // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
 *   });
 *
 * Persistence: current slide index is saved to localStorage keyed by the
 * document path, so refresh returns you to the same place.
 *
 * Usage:
 *   <deck-stage width="1920" height="1080">
 *     <section data-label="Title">...</section>
 *     <section data-label="Agenda">...</section>
 *   </deck-stage>
 *
 * Slides are the direct element children of <deck-stage>. Each slide is
 * automatically tagged with:
 *   - data-screen-label="NN Label"   (1-indexed, for comment flow)
 *   - data-om-validate="no_overflowing_text,no_overlapping_text,slide_sized_text"
 */

(() => {
  const DESIGN_W_DEFAULT = 1920;
  const DESIGN_H_DEFAULT = 1080;
  const STORAGE_PREFIX = 'deck-stage:slide:';
  const OVERLAY_HIDE_MS = 1800;
  const VALIDATE_ATTR = 'no_overflowing_text,no_overlapping_text,slide_sized_text';
  const pad2 = n => String(n).padStart(2, '0');
  const stylesheet = `
    :host {
      position: fixed;
      inset: 0;
      display: block;
      background: #000;
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
      overflow: hidden;
    }

    .stage {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .canvas {
      position: relative;
      transform-origin: center center;
      flex-shrink: 0;
      background: #fff;
      will-change: transform;
    }

    /* Slides live in light DOM (via <slot>) so authored CSS still applies.
       We absolutely position each slotted child to stack them. */
    ::slotted(*) {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      box-sizing: border-box !important;
      overflow: hidden;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }
    ::slotted([data-deck-active]) {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }

    /* Tap zones for mobile — back/forward thirds like Stories.
       Transparent, no visible UI, don't block the overlay. */
    .tapzones {
      position: fixed;
      inset: 0;
      display: flex;
      z-index: 2147482000;
      pointer-events: none;
    }
    .tapzone {
      flex: 1;
      pointer-events: auto;
      -webkit-tap-highlight-color: transparent;
    }
    /* Only activate tap zones on coarse pointers (touch devices). */
    @media (hover: hover) and (pointer: fine) {
      .tapzones { display: none; }
    }

    .overlay {
      position: fixed;
      left: 50%;
      bottom: 22px;
      transform: translate(-50%, 6px) scale(0.92);
      filter: blur(6px);
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      background: #000;
      color: #fff;
      border-radius: 999px;
      font-size: 12px;
      font-feature-settings: "tnum" 1;
      letter-spacing: 0.01em;
      opacity: 0;
      pointer-events: none;
      transition: opacity 260ms ease, transform 260ms cubic-bezier(.2,.8,.2,1), filter 260ms ease;
      transform-origin: center bottom;
      z-index: 2147483000;
      user-select: none;
    }
    .overlay[data-visible] {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, 0) scale(1);
      filter: blur(0);
    }

    .btn {
      appearance: none;
      -webkit-appearance: none;
      background: transparent;
      border: 0;
      margin: 0;
      padding: 0;
      color: inherit;
      font: inherit;
      cursor: default;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 28px;
      min-width: 28px;
      border-radius: 999px;
      color: rgba(255,255,255,0.72);
      transition: background 140ms ease, color 140ms ease;
      -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
    .btn:active { background: rgba(255,255,255,0.18); }
    .btn:focus { outline: none; }
    .btn:focus-visible { outline: none; }
    .btn::-moz-focus-inner { border: 0; }
    .btn svg { width: 14px; height: 14px; display: block; }
    .btn.reset {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.02em;
      padding: 0 10px 0 12px;
      gap: 6px;
      color: rgba(255,255,255,0.72);
    }
    .btn.reset .kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
      font-size: 10px;
      line-height: 1;
      color: rgba(255,255,255,0.88);
      background: rgba(255,255,255,0.12);
      border-radius: 4px;
    }

    .count {
      font-variant-numeric: tabular-nums;
      color: #fff;
      font-weight: 500;
      padding: 0 8px;
      min-width: 42px;
      text-align: center;
      font-size: 12px;
    }
    .count .sep { color: rgba(255,255,255,0.45); margin: 0 3px; font-weight: 400; }
    .count .total { color: rgba(255,255,255,0.55); }

    .divider {
      width: 1px;
      height: 14px;
      background: rgba(255,255,255,0.18);
      margin: 0 2px;
    }

    /* ── Print: one page per slide, no chrome ────────────────────────────
       The screen layout stacks every slide at inset:0 inside a scaled
       canvas; for print we want them in document flow at the authored
       design size so the browser paginates one slide per sheet. The
       @page size is set from the width/height attributes via the inline
       <style id="deck-stage-print-page"> that connectedCallback injects
       into <head> (the @page at-rule has no effect inside shadow DOM). */
    @media print {
      :host {
        position: static;
        inset: auto;
        background: none;
        overflow: visible;
        color: inherit;
      }
      .stage { position: static; display: block; }
      .canvas {
        transform: none !important;
        width: auto !important;
        height: auto !important;
        background: none;
        will-change: auto;
      }
      ::slotted(*) {
        position: relative !important;
        inset: auto !important;
        width: var(--deck-design-w) !important;
        height: var(--deck-design-h) !important;
        box-sizing: border-box !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto;
        break-after: page;
        page-break-after: always;
        break-inside: avoid;
        overflow: hidden;
      }
      ::slotted(*:last-child) {
        break-after: auto;
        page-break-after: auto;
      }
      .overlay, .tapzones { display: none !important; }
    }
  `;
  class DeckStage extends HTMLElement {
    static get observedAttributes() {
      return ['width', 'height', 'noscale'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._index = 0;
      this._slides = [];
      this._notes = [];
      this._hideTimer = null;
      this._mouseIdleTimer = null;
      this._storageKey = STORAGE_PREFIX + (location.pathname || '/');
      this._onKey = this._onKey.bind(this);
      this._onResize = this._onResize.bind(this);
      this._onSlotChange = this._onSlotChange.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onTapBack = this._onTapBack.bind(this);
      this._onTapForward = this._onTapForward.bind(this);
    }
    get designWidth() {
      return parseInt(this.getAttribute('width'), 10) || DESIGN_W_DEFAULT;
    }
    get designHeight() {
      return parseInt(this.getAttribute('height'), 10) || DESIGN_H_DEFAULT;
    }
    connectedCallback() {
      this._render();
      this._loadNotes();
      this._syncPrintPageRule();
      window.addEventListener('keydown', this._onKey);
      window.addEventListener('resize', this._onResize);
      window.addEventListener('mousemove', this._onMouseMove, {
        passive: true
      });
      // Initial collection + layout happens via slotchange, which fires on mount.
    }
    disconnectedCallback() {
      window.removeEventListener('keydown', this._onKey);
      window.removeEventListener('resize', this._onResize);
      window.removeEventListener('mousemove', this._onMouseMove);
      if (this._hideTimer) clearTimeout(this._hideTimer);
      if (this._mouseIdleTimer) clearTimeout(this._mouseIdleTimer);
    }
    attributeChangedCallback() {
      if (this._canvas) {
        this._canvas.style.width = this.designWidth + 'px';
        this._canvas.style.height = this.designHeight + 'px';
        this._canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
        this._canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
        this._fit();
        this._syncPrintPageRule();
      }
    }
    _render() {
      const style = document.createElement('style');
      style.textContent = stylesheet;
      const stage = document.createElement('div');
      stage.className = 'stage';
      const canvas = document.createElement('div');
      canvas.className = 'canvas';
      canvas.style.width = this.designWidth + 'px';
      canvas.style.height = this.designHeight + 'px';
      canvas.style.setProperty('--deck-design-w', this.designWidth + 'px');
      canvas.style.setProperty('--deck-design-h', this.designHeight + 'px');
      const slot = document.createElement('slot');
      slot.addEventListener('slotchange', this._onSlotChange);
      canvas.appendChild(slot);
      stage.appendChild(canvas);

      // Tap zones (mobile): left third = back, right third = forward.
      const tapzones = document.createElement('div');
      tapzones.className = 'tapzones export-hidden';
      tapzones.setAttribute('aria-hidden', 'true');
      const tzBack = document.createElement('div');
      tzBack.className = 'tapzone tapzone--back';
      const tzMid = document.createElement('div');
      tzMid.className = 'tapzone tapzone--mid';
      tzMid.style.pointerEvents = 'none';
      const tzFwd = document.createElement('div');
      tzFwd.className = 'tapzone tapzone--fwd';
      tzBack.addEventListener('click', this._onTapBack);
      tzFwd.addEventListener('click', this._onTapForward);
      tapzones.append(tzBack, tzMid, tzFwd);

      // Overlay: compact, solid black, with clickable controls.
      const overlay = document.createElement('div');
      overlay.className = 'overlay export-hidden';
      overlay.setAttribute('role', 'toolbar');
      overlay.setAttribute('aria-label', 'Deck controls');
      overlay.innerHTML = `
        <button class="btn prev" type="button" aria-label="Previous slide" title="Previous (←)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
        </button>
        <span class="count" aria-live="polite"><span class="current">1</span><span class="sep">/</span><span class="total">1</span></span>
        <button class="btn next" type="button" aria-label="Next slide" title="Next (→)">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
        </button>
        <span class="divider"></span>
        <button class="btn reset" type="button" aria-label="Reset to first slide" title="Reset (R)">Reset<span class="kbd">R</span></button>
      `;
      overlay.querySelector('.prev').addEventListener('click', () => this._go(this._index - 1, 'click'));
      overlay.querySelector('.next').addEventListener('click', () => this._go(this._index + 1, 'click'));
      overlay.querySelector('.reset').addEventListener('click', () => this._go(0, 'click'));
      this._root.append(style, stage, tapzones, overlay);
      this._canvas = canvas;
      this._slot = slot;
      this._overlay = overlay;
      this._countEl = overlay.querySelector('.current');
      this._totalEl = overlay.querySelector('.total');
    }

    /** @page must live in the document stylesheet — it's a no-op inside
     *  shadow DOM. Inject/update a single <head> style tag so the print
     *  sheet matches the design size and Save-as-PDF yields one slide per
     *  page with no margins. */
    _syncPrintPageRule() {
      const id = 'deck-stage-print-page';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
        document.head.appendChild(tag);
      }
      tag.textContent = '@page { size: ' + this.designWidth + 'px ' + this.designHeight + 'px; margin: 0; } ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; overflow: visible !important; height: auto !important; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }';
    }
    _onSlotChange() {
      this._collectSlides();
      this._restoreIndex();
      this._applyIndex({
        showOverlay: false,
        broadcast: true,
        reason: 'init'
      });
      this._fit();
    }
    _collectSlides() {
      const assigned = this._slot.assignedElements({
        flatten: true
      });
      this._slides = assigned.filter(el => {
        // Skip template/style/script nodes even if someone slots them.
        const tag = el.tagName;
        return tag !== 'TEMPLATE' && tag !== 'SCRIPT' && tag !== 'STYLE';
      });
      this._slides.forEach((slide, i) => {
        const n = i + 1;
        // Determine a label for comment flow: prefer explicit data-label,
        // then an existing data-screen-label, then first heading, else "Slide".
        let label = slide.getAttribute('data-label');
        if (!label) {
          const existing = slide.getAttribute('data-screen-label');
          if (existing) {
            // Strip any leading number the author may have included.
            label = existing.replace(/^\s*\d+\s*/, '').trim() || existing;
          }
        }
        if (!label) {
          const h = slide.querySelector('h1, h2, h3, [data-title]');
          if (h) label = (h.textContent || '').trim().slice(0, 40);
        }
        if (!label) label = 'Slide';
        slide.setAttribute('data-screen-label', `${pad2(n)} ${label}`);

        // Validation attribute for comment flow / auto-checks.
        if (!slide.hasAttribute('data-om-validate')) {
          slide.setAttribute('data-om-validate', VALIDATE_ATTR);
        }
        slide.setAttribute('data-deck-slide', String(i));
      });
      if (this._totalEl) this._totalEl.textContent = String(this._slides.length || 1);
      if (this._index >= this._slides.length) this._index = Math.max(0, this._slides.length - 1);
    }
    _loadNotes() {
      const tag = document.getElementById('speaker-notes');
      if (!tag) {
        this._notes = [];
        return;
      }
      try {
        const parsed = JSON.parse(tag.textContent || '[]');
        if (Array.isArray(parsed)) this._notes = parsed;
      } catch (e) {
        console.warn('[deck-stage] Failed to parse #speaker-notes JSON:', e);
        this._notes = [];
      }
    }
    _restoreIndex() {
      try {
        const raw = localStorage.getItem(this._storageKey);
        if (raw != null) {
          const n = parseInt(raw, 10);
          if (Number.isFinite(n) && n >= 0 && n < this._slides.length) {
            this._index = n;
          }
        }
      } catch (e) {/* ignore */}
    }
    _persistIndex() {
      try {
        localStorage.setItem(this._storageKey, String(this._index));
      } catch (e) {/* ignore */}
    }
    _applyIndex({
      showOverlay = true,
      broadcast = true,
      reason = 'init'
    } = {}) {
      if (!this._slides.length) return;
      const prev = this._prevIndex == null ? -1 : this._prevIndex;
      const curr = this._index;
      this._slides.forEach((s, i) => {
        if (i === curr) s.setAttribute('data-deck-active', '');else s.removeAttribute('data-deck-active');
      });
      if (this._countEl) this._countEl.textContent = String(curr + 1);
      this._persistIndex();
      if (broadcast) {
        // (1) Legacy: host-window postMessage for speaker-notes renderers.
        try {
          window.postMessage({
            slideIndexChanged: curr
          }, '*');
        } catch (e) {}

        // (2) In-page CustomEvent on the <deck-stage> element itself.
        //     Bubbles and composes out of shadow DOM so slide code can listen:
        //       document.querySelector('deck-stage').addEventListener('slidechange', e => {
        //         e.detail.index, e.detail.previousIndex, e.detail.total, e.detail.slide, e.detail.reason
        //       });
        const detail = {
          index: curr,
          previousIndex: prev,
          total: this._slides.length,
          slide: this._slides[curr] || null,
          previousSlide: prev >= 0 ? this._slides[prev] || null : null,
          reason: reason // 'init' | 'keyboard' | 'click' | 'tap' | 'api'
        };
        this.dispatchEvent(new CustomEvent('slidechange', {
          detail,
          bubbles: true,
          composed: true
        }));
      }
      this._prevIndex = curr;
      if (showOverlay) this._flashOverlay();
    }
    _flashOverlay() {
      if (!this._overlay) return;
      this._overlay.setAttribute('data-visible', '');
      if (this._hideTimer) clearTimeout(this._hideTimer);
      this._hideTimer = setTimeout(() => {
        this._overlay.removeAttribute('data-visible');
      }, OVERLAY_HIDE_MS);
    }
    _fit() {
      if (!this._canvas) return;
      // PPTX export sets noscale so the DOM capture sees authored-size
      // geometry — the scaled canvas is in shadow DOM, so the exporter's
      // resetTransformSelector can't reach .canvas.style.transform directly.
      if (this.hasAttribute('noscale')) {
        this._canvas.style.transform = 'none';
        return;
      }
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const s = Math.min(vw / this.designWidth, vh / this.designHeight);
      this._canvas.style.transform = `scale(${s})`;
    }
    _onResize() {
      this._fit();
    }
    _onMouseMove() {
      // Keep overlay visible while mouse moves; hide after idle.
      this._flashOverlay();
    }
    _onTapBack(e) {
      e.preventDefault();
      this._go(this._index - 1, 'tap');
    }
    _onTapForward(e) {
      e.preventDefault();
      this._go(this._index + 1, 'tap');
    }
    _onKey(e) {
      // Ignore when the user is typing.
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key;
      let handled = true;
      if (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'Spacebar') {
        this._go(this._index + 1, 'keyboard');
      } else if (key === 'ArrowLeft' || key === 'PageUp') {
        this._go(this._index - 1, 'keyboard');
      } else if (key === 'Home') {
        this._go(0, 'keyboard');
      } else if (key === 'End') {
        this._go(this._slides.length - 1, 'keyboard');
      } else if (key === 'r' || key === 'R') {
        this._go(0, 'keyboard');
      } else if (/^[0-9]$/.test(key)) {
        // 1..9 jump to that slide; 0 jumps to 10.
        const n = key === '0' ? 9 : parseInt(key, 10) - 1;
        if (n < this._slides.length) this._go(n, 'keyboard');
      } else {
        handled = false;
      }
      if (handled) {
        e.preventDefault();
        this._flashOverlay();
      }
    }
    _go(i, reason = 'api') {
      if (!this._slides.length) return;
      const clamped = Math.max(0, Math.min(this._slides.length - 1, i));
      if (clamped === this._index) {
        this._flashOverlay();
        return;
      }
      this._index = clamped;
      this._applyIndex({
        showOverlay: true,
        broadcast: true,
        reason
      });
    }

    // Public API ------------------------------------------------------------

    /** Current slide index (0-based). */
    get index() {
      return this._index;
    }
    /** Total slide count. */
    get length() {
      return this._slides.length;
    }
    /** Programmatically navigate. */
    goTo(i) {
      this._go(i, 'api');
    }
    next() {
      this._go(this._index + 1, 'api');
    }
    prev() {
      this._go(this._index - 1, 'api');
    }
    reset() {
      this._go(0, 'api');
    }
  }
  if (!customElements.get('deck-stage')) {
    customElements.define('deck-stage', DeckStage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "decks/deck-stage.js", error: String((e && e.message) || e) }); }

// src/components/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const variants = {
  info: 'bg-nl-primary/8 border-l-[3px] border-nl-primary',
  success: 'bg-nl-success-bg border-l-[3px] border-nl-success-dark',
  warning: 'bg-yellow-50 border-l-[3px] border-yellow-400',
  error: 'bg-nl-danger/7 border-l-[3px] border-nl-danger'
};
const icons = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕'
};
const textColors = {
  info: 'text-nl-primary',
  success: 'text-nl-success-text',
  warning: 'text-yellow-700',
  error: 'text-nl-danger'
};
function Alert({
  variant = 'info',
  title,
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "alert",
    className: ['flex gap-3.5 rounded-[14px] p-4', variants[variant] ?? variants.info, className].join(' ')
  }, props), /*#__PURE__*/React.createElement("span", {
    className: `text-base mt-0.5 ${textColors[variant]}`
  }, icons[variant]), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-0.5"
  }, title && /*#__PURE__*/React.createElement("p", {
    className: `text-[0.88rem] font-semibold font-body ${textColors[variant]}`
  }, title), /*#__PURE__*/React.createElement("p", {
    className: "text-[0.85rem] font-body text-nl-700"
  }, children)));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components/Alert.jsx", error: String((e && e.message) || e) }); }

// src/components/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const variants = {
  primary: 'bg-nl-primary/10 text-nl-primary',
  accent: 'bg-nl-accent/10 text-[#d64f2a]',
  success: 'bg-nl-success/20 text-nl-success-text',
  danger: 'bg-nl-danger/8 text-nl-danger',
  neutral: 'bg-nl-400/15 text-nl-700',
  solidPrimary: 'bg-nl-primary text-white',
  solidAccent: 'bg-nl-accent text-white',
  solidDark: 'bg-nl-900 text-white'
};
function Badge({
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['inline-flex items-center gap-1.5 px-3 py-1', 'rounded-pill text-[0.78rem] font-semibold font-body', variants[variant] ?? variants.primary, className].join(' ')
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components/Badge.jsx", error: String((e && e.message) || e) }); }

// src/components/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const variants = {
  accent: 'bg-nl-accent text-white hover:-translate-y-0.5',
  primary: 'bg-nl-primary text-white hover:-translate-y-0.5',
  secondary: 'bg-white text-nl-text border border-nl-border-ui hover:-translate-y-0.5',
  success: 'bg-nl-success text-nl-success-text hover:-translate-y-0.5',
  outlineLight: 'bg-transparent text-white border border-white/50 hover:-translate-y-0.5',
  danger: 'bg-nl-danger text-white hover:-translate-y-0.5'
};
const sizes = {
  sm: 'px-4 py-1.5 text-[0.82rem]',
  md: 'px-[22px] py-[11px] text-[0.9rem]',
  lg: 'px-[30px] py-[15px] text-base'
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    className: ['inline-flex items-center justify-center gap-2', 'rounded-pill font-semibold font-body', 'transition-all duration-ui ease-nl shadow-none', 'hover:shadow-hover', 'focus:outline-none focus:ring-4 focus:ring-nl-primary/20', 'disabled:opacity-40 disabled:translate-y-0 disabled:shadow-none disabled:cursor-not-allowed', variants[variant] ?? variants.primary, sizes[size] ?? sizes.md, className].join(' ')
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components/Button.jsx", error: String((e && e.message) || e) }); }

// src/components/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  accent = false,
  hover = true,
  padding = 'p-6',
  className = '',
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['rounded-card border', accent ? 'bg-nl-primary text-white border-transparent' : 'bg-white border-nl-border-soft shadow-card', hover && !accent ? 'transition-all duration-ui ease-nl hover:-translate-y-[3px] hover:shadow-hover' : '', padding, className].join(' ')
  }, props), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components/Card.jsx", error: String((e && e.message) || e) }); }

// src/components/Charts.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* NLACE — Charts
   Gráficos SVG sin dependencias, con la paleta de marca.
   API uniforme:
     · BarChart / LineChart / AreaChart  → { labels:string[], series:[{name,color,values:number[]}] }
     · PieChart / DonutChart             → { data:[{label,value,color?}] }
   Todos heredan tipografía y colores del sistema. Listos para PDF (sin animación). */

const NL_CHART_PALETTE = ['#5869f7',
// primary
'#fc624b',
// accent
'#42cf8a',
// success
'#b717af',
// magenta
'#ff8c42',
// accent-warm
'#f76dee',
// pink
'#2d3bc4',
// primary-dark
'#a5f3fc' // cyan
];
const FONT_BODY = 'Inter, system-ui, sans-serif';
const FONT_DISPLAY = '"Space Grotesk", sans-serif';
const C_GRID = '#dbdcd7';
const C_AXIS = '#a1a1aa';
const C_LABEL = '#71717a';
const C_VALUE = '#0f1011';
function niceMax(v) {
  if (v <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / pow;
  let nice;
  if (n <= 1) nice = 1;else if (n <= 2) nice = 2;else if (n <= 2.5) nice = 2.5;else if (n <= 5) nice = 5;else nice = 10;
  return nice * pow;
}
function fmtTick(v) {
  if (Math.abs(v) >= 1000000) return (v / 1000000).toFixed(v % 1000000 ? 1 : 0) + 'M';
  if (Math.abs(v) >= 1000) return (v / 1000).toFixed(v % 1000 ? 1 : 0) + 'k';
  return String(Math.round(v * 100) / 100);
}

/* ── Leyenda compartida ─────────────────────────────── */
function Legend({
  items,
  style
}) {
  if (!items || items.length < 2) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px 18px',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 3,
      background: it.color,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 12.5,
      color: C_LABEL
    }
  }, it.name))));
}

/* ── BarChart ───────────────────────────────────────── */
function BarChart({
  labels = [],
  series = [],
  height = 240,
  stacked = false,
  showValues = true,
  legend = true,
  className = '',
  ...props
}) {
  const W = 580;
  const H = height;
  const pad = {
    top: 18,
    right: 14,
    bottom: 30,
    left: 38
  };
  const iw = W - pad.left - pad.right;
  const ih = H - pad.top - pad.bottom;
  const colors = series.map((s, i) => s.color || NL_CHART_PALETTE[i % NL_CHART_PALETTE.length]);
  let max;
  if (stacked) {
    max = niceMax(Math.max(1, ...labels.map((_, gi) => series.reduce((a, s) => a + (s.values[gi] || 0), 0))));
  } else {
    max = niceMax(Math.max(1, ...series.flatMap(s => s.values)));
  }
  const ticks = [0, max / 2, max];
  const step = iw / Math.max(1, labels.length);
  const single = series.length === 1;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className
  }, props), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    width: "100%",
    style: {
      display: 'block',
      height: 'auto',
      overflow: 'visible'
    },
    role: "img"
  }, ticks.map((t, i) => {
    const y = pad.top + ih - t / max * ih;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: pad.left,
      y1: y,
      x2: W - pad.right,
      y2: y,
      stroke: C_GRID,
      strokeWidth: "1",
      strokeDasharray: i === 0 ? '0' : '3 4'
    }), /*#__PURE__*/React.createElement("text", {
      x: pad.left - 8,
      y: y + 4,
      textAnchor: "end",
      fontFamily: FONT_BODY,
      fontSize: "11",
      fill: C_AXIS
    }, fmtTick(t)));
  }), labels.map((lab, gi) => {
    const gx = pad.left + step * gi;
    const inner = single ? step * 0.5 : step * 0.66;
    const bw = inner / (single ? 1 : series.length);
    const startX = gx + (step - inner) / 2;
    let stackTop = pad.top + ih;
    return /*#__PURE__*/React.createElement("g", {
      key: gi
    }, series.map((s, si) => {
      const v = s.values[gi] || 0;
      const h = v / max * ih;
      let x, y;
      if (stacked) {
        x = gx + (step - step * 0.5) / 2;
        y = stackTop - h;
        stackTop = y;
        return /*#__PURE__*/React.createElement("rect", {
          key: si,
          x: x,
          y: y,
          width: step * 0.5,
          height: Math.max(0, h),
          rx: "3",
          fill: colors[si]
        });
      }
      x = startX + bw * si;
      y = pad.top + ih - h;
      return /*#__PURE__*/React.createElement("g", {
        key: si
      }, /*#__PURE__*/React.createElement("rect", {
        x: x,
        y: y,
        width: Math.max(1, bw - 3),
        height: Math.max(0, h),
        rx: "4",
        fill: colors[si]
      }), showValues && single && /*#__PURE__*/React.createElement("text", {
        x: x + (bw - 3) / 2,
        y: y - 6,
        textAnchor: "middle",
        fontFamily: FONT_DISPLAY,
        fontSize: "12",
        fontWeight: "600",
        fill: C_VALUE
      }, fmtTick(v)));
    }), /*#__PURE__*/React.createElement("text", {
      x: gx + step / 2,
      y: H - pad.bottom + 18,
      textAnchor: "middle",
      fontFamily: FONT_BODY,
      fontSize: "11.5",
      fill: C_LABEL
    }, lab));
  })), legend && /*#__PURE__*/React.createElement(Legend, {
    items: series.map((s, i) => ({
      name: s.name,
      color: colors[i]
    })),
    style: {
      marginTop: 12,
      paddingLeft: 4
    }
  }));
}

/* ── LineChart / AreaChart ──────────────────────────── */
function LineChart({
  labels = [],
  series = [],
  height = 240,
  area = false,
  showDots = true,
  legend = true,
  className = '',
  ...props
}) {
  const W = 580;
  const H = height;
  const pad = {
    top: 18,
    right: 16,
    bottom: 30,
    left: 38
  };
  const iw = W - pad.left - pad.right;
  const ih = H - pad.top - pad.bottom;
  const colors = series.map((s, i) => s.color || NL_CHART_PALETTE[i % NL_CHART_PALETTE.length]);
  const max = niceMax(Math.max(1, ...series.flatMap(s => s.values)));
  const ticks = [0, max / 2, max];
  const n = labels.length;
  const xAt = i => pad.left + (n <= 1 ? iw / 2 : iw * i / (n - 1));
  const yAt = v => pad.top + ih - v / max * ih;
  const gid = React.useId ? React.useId().replace(/:/g, '') : 'g' + Math.random().toString(36).slice(2, 8);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className
  }, props), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    width: "100%",
    style: {
      display: 'block',
      height: 'auto',
      overflow: 'visible'
    },
    role: "img"
  }, /*#__PURE__*/React.createElement("defs", null, area && series.map((s, si) => /*#__PURE__*/React.createElement("linearGradient", {
    key: si,
    id: `${gid}-a${si}`,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: colors[si],
    stopOpacity: "0.26"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: colors[si],
    stopOpacity: "0.02"
  })))), ticks.map((t, i) => {
    const y = yAt(t);
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: pad.left,
      y1: y,
      x2: W - pad.right,
      y2: y,
      stroke: C_GRID,
      strokeWidth: "1",
      strokeDasharray: i === 0 ? '0' : '3 4'
    }), /*#__PURE__*/React.createElement("text", {
      x: pad.left - 8,
      y: y + 4,
      textAnchor: "end",
      fontFamily: FONT_BODY,
      fontSize: "11",
      fill: C_AXIS
    }, fmtTick(t)));
  }), series.map((s, si) => {
    const pts = s.values.map((v, i) => [xAt(i), yAt(v)]);
    const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    const fill = `${line} L ${xAt(n - 1).toFixed(1)} ${yAt(0).toFixed(1)} L ${xAt(0).toFixed(1)} ${yAt(0).toFixed(1)} Z`;
    return /*#__PURE__*/React.createElement("g", {
      key: si
    }, area && /*#__PURE__*/React.createElement("path", {
      d: fill,
      fill: `url(#${gid}-a${si})`
    }), /*#__PURE__*/React.createElement("path", {
      d: line,
      fill: "none",
      stroke: colors[si],
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), showDots && pts.map((p, i) => /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: p[0],
      cy: p[1],
      r: "3.4",
      fill: "#fff",
      stroke: colors[si],
      strokeWidth: "2"
    })));
  }), labels.map((lab, i) => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: xAt(i),
    y: H - pad.bottom + 18,
    textAnchor: "middle",
    fontFamily: FONT_BODY,
    fontSize: "11.5",
    fill: C_LABEL
  }, lab))), legend && /*#__PURE__*/React.createElement(Legend, {
    items: series.map((s, i) => ({
      name: s.name,
      color: colors[i]
    })),
    style: {
      marginTop: 12,
      paddingLeft: 4
    }
  }));
}
function AreaChart(props) {
  return /*#__PURE__*/React.createElement(LineChart, _extends({
    area: true
  }, props));
}

/* ── PieChart / DonutChart ──────────────────────────── */
function polar(cx, cy, r, ang) {
  return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
}
function ringPath(cx, cy, r, ir, a0, a1) {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  if (ir <= 0) {
    return `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`;
  }
  const [x2, y2] = polar(cx, cy, ir, a1);
  const [x3, y3] = polar(cx, cy, ir, a0);
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${ir} ${ir} 0 ${large} 0 ${x3} ${y3} Z`;
}
function PieChart({
  data = [],
  size = 200,
  donut = false,
  thickness = 0.42,
  centerLabel,
  centerValue,
  legend = true,
  className = '',
  ...props
}) {
  const total = data.reduce((a, d) => a + (d.value || 0), 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;
  const ir = donut ? r * (1 - thickness) : 0;
  const colors = data.map((d, i) => d.color || NL_CHART_PALETTE[i % NL_CHART_PALETTE.length]);
  let a = -Math.PI / 2;
  const slices = data.map((d, i) => {
    const frac = (d.value || 0) / total;
    const a0 = a;
    const a1 = a + frac * Math.PI * 2;
    a = a1;
    return {
      d: ringPath(cx, cy, r, ir, a0, a1),
      color: colors[i],
      pct: frac
    };
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, props), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${size} ${size}`,
    width: size,
    height: size,
    style: {
      flex: 'none',
      overflow: 'visible'
    },
    role: "img"
  }, slices.map((s, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: s.d,
    fill: s.color,
    stroke: "#fff",
    strokeWidth: donut ? 0 : 2
  })), donut && (centerValue != null || centerLabel) && /*#__PURE__*/React.createElement("g", null, centerValue != null && /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + (centerLabel ? -2 : 6),
    textAnchor: "middle",
    fontFamily: FONT_DISPLAY,
    fontSize: size * 0.18,
    fontWeight: "700",
    fill: C_VALUE
  }, centerValue), centerLabel && /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + size * 0.13,
    textAnchor: "middle",
    fontFamily: FONT_BODY,
    fontSize: size * 0.075,
    fill: C_LABEL
  }, centerLabel))), legend && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 3,
      background: colors[i],
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 13,
      color: '#3f3f46',
      minWidth: 90
    }
  }, d.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontSize: 13,
      fontWeight: 600,
      color: C_VALUE
    }
  }, Math.round(d.value / total * 100), "%")))));
}
function DonutChart(props) {
  return /*#__PURE__*/React.createElement(PieChart, _extends({
    donut: true
  }, props));
}
Object.assign(__ds_scope, { NL_CHART_PALETTE, BarChart, LineChart, AreaChart, PieChart, DonutChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components/Charts.jsx", error: String((e && e.message) || e) }); }

// src/components/Dropdown.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Dropdown — click-to-open menu. Uncontrolled open state.
 *
 * <Dropdown
 *   trigger={<Button variant="secondary">Acciones ▾</Button>}
 *   items={[
 *     {id:'edit', label:'Editar'},
 *     {id:'dup',  label:'Duplicar'},
 *     {divider:true},
 *     {id:'del',  label:'Eliminar', danger:true},
 *   ]}
 *   onSelect={(id)=>{}}
 * />
 */
function Dropdown({
  trigger,
  items = [],
  onSelect,
  align = 'left',
  className = '',
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    className: ['relative inline-flex font-body', className].join(' ')
  }, props), /*#__PURE__*/React.createElement("span", {
    onClick: () => setOpen(o => !o),
    className: "inline-flex"
  }, trigger), open && /*#__PURE__*/React.createElement("div", {
    role: "menu",
    className: ['absolute top-full mt-2 z-50 min-w-[200px]', 'bg-white rounded-[14px] border border-nl-border-soft shadow-hover', 'p-1.5 animate-fade-up', align === 'right' ? 'right-0' : 'left-0'].join(' ')
  }, items.map((it, i) => it.divider ? /*#__PURE__*/React.createElement("div", {
    key: `d${i}`,
    className: "my-1.5 h-px bg-nl-border-soft"
  }) : /*#__PURE__*/React.createElement("button", {
    key: it.id,
    role: "menuitem",
    disabled: it.disabled,
    onClick: () => {
      onSelect?.(it.id);
      setOpen(false);
    },
    className: ['w-full flex items-center gap-2.5 px-3 py-2 rounded-[9px]', 'text-[0.86rem] font-medium text-left', 'transition-colors duration-150', 'disabled:opacity-40 disabled:cursor-not-allowed', it.danger ? 'text-nl-danger hover:bg-nl-danger/8' : 'text-nl-text hover:bg-nl-primary/8'].join(' ')
  }, it.icon && /*#__PURE__*/React.createElement("span", {
    className: "text-[0.95rem] opacity-80"
  }, it.icon), /*#__PURE__*/React.createElement("span", {
    className: "flex-1"
  }, it.label), it.shortcut && /*#__PURE__*/React.createElement("span", {
    className: "text-[0.72rem] text-nl-400 font-mono"
  }, it.shortcut)))));
}
Object.assign(__ds_scope, { Dropdown });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components/Dropdown.jsx", error: String((e && e.message) || e) }); }

// src/components/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  error,
  success,
  hint,
  className = '',
  ...props
}) {
  const stateClass = error ? 'border-nl-danger focus:ring-nl-danger/20' : success ? 'border-nl-success-dark focus:ring-nl-success-dark/20' : 'border-nl-border-ui focus:border-nl-primary focus:ring-nl-primary/20';
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-1.5 w-full"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "text-[0.82rem] font-semibold text-nl-text font-body"
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    className: ['w-full min-h-[44px] px-[14px]', 'bg-white border-[1.5px] rounded-input', 'font-body text-[0.9rem] text-nl-text', 'transition-all duration-ui ease-nl', 'outline-none focus:ring-4', 'placeholder:text-nl-400', 'disabled:opacity-50 disabled:cursor-not-allowed', stateClass, className].join(' ')
  }, props)), (error || hint) && /*#__PURE__*/React.createElement("p", {
    className: `text-[0.78rem] font-body ${error ? 'text-nl-danger' : 'text-nl-500'}`
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components/Input.jsx", error: String((e && e.message) || e) }); }

// src/components/Loaders.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const spinnerSizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-[2.5px]',
  lg: 'w-10 h-10 border-[3px]'
};
function Spinner({
  size = 'md',
  className = '',
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    "aria-label": "Cargando",
    className: ['rounded-full border-nl-border-ui border-t-nl-primary', 'animate-spin-nl', spinnerSizes[size] ?? spinnerSizes.md, className].join(' ')
  }, props));
}
function Skeleton({
  className = '',
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['rounded-lg bg-nl-border-soft animate-shimmer', 'bg-[length:200%_100%]', className].join(' '),
    style: {
      backgroundImage: 'linear-gradient(90deg, #e8e8e8 25%, #efefef 50%, #e8e8e8 75%)'
    }
  }, props));
}
Object.assign(__ds_scope, { Spinner, Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components/Loaders.jsx", error: String((e && e.message) || e) }); }

// src/components/Modal.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl'
};

/**
 * Modal — centered dialog with scrim. Controlled via `open` + `onClose`.
 *
 * <Modal open={open} onClose={()=>setOpen(false)} title="Confirmar"
 *        footer={<><Button variant="secondary">Cancelar</Button><Button>Guardar</Button></>}>
 *   ¿Seguro que quieres continuar?
 * </Modal>
 */
function Modal({
  open = false,
  onClose,
  title,
  description,
  size = 'md',
  footer,
  closeOnScrim = true,
  className = '',
  children,
  ...props
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[100] flex items-center justify-center p-4 font-body",
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-nl-900/45 backdrop-blur-[2px] animate-[fadeUp_0.2s_ease]",
    onClick: () => closeOnScrim && onClose?.()
  }), /*#__PURE__*/React.createElement("div", _extends({
    className: ['relative w-full bg-white rounded-card shadow-hover', 'border border-nl-border-soft overflow-hidden', 'animate-fade-up', sizes[size] ?? sizes.md, className].join(' ')
  }, props), (title || onClose) && /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-4 px-6 pt-5 pb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-1"
  }, title && /*#__PURE__*/React.createElement("h4", {
    className: "text-[1.15rem] font-semibold font-display text-nl-text"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "text-[0.85rem] text-nl-500"
  }, description)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    className: "shrink-0 -mr-1 -mt-1 w-8 h-8 grid place-items-center rounded-pill text-nl-500 hover:bg-nl-400/15 hover:text-nl-text transition-colors duration-ui"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "px-6 py-2 text-[0.9rem] text-nl-700 leading-relaxed"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-end gap-2.5 px-6 pt-4 pb-5 mt-2"
  }, footer)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components/Modal.jsx", error: String((e && e.message) || e) }); }

// src/components/NlaceLogo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NlaceLogo({
  variant = 'black',
  width = 160,
  className = '',
  ...props
}) {
  const fill = variant === 'white' ? '#ffffff' : '#141414';
  const h = Math.round(width * 125 / 464);
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: width,
    height: h,
    viewBox: "0 0 464 125",
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    "aria-label": "NLACE",
    role: "img"
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M0 123.169V34.454H28.965L30.297 52.43l-6.326 2a24.309 24.309 0 0 1 6.492-11.152 34.6 34.6 0 0 1 11.487-7.825 35.391 35.391 0 0 1 13.983-2.83c6.659 0 12.263 1.387 16.813 4.161a24.663 24.663 0 0 1 10.488 12.15c3.553 7.99 4.434 14.537 4.434 26.188v54.594H55.933v-52.1a16.819 16.819 0 0 0-1.332-7.157 9.327 9.327 0 0 0-4-4.494 11.593 11.593 0 0 0-6.326-1.332 16.741 16.741 0 0 0-5.327.832 11.132 11.132 0 0 0-4.162 2.663 11.85 11.85 0 0 0-2.83 3.828 13.35 13.35 0 0 0-.832 4.827v52.929H0Z",
    fill: fill
  }), /*#__PURE__*/React.createElement("path", {
    d: "M103.929 123.169V0h30.964v123.169h-30.964Z",
    fill: fill
  }), /*#__PURE__*/React.createElement("path", {
    d: "M183.894 124.667a35.164 35.164 0 0 1-19.81-5.825 42.478 42.478 0 0 1-13.817-16.312 54.7 54.7 0 0 1-4.994-23.8c0-9.099 1.665-17.088 4.994-23.968a39.437 39.437 0 0 1 13.817-16.145 35.285 35.285 0 0 1 20.309-5.992 36.708 36.708 0 0 1 11.32 1.664 26.914 26.914 0 0 1 8.989 4.827 36.936 36.936 0 0 1 6.659 7.157 40.531 40.531 0 0 1 4.661 8.655l-6.325-.333V34.454H240.16v88.715H209.031V101.531l6.825.333a33.93 33.93 0 0 1-11.486 16.312 37.088 37.088 0 0 1-9.323 4.824 35.157 35.157 0 0 1-11.153 1.667Zm8.823-25.466a17.28 17.28 0 0 0 9.156-2.33 15.625 15.625 0 0 0 5.826-7.157 25.864 25.864 0 0 0 2.164-10.985 26.3 26.3 0 0 0-2.164-11.152 14.636 14.636 0 0 0-5.826-6.991 18.037 18.037 0 0 0-18.312 0 14.975 14.975 0 0 0-5.66 6.991 28.2 28.2 0 0 0-2 11.152 27.732 27.732 0 0 0 2 10.985 16.031 16.031 0 0 0 5.66 7.157 17.277 17.277 0 0 0 9.156 2.33Z",
    fill: fill
  }), /*#__PURE__*/React.createElement("path", {
    d: "M298.074 124.834a46.8 46.8 0 0 1-23.638-5.992 44.24 44.24 0 0 1-16.314-16.312 47.109 47.109 0 0 1-5.993-23.8 46.2 46.2 0 0 1 5.993-23.635 43.875 43.875 0 0 1 16.314-16.478 46.79 46.79 0 0 1 23.638-5.992 60.923 60.923 0 0 1 21.974 3.828A38.016 38.016 0 0 1 336.2 47.437L319.382 67.41a18.918 18.918 0 0 0-4.661-4.161 20.772 20.772 0 0 0-6.326-3 22.581 22.581 0 0 0-7.491-1.165 18.4 18.4 0 0 0-9.655 2.5 17.182 17.182 0 0 0-6.492 6.991 22.041 22.041 0 0 0-2.164 9.987 22.041 22.041 0 0 0 2.164 9.987 17.423 17.423 0 0 0 6.326 6.991A18.357 18.357 0 0 0 300.9 98.2a26.04 26.04 0 0 0 7.491-1 20.933 20.933 0 0 0 6.16-2.829 20.131 20.131 0 0 0 4.827-4.328L336.2 110.186A40.092 40.092 0 0 1 319.882 121 60.448 60.448 0 0 1 298.074 124.834Z",
    fill: fill
  }), /*#__PURE__*/React.createElement("path", {
    d: "M387.768 124.834c-10.099 0-18.811-1.998-26.135-5.826a42.936 42.936 0 0 1-16.98-16.312 47.106 47.106 0 0 1-5.993-23.8 50.173 50.173 0 0 1 3.329-18.475 43.522 43.522 0 0 1 9.322-14.647 40.178 40.178 0 0 1 14.15-9.654 46.4 46.4 0 0 1 18.145-3.5 44.22 44.22 0 0 1 17.479 3.329 38.271 38.271 0 0 1 13.651 9.487 41.031 41.031 0 0 1 8.823 14.481 46.7 46.7 0 0 1 2.83 18.309l-.167 6.991H356.306l-3.829-15.489h48.941l-3 3.329v-3.162a10.241 10.241 0 0 0-2-6.325 11.85 11.85 0 0 0-4.994-4.328 16.521 16.521 0 0 0-7.158-1.5 17.954 17.954 0 0 0-9.489 2.33 14.314 14.314 0 0 0-5.659 6.325 22.894 22.894 0 0 0-2 9.987 23.429 23.429 0 0 0 2.663 11.485 19.088 19.088 0 0 0 8.157 7.49 30.321 30.321 0 0 0 13.318 2.663 27.386 27.386 0 0 0 8.989-1.332 31.062 31.062 0 0 0 8.49-4.66l14.316 20.14a60.03 60.03 0 0 1-11.819 7.49 58.981 58.981 0 0 1-23.472 5.16Z",
    fill: fill
  }), /*#__PURE__*/React.createElement("path", {
    d: "M448.352 125c-4.994 0-8.878-1.387-11.653-4.161-2.663-2.774-3.995-6.713-3.995-11.818a15.879 15.879 0 0 1 4.328-11.484 15.006 15.006 0 0 1 11.32-4.494c4.883 0 8.712 1.387 11.486 4.161S464 104.917 464 109.021a15.878 15.878 0 0 1-4.328 11.485A15.006 15.006 0 0 1 448.352 125Z",
    fill: fill
  }));
}
function NlaceAvatar({
  size = 40,
  rounded = 'rounded-[22%]',
  className = '',
  ...props
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 625 625",
    xmlns: "http://www.w3.org/2000/svg",
    className: className,
    "aria-label": "NLACE avatar",
    role: "img"
  }, props), /*#__PURE__*/React.createElement("rect", {
    width: "625",
    height: "625",
    rx: "140",
    fill: "#5869f7"
  }), /*#__PURE__*/React.createElement("text", {
    x: "50%",
    y: "58%",
    dominantBaseline: "middle",
    textAnchor: "middle",
    fill: "white",
    fontSize: "360",
    fontFamily: "Space Grotesk, sans-serif",
    fontWeight: "800"
  }, "n."));
}
Object.assign(__ds_scope, { NlaceLogo, NlaceAvatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components/NlaceLogo.jsx", error: String((e && e.message) || e) }); }

// src/components/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    track: 'w-9 h-5',
    knob: 'w-3.5 h-3.5',
    on: 'translate-x-4'
  },
  md: {
    track: 'w-12 h-7',
    knob: 'w-5 h-5',
    on: 'translate-x-5'
  }
};

/**
 * Switch — accessible toggle. Controlled (checked) or uncontrolled (defaultChecked).
 *
 * <Switch label="Notificaciones" defaultChecked />
 */
function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
  description,
  className = '',
  ...props
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const s = sizes[size] ?? sizes.md;
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange?.(!on);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    className: ['inline-flex items-center gap-3 font-body select-none', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer', className].join(' ')
  }, props), /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": on,
    disabled: disabled,
    onClick: toggle,
    className: ['relative shrink-0 rounded-pill p-0.5', 'transition-colors duration-ui ease-nl', 'focus:outline-none focus:ring-4 focus:ring-nl-primary/20', s.track, on ? 'bg-nl-primary' : 'bg-nl-400/45'].join(' ')
  }, /*#__PURE__*/React.createElement("span", {
    className: ['block rounded-pill bg-white shadow-card', 'transition-transform duration-ui ease-nl', s.knob, on ? s.on : 'translate-x-0'].join(' ')
  })), (label || description) && /*#__PURE__*/React.createElement("span", {
    className: "flex flex-col"
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "text-[0.9rem] font-semibold text-nl-text"
  }, label), description && /*#__PURE__*/React.createElement("span", {
    className: "text-[0.8rem] text-nl-500"
  }, description)));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components/Switch.jsx", error: String((e && e.message) || e) }); }

// src/components/Table.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Table — lightweight data table with the NLACE skin.
 *
 * <Table
 *   columns={[
 *     {key:'name',  header:'Empresa'},
 *     {key:'plan',  header:'Plan'},
 *     {key:'mrr',   header:'MRR', align:'right'},
 *     {key:'state', header:'Estado', render:(r)=><Badge>{r.state}</Badge>},
 *   ]}
 *   rows={[...]}
 *   rowKey="id"
 * />
 */
function Table({
  columns = [],
  rows = [],
  rowKey = 'id',
  dense = false,
  className = '',
  ...props
}) {
  const pad = dense ? 'px-4 py-2.5' : 'px-5 py-3.5';
  const alignCls = a => a === 'right' ? 'text-right' : a === 'center' ? 'text-center' : 'text-left';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['w-full overflow-x-auto rounded-card border border-nl-border-soft bg-white font-body', className].join(' ')
  }, props), /*#__PURE__*/React.createElement("table", {
    className: "w-full border-collapse text-[0.88rem]"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "border-b border-nl-border-soft"
  }, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    className: [pad, alignCls(c.align), 'text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-nl-500 whitespace-nowrap'].join(' ')
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: r[rowKey] ?? i,
    className: "border-b border-nl-border-soft last:border-0 transition-colors duration-150 hover:bg-nl-primary/5"
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    className: [pad, alignCls(c.align), 'text-nl-700 whitespace-nowrap'].join(' ')
  }, c.render ? c.render(r) : r[c.key])))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components/Table.jsx", error: String((e && e.message) || e) }); }

// src/components/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const listVariants = {
  underline: 'gap-6 border-b border-nl-border-soft',
  pill: 'gap-1 p-1 bg-nl-400/12 rounded-pill w-max'
};

/**
 * Tabs — controlled or uncontrolled.
 *
 * <Tabs items={[{id:'a',label:'Resumen'},{id:'b',label:'Detalle'}]} variant="underline">
 *   {(active) => <div>{active}</div>}
 * </Tabs>
 */
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  className = '',
  children,
  ...props
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.id);
  const active = isControlled ? value : internal;
  const select = id => {
    if (!isControlled) setInternal(id);
    onChange?.(id);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['flex flex-col gap-4 font-body', className].join(' ')
  }, props), /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    className: ['flex items-center', listVariants[variant] ?? listVariants.underline].join(' ')
  }, items.map(it => {
    const on = it.id === active;
    const base = 'relative cursor-pointer font-semibold text-[0.9rem] transition-all duration-ui ease-nl disabled:opacity-40 disabled:cursor-not-allowed';
    const skin = variant === 'pill' ? ['px-4 py-1.5 rounded-pill', on ? 'bg-white text-nl-primary shadow-card' : 'text-nl-500 hover:text-nl-text'].join(' ') : ['pb-3 -mb-px border-b-2', on ? 'border-nl-primary text-nl-text' : 'border-transparent text-nl-500 hover:text-nl-text'].join(' ');
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      role: "tab",
      "aria-selected": on,
      disabled: it.disabled,
      onClick: () => select(it.id),
      className: [base, skin].join(' ')
    }, it.label, it.badge != null && /*#__PURE__*/React.createElement("span", {
      className: "ml-2 inline-flex items-center px-2 py-0.5 rounded-pill text-[0.68rem] font-semibold bg-nl-primary/10 text-nl-primary"
    }, it.badge));
  })), typeof children === 'function' ? children(active) : children);
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components/Tabs.jsx", error: String((e && e.message) || e) }); }

// src/components/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const placements = {
  top: {
    box: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    arrow: 'top-full left-1/2 -translate-x-1/2 -mt-1'
  },
  bottom: {
    box: 'top-full left-1/2 -translate-x-1/2 mt-2',
    arrow: 'bottom-full left-1/2 -translate-x-1/2 -mb-1'
  },
  left: {
    box: 'right-full top-1/2 -translate-y-1/2 mr-2',
    arrow: 'left-full top-1/2 -translate-y-1/2 -ml-1'
  },
  right: {
    box: 'left-full top-1/2 -translate-y-1/2 ml-2',
    arrow: 'right-full top-1/2 -translate-y-1/2 -mr-1'
  }
};

/**
 * Tooltip — dark label on hover/focus. CSS-only reveal, no JS state.
 *
 * <Tooltip label="Copiar enlace" placement="top"><Button>Compartir</Button></Tooltip>
 */
function Tooltip({
  label,
  placement = 'top',
  className = '',
  children,
  ...props
}) {
  const p = placements[placement] ?? placements.top;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['relative inline-flex group/tt font-body', className].join(' ')
  }, props), children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    className: ['pointer-events-none absolute z-50 whitespace-nowrap', 'px-2.5 py-1.5 rounded-[8px]', 'text-[0.76rem] font-medium text-white bg-nl-900', 'shadow-hover', 'opacity-0 scale-95 transition-all duration-150 ease-nl', 'group-hover/tt:opacity-100 group-hover/tt:scale-100', 'group-focus-within/tt:opacity-100 group-focus-within/tt:scale-100', p.box].join(' ')
  }, label, /*#__PURE__*/React.createElement("span", {
    className: ['absolute w-2 h-2 rotate-45 bg-nl-900', p.arrow].join(' ')
  })));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components/Tooltip.jsx", error: String((e && e.message) || e) }); }

// src/index.js
try { (() => {

Object.assign(__ds_scope, { Button: __ds_scope.Button, Card: __ds_scope.Card, Badge: __ds_scope.Badge, Input: __ds_scope.Input, Alert: __ds_scope.Alert, NlaceLogo: __ds_scope.NlaceLogo, NlaceAvatar: __ds_scope.NlaceAvatar, Spinner: __ds_scope.Spinner, Skeleton: __ds_scope.Skeleton, Tabs: __ds_scope.Tabs, Switch: __ds_scope.Switch, Tooltip: __ds_scope.Tooltip, Modal: __ds_scope.Modal, Dropdown: __ds_scope.Dropdown, Table: __ds_scope.Table, BarChart: __ds_scope.BarChart, LineChart: __ds_scope.LineChart, AreaChart: __ds_scope.AreaChart, PieChart: __ds_scope.PieChart, DonutChart: __ds_scope.DonutChart, NL_CHART_PALETTE: __ds_scope.NL_CHART_PALETTE });
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/index.js", error: String((e && e.message) || e) }); }

// src/tailwind-preset.js
try { (() => {
// NLACE UI Kit — tailwind-preset.js v2.0.4
// Para Tailwind v3. Si usas Tailwind v4, importa @nlace/ui-kit/tailwind-v4 en su lugar.
// Uso en tailwind.config.js:
//   const nlacePreset = require('@nlace/ui-kit/preset')
//   module.exports = { presets: [nlacePreset], ... }

/** @type {import('tailwindcss').Config} */
const nlacePreset = {
  theme: {
    extend: {
      colors: {
        nl: {
          bg: '#efefef',
          text: '#0f1011',
          black: '#0f1011',
          primary: '#5869f7',
          'primary-dark': '#2d3bc4',
          accent: '#fc624b',
          'accent-warm': '#ff8c42',
          pink: '#f76dee',
          magenta: '#b717af',
          success: '#42cf8a',
          'success-dark': '#2ba36a',
          'success-text': '#053a23',
          'success-bg': '#eaf9f1',
          white: '#ffffff',
          900: '#0f1011',
          700: '#3f3f46',
          500: '#71717a',
          400: '#a1a1aa',
          surface: '#dbdcd7',
          'border-soft': '#dbdcd7',
          'border-ui': '#c6c7c2',
          danger: '#fc624b',
          cyan: '#a5f3fc',
          'blue-24': '#1a1a5e',
          'blue-28': '#2d1f6e'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', '"Fira Code"', 'monospace']
      },
      borderRadius: {
        input: '10px',
        card: '20px',
        pill: '9999px'
      },
      boxShadow: {
        card: '0 2px 12px rgba(20,20,20,0.08)',
        hover: '0 10px 28px rgba(20,20,20,0.14)'
      },
      transitionTimingFunction: {
        nl: 'cubic-bezier(0.22, 1, 0.36, 1)'
      },
      transitionDuration: {
        ui: '220ms',
        reveal: '480ms'
      },
      backgroundImage: {
        'nl-hero': 'linear-gradient(135deg, #5869f7 0%, #b717af 60%, #f76dee 100%)',
        'nl-primary': 'linear-gradient(135deg, #5869f7 0%, #2d3bc4 100%)',
        'nl-accent': 'linear-gradient(135deg, #fc624b 0%, #f76dee 100%)',
        'nl-mint': 'linear-gradient(135deg, #42cf8a 0%, #2ba36a 100%)',
        'nl-dark': 'linear-gradient(180deg, #0f1011 0%, #2d3bc4 100%)',
        'nl-surface': 'linear-gradient(135deg, #ffffff 0%, #dbdcd7 100%)',
        'nl-brand': 'linear-gradient(90deg, #5869f7 0%, #fc624b 100%)'
      },
      animation: {
        'fade-up': 'fadeUp 0.48s cubic-bezier(0.22,1,0.36,1) both',
        'pulse-ring': 'pulseRing 1.6s ease infinite',
        'shimmer': 'shimmer 1.4s ease-in-out infinite',
        'spin-nl': 'spin 0.7s linear infinite'
      },
      keyframes: {
        fadeUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(12px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        pulseRing: {
          '0%': {
            transform: 'scale(1)',
            opacity: '0.35'
          },
          '100%': {
            transform: 'scale(2.2)',
            opacity: '0'
          }
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0'
          },
          '100%': {
            backgroundPosition: '200% 0'
          }
        }
      },
      letterSpacing: {
        'nl-tight': '-0.03em',
        'nl-normal': '-0.018em',
        'nl-ui': '0.08em'
      }
    }
  }
};
module.exports = nlacePreset;
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/tailwind-preset.js", error: String((e && e.message) || e) }); }

// ui_kits/ai-studio/components.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* NLACE AI Studio — shared UI components.
   Exposes: Button, Badge, Card, Input, Icon, Sidebar, Topbar, StatCard,
            ProjectRow, ChatMessage, Composer, Banner.
*/

const Icon = ({
  name,
  size = 18,
  stroke = 1.75,
  className = ""
}) => {
  // Ref callback — Lucide will hydrate the <i> when lucide.createIcons() runs.
  return React.createElement("i", {
    "data-lucide": name,
    style: {
      width: size,
      height: size,
      display: "inline-flex"
    },
    className
  });
};
const Button = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  ...props
}) => {
  const cls = ["btn", variant, size !== "md" ? size : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls
  }, props), icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: size === "sm" ? 14 : 16
  }), children);
};
const Badge = ({
  variant = "primary",
  children
}) => /*#__PURE__*/React.createElement("span", {
  className: `bdg ${variant}`
}, children);
const Card = ({
  accent,
  hover,
  className = "",
  children,
  ...props
}) => /*#__PURE__*/React.createElement("div", _extends({
  className: `card ${accent ? "accent" : ""} ${hover ? "hover" : ""} ${className}`
}, props), children);
const Input = ({
  label,
  hint,
  error,
  id,
  ...props
}) => {
  const _id = id || `in-${Math.random().toString(36).slice(2, 8)}`;
  return /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: _id
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: _id,
    className: "input"
  }, props)), error ? /*#__PURE__*/React.createElement("span", {
    className: "err"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "hint"
  }, hint) : null);
};
const Sidebar = ({
  active,
  onNav,
  projectCount
}) => {
  const items = [{
    id: "home",
    icon: "home",
    label: "Inicio"
  }, {
    id: "projects",
    icon: "layers",
    label: "Proyectos",
    count: projectCount
  }, {
    id: "models",
    icon: "sparkles",
    label: "Modelos"
  }, {
    id: "assets",
    icon: "image",
    label: "Assets"
  }, {
    id: "data",
    icon: "database",
    label: "Datasets"
  }];
  const secondary = [{
    id: "team",
    icon: "users",
    label: "Equipo"
  }, {
    id: "billing",
    icon: "credit-card",
    label: "Facturación"
  }, {
    id: "settings",
    icon: "settings",
    label: "Configuración"
  }];
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/nlace-black.svg",
    alt: "NLACE"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bdg solid-dark",
    style: {
      fontSize: 10,
      padding: "2px 8px"
    }
  }, "AI\xA0Studio")), /*#__PURE__*/React.createElement("div", {
    className: "nav-section"
  }, "Workspace"), items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    className: `nav-item ${active === it.id ? "active" : ""}`,
    onClick: () => onNav?.(it.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon
  }), /*#__PURE__*/React.createElement("span", null, it.label), it.count != null && /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, it.count))), /*#__PURE__*/React.createElement("div", {
    className: "nav-section"
  }, "Cuenta"), secondary.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    className: `nav-item ${active === it.id ? "active" : ""}`,
    onClick: () => onNav?.(it.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon
  }), /*#__PURE__*/React.createElement("span", null, it.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 10px",
      borderTop: "1px solid var(--nl-border-soft)",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      background: "#5869f7",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--nl-font-display)",
      fontWeight: 800
    }
  }, "V"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600
    }
  }, "Valeria D\xEDaz"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--nl-500)",
      fontSize: 11.5
    }
  }, "NLACE \xB7 Admin"))));
};
const Topbar = ({
  search,
  setSearch,
  onNew
}) => /*#__PURE__*/React.createElement("div", {
  className: "topbar"
}, /*#__PURE__*/React.createElement("div", {
  className: "search"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "search"
}), /*#__PURE__*/React.createElement("input", {
  placeholder: "Buscar proyectos, modelos, datasets\u2026",
  value: search,
  onChange: e => setSearch(e.target.value)
})), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1
  }
}), /*#__PURE__*/React.createElement(Button, {
  variant: "ghost",
  icon: "bell",
  className: "icon",
  "aria-label": "Notificaciones"
}), /*#__PURE__*/React.createElement(Button, {
  variant: "ghost",
  icon: "help-circle",
  className: "icon",
  "aria-label": "Ayuda"
}), /*#__PURE__*/React.createElement(Button, {
  variant: "primary",
  icon: "plus",
  onClick: onNew
}, "Nuevo proyecto"));
const StatCard = ({
  label,
  value,
  delta,
  down
}) => /*#__PURE__*/React.createElement("div", {
  className: "stat"
}, /*#__PURE__*/React.createElement("div", {
  className: "label"
}, label), /*#__PURE__*/React.createElement("div", {
  className: "value"
}, value), delta && /*#__PURE__*/React.createElement("div", {
  className: `delta ${down ? "down" : ""}`
}, down ? "↓" : "↑", " ", delta));
const ProjectRow = ({
  p,
  onOpen
}) => /*#__PURE__*/React.createElement("div", {
  className: "project-row",
  onClick: () => onOpen?.(p)
}, /*#__PURE__*/React.createElement("div", {
  className: "thumb",
  style: {
    background: p.color
  }
}, p.initial), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "name"
}, p.name), /*#__PURE__*/React.createElement("div", {
  className: "sub"
}, p.sub)), /*#__PURE__*/React.createElement("div", {
  className: "meta"
}, p.model), /*#__PURE__*/React.createElement("div", {
  className: "meta"
}, p.updated), /*#__PURE__*/React.createElement("div", {
  style: {
    textAlign: "right"
  }
}, /*#__PURE__*/React.createElement(Badge, {
  variant: p.statusVariant
}, p.status)));
const ChatMessage = ({
  role,
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: `msg ${role}`
}, /*#__PURE__*/React.createElement("div", {
  className: "avatar"
}, role === "user" ? "V" : "n."), /*#__PURE__*/React.createElement("div", {
  className: "bubble"
}, children));
const Composer = ({
  value,
  setValue,
  onSend,
  busy
}) => {
  const send = () => {
    if (value.trim() && !busy) onSend?.();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "composer"
  }, /*#__PURE__*/React.createElement("textarea", {
    rows: 2,
    placeholder: "Describe lo que necesitas construir\u2026",
    value: value,
    onChange: e => setValue(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send();
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "composer-row"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: "paperclip",
    size: "sm",
    className: "icon",
    "aria-label": "Adjuntar"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: "image",
    size: "sm",
    className: "icon",
    "aria-label": "Imagen"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: "mic",
    size: "sm",
    className: "icon",
    "aria-label": "Voz"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: "var(--nl-500)",
      marginLeft: 6
    }
  }, busy ? "Generando…" : "⌘ + Enter para enviar"), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement(Badge, {
    variant: "neutral"
  }, "nlace-sonnet"), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "sm",
    onClick: send,
    disabled: busy || !value.trim()
  }, busy ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "spinner"
  }), " Enviando") : /*#__PURE__*/React.createElement(React.Fragment, null, "Enviar ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 14
  })))));
};
const Banner = ({
  onPrimary
}) => /*#__PURE__*/React.createElement("div", {
  className: "banner"
}, /*#__PURE__*/React.createElement("div", {
  className: "banner-content"
}, /*#__PURE__*/React.createElement("span", {
  className: "eyebrow",
  style: {
    color: "rgba(255,255,255,0.7)"
  }
}, "NLACE AI Studio \xB7 v2.1"), /*#__PURE__*/React.createElement("h2", null, "Construimos herramientas de IA para tu equipo."), /*#__PURE__*/React.createElement("p", null, "Crea, entrena y despliega modelos sobre tus datos en una sola superficie. Compatible con el ecosistema NLACE.")), /*#__PURE__*/React.createElement("div", {
  className: "banner-actions"
}, /*#__PURE__*/React.createElement(Button, {
  variant: "accent",
  onClick: onPrimary
}, "Empezar un proyecto"), /*#__PURE__*/React.createElement("button", {
  className: "btn outlineLight"
}, "Ver documentaci\xF3n")));
Object.assign(window, {
  Icon,
  Button,
  Badge,
  Card,
  Input,
  Sidebar,
  Topbar,
  StatCard,
  ProjectRow,
  ChatMessage,
  Composer,
  Banner
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ai-studio/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ai-studio/screens.jsx
try { (() => {
/* NLACE AI Studio — Screens: Home, Projects, Chat */

const sampleProjects = [{
  id: 1,
  initial: "A",
  color: "linear-gradient(135deg,#3f58ea,#2f2f81)",
  name: "Agrointegral · Clasificador de cultivos",
  sub: "Visión · 12 modelos entrenados",
  model: "nlace-vision-1",
  updated: "hace 2 h",
  status: "Activo",
  statusVariant: "success"
}, {
  id: 2,
  initial: "E",
  color: "linear-gradient(135deg,#ff6143,#ff8c42)",
  name: "Evo · Evaluación de impacto",
  sub: "Texto · 3 datasets",
  model: "nlace-sonnet",
  updated: "hace 1 d",
  status: "Entrenando",
  statusVariant: "primary"
}, {
  id: 3,
  initial: "M",
  color: "linear-gradient(135deg,#6be8b0,#34d399)",
  name: "Mutualidades · Extractor de pólizas",
  sub: "Documentos · PDF → JSON",
  model: "nlace-docs-2",
  updated: "hace 3 d",
  status: "En revisión",
  statusVariant: "accent"
}, {
  id: 4,
  initial: "C",
  color: "linear-gradient(135deg,#18181b,#2f2f81)",
  name: "Cotizador NLACE · Asistente",
  sub: "Conversacional · chat widget",
  model: "nlace-sonnet",
  updated: "hace 5 d",
  status: "Activo",
  statusVariant: "success"
}, {
  id: 5,
  initial: "F",
  color: "linear-gradient(135deg,#3f58ea,#a5f3fc)",
  name: "Firmas · Validador de firmas digitales",
  sub: "Visión + OCR",
  model: "nlace-vision-1",
  updated: "hace 1 sem",
  status: "Borrador",
  statusVariant: "neutral"
}];
const HomeScreen = ({
  goProjects,
  startProject
}) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Banner, {
  onPrimary: startProject
}), /*#__PURE__*/React.createElement("div", {
  className: "stat-grid"
}, /*#__PURE__*/React.createElement(StatCard, {
  label: "Proyectos activos",
  value: "12",
  delta: "3 esta semana"
}), /*#__PURE__*/React.createElement(StatCard, {
  label: "Modelos entrenados",
  value: "48",
  delta: "8%"
}), /*#__PURE__*/React.createElement(StatCard, {
  label: "Llamadas \xB7 30d",
  value: "284 K",
  delta: "22%"
}), /*#__PURE__*/React.createElement(StatCard, {
  label: "Costo \xB7 30d",
  value: "$312",
  delta: "5%",
  down: true
})), /*#__PURE__*/React.createElement("div", {
  className: "section-head"
}, /*#__PURE__*/React.createElement("h2", null, "Proyectos recientes"), /*#__PURE__*/React.createElement(Button, {
  variant: "secondary",
  size: "sm",
  onClick: goProjects
}, "Ver todos ", /*#__PURE__*/React.createElement(Icon, {
  name: "arrow-right",
  size: 14
}))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  }
}, sampleProjects.slice(0, 3).map(p => /*#__PURE__*/React.createElement(ProjectRow, {
  key: p.id,
  p: p
}))));
const ProjectsScreen = ({
  filter,
  setFilter
}) => {
  const [tab, setTab] = React.useState("all");
  const filtered = sampleProjects.filter(p => tab === "all" ? true : p.status.toLowerCase().startsWith(tab)).filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) || p.sub.toLowerCase().includes(filter.toLowerCase()));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Workspace \xB7 NLACE"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 28,
      marginTop: 4
    }
  }, "Proyectos")), /*#__PURE__*/React.createElement("div", {
    className: "tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: tab === "all" ? "active" : "",
    onClick: () => setTab("all")
  }, "Todos"), /*#__PURE__*/React.createElement("button", {
    className: tab === "activo" ? "active" : "",
    onClick: () => setTab("activo")
  }, "Activos"), /*#__PURE__*/React.createElement("button", {
    className: tab === "entrenando" ? "active" : "",
    onClick: () => setTab("entrenando")
  }, "Entrenando"), /*#__PURE__*/React.createElement("button", {
    className: tab === "borrador" ? "active" : "",
    onClick: () => setTab("borrador")
  }, "Borradores"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, filtered.map(p => /*#__PURE__*/React.createElement(ProjectRow, {
    key: p.id,
    p: p
  })), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40,
      textAlign: "center",
      color: "var(--nl-500)"
    }
  }, "No hay proyectos que coincidan con \u201C", filter, "\u201D.")));
};
const ChatScreen = ({
  onBack
}) => {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const suggestions = [{
    eyebrow: "Documentos",
    text: "Extrae campos clave de un contrato en PDF a JSON."
  }, {
    eyebrow: "Datos",
    text: "Clasifica las reseñas por sentimiento (positivo, negativo, neutro)."
  }, {
    eyebrow: "Visión",
    text: "Detecta defectos visibles en fotos de productos de línea."
  }, {
    eyebrow: "Chat",
    text: "Asistente interno que responde sobre nuestra documentación."
  }];
  const send = text => {
    const t = text ?? input;
    if (!t.trim()) return;
    const userMsg = {
      id: Date.now(),
      role: "user",
      content: t
    };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setBusy(true);
    setTimeout(() => {
      setMessages(m => [...m, {
        id: Date.now() + 1,
        role: "ai",
        content: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
          style: {
            margin: 0
          }
        }, "Listo. Propongo un plan en tres pasos:"), /*#__PURE__*/React.createElement("ol", {
          style: {
            margin: "8px 0 0 18px",
            padding: 0
          }
        }, /*#__PURE__*/React.createElement("li", null, "Ingestar los PDFs en el dataset ", /*#__PURE__*/React.createElement("code", null, "contratos/2026-q1"), "."), /*#__PURE__*/React.createElement("li", null, "Entrenar con el modelo base ", /*#__PURE__*/React.createElement("code", null, "nlace-docs-2"), "."), /*#__PURE__*/React.createElement("li", null, "Desplegar como endpoint ", /*#__PURE__*/React.createElement("code", null, "/api/extract-contract"), ".")), /*#__PURE__*/React.createElement("p", {
          style: {
            margin: "8px 0 0",
            color: "var(--nl-500)",
            fontSize: 13
          }
        }, "\xBFLo creo como proyecto nuevo?"))
      }]);
      setBusy(false);
    }, 900);
  };
  if (messages.length === 0) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: "btn ghost sm",
      onClick: onBack,
      style: {
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 14
    }), " Volver"), /*#__PURE__*/React.createElement("div", {
      className: "hero"
    }, /*#__PURE__*/React.createElement("span", {
      className: "eyebrow",
      style: {
        color: "var(--nl-primary)"
      }
    }, "Nuevo proyecto"), /*#__PURE__*/React.createElement("h1", null, "\xBFQu\xE9 vamos a ", /*#__PURE__*/React.createElement("span", {
      className: "text-gradient"
    }, "construir"), " hoy?"), /*#__PURE__*/React.createElement("p", null, "Describe lo que necesitas en espa\xF1ol natural. NLACE AI Studio te propone un plan y los modelos adecuados.")), /*#__PURE__*/React.createElement(Composer, {
      value: input,
      setValue: setInput,
      onSend: () => send(),
      busy: busy
    }), /*#__PURE__*/React.createElement("div", {
      className: "suggest-grid"
    }, suggestions.map((s, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      className: "suggest",
      onClick: () => send(s.text)
    }, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow"
    }, s.eyebrow), s.text))));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn ghost sm",
    onClick: onBack,
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 14
  }), " Volver"), /*#__PURE__*/React.createElement("div", {
    className: "chat"
  }, messages.map(m => /*#__PURE__*/React.createElement(ChatMessage, {
    key: m.id,
    role: m.role
  }, m.content)), busy && /*#__PURE__*/React.createElement("div", {
    className: "msg ai"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar"
  }, "n."), /*#__PURE__*/React.createElement("div", {
    className: "bubble",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "spinner"
  }), " Pensando\u2026"))), /*#__PURE__*/React.createElement(Composer, {
    value: input,
    setValue: setInput,
    onSend: () => send(),
    busy: busy
  }));
};
Object.assign(window, {
  HomeScreen,
  ProjectsScreen,
  ChatScreen,
  sampleProjects
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ai-studio/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.NL_CHART_PALETTE = __ds_scope.NL_CHART_PALETTE;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.LineChart = __ds_scope.LineChart;

__ds_ns.AreaChart = __ds_scope.AreaChart;

__ds_ns.PieChart = __ds_scope.PieChart;

__ds_ns.DonutChart = __ds_scope.DonutChart;

__ds_ns.Dropdown = __ds_scope.Dropdown;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.NlaceLogo = __ds_scope.NlaceLogo;

__ds_ns.NlaceAvatar = __ds_scope.NlaceAvatar;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Tooltip = __ds_scope.Tooltip;

})();
