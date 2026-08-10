/**
 * Exit Ticket Maker — build, live display, print
 */

const TEMPLATES = [
  {
    id: "321",
    name: "3-2-1",
    title: "Exit Ticket · 3-2-1",
    prompts: [
      "3 things I learned today:",
      "2 questions I still have:",
      "1 connection to something I already knew:",
    ],
  },
  {
    id: "one",
    name: "One question",
    title: "Exit Ticket",
    prompts: ["What is one important idea you learned today?"],
  },
  {
    id: "traffic",
    name: "Traffic light",
    title: "Exit Ticket · Traffic Light",
    prompts: [
      "🟢 Green — Something I understand well:",
      "🟡 Yellow — Something I’m unsure about:",
      "🔴 Red — Something I need help with:",
    ],
  },
  {
    id: "reflect",
    name: "Reflection",
    title: "Exit Ticket · Reflection",
    prompts: [
      "Today I felt most successful when…",
      "Next time I will try to…",
      "One word for today’s learning:",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    title: "Exit Ticket",
    prompts: ["Prompt 1:", "Prompt 2:"],
  },
];

const STORAGE_KEY = "exit-ticket-maker-v1";

class ExitTicketMaker {
  constructor() {
    this.templateId = "321";
    this.prompts = TEMPLATES[0].prompts.slice();

    this.els = {
      templates: document.getElementById("templates"),
      title: document.getElementById("title"),
      meta: document.getElementById("meta"),
      dateMode: document.getElementById("date-mode"),
      nameMode: document.getElementById("name-mode"),
      prompts: document.getElementById("prompts"),
      perPage: document.getElementById("per-page"),
      showLines: document.getElementById("show-lines"),
      preview: document.getElementById("preview"),
      live: document.getElementById("live"),
      liveBody: document.getElementById("live-body"),
      liveMeta: document.getElementById("live-meta"),
      printRoot: document.getElementById("print-root"),
      saveStatus: document.getElementById("save-status"),
    };

    this._buildTemplates();
    this._bind();
    this.renderPrompts();
    this.renderPreview();
  }

  _buildTemplates() {
    this.els.templates.innerHTML = "";
    TEMPLATES.forEach((t) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tpl-btn" + (t.id === this.templateId ? " is-active" : "");
      b.textContent = t.name;
      b.dataset.id = t.id;
      b.addEventListener("click", () => this.selectTemplate(t.id));
      this.els.templates.appendChild(b);
    });
  }

  selectTemplate(id) {
    const t = TEMPLATES.find((x) => x.id === id) || TEMPLATES[0];
    this.templateId = t.id;
    this.prompts = t.prompts.slice();
    this.els.title.value = t.title;
    this._buildTemplates();
    this.renderPrompts();
    this.renderPreview();
  }

  _bind() {
    const refresh = () => this.renderPreview();
    this.els.title.addEventListener("input", refresh);
    this.els.meta.addEventListener("input", refresh);
    this.els.dateMode.addEventListener("change", refresh);
    this.els.nameMode.addEventListener("change", refresh);
    this.els.perPage.addEventListener("change", refresh);
    this.els.showLines.addEventListener("change", refresh);

    document.getElementById("btn-add-prompt").addEventListener("click", () => {
      this.prompts.push("New prompt:");
      this.renderPrompts();
      this.renderPreview();
    });

    document.getElementById("btn-live").addEventListener("click", () => this.openLive());
    document.getElementById("live-close").addEventListener("click", () => this.closeLive());
    document.getElementById("live-fs").addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    });
    document.getElementById("btn-print").addEventListener("click", () => this.print());
    document.getElementById("btn-save").addEventListener("click", () => this.saveLocal());
  }

  renderPrompts() {
    const box = this.els.prompts;
    box.innerHTML = "";
    this.prompts.forEach((text, i) => {
      const row = document.createElement("div");
      row.className = "prompt-row";
      const input = document.createElement("textarea");
      input.className = "prompt-input";
      input.rows = 2;
      input.value = text;
      input.addEventListener("input", () => {
        this.prompts[i] = input.value;
        this.renderPreview();
      });
      const del = document.createElement("button");
      del.type = "button";
      del.textContent = "✕";
      del.title = "Remove";
      del.addEventListener("click", () => {
        if (this.prompts.length <= 1) return;
        this.prompts.splice(i, 1);
        this.renderPrompts();
        this.renderPreview();
      });
      row.appendChild(input);
      row.appendChild(del);
      box.appendChild(row);
    });
  }

  getData() {
    return {
      title: this.els.title.value.trim() || "Exit Ticket",
      meta: this.els.meta.value.trim(),
      dateMode: this.els.dateMode.value,
      nameMode: this.els.nameMode.value,
      prompts: this.prompts.map((p) => p.trim()).filter(Boolean),
      showLines: this.els.showLines.checked,
      perPage: parseInt(this.els.perPage.value, 10) || 4,
    };
  }

  dateLabel(mode) {
    if (mode === "none") return "";
    if (mode === "today") {
      return new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    return "____________________";
  }

  renderPreview() {
    const d = this.getData();
    this.els.preview.innerHTML = this.ticketHTML(d, false);
  }

  ticketHTML(d, forPrint) {
    const nameLine =
      d.nameMode === "yes"
        ? `<span>Name: ____________________</span>`
        : "";
    const dateLine =
      d.dateMode === "none"
        ? ""
        : `<span>Date: ${escapeHtml(this.dateLabel(d.dateMode))}</span>`;
    const lines =
      nameLine || dateLine
        ? `<div class="${forPrint ? "lines" : "ticket-lines"}">${nameLine}${dateLine}</div>`
        : "";
    const qs = d.prompts
      .map((p) => {
        const linesHtml = d.showLines
          ? `<div class="${forPrint ? "ans" : "ticket-answer-line"}"></div>
             <div class="${forPrint ? "ans" : "ticket-answer-line"}"></div>`
          : `<div class="${forPrint ? "ans" : "ticket-answer-line"}"></div>`;
        return `<p class="${forPrint ? "q" : "ticket-q"}">${escapeHtml(p)}</p>${linesHtml}`;
      })
      .join("");
    const meta = d.meta
      ? `<div class="${forPrint ? "meta" : "ticket-meta"}">${escapeHtml(d.meta)}</div>`
      : "";

    if (forPrint) {
      return `<div class="print-ticket"><h3>${escapeHtml(d.title)}</h3>${meta}${lines}${qs}</div>`;
    }
    return `<div class="ticket-sheet"><h3>${escapeHtml(d.title)}</h3>${meta}${lines}${qs}</div>`;
  }

  openLive() {
    const d = this.getData();
    this.els.live.hidden = false;
    this.els.liveMeta.textContent = [d.title, d.meta].filter(Boolean).join(" · ");
    this.els.liveBody.innerHTML = `
      <h1>${escapeHtml(d.title)}</h1>
      ${d.meta ? `<p class="live-meta-line">${escapeHtml(d.meta)}</p>` : ""}
      <ol>${d.prompts.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ol>
    `;
  }

  closeLive() {
    this.els.live.hidden = true;
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  print() {
    const d = this.getData();
    const n = d.perPage;
    // One page of N identical tickets (teachers can print multiple pages from dialog)
    const tickets = Array.from({ length: n }, () => this.ticketHTML(d, true)).join("");
    const colClass =
      n === 1 ? "cols-1" : n === 2 ? "cols-2" : n === 6 ? "cols-6" : "cols-4";

    this.els.printRoot.innerHTML = `
      <div class="print-page">
        <div class="print-grid ${colClass}">${tickets}</div>
      </div>
    `;
    // Allow layout to settle
    requestAnimationFrame(() => {
      window.print();
    });
  }

  saveLocal() {
    const d = this.getData();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...d, templateId: this.templateId }));
      this.els.saveStatus.hidden = false;
      this.els.saveStatus.textContent = "Saved in this browser.";
      setTimeout(() => {
        this.els.saveStatus.hidden = true;
      }, 2500);
    } catch (_) {
      alert("Could not save (storage blocked).");
    }
  }

  loadLocal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d.title) this.els.title.value = d.title;
      if (d.meta != null) this.els.meta.value = d.meta;
      if (d.dateMode) this.els.dateMode.value = d.dateMode;
      if (d.nameMode) this.els.nameMode.value = d.nameMode;
      if (d.perPage) this.els.perPage.value = String(d.perPage);
      if (typeof d.showLines === "boolean") this.els.showLines.checked = d.showLines;
      if (Array.isArray(d.prompts) && d.prompts.length) this.prompts = d.prompts;
      if (d.templateId) this.templateId = d.templateId;
      this._buildTemplates();
      this.renderPrompts();
      this.renderPreview();
    } catch (_) {}
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new ExitTicketMaker();
  app.loadLocal();
});
