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
            scene['headerContext'] = "15,000 FT • EMERGENCY ESCAPE"
            scene['textLayers'] = [
                {
                    "text": "CANOPY JETTISONED • -9G CENTRIFUGAL SPIN",
                    "triggerFrameOffset": 0,
                    "tier": "PRIMARY_STATEMENT",
                    "colorToken": "MUTED_CREAM",
                    "animation": "HARD_POP"
                },
                {
                    "text": "DESTRUCT SWITCHES UNREACHED\nPARACHUTE BLOOMS AT 15,000 FT",
                    "triggerFrameOffset": 138,
                    "tier": "SECONDARY_ACCENT",
                    "colorToken": "ALERT_RED",
                    "animation": "SCALE_SLAM",
                    "handwrittenNote": "Ejected without detonating self-destruct charges"
                }
            ]
    with open(fpath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    print("Updated", fpath)
