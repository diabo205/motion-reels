const { ingestProjectPlates } = require('./ingest_reference_plates');

const targets = [
  {
    filename: 'korea_night_satellite.jpg',
    fileTitle: 'File:Korean Peninsula at night from space.jpg',
    sceneIds: ['SCENE_02_KOREA_NIGHT_SATELLITE', 'SCENE_24_FINAL_LOOP_QUOTE'],
    description: 'NASA Earth Observatory Suomi NPP VIIRS night satellite photograph of Korean Peninsula'
  },
  {
    filename: 'hwasong_15_missile.jpg',
    query: 'Hwasong-15 missile North Korea launch',
    sceneIds: ['SCENE_12_HWASONG_ICBM_TRANSIT', 'SCENE_13_ROCKET_IGNITION_TEST'],
    description: 'Hwasong-15 ICBM heavy TEL transporter and staging blueprint'
  },
  {
    filename: 'bank_citadel_facade.jpg',
    query: 'Federal Reserve Bank of New York building',
    sceneIds: ['SCENE_19_FORTRESS_BREACH_SHATTER'],
    description: 'Neoclassical banking citadel facade with monumental pediment and Corinthian columns'
  },
  {
    filename: 'subsea_fiber_cable.jpg',
    query: 'Submarine communications cable cross-section',
    sceneIds: ['SCENE_09_TEN_BLOCKCHAINS_MAP', 'SCENE_22_OCEANIC_CABLES_TRANSIT'],
    description: 'Armored trans-oceanic subsea fiber-optic communication cable cross-section'
  },
  {
    filename: 'korean_military_cadets.jpg',
    query: 'Kim Il-sung Square military parade Pyongyang',
    sceneIds: ['SCENE_04_CONSCRIPT_CADETS_TALLY', 'SCENE_17_CHILD_SOLDIERS_MEDALS_TALLY'],
    description: 'North Korean military parade rank-and-file uniforms, visor caps, and insignias'
  },
  {
    filename: 'vault_door_security.jpg',
    fileTitle: 'File:Bank vault door.jpg',
    query: 'Bank vault door heavy round steel locking mechanism',
    sceneIds: ['SCENE_01_ALERT_QUOTE_CARD', 'SCENE_06_HOT_VAULT_BREACH'],
    description: 'Monumental round bank vault blast door with multi-bolt locking gears'
  },
  {
    filename: 'cyber_command_terminal.jpg',
    query: 'Security operations center monitors darkness',
    sceneIds: ['SCENE_03_UNIT_121_BUNKER', 'SCENE_08_WAR_ROOM_ENGINEER', 'SCENE_23_TERMINAL_SHUTDOWN_LEADER'],
    description: 'Low-light command and control room with glowing terminal displays and telemetry matrices'
  },
  {
    filename: 'crypto_trading_terminal.jpg',
    fileTitle: 'File:Bitcoin price chart.png',
    query: 'Bitcoin price chart candlestick trading',
    sceneIds: ['SCENE_07_BALANCES_DRAINING_TALLY'],
    description: 'Cryptocurrency order book telemetry and draining liquidity balance chart'
  },
  {
    filename: 'industrial_pipeline_valve.jpg',
    query: 'Industrial high pressure pipeline valve',
    sceneIds: ['SCENE_10_EMERGENCY_FREEZE_SHATTER'],
    description: 'High-pressure cryogenic industrial pipeline with frosted bypass manifold'
  },
  {
    filename: 'un_security_council.jpg',
    query: 'James Swan briefs the UN Security Council',
    sceneIds: ['SCENE_11_ROCKET_QUOTE_FINDING'],
    description: 'United Nations Security Council chamber and panel rostrum'
  },
  {
    filename: 'press_conference_podium.jpg',
    query: 'Press conference podium microphones',
    sceneIds: ['SCENE_14_BINANCE_BAILOUT_LEADER'],
    description: 'Corporate executive briefing podium with microphone array and backdrop'
  },
  {
    filename: 'gold_bullion_bars.jpg',
    query: 'Gold bullion bars 999.9 fine gold stacked',
    sceneIds: ['SCENE_15_VAULT_RESTORATION_SPLIT'],
    description: 'Refined 999.9 fine gold bullion ingots stacked in high-security reserve vault'
  },
  {
    filename: 'dmz_border_barriers.jpg',
    query: 'United Nations Command Security Battalion guards Joint Security Area in DMZ',
    sceneIds: ['SCENE_16_BORDER_WALLS_MAP'],
    description: 'Korean DMZ concrete dragon teeth anti-tank obstacles, razor wire, and guard tower'
  },
  {
    filename: 'prison_cell_window.jpg',
    query: 'Prison cell window iron bars',
    sceneIds: ['SCENE_18_ISOLATED_DARK_CELL'],
    description: 'Concrete solitary containment cell with reinforced steel window bars'
  },
  {
    filename: 'north_korea_emblem.jpg',
    query: 'Emblem of North Korea official vector',
    sceneIds: ['SCENE_05_PARALLEL_WORLDS_SPLIT', 'SCENE_20_CYBER_DOCTRINE_QUOTE'],
    description: 'Official national emblem and military star insignia of North Korea'
  },
  {
    filename: 'missile_silo_blast_door.jpg',
    query: 'Peacekeeper missile after silo launch',
    sceneIds: ['SCENE_21_SMARTPHONE_VS_SILO_SPLIT'],
    description: 'Underground ballistic missile silo subterranean launch tube and blast doors'
  }
];

async function main() {
  await ingestProjectPlates('binance-heist-2026', targets);
}

main().catch(console.error);
