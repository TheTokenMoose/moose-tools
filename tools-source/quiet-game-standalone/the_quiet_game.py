#!/usr/bin/env python3
"""
The Quiet Game — standalone classroom noise timer
Stay quiet or the gorilla steals the banana.

Windows USB / offline use:
  pip install sounddevice numpy
  python the_quiet_game.py

Build a single .exe (on a Windows PC):
  pip install sounddevice numpy pyinstaller
  pyinstaller --onefile --windowed --name "TheQuietGame" the_quiet_game.py

Requires: Python 3.10+, sounddevice, numpy, Tkinter (included with most Python installs)
"""

from __future__ import annotations

import math
import queue
import threading
import tkinter as tk
from tkinter import messagebox

# Optional mic backend
HAS_MIC = False
try:
    import numpy as np
    import sounddevice as sd
    HAS_MIC = True
except Exception:
    np = None
    sd = None


def format_time(sec: float) -> str:
    s = max(0, int(math.ceil(sec)))
    return f"{s // 60}:{s % 60:02d}"


class NoiseMeter:
    """Background mic RMS → smoothed 0..1 level."""

    def __init__(self):
        self.level = 0.0
        self.sensitivity = 0.4
        self._stream = None
        self._lock = threading.Lock()
        self._running = False

    def set_sensitivity(self, percent: int):
        self.sensitivity = max(0.05, min(1.0, percent / 100.0))

    def start(self):
        if not HAS_MIC:
            raise RuntimeError(
                "Microphone library missing.\n\n"
                "Install with:\n  pip install sounddevice numpy\n\n"
                "Then run this app again."
            )
        if self._running:
            return
        self._running = True

        def callback(indata, frames, time_info, status):
            if not self._running:
                return
            # mono RMS
            mono = indata[:, 0] if indata.ndim > 1 else indata
            rms = float(np.sqrt(np.mean(np.square(mono)) + 1e-12))
            raw = min(1.0, rms * 8.0)
            scaled = (raw ** (1.1 - self.sensitivity * 0.6)) * (0.5 + self.sensitivity)
            scaled = max(0.0, min(1.0, scaled))
            with self._lock:
                self.level = self.level * 0.65 + scaled * 0.35

        self._stream = sd.InputStream(
            channels=1,
            samplerate=16000,
            blocksize=1024,
            callback=callback,
        )
        self._stream.start()

    def stop(self):
        self._running = False
        if self._stream is not None:
            try:
                self._stream.stop()
                self._stream.close()
            except Exception:
                pass
            self._stream = None
        with self._lock:
            self.level = 0.0

    def sample(self) -> float:
        with self._lock:
            return self.level


class QuietGameApp:
    BG = "#1a3d2e"
    PANEL = "#0f241c"
    GOLD = "#ffe66d"
    MINT = "#63d297"
    TEXT = "#f4fff8"
    MUTED = "#a8d5c0"

    W, H = 900, 520

    def __init__(self):
        self.root = tk.Tk()
        self.root.title("The Quiet Game")
        self.root.geometry("940x700")
        self.root.minsize(800, 620)
        self.root.configure(bg=self.BG)

        self.meter = NoiseMeter()
        self.state = "menu"  # menu | play | result
        self.duration = 120.0
        self.remaining = 120.0
        self.gorilla_x = 0.18
        self.banana_x = 0.88
        self.lose_at = 0.82
        self.cover_eyes = True
        self.dance = 0.0
        self.leaf = 0.0
        self.won = False
        self._tick = None
        self.last_time = time.time()

        self._build_ui()
        self.root.protocol("WM_DELETE_WINDOW", self._on_close)
        self._show_menu()

    # ── UI ────────────────────────────────────────────────────────────────

    def _build_ui(self):
        top = tk.Frame(self.root, bg=self.BG)
        top.pack(fill="x", padx=16, pady=(12, 4))
        tk.Label(
            top, text="🦍  THE QUIET GAME  🍌",
            font=("Segoe UI", 20, "bold"), fg=self.GOLD, bg=self.BG,
        ).pack(side="left")

        self.frame_menu = tk.Frame(self.root, bg=self.PANEL, padx=20, pady=16)
        self.frame_play = tk.Frame(self.root, bg=self.BG)
        self.frame_result = tk.Frame(self.root, bg=self.PANEL, padx=20, pady=20)

        # Menu controls
        tk.Label(
            self.frame_menu,
            text="Keep the class quiet — or the gorilla steals the banana!",
            font=("Segoe UI", 12), fg=self.MUTED, bg=self.PANEL,
        ).pack(anchor="w", pady=(0, 12))

        row = tk.Frame(self.frame_menu, bg=self.PANEL)
        row.pack(fill="x", pady=4)
        tk.Label(row, text="Quiet time:", font=("Segoe UI", 11, "bold"),
                 fg=self.TEXT, bg=self.PANEL).pack(side="left")
        self.timer_var = tk.StringVar(value="120")
        for sec, label in ((30, "30s"), (60, "1 min"), (120, "2 min"),
                           (180, "3 min"), (300, "5 min")):
            tk.Radiobutton(
                row, text=label, variable=self.timer_var, value=str(sec),
                font=("Segoe UI", 11), fg=self.TEXT, bg=self.PANEL,
                selectcolor="#243b55", activebackground=self.PANEL,
                activeforeground=self.TEXT, highlightthickness=0,
            ).pack(side="left", padx=6)

        sens_row = tk.Frame(self.frame_menu, bg=self.PANEL)
        sens_row.pack(fill="x", pady=10)
        tk.Label(sens_row, text="Mic sensitivity:", font=("Segoe UI", 11, "bold"),
                 fg=self.TEXT, bg=self.PANEL).pack(side="left")
        self.sens_var = tk.IntVar(value=40)
        self.sens_scale = tk.Scale(
            sens_row, from_=1, to=100, orient="horizontal",
            variable=self.sens_var, length=260,
            bg=self.PANEL, fg=self.TEXT, highlightthickness=0,
            troughcolor="#243b55", activebackground=self.MINT,
        )
        self.sens_scale.pack(side="left", padx=10)
        self.sens_label = tk.Label(sens_row, text="Normal", font=("Segoe UI", 10),
                                   fg=self.MUTED, bg=self.PANEL)
        self.sens_label.pack(side="left")
        self.sens_var.trace_add("write", lambda *_: self._update_sens_label())

        tk.Label(
            self.frame_menu,
            text="Uses the microphone on this computer only. Nothing is recorded.",
            font=("Segoe UI", 9), fg=self.MUTED, bg=self.PANEL,
        ).pack(anchor="w", pady=(4, 12))

        tk.Button(
            self.frame_menu, text="Start", command=self.start_game,
            bg=self.MINT, fg="#0b1a14", font=("Segoe UI", 14, "bold"),
            relief="flat", cursor="hand2", padx=28, pady=10,
        ).pack(anchor="w")

        # Play UI
        hud = tk.Frame(self.frame_play, bg=self.PANEL, padx=12, pady=8)
        hud.pack(fill="x", padx=16, pady=(8, 4))
        self.time_var = tk.StringVar(value="2:00")
        self.status_var = tk.StringVar(value="Shhh…")
        tk.Label(hud, text="Time left", font=("Segoe UI", 9), fg=self.MUTED,
                 bg=self.PANEL).grid(row=0, column=0, sticky="w")
        tk.Label(hud, textvariable=self.time_var, font=("Segoe UI", 18, "bold"),
                 fg=self.GOLD, bg=self.PANEL).grid(row=1, column=0, sticky="w")
        tk.Label(hud, text="Noise", font=("Segoe UI", 9), fg=self.MUTED,
                 bg=self.PANEL).grid(row=0, column=1, sticky="w", padx=(24, 0))
        self.noise_canvas = tk.Canvas(hud, width=220, height=16, bg="#0a1a12",
                                      highlightthickness=0)
        self.noise_canvas.grid(row=1, column=1, sticky="w", padx=(24, 0))
        tk.Button(
            hud, text="End", command=self._show_menu,
            bg="#2a3555", fg=self.TEXT, relief="flat", font=("Segoe UI", 10, "bold"),
            padx=12, pady=4, cursor="hand2",
        ).grid(row=0, column=2, rowspan=2, padx=(24, 0))

        self.canvas = tk.Canvas(
            self.frame_play, width=self.W, height=self.H,
            bg="#87ceeb", highlightthickness=0,
        )
        self.canvas.pack(padx=16, pady=8)
        tk.Label(
            self.frame_play, textvariable=self.status_var,
            font=("Segoe UI", 12, "bold"), fg=self.MUTED, bg=self.BG,
        ).pack(pady=(0, 8))

        # Result
        self.result_title = tk.StringVar(value="")
        self.result_msg = tk.StringVar(value="")
        tk.Label(
            self.frame_result, textvariable=self.result_title,
            font=("Segoe UI", 22, "bold"), fg=self.GOLD, bg=self.PANEL,
        ).pack(pady=(8, 8))
        tk.Label(
            self.frame_result, textvariable=self.result_msg,
            font=("Segoe UI", 12), fg=self.MUTED, bg=self.PANEL,
            wraplength=520, justify="center",
        ).pack(pady=(0, 16))
        btns = tk.Frame(self.frame_result, bg=self.PANEL)
        btns.pack()
        tk.Button(
            btns, text="Play again", command=self.start_game,
            bg=self.MINT, fg="#0b1a14", font=("Segoe UI", 12, "bold"),
            relief="flat", padx=18, pady=8, cursor="hand2",
        ).pack(side="left", padx=6)
        tk.Button(
            btns, text="New timer", command=self._show_menu,
            bg="#2a3555", fg=self.TEXT, font=("Segoe UI", 12, "bold"),
            relief="flat", padx=18, pady=8, cursor="hand2",
        ).pack(side="left", padx=6)

    def _update_sens_label(self):
        v = self.sens_var.get()
        if v <= 25:
            t = "Relaxed"
        elif v <= 45:
            t = "Normal"
        elif v <= 70:
            t = "Strict"
        else:
            t = "Very strict"
        self.sens_label.config(text=f"{t} ({v})")

    def _hide_all(self):
        self.frame_menu.pack_forget()
        self.frame_play.pack_forget()
        self.frame_result.pack_forget()

    def _show_menu(self):
        self._stop_loop()
        self.meter.stop()
        self.state = "menu"
        self._hide_all()
        self.frame_menu.pack(fill="x", padx=16, pady=12)

    def _show_play(self):
        self._hide_all()
        self.frame_play.pack(fill="both", expand=True)

    def _show_result(self, won: bool):
        self._stop_loop()
        self.meter.stop()
        self.state = "result"
        self.won = won
        self._hide_all()
        if won:
            self.result_title.set("🍌 Banana escapes!")
            self.result_msg.set(
                "The class stayed quiet long enough. Great teamwork!"
            )
        else:
            self.result_title.set("🦍 Oh no — he got it!")
            self.result_msg.set(
                "The gorilla heard the noise and stole the banana. Try again, quieter."
            )
        self.frame_result.pack(fill="x", padx=16, pady=24)

    # ── Game ──────────────────────────────────────────────────────────────

    def start_game(self):
        try:
            self.meter.set_sensitivity(self.sens_var.get())
            self.meter.start()
        except Exception as e:
            messagebox.showerror("The Quiet Game", str(e))
            return

        self.duration = float(self.timer_var.get())
        self.remaining = self.duration
        self.gorilla_x = 0.18
        self.cover_eyes = True
        self.dance = 0.0
        self.leaf = 0.0
        self.state = "play"
        self.last_time = time.time()
        self._show_play()
        self._tick_frame()

    def _stop_loop(self):
        if self._tick is not None:
            try:
                self.root.after_cancel(self._tick)
            except Exception:
                pass
            self._tick = None

    def _tick_frame(self):
        if self.state != "play":
            return
        now = time.time()
        dt = min(0.05, now - self.last_time)
        self.last_time = now

        noise = self.meter.sample()
        quiet_cut = 0.12 + (1 - self.meter.sensitivity) * 0.08
        self.cover_eyes = noise < quiet_cut

        if not self.cover_eyes:
            speed = 0.015 + noise * 0.12
            self.gorilla_x += speed * dt
            self.status_var.set(
                "Too loud! He’s running!" if noise > 0.55 else "Getting noisy… he’s peeking!"
            )
        else:
            self.status_var.set("Shhh… eyes covered. He’s waiting.")

        self.dance += dt * (1.2 if self.cover_eyes else 4 + noise * 8)
        self.leaf += dt * 0.8
        self.remaining -= dt

        # noise bar
        self.noise_canvas.delete("all")
        w = int(220 * max(0.0, min(1.0, noise)))
        color = "#63d297" if noise < 0.35 else ("#ffe66d" if noise < 0.6 else "#e63946")
        self.noise_canvas.create_rectangle(0, 0, w, 16, fill=color, outline="")

        self.time_var.set(format_time(self.remaining))
        self._draw()

        if self.gorilla_x >= self.lose_at:
            self.gorilla_x = self.lose_at
            self._draw()
            self._show_result(False)
            return
        if self.remaining <= 0:
            self.remaining = 0
            self._draw()
            self._show_result(True)
            return

        self._tick = self.root.after(16, self._tick_frame)

    # ── Drawing ───────────────────────────────────────────────────────────

    def _draw(self):
        c = self.canvas
        c.delete("all")
        W, H = self.W, self.H

        # Sky + hills
        c.create_rectangle(0, 0, W, H, fill="#7ec8e3", outline="")
        c.create_rectangle(0, H * 0.55, W, H, fill="#5d9c6a", outline="")
        c.create_oval(W * 0.82, 40, W * 0.82 + 84, 124, fill="#ffe66d", outline="")

        # Clouds
        for cx, cy in ((120, 70), (400, 100), (680, 60)):
            c.create_oval(cx, cy, cx + 50, cy + 30, fill="white", outline="")
            c.create_oval(cx + 25, cy - 12, cx + 80, cy + 28, fill="white", outline="")

        # Banana tree
        bx = self.banana_x * W
        by = H * 0.62
        bob = math.sin(self.leaf * 2.2) * 6
        c.create_rectangle(bx - 8, by - 20, bx + 8, by + 70, fill="#6b4226", outline="")
        c.create_oval(bx - 70, by - 55, bx + 70, by - 5, fill="#2d6a4f", outline="")
        # Banana
        c.create_arc(
            bx + 10, by - 30 + bob, bx + 55, by + 20 + bob,
            start=200, extent=120, style="chord", fill="#ffe66d", outline="#e9c46a",
        )

        # Gorilla
        self._draw_gorilla(c)

        # Grass tufts
        for i in range(16):
            gx = 40 + i * 55
            gy = H * 0.84
            c.create_line(gx, gy, gx - 3, gy - 14, fill="#2d6a4f", width=2)
            c.create_line(gx, gy, gx + 5, gy - 12, fill="#2d6a4f", width=2)

    def _draw_gorilla(self, c: tk.Canvas):
        W, H = self.W, self.H
        x = self.gorilla_x * W
        ground = H * 0.78
        bounce = math.sin(self.dance) * 3 if self.cover_eyes else abs(math.sin(self.dance)) * 12
        y = ground - bounce

        # shadow
        c.create_oval(x - 48, y + 4, x + 48, y + 18, fill="#00000030", outline="")
        # legs / body
        c.create_rectangle(x - 28, y - 20, x - 10, y + 8, fill="#4a3728", outline="")
        c.create_rectangle(x + 10, y - 20, x + 28, y + 8, fill="#4a3728", outline="")
        c.create_oval(x - 42, y - 100, x + 42, y - 10, fill="#5c4033", outline="")
        c.create_oval(x - 24, y - 75, x + 24, y - 20, fill="#a67c52", outline="")
        # head
        c.create_oval(x - 32, y - 135, x + 32, y - 78, fill="#5c4033", outline="")
        c.create_oval(x - 18, y - 120, x + 18, y - 88, fill="#c4a574", outline="")

        if self.cover_eyes:
            c.create_oval(x - 22, y - 118, x - 2, y - 100, fill="#5c4033", outline="")
            c.create_oval(x + 2, y - 118, x + 22, y - 100, fill="#5c4033", outline="")
            c.create_arc(x - 8, y - 100, x + 8, y - 88, start=0, extent=-180,
                         style="arc", outline="#4a3728", width=2)
        else:
            c.create_oval(x - 14, y - 114, x - 2, y - 100, fill="white", outline="")
            c.create_oval(x + 2, y - 114, x + 14, y - 100, fill="white", outline="")
            c.create_oval(x - 11, y - 110, x - 5, y - 104, fill="#222", outline="")
            c.create_oval(x + 5, y - 110, x + 11, y - 104, fill="#222", outline="")
            c.create_arc(x - 12, y - 96, x + 12, y - 82, start=0, extent=-180,
                         fill="#4a3728", outline="")

    def _on_close(self):
        self._stop_loop()
        self.meter.stop()
        self.root.destroy()

    def run(self):
        self.root.mainloop()


if __name__ == "__main__":
    QuietGameApp().run()
