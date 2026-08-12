#!/usr/bin/env python3
"""
One Button Hero: The Duckening — GOTY Edition
One-button action platformer · 10 levels · combos · power-ups · ranks
1920x1080 fullscreen | ENTER (tap jump / hold charge) | X (exit)
"""

import tkinter as tk
import math
import random
import sys
import os
import json
import struct
import array
import tempfile
import wave
import atexit
import threading

# Optional pygame (preferred when available)
PYGAME_IMPORT_ERROR = None
try:
    import pygame
    HAS_PYGAME = True
except Exception as _e:
    HAS_PYGAME = False
    PYGAME_IMPORT_ERROR = str(_e)

# Windows MCI / winsound (built-in — works on Python 3.14 with no extra install)
HAS_WINMM = False
_winmm = None
if sys.platform == "win32":
    try:
        import ctypes
        _winmm = ctypes.WinDLL("winmm")
        HAS_WINMM = True
    except Exception:
        HAS_WINMM = False
try:
    import winsound
    HAS_WINSOUND = True
except Exception:
    HAS_WINSOUND = False

HAS_AUDIO = False
AUDIO_BACKEND = None  # "pygame" | "mci" | "winsound" | None
_TEMP_WAVS = []  # cleaned up on exit
_sfx_alias_i = 0
_mci_lock = threading.Lock()


def _audio_log(msg):
    """No-op — audio debug log disabled."""
    return


def _mci(cmd):
    """Send an MCI command string (serialized). Returns error code (0 = ok)."""
    if not HAS_WINMM or _winmm is None:
        return -1
    try:
        with _mci_lock:
            err = int(_winmm.mciSendStringW(str(cmd), None, 0, None))
        if err != 0:
            _audio_log(f"MCI err {err}: {cmd[:120]}")
        return err
    except Exception as e:
        _audio_log(f"MCI exception: {e} | {cmd[:120]}")
        return -1


def _cleanup_temp_wavs():
    # Close any open MCI aliases first
    if HAS_WINMM:
        for alias in ("obh_bgm",):
            _mci(f"stop {alias}")
            _mci(f"close {alias}")
        for i in range(16):
            _mci(f"stop obh_sfx{i}")
            _mci(f"close obh_sfx{i}")
    for p in _TEMP_WAVS:
        try:
            if os.path.exists(p):
                os.remove(p)
        except Exception:
            pass


atexit.register(_cleanup_temp_wavs)

# ─── Resolution ───────────────────────────────────────────────────────────────
CANVAS_W, CANVAS_H = 1920, 1080
DESIGN_W, DESIGN_H = 800, 450
SCALE_X = CANVAS_W / DESIGN_W   # 2.4
SCALE_Y = CANVAS_H / DESIGN_H   # 2.4

# ─── Colors ───────────────────────────────────────────────────────────────────
BG = "#16213e"
PLATFORM = "#0f3460"
PLATFORM_TOP = "#1a4a7a"
HERO = "#ffcc00"
HERO_BELLY = "#ffee88"
HERO_BEAK = "#ff8800"
HERO_HAT = "#e94560"
ENEMY = "#ff6b6b"
ENEMY_FLOAT = "#9b59b6"
ENEMY_JUMP = "#2ecc71"
ENEMY_CHASE = "#e74c3c"
COIN = "#ffd700"
COIN_LIGHT = "#ffed4a"
FLAG_POLE = "#e94560"
WHITE = "#ffffff"
BLACK = "#000000"
GOLD_GLOW = "#ffd700"
PARTICLE_RED = "#e94560"
PARTICLE_ENEMY = "#ff6b6b"
ACCENT = "#e94560"
POWER_SPEED = "#00e5ff"
POWER_STAR = "#ffe566"
POWER_MAGNET = "#b388ff"
UI_DIM = "#0a1628"
RANK_S = "#ffd700"
RANK_A = "#e0e0e0"
RANK_B = "#cd7f32"
RANK_C = "#8899aa"

# ─── Physics (design units) ───────────────────────────────────────────────────
GRAVITY = 0.58
JUMP_FORCE = -12.2
CHARGE_JUMP_FORCE = -18.5
MOVE_SPEED = 4.15
DASH_SPEED = 13
DASH_DURATION = 11
CHARGE_GRACE = 8
CHARGE_MIN = 14
CHARGE_SUPER = 42
COYOTE_FRAMES = 14
JUMP_BUFFER_FRAMES = 14

# ─── Combat / score ───────────────────────────────────────────────────────────
ENEMY_POINTS = {
    "patrol": 100,
    "jumper": 150,
    "floater": 200,
    "chaser": 250,
}
COMBO_WINDOW = 90          # frames to keep combo alive
COMBO_MULT_CAP = 5.0
PERFECT_LEVEL_BONUS = 1000
NO_HIT_BONUS = 500
ALL_COINS_BONUS = 300

MAX_HIGHSCORES = 10

# ─── Audio helpers (procedural WAV generation, no external files) ─────────────
def _samples_to_wav_path(samples, sample_rate=22050, prefix="obh_"):
    """Write mono s16 PCM samples to a temp .wav file; return (path, duration_ms)."""
    buf = array.array("h")
    for v in samples:
        buf.append(int(max(-1.0, min(1.0, v)) * 32767))
    fd, path = tempfile.mkstemp(prefix=prefix, suffix=".wav")
    os.close(fd)
    with wave.open(path, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(sample_rate)
        w.writeframes(buf.tobytes())
    _TEMP_WAVS.append(path)
    duration_ms = int(len(samples) * 1000 / sample_rate)
    return path, duration_ms


def _gen_tone_samples(freq, duration_ms, volume=0.4, sample_rate=22050, kind="sine"):
    n = int(sample_rate * duration_ms / 1000.0)
    samples = []
    for i in range(n):
        t = i / sample_rate
        if i < 80:
            env = i / 80.0
        else:
            env = 1.0 - (i - 80) / max(1, n - 80)
        env = max(0.0, min(1.0, env))
        if kind == "square":
            val = 1.0 if math.sin(2 * math.pi * freq * t) >= 0 else -1.0
        else:
            val = math.sin(2 * math.pi * freq * t)
        samples.append(val * env * volume)
    return samples


def _gen_bgm_samples(sample_rate=22050, volume=0.18, repeats=2):
    """Upbeat duck-hero theme — layered square + soft sine."""
    # Melody in C major-ish, punchy platformer energy
    notes = [
        (392, 140), (523, 140), (659, 140), (784, 200),
        (659, 120), (523, 120), (587, 160), (0, 60),
        (440, 140), (554, 140), (659, 140), (880, 200),
        (784, 120), (659, 120), (587, 160), (0, 60),
        (523, 100), (587, 100), (659, 100), (784, 100),
        (880, 180), (784, 120), (659, 200), (0, 80),
        (392, 120), (523, 120), (659, 280), (0, 160),
    ]
    phrase = []
    for freq, dur in notes:
        n = int(sample_rate * dur / 1000.0)
        for i in range(n):
            t = i / sample_rate
            if i < 30:
                env = i / 30.0
            elif i > n - 40:
                env = max(0.0, (n - i) / 40.0)
            else:
                env = 1.0
            if freq == 0:
                val = 0.0
            else:
                sq = 0.4 * (1.0 if math.sin(2 * math.pi * freq * t) >= 0 else -1.0)
                sn = 0.35 * math.sin(2 * math.pi * freq * t)
                harm = 0.15 * math.sin(2 * math.pi * freq * 2 * t)
                val = sq + sn + harm
            phrase.append(val * env * volume)
    samples = []
    for _ in range(max(1, repeats)):
        samples.extend(phrase)
    return samples


# ─── Levels (design units) ────────────────────────────────────────────────────
# Coins lowered by ~12px so walking on platform collects them
levels = [
    # Level 1: Tutorial
    {
        "platforms": [
            {"x": 0, "y": 400, "w": 400, "h": 50},
            {"x": 480, "y": 350, "w": 150, "h": 30},
            {"x": 700, "y": 350, "w": 200, "h": 50},
            {"x": 950, "y": 300, "w": 150, "h": 30},
            {"x": 1200, "y": 400, "w": 500, "h": 50},
        ],
        "enemies": [
            {"x": 750, "y": 318, "w": 24, "h": 32, "vx": 1, "patrolStart": 700, "patrolEnd": 880, "type": "patrol"},
        ],
        "coins": [
            {"x": 100, "y": 372}, {"x": 200, "y": 372}, {"x": 300, "y": 372},
            {"x": 520, "y": 322}, {"x": 580, "y": 322},
            {"x": 780, "y": 322}, {"x": 850, "y": 322},
            {"x": 1000, "y": 272}, {"x": 1080, "y": 272},
            {"x": 1300, "y": 372}, {"x": 1400, "y": 372}, {"x": 1500, "y": 372},
        ],
        "flag": {"x": 1600, "y": 340},
        "start": {"x": 100, "y": 350}
    },
    # Level 2: Gaps
    {
        "platforms": [
            {"x": 0, "y": 400, "w": 200, "h": 50},
            {"x": 280, "y": 380, "w": 100, "h": 30},
            {"x": 450, "y": 320, "w": 100, "h": 30},
            {"x": 620, "y": 380, "w": 100, "h": 30},
            {"x": 800, "y": 300, "w": 150, "h": 30},
            {"x": 1050, "y": 350, "w": 200, "h": 50},
            {"x": 1350, "y": 300, "w": 100, "h": 30},
            {"x": 1550, "y": 400, "w": 500, "h": 50},
        ],
        "enemies": [
            {"x": 850, "y": 268, "w": 24, "h": 32, "vx": 1.2, "patrolStart": 800, "patrolEnd": 930, "type": "patrol"},
            {"x": 1400, "y": 318, "w": 24, "h": 32, "vx": -1, "patrolStart": 1350, "patrolEnd": 1530, "type": "patrol"},
        ],
        "coins": [
            {"x": 80, "y": 372}, {"x": 150, "y": 372},
            {"x": 310, "y": 352}, {"x": 350, "y": 352},
            {"x": 480, "y": 292}, {"x": 520, "y": 292},
            {"x": 660, "y": 352}, {"x": 700, "y": 352},
            {"x": 860, "y": 272}, {"x": 920, "y": 272},
            {"x": 1120, "y": 322}, {"x": 1200, "y": 322},
            {"x": 1380, "y": 272}, {"x": 1650, "y": 372}, {"x": 1750, "y": 372}, {"x": 1850, "y": 372},
        ],
        "flag": {"x": 1950, "y": 340},
        "start": {"x": 50, "y": 350}
    },
    # Level 3: Verticality
    {
        "platforms": [
            {"x": 0, "y": 400, "w": 150, "h": 50},
            {"x": 200, "y": 350, "w": 100, "h": 20},
            {"x": 350, "y": 300, "w": 100, "h": 20},
            {"x": 200, "y": 220, "w": 100, "h": 20},
            {"x": 400, "y": 180, "w": 150, "h": 20},
            {"x": 600, "y": 250, "w": 100, "h": 20},
            {"x": 750, "y": 320, "w": 100, "h": 30},
            {"x": 920, "y": 280, "w": 80, "h": 20},
            {"x": 1050, "y": 220, "w": 80, "h": 20},
            {"x": 1200, "y": 300, "w": 200, "h": 50},
            {"x": 1500, "y": 350, "w": 100, "h": 30},
            {"x": 1700, "y": 400, "w": 400, "h": 50},
        ],
        "enemies": [
            {"x": 430, "y": 148, "w": 24, "h": 32, "vx": 1, "patrolStart": 400, "patrolEnd": 550, "type": "patrol"},
            {"x": 1250, "y": 268, "w": 24, "h": 32, "vx": 1.5, "patrolStart": 1200, "patrolEnd": 1380, "type": "patrol"},
        ],
        "coins": [
            {"x": 50, "y": 372}, {"x": 120, "y": 372},
            {"x": 240, "y": 322}, {"x": 280, "y": 322},
            {"x": 390, "y": 272}, {"x": 430, "y": 272},
            {"x": 240, "y": 192}, {"x": 280, "y": 192},
            {"x": 460, "y": 152}, {"x": 520, "y": 152},
            {"x": 640, "y": 222}, {"x": 680, "y": 222},
            {"x": 780, "y": 292}, {"x": 820, "y": 292},
            {"x": 950, "y": 252}, {"x": 1080, "y": 192},
            {"x": 1300, "y": 262}, {"x": 1400, "y": 262},
            {"x": 1540, "y": 322}, {"x": 1800, "y": 372}, {"x": 1900, "y": 372},
        ],
        "flag": {"x": 2000, "y": 340},
        "start": {"x": 50, "y": 350}
    },
    # Level 4: Floaters
    {
        "platforms": [
            {"x": 0, "y": 400, "w": 250, "h": 50},
            {"x": 320, "y": 350, "w": 100, "h": 20},
            {"x": 500, "y": 280, "w": 100, "h": 20},
            {"x": 700, "y": 350, "w": 200, "h": 50},
            {"x": 960, "y": 250, "w": 100, "h": 20},
            {"x": 1150, "y": 320, "w": 100, "h": 20},
            {"x": 1350, "y": 400, "w": 300, "h": 50},
            {"x": 1750, "y": 350, "w": 100, "h": 20},
            {"x": 1950, "y": 400, "w": 400, "h": 50},
        ],
        "enemies": [
            {"x": 600, "y": 200, "w": 24, "h": 24, "vx": 0, "baseY": 200, "amp": 40, "type": "floater"},
            {"x": 1000, "y": 180, "w": 24, "h": 24, "vx": 0, "baseY": 180, "amp": 50, "type": "floater"},
            {"x": 1450, "y": 368, "w": 24, "h": 32, "vx": 1.2, "patrolStart": 1350, "patrolEnd": 1620, "type": "patrol"},
        ],
        "coins": [
            {"x": 80, "y": 372}, {"x": 160, "y": 372},
            {"x": 350, "y": 322}, {"x": 390, "y": 322},
            {"x": 540, "y": 252}, {"x": 580, "y": 252},
            {"x": 800, "y": 322}, {"x": 860, "y": 322},
            {"x": 990, "y": 222}, {"x": 1200, "y": 292},
            {"x": 1450, "y": 372}, {"x": 1550, "y": 372},
            {"x": 1780, "y": 322}, {"x": 2050, "y": 372}, {"x": 2150, "y": 372},
        ],
        "flag": {"x": 2250, "y": 340},
        "start": {"x": 50, "y": 350}
    },
    # Level 5: Jumpers
    {
        "platforms": [
            {"x": 0, "y": 400, "w": 200, "h": 50},
            {"x": 280, "y": 350, "w": 120, "h": 20},
            {"x": 480, "y": 300, "w": 120, "h": 20},
            {"x": 300, "y": 200, "w": 100, "h": 20},
            {"x": 500, "y": 150, "w": 150, "h": 20},
            {"x": 750, "y": 350, "w": 200, "h": 50},
            {"x": 1020, "y": 280, "w": 100, "h": 20},
            {"x": 1200, "y": 350, "w": 150, "h": 50},
            {"x": 1450, "y": 300, "w": 100, "h": 20},
            {"x": 1650, "y": 400, "w": 500, "h": 50},
        ],
        "enemies": [
            {"x": 800, "y": 318, "w": 24, "h": 32, "vx": 1, "patrolStart": 750, "patrolEnd": 930, "type": "jumper"},
            {"x": 1220, "y": 318, "w": 24, "h": 32, "vx": -1.2, "patrolStart": 1200, "patrolEnd": 1330, "type": "jumper"},
            {"x": 520, "y": 118, "w": 24, "h": 32, "vx": 1, "patrolStart": 500, "patrolEnd": 630, "type": "patrol"},
        ],
        "coins": [
            {"x": 80, "y": 372}, {"x": 150, "y": 372},
            {"x": 320, "y": 322}, {"x": 370, "y": 322},
            {"x": 520, "y": 272}, {"x": 560, "y": 272},
            {"x": 340, "y": 172}, {"x": 380, "y": 172},
            {"x": 560, "y": 122}, {"x": 620, "y": 122},
            {"x": 820, "y": 322}, {"x": 880, "y": 322},
            {"x": 1050, "y": 252}, {"x": 1260, "y": 322},
            {"x": 1480, "y": 272}, {"x": 1700, "y": 372}, {"x": 1800, "y": 372}, {"x": 1900, "y": 372},
        ],
        "flag": {"x": 2050, "y": 340},
        "start": {"x": 50, "y": 350}
    },
    # Level 6: Chasers
    {
        "platforms": [
            {"x": 0, "y": 400, "w": 250, "h": 50},
            {"x": 350, "y": 350, "w": 150, "h": 30},
            {"x": 600, "y": 400, "w": 200, "h": 50},
            {"x": 900, "y": 320, "w": 100, "h": 20},
            {"x": 1100, "y": 400, "w": 200, "h": 50},
            {"x": 1400, "y": 350, "w": 150, "h": 30},
            {"x": 1650, "y": 400, "w": 500, "h": 50},
        ],
        "enemies": [
            {"x": 400, "y": 318, "w": 24, "h": 32, "vx": 0, "patrolStart": 350, "patrolEnd": 480, "type": "chaser"},
            {"x": 1150, "y": 368, "w": 24, "h": 32, "vx": 0, "patrolStart": 1100, "patrolEnd": 1270, "type": "chaser"},
            {"x": 700, "y": 368, "w": 24, "h": 32, "vx": 1, "patrolStart": 600, "patrolEnd": 780, "type": "patrol"},
        ],
        "coins": [
            {"x": 80, "y": 372}, {"x": 180, "y": 372},
            {"x": 400, "y": 322}, {"x": 460, "y": 322},
            {"x": 680, "y": 372}, {"x": 760, "y": 372},
            {"x": 940, "y": 292}, {"x": 980, "y": 292},
            {"x": 1180, "y": 372}, {"x": 1260, "y": 372},
            {"x": 1450, "y": 322}, {"x": 1520, "y": 322},
            {"x": 1700, "y": 372}, {"x": 1800, "y": 372}, {"x": 1900, "y": 372}, {"x": 2000, "y": 372},
        ],
        "flag": {"x": 2100, "y": 340},
        "start": {"x": 50, "y": 350}
    },
    # Level 7: Branch Upper/Lower
    {
        "platforms": [
            {"x": 0, "y": 400, "w": 300, "h": 50},
            {"x": 380, "y": 320, "w": 100, "h": 20},
            {"x": 380, "y": 420, "w": 150, "h": 30},
            {"x": 550, "y": 280, "w": 100, "h": 20},
            {"x": 720, "y": 240, "w": 100, "h": 20},
            {"x": 900, "y": 280, "w": 150, "h": 20},
            {"x": 1150, "y": 250, "w": 100, "h": 20},
            {"x": 1350, "y": 300, "w": 100, "h": 20},
            {"x": 600, "y": 400, "w": 150, "h": 50},
            {"x": 850, "y": 380, "w": 100, "h": 30},
            {"x": 1050, "y": 420, "w": 200, "h": 50},
            {"x": 1350, "y": 400, "w": 100, "h": 30},
            {"x": 1500, "y": 400, "w": 500, "h": 50},
        ],
        "enemies": [
            {"x": 750, "y": 200, "w": 24, "h": 24, "vx": 0, "baseY": 200, "amp": 30, "type": "floater"},
            {"x": 1200, "y": 210, "w": 24, "h": 24, "vx": 0, "baseY": 210, "amp": 35, "type": "floater"},
            {"x": 700, "y": 368, "w": 24, "h": 32, "vx": 0, "patrolStart": 600, "patrolEnd": 730, "type": "chaser"},
            {"x": 1150, "y": 388, "w": 24, "h": 32, "vx": 0, "patrolStart": 1050, "patrolEnd": 1230, "type": "chaser"},
        ],
        "coins": [
            {"x": 100, "y": 372}, {"x": 200, "y": 372},
            {"x": 410, "y": 282}, {"x": 580, "y": 242}, {"x": 620, "y": 242},
            {"x": 750, "y": 202}, {"x": 960, "y": 242}, {"x": 1000, "y": 242},
            {"x": 1180, "y": 212}, {"x": 1380, "y": 262},
            {"x": 650, "y": 372}, {"x": 900, "y": 352},
            {"x": 1120, "y": 392}, {"x": 1400, "y": 372},
            {"x": 1600, "y": 372}, {"x": 1700, "y": 372}, {"x": 1800, "y": 372},
        ],
        "flag": {"x": 1900, "y": 340},
        "start": {"x": 50, "y": 350}
    },
    # Level 8: Branch Risk/Reward
    {
        "platforms": [
            {"x": 0, "y": 400, "w": 250, "h": 50},
            {"x": 320, "y": 300, "w": 80, "h": 20},
            {"x": 480, "y": 250, "w": 80, "h": 20},
            {"x": 650, "y": 200, "w": 80, "h": 20},
            {"x": 820, "y": 260, "w": 100, "h": 20},
            {"x": 1000, "y": 220, "w": 80, "h": 20},
            {"x": 1180, "y": 280, "w": 100, "h": 20},
            {"x": 320, "y": 420, "w": 200, "h": 50},
            {"x": 600, "y": 400, "w": 200, "h": 50},
            {"x": 900, "y": 420, "w": 200, "h": 50},
            {"x": 1200, "y": 400, "w": 150, "h": 50},
            {"x": 1400, "y": 350, "w": 100, "h": 30},
            {"x": 1600, "y": 400, "w": 500, "h": 50},
        ],
        "enemies": [
            {"x": 840, "y": 228, "w": 24, "h": 32, "vx": 1, "patrolStart": 820, "patrolEnd": 900, "type": "jumper"},
            {"x": 400, "y": 388, "w": 24, "h": 32, "vx": 1.2, "patrolStart": 320, "patrolEnd": 500, "type": "patrol"},
            {"x": 700, "y": 368, "w": 24, "h": 32, "vx": -1, "patrolStart": 600, "patrolEnd": 780, "type": "patrol"},
            {"x": 1000, "y": 388, "w": 24, "h": 32, "vx": 1, "patrolStart": 900, "patrolEnd": 1080, "type": "patrol"},
        ],
        "coins": [
            {"x": 80, "y": 372}, {"x": 180, "y": 372},
            {"x": 340, "y": 272}, {"x": 380, "y": 272},
            {"x": 500, "y": 222}, {"x": 540, "y": 222},
            {"x": 670, "y": 172}, {"x": 710, "y": 172},
            {"x": 850, "y": 232}, {"x": 890, "y": 232},
            {"x": 1020, "y": 192}, {"x": 1060, "y": 192},
            {"x": 1210, "y": 252}, {"x": 1280, "y": 252},
            {"x": 400, "y": 392}, {"x": 700, "y": 372}, {"x": 1000, "y": 392},
            {"x": 1430, "y": 322},
            {"x": 1650, "y": 372}, {"x": 1750, "y": 372}, {"x": 1850, "y": 372}, {"x": 1950, "y": 372},
        ],
        "flag": {"x": 2000, "y": 340},
        "start": {"x": 50, "y": 350}
    },
    # Level 9: Gauntlet
    {
        "platforms": [
            {"x": 0, "y": 400, "w": 200, "h": 50},
            {"x": 280, "y": 350, "w": 100, "h": 20},
            {"x": 450, "y": 300, "w": 100, "h": 20},
            {"x": 280, "y": 220, "w": 100, "h": 20},
            {"x": 480, "y": 180, "w": 150, "h": 20},
            {"x": 700, "y": 250, "w": 80, "h": 20},
            {"x": 850, "y": 320, "w": 100, "h": 30},
            {"x": 1050, "y": 280, "w": 80, "h": 20},
            {"x": 1200, "y": 220, "w": 80, "h": 20},
            {"x": 1350, "y": 300, "w": 150, "h": 50},
            {"x": 1600, "y": 350, "w": 100, "h": 30},
            {"x": 1800, "y": 400, "w": 500, "h": 50},
        ],
        "enemies": [
            {"x": 520, "y": 148, "w": 24, "h": 32, "vx": 1, "patrolStart": 480, "patrolEnd": 610, "type": "patrol"},
            {"x": 600, "y": 250, "w": 24, "h": 24, "vx": 0, "baseY": 250, "amp": 40, "type": "floater"},
            {"x": 900, "y": 288, "w": 24, "h": 32, "vx": 1, "patrolStart": 850, "patrolEnd": 930, "type": "jumper"},
            {"x": 1400, "y": 268, "w": 24, "h": 32, "vx": 0, "patrolStart": 1350, "patrolEnd": 1480, "type": "chaser"},
        ],
        "coins": [
            {"x": 50, "y": 372}, {"x": 120, "y": 372},
            {"x": 310, "y": 322}, {"x": 350, "y": 322},
            {"x": 480, "y": 272}, {"x": 520, "y": 272},
            {"x": 310, "y": 192}, {"x": 350, "y": 192},
            {"x": 530, "y": 152}, {"x": 590, "y": 152},
            {"x": 730, "y": 222}, {"x": 880, "y": 292}, {"x": 920, "y": 292},
            {"x": 1080, "y": 252}, {"x": 1230, "y": 192},
            {"x": 1400, "y": 262}, {"x": 1500, "y": 262},
            {"x": 1630, "y": 322}, {"x": 1850, "y": 372}, {"x": 1950, "y": 372}, {"x": 2050, "y": 372},
        ],
        "flag": {"x": 2200, "y": 340},
        "start": {"x": 50, "y": 350}
    },
    # Level 10: Finale
    {
        "platforms": [
            {"x": 0, "y": 400, "w": 200, "h": 50},
            {"x": 280, "y": 350, "w": 100, "h": 20},
            {"x": 450, "y": 300, "w": 100, "h": 20},
            {"x": 650, "y": 350, "w": 150, "h": 30},
            {"x": 900, "y": 280, "w": 100, "h": 20},
            {"x": 1100, "y": 350, "w": 150, "h": 50},
            {"x": 1350, "y": 300, "w": 100, "h": 20},
            {"x": 1550, "y": 250, "w": 100, "h": 20},
            {"x": 1750, "y": 300, "w": 100, "h": 20},
            {"x": 1950, "y": 350, "w": 100, "h": 30},
            {"x": 2150, "y": 400, "w": 600, "h": 50},
        ],
        "enemies": [
            {"x": 700, "y": 318, "w": 24, "h": 32, "vx": 1.5, "patrolStart": 650, "patrolEnd": 780, "type": "patrol"},
            {"x": 950, "y": 240, "w": 24, "h": 24, "vx": 0, "baseY": 240, "amp": 35, "type": "floater"},
            {"x": 1150, "y": 318, "w": 24, "h": 32, "vx": -1.2, "patrolStart": 1100, "patrolEnd": 1230, "type": "jumper"},
            {"x": 1600, "y": 218, "w": 24, "h": 32, "vx": 0, "patrolStart": 1550, "patrolEnd": 1620, "type": "chaser"},
            {"x": 2000, "y": 318, "w": 24, "h": 32, "vx": 1, "patrolStart": 1950, "patrolEnd": 2120, "type": "patrol"},
        ],
        "coins": [
            {"x": 80, "y": 372}, {"x": 160, "y": 372},
            {"x": 310, "y": 322}, {"x": 350, "y": 322},
            {"x": 480, "y": 272}, {"x": 520, "y": 272},
            {"x": 700, "y": 322}, {"x": 760, "y": 322},
            {"x": 930, "y": 252}, {"x": 980, "y": 252},
            {"x": 1150, "y": 322}, {"x": 1220, "y": 322},
            {"x": 1380, "y": 272}, {"x": 1580, "y": 222},
            {"x": 1780, "y": 272}, {"x": 1980, "y": 322},
            {"x": 2200, "y": 372}, {"x": 2300, "y": 372}, {"x": 2400, "y": 372}, {"x": 2500, "y": 372}, {"x": 2600, "y": 372},
        ],
        "flag": {"x": 2650, "y": 340},
        "start": {"x": 50, "y": 350}
    },
]


class Particle:
    def __init__(self, x, y, color, size=3, vx=None, vy=None, life=30, gravity=0.12):
        self.x = x
        self.y = y
        self.vx = random.uniform(-3, 3) if vx is None else vx
        self.vy = random.uniform(-4, -1) if vy is None else vy
        self.life = life
        self.max_life = life
        self.color = color
        self.size = size
        self.gravity = gravity

    def update(self):
        self.x += self.vx
        self.y += self.vy
        self.vy += self.gravity
        self.life -= 1
        self.vx *= 0.98


class FloatText:
    def __init__(self, x, y, text, color, scale=1.0):
        self.x = x
        self.y = y
        self.text = text
        self.color = color
        self.life = 50
        self.vy = -1.0
        self.max_life = 50
        self.scale = scale

    def update(self):
        self.y += self.vy
        self.vy *= 0.97
        self.life -= 1
class Game:
    def __init__(self, root):
        self.root = root
        self.root.title("One Button Hero")
        self.root.resizable(False, False)
        self.root.configure(bg="black")

        # True fullscreen
        self.root.attributes('-fullscreen', True)
        self.screen_w = self.root.winfo_screenwidth()
        self.screen_h = self.root.winfo_screenheight()

        # Scaling
        self.scale_x = SCALE_X
        self.scale_y = SCALE_Y

        # Cached starfield
        star_colors = ["#444466", "#555577", "#666688", "#777799", "#8888aa"]
        self.stars = []
        for i in range(50):
            self.stars.append({
                "base_x": i * 137,
                "y": (i * 73) % DESIGN_H,
                "color": star_colors[i % len(star_colors)],
                "r": max(1, int(1.5 * self.scale_x))
            })

        # Center frame
        self.outer = tk.Frame(root, bg="black")
        self.outer.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

        # Game frame
        self.frame = tk.Frame(self.outer, bg=BG)
        self.frame.pack()

        # HUD
        self.hud_frame = tk.Frame(self.frame, bg=BG)
        self.hud_frame.pack(fill=tk.X, pady=(0, 5))

        self.score_label = tk.Label(self.hud_frame, text="Score: 0", font=("Consolas", 14, "bold"),
                                    bg=BG, fg=ACCENT)
        self.score_label.pack(side=tk.LEFT, padx=10)

        self.lives_label = tk.Label(self.hud_frame, text="Lives: 3", font=("Consolas", 14, "bold"),
                                    bg=BG, fg=ACCENT)
        self.lives_label.pack(side=tk.LEFT, padx=10)

        self.level_label = tk.Label(self.hud_frame, text="Level: 1", font=("Consolas", 14, "bold"),
                                    bg=BG, fg=ACCENT)
        self.level_label.pack(side=tk.LEFT, padx=10)

        self.exit_hint = tk.Label(self.hud_frame, text="X = Exit", font=("Consolas", 10),
                                  bg=BG, fg="#666666")
        self.exit_hint.pack(side=tk.RIGHT, padx=10)

        self.high_label = tk.Label(self.hud_frame, text="Best: 0", font=("Consolas", 14, "bold"),
                                   bg=BG, fg="#e94560")
        self.high_label.pack(side=tk.RIGHT, padx=10)

        # Canvas at 1920x1080
        self.canvas = tk.Canvas(self.frame, width=CANVAS_W, height=CANVAS_H,
                                bg=BG, highlightthickness=0)
        self.canvas.pack()

        # Instructions
        self.instructions = tk.Label(self.frame,
            text="ENTER: Tap = Jump   ·   Hold = Super Jump   |   X = Exit",
            font=("Consolas", 10), bg=BG, fg="#888888")
        self.instructions.pack(pady=(5, 0))

        # Bind keys
        self.root.bind("<Return>", self.on_enter_press)
        self.root.bind("<KeyRelease-Return>", self.on_enter_release)
        self.root.bind("<x>", self.on_x_key)
        self.root.bind("<X>", self.on_x_key)
        self.root.bind("<Escape>", self.on_x_key)
        self.root.bind("<Key>", self.on_key_press)
        self.root.bind("<BackSpace>", self.on_backspace)
        self.root.protocol("WM_DELETE_WINDOW", self.quit_game)

        # Audio
        self.sfx_coin = None
        self.sfx_stomp = None
        self.bgm = None
        self.bgm_channel = None
        self.init_audio()

        # Persisted data
        self.highscores = []  # list of {"name": str, "score": int}
        self.high_score = 0
        self.load_save()

        # Name entry
        self.name_input = ""
        self.name_cursor_timer = 0
        self.pending_end_state = None  # "gameover" or "win" after name entry

        # Game state
        self.reset()
        self.game_loop()

    def init_audio(self):
        """Set up audio: pygame if available, else Windows MCI (concurrent BGM+SFX)."""
        global HAS_AUDIO, AUDIO_BACKEND
        self.audio_status = "off"
        self.sfx_coin = None
        self.sfx_stomp = None
        self.sfx_jump = None
        self.sfx_dash = None
        self.sfx_charge = None
        self.bgm = None
        self.bgm_channel = None
        self._bgm_playing = False
        self._bgm_thread = None
        self._charge_sfx_armed = False
        AUDIO_BACKEND = None
        HAS_AUDIO = False

        # Generate WAV files (stdlib only)
        try:
            self.sfx_coin, _ = _samples_to_wav_path(
                _gen_tone_samples(988, 90, volume=0.5, kind="sine"), prefix="obh_coin_")
            self.sfx_stomp, _ = _samples_to_wav_path(
                _gen_tone_samples(160, 140, volume=0.55, kind="square"), prefix="obh_stomp_")
            self.sfx_jump, _ = _samples_to_wav_path(
                _gen_tone_samples(520, 70, volume=0.28, kind="sine"), prefix="obh_jump_")
            self.sfx_dash, _ = _samples_to_wav_path(
                _gen_tone_samples(220, 100, volume=0.4, kind="square"), prefix="obh_dash_")
            self.sfx_charge, _ = _samples_to_wav_path(
                _gen_tone_samples(1320, 110, volume=0.35, kind="sine"), prefix="obh_charge_")
            # BGM: moderate volume (was 0.11 — effectively inaudible with MCI vol scale)
            self.bgm, self.bgm_duration_ms = _samples_to_wav_path(
                _gen_bgm_samples(volume=0.32, repeats=3), prefix="obh_bgm_")
            self.bgm = os.path.abspath(self.bgm)
            _audio_log(f"WAV ok bgm={self.bgm} dur_ms={self.bgm_duration_ms}")
        except Exception as e:
            self.audio_status = f"wav fail: {e}"
            _audio_log(f"WAV fail: {e}")
            return

        # Prefer pygame (true multi-channel mixing)
        if HAS_PYGAME:
            try:
                try:
                    pygame.mixer.quit()
                except Exception:
                    pass
                pygame.mixer.pre_init(frequency=22050, size=-16, channels=1, buffer=512)
                pygame.mixer.init()
                if pygame.mixer.get_init():
                    self.sfx_coin = pygame.mixer.Sound(self.sfx_coin)
                    self.sfx_stomp = pygame.mixer.Sound(self.sfx_stomp)
                    self.sfx_jump = pygame.mixer.Sound(self.sfx_jump)
                    self.sfx_dash = pygame.mixer.Sound(self.sfx_dash)
                    self.sfx_charge = pygame.mixer.Sound(self.sfx_charge)
                    self.bgm = pygame.mixer.Sound(self.bgm)
                    try:
                        self.bgm.set_volume(0.45)
                    except Exception:
                        pass
                    AUDIO_BACKEND = "pygame"
                    HAS_AUDIO = True
                    self.audio_status = "on (pygame)"
                    _audio_log("backend=pygame")
                    return
            except Exception as e:
                _audio_log(f"pygame init fail: {e}")

        # Windows: MCI for SFX only. winsound SND_LOOP holds the wave device
        # and blocks MCI, so we do not mix BGM+SFX without pygame.
        if HAS_WINMM:
            AUDIO_BACKEND = "mci"
            HAS_AUDIO = True
            self.audio_status = "on (mci/sfx)"
            self._bgm_via_winsound = False
            _audio_log("backend=mci sfx-only (no winsound bgm — device conflict)")
            return

        if HAS_WINSOUND:
            AUDIO_BACKEND = "winsound"
            HAS_AUDIO = True
            self.audio_status = "on (winsound)"
            self._bgm_via_winsound = True
            _audio_log("backend=winsound")
            return

        self.audio_status = "no backend"
        HAS_AUDIO = False
        self._bgm_via_winsound = False
        _audio_log("backend=none")

    def play_sfx(self, sound):
        """Play a one-shot SFX (MCI). Does not touch BGM."""
        if not HAS_AUDIO or sound is None:
            return
        global _sfx_alias_i
        try:
            if AUDIO_BACKEND == "pygame":
                sound.play()
            elif AUDIO_BACKEND == "mci":
                alias = f"obh_sfx{_sfx_alias_i % 8}"
                _sfx_alias_i += 1
                path = os.path.abspath(sound)
                threading.Thread(
                    target=self._mci_play_sfx, args=(path, alias), daemon=True
                ).start()
            elif AUDIO_BACKEND == "winsound":
                winsound.PlaySound(
                    sound, winsound.SND_FILENAME | winsound.SND_ASYNC | winsound.SND_NOSTOP
                )
        except Exception as e:
            _audio_log(f"play_sfx err: {e}")

    def _mci_play_sfx(self, path, alias):
        try:
            path = path.replace("/", "\\")
            # Ignore close errors (263 = alias not open yet)
            _mci(f"close {alias}")
            if _mci(f'open "{path}" type waveaudio alias {alias}') == 0:
                _mci(f"setaudio {alias} volume to 800")
                _mci(f"play {alias} from 0")
        except Exception as e:
            _audio_log(f"mci sfx err: {e}")

    def start_bgm(self):
        if not HAS_AUDIO or self.bgm is None:
            _audio_log("start_bgm skipped")
            return
        try:
            if AUDIO_BACKEND == "pygame":
                self.bgm_channel = self.bgm.play(loops=-1)
                self._bgm_playing = True
                _audio_log("start_bgm pygame ok")
                return

            # winsound BGM only when explicitly enabled (not with MCI SFX)
            if getattr(self, "_bgm_via_winsound", False) and HAS_WINSOUND:
                try:
                    winsound.PlaySound(
                        self.bgm,
                        winsound.SND_FILENAME | winsound.SND_ASYNC | winsound.SND_LOOP
                    )
                    self._bgm_playing = True
                    _audio_log("start_bgm winsound ok")
                    return
                except Exception as e:
                    _audio_log(f"start_bgm winsound fail: {e}")

            # No BGM on MCI-sfx-only backend (device is shared; BGM blocked SFX)
            _audio_log("start_bgm: sfx-only backend, bgm skipped")
        except Exception as e:
            self._bgm_playing = False
            _audio_log(f"start_bgm err: {e}")

    def _mci_bgm_loop(self):
        duration = max(1.0, (getattr(self, "bgm_duration_ms", 4000) or 4000) / 1000.0)
        sleep_s = max(0.5, duration - 0.05)
        while self._bgm_playing:
            elapsed = 0.0
            while self._bgm_playing and elapsed < sleep_s:
                threading.Event().wait(0.1)
                elapsed += 0.1
            if not self._bgm_playing:
                break
            try:
                _mci("seek obh_bgm to start")
                _mci("play obh_bgm from 0")
            except Exception as e:
                _audio_log(f"mci bgm loop err: {e}")
                break

    def stop_bgm(self):
        self._bgm_playing = False
        if not HAS_AUDIO:
            return
        try:
            if AUDIO_BACKEND == "pygame" and self.bgm is not None:
                try:
                    self.bgm.stop()
                except Exception:
                    pass
            if HAS_WINSOUND:
                try:
                    winsound.PlaySound(None, winsound.SND_PURGE)
                except Exception:
                    pass
            if HAS_WINMM:
                _mci("stop obh_bgm")
            self.bgm_channel = None
        except Exception as e:
            _audio_log(f"stop_bgm err: {e}")

    def quit_game(self, event=None):
        # Prevent audio callbacks from running after teardown
        self._bgm_playing = False
        try:
            self.stop_bgm()
        except Exception:
            pass
        if AUDIO_BACKEND == "pygame":
            try:
                pygame.mixer.quit()
            except Exception:
                pass
        try:
            _cleanup_temp_wavs()
        except Exception:
            pass
        try:
            self.root.destroy()
        except Exception:
            pass

    def on_x_key(self, event):
        # Allow typing X during name entry; otherwise quit
        if self.state == "enter_name":
            return  # let on_key_press handle it
        self.quit_game()

    def get_save_path(self):
        if getattr(sys, 'frozen', False):
            base = os.path.dirname(sys.executable)
        else:
            base = os.path.dirname(os.path.abspath(__file__))
        return os.path.join(base, "one_button_hero_save.json")

    def load_save(self):
        path = self.get_save_path()
        self.highscores = []
        self.high_score = 0
        if os.path.exists(path):
            try:
                with open(path, 'r') as f:
                    data = json.load(f)
                # Support both old format and new list format
                if "highscores" in data and isinstance(data["highscores"], list):
                    self.highscores = [
                        {"name": str(e.get("name", "AAA"))[:12], "score": int(e.get("score", 0))}
                        for e in data["highscores"]
                    ]
                elif "high_score" in data:
                    # Migrate old single high score
                    hs = int(data.get("high_score", 0))
                    if hs > 0:
                        self.highscores = [{"name": "PLAYER", "score": hs}]
                self.highscores.sort(key=lambda e: e["score"], reverse=True)
                self.highscores = self.highscores[:MAX_HIGHSCORES]
                if self.highscores:
                    self.high_score = self.highscores[0]["score"]
            except Exception:
                self.highscores = []
                self.high_score = 0

    def save_highscores(self):
        path = self.get_save_path()
        try:
            with open(path, 'w') as f:
                json.dump({"highscores": self.highscores, "high_score": self.high_score}, f)
        except Exception:
            pass

    def qualifies_for_board(self, score):
        if score <= 0:
            return False
        if len(self.highscores) < MAX_HIGHSCORES:
            return True
        return score > self.highscores[-1]["score"]

    def submit_score(self, name, score):
        name = (name or "HERO").strip().upper()[:12] or "HERO"
        self.highscores.append({"name": name, "score": int(score)})
        self.highscores.sort(key=lambda e: e["score"], reverse=True)
        self.highscores = self.highscores[:MAX_HIGHSCORES]
        self.high_score = self.highscores[0]["score"] if self.highscores else 0
        self.save_highscores()
        return self.highscores[0]["score"] == score and self.highscores[0]["name"] == name

    def begin_end_sequence(self, end_state):
        """Called on gameover or win. Optionally go to name entry."""
        self.stop_bgm()
        self.new_best = self.qualifies_for_board(self.score)
        if self.new_best:
            self.pending_end_state = end_state
            self.name_input = ""
            self.name_cursor_timer = 0
            self.state = "enter_name"
        else:
            self.state = end_state

    def reset(self):
        self.stop_bgm()
        self.state = "menu"
        self.score = 0
        self.lives = 3
        self.level_idx = 0
        self.camera_x = 0
        self.particles = []
        self.float_texts = []
        self.platforms = []
        self.enemies = []
        self.coins = []
        self.powerups = []
        self.flag = {"x": 0, "y": 0, "w": 30, "h": 60}
        self.hero = {
            "x": 100, "y": 300, "w": 24, "h": 32,
            "vx": 0, "vy": 0, "on_ground": False,
            "facing": 1, "dash_timer": 0, "charge_timer": 0,
            "is_charging": False, "invincible": 0,
            "anim_frame": 0, "anim_timer": 0,
            "coyote": 0, "jump_buffer": 0,
            "speed_timer": 0, "star_timer": 0, "magnet_timer": 0,
            "was_on_ground": False,
        }
        self.enter_pressed = False
        self.last_enter_time = 0
        self.tap_count = 0
        self.tap_timer = 0
        self.freeze_timer = 0
        self.screen_shake = 0
        self.shake_x = 0
        self.shake_y = 0
        self.transition_timer = 0
        self.new_best = False
        self.name_input = ""
        self.pending_end_state = None
        self._charge_sfx_armed = False
        self.combo = 0
        self.combo_timer = 0
        self.combo_mult = 1.0
        self.max_combo = 0
        self.level_coins_total = 0
        self.level_coins_got = 0
        self.level_hit = False
        self.level_rank = "C"
        self.level_bonus = 0
        self.menu_pulse = 0
        self.load_level(0)

    def _spawn_level_powerups(self, idx, data):
        """Place a few power-ups on mid/late platforms for juice and risk-reward."""
        self.powerups = []
        plats = data["platforms"]
        if len(plats) < 3:
            return
        # Pick elevated platforms (not the start ground)
        candidates = [p for p in plats[1:] if p["y"] < 380 and p["w"] >= 80]
        if not candidates:
            candidates = plats[1:4]
        kinds = ["speed", "star", "magnet"]
        # More power-ups on later levels
        count = 1 if idx < 3 else (2 if idx < 7 else 3)
        random.shuffle(candidates)
        for i, p in enumerate(candidates[:count]):
            kind = kinds[i % len(kinds)]
            self.powerups.append({
                "x": p["x"] + p["w"] * 0.5,
                "y": p["y"] - 18,
                "w": 16, "h": 16,
                "kind": kind,
                "collected": False,
                "bob": random.random() * 6.28,
            })

    def load_level(self, idx):
        if idx >= len(levels):
            self.begin_end_sequence("win")
            return
        data = levels[idx]
        self.platforms = [dict(p) for p in data["platforms"]]
        self.enemies = [dict(e) for e in data["enemies"]]
        for e in self.enemies:
            e["vy"] = 0
            e["on_ground"] = False
            e["anim_timer"] = 0
            e["jump_timer"] = random.randint(0, 60)
        self.coins = [{"x": c["x"], "y": c["y"], "collected": False} for c in data["coins"]]
        self.level_coins_total = len(self.coins)
        self.level_coins_got = 0
        self.level_hit = False
        self.level_rank = "C"
        self.level_bonus = 0
        self._spawn_level_powerups(idx, data)
        self.flag = {"x": data["flag"]["x"], "y": data["flag"]["y"], "w": 30, "h": 60}
        self.hero["x"] = data["start"]["x"]
        self.hero["y"] = data["start"]["y"]
        self.hero["vx"] = 0
        self.hero["vy"] = 0
        self.hero["dash_timer"] = 0
        self.hero["charge_timer"] = 0
        self.hero["is_charging"] = False
        self.hero["invincible"] = 0
        self.hero["coyote"] = 0
        self.hero["jump_buffer"] = 0
        self.hero["speed_timer"] = 0
        self.hero["star_timer"] = 0
        self.hero["magnet_timer"] = 0
        self.hero["was_on_ground"] = False
        self.particles = []
        self.float_texts = []
        self.freeze_timer = 0
        self.screen_shake = 0
        self.shake_x = 0
        self.shake_y = 0
        self.transition_timer = 0
        self.camera_x = 0
        self.combo = 0
        self.combo_timer = 0
        self.combo_mult = 1.0

    def add_score(self, base, x, y, label=None):
        pts = int(base * self.combo_mult)
        self.score += pts
        txt = label or f"+{pts}"
        if self.combo_mult > 1.01:
            txt = f"+{pts} x{self.combo_mult:.1f}"
        self.float_texts.append(FloatText(x, y, txt, COIN if pts < 200 else GOLD_GLOW,
                                          scale=1.0 + min(0.6, self.combo * 0.05)))
        return pts

    def bump_combo(self):
        self.combo += 1
        self.combo_timer = COMBO_WINDOW
        self.combo_mult = min(COMBO_MULT_CAP, 1.0 + (self.combo - 1) * 0.25)
        if self.combo > self.max_combo:
            self.max_combo = self.combo

    def compute_level_rank(self):
        all_coins = self.level_coins_got >= self.level_coins_total and self.level_coins_total > 0
        no_hit = not self.level_hit
        bonus = 0
        if all_coins:
            bonus += ALL_COINS_BONUS
        if no_hit:
            bonus += NO_HIT_BONUS
        if all_coins and no_hit:
            bonus += PERFECT_LEVEL_BONUS
            rank = "S"
        elif all_coins or (no_hit and self.combo >= 5):
            rank = "A"
        elif no_hit or all_coins:
            rank = "B"
        else:
            rank = "C"
        self.level_rank = rank
        self.level_bonus = bonus
        if bonus:
            self.score += bonus
        return rank, bonus
    def on_enter_press(self, event):
        if not self.enter_pressed:
            self.enter_pressed = True

            if self.state == "enter_name":
                # Confirm name
                is_top = self.submit_score(self.name_input, self.score)
                self.new_best = is_top
                self.state = self.pending_end_state or "gameover"
                self.pending_end_state = None
                return

            if self.state in ("menu", "gameover", "win"):
                self.reset()
                self.state = "playing"
                self.start_bgm()
                return

            if self.state != "playing":
                return

            # Responsive jump: hop immediately on press when allowed.
            # Keep holding to charge a stronger jump applied on release.
            h = self.hero
            h["is_charging"] = True
            h["charge_timer"] = 0
            h["jumped_from_press"] = False
            self._charge_sfx_armed = True

            can_jump = h["on_ground"] or h.get("coyote", 0) > 0
            if can_jump:
                spd = MOVE_SPEED * (1.4 if h.get("speed_timer", 0) > 0 else 1.0)
                if h["vx"] < spd:
                    h["vx"] = spd
                h["vy"] = JUMP_FORCE
                h["on_ground"] = False
                h["coyote"] = 0
                h["jump_buffer"] = 0
                h["jumped_from_press"] = True
                self.spawn_particles(h["x"] + h["w"]/2, h["y"] + h["h"], WHITE, 5)
                self.play_sfx(self.sfx_jump)
            else:
                # Airborne: buffer a jump for near-landing taps
                h["jump_buffer"] = JUMP_BUFFER_FRAMES

    def on_key_press(self, event):
        if self.state != "enter_name":
            return
        ch = event.char
        if ch and ch.isprintable() and len(self.name_input) < 12:
            if ch.isalnum() or ch == " ":
                self.name_input += ch.upper() if ch.isalpha() else ch

    def on_backspace(self, event):
        if self.state == "enter_name" and self.name_input:
            self.name_input = self.name_input[:-1]

    def on_enter_release(self, event):
        self.enter_pressed = False

        if self.state != "playing":
            return

        h = self.hero
        if not h["is_charging"]:
            return
        h["is_charging"] = False
        held = h["charge_timer"]
        self._charge_sfx_armed = False
        h["charge_timer"] = 0

        # Hold length only sets power. Short taps still get a full jump via
        # ground / coyote / buffer so air timing stays playable.
        if held >= CHARGE_SUPER:
            jump_power = CHARGE_JUMP_FORCE
            dust, col = 14, GOLD_GLOW
            self.screen_shake = max(self.screen_shake, 6)
        elif held >= CHARGE_MIN:
            jump_power = JUMP_FORCE - 3.2
            dust, col = 9, COIN_LIGHT
        else:
            jump_power = JUMP_FORCE
            dust, col = 5, WHITE

        can_jump = h["on_ground"] or h.get("coyote", 0) > 0 or h.get("jump_buffer", 0) > 0
        already = h.get("jumped_from_press", False)

        if already and held >= CHARGE_MIN and h["vy"] < 0:
            # Upgrade press-hop to charged height while rising
            h["vy"] = min(h["vy"], jump_power)
            self.spawn_particles(h["x"] + h["w"]/2, h["y"] + h["h"], col, dust)
            self.play_sfx(self.sfx_jump)
        elif can_jump and not already:
            spd = MOVE_SPEED * (1.4 if h.get("speed_timer", 0) > 0 else 1.0)
            if h["vx"] < spd:
                h["vx"] = spd
            h["vy"] = jump_power
            h["on_ground"] = False
            h["coyote"] = 0
            h["jump_buffer"] = 0
            self.spawn_particles(h["x"] + h["w"]/2, h["y"] + h["h"], col, dust)
            self.play_sfx(self.sfx_jump)

        h["jumped_from_press"] = False
    def update(self):
        if self.state == "enter_name":
            self.name_cursor_timer = (self.name_cursor_timer + 1) % 40
            return

        if self.state == "level_complete":
            self.transition_timer -= 1
            if self.transition_timer <= 0:
                self.state = "playing"
                self.load_level(self.level_idx)
            for p in self.particles:
                p.update()
            self.particles = [p for p in self.particles if p.life > 0]
            for ft in self.float_texts:
                ft.update()
            self.float_texts = [ft for ft in self.float_texts if ft.life > 0]
            return

        if self.state != "playing":
            return

        if self.freeze_timer > 0:
            self.freeze_timer -= 1
            for p in self.particles:
                p.update()
            self.particles = [p for p in self.particles if p.life > 0]
            for ft in self.float_texts:
                ft.update()
            self.float_texts = [ft for ft in self.float_texts if ft.life > 0]
            return

        if self.tap_timer > 0:
            self.tap_timer -= 1
        if self.tap_timer == 0:
            self.tap_count = 0

        # Combo decay
        if self.combo_timer > 0:
            self.combo_timer -= 1
            if self.combo_timer <= 0:
                self.combo = 0
                self.combo_mult = 1.0

        h = self.hero
        # Power-up timers
        for key in ("speed_timer", "star_timer", "magnet_timer"):
            if h.get(key, 0) > 0:
                h[key] -= 1

        base_speed = MOVE_SPEED * (1.4 if h.get("speed_timer", 0) > 0 else 1.0)

        if h["on_ground"] and not h["is_charging"]:
            h["vx"] = base_speed
            h["facing"] = 1

        if h["is_charging"]:
            h["charge_timer"] += 1
            if self._charge_sfx_armed and h["charge_timer"] >= CHARGE_MIN:
                self.play_sfx(self.sfx_charge)
                self._charge_sfx_armed = False
            if h["charge_timer"] > CHARGE_GRACE:
                h["vx"] *= 0.92
                if h["vx"] < base_speed * 0.4:
                    h["vx"] = base_speed * 0.4
                if h["charge_timer"] % 6 == 0:
                    self.spawn_particles(h["x"] + h["w"]/2, h["y"] + h["h"], GOLD_GLOW, 1)

        h["vy"] += GRAVITY

        h["x"] += h["vx"]
        h["y"] += h["vy"]

        # ─── Platform Collisions (Y first, then X) ────────────────────────────
        was_ground = h.get("was_on_ground", False)
        h["on_ground"] = False
        for p in self.platforms:
            if self.rect_intersect(h, p):
                if h["vy"] > 0 and h["y"] + h["h"] - h["vy"] <= p["y"] + 8:
                    h["y"] = p["y"] - h["h"]
                    h["vy"] = 0
                    h["on_ground"] = True
                elif h["vy"] < 0 and h["y"] - h["vy"] >= p["y"] + p["h"] - 8:
                    h["y"] = p["y"] + p["h"]
                    h["vy"] = 0

        # Coyote time + landing juice + buffered jump
        if h["on_ground"]:
            h["coyote"] = COYOTE_FRAMES
            if not was_ground:
                self.spawn_particles(h["x"] + h["w"]/2, h["y"] + h["h"], WHITE, 4)
            # Consume jump buffer on landing
            if h.get("jump_buffer", 0) > 0 and not h["is_charging"]:
                h["vy"] = JUMP_FORCE
                h["on_ground"] = False
                h["coyote"] = 0
                h["jump_buffer"] = 0
                self.spawn_particles(h["x"] + h["w"]/2, h["y"] + h["h"], WHITE, 5)
                self.play_sfx(self.sfx_jump)
        else:
            if h.get("coyote", 0) > 0:
                h["coyote"] -= 1
            # Keep buffer alive while holding so early air-taps still land-jump
            if h.get("jump_buffer", 0) > 0 and not h["is_charging"]:
                h["jump_buffer"] -= 1
        h["was_on_ground"] = h["on_ground"]

        for p in self.platforms:
            if self.rect_intersect(h, p):
                if h["vx"] > 0 and h["x"] + h["w"] - h["vx"] <= p["x"] + 8:
                    h["x"] = p["x"] - h["w"]
                    h["vx"] = 0
                elif h["vx"] < 0 and h["x"] - h["vx"] >= p["x"] + p["w"] - 8:
                    h["x"] = p["x"] + p["w"]
                    h["vx"] = 0

        if h["invincible"] > 0:
            h["invincible"] -= 1

        for i in range(len(self.enemies) - 1, -1, -1):
            e = self.enemies[i]
            etype = e.get("type", "patrol")

            if etype == "patrol":
                e["x"] += e["vx"]
                if e["x"] <= e["patrolStart"] or e["x"] + e["w"] >= e["patrolEnd"]:
                    e["vx"] *= -1
            elif etype == "floater":
                e["anim_timer"] += 1
                e["y"] = e["baseY"] + math.sin(e["anim_timer"] * 0.05) * e.get("amp", 30)
            elif etype == "jumper":
                e["x"] += e["vx"]
                if e["x"] <= e["patrolStart"] or e["x"] + e["w"] >= e["patrolEnd"]:
                    e["vx"] *= -1
                e["jump_timer"] += 1
                if e["on_ground"] and e["jump_timer"] > 90:
                    e["vy"] = -10
                    e["jump_timer"] = 0
                    e["on_ground"] = False
                e["vy"] += GRAVITY
                e["y"] += e["vy"]
                e["on_ground"] = False
                for p in self.platforms:
                    if (e["x"] < p["x"] + p["w"] and e["x"] + e["w"] > p["x"] and
                        e["y"] + e["h"] >= p["y"] and e["y"] + e["h"] - e["vy"] <= p["y"] + 5):
                        e["y"] = p["y"] - e["h"]
                        e["vy"] = 0
                        e["on_ground"] = True
                        break
            elif etype == "chaser":
                dist_x = h["x"] - e["x"]
                dist_y = abs(h["y"] - e["y"])
                if abs(dist_x) < 250 and dist_y < 120:
                    chase_speed = 2.5
                    if dist_x > 0:
                        e["x"] += chase_speed
                    else:
                        e["x"] -= chase_speed
                else:
                    e["x"] += e.get("vx", 0.5)
                    if e["x"] <= e["patrolStart"] or e["x"] + e["w"] >= e["patrolEnd"]:
                        e["vx"] = e.get("vx", 0.5) * -1

            e["anim_timer"] = e.get("anim_timer", 0) + 1

            star = h.get("star_timer", 0) > 0
            if self.rect_intersect(h, e) and (h["invincible"] <= 0 or star):
                stomped = h["vy"] > 0 and h["y"] + h["h"] - h["vy"] <= e["y"] + 10
                if stomped or star:
                    self.enemies.pop(i)
                    points = ENEMY_POINTS.get(etype, 100)
                    self.bump_combo()
                    self.add_score(points, e["x"] + e["w"]/2, e["y"])
                    h["vy"] = JUMP_FORCE * 0.75
                    self.spawn_particles(e["x"] + e["w"]/2, e["y"] + e["h"]/2, PARTICLE_ENEMY, 14)
                    self.play_sfx(self.sfx_stomp)
                    self.freeze_timer = 3  # micro hit-stop
                    self.screen_shake = max(self.screen_shake, 5)
                    if star and not stomped:
                        self.spawn_particles(e["x"] + e["w"]/2, e["y"], POWER_STAR, 8)
                else:
                    self.lives -= 1
                    self.level_hit = True
                    self.combo = 0
                    self.combo_mult = 1.0
                    self.combo_timer = 0
                    h["invincible"] = 60
                    h["vy"] = JUMP_FORCE * 0.5
                    h["vx"] = -5
                    self.freeze_timer = 8
                    self.screen_shake = 14
                    self.spawn_particles(h["x"] + h["w"]/2, h["y"] + h["h"]/2, PARTICLE_RED, 12)
                    if self.lives <= 0:
                        self.begin_end_sequence("gameover")

        # Coin collection (+ magnet attract)
        magnet = h.get("magnet_timer", 0) > 0
        for c in self.coins:
            if c["collected"]:
                continue
            if magnet:
                dx = (h["x"] + h["w"]/2) - c["x"]
                dy = (h["y"] + h["h"]/2) - c["y"]
                dist = math.hypot(dx, dy) + 0.01
                if dist < 120:
                    c["x"] += dx / dist * 3.5
                    c["y"] += dy / dist * 3.5
            if self.rect_intersect(h, {"x": c["x"]-10, "y": c["y"]-10, "w": 20, "h": 20}):
                c["collected"] = True
                self.level_coins_got += 1
                self.bump_combo()
                self.add_score(50, c["x"], c["y"])
                self.spawn_particles(c["x"], c["y"], COIN, 7)
                self.play_sfx(self.sfx_coin)

        # Power-ups
        for pu in self.powerups:
            if pu["collected"]:
                continue
            pu["bob"] = pu.get("bob", 0) + 0.08
            if self.rect_intersect(h, {"x": pu["x"]-8, "y": pu["y"]-8, "w": 16, "h": 16}):
                pu["collected"] = True
                kind = pu["kind"]
                if kind == "speed":
                    h["speed_timer"] = 300
                    col = POWER_SPEED
                    label = "SPEED!"
                elif kind == "star":
                    h["star_timer"] = 240
                    h["invincible"] = max(h["invincible"], 240)
                    col = POWER_STAR
                    label = "STAR!"
                else:
                    h["magnet_timer"] = 360
                    col = POWER_MAGNET
                    label = "MAGNET!"
                self.add_score(100, pu["x"], pu["y"], label)
                self.spawn_particles(pu["x"], pu["y"], col, 16)
                self.play_sfx(self.sfx_charge)
                self.screen_shake = max(self.screen_shake, 4)

        if self.rect_intersect(h, self.flag):
            self.add_score(500, h["x"], h["y"] - 20, "+500 CLEAR")
            self.compute_level_rank()
            self.level_idx += 1
            if self.level_idx >= len(levels):
                self.begin_end_sequence("win")
            else:
                self.state = "level_complete"
                self.transition_timer = 120
                self.spawn_particles(h["x"] + h["w"]/2, h["y"] + h["h"]/2, GOLD_GLOW, 28)
            return

        if h["y"] > 500:
            self.lives -= 1
            self.level_hit = True
            self.combo = 0
            self.combo_mult = 1.0
            self.freeze_timer = 6
            self.screen_shake = 10
            if self.lives <= 0:
                self.begin_end_sequence("gameover")
            else:
                start = levels[self.level_idx]["start"]
                h["x"] = start["x"]
                h["y"] = start["y"]
                h["vx"] = 0
                h["vy"] = 0
                h["invincible"] = 30

        target_cam = h["x"] - 220
        self.camera_x += (target_cam - self.camera_x) * 0.12
        if self.camera_x < 0:
            self.camera_x = 0

        for p in self.particles:
            p.update()
        self.particles = [p for p in self.particles if p.life > 0]

        for ft in self.float_texts:
            ft.update()
        self.float_texts = [ft for ft in self.float_texts if ft.life > 0]

        h["anim_timer"] += 1
        if h["anim_timer"] > 8:
            h["anim_timer"] = 0
            h["anim_frame"] = (h["anim_frame"] + 1) % 4

    def rect_intersect(self, a, b):
        """AABB collision check between two dicts with x,y,w,h."""
        return (a["x"] < b["x"] + b["w"] and
                a["x"] + a["w"] > b["x"] and
                a["y"] < b["y"] + b["h"] and
                a["y"] + a["h"] > b["y"])

    def spawn_particles(self, x, y, color, count=5):
        for _ in range(count):
            self.particles.append(Particle(x, y, color, size=random.randint(2, 5),
                                           life=random.randint(18, 36)))

    # ─── Scaling helpers ──────────────────────────────────────────────────────
    def _sx(self, x):
        return (x - self.camera_x) * self.scale_x + self.shake_x

    def _sy(self, y):
        return y * self.scale_y + self.shake_y

    def _sw(self, w):
        return w * self.scale_x

    def _sh(self, h):
        return h * self.scale_y

    def draw(self):
        self.canvas.delete("all")
        cam = self.camera_x
        sx, sy, sw, sh = self._sx, self._sy, self._sw, self._sh

        # Screen shake decay
        if self.screen_shake > 0:
            self.shake_x = random.randint(-self.screen_shake, self.screen_shake) * self.scale_x
            self.shake_y = random.randint(-self.screen_shake, self.screen_shake) * self.scale_y
            self.screen_shake -= 1
        else:
            self.shake_x = 0
            self.shake_y = 0

        # Stars background (parallax)
        for star in self.stars:
            sxi = (star["base_x"] + cam * 0.3) % DESIGN_W
            self.canvas.create_oval(
                sx(sxi) - star["r"], sy(star["y"]) - star["r"],
                sx(sxi) + star["r"], sy(star["y"]) + star["r"],
                fill=star["color"], outline=""
            )

        # Platforms
        for p in self.platforms:
            px = sx(p["x"])
            py = sy(p["y"])
            pw = sw(p["w"])
            ph = sh(p["h"])
            self.canvas.create_rectangle(px, py, px + pw, py + ph,
                                         fill=PLATFORM, outline=PLATFORM_TOP, width=2)
            self.canvas.create_rectangle(px, py, px + pw, py + sh(4),
                                         fill=PLATFORM_TOP, outline="")
            grid_step = max(10, int(20 * self.scale_x))
            for gx in range(0, int(p["w"]), 20):
                self.canvas.create_line(px + sw(gx), py, px + sw(gx), py + ph,
                                        fill=PLATFORM_TOP, width=1)

        # Coins
        for c in self.coins:
            if c["collected"]:
                continue
            bob = math.sin(self.root.tk.call("clock", "milliseconds") / 200 + c["x"]) * 3
            cx = sx(c["x"])
            cy = sy(c["y"] + bob)
            r = sw(8)
            self.canvas.create_oval(cx-r, cy-r, cx+r, cy+r, fill=COIN, outline="")
            self.canvas.create_oval(cx-sw(10), cy-sh(10), cx-sw(6), cy-sh(6), fill=COIN_LIGHT, outline="")

        # Power-ups
        for pu in getattr(self, "powerups", []):
            if pu["collected"]:
                continue
            bob = math.sin(pu.get("bob", 0)) * 4
            px = sx(pu["x"])
            py = sy(pu["y"] + bob)
            kind = pu["kind"]
            if kind == "speed":
                col = POWER_SPEED
            elif kind == "star":
                col = POWER_STAR
            else:
                col = POWER_MAGNET
            r = sw(9)
            self.canvas.create_oval(px-r, py-r, px+r, py+r, fill=col, outline=WHITE, width=2)
            self.canvas.create_oval(px-sw(4), py-sh(4), px+sw(2), py+sh(2), fill=WHITE, outline="")

        # Enemies
        for e in self.enemies:
            etype = e.get("type", "patrol")
            ex = sx(e["x"])
            ey = sy(e["y"])
            ew = sw(e["w"])
            eh = sh(e["h"])
            wobble = math.sin(e.get("anim_timer", 0) * 0.1) * 2 * self.scale_y

            if etype == "patrol":
                color = ENEMY
            elif etype == "floater":
                color = ENEMY_FLOAT
            elif etype == "jumper":
                color = ENEMY_JUMP
            elif etype == "chaser":
                color = ENEMY_CHASE
            else:
                color = ENEMY

            pad_x = sw(4)
            self.canvas.create_rectangle(ex+pad_x, ey+sh(8), ex+ew-pad_x, ey+eh,
                                         fill=color, outline="")
            self.canvas.create_polygon(ex+pad_x, ey+sh(8), ex+ew/2, ey+wobble, ex+ew-pad_x, ey+sh(8),
                                       fill=color, outline="")
            self.canvas.create_rectangle(ex+sw(8), ey+sh(14), ex+sw(12), ey+sh(18), fill=WHITE, outline="")
            self.canvas.create_rectangle(ex+sw(16), ey+sh(14), ex+sw(20), ey+sh(18), fill=WHITE, outline="")
            self.canvas.create_rectangle(ex+sw(10), ey+sh(15), ex+sw(12), ey+sh(17), fill=BLACK, outline="")
            self.canvas.create_rectangle(ex+sw(18), ey+sh(15), ex+sw(20), ey+sh(17), fill=BLACK, outline="")

            if etype == "floater":
                self.canvas.create_oval(ex+sw(10), ey+sh(2), ex+sw(14), ey+sh(6), fill=COIN_LIGHT, outline="")
            elif etype == "jumper":
                self.canvas.create_rectangle(ex+sw(10), ey+sh(2), ex+sw(14), ey+sh(6), fill=COIN_LIGHT, outline="")
            elif etype == "chaser":
                self.canvas.create_polygon(ex+sw(8), ey+sh(4), ex+sw(12), ey, ex+sw(16), ey+sh(4), fill=COIN_LIGHT, outline="")

        # Flag
        fx = sx(self.flag["x"])
        fy = sy(self.flag["y"])
        self.canvas.create_rectangle(fx, fy, fx+sw(4), fy+sh(self.flag["h"]), fill=FLAG_POLE, outline="")
        self.canvas.create_polygon(fx+sw(4), fy, fx+sw(30), fy+sh(15), fx+sw(4), fy+sh(30),
                                 fill=FLAG_POLE, outline="")

        # Hero - Happy Duck with Hat
        h = self.hero
        hx = sx(h["x"])
        hy = sy(h["y"])
        hw = sw(h["w"])
        hh = sh(h["h"])
        f = h["facing"]

        # Star aura / speed aura
        if h.get("star_timer", 0) > 0:
            pulse = 8 + 4 * math.sin(h.get("anim_timer", 0) * 0.4)
            self.canvas.create_oval(hx-sw(pulse), hy-sh(pulse), hx+hw+sw(pulse), hy+hh+sh(pulse),
                                    outline=POWER_STAR, width=3)
        if h.get("speed_timer", 0) > 0:
            self.canvas.create_oval(hx-sw(4), hy-sh(2), hx+hw+sw(4), hy+hh+sh(2),
                                    outline=POWER_SPEED, width=2)

        # Charge glow
        if h["is_charging"] and h["charge_timer"] > CHARGE_GRACE:
            glow = sw(10 + (h["charge_timer"] - CHARGE_GRACE) * 0.4)
            self.canvas.create_oval(hx+hw/2-glow, hy+hh/2-glow,
                                    hx+hw/2+glow, hy+hh/2+glow,
                                    outline=GOLD_GLOW, width=2)

        # Invincibility flicker
        if h["invincible"] > 0 and (h["invincible"] // 4) % 2 == 0:
            pass
        else:
            cx = hx + hw // 2
            cy = hy + hh // 2

            # Duck body (yellow oval)
            self.canvas.create_oval(hx-sw(2), hy+sh(4), hx+hw+sw(2), hy+hh-sh(2),
                                    fill=HERO, outline="")
            # Belly (lighter)
            self.canvas.create_oval(hx+sw(2), hy+sh(16), hx+hw-sw(2), hy+hh-sh(2),
                                    fill=HERO_BELLY, outline="")

            # Beak - direction based
            if f == 1:
                self.canvas.create_polygon(
                    hx+hw-sw(2), hy+sh(10), hx+hw+sw(10), hy+sh(14), hx+hw-sw(2), hy+sh(18),
                    fill=HERO_BEAK, outline="")
                self.canvas.create_oval(hx+sw(12), hy+sh(6), hx+sw(18), hy+sh(12), fill=WHITE, outline="")
                self.canvas.create_oval(hx+sw(14), hy+sh(8), hx+sw(16), hy+sh(10), fill=BLACK, outline="")
                self.canvas.create_oval(hx-sw(6), hy+sh(14), hx+sw(6), hy+sh(24),
                                        fill=HERO, outline="#e6b800", width=1)
            else:
                self.canvas.create_polygon(
                    hx+sw(2), hy+sh(10), hx-sw(10), hy+sh(14), hx+sw(2), hy+sh(18),
                    fill=HERO_BEAK, outline="")
                self.canvas.create_oval(hx+sw(6), hy+sh(6), hx+sw(12), hy+sh(12), fill=WHITE, outline="")
                self.canvas.create_oval(hx+sw(8), hy+sh(8), hx+sw(10), hy+sh(10), fill=BLACK, outline="")
                self.canvas.create_oval(hx+hw-sw(6), hy+sh(14), hx+hw+sw(6), hy+sh(24),
                                        fill=HERO, outline="#e6b800", width=1)

            # Hat
            hat_x = cx - sw(8)
            hat_y = hy - sh(6)
            self.canvas.create_rectangle(hat_x-sw(4), hat_y+sh(4), hat_x+sw(20), hat_y+sh(8),
                                         fill=HERO_HAT, outline="")
            self.canvas.create_rectangle(hat_x, hat_y-sh(6), hat_x+sw(16), hat_y+sh(4),
                                         fill=HERO_HAT, outline="")
            self.canvas.create_line(hat_x+sw(16), hat_y, hat_x+sw(22), hat_y-sh(4),
                                    fill=COIN, width=2)

            # Feet
            foot_y = hy + hh - sh(2)
            if h["on_ground"] and abs(h["vx"]) > 0.1:
                leg_offset = math.sin(h["anim_frame"] * math.pi / 2) * 3 * self.scale_y
                self.canvas.create_rectangle(hx+sw(4), foot_y, hx+sw(10), foot_y+sh(6)+int(leg_offset),
                                             fill=HERO_BEAK, outline="")
                self.canvas.create_rectangle(hx+sw(14), foot_y, hx+sw(20), foot_y+sh(6)-int(leg_offset),
                                             fill=HERO_BEAK, outline="")
            else:
                self.canvas.create_rectangle(hx+sw(4), foot_y, hx+sw(10), foot_y+sh(6), fill=HERO_BEAK, outline="")
                self.canvas.create_rectangle(hx+sw(14), foot_y, hx+sw(20), foot_y+sh(6), fill=HERO_BEAK, outline="")

        # Particles
        for p in self.particles:
            if p.life > 0:
                r = max(1, p.size * min(self.scale_x, self.scale_y))
                self.canvas.create_oval(sx(p.x)-r, sy(p.y)-r, sx(p.x)+r, sy(p.y)+r,
                                        fill=p.color, outline="")
        # Float texts
        for ft in self.float_texts:
            if ft.life > 0:
                self.canvas.create_text(sx(ft.x), sy(ft.y), text=ft.text,
                                        font=("Consolas", 14, "bold"), fill=ft.color)


        # Charge bar
        if h["is_charging"] and h["charge_timer"] > CHARGE_GRACE:
            bar_w = sw(40)
            bar_h = sh(6)
            bar_x = sx(h["x"] + h["w"]/2 - 20)
            bar_y = sy(h["y"]) - sh(15)
            progress = min(1.0, (h["charge_timer"] - CHARGE_GRACE) / (CHARGE_SUPER - CHARGE_GRACE))
            self.canvas.create_rectangle(bar_x, bar_y, bar_x+bar_w, bar_y+bar_h, fill="#333333", outline="")
            self.canvas.create_rectangle(bar_x, bar_y, bar_x+bar_w*progress, bar_y+bar_h, fill=COIN, outline="")

        # Combo meter (on canvas)
        if getattr(self, "combo", 0) >= 2 and self.state == "playing":
            cm = self.combo_mult
            self.canvas.create_text(int(CANVAS_W * 0.5), 48,
                                    text=f"COMBO {self.combo}  x{cm:.1f}",
                                    font=("Consolas", 28, "bold"),
                                    fill=GOLD_GLOW if cm >= 2 else WHITE)

        # Active power-up icons
        if self.state == "playing":
            ax = 40
            if h.get("speed_timer", 0) > 0:
                self.canvas.create_oval(ax, 40, ax+28, 68, fill=POWER_SPEED, outline="")
                ax += 36
            if h.get("star_timer", 0) > 0:
                self.canvas.create_oval(ax, 40, ax+28, 68, fill=POWER_STAR, outline="")
                ax += 36
            if h.get("magnet_timer", 0) > 0:
                self.canvas.create_oval(ax, 40, ax+28, 68, fill=POWER_MAGNET, outline="")

        # HUD update
        self.score_label.config(text=f"Score: {self.score}")
        self.lives_label.config(text=f"Lives: {self.lives}")
        self.level_label.config(text=f"Level: {self.level_idx + 1}")
        self.high_label.config(text=f"Best: {self.high_score}")

        # Overlays (scaled to canvas size)
        if self.state == "menu":
            self.canvas.create_rectangle(0, 0, CANVAS_W, CANVAS_H, fill="black", stipple="gray50")

            # Main title block — shifted left so it doesn't collide with the board
            title_x = int(CANVAS_W * 0.38)
            self.menu_pulse = getattr(self, "menu_pulse", 0) + 1
            pulse = 1.0 + 0.03 * math.sin(self.menu_pulse * 0.08)
            self.canvas.create_text(title_x, int(CANVAS_H*0.18), text="ONE BUTTON HERO",
                                    font=("Consolas", int(52 * pulse), "bold"), fill=ACCENT)
            self.canvas.create_text(title_x, int(CANVAS_H*0.28), text="THE DUCKENING  ·  GOTY EDITION",
                                    font=("Consolas", 26), fill=HERO)
            self.canvas.create_text(title_x, int(CANVAS_H*0.40), text="Press ENTER to Start",
                                    font=("Consolas", 30), fill=WHITE)
            self.canvas.create_text(title_x, int(CANVAS_H*0.48),
                                    text="Tap = Jump     Hold = Super Jump",
                                    font=("Consolas", 16), fill="#aaaaaa")
            self.canvas.create_text(title_x, int(CANVAS_H*0.54),
                                    text="Stomp enemies · Grab power-ups · Chain combos for S-Ranks",
                                    font=("Consolas", 15), fill="#778899")
            self.canvas.create_text(title_x, int(CANVAS_H*0.60), text="X = Exit",
                                    font=("Consolas", 14), fill="#666666")
            status = getattr(self, "audio_status", "off")
            audio_col = "#2ecc71" if status.startswith("on") else "#e74c3c"
            self.canvas.create_text(title_x, int(CANVAS_H*0.68),
                                    text=f"Audio: {status}",
                                    font=("Consolas", 14), fill=audio_col)

            # High score board — pinned to the right edge
            board_w = 380
            margin = 40
            board_x = CANVAS_W - margin - board_w // 2
            board_top = int(CANVAS_H * 0.12)
            board_h = 480
            self.canvas.create_rectangle(
                board_x - board_w // 2, board_top - 10,
                board_x + board_w // 2, board_top + board_h,
                fill="#0d1b2a", outline=ACCENT, width=2
            )
            self.canvas.create_text(board_x, board_top + 20, text="TOP 10",
                                    font=("Consolas", 26, "bold"), fill=COIN)
            if not self.highscores:
                self.canvas.create_text(board_x, board_top + 70, text="No scores yet",
                                        font=("Consolas", 18), fill="#666666")
            else:
                for i, entry in enumerate(self.highscores[:MAX_HIGHSCORES]):
                    rank = i + 1
                    y = board_top + 60 + i * 40
                    color = COIN if rank == 1 else (WHITE if rank <= 3 else "#aaaaaa")
                    name = entry["name"][:10]
                    sc = entry["score"]
                    self.canvas.create_text(
                        board_x - board_w // 2 + 24, y, text=f"{rank:2d}. {name}",
                        font=("Consolas", 18, "bold"), fill=color, anchor="w"
                    )
                    self.canvas.create_text(
                        board_x + board_w // 2 - 24, y, text=f"{sc}",
                        font=("Consolas", 18), fill=color, anchor="e"
                    )

        elif self.state == "level_complete":
            self.canvas.create_rectangle(0, 0, CANVAS_W, CANVAS_H, fill="black", stipple="gray25")
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.28), text=f"LEVEL {self.level_idx} CLEAR!",
                                    font=("Consolas", 52, "bold"), fill=COIN)
            rank = getattr(self, "level_rank", "C")
            rank_col = {"S": RANK_S, "A": RANK_A, "B": RANK_B, "C": RANK_C}.get(rank, WHITE)
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.42), text=f"RANK  {rank}",
                                    font=("Consolas", 72, "bold"), fill=rank_col)
            if getattr(self, "level_bonus", 0):
                self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.54),
                                        text=f"Bonus +{self.level_bonus}",
                                        font=("Consolas", 28), fill=GOLD_GLOW)
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.64), text=f"Score: {self.score}",
                                    font=("Consolas", 28), fill=WHITE)
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.74), text="Get ready...",
                                    font=("Consolas", 22), fill="#888888")

        elif self.state == "enter_name":
            self.canvas.create_rectangle(0, 0, CANVAS_W, CANVAS_H, fill="black", stipple="gray50")
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.28), text="NEW HIGH SCORE!",
                                    font=("Consolas", 56, "bold"), fill=COIN)
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.40), text=f"Score: {self.score}",
                                    font=("Consolas", 36), fill=WHITE)
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.52), text="Enter your name:",
                                    font=("Consolas", 28), fill="#cccccc")
            display = self.name_input
            if self.name_cursor_timer < 20:
                display += "_"
            self.canvas.create_rectangle(
                CANVAS_W//2 - 220, int(CANVAS_H*0.58) - 30,
                CANVAS_W//2 + 220, int(CANVAS_H*0.58) + 30,
                fill="#1a1a2e", outline=ACCENT, width=2
            )
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.58), text=display or " ",
                                    font=("Consolas", 36, "bold"), fill=HERO)
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.70), text="Type name  ·  ENTER to confirm",
                                    font=("Consolas", 22), fill="#888888")
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.78), text="(Blank = HERO)",
                                    font=("Consolas", 18), fill="#555555")

        elif self.state == "gameover":
            self.canvas.create_rectangle(0, 0, CANVAS_W, CANVAS_H, fill="black", stipple="gray50")
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.30), text="GAME OVER",
                                    font=("Consolas", 72, "bold"), fill=ACCENT)
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.45), text=f"Score: {self.score}",
                                    font=("Consolas", 36), fill=WHITE)
            if self.new_best:
                self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.55), text="SAVED TO HIGH SCORES!",
                                        font=("Consolas", 28, "bold"), fill=COIN)
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.68), text="Press ENTER to Restart",
                                    font=("Consolas", 36), fill=WHITE)
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.78), text="X = Exit",
                                    font=("Consolas", 22), fill="#666666")

        elif self.state == "win":
            self.canvas.create_rectangle(0, 0, CANVAS_W, CANVAS_H, fill="black", stipple="gray50")
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.22), text="YOU WIN!",
                                    font=("Consolas", 72, "bold"), fill=COIN)
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.36), text=f"Final Score: {self.score}",
                                    font=("Consolas", 40), fill=WHITE)
            if self.new_best:
                self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.48), text="SAVED TO HIGH SCORES!",
                                        font=("Consolas", 28, "bold"), fill=COIN)
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.60), text="Press ENTER to Play Again",
                                    font=("Consolas", 36), fill=WHITE)
            self.canvas.create_text(CANVAS_W//2, int(CANVAS_H*0.72), text="X = Exit",
                                    font=("Consolas", 22), fill="#666666")

    def game_loop(self):
        self.update()
        self.draw()
        self.root.after(16, self.game_loop)


def main():
    root = tk.Tk()
    game = Game(root)
    root.mainloop()


if __name__ == "__main__":
    main()
