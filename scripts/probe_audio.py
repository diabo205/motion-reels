import wave, struct, math, subprocess, os, tempfile

tmp_wav = os.path.join(tempfile.gettempdir(), 'probe22.wav')
subprocess.check_call(['ffmpeg', '-y', '-i', 'assets/audio/bgm_cowboy.mp3', '-ss', '18', '-t', '10', '-ac', '1', '-ar', '44100', tmp_wav, '-loglevel', 'error'])
with wave.open(tmp_wav, 'rb') as w:
    n = w.getnframes()
    samples = struct.unpack(f'<{n}h', w.readframes(n))

sr = 44100
chunk = sr // 10
for i in range(0, len(samples) - chunk, chunk):
    t = 18.0 + (i / sr)
    rms = math.sqrt(sum(s*s for s in samples[i:i+chunk]) / chunk)
    bars = '#' * int(rms / 400)
    print(f"{t:5.2f}s: {bars}")
