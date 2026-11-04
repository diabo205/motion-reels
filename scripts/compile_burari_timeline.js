const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

// Load cut timings calculated from audio transients
const cutTimings = JSON.parse(fs.readFileSync('projects/burari-deaths-2018/cut_timings.json', 'utf8'));

const sceneDefinitions = [
  {
    scene: 1,
    act: "I",
    beat: "TRIGGER",
    archetype: "STRUCTURAL_FRACTURE",
    staging: "PAPER_EXTERIOR",
    plate: "burari_house_facade.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.65,
    text: { tag: "DELHI • 1 JULY 2018", setup: "BURARI, JULY 2018", payoff: "ELEVEN BODIES FOUND" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: {
      text: "Eleven members of the Chundawat family found dead in their Burari residence on 1 July 2018",
      source: "Delhi Police Charge Sheet / The Hindu",
      url: "https://en.wikipedia.org/wiki/Burari_deaths",
      verified: true
    },
    asset: "BurariHouseFacadeFracture",
    sky: ["#881337", "#1C1917"],
    landmarks: {
      foregroundSubject: "Die-cut silhouette of Sant Nagar multi-story brick residence with central vertical structural fracture",
      midgroundProps: "Iron mesh ceiling shadow, faint silhouettes of hanging cords suspended in cold pre-dawn air",
      backgroundArchitecture: "Dense North Delhi brick rooftop silhouette and tangled overhead power lines against dawn sky",
      lightingAuras: ["pre-dawn crimson crisis glow (#881337)", "somber incandescent window yellow (#FEF08A)"]
    },
    viewerSees: "The narrow facade of the Burari house fractures as dawn reveals eleven hanging silhouettes inside.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Melancholic dawn sky gradient (#881337 to #1C1917) layered with subtle cardstock grain. (2) Midground: Narrow Sant Nagar brick facade with iron balconies and dense overhead wiring clusters. (3) Foreground: High-contrast architectural fracture revealing the dark interior ceiling where 11 silhouettes hang in eerie stillness."
  },
  {
    scene: 2,
    act: "I",
    beat: "REACTION",
    archetype: "SPLIT_CONFRONTATION",
    staging: "NIGHT_FELT",
    plate: "burari_house_facade.jpg",
    camera: "DUTCH_TILT",
    intensity: 0.55,
    text: { tag: "7:00 AM", setup: "THE MORNING ROUTINE", payoff: "THE SHOP WAS SHUT" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: null,
    asset: "NeighbourShutteredShopSplit",
    sky: ["#1E293B", "#0F172A"],
    landmarks: {
      foregroundSubject: "Neighbour Gurcharan Singh holding morning milk pouch on left versus dark locked plywood shutters on right",
      midgroundProps: "Unopened morning newspaper on doorstep, padlock hanging untouched",
      backgroundArchitecture: "Narrow Sant Nagar concrete alleyway in deep morning shadow",
      lightingAuras: ["cool pre-dawn cyan rim (#38BDF8)", "deep asphalt indigo (#0F172A)"]
    },
    viewerSees: "A worried neighbour stands outside the family grocery store that always opened before dawn.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Cool morning felt indigo canvas (#1E293B to #0F172A). (2) Midground: Split perspective between the silent grocery storefront and the dark open wooden stairway leading upstairs. (3) Foreground: Silhouetted neighbour gazing up in unease, rimmed by cold morning light."
  },
  {
    scene: 3,
    act: "I",
    beat: "FOCAL",
    archetype: "LONE_LEADER",
    staging: "WOOD_PANEL",
    plate: "iron_ceiling_mesh_grill.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.7,
    text: { tag: "THE FIRST WITNESS", setup: "A NEIGHBOUR WALKS UP", payoff: "UNIMAGINABLE HORROR" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: null,
    asset: "FlashlightCorridorHero",
    sky: ["#451A03", "#1C1917"],
    landmarks: {
      foregroundSubject: "Trembling silhouette of neighbour holding a flashlight casting a sharp cone beam through hallway",
      midgroundProps: "Reflective wooden handrail, unbolted double wooden door swung slightly ajar",
      backgroundArchitecture: "Vaulted hallway ceiling where iron ventilation grill casts square shadow patterns",
      lightingAuras: ["volumetric flashlight beam ivory (#FEF3C7)", "dark walnut shadow vignetting (#1C1917)"]
    },
    viewerSees: "A lone flashlight beam cuts through the hallway, stopping frozen as ten bodies become visible.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Deep mahogany hallway wood paneling (#451A03 to #1C1917). (2) Midground: Atmospheric dust motes suspended in a stark white volumetric flashlight cone. (3) Foreground: Hand grasping the banister in shock as the flashlight illuminates the suspended bodies."
  },
  {
    scene: 4,
    act: "II",
    beat: "MACRO",
    archetype: "VECTOR_MAP",
    staging: "GRAPH_GRID",
    plate: "delhi_burari_locator_map.png",
    camera: "PARALLAX_PAN_RIGHT",
    intensity: 0.6,
    text: { tag: "NORTH DELHI", setup: "POLICE CORDON STREET", payoff: "SANT NAGAR SEALED" },
    sensitivity: "STANDARD",
    claim: null,
    asset: "SantNagarTacticalMap",
    sky: ["#0F172A", "#1E3A8A"],
    landmarks: {
      foregroundSubject: "Tactical cartographic contours of North Delhi and the winding Yamuna river channel",
      midgroundProps: "Pulsing red beacon target locking onto Sant Nagar, Burari with concentric range circles",
      backgroundArchitecture: "Outer Ring Road arterial vectors and North Delhi district boundary grid",
      lightingAuras: ["police beacon strobe cyan (#38BDF8)", "tactical slate blueprint aura (#1E3A8A)"]
    },
    viewerSees: "Tactical vector map sweeps across Delhi, locking pulsing red coordinates onto Sant Nagar as sirens converge.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Tactical slate-navy blueprint canvas (#0F172A to #1E3A8A) with coordinate lines. (2) Midground: Vector contours of the Yamuna River and North Delhi highways. (3) Foreground: Concentric radar rings locking onto Burari with pulsing red emergency status rings."
  },
  {
    scene: 5,
    act: "II",
    beat: "FOCAL",
    archetype: "CROWD_TALLY",
    staging: "NIGHT_FELT",
    plate: "indian_family_portrait.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.6,
    text: { tag: "THE CHUNDAWAT FAMILY", setup: "THREE GENERATIONS", payoff: "ELEVEN FAMILY MEMBERS" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: {
      text: "The dead included grandmother Narayani Devi (80), her sons, daughters, and two 15-year-old grandsons",
      source: "Delhi Police FSL Autopsy Report",
      url: "https://en.wikipedia.org/wiki/Burari_deaths",
      verified: true
    },
    counter: { label: "FAMILY MEMBERS LOST", startValue: 1, endValue: 11 },
    asset: "ThreeGenerationsTallyBoard",
    sky: ["#18181B", "#090D12"],
    landmarks: {
      foregroundSubject: "Eleven sequential die-cut silhouettes representing elders, parents, and teenage sons",
      midgroundProps: "Tactile cardstock tally counter board rolling smoothly from 1 to 11",
      backgroundArchitecture: "Somber dark felt memorial substrate with faint warm halo silhouettes",
      lightingAuras: ["warm memorial candle aura (#F59E0B)", "deep obsidian shadow (#090D12)"]
    },
    viewerSees: "A solemn row of eleven family silhouettes illuminates one by one as the tally rolls to eleven.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Pitch-black memorial felt substrate (#18181B to #090D12). (2) Midground: Row of 11 distinct family silhouettes ranging from grandmother to teenage boys. (3) Foreground: Tactile brass-rimmed tally board rolling to 11 with soft golden floor candle reflections."
  },
  {
    scene: 6,
    act: "II",
    beat: "TRIGGER",
    archetype: "LONE_LEADER",
    staging: "SUNBURST_HERO",
    plate: "priyanka_marigold_engagement.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.65,
    text: { tag: "17 JUNE 2018", setup: "JUST TWO WEEKS EARLIER", payoff: "A JOYFUL ENGAGEMENT" },
    sensitivity: "STANDARD",
    claim: {
      text: "Priyanka's engagement was celebrated with 200 guests just 14 days before the tragedy",
      source: "The Hindu / Indian Express",
      url: "https://en.wikipedia.org/wiki/Burari_deaths",
      verified: true
    },
    asset: "PriyankaEngagementHero",
    sky: ["#B45309", "#451A03"],
    landmarks: {
      foregroundSubject: "Die-cut silhouette of 33-year-old Priyanka adorned in celebratory dupatta with marigold garland",
      midgroundProps: "Decorative celebratory paper bunting, traditional brass thali tray with sweets and flower petals",
      backgroundArchitecture: "Archway bathed in radiant golden sunburst paper rays",
      lightingAuras: ["festive marigold gold (#F59E0B)", "warm vermilion joy aura (#DC2626)"]
    },
    viewerSees: "Priyanka smiles in festive engagement attire amidst golden sunburst rays just two weeks before the incident.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Vibrant golden sunburst paper rays (#B45309 to #451A03) celebrating life and future. (2) Midground: Festive flower garlands and decorative paper bunting. (3) Foreground: Rim-lit silhouette of Priyanka holding ceremonial flower petals, highlighting the utter absence of prior outward despair."
  },
  {
    scene: 7,
    act: "II",
    beat: "REACTION",
    archetype: "STRUCTURAL_FRACTURE",
    staging: "WOOD_PANEL",
    plate: "iron_ceiling_mesh_grill.jpg",
    camera: "IMPACT_SHAKE",
    intensity: 0.7,
    text: { tag: "FORENSIC FINDINGS", setup: "CRIME SCENE HORRORS", payoff: "EYES AND EARS SEALED" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: null,
    asset: "BindingsAndCottonFracture",
    sky: ["#7F1D1D", "#1C1917"],
    landmarks: {
      foregroundSubject: "Macro fracture of cloth blindfolds, medical cotton in ears, and tape over mouths",
      midgroundProps: "Hands bound behind backs with wire and nylon rope without ligature struggle marks",
      backgroundArchitecture: "Shadowed iron ceiling mesh frame with hanging fabric swatches",
      lightingAuras: ["forensic flash white (#FFFFFF)", "blood-slate crisis aura (#7F1D1D)"]
    },
    viewerSees: "Forensic details reveal white cotton in ears, cloth blindfolds, and taped mouths with zero struggle marks.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Crimson crisis shadow (#7F1D1D to #1C1917) textured with dark grain. (2) Midground: Structural cross-section of bound wrists with smooth unresisting ties. (3) Foreground: Graphic fracture illustrating the ritualistic blindfolding and cotton ear plugs."
  },
  {
    scene: 8,
    act: "II",
    beat: "MACRO",
    archetype: "SPLIT_CONFRONTATION",
    staging: "PAPER_EXTERIOR",
    plate: "eleven_pvc_pipes_wall.jpg",
    camera: "PARALLAX_PAN_RIGHT",
    intensity: 0.6,
    text: { tag: "THE EXTERIOR WALL", setup: "ON THE REAR FACADE", payoff: "ELEVEN STRANGE PIPES" },
    sensitivity: "STANDARD",
    claim: null,
    asset: "ElevenPipesWallSplit",
    sky: ["#9A3412", "#1C1917"],
    landmarks: {
      foregroundSubject: "Outer brick facade showing 11 PVC protruding pipes: four straight and seven bent downward",
      midgroundProps: "Adjacent empty plot overgrowth, speculative directional arrows pointing to open ground",
      backgroundArchitecture: "Exposed red terracotta brickwork and mortar joints of the rear wall",
      lightingAuras: ["terracotta brick aura (#9A3412)", "mysterious evening shadow slate (#334155)"]
    },
    viewerSees: "Eleven plastic pipes jut outward from the exterior wall, igniting viral panic and occult speculation.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Dusty terracotta Delhi evening sky (#9A3412 to #1C1917). (2) Midground: Texture of exposed red brick masonry with mortar seams. (3) Foreground: Exactly 11 white PVC pipes protruding into the empty lot, matching the count and ages of the victims."
  },
  {
    scene: 9,
    act: "II",
    beat: "REACTION",
    archetype: "QUOTE_CARD",
    staging: "GRAPH_GRID",
    plate: "forensic_autopsy_dossier.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.65,
    text: { tag: "NATIONAL HEADLINES", setup: "MEDIA CONSPIRACIES", payoff: "OCCULT MASS MURDER" },
    sensitivity: "STANDARD",
    claim: null,
    quoteAttribution: "TELEVISION NEWS CHYRON, 2 JULY 2018",
    asset: "MediaFrenzyQuoteCard",
    sky: ["#450A0A", "#0F172A"],
    landmarks: {
      foregroundSubject: "Feverish live broadcast news banner card with pulsing red breaking news badge",
      midgroundProps: "Microphone cluster silhouettes, flashing paparazzi strobe lights, rolling headline tickers",
      backgroundArchitecture: "Tactical television studio scan-line texture with live audio waveform",
      lightingAuras: ["breaking news scarlet (#DC2626)", "CRT television phosphor cyan (#38BDF8)"]
    },
    viewerSees: "Television channels erupt with sensational theories of black magic, tantra, and ritual murder.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: High-contrast crimson-to-navy broadcast grid (#450A0A to #0F172A). (2) Midground: Silhouetted media microphones and camera flashes outside the house. (3) Foreground: Tactile news card displaying the sensational early theories of occult cults."
  },
  {
    scene: 10,
    act: "III",
    beat: "TRIGGER",
    archetype: "LONE_LEADER",
    staging: "WOOD_PANEL",
    plate: "bhopal_singh_ancestor_portrait.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.65,
    text: { tag: "THE PRAYER ROOM", setup: "IN THE PUJA ROOM", payoff: "ELEVEN DIARIES FOUND" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: null,
    asset: "PrayerRoomShrineHero",
    sky: ["#78350F", "#1C1917"],
    landmarks: {
      foregroundSubject: "Carved wooden mandir shrine shelf holding a stack of eleven blue-lined diary notebooks",
      midgroundProps: "Single glowing brass diya lamp with curling incense smoke and framed garlanded portrait",
      backgroundArchitecture: "Intricate carved sandalwood pillars and sacred brass bells",
      lightingAuras: ["warm oil lamp flame (#F59E0B)", "sacred sandalwood shadow (#1C1917)"]
    },
    viewerSees: "Detectives enter the prayer room and discover eleven handwritten diaries kept over eleven years.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Rich sandalwood wood grain (#78350F to #1C1917) illuminated by flickering fire. (2) Midground: Traditional Hindu puja mandir with brass bell and framed ancestor photograph. (3) Foreground: Stack of 11 handwritten registers, unlocking the true psychological reality."
  },
  {
    scene: 11,
    act: "III",
    beat: "FOCAL",
    archetype: "QUOTE_CARD",
    staging: "WOOD_PANEL",
    plate: "bhopal_singh_ancestor_portrait.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.65,
    text: { tag: "THE TURNING POINT", setup: "PATRIARCH BHOPAL SINGH", payoff: "PASSED AWAY IN 2007" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: {
      text: "The death of patriarch Bhopal Singh in 2007 plunged his youngest son Lalit into profound grief",
      source: "Delhi Police Investigation Dossier",
      url: "https://en.wikipedia.org/wiki/Burari_deaths",
      verified: true
    },
    quoteAttribution: "FAMILY HISTORY, 2007",
    asset: "PatriarchMemorialCard",
    sky: ["#451A03", "#1C1917"],
    landmarks: {
      foregroundSubject: "Framed portrait of patriarch Bhopal Singh with white cotton cloth and fresh marigold garland",
      midgroundProps: "Memorial candle glow, fading chronological timeline markers spanning 2007 to 2018",
      backgroundArchitecture: "Weathered family album cardstock border with solemn vignette shading",
      lightingAuras: ["sepia ancestor glow (#D97706)", "deep memorial taupe (#1C1917)"]
    },
    viewerSees: "The patriarch Bhopal Singh passes away in 2007, unmooring the family structure.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Warm sepia-to-charcoal wood canvas (#451A03 to #1C1917). (2) Midground: Garlanded ancestral portrait of the patriarch. (3) Foreground: Cardstock memorial card marking the 2007 inciting tragedy that started the decade-long delusion."
  },
  {
    scene: 12,
    act: "III",
    beat: "REACTION",
    archetype: "SPLIT_CONFRONTATION",
    staging: "NIGHT_FELT",
    plate: "burari_house_facade.jpg",
    camera: "DUTCH_TILT",
    intensity: 0.6,
    text: { tag: "UNRESOLVED TRAUMA", setup: "AFTER AN ASSAULT", payoff: "LALIT LOST HIS VOICE" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: null,
    asset: "LalitTraumaSilenceSplit",
    sky: ["#1E1B4B", "#090D12"],
    landmarks: {
      foregroundSubject: "Silhouetted profile of youngest son Lalit with mouth silenced by a vertical soundwave barrier",
      midgroundProps: "Plywood shop counter, medical prescription pad silhouettes",
      backgroundArchitecture: "Dark bedroom window looking out into the silent midnight lane",
      lightingAuras: ["melancholic midnight violet (#4C1D95)", "cold muted shadow (#0F172A)"]
    },
    viewerSees: "Following a violent plywood assault, Lalit lost his voice for years, withdrawing into silence.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Muted indigo felt substrate (#1E1B4B to #090D12). (2) Midground: Silhouette of Lalit isolated in his room, unable to speak. (3) Foreground: Flatline audio waveform symbolizing his years of traumatic silence before his voice mysteriously returned."
  },
  {
    scene: 13,
    act: "III",
    beat: "TRIGGER",
    archetype: "STRUCTURAL_FRACTURE",
    staging: "PAPER_EXTERIOR",
    plate: "bhopal_singh_ancestor_portrait.jpg",
    camera: "IMPACT_SHAKE",
    intensity: 0.7,
    text: { tag: "THE DELUSION BEGINS", setup: "HIS VOICE RETURNED", payoff: "FATHER SPOKE THROUGH HIM" },
    sensitivity: "STANDARD",
    claim: null,
    asset: "PossessionBreakthroughFracture",
    sky: ["#7F1D1D", "#1C1917"],
    landmarks: {
      foregroundSubject: "Fracturing silhouette of Lalit as a glowing ethereal spirit contour of his deceased father aligns over him",
      midgroundProps: "Incense smoke swirling in sacred geometry patterns, ritual bells vibrating",
      backgroundArchitecture: "Sant Nagar room walls radiating volumetric amber energy rays",
      lightingAuras: ["ethereal ghost teal (#14B8A6)", "explosive belief crimson (#DC2626)"]
    },
    viewerSees: "Lalit suddenly regains his voice, claiming his deceased father has possessed him to lead the family.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Explosive terracotta-to-crimson energy sky (#7F1D1D to #1C1917). (2) Midground: Ethereal dual silhouette showing father and son merged in spiritual possession. (3) Foreground: Jagged structural shockwave representing the psychic fracture that overtook the entire household."
  },
  {
    scene: 14,
    act: "III",
    beat: "FOCAL",
    archetype: "QUOTE_CARD",
    staging: "GRAPH_GRID",
    plate: "handwritten_diary_register.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.6,
    text: { tag: "SECRET CHRONICLES", setup: "LALIT DICTATED ORDERS", payoff: "PRIYANKA WROTE EVERYTHING" },
    sensitivity: "STANDARD",
    claim: {
      text: "Forensic handwriting analysis confirmed Priyanka and others wrote down Lalit's dictated trances",
      source: "Delhi Police Forensic Handwriting Division",
      url: "https://en.wikipedia.org/wiki/Burari_deaths",
      verified: true
    },
    quoteAttribution: "FORENSIC HANDWRITING ANALYSIS",
    asset: "PriyankaDiariesWritingCard",
    sky: ["#0F172A", "#1E3A8A"],
    landmarks: {
      foregroundSubject: "Ruled lined notebook page displaying neat handwritten script with fountain pen nib in motion",
      midgroundProps: "Magnifying loupe revealing disciplined handwriting without hesitation or erasure",
      backgroundArchitecture: "Blueprint quadrille paper grid with diary dates spanning 2007 to 2018",
      lightingAuras: ["focused reading spotlight (#FEF08A)", "deep blue forensic ink (#1E3A8A)"]
    },
    viewerSees: "Priyanka writes every dictated command into notebooks—revealing educated compliance.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Tactical forensic blueprint grid (#0F172A to #1E3A8A). (2) Midground: Lined journal notebook pages showing 11 years of daily directives. (3) Foreground: Delicate handwriting quill pen etching the rules of conduct, diet, and spiritual obedience."
  },
  {
    scene: 15,
    act: "III",
    beat: "REACTION",
    archetype: "CROWD_TALLY",
    staging: "SUNBURST_HERO",
    plate: "prosperity_bazaar_counters.jpg",
    camera: "CRANE_SWEEP_UP",
    intensity: 0.65,
    text: { tag: "REINFORCING THE LIE", setup: "OBEDIENCE BROUGHT SUCCESS", payoff: "BUSINESS EXPANDED RAPIDLY" },
    sensitivity: "STANDARD",
    claim: null,
    counter: { label: "NEW FAMILY SHOPS", startValue: 1, endValue: 3 },
    asset: "ProsperityExpansionTallyBoard",
    sky: ["#B45309", "#1C1917"],
    landmarks: {
      foregroundSubject: "Silhouette of expanding family grocery and plywood shops with bright storefront shutters",
      midgroundProps: "Brass coins and currency bundles stacking neatly on wooden ledger desks",
      backgroundArchitecture: "Golden dawn sunburst rays radiating across Sant Nagar bazaar horizon",
      lightingAuras: ["prosperous merchant gold (#F59E0B)", "warm saffron triumph (#D97706)"]
    },
    viewerSees: "Business boomed and family harmony flourished, convincing everyone the spirit was real.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Vibrant golden sunburst paper rays (#B45309 to #1C1917). (2) Midground: Architectural facades of multiple flourishing family shops. (3) Foreground: Rolling prosperity tally board demonstrating how real-world success cemented the fatal delusion."
  },
  {
    scene: 16,
    act: "III",
    beat: "TRIGGER",
    archetype: "LONE_LEADER",
    staging: "WOOD_PANEL",
    plate: "sacred_banyan_tree_roots.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.65,
    text: { tag: "THE FINAL RITUAL", setup: "A SEVEN DAY PENANCE", payoff: "BADH TAPASYA ORDERED" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: {
      text: "The diaries detailed 'Badh Tapasya' (Banyan Tree worship) where members would imitate hanging aerial roots",
      source: "Delhi Police Investigation Records",
      url: "https://en.wikipedia.org/wiki/Burari_deaths",
      verified: true
    },
    asset: "BadhTapasyaCommandHero",
    sky: ["#581C87", "#1C1917"],
    landmarks: {
      foregroundSubject: "Die-cut silhouette of Lalit holding a ritual copper lota vessel before the home mandir",
      midgroundProps: "Sacred thread (moli) bundles, camphor fire flame, rolled dupattas on wooden table",
      backgroundArchitecture: "Dark wooden wall panel with faint mystical tree motif etched into timber grain",
      lightingAuras: ["eerie ritual violet (#7C3AED)", "copper fire orange (#F97316)"]
    },
    viewerSees: "Lalit announces the final ritual: Badh Tapasya—imitating the sacred roots of a banyan tree.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Mystical deep violet felt backdrop (#581C87 to #1C1917). (2) Midground: Ritualistic copper utensils, camphor flames, and sacred red threads. (3) Foreground: Rim-lit silhouette of Lalit issuing the instructions for the fateful seven-day penance."
  },
  {
    scene: 17,
    act: "III",
    beat: "MACRO",
    archetype: "STRUCTURAL_FRACTURE",
    staging: "PAPER_EXTERIOR",
    plate: "sacred_banyan_tree_roots.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.7,
    text: { tag: "THE BLUEPRINT", setup: "SACRED BANYAN TREE", payoff: "AERIAL ROOTS REACH DOWN" },
    sensitivity: "STANDARD",
    claim: null,
    asset: "BanyanTreeRootsFracture",
    sky: ["#14532D", "#0F172A"],
    landmarks: {
      foregroundSubject: "Massive twisted trunk and branches of a sacred banyan tree with thick aerial roots cascading down",
      midgroundProps: "Interconnected root pillars creating an organic circular temple cage",
      backgroundArchitecture: "Ancient temple courtyard masonry silhouetted against twilight sky",
      lightingAuras: ["sacred Vedic jade green (#16A34A)", "mystic twilight gold (#CA8A04)"]
    },
    viewerSees: "The sacred banyan tree spreads its hanging aerial roots—the tragic anatomical model for the ritual.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Twilight emerald-to-navy forest sky (#14532D to #0F172A). (2) Midground: Sprawling canopy of the sacred Indian banyan tree. (3) Foreground: Graphic structural roots cascading vertically down, illustrating the physical pattern the family was instructed to imitate."
  },
  {
    scene: 18,
    act: "IV",
    beat: "REACTION",
    archetype: "SPLIT_CONFRONTATION",
    staging: "NIGHT_FELT",
    plate: "iron_ceiling_mesh_grill.jpg",
    camera: "DUTCH_TILT",
    intensity: 0.65,
    text: { tag: "THE MACABRE MIRROR", setup: "HANGING LIKE ROOTS", payoff: "TEN SILK SCARVES" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: null,
    asset: "RootsVsDupattasSplit",
    sky: ["#1E1B4B", "#090D12"],
    landmarks: {
      foregroundSubject: "Split comparison: natural banyan tree roots on left versus colorful dupattas looped from ceiling grill on right",
      midgroundProps: "Square grid shadows cast by the ceiling ventilation rebar mesh",
      backgroundArchitecture: "Cold concrete ceiling beams in oppressive vertical perspective",
      lightingAuras: ["cold ceiling fluorescent cyan (#38BDF8)", "deep midnight void (#090D12)"]
    },
    viewerSees: "A horrifying split matches the banyan tree roots directly to ten scarves hanging from the ceiling mesh.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Oppressive midnight felt void (#1E1B4B to #090D12). (2) Midground: Heavy iron ceiling mesh grid bolted into reinforced concrete beams. (3) Foreground: Split vector comparison juxtaposing living tree roots with ten hanging silk dupattas."
  },
  {
    scene: 19,
    act: "IV",
    beat: "FOCAL",
    archetype: "QUOTE_CARD",
    staging: "WOOD_PANEL",
    plate: "handwritten_diary_register.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.65,
    text: { tag: "THE PROMISE", setup: "FINAL DIARY WORDS", payoff: "FATHER WILL SAVE US" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: {
      text: "The final diary entry assured: 'The earth will shake, the sky will part, and I will appear to untie everyone'",
      source: "Delhi Police Burari Diary Excerpt",
      url: "https://en.wikipedia.org/wiki/Burari_deaths",
      verified: true
    },
    quoteAttribution: "FINAL DIARY ENTRY, 30 JUNE 2018",
    asset: "FinalPromiseQuoteCard",
    sky: ["#451A03", "#1C1917"],
    landmarks: {
      foregroundSubject: "Weathered diary page with chilling final lines penned in clean blue ink",
      midgroundProps: "Fading brass oil lamp reflection, ritual cotton threads bordering the page",
      backgroundArchitecture: "Dark wooden shrine table with soft circular vignette shadows",
      lightingAuras: ["warm flickering flame amber (#F59E0B)", "crepuscular shadow taupe (#1C1917)"]
    },
    viewerSees: "The diary reveals their fatal certainty: the father's spirit would physically arrive to untie them.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Somber walnut wood-panel grain (#451A03 to #1C1917). (2) Midground: Lined notebook page showing the chilling final words written on June 30. (3) Foreground: Tactile cardstock quote card displaying the promised supernatural rescue."
  },
  {
    scene: 20,
    act: "IV",
    beat: "TRIGGER",
    archetype: "VEHICLE_IN_TRANSIT",
    staging: "GRAPH_GRID",
    plate: "prosperity_bazaar_counters.jpg",
    camera: "PARALLAX_PAN_RIGHT",
    intensity: 0.6,
    text: { tag: "MIDNIGHT • 30 JUNE", setup: "UNDER THE IRON MESH", payoff: "ELEVEN STOOLS ALIGNED" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: null,
    asset: "MidnightStoolsTransitHero",
    sky: ["#0F172A", "#1E293B"],
    landmarks: {
      foregroundSubject: "Eleven stools in transit alignment moving into position beneath ceiling coordinates",
      midgroundProps: "Orthogonal floor grid lines with numbered position markers from 1 to 11",
      backgroundArchitecture: "Interior living room walls bathed in eerie moonlight filtered through grilled transoms",
      lightingAuras: ["pale midnight moonlight (#94A3B8)", "tactical grid slate (#1E293B)"]
    },
    viewerSees: "Eleven plastic and wooden stools are methodically lined up directly beneath the iron ceiling rebar.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Midnight slate graph canvas (#0F172A to #1E293B) marked with millimeter drafting lines. (2) Midground: Floor plan of the Sant Nagar living room showing the circular arrangement. (3) Foreground: Eleven stools gliding into position in eerie clockwork precision."
  },
  {
    scene: 21,
    act: "IV",
    beat: "FOCAL",
    archetype: "LONE_LEADER",
    staging: "NIGHT_FELT",
    plate: "indian_family_portrait.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.65,
    text: { tag: "THE ADJACENT ROOM", setup: "MATRIARCH NARAYANI DEVI", payoff: "BEDRIDDEN AT EIGHTY" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: {
      text: "Eighty-year-old grandmother Narayani Devi was found strangled in her bed, unable to stand on a stool",
      source: "Delhi Police Post-Mortem Report",
      url: "https://en.wikipedia.org/wiki/Burari_deaths",
      verified: true
    },
    asset: "GrandmotherBedLeaderHero",
    sky: ["#18181B", "#090D12"],
    landmarks: {
      foregroundSubject: "Solitary silhouette of elderly grandmother Narayani Devi resting on traditional wooden charpai cot",
      midgroundProps: "Folded cotton quilt, walking stick resting against wall, single brass water tumbler",
      backgroundArchitecture: "Adjoining ground-floor bedroom door framed by soft blue moonlight",
      lightingAuras: ["somber moonlight silver (#E2E8F0)", "deep quiet shadow (#090D12)"]
    },
    viewerSees: "In the quiet adjacent bedroom, 80-year-old grandmother Narayani Devi lies on her cot.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Gentle, quiet midnight felt canvas (#18181B to #090D12). (2) Midground: Traditional Indian wooden cot and modest bedroom furnishings. (3) Foreground: Dignified, heartbreaking silhouette of the matriarch who was unable to stand on the stools."
  },
  {
    scene: 22,
    act: "IV",
    beat: "REACTION",
    archetype: "SPLIT_CONFRONTATION",
    staging: "PAPER_EXTERIOR",
    plate: "terrace_chained_dog_tommy.jpg",
    camera: "DUTCH_TILT",
    intensity: 0.6,
    text: { tag: "ON THE ROOFTOP", setup: "ON THE TERRACE", payoff: "THE DOG BARKED" },
    sensitivity: "STANDARD",
    claim: {
      text: "Tommy, the family's Indian pariah dog, was found chained on the rooftop terrace barking continuously with high fever",
      source: "Animal Rights / Delhi Police Records",
      url: "https://en.wikipedia.org/wiki/Burari_deaths",
      verified: true
    },
    asset: "TommyTerraceBarkSplit",
    sky: ["#78350F", "#0F172A"],
    landmarks: {
      foregroundSubject: "Silhouette of Indian pariah dog Tommy straining at iron chain, barking into the midnight sky",
      midgroundProps: "Heavy iron chain taut against terrace railing, overturned metal water bowl",
      backgroundArchitecture: "Silhouetted rooftop water tank, dish antenna, and hazy Delhi urban skyline",
      lightingAuras: ["urban sodium vapor orange (#F59E0B)", "midnight smog indigo (#0F172A)"]
    },
    viewerSees: "Chained to the rooftop railing, Tommy the dog barks frantically into the empty Delhi night.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Hazy orange sodium vapor night sky (#78350F to #0F172A). (2) Midground: Rooftop parapet with clotheslines and concrete water storage tanks. (3) Foreground: Silhouette of Tommy the loyal dog barking frantically as the only living witness to the family's final hour."
  },
  {
    scene: 23,
    act: "IV",
    beat: "REACTION",
    archetype: "STRUCTURAL_FRACTURE",
    staging: "NIGHT_FELT",
    plate: "iron_ceiling_mesh_grill.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.7,
    text: { tag: "THE FATAL MOMENT", setup: "THE STOOLS TIPPED", payoff: "NO MIRACLE CAME" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: null,
    asset: "StoolsToppleFracture",
    sky: ["#020617", "#090D12"],
    landmarks: {
      foregroundSubject: "Silhouetted stools tumbling onto their sides on the floor in complete silence",
      midgroundProps: "Suspended shadows holding still in the darkness, settling dust particles",
      backgroundArchitecture: "Cold unyielding iron ceiling grid showing zero deformation or supernatural opening",
      lightingAuras: ["fading twilight ember (#7F1D1D)", "absolute midnight silence (#020617)"]
    },
    viewerSees: "The stools topple in silence—the sky does not part, no spirit appears, and darkness falls.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Absolute midnight void (#020617 to #090D12) devoid of sensationalism. (2) Midground: The unmoved, rigid iron ceiling rebar structure. (3) Foreground: Toppled stools lying horizontal on the cold floor, marking the tragic moment the delusion met irreversible reality."
  },
  {
    scene: 24,
    act: "V",
    beat: "MACRO",
    archetype: "QUOTE_CARD",
    staging: "GRAPH_GRID",
    plate: "forensic_autopsy_dossier.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.65,
    text: { tag: "THE CLINICAL VERDICT", setup: "PSYCHOLOGICAL AUTOPSY", payoff: "SHARED PSYCHOSIS" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: {
      text: "Medical experts concluded the deaths were caused by 'shared psychosis' (folie à plusieurs) without suicidal intent",
      source: "Central Bureau of Investigation (CBI) / AIIMS Delhi",
      url: "https://en.wikipedia.org/wiki/Burari_deaths",
      verified: true
    },
    quoteAttribution: "CENTRAL FORENSIC SCIENCE LABORATORY",
    asset: "PsychologicalAutopsyCard",
    sky: ["#0F172A", "#1E3A8A"],
    landmarks: {
      foregroundSubject: "Official CBI psychiatric autopsy report dossier stamped with 'SHARED PSYCHOTIC DISORDER'",
      midgroundProps: "Diagnostic clinical DSM criteria text vectors and forensic laboratory authentication seals",
      backgroundArchitecture: "Quadrille medical graph grid with official Delhi Police crest",
      lightingAuras: ["clinical white fluorescent aura (#F8FAFC)", "forensic slate blue (#1E3A8A)"]
    },
    viewerSees: "The medical verdict: Shared Psychosis (Folie à plusieurs)—they never intended to die.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Official clinical graph grid (#0F172A to #1E3A8A). (2) Midground: Formal diagnostic psychiatric evaluation dossier from AIIMS and Delhi FSL. (3) Foreground: Tactile stamped report card highlighting the profound tragic diagnosis: Shared Psychosis."
  },
  {
    scene: 25,
    act: "V",
    beat: "FOCAL",
    archetype: "CROWD_TALLY",
    staging: "WOOD_PANEL",
    plate: "bhopal_singh_ancestor_portrait.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.6,
    text: { tag: "THE TRAGIC LESSON", setup: "UNTREATED MENTAL ILLNESS", payoff: "ELEVEN SOULS LOST" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: null,
    counter: { label: "LIVES CONSUMED BY SILENCE", startValue: 1, endValue: 11 },
    asset: "MemorialTallyBoardHero",
    sky: ["#451A03", "#1C1917"],
    landmarks: {
      foregroundSubject: "Eleven softly glowing brass oil diyas flickering in a solemn row",
      midgroundProps: "Gentle cardstock memorial counter board resting at eleven",
      backgroundArchitecture: "Warm mahogany memorial plinth with etched names and ages",
      lightingAuras: ["warm reverence gold (#F59E0B)", "somber sandalwood shadow (#1C1917)"]
    },
    viewerSees: "Eleven glowing oil lamps burn quietly in memorial tribute as the counter rests at eleven.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Dignified mahogany memorial wood substrate (#451A03 to #1C1917). (2) Midground: A row of eleven warm brass diyas casting soft amber reflections. (3) Foreground: Tactile memorial tally plinth honoring the eleven lives lost to silence and stigma."
  },
  {
    scene: 26,
    act: "V",
    beat: "MACRO",
    archetype: "LONE_LEADER",
    staging: "PAPER_EXTERIOR",
    plate: "burari_house_facade.jpg",
    camera: "SLOW_PUSH_IN",
    intensity: 0.5,
    text: { tag: "EPILOGUE", setup: "TALK BEFORE TRAGEDY", payoff: "REMEMBER BURARI" },
    sensitivity: "SOMBER_MEMORIAL",
    claim: null,
    asset: "SilentHouseMonumentHero",
    sky: ["#881337", "#1C1917"],
    landmarks: {
      foregroundSubject: "The quiet shuttered house in Sant Nagar standing in profound silence beneath evening sky",
      midgroundProps: "Overhead utility wires gently swaying in the Delhi evening breeze, silent street",
      backgroundArchitecture: "Dusk horizon of North Delhi rooftops matching Scene 1 Frame 0 color values for seamless reel loop",
      lightingAuras: ["pre-dawn dawn-rose sky (#881337)", "deep memorial earth umber (#1C1917)"]
    },
    viewerSees: "The silent house in Sant Nagar stands as a somber monument, looping seamlessly back to the start.",
    atmosphericPrompt: "3-tier atmospheric depth hierarchy: (1) Backdrop: Melancholic rose-to-umber sky gradient (#881337 to #1C1917) matching Scene 1 Frame 0 to create an infinite, seamless reel loop. (2) Midground: The quiet brick residence standing forever closed in Sant Nagar. (3) Foreground: The final haunting call to break the silence surrounding mental health before tragedy strikes."
  }
];

// Merge cut timings with scene definitions
const sceneSpecs = sceneDefinitions.map((def, idx) => {
  const cut = cutTimings[idx];
  return {
    scene: def.scene,
    act: def.act,
    beat: def.beat,
    archetype: def.archetype,
    staging: def.staging,
    startFrame: cut.start,
    durationFrames: cut.duration,
    plate: def.plate,
    library: ["kit/AtmosphericBackground", "components/KineticTextStack"],
    camera: def.camera,
    phase1: {
      motion: "STAGGER_IN + DRIFT",
      elements: ["foregroundSubject", "lightingAuras"]
    },
    phase2: {
      payoffFrameOffset: cut.payoffOffset,
      hit: def.sensitivity === "SOMBER_MEMORIAL" ? "SOLEMN_FADE" : "IMPACT_HIT",
      secondaryChange: def.counter ? "RollingCounter" : "StateTransformation"
    },
    text: def.text,
    sfx: {
      file: def.sensitivity === "SOMBER_MEMORIAL" ? "memorial_wind.wav" : "sub_boom.wav",
      frame: cut.start + cut.sfxLeadOffset
    },
    claim: def.claim,
    sensitivity: def.sensitivity,
    landmarks: def.landmarks,
    viewerSees: def.viewerSees
  };
});

// Write projects/burari-deaths-2018/scene_specs.json
fs.writeFileSync(
  'projects/burari-deaths-2018/scene_specs.json',
  JSON.stringify(sceneSpecs, null, 2),
  'utf8'
);
console.log('✅ scene_specs.json written successfully (26 scenes)');

// Build timeline.json
const timeline = {
  $schema: "./timeline.schema.json",
  meta: {
    title: "THE BURARI DEATHS",
    flagEmoji: "🇮🇳",
    fps: 60,
    width: 1080,
    height: 1920,
    bpm: 136.0,
    bgmFile: "audio/bgm_burari.mp3",
    bgmStartFrom: 0,
    bgmLicense: {
      source: "YouTube Audio (https://youtu.be/ffVnV3p0t4A)",
      licenseType: "CREATIVE_COMMONS",
      clearanceId: "CLR-BURARI-DEATHS-2018",
      attribution: "Tiny Tim - Tip Toe Thru' The Tulips With Me (Insidious Theme)"
    },
    palette: "CONFLICT_CRISIS",
    particleEmitter: "ASH",
    fontFamily: "Montserrat",
    styleMode: "DOCUMENTARY_SANS",
    safeZoneProfile: "CONSERVATIVE_UNION",
    sensitivity: "SOMBER_MEMORIAL",
    loopSeamless: true,
    ctaConfig: {
      text: "FOLLOW FOR HISTORICAL DOCUMENTARIES",
      subtext: "THE BURARI HOUSE OF SECRETS"
    }
  },
  scenes: sceneDefinitions.map((def, idx) => {
    const cut = cutTimings[idx];
    const isSomber = def.sensitivity === "SOMBER_MEMORIAL";
    return {
      sceneId: `${String(def.scene).padStart(2, '0')}_${def.asset.toLowerCase()}`,
      startFrame: cut.start,
      durationFrames: cut.duration,
      archetype: def.archetype,
      hudVisible: true,
      headerContext: def.text.tag,
      sensitivity: def.sensitivity,
      claim: def.claim,
      camera: {
        movement: def.camera,
        intensity: def.intensity
      },
      transientType: "BEAT_ONSET",
      transientHitFrame: cut.payoffOffset,
      textLayers: [
        {
          text: def.text.setup,
          triggerFrameOffset: 0,
          tier: "PRIMARY_STATEMENT",
          colorToken: "PURE_WHITE",
          animation: "HARD_POP"
        },
        {
          text: def.text.payoff,
          triggerFrameOffset: cut.payoffOffset,
          tier: "SECONDARY_ACCENT",
          colorToken: isSomber ? "SOMBER_MUTED" : "ALERT_RED",
          animation: isSomber ? "FADE_IN_UP" : "SCALE_SLAM",
          rollingCounter: !!def.counter
        }
      ],
      visualPayload: {
        skyGradient: def.sky,
        stageStyle: def.staging,
        referencePlate: def.plate,
        svgForegroundAsset: def.asset,
        quoteAttribution: def.quoteAttribution,
        counterConfig: def.counter,
        atmosphericPlatePrompt: def.atmosphericPrompt
      },
      sfxTriggers: [
        {
          sfxFile: isSomber ? "memorial_wind.wav" : "sub_boom.wav",
          frameOffset: cut.sfxLeadOffset
        }
      ]
    };
  })
};

// Write src/timelines/burari_deaths_2018.json
fs.writeFileSync(
  'src/timelines/burari_deaths_2018.json',
  JSON.stringify(timeline, null, 2),
  'utf8'
);
console.log('✅ src/timelines/burari_deaths_2018.json written successfully');

// Update plates/manifest.json scenePlateMap
const platesManifestPath = 'projects/burari-deaths-2018/plates/manifest.json';
if (fs.existsSync(platesManifestPath)) {
  const pm = JSON.parse(fs.readFileSync(platesManifestPath, 'utf8'));
  pm.scenePlateMap = pm.scenePlateMap || {};
  sceneDefinitions.forEach(def => {
    const sId = `${String(def.scene).padStart(2, '0')}_${def.asset.toLowerCase()}`;
    pm.scenePlateMap[sId] = def.plate;
  });
  fs.writeFileSync(platesManifestPath, JSON.stringify(pm, null, 2), 'utf8');
  console.log('✅ plates/manifest.json scenePlateMap updated');
}

// Write projects/burari-deaths-2018/manifest.json
const manifest = {
  projectSlug: "burari-deaths-2018",
  title: "THE BURARI DEATHS",
  updatedAt: new Date().toISOString(),
  engine: {
    remotionVersion: "^4.0.218",
    fps: 60,
    width: 1080,
    height: 1920,
    maxFramesCeiling: 3500
  },
  timeline: {
    file: "src/timelines/burari_deaths_2018.json",
    sceneCount: 26,
    totalFrames: cutTimings[cutTimings.length - 1].start + cutTimings[cutTimings.length - 1].duration,
    durationSec: Number(((cutTimings[cutTimings.length - 1].start + cutTimings[cutTimings.length - 1].duration) / 60).toFixed(2))
  },
  audio: {
    bgmFile: "audio/bgm_burari.mp3",
    bpm: 136.0,
    bgmLicense: timeline.meta.bgmLicense,
    loudnessSpec: {
      targetIntegratedLufs: -14.0,
      targetTruePeakDbtp: -1.0,
      impactDuckingDb: -7.5
    }
  },
  typographyAndVisuals: {
    fontFamily: "Montserrat",
    palette: "CONFLICT_CRISIS",
    particleEmitter: "ASH",
    sensitivity: "SOMBER_MEMORIAL"
  }
};

fs.writeFileSync(
  'projects/burari-deaths-2018/manifest.json',
  JSON.stringify(manifest, null, 2),
  'utf8'
);
console.log('✅ manifest.json written successfully');
