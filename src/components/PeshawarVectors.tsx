import React from 'react';
import { useCurrentFrame, interpolate, staticFile, Img } from 'remotion';
import { loadFont as loadBlackOpsOne } from '@remotion/google-fonts/BlackOpsOne';
import { loadFont as loadBarlowCondensed } from '@remotion/google-fonts/BarlowCondensed';
import { loadFont as loadCourierPrime } from '@remotion/google-fonts/CourierPrime';
import { loadFont as loadCaveat } from '@remotion/google-fonts/Caveat';
import { CutoutPuppet } from './CutoutPuppet';
import { PaperSignCounter } from './TactilePropCards';
import { WavingFlagSvg } from './WavingFlagSvg';
import { WeatheredMilitaryStamp } from '../kit';

const blackOps = loadBlackOpsOne('normal', { weights: ['400'], subsets: ['latin'] });
const barlow = loadBarlowCondensed('normal', { weights: ['700'], subsets: ['latin'] });
const courier = loadCourierPrime('normal', { weights: ['400'], subsets: ['latin'] });
const caveat = loadCaveat('normal', { weights: ['700'], subsets: ['latin'] });

/**
 * 1. PESHAWAR BAZAAR STREET SILHOUETTE
 * Dense historic Old Peshawar streetscape drawn from historical photographic reference:
 * Carved wooden jharokha balconies with pinjra-kari lattice screens, traditional brick
 * archways, striped fabric awnings swaying in the breeze, glowing brass lanterns,
 * with the market title seamlessly integrated into the architectural archway lintel
 * so the entire vector bazaar is completely unobstructed.
 */
export const PeshawarBazaarAlleySilhouette: React.FC = () => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame * 0.08) * 3;
  const lanternGlow = 0.85 + 0.15 * Math.sin(frame * 0.2);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Background Historic Silhouette Buildings (y > 1320) */}
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="bazaarLanternGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4B942" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#E28743" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#E28743" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Distant Peshawar minarets and Bala Hisar parapets */}
        <g opacity="0.32" fill="#1C2430">
          <rect x="80" y="1320" width="160" height="240" />
          <polygon points="160,1260 145,1320 175,1320" />
          <rect x="300" y="1340" width="220" height="220" />
          <rect x="580" y="1310" width="190" height="250" />
          <polygon points="675,1250 660,1310 690,1310" />
          <rect x="820" y="1330" width="180" height="230" />
        </g>

        {/* Midground Historic Old Peshawar Multi-Story Bazaar Architecture (referenced from peshawar_old_bazaar.jpg) */}
        <g transform="translate(0, 0)">
          {/* Left Building Facade (3-story brick & timber, unblocked) */}
          <path d="M 0 860 L 360 860 L 360 1520 L 0 1520 Z" fill="#151A22" stroke="#252D3A" strokeWidth="2" />
          {/* Decorative Brick Cornice Dentils */}
          {[-10, 40, 90, 140, 190, 240, 290, 340].map((dx) => (
            <rect key={dx} x={dx} y="860" width="30" height="18" fill="#202734" />
          ))}

          {/* Upper Jharokha (Carved Cantilevered Wooden Balcony) - Left */}
          <g transform="translate(50, 900)">
            {/* Balcony Roof / Canopy with carved trim */}
            <polygon points="-10,0 250,0 230,28 10,28" fill="#3A281E" stroke="#5A3E2D" strokeWidth="2" />
            {/* Balcony Enclosure */}
            <rect x="10" y="28" width="220" height="135" fill="#261A13" stroke="#5A3E2D" strokeWidth="2.5" />
            {/* Pinjra-Kari (Intricate Geometric Lattice Windows) */}
            {[25, 95, 165].map((wx) => (
              <g key={wx} transform={`translate(${wx}, 45)`}>
                <rect width="50" height="80" rx="3" fill="#140E0A" stroke="#8C6245" strokeWidth="1.5" />
                <line x1="0" y1="28" x2="50" y2="28" stroke="#8C6245" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="56" x2="50" y2="56" stroke="#8C6245" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="25" y1="0" x2="25" y2="80" stroke="#8C6245" strokeWidth="1" strokeDasharray="3 3" />
              </g>
            ))}
            {/* Carved Wooden Supporting Struts / Corbels below balcony */}
            <polygon points="10,163 40,163 25,205" fill="#5A3E2D" />
            <polygon points="110,163 130,163 120,205" fill="#5A3E2D" />
            <polygon points="200,163 230,163 215,205" fill="#5A3E2D" />
          </g>

          {/* Mid-level Balcony Window on Left Building */}
          <g transform="translate(60, 1140)">
            <path d="M 0 60 L 0 25 Q 40 -10 80 25 L 80 60 Z" fill="#20150F" stroke="#5A3E2D" strokeWidth="2" />
            <path d="M 120 60 L 120 25 Q 160 -10 200 25 L 200 60 Z" fill="#20150F" stroke="#5A3E2D" strokeWidth="2" />
          </g>

          {/* Right Building Facade (3-story brick & timber, unblocked) */}
          <path d="M 720 860 L 1080 860 L 1080 1520 L 720 1520 Z" fill="#151A22" stroke="#252D3A" strokeWidth="2" />
          {/* Decorative Brick Cornice Dentils - Right */}
          {[730, 780, 830, 880, 930, 980, 1030].map((dx) => (
            <rect key={dx} x={dx} y="860" width="30" height="18" fill="#202734" />
          ))}

          {/* Upper Jharokha (Carved Wooden Balcony) - Right */}
          <g transform="translate(760, 890)">
            <polygon points="-10,0 250,0 230,28 10,28" fill="#3A281E" stroke="#5A3E2D" strokeWidth="2" />
            <rect x="10" y="28" width="220" height="145" fill="#261A13" stroke="#5A3E2D" strokeWidth="2.5" />
            {[25, 95, 165].map((wx) => (
              <g key={wx} transform={`translate(${wx}, 45)`}>
                <rect width="50" height="85" rx="3" fill="#140E0A" stroke="#8C6245" strokeWidth="1.5" />
                <line x1="0" y1="30" x2="50" y2="30" stroke="#8C6245" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="60" x2="50" y2="60" stroke="#8C6245" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="25" y1="0" x2="25" y2="85" stroke="#8C6245" strokeWidth="1" strokeDasharray="3 3" />
              </g>
            ))}
            <polygon points="10,173 40,173 25,215" fill="#5A3E2D" />
            <polygon points="110,173 130,173 120,215" fill="#5A3E2D" />
            <polygon points="200,173 230,173 215,215" fill="#5A3E2D" />
          </g>

          {/* Mid-level Balcony Window on Right Building */}
          <g transform="translate(790, 1140)">
            <path d="M 0 60 L 0 25 Q 40 -10 80 25 L 80 60 Z" fill="#20150F" stroke="#5A3E2D" strokeWidth="2" />
            <path d="M 120 60 L 120 25 Q 160 -10 200 25 L 200 60 Z" fill="#20150F" stroke="#5A3E2D" strokeWidth="2" />
          </g>

          {/* Central Connecting Historic Timber Gateway Spanning Alley (x: 360 to 720) */}
          <g>
            {/* Structural Wooden Lintel Cross-Beam Resting on Both Buildings */}
            <rect x="360" y="980" width="360" height="22" fill="#2E1F17" stroke="#4D3426" strokeWidth="2" />
            {/* Decorative Wall Mounting Plates */}
            <rect x="356" y="976" width="16" height="30" fill="#140E0A" />
            <rect x="708" y="976" width="16" height="30" fill="#140E0A" />

            {/* Carved Wooden Supporting Corbel Brackets under the Beam */}
            <polygon points="360,1002 360,1048 405,1002" fill="#3D291F" stroke="#5A3E2D" strokeWidth="1.5" />
            <polygon points="720,1002 720,1048 675,1002" fill="#3D291F" stroke="#5A3E2D" strokeWidth="1.5" />

            {/* Hanging Wrought-Iron Chains Suspending Wooden Sign */}
            <line x1="435" y1="1002" x2="435" y2="1022" stroke="#8C6245" strokeWidth="2.5" />
            <line x1="645" y1="1002" x2="645" y2="1022" stroke="#8C6245" strokeWidth="2.5" />

            {/* Architectural Carved Wooden Gateway Lintel Sign (width 320, perfectly centered at x=540) */}
            <g transform="translate(380, 1022)">
              <rect
                x="0"
                y="0"
                width="320"
                height="58"
                rx="4"
                fill="#241711"
                stroke="#8C6245"
                strokeWidth="2.5"
              />
              {/* Inner Decorative Inlay Border */}
              <rect
                x="4"
                y="4"
                width="312"
                height="50"
                rx="2"
                fill="none"
                stroke="#D4A340"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
              {/* Vintage Sign Typography */}
              <text
                x="160"
                y="27"
                textAnchor="middle"
                fill="#F4B942"
                fontFamily={blackOps.fontFamily}
                fontSize="19"
                letterSpacing="2.5px"
              >
                MEENA BAZAAR
              </text>
              <text
                x="160"
                y="45"
                textAnchor="middle"
                fill="#EAE3D2"
                fontFamily={courier.fontFamily}
                fontSize="11"
                fontWeight="700"
                letterSpacing="2.5px"
              >
                PEEPAL MANDI • PESHAWAR
              </text>
            </g>

            {/* Hanging Antique Brass Lantern Suspended from Sign with Radial Glow */}
            <g transform="translate(540, 1080)">
              <line x1="0" y1="0" x2="0" y2="35" stroke="#A46B10" strokeWidth="2.5" />
              <circle cx="0" cy="65" r="95" fill="url(#bazaarLanternGlow)" opacity={lanternGlow} />
              <polygon points="-16,35 16,35 24,70 -24,70" fill="#5A3E15" stroke="#F4B942" strokeWidth="1.5" />
              <polygon points="-24,70 24,70 14,95 -14,95" fill="#3B280E" stroke="#F4B942" strokeWidth="1.5" />
              <circle cx="0" cy="62" r="7" fill="#FFF2B2" />
            </g>
          </g>

          {/* Deep Alleyway Perspective View (looking past the arch into distant shops) */}
          <g opacity="0.45" transform="translate(540, 1260)">
            <polygon points="-90,140 -50,60 50,60 90,140" fill="#141922" />
            <rect x="-40" y="70" width="80" height="70" fill="#0E1218" />
            {/* Distant street market stalls */}
            <rect x="-80" y="110" width="45" height="30" fill="#8B262B" />
            <rect x="35" y="110" width="45" height="30" fill="#204068" />
          </g>

          {/* Silhouettes of Morning Bazaar Shoppers (Women in traditional shawls & children) */}
          <g fill="#0D1117">
            {/* Mother and child walking through center alley */}
            <g transform="translate(510, 1420)">
              {/* Woman in draped chador */}
              <ellipse cx="0" cy="0" rx="10" ry="12" />
              <path d="M -16 12 Q 0 4 16 12 L 20 80 L -20 80 Z" />
              {/* Small child holding mother's hand */}
              <ellipse cx="28" cy="38" rx="7" ry="8" />
              <path d="M 18 46 Q 28 42 38 46 L 40 80 L 16 80 Z" />
            </g>

            {/* Woman shopping at right market stall */}
            <g transform="translate(710, 1430)">
              <ellipse cx="0" cy="0" rx="9" ry="11" />
              <path d="M -14 11 Q 0 4 14 11 L 18 70 L -18 70 Z" />
            </g>

            {/* Shopper browsing left market counter */}
            <g transform="translate(370, 1435)">
              <ellipse cx="0" cy="0" rx="9" ry="11" />
              <path d="M -14 11 Q 0 4 14 11 L 18 65 L -18 65 Z" />
            </g>
          </g>

          {/* Swaying Striped Marketplace Canopies / Awnings (flanking ground stalls) */}
          <g transform={`rotate(${sway} 180 1300)`}>
            <polygon points="30,1280 360,1280 330,1370 10,1370" fill="#8B262B" opacity="0.92" />
            <polygon points="80,1280 130,1280 110,1370 60,1370" fill="#EAE3D2" opacity="0.9" />
            <polygon points="180,1280 230,1280 210,1370 160,1370" fill="#EAE3D2" opacity="0.9" />
            <polygon points="280,1280 330,1280 310,1370 260,1370" fill="#EAE3D2" opacity="0.9" />
          </g>
          <g transform={`rotate(${-sway} 900 1300)`}>
            <polygon points="720,1280 1050,1280 1070,1370 740,1370" fill="#204068" opacity="0.92" />
            <polygon points="770,1280 820,1280 840,1370 790,1370" fill="#EAE3D2" opacity="0.9" />
            <polygon points="870,1280 920,1280 940,1370 890,1370" fill="#EAE3D2" opacity="0.9" />
            <polygon points="970,1280 1020,1280 1040,1370 990,1370" fill="#EAE3D2" opacity="0.9" />
          </g>

          {/* Lower Ground Stalls & Fabric Displays */}
          <g transform="translate(0, 1360)">
            {/* Left Stall Counters */}
            <rect x="20" y="20" width="320" height="140" fill="#121820" stroke="#3A281E" strokeWidth="2" />
            {/* Stacked textile bolts */}
            {[-10, 20, 50, 80].map((by, idx) => (
              <rect
                key={idx}
                x="40"
                y={40 + by}
                width="280"
                height="22"
                rx="4"
                fill={idx % 3 === 0 ? '#8B262B' : idx % 3 === 1 ? '#D4A340' : '#2E4A62'}
              />
            ))}

            {/* Right Stall Counters */}
            <rect x="740" y="20" width="320" height="140" fill="#121820" stroke="#3A281E" strokeWidth="2" />
            {/* Stacked spice sacks */}
            {[760, 840, 920, 1000].map((sx, idx) => (
              <g key={idx} transform={`translate(${sx}, 50)`}>
                <path d="M 0 50 Q -5 10 20 10 Q 45 10 40 50 Z" fill={idx % 2 === 0 ? '#C27D38' : '#8B3A2B'} />
                <ellipse cx="20" cy="10" rx="20" ry="6" fill="#F4B942" />
              </g>
            ))}
          </g>

          {/* Street Level Cobblestone ground plane */}
          <rect x="0" y="1520" width="1080" height="400" fill="#0A0D12" />
          <line x1="0" y1="1520" x2="1080" y2="1520" stroke="#3A2D23" strokeWidth="4" />
          {/* Cobblestone paving texture */}
          {[120, 280, 440, 600, 760, 920].map((cx) => (
            <ellipse key={cx} cx={cx} cy="1545" rx="55" ry="12" fill="#18202A" opacity="0.6" />
          ))}
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. VEHICLE BOMB 150KG COUNTER & SCHEMATIC
 * Technical blueprint callout of the white sedan packed with 150 kg explosives.
 * Live PaperSignCounter rolling to 150 KG with warning stamps.
 */
export const SedanBombSchematic: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Blueprint Grid & Vehicle Wireframe Silhouette (confined to y 1180 - 1500) */}
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <g transform="translate(540, 1360)">
          {/* Blueprint car silhouette (Sedan profile) */}
          <path
            d="M -320 40 L -290 -10 L -180 -25 L -90 -95 L 120 -95 L 210 -25 L 310 -15 L 330 40 L 270 40 Q 230 -20 190 40 L -150 40 Q -190 -20 -230 40 Z"
            fill="#121820"
            stroke="#5BC0BE"
            strokeWidth="3.5"
            strokeDasharray="6 3"
          />
          {/* Wheels */}
          <circle cx="-190" cy="40" r="42" fill="#0A0E14" stroke="#5BC0BE" strokeWidth="3" />
          <circle cx="-190" cy="40" r="18" fill="#5BC0BE" opacity="0.6" />
          <circle cx="210" cy="40" r="42" fill="#0A0E14" stroke="#5BC0BE" strokeWidth="3" />
          <circle cx="210" cy="40" r="18" fill="#5BC0BE" opacity="0.6" />

          {/* Explosive trunk ordnance payload indicator */}
          <rect
            x="80"
            y="-65"
            width="120"
            height="55"
            fill="rgba(193, 39, 45, 0.28)"
            stroke="#C1272D"
            strokeWidth="2.5"
          />
          <text
            x="140"
            y="-32"
            textAnchor="middle"
            fill="#F8F9FA"
            fontFamily={courier.fontFamily}
            fontSize="16"
            fontWeight="700"
          >
            150 KG HE
          </text>

          {/* Detonation Wire Reticle */}
          <line x1="80" y1="-38" x2="-40" y2="-38" stroke="#E63946" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="-40" cy="-38" r="6" fill="#E63946" />

          {/* Blueprint Measurement Crosshairs */}
          <line x1="-340" y1="80" x2="350" y2="80" stroke="#5BC0BE" strokeWidth="1.5" />
          <line x1="-340" y1="70" x2="-340" y2="90" stroke="#5BC0BE" strokeWidth="2" />
          <line x1="350" y1="70" x2="350" y2="90" stroke="#5BC0BE" strokeWidth="2" />
          <text
            x="5"
            y="105"
            textAnchor="middle"
            fill="#5BC0BE"
            fontFamily={courier.fontFamily}
            fontSize="18"
            fontWeight="700"
            letterSpacing="2px"
          >
            ORDNANCE: 150 KG (330 LBS) • TRUNK COMPARTMENT
          </text>
        </g>
      </svg>

      {/* Live PaperSignCounter Placard (anchored at top 890) */}
      <PaperSignCounter
        tagText="ORDNANCE PAYLOAD"
        startValue={0}
        endValue={150}
        suffix=" KG"
        subLabel="MILITARY-GRADE HIGH EXPLOSIVES • 330 LBS"
        x={540}
        y={930}
        width={860}
        rollStartFrame={6}
        rollDurationFrames={48}
        stampText="PRIMED & WIRED"
        stampFrame={60}
        highlightRedOnEnd={true}
      />
    </div>
  );
};

/**
 * Helper to generate authentic outward-bulging rounded cloud lobes using circular SVG arcs (modeled directly on explosion.jpg reference).
 */
const createArcScallopedCloud = (
  baseRadius: number,
  lobeCount: number,
  radiiScale: number[],
  wobble: number = 0
): string => {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < lobeCount; i++) {
    const angle = (i / lobeCount) * Math.PI * 2 - Math.PI / 2;
    const r =
      baseRadius * (radiiScale[i % radiiScale.length] || 1.0) +
      Math.sin(angle * 2 + wobble) * 6;
    points.push({
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
    });
  }

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} `;
  for (let i = 0; i < lobeCount; i++) {
    const next = points[(i + 1) % lobeCount];
    const curr = points[i];
    const dx = next.x - curr.x;
    const dy = next.y - curr.y;
    const dist = Math.hypot(dx, dy);
    // Arc radius proportional to chord length produces juicy, bulging circular lobes
    const arcR = (dist * 0.62).toFixed(1);
    d += `A ${arcR} ${arcR} 0 0 1 ${next.x.toFixed(1)} ${next.y.toFixed(1)} `;
  }
  d += 'Z';
  return d;
};

/**
 * 3. MEENA BAZAAR BLAST IMPACT & SHOCKWAVE (Stylized 2D Vector Explosion)
 * Crafted directly from reference explosion.jpg:
 * Multi-tiered scalloped fireball (deep crimson outer, vibrant amber mid, radiant yellow inner),
 * acute radiating fire spikes, white-hot 8-pointed core star burst, detached flying cloudlets,
 * and collapsing bazaar plaza silhouette.
 */
export const BlastShockwaveVector: React.FC = () => {
  const frame = useCurrentFrame();

  // Rapid explosive bloom settling into a boiling fireball
  const scale =
    frame < 18
      ? interpolate(frame, [0, 6, 18], [0.15, 1.28, 1.0], { extrapolateRight: 'clamp' })
      : 1.0 + 0.04 * Math.sin(frame * 0.18);

  const coreFlash =
    frame < 12
      ? interpolate(frame, [0, 3, 12], [1.0, 1.0, 0.4], { extrapolateRight: 'clamp' })
      : 0.25 + 0.1 * Math.sin(frame * 0.3);

  const wobble = Math.sin(Math.floor(frame / 3) * 0.25) * 6;
  const cloudletDrift = interpolate(frame, [0, 80], [0, 45], { extrapolateRight: 'clamp' });

  // 11 distinct bulging lobes for outer crimson cloud (from explosion.jpg)
  const outerScales = [1.06, 0.94, 1.1, 0.92, 1.08, 0.95, 1.12, 0.93, 1.05, 0.96, 1.03];
  // 10 distinct bulging lobes for mid-tier vibrant amber cloud
  const midScales = [1.08, 0.92, 1.05, 0.95, 1.12, 0.94, 1.06, 0.92, 1.1, 0.96];
  // 8 distinct bulging lobes for inner radiant yellow cloud
  const innerScales = [1.1, 0.95, 1.08, 0.92, 1.12, 0.94, 1.06, 0.96];

  const outerPath = createArcScallopedCloud(255, 11, outerScales, wobble);
  const midPath = createArcScallopedCloud(185, 10, midScales, -wobble);
  const innerPath = createArcScallopedCloud(120, 8, innerScales, wobble * 0.5);

  // Sharp radiating fire spikes (angles around the fireball from explosion.jpg)
  const spikeAngles = [0, 26, 52, 80, 110, 138, 164, 192, 220, 248, 276, 305, 332];
  const spikeLengths = [390, 420, 380, 440, 395, 415, 385, 430, 390, 425, 375, 435, 395];

  // Detached flying cloudlet positions (from explosion.jpg)
  const cloudlets = [
    { x: 260, y: -220, r: 24 },
    { x: -240, y: -210, r: 26 },
    { x: 330, y: 30, r: 28 },
    { x: -320, y: 20, r: 25 },
    { x: 260, y: 220, r: 24 },
    { x: -250, y: 210, r: 27 },
    { x: 30, y: -290, r: 22 },
    { x: 40, y: 280, r: 25 },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Background Volumetric Blast Atmosphere */}
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="blastCoreAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#FFD54F" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FF6F00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C1272D" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Detonation Flash Glow */}
        <circle cx="540" cy="1100" r="480" fill="url(#blastCoreAura)" opacity={0.65} />

        {/* Shockwave Rings Expanding Outward */}
        <g transform="translate(540, 1100)">
          <circle
            r={interpolate(frame, [0, 45], [100, 620], { extrapolateRight: 'clamp' })}
            fill="none"
            stroke="#FFD54F"
            strokeWidth="6"
            opacity={interpolate(frame, [0, 30, 45], [0.9, 0.4, 0], { extrapolateRight: 'clamp' })}
          />
          <circle
            r={interpolate(frame, [0, 50], [60, 540], { extrapolateRight: 'clamp' })}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            opacity={interpolate(frame, [0, 25, 50], [0.8, 0.3, 0], { extrapolateRight: 'clamp' })}
          />
        </g>

        {/* The Scaled 2D Stylized Vector Explosion (Modeled directly on explosion.jpg) */}
        <g transform={`translate(540, 1100) scale(${scale})`}>
          {/* LAYER 1: Sharp Radiating Fire Spikes (Behind the Cloud Lobes) */}
          <g>
            {spikeAngles.map((deg, idx) => {
              const len = spikeLengths[idx];
              return (
                <g key={deg} transform={`rotate(${deg})`}>
                  {/* Outer Spikes (Fiery Orange) */}
                  <polygon
                    points={`0,-${len} -22,-180 22,-180`}
                    fill="#FF8F00"
                    stroke="#D84315"
                    strokeWidth="2"
                  />
                  {/* Inner Highlight Spike */}
                  <polygon
                    points={`0,-${len - 40} -10,-200 10,-200`}
                    fill="#FFD54F"
                  />
                </g>
              );
            })}
          </g>

          {/* LAYER 2: Outer Billowing Crimson Cloud Lobes (#C1272D / #D84315) */}
          <path
            d={outerPath}
            fill="#C1272D"
            stroke="#8E171D"
            strokeWidth="4"
          />

          {/* LAYER 3: Mid-Tier Vibrant Amber Orange Cloud Lobes (#FF6F00 / #F4B942) */}
          <path
            d={midPath}
            fill="#FF7A00"
            stroke="#D84315"
            strokeWidth="3.5"
          />

          {/* LAYER 4: Inner Radiant Canary Yellow Cloud Lobes (#FFD54F) */}
          <path
            d={innerPath}
            fill="#FFD54F"
            stroke="#FFA000"
            strokeWidth="2.5"
          />

          {/* LAYER 5: Epicenter 8-Pointed Core Flash Star (White-Hot Burst from explosion.jpg) */}
          <g transform={`scale(${1 + Math.sin(frame * 0.4) * 0.08})`}>
            <path
              d="M 0 -115 Q 16 -38 82 -82 Q 38 -16 115 0 Q 38 16 82 82 Q 16 38 0 115 Q -16 38 -82 82 Q -38 16 -115 0 Q -38 -16 -82 -82 Q -16 -38 0 -115 Z"
              fill="#FFFFFF"
              stroke="#FFF9C4"
              strokeWidth="4"
            />
            {/* Center Core Dot */}
            <circle cx="0" cy="0" r="26" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="16" fill="#FFF9C4" opacity={coreFlash} />
          </g>

          {/* LAYER 6: Detached Flying Cloudlets (Floating around perimeter from explosion.jpg) */}
          {cloudlets.map((cl, idx) => {
            const rad = Math.atan2(cl.y, cl.x);
            const dx = cl.x + Math.cos(rad) * cloudletDrift;
            const dy = cl.y + Math.sin(rad) * cloudletDrift;
            return (
              <g key={idx} transform={`translate(${dx}, ${dy})`}>
                {/* Outer amber cloudlet */}
                <ellipse cx="0" cy="0" rx={cl.r} ry={cl.r * 0.85} fill="#FF8F00" stroke="#D84315" strokeWidth="2" />
                <circle cx={-cl.r * 0.35} cy={-cl.r * 0.15} r={cl.r * 0.55} fill="#FF8F00" />
                <circle cx={cl.r * 0.35} cy={-cl.r * 0.15} r={cl.r * 0.55} fill="#FF8F00" />
                {/* Inner yellow highlight */}
                <ellipse cx="0" cy="-2" rx={cl.r * 0.55} ry={cl.r * 0.4} fill="#FFE082" />
              </g>
            );
          })}

          {/* LAYER 7: Radiating Speed Sparks & flying debris fragments */}
          {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((ang) => (
            <line
              key={ang}
              x1={Math.cos((ang * Math.PI) / 180) * 310}
              y1={Math.sin((ang * Math.PI) / 180) * 310}
              x2={Math.cos((ang * Math.PI) / 180) * 370}
              y2={Math.sin((ang * Math.PI) / 180) * 370}
              stroke="#FFE082"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Collapsing Bazaar Plaza & Mosque Minarets in Silhouette at Base (y: 1380 - 1520) */}
        <g transform="translate(540, 1440)">
          {/* Ground level cobblestone */}
          <rect x="-540" y="80" width="1080" height="400" fill="#0A0D12" />
          <line x1="-540" y1="80" x2="540" y2="80" stroke="#3A2D23" strokeWidth="4" />

          {/* Left Collapsing 4-Story Plaza Structure */}
          <path
            d="M -480 80 L -480 -80 L -380 -140 L -340 -50 L -290 -80 L -240 80 Z"
            fill="#14181F"
            stroke="#C1272D"
            strokeWidth="2.5"
          />
          {/* Cracks shooting through left building */}
          <path d="M -430 80 L -400 0 L -440 -60 L -380 -110" stroke="#E63946" strokeWidth="2" fill="none" />
          <path d="M -320 80 L -310 10 L -350 -30" stroke="#E63946" strokeWidth="2" fill="none" />

          {/* Right Collapsing Mosque Minaret & Market Facade */}
          <path
            d="M 240 80 L 280 -90 L 320 -150 L 340 -90 L 370 80 Z"
            fill="#14181F"
            stroke="#C1272D"
            strokeWidth="2.5"
          />
          <path
            d="M 370 80 L 410 -60 L 480 -40 L 480 80 Z"
            fill="#14181F"
            stroke="#C1272D"
            strokeWidth="2.5"
          />
          {/* Flying Masonry chunks */}
          {[-160, -90, 80, 180].map((mx, idx) => (
            <polygon
              key={idx}
              points={`${mx},${-10 - idx * 25} ${mx + 18},${-25 - idx * 25} ${mx + 8},${-40 - idx * 25}`}
              fill="#261A18"
              stroke="#D84315"
              strokeWidth="2"
            />
          ))}
        </g>
      </svg>

      {/* Forensic Zero-Hour Assessment Banner (anchored at top 1380, safe-zone compliant) */}
      <div
        style={{
          position: 'absolute',
          top: 1380,
          left: '50%',
          transform: 'translateX(-50%) rotate(-0.5deg)',
          backgroundColor: '#161A22',
          border: '2px solid #C1272D',
          padding: '10px 32px',
          boxShadow: '0 12px 28px rgba(0,0,0,0.9)',
          zIndex: 22,
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 21,
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '2.5px',
          }}
        >
          ZERO HOUR DETONATION • 11:35 AM • GROUND ZERO
        </span>
      </div>
    </div>
  );
};

/**
 * 4. FIRE AND RUBBLE FIRESTORM AFTERMATH (Tactile SVG Vector Asset)
 * Procedural aftermath destruction drawn from archival news reference (peshawar_blast_rferl.jpg)
 * and stylized fluid 2D flame choreography from fire reference (fire.jpg):
 * Multi-layer nested firestorm flames (crimson outer, amber mid-tier, yellow core),
 * twisted buckled steel I-beams, shattered brick masonry pillars,
 * rising volumetric smoke plumes, floating teardrop sparks, and emergency cordon.
 */

interface StylizedFlameProps {
  type: 'towering' | 'curved' | 'multi' | 'slender' | 'spark';
  x: number;
  y: number;
  scale?: number;
  phase?: number;
  flipX?: boolean;
  frame: number;
}

const StylizedFlame: React.FC<StylizedFlameProps> = ({
  type,
  x,
  y,
  scale = 1.0,
  phase = 0,
  flipX = false,
  frame,
}) => {
  // Flickering animation math: multi-frequency sinusoidal oscillation
  const sX = 1 + Math.sin(frame * 0.28 + phase) * 0.07 + Math.cos(frame * 0.44 + phase * 1.7) * 0.04;
  const sY = 1 + Math.cos(frame * 0.32 + phase) * 0.09 + Math.sin(frame * 0.53 + phase * 2.2) * 0.04;
  const rot = Math.sin(frame * 0.21 + phase) * 3.2;
  const skewX = Math.cos(frame * 0.24 + phase) * 2;

  const flip = flipX ? -1 : 1;
  const transform = `translate(${x}, ${y}) scale(${scale * flip * sX}, ${scale * sY}) rotate(${rot}) skewX(${skewX})`;

  if (type === 'towering') {
    // Modeled on Shape 6 in fire.jpg (tall hero flame with 3-tier nesting & detached sparks)
    return (
      <g transform={transform}>
        {/* Outer Red-Orange */}
        <path
          d="M -50 0 C -68 -5 -78 -40 -60 -75 C -54 -86 -76 -102 -68 -135 C -62 -158 -40 -165 -35 -198 C -28 -232 -16 -278 0 -315 C 12 -282 18 -248 34 -222 C 50 -200 68 -215 60 -178 C 54 -142 82 -132 75 -88 C 68 -54 84 -18 66 8 C 48 30 -35 30 -50 0 Z"
          fill="#E63A0F"
        />
        {/* Mid Amber-Orange */}
        <path
          d="M -36 -2 C -50 -6 -56 -32 -44 -58 C -40 -67 -56 -80 -50 -105 C -45 -122 -30 -128 -26 -152 C -20 -180 -12 -215 0 -245 C 8 -220 12 -192 24 -172 C 36 -154 50 -166 44 -138 C 40 -110 60 -102 55 -68 C 50 -42 62 -14 48 6 C 35 22 -24 22 -36 -2 Z"
          fill="#FF8800"
        />
        {/* Inner Golden-Yellow Core */}
        <path
          d="M -22 -4 C -32 -7 -36 -24 -28 -42 C -25 -48 -36 -58 -32 -74 C -28 -86 -18 -92 -16 -108 C -12 -128 -7 -152 0 -175 C 5 -158 8 -138 16 -122 C 24 -110 32 -118 28 -98 C 25 -78 38 -72 35 -48 C 32 -30 38 -10 30 4 C 22 15 -15 15 -22 -4 Z"
          fill="#FFD54F"
        />
        {/* Hot white-yellow base core */}
        <ellipse cx="2" cy="-20" rx="14" ry="24" fill="#FFFDE7" opacity={0.85} />
        {/* Detached floating flame sparks (from fire.jpg) */}
        <path d="M 8 -335 C 16 -355 12 -370 6 -360 C 0 -350 4 -340 8 -335 Z" fill="#FF8800" />
        <path d="M 7 -342 C 12 -355 9 -365 6 -358 C 3 -352 5 -345 7 -342 Z" fill="#FFD54F" />
        <path d="M -78 -145 C -86 -162 -80 -175 -74 -168 C -68 -160 -72 -150 -78 -145 Z" fill="#E63A0F" />
        <path d="M 78 -140 C 88 -155 82 -170 76 -162 C 70 -155 72 -145 78 -140 Z" fill="#FF8800" />
      </g>
    );
  }

  if (type === 'curved') {
    // Modeled on Shape 5 in fire.jpg (dynamic S-curve flame leaning with sweeping licks)
    return (
      <g transform={transform}>
        {/* Outer Red-Orange */}
        <path
          d="M -48 5 C -64 -2 -72 -32 -52 -62 C -42 -78 -64 -102 -48 -138 C -32 -175 5 -205 18 -248 C 24 -215 14 -182 34 -152 C 50 -124 72 -140 65 -98 C 58 -64 74 -30 58 8 C 42 30 -32 30 -48 5 Z"
          fill="#E63A0F"
        />
        {/* Mid Amber-Orange */}
        <path
          d="M -34 2 C -46 -3 -52 -24 -38 -46 C -30 -58 -46 -78 -35 -105 C -24 -132 5 -156 14 -190 C 18 -165 10 -140 24 -118 C 36 -96 52 -108 46 -76 C 42 -50 54 -24 42 6 C 30 22 -22 22 -34 2 Z"
          fill="#FF8800"
        />
        {/* Inner Golden-Yellow */}
        <path
          d="M -20 0 C -28 -3 -32 -16 -24 -30 C -18 -38 -28 -52 -22 -70 C -15 -88 4 -104 10 -128 C 12 -110 7 -94 16 -78 C 24 -64 34 -72 30 -50 C 28 -34 35 -16 28 4 C 20 15 -14 15 -20 0 Z"
          fill="#FFD54F"
        />
        <ellipse cx="6" cy="-18" rx="12" ry="20" fill="#FFFDE7" opacity={0.8} />
        {/* Floating sparks */}
        <path d="M 28 -265 C 36 -280 32 -295 26 -288 C 20 -280 22 -270 28 -265 Z" fill="#FF8800" />
        <path d="M -58 -150 C -65 -165 -60 -175 -54 -170 C -48 -164 -52 -155 -58 -150 Z" fill="#E63A0F" />
      </g>
    );
  }

  if (type === 'multi') {
    // Modeled on Shape 4 in fire.jpg (wide base, 4 distinct licking curls, high central crown)
    return (
      <g transform={transform}>
        {/* Outer Red-Orange */}
        <path
          d="M -58 8 C -74 -2 -75 -38 -55 -58 C -44 -68 -66 -90 -50 -115 C -38 -132 -28 -162 -14 -205 C -4 -172 6 -156 12 -188 C 20 -156 38 -145 32 -115 C 48 -126 62 -100 48 -68 C 64 -46 68 -15 52 10 C 36 28 -42 28 -58 8 Z"
          fill="#E63A0F"
        />
        {/* Mid Amber-Orange */}
        <path
          d="M -40 4 C -52 -3 -52 -28 -38 -44 C -30 -52 -46 -68 -36 -88 C -27 -100 -20 -125 -10 -158 C -2 -132 5 -120 10 -145 C 16 -120 28 -112 24 -88 C 36 -98 46 -78 35 -52 C 48 -35 50 -10 38 6 C 26 20 -30 20 -40 4 Z"
          fill="#FF8800"
        />
        {/* Inner Golden-Yellow */}
        <path
          d="M -24 2 C -32 -2 -32 -18 -22 -30 C -18 -36 -28 -48 -22 -62 C -16 -72 -12 -90 -6 -112 C 0 -92 4 -84 8 -102 C 12 -84 20 -78 18 -60 C 25 -68 32 -54 24 -36 C 32 -24 34 -6 26 2 C 18 14 -18 14 -24 2 Z"
          fill="#FFD54F"
        />
        <ellipse cx="2" cy="-16" rx="14" ry="18" fill="#FFFDE7" opacity={0.8} />
        {/* Floating spark */}
        <path d="M 24 -220 C 30 -235 26 -245 20 -240 C 15 -235 18 -225 24 -220 Z" fill="#FF8800" />
      </g>
    );
  }

  if (type === 'slender') {
    // Modeled on Shape 3 & Shape 2 in fire.jpg (slender multi-tongue flame with energetic flickers)
    return (
      <g transform={transform}>
        {/* Outer Red-Orange */}
        <path
          d="M -34 6 C -46 -2 -44 -32 -28 -52 C -20 -62 -38 -84 -26 -114 C -16 -140 -4 -172 0 -205 C 8 -172 16 -156 12 -130 C 24 -140 38 -114 26 -82 C 40 -62 42 -26 28 8 C 18 22 -22 22 -34 6 Z"
          fill="#E63A0F"
        />
        {/* Mid Amber-Orange */}
        <path
          d="M -24 4 C -33 -1 -32 -22 -20 -38 C -14 -46 -28 -62 -18 -85 C -11 -105 -2 -130 0 -155 C 6 -130 12 -118 9 -98 C 18 -106 28 -86 18 -62 C 28 -46 30 -20 20 5 C 12 16 -16 16 -24 4 Z"
          fill="#FF8800"
        />
        {/* Inner Golden-Yellow */}
        <path
          d="M -14 2 C -20 -1 -20 -14 -12 -25 C -8 -30 -18 -40 -12 -55 C -7 -70 -1 -88 0 -108 C 4 -88 8 -80 6 -66 C 12 -72 18 -58 12 -42 C 18 -32 20 -14 13 3 C 8 10 -10 10 -14 2 Z"
          fill="#FFD54F"
        />
        <ellipse cx="1" cy="-14" rx="8" ry="14" fill="#FFFDE7" opacity={0.8} />
        {/* Spark */}
        <path d="M 6 -220 C 11 -232 8 -242 3 -238 C -1 -233 1 -225 6 -220 Z" fill="#FF8800" />
      </g>
    );
  }

  // Little spark / teardrop flame (Shape 1 & 10 in fire.jpg)
  return (
    <g transform={transform}>
      <path
        d="M 0 -85 C -18 -55 -25 -22 0 8 C 25 -22 18 -55 0 -85 Z"
        fill="#E63A0F"
      />
      <path
        d="M 0 -60 C -12 -38 -16 -15 0 5 C 16 -15 12 -38 0 -60 Z"
        fill="#FF8800"
      />
      <path
        d="M 0 -38 C -7 -24 -10 -10 0 3 C 10 -10 7 -24 0 -38 Z"
        fill="#FFD54F"
      />
      <circle cx="0" cy="-10" r="5" fill="#FFFDE7" opacity={0.85} />
    </g>
  );
};

export const FireAndRubblePhotoCard: React.FC = () => {
  const frame = useCurrentFrame();
  const smokeDrift = (Math.floor(frame / 4) * 1.5) % 80;

  // Floating stylized sparks & embers seeds modeled on fire.jpg
  const emberSeeds = [
    { x: -340, y: 150, speed: 2.2, phase: 0.1, size: 1.0 },
    { x: -280, y: 120, speed: 2.8, phase: 1.5, size: 1.3 },
    { x: -220, y: 90, speed: 3.1, phase: 0.8, size: 1.1 },
    { x: -160, y: 70, speed: 2.5, phase: 2.4, size: 1.4 },
    { x: -110, y: 50, speed: 3.4, phase: 1.1, size: 1.5 },
    { x: -60, y: 110, speed: 2.9, phase: 3.2, size: 1.2 },
    { x: -10, y: 90, speed: 3.5, phase: 0.4, size: 1.6 },
    { x: 40, y: 60, speed: 2.7, phase: 1.9, size: 1.3 },
    { x: 90, y: 80, speed: 3.2, phase: 2.8, size: 1.4 },
    { x: 150, y: 40, speed: 2.6, phase: 0.7, size: 1.2 },
    { x: 200, y: -20, speed: 3.3, phase: 1.3, size: 1.5 },
    { x: 250, y: 80, speed: 2.4, phase: 3.0, size: 1.0 },
    { x: 310, y: 110, speed: 2.9, phase: 2.1, size: 1.2 },
    { x: 370, y: 130, speed: 2.3, phase: 0.5, size: 0.9 },
    { x: -80, y: 130, speed: 3.0, phase: 1.7, size: 1.1 },
    { x: 120, y: 120, speed: 2.8, phase: 2.5, size: 1.3 },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Background Volumetric Smoke & Fire Glow (y: 860 - 1500) */}
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="blastInfernoGlow" cx="50%" cy="60%" r="55%">
            <stop offset="0%" stopColor="#C1272D" stopOpacity="0.65" />
            <stop offset="35%" stopColor="#FF8800" stopOpacity="0.35" />
            <stop offset="65%" stopColor="#E28743" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#120A0A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Fire Aura */}
        <circle cx="540" cy="1160" r="460" fill="url(#blastInfernoGlow)" />

        {/* Rising Volumetric Smoke Puffs (dark soot clouds) */}
        <g opacity="0.48" fill="#1A1414" transform={`translate(0, ${-smokeDrift})`}>
          <circle cx="280" cy="1080" r="110" filter="blur(20px)" />
          <circle cx="480" cy="1020" r="140" filter="blur(25px)" />
          <circle cx="700" cy="1050" r="120" filter="blur(22px)" />
          <circle cx="380" cy="950" r="130" filter="blur(28px)" />
          <circle cx="620" cy="920" r="135" filter="blur(26px)" />
        </g>

        {/* Midground Collapsed Plaza Ruins & Twisted Steel (referenced from peshawar_blast_rferl.jpg) */}
        <g transform="translate(540, 1220)">
          {/* 1. BACKGROUND FIRESTORM FLAME WALL (behind rubble and beams, rising high into the night) */}
          <g id="bg-firestorm">
            <StylizedFlame type="curved" x={-310} y={40} scale={0.82} phase={0.6} flipX={false} frame={frame} />
            <StylizedFlame type="slender" x={-400} y={60} scale={0.65} phase={2.1} flipX={true} frame={frame} />
            <StylizedFlame type="towering" x={-140} y={0} scale={0.96} phase={1.2} flipX={false} frame={frame} />
            <StylizedFlame type="multi" x={10} y={15} scale={0.9} phase={2.8} flipX={true} frame={frame} />
            <StylizedFlame type="towering" x={190} y={-45} scale={0.92} phase={3.4} flipX={true} frame={frame} />
            <StylizedFlame type="curved" x={350} y={25} scale={0.78} phase={1.7} flipX={true} frame={frame} />
          </g>

          {/* 2. RUBBLE, MASONRY, & BUCKLED STEEL GIRDERS */}
          {/* Shattered Brick Pillars (Peshawar colonial red-brick masonry) */}
          {/* Left broken pillar */}
          <polygon points="-460,200 -460,-60 -360,-40 -340,30 -310,40 -310,200" fill="#2A1412" stroke="#5A241F" strokeWidth="3" />
          {/* Crack lines on left pillar */}
          <path d="M -420 30 L -380 70 L -410 120 L -360 160" stroke="#120807" strokeWidth="2.5" fill="none" />

          {/* Right broken pillar */}
          <polygon points="320,200 320,-80 400,-110 440,-50 480,-40 480,200" fill="#2A1412" stroke="#5A241F" strokeWidth="3" />
          <path d="M 370 -20 L 410 40 L 380 90 L 430 140" stroke="#120807" strokeWidth="2.5" fill="none" />

          {/* Central Collapsed Plaza Concrete Slabs & Masonry Rubble */}
          <polygon points="-320,180 -180,60 120,40 330,150 280,200 -280,200" fill="#1C1819" stroke="#3D2B2B" strokeWidth="3" />
          <polygon points="-240,110 -60,20 180,30 260,120" fill="#2B2223" stroke="#4D3838" strokeWidth="2" />

          {/* Buckled & Twisted Steel I-Beams (structural failure from 150kg blast) */}
          {/* Beam 1: Slanted left across rubble */}
          <path
            d="M -380 -20 L 40 140 L 25 175 L -395 15 Z"
            fill="#36454F"
            stroke="#5BC0BE"
            strokeWidth="1.5"
            opacity="0.9"
          />
          {/* Beam 2: Jagged bent girder sticking into air */}
          <path
            d="M 60 150 L 140 -60 L 220 -140 L 245 -130 L 165 -45 L 85 160 Z"
            fill="#2F3E46"
            stroke="#5BC0BE"
            strokeWidth="2"
          />
          {/* Exposed Bent Rebar Loops */}
          <path d="M -260 50 Q -240 -30 -200 30" stroke="#A46B10" strokeWidth="3" fill="none" />
          <path d="M -140 30 Q -110 -50 -80 20" stroke="#A46B10" strokeWidth="3.5" fill="none" />
          <path d="M 120 20 Q 150 -60 180 15" stroke="#A46B10" strokeWidth="3" fill="none" />

          {/* Charred Wooden Stall Beams Glowing with Embers */}
          <polygon points="-160,110 180,125 175,145 -165,130" fill="#120A0A" stroke="#FF5722" strokeWidth="2" strokeDasharray="14 6" />
          <polygon points="-80,140 240,155 235,175 -85,160" fill="#0D0707" stroke="#FFD54F" strokeWidth="1.5" strokeDasharray="10 8" />

          {/* 3. FOREGROUND LICKING FLAMES (engulfing fabric stores and collapsed rubble, modeled on fire.jpg) */}
          <g id="fg-firestorm">
            <StylizedFlame type="multi" x={-240} y={110} scale={0.68} phase={0.9} flipX={false} frame={frame} />
            <StylizedFlame type="curved" x={-80} y={130} scale={0.72} phase={1.8} flipX={false} frame={frame} />
            <StylizedFlame type="towering" x={70} y={120} scale={0.7} phase={2.5} flipX={false} frame={frame} />
            <StylizedFlame type="slender" x={200} y={115} scale={0.62} phase={3.7} flipX={true} frame={frame} />

            {/* Edge flame tongues and sparks along the rubble line */}
            <StylizedFlame type="spark" x={-360} y={160} scale={0.55} phase={1.1} frame={frame} />
            <StylizedFlame type="spark" x={-170} y={155} scale={0.6} phase={2.3} frame={frame} />
            <StylizedFlame type="spark" x={-10} y={170} scale={0.52} phase={0.4} frame={frame} />
            <StylizedFlame type="spark" x={140} y={165} scale={0.58} phase={3.1} frame={frame} />
            <StylizedFlame type="spark" x={280} y={150} scale={0.5} phase={4.2} frame={frame} />
          </g>

          {/* 4. FLOATING RISING EMBER SPARKS (teardrop sparks modeled on fire.jpg) */}
          {emberSeeds.map((seed, idx) => {
            const drift = (frame * seed.speed + seed.phase * 60) % 280;
            const curY = seed.y - drift;
            const curX = seed.x + Math.sin(frame * 0.12 + seed.phase * 5) * 18;
            const op = interpolate(drift, [0, 30, 200, 280], [0.2, 0.95, 0.7, 0], { extrapolateRight: 'clamp' });
            const sc = seed.size * interpolate(drift, [0, 40, 280], [0.6, 1.0, 0.5], { extrapolateRight: 'clamp' });
            return (
              <g key={idx} transform={`translate(${curX}, ${curY}) scale(${sc})`} opacity={op}>
                <path
                  d="M 0 -14 C -4 -8 -5 -3 0 2 C 5 -3 4 -8 0 -14 Z"
                  fill={idx % 2 === 0 ? '#FFD54F' : '#FF8800'}
                />
              </g>
            );
          })}

          {/* Drooping Severed Power Cable */}
          <path d="M -460 -40 Q -150 80 140 -50 Q 280 40 480 -30" stroke="#0D1117" strokeWidth="4" fill="none" />
        </g>
      </svg>

      {/* Tactile Hazard Warning Barrier Placard (anchored at top 895) */}
      <div
        style={{
          position: 'absolute',
          top: 895,
          left: '50%',
          transform: 'translateX(-50%) rotate(0.8deg)',
          width: 780,
          backgroundColor: '#161A22',
          border: '3px solid #C1272D',
          borderRadius: 4,
          padding: '18px 28px',
          boxShadow: '0 18px 42px rgba(0,0,0,0.9)',
          zIndex: 22,
          textAlign: 'center',
        }}
      >
        {/* Top Warning Stripe Ribbon */}
        <div
          style={{
            backgroundColor: '#C1272D',
            padding: '6px 14px',
            marginBottom: 8,
            display: 'inline-block',
          }}
        >
          <span
            style={{
              fontFamily: courier.fontFamily,
              fontSize: 18,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '2.5px',
            }}
          >
            CRITICAL DISASTER ASSESSMENT • PECL GROUND ZERO
          </span>
        </div>

        <div
          style={{
            fontFamily: blackOps.fontFamily,
            fontSize: 32,
            color: '#FFFFFF',
            letterSpacing: '2px',
          }}
        >
          FIRESTORM IN MEENA BAZAAR
        </div>
        <div
          style={{
            marginTop: 6,
            fontFamily: courier.fontFamily,
            fontSize: 20,
            fontWeight: 700,
            color: '#E63946',
            letterSpacing: '1px',
          }}
        >
          4 MULTI-STORY BUILDINGS COLLAPSED • SYNTHETIC FABRIC IGNITED
        </div>
        <div
          style={{
            marginTop: 6,
            fontFamily: caveat.fontFamily,
            fontSize: 26,
            fontWeight: 700,
            color: '#F4B942',
          }}
        >
          Flames swept through narrow 6-foot alleys, trapping shoppers inside
        </div>
      </div>
    </div>
  );
};

/**
 * 5. RICKSHAW CIVILIAN RESCUE SILHOUETTE
 * Autorickshaw vector silhouette speeding forward through rubble carrying casualties,
 * civilian rescue volunteers, and distance indicator to Lady Reading Hospital.
 */
export const RickshawRescueSilhouette: React.FC = () => {
  const frame = useCurrentFrame();
  const bounce = (Math.floor(frame / 3) % 2) * 4;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Street Ground Line */}
        <line x1="0" y1="1480" x2="1080" y2="1480" stroke="#252D3A" strokeWidth="4" />

        {/* Autorickshaw Vector Silhouette (x: 480, y: 1320 + bounce) */}
        <g transform={`translate(460, ${1300 + bounce})`}>
          {/* Rickshaw Cabin Frame */}
          <path
            d="M -160 80 L -160 -40 Q -150 -110 -60 -110 L 80 -110 Q 140 -90 160 10 L 160 80 Z"
            fill="#121820"
            stroke="#F4B942"
            strokeWidth="4"
          />
          {/* Canopy Roof Canvas */}
          <path
            d="M -170 -40 Q -160 -120 -50 -120 L 90 -120 Q 160 -100 175 0 L 155 0 Q 140 -85 80 -100 L -50 -100 Q -140 -100 -150 -35 Z"
            fill="#E63946"
          />
          {/* Passenger Cabin Opening */}
          <rect x="-130" y="-30" width="130" height="80" rx="8" fill="#0A0E14" stroke="#F4B942" strokeWidth="2" />
          {/* Stretcher silhouette inside rickshaw */}
          <line x1="-150" y1="20" x2="30" y2="0" stroke="#F8F9FA" strokeWidth="8" strokeLinecap="round" />
          <circle cx="-130" cy="-5" r="14" fill="#D9B391" />

          {/* Front Wheel */}
          <circle cx="150" cy="80" r="38" fill="#0D1117" stroke="#F4B942" strokeWidth="3" />
          <circle cx="150" cy="80" r="16" fill="#F4B942" />

          {/* Rear Wheels */}
          <circle cx="-110" cy="80" r="42" fill="#0D1117" stroke="#F4B942" strokeWidth="3" />
          <circle cx="-110" cy="80" r="18" fill="#F4B942" />

          {/* Speed Motion Lines */}
          <line x1="-280" y1="20" x2="-190" y2="20" stroke="#EAE3D2" strokeWidth="3" opacity="0.6" />
          <line x1="-250" y1="50" x2="-180" y2="50" stroke="#EAE3D2" strokeWidth="3" opacity="0.4" />
        </g>
      </svg>

      {/* Tactile Waypoint Badge: LADY READING HOSPITAL */}
      <div
        style={{
          position: 'absolute',
          top: 940,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#EAE3D2',
          padding: '14px 34px',
          boxShadow: '0 12px 28px rgba(0,0,0,0.8)',
          clipPath:
            'polygon(1% 0%, 99% 2%, 98% 97%, 2% 100%)',
          textAlign: 'center',
          zIndex: 22,
        }}
      >
        <div
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 22,
            fontWeight: 700,
            color: '#C1272D',
            letterSpacing: '2px',
          }}
        >
          TRANSIT: PRIVATE RICKSHAWS & PICKUPS
        </div>
        <div
          style={{
            marginTop: 6,
            fontFamily: caveat.fontFamily,
            fontSize: 32,
            fontWeight: 700,
            color: '#141619',
          }}
        >
          Destination: Lady Reading Hospital Emergency
        </div>
      </div>
    </div>
  );
};

/**
 * 6. LADY READING HOSPITAL EMERGENCY ARCHITECTURE (Tactile SVG Vector Asset)
 * Historic colonial red-brick hospital facade drawn from reference (lady_reading_hospital.jpg):
 * Symmetrical colonial arched colonnades, pediment clock tower, pulsing medical red cross,
 * illuminated emergency ward windows, ambulance triage bay, and blood donation appeal placard.
 */
export const LadyReadingHospitalEmergencyCard: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.1 * Math.sin(frame * 0.3);
  const beaconColor = frame % 12 < 6 ? '#E63946' : '#5BC0BE';

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Background Medical Telemetry & Hospital Blueprint Grid */}
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="hospitalCrossGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C1272D" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#C1272D" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C1272D" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Concentric Telemetry Sonar Rings */}
        <g opacity="0.22">
          <circle cx="540" cy="1160" r="380" fill="none" stroke="#C1272D" strokeWidth="2" strokeDasharray="8 6" />
          <circle cx="540" cy="1160" r="240" fill="none" stroke="#5BC0BE" strokeWidth="1.5" strokeDasharray="6 4" />
        </g>

        {/* Lady Reading Hospital Historic Colonial Brick Facade (referenced from lady_reading_hospital.jpg) */}
        <g transform="translate(540, 1180)">
          {/* Main Hospital Wing Masonry Block */}
          <rect x="-420" y="40" width="840" height="260" fill="#1C1819" stroke="#3A2826" strokeWidth="3" />
          {/* Brick Quoin Corner Stones */}
          {[-420, 390].map((bx) =>
            [50, 90, 130, 170, 210, 250].map((by) => (
              <rect key={`${bx}-${by}`} x={bx} y={by} width="30" height="24" fill="#3D201D" />
            ))
          )}

          {/* Central Raised Pediment & Clock Tower Elevation */}
          <polygon points="-160,40 160,40 120,-90 -120,-90" fill="#241C1D" stroke="#4A2D2A" strokeWidth="3" />
          <polygon points="-140,-90 140,-90 0,-160" fill="#2D2122" stroke="#5A3633" strokeWidth="2.5" />
          {/* Clock Circle in Pediment */}
          <circle cx="0" cy="-115" r="28" fill="#EAE3D2" stroke="#120D0E" strokeWidth="3" />
          <line x1="0" y1="-115" x2="0" y2="-132" stroke="#120D0E" strokeWidth="2.5" />
          <line x1="0" y1="-115" x2="12" y2="-115" stroke="#120D0E" strokeWidth="2" />

          {/* Upper Hospital Windows (6 colonial rounded arches with interior surgical light) */}
          {[-340, -250, -160, 160, 250, 340].map((wx) => (
            <g key={wx} transform={`translate(${wx}, 75)`}>
              {/* Window Arch Frame */}
              <path d="M -30 65 L -30 25 Q 0 -15 30 25 L 30 65 Z" fill="#F4B942" opacity="0.85" stroke="#4A2D2A" strokeWidth="2" />
              {/* Window Panes Grid */}
              <line x1="0" y1="0" x2="0" y2="65" stroke="#241C1D" strokeWidth="1.5" />
              <line x1="-30" y1="30" x2="30" y2="30" stroke="#241C1D" strokeWidth="1.5" />
            </g>
          ))}

          {/* Lower Level Colonnade & Emergency Ward Windows */}
          {[-340, -250, -160, 160, 250, 340].map((wx) => (
            <g key={wx} transform={`translate(${wx}, 180)`}>
              <path d="M -30 65 L -30 25 Q 0 -15 30 25 L 30 65 Z" fill="#E28743" opacity="0.75" stroke="#4A2D2A" strokeWidth="2" />
              <line x1="0" y1="0" x2="0" y2="65" stroke="#241C1D" strokeWidth="1.5" />
              <line x1="-30" y1="30" x2="30" y2="30" stroke="#241C1D" strokeWidth="1.5" />
            </g>
          ))}

          {/* Grand Central Entrance Archway (LRH Emergency Portal) */}
          <g transform="translate(0, 40)">
            <path
              d="M -90 260 L -90 120 Q 0 40 90 120 L 90 260 Z"
              fill="#0A0808"
              stroke="#5A3633"
              strokeWidth="4"
            />
            {/* Wrought Iron Gate Filigree */}
            <line x1="-60" y1="140" x2="-60" y2="260" stroke="#8C6245" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="-20" y1="120" x2="-20" y2="260" stroke="#8C6245" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="20" y1="120" x2="20" y2="260" stroke="#8C6245" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="60" y1="140" x2="60" y2="260" stroke="#8C6245" strokeWidth="2" strokeDasharray="6 4" />
          </g>

          {/* Pulsing Medical Red Cross Emblem over Entrance */}
          <g transform={`translate(0, -10) scale(${pulse})`}>
            <circle cx="0" cy="0" r="50" fill="url(#hospitalCrossGlow)" />
            <circle cx="0" cy="0" r="36" fill="#F4EFE6" stroke="#C1272D" strokeWidth="3" />
            <rect x="-8" y="-24" width="16" height="48" fill="#C1272D" />
            <rect x="-24" y="-8" width="48" height="16" fill="#C1272D" />
          </g>

          {/* Parked Ambulance Vehicle at Emergency Triage Ramp */}
          <g transform="translate(-240, 240)">
            {/* Ambulance Van Body */}
            <rect x="-80" y="0" width="160" height="60" rx="6" fill="#F4EFE6" stroke="#241C1D" strokeWidth="2" />
            {/* Red Ambulance Stripe */}
            <rect x="-80" y="24" width="160" height="12" fill="#C1272D" />
            {/* Ambulance Red Cross */}
            <rect x="-10" y="26" width="20" height="8" fill="#FFFFFF" />
            <rect x="-4" y="20" width="8" height="20" fill="#FFFFFF" />
            {/* Front windshield */}
            <polygon points="50,4 75,4 68,24 50,24" fill="#5BC0BE" opacity="0.8" />
            {/* Wheels */}
            <circle cx="-50" cy="60" r="14" fill="#120D0E" />
            <circle cx="50" cy="60" r="14" fill="#120D0E" />
            {/* Roof Emergency Flashing Beacon */}
            <rect x="0" y="-10" width="18" height="10" rx="3" fill={beaconColor} />
            <circle cx="9" cy="-5" r="22" fill={beaconColor} opacity="0.4" />
          </g>

          {/* Ground Pavement & Ambulance Bay Line */}
          <line x1="-540" y1="300" x2="540" y2="300" stroke="#3A2826" strokeWidth="4" />
        </g>
      </svg>

      {/* Tactile Emergency Dispatch Placard (anchored at top 895) */}
      <div
        style={{
          position: 'absolute',
          top: 895,
          left: '50%',
          transform: 'translateX(-50%) rotate(-0.8deg)',
          width: 780,
          backgroundColor: '#F4EFE6',
          border: '3px solid #C1272D',
          borderRadius: 4,
          padding: '16px 28px',
          boxShadow: '0 18px 42px rgba(0,0,0,0.88)',
          zIndex: 22,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 20,
            fontWeight: 700,
            color: '#14171D',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          LADY READING HOSPITAL • PESHAWAR
        </div>
        <div
          style={{
            marginTop: 4,
            fontFamily: blackOps.fontFamily,
            fontSize: 34,
            color: '#C1272D',
            letterSpacing: '2px',
          }}
        >
          CODE RED SURGICAL EMERGENCY
        </div>
        <div
          style={{
            marginTop: 4,
            fontFamily: courier.fontFamily,
            fontSize: 19,
            fontWeight: 700,
            color: '#2B3440',
            letterSpacing: '1px',
          }}
        >
          200+ WOUNDED ARRIVING • WARDS OVERFLOWING ONTO FLOORS
        </div>

        {/* Emergency Blood Appeal Red Ribbon */}
        <div
          style={{
            marginTop: 10,
            backgroundColor: '#C1272D',
            padding: '6px 18px',
            display: 'inline-block',
            boxShadow: '0 4px 12px rgba(193, 39, 45, 0.4)',
          }}
        >
          <span
            style={{
              fontFamily: caveat.fontFamily,
              fontSize: 26,
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            "Urgent Public Appeal: Doctors plead on radio for blood donations"
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * 7. PESHAWAR 137 CASUALTY COUNTER
 * Live rolling PaperSignCounter from 0 to 137 with subLabel, mass casualty rubber stamp,
 * and side stat pills.
 */
export const PeshawarCasualtiesCounter: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Background Tactical Grid */}
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <g opacity="0.22" stroke="#5BC0BE" strokeWidth="1">
          <line x1="120" y1="1300" x2="960" y2="1300" strokeDasharray="10 5" />
          <line x1="120" y1="1460" x2="960" y2="1460" strokeDasharray="10 5" />
        </g>
      </svg>

      {/* Live PaperSignCounter (anchored at top 890) */}
      <PaperSignCounter
        tagText="CONFIRMED CASUALTIES"
        startValue={0}
        endValue={137}
        subLabel="MOSTLY WOMEN & CHILDREN • MEENA BAZAAR"
        x={540}
        y={930}
        width={860}
        rollStartFrame={8}
        rollDurationFrames={52}
        stampText="DEADLIEST ATTACK IN CITY"
        stampFrame={60}
        highlightRedOnEnd={true}
      />

      {/* Secondary stat indicators */}
      <div
        style={{
          position: 'absolute',
          top: 1300,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 24,
          zIndex: 22,
        }}
      >
        <div
          style={{
            backgroundColor: '#1E252E',
            border: '2px solid #F4B942',
            padding: '10px 24px',
            borderRadius: 4,
          }}
        >
          <span
            style={{
              fontFamily: courier.fontFamily,
              fontSize: 20,
              fontWeight: 700,
              color: '#F4B942',
              letterSpacing: '1.5px',
            }}
          >
            200+ INJURED
          </span>
        </div>
        <div
          style={{
            backgroundColor: '#1E252E',
            border: '2px solid #E63946',
            padding: '10px 24px',
            borderRadius: 4,
          }}
        >
          <span
            style={{
              fontFamily: courier.fontFamily,
              fontSize: 20,
              fontWeight: 700,
              color: '#E63946',
              letterSpacing: '1.5px',
            }}
          >
            4 PLAZAS DESTROYED
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * 8. CLINTON ISLAMABAD DIPLOMATIC ARRIVAL
 * Diplomatic Boeing VIP transport silhouette, US & Pakistan flags,
 * and diplomatic arrival banner in Islamabad.
 */
export const ClintonArrivalDiplomaticCard: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Chaklala Airbase Runway Horizon (y > 1340) */}
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <g fill="#0E131A">
          <rect x="0" y="1460" width="1080" height="460" />
          <line x1="0" y1="1460" x2="1080" y2="1460" stroke="#F4B942" strokeWidth="4" />
          {/* Runway centerline dashes */}
          <line x1="100" y1="1560" x2="260" y2="1560" stroke="#EAE3D2" strokeWidth="6" strokeDasharray="40 30" />
          <line x1="400" y1="1560" x2="680" y2="1560" stroke="#EAE3D2" strokeWidth="6" strokeDasharray="40 30" />
          <line x1="820" y1="1560" x2="1000" y2="1560" stroke="#EAE3D2" strokeWidth="6" strokeDasharray="40 30" />

          {/* Boeing 747/757 Diplomatic VIP Plane Silhouette */}
          <g transform="translate(540, 1400)">
            {/* Fuselage */}
            <path
              d="M -320 20 Q -380 20 -440 0 Q -380 -25 -280 -25 L 260 -25 Q 380 -25 420 5 L 420 20 Z"
              fill="#182230"
              stroke="#5BC0BE"
              strokeWidth="2.5"
            />
            {/* Tail Fin */}
            <polygon points="-360,-25 -420,-140 -350,-140 -280,-25" fill="#182230" stroke="#5BC0BE" strokeWidth="2.5" />
            {/* Swept Wing */}
            <polygon points="-80,0 40,80 120,80 -20,0" fill="#111822" stroke="#5BC0BE" strokeWidth="2" />
            {/* Engine Turbofan */}
            <rect x="20" y="45" width="45" height="22" rx="6" fill="#0D1117" stroke="#F4B942" strokeWidth="1.5" />
          </g>
        </g>
      </svg>

      {/* Diplomatic Arrival Taped Notice Card */}
      <div
        style={{
          position: 'absolute',
          top: 910,
          left: '50%',
          transform: 'translateX(-50%) rotate(-1deg)',
          backgroundColor: '#EAE3D2',
          padding: '24px 38px',
          boxShadow: '0 16px 36px rgba(0,0,0,0.8)',
          clipPath:
            'polygon(1% 0%, 99% 1%, 98% 98%, 2% 100%)',
          textAlign: 'center',
          zIndex: 22,
          border: '1px solid rgba(20,22,25,0.2)',
        }}
      >
        <div
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 22,
            fontWeight: 700,
            color: '#14171D',
            letterSpacing: '2px',
          }}
        >
          ISLAMABAD CHAKLALA AIRBASE
        </div>
        <div
          style={{
            marginTop: 8,
            fontFamily: blackOps.fontFamily,
            fontSize: 32,
            color: '#204068',
            letterSpacing: '2px',
          }}
        >
          SECRETARY CLINTON ARRIVAL
        </div>
        <div
          style={{
            marginTop: 8,
            fontFamily: caveat.fontFamily,
            fontSize: 28,
            fontWeight: 700,
            color: '#C1272D',
          }}
        >
          Touchdown 11:45 AM • Bilateral Security Summit
        </div>
      </div>
    </div>
  );
};

/**
 * 9. WAZIRISTAN OPERATION MAP VECTOR
 * High-contrast topographical vector map of South Waziristan (Operation Rah-e-Nijat),
 * showing Durand Line border, military offensive arrows, artillery pins, and troop markers.
 */
export const WaziristanOperationMapVector: React.FC = () => {
  const frame = useCurrentFrame();

  // Animation drivers
  const pulse = 1 + 0.06 * Math.sin(frame * 0.12);
  const fastPulse = 1 + 0.16 * Math.sin(frame * 0.28);
  const marchOffset = (frame * 2.8) % 36;
  const advance = interpolate(frame, [0, 90], [0.15, 1], {
    extrapolateRight: 'clamp',
  });

  // 3-Prong Spearhead positions (Operation Rah-e-Nijat)
  // Axis 1: Eastern Spearhead (14 Div from Jandola towards Sararogha)
  const ax1X = interpolate(advance, [0, 1], [630, 520], { extrapolateRight: 'clamp' });
  const ax1Y = interpolate(advance, [0, 1], [1490, 1410], { extrapolateRight: 'clamp' });

  // Axis 2: Southern Spearhead (9 Div from Shakai towards Ladha)
  const ax2X = interpolate(advance, [0, 1], [340, 405], { extrapolateRight: 'clamp' });
  const ax2Y = interpolate(advance, [0, 1], [1530, 1405], { extrapolateRight: 'clamp' });

  // Axis 3: Northern Spearhead (SSG Commandos from Razmak towards Makin)
  const ax3X = interpolate(advance, [0, 1], [440, 432], { extrapolateRight: 'clamp' });
  const ax3Y = interpolate(advance, [0, 1], [1220, 1305], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          {/* Tactical map background grid */}
          <pattern id="voxTacticalGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#162230" strokeWidth="1" />
            <circle cx="48" cy="48" r="1.2" fill="#5BC0BE" opacity="0.25" />
          </pattern>

          {/* South Waziristan Conflict Zone Hazard Hatch */}
          <pattern
            id="conflictHazardHatch"
            width="18"
            height="18"
            patternTransform="rotate(45)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="18" stroke="#E63946" strokeWidth="3" opacity="0.32" />
          </pattern>

          {/* Spearhead arrowhead markers */}
          <marker id="arrowCyan" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 z" fill="#5BC0BE" />
          </marker>
          <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 z" fill="#F4B942" />
          </marker>
          <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 z" fill="#E63946" />
          </marker>
        </defs>

        {/* ======================================================== */}
        {/* 1. TACTICAL MAP BOARD FRAME (y: 780 to 1730, Headroom > 100px) */}
        {/* ======================================================== */}
        <g id="mapBoard">
          {/* Deep tactical plate shadow */}
          <rect
            x="48"
            y="780"
            width="984"
            height="950"
            rx="8"
            fill="#090D13"
            filter="drop-shadow(0 20px 45px rgba(0,0,0,0.85))"
          />

          {/* Map canvas fill */}
          <rect
            x="48"
            y="780"
            width="984"
            height="950"
            rx="8"
            fill="#0F1621"
            stroke="#24374C"
            strokeWidth="2.5"
          />

          {/* Tactical grid overlay */}
          <rect x="52" y="784" width="976" height="942" rx="6" fill="url(#voxTacticalGrid)" />

          {/* Lat/Long Coordinate Hash Ticks on Border */}
          {[180, 360, 540, 720, 900].map((tx) => (
            <g key={`tick-x-${tx}`}>
              <line x1={tx} y1="780" x2={tx} y2="790" stroke="#5BC0BE" strokeWidth="1.5" opacity="0.7" />
              <line x1={tx} y1="1720" x2={tx} y2="1730" stroke="#5BC0BE" strokeWidth="1.5" opacity="0.7" />
            </g>
          ))}
          {[880, 1020, 1160, 1300, 1440, 1580].map((ty) => (
            <g key={`tick-y-${ty}`}>
              <line x1="48" y1={ty} x2="58" y2={ty} stroke="#5BC0BE" strokeWidth="1.5" opacity="0.7" />
              <line x1="1022" y1={ty} x2="1032" y2={ty} stroke="#5BC0BE" strokeWidth="1.5" opacity="0.7" />
            </g>
          ))}

          {/* Coordinate labels */}
          <text x="68" y="802" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="12" letterSpacing="1">
            33°45'N / 69°15'E
          </text>
          <text x="920" y="802" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="12" letterSpacing="1">
            71°45'E
          </text>
          <text x="68" y="1722" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="12" letterSpacing="1">
            31°40'N / 69°15'E
          </text>
          <text x="920" y="1722" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="12" letterSpacing="1">
            71°45'E
          </text>
        </g>

        {/* ======================================================== */}
        {/* 2. TOPOGRAPHIC TERRAIN CONTOURS (Hindu Kush & Waziristan) */}
        {/* ======================================================== */}
        <g id="topography" opacity="0.75">
          {/* Outer high mountain massifs */}
          <path
            d="M 120 1280 Q 220 1190 320 1240 T 480 1170 T 640 1220 T 780 1150 T 980 1210"
            fill="none"
            stroke="#1D2D3E"
            strokeWidth="3.5"
          />
          <path
            d="M 160 1370 Q 280 1290 410 1340 T 590 1280 T 760 1330 T 960 1290"
            fill="none"
            stroke="#213347"
            strokeWidth="2.5"
          />
          <path
            d="M 180 1480 Q 310 1420 440 1460 T 620 1390 T 790 1440 T 960 1410"
            fill="none"
            stroke="#213347"
            strokeWidth="2.5"
          />
          <path
            d="M 140 1620 Q 290 1560 420 1590 T 580 1530 T 750 1570 T 950 1520"
            fill="none"
            stroke="#1D2D3E"
            strokeWidth="3.5"
          />

          {/* Central Waziristan Mountain Ring (Pre Ghal Ridge) */}
          <ellipse
            cx="440"
            cy="1380"
            rx="180"
            ry="140"
            fill="none"
            stroke="#273C53"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <ellipse
            cx="430"
            cy="1370"
            rx="110"
            ry="85"
            fill="none"
            stroke="#2E4662"
            strokeWidth="2"
          />
          {/* Mountain Peak Markers */}
          <text x="360" y="1328" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="11" opacity="0.8">
            ▲ PRE GHAL (3,513m)
          </text>
          <text x="470" y="1465" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="11" opacity="0.8">
            ▲ KANIGURAM CREST (2,980m)
          </text>
        </g>

        {/* ======================================================== */}
        {/* 3. DURAND LINE (AFGHANISTAN-PAKISTAN INTERNATIONAL BORDER) */}
        {/* ======================================================== */}
        <g id="durandLine">
          {/* International Border Path */}
          <path
            d="M 390 840 L 340 1010 L 315 1160 L 270 1310 L 235 1460 L 190 1620 L 170 1710"
            fill="none"
            stroke="#E63946"
            strokeWidth="4"
            strokeDasharray="14 8"
          />

          {/* Border label repeated along slant */}
          <text
            x="248"
            y="1260"
            fill="#E63946"
            fontFamily={courier.fontFamily}
            fontSize="14"
            fontWeight="700"
            letterSpacing="2px"
            transform="rotate(-76 248 1260)"
          >
            DURAND LINE // AFGHANISTAN BORDER
          </text>

          {/* Border Post Markers */}
          {[
            { x: 340, y: 1010, label: 'BP-41' },
            { x: 315, y: 1160, label: 'BP-38' },
            { x: 270, y: 1310, label: 'BP-34' },
            { x: 235, y: 1460, label: 'BP-29' },
          ].map((bp, bIdx) => (
            <g key={`bp-${bIdx}`} transform={`translate(${bp.x}, ${bp.y})`}>
              <rect x="-4" y="-4" width="8" height="8" fill="#E63946" stroke="#FFFFFF" strokeWidth="1.2" />
              <text x="8" y="4" fill="#E63946" fontFamily={courier.fontFamily} fontSize="10">
                {bp.label}
              </text>
            </g>
          ))}
        </g>

        {/* Territorial Watermarks */}
        <g id="territorialWatermarks">
          <text
            x="130"
            y="1180"
            fill="rgba(255, 255, 255, 0.16)"
            fontFamily={blackOps.fontFamily}
            fontSize="34"
            letterSpacing="6px"
            transform="rotate(-75 130 1180)"
          >
            AFGHANISTAN
          </text>
          <text
            x="760"
            y="1360"
            fill="rgba(255, 255, 255, 0.22)"
            fontFamily={blackOps.fontFamily}
            fontSize="38"
            letterSpacing="8px"
          >
            PAKISTAN
          </text>
          <text
            x="760"
            y="1395"
            fill="#5BC0BE"
            fontFamily={courier.fontFamily}
            fontSize="14"
            fontWeight="700"
            letterSpacing="2px"
            opacity="0.75"
          >
            NWFP // F.A.T.A. SECTOR
          </text>
        </g>

        {/* ======================================================== */}
        {/* 4. SOUTH WAZIRISTAN CONFLICT ZONE (OPERATION RAH-E-NIJAT) */}
        {/* ======================================================== */}
        <g id="conflictZone">
          {/* Shaded Hazard Boundary Polygon */}
          <polygon
            points="310,1230 490,1215 580,1360 560,1520 340,1580 250,1440 260,1320"
            fill="url(#conflictHazardHatch)"
            stroke="#E63946"
            strokeWidth="3"
            filter="drop-shadow(0 0 16px rgba(230, 57, 70, 0.45))"
          />

          {/* Operational Area Badge */}
          <g transform="translate(420, 1245)">
            <rect
              x="-160"
              y="-18"
              width="320"
              height="34"
              fill="#E63946"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              rx="4"
            />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily={blackOps.fontFamily}
              fontSize="16"
              letterSpacing="2px"
            >
              TARGET ZONE: SOUTH WAZIRISTAN
            </text>
          </g>
        </g>

        {/* ======================================================== */}
        {/* 5. STRATEGIC NODES & TTP MILITANT REDOUBTS */}
        {/* ======================================================== */}
        <g id="strategicNodes">
          {/* MAKIN - Central TTP Headquarters */}
          <g transform="translate(430, 1315)">
            <circle r={14 * pulse} fill="rgba(230, 57, 70, 0.2)" stroke="#E63946" strokeWidth="2" />
            <circle r="6" fill="#E63946" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Target Crosshairs */}
            <line x1="-12" y1="0" x2="12" y2="0" stroke="#E63946" strokeWidth="1.5" />
            <line x1="0" y1="-12" x2="0" y2="12" stroke="#E63946" strokeWidth="1.5" />
            <rect x="18" y="-14" width="165" height="26" fill="#141B26" stroke="#E63946" strokeWidth="1.5" rx="3" />
            <text x="26" y="4" fill="#FFFFFF" fontFamily={blackOps.fontFamily} fontSize="14">
              MAKIN
            </text>
            <text x="76" y="4" fill="#E63946" fontFamily={courier.fontFamily} fontSize="11" fontWeight="700">
              [TTP HQ]
            </text>
          </g>

          {/* LADHA - Mountain Bastion */}
          <g transform="translate(410, 1395)">
            <circle r="5" fill="#E63946" stroke="#FFFFFF" strokeWidth="1.2" />
            <rect x="14" y="-12" width="135" height="22" fill="#141B26" stroke="#2B3D52" strokeWidth="1.2" rx="3" />
            <text x="22" y="3" fill="#EAE3D2" fontFamily={courier.fontFamily} fontSize="12" fontWeight="700">
              LADHA (FORTRESS)
            </text>
          </g>

          {/* SARAROGHA - Major Logistics Center */}
          <g transform="translate(510, 1400)">
            <circle r="5" fill="#E63946" stroke="#FFFFFF" strokeWidth="1.2" />
            <rect x="14" y="-12" width="125" height="22" fill="#141B26" stroke="#2B3D52" strokeWidth="1.2" rx="3" />
            <text x="22" y="3" fill="#EAE3D2" fontFamily={courier.fontFamily} fontSize="12" fontWeight="700">
              SARAROGHA
            </text>
          </g>

          {/* KOTKAI - Eastern Gateway */}
          <g transform="translate(535, 1465)">
            <circle r="4" fill="#F4B942" stroke="#141B26" strokeWidth="1.2" />
            <text x="14" y="4" fill="#F4B942" fontFamily={courier.fontFamily} fontSize="12" fontWeight="700">
              KOTKAI
            </text>
          </g>

          {/* WANA - Agency Capital */}
          <g transform="translate(320, 1570)">
            <circle r="6" fill="#5BC0BE" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="14" y="-12" width="85" height="22" fill="#141B26" stroke="#5BC0BE" strokeWidth="1.2" rx="3" />
            <text x="22" y="3" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="12" fontWeight="700">
              WANA
            </text>
          </g>

          {/* ARMY STAGING BASES */}
          {/* Razmak (North) */}
          <g transform="translate(440, 1210)">
            <rect x="-8" y="-8" width="16" height="16" fill="#5BC0BE" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="14" y="4" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="13" fontWeight="700">
              RAZMAK BASE
            </text>
          </g>

          {/* Jandola (East) */}
          <g transform="translate(635, 1490)">
            <rect x="-8" y="-8" width="16" height="16" fill="#5BC0BE" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="14" y="4" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="13" fontWeight="700">
              JANDOLA BASE
            </text>
          </g>

          {/* Shakai (South) */}
          <g transform="translate(335, 1525)">
            <rect x="-8" y="-8" width="16" height="16" fill="#5BC0BE" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="-95" y="4" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="13" fontWeight="700">
              SHAKAI BASE
            </text>
          </g>
        </g>

        {/* ======================================================== */}
        {/* 6. 3-PRONGED ARMY OFFENSIVE SPEARHEADS (OPERATION RAH-E-NIJAT) */}
        {/* ======================================================== */}
        <g id="offensiveSpearheads">
          {/* Axis 1: 14th Division (Jandola -> Kotkai -> Sararogha) */}
          <path
            d={`M 630 1490 Q 580 1460 ${ax1X} ${ax1Y}`}
            fill="none"
            stroke="#5BC0BE"
            strokeWidth="5"
            markerEnd="url(#arrowCyan)"
            strokeDasharray="12 6"
          />
          {/* NATO Unit Counter Badge (East Axis) */}
          <g transform="translate(660, 1450)">
            <rect x="0" y="-14" width="180" height="28" fill="#14222E" stroke="#5BC0BE" strokeWidth="1.5" rx="3" />
            <text x="10" y="4" fill="#5BC0BE" fontFamily={blackOps.fontFamily} fontSize="12" letterSpacing="1">
              PA 14 DIV • EAST AXIS
            </text>
          </g>

          {/* Axis 2: 9th Division (Shakai -> Kaniguram -> Ladha) */}
          <path
            d={`M 340 1525 Q 360 1460 ${ax2X} ${ax2Y}`}
            fill="none"
            stroke="#5BC0BE"
            strokeWidth="5"
            markerEnd="url(#arrowCyan)"
            strokeDasharray="12 6"
          />
          {/* NATO Unit Counter Badge (South Axis) */}
          <g transform="translate(240, 1485)">
            <rect x="0" y="-14" width="180" height="28" fill="#14222E" stroke="#5BC0BE" strokeWidth="1.5" rx="3" />
            <text x="10" y="4" fill="#5BC0BE" fontFamily={blackOps.fontFamily} fontSize="12" letterSpacing="1">
              PA 9 DIV • SOUTH AXIS
            </text>
          </g>

          {/* Axis 3: SSG Commandos (Razmak -> Makin Central Bastion) */}
          <path
            d={`M 440 1215 L ${ax3X} ${ax3Y}`}
            fill="none"
            stroke="#5BC0BE"
            strokeWidth="5"
            markerEnd="url(#arrowCyan)"
            strokeDasharray="12 6"
          />
          {/* NATO Unit Counter Badge (North Axis) */}
          <g transform="translate(460, 1205)">
            <rect x="0" y="-14" width="180" height="28" fill="#14222E" stroke="#5BC0BE" strokeWidth="1.5" rx="3" />
            <text x="10" y="4" fill="#5BC0BE" fontFamily={blackOps.fontFamily} fontSize="12" letterSpacing="1">
              SSG COMMANDOS • NORTH
            </text>
          </g>
        </g>

        {/* ======================================================== */}
        {/* 7. RETALIATORY TRAJECTORY & PESHAWAR TARGET (THE NARRATIVE HOOK) */}
        {/* ======================================================== */}
        <g id="retaliationVector">
          {/* Ballistic arc from Makin (430, 1315) northeast to Peshawar (820, 920) */}
          <path
            d="M 430 1315 Q 640 1080 820 920"
            fill="none"
            stroke="#F4B942"
            strokeWidth="4"
            strokeDasharray="10 8"
            strokeDashoffset={-marchOffset}
            markerEnd="url(#arrowAmber)"
          />

          {/* Trajectory Forensic Callout Placard */}
          <g transform="translate(620, 1070) rotate(-26)">
            <rect
              x="-180"
              y="-16"
              width="360"
              height="32"
              fill="#1A180E"
              stroke="#F4B942"
              strokeWidth="1.5"
              rx="4"
              filter="drop-shadow(0 6px 14px rgba(0,0,0,0.8))"
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill="#F4B942"
              fontFamily={courier.fontFamily}
              fontSize="12"
              fontWeight="700"
              letterSpacing="1px"
            >
              ⚡ RETALIATORY BLOWBACK TRAJECTORY
            </text>
          </g>

          {/* PESHAWAR BLAST SITE BEACON (820, 920) */}
          <g transform="translate(820, 920)">
            {/* Animated detonation rings */}
            <circle r={32 * fastPulse} fill="rgba(230, 57, 70, 0.15)" stroke="#E63946" strokeWidth="2" strokeDasharray="6 4" />
            <circle r={20 * pulse} fill="rgba(244, 185, 66, 0.25)" stroke="#F4B942" strokeWidth="2.5" />
            <circle r="9" fill="#C1272D" stroke="#FFFFFF" strokeWidth="2" />

            {/* Target Crosshairs */}
            <line x1="-36" y1="0" x2="36" y2="0" stroke="#E63946" strokeWidth="2" />
            <line x1="0" y1="-36" x2="0" y2="36" stroke="#E63946" strokeWidth="2" />

            {/* Target Placard */}
            <g transform="translate(0, -56)">
              <rect
                x="-125"
                y="-18"
                width="250"
                height="38"
                fill="#C1272D"
                stroke="#FFFFFF"
                strokeWidth="2"
                rx="4"
                filter="drop-shadow(0 8px 16px rgba(0,0,0,0.9))"
              />
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily={blackOps.fontFamily}
                fontSize="15"
                letterSpacing="1.5px"
              >
                PESHAWAR (BLAST SITE)
              </text>
              <text
                x="0"
                y="14"
                textAnchor="middle"
                fill="#F4EFE6"
                fontFamily={courier.fontFamily}
                fontSize="11"
                fontWeight="700"
              >
                MEENA BAZAAR • 11:30 AM
              </text>
            </g>
          </g>
        </g>

        {/* ======================================================== */}
        {/* 8. VOX HUD HEADER & BOTTOM FORENSIC LEGEND */}
        {/* ======================================================== */}
        {/* Header HUD Bar (y: 815) */}
        <g id="mapHeaderHud" transform="translate(540, 828)">
          <rect
            x="-460"
            y="-22"
            width="920"
            height="44"
            fill="#121A26"
            stroke="#2B3E54"
            strokeWidth="1.5"
            rx="4"
          />
          {/* Live Telemetry Dot */}
          <circle cx="-435" cy="0" r="6" fill="#E63946">
            <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <text x="-418" y="5" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="14" fontWeight="700" letterSpacing="1">
            TACTICAL GRID: OPERATION RAH-E-NIJAT
          </text>
          {/* Strength Pill */}
          <rect x="180" y="-14" width="265" height="28" fill="#E63946" rx="3" />
          <text
            x="312"
            y="4"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily={blackOps.fontFamily}
            fontSize="13"
            letterSpacing="1px"
          >
            30,000 TROOPS MOBILIZED
          </text>
        </g>

        {/* Footer Forensic Legend Bar (y: 1675) */}
        <g id="mapFooterLegend" transform="translate(540, 1680)">
          <rect
            x="-460"
            y="-30"
            width="920"
            height="56"
            fill="#101722"
            stroke="#2B3E54"
            strokeWidth="1.5"
            rx="4"
          />

          {/* Legend Item 1: Army Advance Spearhead */}
          <line x1="-430" y1="-8" x2="-390" y2="-8" stroke="#5BC0BE" strokeWidth="4" />
          <text x="-380" y="-3" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="12" fontWeight="700">
            ARMY ADVANCE AXIS
          </text>

          {/* Legend Item 2: Insurgent Stronghold */}
          <rect x="-215" y="-14" width="12" height="12" fill="#E63946" stroke="#FFFFFF" strokeWidth="1" />
          <text x="-195" y="-3" fill="#E63946" fontFamily={courier.fontFamily} fontSize="12" fontWeight="700">
            TTP BASTION
          </text>

          {/* Legend Item 3: Durand Line */}
          <line x1="-70" y1="-8" x2="-30" y2="-8" stroke="#E63946" strokeWidth="3" strokeDasharray="6 4" />
          <text x="-20" y="-3" fill="#E63946" fontFamily={courier.fontFamily} fontSize="12" fontWeight="700">
            DURAND LINE
          </text>

          {/* Legend Item 4: Retaliatory Vector */}
          <line x1="110" y1="-8" x2="150" y2="-8" stroke="#F4B942" strokeWidth="3" strokeDasharray="6 4" />
          <text x="160" y="-3" fill="#F4B942" fontFamily={courier.fontFamily} fontSize="12" fontWeight="700">
            RETALIATION AXIS
          </text>

          {/* Scale Bar & Attribution */}
          <text x="-430" y="16" fill="#8899A6" fontFamily={courier.fontFamily} fontSize="10">
            SCALE: 0 ─── 25 KM ─── 50 KM • HIGH RESOLUTION TOPOGRAPHIC MAPPING
          </text>
          <text x="180" y="16" fill="#8899A6" fontFamily={courier.fontFamily} fontSize="10">
            SOURCE: DECLASSIFIED ISPR RECORDS
          </text>
        </g>

        {/* Corner Parchment Tape Strips (Tactile craft detail) */}
        <g id="tapeStrips" opacity="0.88">
          <rect
            x="28"
            y="768"
            width="80"
            height="26"
            fill="#EAE3D2"
            transform="rotate(-15 68 781)"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
          />
          <rect
            x="972"
            y="768"
            width="80"
            height="26"
            fill="#EAE3D2"
            transform="rotate(12 1012 781)"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
          />
          <rect
            x="28"
            y="1710"
            width="80"
            height="26"
            fill="#EAE3D2"
            transform="rotate(10 68 1723)"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
          />
          <rect
            x="972"
            y="1710"
            width="80"
            height="26"
            fill="#EAE3D2"
            transform="rotate(-8 1012 1723)"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
          />
        </g>
      </svg>
    </div>
  );
};

/**
 * 10. INTELLIGENCE DISAVOWAL SCHEMATIC (TALL 9:16 VERTICAL STACK WITH DIE-CUT PUPPETS)
 * Vertically stacked intelligence dossier layout:
 * - Top Tier (y: 810): Tehrik-i-Taliban Pakistan (TTP) Disavowal Card + Taliban Cutout Puppet on left
 * - Bottom Tier (y: 1255): Al-Qaeda Press Desk Statement Card + Al-Qaeda Cutout Puppet on right
 * - Animated to the beat: At frame 60 (Beat 2 punchline), both puppets switch poses in emphatic denial
 *   and double-bordered red rubber stamps "DISAVOWED" / "DENIED INVOLVEMENT" slam onto the dossiers.
 */
export const IntelligenceDisavowalSchematic: React.FC = () => {
  const frame = useCurrentFrame();

  // Beat 2 stamp slam driver (Frame 60)
  const isSlammed = frame >= 60;
  const stampSlam = isSlammed
    ? interpolate(frame - 60, [0, 3, 6], [1.38, 0.94, 1.0], {
        extrapolateRight: 'clamp',
      })
    : 0;
  const stampOpacity = isSlammed
    ? interpolate(frame - 60, [0, 2], [0, 1], {
        extrapolateRight: 'clamp',
      })
    : 0;

  // Background wiretap oscilloscope wave
  const waveOffset = (frame * 4) % 120;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* ======================================================== */}
      {/* 1. BACKGROUND TECHNICAL WIRETAP & FREQUENCY SCHEMATICS */}
      {/* ======================================================== */}
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <pattern id="wiretapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#162230" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Central Wiretap Intercept Spine Line */}
        <g opacity="0.45">
          <line x1="540" y1="780" x2="540" y2="1730" stroke="#5BC0BE" strokeWidth="2" strokeDasharray="8 6" />
          <circle cx="540" cy="800" r="5" fill="#5BC0BE" />
          <circle cx="540" cy="1235" r="7" fill="#E63946" />
          <circle cx="540" cy="1710" r="5" fill="#5BC0BE" />
        </g>

        {/* Oscilloscope Frequency Wave between tiers (y ~ 1225..1245) */}
        <g opacity="0.6">
          <path
            d={`M 60 1235 Q 160 ${1215 + Math.sin(frame * 0.2) * 16} 260 1235 T 460 1235 T 660 1235 T 860 1235 T 1020 1235`}
            fill="none"
            stroke="#5BC0BE"
            strokeWidth="2.5"
          />
          <text x="540" y="1225" textAnchor="middle" fill="#5BC0BE" fontFamily={courier.fontFamily} fontSize="12" letterSpacing="2">
            SIGINT FREQ 142.85 MHz // DECLASSIFIED TELECOMMUNICATION INTERCEPT
          </text>
        </g>

        {/* Diagonal Cable Link from TTP to Al-Qaeda */}
        <line x1="360" y1="1180" x2="720" y2="1265" stroke="#E63946" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
      </svg>

      {/* ======================================================== */}
      {/* 2. TOP TIER: TALIBAN PUPPET + TTP DISAVOWAL DOSSIER CARD */}
      {/* ======================================================== */}
      {/* Taliban Cutout Puppet on Left (x: 210, y: 1010) */}
      <CutoutPuppet
        character="TALIBAN"
        x={210}
        y={1010}
        scale={0.96}
        outfit="TALIBAN_VEST"
        initialPose="POINTING"
        switchedPose="PITCHING"
        poseSwitchFrame={60}
        paperTagLabel="TTP COMMAND"
      />

      {/* TTP Disavowal Dossier Card on Right (left: 360, top: 810) */}
      <div
        style={{
          position: 'absolute',
          top: 810,
          left: 360,
          width: 660,
          backgroundColor: '#EAE3D2',
          padding: '24px 26px',
          boxShadow: '0 16px 36px rgba(0,0,0,0.85)',
          transform: 'rotate(-1.2deg)',
          borderRadius: 4,
          border: '1px solid #D2C8B4',
          zIndex: 22,
        }}
      >
        {/* Dossier Header Strip */}
        <div
          style={{
            backgroundColor: '#1E252E',
            padding: '7px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontFamily: courier.fontFamily,
              fontSize: 15,
              fontWeight: 700,
              color: '#F4EFE6',
              letterSpacing: '1px',
            }}
          >
            INTERCEPT 01: TEHRIK-I-TALIBAN CENTRAL
          </span>
          <span
            style={{
              fontFamily: courier.fontFamily,
              fontSize: 12,
              color: '#5BC0BE',
              letterSpacing: '1px',
            }}
          >
            FREQ: 142.85 MHz
          </span>
        </div>

        {/* Date & Classification */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: courier.fontFamily,
            fontSize: 12,
            fontWeight: 700,
            color: '#766B5C',
            marginBottom: 10,
          }}
        >
          <span>DATE: 28 OCT 2009 • 13:40 PKT</span>
          <span>SOURCE: RADIO BROADCAST DESK</span>
        </div>

        {/* Quoted Disavowal Statement */}
        <div
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 19,
            fontWeight: 700,
            color: '#141619',
            lineHeight: 1.35,
            padding: '8px 12px',
            backgroundColor: 'rgba(255,255,255,0.45)',
            borderLeft: '4px solid #C1272D',
            marginBottom: 12,
          }}
        >
          "We do not attack mosques or bazaars where women and children shop. We condemn this blast in the strongest terms."
        </div>

        <div
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 14,
            fontWeight: 700,
            color: '#343B45',
            textAlign: 'right',
            marginBottom: 8,
          }}
        >
          — AZAM TARIQ, OFFICIAL TTP SPOKESMAN
        </div>

        {/* Weathered Rubber Stamp Slam (Appears & Slams on Beat 2) */}
        {isSlammed && (
          <div
            style={{
              marginTop: 10,
              border: '4px solid #C1272D',
              padding: '10px 18px',
              textAlign: 'center',
              fontFamily: blackOps.fontFamily,
              fontSize: 26,
              letterSpacing: '3px',
              color: '#C1272D',
              transform: `rotate(-4deg) scale(${stampSlam})`,
              opacity: stampOpacity,
              backgroundColor: 'rgba(193, 39, 45, 0.12)',
              boxShadow: 'inset 0 0 10px rgba(193, 39, 45, 0.18)',
            }}
          >
            ★ DISAVOWED RESPONSIBILITY ★
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 3. BOTTOM TIER: AL-QAEDA STATEMENT CARD + PUPPET ON RIGHT */}
      {/* ======================================================== */}
      {/* Al-Qaeda Press Statement Dossier Card on Left (left: 60, top: 1255) */}
      <div
        style={{
          position: 'absolute',
          top: 1255,
          left: 60,
          width: 660,
          backgroundColor: '#EAE3D2',
          padding: '24px 26px',
          boxShadow: '0 16px 36px rgba(0,0,0,0.85)',
          transform: 'rotate(1.2deg)',
          borderRadius: 4,
          border: '1px solid #D2C8B4',
          zIndex: 22,
        }}
      >
        {/* Dossier Header Strip */}
        <div
          style={{
            backgroundColor: '#1E252E',
            padding: '7px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontFamily: courier.fontFamily,
              fontSize: 15,
              fontWeight: 700,
              color: '#F4EFE6',
              letterSpacing: '1px',
            }}
          >
            INTERCEPT 02: AL-QAEDA PRESS DESK
          </span>
          <span
            style={{
              fontFamily: courier.fontFamily,
              fontSize: 12,
              color: '#F4B942',
              letterSpacing: '1px',
            }}
          >
            AS-SAHAB MEDIA
          </span>
        </div>

        {/* Date & Classification */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: courier.fontFamily,
            fontSize: 12,
            fontWeight: 700,
            color: '#766B5C',
            marginBottom: 10,
          }}
        >
          <span>DATE: 28 OCT 2009 • OFFICIAL DISPATCH</span>
          <span>SOURCE: SHORTWAVE MONITORED</span>
        </div>

        {/* Quoted Disavowal Statement */}
        <div
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 19,
            fontWeight: 700,
            color: '#141619',
            lineHeight: 1.35,
            padding: '8px 12px',
            backgroundColor: 'rgba(255,255,255,0.45)',
            borderLeft: '4px solid #C1272D',
            marginBottom: 12,
          }}
        >
          "We have no link to the Peshawar explosion. Separate covert forces seek to defame jihad and murder civilians."
        </div>

        <div
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 14,
            fontWeight: 700,
            color: '#343B45',
            textAlign: 'right',
            marginBottom: 8,
          }}
        >
          — MUSTAFA ABU AL-YAZID DESK, AL-QAEDA
        </div>

        {/* Weathered Rubber Stamp Slam (Appears & Slams on Beat 2) */}
        {isSlammed && (
          <div
            style={{
              marginTop: 10,
              border: '4px solid #C1272D',
              padding: '10px 18px',
              textAlign: 'center',
              fontFamily: blackOps.fontFamily,
              fontSize: 26,
              letterSpacing: '3px',
              color: '#C1272D',
              transform: `rotate(3deg) scale(${stampSlam})`,
              opacity: stampOpacity,
              backgroundColor: 'rgba(193, 39, 45, 0.12)',
              boxShadow: 'inset 0 0 10px rgba(193, 39, 45, 0.18)',
            }}
          >
            ★ DENIED INVOLVEMENT ★
          </div>
        )}
      </div>

      {/* Al-Qaeda Cutout Puppet on Right (x: 870, y: 1465) */}
      <CutoutPuppet
        character="ALQAEDA"
        x={870}
        y={1465}
        scale={0.96}
        outfit="MILITANT_FATIGUES"
        initialPose="NEUTRAL"
        switchedPose="PITCHING"
        poseSwitchFrame={60}
        paperTagLabel="AL-QAEDA DESK"
      />
    </div>
  );
};

/**
 * 11. CLINTON & QURESHI DUAL DIPLOMATIC PUPPET STAGE
 * Joint press conference staged with articulated CutoutPuppets using authentic archival faces:
 * FM Shah Mahmood Qureshi (plates/shah_mahmood_qureshi.jpg) on left podium,
 * Secretary Hillary Clinton (plates/hillary_clinton.jpg) on right podium,
 * with press microphones, bilateral seals, camera flash bursts, and joint statement placard.
 */
export const ClintonQureshiPressCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Camera flashbulbs from press corps on punchline frame (frame 45 - 54)
  const isFlash = frame >= 45 && frame <= 50;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Background Diplomatic Press Conference Drapery & Seals */}
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Press backdrop curtain pleats */}
        <g opacity="0.28" fill="#141B24">
          {[0, 120, 240, 360, 480, 600, 720, 840, 960].map((px) => (
            <rect key={px} x={px} y="880" width="60" height="600" />
          ))}
        </g>

        {/* Bilateral Diplomatic Crest Graphics */}
        <g opacity="0.3">
          <circle cx="320" cy="1020" r="140" fill="none" stroke="#5BC0BE" strokeWidth="2" strokeDasharray="8 6" />
          <circle cx="760" cy="1020" r="140" fill="none" stroke="#F4B942" strokeWidth="2" strokeDasharray="8 6" />
        </g>

        {/* Press corps camera flashes */}
        {isFlash && (
          <g>
            <circle cx="240" cy="1320" r="180" fill="#FFFFFF" opacity="0.75" />
            <circle cx="840" cy="1350" r="160" fill="#FFFFFF" opacity="0.7" />
          </g>
        )}
      </svg>

      {/* Left Puppet: Foreign Minister Shah Mahmood Qureshi (Archival Cutout Face) */}
      <CutoutPuppet
        character="QURESHI"
        x={320}
        y={1140}
        scale={1.02}
        outfit="POLITICIAN_SHERWANI"
        initialPose="NEUTRAL"
        switchedPose="POINTING"
        poseSwitchFrame={45}
        paperTagLabel="FM S. M. QURESHI"
      />

      {/* Right Puppet: US Secretary of State Hillary Clinton (Archival Cutout Face) */}
      <CutoutPuppet
        character="CLINTON"
        x={760}
        y={1140}
        scale={1.02}
        outfit="CLINTON_PANTSUIT"
        initialPose="NEUTRAL"
        switchedPose="POINTING"
        poseSwitchFrame={45}
        paperTagLabel="SEC. H. CLINTON"
      />

      {/* Foreground Bilateral Lecterns & Press Microphones */}
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 21 }}>
        {/* Left Podium (FM Qureshi) */}
        <g transform="translate(320, 1280)">
          {/* Wooden Lectern */}
          <polygon points="-90,0 90,0 70,120 -70,120" fill="#161E28" stroke="#5BC0BE" strokeWidth="2.5" />
          {/* Crescent & Star Seal */}
          <circle cx="0" cy="50" r="22" fill="#0C1015" stroke="#F4B942" strokeWidth="2" />
          <circle cx="4" cy="48" r="12" fill="#F4B942" />
          <circle cx="7" cy="46" r="11" fill="#0C1015" />
          <polygon points="-4,46 -2,42 2,42 0,46 2,50 -2,50" fill="#F4B942" />
          {/* Dual Goose-neck Microphones */}
          <line x1="-35" y1="0" x2="-45" y2="-45" stroke="#5BC0BE" strokeWidth="3" />
          <circle cx="-45" cy="-48" r="7" fill="#5BC0BE" />
          <line x1="35" y1="0" x2="45" y2="-45" stroke="#5BC0BE" strokeWidth="3" />
          <circle cx="45" cy="-48" r="7" fill="#5BC0BE" />
        </g>

        {/* Right Podium (Secretary Clinton) */}
        <g transform="translate(760, 1280)">
          {/* Wooden Lectern */}
          <polygon points="-90,0 90,0 70,120 -70,120" fill="#161E28" stroke="#F4B942" strokeWidth="2.5" />
          {/* US Seal Graphic */}
          <circle cx="0" cy="50" r="22" fill="#0C1015" stroke="#F4B942" strokeWidth="2" />
          <circle cx="0" cy="50" r="14" fill="#204068" />
          <polygon points="-8,48 0,40 8,48 5,56 -5,56" fill="#F4B942" />
          {/* Dual Goose-neck Microphones */}
          <line x1="-35" y1="0" x2="-45" y2="-45" stroke="#F4B942" strokeWidth="3" />
          <circle cx="-45" cy="-48" r="7" fill="#F4B942" />
          <line x1="35" y1="0" x2="45" y2="-45" stroke="#F4B942" strokeWidth="3" />
          <circle cx="45" cy="-48" r="7" fill="#F4B942" />
        </g>
      </svg>

      {/* Bilateral Joint Press Briefing Placard (anchored at top 1390) */}
      <div
        style={{
          position: 'absolute',
          top: 1390,
          left: '50%',
          transform: 'translateX(-50%) rotate(0.4deg)',
          width: 820,
          backgroundColor: '#161B22',
          border: '2px solid #F4B942',
          borderRadius: 4,
          padding: '12px 28px',
          boxShadow: '0 12px 28px rgba(0,0,0,0.85)',
          zIndex: 25,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 18,
            fontWeight: 700,
            color: '#F4B942',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          ISLAMABAD BILATERAL PRESS CONFERENCE • 28 OCT 2009
        </div>
        <div
          style={{
            marginTop: 4,
            fontFamily: blackOps.fontFamily,
            fontSize: 24,
            color: '#FFFFFF',
            letterSpacing: '1.5px',
          }}
        >
          "WE WILL NOT BUCKLE TO TERROR"
        </div>
        <div
          style={{
            marginTop: 4,
            fontFamily: caveat.fontFamily,
            fontSize: 22,
            fontWeight: 700,
            color: '#5BC0BE',
          }}
        >
          Joint declaration issued hours after the Peshawar Meena Bazaar detonation
        </div>
      </div>
    </div>
  );
};

/**
 * 12. CLINTON DIPLOMATIC PUPPET STAGE
 * Cutout puppet of Hillary Clinton with diplomatic podium and bilateral speech stance.
 */
export const ClintonDiplomaticPuppetStage: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* US Department of State & Bilateral Seal Graphics */}
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <g opacity="0.35">
          <circle cx="540" cy="1160" r="260" fill="none" stroke="#F4B942" strokeWidth="3" strokeDasharray="14 8" />
        </g>
      </svg>

      {/* Die-Cut Sticker Puppet of Hillary Clinton */}
      <CutoutPuppet
        character="CLINTON"
        x={540}
        y={1160}
        scale={1.12}
        outfit="CLINTON_PANTSUIT"
        initialPose="NEUTRAL"
        switchedPose="POINTING"
        poseSwitchFrame={45}
        paperTagLabel="SEC. HILLARY CLINTON"
      />

      {/* Speech Quote Placard */}
      <div
        style={{
          position: 'absolute',
          top: 1390,
          left: '50%',
          transform: 'translateX(-50%) rotate(0.8deg)',
          backgroundColor: '#1E2530',
          border: '2px solid #F4B942',
          padding: '14px 36px',
          boxShadow: '0 12px 28px rgba(0,0,0,0.85)',
          zIndex: 25,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 22,
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '1.5px',
          }}
        >
          "WE COMMIT TO STAND SHOULDER TO SHOULDER"
        </div>
      </div>
    </div>
  );
};

/**
 * 13. ITALY OLBIA CONTINENTAL MAP VECTOR
 * Tactical map schematic showing the international financing connection from
 * Olbia, Sardinia (Italy) across the Mediterranean to Peshawar, Pakistan.
 * Discovered by Italian DIGOS anti-terror police in 2015.
 */
export const ItalyOlbiaContinentalMapVector: React.FC = () => {
  const frame = useCurrentFrame();
  const travel = (frame * 5) % 800;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <g transform="translate(540, 1240)">
          {/* Base tactical plate */}
          <rect
            x="-460"
            y="-320"
            width="920"
            height="440"
            fill="#121822"
            stroke="#5BC0BE"
            strokeWidth="3"
            rx="6"
          />

          {/* Olbia, Sardinia (Italy) Sector */}
          <circle cx="-280" cy="-80" r="14" fill="#E63946" stroke="#FFFFFF" strokeWidth="2.5" />
          <text x="-280" y="-115" textAnchor="middle" fill="#FFFFFF" fontFamily={blackOps.fontFamily} fontSize="20">
            OLBIA, SARDINIA (ITALY)
          </text>
          <text x="-280" y="-50" textAnchor="middle" fill="#F4B942" fontFamily={courier.fontFamily} fontSize="15" fontWeight="700">
            DIGOS ARREST CELL (2015)
          </text>

          {/* Peshawar, Pakistan Sector */}
          <circle cx="280" cy="-80" r="14" fill="#C1272D" stroke="#FFFFFF" strokeWidth="2.5" />
          <text x="280" y="-115" textAnchor="middle" fill="#FFFFFF" fontFamily={blackOps.fontFamily} fontSize="20">
            PESHAWAR, PAKISTAN
          </text>
          <text x="280" y="-50" textAnchor="middle" fill="#F4B942" fontFamily={courier.fontFamily} fontSize="15" fontWeight="700">
            TARGET: MEENA BAZAAR
          </text>

          {/* Arc Financial & Logistics Trail Line */}
          <path
            d="M -280 -80 Q 0 -220 280 -80"
            fill="none"
            stroke="#F4B942"
            strokeWidth="4"
            strokeDasharray="12 8"
          />

          {/* Moving wire pulse dot */}
          <circle
            cx={interpolate(travel, [0, 800], [-280, 280], { extrapolateRight: 'clamp' })}
            cy={interpolate(travel, [0, 400, 800], [-80, -180, -80], { extrapolateRight: 'clamp' })}
            r="9"
            fill="#E63946"
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          {/* DIGOS Police Stamp */}
          <rect x="-180" y="30" width="360" height="48" fill="#C1272D" />
          <text
            x="0"
            y="62"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily={blackOps.fontFamily}
            fontSize="20"
            letterSpacing="2px"
          >
            ITALIAN DIGOS INVESTIGATION • 2015
          </text>
        </g>
      </svg>

      {/* Explanatory Context Pill */}
      <div
        style={{
          position: 'absolute',
          top: 910,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#EAE3D2',
          padding: '12px 34px',
          boxShadow: '0 12px 28px rgba(0,0,0,0.8)',
          zIndex: 22,
        }}
      >
        <span
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 22,
            fontWeight: 700,
            color: '#141619',
            letterSpacing: '2px',
          }}
        >
          TRANSNATIONAL FINANCE & PLANNING UNCOVERED
        </span>
      </div>
    </div>
  );
};

/**
 * 14. PESHAWAR REBUILD SILHOUETTE
 * Bab-e-Khyber historic archway, Bala Hisar silhouette, and citizens rebuilding market stalls
 * under rising dawn sun rays.
 */
export const PeshawarRebuildSilhouette: React.FC = () => {
  const frame = useCurrentFrame();
  const rayRot = (Math.floor(frame / 4) * 0.4) % 360;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Rising dawn rays behind the gateway */}
        <g transform={`translate(540, 1230) rotate(${rayRot})`} opacity="0.22">
          {Array.from({ length: 16 }).map((_, i) => (
            <polygon
              key={i}
              points="0,0 -40,-620 40,-620"
              fill="#F4B942"
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>

        {/* Bab-e-Khyber gateway silhouette, enlarged into the focal zone (top >= 900) */}
        <g fill="#0E131A" transform="translate(540, 1230) scale(1.45)">
          <path d="M -260 160 L -260 -60 L -180 -120 L -100 -60 L -100 160 Z" stroke="#F4B942" strokeWidth="2" />
          <path d="M 100 160 L 100 -60 L 180 -120 L 260 -60 L 260 160 Z" stroke="#F4B942" strokeWidth="2" />
          {/* Crenellations */}
          {[-250, -210, -170, -130, 110, 150, 190, 230].map((cx) => (
            <rect key={cx} x={cx} y={-80} width="22" height="22" />
          ))}
          <path d="M -100 -20 Q 0 -160 100 -20 L 100 160 L -100 160 Z" fill="#121822" stroke="#F4B942" strokeWidth="3" />
          <path d="M -70 40 Q 0 -60 70 40 L 70 160 L -70 160 Z" fill="#090D12" />
        </g>

        {/* Rebuilt market stalls with fresh canopies flanking the gate */}
        <g>
          <rect x="40" y="1400" width="200" height="80" fill="#14181F" />
          <polygon points="30,1400 250,1400 230,1360 50,1360" fill="#C1272D" />
          <rect x="840" y="1400" width="200" height="80" fill="#14181F" />
          <polygon points="830,1400 1050,1400 1030,1360 850,1360" fill="#D4A340" />
          <rect x="0" y="1478" width="1080" height="6" fill="#3A2D23" />
        </g>
      </svg>

      {/* Location tag above the arch */}
      <div
        style={{
          position: 'absolute',
          top: 910,
          left: '50%',
          transform: 'translateX(-50%) rotate(-1deg)',
          backgroundColor: '#EAE3D2',
          padding: '10px 32px',
          boxShadow: '0 10px 24px rgba(0,0,0,0.8)',
          zIndex: 22,
        }}
      >
        <span
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 22,
            fontWeight: 700,
            color: '#141619',
            letterSpacing: '2px',
          }}
        >
          BAB-E-KHYBER • GATEWAY TO PESHAWAR
        </span>
      </div>

      {/* Resilience Stamp Banner */}
      <div
        style={{
          position: 'absolute',
          top: 1330,
          left: '50%',
          transform: 'translateX(-50%) rotate(1deg)',
          backgroundColor: '#C1272D',
          padding: '12px 36px',
          boxShadow: '0 12px 28px rgba(0,0,0,0.85)',
          zIndex: 22,
        }}
      >
        <span
          style={{
            fontFamily: blackOps.fontFamily,
            fontSize: 28,
            color: '#FFFFFF',
            letterSpacing: '2.5px',
          }}
        >
          MEENA BAZAAR REBUILT
        </span>
      </div>
    </div>
  );
};

/**
 * 15. PESHAWAR MEMORIAL PLINTH & CANDLES
 * Memorial pedestal honoring the 137 victims with candles, gold laurel wreath,
 * and brass commemorative plaque.
 */
export const PeshawarMemorialPlinth: React.FC = () => {
  const frame = useCurrentFrame();
  const flameWobble = Math.sin(frame * 0.3) * 3;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Memorial Pedestal & Laurel Graphic */}
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <g transform="translate(540, 1260)">
          {/* Gold Laurel Wreath */}
          <circle cx="0" cy="-50" r="240" fill="none" stroke="#F4B942" strokeWidth="4" strokeDasharray="16 10" />

          {/* Memorial Candles flanking center */}
          {[-200, -120, 120, 200].map((cx, idx) => (
            <g key={idx} transform={`translate(${cx}, 100)`}>
              <rect x="-10" y="0" width="20" height="70" fill="#EAE3D2" rx="3" />
              {/* Flame */}
              <ellipse
                cx={flameWobble * (idx % 2 === 0 ? 1 : -1)}
                cy="-16"
                rx="8"
                ry="14"
                fill="#F4B942"
              />
              <circle cx="0" cy="-14" r="4" fill="#FFFFFF" />
            </g>
          ))}
        </g>
      </svg>

      {/* Brass Memorial Plaque (anchored at top 900) */}
      <div
        style={{
          position: 'absolute',
          top: 900,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 820,
          backgroundColor: '#EAE3D2',
          border: '3px solid #D4A340',
          padding: '30px 36px',
          boxShadow: '0 20px 48px rgba(0,0,0,0.9)',
          textAlign: 'center',
          zIndex: 22,
        }}
      >
        <div
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 22,
            fontWeight: 700,
            color: '#141619',
            letterSpacing: '3px',
          }}
        >
          IN PERPETUAL MEMORY
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: blackOps.fontFamily,
            fontSize: 38,
            color: '#C1272D',
            letterSpacing: '2px',
          }}
        >
          137 MARTYRS OF MEENA BAZAAR
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: caveat.fontFamily,
            fontSize: 32,
            fontWeight: 700,
            color: '#2B3440',
          }}
        >
          "No cause can justify such inhuman violence." — United Nations
        </div>
      </div>
    </div>
  );
};

/**
 * 16. PAKISTAN FLAG MEMORIAL STAGE
 * Majestic 120-slice WavingFlagSvg with gold laurel wreath and brass memorial medallion.
 */
export const PakistanFlagMemorialStage: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* 120-Slice Traveling Wave Organic Cloth Flag Engine */}
      <WavingFlagSvg
        flagImage="plates/pakistan_flag.png"
        width={740}
        height={490}
        x={190}
        y={890}
        showPole={true}
        showRadarRings={true}
      />
    </div>
  );
};

/**
 * 17. PESHAWAR EPILOGUE PLAQUE
 * Weathered brass memorial plaque on dark parchment with wax seal.
 */
export const PeshawarEpilogueCard: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 900,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 820,
        backgroundColor: '#161B22',
        border: '3px solid #C1272D',
        padding: '36px 40px',
        boxShadow: '0 24px 52px rgba(0,0,0,0.92)',
        textAlign: 'center',
        zIndex: 25,
      }}
    >
      <div
        style={{
          fontFamily: courier.fontFamily,
          fontSize: 24,
          fontWeight: 700,
          color: '#EAE3D2',
          letterSpacing: '3px',
        }}
      >
        28 OCTOBER 2009 • PESHAWAR
      </div>
      <div
        style={{
          marginTop: 14,
          fontFamily: blackOps.fontFamily,
          fontSize: 44,
          color: '#F8F9FA',
          letterSpacing: '3px',
        }}
      >
        UNBROKEN RESOLVE
      </div>
      <div
        style={{
          marginTop: 16,
          fontFamily: caveat.fontFamily,
          fontSize: 34,
          fontWeight: 700,
          color: '#D4A340',
        }}
      >
        Honoring the courage and resilience of Khyber Pakhtunkhwa
      </div>
    </div>
  );
};
