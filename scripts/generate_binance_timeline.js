const fs = require('fs');

const timeline = {
  "$schema": "../../.agents/skills/build-historical-reel/schemas/timeline.schema.json",
  "meta": {
    "title": "2026 BINANCE HEIST",
    "flagEmoji": "🇰🇵 💻 ⚡ 🏦",
    "fps": 60,
    "width": 1080,
    "height": 1920,
    "bpm": 123.05,
    "bgmFile": "audio/bgm_binance.mp3",
    "bgmStartFrom": 0,
    "palette": "ESPIONAGE_DOSSIER",
    "particleEmitter": "DUST",
    "fontFamily": "Montserrat",
    "styleMode": "DOCUMENTARY_SANS",
    "safeZoneProfile": "CONSERVATIVE_UNION",
    "sensitivity": "STANDARD",
    "loopSeamless": true,
    "ctaConfig": {
      "text": "WATCH THE NETWORK",
      "subtext": "THE FRONT LINE IS DIGITAL"
    },
    "bgmLicense": {
      "source": "Project Audio Library",
      "licenseType": "LICENSED_COMMERCIAL",
      "clearanceId": "CLR-BINANCE-HEIST-2026",
      "attribution": "HELLBLADE - discipline"
    }
  },
  "scenes": [
    {
      "sceneId": "SCENE_01_ALERT_QUOTE_CARD",
      "startFrame": 0,
      "durationFrames": 146,
      "archetype": "QUOTE_CARD",
      "hudVisible": true,
      "headerContext": "CYBER ATTRIBUTION ALERT",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.85
      },
      "textLayers": [
        {
          "text": "IN TWENTY SILENT MINUTES",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "SIX BILLION DOLLARS VANISHED",
          "triggerFrameOffset": 29,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "LOCKED_CANVAS",
        "svgForegroundAsset": "BINANCE_ALERT_QUOTE_CARD",
        "quoteAttribution": "FBI CYBER DIVISION · 2026"
      },
      "sfxTriggers": [
        { "sfxFile": "sub_boom.wav", "frameOffset": 0 },
        { "sfxFile": "stamp_slam.wav", "frameOffset": 27 }
      ],
      "claim": {
        "text": "SIX BILLION DOLLARS DRAINED IN TWENTY MINUTES ACROSS TEN BLOCKCHAINS",
        "source": "FBI & TRM Labs Cyber Intelligence",
        "verified": true
      }
    },
    {
      "sceneId": "SCENE_02_KOREA_NIGHT_SATELLITE",
      "startFrame": 146,
      "durationFrames": 159,
      "archetype": "VECTOR_MAP",
      "hudVisible": true,
      "headerContext": "SATELLITE RECONNAISSANCE",
      "camera": {
        "movement": "PARALLAX_PAN_RIGHT",
        "intensity": 0.9
      },
      "textLayers": [
        {
          "text": "SEEN FROM EARTH ORBIT",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "AN ENTIRE NATION SLEEPS DARK",
          "triggerFrameOffset": 43,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "GRAPH_GRID",
        "svgForegroundAsset": "KOREA_PENINSULA_NIGHT_SATELLITE"
      },
      "sfxTriggers": [
        { "sfxFile": "radar_ping.wav", "frameOffset": 0 },
        { "sfxFile": "sub_boom.wav", "frameOffset": 41 }
      ],
      "claim": {
        "text": "NORTH KOREA APPEARS AS A COMPLETE BLACK HOLE OF LIGHT FROM ORBIT",
        "source": "NASA Earth Observatory Black Marble",
        "verified": true
      }
    },
    {
      "sceneId": "SCENE_03_UNIT_121_BUNKER",
      "startFrame": 305,
      "durationFrames": 160,
      "archetype": "LONE_LEADER",
      "hudVisible": true,
      "headerContext": "UNIT 121 BUNKER",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.9
      },
      "textLayers": [
        {
          "text": "DEEP UNDER PYONGYANG",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "CHILDREN ARE DRAFTED TO HACK",
          "triggerFrameOffset": 18,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "LOCKED_CANVAS",
        "svgForegroundAsset": "UNIT_121_CYBER_BUNKER"
      },
      "sfxTriggers": [
        { "sfxFile": "typewriter_tick.wav", "frameOffset": 0 },
        { "sfxFile": "sub_boom.wav", "frameOffset": 16 }
      ],
      "claim": {
        "text": "NORTH KOREA DRAFTS MATH PRODIGIES INTO CYBER UNITS AT AGE TWELVE",
        "source": "CSIS Cybersecurity Assessment",
        "verified": true
      }
    },
    {
      "sceneId": "SCENE_04_CONSCRIPT_CADETS_TALLY",
      "startFrame": 465,
      "durationFrames": 135,
      "archetype": "CROWD_TALLY",
      "hudVisible": false,
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.85
      },
      "textLayers": [
        {
          "text": "SIX THOUSAND CADETS",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "PRISONERS OF THEIR OWN GENIUS",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM",
          "rollingCounter": true
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "NIGHT_FELT",
        "svgForegroundAsset": "PYONGYANG_CONSCRIPT_CADETS_TALLY",
        "counterConfig": {
          "label": "CONSCRIPT CODERS",
          "startValue": 0,
          "endValue": 6800
        }
      },
      "sfxTriggers": [
        { "sfxFile": "counter_roll.wav", "frameOffset": 0 },
        { "sfxFile": "stamp_slam.wav", "frameOffset": 28 }
      ],
      "claim": {
        "text": "UNIT 121 MAINTAINS AN ESTIMATED 6,800 TRAINED CYBER OPERATIVES",
        "source": "South Korean Defense Intelligence",
        "verified": true
      }
    },
    {
      "sceneId": "SCENE_05_PARALLEL_WORLDS_SPLIT",
      "startFrame": 600,
      "durationFrames": 157,
      "archetype": "SPLIT_CONFRONTATION",
      "hudVisible": true,
      "headerContext": "PARALLEL REALITIES",
      "camera": {
        "movement": "DUTCH_TILT",
        "intensity": 0.85
      },
      "textLayers": [
        {
          "text": "ONE HALF OF ASIA STARVES",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "THE OTHER STORES BILLIONS",
          "triggerFrameOffset": 39,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "LOCKED_CANVAS",
        "svgForegroundAsset": "PARALLEL_WORLDS_SPLIT"
      },
      "sfxTriggers": [
        { "sfxFile": "metal_clang.wav", "frameOffset": 0 },
        { "sfxFile": "sub_boom.wav", "frameOffset": 37 }
      ]
    },
    {
      "sceneId": "SCENE_06_HOT_VAULT_BREACH",
      "startFrame": 757,
      "durationFrames": 144,
      "archetype": "STRUCTURAL_FRACTURE",
      "hudVisible": true,
      "headerContext": "BINANCE HOT VAULTS",
      "camera": {
        "movement": "IMPACT_SHAKE",
        "intensity": 1.1
      },
      "textLayers": [
        {
          "text": "A SINGLE MALICIOUS UPDATE",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "SHATTERS THE SECURITY SHIELD",
          "triggerFrameOffset": 19,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "PAPER_EXTERIOR",
        "svgForegroundAsset": "BINANCE_HOT_VAULT_BREACH"
      },
      "sfxTriggers": [
        { "sfxFile": "sub_boom.wav", "frameOffset": 0 },
        { "sfxFile": "artillery_shell.wav", "frameOffset": 17 }
      ],
      "claim": {
        "text": "ATTACKERS COMPROMISED INTERNAL SIGNING KEYS THROUGH COMPROMISED DEV CREDENTIALS",
        "source": "Chainalysis Incident Dossier",
        "verified": true
      }
    },
    {
      "sceneId": "SCENE_07_BALANCES_DRAINING_TALLY",
      "startFrame": 901,
      "durationFrames": 145,
      "archetype": "CROWD_TALLY",
      "hudVisible": true,
      "headerContext": "GLOBAL ACCOUNTS",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.85
      },
      "textLayers": [
        {
          "text": "WHILE ORDINARY FAMILIES SLEPT",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "MILLIONS OF BALANCES DRAINED",
          "triggerFrameOffset": 28,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM",
          "rollingCounter": true
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "NIGHT_FELT",
        "svgForegroundAsset": "GLOBAL_BALANCES_DRAINING_TALLY",
        "counterConfig": {
          "label": "MILLIONS EVAPORATED",
          "startValue": 0,
          "endValue": 6360
        }
      },
      "sfxTriggers": [
        { "sfxFile": "counter_roll.wav", "frameOffset": 0 },
        { "sfxFile": "stamp_slam.wav", "frameOffset": 26 }
      ],
      "claim": {
        "text": "THE ATTACK REACHED PEAK OUTFLOW EXCEEDING THREE HUNDRED MILLION PER MINUTE",
        "source": "Blockaid Blockchain Telemetry",
        "verified": true
      }
    },
    {
      "sceneId": "SCENE_08_WAR_ROOM_ENGINEER",
      "startFrame": 1046,
      "durationFrames": 145,
      "archetype": "LONE_LEADER",
      "hudVisible": true,
      "headerContext": "EMERGENCY WAR ROOM",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.95
      },
      "textLayers": [
        {
          "text": "A SOLITARY ENGINEER WATCHES",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "THE SCREEN RUNNING RED",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "LOCKED_CANVAS",
        "svgForegroundAsset": "SINGAPORE_WAR_ROOM_ENGINEER"
      },
      "sfxTriggers": [
        { "sfxFile": "radar_ping.wav", "frameOffset": 0 },
        { "sfxFile": "sub_boom.wav", "frameOffset": 28 }
      ]
    },
    {
      "sceneId": "SCENE_09_TEN_BLOCKCHAINS_MAP",
      "startFrame": 1191,
      "durationFrames": 151,
      "archetype": "VECTOR_MAP",
      "hudVisible": true,
      "headerContext": "TEN BLOCKCHAINS",
      "camera": {
        "movement": "PARALLAX_PAN_RIGHT",
        "intensity": 0.9
      },
      "textLayers": [
        {
          "text": "ACROSS BORDERLESS LEDGERS",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "FUNDS SCATTER IN SECONDS",
          "triggerFrameOffset": 29,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "GRAPH_GRID",
        "svgForegroundAsset": "TEN_BLOCKCHAINS_LIQUIDITY_MAP"
      },
      "sfxTriggers": [
        { "sfxFile": "metal_clang.wav", "frameOffset": 0 },
        { "sfxFile": "stamp_slam.wav", "frameOffset": 27 }
      ]
    },
    {
      "sceneId": "SCENE_10_EMERGENCY_FREEZE_SHATTER",
      "startFrame": 1342,
      "durationFrames": 168,
      "archetype": "STRUCTURAL_FRACTURE",
      "hudVisible": true,
      "headerContext": "EMERGENCY FREEZE",
      "camera": {
        "movement": "IMPACT_SHAKE",
        "intensity": 1.15
      },
      "textLayers": [
        {
          "text": "TWO BILLION FROZEN MID-AIR",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "FOUR BILLION SLIPS AWAY",
          "triggerFrameOffset": 29,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "PAPER_EXTERIOR",
        "svgForegroundAsset": "EMERGENCY_FREEZE_SHATTER"
      },
      "sfxTriggers": [
        { "sfxFile": "artillery_shell.wav", "frameOffset": 0 },
        { "sfxFile": "stamp_slam.wav", "frameOffset": 27 }
      ],
      "claim": {
        "text": "STABLECOIN ISSUERS FROZE APPROXIMATELY 2.7 BILLION IN TRANSIT",
        "source": "TRM Labs Asset Tracking",
        "verified": true
      }
    },
    {
      "sceneId": "SCENE_11_ROCKET_QUOTE_FINDING",
      "startFrame": 1510,
      "durationFrames": 137,
      "archetype": "QUOTE_CARD",
      "hudVisible": true,
      "headerContext": "INTELLIGENCE FINDING",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.85
      },
      "textLayers": [
        {
          "text": "NOT STOLEN FOR GREED",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "STOLEN TO BUILD WARHEADS",
          "triggerFrameOffset": 28,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "LOCKED_CANVAS",
        "svgForegroundAsset": "UN_INTELLIGENCE_ROCKET_QUOTE",
        "quoteAttribution": "UN PANEL OF EXPERTS · 2026"
      },
      "sfxTriggers": [
        { "sfxFile": "sub_boom.wav", "frameOffset": 0 },
        { "sfxFile": "stamp_slam.wav", "frameOffset": 26 }
      ],
      "claim": {
        "text": "OVER HALF OF NORTH KOREA MISSILE PROGRAM IS FUNDED BY CRYPTO HEISTS",
        "source": "United Nations Security Council Sanctions Panel",
        "verified": true
      }
    },
    {
      "sceneId": "SCENE_12_HWASONG_ICBM_TRANSIT",
      "startFrame": 1647,
      "durationFrames": 154,
      "archetype": "VEHICLE_IN_TRANSIT",
      "hudVisible": true,
      "headerContext": "SUNAN LAUNCH PAD",
      "camera": {
        "movement": "PARALLAX_PAN_RIGHT",
        "intensity": 0.95
      },
      "textLayers": [
        {
          "text": "THROUGH THE FROZEN SNOW",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "AN ICBM ROLLS FORWARD",
          "triggerFrameOffset": 37,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "PAPER_EXTERIOR",
        "svgForegroundAsset": "HWASONG_ICBM_SNOW_TRANSIT"
      },
      "sfxTriggers": [
        { "sfxFile": "metal_clang.wav", "frameOffset": 0 },
        { "sfxFile": "sub_boom.wav", "frameOffset": 35 }
      ]
    },
    {
      "sceneId": "SCENE_13_ROCKET_IGNITION_TEST",
      "startFrame": 1801,
      "durationFrames": 145,
      "archetype": "STRUCTURAL_FRACTURE",
      "hudVisible": true,
      "headerContext": "IGNITION TEST",
      "camera": {
        "movement": "IMPACT_SHAKE",
        "intensity": 1.25
      },
      "textLayers": [
        {
          "text": "YOUR RETIREMENT SAVINGS",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "TURNING INTO ROCKET FUEL",
          "triggerFrameOffset": 20,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "PAPER_EXTERIOR",
        "svgForegroundAsset": "ROCKET_ENGINE_TEST_IGNITION"
      },
      "sfxTriggers": [
        { "sfxFile": "artillery_shell.wav", "frameOffset": 0 },
        { "sfxFile": "sub_boom.wav", "frameOffset": 18 }
      ]
    },
    {
      "sceneId": "SCENE_14_BINANCE_BAILOUT_LEADER",
      "startFrame": 1946,
      "durationFrames": 145,
      "archetype": "LONE_LEADER",
      "hudVisible": true,
      "headerContext": "BINANCE HEADQUARTERS",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.9
      },
      "textLayers": [
        {
          "text": "TO STOP A GLOBAL COLLAPSE",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "THE EXCHANGE ABSORBS RUIN",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "LOCKED_CANVAS",
        "svgForegroundAsset": "BINANCE_LEADERSHIP_BAILOUT"
      },
      "sfxTriggers": [
        { "sfxFile": "sub_boom.wav", "frameOffset": 0 },
        { "sfxFile": "stamp_slam.wav", "frameOffset": 28 }
      ],
      "claim": {
        "text": "BINANCE PLEDGED CORPORATE TREASURY RESERVES TO PREVENT CONSUMER LOSSES",
        "source": "Binance Official Statement",
        "verified": true
      }
    },
    {
      "sceneId": "SCENE_15_VAULT_RESTORATION_SPLIT",
      "startFrame": 2091,
      "durationFrames": 145,
      "archetype": "SPLIT_CONFRONTATION",
      "hudVisible": true,
      "headerContext": "CORPORATE RESERVES",
      "camera": {
        "movement": "DUTCH_TILT",
        "intensity": 0.85
      },
      "textLayers": [
        {
          "text": "BILLIONS REPLACED IN VAULTS",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "SAVING ORDINARY DEPOSITORS",
          "triggerFrameOffset": 29,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "LOCKED_CANVAS",
        "svgForegroundAsset": "VAULT_RESERVES_RESTORATION_SPLIT"
      },
      "sfxTriggers": [
        { "sfxFile": "metal_clang.wav", "frameOffset": 0 },
        { "sfxFile": "sub_boom.wav", "frameOffset": 27 }
      ]
    },
    {
      "sceneId": "SCENE_16_BORDER_WALLS_MAP",
      "startFrame": 2236,
      "durationFrames": 146,
      "archetype": "VECTOR_MAP",
      "hudVisible": true,
      "headerContext": "GEOPOLITICAL REALITY",
      "camera": {
        "movement": "PARALLAX_PAN_RIGHT",
        "intensity": 0.9
      },
      "textLayers": [
        {
          "text": "CENTURIES OF BORDER WALLS",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "DEFEATED BY A KEYSTROKE",
          "triggerFrameOffset": 29,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "GRAPH_GRID",
        "svgForegroundAsset": "BORDER_WALLS_DEFEATED_MAP"
      },
      "sfxTriggers": [
        { "sfxFile": "radar_ping.wav", "frameOffset": 0 },
        { "sfxFile": "stamp_slam.wav", "frameOffset": 27 }
      ]
    },
    {
      "sceneId": "SCENE_17_CHILD_SOLDIERS_MEDALS_TALLY",
      "startFrame": 2382,
      "durationFrames": 147,
      "archetype": "CROWD_TALLY",
      "hudVisible": true,
      "headerContext": "PYONGYANG CITADEL",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.85
      },
      "textLayers": [
        {
          "text": "THE REGIME PINS MEDALS",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "ON EXHAUSTED TEENAGE SOLDIERS",
          "triggerFrameOffset": 30,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM",
          "rollingCounter": true
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "NIGHT_FELT",
        "svgForegroundAsset": "MEDALS_ON_CHILD_SOLDIERS_TALLY",
        "counterConfig": {
          "label": "COMMENDATIONS",
          "startValue": 0,
          "endValue": 120
        }
      },
      "sfxTriggers": [
        { "sfxFile": "counter_roll.wav", "frameOffset": 0 },
        { "sfxFile": "stamp_slam.wav", "frameOffset": 28 }
      ]
    },
    {
      "sceneId": "SCENE_18_ISOLATED_DARK_CELL",
      "startFrame": 2529,
      "durationFrames": 129,
      "archetype": "LONE_LEADER",
      "hudVisible": true,
      "headerContext": "COLD ISOLATION",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.85
      },
      "textLayers": [
        {
          "text": "THEY EARN NO FREEDOM",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "THEY NEVER LEAVE THE CELL",
          "triggerFrameOffset": 28,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "LOCKED_CANVAS",
        "svgForegroundAsset": "ISOLATED_HACKER_DARK_CELL"
      },
      "sfxTriggers": [
        { "sfxFile": "metal_clang.wav", "frameOffset": 0 },
        { "sfxFile": "sub_boom.wav", "frameOffset": 26 }
      ]
    },
    {
      "sceneId": "SCENE_19_FORTRESS_BREACH_SHATTER",
      "startFrame": 2658,
      "durationFrames": 159,
      "archetype": "STRUCTURAL_FRACTURE",
      "hudVisible": true,
      "headerContext": "MODERN WARFARE",
      "camera": {
        "movement": "IMPACT_SHAKE",
        "intensity": 1.15
      },
      "textLayers": [
        {
          "text": "NO ARTILLERY WAS FIRED",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "YET THE FORTRESS FELL",
          "triggerFrameOffset": 45,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "PAPER_EXTERIOR",
        "svgForegroundAsset": "DIGITAL_FORTRESS_COLLAPSE"
      },
      "sfxTriggers": [
        { "sfxFile": "artillery_shell.wav", "frameOffset": 0 },
        { "sfxFile": "stamp_slam.wav", "frameOffset": 43 }
      ]
    },
    {
      "sceneId": "SCENE_20_CYBER_DOCTRINE_QUOTE",
      "startFrame": 2817,
      "durationFrames": 145,
      "archetype": "QUOTE_CARD",
      "hudVisible": true,
      "headerContext": "OFFICIAL DOCTRINE",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.85
      },
      "textLayers": [
        {
          "text": "A STARVING NATION FOUND",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "THE WEAPON OF TOMORROW",
          "triggerFrameOffset": 29,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "LOCKED_CANVAS",
        "svgForegroundAsset": "CYBER_DOCTRINE_DOSSIER_QUOTE",
        "quoteAttribution": "GLOBAL CYBER ASSESSMENT"
      },
      "sfxTriggers": [
        { "sfxFile": "sub_boom.wav", "frameOffset": 0 },
        { "sfxFile": "stamp_slam.wav", "frameOffset": 27 }
      ]
    },
    {
      "sceneId": "SCENE_21_SMARTPHONE_VS_SILO_SPLIT",
      "startFrame": 2962,
      "durationFrames": 145,
      "archetype": "SPLIT_CONFRONTATION",
      "hudVisible": true,
      "headerContext": "THE INVISIBLE FRONTLINE",
      "camera": {
        "movement": "DUTCH_TILT",
        "intensity": 0.9
      },
      "textLayers": [
        {
          "text": "THE SILO IN THE MOUNTAINS",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "LOCKED TO YOUR SCREEN",
          "triggerFrameOffset": 29,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "LOCKED_CANVAS",
        "svgForegroundAsset": "SMARTPHONE_VS_SILO_SPLIT"
      },
      "sfxTriggers": [
        { "sfxFile": "metal_clang.wav", "frameOffset": 0 },
        { "sfxFile": "sub_boom.wav", "frameOffset": 27 }
      ]
    },
    {
      "sceneId": "SCENE_22_OCEANIC_CABLES_TRANSIT",
      "startFrame": 3107,
      "durationFrames": 138,
      "archetype": "VEHICLE_IN_TRANSIT",
      "hudVisible": true,
      "headerContext": "PACIFIC TELEMETRY",
      "camera": {
        "movement": "PARALLAX_PAN_RIGHT",
        "intensity": 0.95
      },
      "textLayers": [
        {
          "text": "UNDER OCEANIC CABLES",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "THE GHOST WEALTH DRIFTS",
          "triggerFrameOffset": 29,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "GRAPH_GRID",
        "svgForegroundAsset": "OCEANIC_CABLES_GHOST_WEALTH"
      },
      "sfxTriggers": [
        { "sfxFile": "radar_ping.wav", "frameOffset": 0 },
        { "sfxFile": "stamp_slam.wav", "frameOffset": 27 }
      ]
    },
    {
      "sceneId": "SCENE_23_TERMINAL_SHUTDOWN_LEADER",
      "startFrame": 3245,
      "durationFrames": 124,
      "archetype": "LONE_LEADER",
      "hudVisible": true,
      "headerContext": "TERMINAL SHUTDOWN",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.85
      },
      "textLayers": [
        {
          "text": "THE SCREENS TURN BLACK",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "THE SILENCE IS DEAFENING",
          "triggerFrameOffset": 36,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "LOCKED_CANVAS",
        "svgForegroundAsset": "TERMINAL_SHUTDOWN_SILENCE"
      },
      "sfxTriggers": [
        { "sfxFile": "typewriter_tick.wav", "frameOffset": 0 },
        { "sfxFile": "sub_boom.wav", "frameOffset": 34 }
      ]
    },
    {
      "sceneId": "SCENE_24_FINAL_LOOP_QUOTE",
      "startFrame": 3369,
      "durationFrames": 131,
      "archetype": "QUOTE_CARD",
      "hudVisible": true,
      "headerContext": "FINAL REVELATION",
      "camera": {
        "movement": "SLOW_PUSH_IN",
        "intensity": 0.8
      },
      "textLayers": [
        {
          "text": "NEVER AT THE BORDER",
          "triggerFrameOffset": 0,
          "tier": "PRIMARY_STATEMENT",
          "colorToken": "PURE_WHITE",
          "animation": "BLUR_TO_SHARP"
        },
        {
          "text": "ALREADY IN YOUR POCKET",
          "triggerFrameOffset": 29,
          "tier": "SECONDARY_ACCENT",
          "colorToken": "ALERT_RED",
          "animation": "SCALE_SLAM"
        }
      ],
      "visualPayload": {
        "skyGradient": ["#0B1310", "#16221E"],
        "stageStyle": "LOCKED_CANVAS",
        "svgForegroundAsset": "IN_YOUR_POCKET_FINAL_QUOTE",
        "quoteAttribution": "THE LAZARUS HEIST"
      },
      "sfxTriggers": [
        { "sfxFile": "sub_boom.wav", "frameOffset": 0 },
        { "sfxFile": "stamp_slam.wav", "frameOffset": 27 }
      ]
    }
  ]
};

fs.writeFileSync('src/timelines/binance_heist_2026.json', JSON.stringify(timeline, null, 2));
fs.writeFileSync('src/timelines/current_reel.json', JSON.stringify(timeline, null, 2));
console.log('Successfully wrote src/timelines/binance_heist_2026.json and updated src/timelines/current_reel.json');
