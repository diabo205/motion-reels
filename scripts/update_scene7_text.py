import json

files = [
    'src/timelines/current_reel.json',
    'src/timelines/u2_incident_1960.json',
    'projects/u2-incident-1960/timeline.json'
]

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    for scene in data.get('scenes', []):
        if scene.get('sceneId') == 'SCENE_07_PROXIMITY_DETONATION':
            for layer in scene.get('textLayers', []):
                if 'TAIL SHEARED' in layer.get('text', ''):
                    layer['text'] = "TAIL SHEARED\nVIOLENT INVERTED SPIN"
    with open(fpath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    print("Updated", fpath)
