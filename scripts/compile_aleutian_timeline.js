const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const schemaPath = path.resolve('.agents/skills/build-historical-reel/schemas/timeline.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const timeline = {
  "$schema": "../../.agents/skills/build-historical-reel/schemas/timeline.schema.json",
  "meta": {
    "title": "1942 ALEUTIAN CAMPAIGN",
    "flagEmoji": "\uD83C\uDDFA\uD83C\uDDF8 \u2744\uFE0F \uD83C\uDDEF\uD83C\uDDF5",
    "fps": 60,
    "width": 1080,
    "height": 1920,
    "bpm": 113,
    "bgmFile": "audio/bgm_aleutian.mp3",
    "bgmStartFrom": 0,
    "palette": "POLAR_MARITIME",
    "particleEmitter": "SNOW",
    "fontFamily": "Montserrat",
    "styleMode": "DOCUMENTARY_SANS"
  },
  "scenes": [
    {
      "sceneId": "SCENE_01_FORGOTTEN_INVASION",
      "startFrame": 0,
      "durationFrames": 128,
      "archetype": "SPLIT_CONFRONTATION",
      "hudVisible": true,
      "headerContext": "JUNE 1942 • ALASKA TERRITORY",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.6
      },
      "textLayers": [
        {
          "text": "THE FORGOTTEN WWII INVASION.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "JAPAN SEIZED AMERICAN SOIL.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_FORGOTTEN_INVASION_OPENING"
      },
      "sfxTriggers": [
        {
          "sfxFile": "sub_boom.wav",
          "frameOffset": 0
        }
      ]
    },
    {
      "sceneId": "SCENE_02_WILLIWAW_ARCHIPELAGO",
      "startFrame": 128,
      "durationFrames": 128,
      "archetype": "VECTOR_MAP",
      "hudVisible": false,
      "camera": {
        "movement": "PARALLAX_PAN_RIGHT",
        "intensity": 0.7
      },
      "textLayers": [
        {
          "text": "FROZEN VOLCANIC ISLANDS.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "WHIPPED BY ARCTIC GALES.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_ARCHIPELAGO_VECTOR_MAP"
      },
      "sfxTriggers": [
        {
          "sfxFile": "radar_ping.wav",
          "frameOffset": 0
        }
      ]
    },
    {
      "sceneId": "SCENE_03_DUTCH_HARBOR_RAID",
      "startFrame": 256,
      "durationFrames": 128,
      "archetype": "STRUCTURAL_FRACTURE",
      "hudVisible": true,
      "headerContext": "JUNE 3, 1942 • DUTCH HARBOR",
      "camera": {
        "movement": "IMPACT_SHAKE",
        "intensity": 0.85
      },
      "textLayers": [
        {
          "text": "CARRIERS STRUCK DUTCH HARBOR.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "BOMBS RAINED ON ALASKA.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_DUTCH_HARBOR_BOMBING"
      },
      "sfxTriggers": [
        {
          "sfxFile": "artillery_shell.wav",
          "frameOffset": 0
        },
        {
          "sfxFile": "sub_boom.wav",
          "frameOffset": 30
        }
      ]
    },
    {
      "sceneId": "SCENE_04_ATTU_KISKA_OCCUPIED",
      "startFrame": 384,
      "durationFrames": 126,
      "archetype": "LONE_LEADER",
      "hudVisible": true,
      "headerContext": "ATTU & KISKA ISLANDS",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.7
      },
      "textLayers": [
        {
          "text": "ATTU AND KISKA FELL.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "FIRST INVASION SINCE 1812.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_ATTU_KISKA_OCCUPATION_FLAG"
      },
      "sfxTriggers": [
        {
          "sfxFile": "stamp_slam.wav",
          "frameOffset": 30
        }
      ]
    },
    {
      "sceneId": "SCENE_05_AKUTAN_ZERO_CRASH",
      "startFrame": 510,
      "durationFrames": 136,
      "archetype": "VEHICLE_IN_TRANSIT",
      "hudVisible": true,
      "headerContext": "AKUTAN ISLAND BOG",
      "camera": {
        "movement": "PARALLAX_PAN_RIGHT",
        "intensity": 0.8
      },
      "textLayers": [
        {
          "text": "ONE DAMAGED ZERO FIGHTER.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "CRASHED INTACT IN A BOG.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_AKUTAN_ZERO_BOG_CRASH"
      },
      "sfxTriggers": [
        {
          "sfxFile": "sub_boom.wav",
          "frameOffset": 0
        },
        {
          "sfxFile": "metal_clang.wav",
          "frameOffset": 30
        }
      ]
    },
    {
      "sceneId": "SCENE_06_AKUTAN_ZERO_BLUEPRINT",
      "startFrame": 646,
      "durationFrames": 136,
      "archetype": "VECTOR_MAP",
      "hudVisible": false,
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.7
      },
      "textLayers": [
        {
          "text": "AMERICA SALVAGED THE WRECK.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "EXPOSING EVERY FATAL FLAW.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_AKUTAN_ZERO_SCHEMATIC"
      },
      "sfxTriggers": [
        {
          "sfxFile": "typewriter_burst.wav",
          "frameOffset": 5
        },
        {
          "sfxFile": "stamp_slam.wav",
          "frameOffset": 30
        }
      ]
    },
    {
      "sceneId": "SCENE_07_BLIND_FOG_SORTIES",
      "startFrame": 782,
      "durationFrames": 136,
      "archetype": "VEHICLE_IN_TRANSIT",
      "hudVisible": false,
      "camera": {
        "movement": "PARALLAX_PAN_RIGHT",
        "intensity": 0.75
      },
      "textLayers": [
        {
          "text": "BLINDING BERING SEA FOG.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "SWALLOWED BOMBERS WHOLE.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_B24_FOG_MOUNTAIN_HAZARD"
      },
      "sfxTriggers": [
        {
          "sfxFile": "sub_boom.wav",
          "frameOffset": 0
        }
      ]
    },
    {
      "sceneId": "SCENE_08_KOMANDORSKI_NAVAL_DUEL",
      "startFrame": 918,
      "durationFrames": 136,
      "archetype": "VEHICLE_IN_TRANSIT",
      "hudVisible": true,
      "headerContext": "MARCH 1943 • BERING SEA",
      "camera": {
        "movement": "IMPACT_SHAKE",
        "intensity": 0.75
      },
      "textLayers": [
        {
          "text": "OUTGUNNED CRUISERS HELD FIRM.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "CHOKED JAPAN'S SUPPLY LINE.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_KOMANDORSKI_CRUISER_DUEL"
      },
      "sfxTriggers": [
        {
          "sfxFile": "artillery_shell.wav",
          "frameOffset": 0
        }
      ]
    },
    {
      "sceneId": "SCENE_09_ATTU_AMPHIBIOUS_LANDING",
      "startFrame": 1054,
      "durationFrames": 136,
      "archetype": "CROWD_TALLY",
      "hudVisible": true,
      "headerContext": "MAY 11, 1943 • ATTU ISLAND",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.75
      },
      "textLayers": [
        {
          "text": "ELEVEN THOUSAND TROOPS LANDED.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "ONTO FROZEN ATTU BEACHES.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_ATTU_AMPHIBIOUS_LANDING",
        "counterConfig": {
          "label": "TROOPS LANDED",
          "startValue": 0,
          "endValue": 11000
        }
      },
      "sfxTriggers": [
        {
          "sfxFile": "counter_roll.wav",
          "frameOffset": 10
        },
        {
          "sfxFile": "sub_boom.wav",
          "frameOffset": 30
        }
      ]
    },
    {
      "sceneId": "SCENE_10_SNIPERS_IN_THE_MIST",
      "startFrame": 1190,
      "durationFrames": 136,
      "archetype": "SPLIT_CONFRONTATION",
      "hudVisible": false,
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.8
      },
      "textLayers": [
        {
          "text": "JAPAN HELD THE HIGH PEAKS.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "FIRING DOWN THROUGH MIST.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_HIGH_RIDGE_MIST_FIRE"
      },
      "sfxTriggers": [
        {
          "sfxFile": "rifle_crack.wav",
          "frameOffset": 10
        },
        {
          "sfxFile": "rifle_crack.wav",
          "frameOffset": 35
        }
      ]
    },
    {
      "sceneId": "SCENE_11_FROSTBITE_TRENCH_FOOT",
      "startFrame": 1326,
      "durationFrames": 136,
      "archetype": "CROWD_TALLY",
      "hudVisible": false,
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.65
      },
      "textLayers": [
        {
          "text": "BOOTS FROZE SOLID IN MUD.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "FROSTBITE CRIPPLED THOUSANDS.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_TUNDRA_FROSTBITE_TOLL",
        "counterConfig": {
          "label": "CASUALTIES",
          "startValue": 0,
          "endValue": 2100
        }
      },
      "sfxTriggers": [
        {
          "sfxFile": "counter_roll.wav",
          "frameOffset": 10
        }
      ]
    },
    {
      "sceneId": "SCENE_12_CASTNERS_CUTTHROATS",
      "startFrame": 1462,
      "durationFrames": 136,
      "archetype": "LONE_LEADER",
      "hudVisible": true,
      "headerContext": "ALASKA SCOUTS • COLD MOUNTAIN",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.8
      },
      "textLayers": [
        {
          "text": "ALASKA SCOUTS SCALED CLIFFS.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "BREAKING THE MOUNTAIN LINE.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_CASTNERS_CUTTHROATS_CLIMB"
      },
      "sfxTriggers": [
        {
          "sfxFile": "metal_clang.wav",
          "frameOffset": 15
        }
      ]
    },
    {
      "sceneId": "SCENE_13_ENGINEER_HILL_BANZAI",
      "startFrame": 1598,
      "durationFrames": 136,
      "archetype": "STRUCTURAL_FRACTURE",
      "hudVisible": true,
      "headerContext": "MAY 29, 1943 • ENGINEER HILL",
      "camera": {
        "movement": "IMPACT_SHAKE",
        "intensity": 0.95
      },
      "textLayers": [
        {
          "text": "A DESPERATE DAWN CHARGE.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "HAND-TO-HAND IN THE SNOW.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_ENGINEER_HILL_BANZAI"
      },
      "sfxTriggers": [
        {
          "sfxFile": "artillery_shell.wav",
          "frameOffset": 0
        },
        {
          "sfxFile": "rifle_crack.wav",
          "frameOffset": 30
        }
      ]
    },
    {
      "sceneId": "SCENE_14_ATTU_GARRISON_TOLL",
      "startFrame": 1734,
      "durationFrames": 136,
      "archetype": "CROWD_TALLY",
      "hudVisible": false,
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.7
      },
      "textLayers": [
        {
          "text": "TWO THOUSAND DEFENDERS DIED.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "ONLY TWENTY-EIGHT SURVIVED.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_ATTU_SURVIVOR_TALLY",
        "counterConfig": {
          "label": "SURVIVORS",
          "startValue": 2351,
          "endValue": 28
        }
      },
      "sfxTriggers": [
        {
          "sfxFile": "counter_roll.wav",
          "frameOffset": 10
        },
        {
          "sfxFile": "stamp_slam.wav",
          "frameOffset": 30
        }
      ]
    },
    {
      "sceneId": "SCENE_15_FORTRESS_KISKA_TARGET",
      "startFrame": 1870,
      "durationFrames": 136,
      "archetype": "VECTOR_MAP",
      "hudVisible": true,
      "headerContext": "JULY 1943 • KISKA ISLAND",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.7
      },
      "textLayers": [
        {
          "text": "ONE STRONGHOLD REMAINED.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "FIVE THOUSAND MEN ON KISKA.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_KISKA_FORTRESS_MAP"
      },
      "sfxTriggers": [
        {
          "sfxFile": "radar_ping.wav",
          "frameOffset": 0
        }
      ]
    },
    {
      "sceneId": "SCENE_16_KIMURA_FOG_ESCAPE",
      "startFrame": 2006,
      "durationFrames": 136,
      "archetype": "VEHICLE_IN_TRANSIT",
      "hudVisible": true,
      "headerContext": "JULY 28, 1943 • SECRET EVACUATION",
      "camera": {
        "movement": "PARALLAX_PAN_RIGHT",
        "intensity": 0.85
      },
      "textLayers": [
        {
          "text": "EIGHT WARSHIPS SLIPPED IN.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "VANISHING IN FIFTY-FIVE MINUTES.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_KIMURA_FOG_EVACUATION"
      },
      "sfxTriggers": [
        {
          "sfxFile": "sub_boom.wav",
          "frameOffset": 0
        }
      ]
    },
    {
      "sceneId": "SCENE_17_BOMBING_EMPTY_ROCK",
      "startFrame": 2142,
      "durationFrames": 136,
      "archetype": "STRUCTURAL_FRACTURE",
      "hudVisible": false,
      "camera": {
        "movement": "IMPACT_SHAKE",
        "intensity": 0.8
      },
      "textLayers": [
        {
          "text": "ALLIED GUNS POUNDED ROCK.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "BOMBING AN EMPTY ISLAND.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_EMPTY_ISLAND_BOMBARDMENT"
      },
      "sfxTriggers": [
        {
          "sfxFile": "artillery_shell.wav",
          "frameOffset": 0
        }
      ]
    },
    {
      "sceneId": "SCENE_18_OPERATION_COTTAGE_LANDING",
      "startFrame": 2278,
      "durationFrames": 136,
      "archetype": "LONE_LEADER",
      "hudVisible": true,
      "headerContext": "AUGUST 15, 1943 • KISKA",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.75
      },
      "textLayers": [
        {
          "text": "ALLIED TROOPS STORMED ASHORE.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "NOBODY WAS THERE.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_OPERATION_COTTAGE_EMPTY_BEACH"
      },
      "sfxTriggers": [
        {
          "sfxFile": "metal_clang.wav",
          "frameOffset": 15
        }
      ]
    },
    {
      "sceneId": "SCENE_19_FRIENDLY_FIRE_IN_FOG",
      "startFrame": 2414,
      "durationFrames": 136,
      "archetype": "SPLIT_CONFRONTATION",
      "hudVisible": false,
      "camera": {
        "movement": "IMPACT_SHAKE",
        "intensity": 0.85
      },
      "textLayers": [
        {
          "text": "SOLDIERS FIRED AT SHADOWS.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "TRAPPED BY MINES AND FOG.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_FRIENDLY_FIRE_FOG_PHANTOMS"
      },
      "sfxTriggers": [
        {
          "sfxFile": "rifle_crack.wav",
          "frameOffset": 10
        },
        {
          "sfxFile": "artillery_shell.wav",
          "frameOffset": 30
        }
      ]
    },
    {
      "sceneId": "SCENE_20_KISKA_GHOST_CASUALTIES",
      "startFrame": 2550,
      "durationFrames": 150,
      "archetype": "CROWD_TALLY",
      "hudVisible": false,
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.7
      },
      "textLayers": [
        {
          "text": "OVER THREE HUNDRED CASUALTIES.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "FIGHTING AN EMPTY ISLAND.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_KISKA_GHOST_TOLL_COUNTER",
        "counterConfig": {
          "label": "CASUALTIES",
          "startValue": 0,
          "endValue": 313
        }
      },
      "sfxTriggers": [
        {
          "sfxFile": "counter_roll.wav",
          "frameOffset": 10
        },
        {
          "sfxFile": "stamp_slam.wav",
          "frameOffset": 30
        }
      ]
    },
    {
      "sceneId": "SCENE_21_ALEUTIAN_EPILOGUE",
      "startFrame": 2700,
      "durationFrames": 180,
      "archetype": "LONE_LEADER",
      "hudVisible": true,
      "headerContext": "THE FORGOTTEN CAMPAIGN",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.6
      },
      "textLayers": [
        {
          "text": "FOUR THOUSAND LIVES LOST.",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "RECLAIMING AMERICAN SOIL.",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "HARD_POP"
        }
      ],
      "visualPayload": {
        "svgForegroundAsset": "ALEUTIAN_EPILOGUE_MEMORIAL_STAGE"
      },
      "sfxTriggers": [
        {
          "sfxFile": "sub_boom.wav",
          "frameOffset": 0
        },
        {
          "sfxFile": "stamp_slam.wav",
          "frameOffset": 30
        }
      ]
    }
  ]
};

// 1. AJV Schema Validation
const ajv = new Ajv();
const validate = ajv.compile(schema);
const valid = validate(timeline);

if (!valid) {
  console.error('AJV Schema Validation Errors:', JSON.stringify(validate.errors, null, 2));
  process.exit(1);
}
console.log('✅ AJV Schema Validation: PASSED!');

// 2. Constraints & Integrity Audit
let expectedFrame = 0;
let hasError = false;

for (let i = 0; i < timeline.scenes.length; i++) {
  const s = timeline.scenes[i];
  if (s.startFrame !== expectedFrame) {
    console.error(`❌ Frame discontinuity at scene ${s.sceneId}: expected ${expectedFrame}, got ${s.startFrame}`);
    hasError = true;
  }
  expectedFrame += s.durationFrames;
  
  if (s.durationFrames < 120 || s.durationFrames > 180) {
    console.error(`❌ Duration outside 120-180 window at ${s.sceneId}: ${s.durationFrames}f`);
    hasError = true;
  }
  
  const words = s.textLayers.map(l => l.text).join(' ').trim().split(/\s+/).length;
  if (words < 6 || words > 10) {
    console.error(`❌ Word budget violation at ${s.sceneId}: ${words} words`);
    hasError = true;
  }
  
  for (const l of s.textLayers) {
    if (l.text.length >= 40) {
      console.error(`❌ Line length violation at ${s.sceneId}: "${l.text}" (${l.text.length} chars)`);
      hasError = true;
    }
  }
  
  if (s.textLayers[0].triggerFrameOffset !== 0 || s.textLayers[1].triggerFrameOffset !== 30) {
    console.error(`❌ Timing offset violation at ${s.sceneId}: [${s.textLayers[0].triggerFrameOffset}, ${s.textLayers[1].triggerFrameOffset}]`);
    hasError = true;
  }
  
  if (s.camera.movement === 'SNAP_ZOOM') {
    console.error(`❌ Banned SNAP_ZOOM detected at ${s.sceneId}`);
    hasError = true;
  }
}

const totalSec = expectedFrame / timeline.meta.fps;
if (totalSec < 45.0 || totalSec > 58.5) {
  console.error(`❌ Duration ceiling violation: ${totalSec}s (must be between 45.0s and 58.5s)`);
  hasError = true;
}

if (hasError) {
  console.error('❌ Constraint validation failed!');
  process.exit(1);
}

console.log(`✅ Total Duration: ${expectedFrame} frames (${totalSec.toFixed(2)}s) — strictly within 45.0s-58.5s.`);
console.log(`✅ All ${timeline.scenes.length} scenes passed word budget, line length, offset, and camera constraints.`);

// 3. Write to the target destinations
const targets = [
  path.resolve('src/timelines/current_reel.json'),
  path.resolve('src/timelines/aleutian_campaign_1942.json'),
  path.resolve('projects/aleutian-campaign-1942/timeline.json')
];

const formattedJson = JSON.stringify(timeline, null, 2) + '\n';

for (const targetPath of targets) {
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(targetPath, formattedJson, 'utf8');
  console.log(`💾 Successfully saved timeline to: ${targetPath}`);
}

console.log('🎉 Aleutian Islands Campaign Timeline Compilation Complete!');
