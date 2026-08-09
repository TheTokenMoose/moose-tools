#!/usr/bin/env python3
"""
Partner Picker
Classroom group maker with fruit-themed tables and drag-and-drop fixes.

Workflow:
  1. Paste comma-separated student names (same rules as Name Spin Wheel).
  2. Choose how many tables/groups (2–20).
  3. Auto-assign names evenly across fruit-coloured tables.
  4. Drag chips to fix pairs or balance groups.
  5. Save / load layouts by class name (local JSON file).

Python 3.10+ · standard library only · Tkinter
"""

from __future__ import annotations

import json
import math
import random
import tkinter as tk
from pathlib import Path
from tkinter import messagebox, simpledialog


# ---------------------------------------------------------------------------
# Names
# ---------------------------------------------------------------------------

def parse_names(text: str) -> list[str]:
    parts = [p.strip() for p in text.split(",")]
    return [p for p in parts if p]


# ---------------------------------------------------------------------------
# Fruit themes (max 20 groups)
# ---------------------------------------------------------------------------

FRUITS = [
    ("Apple", "#E63946"),
    ("Orange", "#F4A261"),
    ("Banana", "#E9C46A"),
    ("Lime", "#A7C957"),
    ("Blueberry", "#457B9D"),
    ("Grape", "#9B5DE5"),
    ("Strawberry", "#F15BB5"),
    ("Watermelon", "#2A9D8F"),
    ("Peach", "#FFADB8"),
    ("Mango", "#FF9F1C"),
    ("Cherry", "#D62828"),
    ("Kiwi", "#80B918"),
    ("Pineapple", "#F6C90E"),
    ("Coconut", "#D4A373"),
    ("Plum", "#7B2D8E"),
    ("Lemon", "#FEE440"),
    ("Raspberry", "#C9184A"),
    ("Pear", "#90BE6D"),
    ("Melon", "#48CAE4"),
    ("Fig", "#6D597A"),
]

CHIP_W = 100
CHIP_H = 36
PAD = 12


def save_path() -> Path:
    return Path.home() / ".partner_picker_layouts.json"


# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------

class PartnerPicker:
    BG = "#12182a"
    PANEL = "#1c2540"
    CARD = "#2a3555"
    WHITE = "#F7FAFF"
    MUTED = "#A8B4D0"
    GOLD = "#FFD166"
    ACCENT = "#4CC9F0"

    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Partner Picker")
        self.root.geometry("1180x780")
        self.root.minsize(960, 640)
        self.root.configure(bg=self.BG)

        self.names: list[str] = []
        self.group_count = 4
        # groups[i] = list of student name strings
        self.groups: list[list[str]] = []
        # canvas chip items: id -> {name, group, text_id, rect_id}
        self.chips: dict[int, dict] = {}
        self.drag = None  # {chip_id, ox, oy}
        self.class_name = "My Class"
        self.layouts: dict = self._load_file()

        self._build_ui()
        self.root.bind("<Configure>", lambda e: None)

    # ---- persistence ----

    def _load_file(self) -> dict:
        p = save_path()
        if p.is_file():
            try:
                return json.loads(p.read_text(encoding="utf-8"))
            except Exception:
                return {}
        return {}

    def _write_file(self):
        try:
            save_path().write_text(
                json.dumps(self.layouts, indent=2, ensure_ascii=False),
                encoding="utf-8",
            )
        except Exception as e:
            messagebox.showerror("Partner Picker", f"Could not save:\n{e}")

    # ---- UI ----

    def _build_ui(self):
        top = tk.Frame(self.root, bg=self.BG)
        top.pack(fill="x", padx=18, pady=(14, 6))

        tk.Label(
            top, text="🍐  PARTNER PICKER",
            font=("Segoe UI", 22, "bold"), fg=self.GOLD, bg=self.BG,
        ).pack(side="left")

        tk.Label(
            top, text="Auto groups → drag to fix → save by class",
            font=("Segoe UI", 11), fg=self.MUTED, bg=self.BG,
        ).pack(side="left", padx=16)

        # Controls
        panel = tk.Frame(self.root, bg=self.PANEL, padx=14, pady=12)
        panel.pack(fill="x", padx=18, pady=6)

        tk.Label(
            panel, text="Student names (comma-separated)",
            font=("Segoe UI", 11, "bold"), fg=self.WHITE, bg=self.PANEL,
        ).pack(anchor="w")

        self.name_box = tk.Text(
            panel, height=3, font=("Segoe UI", 12),
            bg="#0e1424", fg=self.WHITE, insertbackground=self.WHITE,
            relief="flat", wrap="word",
        )
        self.name_box.pack(fill="x", pady=(4, 8))
        self.name_box.insert(
            "1.0",
            "Jayden, Harry, John B, Mia, Lucas, Ava, Noah, Sophia, "
            "Ethan, Isla, Leo, Zoe, Mason, Ella",
        )

        row = tk.Frame(panel, bg=self.PANEL)
        row.pack(fill="x")

        tk.Label(row, text="Tables / groups:", font=("Segoe UI", 11),
                 fg=self.MUTED, bg=self.PANEL).pack(side="left")
        self.group_var = tk.StringVar(value="4")
        spin = tk.Spinbox(
            row, from_=2, to=20, textvariable=self.group_var, width=4,
            font=("Segoe UI", 12), bg="#0e1424", fg=self.WHITE,
            buttonbackground=self.CARD, relief="flat",
        )
        spin.pack(side="left", padx=8)

        tk.Button(
            row, text="Auto-assign", command=self.auto_assign,
            bg=self.ACCENT, fg="#0e1424", font=("Segoe UI", 11, "bold"),
            relief="flat", cursor="hand2", padx=14, pady=5,
        ).pack(side="left", padx=6)

        tk.Button(
            row, text="Shuffle again", command=self.auto_assign,
            bg=self.CARD, fg=self.WHITE, font=("Segoe UI", 11),
            relief="flat", cursor="hand2", padx=12, pady=5,
        ).pack(side="left", padx=4)

        tk.Label(row, text="  Class:", font=("Segoe UI", 11),
                 fg=self.MUTED, bg=self.PANEL).pack(side="left")
        self.class_entry = tk.Entry(
            row, font=("Segoe UI", 11), width=16,
            bg="#0e1424", fg=self.WHITE, insertbackground=self.WHITE, relief="flat",
        )
        self.class_entry.pack(side="left", padx=4)
        self.class_entry.insert(0, self.class_name)

        tk.Button(
            row, text="Save layout", command=self.save_layout,
            bg="#63D297", fg="#0e1424", font=("Segoe UI", 11, "bold"),
            relief="flat", cursor="hand2", padx=12, pady=5,
        ).pack(side="left", padx=6)

        tk.Button(
            row, text="Load layout", command=self.load_layout,
            bg=self.CARD, fg=self.WHITE, font=("Segoe UI", 11),
            relief="flat", cursor="hand2", padx=12, pady=5,
        ).pack(side="left", padx=4)

        tk.Button(
            row, text="Print view", command=self.print_view,
            bg=self.CARD, fg=self.WHITE, font=("Segoe UI", 11),
            relief="flat", cursor="hand2", padx=12, pady=5,
        ).pack(side="left", padx=4)

        # Canvas area
        wrap = tk.Frame(self.root, bg=self.BG)
        wrap.pack(fill="both", expand=True, padx=18, pady=(4, 14))

        self.canvas = tk.Canvas(wrap, bg="#0e1424", highlightthickness=0)
        self.canvas.pack(fill="both", expand=True)
        self.canvas.bind("<ButtonPress-1>", self.on_press)
        self.canvas.bind("<B1-Motion>", self.on_drag)
        self.canvas.bind("<ButtonRelease-1>", self.on_release)
        self.canvas.bind("<Configure>", lambda e: self.redraw())

        self.status = tk.StringVar(value="Enter names, set group count, then Auto-assign.")
        tk.Label(
            self.root, textvariable=self.status,
            font=("Segoe UI", 10), fg=self.MUTED, bg=self.BG, anchor="w",
        ).pack(fill="x", padx=18, pady=(0, 10))

    # ---- grouping ----

    def auto_assign(self):
        text = self.name_box.get("1.0", "end")
        names = parse_names(text)
        if len(names) < 2:
            messagebox.showinfo("Partner Picker", "Enter at least two names.")
            return
        try:
            g = int(self.group_var.get())
        except ValueError:
            g = 4
        g = max(2, min(20, g))
        self.group_var.set(str(g))
        self.group_count = g
        self.names = names

        shuffled = names[:]
        random.shuffle(shuffled)
        self.groups = [[] for _ in range(g)]
        for i, name in enumerate(shuffled):
            self.groups[i % g].append(name)

        self.status.set(
            f"{len(names)} students → {g} fruit tables. Drag chips to fix groups."
        )
        self.redraw()

    # ---- layout geometry ----

    def _table_rects(self) -> list[tuple[int, int, int, int]]:
        """Return list of (x1,y1,x2,y2) for each group table region."""
        w = max(self.canvas.winfo_width(), 400)
        h = max(self.canvas.winfo_height(), 300)
        g = max(len(self.groups), 1)
        cols = math.ceil(math.sqrt(g))
        rows = math.ceil(g / cols)
        tw = (w - PAD * (cols + 1)) // cols
        th = (h - PAD * (rows + 1)) // rows
        rects = []
        for i in range(g):
            c = i % cols
            r = i // cols
            x1 = PAD + c * (tw + PAD)
            y1 = PAD + r * (th + PAD)
            rects.append((x1, y1, x1 + tw, y1 + th))
        return rects

    def redraw(self):
        c = self.canvas
        c.delete("all")
        self.chips.clear()
        if not self.groups:
            c.create_text(
                max(c.winfo_width(), 200) // 2,
                max(c.winfo_height(), 200) // 2,
                text="Auto-assign to see fruit tables",
                fill=self.MUTED, font=("Segoe UI", 16),
            )
            return

        rects = self._table_rects()
        for i, members in enumerate(self.groups):
            fruit, color = FRUITS[i % len(FRUITS)]
            x1, y1, x2, y2 = rects[i]
            # Table background
            c.create_rectangle(x1, y1, x2, y2, fill=color, outline="#0e1424", width=3)
            c.create_rectangle(x1 + 4, y1 + 4, x2 - 4, y2 - 4, outline="#ffffff", width=1)
            header = f"{fruit} table · {len(members)}"
            c.create_text(
                x1 + 10, y1 + 16, text=header, anchor="w",
                fill="#111", font=("Segoe UI", 12, "bold"),
            )
            # Chips stacked in table
            cx = x1 + 12
            cy = y1 + 40
            max_x = x2 - CHIP_W - 8
            for name in members:
                if cx > max_x:
                    cx = x1 + 12
                    cy += CHIP_H + 8
                if cy + CHIP_H > y2 - 8:
                    # overflow: still place, slightly tighter
                    pass
                self._make_chip(name, i, cx, cy)
                cx += CHIP_W + 8

    def _make_chip(self, name: str, group: int, x: int, y: int):
        c = self.canvas
        rect = c.create_rectangle(
            x, y, x + CHIP_W, y + CHIP_H,
            fill="#0e1424", outline="#ffffff", width=2, tags=("chip",),
        )
        label = name if len(name) <= 12 else name[:11] + "…"
        text = c.create_text(
            x + CHIP_W / 2, y + CHIP_H / 2,
            text=label, fill=self.WHITE,
            font=("Segoe UI", 10, "bold"), tags=("chip",),
        )
        # Use rect id as key; bind both to same chip
        self.chips[rect] = {
            "name": name,
            "group": group,
            "rect": rect,
            "text": text,
        }
        # Map text id → same chip via tags / find
        c.tag_bind(rect, "<ButtonPress-1>", lambda e, r=rect: None)
        c.tag_bind(text, "<ButtonPress-1>", lambda e, r=rect: None)

    def _chip_at(self, x, y) -> int | None:
        items = self.canvas.find_overlapping(x - 1, y - 1, x + 1, y + 1)
        for item in reversed(items):
            if item in self.chips:
                return item
            # text item: find matching chip by coords
            for rid, info in self.chips.items():
                if info["text"] == item:
                    return rid
        return None

    def on_press(self, event):
        rid = self._chip_at(event.x, event.y)
        if rid is None:
            self.drag = None
            return
        info = self.chips[rid]
        self.canvas.tag_raise(info["rect"])
        self.canvas.tag_raise(info["text"])
        self.drag = {
            "rid": rid,
            "ox": event.x,
            "oy": event.y,
        }

    def on_drag(self, event):
        if not self.drag:
            return
        rid = self.drag["rid"]
        info = self.chips.get(rid)
        if not info:
            return
        dx = event.x - self.drag["ox"]
        dy = event.y - self.drag["oy"]
        self.canvas.move(info["rect"], dx, dy)
        self.canvas.move(info["text"], dx, dy)
        self.drag["ox"] = event.x
        self.drag["oy"] = event.y

    def on_release(self, event):
        if not self.drag:
            return
        rid = self.drag["rid"]
        self.drag = None
        info = self.chips.get(rid)
        if not info:
            return
        # Find which table the chip centre is over
        bbox = self.canvas.bbox(info["rect"])
        if not bbox:
            self.redraw()
            return
        mx = (bbox[0] + bbox[2]) / 2
        my = (bbox[1] + bbox[3]) / 2
        rects = self._table_rects()
        target = info["group"]
        for i, (x1, y1, x2, y2) in enumerate(rects):
            if x1 <= mx <= x2 and y1 <= my <= y2:
                target = i
                break

        # Move name between group lists
        name = info["name"]
        old = info["group"]
        if name in self.groups[old]:
            self.groups[old].remove(name)
        if name not in self.groups[target]:
            self.groups[target].append(name)
        self.status.set(f"Moved {name} → {FRUITS[target][0]} table")
        self.redraw()

    # ---- save / load ----

    def save_layout(self):
        if not self.groups:
            messagebox.showinfo("Partner Picker", "Nothing to save yet — auto-assign first.")
            return
        name = self.class_entry.get().strip() or "My Class"
        self.class_name = name
        self.layouts[name] = {
            "group_count": self.group_count,
            "groups": self.groups,
            "names_text": self.name_box.get("1.0", "end").strip(),
        }
        self._write_file()
        self.status.set(f"Saved layout “{name}”")
        messagebox.showinfo("Partner Picker", f"Saved “{name}”.")

    def load_layout(self):
        if not self.layouts:
            messagebox.showinfo("Partner Picker", "No saved layouts yet.")
            return
        keys = sorted(self.layouts.keys())
        choice = simpledialog.askstring(
            "Load layout",
            "Class name to load:\n" + ", ".join(keys),
            initialvalue=keys[0],
            parent=self.root,
        )
        if not choice or choice not in self.layouts:
            return
        data = self.layouts[choice]
        self.class_entry.delete(0, "end")
        self.class_entry.insert(0, choice)
        self.group_count = int(data.get("group_count", 4))
        self.group_var.set(str(self.group_count))
        self.groups = [list(g) for g in data.get("groups", [])]
        text = data.get("names_text", "")
        if text:
            self.name_box.delete("1.0", "end")
            self.name_box.insert("1.0", text)
        self.status.set(f"Loaded “{choice}”")
        self.redraw()

    # ---- print-friendly window ----

    def print_view(self):
        if not self.groups:
            messagebox.showinfo("Partner Picker", "Auto-assign first.")
            return
        win = tk.Toplevel(self.root)
        win.title(f"Print — {self.class_entry.get().strip() or 'Class'}")
        win.configure(bg="white")
        win.geometry("700x800")

        title = self.class_entry.get().strip() or "Class"
        tk.Label(
            win, text=f"Partner Picker — {title}",
            font=("Segoe UI", 16, "bold"), bg="white", fg="#111",
        ).pack(pady=12)

        body = tk.Frame(win, bg="white")
        body.pack(fill="both", expand=True, padx=20, pady=8)

        for i, members in enumerate(self.groups):
            fruit, color = FRUITS[i % len(FRUITS)]
            box = tk.Frame(body, bg=color, padx=10, pady=8)
            box.pack(fill="x", pady=6)
            tk.Label(
                box, text=f"{fruit} table ({len(members)})",
                font=("Segoe UI", 12, "bold"), bg=color, fg="#111",
            ).pack(anchor="w")
            names = ", ".join(members) if members else "— empty —"
            tk.Label(
                box, text=names, font=("Segoe UI", 11),
                bg=color, fg="#111", wraplength=620, justify="left",
            ).pack(anchor="w")

        tk.Label(
            win,
            text="File → Print this window (or screenshot). Layouts also save on this computer.",
            font=("Segoe UI", 9), bg="white", fg="#555",
        ).pack(pady=10)

        tk.Button(
            win, text="Close", command=win.destroy,
            font=("Segoe UI", 11), padx=16, pady=4,
        ).pack(pady=8)

    def run(self):
        self.root.mainloop()


if __name__ == "__main__":
    PartnerPicker().run()
