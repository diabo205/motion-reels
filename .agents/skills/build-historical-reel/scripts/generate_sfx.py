#!/usr/bin/env python3
"""
Generates procedural cinematic & tactile paper-craft sound effects for historical motion reels.
Outputs 16-bit 44.1kHz mono WAV files into both assets/audio/sfx/ and public/audio/sfx/.
"""
import math
import os
import random
import struct
import wave

SAMPLE_RATE = 44100


def write_wav(filename: str, samples: list):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with wave.open(filename, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(SAMPLE_RATE)
        int_samples = [max(-32767, min(32767, int(s * 32767))) for s in samples]
        raw_data = struct.pack(f'<{len(int_samples)}h', *int_samples)
        wf.writeframes(raw_data)
    print(f"[OK] Generated SFX: {filename} ({len(samples)} samples, {len(samples)/SAMPLE_RATE:.2f}s)")


def make_sub_boom():
    # 1.2s deep pitch drop from 95Hz down to 32Hz with exponential decay
    dur = 1.2
    n = int(SAMPLE_RATE * dur)
    samples = []
    phase = 0.0
    for i in range(n):
        t = i / SAMPLE_RATE
        freq = 95.0 * math.exp(-t * 2.8) + 30.0
        phase += 2 * math.pi * freq / SAMPLE_RATE
        env = math.exp(-t * 3.2)
        sig = math.sin(phase) + 0.3 * math.sin(phase * 0.5)
        if t < 0.02:
            sig += (1.0 - t / 0.02) * (random.random() * 2 - 1) * 0.5
        samples.append(math.tanh(sig * 1.5) * env * 0.95)
    return samples


def make_radar_ping():
    # 0.45s clean 1350Hz ping with rapid decay
    dur = 0.45
    n = int(SAMPLE_RATE * dur)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        sig = math.sin(2 * math.pi * 1350 * t) + 0.25 * math.sin(2 * math.pi * 2700 * t)
        env = math.exp(-t * 9.5)
        samples.append(sig * env * 0.8)
    return samples


def make_stamp_slam():
    # 0.7s heavy mechanical / rubber ink stamp thud with paper slap transient
    dur = 0.7
    n = int(SAMPLE_RATE * dur)
    samples = []
    phase = 0.0
    for i in range(n):
        t = i / SAMPLE_RATE
        freq = 155.0 * math.exp(-t * 9.0) + 38.0
        phase += 2 * math.pi * freq / SAMPLE_RATE
        env = math.exp(-t * 5.2)
        noise = (random.random() * 2 - 1) * math.exp(-t * 28.0) * 0.75
        sig = math.sin(phase) + noise
        samples.append(math.tanh(sig * 2.2) * env * 0.92)
    return samples


def make_artillery_shell():
    # 1.4s deep whoosh and distant heavy artillery blast
    dur = 1.4
    n = int(SAMPLE_RATE * dur)
    samples = []
    phase = 0.0
    for i in range(n):
        t = i / SAMPLE_RATE
        freq = 60.0 + 30.0 * math.sin(t * 12.0)
        phase += 2 * math.pi * freq / SAMPLE_RATE
        noise = (random.random() * 2 - 1) * 0.4
        env = math.exp(-t * 2.5) if t > 0.05 else (t / 0.05)
        sig = (math.sin(phase) * 0.6 + noise * 0.4) * env
        samples.append(math.tanh(sig * 1.8) * 0.85)
    return samples


def make_typewriter_tick():
    # 0.06s sharp mechanical telex tick
    dur = 0.06
    n = int(SAMPLE_RATE * dur)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 90.0)
        sig = (math.sin(2 * math.pi * 3200 * t) + (random.random() * 2 - 1) * 0.7) * env
        samples.append(sig * 0.8)
    return samples


def make_rifle_crack():
    # 0.5s sharp explosive snap
    dur = 0.5
    n = int(SAMPLE_RATE * dur)
    samples = []
    for i in range(n):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 12.0)
        noise = (random.random() * 2 - 1) * (1.0 if t < 0.02 else math.exp(-t * 20.0))
        sig = (noise + 0.4 * math.sin(2 * math.pi * 440 * math.exp(-t * 10) * t)) * env
        samples.append(math.tanh(sig * 2.2) * 0.9)
    return samples


def make_typewriter_burst():
    # 0.65s rapid mechanical typewriter clatter (9 key strikes + subtle carriage bell)
    dur = 0.65
    n = int(SAMPLE_RATE * dur)
    samples = [0.0] * n
    strike_times = [0.0, 0.055, 0.11, 0.16, 0.22, 0.275, 0.33, 0.39, 0.45]
    random.seed(42)
    for st in strike_times:
        start_idx = int(st * SAMPLE_RATE)
        pitch = 2600 + random.randint(-350, 450)
        for j in range(int(0.045 * SAMPLE_RATE)):
            if start_idx + j >= n:
                break
            lt = j / SAMPLE_RATE
            env = math.exp(-lt * 110.0)
            click = (
                math.sin(2 * math.pi * pitch * lt) * 0.55
                + math.sin(2 * math.pi * (pitch * 0.42) * lt) * 0.35
                + (random.random() * 2 - 1) * 0.65
            ) * env
            samples[start_idx + j] += click * 0.75
    # Subtle carriage return ding at 0.50s
    bell_start = int(0.50 * SAMPLE_RATE)
    for j in range(n - bell_start):
        lt = j / SAMPLE_RATE
        env = math.exp(-lt * 22.0)
        bell = (math.sin(2 * math.pi * 2180 * lt) + 0.4 * math.sin(2 * math.pi * 4360 * lt)) * env * 0.32
        samples[bell_start + j] += bell
    return [math.tanh(s * 1.4) * 0.88 for s in samples]


def make_paper_rip():
    # 0.28s crisp tactile cardstock tear / paper slide whoosh
    dur = 0.28
    n = int(SAMPLE_RATE * dur)
    samples = []
    random.seed(101)
    prev = 0.0
    for i in range(n):
        t = i / SAMPLE_RATE
        # Band-shaped envelope with flutter
        env = math.sin(math.pi * (t / dur)) ** 0.7 * (0.75 + 0.25 * math.sin(2 * math.pi * 65 * t))
        white = random.random() * 2 - 1
        # High-passed crinkle texture
        hp = white - 0.65 * prev
        prev = white
        samples.append(math.tanh(hp * env * 1.6) * 0.82)
    return samples


def make_counter_roll():
    # 0.80s rapid mechanical odometer/counter ticks
    dur = 0.80
    n = int(SAMPLE_RATE * dur)
    samples = [0.0] * n
    t_cursor = 0.0
    step = 0.042
    while t_cursor < dur - 0.05:
        idx = int(t_cursor * SAMPLE_RATE)
        for j in range(int(0.025 * SAMPLE_RATE)):
            if idx + j >= n:
                break
            lt = j / SAMPLE_RATE
            env = math.exp(-lt * 150.0)
            sig = (math.sin(2 * math.pi * 1850 * lt) + 0.5 * math.sin(2 * math.pi * 3700 * lt)) * env
            samples[idx + j] += sig * 0.75
        t_cursor += step
        step *= 1.04
    return [math.tanh(s * 1.3) * 0.85 for s in samples]


def make_metal_clang():
    # 0.65s sharp metallic latch / prison bar / cockpit lock clang
    dur = 0.65
    n = int(SAMPLE_RATE * dur)
    samples = []
    freqs = [420.0, 785.0, 1190.0, 1640.0, 2310.0]
    for i in range(n):
        t = i / SAMPLE_RATE
        env = math.exp(-t * 7.5)
        ring = sum(math.sin(2 * math.pi * f * t) * (0.35 / (idx + 1)) for idx, f in enumerate(freqs))
        impact = ((random.random() * 2 - 1) * math.exp(-t * 45.0) * 0.8) if t < 0.08 else 0.0
        samples.append(math.tanh((ring + impact) * 2.1) * env * 0.9)
    return samples


def make_memorial_wind():
    dur = 1.4
    n = int(SAMPLE_RATE * dur)
    samples = []
    b0 = b1 = b2 = 0.0
    for i in range(n):
        t = i / SAMPLE_RATE
        white = random.random() * 2.0 - 1.0
        b0 = 0.99765 * b0 + white * 0.0990460
        b1 = 0.96300 * b1 + white * 0.2965164
        b2 = 0.57000 * b2 + white * 1.0526913
        pink = b0 + b1 + b2 + white * 0.1848
        if t < 0.35:
            env = 0.5 * (1.0 - math.cos(math.pi * t / 0.35))
        else:
            env = math.exp(-(t - 0.35) * 2.8)
        sub = math.sin(2 * math.pi * 55.0 * t) * 0.35
        sig = (pink * 0.25 + sub) * env * 0.65
        samples.append(max(-1.0, min(1.0, sig)))
    return samples


def main():
    sfx_map = {
        "sub_boom.wav": make_sub_boom(),
        "radar_ping.wav": make_radar_ping(),
        "stamp_slam.wav": make_stamp_slam(),
        "artillery_shell.wav": make_artillery_shell(),
        "typewriter_tick.wav": make_typewriter_tick(),
        "rifle_crack.wav": make_rifle_crack(),
        "typewriter_burst.wav": make_typewriter_burst(),
        "paper_rip.wav": make_paper_rip(),
        "counter_roll.wav": make_counter_roll(),
        "metal_clang.wav": make_metal_clang(),
        "memorial_wind.wav": make_memorial_wind(),
    }
    for target_dir in [os.path.join("assets", "audio", "sfx"), os.path.join("public", "audio", "sfx")]:
        for fname, pcm in sfx_map.items():
            write_wav(os.path.join(target_dir, fname), pcm)
    print(f"[ALL DONE] Generated {len(sfx_map)} procedural cinematic & tactile SFX files.")


if __name__ == "__main__":
    main()
