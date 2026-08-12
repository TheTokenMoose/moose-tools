/**
 * Teacher planning calendar (home sidebar)
 * - Month grid with event dots
 * - Live China public holidays via Nager.Date (when online)
 * - Static school-break windows + global teaching-relevant days
 * - Works offline with built-in fallback data
 */
(function () {
  const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  /** Fixed global / teaching days (month is 1-based, day fixed each year) */
  const GLOBAL_ANNUAL = [
    { m: 1, d: 1, name: "New Year’s Day", kind: "global" },
    { m: 1, d: 24, name: "International Day of Education (UN)", kind: "global" },
    { m: 2, d: 21, name: "International Mother Language Day", kind: "global" },
    { m: 3, d: 8, name: "International Women’s Day", kind: "global" },
    { m: 3, d: 21, name: "World Poetry Day", kind: "global" },
    { m: 4, d: 2, name: "World Autism Awareness Day", kind: "global" },
    { m: 4, d: 7, name: "World Health Day", kind: "global" },
    { m: 4, d: 22, name: "Earth Day", kind: "global" },
    { m: 4, d: 23, name: "World Book Day", kind: "global" },
    { m: 5, d: 1, name: "International Workers’ Day", kind: "global" },
    { m: 5, d: 15, name: "International Day of Families", kind: "global" },
    { m: 6, d: 1, name: "International Children’s Day", kind: "global" },
    { m: 6, d: 5, name: "World Environment Day", kind: "global" },
    { m: 6, d: 21, name: "International Day of Yoga / solstice activities", kind: "global" },
    { m: 8, d: 12, name: "International Youth Day", kind: "global" },
    { m: 9, d: 8, name: "International Literacy Day", kind: "global" },
    { m: 9, d: 10, name: "World Suicide Prevention Day (wellbeing focus)", kind: "global" },
    { m: 9, d: 21, name: "International Day of Peace", kind: "global" },
    { m: 10, d: 5, name: "World Teachers’ Day", kind: "global" },
    { m: 10, d: 16, name: "World Food Day", kind: "global" },
    { m: 11, d: 11, name: "International Day of Science for Peace", kind: "global" },
    { m: 11, d: 20, name: "World Children’s Day (UN)", kind: "global" },
    { m: 12, d: 3, name: "International Day of Persons with Disabilities", kind: "global" },
    { m: 12, d: 10, name: "Human Rights Day", kind: "global" },
  ];

  /**
   * Approximate China school break windows (nationwide pattern; provinces vary).
   * Inclusive start/end as YYYY-MM-DD.
   */
  const SCHOOL_BREAKS = [
    // 2025
    { start: "2025-01-15", end: "2025-02-22", name: "Winter holiday window (approx.)", kind: "school" },
    { start: "2025-07-05", end: "2025-08-31", name: "Summer holiday window (approx.)", kind: "school" },
    // 2026
    { start: "2026-01-15", end: "2026-02-28", name: "Winter holiday window (approx.)", kind: "school" },
    { start: "2026-07-05", end: "2026-08-31", name: "Summer holiday window (approx.)", kind: "school" },
    // 2027
    { start: "2027-01-15", end: "2027-02-28", name: "Winter holiday window (approx.)", kind: "school" },
    { start: "2027-07-05", end: "2027-08-31", name: "Summer holiday window (approx.)", kind: "school" },
  ];

  /** Fallback China public holidays if API fails (common fixed / known 2025–2027) */
  const CN_FALLBACK = [
    // 2025
    { date: "2025-01-01", name: "New Year’s Day (China)", kind: "cn" },
    { date: "2025-01-28", name: "Spring Festival (eve / start window)", kind: "cn" },
    { date: "2025-01-29", name: "Spring Festival", kind: "cn" },
    { date: "2025-01-30", name: "Spring Festival holiday", kind: "cn" },
    { date: "2025-01-31", name: "Spring Festival holiday", kind: "cn" },
    { date: "2025-02-01", name: "Spring Festival holiday", kind: "cn" },
    { date: "2025-02-02", name: "Spring Festival holiday", kind: "cn" },
    { date: "2025-02-03", name: "Spring Festival holiday", kind: "cn" },
    { date: "2025-02-04", name: "Spring Festival holiday", kind: "cn" },
    { date: "2025-04-04", name: "Qingming Festival", kind: "cn" },
    { date: "2025-04-05", name: "Qingming holiday", kind: "cn" },
    { date: "2025-04-06", name: "Qingming holiday", kind: "cn" },
    { date: "2025-05-01", name: "Labour Day (China)", kind: "cn" },
    { date: "2025-05-02", name: "Labour Day holiday", kind: "cn" },
    { date: "2025-05-03", name: "Labour Day holiday", kind: "cn" },
    { date: "2025-05-04", name: "Labour Day holiday", kind: "cn" },
    { date: "2025-05-05", name: "Labour Day holiday", kind: "cn" },
    { date: "2025-05-31", name: "Dragon Boat Festival", kind: "cn" },
    { date: "2025-06-01", name: "Dragon Boat / Children’s Day window", kind: "cn" },
    { date: "2025-06-02", name: "Dragon Boat holiday", kind: "cn" },
    { date: "2025-10-01", name: "National Day (China)", kind: "cn" },
    { date: "2025-10-02", name: "National Day Golden Week", kind: "cn" },
    { date: "2025-10-03", name: "National Day Golden Week", kind: "cn" },
    { date: "2025-10-04", name: "National Day Golden Week", kind: "cn" },
    { date: "2025-10-05", name: "National Day Golden Week", kind: "cn" },
    { date: "2025-10-06", name: "National Day Golden Week", kind: "cn" },
    { date: "2025-10-07", name: "National Day Golden Week", kind: "cn" },
    { date: "2025-10-08", name: "National Day Golden Week", kind: "cn" },
    // 2026 (approximate festival dates; live API preferred)
    { date: "2026-01-01", name: "New Year’s Day (China)", kind: "cn" },
    { date: "2026-02-16", name: "Spring Festival window (approx.)", kind: "cn" },
    { date: "2026-02-17", name: "Spring Festival (approx.)", kind: "cn" },
    { date: "2026-04-05", name: "Qingming Festival (approx.)", kind: "cn" },
    { date: "2026-05-01", name: "Labour Day (China)", kind: "cn" },
    { date: "2026-06-19", name: "Dragon Boat Festival (approx.)", kind: "cn" },
    { date: "2026-09-25", name: "Mid-Autumn Festival (approx.)", kind: "cn" },
    { date: "2026-10-01", name: "National Day (China)", kind: "cn" },
    { date: "2026-10-02", name: "National Day Golden Week", kind: "cn" },
    { date: "2026-10-03", name: "National Day Golden Week", kind: "cn" },
    { date: "2026-10-04", name: "National Day Golden Week", kind: "cn" },
    { date: "2026-10-05", name: "National Day Golden Week", kind: "cn" },
    { date: "2026-10-06", name: "National Day Golden Week", kind: "cn" },
    { date: "2026-10-07", name: "National Day Golden Week", kind: "cn" },
  ];

  const state = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(), // 0-based
    liveCn: [], // {date, name, kind}
    liveStatus: "loading", // loading | live | fallback
  };

  function pad(n) {
    return String(n).padStart(2, "0");
  }
  function ymd(y, m0, d) {
    return `${y}-${pad(m0 + 1)}-${pad(d)}`;
  }
  function parseYmd(s) {
    const [y, m, d] = s.split("-").map(Number);
    return { y, m0: m - 1, d };
  }
  function inRange(dateStr, start, end) {
    return dateStr >= start && dateStr <= end;
  }

  async function loadLiveHolidays(year) {
    const years = [year - 1, year, year + 1];
    const results = [];
    let anyOk = false;
    for (const y of years) {
      try {
        const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${y}/CN`, {
          mode: "cors",
          cache: "default",
        });
        if (!res.ok) continue;
        const data = await res.json();
        anyOk = true;
        for (const h of data) {
          results.push({
            date: h.date,
            name: h.localName && h.localName !== h.name
              ? `${h.localName} / ${h.name}`
              : (h.name || h.localName || "China public holiday"),
            kind: "cn",
          });
        }
      } catch (_) {
        /* offline or blocked */
      }
    }
    if (anyOk) {
      state.liveCn = results;
      state.liveStatus = "live";
    } else {
      state.liveCn = CN_FALLBACK.slice();
      state.liveStatus = "fallback";
    }
  }

  function eventsForMonth(year, month0) {
    const events = [];
    const daysInMonth = new Date(year, month0 + 1, 0).getDate();

    // Global annual
    for (const g of GLOBAL_ANNUAL) {
      if (g.m === month0 + 1) {
        events.push({
          date: ymd(year, month0, g.d),
          name: g.name,
          kind: "global",
        });
      }
    }

    // China public (live or fallback)
    for (const h of state.liveCn) {
      const p = parseYmd(h.date);
      if (p.y === year && p.m0 === month0) {
        events.push({ date: h.date, name: h.name, kind: "cn" });
      }
    }

    // School breaks — list start, end, and mid markers if they overlap month
    for (const b of SCHOOL_BREAKS) {
      const start = parseYmd(b.start);
      const end = parseYmd(b.end);
      for (let d = 1; d <= daysInMonth; d++) {
        const ds = ymd(year, month0, d);
        if (inRange(ds, b.start, b.end)) {
          // Only add one list entry for the break (start if in month, else first day of month)
          if (ds === b.start || (d === 1 && inRange(ds, b.start, b.end))) {
            const label =
              ds === b.start
                ? `${b.name} begins`
                : `${b.name} (ongoing)`;
            events.push({ date: ds, name: label, kind: "school" });
          }
          if (ds === b.end) {
            events.push({ date: ds, name: `${b.name} ends`, kind: "school" });
          }
        }
      }
    }

    // Dedupe by date+name
    const seen = new Set();
    const unique = [];
    for (const e of events) {
      const k = e.date + "|" + e.name;
      if (seen.has(k)) continue;
      seen.add(k);
      unique.push(e);
    }
    unique.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
    return unique;
  }

  function kindsOnDate(events, dateStr) {
    const kinds = new Set();
    for (const e of events) {
      // school breaks mark every day in range for dots
      if (e.kind === "school") {
        // only the list events are start/end — expand for dots via SCHOOL_BREAKS
      } else if (e.date === dateStr) {
        kinds.add(e.kind);
      }
    }
    for (const b of SCHOOL_BREAKS) {
      if (inRange(dateStr, b.start, b.end)) kinds.add("school");
    }
    for (const e of events) {
      if (e.date === dateStr) kinds.add(e.kind);
    }
    return kinds;
  }

  function render() {
    const title = document.getElementById("cal-title");
    const grid = document.getElementById("cal-grid");
    const list = document.getElementById("cal-event-list");
    const note = document.getElementById("cal-note");
    if (!title || !grid || !list) return;

    const { year, month } = state;
    title.textContent = `${MONTHS[month]} ${year}`;

    const events = eventsForMonth(year, month);
    const today = new Date();
    const todayStr = ymd(today.getFullYear(), today.getMonth(), today.getDate());

    // Monday-first calendar
    const first = new Date(year, month, 1);
    let startPad = first.getDay() - 1; // Mon=0
    if (startPad < 0) startPad = 6;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDays = new Date(year, month, 0).getDate();

    grid.innerHTML = "";
    const totalCells = 42;
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = "cal-day";
      let y = year;
      let m0 = month;
      let d;
      if (i < startPad) {
        d = prevDays - startPad + i + 1;
        m0 = month - 1;
        if (m0 < 0) {
          m0 = 11;
          y = year - 1;
        }
        cell.classList.add("muted");
      } else if (i >= startPad + daysInMonth) {
        d = i - startPad - daysInMonth + 1;
        m0 = month + 1;
        if (m0 > 11) {
          m0 = 0;
          y = year + 1;
        }
        cell.classList.add("muted");
      } else {
        d = i - startPad + 1;
      }
      const ds = ymd(y, m0, d);
      cell.textContent = String(d);
      if (ds === todayStr) cell.classList.add("today");

      const kinds = kindsOnDate(events, ds);
      // also school for any day in break even if muted month edge
      for (const b of SCHOOL_BREAKS) {
        if (inRange(ds, b.start, b.end)) kinds.add("school");
      }
      if (kinds.size) {
        cell.classList.add("has-event");
        const marks = document.createElement("span");
        marks.className = "marks";
        ["cn", "school", "global"].forEach((k) => {
          if (kinds.has(k)) {
            const iEl = document.createElement("i");
            iEl.className = k;
            marks.appendChild(iEl);
          }
        });
        cell.appendChild(marks);
      }
      grid.appendChild(cell);
    }

    list.innerHTML = "";
    if (!events.length) {
      const empty = document.createElement("li");
      empty.className = "empty";
      empty.textContent = "No listed dates this month.";
      list.appendChild(empty);
    } else {
      for (const e of events) {
        const li = document.createElement("li");
        const dayNum = e.date.slice(8);
        li.innerHTML =
          `<span class="when">${dayNum}</span>` +
          `<span class="what">${escapeHtml(e.name)}` +
          `<br><span class="tag ${e.kind}">${e.kind === "cn" ? "China" : e.kind === "school" ? "School" : "Global"}</span></span>`;
        list.appendChild(li);
      }
    }

    if (note) {
      if (state.liveStatus === "live") {
        note.textContent =
          "China public holidays loaded live (Nager.Date). School breaks are approximate nationwide windows — check your local calendar.";
      } else if (state.liveStatus === "fallback") {
        note.textContent =
          "Using offline holiday list (live feed unavailable). School breaks are approximate nationwide windows.";
      } else {
        note.textContent = "Loading holiday data…";
      }
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function bind() {
    const prev = document.getElementById("cal-prev");
    const next = document.getElementById("cal-next");
    if (!prev || !next) return false;
    prev.addEventListener("click", () => {
      state.month -= 1;
      if (state.month < 0) {
        state.month = 11;
        state.year -= 1;
        loadLiveHolidays(state.year).then(render);
      } else {
        render();
      }
    });
    next.addEventListener("click", () => {
      state.month += 1;
      if (state.month > 11) {
        state.month = 0;
        state.year += 1;
        loadLiveHolidays(state.year).then(render);
      } else {
        render();
      }
    });
    return true;
  }

  function init() {
    if (!document.getElementById("calendar-widget")) return;
    if (!bind()) return;
    render();
    loadLiveHolidays(state.year).then(render);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
