const { ingestProjectPlates } = require('./ingest_reference_plates');

const targets = [
  {
    filename: 'burari_house_facade.jpg',
    fileTitle: 'File:Main Bazaar, Paharganj, Delhi, India.jpg',
    query: 'Delhi street houses',
    sceneIds: ['SCENE_01_CHUNDAWAT_HOUSE_FRACTURE', 'SCENE_21_SILENT_HOUSE_MONUMENT'],
    description: 'Dense North Delhi residential multi-story brick facade with balconies and overhead electrical wires'
  },
  {
    filename: 'delhi_burari_locator_map.png',
    fileTitle: 'File:India Delhi locator map.svg',
    query: 'India Delhi locator map',
    sceneIds: ['SCENE_03_SANT_NAGAR_CORDON_MAP'],
    description: 'Topographic tactical vector map of National Capital Territory of Delhi and Yamuna river corridor'
  },
  {
    filename: 'delhi_police_patrol_car.jpg',
    fileTitle: 'File:Delhi Police car All Women PCR vehicle Innova.jpg',
    query: 'Delhi Police car',
    sceneIds: ['SCENE_03_SANT_NAGAR_CORDON_MAP'],
    description: 'Delhi Police emergency response patrol vehicle with flashing beacon sirens'
  },
  {
    filename: 'indian_family_portrait.jpg',
    fileTitle: 'File:Family Roerich.JPG',
    query: 'family portrait',
    sceneIds: ['SCENE_04_THREE_GENERATIONS_TALLY', 'SCENE_16_GRANDMOTHER_BED_LEADER'],
    description: 'Three generation multigenerational family gathering seated together in traditional attire'
  },
  {
    filename: 'priyanka_marigold_engagement.jpg',
    fileTitle: 'File:Marigold Flowers as garland in India.jpg',
    query: 'marigold garland India',
    sceneIds: ['SCENE_05_PRIYANKA_ENGAGEMENT_LEADER'],
    description: 'Traditional orange and gold marigold floral garlands worn during celebratory Indian engagement ceremony'
  },
  {
    filename: 'iron_ceiling_mesh_grill.jpg',
    fileTitle: 'File:Window Grill MET sf52-142-2.jpg',
    query: 'iron grill mesh',
    sceneIds: ['SCENE_06_BINDINGS_AND_COTTON_FRACTURE', 'SCENE_13_REPRODUCING_THE_ROOTS_SPLIT'],
    description: 'Heavy structural iron latticework grill mesh ceiling frame'
  },
  {
    filename: 'eleven_pvc_pipes_wall.jpg',
    fileTitle: 'File:Pipes emerging from brick wall - geograph.org.uk - 1080971.jpg',
    query: 'pipes emerging brick wall',
    sceneIds: ['SCENE_07_ELEVEN_PIPES_WALL_SPLIT'],
    description: 'Protruding PVC ventilation and drainage pipes jutting through exterior brick wall'
  },
  {
    filename: 'handwritten_diary_register.jpg',
    fileTitle: 'File:Write Your Story Blank Lined Notebook Paper Creative Commons (4812267249).jpg',
    query: 'lined notebook paper',
    sceneIds: ['SCENE_08_PRAYER_ROOM_REGISTERS_QUOTE', 'SCENE_10_PRIYANKA_HANDWRITING_QUOTE', 'SCENE_14_FINAL_PROMISE_QUOTE'],
    description: 'Handwritten spiral journal notebook with ruled lines containing ritual instructions and diary entries'
  },
  {
    filename: 'bhopal_singh_ancestor_portrait.jpg',
    fileTitle: 'File:Handwritten Guru Granth Sahib manuscript kept at Gurdwara Mattan Sahib in Martand, Kashmir, India 01.jpg',
    query: 'manuscript portrait',
    sceneIds: ['SCENE_09_PATRIARCH_POSSESSION_LEADER'],
    description: 'Framed ancestor shrine portrait draped with ceremonial cloth and incense smoke'
  },
  {
    filename: 'prosperity_bazaar_counters.jpg',
    fileTitle: 'File:Wooden seat and its plastic version.jpg',
    query: 'wooden seat',
    sceneIds: ['SCENE_11_ILLUSION_OF_PROSPERITY_TALLY', 'SCENE_15_MIDNIGHT_STOOLS_TRANSIT'],
    description: 'Molded plastic and wooden stools aligned in crime scene formation'
  },
  {
    filename: 'sacred_banyan_tree_roots.jpg',
    fileTitle: 'File:Banyan tree, Roots, Paliem, Goa, India.jpg',
    query: 'banyan tree roots',
    sceneIds: ['SCENE_12_BADH_TAPASYA_BANYAN_FRACTURE', 'SCENE_13_REPRODUCING_THE_ROOTS_SPLIT'],
    description: 'Ancient sacred banyan tree (Ficus benghalensis) with thick hanging aerial roots cascading to earth'
  },
  {
    filename: 'banyan_tree_massive_canopy.jpg',
    fileTitle: 'File:Big Banyan Tree at Bangalore.jpg',
    query: 'Big Banyan Tree',
    sceneIds: ['SCENE_12_BADH_TAPASYA_BANYAN_FRACTURE'],
    description: 'Sprawling canopy and thick aerial root pillars of massive sacred Indian banyan tree'
  },
  {
    filename: 'terrace_chained_dog_tommy.jpg',
    fileTitle: 'File:Indian Pariah Dog on the streets of Mumbai, India.jpg',
    query: 'Indian Pariah Dog',
    sceneIds: ['SCENE_17_TOMMY_ROOFTOP_BARK_SPLIT'],
    description: 'Alert Indian pariah dog standing silhouetted against urban rooftop parapet wall'
  },
  {
    filename: 'forensic_autopsy_dossier.jpg',
    fileTitle: 'File:FBI Evidence Response Team teach crime scene evidence gathering techniques during TRADEWINDS 24 (8399966).jpg',
    query: 'crime scene evidence police',
    sceneIds: ['SCENE_19_PSYCHOLOGICAL_AUTOPSY_QUOTE', 'SCENE_20_UNTREATED_TRAUMA_TALLY', 'SCENE_22_MEMORIAL_LOOP_SPLIT'],
    description: 'Official criminalistics forensic investigation case dossier and psychiatric autopsy report'
  }
];

async function run() {
  await ingestProjectPlates('burari-deaths-2018', targets);
}

run();
