const { ingestProjectPlates } = require('./ingest_reference_plates');

const targets = [
  {
    filename: 'carton_portrait_hero.jpg',
    fileTitle: 'File:Sir Adrian Carton de Wiart.jpg',
    sceneIds: ['SCENE_01_UNKILLABLE_HOOK_LEADER', 'SCENE_25_THE_UNKILLABLE_FINAL_LOOP'],
    description: 'Official portrait of Lieutenant General Sir Adrian Carton de Wiart VC with eyepatch and pinned sleeve'
  },
  {
    filename: 'boer_war_combat.jpg',
    query: 'Boer War soldiers 1900 British',
    sceneIds: ['SCENE_02_BOER_WAR_RIVER_WOUNDS'],
    description: 'British infantry troops in active combat during Second Boer War South Africa'
  },
  {
    filename: 'carton_1904_uniform.jpg',
    fileTitle: 'File:Adrian Carton de Wiart 1904.jpg',
    sceneIds: ['SCENE_03_INDIA_HORSE_CHARGE'],
    description: 'Adrian Carton de Wiart in 1904 British cavalry service uniform'
  },
  {
    filename: 'somaliland_water_troops.jpg',
    fileTitle: 'File:Water! (Somaliland Campaign), 1902.jpg',
    query: 'Somaliland campaign troops',
    sceneIds: ['SCENE_04_SOMALILAND_FORTRESS_MAP', 'SCENE_05_THREE_BULLETS_EYE_SHATTER'],
    description: 'British Somaliland camel corps campaign troops in Somaliland expedition'
  },
  {
    filename: 'carton_ww1_officer.jpg',
    fileTitle: 'File:Lieutenant Colonel Adrian Carton de Wiart.jpg',
    sceneIds: ['SCENE_06_WESTERN_FRONT_EYEPATCH_LEADER', 'SCENE_10_BULLET_SKULL_SURVIVAL_LEADER'],
    description: 'Lieutenant Colonel Adrian Carton de Wiart in World War I tunic'
  },
  {
    filename: 'ypres_night_barrage.jpg',
    fileTitle: 'File:German Barrage Fire at Night (Ypres).jpg',
    query: 'German Barrage Fire at Night Ypres',
    sceneIds: ['SCENE_07_YPRES_ARTILLERY_SPLIT'],
    description: 'Night artillery barrage flashes and shellbursts over the Ypres salient'
  },
  {
    filename: 'somme_trench_1916.jpg',
    fileTitle: 'File:Cheshire Regiment trench Somme 1916.jpg',
    query: 'Cheshire Regiment trench Somme 1916',
    sceneIds: ['SCENE_08_AMPUTATION_BITTEN_FINGERS', 'SCENE_09_SOMME_LA_BOISSELLE_TALLY'],
    description: 'British infantry inside frontline trench during the 1916 Battle of the Somme'
  },
  {
    filename: 'victoria_cross_medal.jpg',
    fileTitle: 'File:Unknown artist - Victoria Cross Medal - SJA-0000-03608-530 - Jersey Museum and Art Gallery.jpg',
    query: 'Victoria Cross Medal bronze cross',
    sceneIds: ['SCENE_11_VICTORIA_CROSS_QUOTE', 'SCENE_23_ELEVEN_WOUNDS_TALLY'],
    description: 'Bronze Victoria Cross medal with crimson ribbon and For Valour inscription'
  },
  {
    filename: 'polish_armoured_train_1.jpg',
    fileTitle: 'File:Pociąg pancerny Bartosz Głowacki w wojnie polsko-sowieckiej NAC 1-W-1678-2.jpg',
    query: 'Polish armoured train 1920',
    sceneIds: ['SCENE_12_POLISH_SOVIET_WAR_MAP', 'SCENE_14_COSSACK_TRAIN_GUNFIGHT_SPLIT'],
    description: 'Armoured artillery train Bartosz Glowacki during the Polish-Soviet War 1920'
  },
  {
    filename: 'polish_armoured_train_2.jpg',
    fileTitle: 'File:Wojna polski-sowiecka - pociąg pancerny Śmiały NAC 1-W-1678-1.jpg',
    query: 'Wojna polsko-sowiecka pociąg pancerny',
    sceneIds: ['SCENE_15_SPEEDING_TRAIN_LEAP'],
    description: 'Armoured locomotive Smialy during 1920 Polish-Soviet operations'
  },
  {
    filename: 'biplane_crash_wreck.jpg',
    fileTitle: 'File:Curtiss Jenny biplane crash WWI.jpg',
    sceneIds: ['SCENE_13_AIRCRAFT_CRASH_WRECK'],
    description: 'Military reconnaissance biplane fuselage wreckage after crash landing'
  },
  {
    filename: 'carton_de_wiart_general.jpg',
    fileTitle: 'File:Adrian Carton de Wiart.jpg',
    sceneIds: ['SCENE_16_WORLD_WAR_TWO_RECALL_LEADER'],
    description: 'Major General Adrian Carton de Wiart portrait with officer cap and medals'
  },
  {
    filename: 'short_sunderland_boat.jpg',
    fileTitle: 'File:Short Sunderland flying boat on the sea in 1943 - geograph.org.uk - 3051420.jpg',
    query: 'Short Sunderland flying boat on sea',
    sceneIds: ['SCENE_17_SUNDERLAND_FLYING_BOAT_TRANSIT'],
    description: 'RAF Coastal Command Short Sunderland four-engine flying boat on ocean'
  },
  {
    filename: 'raf_bomber_wreckage.jpg',
    query: 'Wellington bomber sea crash ditching',
    sceneIds: ['SCENE_18_SEA_BOMBER_CRASH_SHATTER'],
    description: 'Twin-engine British military bomber ditched off Mediterranean coastline'
  },
  {
    filename: 'italian_medieval_fortress.jpg',
    fileTitle: 'File:Medieval Fortress Heritage.jpg',
    query: 'Medieval stone castle fortress tower',
    sceneIds: ['SCENE_19_VINCIGLIATA_PRISON_FORTRESS_SPLIT', 'SCENE_20_ONE_HANDED_TUNNEL_ESCAPE'],
    description: 'Stone bastion walls, ramparts, and iron-barred casemate of Italian fortress castle'
  },
  {
    filename: 'italian_countryside_peasant.jpg',
    fileTitle: 'File:Cypress tree alley at sunset in Asciano, Tuscany.jpg',
    sceneIds: ['SCENE_21_DISGUISED_PEASANT_LEADER'],
    description: 'Rural Italian landscape with rustic stone farmhouses and cypress road'
  },
  {
    filename: 'mao_and_chiang_1945.jpg',
    fileTitle: 'File:1945 Mao and Chiang.jpg',
    query: '1945 Mao and Chiang Chongqing',
    sceneIds: ['SCENE_22_CHURCHILL_MAO_ENVOY_SPLIT'],
    description: 'Mao Zedong and Chiang Kai-shek together at Chongqing negotiations where Carton de Wiart served'
  },
  {
    filename: 'carton_memorial_plaque.jpg',
    fileTitle: 'File:Killinardrish cemetery - Co. Cork - grave of Adrian Carton de Wiart.jpg',
    sceneIds: ['SCENE_24_HAPPY_ODYSSEY_MEMOIR_QUOTE'],
    description: 'Sir Adrian Carton de Wiart VC memorial inscription in Killinardrish cemetery'
  }
];

async function main() {
  await ingestProjectPlates('carton-de-wiart-1916', targets);
}

main().catch(console.error);
