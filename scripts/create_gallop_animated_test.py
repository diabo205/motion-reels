import json

with open('projects/operation-cowboy-1945/plates/gallop_poses_data.json', 'r') as f:
    poses = json.load(f)

# Centers of mass:
# Pose 1: (287.7, 249.5)
# Pose 2: (243.5, 267.9)
# Pose 3: (315.3, 236.9)
# Pose 4: (246.9, 249.3)

target_x = 270.0
target_y = 255.0

offsets = [
    (target_x - 287.7, target_y - 249.5), # Pose 1: -17.7, +5.5
    (target_x - 243.5, target_y - 267.9), # Pose 2: +26.5, -12.9
    (target_x - 315.3, target_y - 236.9), # Pose 3: -45.3, +18.1
    (target_x - 246.9, target_y - 249.3), # Pose 4: +23.1, +5.7
]

html = f'''<!DOCTYPE html>
<html>
<head>
<style>
body {{ background: #0F1012; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }}
.stage {{ position: relative; width: 600px; height: 500px; background: #162636; border-radius: 12px; overflow: hidden; border: 2px solid #334155; }}
.glow {{ position: absolute; width: 400px; height: 300px; left: 100px; top: 100px; background: radial-gradient(circle, rgba(245,158,11,0.5) 0%, rgba(217,119,6,0.2) 50%, transparent 70%); }}
.ground {{ position: absolute; bottom: 80px; left: 0; right: 0; height: 2px; background: rgba(245,158,11,0.4); }}
.frame {{ position: absolute; inset: 0; display: none; }}
</style>
</head>
<body>
<h2>Gallop Animation Registration Test (4-Frame Cycle)</h2>
<div class="stage">
  <div class="glow"></div>
  <div class="ground"></div>
'''

for idx, p in enumerate(poses):
    pid = p['id']
    sil_d = p['silD']
    dark_d = p['darkD']
    dx, dy = offsets[idx]
    html += f'''
  <div class="frame" id="f{idx}">
    <svg width="600" height="500" viewBox="0 0 512 417">
      <g transform="translate({dx:.1f}, {dy:.1f})">
        <!-- Pure White Lipizzaner Coat -->
        <path d="{sil_d}" fill="#FFFFFF"/>
        <!-- Linocut Shadow Details -->
        <path d="{dark_d}" fill="#0F1012" fill-rule="evenodd"/>
      </g>
    </svg>
  </div>
    '''

html += '''
</div>
<div style="margin-top: 20px; font-size: 18px;">
  Current Pose: <span id="poseNum" style="color: #F59E0B; font-weight: bold;">1</span>
</div>

<script>
let cur = 0;
const frames = [document.getElementById('f0'), document.getElementById('f1'), document.getElementById('f2'), document.getElementById('f3')];
const label = document.getElementById('poseNum');

function update() {
  frames.forEach((f, i) => f.style.display = i === cur ? 'block' : 'none');
  label.innerText = (cur + 1);
  cur = (cur + 1) % 4;
}

update();
setInterval(update, 120); // ~8.3 fps = 7 frames @ 60fps
</script>
</body>
</html>
'''

with open('projects/operation-cowboy-1945/plates/gallop_animated_test.html', 'w') as f:
    f.write(html)

print('Saved gallop_animated_test.html!')
