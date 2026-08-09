#!/usr/bin/env python3
"""
Name Spin Wheel
Classroom random-name spinner with a circus-themed wheel.

Modes:
  1) Standard  — spin and choose (names stay on the wheel)
  2) Remove    — spin and remove (each student gets a turn eventually)

Names:
  Paste or type a comma-separated list.
  "Jayden, Harry, John B" → three names (spaces inside a name are kept;
  spaces after commas are ignored).

Python 3.10+ · standard library only · Windows-friendly (Tkinter + winsound)
"""

from __future__ import annotations

import math
import os
import random
import struct
import tempfile
import threading
import wave
import tkinter as tk
from tkinter import messagebox


def parse_names(text: str) -> list[str]:
    parts = [p.strip() for p in text.split(",")]
    return [p for p in parts if p]


class CircusMusic:
    """Looping calliope-style tune. SND_ASYNC|SND_LOOP so mute stops immediately."""

    def __init__(self):
        self.enabled = True
        self._path: str | None = None
        self._playing = False
        self._lock = threading.Lock()
        self._build_wav()

    def _build_wav(self):
        rate = 22050
        bpm = 140
        beat = 60.0 / bpm
        melody = [
            (523.25, 0.5), (659.25, 0.5), (783.99, 0.5), (1046.50, 0.5),
            (783.99, 0.5), (659.25, 0.5), (523.25, 1.0),
            (587.33, 0.5), (698.46, 0.5), (880.00, 0.5), (1174.66, 0.5),
            (880.00, 0.5), (698.46, 0.5), (587.33, 1.0),
            (523.25, 0.5), (659.25, 0.5), (783.99, 0.5), (659.25, 0.5),
            (523.25, 0.5), (392.00, 0.5), (523.25, 1.0),
        ]
        samples: list[float] = []
        for freq, beats in melody:
            n = int(rate * beat * beats)
            for i in range(n):
                t = i / rate
                sq = 0.18 if math.sin(2 * math.pi * freq * t) >= 0 else -0.18
                tri = 0.12 * (2 * abs(2 * ((freq * t) % 1) - 1) - 1)
                env = min(1.0, i / (rate * 0.02)) * min(1.0, (n - i) / (rate * 0.04))
                samples.append((sq + tri) * env)

        total = len(samples)
        bass = [
            0.08 * math.sin(
                2 * math.pi * (130.81 if ((i / rate) / beat) % 4 < 2 else 174.61) * (i / rate)
            )
            for i in range(total)
        ]
        mixed = [max(-1.0, min(1.0, samples[i] + bass[i])) for i in range(total)]

        fd, path = tempfile.mkstemp(suffix=".wav")
        os.close(fd)
        with wave.open(path, "w") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(rate)
            w.writeframes(b"".join(struct.pack("<h", int(s * 30000)) for s in mixed))
        self._path = path

    def set_enabled(self, on: bool):
        self.enabled = bool(on)
        if not self.enabled:
            self.stop()
        else:
            self.start()

    def start(self):
        if not self.enabled or not self._path:
            return
        with self._lock:
            if self._playing:
                return
            self._playing = True
        try:
            import winsound
            winsound.PlaySound(
                self._path,
                winsound.SND_FILENAME
                | winsound.SND_ASYNC
                | winsound.SND_LOOP
                | winsound.SND_NODEFAULT,
            )
        except Exception:
            with self._lock:
                self._playing = False

    def stop(self):
        with self._lock:
            self._playing = False
        try:
            import winsound
            winsound.PlaySound(None, winsound.SND_PURGE)
        except Exception:
            pass

    def cleanup(self):
        self.stop()
        if self._path and os.path.isfile(self._path):
            try:
                os.remove(self._path)
            except Exception:
                pass


WHEEL_COLORS = [
    "#E63946", "#F4A261", "#E9C46A", "#2A9D8F", "#457B9D",
    "#9B5DE5", "#F15BB5", "#00BBF9", "#00F5D4", "#FEE440",
    "#FF6B6B", "#4ECDC4", "#FFE66D", "#95E06C", "#A06CD5",
]

# Top of canvas with y-down cos/sin drawing == -pi/2
POINTER_ANGLE = -math.pi / 2


class NameSpinWheel:
    BG = "#1a1033"
    PANEL = "#2a1b4d"
    CARD = "#3d2a6b"
    WHITE = "#F7FAFF"
    MUTED = "#C4B5E0"
    GOLD = "#FFD166"
    PINK = "#FF4ECD"

    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Name Spin Wheel")
        self.root.geometry("1000x720")
        self.root.minsize(860, 620)
        self.root.configure(bg=self.BG)

        self.music = CircusMusic()
        self.names: list[str] = []
        self.mode = tk.StringVar(value="standard")
        self.spinning = False
        self.angle = 0.0
        self.target_angle = 0.0
        self.selected: str | None = None
        self._after_id = None
        self._picked_index = 0

        self._build_ui()
        self.root.protocol("WM_DELETE_WINDOW", self._on_close)
        self.root.after(200, self.music.start)
        self._draw_wheel()

    def _build_ui(self):
        top = tk.Frame(self.root, bg=self.BG)
        top.pack(fill="x", padx=20, pady=(16, 8))

        tk.Label(
            top, text="🎡  NAME SPIN WHEEL",
            font=("Segoe UI", 22, "bold"), fg=self.GOLD, bg=self.BG,
        ).pack(side="left")

        self.mute_btn = tk.Button(
            top, text="🔊 Music", command=self.toggle_mute,
            bg=self.CARD, fg=self.WHITE, activebackground=self.PINK,
            relief="flat", font=("Segoe UI", 11), cursor="hand2", padx=12, pady=4,
        )
        self.mute_btn.pack(side="right")

        panel = tk.Frame(self.root, bg=self.PANEL, padx=16, pady=12)
        panel.pack(fill="x", padx=20, pady=8)

        tk.Label(
            panel, text="Student names (comma-separated)",
            font=("Segoe UI", 11, "bold"), fg=self.WHITE, bg=self.PANEL,
        ).pack(anchor="w")

        self.name_entry = tk.Text(
            panel, height=3, font=("Segoe UI", 12),
            bg="#1a1033", fg=self.WHITE, insertbackground=self.WHITE,
            relief="flat", wrap="word",
        )
        self.name_entry.pack(fill="x", pady=(6, 8))
        self.name_entry.insert("1.0", "Jayden, Harry, John B, Mia, Lucas, Ava, Noah, Sophia")

        row = tk.Frame(panel, bg=self.PANEL)
        row.pack(fill="x")

        tk.Button(
            row, text="Load names onto wheel", command=self.load_names,
            bg=self.PINK, fg=self.WHITE, activebackground="#e03db8",
            relief="flat", font=("Segoe UI", 11, "bold"),
            cursor="hand2", padx=14, pady=6,
        ).pack(side="left")

        tk.Label(row, text="  Mode:", font=("Segoe UI", 11), fg=self.MUTED, bg=self.PANEL).pack(side="left")
        for value, label in (("standard", "Standard (keep names)"), ("remove", "Spin & remove")):
            tk.Radiobutton(
                row, text=label, variable=self.mode, value=value,
                font=("Segoe UI", 11), fg=self.WHITE, bg=self.PANEL,
                selectcolor=self.CARD, activebackground=self.PANEL,
                activeforeground=self.WHITE, highlightthickness=0,
            ).pack(side="left", padx=6)

        main = tk.Frame(self.root, bg=self.BG)
        main.pack(fill="both", expand=True, padx=20, pady=8)

        self.canvas = tk.Canvas(main, width=480, height=480, bg=self.BG, highlightthickness=0)
        self.canvas.pack(side="left", padx=(0, 16))

        side = tk.Frame(main, bg=self.BG)
        side.pack(side="left", fill="both", expand=True)

        self.result_var = tk.StringVar(value="Load names, then spin!")
        tk.Label(
            side, textvariable=self.result_var,
            font=("Segoe UI", 18, "bold"), fg=self.GOLD, bg=self.BG,
            wraplength=320, justify="left",
        ).pack(anchor="w", pady=(40, 12))

        self.count_var = tk.StringVar(value="")
        tk.Label(
            side, textvariable=self.count_var,
            font=("Segoe UI", 12), fg=self.MUTED, bg=self.BG,
        ).pack(anchor="w")

        self.spin_btn = tk.Button(
            side, text="SPIN", command=self.spin,
            bg=self.GOLD, fg="#1a1033", activebackground="#e6bc5c",
            relief="flat", font=("Segoe UI", 20, "bold"),
            cursor="hand2", padx=28, pady=12,
        )
        self.spin_btn.pack(anchor="w", pady=24)

        tk.Button(
            side, text="Reset removed names", command=self.reset_removed,
            bg=self.CARD, fg=self.WHITE, relief="flat",
            font=("Segoe UI", 11), cursor="hand2", padx=12, pady=6,
        ).pack(anchor="w")

        tk.Label(
            side,
            text="Tip: “John B” stays one name.\nComma separates students.",
            font=("Segoe UI", 10), fg=self.MUTED, bg=self.BG, justify="left",
        ).pack(anchor="w", pady=20)

    def load_names(self):
        if self.spinning:
            return
        names = parse_names(self.name_entry.get("1.0", "end"))
        if len(names) < 2:
            messagebox.showinfo("Name Spin Wheel", "Enter at least two names, separated by commas.")
            return
        self.names = names
        self.selected = None
        self.angle = 0.0
        self.result_var.set("Ready — press SPIN!")
        self._update_count()
        self._draw_wheel()

    def reset_removed(self):
        if self.spinning:
            return
        self.load_names()

    def _update_count(self):
        n = len(self.names)
        self.count_var.set(f"{n} name{'s' if n != 1 else ''} on the wheel")

    def toggle_mute(self):
        self.music.set_enabled(not self.music.enabled)
        self.mute_btn.config(text="🔊 Music" if self.music.enabled else "🔇 Muted")

    def _slice_angle(self) -> float:
        n = len(self.names)
        return (2 * math.pi / n) if n else 0.0

    def _index_at_pointer(self) -> int:
        """Name index currently under the top pointer."""
        n = len(self.names)
        if n <= 0:
            return -1
        slice_a = self._slice_angle()
        rel = (POINTER_ANGLE - self.angle) % (2 * math.pi)
        return int(rel / slice_a) % n

    def _angle_for_index(self, index: int) -> float:
        """Wheel angle that centres `index` under the pointer."""
        slice_a = self._slice_angle()
        mid = index * slice_a + slice_a / 2
        return (POINTER_ANGLE - mid) % (2 * math.pi)

    def _draw_wheel(self):
        c = self.canvas
        c.delete("all")
        cx, cy, r = 240, 240, 210

        c.create_oval(cx - r - 8, cy - r - 8, cx + r + 8, cy + r + 8, fill="#5a3d9a", outline="")
        c.create_oval(cx - r, cy - r, cx + r, cy + r, fill="#1a1033", outline="")

        n = len(self.names)
        if n == 0:
            c.create_text(cx, cy, text="No names yet", fill=self.MUTED, font=("Segoe UI", 16))
            c.create_polygon(cx - 14, 18, cx + 14, 18, cx, 48, fill=self.GOLD, outline="")
            return

        slice_a = self._slice_angle()
        for i, name in enumerate(self.names):
            a0 = self.angle + i * slice_a
            a1 = a0 + slice_a
            self._slice(cx, cy, r, a0, a1, WHEEL_COLORS[i % len(WHEEL_COLORS)])
            mid = a0 + slice_a / 2
            lx = cx + math.cos(mid) * (r * 0.62)
            ly = cy + math.sin(mid) * (r * 0.62)
            display = name if len(name) <= 12 else name[:11] + "…"
            c.create_text(
                lx, ly, text=display, fill="#111",
                font=("Segoe UI", 11, "bold"), angle=-math.degrees(mid),
            )

        c.create_oval(cx - 28, cy - 28, cx + 28, cy + 28, fill=self.GOLD, outline="#1a1033", width=3)
        c.create_text(cx, cy, text="★", fill="#1a1033", font=("Segoe UI", 16, "bold"))
        c.create_polygon(cx - 16, 12, cx + 16, 12, cx, 52, fill=self.GOLD, outline="#1a1033", width=2)

    def _slice(self, cx, cy, r, a0, a1, color):
        steps = max(8, int(24 * abs(a1 - a0) / (2 * math.pi) * 12))
        pts = [cx, cy]
        for s in range(steps + 1):
            t = a0 + (a1 - a0) * s / steps
            pts.extend([cx + math.cos(t) * r, cy + math.sin(t) * r])
        self.canvas.create_polygon(pts, fill=color, outline="#1a1033", width=2)

    def spin(self):
        if self.spinning:
            return
        if len(self.names) < 1:
            messagebox.showinfo("Name Spin Wheel", "Load at least one name first.")
            return
        if len(self.names) == 1 and self.mode.get() == "remove":
            self.selected = self.names[0]
            self.result_var.set(f"★  {self.selected}  ★\n(last name left)")
            self.names.clear()
            self._update_count()
            self._draw_wheel()
            return

        self.spinning = True
        self.spin_btn.config(state="disabled")
        self.selected = None

        pick = random.randrange(len(self.names))
        self._picked_index = pick

        target_mod = self._angle_for_index(pick)
        current = self.angle % (2 * math.pi)
        delta = (target_mod - current) % (2 * math.pi)
        turns = random.uniform(4.5, 7.5) * 2 * math.pi
        self.target_angle = self.angle + turns + delta
        self._animate_spin()

    def _animate_spin(self):
        remaining = self.target_angle - self.angle
        if remaining <= 0.002:
            self.angle = self.target_angle
            self._draw_wheel()
            self._finish_spin()
            return
        self.angle += max(0.002, remaining * 0.045)
        self._draw_wheel()
        self._after_id = self.root.after(16, self._animate_spin)

    def _finish_spin(self):
        self.spinning = False
        self.spin_btn.config(state="normal")

        # Winner = whoever the pointer actually covers (visual truth)
        idx = self._index_at_pointer()
        if idx < 0 or idx >= len(self.names):
            return
        name = self.names[idx]
        self.selected = name
        self.result_var.set(f"★  {name}  ★")

        if self.mode.get() == "remove":
            self.names.pop(idx)
            self._update_count()
            self.angle = 0.0
            self._draw_wheel()
            if not self.names:
                self.result_var.set(f"★  {name}  ★\nEveryone has had a turn!")
        else:
            self._draw_wheel()

    def _on_close(self):
        if self._after_id:
            try:
                self.root.after_cancel(self._after_id)
            except Exception:
                pass
        self.music.cleanup()
        self.root.destroy()

    def run(self):
        self.root.mainloop()


if __name__ == "__main__":
    NameSpinWheel().run()
