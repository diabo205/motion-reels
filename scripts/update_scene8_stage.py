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
        if scene.get('sceneId') == 'SCENE_08_BAILOUT_CURARE_COIN':
            scene['visualPayload']['stageStyle'] = "NIGHT_FELT"
            scene['visualPayload']['skyGradient'] = [
                "#050814",
                "#0E182A",
                "#253A52"
            ]
    with open(fpath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    print("Updated", fpath)
