/**
 * Bubble Brainstorm v5
 * Double-tap empty to add · no browser selection fights · wrapping text · touch-first
 */
(function () {
  "use strict";

  const STORE = "token-moose-bubble-brainstorm-v5";
  const BASE_RADIUS = 58;
  const MIN_RADIUS = 48;
  const MAX_RADIUS = 140;
  const LINK_SLACK = 1.45;
  const BOARD_W = 1600;
  const BOARD_H = 1000;
  const BIN = { x: 20, y: 20, w: 100, h: 100 };
  const DRAG_THRESHOLD = 8; // svg units
  const DOUBLE_MS = 350;

  function themePalette() {
    const t = document.documentElement.getAttribute("data-theme") || "night";
    const maps = {
      night: ["#a78bfa", "#22d3ee", "#f472b6", "#818cf8", "#34d399", "#fbbf24"],
      day: ["#0284c7", "#0d9488", "#c026d3", "#2563eb", "#16a34a", "#d97706"],
      playful: ["#f97316", "#ec4899", "#8b5cf6", "#14b8a6", "#eab308", "#3b82f6"],
      forest: ["#4ade80", "#22c55e", "#a3e635", "#2dd4bf", "#86efac", "#65a30d"],
      ocean: ["#38bdf8", "#22d3ee", "#60a5fa", "#0ea5e9", "#67e8f9", "#818cf8"]
    };
    return maps[t] || maps.night;
  }

  function contrast(hex) {
    try {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? "#0f172a" : "#ffffff";
    } catch (_) {
      return "#ffffff";
    }
  }
  function lighten(hex, amt) {
    try {
      let r = parseInt(hex.slice(1, 3), 16);
      let g = parseInt(hex.slice(3, 5), 16);
      let b = parseInt(hex.slice(5, 7), 16);
      r = Math.min(255, Math.round(r + (255 - r) * amt));
      g = Math.min(255, Math.round(g + (255 - g) * amt));
      b = Math.min(255, Math.round(b + (255 - b) * amt));
      return "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
    } catch (_) {
      return hex;
    }
  }
  function darken(hex, amt) {
    try {
      let r = parseInt(hex.slice(1, 3), 16);
      let g = parseInt(hex.slice(3, 5), 16);
      let b = parseInt(hex.slice(5, 7), 16);
      r = Math.max(0, Math.round(r * (1 - amt)));
      g = Math.max(0, Math.round(g * (1 - amt)));
      b = Math.max(0, Math.round(b * (1 - amt)));
      return "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
    } catch (_) {
      return hex;
    }
  }

  function distToSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * dx + (py - y1) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  }

  /** Wrap text into lines that fit maxWidth; returns { lines, fontSize } */
  function layoutText(text, maxWidth, maxFont, minFont) {
    const canvas = layoutText._c || (layoutText._c = document.createElement("canvas"));
    const ctx = canvas.getContext("2d");
    let fontSize = maxFont;
    const words = String(text || "").split(/\s+/).filter(Boolean);
    if (!words.length) return { lines: [""], fontSize: maxFont };

    function tryLayout(fs) {
      ctx.font = "800 " + fs + "px system-ui,sans-serif";
      const lines = [];
      let line = "";
      for (let i = 0; i < words.length; i++) {
        const test = line ? line + " " + words[i] : words[i];
        if (ctx.measureText(test).width <= maxWidth) {
          line = test;
        } else {
          if (line) lines.push(line);
          // word longer than width — hard split
          if (ctx.measureText(words[i]).width > maxWidth) {
            let chunk = "";
            for (const ch of words[i]) {
              if (ctx.measureText(chunk + ch).width <= maxWidth) chunk += ch;
              else {
                if (chunk) lines.push(chunk);
                chunk = ch;
              }
            }
            line = chunk;
          } else {
            line = words[i];
          }
        }
      }
      if (line) lines.push(line);
      return lines;
    }

    let lines = tryLayout(fontSize);
    // shrink font if too many lines or still too wide conceptually
    while (fontSize > minFont && (lines.length > 5 || lines.some((l) => {
      ctx.font = "800 " + fontSize + "px system-ui,sans-serif";
      return ctx.measureText(l).width > maxWidth;
    }))) {
      fontSize -= 1;
      lines = tryLayout(fontSize);
    }
    return { lines, fontSize };
  }

  /** Radius large enough for wrapped text at this scale */
  function radiusForText(text, scale) {
    const base = BASE_RADIUS * scale;
    const maxW = base * 1.55;
    const maxFont = Math.max(12, Math.floor(base * 0.42));
    const minFont = 10;
    const { lines, fontSize } = layoutText(text, maxW, maxFont, minFont);
    const lineH = fontSize * 1.2;
    const textH = lines.length * lineH;
    const need = Math.max(base, textH * 0.65 + fontSize * 0.8);
    return Math.min(MAX_RADIUS * scale, Math.max(MIN_RADIUS * scale, need));
  }

  class BubbleBrainstorm {
    constructor() {
      this.bubbles = [];
      this.connections = [];
      this.nextId = 1;
      this.scale = 1;
      this.dragged = null;
      this.didDrag = false;
      this.homeX = 0;
      this.homeY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.dropTarget = null;
      this.overBin = false;
      this.colorOverride = "";
      this.editingId = null;
      this.lastEmptyTap = 0;
      this.lastEmptyPos = null;
      this.pointerId = null;

      this.canvas = document.getElementById("canvas");
      this.wrap = document.getElementById("canvasWrap");
      this.bubblesLayer = document.getElementById("bubblesLayer");
      this.connectionsLayer = document.getElementById("connectionsLayer");
      this.inlineEdit = document.getElementById("inlineEdit");
      this.binEl = document.getElementById("deleteBin");

      this.init();
    }

    bubbleRadius(bubble) {
      return radiusForText(bubble.text, this.scale);
    }

    init() {
      this.load();
      this.bind();
      this.render();
    }

    bind() {
      const $ = (id) => document.getElementById(id);

      $("addBubbleBtn").addEventListener("click", () => {
        this.addBubble(null, null, BOARD_W / 2 + (Math.random() - 0.5) * 100, BOARD_H / 2 + (Math.random() - 0.5) * 100);
      });
      $("bubbleInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.addBubble(null, null, BOARD_W / 2 + (Math.random() - 0.5) * 100, BOARD_H / 2 + (Math.random() - 0.5) * 100);
        }
      });
      $("colorPicker").addEventListener("change", (e) => {
        this.colorOverride = e.target.value || "";
      });

      // Scale slider: stop propagation so board never steals it
      const slider = $("scaleSlider");
      const stop = (e) => e.stopPropagation();
      ["pointerdown", "mousedown", "touchstart", "touchmove"].forEach((ev) => {
        slider.addEventListener(ev, stop, { passive: true });
      });
      slider.addEventListener("input", (e) => {
        const pct = Number(e.target.value) || 100;
        $("scaleValue").textContent = pct + "%";
        this.scale = pct / 100;
        this.render();
        this.save();
      });

      $("clearConnectionsBtn").addEventListener("click", () => {
        if (!this.connections.length) return;
        if (confirm("Remove all links?")) {
          this.connections = [];
          this.save();
          this.render();
        }
      });
      $("clearBubblesBtn").addEventListener("click", () => {
        if (!this.bubbles.length) return;
        if (confirm("Clear all bubbles and links?")) {
          this.bubbles = [];
          this.connections = [];
          this.save();
          this.render();
        }
      });
      $("printBtn").addEventListener("click", () => {
        this.commitEdit();
        this.render();
        window.print();
      });

      this.inlineEdit.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.commitEdit();
        } else if (e.key === "Escape") {
          e.preventDefault();
          this.cancelEdit();
        }
      });
      this.inlineEdit.addEventListener("blur", () => {
        setTimeout(() => this.commitEdit(), 50);
      });

      // Pointer events on canvas only — prevents browser text/image drag
      this.canvas.addEventListener("pointerdown", (e) => this.onPointerDown(e));
      window.addEventListener("pointermove", (e) => this.onPointerMove(e));
      window.addEventListener("pointerup", (e) => this.onPointerUp(e));
      window.addEventListener("pointercancel", (e) => this.onPointerUp(e));

      // Kill default drag / selection on board
      this.wrap.addEventListener("dragstart", (e) => e.preventDefault());
      this.canvas.addEventListener("selectstart", (e) => e.preventDefault());
      document.addEventListener("selectionchange", () => {
        if (this.dragged && window.getSelection) {
          const s = window.getSelection();
          if (s && s.rangeCount) s.removeAllRanges();
        }
      });
    }

    clientToSvg(cx, cy) {
      const pt = this.canvas.createSVGPoint();
      pt.x = cx;
      pt.y = cy;
      const ctm = this.canvas.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };
      return pt.matrixTransform(ctm.inverse());
    }

    inBin(x, y) {
      return x >= BIN.x && x <= BIN.x + BIN.w && y >= BIN.y && y <= BIN.y + BIN.h;
    }

    pickColor() {
      if (this.colorOverride) return this.colorOverride;
      const palette = themePalette();
      return palette[this.bubbles.length % palette.length];
    }

    addBubble(text, color, x, y) {
      const input = document.getElementById("bubbleInput");
      let t = text;
      if (t == null) t = (input && input.value.trim()) || "Idea";
      t = String(t).trim() || "Idea";
      const bubble = {
        id: this.nextId++,
        text: t,
        color: color || this.pickColor(),
        x: x != null ? x : BOARD_W / 2,
        y: y != null ? y : BOARD_H / 2
      };
      const r = this.bubbleRadius(bubble);
      if (this.inBin(bubble.x, bubble.y)) {
        bubble.x = BIN.x + BIN.w + r + 24;
        bubble.y = BIN.y + BIN.h / 2;
      }
      bubble.x = Math.max(r + 4, Math.min(BOARD_W - r - 4, bubble.x));
      bubble.y = Math.max(r + 4, Math.min(BOARD_H - r - 4, bubble.y));
      this.bubbles.push(bubble);
      if (input && text == null) input.value = "";
      this.save();
      this.render();
      return bubble;
    }

    nearestBubble(svgX, svgY, excludeId, slackMul) {
      let best = null;
      let bestD = Infinity;
      for (let i = 0; i < this.bubbles.length; i++) {
        const b = this.bubbles[i];
        if (excludeId != null && b.id === excludeId) continue;
        const r = this.bubbleRadius(b) * (slackMul || 1);
        const d = Math.hypot(svgX - b.x, svgY - b.y);
        if (d <= r && d < bestD) {
          bestD = d;
          best = b;
        }
      }
      return best;
    }

    connectionAt(svgX, svgY) {
      const threshold = 18;
      for (let i = 0; i < this.connections.length; i++) {
        const c = this.connections[i];
        const a = this.bubbles.find((b) => b.id === c.from);
        const b = this.bubbles.find((b) => b.id === c.to);
        if (!a || !b) continue;
        const ep = this.edgePoints(a, b);
        if (distToSegment(svgX, svgY, ep.x1, ep.y1, ep.x2, ep.y2) <= threshold) return i;
      }
      return -1;
    }

    edgePoints(a, b) {
      const ra = this.bubbleRadius(a);
      const rb = this.bubbleRadius(b);
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len;
      const uy = dy / len;
      return {
        x1: a.x + ux * ra,
        y1: a.y + uy * ra,
        x2: b.x - ux * (rb + 2),
        y2: b.y - uy * (rb + 2)
      };
    }

    render() {
      if (this.binEl) this.binEl.classList.toggle("is-active", !!this.overBin);

      this.connectionsLayer.innerHTML = "";
      this.connections.forEach((conn, idx) => {
        const a = this.bubbles.find((b) => b.id === conn.from);
        const b = this.bubbles.find((b) => b.id === conn.to);
        if (!a || !b) return;
        const ep = this.edgePoints(a, b);

        const hit = document.createElementNS("http://www.w3.org/2000/svg", "line");
        hit.setAttribute("x1", ep.x1);
        hit.setAttribute("y1", ep.y1);
        hit.setAttribute("x2", ep.x2);
        hit.setAttribute("y2", ep.y2);
        hit.setAttribute("class", "connection-hit");
        const kill = (e) => {
          e.stopPropagation();
          e.preventDefault();
          this.removeConnection(idx);
        };
        hit.addEventListener("pointerdown", kill);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", ep.x1);
        line.setAttribute("y1", ep.y1);
        line.setAttribute("x2", ep.x2);
        line.setAttribute("y2", ep.y2);
        line.setAttribute("class", "connection");
        line.setAttribute("marker-end", "url(#arrowHead)");
        hit.addEventListener("pointerenter", () => line.classList.add("is-hover"));
        hit.addEventListener("pointerleave", () => line.classList.remove("is-hover"));

        this.connectionsLayer.appendChild(hit);
        this.connectionsLayer.appendChild(line);
      });

      this.bubblesLayer.innerHTML = "";
      this.bubbles.forEach((bubble) => {
        const r = this.bubbleRadius(bubble);
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        let cls = "bubble";
        if (this.dropTarget && this.dropTarget.id === bubble.id) cls += " is-drop-target";
        if (this.editingId === bubble.id) cls += " is-editing";
        if (this.overBin && this.dragged && this.dragged.id === bubble.id) cls += " is-over-bin";
        group.setAttribute("class", cls);
        group.setAttribute("data-id", String(bubble.id));
        group.setAttribute("transform", "translate(" + bubble.x + "," + bubble.y + ")");
        group.setAttribute("filter", "url(#softShadow)");

        const base = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        base.setAttribute("r", r);
        base.setAttribute("fill", darken(bubble.color, 0.18));
        base.setAttribute("cx", 2);
        base.setAttribute("cy", 3);

        const body = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        body.setAttribute("class", "bubble-rim");
        body.setAttribute("r", r);
        body.setAttribute("fill", bubble.color);
        body.setAttribute("stroke", lighten(bubble.color, 0.35));
        body.setAttribute("stroke-width", "2.5");

        const gloss = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        gloss.setAttribute("cx", -r * 0.28);
        gloss.setAttribute("cy", -r * 0.32);
        gloss.setAttribute("rx", r * 0.42);
        gloss.setAttribute("ry", r * 0.28);
        gloss.setAttribute("fill", "rgba(255,255,255,0.35)");
        gloss.setAttribute("pointer-events", "none");

        const spec = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        spec.setAttribute("cx", -r * 0.35);
        spec.setAttribute("cy", -r * 0.4);
        spec.setAttribute("r", Math.max(3, r * 0.1));
        spec.setAttribute("fill", "rgba(255,255,255,0.65)");
        spec.setAttribute("pointer-events", "none");

        // Multi-line text
        group.appendChild(base);
        group.appendChild(body);
        group.appendChild(gloss);
        group.appendChild(spec);

        const maxW = r * 1.55;
        const maxFont = Math.max(12, Math.floor(r * 0.42));
        const { lines, fontSize } = layoutText(bubble.text, maxW, maxFont, 10);
        const lineH = fontSize * 1.2;
        const startY = -((lines.length - 1) * lineH) / 2;
        const textFill = contrast(bubble.color);
        lines.forEach((line, i) => {
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("class", "bubble-text");
          text.setAttribute("font-size", String(fontSize));
          text.setAttribute("y", String(startY + i * lineH));
          text.style.fill = textFill;
          text.textContent = line;
          group.appendChild(text);
        });

        this.bubblesLayer.appendChild(group);
      });
    }

    removeConnection(idx) {
      if (idx < 0 || idx >= this.connections.length) return;
      this.connections.splice(idx, 1);
      this.save();
      this.render();
    }

    deleteBubble(bubble) {
      this.bubbles = this.bubbles.filter((b) => b.id !== bubble.id);
      this.connections = this.connections.filter(
        (c) => c.from !== bubble.id && c.to !== bubble.id
      );
      if (this.editingId === bubble.id) this.cancelEdit();
      this.save();
      this.render();
    }

    link(a, b) {
      if (!a || !b || a.id === b.id) return;
      const exists = this.connections.some((c) => c.from === a.id && c.to === b.id);
      if (!exists) {
        this.connections.push({ from: a.id, to: b.id });
        this.save();
      }
    }

    startEdit(bubble) {
      this.editingId = bubble.id;
      this.render();
      const r = this.bubbleRadius(bubble);
      const ctm = this.canvas.getScreenCTM();
      if (!ctm) return;
      const sx = ctm.a * bubble.x + ctm.c * bubble.y + ctm.e;
      const sy = ctm.b * bubble.x + ctm.d * bubble.y + ctm.f;
      const wrapRect = this.wrap.getBoundingClientRect();
      const ed = this.inlineEdit;
      ed.hidden = false;
      ed.value = bubble.text;
      const scaleX = this.canvas.getBoundingClientRect().width / BOARD_W;
      const w = Math.max(100, Math.min(280, r * 2.2 * scaleX));
      ed.style.width = w + "px";
      ed.style.left = sx - wrapRect.left - w / 2 + "px";
      ed.style.top = sy - wrapRect.top - 24 + "px";
      ed.focus();
      ed.select();
    }

    commitEdit() {
      if (this.editingId == null) return;
      const bubble = this.bubbles.find((b) => b.id === this.editingId);
      const val = this.inlineEdit.value.trim();
      if (bubble && val) bubble.text = val;
      this.editingId = null;
      this.inlineEdit.hidden = true;
      this.save();
      this.render();
    }

    cancelEdit() {
      this.editingId = null;
      this.inlineEdit.hidden = true;
      this.render();
    }

    onPointerDown(e) {
      // Only primary button / touch
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (this.editingId != null) this.commitEdit();

      e.preventDefault();
      try {
        this.canvas.setPointerCapture(e.pointerId);
      } catch (_) {}
      this.pointerId = e.pointerId;

      const p = this.clientToSvg(e.clientX, e.clientY);

      // Links first
      const cIdx = this.connectionAt(p.x, p.y);
      if (cIdx >= 0) {
        this.removeConnection(cIdx);
        this.pointerId = null;
        return;
      }

      if (this.inBin(p.x, p.y)) {
        this.pointerId = null;
        return;
      }

      // Generous hit on bubbles
      const bubble = this.nearestBubble(p.x, p.y, null, 1.08);
      if (bubble) {
        this.dragged = bubble;
        this.didDrag = false;
        this.homeX = bubble.x;
        this.homeY = bubble.y;
        this.offsetX = p.x - bubble.x;
        this.offsetY = p.y - bubble.y;
        this.dropTarget = null;
        this.overBin = false;
        this.lastEmptyTap = 0;
        return;
      }

      // Empty board: require double-tap/double-click to create (stops miss-clicks)
      const now = Date.now();
      const prev = this.lastEmptyPos;
      const close =
        prev && Math.hypot(p.x - prev.x, p.y - prev.y) < 40;
      if (close && now - this.lastEmptyTap < DOUBLE_MS) {
        this.addBubble(null, null, p.x, p.y);
        this.lastEmptyTap = 0;
        this.lastEmptyPos = null;
      } else {
        this.lastEmptyTap = now;
        this.lastEmptyPos = { x: p.x, y: p.y };
      }
      this.dragged = null;
    }

    onPointerMove(e) {
      if (this.pointerId != null && e.pointerId !== this.pointerId) return;
      if (!this.dragged) return;
      e.preventDefault();

      const p = this.clientToSvg(e.clientX, e.clientY);
      const r = this.bubbleRadius(this.dragged);
      let nx = p.x - this.offsetX;
      let ny = p.y - this.offsetY;
      nx = Math.max(r + 4, Math.min(BOARD_W - r - 4, nx));
      ny = Math.max(r + 4, Math.min(BOARD_H - r - 4, ny));
      if (Math.hypot(nx - this.homeX, ny - this.homeY) > DRAG_THRESHOLD) {
        this.didDrag = true;
      }
      this.dragged.x = nx;
      this.dragged.y = ny;

      this.overBin = this.inBin(nx, ny) || this.inBin(p.x, p.y);
      if (!this.overBin) {
        const byPointer = this.nearestBubble(p.x, p.y, this.dragged.id, LINK_SLACK);
        const byCenter = this.nearestBubble(nx, ny, this.dragged.id, LINK_SLACK);
        this.dropTarget = byPointer || byCenter;
      } else {
        this.dropTarget = null;
      }
      this.render();
    }

    onPointerUp(e) {
      if (this.pointerId != null && e.pointerId !== this.pointerId) return;
      try {
        this.canvas.releasePointerCapture(e.pointerId);
      } catch (_) {}

      if (!this.dragged) {
        this.pointerId = null;
        return;
      }

      const src = this.dragged;
      const overBin = this.overBin || this.inBin(src.x, src.y);

      if (this.didDrag && overBin) {
        this.deleteBubble(src);
      } else if (this.didDrag) {
        const target =
          this.nearestBubble(src.x, src.y, src.id, LINK_SLACK) || this.dropTarget;
        if (target && target.id !== src.id) {
          this.link(src, target);
          src.x = this.homeX;
          src.y = this.homeY;
        } else {
          this.save();
        }
      } else {
        this.startEdit(src);
      }

      this.dragged = null;
      this.dropTarget = null;
      this.overBin = false;
      this.didDrag = false;
      this.pointerId = null;
      this.render();
      this.save();
    }

    save() {
      try {
        localStorage.setItem(
          STORE,
          JSON.stringify({
            bubbles: this.bubbles,
            connections: this.connections,
            nextId: this.nextId,
            scale: this.scale
          })
        );
      } catch (_) {}
    }

    load() {
      try {
        const raw =
          localStorage.getItem(STORE) ||
          localStorage.getItem("token-moose-bubble-brainstorm-v4") ||
          localStorage.getItem("token-moose-bubble-brainstorm-v3") ||
          localStorage.getItem("token-moose-bubble-brainstorm-v2");
        if (!raw) return;
        const data = JSON.parse(raw);
        this.bubbles = data.bubbles || [];
        this.connections = data.connections || [];
        this.nextId = data.nextId || 1;
        this.bubbles.forEach((b) => {
          const r = this.bubbleRadius(b);
          b.x = Math.max(r + 4, Math.min(BOARD_W - r - 4, b.x));
          b.y = Math.max(r + 4, Math.min(BOARD_H - r - 4, b.y));
        });
        if (data.scale) {
          this.scale = data.scale;
          const pct = Math.round(this.scale * 100);
          const slider = document.getElementById("scaleSlider");
          const label = document.getElementById("scaleValue");
          if (slider) slider.value = String(Math.min(180, Math.max(70, pct)));
          if (label) label.textContent = pct + "%";
        }
      } catch (_) {}
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    window.bubbleBrainstorm = new BubbleBrainstorm();
  });
})();
