import subprocess, json

# Let's inspect the entire first 80s of bgm_cowboy.mp3
cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", "assets/audio/bgm_cowboy.mp3"]
dur = float(subprocess.check_output(cmd, text=True).strip())
print(f"Total duration: {dur}s")

# Let's check volume across 5-second intervals from 0 to 60s
for sec in range(0, 60, 5):
    cmd = ["ffmpeg", "-ss", str(sec), "-t", "5", "-i", "assets/audio/bgm_cowboy.mp3", "-af", "volumedetect", "-f", "null", "-"]
    res = subprocess.run(cmd, stderr=subprocess.PIPE, stdout=subprocess.DEVNULL, text=True)
    mean_vol = [line for line in res.stderr.splitlines() if "mean_volume" in line]
    max_vol = [line for line in res.stderr.splitlines() if "max_volume" in line]
    print(f"{sec:02d}s-{sec+5:02d}s: {mean_vol[0] if mean_vol else ''} | {max_vol[0] if max_vol else ''}")
