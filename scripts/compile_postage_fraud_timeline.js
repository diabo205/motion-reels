const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Ajv = require('ajv');

const specsPath = path.resolve('projects/postage-fraud-2026/scene_specs.json');
const beatGridPath = path.resolve('assets/audio/beat_grid_postage_fraud.json');
const schemaPath = path.resolve('.agents/skills/build-historical-reel/schemas/timeline.schema.json');

const specs = JSON.parse(fs.readFileSync(specsPath, 'utf8'));
const beatGrid = JSON.parse(fs.readFileSync(beatGridPath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const sceneAssetMap = {
  1: { id: '01_the_126m_hook', asset: 'KhanewalVsUspsSplitHero', sky: ['#9A3412', '#1C1917'] },
  2: { id: '02_35_billion_rupees_tally', asset: 'RupeesParcelTallyBoard', sky: ['#0F172A', '#1E3A8A'], counter: { label: 'COUNTERFEIT LOSS (PKR BILLIONS)', startValue: 0, endValue: 35 } },
  3: { id: '03_step1_comfort_zone_khanewal', asset: 'FaheemVillageDeskSilhouette', sky: ['#9A3412', '#1C1917'] },
  4: { id: '04_step1_punjab_lanes_map', asset: 'KhanewalPunjabTacticalMap', sky: ['#0F172A', '#1E3A8A'] },
  5: { id: '05_step2_software_degree_need', asset: 'SoftwareDegreeAmbitionCard', sky: ['#78350F', '#1C1917'] },
  6: { id: '06_step2_barcode_flaw_split', asset: 'BarcodeCryptographicFlawSplit', sky: ['#1E1B4B', '#090D12'] },
  7: { id: '07_step3_crossed_line_labelsbank', asset: 'LabelsBankDarkRoomLaunch', sky: ['#1E1B4B', '#090D12'] },
  8: { id: '08_step3_two_dollar_labels_transit', asset: 'UspsTwoDollarLabelTransit', sky: ['#0F172A', '#1E3A8A'] },
  9: { id: '09_step4_sixteen_accounts_map', asset: 'SixteenAccountsNetworkMap', sky: ['#0F172A', '#1E3A8A'] },
  10: { id: '10_step4_family_human_shields', asset: 'FamilySignatureShieldsCard', sky: ['#78350F', '#1C1917'] },
  11: { id: '11_pre_drop_family_signatures', asset: 'WifeSisterAuntCourtyardSilhouette', sky: ['#9A3412', '#1C1917'] },
  12: { id: '12_step5_19s_drop_126m_drained', asset: 'UspsVaultFractureExplosion', sky: ['#7F1D1D', '#1A090B'] },
  13: { id: '13_step5_five_million_labels_tally', asset: 'FiveMillionLabelsConveyorTally', sky: ['#0F172A', '#1E3A8A'], counter: { label: 'FAKE USPS LABELS SOLD', startValue: 0, endValue: 5100000 } },
  14: { id: '14_step5_cargo_jets_millions_home', asset: 'AtlanticCargoJetWireTransit', sky: ['#9A3412', '#1C1917'] },
  15: { id: '15_step5_seven_accounts_gold', asset: 'GoldenVillaParanoiaLeader', sky: ['#78350F', '#1C1917'] },
  16: { id: '16_step6_grand_jury_bounty', asset: 'FloridaGrandJuryBountyFracture', sky: ['#7F1D1D', '#1A090B'] },
  17: { id: '17_step6_uspis_nccia_trace_map', asset: 'MiamiToLahoreRadarTraceMap', sky: ['#0F172A', '#1E3A8A'] },
  18: { id: '18_step6_sixteen_accounts_frozen', asset: 'SixteenAccountsFrozenSplit', sky: ['#7F1D1D', '#1A090B'] },
  19: { id: '19_step6_family_fallout_dossier', asset: 'NcciaFamilyFalloutDossier', sky: ['#78350F', '#1C1917'] },
  20: { id: '20_step7_hunted_across_punjab', asset: 'LahoreNightRaidConvoyTransit', sky: ['#1E1B4B', '#090D12'] },
  21: { id: '21_step7_lahore_raid_capture', asset: 'LahoreHideoutBreachFracture', sky: ['#7F1D1D', '#1A090B'] },
  22: { id: '22_step7_iron_cuffs_coder_hands', asset: 'IronCuffsOnCoderHandsLeader', sky: ['#1E1B4B', '#090D12'] },
  23: { id: '23_step7_khanewal_honor_shattered', asset: 'KhanewalVillageGriefTally', sky: ['#9A3412', '#1C1917'], counter: { label: 'FAMILY ACCOUNTS IMPLICATED', startValue: 0, endValue: 16 } },
  24: { id: '24_step7_us_extradition_bars', asset: 'ExtraditionWatchtowerSplit', sky: ['#0F172A', '#1E3A8A'] },
  25: { id: '25_step8_two_dollar_shortcut_cost', asset: 'StoryCircleTwoDollarShortcutCard', sky: ['#78350F', '#1C1917'] },
  26: { id: '26_step8_labelsbank_shattered', asset: 'LabelsBankMonitorShatterFracture', sky: ['#7F1D1D', '#1A090B'] },
  27: { id: '27_step8_screen_glow_to_bars', asset: 'DarkCellIronBarsLeader', sky: ['#1E1B4B', '#090D12'] },
  28: { id: '28_epilogue_conscience_cage_loop', asset: 'KhanewalRooftopLoopSplit', sky: ['#9A3412', '#1C1917'] },
};

const atmosphericPrompts = {
  1: '3-tier atmospheric depth hierarchy: (1) Backdrop: Warm terracotta dusk sky gradient (#9A3412 to #1C1917) layered with subtle rotating sunburst paper rays. (2) Midground: Architectural diagonal split contrasting a modest Khanewal rooftop brick parapet on the left with a federal postal sorting facility portico on the right. (3) Foreground: Sharp rim-lit silhouette of a Pakistani coder at a glowing laptop on the left pitted against the high-contrast gold-and-navy USPS eagle seal on the right, separated by a soft radial backlighting horizon glow.',
  2: '3-tier atmospheric depth hierarchy: (1) Backdrop: Deep midnight blue felt canvas (#0F172A to #1E3A8A) with tactile cardstock paper grain. (2) Midground: Towering dimensional stacks of USPS priority mail cartons and wooden cargo pallets creating layered perspective depth. (3) Foreground: Prominent tactile paper-cut tally counter board illuminated by an overhead radial spotlight beam, rolling to 35 BILLION RUPEES with crisp white border separation and soft floor shadows.',
  3: '3-tier atmospheric depth hierarchy: (1) Backdrop: Warm terracotta dusk twilight (#9A3412 to #1C1917) visible through an arched brick courtyard aperture. (2) Midground: Southern Punjab baked-brick room interior with a slow three-blade ceiling fan casting soft organic shadows across lime-washed masonry. (3) Foreground: 33-year-old Faheem Akram seated in silhouette at a weathered wooden desk, framed by warm radial amber lamp backlighting and soft cyan laptop screen glow.',
  4: '3-tier atmospheric depth hierarchy: (1) Backdrop: Tactical slate-navy blueprint canvas (#0F172A to #1E3A8A) overlaid with fine quadrille drafting grid lines and coordinate indices. (2) Midground: Stylized geographical contours of southern Punjab, Indus-Chenab river branches, and railway junctions. (3) Foreground: High-contrast gold coordinate target marker and pulsating telemetry beacon locking onto Khanewal, rim-lit by a soft radial cyan radar sweep.',
  5: '3-tier atmospheric depth hierarchy: (1) Backdrop: Deep mahogany command desk wood-paneling (#78350F to #1C1917) with organic timber grain and dark vignette shading. (2) Midground: Cascading tactile cardstock elements including an official software engineering degree diploma and crumpled overdue utility invoices with red demand stamps. (3) Foreground: Glowing monochrome CRT code terminal displaying green diagnostic output, rimmed by intense directional edge lighting and soft paper drop-shadows.',
  6: '3-tier atmospheric depth hierarchy: (1) Backdrop: Deep cyber indigo felt expanse (#1E1B4B to #090D12) textured with subtle vertical binary code waterfalls. (2) Midground: Giant high-resolution USPS Intelligent Mail barcode matrix split along a cryptographic routing vulnerability. (3) Foreground: Coder silhouette wielding a brass-rimmed optical magnifying reticle that illuminates the flawed routing digits under a bright cyan radial beam.',
  7: '3-tier atmospheric depth hierarchy: (1) Backdrop: Pitch-black dark-room felt substrate (#1E1B4B to #090D12) with subtle atmospheric dust motes. (2) Midground: Dual 27-inch high-resolution monitors radiating volumetric teal and white ambient light into a Spartan Pakistani bedroom. (3) Foreground: Sharp profile silhouette of Faheem typing on a mechanical keyboard, rim-lit by radial screen backlighting as the LabelsBank.com administrative portal goes live.',
  8: '3-tier atmospheric depth hierarchy: (1) Backdrop: Twilight slate-navy American sky (#0F172A to #1E3A8A) with paper-cut cloud layers and utility wires. (2) Midground: Suburban postal route perspective with road markings and postal drop boxes. (3) Foreground: Iconic white USPS Grumman LLV mail delivery truck with patriotic red/blue stripes racing across the frame, dynamically stamped by oversize $2 counterfeit barcode labels with soft radial underglow.',
  9: '3-tier atmospheric depth hierarchy: (1) Backdrop: Dark tactical blueprint graph (#0F172A to #1E3A8A) with coordinate rings and crosshair markers. (2) Midground: Stylized financial flow vectors and banking network topology connecting commercial banks across Lahore, Multan, and Khanewal. (3) Foreground: 16 glowing crimson bank account nodes connected by high-contrast bezier laundering routes, highlighted by a central pulsating gold treasury hub and soft radial backlighting.',
  10: '3-tier atmospheric depth hierarchy: (1) Backdrop: Polished mahogany executive wood-panel desk (#78350F to #1C1917) with directional desk-lamp falloff. (2) Midground: Layered paper documents including commercial bank signature cards, CNIC identification records, and red ink stamping pads. (3) Foreground: Shaded silhouette of a hand with vintage fountain pen signing family member names onto account agreements, back-illuminated by a warm circular incandescent desk glow.',
  11: '3-tier atmospheric depth hierarchy: (1) Backdrop: Rich terracotta sunset Punjab sky (#9A3412 to #1C1917) framed by arched brick veranda walls. (2) Midground: Domestic courtyard with traditional wooden charpai, clay water vessels, and silhouetted foliage. (3) Foreground: Somber silhouettes of Faheem\'s wife, sister, and maternal aunt holding bank checkbooks, accented by warm golden-hour rim lighting that contrasts their unwitting complicity.',
  12: '3-tier atmospheric depth hierarchy: (1) Backdrop: Blinding crimson blast furnace sky (#7F1D1D to #1A090B) with explosive rotating paper rays. (2) Midground: Massive fortified steel postal vault doors fracturing along jagged mechanical stress fissures. (3) Foreground: 6-layer organic explosion core erupting with white-hot central flash star, flying currency shards, and expanding smoke rings at the 19.20s beat drop, surrounded by an intense radial shockwave aura.',
  13: '3-tier atmospheric depth hierarchy: (1) Backdrop: Industrial slate-navy felt substrate (#0F172A to #1E3A8A) patterned with repeating rows of 5,200 buyer silhouette icons. (2) Midground: High-speed automated thermal label printing assembly spewing thousands of coiled counterfeit postage labels. (3) Foreground: High-contrast mechanical tally counter drum illuminated by a stark white industrial spotlight, spinning rapidly up to 5,100,000 units with crisp drop-shadow depth.',
  14: '3-tier atmospheric depth hierarchy: (1) Backdrop: Transatlantic high-altitude dusk sky transitioning from deep terracotta to obsidian (#9A3412 to #1C1917). (2) Midground: Heavy commercial freight transport aircraft banking into the horizon with twin glowing condensation contrails. (3) Foreground: Luminous golden wire-transfer particle vectors arcing eastward over continental landmasses, backlit by soft radial engine exhaust glows and high-contrast cloud cardstock layers.',
  15: '3-tier atmospheric depth hierarchy: (1) Backdrop: Opulent dark mahogany library paneling (#78350F to #1C1917) with organic wood grain and heavy cardstock borders. (2) Midground: Venetian window blinds casting stark horizontal shadow bars across a luxury compound marble floor. (3) Foreground: Tense silhouette of Faheem peering through the blinds beside a stack of 7 gold-embossed ledger folios, rim-lit by ominous red surveillance laser beams cutting through the gloom.',
  16: '3-tier atmospheric depth hierarchy: (1) Backdrop: Foreboding crimson-black justice felt backdrop (#7F1D1D to #1A090B) with distressed paper edges. (2) Midground: Southern District of Florida federal judicial seal and neoclassical grand jury columns. (3) Foreground: Heavy walnut gavel slamming down with kinetic impact lines, fracturing an official $100,000 USPIS WANTED reward placard stamped with bold red distress ink and rimmed by high-intensity strobe lighting.',
  17: '3-tier atmospheric depth hierarchy: (1) Backdrop: Tactical cyber intelligence grid (#0F172A to #1E3A8A) with circular range rings and IP routing coordinate markers. (2) Midground: Dual-hemisphere map linking Miami USPIS headquarters with NCCIA Cyber Crime Wing in Lahore via high-speed encrypted forensic data lines. (3) Foreground: Concentric radar sweeps locking pulsing amber target crosshairs onto Lahore and Khanewal, framed by soft radial cyan backlighting.',
  18: '3-tier atmospheric depth hierarchy: (1) Backdrop: Intense crisis crimson sky (#7F1D1D to #1A090B) with dramatic diagonal sunburst paper rays. (2) Midground: Heavy reinforced bank vault doors on the left shackled with heavy iron chains and massive padlocks. (3) Foreground: Silhouetted family figures on the right illuminated by pulsing emergency red beacon strobes, overlaid with bold frosted FROZEN compliance stamps and soft backlighting.',
  19: '3-tier atmospheric depth hierarchy: (1) Backdrop: Weathered walnut briefing table wood substrate (#78350F to #1C1917) with deep paper drop shadows. (2) Midground: Unfolded NCCIA Lahore Zone confidential dossier folder with authentic typed Urdu and English charge sheets. (3) Foreground: Family forensic accounting ledger card detailing Brother (5), Wife (2), Sister (1), and Aunt (1), stamped with a prominent red CONFIDENTIAL seal under focused warm spotlight illumination.',
  20: '3-tier atmospheric depth hierarchy: (1) Backdrop: Midnight cyber indigo felt night sky (#1E1B4B to #090D12) over the Lahore urban horizon. (2) Midground: Architectural silhouettes of Lahore flyovers and colonial facades. (3) Foreground: High-speed convoy of NCCIA tactical response pickup trucks with flashing red and blue LED light bars projecting volumetric cone beams across the wet asphalt, rim-lighting fugitive tire tracks.',
  21: '3-tier atmospheric depth hierarchy: (1) Backdrop: Crimson raid shockwave backdrop (#7F1D1D to #1A090B) visible through a shattered entryway. (2) Midground: Lahore safehouse interior with tactical entry team silhouettes in Kevlar helmets and breaching gear. (3) Foreground: Splintered wooden door bursting inward with tactile paper shards and dust motes as rack-mounted LabelsBank server towers are violently unplugged, rimmed by high-contrast flashlight beams.',
  22: '3-tier atmospheric depth hierarchy: (1) Backdrop: Stark midnight felt detention canvas (#1E1B4B to #090D12) devoid of digital color. (2) Midground: Defeated silhouette of Faheem Akram sitting with bowed head in an austere holding cell. (3) Foreground: Extreme close-up silhouette of heavy blued-steel handcuffs snapping shut around trembling coder wrists, illuminated by a single harsh cool overhead rim spotlight.',
  23: '3-tier atmospheric depth hierarchy: (1) Backdrop: Melancholic terracotta dusk over rustic Khanewal village rooftops (#9A3412 to #1C1917). (2) Midground: Narrow brick-walled village lane where whispering neighbors gather outside the family compound. (3) Foreground: Elderly father silhouette resting on a wooden walking stick, staring in devastated silence at the flickering blue light of a CRT television broadcast, framed by somber twilight backlighting.',
  24: '3-tier atmospheric depth hierarchy: (1) Backdrop: Cold federal slate-navy graph grid (#0F172A to #1E3A8A) inscribed with formal treaty and penal code articles. (2) Midground: Split confrontation between Pakistani jail cell masonry on the left and an imposing U.S. federal maximum-security penitentiary wall on the right. (3) Foreground: Prisoner silhouette facing a towering watchtower searchlight beam, anchored by an official U.S. extradition request warrant with high-contrast embossed seals.',
  25: '3-tier atmospheric depth hierarchy: (1) Backdrop: Deep mahogany command desk wood grain (#78350F to #1C1917) with warm corner vignettes. (2) Midground: Complete 8-stage Dan Harmon Story Circle diagram etched into weathered parchment substrate with radial progress spokes. (3) Foreground: Charred and curled $2 counterfeit postal label lying at the circle\'s center, stamped with a bold red weathered SEIZED insignia and haloed by fading golden ember sparks.',
  26: '3-tier atmospheric depth hierarchy: (1) Backdrop: Deep crimson-to-black felt void (#7F1D1D to #1A090B) with volumetric aura falloff. (2) Midground: Computer monitor housing cracking open along sharp structural stress lines under an official DOJ domain seizure seal. (3) Foreground: High-contrast white-hot detonation core erupting into flying tempered glass shards, dissolved barcode pixels, and dark floating ash motes, rimmed by intense radial backlighting.',
  27: '3-tier atmospheric depth hierarchy: (1) Backdrop: Cold indigo felt concrete cell wall (#1E1B4B to #090D12) with tactile mortar joints. (2) Midground: High barred security transom casting long diagonal moonlight stripes across an empty concrete floor where glowing monitors once sat. (3) Foreground: Solitary silhouette of Faheem seated in despair behind thick vertical blued-iron cell bars, rim-lit by a faint, cool celestial backlight.',
  28: '3-tier atmospheric depth hierarchy: (1) Backdrop: Symmetrical warm terracotta dusk sky (#9A3412 to #1C1917) with slowly rotating sunburst paper rays matching Scene 1 Frame 0 precisely for a seamless infinite loop. (2) Midground: Serene Khanewal village rooftop parapet overlooking quiet Punjab horizon trees and brick architecture. (3) Foreground: Empty wooden desk chair beside a closed, dead laptop bathed in golden twilight rim-light, framing the tragic final payoff: Genius without conscience builds its own cage.',
};

const transientTypes = [
  'TEMPO_GRID', 'TEMPO_GRID', 'TEMPO_GRID', 'TEMPO_GRID', 'TEMPO_GRID', 'TEMPO_GRID',
  'CYMBAL_CRASH', 'BASS_DROP', 'BASS_DROP', 'BASS_DROP', 'CYMBAL_CRASH', 'BASS_DROP',
  'CYMBAL_CRASH', 'BASS_DROP', 'BASS_DROP', 'BASS_DROP', 'CYMBAL_CRASH', 'BASS_DROP',
  'CYMBAL_CRASH', 'CYMBAL_CRASH', 'BASS_DROP', 'BASS_DROP', 'BASS_DROP', 'CYMBAL_CRASH',
  'CYMBAL_CRASH', 'BASS_DROP', 'CYMBAL_CRASH', 'CYMBAL_CRASH'
];

const timeline = {
  $schema: './timeline.schema.json',
  meta: {
    title: 'THE $126M POSTAGE FRAUD',
    flagEmoji: '🇵🇰',
    fps: 60,
    width: 1080,
    height: 1920,
    bpm: 103.36,
    bgmFile: 'audio/bgm_postage_fraud.mp3',
    bgmStartFrom: 0,
    bgmLicense: {
      source: 'YouTube Audio (https://youtu.be/Td9DymMNuo0)',
      licenseType: 'CREATIVE_COMMONS',
      clearanceId: 'CLR-POSTAGE-FRAUD-2026',
      attribution: 'SKORN - Slowed (VUKEINE)'
    },
    palette: 'CONFLICT_CRISIS',
    particleEmitter: 'DUST',
    fontFamily: 'Montserrat',
    styleMode: 'DOCUMENTARY_SANS',
    safeZoneProfile: 'CONSERVATIVE_UNION',
    sensitivity: 'STANDARD',
    loopSeamless: true,
    ctaConfig: {
      text: 'FOLLOW FOR TRUE CYBER DOCUMENTARIES',
      subtext: 'HOW ONE CODER STOLE $126M'
    }
  },
  scenes: specs.map((spec, idx) => {
    const meta = sceneAssetMap[spec.scene];
    const sfxOffset = spec.scene === 1 ? 0 : spec.phase2.payoffFrameOffset;
    const sceneObj = {
      sceneId: meta.id,
      startFrame: spec.startFrame,
      durationFrames: spec.durationFrames,
      archetype: spec.archetype,
      hudVisible: Boolean(spec.text.tag),
      camera: {
        movement: spec.camera,
        intensity: spec.archetype === 'STRUCTURAL_FRACTURE' ? 0.95 : 0.65
      },
      transientType: transientTypes[idx],
      transientHitFrame: spec.startFrame + spec.phase2.payoffFrameOffset,
      textLayers: [
        {
          text: spec.text.setup,
          triggerFrameOffset: 0,
          tier: 'PRIMARY_STATEMENT',
          colorToken: 'PURE_WHITE',
          animation: 'HARD_POP'
        },
        {
          text: spec.text.payoff,
          triggerFrameOffset: spec.phase2.payoffFrameOffset,
          tier: 'SECONDARY_ACCENT',
          colorToken: 'ALERT_RED',
          animation: 'SCALE_SLAM',
          rollingCounter: /\d/.test(spec.text.payoff)
        }
      ],
      visualPayload: {
        stageStyle: spec.staging,
        skyGradient: meta.sky,
        svgForegroundAsset: meta.asset,
        referencePlate: spec.plate,
        atmosphericPlatePrompt: atmosphericPrompts[spec.scene]
      },
      sfxTriggers: [
        {
          sfxFile: spec.sfx.file,
          frameOffset: sfxOffset,
          leadFrames: 2
        }
      ]
    };

    if (spec.text.tag) {
      sceneObj.headerContext = spec.text.tag;
    }

    if (spec.sensitivity) {
      sceneObj.sensitivity = spec.sensitivity;
    }

    if (spec.claim) {
      sceneObj.claim = spec.claim;
    }

    if (spec.archetype === 'QUOTE_CARD') {
      sceneObj.visualPayload.quoteAttribution = 'BBC NEWS / DOJ INDICTMENT (2026)';
    }

    if (meta.counter) {
      sceneObj.visualPayload.counterConfig = meta.counter;
    }

    if (spec.archetype === 'STRUCTURAL_FRACTURE') {
      sceneObj.structuralFractureHitFrame = spec.startFrame + spec.phase2.payoffFrameOffset;
    }

    return sceneObj;
  })
};

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);
const valid = validate(timeline);

if (!valid) {
  console.error('Validation failed with errors:', validate.errors);
  process.exit(1);
}

const timelineJson = JSON.stringify(timeline, null, 2) + '\n';
fs.writeFileSync('src/timelines/postage_fraud_2026.json', timelineJson, 'utf8');
fs.writeFileSync('src/timelines/current_reel.json', timelineJson, 'utf8');

const hash = crypto.createHash('sha256').update(timelineJson).digest('hex');
const manifestPath = path.resolve('projects/postage-fraud-2026/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
manifest.updatedAt = new Date().toISOString();
manifest.timeline.sha256 = hash;
manifest.timeline.sceneCount = timeline.scenes.length;
manifest.timeline.totalFrames = timeline.scenes.reduce((sum, s) => sum + s.durationFrames, 0);
manifest.timeline.durationSec = Number((manifest.timeline.totalFrames / 60).toFixed(2));
manifest.typographyAndVisuals.palette = timeline.meta.palette;
manifest.typographyAndVisuals.particleEmitter = timeline.meta.particleEmitter;
manifest.typographyAndVisuals.sensitivityMode = timeline.meta.sensitivity;

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

console.log('AJV validation PASSED!');
console.log('Successfully compiled src/timelines/postage_fraud_2026.json and synced to current_reel.json');
console.log(`Updated projects/postage-fraud-2026/manifest.json (sha256: ${hash})`);
