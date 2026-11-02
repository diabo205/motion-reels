const { ingestProjectPlates } = require('./ingest_reference_plates');

const targets = [
  {
    filename: 'learjet_60_cruising_hero.jpg',
    fileTitle: 'File:Learjet 60 (N317MM, cn 60-236) (2-12-2026).jpg',
    sceneIds: ['SCENE_01_LEARJET_CRUISE_HOOK', 'SCENE_22_SYMMETRIC_LOOP_REEL'],
    description: 'High-altitude cruising Learjet 60 twinjet business aircraft with swept wings and rear turbofans'
  },
  {
    filename: 'florida_peninsula_route_map.png',
    fileTitle: 'File:Florida topographic map-en.svg',
    sceneIds: ['SCENE_02_AUSTIN_TO_BAHAMAS_MAP', 'SCENE_05_MIAMI_CENTER_RADAR'],
    description: 'Topographic contour map of Florida peninsula and Gulf of Mexico flight corridor'
  },
  {
    filename: 'thunderstorm_supercooled_clouds.jpg',
    fileTitle: 'File:ISS-40 Thunderheads near Borneo.jpg',
    sceneIds: ['SCENE_03_ICING_TURBULENCE_SPLIT', 'SCENE_04_MANAGING_ICE_QUOTE'],
    description: 'High altitude convective thunderstorm anvil with severe icing and turbulence'
  },
  {
    filename: 'learjet_glass_cockpit_avionics.jpg',
    fileTitle: 'File:The Learjet 45 cockpit (2511598166).jpg',
    sceneIds: ['SCENE_06_TRIM_UPSET_FRACTURE', 'SCENE_07_TWENTY_THOUSAND_FPM_QUOTE'],
    description: 'Learjet glass cockpit dual primary flight displays and throttles'
  },
  {
    filename: 'altimeter_vertical_speed_dive.png',
    fileTitle: 'File:Altimeter - 2.png',
    sceneIds: ['SCENE_08_OVERSPEED_SHOCKWAVE_FRACTURE', 'SCENE_09_ALTIMETER_COLLAPSE_TALLY'],
    description: 'Aviation barometric altimeter dial displaying high rate of descent and altitude loss'
  },
  {
    filename: 'learjet_airframe_profile.jpg',
    fileTitle: 'File:Untitled Learjet 60 ES-III.jpg',
    sceneIds: ['SCENE_10_FINAL_MAYDAY_QUOTE'],
    description: 'Learjet 60 fuselage profile showing Pratt and Whitney turbofan nacelles and swept T-tail'
  },
  {
    filename: 'palm_beach_county_locator_map.png',
    fileTitle: 'File:Map of Florida highlighting Palm Beach County.svg',
    sceneIds: ['SCENE_11_PALM_BEACH_APPROACH_MAP'],
    description: 'Florida state boundary map highlighting Palm Beach County and coastal Atlantic airspace'
  },
  {
    filename: 'fireball_crater_fracture.jpg',
    fileTitle: 'File:Debris at Crash Site of B-24 Liberator - geograph.org.uk - 3897830.jpg',
    sceneIds: ['SCENE_12_MASSIVE_FIREBALL_IMPACT', 'SCENE_18_SMOKING_CRATER_FRACTURE'],
    description: 'Scorched ground crater and aircraft impact debris field'
  },
  {
    filename: 'emergency_first_responders.jpg',
    fileTitle: 'File:LVMPD FPIU Responding to Emergency.jpg',
    sceneIds: ['SCENE_14_FIRST_RESPONDERS_TRANSIT', 'SCENE_15_PERIMETER_LEADER'],
    description: 'First responder emergency vehicles deploying lights and establishing safety perimeter'
  },
  {
    filename: 'casualty_manifest_records.jpg',
    fileTitle: 'File:Cockpit voice recorder (CVR) from the crash of the January 31, 2025 Learjet 55 (Jet Rescue Air Ambulance flight MTS056) in Philadelphia, Pennsylvania taken on 2 February 2025.jpg',
    sceneIds: ['SCENE_13_NINE_SOULS_LOST_TALLY', 'SCENE_20_BLACK_BOX_RECOVERY'],
    description: 'Aviation flight data recorder black box and crash forensic investigation records'
  },
  {
    filename: 'mobile_home_evacuation.jpg',
    fileTitle: 'File:Air traffic control radar, Lowther Hill - geograph.org.uk - 3261550.jpg',
    sceneIds: ['SCENE_16_SIX_HUNDRED_EVACUATED_TALLY'],
    description: 'Tactical surveillance and evacuation perimeter coordinate station'
  },
  {
    filename: 'ntsb_faa_investigation_crests.png',
    fileTitle: 'File:Seal of the United States National Transportation Safety Board.svg',
    sceneIds: ['SCENE_17_NTSB_FAA_SPLIT'],
    description: 'National Transportation Safety Board official federal seal and investigation badge'
  },
  {
    filename: 'federal_transportation_statement.png',
    fileTitle: 'File:Federal Aviation Administration logo.png',
    sceneIds: ['SCENE_19_SECRETARY_DUFFY_QUOTE', 'SCENE_21_MEMORIAL_TRIBUTE_LEADER'],
    description: 'Federal Aviation Administration official agency emblem'
  }
];

async function main() {
  await ingestProjectPlates('florida-plane-crash-2026', targets);
}

main().catch((err) => {
  console.error('Fatal plate ingestion error:', err);
  process.exit(1);
});
