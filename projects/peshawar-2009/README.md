# Project: 28 October 2009 Peshawar Bombing Reel

## Overview
A high-retention 9:16 kinetic motion graphics documentary reel covering the devastating car bomb attack on Meena Bazaar / Peepal Mandi in Peshawar on 28 October 2009, which claimed 137 innocent lives (mostly women and children) on the exact day Hillary Clinton touched down in Islamabad.

## Specifications
- **Resolution**: 1080 x 1920 (9:16 vertical)
- **Framerate**: 60 FPS
- **BPM**: 119 BPM (beat-quantized keyframes; 121 frames per bar)
- **Duration**: 3,388 frames / 56.47 seconds (strictly $\le 58.5\text{s}$ short-form ceiling to prevent Content ID length blocks)
- **Scenes**: 14 scenes (exactly 2 bars / 242 frames per scene)
- **Audio**: `public/audio/bgm_peshawar.mp3` + synchronized procedural SFX library

## Directory Structure
- `timeline.json`: Frame-accurate timeline specification adhering to `timeline.schema.json`.
- `plates/`: Historical photographs, archival research files, maps, and diplomatic portraits.
- `audit/`: Rendered visual audit still frames for all 14 scenes.
- `peshawar_2009_reel.mp4`: Rendered production video.

## Visual & Architectural Standard (Zero Direct Image Pasting)
- **Environments & Objects**: Archival photographs of bazaar streets, collapsed aftermaths, and colonial hospitals serve strictly as **visual reference** to draw custom, high-contrast parametric 2D SVG vector art.
- **Historical Figures**: Historical figures (FM Shah Mahmood Qureshi, Secretary Hillary Clinton) have their archival portraits cropped and rigged onto articulated die-cut sticker `<CutoutPuppet />` stages with beat-reactive poses.
- **Zero Raw Photographs Pasted**: No raw photo cards or rectangular JPG slabs are displayed on screen, guaranteeing aesthetic purity and visual consistency.

## Vector Components
Defined in `src/components/PeshawarVectors.tsx`:
- `PeshawarBazaarAlleySilhouette`: Handcrafted Old Peshawar bazaar vector architecture (jharokha balconies, pinjra-kari lattices, glowing lanterns, striped canopies) referenced from `peshawar_old_bazaar.jpg`.
- `SedanBombSchematic`: Technical blueprint callout of the 150 kg white sedan explosive device.
- `BlastShockwaveVector`: Kinetic detonation shockwave, collapsing plaza walls, and volumetric dust clouds.
- `FireAndRubblePhotoCard`: Tactile SVG ruins, twisted steel I-beams, procedural flame vectors, and volumetric smoke referenced from `peshawar_blast_rferl.jpg`.
- `RickshawRescueSilhouette`: Speeding autorickshaw evacuation through rubble.
- `LadyReadingHospitalEmergencyCard`: LRH colonial red-brick facade, pulsing red cross emblem, and emergency ambulance bay referenced from `lady_reading_hospital.jpg`.
- `PeshawarCasualtiesCounter`: Rolling casualty counter reaching 137 martyrs.
- `ClintonArrivalDiplomaticCard`: Diplomatic Boeing VIP transport silhouette and airbase touchdown notice.
- `WaziristanOperationMapVector`: Topographical tactical map of Operation Rah-e-Nijat.
- `IntelligenceDisavowalSchematic`: Dual stamped intelligence dossier intercepts (TTP & Al-Qaeda denials).
- `ClintonQureshiPressCard`: Dual `<CutoutPuppet />` diplomatic stage (FM Qureshi & Sec. Clinton with archival cutout heads and bilateral podiums).
- `ClintonDiplomaticPuppetStage`: Secretary Clinton solo puppet stage with diplomatic seal and quote placard.
- `ItalyOlbiaContinentalMapVector`: Continental flight path map from Islamabad to Olbia, Italy.
- `PeshawarRebuildSilhouette`: Bab-e-Khyber gateway arch, market stalls, and rising sunburst rays.
- `PeshawarMemorialPlinth`: Gold laurel wreath, animated candles, and brass memorial plaque.
- `PakistanFlagMemorialStage`: 120-slice waving cloth Pakistan national flag.
- `PeshawarEpilogueCard`: Weathered brass memorial plaque with wax seal.
