import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { loadFont as loadBlackOpsOne } from '@remotion/google-fonts/BlackOpsOne';
import { loadFont as loadBarlowCondensed } from '@remotion/google-fonts/BarlowCondensed';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat';
import { LipizzanerHorse } from './LipizzanerHorseAsset';

const blackOps = loadBlackOpsOne('normal', { weights: ['400'], subsets: ['latin'] });
const barlow = loadBarlowCondensed('normal', { weights: ['700'], subsets: ['latin'] });
const montserrat = loadMontserrat('normal', { weights: ['800', '900'], subsets: ['latin'] });

// =========================================================================
// REUSABLE HIGH-CONTRAST ATMOSPHERIC BACKLIGHTING (Artwork Zone y: 864-1498)
// =========================================================================

const AmberHorizonGlow: React.FC<{
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  intensity?: number;
}> = ({
  cx = 540,
  cy = 1320,
  rx = 520,
  ry = 300,
  intensity = 0.85,
}) => {
  const frame = useCurrentFrame();
  const flicker = 1 + Math.sin(frame * 0.16) * 0.06 + Math.cos(frame * 0.28) * 0.04;
  return (
    <g>
      <defs>
        <radialGradient id="cowboyAmberGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#D97706" stopOpacity="0.65" />
          <stop offset="75%" stopColor="#DC2626" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1C1917" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="url(#cowboyAmberGlow)"
        opacity={intensity * flicker}
      />
    </g>
  );
};

// =========================================================================
// 1. SCENE 01: THE FINAL DAYS OF THE REICH (Split Confrontation)
// Bohemian border in late April 1945. Barbed wire, guard barrier, sentry.
// =========================================================================
export const CowboyWarCollapseOpening: React.FC = () => {
  const frame = useCurrentFrame();
  const smokeDrift = (frame * 1.2) % 180;
  const sentryBreath = Math.sin(frame * 0.1) * 3;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1300} rx={500} ry={280} intensity={0.9} />

        {/* Distant Bohemian Forest Ridge */}
        <path
          d="M 0 1340 Q 200 1280 400 1310 T 800 1270 Q 940 1290 1080 1330 L 1080 1500 L 0 1500 Z"
          fill="#1A1819"
          stroke="#2E282A"
          strokeWidth="2"
        />

        {/* Rising War Smoke Clouds */}
        <g opacity="0.45">
          <circle cx={280 + smokeDrift * 0.4} cy={1240 - smokeDrift * 0.3} r={55} fill="#2D2426" />
          <circle cx={720 - smokeDrift * 0.3} cy={1220 - smokeDrift * 0.4} r={65} fill="#241E20" />
        </g>

        {/* Border Barrier Striped Gate Bar */}
        <g transform="translate(180, 1260)">
          {/* Concrete Guard Post */}
          <rect x="0" y="40" width="80" height="180" fill="#181516" stroke="#3A3235" strokeWidth="3" />
          <polygon points="0,40 40,10 80,40" fill="#241E20" />
          {/* Angled Striped Barrier Bar */}
          <rect
            x="40"
            y="70"
            width="680"
            height="18"
            rx="4"
            transform="rotate(-12 40 70)"
            fill="#E5E7EB"
            stroke="#1F2937"
            strokeWidth="3"
          />
          {/* Red Stripes on Barrier */}
          {[120, 220, 320, 420, 520, 620].map((xOffset) => (
            <rect
              key={xOffset}
              x={xOffset}
              y="68"
              width="45"
              height="22"
              transform="rotate(-12 40 70)"
              fill="#DC2626"
            />
          ))}
        </g>

        {/* Sentry Silhouette with Rifle */}
        <g transform={`translate(${680}, ${1080 + sentryBreath})`} filter="drop-shadow(0 0 14px rgba(245, 158, 11, 0.4))">
          {/* Helmet with distinct rim */}
          <path d="M 80 50 Q 110 25 140 50 L 145 60 Q 110 55 75 60 Z" fill="#121011" stroke="#3D3538" strokeWidth="2" />
          <circle cx="110" cy="70" r="22" fill="#121011" />
          {/* Trench Coat Torso */}
          <path d="M 85 92 L 135 92 L 155 280 L 65 280 Z" fill="#121011" stroke="#3D3538" strokeWidth="2" />
          {/* Slung Mauser Rifle */}
          <line x1="75" y1="20" x2="125" y2="210" stroke="#71717A" strokeWidth="6" />
          <line x1="75" y1="20" x2="70" y2="2" stroke="#A1A1AA" strokeWidth="3" />
        </g>

        {/* Tangled Barbed Wire Running Across Foreground */}
        <path
          d="M 60 1420 Q 300 1380 540 1410 T 1020 1390"
          stroke="#475569"
          strokeWidth="3.5"
          fill="none"
        />
        {[140, 280, 420, 560, 700, 840, 960].map((bx) => (
          <g key={bx} transform={`translate(${bx}, ${1395 + (bx % 25)})`}>
            <line x1="-12" y1="-12" x2="12" y2="12" stroke="#94A3B8" strokeWidth="2.5" />
            <line x1="-12" y1="12" x2="12" y2="-12" stroke="#94A3B8" strokeWidth="2.5" />
          </g>
        ))}
      </svg>
    </div>
  );
};

// =========================================================================
// 2. SCENE 02: THE WORLD'S FINEST STALLIONS (Lone Leader)
// Authentic baroque Lipizzaner stallion rearing in classical Levade.
// Re-engineered from archival Spanish Riding School & Ludwig Koch plates:
// Muscular crested neck, convex Roman nose, tucked forelegs, flexed hocks.
// =========================================================================
export const CowboyLipizzanerStallionHero: React.FC = () => {
  const frame = useCurrentFrame();
  const trotHover = Math.sin(frame * 0.08) * 6;
  const trotTilt = Math.sin(frame * 0.08) * 1.5;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          {/* Luminous Warm Backlight for Stark White Silhouette Contrast */}
          <radialGradient id="stallionRimGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#D97706" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#B45309" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1C1917" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Backlight Behind Horse */}
        <ellipse cx="540" cy="1190" rx="460" ry="340" fill="url(#stallionRimGlow)" />

        {/* Historic Hostau Stable Stone Archway Silhouette */}
        <g opacity="0.35">
          <path
            d="M 200 1450 L 200 1060 Q 540 880 880 1060 L 880 1450"
            fill="none"
            stroke="#292524"
            strokeWidth="28"
          />
          <path
            d="M 230 1450 L 230 1080 Q 540 920 850 1080 L 850 1450"
            fill="none"
            stroke="#1C1917"
            strokeWidth="10"
          />
        </g>

        {/* =================================================================== */}
        {/* HERO LIPIZZANER STALLION — AUTHENTIC USER REFERENCE LINOCUT ART     */}
        {/* =================================================================== */}
        <g
          transform={`translate(250, ${900 - trotHover}) rotate(${trotTilt} 277 277)`}
          filter="drop-shadow(0 0 30px rgba(245, 158, 11, 0.45))"
        >
          <LipizzanerHorse
            width={580}
            height={580}
            bodyColor="#FFFFFF"
            lineColor="#0F1012"
          />
        </g>

        {/* Stable Courtyard Cobblestones */}
        <g stroke="#57534E" strokeWidth="4" opacity="0.7">
          <line x1="160" y1="1440" x2="920" y2="1440" />
          <line x1="200" y1="1460" x2="880" y2="1460" strokeDasharray="20 10" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 3. SCENE 03: THE RED ARMY SWEEPS IN (Structural Fracture)
// Soviet advance across ruins, bayonets, tank treads, broken fences.
// =========================================================================
export const CowboyRedArmyFamineAdvance: React.FC = () => {
  const frame = useCurrentFrame();
  const shake = Math.sin(frame * 0.3) * 4;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1340} rx={520} ry={260} intensity={0.95} />

        {/* Broken Paddock Fences Splintered by Treads */}
        <g transform={`translate(140, ${1300 + shake})`}>
          <line x1="0" y1="60" x2="220" y2="20" stroke="#451A03" strokeWidth="12" />
          <line x1="180" y1="20" x2="360" y2="90" stroke="#78350F" strokeWidth="10" strokeDasharray="40 10" />
          <polygon points="120,40 135,160 110,160" fill="#291206" />
          <polygon points="310,50 325,170 300,170" fill="#291206" />
        </g>

        {/* Crushed Wagon Wheel Half Buried */}
        <g transform="translate(680, 1340)">
          <circle cx="80" cy="80" r="70" fill="none" stroke="#573318" strokeWidth="12" />
          <circle cx="80" cy="80" r="18" fill="#1C1917" stroke="#78350F" strokeWidth="5" />
          <line x1="10" y1="80" x2="150" y2="80" stroke="#78350F" strokeWidth="6" />
          <line x1="80" y1="10" x2="80" y2="150" stroke="#78350F" strokeWidth="6" />
        </g>

        {/* Advancing Soviet Ranks (Ushanka Hats, Mosin-Nagant Long Rifles & Bayonets) */}
        <g transform="translate(180, 1020)">
          {[0, 160, 320, 480].map((xOff, i) => (
            <g key={xOff} transform={`translate(${xOff}, ${i % 2 === 0 ? 0 : 25})`} filter="drop-shadow(0 0 10px rgba(220, 38, 38, 0.4))">
              {/* Long Mosin Rifle with Piercing Triangular Bayonet */}
              <line x1="70" y1="-70" x2="85" y2="260" stroke="#52525B" strokeWidth="5" />
              <polygon points="68,-70 72,-70 70,-115" fill="#E4E4E7" stroke="#CBD5E1" strokeWidth="1.5" />
              {/* Soviet Ushanka Earflap Hat with Red Star */}
              <path d="M 60 45 Q 85 20 110 45 L 115 80 L 105 85 L 100 65 L 70 65 L 65 85 L 55 80 Z" fill="#18181B" stroke="#3F3F46" strokeWidth="2" />
              <polygon points="85,35 88,42 96,42 89,47 92,55 85,50 78,55 81,47 74,42 82,42" fill="#DC2626" />
              {/* Greatcoat Torso */}
              <path d="M 60 70 L 110 70 L 125 280 L 45 280 Z" fill="#18181B" stroke="#27272A" strokeWidth="2" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 4. SCENE 04: THE ROYAL HUNGARIAN SLAUGHTER (Crowd Tally)
// 100% liquidated tally counter with red warning brackets.
// =========================================================================
export const CowboyHungarianStudMassacre: React.FC = () => {
  const frame = useCurrentFrame();
  const counterVal = Math.min(100, Math.floor(interpolate(frame, [10, 46], [0, 100], { extrapolateRight: 'clamp' })));

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1280} rx={480} ry={280} intensity={0.9} />

        {/* Shattered Hungarian Royal Crest Plate */}
        <g transform="translate(420, 960)" filter="drop-shadow(0 0 16px rgba(220, 38, 38, 0.5))">
          {/* Shield Outline with jagged crack */}
          <path
            d="M 20 20 L 220 20 L 220 140 Q 220 220 120 260 Q 20 220 20 140 Z"
            fill="#1C1917"
            stroke="#DC2626"
            strokeWidth="5"
          />
          {/* Central Jagged Lightning Crack */}
          <path d="M 120 20 L 135 90 L 105 150 L 125 210 L 120 260" stroke="#EF4444" strokeWidth="6" fill="none" />
          {/* Crown on top */}
          <polygon points="40,20 60,-20 90,5 120,-25 150,5 180,-20 200,20" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
        </g>

        {/* High-Impact Tally Box (y: 1220 to 1420) */}
        <g transform="translate(190, 1220)">
          <rect x="0" y="0" width="700" height="210" rx="16" fill="#0F1012" stroke="#DC2626" strokeWidth="4" />
          {/* Warning Hazard Diagonal Stripes on Edge */}
          <rect x="12" y="12" width="676" height="18" fill="#B91C1C" opacity="0.3" />

          {/* Big Rolling Integer Display */}
          <text
            x="350"
            y="130"
            fontFamily={blackOps.fontFamily}
            fontSize="102"
            fill="#EF4444"
            textAnchor="middle"
            letterSpacing="4"
          >
            {counterVal}%
          </text>
          <text
            x="350"
            y="180"
            fontFamily={montserrat.fontFamily}
            fontSize="26"
            fontWeight="900"
            fill="#E5E7EB"
            textAnchor="middle"
            letterSpacing="6"
          >
            HUNGARIAN HERD BUTCHERED
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 5. SCENE 05: THE DEFIANT GERMAN VETERINARIANS (Lone Leader)
// Lt. Col. Hubert Rudofsky & Lt. Col. Walter Holters plotting in Hostau.
// =========================================================================
export const CowboyWehrmachtVetsPact: React.FC = () => {
  const frame = useCurrentFrame();
  const lanternFlicker = 1 + Math.sin(frame * 0.25) * 0.08;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1280} rx={450} ry={280} intensity={lanternFlicker * 0.85} />

        {/* Headquarter Desk Table Surface */}
        <rect x="140" y="1320" width="800" height="150" fill="#1C1917" stroke="#44403C" strokeWidth="4" />

        {/* Folded Map & Secret Treaty Dispatch */}
        <g transform="translate(380, 1300)">
          <polygon points="0,0 240,-15 260,70 10,85" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
          <line x1="30" y1="20" x2="160" y2="12" stroke="#EF4444" strokeWidth="4" />
          <line x1="35" y1="45" x2="200" y2="35" stroke="#334155" strokeWidth="3" />
          <circle cx="190" cy="55" r="14" fill="#DC2626" />
        </g>

        {/* Veterinarian Medical Kit Satchel */}
        <g transform="translate(680, 1260)">
          <rect x="0" y="30" width="140" height="90" rx="8" fill="#292524" stroke="#78716C" strokeWidth="3" />
          <rect x="45" y="15" width="50" height="20" fill="none" stroke="#78716C" strokeWidth="4" rx="4" />
          <rect x="58" y="50" width="24" height="50" fill="#DC2626" />
          <rect x="45" y="63" width="50" height="24" fill="#DC2626" />
        </g>

        {/* LEFT: Lt. Col. Hubert Rudofsky (Veterinarian Officer Silhouette) */}
        <g transform="translate(220, 1020)" filter="drop-shadow(0 0 12px rgba(245, 158, 11, 0.4))">
          {/* Officer Peaked Visor Cap */}
          <path d="M 50 40 Q 80 20 120 35 L 140 50 L 50 50 Z" fill="#121011" stroke="#44403C" strokeWidth="2" />
          <path d="M 110 48 L 145 54 L 120 62 Z" fill="#292524" />
          <circle cx="85" cy="65" r="24" fill="#121011" />
          {/* Uniform Torso with Collar Tress */}
          <path d="M 55 90 L 120 90 L 140 280 L 40 280 Z" fill="#121011" stroke="#44403C" strokeWidth="2" />
          <polygon points="70,90 85,115 70,115" fill="#E5E7EB" />
          <polygon points="105,90 90,115 105,115" fill="#E5E7EB" />
        </g>

        {/* RIGHT: Lt. Col. Walter Holters (Luftwaffe Officer Leaning In) */}
        <g transform="translate(520, 1030)" filter="drop-shadow(0 0 12px rgba(245, 158, 11, 0.4))">
          {/* Officer Cap with high crown */}
          <path d="M 60 30 Q 100 10 135 30 L 150 48 L 60 48 Z" fill="#0F172A" stroke="#334155" strokeWidth="2" />
          <circle cx="95" cy="65" r="24" fill="#0F172A" />
          {/* Tilted Torso studying map */}
          <path d="M 50 90 L 125 90 L 150 280 L 30 280 Z" fill="#0F172A" stroke="#334155" strokeWidth="2" />
          {/* Iron Cross Ribbon at Second Button */}
          <line x1="88" y1="130" x2="98" y2="142" stroke="#EF4444" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 6. SCENE 06: SECRET RADIO SIGNAL TO PATTON (Vector Map)
// Radio transmission crossing Bavarian border into 2nd Cavalry lines.
// =========================================================================
export const CowboyRadioCallToPatton: React.FC = () => {
  const frame = useCurrentFrame();
  const waveRadius = (frame * 5) % 320;
  const pulseOpacity = interpolate(waveRadius, [0, 320], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1280} rx={480} ry={280} intensity={0.8} />

        {/* Tactical Map Grid Lines */}
        <g stroke="#334155" strokeWidth="1" strokeDasharray="6 6" opacity="0.4">
          <line x1="100" y1="960" x2="980" y2="960" />
          <line x1="100" y1="1120" x2="980" y2="1120" />
          <line x1="100" y1="1280" x2="980" y2="1280" />
          <line x1="100" y1="1440" x2="980" y2="1440" />
          <line x1="320" y1="880" x2="320" y2="1480" />
          <line x1="540" y1="880" x2="540" y2="1480" />
          <line x1="760" y1="880" x2="760" y2="1480" />
        </g>

        {/* Jagged International Border Line (Bavaria // Bohemia) */}
        <path
          d="M 520 880 L 535 980 L 510 1080 L 550 1190 L 525 1310 L 560 1480"
          stroke="#EF4444"
          strokeWidth="4"
          strokeDasharray="14 8"
          fill="none"
        />

        {/* EAST NODE: Hostau Stud Farm Transmitter (x: 760, y: 1140) */}
        <g transform="translate(760, 1140)">
          <circle cx="0" cy="0" r="16" fill="#EF4444" />
          <circle cx="0" cy="0" r="28" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
          {/* Radiating Radio Transmission Waves */}
          <circle cx="0" cy="0" r={waveRadius} fill="none" stroke="#F59E0B" strokeWidth="3" opacity={pulseOpacity} />
          <circle cx="0" cy="0" r={(waveRadius + 120) % 320} fill="none" stroke="#F59E0B" strokeWidth="2" opacity={pulseOpacity} />
          <text x="35" y="6" fontFamily={montserrat.fontFamily} fontSize="20" fontWeight="900" fill="#FDE047">
            HOSTAU (SOS)
          </text>
        </g>

        {/* WEST NODE: US 2nd Cavalry HQ (x: 280, y: 1220) */}
        <g transform="translate(280, 1220)">
          <polygon points="0,-22 22,14 -22,14" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="0" cy="0" r="32" fill="none" stroke="#60A5FA" strokeWidth="2" />
          <text x="-40" y="45" fontFamily={montserrat.fontFamily} fontSize="20" fontWeight="900" fill="#93C5FD">
            2ND CAVALRY HQ
          </text>
        </g>

        {/* Vector Arrow Directing Intercept Path */}
        <path
          d="M 720 1150 Q 520 1110 330 1205"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="4"
          strokeDasharray="12 6"
        />
      </svg>
    </div>
  );
};

// =========================================================================
// 7. SCENE 07: PATTON GIVES THE GREEN LIGHT (Lone Leader)
// General George S. Patton Jr. 4-star lacquered helmet, ivory revolvers, crop.
// =========================================================================
export const CowboyPattonCommandGreenlight: React.FC = () => {
  const frame = useCurrentFrame();
  const starGleam = (Math.sin(frame * 0.2) + 1) * 0.5;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1260} rx={450} ry={300} intensity={0.9} />

        {/* Third Army Shoulder Sleeve Insignia in Background */}
        <g transform="translate(440, 940)" opacity="0.45">
          <circle cx="100" cy="100" r="90" fill="#1E3A8A" stroke="#DC2626" strokeWidth="8" />
          <polygon points="100,25 155,160 45,160" fill="none" stroke="#FFFFFF" strokeWidth="12" />
          <text x="100" y="145" fontFamily={montserrat.fontFamily} fontSize="70" fontWeight="900" fill="#FFFFFF" textAnchor="middle">
            A
          </text>
        </g>

        {/* Patton Profile Silhouette */}
        <g transform="translate(360, 980)" filter="drop-shadow(0 0 18px rgba(245, 158, 11, 0.4))">
          {/* Lacquered Glossy Helmet with 4 Chrome Stars */}
          <path d="M 60 50 Q 110 15 170 45 L 185 70 L 60 70 Z" fill="#111827" stroke="#374151" strokeWidth="2.5" />
          {/* Four Golden Stars on Front of Helmet */}
          <g transform="translate(100, 52)">
            {[-36, -12, 12, 36].map((sx) => (
              <polygon
                key={sx}
                points={`${sx},0 ${sx + 3},7 ${sx + 10},7 ${sx + 4},11 ${sx + 6},18 ${sx},14 ${sx - 6},18 ${sx - 4},11 ${sx - 10},7 ${sx - 3},7`}
                fill="#FBBF24"
                stroke="#D97706"
                strokeWidth="1"
                opacity={0.8 + starGleam * 0.2}
              />
            ))}
          </g>

          {/* Determined Jawline & Head */}
          <path d="M 90 70 L 155 70 L 150 115 L 125 125 L 90 120 Z" fill="#111827" />

          {/* Ike Jacket with Lapels */}
          <path d="M 60 125 L 165 125 L 210 380 L 20 380 Z" fill="#111827" stroke="#374151" strokeWidth="2.5" />

          {/* Dual Ivory-Handled Revolver Holster on Hip */}
          <g transform="translate(160, 240)">
            <rect x="0" y="0" width="35" height="120" rx="6" fill="#78350F" stroke="#451A03" strokeWidth="2" />
            {/* Pristine Ivory Grip */}
            <polygon points="-8,-12 18,-18 24,18 -2,12" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
          </g>

          {/* Riding Crop Held in Hand */}
          <line x1="80" y1="260" x2="160" y2="400" stroke="#000000" strokeWidth="7" />
          <polygon points="155,395 175,420 160,425" fill="#78350F" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 8. SCENE 08: 20 MILES BEHIND GERMAN LINES (Vector Map)
// Topographic contours, red danger corridor, 11th Panzer division flank.
// =========================================================================
export const CowboyTwentyMilesBehindLines: React.FC = () => {
  const frame = useCurrentFrame();
  const alertFlash = Math.sin(frame * 0.2) > 0 ? 1 : 0.4;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1280} rx={480} ry={280} intensity={0.8} />

        {/* Topographic Elevation Contour Lines */}
        <g fill="none" stroke="#334155" strokeWidth="1.5" opacity="0.35">
          <ellipse cx="540" cy="1200" rx="420" ry="240" />
          <ellipse cx="560" cy="1210" rx="340" ry="190" />
          <ellipse cx="580" cy="1220" rx="260" ry="140" />
          <ellipse cx="600" cy="1230" rx="180" ry="90" />
        </g>

        {/* Penetration Route (20 Miles Deep Behind Lines) */}
        <path
          d="M 220 1380 Q 420 1320 540 1200 T 840 1060"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="6"
        />
        {/* Animated Dash Head on Route */}
        <path
          d="M 220 1380 Q 420 1320 540 1200 T 840 1060"
          fill="none"
          stroke="#FEF08A"
          strokeWidth="3"
          strokeDasharray="24 12"
        />

        {/* Flanking Axis Danger Zones: 11TH PANZER DIVISION */}
        <g transform="translate(680, 1280)" opacity={alertFlash}>
          <polygon points="0,-25 28,25 -28,25" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
          <text x="0" y="12" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="900" fill="#FFFFFF" textAnchor="middle">
            !
          </text>
          <text x="-15" y="48" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="900" fill="#F87171">
            11TH PANZER
          </text>
        </g>

        {/* Start Point Badge: KÖTZTING // US LINES */}
        <g transform="translate(160, 1370)">
          <circle cx="0" cy="0" r="14" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
          <text x="-10" y="32" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="900" fill="#93C5FD">
            US BORDER (0 MILES)
          </text>
        </g>

        {/* Destination Target: HOSTAU */}
        <g transform="translate(840, 1060)">
          <circle cx="0" cy="0" r="18" fill="#EF4444" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="0" cy="0" r="32" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="6 4" />
          <text x="-40" y="-30" fontFamily={montserrat.fontFamily} fontSize="22" fontWeight="900" fill="#FCA5A5">
            HOSTAU (+20 MI)
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 9. SCENE 09: THE GHOSTS OF PATTON CHARGE (Vehicle in Transit)
// M8 Greyhound 6x6 light armored car and M24 Chaffee light tank.
// =========================================================================
export const CowboyPattonsGhostsCharge: React.FC = () => {
  const frame = useCurrentFrame();
  const wheelSpin = (frame * 12) % 360;
  const rumble = Math.sin(frame * 0.4) * 3;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1300} rx={500} ry={260} intensity={0.9} />

        {/* Dirt & Dust Plume Behind Armored Car */}
        <g opacity="0.5">
          <ellipse cx="260" cy="1390" rx="140" ry="40" fill="#78350F" />
          <ellipse cx="220" cy="1370" rx="90" ry="30" fill="#A16207" />
        </g>

        {/* M8 Greyhound 6x6 Armored Car Silhouette */}
        <g transform={`translate(320, ${1100 + rumble})`} filter="drop-shadow(0 0 16px rgba(245, 158, 11, 0.4))">
          {/* Main Hull Armor Chamfers */}
          <polygon
            points="0,170 60,110 380,110 440,150 480,200 450,220 0,220"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="3"
          />

          {/* Open-Topped Cast Turret */}
          <polygon points="180,110 210,60 310,60 340,110" fill="#0F172A" stroke="#334155" strokeWidth="2.5" />
          {/* 37mm M6 Main Gun & Coaxial .30 Browning */}
          <line x1="320" y1="80" x2="490" y2="75" stroke="#64748B" strokeWidth="8" />
          {/* Commander Silhouette in Turret */}
          <circle cx="250" cy="45" r="18" fill="#0F172A" />
          <path d="M 235 60 L 265 60 L 275 110 L 225 110 Z" fill="#0F172A" />

          {/* Prominent Allied White Star Emblem on Flank */}
          <g transform="translate(250, 160)">
            <circle cx="0" cy="0" r="32" fill="none" stroke="#FFFFFF" strokeWidth="3" />
            <polygon
              points="0,-24 7,-7 24,-7 10,4 15,22 0,11 -15,22 -10,4 -24,-7 -7,-7"
              fill="#FFFFFF"
            />
          </g>

          {/* Six Combat Wheels with Deep Tread Spoke Rims */}
          {[80, 200, 380].map((wx) => (
            <g key={wx} transform={`translate(${wx}, 230)`}>
              <circle cx="0" cy="0" r="45" fill="#090D12" stroke="#475569" strokeWidth="6" />
              <circle cx="0" cy="0" r="18" fill="#1E293B" />
              {/* Spinning Spokes */}
              <g transform={`rotate(${wheelSpin} 0 0)`}>
                <line x1="-35" y1="0" x2="35" y2="0" stroke="#64748B" strokeWidth="4" />
                <line x1="0" y1="-35" x2="0" y2="35" stroke="#64748B" strokeWidth="4" />
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 10. SCENE 10: HOSTAU GATES REACHED (Structural Fracture)
// Hostau stone gateway, timber barn doors swung open,
// authentic Lipizzaner broodmare and foal looking out into courtyard.
// =========================================================================
export const CowboyHostauGatesReached: React.FC = () => {
  const frame = useCurrentFrame();
  const doorSwing = interpolate(frame, [0, 45], [0, 40], { extrapolateRight: 'clamp' });
  const nuzzle = Math.sin(frame * 0.1) * 4;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1240} rx={460} ry={320} intensity={0.9} />

        {/* Heavy Bohemian Stone Archway Portal */}
        <g transform="translate(180, 920)">
          {/* Left Stone Pier */}
          <rect x="0" y="80" width="160" height="480" fill="#1C1917" stroke="#44403C" strokeWidth="4" />
          {/* Right Stone Pier */}
          <rect x="560" y="80" width="160" height="480" fill="#1C1917" stroke="#44403C" strokeWidth="4" />
          {/* Arched Stone Header Beam */}
          <path
            d="M 0 120 Q 360 -20 720 120 L 720 80 Q 360 -60 0 80 Z"
            fill="#292524"
            stroke="#44403C"
            strokeWidth="4"
          />

          {/* Left Heavy Timber Door Swung Open */}
          <polygon
            points={`160,110 ${160 + doorSwing},110 ${160 + doorSwing * 0.8},540 160,540`}
            fill="#3E2723"
            stroke="#1C1917"
            strokeWidth="3"
          />
          {/* Right Heavy Timber Door Swung Open */}
          <polygon
            points={`560,110 ${560 - doorSwing},110 ${560 - doorSwing * 0.8},540 560,540`}
            fill="#3E2723"
            stroke="#1C1917"
            strokeWidth="3"
          />

          {/* Inside Stable Box: Authentic Lipizzaner Framed Behind Heavy Gates */}
          <g
            transform={`translate(160, ${110 + nuzzle})`}
            filter="drop-shadow(0 0 20px rgba(255, 255, 255, 0.45))"
          >
            <LipizzanerHorse
              width={400}
              height={400}
              bodyColor="#FFFFFF"
              lineColor="#1C1917"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 11. SCENE 11: LIBERATING THE ALLIED POWS (Crowd Tally)
// Freed British, French, Serbian POWs handed leather reins and bridles.
// =========================================================================
export const CowboyAlliedPowsLiberation: React.FC = () => {
  const frame = useCurrentFrame();
  const wireCut = Math.min(25, frame * 0.8);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1280} rx={480} ry={280} intensity={0.9} />

        {/* Severed Barbed Wire Fence Post */}
        <g transform="translate(180, 1080)">
          <line x1="0" y1="0" x2="0" y2="380" stroke="#44403C" strokeWidth="12" />
          {/* Snipped Wire Snapping Apart */}
          <path d={`M 0 120 Q 80 ${120 - wireCut} 160 ${100 - wireCut * 2}`} stroke="#94A3B8" strokeWidth="4" fill="none" />
          <path d={`M 0 240 Q 80 ${240 + wireCut} 160 ${260 + wireCut * 2}`} stroke="#94A3B8" strokeWidth="4" fill="none" />
        </g>

        {/* Freed Allied Soldiers Holding Bridles and Halters */}
        <g transform="translate(320, 1020)">
          {/* British Soldier (Brodie Helmet Silhouette) */}
          <g transform="translate(40, 20)" filter="drop-shadow(0 0 12px rgba(245, 158, 11, 0.4))">
            {/* Distinctive Flat-Brimmed Brodie Helmet */}
            <path d="M 20 45 Q 60 20 100 45 L 115 50 L 5 50 Z" fill="#1C1917" stroke="#44403C" strokeWidth="2" />
            <circle cx="60" cy="65" r="20" fill="#1C1917" />
            <path d="M 35 85 L 85 85 L 100 280 L 20 280 Z" fill="#1C1917" stroke="#44403C" strokeWidth="2" />
            {/* Leather Horse Bridle in Hand */}
            <ellipse cx="90" cy="160" rx="18" ry="35" fill="none" stroke="#78350F" strokeWidth="4" />
          </g>

          {/* French POW (Adrian Helmet Silhouette with Comb) */}
          <g transform="translate(200, 35)" filter="drop-shadow(0 0 12px rgba(245, 158, 11, 0.4))">
            <path d="M 30 45 Q 65 25 100 45 L 105 52 L 25 52 Z" fill="#1E293B" stroke="#334155" strokeWidth="2" />
            <line x1="65" y1="20" x2="65" y2="40" stroke="#334155" strokeWidth="4" />
            <circle cx="65" cy="65" r="20" fill="#1E293B" />
            <path d="M 40 85 L 90 85 L 105 280 L 25 280 Z" fill="#1E293B" stroke="#334155" strokeWidth="2" />
          </g>

          {/* Polish / Serbian Soldier with Reins */}
          <g transform="translate(360, 15)" filter="drop-shadow(0 0 12px rgba(245, 158, 11, 0.4))">
            <circle cx="60" cy="65" r="20" fill="#1C1917" />
            <path d="M 35 85 L 85 85 L 100 280 L 20 280 Z" fill="#1C1917" stroke="#44403C" strokeWidth="2" />
            {/* Long Leather Lead Rope */}
            <path d="M 90 140 Q 140 180 180 150" stroke="#92400E" strokeWidth="5" fill="none" />
          </g>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 12. SCENE 12: ARMING THE GERMAN ENEMY (Split Confrontation)
// American GI handing an M1 Garand rifle to a German Wehrmacht soldier.
// =========================================================================
export const CowboyArmingWehrmachtBrothers: React.FC = () => {
  const frame = useCurrentFrame();
  const handoverProgress = interpolate(frame, [0, 36], [0, 20], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1280} rx={480} ry={280} intensity={0.9} />

        {/* Sandbag Berm & Wooden Ammo Crate in Center */}
        <g transform="translate(420, 1300)">
          <rect x="0" y="30" width="240" height="130" fill="#451A03" stroke="#291206" strokeWidth="4" />
          <text x="120" y="90" fontFamily={blackOps.fontFamily} fontSize="20" fill="#FEF08A" textAnchor="middle">
            .30 CAL // M1
          </text>
        </g>

        {/* LEFT: American GI (M1 Pot Helmet, M43 Jacket) */}
        <g transform="translate(200, 1020)" filter="drop-shadow(0 0 14px rgba(59, 130, 246, 0.4))">
          {/* M1 Helmet with Netting */}
          <path d="M 40 45 Q 85 20 130 45 L 135 60 L 35 60 Z" fill="#1E293B" stroke="#475569" strokeWidth="2.5" />
          <circle cx="85" cy="75" r="22" fill="#1E293B" />
          {/* Torso Reaching Forward with Arms */}
          <path d="M 60 98 L 115 98 L 135 300 L 45 300 Z" fill="#1E293B" stroke="#334155" strokeWidth="2" />
        </g>

        {/* RIGHT: German Wehrmacht Soldier (Stahlhelm Silhouette) */}
        <g transform="translate(640, 1020)" filter="drop-shadow(0 0 14px rgba(220, 38, 38, 0.4))">
          {/* Characteristic Flared Neck Stahlhelm */}
          <path d="M 45 50 Q 85 20 125 45 L 145 65 L 130 75 L 35 75 L 25 65 Z" fill="#111827" stroke="#374151" strokeWidth="2.5" />
          <circle cx="85" cy="80" r="22" fill="#111827" />
          {/* Uniform Torso */}
          <path d="M 55 102 L 115 102 L 130 300 L 40 300 Z" fill="#111827" stroke="#374151" strokeWidth="2" />
        </g>

        {/* M1 Garand Rifle Being Handed Across the Gap */}
        <g transform={`translate(${350 + handoverProgress}, 1210)`}>
          {/* Rifle Stock & Barrel */}
          <polygon points="0,15 70,10 320,12 320,5 340,5 340,12 30,28" fill="#78350F" stroke="#451A03" strokeWidth="2" />
          <line x1="120" y1="12" x2="350" y2="12" stroke="#475569" strokeWidth="5" />
          {/* Clasped Hands on the Gun */}
          <circle cx="150" cy="15" r="14" fill="#94A3B8" />
          <circle cx="230" cy="15" r="14" fill="#64748B" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 13. SCENE 13: PRINCE AMASSOV'S COSSACKS ARRIVE (Vehicle in Transit)
// Russian anticommunist Cossacks in fur papakha hats galloping with shashkas.
// =========================================================================
export const CowboyCossackCavalryPrinceAmassov: React.FC = () => {
  const frame = useCurrentFrame();
  const horseGallop = Math.sin(frame * 0.3) * 10;
  const capeFlow = Math.cos(frame * 0.25) * 14;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1280} rx={480} ry={280} intensity={0.9} />

        {/* Galloping Warhorse Silhouette */}
        <g transform={`translate(280, ${1080 - horseGallop})`} filter="drop-shadow(0 0 18px rgba(245, 158, 11, 0.45))">
          {/* Dark Charger Horse Torso */}
          <path
            d="M 60 260 C 50 180 120 110 200 100 C 270 90 310 120 340 180 C 360 220 320 280 240 290 Z"
            fill="#090D12"
            stroke="#27272A"
            strokeWidth="3"
          />
          {/* Galloping Forelegs Extended */}
          <path d="M 300 170 Q 380 210 440 220 L 435 240 Q 360 220 280 200 Z" fill="#090D12" />
          {/* Galloping Hind Legs Tucked Back */}
          <path d="M 90 240 Q 20 300 -40 330 L -35 350 Q 40 310 110 270 Z" fill="#090D12" />

          {/* COSSACK RIDER: Prince Amassov */}
          <g transform="translate(140, -40)">
            {/* Traditional Tall Astrakhan Fur Papakha Hat */}
            <rect x="50" y="30" width="45" height="55" rx="8" fill="#18181B" stroke="#52525B" strokeWidth="2.5" />
            <circle cx="72" cy="100" r="18" fill="#090D12" />

            {/* Flowing Cherkeska Cape Billowing in Wind */}
            <path
              d={`M 55 115 L 90 115 L ${10 + capeFlow} 220 L ${-40 + capeFlow} 190 Z`}
              fill="#7F1D1D"
              stroke="#991B1B"
              strokeWidth="2.5"
            />

            {/* Gleaming Curved Shashka Saber Raised to the Sky */}
            <g transform="translate(85, 80)">
              <line x1="0" y1="0" x2="35" y2="-75" stroke="#E2E8F0" strokeWidth="5" />
              <path d="M 35 -75 Q 50 -105 85 -125" stroke="#F8FAFC" strokeWidth="4.5" fill="none" />
              <circle cx="0" cy="0" r="7" fill="#F59E0B" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 14. SCENE 14: WAFFEN-SS AMBUSH (Structural Fracture)
// Waffen-SS mortar detonations, exploding barn roofs, pine treeline.
// =========================================================================
export const CowboyWaffenSsAmbush: React.FC = () => {
  const frame = useCurrentFrame();
  const blastScale = interpolate(frame % 45, [0, 8, 35], [0.2, 1.4, 0], { extrapolateRight: 'clamp' });
  const flashOpacity = interpolate(frame % 45, [0, 6, 25], [1, 0.8, 0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1280} rx={480} ry={280} intensity={0.9} />

        {/* Barn Roof Splintering Under Mortar Blast */}
        <g transform="translate(180, 1140)">
          {/* Timber Barn Facade */}
          <rect x="60" y="80" width="600" height="240" fill="#1C1917" stroke="#44403C" strokeWidth="4" />
          {/* Peaked Gable Roof Smashed */}
          <polygon points="40,80 360,-40 680,80" fill="#292524" stroke="#44403C" strokeWidth="3" />

          {/* Splintered Timber Planks Flying */}
          <g transform={`translate(360, 40) scale(${blastScale})`} opacity={flashOpacity}>
            {/* Fiery Explosive Core */}
            <circle cx="0" cy="0" r="90" fill="#F59E0B" opacity="0.9" />
            <circle cx="0" cy="0" r="140" fill="#DC2626" opacity="0.6" />
            {/* Flying Wooden Shards */}
            <polygon points="-80,-40 -60,-120 -40,-50" fill="#78350F" />
            <polygon points="60,-30 110,-100 80,-20" fill="#78350F" />
            <polygon points="-20,-80 0,-160 20,-70" fill="#451A03" />
          </g>
        </g>

        {/* SS Soldiers Firing from the Pine Treeline */}
        <g transform="translate(740, 1080)">
          {/* Dense Pine Silhouettes */}
          <polygon points="80,0 40,80 120,80" fill="#0F172A" />
          <polygon points="80,60 30,140 130,140" fill="#0F172A" />
          <polygon points="80,120 20,220 140,220" fill="#0F172A" />
          {/* SS Helmet with Camo Cover & Firing Stance */}
          <circle cx="40" cy="180" r="16" fill="#18181B" />
          <line x1="45" y1="185" x2="-35" y2="180" stroke="#71717A" strokeWidth="4" />
          {/* Muzzle Flash */}
          <polygon points="-35,180 -55,170 -45,180 -55,190" fill="#FEF08A" opacity={flashOpacity} />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 15. SCENE 15: SIDE-BY-SIDE IN THE TRENCH (Split Confrontation)
// American Browning .30 cal & German MG42 firing together against SS.
// =========================================================================
export const CowboySideBySideDefense: React.FC = () => {
  const frame = useCurrentFrame();
  const gunCycle = (frame * 18) % 360;
  const muzzleFlash = frame % 3 === 0 ? 1 : 0.2;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1280} rx={480} ry={280} intensity={0.9} />

        {/* Reinforced Sandbag Bunker Parapet */}
        <g transform="translate(140, 1320)">
          {[0, 160, 320, 480, 640].map((bx) => (
            <ellipse key={bx} cx={bx + 80} cy="40" rx="90" ry="32" fill="#292524" stroke="#44403C" strokeWidth="3" />
          ))}
          {[80, 240, 400, 560].map((bx) => (
            <ellipse key={bx} cx={bx + 80} cy="90" rx="90" ry="32" fill="#1C1917" stroke="#44403C" strokeWidth="3" />
          ))}
        </g>

        {/* LEFT: American Gunner with Browning M1919A4 .30 Cal */}
        <g transform="translate(200, 1080)" filter="drop-shadow(0 0 14px rgba(59, 130, 246, 0.4))">
          {/* M1 Helmet */}
          <path d="M 40 40 Q 80 18 120 40 L 125 55 L 35 55 Z" fill="#1E293B" stroke="#475569" strokeWidth="2" />
          <circle cx="80" cy="70" r="20" fill="#1E293B" />
          <path d="M 50 90 L 110 90 L 125 240 L 35 240 Z" fill="#1E293B" />

          {/* Browning M1919 Perforated Barrel Shroud */}
          <g transform="translate(100, 170)">
            <rect x="0" y="0" width="160" height="18" fill="#334155" stroke="#0F172A" strokeWidth="2" />
            {/* Tripod Stand */}
            <line x1="80" y1="18" x2="40" y2="80" stroke="#0F172A" strokeWidth="4" />
            <line x1="80" y1="18" x2="120" y2="80" stroke="#0F172A" strokeWidth="4" />
            {/* Star Muzzle Flash */}
            <g transform="translate(160, 9)" opacity={muzzleFlash}>
              <polygon points="0,0 25,-12 15,0 35,0 15,4 25,12 0,0" fill="#FEF08A" />
            </g>
          </g>
        </g>

        {/* RIGHT: German Gunner with MG42 "Hitler's Buzzsaw" */}
        <g transform="translate(580, 1080)" filter="drop-shadow(0 0 14px rgba(220, 38, 38, 0.4))">
          {/* Stahlhelm Silhouette */}
          <path d="M 45 45 Q 85 20 125 45 L 140 60 L 35 60 Z" fill="#111827" stroke="#374151" strokeWidth="2" />
          <circle cx="85" cy="75" r="20" fill="#111827" />
          <path d="M 55 95 L 115 95 L 130 240 L 40 240 Z" fill="#111827" />

          {/* MG42 Squared Barrel & Drum Magazine */}
          <g transform="translate(100, 170)">
            <rect x="0" y="0" width="180" height="16" fill="#1E293B" stroke="#090D12" strokeWidth="2" />
            <circle cx="40" cy="18" r="16" fill="#18181B" stroke="#374151" strokeWidth="2" />
            {/* High-Cadence Muzzle Flash */}
            <g transform="translate(180, 8)" opacity={muzzleFlash}>
              <polygon points="0,0 30,-15 18,0 40,0 18,5 30,15 0,0" fill="#F59E0B" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 16. SCENE 16: THE SS RETREATS (Structural Fracture)
// Smoking ruins, retreating SS silhouettes, defensive perimeter held.
// =========================================================================
export const CowboySsRetreatHeavyLosses: React.FC = () => {
  const frame = useCurrentFrame();
  const smokePuff = (frame * 0.8) % 120;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1280} rx={480} ry={280} intensity={0.75} />

        {/* Smoldering Crater in Foreground */}
        <g transform="translate(240, 1340)">
          <ellipse cx="280" cy="60" rx="240" ry="45" fill="#18181B" stroke="#27272A" strokeWidth="4" />
          {/* Abandoned Stahlhelm in the mud */}
          <path d="M 180 50 Q 205 30 230 45 L 240 58 L 175 58 Z" fill="#27272A" stroke="#52525B" strokeWidth="1.5" />
          {/* Spent Brass Shell Casings Scattered */}
          {[120, 160, 280, 340, 420].map((cx) => (
            <rect key={cx} x={cx} y="55" width="12" height="4" fill="#FBBF24" transform="rotate(18)" />
          ))}
        </g>

        {/* Retreating SS Shadows Fleeing Into the Foggy Pines */}
        <g transform="translate(720, 1160)" opacity="0.6">
          {[0, 90, 170].map((rx, idx) => (
            <g key={rx} transform={`translate(${rx + idx * 8}, ${idx * 15})`}>
              <circle cx="30" cy="30" r="14" fill="#090D12" />
              <path d="M 18 45 L 42 45 L 50 160 L 10 160 Z" fill="#090D12" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 17. SCENE 17: CAPTAIN STEWART'S COMMAND (Lone Leader)
// Captain Stewart firing amber flare, arm extended, ordering evacuation.
// =========================================================================
export const CowboyCaptStewartEvacuationOrder: React.FC = () => {
  const frame = useCurrentFrame();
  const flareRise = interpolate(frame, [0, 40], [0, 140], { extrapolateRight: 'clamp' });
  const flareGlow = 1 + Math.sin(frame * 0.3) * 0.2;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1260} rx={450} ry={300} intensity={0.9} />

        {/* Signal Flare Projectile Soaring Skyward */}
        <g transform={`translate(620, ${1100 - flareRise})`}>
          <circle cx="0" cy="0" r="16" fill="#FDE047" filter="drop-shadow(0 0 20px #EF4444)" />
          <circle cx="0" cy="0" r="38" fill="none" stroke="#F59E0B" strokeWidth="4" opacity={flareGlow} />
          {/* Flare Smoke Trail */}
          <line x1="0" y1="16" x2="0" y2="140" stroke="#F97316" strokeWidth="6" opacity="0.5" strokeDasharray="10 6" />
        </g>

        {/* Captain Thomas M. Stewart Silhouette */}
        <g transform="translate(360, 980)" filter="drop-shadow(0 0 16px rgba(245, 158, 11, 0.4))">
          {/* Officer Helmet with Captain's Double Silver Bars */}
          <path d="M 60 50 Q 110 20 160 50 L 165 65 L 55 65 Z" fill="#1E293B" stroke="#475569" strokeWidth="2.5" />
          {/* Captain Double Silver Bars */}
          <rect x="100" y="32" width="6" height="16" fill="#E2E8F0" />
          <rect x="110" y="32" width="6" height="16" fill="#E2E8F0" />
          <circle cx="110" cy="75" r="22" fill="#1E293B" />

          {/* Torso with Arm Raised Firing Flare Pistol */}
          <path d="M 75 100 L 140 100 L 160 340 L 50 340 Z" fill="#1E293B" stroke="#334155" strokeWidth="2" />
          {/* Raised Arm Holding Flare Pistol */}
          <line x1="130" y1="120" x2="230" y2="40" stroke="#1E293B" strokeWidth="18" strokeLinecap="round" />
          <rect x="220" y="25" width="28" height="14" fill="#334155" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 18. SCENE 18: THE GREAT STAMPEDE TO FREEDOM (Vehicle in Transit)
// Herd of pure-white Lipizzaners galloping in mass extension across Bohemia.
// Anatomically accurate galloping equine silhouettes with streaming manes,
// extended reaching forelegs, driving hocks, and horizontal windblown tails.
// =========================================================================
export const CowboyMassLipizzanerStampede: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1280} rx={500} ry={280} intensity={1.0} />

        {/* Rolling Churned Dust Storm in Background */}
        <g opacity="0.45">
          <ellipse cx="380" cy="1360" rx="340" ry="70" fill="#78350F" />
          <ellipse cx="680" cy="1350" rx="360" ry="65" fill="#92400E" />
        </g>

        {/* --- Multiplane Galloping Lipizzaner Herd with 4-Pose Gallop Cycle --- */}
        <g transform="translate(0, 0)">
          {/* 1. BACKGROUND HORSE (Leading in distance, Staggered Stride) */}
          <g
            transform="translate(480, 930)"
            opacity={0.72}
            filter="drop-shadow(0 0 14px rgba(254, 240, 138, 0.3))"
          >
            <LipizzanerHorse
              width={480}
              height={390}
              bodyColor="#CBD5E1"
              lineColor="#1E293B"
              flipX={true}
              animated={true}
              strideDurationFrames={20}
              frameOffset={14}
            />
          </g>

          {/* 2. MIDGROUND HORSE (Flanking Left, Staggered Stride) */}
          <g
            transform="translate(40, 960)"
            opacity={0.88}
            filter="drop-shadow(0 0 18px rgba(254, 240, 138, 0.35))"
          >
            <LipizzanerHorse
              width={560}
              height={455}
              bodyColor="#F1F5F9"
              lineColor="#0F1012"
              flipX={true}
              animated={true}
              strideDurationFrames={22}
              frameOffset={7}
            />
          </g>

          {/* 3. FOREGROUND LEAD HERO STALLION (4-Pose Full-Extension Gallop Cycle) */}
          <g
            transform="translate(190, 890)"
            filter="drop-shadow(0 0 32px rgba(255, 255, 255, 0.55))"
          >
            <LipizzanerHorse
              width={680}
              height={550}
              bodyColor="#FFFFFF"
              lineColor="#0F1012"
              flipX={true}
              animated={true}
              strideDurationFrames={24}
              frameOffset={0}
            />
          </g>

          {/* Galloping Motion Lines & Grassland Turf Line */}
          <g stroke="#F59E0B" strokeWidth="2.5" opacity="0.45" strokeDasharray="30 15">
            <line x1="80" y1="1450" x2="880" y2="1450" />
            <line x1="140" y1="1470" x2="820" y2="1470" strokeWidth="1.5" strokeDasharray="20 20" />
          </g>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 19. SCENE 19: THE SOVIET T-34S ARRIVE (Split Confrontation)
// Soviet T-34/85 tank on eastern ridge, too late, watching herd disappear.
// =========================================================================
export const CowboySovietT34RidgeArrival: React.FC = () => {
  const frame = useCurrentFrame();
  const scanSweep = Math.sin(frame * 0.08) * 8;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1260} rx={480} ry={280} intensity={0.9} />

        {/* Eastern Ridge Crest Silhouette */}
        <path
          d="M 0 1380 Q 320 1260 640 1280 T 1080 1220 L 1080 1500 L 0 1500 Z"
          fill="#1C1917"
          stroke="#44403C"
          strokeWidth="3"
        />

        {/* Soviet T-34/85 Medium Tank Silhouette */}
        <g transform="translate(380, 1020)" filter="drop-shadow(0 0 18px rgba(220, 38, 38, 0.4))">
          {/* Sloped Hull Glacis Plate */}
          <polygon
            points="0,170 80,100 420,100 480,160 480,210 0,210"
            fill="#141E18"
            stroke="#2D3B31"
            strokeWidth="3"
          />

          {/* Cast Rounded T-34/85 Turret */}
          <path
            d="M 160 100 C 170 40 220 20 320 20 C 390 20 410 50 410 100 Z"
            fill="#0D1410"
            stroke="#2D3B31"
            strokeWidth="2.5"
          />

          {/* Long 85mm ZiS-S-53 Main Gun Barrel Scanning Left */}
          <line x1="160" y1="65" x2={`-60`} y2={`${65 + scanSweep}`} stroke="#374151" strokeWidth="9" />
          <rect x="-70" y={`${58 + scanSweep}`} width="18" height="14" fill="#1F2937" />

          {/* Soviet Red Star Emblem on Turret */}
          <polygon
            points="290,40 293,48 302,48 295,53 298,61 290,56 282,61 285,53 278,48 287,48"
            fill="#DC2626"
            stroke="#B91C1C"
            strokeWidth="1"
          />

          {/* Tank Commander Scanning with Binoculars */}
          <g transform="translate(340, 0)">
            <circle cx="20" cy="10" r="14" fill="#0D1410" />
            <rect x="5" y="6" width="14" height="6" fill="#64748B" />
          </g>

          {/* Christie Suspension Road Wheels */}
          {[60, 150, 240, 330, 420].map((wx) => (
            <circle key={wx} cx={wx} cy="210" r="38" fill="#090D12" stroke="#334155" strokeWidth="6" />
          ))}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 20. SCENE 20: SAFE BEHIND AMERICAN LINES (Vehicle in Transit)
// U.S. Army GMC CCKW 2.5-ton truck convoy carrying horses across border.
// =========================================================================
export const CowboyUsArmyTruckConvoy: React.FC = () => {
  const frame = useCurrentFrame();
  const truckRumble = Math.sin(frame * 0.35) * 3;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1280} rx={480} ry={280} intensity={0.85} />

        {/* American Border Checkpoint Barrier Raised Up */}
        <g transform="translate(160, 1140)">
          <rect x="0" y="40" width="60" height="260" fill="#1E293B" stroke="#475569" strokeWidth="3" />
          {/* Raised Barrier Arm */}
          <line x1="30" y1="60" x2="180" y2="-120" stroke="#FFFFFF" strokeWidth="14" />
          {/* U.S. Flag Marker on Post */}
          <rect x="60" y="60" width="80" height="50" fill="#1E3A8A" />
          <rect x="60" y="60" width="80" height="25" fill="#DC2626" />
        </g>

        {/* GMC CCKW 2.5-Ton "Deuce and a Half" U.S. Military Transport Truck */}
        <g transform={`translate(320, ${1100 + truckRumble})`} filter="drop-shadow(0 0 16px rgba(59, 130, 246, 0.4))">
          {/* Canvas-Covered Cargo Bed */}
          <path
            d="M 120 180 L 120 40 Q 280 20 440 40 L 440 180 Z"
            fill="#2D3B31"
            stroke="#1E293B"
            strokeWidth="3"
          />

          {/* White Foal Head Peering Out from Canvas Tailgate */}
          <g transform="translate(360, 70)" filter="drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))">
            <path d="M 10 30 Q 25 5 45 20 Q 55 40 40 50 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <polygon points="20,10 26,0 30,12" fill="#FFFFFF" />
          </g>

          {/* Cab & Engine Cowl */}
          <polygon
            points="0,180 0,110 40,70 120,70 120,180"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="3"
          />

          {/* White Star Emblem on Door */}
          <g transform="translate(70, 130)">
            <circle cx="0" cy="0" r="18" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            <polygon points="0,-12 4,-3 12,-3 5,2 7,10 0,5 -7,10 -5,2 -12,-3 -4,-3" fill="#FFFFFF" />
          </g>

          {/* Six Heavy Truck Wheels */}
          {[60, 240, 370].map((wx) => (
            <circle key={wx} cx={wx} cy="195" r="36" fill="#090D12" stroke="#475569" strokeWidth="5" />
          ))}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 21. SCENE 21: EPILOGUE: THE SPANISH RIDING SCHOOL LIVES (Crowd Tally)
// 1,200 horses saved counter, golden Imperial crest, Capriole stallion leap.
// =========================================================================
export const CowboyEpilogueSpanishRidingSchool: React.FC = () => {
  const frame = useCurrentFrame();
  const savedCounter = Math.min(1200, Math.floor(interpolate(frame, [10, 50], [0, 1200], { extrapolateRight: 'clamp' })));

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1260} rx={480} ry={300} intensity={0.95} />

        {/* Imperial Spanish Riding School Golden Laurel Wreath & Capriole Leap Medallion */}
        <g transform="translate(540, 1010)" filter="drop-shadow(0 0 24px rgba(245, 158, 11, 0.65))">
          {/* Golden Laurel Circle */}
          <circle cx="0" cy="0" r="130" fill="#1C1917" stroke="#F59E0B" strokeWidth="6" strokeDasharray="16 8" />
          <circle cx="0" cy="0" r="118" fill="none" stroke="#B45309" strokeWidth="2" />

          {/* Authentic Baroque Lipizzaner Graphic Linocut Silhouette */}
          <g transform="translate(-105, -115)">
            <LipizzanerHorse
              width={210}
              height={210}
              bodyColor="#FFFFFF"
              lineColor="#1C1917"
            />
          </g>

          {/* Imperial Crown Emblem at Top of Wreath */}
          <polygon points="-25,-128 0,-155 25,-128 15,-120 -15,-120" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
        </g>

        {/* Brass Dedication Memorial Plinth (y: 1180 to 1420) */}
        <g transform="translate(190, 1180)">
          <rect x="0" y="0" width="700" height="230" rx="16" fill="#0F1012" stroke="#F59E0B" strokeWidth="4" />
          <rect x="12" y="12" width="676" height="206" fill="none" stroke="#78350F" strokeWidth="2" />

          {/* Rolling Integer Tally: 1,200 */}
          <text
            x="350"
            y="110"
            fontFamily={blackOps.fontFamily}
            fontSize="92"
            fill="#FEF08A"
            textAnchor="middle"
            letterSpacing="4"
          >
            {savedCounter.toLocaleString()}
          </text>
          <text
            x="350"
            y="160"
            fontFamily={montserrat.fontFamily}
            fontSize="26"
            fontWeight="900"
            fill="#FFFFFF"
            textAnchor="middle"
            letterSpacing="6"
          >
            HORSES SAVED FROM EXTINCTION
          </text>
          <text
            x="350"
            y="200"
            fontFamily={montserrat.fontFamily}
            fontSize="18"
            fontWeight="800"
            fill="#F59E0B"
            textAnchor="middle"
            letterSpacing="4"
          >
            SPANISH RIDING SCHOOL PRESERVED
          </text>
        </g>
      </svg>
    </div>
  );
};
