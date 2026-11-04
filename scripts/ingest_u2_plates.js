const { ingestProjectPlates } = require('./ingest_reference_plates');

const targets = [
  {
    filename: 'soviet_radar_p30.jpg',
    fileTitle: 'File:NYSA P-30 B Radar.jpg',
    sceneIds: ['SCENE_01_SOVIET_RADAR_LOCK'],
    description: 'Soviet P-30 radar antenna lattice and radar acquisition grid'
  },
  {
    filename: 's75_dvina_missile.jpg',
    fileTitle: 'File:Soviet C-75 (SA-2) Surface to air missile Air Defence Museum, Near Moscow.jpg',
    sceneIds: ['SCENE_02_S75_DVINA_MISSILE_STREAK'],
    description: 'Soviet S-75 Dvina high-altitude surface-to-air missile on launcher rail'
  },
  {
    filename: 'u2_wreckage_sverdlovsk.jpg',
    fileTitle: 'File:Wreckage of Lockheed U-2C (56-6693) (38901816671).jpg',
    sceneIds: ['SCENE_03_MISSILE_DETONATION_CABIN_LOSS'],
    description: 'Downed Lockheed U-2C wreckage recovered near Sverdlovsk'
  },
  {
    filename: 'nasa_flight_map_turkey.jpg',
    fileTitle: 'File:OperationGrandSlam1960.jpg',
    sceneIds: ['SCENE_04_NASA_FABRICATED_FLIGHT_MAP'],
    description: 'Official Operation Grand Slam trans-Soviet flight corridor and Adana Turkey staging corridor'
  },
  {
    filename: 'fake_nasa_u2_weather.jpg',
    fileTitle: 'File:U-2 Spy Plane With Fictitious NASA Markings - GPN-2000-000112.jpg',
    sceneIds: ['SCENE_05_OFFICIAL_STATEMENT_STAMP_SLAM'],
    description: 'Lockheed U-2 painted with fictitious civilian NASA weather markings at Edwards AFB'
  },
  {
    filename: 'eisenhower_portrait.jpg',
    sceneIds: ['SCENE_06_EISENHOWER_DENIAL_CUTOUT'],
    description: 'Official portrait of President Dwight D. Eisenhower'
  },
  {
    filename: 'kremlin_moscow_red.jpg',
    fileTitle: 'File:Moscow. Kremlin. Spasskaya Tower P5152468 2600.jpg',
    sceneIds: ['SCENE_07_MOSCOW_FIVE_DAY_SILENCE'],
    description: 'Moscow Kremlin Spasskaya Tower and red fortress wall silhouette'
  },
  {
    filename: 'khrushchev_official_full.jpg',
    sceneIds: ['SCENE_08_KHRUSHCHEV_STEPS_TO_PODIUM'],
    description: 'Nikita Khrushchev address at Supreme Soviet rostrum in Grand Kremlin Palace'
  },
  {
    filename: 'khrushchev_portrait.jpg',
    sceneIds: ['SCENE_09_DOSSIER_SLAMS_THE_TRAP'],
    description: 'Nikita Khrushchev portrait with recovered U-2 espionage dossier'
  },
  {
    filename: 'powers_portrait.jpg',
    sceneIds: ['SCENE_10_CHECKMATE_PLANE_CAPTURED'],
    description: 'Francis Gary Powers official arrest photograph by Soviet authorities'
  },
  {
    filename: 'powers_pressure_suit.jpg',
    fileTitle: 'File:RIAN archive 35172 Powers Wears Special Pressure Suit.jpg',
    sceneIds: ['SCENE_11_CHECKMATE_INTACT_HYCON_FILM'],
    description: 'Gary Powers high-altitude pressurized flight suit and survival kit'
  },
  {
    filename: 'powers_soviet_trial.jpg',
    fileTitle: 'File:RIAN archive 35174 American Spy Pilot Francis Gary Powers.jpg',
    sceneIds: ['SCENE_12_CHECKMATE_POISON_PIN_PILOT_ALIVE'],
    description: 'Francis Gary Powers on trial before the Military Collegium of the Supreme Court of the USSR'
  },
  {
    filename: 'rudolf_abel.jpg',
    sceneIds: ['SCENE_13_EPILOGUE_COLD_WAR_HUMILIATION'],
    description: 'Soviet intelligence officer Rudolf Abel exchanged for Powers on the Glienicke Bridge'
  }
];

async function main() {
  await ingestProjectPlates('u2-incident-1960', targets);
}

main().catch(err => {
  console.error('Fatal plate ingestion error:', err);
  process.exit(1);
});
