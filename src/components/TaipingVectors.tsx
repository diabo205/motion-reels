import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { loadFont as loadBlackOpsOne } from '@remotion/google-fonts/BlackOpsOne';
import { loadFont as loadBarlowCondensed } from '@remotion/google-fonts/BarlowCondensed';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat';

const blackOps = loadBlackOpsOne('normal', { weights: ['400'], subsets: ['latin'] });
const barlow = loadBarlowCondensed('normal', { weights: ['700'], subsets: ['latin'] });
const montserrat = loadMontserrat('normal', { weights: ['800', '900'], subsets: ['latin'] });

// =========================================================================
// REUSABLE HIGH-CONTRAST ATMOSPHERIC BACKLIGHTING (Artwork Zone y: 864-1498)
// Provides vibrant luminous rim lighting behind stark dark silhouettes
// =========================================================================

const FireHorizonBacklight: React.FC<{
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  color?: string;
  intensity?: number;
}> = ({
  cx = 540,
  cy = 1320,
  rx = 520,
  ry = 320,
  color = '#E63946',
  intensity = 0.85,
}) => {
  const frame = useCurrentFrame();
  const flicker = 1 + Math.sin(frame * 0.18) * 0.08 + Math.cos(frame * 0.31) * 0.06;
  return (
    <g>
      <defs>
        <radialGradient id="vibrantFireGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD166" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#FF5A36" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#DC2626" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#180C11" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="url(#vibrantFireGlow)"
        opacity={intensity * flicker}
      />
    </g>
  );
};

// =========================================================================
// 1. SCENE 01: DEADLIEST CIVIL WAR IN HISTORY (Split Confrontation)
// High-contrast clash between Qing Imperial Bannerman and Taiping Longhair.
// Burning horizon, radiant sunset glow, distinct armor and weapon highlights.
// =========================================================================
export const TaipingConfrontationOpening: React.FC = () => {
  const frame = useCurrentFrame();
  const fireFlicker = Math.sin(frame * 0.22) * 8;
  const bannermanSway = Math.sin(frame * 0.08) * 3;
  const rebelSway = Math.cos(frame * 0.09) * 3;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Luminous Fiery Backlighting Glow */}
        <FireHorizonBacklight cx={540} cy={1300} rx={500} ry={300} intensity={0.9} />

        {/* Distant Burning Hills in Rich Warm Silhouette */}
        <path
          d="M 0 1360 Q 220 1270 440 1310 T 880 1280 Q 980 1300 1080 1340 L 1080 1500 L 0 1500 Z"
          fill="#2A151C"
          stroke="#4D2028"
          strokeWidth="2"
        />

        {/* Rising Golden-Red Smoke Billows */}
        <g opacity="0.5">
          <circle cx={420 + fireFlicker} cy={1270} r="45" fill="#5C2229" />
          <circle cx={460} cy={1230 - (frame % 80)} r="35" fill="#3D181D" />
          <circle cx={620 - fireFlicker} cy={1260} r="50" fill="#5C2229" />
        </g>

        {/* LEFT: Qing Imperial Bannerman Silhouette (with conical peaked helmet, spear) */}
        <g transform={`translate(${180 + bannermanSway}, 1040)`} filter="drop-shadow(0 0 12px rgba(255, 180, 80, 0.35))">
          {/* Spear Shaft & Gleaming Steel Spearhead */}
          <line x1="80" y1="-80" x2="80" y2="380" stroke="#64748B" strokeWidth="6" />
          <polygon points="73,-80 87,-80 80,-125" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          {/* Peaked Conical Qing Helmet with vibrant red plume */}
          <path d="M 120 70 L 170 8 L 220 70 Z" fill="#181E29" stroke="#384353" strokeWidth="2.5" />
          <line x1="170" y1="8" x2="170" y2="-18" stroke="#EF4444" strokeWidth="5" />
          {/* Head & Long Braided Queue */}
          <circle cx="170" cy="95" r="28" fill="#141922" stroke="#2D3748" strokeWidth="2" />
          <path d="M 185 110 Q 215 160 225 240" stroke="#0D1117" strokeWidth="8" fill="none" />
          {/* Armor Torso with edge separation */}
          <path d="M 130 125 L 210 125 L 230 290 L 110 290 Z" fill="#141922" stroke="#2D3748" strokeWidth="2" />
          {/* Circular Front Breastplate Insignia (Bright Luminous Imperial Gold) */}
          <circle cx="170" cy="190" r="28" fill="#1A202C" stroke="#F59E0B" strokeWidth="4" />
          <circle cx="170" cy="190" r="16" fill="#F59E0B" opacity="0.9" />
          {/* Arms holding spear */}
          <path d="M 130 140 L 80 180 L 80 240" stroke="#181E29" strokeWidth="20" strokeLinecap="round" fill="none" />
          {/* Lower robe and boots */}
          <rect x="125" y="290" width="35" height="120" fill="#0F141C" stroke="#252D3A" strokeWidth="1.5" />
          <rect x="180" y="290" width="35" height="120" fill="#0F141C" stroke="#252D3A" strokeWidth="1.5" />
        </g>

        {/* CENTER: Fallen Shattered Imperial Dragon Standard */}
        <g transform="translate(520, 1260)">
          <line x1="-15" y1="120" x2="35" y2="-40" stroke="#8C6245" strokeWidth="6" />
          <polygon points="35,-40 65,-15 20,10" fill="#EF4444" stroke="#F59E0B" strokeWidth="2.5" />
        </g>

        {/* RIGHT: Taiping Longhair Insurgent (wild hair, vibrant red headband, gleaming dao saber) */}
        <g transform={`translate(${620 + rebelSway}, 1030)`} filter="drop-shadow(0 0 14px rgba(255, 100, 50, 0.4))">
          {/* Wild flowing Long Hair */}
          <path
            d="M 150 90 Q 100 120 80 210 Q 130 160 150 130"
            fill="#0F141C"
            stroke="#2A3441"
            strokeWidth="2"
          />
          {/* Head & Neck */}
          <circle cx="160" cy="95" r="28" fill="#141922" stroke="#2D3748" strokeWidth="2" />
          {/* VIBRANT RED HEADBAND ACCENT */}
          <rect x="135" y="83" width="54" height="14" rx="3" fill="#FF3B30" stroke="#FEF08A" strokeWidth="1" />
          <path
            d={`M 135 90 Q ${115 + fireFlicker} 95 ${95 + fireFlicker} 120`}
            stroke="#FF3B30"
            strokeWidth="6"
            fill="none"
          />
          {/* Rebel Tunic with distinct edge */}
          <path d="M 125 125 L 200 125 L 215 290 L 110 290 Z" fill="#181E29" stroke="#2D3748" strokeWidth="2" />
          {/* Bright Crimson Belt Sash */}
          <rect x="112" y="210" width="102" height="16" fill="#EF4444" stroke="#F59E0B" strokeWidth="1.5" />
          {/* Raised Arm holding Dao Saber */}
          <path d="M 190 140 L 250 120 L 290 80" stroke="#181E29" strokeWidth="20" strokeLinecap="round" fill="none" />
          {/* Gleaming Steel Dao Saber (Bright Polished White Blade with Edge Glow) */}
          <path
            d="M 290 80 Q 345 30 390 -15 Q 365 40 300 92 Z"
            fill="#FFFFFF"
            stroke="#94A3B8"
            strokeWidth="3"
            filter="drop-shadow(0 0 8px #FFFFFF)"
          />
          <line x1="285" y1="85" x2="275" y2="108" stroke="#EF4444" strokeWidth="7" />
          {/* Trousers and boots */}
          <rect x="120" y="290" width="36" height="130" fill="#0F141C" stroke="#252D3A" strokeWidth="1.5" />
          <rect x="170" y="290" width="36" height="130" fill="#0F141C" stroke="#252D3A" strokeWidth="1.5" />
        </g>

        {/* Foreground Battleground Rampart (y > 1420) */}
        <path
          d="M 0 1430 L 180 1400 L 400 1435 L 680 1405 L 900 1440 L 1080 1410 L 1080 1500 L 0 1500 Z"
          fill="#1C181F"
          stroke="#382E3A"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
};

// =========================================================================
// 2. SCENE 02: FAILED SCHOLAR IN GUANGZHOU (Lone Leader)
// Warm amber desk lighting, glowing parchment scrolls, vermilion rejection chop.
// =========================================================================
export const HongFailedScholarDesk: React.FC = () => {
  const frame = useCurrentFrame();

  // -------------------------------------------------------------------------
  // PHASE 1: 0.0s – 0.8s (frames 0 to 47) — Inciting Trigger: The Tremble
  // -------------------------------------------------------------------------
  const isPhase1 = frame < 48;

  // Steady macro framing — snap-zoom removed
  const snapZoom1 = 1.0;
  const trembleX = Math.sin(frame * 1.85) * 3.2;
  const trembleY = Math.cos(frame * 2.15) * 2.4;

  // Ink droplet breaking surface tension at frame 16 and plunging toward paper
  const dropletSwell = interpolate(frame, [0, 16], [0.35, 1.0], { extrapolateRight: 'clamp' });
  const dropY = interpolate(frame, [16, 46], [1030, 1280], { extrapolateRight: 'clamp' });
  const dropletStretch = interpolate(frame, [16, 42], [1.0, 2.6], { extrapolateRight: 'clamp' });

  // Graphic overlays (Phase 1)
  const hudAttemptOpacity = interpolate(frame, [8, 12, 47], [0, 1, 1], { extrapolateRight: 'clamp' });
  const failedStampScale = interpolate(frame, [22, 26], [2.4, 1.0], { extrapolateRight: 'clamp' });
  const failedStampOpacity = interpolate(frame, [21, 23], [0, 0.95], { extrapolateRight: 'clamp' });
  const redFlashPhase1 = frame === 22 || frame === 23;

  // -------------------------------------------------------------------------
  // PHASE 2: 0.8s – 1.8s (frames 48 to 107) — The Physical Collapse: Kinetic Impact
  // -------------------------------------------------------------------------
  const isPhase2 = frame >= 48 && frame < 108;
  const fRel2 = frame - 48;

  // Violent 15-degree Dutch angle screen-shake timed to frame 48
  const dutchAngle = interpolate(fRel2, [0, 3, 7, 16, 32, 60], [0, -15, 8.5, -4.2, 1.8, 0], {
    extrapolateRight: 'clamp',
  });
  const shakeDecay = Math.max(0, 1 - fRel2 / 45);
  const shakeX2 = Math.sin(fRel2 * 1.6) * 28 * shakeDecay;
  const shakeY2 = Math.cos(fRel2 * 1.9) * 22 * shakeDecay;

  // Monochromatic high-contrast flash on impact (frames 48-50)
  const isMonoFlash = fRel2 >= 0 && fRel2 <= 2;
  const monoFlashAlpha = interpolate(fRel2, [0, 2], [0.96, 0.4], { extrapolateRight: 'clamp' });

  // Ink wash and spray burst across pine table
  const inkWashRadius = interpolate(fRel2, [0, 40], [20, 310], { extrapolateRight: 'clamp' });
  const inkWashOpacity = interpolate(fRel2, [0, 8, 59], [0.4, 0.98, 0.95], {
    extrapolateRight: 'clamp',
  });

  // -------------------------------------------------------------------------
  // PHASE 3: 1.8s – 3.0s (frames 108 to 179) — Macro Pull-Out: Apocalyptic Genesis
  // -------------------------------------------------------------------------
  const isPhase3 = frame >= 108;
  const fRel3 = frame - 108;

  // Steady cinematic framing — crash-zoom removed
  const orbitalZoom = 1.0;

  // Radiating civil-war faultline veins
  const veinProgress = interpolate(fRel3, [4, 60], [0.05, 1.0], { extrapolateRight: 'clamp' });

  // Passing clouds
  const cloudAlpha = interpolate(fRel3, [12, 34, 56], [0, 0.75, 0], { extrapolateRight: 'clamp' });

  // Dynamic kinetic text counter: PASS RATE <2% snapping into PROJECTED CASUALTIES 20,000,000+
  const isCasualtySnap = fRel3 >= 34;
  const casualtyCount = Math.round(
    interpolate(fRel3, [34, 58], [1200000, 20000000], { extrapolateRight: 'clamp' })
  );
  const casualtySlamScale = 1.0;
  const pulseRadar = (fRel3 * 8) % 180;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* =================================================================== */}
      {/* PHASE 1: THE TREMBLE & MACRO INK DROP (0.0s – 0.8s, frames 0 to 47) */}
      {/* =================================================================== */}
      {isPhase1 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `scale(${snapZoom1})`,
            transformOrigin: '540px 1150px',
          }}
        >
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <defs>
              <radialGradient id="lampMacroGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.75" />
                <stop offset="70%" stopColor="#B45309" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#120D10" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="parchmentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F7EED4" />
                <stop offset="50%" stopColor="#EDE0BC" />
                <stop offset="100%" stopColor="#DECBA1" />
              </linearGradient>
            </defs>

            {/* Examination Cell Atmosphere */}
            <rect x="0" y="700" width="1080" height="1000" fill="#140F15" />
            <circle cx="540" cy="1120" r="420" fill="url(#lampMacroGlow)" />

            {/* Imperial Examination Paper Scroll (Extreme Macro) */}
            <g transform="translate(180, 920)">
              <rect x="0" y="0" width="720" height="480" rx="8" fill="url(#parchmentGrad)" stroke="#A89278" strokeWidth="4" />
              {/* Confucian Examination Red Grid Columns */}
              {[60, 130, 200, 270, 340, 410, 480, 550, 620, 680].map((gx, idx) => (
                <line key={idx} x1={gx} y1="30" x2={gx} y2="450" stroke="#DC2626" strokeWidth="1.5" strokeOpacity="0.35" />
              ))}
              {/* Faint Brushed Calligraphy Characters in Ink */}
              <text x="530" y="110" fill="#26221D" fontSize="38" fontFamily="serif" fontWeight="bold" opacity="0.8">天命之謂性</text>
              <text x="460" y="150" fill="#26221D" fontSize="38" fontFamily="serif" fontWeight="bold" opacity="0.8">修道之謂教</text>
              <text x="390" y="190" fill="#26221D" fontSize="38" fontFamily="serif" fontWeight="bold" opacity="0.8">大學之道</text>
              <text x="320" y="170" fill="#26221D" fontSize="38" fontFamily="serif" fontWeight="bold" opacity="0.8">在明明德</text>
            </g>

            {/* Trembling Hand & Bamboo Brush */}
            <g transform={`translate(${trembleX}, ${trembleY})`}>
              {/* Scholar Silk Sleeve */}
              <path
                d="M 680 720 L 590 980 Q 565 1010 540 1020 L 530 960 Q 560 920 640 700 Z"
                fill="#161C26"
                stroke="#374151"
                strokeWidth="3"
              />
              {/* Hong's Tense Hand Fingers Clamping Shaft */}
              <path
                d="M 525 990 Q 515 1010 535 1022 Q 555 1015 550 995 Z"
                fill="#2B211B"
                stroke="#4B3A2C"
                strokeWidth="2"
              />
              {/* Bamboo Calligraphy Brush Shaft */}
              <polygon points="535,880 545,880 542,1020 538,1020" fill="#92400E" stroke="#78350F" strokeWidth="2" />
              {/* Animal Hair Brush Tip */}
              <path d="M 537 1020 Q 540 1038 540 1042 Q 540 1038 543 1020 Z" fill="#0A0A0C" />
            </g>

            {/* Heavy Droplet of Pine-Soot Ink Plunging Toward Paper */}
            {frame < 16 ? (
              // Swelling droplet at tip
              <ellipse
                cx="540"
                cy="1042"
                rx={6 * dropletSwell}
                ry={9 * dropletSwell}
                fill="#050507"
                stroke="#1F2937"
                strokeWidth="1"
              />
            ) : (
              // Plunging elongated droplet with subtle motion trail
              <g>
                <path
                  d={`M 540,${dropY - 26 * dropletStretch} Q ${540 - 5 * dropletStretch},${dropY} 540,${dropY + 12} Q ${540 + 5 * dropletStretch},${dropY} 540,${dropY - 26 * dropletStretch} Z`}
                  fill="#060608"
                />
                <ellipse cx="538.5" cy={dropY + 2} rx="2.5" ry="3.5" fill="#FFFFFF" opacity="0.6" />
                {/* Subtle downward motion streak */}
                <line x1="540" y1={dropY - 38} x2="540" y2={dropY - 14} stroke="#1E1E24" strokeWidth="2" strokeOpacity="0.5" />
              </g>
            )}

            {/* Rapid Red HUD Flash: 1837: 3RD ATTEMPT */}
            {frame >= 8 && (
              <g transform="translate(540, 910)" opacity={hudAttemptOpacity}>
                <rect x="-190" y="-28" width="380" height="56" rx="6" fill="#1C0A0E" stroke="#EF4444" strokeWidth="2.5" />
                {/* HUD Corner Ticks */}
                <path d="M -180 -18 L -180 -24 L -174 -24" stroke="#F87171" strokeWidth="2" fill="none" />
                <path d="M 180 -18 L 180 -24 L 174 -24" stroke="#F87171" strokeWidth="2" fill="none" />
                <path d="M -180 18 L -180 24 L -174 24" stroke="#F87171" strokeWidth="2" fill="none" />
                <path d="M 180 18 L 180 24 L 174 24" stroke="#F87171" strokeWidth="2" fill="none" />
                <text
                  x="0"
                  y="8"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="24"
                  fontFamily={montserrat.fontFamily}
                  fontWeight="900"
                  letterSpacing="3"
                >
                  1837: 3RD ATTEMPT
                </text>
              </g>
            )}

            {/* Instant Red [FAILED] Watermark Across the Frame */}
            {frame >= 22 && (
              <g
                transform={`translate(540, 1160) rotate(-14) scale(${failedStampScale})`}
                opacity={failedStampOpacity}
              >
                <rect
                  x="-310"
                  y="-85"
                  width="620"
                  height="170"
                  rx="12"
                  fill="#991B1B"
                  fillOpacity="0.22"
                  stroke="#DC2626"
                  strokeWidth="8"
                  strokeDasharray="28 10"
                />
                <text
                  x="0"
                  y="26"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="88"
                  fontFamily={blackOps.fontFamily}
                  fontWeight="900"
                  letterSpacing="10"
                  filter="drop-shadow(0 0 20px rgba(239,68,68,0.85))"
                >
                  [ FAILED ]
                </text>
              </g>
            )}
          </svg>

          {/* 2-Frame Red Screen Flash */}
          {redFlashPhase1 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(239, 68, 68, 0.42)',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* PHASE 2: PHYSICAL COLLAPSE & IMPACT (0.8s – 1.8s, frames 48 to 107) */}
      {/* =================================================================== */}
      {isPhase2 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translate(${shakeX2}px, ${shakeY2}px) rotate(${dutchAngle}deg)`,
            transformOrigin: '540px 1160px',
          }}
        >
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <defs>
              <radialGradient id="impactShockGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#DC2626" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#120D10" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="pineWoodTopDown" x1="0%" y1="0%" x2="100%" y2="20%">
                <stop offset="0%" stopColor="#3E2415" />
                <stop offset="30%" stopColor="#4A2D1B" />
                <stop offset="70%" stopColor="#381F12" />
                <stop offset="100%" stopColor="#2E180E" />
              </linearGradient>
            </defs>

            {/* Top-Down Bird's-Eye View: Pine Table Board */}
            <rect x="60" y="860" width="960" height="620" rx="10" fill="url(#pineWoodTopDown)" stroke="#663A22" strokeWidth="5" />
            {/* Pine Grain Streaks */}
            {[920, 980, 1060, 1140, 1220, 1300, 1380, 1440].map((gy, i) => (
              <line key={i} x1="60" y1={gy} x2="1020" y2={gy} stroke="#2A150B" strokeWidth="2" strokeOpacity="0.45" />
            ))}

            {/* Luminous Warm Impact Shock Behind Hong */}
            <circle cx="540" cy="1160" r={260} fill="url(#impactShockGlow)" />

            {/* Scattered Imperial Examination Bamboo Slips & Tallies */}
            <g transform="translate(240, 960) rotate(-22)">
              <rect x="0" y="0" width="180" height="26" rx="4" fill="#E29547" stroke="#7C2D12" strokeWidth="2" />
              <line x1="30" y1="4" x2="30" y2="22" stroke="#7C2D12" strokeWidth="1.5" />
            </g>
            <g transform="translate(710, 990) rotate(35)">
              <rect x="0" y="0" width="200" height="26" rx="4" fill="#C27A32" stroke="#7C2D12" strokeWidth="2" />
            </g>
            <g transform="translate(680, 1340) rotate(-16)">
              <rect x="0" y="0" width="190" height="26" rx="4" fill="#D97706" stroke="#7C2D12" strokeWidth="2" />
            </g>

            {/* Crumpled Confucian Examination Scroll Soaked in Ink */}
            <g transform="translate(340, 1020) rotate(8)">
              <rect x="0" y="0" width="380" height="240" rx="6" fill="#EDE0C4" stroke="#A89278" strokeWidth="3" />
              <line x1="40" y1="20" x2="40" y2="220" stroke="#DC2626" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="90" y1="20" x2="90" y2="220" stroke="#DC2626" strokeWidth="1.5" strokeOpacity="0.4" />
              <line x1="140" y1="20" x2="140" y2="220" stroke="#DC2626" strokeWidth="1.5" strokeOpacity="0.4" />
            </g>

            {/* Violent Black Pine-Soot Ink Wash Spray Across Script */}
            <g transform="translate(480, 1140)">
              {/* Central exploding ink pool */}
              <circle cx="0" cy="0" r={inkWashRadius} fill="#09090C" opacity={inkWashOpacity} />
              {/* Radial jagged ink lobes */}
              <path
                d={`M 0,0 Q -90,-80 -180,-110 Q -120,-30 -160,40 Q -80,20 0,0 Z`}
                fill="#070709"
                transform={`scale(${inkWashRadius / 150})`}
                opacity="0.95"
              />
              <path
                d={`M 0,0 Q 80,-120 160,-130 Q 140,-40 210,30 Q 110,40 0,0 Z`}
                fill="#070709"
                transform={`scale(${inkWashRadius / 150})`}
                opacity="0.95"
              />
              <path
                d={`M 0,0 Q 60,90 140,160 Q 30,110 -60,140 Q -30,60 0,0 Z`}
                fill="#070709"
                transform={`scale(${inkWashRadius / 150})`}
                opacity="0.95"
              />
              {/* Splattered ink droplets radiating away */}
              {[-160, -90, 80, 140, -110, 190, 120, -180].map((dx, i) => {
                const dy = [ -90, 110, -140, 80, -150, -40, 130, 90 ][i];
                const burstProg = Math.min(1, fRel2 / 20);
                return (
                  <circle
                    key={i}
                    cx={dx * burstProg}
                    cy={dy * burstProg}
                    r={6 + (i % 4) * 2}
                    fill="#050507"
                    opacity={inkWashOpacity}
                  />
                );
              })}
            </g>

            {/* Violently Overturned Stone Inkwell */}
            <g transform="translate(450, 1110) rotate(-42)">
              <rect x="-42" y="-28" width="84" height="56" rx="4" fill="#1C1D22" stroke="#475569" strokeWidth="3" />
              <ellipse cx="0" cy="0" rx="28" ry="16" fill="#0A0A0E" stroke="#000000" strokeWidth="2" />
              {/* Ink pouring from lip */}
              <path d="M 24 -6 Q 48 8 68 28 L 52 38 Q 32 18 20 8 Z" fill="#000000" />
            </g>

            {/* Hong Xiuquan's Limp Silhouette Face-Down in Collapse */}
            <g transform="translate(540, 1220)" filter="drop-shadow(0 0 18px rgba(245, 158, 11, 0.4))">
              {/* Limp outstretched scholar sleeves / arms */}
              <path
                d="M -110 30 Q -180 50 -260 70 Q -240 100 -160 85 L -70 55 Z"
                fill="#11161F"
                stroke="#374151"
                strokeWidth="2.5"
              />
              <path
                d="M 110 30 Q 180 50 260 70 Q 240 100 160 85 L 70 55 Z"
                fill="#11161F"
                stroke="#374151"
                strokeWidth="2.5"
              />
              {/* Scholar Back / Torso collapsed forward */}
              <path
                d="M -120 40 Q 0 -20 120 40 Q 80 180 0 200 Q -80 180 -120 40 Z"
                fill="#0F141C"
                stroke="#2A3442"
                strokeWidth="3"
              />
              {/* Forehead slammed on desk */}
              <circle cx="0" cy="-30" r="46" fill="#0A0E14" stroke="#334155" strokeWidth="2.5" />
              {/* Dislodged Qing Scholar Hat */}
              <g transform="translate(42, -55) rotate(28)">
                <polygon points="-32,0 32,0 24,-28 -24,-28" fill="#18181B" stroke="#DC2626" strokeWidth="2" />
                <circle cx="0" cy="-30" r="5" fill="#EF4444" />
              </g>
            </g>
          </svg>

          {/* Momentary Monochromatic High-Contrast Flash (frames 48-50) */}
          {isMonoFlash && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: `rgba(255, 255, 255, ${monoFlashAlpha})`,
                mixBlendMode: 'difference',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* PHASE 3: MACRO PULL-OUT & APOCALYPTIC GENESIS (1.8s – 3.0s, 108-179) */}
      {/* =================================================================== */}
      {isPhase3 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `scale(${orbitalZoom})`,
            transformOrigin: '540px 1180px',
          }}
        >
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <defs>
              <radialGradient id="chinaWarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#DC2626" stopOpacity="0.8" />
                <stop offset="45%" stopColor="#7F1D1D" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#0B0E14" stopOpacity="0" />
              </radialGradient>
              <filter id="crimsonVeinGlow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Dark Tactical Cartography Background of Southern China */}
            <rect x="0" y="600" width="1080" height="1100" fill="#0B0E14" />
            <circle cx="540" cy="1160" r="580" fill="url(#chinaWarGlow)" />

            {/* Topographical Contour Isolines of Guangdong / Guangxi / Hunan */}
            <g stroke="#1E293B" strokeWidth="2.5" fill="none" opacity="0.6">
              <path d="M 120 1340 Q 320 1260 540 1280 Q 760 1300 980 1220" />
              <path d="M 100 1240 Q 340 1140 540 1170 Q 780 1200 990 1100" />
              <path d="M 140 1130 Q 360 1030 540 1060 Q 760 1090 960 990" />
              <path d="M 180 1020 Q 380 910 540 940 Q 740 970 940 880" />
            </g>

            {/* Spilled Ink Pool Morphing Into Radiating Red Civil-War Faultlines */}
            <g filter="url(#crimsonVeinGlow)">
              {/* Origin Ink Nucleus (Guangzhou Examination Hall) */}
              <circle cx="540" cy="1240" r="28" fill="#1C1917" stroke="#EF4444" strokeWidth="4" />

              {/* Main Vein 1: Guangzhou -> Jintian / Guiping (Guangxi) */}
              <path
                d="M 540 1240 Q 420 1220 340 1180 Q 280 1150 220 1130"
                stroke="#EF4444"
                strokeWidth="7"
                fill="none"
                strokeDasharray="400"
                strokeDashoffset={400 * (1 - veinProgress)}
                strokeLinecap="round"
              />
              {/* Main Vein 2: Guangzhou -> Changsha / Wuhan (Hunan/Hubei) */}
              <path
                d="M 540 1240 Q 520 1110 500 1000 Q 490 930 460 860"
                stroke="#F87171"
                strokeWidth="6"
                fill="none"
                strokeDasharray="450"
                strokeDashoffset={450 * (1 - veinProgress)}
                strokeLinecap="round"
              />
              {/* Main Vein 3: Inland -> Nanjing / Tianjing (Capital of Heavenly Kingdom) */}
              <path
                d="M 500 1000 Q 620 950 710 900 Q 790 850 830 790"
                stroke="#EF4444"
                strokeWidth="7"
                fill="none"
                strokeDasharray="500"
                strokeDashoffset={500 * (1 - veinProgress)}
                strokeLinecap="round"
              />

              {/* Branching Capillaries / Uprising Clusters */}
              <path
                d="M 340 1180 Q 310 1220 260 1240"
                stroke="#DC2626"
                strokeWidth="4"
                fill="none"
                strokeDasharray="150"
                strokeDashoffset={150 * (1 - veinProgress)}
              />
              <path
                d="M 520 1110 Q 610 1100 680 1140"
                stroke="#DC2626"
                strokeWidth="4"
                fill="none"
                strokeDasharray="180"
                strokeDashoffset={180 * (1 - veinProgress)}
              />
              <path
                d="M 710 900 Q 760 960 840 980"
                stroke="#DC2626"
                strokeWidth="4"
                fill="none"
                strokeDasharray="200"
                strokeDashoffset={200 * (1 - veinProgress)}
              />

              {/* Hot-spot Conflict Nodes */}
              {veinProgress > 0.4 && (
                <>
                  <circle cx="220" cy="1130" r="14" fill="#EF4444" />
                  <circle cx="220" cy="1130" r="28" fill="none" stroke="#EF4444" strokeWidth="2" opacity="0.7" />
                  <text x="220" y="1175" fill="#FCA5A5" fontSize="22" fontFamily={montserrat.fontFamily} fontWeight="800" textAnchor="middle">JINTIAN</text>

                  <circle cx="540" cy="1240" r="12" fill="#EF4444" />
                  <text x="540" y="1285" fill="#FCA5A5" fontSize="22" fontFamily={montserrat.fontFamily} fontWeight="800" textAnchor="middle">GUANGZHOU</text>
                </>
              )}
              {veinProgress > 0.7 && (
                <>
                  <circle cx="830" cy="790" r="16" fill="#FF0000" />
                  <circle cx="830" cy="790" r="34" fill="none" stroke="#FF0000" strokeWidth="2.5" opacity="0.85" />
                  <text x="830" y="755" fill="#FCA5A5" fontSize="24" fontFamily={montserrat.fontFamily} fontWeight="900" textAnchor="middle">TIANJING (NANJING)</text>
                </>
              )}
            </g>

            {/* Radar Shockwave Sweep */}
            <circle cx="540" cy="1160" r={pulseRadar * 3} fill="none" stroke="#EF4444" strokeWidth="2" opacity={Math.max(0, 0.7 - pulseRadar / 60)} />

            {/* Fast-Moving Cloud Layers Sweeping During Exponential Crash-Zoom */}
            <g opacity={cloudAlpha}>
              <path
                d="M -100 850 Q 200 780 480 840 Q 750 900 1180 820 L 1180 1200 Q 800 1280 500 1220 Q 200 1160 -100 1240 Z"
                fill="#0F172A"
                opacity="0.8"
              />
              <path
                d="M -50 980 Q 280 920 620 980 Q 940 1040 1200 960 L 1200 1400 Q 880 1480 540 1410 Q 180 1350 -50 1420 Z"
                fill="#1E1B4B"
                opacity="0.65"
              />
            </g>
          </svg>

          {/* Graphic Overlay: Dynamic Kinetic Text Counter */}
          <div
            style={{
              position: 'absolute',
              left: 80,
              right: 80,
              top: 1320,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            {!isCasualtySnap ? (
              // 1.8s to 2.36s: PASS RATE: <2%
              <div
                style={{
                  backgroundColor: '#1E1215',
                  border: '3px solid #EF4444',
                  borderRadius: 12,
                  padding: '16px 36px',
                  boxShadow: '0 0 35px rgba(239, 68, 68, 0.65)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: montserrat.fontFamily,
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#FCA5A5',
                    letterSpacing: 4,
                    marginBottom: 6,
                  }}
                >
                  QING IMPERIAL EXAMINATIONS
                </div>
                <div
                  style={{
                    fontFamily: blackOps.fontFamily,
                    fontSize: 64,
                    fontWeight: 900,
                    color: '#EF4444',
                    letterSpacing: 6,
                    textShadow: '0 0 20px rgba(239, 68, 68, 0.9)',
                  }}
                >
                  PASS RATE: &lt;2%
                </div>
              </div>
            ) : (
              // 2.36s to 3.0s: PROJECTED CASUALTIES: 20,000,000+
              <div
                style={{
                  transform: `scale(${casualtySlamScale})`,
                  backgroundColor: '#260B11',
                  border: '4px solid #DC2626',
                  borderRadius: 14,
                  padding: '18px 40px',
                  boxShadow: '0 0 50px rgba(220, 38, 38, 0.85)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: montserrat.fontFamily,
                    fontSize: 24,
                    fontWeight: 900,
                    color: '#F87171',
                    letterSpacing: 5,
                    marginBottom: 8,
                  }}
                >
                  PROJECTED CASUALTIES:
                </div>
                <div
                  style={{
                    fontFamily: blackOps.fontFamily,
                    fontSize: 72,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    letterSpacing: 4,
                    textShadow: '0 0 30px #EF4444, 0 0 60px #DC2626',
                  }}
                >
                  {casualtyCount.toLocaleString()}+
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 3. SCENE 03: FEVER DREAM & CELESTIAL SWORD (Lone Leader)
// Blinding golden celestial starburst, luminous pure white heavenly blade.
// =========================================================================
export const HongFeverDreamVision: React.FC = () => {
  const frame = useCurrentFrame();

  // -------------------------------------------------------------------------
  // 1. BLADE SLASH & QING IMPERIAL DRAGON BANNER (Frames 0 to 45)
  // -------------------------------------------------------------------------
  // Blade sweeps downward diagonally across screen from top-left to bottom-right
  const bladeProgress = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    easing: (t) => t * t,
  });
  const bladeX = interpolate(bladeProgress, [0, 1], [-140, 1220], { extrapolateRight: 'clamp' });
  const bladeY = interpolate(bladeProgress, [0, 1], [640, 1560], { extrapolateRight: 'clamp' });

  // Flash at slash impact (frame 16-17)
  const isSlashFlash = frame === 16 || frame === 17;

  // Qing Banner Wave (before slash)
  const bannerWave = Math.sin(frame * 0.22) * 8;

  // Banner Shearing in Two along diagonal cut (Frame 18+)
  const isSheared = frame >= 18;
  const topHalfShiftY = interpolate(frame, [18, 55], [0, -140], { extrapolateRight: 'clamp' });
  const topHalfShiftX = interpolate(frame, [18, 55], [0, -45], { extrapolateRight: 'clamp' });
  const topHalfRot = interpolate(frame, [18, 55], [0, -15], { extrapolateRight: 'clamp' });

  const botHalfShiftY = interpolate(frame, [18, 55], [0, 160], { extrapolateRight: 'clamp' });
  const botHalfShiftX = interpolate(frame, [18, 55], [0, 50], { extrapolateRight: 'clamp' });
  const botHalfRot = interpolate(frame, [18, 55], [0, 14], { extrapolateRight: 'clamp' });

  // Banner dissolving into embers (Frames 28 to 65)
  const bannerOpacity = interpolate(frame, [28, 62], [1, 0], { extrapolateRight: 'clamp' });

  // Disintegrating embers rising and swirling
  const emberProgress = Math.max(0, frame - 18);

  // -------------------------------------------------------------------------
  // 2. CAMERA: AGGRESSIVE WHIP-PAN DOWN (Frames 42 to 72)
  // -------------------------------------------------------------------------
  const whipPanY = interpolate(frame, [42, 68], [0, -820], {
    extrapolateRight: 'clamp',
    easing: (t) => t * t * (3 - 2 * t),
  });
  const isWhipPanning = frame >= 43 && frame <= 65;

  // -------------------------------------------------------------------------
  // 3. BLOOD-RED TOPOGRAPHIC MAP OF YANGTZE RIVER IN FLAMES (Frames 55 to 150)
  // -------------------------------------------------------------------------
  const fireFlicker = 1 + Math.sin(frame * 0.35) * 0.14 + Math.cos(frame * 0.52) * 0.08;

  // -------------------------------------------------------------------------
  // 4. GRAPHIC OVERLAY: KINETIC COUNTER BURSTING FROM ZERO: THE REVOLUTIONARY CREED: 1837
  // -------------------------------------------------------------------------
  const isCounterVisible = frame >= 68;
  const creedYear = Math.round(
    interpolate(frame, [70, 114], [0, 1837], { extrapolateRight: 'clamp' })
  );
  const counterScale = 1.0;
  const isYearLanded = frame >= 114;
  const shockwaveRadius = interpolate(frame, [114, 142], [10, 220], { extrapolateRight: 'clamp' });
  const shockwaveAlpha = interpolate(frame, [114, 142], [0.85, 0], { extrapolateRight: 'clamp' });

  // Shared Dragon Banner Artwork Render Function
  const renderQingDragonBanner = () => (
    <g>
      {/* Imperial Yellow Triangular / Swallow-tail Silk Field */}
      <polygon
        points="160,880 920,880 920,1380 540,1320 160,1380"
        fill="#F59E0B"
        stroke="#B45309"
        strokeWidth="6"
      />
      {/* Vermilion Sawtooth Flame Border Along Edges */}
      <polygon
        points="160,880 180,900 160,920 180,940 160,960 180,980 160,1000 180,1020 160,1040 180,1060 160,1080 180,1100 160,1120 180,1140 160,1160 180,1180 160,1200 180,1220 160,1240 180,1260 160,1280 180,1300 160,1320 180,1340 160,1360 180,1380"
        fill="#DC2626"
      />
      <polygon
        points="920,880 900,900 920,920 900,940 920,960 900,980 920,1000 900,1020 920,1040 900,1060 920,1080 900,1100 920,1120 900,1140 920,1160 900,1180 920,1200 900,1220 920,1240 900,1260 920,1280 900,1300 920,1320 900,1340 920,1360 900,1380"
        fill="#DC2626"
      />

      {/* Azure Imperial Qing Coiled Dragon Body */}
      <g transform="translate(540, 1120)">
        {/* Dragon S-Coiled Spine */}
        <path
          d="M -180 -80 Q -100 -140 20 -110 Q 140 -80 180 10 Q 200 100 100 120 Q -20 130 -110 50 Q -180 -10 -150 -60"
          fill="none"
          stroke="#0F275A"
          strokeWidth="38"
          strokeLinecap="round"
        />
        <path
          d="M -180 -80 Q -100 -140 20 -110 Q 140 -80 180 10 Q 200 100 100 120 Q -20 130 -110 50 Q -180 -10 -150 -60"
          fill="none"
          stroke="#0284C7"
          strokeWidth="18"
          strokeLinecap="round"
        />
        {/* Dragon Scaly Back Ridges */}
        <path
          d="M -170 -95 L -160 -115 L -150 -95 L -130 -125 L -110 -100 L -80 -130 L -50 -105 L -10 -130 L 20 -105 L 60 -125 L 90 -95 L 130 -115 L 150 -80"
          fill="#DC2626"
        />
        {/* Dragon Head */}
        <circle cx="-185" cy="-85" r="32" fill="#0F275A" />
        <ellipse cx="-205" cy="-90" rx="20" ry="14" fill="#0F275A" />
        {/* Fierce White Eye & Whiskers */}
        <circle cx="-195" cy="-94" r="5" fill="#FFFFFF" />
        <circle cx="-195" cy="-94" r="2.5" fill="#000000" />
        <path d="M -215 -85 Q -260 -70 -290 -85" stroke="#FFFFFF" strokeWidth="3" fill="none" />
        <path d="M -215 -80 Q -250 -55 -280 -60" stroke="#FFFFFF" strokeWidth="3" fill="none" />
        {/* Sharp Imperial Five Claws */}
        <path d="M 60 -50 L 110 -80 M 80 -40 L 130 -50 M 90 -30 L 135 -25" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
        <path d="M -60 110 L -90 160 M -40 120 L -60 175 M -20 125 L -30 180" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />

        {/* Flaming Red Imperial Sun / Pearl of Wisdom */}
        <circle cx="12" cy="0" r="28" fill="#EF4444" stroke="#DC2626" strokeWidth="4" />
        <circle cx="12" cy="0" r="16" fill="#FEE2E2" />
        {/* Leaping Pearl Flame Sparks */}
        <path d="M 12 -30 Q 8 -48 16 -54 Q 18 -42 24 -32 Z" fill="#EF4444" />
        <path d="M 38 -12 Q 54 -8 60 -16 Q 48 -20 36 -24 Z" fill="#EF4444" />
      </g>
    </g>
  );

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          {/* Top Half Cut Mask: Area ABOVE diagonal cut (0, 780) to (1080, 1420) */}
          <clipPath id="topCutHalf">
            <polygon points="-50,-50 1130,-50 1130,1400 -50,780" />
          </clipPath>

          {/* Bottom Half Cut Mask: Area BELOW diagonal cut (0, 780) to (1080, 1420) */}
          <clipPath id="botCutHalf">
            <polygon points="-50,780 1130,1400 1130,1970 -50,1970" />
          </clipPath>

          <radialGradient id="infernoValleyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#DC2626" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#7F1D1D" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#120609" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="bladeSlashGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FEF08A" />
            <stop offset="80%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>

          <filter id="flameBlur">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ================================================================= */}
        {/* MAIN CAMERA RIG: MOVES DOWN WITH AGGRESSIVE WHIP-PAN              */}
        {/* ================================================================= */}
        <g transform={`translate(0, ${whipPanY})`}>
          {/* --------------------------------------------------------------- */}
          {/* UPPER STAGE: QING IMPERIAL DRAGON BANNER (y: 800 - 1500)       */}
          {/* --------------------------------------------------------------- */}
          <g opacity={bannerOpacity} transform={`translate(0, ${bannerWave})`}>
            {/* Top Severed Half */}
            <g
              clipPath="url(#topCutHalf)"
              transform={`translate(${topHalfShiftX}, ${topHalfShiftY}) rotate(${topHalfRot}, 540, 1100)`}
            >
              {renderQingDragonBanner()}
            </g>

            {/* Bottom Severed Half */}
            <g
              clipPath="url(#botCutHalf)"
              transform={`translate(${botHalfShiftX}, ${botHalfShiftY}) rotate(${botHalfRot}, 540, 1100)`}
            >
              {renderQingDragonBanner()}
            </g>

            {/* Glowing Disintegrating Embers Swirling Along Cut Edge */}
            {isSheared && (
              <g>
                {[
                  { x: 260, y: 920, s: 7 },
                  { x: 380, y: 990, s: 9 },
                  { x: 490, y: 1060, s: 12 },
                  { x: 580, y: 1120, s: 8 },
                  { x: 670, y: 1190, s: 11 },
                  { x: 780, y: 1260, s: 10 },
                  { x: 860, y: 1320, s: 8 },
                ].map((emb, idx) => {
                  const driftX = Math.sin(emberProgress * 0.4 + idx) * 35;
                  const driftY = -(emberProgress * (4 + idx * 0.7));
                  const alpha = Math.max(0, 1 - emberProgress / 38);
                  return (
                    <g key={idx} transform={`translate(${emb.x + driftX}, ${emb.y + driftY})`} opacity={alpha}>
                      <circle cx="0" cy="0" r={emb.s} fill="#FEF08A" />
                      <circle cx="0" cy="0" r={emb.s * 1.8} fill="#FF5A36" opacity="0.6" />
                      <circle cx="0" cy="0" r={emb.s * 2.8} fill="#EF4444" opacity="0.3" />
                    </g>
                  );
                })}
              </g>
            )}
          </g>

          {/* --------------------------------------------------------------- */}
          {/* THE CELESTIAL BLADE SLASH (Frames 0 to 24)                      */}
          {/* --------------------------------------------------------------- */}
          {frame < 26 && (
            <g>
              {/* Luminous Slashing Arc Trail */}
              <path
                d="M 60 740 Q 520 1100 1020 1480"
                stroke="url(#bladeSlashGlow)"
                strokeWidth={interpolate(bladeProgress, [0.1, 0.7, 1.0], [4, 24, 0], { extrapolateRight: 'clamp' })}
                strokeLinecap="round"
                fill="none"
                opacity={interpolate(bladeProgress, [0, 0.4, 0.9, 1.0], [0, 1, 0.9, 0], { extrapolateRight: 'clamp' })}
                filter="url(#flameBlur)"
              />

              {/* The Descending Celestial Straight Blade / Dao */}
              <g
                transform={`translate(${bladeX}, ${bladeY}) rotate(46)`}
                filter="drop-shadow(0 0 24px #FDE047)"
              >
                {/* Luminous Blade Spine */}
                <polygon points="-16,-280 16,-280 0,220" fill="#FFFFFF" stroke="#FEF08A" strokeWidth="5" />
                {/* Golden Core Ridge */}
                <line x1="0" y1="-270" x2="0" y2="190" stroke="#FEF08A" strokeWidth="4" />
                {/* Crossguard */}
                <line x1="-54" y1="-280" x2="54" y2="-280" stroke="#F59E0B" strokeWidth="16" strokeLinecap="round" />
                {/* Hilt and Pommel */}
                <line x1="0" y1="-360" x2="0" y2="-280" stroke="#78350F" strokeWidth="14" strokeLinecap="round" />
                <circle cx="0" cy="-368" r="14" fill="#F59E0B" stroke="#FEF08A" strokeWidth="3" />
              </g>
            </g>
          )}

          {/* --------------------------------------------------------------- */}
          {/* LOWER STAGE: BLOOD-RED TOPOGRAPHIC MAP OF YANGTZE RIVER IN FLAMES*/}
          {/* Pinned at y: 1720 - 2400 (Whip-pan brings this right to center)   */}
          {/* --------------------------------------------------------------- */}
          <g transform="translate(0, 820)">
            {/* Blood-Red Terrain Basin Backdrop */}
            <rect x="40" y="860" width="1000" height="740" rx="14" fill="#140609" stroke="#6B141E" strokeWidth="5" />
            <circle cx="540" cy="1200" r={460} fill="url(#infernoValleyGlow)" />

            {/* Topographical Contour Isolines of the Yangtze Basin */}
            <g stroke="#991B1B" strokeWidth="3" fill="none" opacity="0.65">
              <path d="M 60 1020 Q 320 940 540 980 Q 760 1020 1020 920" />
              <path d="M 60 1120 Q 340 1040 540 1080 Q 780 1120 1020 1040" />
              <path d="M 60 1440 Q 340 1360 540 1400 Q 780 1440 1020 1360" />
              <path d="M 60 1540 Q 320 1460 540 1500 Q 760 1540 1020 1460" />
            </g>

            {/* The Great Yangtze River: Sinuous Arterial Glowing Flame Channel */}
            <g filter="url(#flameBlur)">
              {/* Outer Deep Red Heat Channel */}
              <path
                d="M 60 1280 Q 240 1180 420 1240 Q 600 1300 760 1200 Q 920 1150 1020 1180"
                stroke="#DC2626"
                strokeWidth="48"
                fill="none"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Mid Fiery Orange River Flow */}
              <path
                d="M 60 1280 Q 240 1180 420 1240 Q 600 1300 760 1200 Q 920 1150 1020 1180"
                stroke="#FF5A36"
                strokeWidth="28"
                fill="none"
                strokeLinecap="round"
              />
              {/* Molten Golden White Heart of the River */}
              <path
                d="M 60 1280 Q 240 1180 420 1240 Q 600 1300 760 1200 Q 920 1150 1020 1180"
                stroke="#FEF08A"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {/* Leaping Flame Tongues Along the Riverbanks */}
            <g transform={`scale(${fireFlicker})`} transformOrigin="540px 1240px">
              {/* Wuhan Fortress Fire Cluster */}
              <g transform="translate(260, 1200)">
                <path d="M 0 0 Q -24 -60 0 -90 Q 24 -60 0 0 Z" fill="#FFD166" />
                <path d="M -15 -10 Q -35 -50 -15 -75 Q 5 -50 -15 -10 Z" fill="#EF4444" />
                <path d="M 15 -10 Q -5 -55 15 -80 Q 35 -50 15 -10 Z" fill="#FF5A36" />
                <text x="0" y="32" fill="#FCA5A5" fontSize="22" fontFamily={montserrat.fontFamily} fontWeight="900" textAnchor="middle">WUHAN</text>
              </g>

              {/* Anqing / Jiujiang Bastion Fire Cluster */}
              <g transform="translate(560, 1260)">
                <path d="M 0 0 Q -28 -70 0 -110 Q 28 -70 0 0 Z" fill="#FFD166" />
                <path d="M -18 -15 Q -40 -65 -18 -95 Q 4 -65 -18 -15 Z" fill="#EF4444" />
                <path d="M 18 -15 Q -4 -70 18 -100 Q 40 -65 18 -15 Z" fill="#FF5A36" />
                <text x="0" y="34" fill="#FCA5A5" fontSize="22" fontFamily={montserrat.fontFamily} fontWeight="900" textAnchor="middle">ANQING</text>
              </g>

              {/* Nanjing Bastion Inferno Cluster */}
              <g transform="translate(840, 1160)">
                <path d="M 0 0 Q -32 -80 0 -130 Q 32 -80 0 0 Z" fill="#FFD166" />
                <path d="M -22 -20 Q -50 -75 -22 -110 Q 6 -75 -22 -20 Z" fill="#EF4444" />
                <path d="M 22 -20 Q -6 -85 22 -120 Q 50 -75 22 -20 Z" fill="#FF5A36" />
                <text x="0" y="34" fill="#FCA5A5" fontSize="24" fontFamily={montserrat.fontFamily} fontWeight="900" textAnchor="middle">NANJING</text>
              </g>
            </g>

            {/* Tactical Map Header HUD Tag */}
            <g transform="translate(540, 930)">
              <rect x="-190" y="-24" width="380" height="48" rx="6" fill="#2A080E" stroke="#DC2626" strokeWidth="2" />
              <text
                x="0"
                y="8"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="22"
                fontFamily={montserrat.fontFamily}
                fontWeight="900"
                letterSpacing="4"
              >
                YANGTZE BASIN: INFERNO ZONE
              </text>
            </g>
          </g>
        </g>

        {/* ----------------------------------------------------------------- */}
        {/* DIRECTIONAL WHIP-PAN SPEED LINES (Frames 43 to 65)                */}
        {/* ----------------------------------------------------------------- */}
        {isWhipPanning && (
          <g opacity="0.55">
            {[120, 240, 380, 520, 660, 800, 940].map((lx, i) => (
              <line
                key={i}
                x1={lx}
                y1="0"
                x2={lx}
                y2="1920"
                stroke="#FF5A36"
                strokeWidth={3 + (i % 3) * 2}
                strokeDasharray="80 50"
              />
            ))}
          </g>
        )}

        {/* Momentary Slash Impact Flash */}
        {isSlashFlash && (
          <rect width="1080" height="1920" fill="#FFFFFF" opacity="0.85" pointerEvents="none" />
        )}
      </svg>

      {/* =================================================================== */}
      {/* 4. GRAPHIC OVERLAY: KINETIC COUNTER BURSTING FROM ZERO             */}
      {/* "THE REVOLUTIONARY CREED: 1837"                                     */}
      {/* =================================================================== */}
      {isCounterVisible && (
        <div
          style={{
            position: 'absolute',
            left: 60,
            right: 60,
            top: 1350,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${counterScale})`,
            transformOrigin: 'center center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              backgroundColor: '#1C060B',
              border: `4px solid ${isYearLanded ? '#F59E0B' : '#EF4444'}`,
              borderRadius: 14,
              padding: '16px 42px',
              boxShadow: `0 0 45px ${isYearLanded ? 'rgba(245, 158, 11, 0.85)' : 'rgba(239, 68, 68, 0.75)'}`,
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {/* Top Context Subhead */}
            <div
              style={{
                fontFamily: montserrat.fontFamily,
                fontSize: 22,
                fontWeight: 900,
                color: isYearLanded ? '#FEF08A' : '#FCA5A5',
                letterSpacing: 4,
                marginBottom: 6,
              }}
            >
              THE REVOLUTIONARY CREED:
            </div>

            {/* Kinetic Rolling Integer Bursting from 0 to 1837 */}
            <div
              style={{
                fontFamily: blackOps.fontFamily,
                fontSize: 76,
                fontWeight: 900,
                color: isYearLanded ? '#FFFFFF' : '#EF4444',
                letterSpacing: 6,
                textShadow: isYearLanded
                  ? '0 0 25px #F59E0B, 0 0 50px #DC2626'
                  : '0 0 20px rgba(239, 68, 68, 0.9)',
              }}
            >
              {creedYear}
            </div>

            {/* Expanding Shockwave Radar Ring on Landing (Frame 114+) */}
            {isYearLanded && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: shockwaveRadius * 2,
                  height: shockwaveRadius * 2,
                  marginLeft: -shockwaveRadius,
                  marginTop: -shockwaveRadius,
                  borderRadius: '50%',
                  border: '3px solid #F59E0B',
                  opacity: shockwaveAlpha,
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 4. SCENE 04: CLEANSE THE MANCHU DEMONS (Split Confrontation)
// High-contrast divine straight sword thrust at ominous coiled dragon pagoda.
// =========================================================================
export const CleanseTheDemonsStage: React.FC = () => {
  const frame = useCurrentFrame();
  const dragonSlither = Math.sin(frame * 0.14) * 12;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Radiant Red/Amber Horizon Fog */}
        <FireHorizonBacklight cx={540} cy={1250} rx={500} ry={280} intensity={0.8} />

        {/* LEFT: Hong Xiuquan with Divine Sword thrust forward */}
        <g transform="translate(180, 1070)" filter="drop-shadow(0 0 14px rgba(254, 240, 138, 0.4))">
          <path d="M 50 100 L 110 90 L 140 280 L 30 280 Z" fill="#141922" stroke="#2D3748" strokeWidth="2.5" />
          <circle cx="95" cy="65" r="28" fill="#141922" stroke="#2D3748" strokeWidth="2" />
          {/* Extended arm and glowing straight sword */}
          <line x1="110" y1="100" x2="220" y2="100" stroke="#181E29" strokeWidth="20" strokeLinecap="round" />
          <line x1="220" y1="100" x2="400" y2="100" stroke="#FFFFFF" strokeWidth="7" filter="drop-shadow(0 0 8px #FDE047)" />
          {/* Crimson sash accent */}
          <rect x="35" y="160" width="85" height="16" fill="#EF4444" stroke="#F59E0B" strokeWidth="1" />
        </g>

        {/* RIGHT: Shadowy Manchu Imperial Dragon & Pagoda Silhouette */}
        <g transform={`translate(${560 + dragonSlither}, 960)`}>
          {/* Serpentine Dragon Body coiling around dark pagoda */}
          <path
            d="M 120 180 Q 220 80 320 160 T 400 320 Q 320 380 200 320 T 140 220"
            fill="none"
            stroke="#261A22"
            strokeWidth="48"
            strokeLinecap="round"
          />
          <path
            d="M 120 180 Q 220 80 320 160 T 400 320 Q 320 380 200 320 T 140 220"
            fill="none"
            stroke="#5C2638"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Dragon Head with Horns & Whiskers */}
          <g transform="translate(100, 150)">
            <polygon points="0,0 -45,-30 -30,25" fill="#3D1828" stroke="#7A2D45" strokeWidth="2" />
            <line x1="-30" y1="-25" x2="-65" y2="-55" stroke="#F59E0B" strokeWidth="4" />
            {/* Blazing Glowing Sinister Red Eye */}
            <circle cx="-16" cy="-8" r="6" fill="#FF0000" filter="drop-shadow(0 0 6px #FF0000)" />
          </g>
          {/* Pagoda Silhouette */}
          <g transform="translate(240, 100)" opacity="0.75">
            <polygon points="50,0 10,35 90,35" fill="#241B26" stroke="#4A344C" strokeWidth="2" />
            <rect x="25" y="35" width="50" height="40" fill="#241B26" stroke="#4A344C" strokeWidth="1.5" />
            <polygon points="50,60 0,95 100,95" fill="#241B26" stroke="#4A344C" strokeWidth="2" />
            <rect x="20" y="95" width="60" height="85" fill="#241B26" stroke="#4A344C" strokeWidth="1.5" />
          </g>
        </g>

        {/* Ground */}
        <line x1="0" y1="1445" x2="1080" y2="1445" stroke="#382E3A" strokeWidth="4" />
      </svg>
    </div>
  );
};

// =========================================================================
// 5. SCENE 05: CUTTING THE IMPERIAL QUEUE (Silhouette Action)
// Close tactile action: Severed braid falling, gleaming razor-sharp dagger.
// =========================================================================
export const CuttingImperialQueueSilhouette: React.FC = () => {
  const frame = useCurrentFrame();

  // -------------------------------------------------------------------------
  // PHASE 1: 0.0s – 0.8s (frames 0 to 47) — The Blade at the Nape
  // -------------------------------------------------------------------------
  const isPhase1 = frame < 48;
  // Steady macro framing — rack/snap zoom removed
  const rackZoom = 1.0;

  // Flashing crimson Qing imperial penal code watermark: KEEP HAIR, LOSE HEAD
  const penalOpacity = interpolate(frame, [6, 12, 47], [0, 1, 1], { extrapolateRight: 'clamp' });
  const penalBlink = Math.floor(frame / 6) % 2 === 0;

  // Shearing fiber tension
  const fiberTension = interpolate(frame, [24, 47], [0, 8], { extrapolateRight: 'clamp' });

  // -------------------------------------------------------------------------
  // PHASE 2: 0.8s – 1.7s (frames 48 to 101) — Mechanical Severing & Release
  // -------------------------------------------------------------------------
  const isPhase2 = frame >= 48 && frame < 102;
  const fRel2 = frame - 48;

  // Zero-gravity slow-motion severed braid drop
  const braidDropY = interpolate(fRel2, [0, 48], [0, 320], { extrapolateRight: 'clamp' });
  const braidDropX = interpolate(fRel2, [0, 48], [0, 45], { extrapolateRight: 'clamp' });
  const braidRot = interpolate(fRel2, [0, 48], [0, 85], { extrapolateRight: 'clamp' });

  // Unbraided black hair bursting outward and uncoiling in wind
  const hairBurst = interpolate(fRel2, [2, 35], [0.2, 1.0], { extrapolateRight: 'clamp' });

  // Crimson turban wrapping around rebel's brow
  const turbanWrap = interpolate(fRel2, [6, 24], [0, 1], { extrapolateRight: 'clamp' });

  // Dynamic whip-spin down to ground level carpeted with queues
  const whipSpinRot = interpolate(fRel2, [18, 40], [0, 180], { extrapolateRight: 'clamp' });
  const whipPanGround = interpolate(fRel2, [18, 44], [0, -780], {
    extrapolateRight: 'clamp',
    easing: (t) => t * t * (3 - 2 * t),
  });
  const isWhipSpinning = fRel2 >= 18 && fRel2 <= 38;

  // Rapid kinetic counter: LOYAL SUBJECTS: 0 -> TREASONOUS INSURGENTS: +30,000
  const isCounterPhase2 = fRel2 >= 4;
  const isInsurgentSnap = fRel2 >= 20;
  const insurgentCount = Math.round(
    interpolate(fRel2, [20, 46], [0, 30000], { extrapolateRight: 'clamp' })
  );

  // -------------------------------------------------------------------------
  // PHASE 3: 1.7s – 2.5s (frames 102 to 149) — Macro Consequence: Karst Horde
  // -------------------------------------------------------------------------
  const isPhase3 = frame >= 102;
  const fRel3 = frame - 102;

  // Steady panoramic wide framing — crash-zoom removed
  const craneScale = 1.0;
  const craneY = 0;

  // Billowing battle banners and torch flicker
  const bannerWave = Math.sin(fRel3 * 0.25) * 12;
  const torchFlicker = 1 + Math.sin(fRel3 * 0.4) * 0.15;

  // Typography slam: THE LONGHAIR HORDE RISES: GUANGXI, 1851
  const typoScale = 1.0;
  const typoOpacity = interpolate(fRel3, [8, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* =================================================================== */}
      {/* PHASE 1: THE BLADE AT THE NAPE (0.0s – 0.8s, frames 0 to 47)        */}
      {/* =================================================================== */}
      {isPhase1 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `scale(${rackZoom})`,
            transformOrigin: '540px 1140px',
          }}
        >
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <FireHorizonBacklight cx={540} cy={1180} rx={460} ry={260} intensity={0.8} />

            {/* Profile of the Rebel's Neck and Nape (Extreme Close-Up) */}
            <g transform="translate(420, 960)">
              {/* Shaven Manchu Forehead / Crown Rim */}
              <path
                d="M -120 40 Q -60 -40 40 -60 Q 140 -40 180 40 L 160 260 L -100 260 Z"
                fill="#161820"
                stroke="#374151"
                strokeWidth="3"
              />
              {/* Nape of the Neck Contour */}
              <path
                d="M -40 80 Q -10 140 10 240 L 90 240 Q 80 140 40 80 Z"
                fill="#201815"
                stroke="#4A3428"
                strokeWidth="2.5"
              />

              {/* Taut, Braided Manchu Queue Root */}
              <g transform="translate(10, 100)">
                {/* Intertwined Braided Hair Strands */}
                {[0, 18, 36, 54, 72, 90, 108, 126, 144].map((by, i) => (
                  <g key={i} transform={`translate(${i % 2 === 0 ? -6 : 6}, ${by})`}>
                    <path
                      d="M -16 0 Q 0 14 16 0 Q 0 -14 -16 0 Z"
                      fill="#090B0F"
                      stroke="#1F2937"
                      strokeWidth="2"
                    />
                    {/* Individual Hair Fibers Under Tension */}
                    <line x1="-12" y1="-4" x2="12" y2="4" stroke="#374151" strokeWidth="1" />
                    <line x1="-12" y1="4" x2="12" y2="-4" stroke="#374151" strokeWidth="1" />
                  </g>
                ))}

                {/* Straining Hair Fibers Shearing at the Point of Blade Contact */}
                {frame >= 24 && (
                  <g transform="translate(0, 48)">
                    <path d={`M -14 0 Q ${-24 - fiberTension} 6 -32 14`} stroke="#4B5563" strokeWidth="2" />
                    <path d={`M -12 4 Q ${-20 - fiberTension} 12 -28 22`} stroke="#4B5563" strokeWidth="2" />
                    <path d={`M 14 0 Q ${24 + fiberTension} 6 32 14`} stroke="#4B5563" strokeWidth="2" />
                    <circle cx="-16" cy="2" r="3" fill="#EF4444" opacity="0.75" />
                  </g>
                )}
              </g>

              {/* Rusted Iron Harvesting Sickle Pressed Tight Against the Nape */}
              <g transform="translate(-10, 148) rotate(-18)">
                {/* Crescent Sickle Blade */}
                <path
                  d="M -160 -120 Q -40 -140 40 -60 Q 90 20 80 90 Q 50 140 -20 120 Q 30 70 20 0 Q 0 -70 -120 -90 Z"
                  fill="#5A3A26"
                  stroke="#784C32"
                  strokeWidth="3.5"
                />
                {/* Pitted Iron Rust Texture Details */}
                <circle cx="-40" cy="-90" r="4" fill="#3D2416" />
                <circle cx="20" cy="-30" r="5" fill="#3D2416" />
                <circle cx="50" cy="40" r="4" fill="#3D2416" />
                {/* Honed Sharp Cutting Edge */}
                <path
                  d="M -120 -90 Q 0 -70 20 0 Q 30 70 -20 120"
                  stroke="#E2E8F0"
                  strokeWidth="3"
                  fill="none"
                  filter="drop-shadow(0 0 6px #FFFFFF)"
                />
                {/* Weathered Wooden Handle */}
                <rect x="-240" y="-140" width="100" height="26" rx="4" fill="#3E2415" stroke="#25140B" strokeWidth="2" />
              </g>
            </g>

            {/* Graphic Overlay: Flashing Crimson Qing Imperial Penal Code Watermark */}
            <g transform="translate(540, 920)" opacity={penalOpacity}>
              <rect
                x="-320"
                y="-42"
                width="640"
                height="84"
                rx="8"
                fill="#1C0A0E"
                fillOpacity="0.88"
                stroke={penalBlink ? '#EF4444' : '#DC2626'}
                strokeWidth="3.5"
                strokeDasharray="24 8"
              />
              <text
                x="0"
                y="-8"
                textAnchor="middle"
                fill="#F87171"
                fontSize="18"
                fontFamily={montserrat.fontFamily}
                fontWeight="800"
                letterSpacing="4"
              >
                QING IMPERIAL PENAL CODE
              </text>
              <text
                x="0"
                y="26"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="34"
                fontFamily={blackOps.fontFamily}
                fontWeight="900"
                letterSpacing="5"
                filter="drop-shadow(0 0 16px rgba(239, 68, 68, 0.85))"
              >
                KEEP HAIR, LOSE HEAD
              </text>
            </g>
          </svg>
        </div>
      )}

      {/* =================================================================== */}
      {/* PHASE 2: MECHANICAL SEVERING & RELEASE (0.8s – 1.7s, frames 48-101) */}
      {/* =================================================================== */}
      {isPhase2 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translate(0, ${whipPanGround}px) rotate(${isWhipSpinning ? whipSpinRot : 0}deg)`,
            transformOrigin: '540px 1140px',
          }}
        >
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <FireHorizonBacklight cx={540} cy={1140} rx={480} ry={280} intensity={0.85} />

            {/* ------------------------------------------------------------- */}
            {/* UPPER HALF: REBEL SILHOUETTE WITH BURSTING HAIR & RED TURBAN   */}
            {/* ------------------------------------------------------------- */}
            <g transform="translate(360, 940)">
              {/* Rebel Head and Torso */}
              <circle cx="180" cy="140" r="54" fill="#11161F" stroke="#2D3748" strokeWidth="3" />
              <path d="M 120 280 L 160 190 L 220 190 L 260 280 Z" fill="#0E121A" stroke="#252D3A" strokeWidth="2.5" />

              {/* Thick Unbraided Black Hair Bursting Outward in Wind ("Longhairs") */}
              <g opacity={hairBurst}>
                {[-50, -30, -10, 10, 30, 50].map((dx, i) => {
                  const waveY = Math.sin(fRel2 * 0.35 + i) * 24;
                  return (
                    <path
                      key={i}
                      d={`M 180 140 Q ${120 + dx * 2} ${220 + waveY} ${60 + dx * 3} ${340 + waveY * 1.5}`}
                      stroke="#07090D"
                      strokeWidth={14 - Math.abs(dx) * 0.15}
                      strokeLinecap="round"
                      fill="none"
                    />
                  );
                })}
              </g>

              {/* Crimson Turban Wrapping Around Rebel Brow */}
              <g opacity={turbanWrap}>
                <rect x="135" y="112" width="95" height="32" rx="6" fill="#DC2626" stroke="#FEF08A" strokeWidth="2" />
                {/* Fluttering Turban Sashes */}
                <path
                  d={`M 220 128 Q ${260 + Math.sin(fRel2 * 0.3) * 16} 140 ${300 + Math.sin(fRel2 * 0.3) * 22} 160`}
                  stroke="#EF4444"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* Severed Braided Queue Tumbling Downward in Zero-G Slow Motion */}
              <g
                transform={`translate(${140 + braidDropX}, ${180 + braidDropY}) rotate(${braidRot})`}
                filter="drop-shadow(0 0 12px rgba(0,0,0,0.85))"
              >
                <path
                  d="M 0 0 Q 15 40 5 90 T 15 180"
                  stroke="#080A0E"
                  strokeWidth="14"
                  strokeDasharray="12 4"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="0" cy="0" r="9" fill="#080A0E" stroke="#1F2937" strokeWidth="2" />
                {/* Frayed Cut End Strands */}
                <line x1="-6" y1="-8" x2="6" y2="8" stroke="#374151" strokeWidth="2" />
                <line x1="6" y1="-8" x2="-6" y2="8" stroke="#374151" strokeWidth="2" />
              </g>
            </g>

            {/* ------------------------------------------------------------- */}
            {/* LOWER HALF: GROUND LEVEL CARPETED WITH THOUSANDS OF QUEUES     */}
            {/* Pinned at y: 1720 - 2400 (Whip-pan down reveals this layer)    */}
            {/* ------------------------------------------------------------- */}
            <g transform="translate(0, 800)">
              {/* Muddy Dark Earth */}
              <rect x="40" y="880" width="1000" height="740" rx="12" fill="#1C110B" stroke="#452718" strokeWidth="5" />
              {/* Thousands of Tangled Severed Braids Carpeted Across Mud */}
              {[
                { x: 120, y: 980, rot: 15 },
                { x: 260, y: 1040, rot: -35 },
                { x: 420, y: 960, rot: 42 },
                { x: 580, y: 1020, rot: -18 },
                { x: 740, y: 980, rot: 28 },
                { x: 880, y: 1060, rot: -45 },
                { x: 180, y: 1180, rot: 50 },
                { x: 340, y: 1240, rot: -22 },
                { x: 500, y: 1160, rot: 12 },
                { x: 680, y: 1220, rot: -30 },
                { x: 840, y: 1180, rot: 60 },
                { x: 280, y: 1360, rot: -15 },
                { x: 460, y: 1420, rot: 35 },
                { x: 640, y: 1380, rot: -40 },
                { x: 800, y: 1440, rot: 20 },
              ].map((pos, i) => (
                <g key={i} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.rot})`}>
                  <path
                    d="M 0 0 Q 30 18 60 -6 T 120 12"
                    stroke="#0A0C10"
                    strokeWidth="11"
                    strokeDasharray="8 3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="0" cy="0" r="7" fill="#0A0C10" />
                </g>
              ))}
            </g>
          </svg>

          {/* Graphic Overlay: Rapid Kinetic Counter Snapping from 0 to +30,000 */}
          {isCounterPhase2 && (
            <div
              style={{
                position: 'absolute',
                left: 80,
                right: 80,
                top: 1340,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              {!isInsurgentSnap ? (
                // 0.8s to 1.1s: LOYAL SUBJECTS: 0
                <div
                  style={{
                    backgroundColor: '#16161A',
                    border: '3px solid #64748B',
                    borderRadius: 12,
                    padding: '14px 36px',
                    boxShadow: '0 0 30px rgba(0,0,0,0.85)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: montserrat.fontFamily,
                      fontSize: 20,
                      fontWeight: 800,
                      color: '#94A3B8',
                      letterSpacing: 4,
                      marginBottom: 4,
                    }}
                  >
                    MANCHU FEALTY STATUS
                  </div>
                  <div
                    style={{
                      fontFamily: blackOps.fontFamily,
                      fontSize: 58,
                      fontWeight: 900,
                      color: '#EF4444',
                      letterSpacing: 6,
                    }}
                  >
                    LOYAL SUBJECTS: 0
                  </div>
                </div>
              ) : (
                // 1.1s to 1.7s: TREASONOUS INSURGENTS: +30,000
                <div
                  style={{
                    backgroundColor: '#240A0F',
                    border: '4px solid #DC2626',
                    borderRadius: 14,
                    padding: '16px 40px',
                    boxShadow: '0 0 45px rgba(220, 38, 38, 0.85)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: montserrat.fontFamily,
                      fontSize: 22,
                      fontWeight: 900,
                      color: '#FCA5A5',
                      letterSpacing: 4,
                      marginBottom: 4,
                    }}
                  >
                    TAIPING REBELLION ENROLLMENT
                  </div>
                  <div
                    style={{
                      fontFamily: blackOps.fontFamily,
                      fontSize: 66,
                      fontWeight: 900,
                      color: '#FFFFFF',
                      letterSpacing: 4,
                      textShadow: '0 0 25px #EF4444, 0 0 50px #DC2626',
                    }}
                  >
                    TREASONOUS INSURGENTS: +{insurgentCount.toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* PHASE 3: MACRO CONSEQUENCE: KARST HORDE (1.7s – 2.5s, frames 102-149) */}
      {/* =================================================================== */}
      {isPhase3 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transform: `scale(${craneScale}) translate(0, ${craneY}px)`,
            transformOrigin: '540px 1180px',
          }}
        >
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <defs>
              <radialGradient id="torchlightSea" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#DC2626" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#7F1D1D" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0B090E" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Expansive Cinematic Wide Shot: Guangxi Karst Peaks Swallowed by Torchlight */}
            <rect x="0" y="600" width="1080" height="1100" fill="#0C0A10" />
            <circle cx="540" cy="1180" r={580} fill="url(#torchlightSea)" />

            {/* Jagged Limestone Karst Mountain Peaks */}
            <path
              d="M -40 1420 L 80 960 L 180 1420 L 290 880 L 400 1420 L 520 920 L 640 1420 L 780 860 L 890 1420 L 1020 940 L 1120 1420 Z"
              fill="#1A121D"
              stroke="#38253B"
              strokeWidth="4"
            />
            <path
              d="M 60 1440 L 180 1100 L 280 1440 L 460 1060 L 600 1440 L 760 1080 L 920 1440 Z"
              fill="#2A1B2E"
              stroke="#4A2E50"
              strokeWidth="3"
            />

            {/* Forest of Hoisted Bamboo Spears & Trident Pikes */}
            <g stroke="#D97706" strokeWidth="4">
              {[80, 140, 200, 260, 320, 380, 440, 500, 560, 620, 680, 740, 800, 860, 920, 980].map((sx, i) => {
                const spearH = 260 + (i % 4) * 45;
                const tipY = 1440 - spearH;
                return (
                  <g key={i}>
                    <line x1={sx} y1="1440" x2={sx} y2={tipY} />
                    {/* Fire-hardened spearhead / Trident spike */}
                    {i % 3 === 0 ? (
                      // Trident Pike
                      <path
                        d={`M ${sx - 12} ${tipY + 14} L ${sx} ${tipY - 18} L ${sx + 12} ${tipY + 14}`}
                        stroke="#F3F4F6"
                        strokeWidth="3.5"
                        fill="none"
                      />
                    ) : (
                      // Bamboo Spearhead
                      <polygon
                        points={`${sx - 7},${tipY + 12} ${sx + 7},${tipY + 12} ${sx},${tipY - 16}`}
                        fill="#FFFFFF"
                        stroke="#F59E0B"
                        strokeWidth="1.5"
                      />
                    )}
                  </g>
                );
              })}
            </g>

            {/* Billowing Triangular Yellow Battle Banners with "太平" Character */}
            {[
              { x: 240, y: 1160, s: 1.1 },
              { x: 540, y: 1100, s: 1.3 },
              { x: 820, y: 1140, s: 1.0 },
            ].map((ban, idx) => (
              <g key={idx} transform={`translate(${ban.x}, ${ban.y}) scale(${ban.s})`}>
                <line x1="0" y1="0" x2="0" y2="280" stroke="#78350F" strokeWidth="6" />
                <polygon
                  points={`0,10 ${140 + bannerWave},70 0,130`}
                  fill="#F59E0B"
                  stroke="#DC2626"
                  strokeWidth="3.5"
                />
                <text
                  x="36"
                  y="78"
                  fill="#1C0A0E"
                  fontSize="42"
                  fontFamily="serif"
                  fontWeight="bold"
                >
                  太
                </text>
              </g>
            ))}

            {/* Thousands of Flickering Torches Swallowing the Karst Peaks */}
            <g transform={`scale(${torchFlicker})`} transformOrigin="540px 1280px">
              {[
                { x: 140, y: 1320 }, { x: 220, y: 1260 }, { x: 310, y: 1340 }, { x: 390, y: 1270 },
                { x: 470, y: 1330 }, { x: 550, y: 1260 }, { x: 630, y: 1320 }, { x: 710, y: 1270 },
                { x: 790, y: 1340 }, { x: 870, y: 1280 }, { x: 950, y: 1330 }, { x: 180, y: 1390 },
                { x: 360, y: 1400 }, { x: 540, y: 1390 }, { x: 720, y: 1410 }, { x: 900, y: 1390 },
              ].map((torch, i) => (
                <g key={i} transform={`translate(${torch.x}, ${torch.y})`}>
                  <circle cx="0" cy="0" r="14" fill="#FEF08A" opacity="0.9" />
                  <circle cx="0" cy="0" r="26" fill="#FF5A36" opacity="0.45" />
                </g>
              ))}
            </g>
          </svg>

          {/* Graphic Overlay: Bold Dual Typography Slamming Across Horizon */}
          <div
            style={{
              position: 'absolute',
              left: 40,
              right: 40,
              top: 1320,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${typoScale})`,
              opacity: typoOpacity,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                backgroundColor: '#1E080D',
                border: '4px solid #DC2626',
                borderRadius: 14,
                padding: '16px 36px',
                boxShadow: '0 0 45px rgba(220, 38, 38, 0.85)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: montserrat.fontFamily,
                  fontSize: 32,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: 4,
                  textShadow: '0 0 20px #EF4444',
                  marginBottom: 6,
                }}
              >
                THE LONGHAIR HORDE RISES
              </div>
              <div
                style={{
                  fontFamily: blackOps.fontFamily,
                  fontSize: 54,
                  fontWeight: 900,
                  color: '#F59E0B',
                  letterSpacing: 6,
                  textShadow: '0 0 25px rgba(245, 158, 11, 0.9)',
                }}
              >
                GUANGXI, 1851
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 6. SCENE 06: JINTIAN UPRISING FLAG RAISING (Flag Banner)
// Vibrant golden silk swallowtail banner, glowing mountain ridge, cheering spears.
// =========================================================================
export const JintianUprisingFlagStage: React.FC = () => {
  const frame = useCurrentFrame();
  const spearCheer = Math.sin(frame * 0.15) * 4;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <FireHorizonBacklight cx={540} cy={1280} rx={500} ry={280} intensity={0.85} />

        {/* Karst Limestone Mountain Peaks of Guangxi in Warm Silhouette */}
        <path
          d="M 60 1380 L 140 1040 L 220 1380 L 320 1100 L 410 1380 L 720 1070 L 820 1380 L 980 1120 L 1080 1380 L 1080 1480 L 0 1480 Z"
          fill="#231720"
          stroke="#422536"
          strokeWidth="2.5"
        />

        {/* Central Tall Timber Flagpole */}
        <line x1="520" y1="870" x2="520" y2="1445" stroke="#8C6245" strokeWidth="10" />

        {/* Waving Triangular Taiping War Banner (Bright Crimson & Gold) */}
        <g transform="translate(525, 890)" filter="drop-shadow(0 0 16px rgba(239, 68, 68, 0.5))">
          <path
            d={`M 0 0 L 300 ${30 + Math.sin(frame * 0.2) * 16} L 240 125 L 310 200 L 0 150 Z`}
            fill="#EF4444"
            stroke="#F59E0B"
            strokeWidth="6"
          />
          {/* Flame Border Trims */}
          <polygon
            points={`300,${30 + Math.sin(frame * 0.2) * 16} 330,42 310,68`}
            fill="#FBBF24"
          />
          {/* Center Seal character "太平" (Taiping) emblem */}
          <circle cx="120" cy="75" r="32" fill="#FBBF24" />
          <circle cx="120" cy="75" r="26" fill="#EF4444" />
        </g>

        {/* Crowd of Taiping Insurgents cheering with spears around the pole */}
        <g transform="translate(180, 1250)">
          {[0, 60, 130, 210, 480, 560, 640, 710].map((x, idx) => (
            <g key={x} transform={`translate(${x}, ${((idx % 2 === 0 ? spearCheer : -spearCheer))})`}>
              {/* Spear Shaft & Gleaming Silver Head */}
              <line x1="20" y1="-80" x2="20" y2="150" stroke="#64748B" strokeWidth="4.5" />
              <polygon points="15,-80 25,-80 20,-110" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
              <circle cx="20" cy="-75" r="6" fill="#FF3B30" />
              {/* Rebel Head with Red Headband */}
              <circle cx="20" cy="30" r="18" fill="#141922" stroke="#2D3748" strokeWidth="2" />
              <rect x="9" y="25" width="22" height="7" fill="#FF3B30" />
              <rect x="7" y="46" width="26" height="85" fill="#141922" stroke="#2D3748" strokeWidth="1.5" />
            </g>
          ))}
        </g>

        <line x1="0" y1="1445" x2="1080" y2="1445" stroke="#382E3A" strokeWidth="4" />
      </svg>
    </div>
  );
};

// =========================================================================
// 7. SCENE 07: MILLION-MAN MARCH & TALLY (Crowd Tally)
// High-visibility counter card, glowing red border, endless ranks marching.
// =========================================================================
export const MillionManMarchTallyStage: React.FC = () => {
  const frame = useCurrentFrame();
  const marchStep = (frame * 1.8) % 80;
  const countVal = Math.floor(
    interpolate(frame, [0, 90], [10000, 1000000], {
      extrapolateRight: 'clamp',
    })
  );

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <FireHorizonBacklight cx={540} cy={1330} rx={520} ry={270} intensity={0.9} />

        {/* Mountain Horizon in Warm Wine Red */}
        <path
          d="M 0 1330 Q 240 1260 480 1300 T 960 1270 L 1080 1300 L 1080 1500 L 0 1500 Z"
          fill="#25161E"
          stroke="#472230"
          strokeWidth="2.5"
        />

        {/* Endless Spear Rows in Parallax */}
        <g opacity="0.6" transform={`translate(${-marchStep * 0.5}, 1240)`}>
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={`spear_back_${i}`}
              x1={i * 50}
              y1="-60"
              x2={i * 50 - 15}
              y2="120"
              stroke="#64748B"
              strokeWidth="3.5"
            />
          ))}
        </g>

        {/* Midground Marching Rank */}
        <g transform={`translate(${-marchStep}, 1280)`}>
          {Array.from({ length: 16 }).map((_, i) => (
            <g key={`rebel_mid_${i}`} transform={`translate(${i * 85}, 0)`}>
              <line x1="25" y1="-80" x2="25" y2="120" stroke="#94A3B8" strokeWidth="4.5" />
              <polygon points="21,-80 29,-80 25,-108" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
              <circle cx="20" cy="10" r="18" fill="#141922" stroke="#2D3748" strokeWidth="2" />
              <rect x="9" y="7" width="22" height="6" fill="#FF3B30" />
              <rect x="7" y="26" width="26" height="95" fill="#141922" stroke="#2D3748" strokeWidth="1.5" />
            </g>
          ))}
        </g>

        {/* High-Impact Parametric Integer Counter Plaque */}
        <g transform="translate(540, 1020)" filter="drop-shadow(0 0 24px rgba(239, 68, 68, 0.6))">
          {/* Card Slate with High-Contrast Border */}
          <rect
            x="-280"
            y="-65"
            width="560"
            height="120"
            rx="14"
            fill="#12161F"
            stroke="#EF4444"
            strokeWidth="4"
          />
          {/* Subheader */}
          <text
            x="0"
            y="-22"
            textAnchor="middle"
            fill="#CBD5E1"
            fontFamily={montserrat.fontFamily}
            fontSize="22"
            fontWeight="800"
            letterSpacing="4"
          >
            ACTIVE TAIPING ARMY STRENGTH
          </text>
          {/* Animated Integer Counter */}
          <text
            x="0"
            y="36"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily={blackOps.fontFamily}
            fontSize="56"
            letterSpacing="3"
          >
            {countVal.toLocaleString()}
          </text>
        </g>

        <line x1="0" y1="1445" x2="1080" y2="1445" stroke="#382E3A" strokeWidth="4" />
      </svg>
    </div>
  );
};

// =========================================================================
// 8. SCENE 08: TACTICAL ADVANCE MAP (Vector Map)
// High-contrast tactical grid, bright cyan Yangtze river, glowing red advance arrows.
// =========================================================================
export const TaipingCampaignTacticalMap: React.FC = () => {
  const frame = useCurrentFrame();
  const vectorProgress = interpolate(frame, [0, 80], [0, 1], { extrapolateRight: 'clamp' });
  const beaconPulse = 1 + Math.sin(frame * 0.2) * 0.2;

  const nodes = [
    { name: 'JINTIAN (1851)', x: 260, y: 1360 },
    { name: 'CHANGSHA', x: 410, y: 1240 },
    { name: 'WUCHANG (1852)', x: 580, y: 1140 },
    { name: 'NANJING (1853)', x: 800, y: 1040 },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Tactical Grid with High Legibility */}
        <g opacity="0.3">
          {[900, 1000, 1100, 1200, 1300, 1400].map((y) => (
            <line key={`grid_y_${y}`} x1="80" y1={y} x2="1000" y2={y} stroke="#38BDF8" strokeWidth="2" />
          ))}
          {[160, 320, 480, 640, 800, 960].map((x) => (
            <line key={`grid_x_${x}`} x1={x} y1="880" x2={x} y2="1445" stroke="#38BDF8" strokeWidth="2" />
          ))}
        </g>

        {/* Yangtze River Path (Vibrant Cyan Water Vector) */}
        <path
          d="M 220 1420 Q 380 1280 560 1160 T 820 1020 Q 940 980 1020 960"
          fill="none"
          stroke="#0284C7"
          strokeWidth="14"
          strokeLinecap="round"
          filter="drop-shadow(0 0 8px #0284C7)"
        />

        {/* Glowing Crimson Taiping Advance Vector Line */}
        <path
          d="M 260 1360 L 410 1240 L 580 1140 L 800 1040"
          fill="none"
          stroke="#FF3B30"
          strokeWidth="8"
          strokeDasharray="600"
          strokeDashoffset={600 * (1 - vectorProgress)}
          filter="drop-shadow(0 0 10px #FF3B30)"
        />

        {/* Campaign Waypoint Nodes */}
        {nodes.map((node, i) => (
          <g key={node.name} transform={`translate(${node.x}, ${node.y})`}>
            {/* Pulsing Beacon Ring */}
            <circle
              cx="0"
              cy="0"
              r={18 * (i === 3 ? beaconPulse : 1)}
              fill="none"
              stroke={i === 3 ? '#FF3B30' : '#F59E0B'}
              strokeWidth="3.5"
            />
            <circle cx="0" cy="0" r="9" fill={i === 3 ? '#FF3B30' : '#F59E0B'} />
            {/* Tactical Label with High Contrast */}
            <rect
              x={i === 3 ? -130 : 20}
              y="-16"
              width="150"
              height="30"
              rx="6"
              fill="#0F172A"
              stroke="#475569"
              strokeWidth="2"
            />
            <text
              x={i === 3 ? -55 : 95}
              y="5"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily={barlow.fontFamily}
              fontSize="18"
              fontWeight="800"
              letterSpacing="1"
            >
              {node.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// =========================================================================
// 9. SCENE 09: YANGTZE WAR JUNKS ARMADA (Vehicle in Transit)
// Distinct timber hulls, vibrant battened sails, warm glowing lanterns on river.
// =========================================================================
export const YangtzeWarJunksFleet: React.FC = () => {
  const frame = useCurrentFrame();
  const junkBob1 = Math.sin(frame * 0.14) * 6;
  const junkBob2 = Math.cos(frame * 0.12) * 8;
  const wavePan = (frame * 3.5) % 180;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <FireHorizonBacklight cx={540} cy={1200} rx={500} ry={260} intensity={0.7} />

        {/* Yangtze Gorge Cliffs Silhouette */}
        <path
          d="M 0 920 L 200 1200 L 0 1340 Z"
          fill="#1C1822"
          stroke="#382E3E"
          strokeWidth="3"
        />
        <path
          d="M 1080 880 L 880 1180 L 1080 1320 Z"
          fill="#1C1822"
          stroke="#382E3E"
          strokeWidth="3"
        />

        {/* River Waters Gradient & Waves */}
        <rect x="0" y="1220" width="1080" height="260" fill="#0C1E30" />
        <g opacity="0.5" transform={`translate(${-wavePan}, 1240)`}>
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={`wave_${i}`}
              d={`M ${i * 120} 0 Q ${i * 120 + 60} 20 ${i * 120 + 120} 0`}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="3.5"
            />
          ))}
        </g>

        {/* PRIMARY WAR JUNK (Center-Right) */}
        <g transform={`translate(460, ${1110 + junkBob1})`} filter="drop-shadow(0 0 16px rgba(0,0,0,0.8))">
          {/* Wooden Hull */}
          <path
            d="M 0 90 Q 150 140 330 80 L 310 38 L 20 48 Z"
            fill="#3D2517"
            stroke="#6B4129"
            strokeWidth="3.5"
          />
          {/* Main Mast */}
          <line x1="160" y1="50" x2="160" y2="-130" stroke="#78350F" strokeWidth="8" />
          {/* Battened Ribbed Sail */}
          <path
            d="M 160 -120 L 270 -80 L 260 40 L 160 30 Z"
            fill="#B45309"
            stroke="#F59E0B"
            strokeWidth="3"
          />
          {/* Bamboo Battens */}
          {[-80, -40, -2, 20].map((sy) => (
            <line key={sy} x1="160" y1={sy} x2="265" y2={sy + 35} stroke="#FDE047" strokeWidth="3" />
          ))}
          {/* Taiping Red Pennant */}
          <polygon points="160,-130 110,-142 160,-154" fill="#EF4444" stroke="#FEF08A" strokeWidth="1.5" />
          {/* Glowing Lantern */}
          <circle cx="45" cy="65" r="7" fill="#FEF08A" filter="drop-shadow(0 0 8px #F59E0B)" />
        </g>

        {/* SECONDARY WAR JUNK (Distant Left) */}
        <g transform={`translate(160, ${1160 + junkBob2}) scale(0.65)`}>
          <path d="M 0 90 Q 150 140 320 80 L 300 40 L 20 50 Z" fill="#2E1B10" stroke="#542E1B" strokeWidth="3" />
          <line x1="160" y1="50" x2="160" y2="-120" stroke="#5A2E12" strokeWidth="7" />
          <path d="M 160 -110 L 260 -70 L 250 40 L 160 30 Z" fill="#78350F" stroke="#D97706" strokeWidth="2.5" />
          <polygon points="160,-120 120,-130 160,-140" fill="#EF4444" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 10. SCENE 10: NANJING CITY GATE FALLS (Structural Fracture)
// Stone masonry crenellations, blazing golden-orange fire roaring from the gate.
// =========================================================================
export const NanjingGateBreachedStage: React.FC = () => {
  const frame = useCurrentFrame();
  const flameDance = Math.sin(frame * 0.25) * 14;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <FireHorizonBacklight cx={540} cy={1250} rx={500} ry={280} intensity={0.95} />

        {/* Massive Stone City Ramparts with High Visibility */}
        <rect x="140" y="1030" width="800" height="415" fill="#242C38" stroke="#3D4B5E" strokeWidth="4" />
        {/* Wall Crenellations */}
        {[140, 240, 340, 440, 540, 640, 740, 840].map((cx) => (
          <rect key={cx} x={cx} y="990" width="60" height="40" fill="#242C38" stroke="#3D4B5E" strokeWidth="3" />
        ))}

        {/* Arched Gate Tunnel */}
        <path
          d="M 420 1445 L 420 1190 Q 540 1130 660 1190 L 660 1445 Z"
          fill="#0C0E14"
        />

        {/* Splintered Burning Wooden Doors */}
        <g transform="translate(420, 1190)">
          <polygon points="0,0 80,30 60,250 0,250" fill="#5A2E12" stroke="#8C471C" strokeWidth="3" />
          <polygon points="240,0 160,40 180,250 240,250" fill="#5A2E12" stroke="#8C471C" strokeWidth="3" />
        </g>

        {/* Roaring Blazing Fire Pouring Out of Archway */}
        <g filter="drop-shadow(0 0 20px #FF5A36)">
          <ellipse cx="540" cy="1310" rx={90 + flameDance} ry={100} fill="#EF4444" />
          <ellipse cx="540" cy="1300" rx={60} ry={80} fill="#F59E0B" />
          <ellipse cx="540" cy="1290" rx={35} ry={50} fill="#FEF08A" />
        </g>

        {/* Planted Taiping Flag atop the Parapet */}
        <g transform="translate(680, 930)">
          <line x1="0" y1="0" x2="0" y2="70" stroke="#94A3B8" strokeWidth="5" />
          <polygon points="0,0 95,15 75,40 0,35" fill="#EF4444" stroke="#FBBF24" strokeWidth="2.5" />
        </g>

        <line x1="80" y1="1445" x2="1000" y2="1445" stroke="#334155" strokeWidth="5" />
      </svg>
    </div>
  );
};

// =========================================================================
// 11. SCENE 11: HEAVENLY CAPITAL & THEOCRATIC THRONE (Lone Leader)
// Crimson palace columns, radiant golden sunburst canopy, imperial yellow dragon robe.
// =========================================================================
export const HeavenlyCapitalThroneStage: React.FC = () => {
  const frame = useCurrentFrame();
  const crownShimmer = 1 + Math.sin(frame * 0.18) * 0.1;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Vibrant Crimson Palace Pillars */}
        <rect x="180" y="890" width="50" height="555" fill="#991B1B" stroke="#DC2626" strokeWidth="3" />
        <rect x="850" y="890" width="50" height="555" fill="#991B1B" stroke="#DC2626" strokeWidth="3" />

        {/* Intricate Imperial Throne Canopy Arch */}
        <path
          d="M 320 1445 L 320 1000 Q 540 920 760 1000 L 760 1445 Z"
          fill="#1C1420"
          stroke="#F59E0B"
          strokeWidth="4"
        />

        {/* Golden Sunburst Halo behind Throne */}
        <circle cx="540" cy="1070" r="130" fill="#FEF08A" opacity={0.4 * crownShimmer} filter="drop-shadow(0 0 20px #F59E0B)" />

        {/* Hong Xiuquan Enthroned (Wearing Radiant Imperial Yellow & Gold Accents) */}
        <g transform="translate(430, 1000)">
          {/* High Ornate Taiping Imperial Crown with Pearl Strings */}
          <polygon points="80,50 140,50 155,10 110,28 65,10" fill="#F59E0B" stroke="#FEF08A" strokeWidth="3" />
          <circle cx="110" cy="80" r="32" fill="#141922" stroke="#2D3748" strokeWidth="2.5" />

          {/* Majestic Enthroned Body in Wide Imperial Sleeves */}
          <path
            d="M 25 200 L 75 120 L 145 120 L 195 200 L 225 385 L -5 385 Z"
            fill="#181E29"
            stroke="#384353"
            strokeWidth="3"
          />
          {/* Luminous Golden Dragon Breastplate Insignia */}
          <circle cx="110" cy="180" r="32" fill="#F59E0B" stroke="#FEF08A" strokeWidth="3" />
          <circle cx="110" cy="180" r="18" fill="#181E29" stroke="#FEF08A" strokeWidth="2" />

          {/* Hands Resting on Knees */}
          <circle cx="40" cy="220" r="14" fill="#141922" stroke="#2D3748" strokeWidth="2" />
          <circle cx="180" cy="220" r="14" fill="#141922" stroke="#2D3748" strokeWidth="2" />
        </g>

        {/* Dais Steps */}
        <polygon points="260,1400 820,1400 860,1445 220,1445" fill="#2E1C28" stroke="#5A344E" strokeWidth="3" />
      </svg>
    </div>
  );
};

// =========================================================================
// 12. SCENE 12: SACRED LAND TREASURY DECREE (Document Card)
// Carved granite stele tablet, bright vermilion chop, crisp glowing law text.
// =========================================================================
export const SacredTreasuryProclamationStage: React.FC = () => {
  const frame = useCurrentFrame();
  const sealGlow = 1 + Math.sin(frame * 0.22) * 0.12;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Stone Stele Tablet (Tianchao Tianmu Zhidu) */}
        <g transform="translate(240, 910)" filter="drop-shadow(0 0 24px rgba(0,0,0,0.85))">
          {/* Rounded Head Stone Plinth */}
          <path
            d="M 60 80 Q 300 -20 540 80 L 540 535 L 60 535 Z"
            fill="#232A35"
            stroke="#475569"
            strokeWidth="5"
          />

          {/* Stele Header Carving */}
          <rect x="130" y="85" width="340" height="46" rx="6" fill="#0F172A" stroke="#64748B" strokeWidth="2.5" />
          <text
            x="300"
            y="116"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily={montserrat.fontFamily}
            fontSize="19"
            fontWeight="800"
            letterSpacing="3"
          >
            SACRED TREASURY DECREE
          </text>

          {/* Stone Inscription Lines */}
          {[160, 205, 250, 295, 340].map((ly) => (
            <line
              key={ly}
              x1="120"
              y1={ly}
              x2="480"
              y2={ly}
              stroke="#94A3B8"
              strokeWidth="3.5"
              strokeDasharray="20 12 34 10"
            />
          ))}

          {/* Massive Vermilion Taiping Imperial Seal */}
          <g transform="translate(245, 395)" filter="drop-shadow(0 0 16px rgba(239, 68, 68, 0.6))">
            <rect
              x="0"
              y="0"
              width="110"
              height="110"
              rx="8"
              fill="#EF4444"
              opacity={0.95 * sealGlow}
              stroke="#FDE047"
              strokeWidth="3"
            />
            {/* Square Seal Script Pattern */}
            <rect x="12" y="12" width="86" height="86" fill="none" stroke="#FFFFFF" strokeWidth="3" />
            <line x1="55" y1="12" x2="55" y2="98" stroke="#FFFFFF" strokeWidth="3" />
            <line x1="12" y1="55" x2="98" y2="55" stroke="#FFFFFF" strokeWidth="3" />
          </g>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 13. SCENE 13: THE TIANJING INCIDENT PURGE (Split Confrontation - DROP BEAT)
// Intense crimson alert backlight, swinging amber lantern, gleaming slashing saber.
// =========================================================================
export const TianjingIncidentPurgeStage: React.FC = () => {
  const frame = useCurrentFrame();
  const lanternSwing = Math.sin(frame * 0.28) * 22;
  const swordSlash = interpolate(frame, [0, 25], [-30, 25], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Intense Blood-Red Alert Horizon Flare */}
        <FireHorizonBacklight cx={540} cy={1280} rx={520} ry={300} intensity={0.95} />

        {/* Palace Corridor Wooden Grille Partitions */}
        <g opacity="0.45">
          <line x1="120" y1="880" x2="120" y2="1445" stroke="#991B1B" strokeWidth="5" />
          <line x1="260" y1="880" x2="260" y2="1445" stroke="#991B1B" strokeWidth="5" />
          <line x1="820" y1="880" x2="820" y2="1445" stroke="#991B1B" strokeWidth="5" />
          <line x1="960" y1="880" x2="960" y2="1445" stroke="#991B1B" strokeWidth="5" />
        </g>

        {/* Swinging Palace Lantern from Ceiling */}
        <g transform="translate(540, 880)">
          <line x1="0" y1="0" x2={lanternSwing} y2="130" stroke="#78350F" strokeWidth="4" />
          <g transform={`translate(${lanternSwing}, 130)`} filter="drop-shadow(0 0 16px #F59E0B)">
            <polygon points="-28,0 28,0 20,60 -20,60" fill="#EF4444" stroke="#FEF08A" strokeWidth="2.5" />
            <circle cx="0" cy="30" r="16" fill="#FEF08A" />
          </g>
        </g>

        {/* LEFT: Assassin Commander with Raised Saber (High Contrast Navy Silhouette) */}
        <g transform="translate(240, 1040)" filter="drop-shadow(0 0 14px rgba(255, 80, 80, 0.4))">
          <path d="M 40 120 L 110 100 L 130 280 L 20 280 Z" fill="#141922" stroke="#2D3748" strokeWidth="2.5" />
          <circle cx="85" cy="75" r="30" fill="#141922" stroke="#2D3748" strokeWidth="2" />
          {/* Raised Arm & Slashing Broadsword */}
          <path
            d={`M 100 110 L 180 80 L 240 ${30 + swordSlash}`}
            stroke="#181E29"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          {/* Gleaming Razor Blade */}
          <path
            d={`M 240 ${30 + swordSlash} L 330 ${-10 + swordSlash} L 290 ${45 + swordSlash} Z`}
            fill="#FFFFFF"
            stroke="#EF4444"
            strokeWidth="3"
            filter="drop-shadow(0 0 8px #FFFFFF)"
          />
        </g>

        {/* RIGHT: Falling Eastern King Silhouette amidst Bright Blood Droplets */}
        <g transform="translate(640, 1090)">
          <path
            d="M 60 140 L 120 180 L 160 270 L 40 270 Z"
            fill="#181E29"
            stroke="#384353"
            strokeWidth="2.5"
          />
          <circle cx="50" cy="120" r="28" fill="#141922" stroke="#2D3748" strokeWidth="2" />
          {/* Bright Crimson Blood Splatter Droplets */}
          <circle cx="12" cy="110" r="10" fill="#FF0000" filter="drop-shadow(0 0 6px #FF0000)" />
          <circle cx="-10" cy="90" r="7" fill="#FF0000" />
          <circle cx="20" cy="80" r="8" fill="#FF0000" />
        </g>

        <line x1="80" y1="1445" x2="1000" y2="1445" stroke="#382E3A" strokeWidth="4" />
      </svg>
    </div>
  );
};

// =========================================================================
// 14. SCENE 14: ZENG GUOFAN XIANG ARMY SIEGE (Vector Map)
// High-visibility fortress citadel, bright glowing concentric siege rings.
// =========================================================================
export const XiangArmySiegeEncirclementMap: React.FC = () => {
  const frame = useCurrentFrame();
  const ringContract = interpolate(frame, [0, 90], [180, 110], { extrapolateRight: 'clamp' });
  const pulse = 1 + Math.sin(frame * 0.24) * 0.08;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Yangtze River Waterline */}
        <path
          d="M 120 980 Q 420 1060 620 1020 T 960 960"
          fill="none"
          stroke="#0284C7"
          strokeWidth="16"
          filter="drop-shadow(0 0 8px #0284C7)"
        />

        {/* CENTER: Nanjing Fortress Citadel */}
        <g transform="translate(540, 1180)">
          {/* City Walls Polyline */}
          <polygon
            points="-75,-65 75,-65 90,65 -90,65"
            fill="#1E293B"
            stroke="#CBD5E1"
            strokeWidth="4"
          />
          <text
            x="0"
            y="7"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily={montserrat.fontFamily}
            fontSize="20"
            fontWeight="800"
            letterSpacing="2"
          >
            TIANJING
          </text>

          {/* Enclosing Concentric Xiang Army Siege Rings */}
          <ellipse
            cx="0"
            cy="0"
            rx={ringContract * 1.5 * pulse}
            ry={ringContract * pulse}
            fill="none"
            stroke="#EF4444"
            strokeWidth="5"
            strokeDasharray="16 10"
            filter="drop-shadow(0 0 10px #EF4444)"
          />
          <ellipse
            cx="0"
            cy="0"
            rx={(ringContract + 70) * 1.5}
            ry={ringContract + 70}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="3.5"
            strokeDasharray="12 8"
          />

          {/* Inward Facing Attack Vectors */}
          {[-140, -40, 40, 140].map((deg) => (
            <g key={deg} transform={`rotate(${deg}) translate(${ringContract * 1.6}, 0)`}>
              <line x1="45" y1="0" x2="0" y2="0" stroke="#F59E0B" strokeWidth="5" />
              <polygon points="0,0 14,-7 14,7" fill="#F59E0B" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 15. SCENE 15: STARVATION IN THE CAPITAL (Lone Leader)
// Gaunt defender on parapet, deep red atmospheric sunset, empty bowl.
// =========================================================================
export const StarvationInCapitalStage: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <FireHorizonBacklight cx={540} cy={1340} rx={480} ry={250} intensity={0.8} />

        {/* Barren Silhouetted Dead Tree */}
        <g transform="translate(180, 1130)">
          <path d="M 40 280 L 50 140 L 10 90 M 50 140 L 90 70 M 50 180 L 110 150" stroke="#25161E" strokeWidth="8" fill="none" />
        </g>

        {/* Crumbling Brick Parapet with Clear Masonry Line */}
        <path
          d="M 120 1340 L 480 1340 L 520 1380 L 960 1380 L 960 1480 L 120 1480 Z"
          fill="#232A35"
          stroke="#3E4C5E"
          strokeWidth="3.5"
        />

        {/* Emaciated Defender Silhouette */}
        <g transform="translate(520, 1070)" filter="drop-shadow(0 0 14px rgba(239, 68, 68, 0.4))">
          {/* Spear Shaft & Head */}
          <line x1="120" y1="-60" x2="120" y2="340" stroke="#64748B" strokeWidth="4.5" />
          <polygon points="116,-60 124,-60 120,-90" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Gaunt Hunched Body */}
          <path
            d="M 40 140 Q 20 100 65 70 Q 110 40 140 70 Q 160 110 145 260 L 25 260 Z"
            fill="#141922"
            stroke="#2D3748"
            strokeWidth="2.5"
          />
          <circle cx="105" cy="55" r="24" fill="#141922" stroke="#2D3748" strokeWidth="2" />
          {/* Tattered Red Headband */}
          <rect x="83" y="47" width="44" height="8" fill="#FF3B30" stroke="#FEF08A" strokeWidth="1" />

          {/* Hand holding empty clay bowl */}
          <path d="M 60 130 L 10 145" stroke="#181E29" strokeWidth="14" strokeLinecap="round" />
          <ellipse cx="5" cy="145" rx="18" ry="8" fill="#78350F" stroke="#B45309" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 16. SCENE 16: DEATH OF THE HEAVENLY KING (Lone Leader)
// Luminous tall wax candles, golden crown on bier, glowing royal dais.
// =========================================================================
export const HongXiuquanDeathBierStage: React.FC = () => {
  const frame = useCurrentFrame();
  const candleFlicker1 = 1 + Math.sin(frame * 0.3) * 0.15;
  const candleFlicker2 = 1 + Math.cos(frame * 0.27) * 0.15;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <FireHorizonBacklight cx={540} cy={1220} rx={480} ry={260} intensity={0.75} />

        {/* Tall Wax Funeral Candles Flanking the Bier */}
        <g transform="translate(240, 1130)" filter="drop-shadow(0 0 12px #F59E0B)">
          <rect x="0" y="40" width="18" height="190" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          <line x1="9" y1="40" x2="9" y2="18" stroke="#000000" strokeWidth="2.5" />
          <ellipse cx="9" cy="10" rx="8" ry="18" fill="#FEF08A" opacity={candleFlicker1} />
        </g>

        <g transform="translate(824, 1130)" filter="drop-shadow(0 0 12px #F59E0B)">
          <rect x="0" y="40" width="18" height="190" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          <line x1="9" y1="40" x2="9" y2="18" stroke="#000000" strokeWidth="2.5" />
          <ellipse cx="9" cy="10" rx="8" ry="18" fill="#FEF08A" opacity={candleFlicker2} />
        </g>

        {/* Raised Stone Funeral Sarcophagus / Bier */}
        <g transform="translate(320, 1220)" filter="drop-shadow(0 0 16px rgba(0,0,0,0.85))">
          <rect x="0" y="40" width="440" height="120" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="3.5" />
          {/* Shrouded Body Profile of the Prophet */}
          <path
            d="M 30 40 Q 80 10 130 15 Q 240 25 410 40 Z"
            fill="#0F172A"
            stroke="#334155"
            strokeWidth="2.5"
          />
          {/* Golden Imperial Taiping Crown placed atop the bier */}
          <polygon points="50,15 95,15 100,-12 72,0 45,-12" fill="#F59E0B" stroke="#FEF08A" strokeWidth="2.5" filter="drop-shadow(0 0 8px #F59E0B)" />
        </g>

        {/* Stepped Plinth */}
        <line x1="160" y1="1400" x2="920" y2="1400" stroke="#334155" strokeWidth="5" />
      </svg>
    </div>
  );
};

// =========================================================================
// 17. SCENE 17: GUNPOWDER TUNNEL MINE BLAST (Structural Fracture)
// Blinding white-hot core, volcanic fiery fireball, flying stone rampart blocks.
// =========================================================================
export const GunpowderTunnelMineExplosion: React.FC = () => {
  const frame = useCurrentFrame();
  const blastScale = interpolate(frame, [0, 45], [0.3, 1.4], { extrapolateRight: 'clamp' });
  const rubbleFly = interpolate(frame, [0, 60], [0, 240], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Enormous Fiery Explosion Shockwave */}
        <g transform={`translate(540, 1260) scale(${blastScale})`} filter="drop-shadow(0 0 30px #FF5A36)">
          <circle cx="0" cy="0" r="190" fill="#EF4444" opacity="0.85" />
          <circle cx="0" cy="0" r="140" fill="#F59E0B" opacity="0.95" />
          <circle cx="0" cy="0" r="80" fill="#FFFFFF" />
          {/* Starburst Detonation Spikes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <polygon
              key={deg}
              points="0,-190 24,-110 -24,-110"
              fill="#FEF08A"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* Flying Fractured Stone Rampart Blocks with Clear Outline */}
        <g transform={`translate(540, 1260)`}>
          <rect
            x={-180 - rubbleFly * 0.8}
            y={-140 - rubbleFly}
            width="65"
            height="50"
            fill="#1E293B"
            stroke="#94A3B8"
            strokeWidth="3"
            transform={`rotate(${frame * 3})`}
          />
          <rect
            x={140 + rubbleFly * 0.9}
            y={-160 - rubbleFly * 1.1}
            width="80"
            height="55"
            fill="#1E293B"
            stroke="#94A3B8"
            strokeWidth="3"
            transform={`rotate(${-frame * 4})`}
          />
        </g>

        {/* Broken Wall Edges Flanking the Breach */}
        <path d="M 0 1140 L 280 1180 L 320 1445 L 0 1445 Z" fill="#242C38" stroke="#475569" strokeWidth="5" />
        <path d="M 1080 1140 L 800 1180 L 760 1445 L 1080 1445 Z" fill="#242C38" stroke="#475569" strokeWidth="5" />
      </svg>
    </div>
  );
};

// =========================================================================
// 18. SCENE 18: BREACH MELEE & SLAUGHTER (Silhouette Action)
// Fixed bayonets and clashing sabers highlighted against fiery horizon.
// =========================================================================
export const BreachMeleeSlaughterStage: React.FC = () => {
  const frame = useCurrentFrame();
  const chargeL = interpolate(frame, [0, 60], [-80, 0], { extrapolateRight: 'clamp' });
  const fireFlicker = Math.sin(frame * 0.32) * 6;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <FireHorizonBacklight cx={540} cy={1330} rx={500} ry={270} intensity={0.9} />

        {/* Smoldering Breach Ground with Billowing Ash */}
        <g opacity="0.45">
          <circle cx={480 + fireFlicker} cy={1240} r="65" fill="#4A1820" />
          <circle cx={560 - fireFlicker} cy={1220} r="55" fill="#4A1820" />
        </g>

        {/* LEFT: Charging Xiang Army Imperial Troops with Fixed Bayonets */}
        <g transform={`translate(${220 + chargeL}, 1070)`} filter="drop-shadow(0 0 12px rgba(255, 120, 60, 0.4))">
          <polygon points="120,40 150,-10 180,40" fill="#181E29" stroke="#384353" strokeWidth="2.5" />
          <circle cx="150" cy="65" r="26" fill="#141922" stroke="#2D3748" strokeWidth="2" />
          {/* Musket and Polished Silver Bayonet */}
          <path d="M 120 90 L 175 90 L 190 260 L 100 260 Z" fill="#141922" stroke="#2D3748" strokeWidth="2" />
          <line x1="140" y1="110" x2="310" y2="100" stroke="#64748B" strokeWidth="7" />
          <polygon points="310,96 360,94 310,104" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" filter="drop-shadow(0 0 6px #FFFFFF)" />
        </g>

        {/* RIGHT: Desperate Taiping Longhair Defender with Dual Dao Sabers */}
        <g transform="translate(620, 1060)" filter="drop-shadow(0 0 14px rgba(239, 68, 68, 0.4))">
          {/* Long Hair & Red Headband */}
          <path d="M 140 70 Q 90 90 60 170 Q 120 120 140 100 Z" fill="#0F141C" stroke="#2A3441" strokeWidth="2.5" />
          <circle cx="150" cy="65" r="26" fill="#141922" stroke="#2D3748" strokeWidth="2" />
          <rect x="128" y="56" width="44" height="11" fill="#FF3B30" stroke="#FEF08A" strokeWidth="1" />
          {/* Clashing Raised Dao Saber */}
          <path d="M 120 90 L 175 90 L 190 260 L 100 260 Z" fill="#141922" stroke="#2D3748" strokeWidth="2" />
          <line x1="130" y1="100" x2="30" y2="80" stroke="#FFFFFF" strokeWidth="6" />
          <polygon points="30,80 -15,70 20,95" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" filter="drop-shadow(0 0 6px #FFFFFF)" />
        </g>

        <line x1="80" y1="1445" x2="1000" y2="1445" stroke="#382E3A" strokeWidth="4" />
      </svg>
    </div>
  );
};

// =========================================================================
// 19. SCENE 19: 30 MILLION CASUALTIES TALLY (Crowd Tally)
// High-visibility counter card, glowing blood-red border, sea of burial mounds.
// =========================================================================
export const ThirtyMillionCasualtyTallyStage: React.FC = () => {
  const frame = useCurrentFrame();
  const deathCount = Math.floor(
    interpolate(frame, [0, 90], [5000000, 30000000], {
      extrapolateRight: 'clamp',
    })
  );

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <FireHorizonBacklight cx={540} cy={1340} rx={520} ry={270} intensity={0.85} />

        {/* Sea of Burial Mounds & Grave Markers with Clear Shapes */}
        <g opacity="0.75">
          {[120, 260, 420, 600, 780, 940].map((gx, idx) => (
            <g key={gx} transform={`translate(${gx}, 1360)`}>
              <ellipse cx="0" cy="20" rx="60" ry="18" fill="#251620" stroke="#422536" strokeWidth="2" />
              <line x1="0" y1="20" x2="0" y2="-30" stroke="#64748B" strokeWidth="4" />
              <line x1="-14" y1="-12" x2="14" y2="-12" stroke="#64748B" strokeWidth="3.5" />
            </g>
          ))}
        </g>

        {/* High-Impact Casualty Counter Slate */}
        <g transform="translate(540, 1020)" filter="drop-shadow(0 0 28px rgba(239, 68, 68, 0.7))">
          <rect
            x="-290"
            y="-65"
            width="580"
            height="125"
            rx="14"
            fill="#12161F"
            stroke="#EF4444"
            strokeWidth="4"
          />
          <text
            x="0"
            y="-22"
            textAnchor="middle"
            fill="#CBD5E1"
            fontFamily={montserrat.fontFamily}
            fontSize="22"
            fontWeight="800"
            letterSpacing="4"
          >
            TOTAL ESTIMATED CASUALTIES
          </text>
          <text
            x="0"
            y="38"
            textAnchor="middle"
            fill="#EF4444"
            fontFamily={blackOps.fontFamily}
            fontSize="58"
            letterSpacing="2"
          >
            {deathCount.toLocaleString()}
          </text>
        </g>

        <line x1="0" y1="1445" x2="1080" y2="1445" stroke="#382E3A" strokeWidth="4" />
      </svg>
    </div>
  );
};

// =========================================================================
// 20. SCENE 20: SHATTERED EMPIRE EPILOGUE (Split Confrontation / Memorial)
// Cracked bronze imperial seal, burnished gold trim, bright memorial plinth.
// =========================================================================
export const ShatteredEmpireEpilogueStage: React.FC = () => {
  const frame = useCurrentFrame();
  const emberFlicker = Math.sin(frame * 0.16) * 0.1;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Warm Dying Ember Glow */}
        <circle cx="540" cy="1160" r="220" fill="url(#vibrantFireGlow)" opacity={0.6 + emberFlicker} />

        {/* Central Fractured Imperial Dragon Seal */}
        <g transform="translate(540, 1060)" filter="drop-shadow(0 0 20px rgba(0,0,0,0.85))">
          {/* Cracked Bronze Plinth Base */}
          <polygon
            points="-150,80 150,80 170,115 -170,115"
            fill="#2A1B14"
            stroke="#8C532B"
            strokeWidth="3.5"
          />
          {/* Coiled Imperial Dragon Seal with jagged fracture down the middle */}
          <g>
            {/* Left Half of Fractured Seal */}
            <path
              d="M -130 70 L -130 -45 Q -75 -95 -10 -85 L 0 -20 L -15 25 L 0 70 Z"
              fill="#2E1810"
              stroke="#D97706"
              strokeWidth="3.5"
            />
            {/* Right Half of Fractured Seal */}
            <path
              d="M 12 75 L -2 30 L 15 -15 L 5 -80 Q 75 -95 130 -45 L 130 75 Z"
              fill="#2E1810"
              stroke="#D97706"
              strokeWidth="3.5"
            />
          </g>

          {/* Jagged Lightning-like Fracture Line glowing neon red */}
          <path
            d="M 0 -90 L -15 -20 L 10 25 L 0 85"
            stroke="#FF3B30"
            strokeWidth="4"
            fill="none"
            filter="drop-shadow(0 0 6px #FF3B30)"
          />
        </g>

        {/* High-Contrast Brass Memorial Plaque below */}
        <g transform="translate(540, 1260)" filter="drop-shadow(0 0 16px rgba(245, 158, 11, 0.4))">
          <rect
            x="-250"
            y="0"
            width="500"
            height="80"
            rx="8"
            fill="#1E140C"
            stroke="#F59E0B"
            strokeWidth="3"
          />
          <text
            x="0"
            y="32"
            textAnchor="middle"
            fill="#FBBF24"
            fontFamily={montserrat.fontFamily}
            fontSize="20"
            fontWeight="800"
            letterSpacing="3"
          >
            1850 — 1864
          </text>
          <text
            x="0"
            y="58"
            textAnchor="middle"
            fill="#E2E8F0"
            fontFamily={barlow.fontFamily}
            fontSize="17"
            fontWeight="700"
            letterSpacing="1"
          >
            THE DEADLIEST CIVIL WAR IN HUMAN HISTORY
          </text>
        </g>

        <line x1="120" y1="1445" x2="960" y2="1445" stroke="#382E3A" strokeWidth="4" />
      </svg>
    </div>
  );
};
