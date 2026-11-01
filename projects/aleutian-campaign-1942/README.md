# Aleutian Islands Campaign (1942–1943) — Motion Graphics Director Blueprint

## Executive Overview & Narrative Premise
Between June 3, 1942, and August 15, 1943, the United States and the Empire of Japan fought a brutal, fourteen-month struggle across the volcanic archipelago of Alaska: the **Aleutian Islands Campaign**. Known to veterans as the *"Theater of Military Frustration,"* it remains the only World War II land campaign fought on North American soil and the first foreign occupation of U.S. territory since the War of 1812.

Beginning with carrier air raids on Dutch Harbor and the Japanese seizure of Attu and Kiska, the campaign yielded a crucial intelligence windfall when the U.S. salvaged the intact **Akutan Zero**, unlocking the aerodynamic weaknesses of Japan's premier fighter. In May 1943, U.S. forces retook Attu in one of the bloodiest battles in the Pacific, culminating in a desperate dawn banzai charge where only 28 of 2,600 Japanese defenders survived. Three months later, during **Operation Cottage**, 34,000 American and Canadian troops stormed Kiska—only to discover the entire 5,183-man Japanese garrison had vanished under dense Arctic fog weeks earlier, leaving the Allies to suffer 313 casualties fighting ghosts, booby traps, and friendly fire in the mist.

---

## Technical & Motion Specifications
- **Canvas Resolution**: 1080 × 1920 (9:16 Vertical Reel @ 60 FPS)
- **Duration**: ~2,940–3,060 frames (49.0s–51.0s) — Strictly compliant with short-form ceiling ($\le 3,500$ frames)
- **Audio Track**: `audio/bgm_aleutian_hook.mp3` (derived from `https://www.youtube.com/watch?v=Ap4a80WsnBo`)
- **Locked Canvas Palette**: `POLAR_MARITIME`
  - Background: Deep Navy (`#0A1118`) to Arctic Slate (`#162636`)
  - Horizon Backlight: Glacial Cyan (`#38BDF8`) to Signal Red (`#E63228`) combat flares
  - Text Setup: Ice White (`#F4F7FA`)
  - Text Payoff: Signal Red (`#E63228` / `#EF4444`)
- **Atmospheric Particle Emitter**: Persistent driving `SNOW` (Arctic *williwaw* gale across all cuts)
- **Typography**: Single typeface `Montserrat Black` in ALL-CAPS; strictly capped at 6–10 words total per screen (< 40 characters per line)
- **Platform Safe Zones**:
  - Text Zone: $y = 346\text{px}$ to $806\text{px}$ (18% – 42%)
  - Artwork Zone: $y = 864\text{px}$ to $1498\text{px}$ (45% – 78%)
  - Clear Bottom Buffer: $y = 1498\text{px}$ to $1920\text{px}$ (bottom 22% clear)
  - Clear Right Buffer: $x = 918\text{px}$ to $1080\text{px}$ (right 15% clear)
- **Camera Movement Discipline**: Strictly zero snap zooms or crash zooms. Motivated linear push-ins (`SLOW_PUSH_IN`), multiplane parallax horizontal pans (`PARALLAX_PAN_RIGHT`), and impact shudders (`IMPACT_SHAKE`).

---

## 4-Beat Narrative Deconstruction Across All 21 Scenes

### Act 1: The Hook (Scenes 01–02)
#### Scene 01: The Forgotten Invasion of America
- **Archetype**: `SPLIT_CONFRONTATION`
- **Camera**: `SLOW_PUSH_IN` (intensity: 0.6)
- **Text**:
  - Context: `JUNE 1942 • ALASKA TERRITORY`
  - Setup: `THE FORGOTTEN INVASION.`
  - Payoff: `JAPAN SEIZED AMERICAN SOIL.`
- **4 Beats**:
  1. *Inciting trigger*: Imperial Japanese Navy task force crosses the North Pacific toward the Alaskan coast.
  2. *Mechanical/physical reaction*: Split horizon dividing the U.S. Territory signpost and Imperial Rising Sun battle ensign.
  3. *Human/focal perspective*: U.S. coastal lookout silhouette with binoculars scanning the freezing Bering Sea horizon.
  4. *Macro consequence*: North America's territorial integrity is breached for the first time in 130 years.

#### Scene 02: The Williwaw Gale Archipelago
- **Archetype**: `VECTOR_MAP`
- **Camera**: `PARALLAX_PAN_RIGHT` (intensity: 0.7)
- **Text**:
  - Setup: `FROZEN VOLCANIC ISLANDS.`
  - Payoff: `WHIPPED BY ARCTIC GALES.`
- **4 Beats**:
  1. *Inciting trigger*: A 1,200-mile chain of jagged basalt volcanoes stretches west from mainland Alaska toward Kamchatka.
  2. *Mechanical/physical reaction*: Violent 120-mph *williwaw* wind vectors and swirling fog fronts colliding over the Bering Sea.
  3. *Human/focal perspective*: Barometric pressure telemetry dropping rapidly as ice crystallizes across naval instruments.
  4. *Macro consequence*: The harshest maritime battlefield on Earth dictates every tactical move.

---

### Act 2: Inciting Crisis (Scenes 03–07)
#### Scene 03: Bombs Over Dutch Harbor
- **Archetype**: `STRUCTURAL_FRACTURE`
- **Camera**: `IMPACT_SHAKE` (intensity: 0.85)
- **Text**:
  - Context: `JUNE 3, 1942 • DUTCH HARBOR`
  - Setup: `CARRIERS STRUCK DUTCH HARBOR.`
  - Payoff: `BOMBS RAINED ON ALASKA.`
- **4 Beats**:
  1. *Inciting trigger*: Japanese carriers *Ryūjō* and *Jun'yō* launch Val dive-bombers and Zero fighters through breaks in the mist.
  2. *Mechanical/physical reaction*: Fuel storage tanks and barracks at Fort Mears erupt in towering plumes of black oil smoke.
  3. *Human/focal perspective*: Anti-aircraft gunners manning Bofors mounts as shockwaves ripple across Unalaska Bay.
  4. *Macro consequence*: The northern anchor of U.S. Pacific defense is set ablaze.

#### Scene 04: Attu and Kiska Occupied
- **Archetype**: `LONE_LEADER`
- **Camera**: `SLOW_PUSH_IN` (intensity: 0.7)
- **Text**:
  - Context: `ATTU & KISKA ISLANDS`
  - Setup: `ATTU AND KISKA FELL.`
  - Payoff: `FIRST INVASION SINCE 1812.`
- **4 Beats**:
  1. *Inciting trigger*: Japanese Special Naval Landing Forces storm ashore on Kiska (June 6) and Attu (June 7).
  2. *Mechanical/physical reaction*: Japanese soldiers plant the Rising Sun flag (`<WavingFlagSvg />`) atop a snow-swept volcanic ridge.
  3. *Human/focal perspective*: Armed silhouette in winter greatcoat and helmet standing over captured U.S. weather station ruins.
  4. *Macro consequence*: Two American islands are renamed and fortified as Imperial garrisons.

#### Scene 05: The Crash of the Akutan Zero
- **Archetype**: `VEHICLE_IN_TRANSIT`
- **Camera**: `PARALLAX_PAN_RIGHT` (intensity: 0.8)
- **Text**:
  - Context: `AKUTAN ISLAND BOG`
  - Setup: `ONE DAMAGED ZERO FIGHTER.`
  - Payoff: `CRASHED INTACT IN A BOG.`
- **4 Beats**:
  1. *Inciting trigger*: Flight Petty Officer Tadayoshi Koga's A6M2 Zero has its oil line severed by small-arms fire over Dutch Harbor.
  2. *Mechanical/physical reaction*: Landing wheels catch in soft tundra muskeg on Akutan Island, flipping the fighter upside-down nearly undamaged.
  3. *Human/focal perspective*: Trailing black oil smoke and inverted canopy resting silently in the marsh grass.
  4. *Macro consequence*: Japan's most closely guarded aviation secret lies exposed on an Alaskan island.

#### Scene 06: Cracking the Zero's Secret
- **Archetype**: `VECTOR_MAP`
- **Camera**: `SLOW_PUSH_IN` (intensity: 0.7)
- **Text**:
  - Setup: `AMERICA SALVAGED THE WRECK.`
  - Payoff: `EXPOSING EVERY FATAL FLAW.`
- **4 Beats**:
  1. *Inciting trigger*: A U.S. PBY Catalina spots the wreck; salvage crews haul the Akutan Zero back to San Diego for flight testing.
  2. *Mechanical/physical reaction*: Orthographic engineering schematic of the A6M2 Zero highlighting locked ailerons and carburetor cutout above 200 knots.
  3. *Human/focal perspective*: Test pilot telemetry vectors showing a steep right-hand dive and roll advantage for U.S. Hellcats.
  4. *Macro consequence*: The intelligence breakthrough turns the tide of air combat across the entire Pacific War.

#### Scene 07: The Blind Weather War
- **Archetype**: `VEHICLE_IN_TRANSIT`
- **Camera**: `PARALLAX_PAN_RIGHT` (intensity: 0.7)
- **Text**:
  - Setup: `BLINDING BERING SEA FOG.`
  - Payoff: `SWALLOWED PLANES WHOLE.`
- **4 Beats**:
  1. *Inciting trigger*: Eleventh Air Force B-24 Liberators fly blind bombing sorties through zero-visibility soup.
  2. *Mechanical/physical reaction*: Severe wing icing and violent downdrafts force bombers toward jagged unseen mountain peaks.
  3. *Human/focal perspective*: Cockpit altimeter spinning wildly as fog swallows the squadron formation.
  4. *Macro consequence*: More Allied aircraft and crews are lost to Aleutian weather than to Japanese fighters.

---

### Act 3: Escalating Crucible (Scenes 08–14)
#### Scene 08: Battle of the Komandorski Islands
- **Archetype**: `VEHICLE_IN_TRANSIT`
- **Camera**: `IMPACT_SHAKE` (intensity: 0.75)
- **Text**:
  - Context: `MARCH 1943 • BERING SEA`
  - Setup: `OUTGUNNED CRUISERS HELD FIRM.`
  - Payoff: `CHOKED JAPAN'S SUPPLY LINE.`
- **4 Beats**:
  1. *Inciting trigger*: Rear Admiral Charles McMorris's small task force intercepts a heavily armed Japanese reinforcement fleet.
  2. *Mechanical/physical reaction*: Heavy cruiser *USS Salt Lake City* fires broadside salvos across pitching Arctic swells while laying a thick smokescreen.
  3. *Human/focal perspective*: Gun turrets flashing crimson against ice-covered decks during a 3.5-hour daylight duel.
  4. *Macro consequence*: Japan permanently abandons surface resupply to the Aleutians, isolating Attu and Kiska.

#### Scene 09: Operation Landcrab — Storming Attu
- **Archetype**: `CROWD_TALLY`
- **Camera**: `SLOW_PUSH_IN` (intensity: 0.75)
- **Text**:
  - Context: `MAY 11, 1943 • ATTU ISLAND`
  - Setup: `ELEVEN THOUSAND TROOPS LANDED.`
  - Payoff: `ONTO FROZEN ATTU BEACHES.`
- **4 Beats**:
  1. *Inciting trigger*: U.S. 7th Infantry Division launches Operation Landcrab, hitting Massacre Bay and Holtz Bay.
  2. *Mechanical/physical reaction*: Higgins landing craft ramps drop into freezing surf; infantry silhouettes wade ashore with rolling troop counter.
  3. *Human/focal perspective*: Soldiers slogging through knee-deep black tundra muck under naval gunfire support.
  4. *Macro consequence*: The amphibious assault to liberate American soil begins.

#### Scene 10: Ghosts on the High Ridges
- **Archetype**: `SPLIT_CONFRONTATION`
- **Camera**: `SLOW_PUSH_IN` (intensity: 0.8)
- **Text**:
  - Setup: `JAPAN HELD THE PEAKS.`
  - Payoff: `FIRING THROUGH DENSE MIST.`
- **4 Beats**:
  1. *Inciting trigger*: Colonel Yasuyo Yamasaki refuses to defend the beaches, fortifying the 3,000-foot snow ridges above the fog ceiling.
  2. *Mechanical/physical reaction*: Machine-gun tracers streak downward from hidden mountain bunkers into the exposed valley floor below.
  3. *Human/focal perspective*: Pinned-down American riflemen shielding behind tundra rocks against invisible sniper fire.
  4. *Macro consequence*: Every yard of vertical ascent becomes a freezing meatgrinder.

#### Scene 11: Frostbite in the Tundra
- **Archetype**: `CROWD_TALLY`
- **Camera**: `SLOW_PUSH_IN` (intensity: 0.65)
- **Text**:
  - Setup: `BOOTS FROZE SOLID IN MUD.`
  - Payoff: `FROSTBITE CRIPPLED THOUSANDS.`
- **4 Beats**:
  1. *Inciting trigger*: Troops deployed in desert-trained gear with uninsulated leather boots face sub-freezing sleet and gale winds.
  2. *Mechanical/physical reaction*: Wet leather freezes solid; 1,800 exposure casualties tallied alongside combat wounds.
  3. *Human/focal perspective*: Silhouettes of shivering soldiers huddled in flooded foxholes rubbing frozen hands.
  4. *Macro consequence*: Cold injury incapacitates more American soldiers on Attu than Japanese bullets.

#### Scene 12: Castner's Cutthroats Scale the Cliffs
- **Archetype**: `LONE_LEADER`
- **Camera**: `SLOW_PUSH_IN` (intensity: 0.8)
- **Text**:
  - Context: `1ST ALASKA COMBAT INTEL`
  - Setup: `ALASKA SCOUTS SCALED CLIFFS.`
  - Payoff: `BREAKING THE MOUNTAIN LINE.`
- **4 Beats**:
  1. *Inciting trigger*: Colonel Lawrence Castner deploys his elite reconnaissance platoon of Alaskan trappers, miners, and native Aleuts.
  2. *Mechanical/physical reaction*: Scouts with climbing ropes and Trapper Nelson packs ascend vertical ice-crusted crags behind enemy lines.
  3. *Human/focal perspective*: Lead scout silhouette cresting Cold Mountain with a combat knife and rifle against the aurora-lit mist.
  4. *Macro consequence*: The Japanese high-ground defenses are outflanked and compressed into Chichagof Harbor.

#### Scene 13: The Dawn Banzai Charge at Engineer Hill
- **Archetype**: `STRUCTURAL_FRACTURE`
- **Camera**: `IMPACT_SHAKE` (intensity: 0.95)
- **Text**:
  - Context: `MAY 29, 1943 • ENGINEER HILL`
  - Setup: `A DESPERATE DAWN CHARGE.`
  - Payoff: `HAND-TO-HAND IN THE SNOW.`
- **4 Beats**:
  1. *Inciting trigger*: Out of food and ammunition, Col. Yamasaki leads his surviving 800 men in a silent pre-dawn breakthrough assault.
  2. *Mechanical/physical reaction*: Japanese troops overrun frontline trenches and clash with U.S. combat engineers wielding bayonets and shovels.
  3. *Human/focal perspective*: Silhouettes locked in brutal close-quarters combat amid burning tents and grenade flashes.
  4. *Macro consequence*: The engineers hold the crest of Engineer Hill, shattering the final Japanese offensive.

#### Scene 14: The Blood Price of Attu
- **Archetype**: `CROWD_TALLY`
- **Camera**: `SLOW_PUSH_IN` (intensity: 0.7)
- **Text**:
  - Setup: `TWO THOUSAND DEFENDERS DIED.`
  - Payoff: `ONLY TWENTY-EIGHT SURVIVED.`
- **4 Beats**:
  1. *Inciting trigger*: Cornered survivors detonate grenades against their chests rather than surrender.
  2. *Mechanical/physical reaction*:Stark battlefield of upright rifles in the snow paired with the 2,351 vs 28 survival ratio.
  3. *Human/focal perspective*: Exhausted U.S. infantryman standing in silence over the smoking Chichagof valley.
  4. *Macro consequence*: Attu becomes the second deadliest battle by proportion in the Pacific Theater, surpassed only by Iwo Jima.

---

### Act 4: The Turning Point — The Ghost of Kiska (Scenes 15–18)
#### Scene 15: Fortress Kiska Remains
- **Archetype**: `VECTOR_MAP`
- **Camera**: `SLOW_PUSH_IN` (intensity: 0.7)
- **Text**:
  - Context: `JULY 1943 • KISKA ISLAND`
  - Setup: `ONE STRONGHOLD REMAINED.`
  - Payoff: `FIVE THOUSAND MEN ON KISKA.`
- **4 Beats**:
  1. *Inciting trigger*: Allied planners prepare a massive amphibious armada to crush the remaining Japanese fortress on Kiska.
  2. *Mechanical/physical reaction*: Tactical contour map of Kiska Volcano surrounded by naval blockade rings and coastal battery markers.
  3. *Human/focal perspective*: Aerial reconnaissance crosshairs locking onto Kiska Harbor through heavy cloud cover.
  4. *Macro consequence*: Commanders brace for an even bloodier slaughter than Attu.

#### Scene 16: Kimura's 55-Minute Fog Evacuation
- **Archetype**: `VEHICLE_IN_TRANSIT`
- **Camera**: `PARALLAX_PAN_RIGHT` (intensity: 0.85)
- **Text**:
  - Context: `JULY 28, 1943 • 55 MINUTES`
  - Setup: `EIGHT SHIPS SLIPPED IN.`
  - Payoff: `VANISHING IN FIFTY-FIVE MINUTES.`
- **4 Beats**:
  1. *Inciting trigger*: While U.S. battleships leave to refuel after chasing phantom radar echoes, Rear Adm. Masatomi Kimura dashes into Kiska Harbor.
  2. *Mechanical/physical reaction*: Cruisers and destroyers materialized out of dense fog, embarking all 5,183 troops in under an hour and slipping away unseen.
  3. *Human/focal perspective*: Ghostly warship silhouettes gliding through rolling gray fog banks with darkened running lights.
  4. *Macro consequence*: One of the most flawless clandestine naval evacuations in military history leaves Kiska completely empty.

#### Scene 17: Bombarding an Empty Island
- **Archetype**: `STRUCTURAL_FRACTURE`
- **Camera**: `IMPACT_SHAKE` (intensity: 0.8)
- **Text**:
  - Setup: `ALLIED GUNS POUNDED ROCK.`
  - Payoff: `BOMBING AN EMPTY ISLAND.`
- **4 Beats**:
  1. *Inciting trigger*: Unaware the garrison has vanished, U.S. Navy battleships and Eleventh Air Force bombers unleash weeks of heavy bombardment.
  2. *Mechanical/physical reaction*: Hundreds of tons of shells and bombs crater deserted bunkers and empty tundra slopes.
  3. *Human/focal perspective*: Enormous geysers of volcanic rock and snow erupting across an uninhabited shoreline.
  4. *Macro consequence*: Intelligence attributes the lack of return fire to Japanese discipline hiding deep underground.

#### Scene 18: Operation Cottage — 34,000 Storm Ashore
- **Archetype**: `LONE_LEADER`
- **Camera**: `SLOW_PUSH_IN` (intensity: 0.75)
- **Text**:
  - Context: `AUGUST 15, 1943 • KISKA`
  - Setup: `THIRTY-FOUR THOUSAND STORMED ASHORE.`
  - Payoff: `NOBODY WAS THERE.`
- **4 Beats**:
  1. *Inciting trigger*: 34,426 American and Canadian troops land on Kiska with bayonets fixed, expecting fanatical resistance.
  2. *Mechanical/physical reaction*: Troops breach silent, abandoned underground tunnels and find only cold coffee pots and a few stray dogs.
  3. *Human/focal perspective*: Allied soldier silhouette standing perplexed beside an empty coastal artillery gun in the swirling snow.
  4. *Macro consequence*: The largest invasion force in North American history has landed on an empty island.

---

### Act 5: Symmetric Resolution & Epilogue (Scenes 19–21)
#### Scene 19: Fighting Phantoms in the Fog
- **Archetype**: `SPLIT_CONFRONTATION`
- **Camera**: `IMPACT_SHAKE` (intensity: 0.85)
- **Text**:
  - Setup: `SOLDIERS FIRED AT SHADOWS.`
  - Payoff: `TRAPPED BY MINES AND FOG.`
- **4 Beats**:
  1. *Inciting trigger*: Jittery U.S. and Canadian units advancing through zero-visibility fog mistake each other for Japanese counterattackers.
  2. *Mechanical/physical reaction*: Friendly fire exchanges erupt across the ridges while hidden Japanese booby traps and a sea mine under *USS Abner Read* detonate.
  3. *Human/focal perspective*: Muzzle flashes in the mist and the stern of *USS Abner Read* rocked by a massive underwater explosion.
  4. *Macro consequence*: Fear, fog, and leftover mines turn an unopposed landing into a deadly nightmare.

#### Scene 20: The Ghost Toll of Kiska
- **Archetype**: `CROWD_TALLY`
- **Camera**: `SLOW_PUSH_IN` (intensity: 0.7)
- **Text**:
  - Setup: `THREE HUNDRED ALLIED CASUALTIES.`
  - Payoff: `FIGHTING AN EMPTY ISLAND.`
- **4 Beats**:
  1. *Inciting trigger*: After days of searching every cave on Kiska, commanders confirm the Japanese left weeks ago.
  2. *Mechanical/physical reaction*: Casualty counter rolls up to 313 Allied dead, wounded, and frostbitten against zero Japanese defenders present.
  3. *Human/focal perspective*: Medics evacuating wounded soldiers through the mist past abandoned Japanese shrines.
  4. *Macro consequence*: A haunting testament to the psychological terror and lethal climate of the Aleutian theater.

#### Scene 21: Epilogue — American Soil Reclaimed
- **Archetype**: `LONE_LEADER`
- **Camera**: `SLOW_PUSH_IN` (intensity: 0.6)
- **Text**:
  - Context: `THE FORGOTTEN CAMPAIGN`
  - Setup: `FOUR THOUSAND LIVES LOST.`
  - Payoff: `RECLAIMING AMERICAN SOIL.`
- **4 Beats**:
  1. *Inciting trigger*: On August 24, 1943, the Aleutian Islands are officially declared secure and returned to U.S. control.
  2. *Mechanical/physical reaction*: American and Canadian flags (`<WavingFlagSvg />`) flying side-by-side over the snow-covered volcanic peaks of Attu and Kiska.
  3. *Human/focal perspective*: Weathered memorial silhouette overlooking the icy Bering Sea waves.
  4. *Macro consequence*: Over 4,300 Allied and Japanese lives were lost in the only WWII campaign fought on North American soil.
