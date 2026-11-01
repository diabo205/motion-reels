import json

with open('projects/operation-cowboy-1945/plates/gallop_poses_data.json', 'r') as f:
    poses = json.load(f)

html = '''<!DOCTYPE html>
<html>
<head>
<style>
body { background: #0F1012; color: #fff; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.card { background: #1C1917; padding: 20px; border-radius: 8px; border: 1px solid #333; text-align: center; }
svg { background: #162636; border-radius: 6px; }
</style>
</head>
<body>
<h1>Gallop Poses Test (White Lipizzaner Styling on Dark Canvas)</h1>
<div class="grid">
'''

for p in poses:
    pid = p['id']
    sil_d = p['silD']
    dark_d = p['darkD']
    html += f'''
    <div class="card">
        <h3>Pose {pid}</h3>
        <svg width="450" height="360" viewBox="0 0 512 417">
            <!-- Horizon amber glow -->
            <ellipse cx="256" cy="200" rx="200" ry="120" fill="#D97706" opacity="0.4"/>
            <!-- Layer 1: Solid Ivory Body -->
            <path d="{sil_d}" fill="#FFFFFF"/>
            <!-- Layer 2: Dark Linocut Details / Mane / Hooves -->
            <path d="{dark_d}" fill="#0F1012" fill-rule="evenodd"/>
        </svg>
    </div>
    '''

html += '''
</div>
</body>
</html>
'''

with open('projects/operation-cowboy-1945/plates/gallop_poses_preview.html', 'w') as f:
    f.write(html)

print('Saved gallop_poses_preview.html!')
