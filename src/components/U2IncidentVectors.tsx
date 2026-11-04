import {
  SovietRadarP30Silhouette,
  S75DvinaMissileSilhouette,
  U2WreckageSverdlovskSilhouette,
  NasaFlightMapTurkeySilhouette,
  FakeNasaU2WeatherSilhouette,
  EisenhowerPortraitSilhouette,
  KremlinMoscowRedSilhouette,
  KhrushchevOfficialFullSilhouette,
  KhrushchevPortraitSilhouette,
  PowersPortraitSilhouette,
  PowersPressureSuitSilhouette,
  PowersSovietTrialSilhouette,
  RudolfAbelSilhouette,
} from '../../projects/u2-incident-1960/plates/TracedPlateAssets';
import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, staticFile, Img } from 'remotion';
import { loadFont as loadBarlowCondensed } from '@remotion/google-fonts/BarlowCondensed';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { CutoutPuppet } from './CutoutPuppet';
import { PaperSignCounter } from './TactilePropCards';
import { WavingFlagSvg } from './WavingFlagSvg';
import {
  WeatheredMilitaryStamp,
  StylizedFireball,
  createArcScallopedCloud,
  create8PointedStarPath,
} from '../kit';
import {
  createGeoProjector,
  U2_INCIDENT_GEOJSON,
  ContestedTerritoryShading,
  TacticalMovementArrow,
  PulsatingBattleMarker,
  AnimatedFrontline,
} from '../library/tactical';

const barlow = loadBarlowCondensed('normal', { weights: ['700'], subsets: ['latin'] });
const montserrat = loadMontserrat('normal', { weights: ['800', '900'], subsets: ['latin'] });
const inter = loadInter('normal', { weights: ['800', '900'], subsets: ['latin'] });

/**
 * Helper to generate authentic outward-bulging rounded cloud lobes using circular SVG arcs
 * tailored for high-altitude stratospheric detonations (adapted from tactile multi-tiered geometry).
 */
const createStratosphereBlastLobe = (
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
      Math.sin(angle * 2.5 + wobble) * 7;
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

// =========================================================================
// 1. SCENE 01: INCITING CRISIS - SHATTERED U-2 & STRATOSPHERIC EXPLOSION
// May 1, 1960 • Upper Stratosphere over Sverdlovsk (70,500 FT).
// The catastrophic detonation of the Soviet S-75 Dvina SAM proximity warhead:
// Multi-tiered scalloped fireball (deep crimson outer, blazing amber mid,
// radiant yellow inner, white-hot 8-pointed core flash), acute radiating
// supersonic flame spikes, detached flying cloudlets, expanding Mach shockwave
// rings, and the severed Dragon Lady caught in an inverted death-spin.
// Sharp Frame 0 (zero blur) for poster perfection & feed retention.
// =========================================================================
export const U2ShatteredSpinStratosphereVector: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Decaying Impact Tremor (motivated shockwave shudder on frame 0, fully settled by frame 28)
  const shakeDecay = interpolate(frame, [0, 28], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shakeX = Math.sin(frame * 4.2) * 16 * shakeDecay;
  const shakeY = Math.cos(frame * 4.8) * 12 * shakeDecay;

  // 2. Dynamic Explosive Bloom (frame 0 already blooms at 0.38, peaks at 1.34 by frame 8, then settles into boiling fireball)
  const blastScale =
    frame < 22
      ? interpolate(frame, [0, 8, 22], [0.38, 1.34, 1.05], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 1.05 + 0.03 * Math.sin(frame * 0.18);

  const coreFlash =
    frame < 16
      ? interpolate(frame, [0, 4, 16], [1.0, 1.0, 0.45], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0.3 + 0.1 * Math.sin(frame * 0.25);

  const wobble = Math.sin(Math.floor(frame / 3) * 0.25) * 6;
  const cloudletDrift = interpolate(frame, [0, 128], [0, 65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Multi-tiered scalloped cloud lobe scale profiles
  const outerScales = [1.08, 0.93, 1.12, 0.91, 1.07, 0.95, 1.14, 0.92, 1.06, 0.94, 1.1, 0.96];
  const midScales = [1.07, 0.92, 1.06, 0.94, 1.11, 0.93, 1.05, 0.91, 1.09, 0.95];
  const innerScales = [1.09, 0.94, 1.07, 0.93, 1.12, 0.95, 1.05, 0.96];

  const outerPath = createStratosphereBlastLobe(245, 12, outerScales, wobble);
  const midPath = createStratosphereBlastLobe(175, 10, midScales, -wobble);
  const innerPath = createStratosphereBlastLobe(115, 8, innerScales, wobble * 0.5);

  // Sharp radiating supersonic fire spikes (angles around the fireball)
  const spikeAngles = [0, 26, 52, 78, 104, 130, 156, 182, 208, 234, 260, 286, 312, 338];
  const spikeLengths = [370, 400, 360, 420, 375, 395, 365, 410, 370, 405, 355, 415, 375, 390];

  // Detached flying cloudlet positions drifting into the stratospheric void
  const cloudlets = [
    { x: 250, y: -210, r: 24 },
    { x: -230, y: -200, r: 26 },
    { x: 310, y: 35, r: 28 },
    { x: -300, y: 25, r: 25 },
    { x: 250, y: 210, r: 24 },
    { x: -240, y: 200, r: 27 },
    { x: 30, y: -270, r: 22 },
    { x: 40, y: 265, r: 25 },
  ];

  // Concentric Mach shockwave rings expanding through the thin stratosphere
  const shockR1 = interpolate(frame, [0, 52], [90, 620], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockAlpha1 = interpolate(frame, [0, 12, 52], [0.95, 0.65, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shockR2 = interpolate(frame, [0, 44], [60, 500], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockAlpha2 = interpolate(frame, [0, 10, 44], [0.95, 0.55, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Main Aircraft Airframe Tumbling Inverted Spin (Aspect Ratio 10.6 Glider in Death Spin)
  const planeSpinDeg = interpolate(frame, [0, 128], [0, 360 * 1.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const planeTumbleX = interpolate(frame, [0, 128], [0, -85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const planeTumbleY = interpolate(frame, [0, 128], [0, 210], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. Sliced Horizontal Stabilizer (Empennage severed, drifting back-upward along ballistic arc)
  const tailX = interpolate(frame, [0, 128], [-25, -280], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tailY = interpolate(frame, [0, 128], [15, -170], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tailRot = interpolate(frame, [0, 128], [0, -420], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 5. Sliced Outer Wingtip (Fluttering outward-downward to the right)
  const wingtipX = interpolate(frame, [0, 128], [40, 310], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wingtipY = interpolate(frame, [0, 128], [10, 230], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wingtipRot = interpolate(frame, [0, 128], [0, 460], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 6. Parallax Vertical Speed Lines (Simulating violent supersonic terminal freefall)
  const speedLineOffset = (frame * 36) % 360;

  // 7. Shrapnel Fragments (Deterministic radial expansion)
  const shrapnelProg = interpolate(frame, [0, 128], [0, 480], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 8. Tactical HUD Warning Flash Cadence
  const alertBlink = frame % 10 < 6;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        transformOrigin: 'center center',
      }}
    >
      <svg
        viewBox="0 0 1080 1920"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <defs>
          {/* Deep Stratospheric Night Sky Gradient */}
          <linearGradient id="stratosphereSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050814" />
            <stop offset="45%" stopColor="#0B1310" />
            <stop offset="85%" stopColor="#16221E" />
            <stop offset="100%" stopColor="#0A1118" />
          </linearGradient>

          {/* Curved Earth Horizon Gradient */}
          <linearGradient id="earthLimbGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0E1A29" />
            <stop offset="100%" stopColor="#040910" />
          </linearGradient>

          {/* Volumetric Blast Core Aura */}
          <radialGradient id="u2BlastCoreAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#FDE047" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#F97316" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#EF4444" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
          </radialGradient>

          {/* Red Structural Shear Spar Pattern */}
          <linearGradient id="fractureRedGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
        </defs>

        {/* PARALLAX LAYER 1: Near-Space Void & Stratospheric Stars */}
        <rect x="0" y="0" width="1080" height="1920" fill="url(#stratosphereSky)" />

        {/* Stratospheric Star Points (Crisp, sharp Frame 0 protection) */}
        {[
          { cx: 140, cy: 920, r: 2.2, phase: 0 },
          { cx: 310, cy: 870, r: 1.8, phase: 1 },
          { cx: 490, cy: 950, r: 1.6, phase: 2 },
          { cx: 680, cy: 890, r: 2.0, phase: 3 },
          { cx: 860, cy: 940, r: 1.9, phase: 4 },
          { cx: 960, cy: 880, r: 1.5, phase: 5 },
          { cx: 220, cy: 1040, r: 1.4, phase: 6 },
          { cx: 780, cy: 1060, r: 1.7, phase: 7 },
        ].map((pt, i) => {
          const starAlpha = 0.5 + Math.sin(frame * 0.08 + pt.phase) * 0.35;
          return (
            <circle
              key={i}
              cx={pt.cx}
              cy={pt.cy}
              r={pt.r}
              fill="#ECFDF5"
              opacity={starAlpha}
            />
          );
        })}

        {/* PARALLAX LAYER 2: Curved Earth Horizon with Glowing Cyan Ozone Rim */}
        <g>
          {/* Earth Curvature Silhouette */}
          <path
            d="M -120 1740 Q 540 1510 1200 1740 L 1200 1920 L -120 1920 Z"
            fill="url(#earthLimbGrad)"
          />
          {/* Cyan Atmospheric Ozone Rim */}
          <path
            d="M -120 1740 Q 540 1510 1200 1740"
            stroke="#38BDF8"
            strokeWidth={5}
            fill="none"
            opacity={0.9}
          />
          <path
            d="M -120 1740 Q 540 1510 1200 1740"
            stroke="#0284C7"
            strokeWidth={16}
            fill="none"
            opacity={0.3}
          />

          {/* Continental Silhouette of Ural Mountains & Siberian Steppe below */}
          <path
            d="M 180 1710 Q 280 1660 380 1695 Q 480 1650 590 1715 Q 710 1670 820 1725 L 820 1920 L 180 1920 Z"
            fill="#09131C"
            opacity={0.75}
          />
        </g>

        {/* CONTINUOUS MICRO-MOTION: Supersonic Terminal Velocity Speed Lines */}
        <g opacity={0.65}>
          {[160, 320, 510, 720, 890].map((x, i) => {
            const yStart = ((i * 140 + speedLineOffset * 2.8) % 700) + 840;
            return (
              <line
                key={i}
                x1={x}
                y1={yStart}
                x2={x}
                y2={yStart + 110}
                stroke="#ECFDF5"
                strokeWidth={2}
                strokeDasharray="16 12"
                opacity={0.4}
              />
            );
          })}
        </g>

        {/* EXPLOSION LAYER 0: Ambient Volumetric Blast Core Glow */}
        <circle cx="540" cy="1160" r="480" fill="url(#u2BlastCoreAura)" opacity={0.7} />

        {/* EXPLOSION LAYER 1: Expanding Stratospheric Mach Shockwave Rings */}
        <g transform="translate(540, 1160)">
          {/* Cyan Atmospheric Ionization Ring */}
          <circle
            r={shockR1}
            fill="none"
            stroke="#38BDF8"
            strokeWidth={6}
            opacity={shockAlpha1}
          />
          {/* White-Hot Primary Mach Detonation Front */}
          <circle
            r={shockR2}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={4}
            opacity={shockAlpha2}
          />
          {/* Concentric Geometric Octagon Shockwave */}
          <polygon
            points={`
              0,${-shockR2 * 0.75}
              ${shockR2 * 0.53},${-shockR2 * 0.53}
              ${shockR2 * 0.75},0
              ${shockR2 * 0.53},${shockR2 * 0.53}
              0,${shockR2 * 0.75}
              ${-shockR2 * 0.53},${shockR2 * 0.53}
              ${-shockR2 * 0.75},0
              ${-shockR2 * 0.53},${-shockR2 * 0.53}
            `}
            fill="none"
            stroke="#F59E0B"
            strokeWidth={3}
            opacity={shockAlpha2 * 0.8}
          />
        </g>

        {/* EXPLOSION LAYER 2: Scaled Multi-Tiered Scalloped Fireball Vector at (540, 1160) */}
        <g transform={`translate(540, 1160) scale(${blastScale})`}>
          {/* Flame Sublayer A: Sharp Radiating Supersonic Fire Spikes Behind Cloud Lobes */}
          <g>
            {spikeAngles.map((deg, idx) => {
              const len = spikeLengths[idx];
              return (
                <g key={deg} transform={`rotate(${deg})`}>
                  {/* Outer Fiery Orange Spike */}
                  <polygon
                    points={`0,-${len} -20,-170 20,-170`}
                    fill="#F97316"
                    stroke="#C2410C"
                    strokeWidth={2}
                  />
                  {/* Inner Yellow Accent Spike */}
                  <polygon
                    points={`0,-${len - 38} -9,-190 9,-190`}
                    fill="#FDE047"
                  />
                </g>
              );
            })}
          </g>

          {/* Flame Sublayer B: Outer Billowing Crimson Cloud Lobes (#DC2626 / #7F1D1D) */}
          <path
            d={outerPath}
            fill="#DC2626"
            stroke="#7F1D1D"
            strokeWidth={4}
          />

          {/* Flame Sublayer C: Mid-Tier Blazing Amber-Orange Cloud Lobes (#F97316 / #C2410C) */}
          <path
            d={midPath}
            fill="#F97316"
            stroke="#C2410C"
            strokeWidth={3.5}
          />

          {/* Flame Sublayer D: Inner Radiant Canary Yellow Cloud Lobes (#FDE047 / #D97706) */}
          <path
            d={innerPath}
            fill="#FDE047"
            stroke="#D97706"
            strokeWidth={2.5}
          />

          {/* Flame Sublayer E: Epicenter 8-Pointed White-Hot Core Flash Star */}
          <g transform={`scale(${1 + Math.sin(frame * 0.4) * 0.08})`}>
            <path
              d="M 0 -115 Q 16 -38 82 -82 Q 38 -16 115 0 Q 38 16 82 82 Q 16 38 0 115 Q -16 38 -82 82 Q -38 16 -115 0 Q -38 -16 -82 -82 Q -16 -38 0 -115 Z"
              fill="#FFFFFF"
              stroke="#FEF08A"
              strokeWidth={4}
            />
            {/* Center Core Flash Spheres */}
            <circle cx="0" cy="0" r="28" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="18" fill="#FEF08A" opacity={coreFlash} />
          </g>

          {/* Flame Sublayer F: Detached Flying Cloudlets Drifting Into the Stratosphere */}
          {cloudlets.map((cl, idx) => {
            const rad = Math.atan2(cl.y, cl.x);
            const dx = cl.x + Math.cos(rad) * cloudletDrift;
            const dy = cl.y + Math.sin(rad) * cloudletDrift;
            return (
              <g key={idx} transform={`translate(${dx}, ${dy})`}>
                {/* Outer amber cloudlet */}
                <ellipse
                  cx="0"
                  cy="0"
                  rx={cl.r}
                  ry={cl.r * 0.85}
                  fill="#F97316"
                  stroke="#C2410C"
                  strokeWidth={2}
                />
                <circle cx={-cl.r * 0.35} cy={-cl.r * 0.15} r={cl.r * 0.55} fill="#F97316" />
                <circle cx={cl.r * 0.35} cy={-cl.r * 0.15} r={cl.r * 0.55} fill="#F97316" />
                {/* Inner yellow highlight */}
                <ellipse cx="0" cy="-2" rx={cl.r * 0.55} ry={cl.r * 0.4} fill="#FEF08A" />
              </g>
            );
          })}

          {/* Flame Sublayer G: Radiating High-Velocity Speed Sparks */}
          {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((ang) => (
            <line
              key={ang}
              x1={Math.cos((ang * Math.PI) / 180) * 290}
              y1={Math.sin((ang * Math.PI) / 180) * 290}
              x2={Math.cos((ang * Math.PI) / 180) * 350}
              y2={Math.sin((ang * Math.PI) / 180) * 350}
              stroke="#FEF08A"
              strokeWidth={3}
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* TACTICAL HUD CONTEXT: Safe-zone status bar at y = 875px */}
        <g transform="translate(60, 875)">
          <rect
            x="0"
            y="0"
            width="960"
            height="48"
            fill="#0B1310"
            stroke={alertBlink ? '#EF4444' : '#16221E'}
            strokeWidth={2}
            rx={4}
            opacity={0.95}
          />
          <circle
            cx="28"
            cy="24"
            r="8"
            fill={alertBlink ? '#EF4444' : '#38BDF8'}
          />
          <text
            x="52"
            y="31"
            fill="#ECFDF5"
            fontFamily="Montserrat, sans-serif"
            fontWeight={900}
            fontSize={20}
            letterSpacing="0.08em"
          >
            SVERDLOVSK SECTOR • 70,500 FT • PROXIMITY DETONATION
          </text>
        </g>

        {/* BREAKUP DYNAMICS: Ballistic Trajectories & Debris Vectors at (540, 1220) */}
        <g transform="translate(540, 1220)">
          {/* Ballistic Arc: Severed Horizontal Stabilizer to Upper Left */}
          <path
            d={`M 0 35 Q -100 -30 ${tailX} ${35 + tailY}`}
            stroke="#EF4444"
            strokeWidth={3.5}
            strokeDasharray="8 6"
            fill="none"
            opacity={0.95}
          />

          {/* Ballistic Arc: Severed Right Wingtip to Lower Right */}
          <path
            d={`M 240 -5 Q 340 100 ${240 + wingtipX} ${-5 + wingtipY}`}
            stroke="#38BDF8"
            strokeWidth={3.5}
            strokeDasharray="8 6"
            fill="none"
            opacity={0.95}
          />

          {/* Radiating Titanium/Tungsten Shrapnel Shards */}
          {[
            { angle: 22, len: 44, w: 10 },
            { angle: 68, len: 56, w: 12 },
            { angle: 115, len: 50, w: 11 },
            { angle: 158, len: 60, w: 14 },
            { angle: 205, len: 46, w: 10 },
            { angle: 252, len: 54, w: 12 },
            { angle: 300, len: 48, w: 11 },
            { angle: 342, len: 58, w: 13 },
          ].map((shard, idx) => {
            const rad = (shard.angle * Math.PI) / 180;
            const sx = Math.cos(rad) * shrapnelProg;
            const sy = Math.sin(rad) * shrapnelProg;
            return (
              <g
                key={idx}
                transform={`translate(${sx}, ${sy}) rotate(${shard.angle})`}
                opacity={0.95}
              >
                <polygon
                  points={`0,${-shard.len} ${shard.w},0 0,${shard.len * 0.4} ${-shard.w},0`}
                  fill="#0B1310"
                  stroke="#EF4444"
                  strokeWidth={2.2}
                />
              </g>
            );
          })}

          {/* COMPONENT 1: Sliced Horizontal Stabilizer (Empennage Tumble) */}
          <g transform={`translate(${tailX}, ${35 + tailY}) rotate(${tailRot})`}>
            {/* Flat 2D Sliced Stabilizer Vector */}
            <path
              d="M -90 0 L 0 -12 L 90 0 L 82 18 L 0 8 L -82 18 Z"
              fill="#0F1012"
              stroke="#EF4444"
              strokeWidth={2.5}
            />
            {/* Sheared Mounting Spar & Red Fractured Ribs */}
            <rect x="-8" y="-14" width="16" height="8" fill="url(#fractureRedGrad)" />
            <line x1="-6" y1="-10" x2="6" y2="-10" stroke="#ECFDF5" strokeWidth={2} />
            {/* Vertical Tail Fin Shard */}
            <polygon
              points="0,-12 18,-55 0,-50"
              fill="#16221E"
              stroke="#EF4444"
              strokeWidth={1.5}
            />
          </g>

          {/* COMPONENT 2: Sliced Right Wingtip (Cleanly Separated Outer Foil) */}
          <g transform={`translate(${240 + wingtipX}, ${-5 + wingtipY}) rotate(${wingtipRot})`}>
            <path
              d="M 0 0 L 160 18 L 156 30 L 0 16 Z"
              fill="#0F1012"
              stroke="#38BDF8"
              strokeWidth={2.5}
            />
            {/* Fractured Internal Wing Rib / Spar Cut */}
            <polygon
              points="0,0 12,8 0,16 -4,8"
              fill="#EF4444"
              stroke="#ECFDF5"
              strokeWidth={1.5}
            />
            <line x1="0" y1="0" x2="0" y2="16" stroke="#EF4444" strokeWidth={3} />
            <circle cx="150" cy="24" r="3.5" fill="#F59E0B" />
          </g>

          {/* COMPONENT 3: Main Aircraft Airframe (Inverted Flat Death-Spin) */}
          <g transform={`translate(${planeTumbleX}, ${planeTumbleY}) rotate(${planeSpinDeg})`}>
            {/* Slender Pencil Fuselage */}
            <path
              d="M 0 -140 C 12 -140 18 -70 18 35 L 14 80 L -14 80 L -18 35 C -18 -70 -12 -140 0 -140 Z"
              fill="#0F1012"
              stroke="#38BDF8"
              strokeWidth={2.5}
            />

            {/* Jagged Tail Sever Fracture Glowing in Blast Heat */}
            <polygon
              points="-14,80 14,80 10,96 -2,88 -12,98"
              fill="#EF4444"
              stroke="#B91C1C"
              strokeWidth={2.5}
            />

            {/* Fully Intact Left Glider Wing (High-Aspect Ratio Silhouette) */}
            <path
              d="M -420 5 L -50 -25 L 0 -20 L -50 0 L -416 18 Z"
              fill="#16221E"
              stroke="#38BDF8"
              strokeWidth={2.5}
            />

            {/* Incomplete Right Wing (Clean Shear Cut at 65% Span) */}
            <path
              d="M 0 -20 L 50 -25 L 240 0 L 240 14 L 50 0 Z"
              fill="#16221E"
              stroke="#38BDF8"
              strokeWidth={2.5}
            />
            {/* Bright Red Internal Spar Shear Cut & Fuel Mist */}
            <line
              x1="240"
              y1="0"
              x2="240"
              y2="14"
              stroke="#EF4444"
              strokeWidth={4.5}
              strokeLinecap="round"
            />
            <polygon points="240,0 252,7 240,14" fill="#EF4444" />

            {/* Cheek Jet Air Intakes */}
            <path d="M -18 -35 L -30 -30 L -28 -5 L -16 -10 Z" fill="#050814" />
            <path d="M 18 -35 L 30 -30 L 28 -5 L 16 -10 Z" fill="#050814" />

            {/* Cockpit Canopy Opening with Flashing Red Cockpit Warning Glow */}
            <ellipse
              cx="0"
              cy="-70"
              rx="8"
              ry="24"
              fill={alertBlink ? '#EF4444' : '#7F1D1D'}
              stroke="#ECFDF5"
              strokeWidth={2}
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 1b. SCENE 01 ARCHIVAL RECORD: PESHAWAR AIRBASE DAWN TAKEOFF
// Runway 17/35 at Peshawar Air Station (Badaber), Pakistan.
// Pre-dawn tarmac, runway edge lamps glowing, windsock, control tower radar,
// matte-black U-2 "Dragon Lady" (tail 56-6693) on taxiway, Pilot Gary Powers.
// =========================================================================
export const PeshawarAirbaseU2DawnSilhouette: React.FC = () => {
  const frame = useCurrentFrame();
  const beaconSpin = (frame * 3.5) % 360;
  const windsockSway = Math.sin(frame * 0.12) * 4;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="tarmacGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1C242E" />
            <stop offset="100%" stopColor="#0B0F14" />
          </linearGradient>
          <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4B942" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#E28743" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#E28743" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Distant Hindu Kush / Khyber Pass Ridge Silhouette */}
        <path
          d="M 0 1340 L 140 1280 L 290 1315 L 440 1260 L 620 1300 L 780 1245 L 940 1290 L 1080 1260 L 1080 1500 L 0 1500 Z"
          fill="#141C24"
          opacity="0.45"
        />

        {/* Badaber Air Station Hangar & Control Tower (y > 1320) */}
        <g transform="translate(60, 1260)" opacity="0.85">
          {/* Airbase Control Tower */}
          <rect x="0" y="40" width="55" height="140" fill="#1E2833" stroke="#2C3B4C" strokeWidth="2" />
          <polygon points="-8,40 63,40 55,10 0,10" fill="#283745" stroke="#3D5166" strokeWidth="2" />
          {/* Tower Glass Windows */}
          <rect x="6" y="16" width="43" height="18" fill="#F4B942" opacity="0.6" />
          {/* Rotating Beacon Beam */}
          <g transform="translate(27, 8)">
            <line x1="0" y1="0" x2="0" y2="-22" stroke="#EAE3D2" strokeWidth="3" />
            <circle cx="0" cy="-22" r="6" fill="#E63946" />
            <path
              d="M 0 -22 L 80 -40 L 80 -4 Z"
              fill="#F4B942"
              opacity={0.35 + 0.35 * Math.sin(frame * 0.15)}
              transform={`rotate(${beaconSpin}, 0, -22)`}
            />
          </g>

          {/* Large Reinforced Aircraft Hangar */}
          <path d="M 80 180 L 80 85 Q 180 30 280 85 L 280 180 Z" fill="#182029" stroke="#253240" strokeWidth="2" />
          <path d="M 110 180 L 110 110 Q 180 75 250 110 L 250 180 Z" fill="#0E1318" />
        </g>

        {/* Windsock Mast */}
        <g transform="translate(940, 1310)">
          <line x1="0" y1="0" x2="0" y2="130" stroke="#8E9AA8" strokeWidth="4" />
          {/* Conical Windsock Fabric with Stripes */}
          <g transform={`rotate(${windsockSway}, 0, 10)`}>
            <polygon points="0,0 90,12 85,28 0,22" fill="#E63946" />
            <polygon points="25,3 55,7 52,25 24,21" fill="#F4EFE6" />
          </g>
        </g>

        {/* Peshawar Runway Tarmac Ground Layer */}
        <path d="M 0 1440 L 1080 1440 L 1080 1920 L 0 1920 Z" fill="url(#tarmacGrad)" />
        <line x1="0" y1="1440" x2="1080" y2="1440" stroke="#3A4D63" strokeWidth="4" />

        {/* Runway Centerline Perspective Markings */}
        {[1470, 1540, 1630, 1740, 1870].map((ry, idx) => (
          <line
            key={ry}
            x1={540 - idx * 2}
            y1={ry}
            x2={540 + idx * 2}
            y2={ry + 32 + idx * 6}
            stroke="#E8C56B"
            strokeWidth={10 + idx * 3}
            strokeDasharray="40 25"
            opacity="0.8"
          />
        ))}

        {/* Glowing Runway Edge Lamps */}
        {[120, 260, 820, 960].map((lx) => (
          <g key={lx} transform={`translate(${lx}, 1450)`}>
            <circle cx="0" cy="0" r="28" fill="url(#lampGlow)" />
            <circle cx="0" cy="0" r="5" fill="#FFF5D1" />
            <rect x="-3" y="0" width="6" height="18" fill="#4A5B6E" />
          </g>
        ))}

        {/* Lockheed U-2C "Dragon Lady" Taxiway Silhouette (80ft wingspan, matte black) */}
        <g transform="translate(480, 1400)">
          {/* Jet Shadow on Asphalt */}
          <ellipse cx="-40" cy="90" rx="360" ry="24" fill="#000000" opacity="0.6" />

          {/* Long Slender Glider Wings (Aspect Ratio 10.6) */}
          <path
            d="M -340 40 L -60 10 L 0 0 L 60 10 L 340 40 L 335 48 L 50 25 L 0 20 L -50 25 L -335 48 Z"
            fill="#12161C"
            stroke="#26313E"
            strokeWidth="2"
          />
          {/* Pogo Outrigger Gear at Wingtips */}
          <line x1="-330" y1="44" x2="-330" y2="78" stroke="#3A4D63" strokeWidth="2.5" />
          <circle cx="-330" cy="80" r="4" fill="#1C242E" />
          <line x1="330" y1="44" x2="330" y2="78" stroke="#3A4D63" strokeWidth="2.5" />
          <circle cx="330" cy="80" r="4" fill="#1C242E" />

          {/* Pencil-Thin Fuselage */}
          <path
            d="M 0 -130 C 8 -130 16 -60 16 70 L 14 110 L 0 135 L -14 110 L -16 70 C -16 -60 -8 -130 0 -130 Z"
            fill="#181E27"
            stroke="#2F3E4F"
            strokeWidth="2.5"
          />

          {/* Cockpit Canopy Bubble */}
          <ellipse cx="0" cy="-45" rx="7" ry="24" fill="#64B5F6" opacity="0.75" stroke="#EAE3D2" strokeWidth="1.5" />

          {/* Jet Air Intakes (Cheek Ducts) */}
          <path d="M -16 -10 L -28 -5 L -26 22 L -15 18 Z" fill="#0D1117" stroke="#3A4D63" strokeWidth="1.5" />
          <path d="M 16 -10 L 28 -5 L 26 22 L 15 18 Z" fill="#0D1117" stroke="#3A4D63" strokeWidth="1.5" />

          {/* Horizontal Stabilizer Tail */}
          <path d="M -90 115 L 0 100 L 90 115 L 85 124 L 0 114 L -85 124 Z" fill="#141920" />
          {/* Vertical Tail Fin */}
          <polygon points="0,85 0,140 -5,140" fill="#202A36" />
        </g>
      </svg>

      {/* Tactile Airfield Badge Pill */}
      <div
        style={{
          position: 'absolute',
          top: 890,
          left: 60,
          padding: '10px 24px',
          backgroundColor: '#161F28',
          border: '2px solid #E8C56B',
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#2EC4B6' }} />
        <span style={{ fontFamily: montserrat.fontFamily, fontSize: 22, fontWeight: 800, color: '#F4EFE6', letterSpacing: 2 }}>
          STATION: PAF BADABER // 05:30 PKT
        </span>
      </div>

      {/* Articulated Die-Cut Sticker Puppet: Francis Gary Powers */}
      <CutoutPuppet
        character="POWERS"
        outfit="HIGH_ALTITUDE_SUIT"
        initialPose="NEUTRAL"
        switchedPose="SALUTE"
        poseSwitchFrame={30}
        x={760}
        y={1240}
        scale={0.92}
      />
    </div>
  );
};

// =========================================================================
// 2. SCENE 02: U-2C STRATOSPHERE CRUISING (70,500 FT TELEMETRY)
// Deep dark velvet stratosphere, curved earth horizon, glowing cyan limb,
// majestic glider-wing U-2C cruising at Mach 0.71, parametric altimeter roll.
// =========================================================================
export const U2StratosphereTelemetryVector: React.FC = () => {
  const frame = useCurrentFrame();
  const jetDriftY = Math.sin(frame * 0.08) * 8;
  const contrailPulse = 0.8 + 0.2 * Math.sin(frame * 0.15);

  const altFeet = Math.min(70500, Math.floor(interpolate(frame, [0, 160], [35000, 70500], { extrapolateRight: 'clamp' })));

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="stratosphereGlow" cx="50%" cy="130%" r="90%">
            <stop offset="0%" stopColor="#4CC9F0" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#1B4965" stopOpacity="0.25" />
            <stop offset="85%" stopColor="#050B14" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Curvature of Earth Horizon at 70,000 FT */}
        <path d="M -120 1780 Q 540 1560 1200 1780 L 1200 1920 L -120 1920 Z" fill="#0C1D2D" />
        {/* Luminous Atmospheric Ozone Glow Ring */}
        <path d="M -120 1780 Q 540 1560 1200 1780" stroke="#4CC9F0" strokeWidth="8" fill="none" opacity="0.8" />
        <path d="M -120 1780 Q 540 1560 1200 1780" stroke="#7209B7" strokeWidth="24" fill="none" opacity="0.3" />
        <rect x="0" y="1000" width="1080" height="920" fill="url(#stratosphereGlow)" />

        {/* Twinkling Daytime Stratospheric Stars */}
        {[
          { cx: 140, cy: 920, r: 2.5 },
          { cx: 310, cy: 980, r: 1.8 },
          { cx: 780, cy: 910, r: 2.2 },
          { cx: 940, cy: 960, r: 2.0 },
          { cx: 860, cy: 1040, r: 1.5 },
        ].map((s, idx) => (
          <circle key={idx} cx={s.cx} cy={s.cy} r={s.r} fill="#FFFFFF" opacity={0.5 + 0.5 * Math.sin(frame * 0.1 + idx)} />
        ))}

        {/* U-2C Dragon Lady Glider Silhouetted at 70,500 FT */}
        <g transform={`translate(540, ${1160 + jetDriftY})`}>
          {/* Twin White Thin Contrail Ribbons */}
          <line
            x1="-14"
            y1="110"
            x2="-28"
            y2="420"
            stroke="#EAE3D2"
            strokeWidth="6"
            strokeLinecap="round"
            opacity={contrailPulse * 0.75}
          />
          <line
            x1="14"
            y1="110"
            x2="28"
            y2="420"
            stroke="#EAE3D2"
            strokeWidth="6"
            strokeLinecap="round"
            opacity={contrailPulse * 0.75}
          />

          {/* High-Aspect Glider Wings (Huge 80 ft span) */}
          <path
            d="M -440 -10 L -60 -35 L 0 -45 L 60 -35 L 440 -10 L 436 4 L 50 -20 L 0 -22 L -50 -20 L -436 4 Z"
            fill="#151A22"
            stroke="#344354"
            strokeWidth="2.5"
          />

          {/* Fuselage with J57 Jet Engine Core */}
          <path
            d="M 0 -170 C 12 -170 18 -100 18 40 L 16 95 L 0 120 L -16 95 L -18 40 C -18 -100 -12 -170 0 -170 Z"
            fill="#1B222C"
            stroke="#3E4F63"
            strokeWidth="3"
          />

          {/* Pressurized Cockpit Canopy Bubble */}
          <ellipse cx="0" cy="-80" rx="8" ry="26" fill="#3A86FF" opacity="0.85" stroke="#F4EFE6" strokeWidth="1.8" />
          {/* Pilot Silhouette inside Helmet */}
          <circle cx="0" cy="-84" r="5" fill="#EAE3D2" />

          {/* Cheek Engine Air Intakes */}
          <path d="M -18 -42 L -32 -38 L -30 -10 L -17 -14 Z" fill="#0B0E12" stroke="#485B73" strokeWidth="1.5" />
          <path d="M 18 -42 L 32 -38 L 30 -10 L 17 -14 Z" fill="#0B0E12" stroke="#485B73" strokeWidth="1.5" />

          {/* Horizontal Stabilizers */}
          <path d="M -110 90 L 0 78 L 110 90 L 105 102 L 0 92 L -105 102 Z" fill="#151A22" stroke="#2B3746" strokeWidth="2" />
        </g>
      </svg>

      {/* Tactile Altimeter Telemetry HUD Card (top >= 880) */}
      <div
        style={{
          position: 'absolute',
          top: 890,
          left: 50,
          right: 50,
          padding: '16px 28px',
          backgroundColor: '#0F161E',
          border: '2px solid #2EC4B6',
          borderRadius: 8,
          boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontFamily: montserrat.fontFamily, fontSize: 16, fontWeight: 800, color: '#8E9AA8', letterSpacing: 2 }}>
            ALTITUDE TELEMETRY
          </div>
          <div style={{ fontFamily: montserrat.fontFamily, fontSize: 44, color: '#F4B942', letterSpacing: 1 }}>
            {altFeet.toLocaleString()} <span style={{ fontSize: 24, color: '#EAE3D2' }}>FT</span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: montserrat.fontFamily, fontSize: 16, fontWeight: 800, color: '#8E9AA8', letterSpacing: 2 }}>
            AIRSPEED // OAT
          </div>
          <div style={{ fontFamily: barlow.fontFamily, fontSize: 32, fontWeight: 700, color: '#2EC4B6' }}>
            MACH 0.71 • -58°C
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. SCENE 03: OPERATION GRAND SLAM CONTINENTAL FLIGHT MAP
// Dynamic d3-geo Projected Tactical Chart spanning Peshawar -> Aral -> Sverdlovsk -> Bodø
// Features real GeoJSON Air Defense Zone, Contested Shading, and Tactical Movement Arrows
// =========================================================================
export const GrandSlamContinentalMapVector: React.FC = () => {
  const frame = useCurrentFrame();

  const viewport = { x: 50, y: 870, width: 980, height: 780 };
  const projector = useMemo(() => {
    return createGeoProjector({
      projectionType: 'equalEarth',
      viewport,
      center: [55.0, 52.0],
      scale: 780,
    });
  }, []);

  // Real projected coordinates for strategic mission waypoints
  const peshawarPos = useMemo(() => projector.project([71.5, 34.0]), [projector]);
  const aralPos = useMemo(() => projector.project([60.0, 45.0]), [projector]);
  const chelyabinskPos = useMemo(() => projector.project([61.4, 55.1]), [projector]);
  const sverdlovskPos = useMemo(() => projector.project([60.6, 56.8]), [projector]);
  const bodoPos = useMemo(() => projector.project([14.4, 67.3]), [projector]);

  // Projected Soviet Air Defense Zone Polygon
  const airDefenseZonePath = useMemo(() => {
    const p1 = projector.project([52.0, 50.0]);
    const p2 = projector.project([72.0, 50.0]);
    const p3 = projector.project([75.0, 64.0]);
    const p4 = projector.project([50.0, 64.0]);
    return `M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} L ${p3[0]} ${p3[1]} L ${p4[0]} ${p4[1]} Z`;
  }, [projector]);

  // Projected 2,900-Mile Operational Flight Corridor Path
  const flightPathD = useMemo(() => {
    return `M ${peshawarPos[0]} ${peshawarPos[1]} Q ${aralPos[0]} ${aralPos[1]} ${sverdlovskPos[0]} ${sverdlovskPos[1]} T ${bodoPos[0]} ${bodoPos[1]}`;
  }, [peshawarPos, aralPos, sverdlovskPos, bodoPos]);

  // Projected Iron Curtain / Soviet Radar Intercept Border
  const ironCurtainPath = useMemo(() => {
    const b1 = projector.project([42.0, 42.0]);
    const b2 = projector.project([54.0, 46.0]);
    const b3 = projector.project([75.0, 44.0]);
    return `M ${b1[0]} ${b1[1]} Q ${b2[0]} ${b2[1]} ${b3[0]} ${b3[1]}`;
  }, [projector]);

  const graticulePath = useMemo(() => {
    return projector.getGraticulePath([15, 10]);
  }, [projector]);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Map Background Grid Sheet */}
        <rect x="50" y="870" width="980" height="780" rx="8" fill="#0B1310" stroke="#1E293B" strokeWidth="2.5" />

        {/* Real d3-geo Projected Graticule */}
        <path
          d={graticulePath}
          fill="none"
          stroke="rgba(56, 189, 248, 0.12)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />

        {/* Ural Mountains Ridge Line */}
        <g stroke="#334155" strokeWidth="3" strokeDasharray="6 4" fill="none" opacity="0.65">
          <line x1={sverdlovskPos[0]} y1={sverdlovskPos[1] + 160} x2={sverdlovskPos[0]} y2={sverdlovskPos[1] - 160} />
        </g>

        {/* Soviet Air Defense Zone Shading */}
        <ContestedTerritoryShading
          id="soviet_air_defense_zone"
          path={airDefenseZonePath}
          faction="SOVIET"
          patternStyle="DIAGONAL_STRIPES"
          stripeSpacing={20}
          stripeWidth={2.2}
          opacity={0.65}
          label="SOVIET AIR DEFENSE SECTOR"
          labelCenter={[sverdlovskPos[0] + 40, sverdlovskPos[1] - 80]}
          fontFamily={montserrat.fontFamily}
        />

        {/* Animated Soviet Radar Intercept Border Frontline */}
        <AnimatedFrontline
          id="iron_curtain_border"
          path={ironCurtainPath}
          alliedColor="#38BDF8"
          hostileColor="#EF4444"
          lineWidth={3.2}
          style="DUAL_RIBBON"
          fontFamily={montserrat.fontFamily}
        />

        {/* Operation Grand Slam Tactical Flight Arrow (with flowing dashes & chevron head) */}
        <TacticalMovementArrow
          id="u2_grand_slam_arrow"
          path={flightPathD}
          strokeColor="#FFD166"
          strokeWidth={5}
          arrowHead="SPEARHEAD"
          animationMode="FLOWING_DASHES"
          flowSpeed={4.5}
          dashArray="28 14"
          label="U-2 DRAGON LADY"
          fontFamily={montserrat.fontFamily}
        />

        {/* Waypoint 1: Peshawar Airbase (Origin) */}
        <g transform={`translate(${peshawarPos[0]}, ${peshawarPos[1]})`}>
          <circle cx="0" cy="0" r="10" fill="#2EC4B6" />
          <circle cx="0" cy="0" r="4" fill="#0B131B" />
          <text x="16" y="5" fill="#F4EFE6" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="bold">
            TAKEOFF: PESHAWAR
          </text>
        </g>

        {/* Waypoint 2: Tyuratam / Baikonur */}
        <g transform={`translate(${aralPos[0]}, ${aralPos[1]})`}>
          <circle cx="0" cy="0" r="7" fill="#F4B942" />
          <text x="14" y="4" fill="#EAE3D2" fontFamily={montserrat.fontFamily} fontSize="13" fontWeight="bold">
            TYURATAM
          </text>
        </g>

        {/* Waypoint 3: Mayak Nuclear Facility */}
        <g transform={`translate(${chelyabinskPos[0]}, ${chelyabinskPos[1]})`}>
          <circle cx="0" cy="0" r="8" fill="#EF4444" />
          <text x="-90" y="4" fill="#F4EFE6" fontFamily={montserrat.fontFamily} fontSize="13" fontWeight="bold">
            MAYAK ➔
          </text>
        </g>

        {/* Waypoint 4: Sverdlovsk (Shootdown Detonation Site) */}
        <PulsatingBattleMarker
          x={sverdlovskPos[0]}
          y={sverdlovskPos[1]}
          color="#EF4444"
          size={32}
          label="SVERDLOVSK"
          sublabel="SAM DETONATION"
          pulseSpeed={1.4}
          showCrosshairs={true}
          impactFlash={true}
          impactFrame={30}
          fontFamily={montserrat.fontFamily}
        />

        {/* Waypoint 5: Bodø, Norway (Planned Destination) */}
        <g transform={`translate(${bodoPos[0]}, ${bodoPos[1]})`}>
          <rect x="-8" y="-8" width="16" height="16" fill="#2EC4B6" />
          <text x="16" y="5" fill="#F4EFE6" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="bold">
            DEST: BODØ
          </text>
        </g>

        {/* Classified Mission Dossier Stamp */}
        <g transform="translate(680, 890)">
          <WeatheredMilitaryStamp
            text="TOP SECRET"
            subText="TALENT / GRAND SLAM"
            color="#E63946"
          />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 4. SCENE 04: HYCON TYPE-B RECONNAISSANCE CAMERA SCHEMATIC
// Massive 36-inch f/10 optical folding camera, film rolls, framed aerial photo
// callout revealing Mayak nuclear reactor basins and missile silos.
// =========================================================================
export const HyconCameraSurveillanceSchematic: React.FC = () => {
  const frame = useCurrentFrame();
  const filmRollAngle = (frame * 2.8) % 360;
  const scanSweepY = 1040 + (Math.sin(frame * 0.08) * 90 + 90);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Technical Blueprint Board */}
        <rect x="50" y="870" width="980" height="780" rx="8" fill="#0E1924" stroke="#4CC9F0" strokeWidth="2.5" />

        {/* Camera Bay Cross-Section Drawing */}
        <g transform="translate(80, 910)">
          <text x="10" y="24" fill="#4CC9F0" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="bold">
            HYCON TYPE-B OPTICAL HIGH-ALTITUDE RECONNAISSANCE SYSTEM
          </text>
          <text x="10" y="48" fill="#8E9AA8" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="600">
            FOCAL LENGTH: 36 INCH (914mm) • F/10 • ROTATING PRISM
          </text>

          {/* Heavy Optical Lens Housing */}
          <rect x="40" y="80" width="260" height="180" rx="6" fill="#192A3A" stroke="#4CC9F0" strokeWidth="2" />
          {/* Glass Lens Elements */}
          <ellipse cx="170" cy="170" rx="75" ry="65" fill="#14344D" stroke="#64DFDF" strokeWidth="2.5" />
          <ellipse cx="170" cy="170" rx="48" ry="40" fill="#2EC4B6" opacity="0.6" />
          <line x1="40" y1="170" x2="300" y2="170" stroke="#4CC9F0" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Rotating Film Spools */}
          <g transform={`translate(100, 310) rotate(${filmRollAngle})`}>
            <circle cx="0" cy="0" r="38" fill="#24374B" stroke="#8E9AA8" strokeWidth="3" />
            <circle cx="0" cy="0" r="14" fill="#0E1924" />
            <line x1="-36" y1="0" x2="36" y2="0" stroke="#8E9AA8" strokeWidth="2" />
          </g>
          <g transform={`translate(240, 310) rotate(${filmRollAngle})`}>
            <circle cx="0" cy="0" r="38" fill="#24374B" stroke="#8E9AA8" strokeWidth="3" />
            <circle cx="0" cy="0" r="14" fill="#0E1924" />
            <line x1="-36" y1="0" x2="36" y2="0" stroke="#8E9AA8" strokeWidth="2" />
          </g>
          {/* Film Strip Path */}
          <line x1="100" y1="272" x2="240" y2="272" stroke="#EAE3D2" strokeWidth="5" />
        </g>

        {/* Framed Aerial Surveillance Photo Reveal (Right Panel) */}
        <g transform="translate(480, 980)">
          {/* Polaroid Paper Frame */}
          <rect x="0" y="0" width="490" height="420" rx="4" fill="#F4EFE6" stroke="#121820" strokeWidth="3" />
          {/* High-Contrast B&W Aerial Surveillance Negative */}
          <rect x="20" y="20" width="450" height="320" fill="#242B33" />

          {/* Stylized Mayak Nuclear Complex from 70,000 FT */}
          {/* Cooling Lake Outline */}
          <path d="M 60 70 Q 140 40 220 80 Q 280 140 200 220 Q 90 240 60 70 Z" fill="#151A20" />
          {/* Industrial Reactor Blocks */}
          <rect x="250" y="100" width="65" height="90" fill="#3D4958" stroke="#5C6E84" strokeWidth="2" />
          <rect x="330" y="120" width="55" height="70" fill="#3D4958" stroke="#5C6E84" strokeWidth="2" />
          {/* Road Network & Cooling Pipes */}
          <line x1="60" y1="180" x2="410" y2="180" stroke="#5C6E84" strokeWidth="2.5" />
          <line x1="280" y1="70" x2="280" y2="280" stroke="#5C6E84" strokeWidth="2" />

          {/* Target Reticle Crosshairs */}
          <circle cx="282" cy="145" r="35" stroke="#E63946" strokeWidth="2" fill="none" />
          <line x1="282" y1="100" x2="282" y2="190" stroke="#E63946" strokeWidth="2" />
          <line x1="237" y1="145" x2="327" y2="145" stroke="#E63946" strokeWidth="2" />

          {/* Cyan Reconnaissance Scanning Line */}
          <line x1="20" y1={scanSweepY - 980} x2="470" y2={scanSweepY - 980} stroke="#4CC9F0" strokeWidth="3" opacity="0.8" />

          {/* Photo Identification Caption */}
          <text x="24" y="375" fill="#1C2530" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="bold">
            CHELYABINSK-65 / MAYAK PLUTONIUM COMPLEX
          </text>
          <text x="24" y="400" fill="#5A6778" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="600">
            FRAME NO. 0418 • MISSION 4154
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 5. SCENE 05: SOVIET P-30 RADAR ALERT (FIRST DROP - BAR 8 / FRAME 1108)
// Soviet PVO Strany air defense radar installation, massive rotating lattice,
// circular green CRT oscilloscope scope, flashing red Cyrillic warning badge.
// =========================================================================
export const SovietP30RadarAlertVector: React.FC = () => {
  const frame = useCurrentFrame();
  const antennaSweep = (frame * 4.2) % 360;
  const alertBlink = frame % 20 < 10;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="crtPhosphorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2EC4B6" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#0B3C37" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#041412" stopOpacity="0.95" />
          </radialGradient>
        </defs>

        {/* Concrete Radar Bunker Substructure (y > 1320) */}
        <g transform="translate(100, 1260)">
          <polygon points="0,220 50,40 280,40 330,220" fill="#1B2228" stroke="#313E4A" strokeWidth="3" />
          <line x1="80" y1="120" x2="250" y2="120" stroke="#0E1216" strokeWidth="12" />

          {/* P-30 Open-Lattice Curved Radar Antenna (Spinning) */}
          <g transform="translate(165, 40)">
            <rect x="-10" y="-30" width="20" height="30" fill="#4A5969" />
            <g transform={`rotate(${Math.sin(frame * 0.1) * 35}, 0, -30)`}>
              {/* Parabolic Mesh Grill */}
              <path d="M -140 -80 Q 0 -130 140 -80 L 125 -60 Q 0 -105 -125 -60 Z" fill="#3D4B59" stroke="#687C90" strokeWidth="2.5" />
              {/* Lattice Struts */}
              {[-100, -50, 0, 50, 100].map((lx) => (
                <line key={lx} x1={lx} y1="-70" x2={lx * 0.8} y2="-115" stroke="#8B9EB2" strokeWidth="2" />
              ))}
            </g>
          </g>
        </g>

        {/* Large Circular Green CRT Radar Scope Screen (center-right) */}
        <g transform="translate(680, 1240)">
          {/* Heavy Steel Bezel Ring */}
          <circle cx="0" cy="0" r="230" fill="#151A1E" stroke="#374754" strokeWidth="8" />
          <circle cx="0" cy="0" r="215" fill="url(#crtPhosphorGlow)" stroke="#2EC4B6" strokeWidth="3" />

          {/* Concentric Range Rings (10km, 20km, 30km) */}
          {[60, 120, 180].map((rad) => (
            <circle key={rad} cx="0" cy="0" r={rad} stroke="#2EC4B6" strokeWidth="1.5" strokeDasharray="4 4" fill="none" opacity="0.6" />
          ))}

          {/* Crosshairs & Azimuth Graticule */}
          <line x1="-210" y1="0" x2="210" y2="0" stroke="#2EC4B6" strokeWidth="1.5" opacity="0.7" />
          <line x1="0" y1="-210" x2="0" y2="210" stroke="#2EC4B6" strokeWidth="1.5" opacity="0.7" />

          {/* Rotating Phosphor Sweep Line */}
          <line
            x1="0"
            y1="0"
            x2={Math.cos((antennaSweep * Math.PI) / 180) * 210}
            y2={Math.sin((antennaSweep * Math.PI) / 180) * 210}
            stroke="#A7FFEB"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Intruding Target Blip (Gary Powers U-2 at 21,500m) */}
          <g transform="translate(45, -75)">
            <circle cx="0" cy="0" r="9" fill="#FF5252" />
            <circle cx="0" cy="0" r="22" stroke="#FF5252" strokeWidth="2" fill="none" opacity={alertBlink ? 1 : 0.2} />
            <text x="18" y="6" fill="#FF5252" fontFamily={montserrat.fontFamily} fontSize="16" fontWeight="bold">
              ALT: 21,500m
            </text>
          </g>
        </g>
      </svg>

      {/* Flashing Red Soviet Alert Banner (top >= 880) */}
      <div
        style={{
          position: 'absolute',
          top: 890,
          left: 60,
          right: 60,
          padding: '16px 28px',
          backgroundColor: alertBlink ? '#9E1C1C' : '#520B0B',
          border: '3px solid #FF5252',
          borderRadius: 6,
          boxShadow: '0 12px 32px rgba(255,0,0,0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontFamily: montserrat.fontFamily, fontSize: 32, color: '#FFFFFF', letterSpacing: 2 }}>
          ТРЕВОГА // SOVIET PVO STRANY ALERT
        </span>
        <span style={{ fontFamily: montserrat.fontFamily, fontSize: 20, fontWeight: 800, color: '#FFD166' }}>
          RADAR LOCK: SVERDLOVSK
        </span>
      </div>
    </div>
  );
};

// =========================================================================
// 6. SCENE 06: S-75 DVINA (SA-2 GUIDELINE) SURFACE-TO-AIR MISSILE SALVO
// Elevated 75-degree rail launcher, rocket booster blast plume, Mach 3.5 ascent.
// Historical fact: 14 missiles salvoed (accidentally shot down Soviet MiG-19).
// Continuous multi-wave supersonic ascent — missiles accelerate completely off-screen,
// initial launch smoke & missile contrails fade away, screen shakes on each launch.
// =========================================================================
export const S75DvinaLaunchBatteryVector: React.FC = () => {
  const frame = useCurrentFrame();

  // Multi-launch screen shake (jolts with decaying oscillation as each missile fires)
  // Launch 1 at frame 0 (Lead foreground rocket)
  const shake1Decay = interpolate(frame, [0, 26], [1, 0], { extrapolateRight: 'clamp' });
  const shake1X = Math.sin(frame * 2.8) * 24 * shake1Decay;
  const shake1Y = Math.cos(frame * 3.4) * 18 * shake1Decay;

  // Launch 2 at frame 45 (Battery 2)
  const f2 = frame - 45;
  const shake2Decay = interpolate(f2, [0, 22], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shake2X = f2 >= 0 ? Math.sin(f2 * 2.6) * 18 * shake2Decay : 0;
  const shake2Y = f2 >= 0 ? Math.cos(f2 * 3.1) * 14 * shake2Decay : 0;

  // Launch 3 at frame 95 (Battery 3)
  const f3 = frame - 95;
  const shake3Decay = interpolate(f3, [0, 22], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shake3X = f3 >= 0 ? Math.sin(f3 * 2.7) * 16 * shake3Decay : 0;
  const shake3Y = f3 >= 0 ? Math.cos(f3 * 3.3) * 12 * shake3Decay : 0;

  // Launch 4 at frame 150 (High-altitude supersonic wave)
  const f4 = frame - 150;
  const shake4Decay = interpolate(f4, [0, 20], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shake4X = f4 >= 0 ? Math.sin(f4 * 3.0) * 14 * shake4Decay : 0;
  const shake4Y = f4 >= 0 ? Math.cos(f4 * 3.6) * 10 * shake4Decay : 0;

  const totalShakeX = shake1X + shake2X + shake3X + shake4X;
  const totalShakeY = shake1Y + shake2Y + shake3Y + shake4Y;

  // Wave 1: Lead missile from foreground rail launcher (frames 0 to 60, accelerates fully off-screen)
  const prog1 = Math.min(1.25, Math.pow(frame / 58, 1.9));
  const m1X = 350 + prog1 * 1100;
  const m1Y = 1260 - prog1 * 1850;
  const m1Visible = m1Y > -450 && m1X < 1250;

  // Wave 1 smoke trail dissipation (tail moves forward, opacity fades to 0)
  const tail1Prog = interpolate(frame, [25, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tail1X = 350 + tail1Prog * 850;
  const tail1Y = 1260 - tail1Prog * 1400;
  const trail1Alpha = interpolate(frame, [0, 15, 45, 80], [0.95, 0.85, 0.45, 0.0], { extrapolateRight: 'clamp' });

  // Wave 2: Second missile from background battery left (frames 45 to 115)
  const prog2 = Math.min(1.25, Math.pow(Math.max(0, f2) / 65, 1.85));
  const m2X = 160 + prog2 * 1150;
  const m2Y = 1440 - prog2 * 1900;
  const m2Visible = frame >= 45 && m2Y > -450 && m2X < 1250;

  // Wave 2 smoke trail dissipation
  const tail2Prog = interpolate(frame, [70, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tail2X = 160 + tail2Prog * 850;
  const tail2Y = 1440 - tail2Prog * 1400;
  const trail2Alpha = interpolate(frame, [45, 55, 95, 130], [0.85, 0.8, 0.4, 0.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Wave 3: Third missile from background battery right (frames 95 to 170)
  const prog3 = Math.min(1.25, Math.pow(Math.max(0, f3) / 68, 1.85));
  const m3X = 520 + prog3 * 950;
  const m3Y = 1460 - prog3 * 1900;
  const m3Visible = frame >= 95 && m3Y > -450 && m3X < 1250;

  // Wave 3 smoke trail dissipation
  const tail3Prog = interpolate(frame, [120, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tail3X = 520 + tail3Prog * 750;
  const tail3Y = 1460 - tail3Prog * 1450;
  const trail3Alpha = interpolate(frame, [95, 105, 145, 180], [0.85, 0.8, 0.4, 0.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Wave 4: High-altitude intercept salvo pair (frames 150 to 230)
  const prog4 = Math.min(1.25, Math.pow(Math.max(0, f4) / 72, 1.8));
  const m4X = 100 + prog4 * 1250;
  const m4Y = 1380 - prog4 * 1850;
  const m4Visible = frame >= 150 && m4Y > -450 && m4X < 1250;

  // Wave 4 smoke trail dissipation
  const tail4Prog = interpolate(frame, [175, 235], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tail4X = 100 + tail4Prog * 850;
  const tail4Y = 1380 - tail4Prog * 1350;
  const trail4Alpha = interpolate(frame, [150, 160, 205, 240], [0.85, 0.8, 0.35, 0.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Salvo counter: 1 to 14
  const salvoCount = Math.min(14, Math.max(1, Math.floor(interpolate(frame, [0, 220], [1, 14], { extrapolateRight: 'clamp' }))));

  // Initial ground blast dust dissipation (billows rapidly, then fades away completely by frame 55)
  const groundDustAlpha = interpolate(frame, [0, 12, 35, 60], [0.95, 0.9, 0.45, 0.0], { extrapolateRight: 'clamp' });
  const groundDustScale = interpolate(frame, [0, 50], [0.6, 2.4], { extrapolateRight: 'clamp' });

  // Battery 2 and 3 ground blast puffs (fade out cleanly)
  const pad2DustAlpha = interpolate(f2, [0, 8, 25, 45], [0.85, 0.8, 0.35, 0.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pad3DustAlpha = interpolate(f3, [0, 8, 25, 45], [0.85, 0.8, 0.35, 0.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Render a reusable S-75 missile assembly
  const renderS75Missile = (scale: number, showTrail: boolean, trailLength: number) => (
    <g transform={`scale(${scale})`}>
      {/* Exhaust Fireball & Supersonic Shock Diamonds */}
      <g transform="translate(0, 130)">
        {showTrail && (
          <line
            x1="0"
            y1="40"
            x2="0"
            y2={trailLength}
            stroke="#EAE3D2"
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.65"
          />
        )}
        <ellipse cx="0" cy="40" rx="36" ry="85" fill="url(#missileExhaustGlow)" />
        <ellipse cx="0" cy="110" rx="55" ry="110" fill="#E28743" opacity="0.75" />
        <ellipse cx="0" cy="200" rx="80" ry="140" fill="#7A8B99" opacity="0.4" />
        {/* Shock diamonds in supersonic plume */}
        <polygon points="0,55 12,85 0,115 -12,85" fill="#FFF5D1" opacity="0.9" />
        <polygon points="0,115 10,140 0,165 -10,140" fill="#FFF5D1" opacity="0.7" />
      </g>

      {/* Two-Stage S-75 Dvina Missile Body (10.6m long) */}
      {/* Solid Rocket Booster Section (Stage 1) */}
      <rect x="-14" y="50" width="28" height="75" fill="#4B5B4C" stroke="#252F26" strokeWidth="2" />
      {/* Large Booster Stabilizing Fins */}
      <polygon points="-14,100 -75,125 -14,125" fill="#3D4B3E" />
      <polygon points="14,100 75,125 14,125" fill="#3D4B3E" />

      {/* Sustainer Core (Second Stage) */}
      <rect x="-10" y="-80" width="20" height="130" fill="#8E9AA8" stroke="#4B5B6E" strokeWidth="2" />
      {/* Sustainer Cruciform Delta Wings */}
      <polygon points="-10,0 -55,20 -10,20" fill="#5E6D7E" />
      <polygon points="10,0 55,20 10,20" fill="#5E6D7E" />

      {/* High-Explosive Proximity Fragmentation Warhead (195 kg) */}
      <polygon points="0,-125 -10,-80 10,-80" fill="#C1272D" stroke="#8E1C22" strokeWidth="2" />
      {/* Forward Steering Canards */}
      <polygon points="-10,-60 -32,-50 -10,-50" fill="#4B5B6E" />
      <polygon points="10,-60 32,-50 10,-50" fill="#4B5B6E" />
    </g>
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: `translate(${totalShakeX}px, ${totalShakeY}px)`,
        transformOrigin: 'center center',
      }}
    >
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="missileExhaustGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF275" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FF6B35" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C1272D" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="smokeContrailGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#8E9AA8" stopOpacity="0.75" />
            <stop offset="80%" stopColor="#EAE3D2" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFF5D1" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Urals Steppe Pine Trees Landscape (y > 1400) */}
        <g opacity="0.45" fill="#17231B">
          {[60, 180, 280, 780, 910, 1020].map((tx) => (
            <polygon key={tx} points={`${tx},1420 ${tx - 25},1490 ${tx + 25},1490`} />
          ))}
          <rect x="0" y="1480" width="1080" height="440" fill="#131C16" />
        </g>

        {/* Distant Battery Launch Rails (Left and Right) */}
        <g transform="translate(160, 1450)" opacity="0.6">
          <rect x="-30" y="0" width="60" height="18" fill="#243025" />
          <line x1="0" y1="0" x2="80" y2="-110" stroke="#2F3F31" strokeWidth="8" strokeLinecap="round" />
          {/* Battery 2 Launch Puff (Fades Away) */}
          {pad2DustAlpha > 0.01 && (
            <ellipse cx="40" cy="-40" rx="60" ry="35" fill="#E28743" opacity={pad2DustAlpha} />
          )}
        </g>

        <g transform="translate(520, 1470)" opacity="0.6">
          <rect x="-30" y="0" width="60" height="18" fill="#243025" />
          <line x1="0" y1="0" x2="70" y2="-100" stroke="#2F3F31" strokeWidth="8" strokeLinecap="round" />
          {/* Battery 3 Launch Puff (Fades Away) */}
          {pad3DustAlpha > 0.01 && (
            <ellipse cx="35" cy="-35" rx="55" ry="32" fill="#E28743" opacity={pad3DustAlpha} />
          )}
        </g>

        {/* Foreground S-75 Single-Rail Transporter-Launcher Bed */}
        <g transform="translate(240, 1440)">
          <rect x="-60" y="0" width="120" height="30" fill="#2D3B2E" stroke="#1A241B" strokeWidth="2" />
          <circle cx="-40" cy="30" r="14" fill="#1A241B" />
          <circle cx="40" cy="30" r="14" fill="#1A241B" />

          {/* Elevated Launcher Boom Arm (65 deg angle) */}
          <line x1="0" y1="0" x2="160" y2="-210" stroke="#3D503F" strokeWidth="18" strokeLinecap="round" />
          <line x1="20" y1="10" x2="120" y2="-120" stroke="#57705A" strokeWidth="6" />

          {/* Initial Ground Launch Smoke on Pad (Billows & Fades Away Completely by frame 60) */}
          {groundDustAlpha > 0.01 && (
            <g transform={`scale(${groundDustScale})`} opacity={groundDustAlpha}>
              <ellipse cx="60" cy="-60" rx="80" ry="45" fill="#E28743" opacity="0.85" />
              <ellipse cx="120" cy="-40" rx="95" ry="55" fill="#8E9AA8" opacity="0.7" />
              <ellipse cx="10" cy="-30" rx="70" ry="40" fill="#5C4738" opacity="0.8" />
            </g>
          )}
        </g>

        {/* WAVE 1 Contrail (Dissipates & Fades Away Completely by frame 80) */}
        {trail1Alpha > 0.01 && (
          <path
            d={`M ${tail1X} ${tail1Y} Q ${tail1X + (m1X - tail1X) * 0.45} ${tail1Y + (m1Y - tail1Y) * 0.55} ${m1X} ${m1Y}`}
            stroke="url(#smokeContrailGrad)"
            strokeWidth={interpolate(frame, [0, 70], [14, 30], { extrapolateRight: 'clamp' })}
            fill="none"
            strokeLinecap="round"
            opacity={trail1Alpha}
          />
        )}

        {/* WAVE 2 Contrail (Dissipates & Fades Away Completely by frame 130) */}
        {trail2Alpha > 0.01 && (
          <path
            d={`M ${tail2X} ${tail2Y} Q ${tail2X + (m2X - tail2X) * 0.45} ${tail2Y + (m2Y - tail2Y) * 0.55} ${m2X} ${m2Y}`}
            stroke="url(#smokeContrailGrad)"
            strokeWidth={18}
            fill="none"
            strokeLinecap="round"
            opacity={trail2Alpha}
          />
        )}

        {/* WAVE 3 Contrail (Dissipates & Fades Away Completely by frame 180) */}
        {trail3Alpha > 0.01 && (
          <path
            d={`M ${tail3X} ${tail3Y} Q ${tail3X + (m3X - tail3X) * 0.45} ${tail3Y + (m3Y - tail3Y) * 0.55} ${m3X} ${m3Y}`}
            stroke="url(#smokeContrailGrad)"
            strokeWidth={16}
            fill="none"
            strokeLinecap="round"
            opacity={trail3Alpha}
          />
        )}

        {/* WAVE 4 Contrail (Dissipates & Fades Away Completely by frame 240) */}
        {trail4Alpha > 0.01 && (
          <path
            d={`M ${tail4X} ${tail4Y} Q ${tail4X + (m4X - tail4X) * 0.45} ${tail4Y + (m4Y - tail4Y) * 0.55} ${m4X} ${m4Y}`}
            stroke="url(#smokeContrailGrad)"
            strokeWidth={14}
            fill="none"
            strokeLinecap="round"
            opacity={trail4Alpha}
          />
        )}

        {/* WAVE 1: Lead S-75 Missile (Continuous Acceleration fully off-screen) */}
        {m1Visible && (
          <g transform={`translate(${m1X}, ${m1Y}) rotate(48)`}>
            {renderS75Missile(1.0, true, 250)}
          </g>
        )}

        {/* WAVE 2: Second Missile from Left Battery */}
        {m2Visible && (
          <g transform={`translate(${m2X}, ${m2Y}) rotate(46)`}>
            {renderS75Missile(0.78, true, 200)}
          </g>
        )}

        {/* WAVE 3: Third Missile from Right Battery */}
        {m3Visible && (
          <g transform={`translate(${m3X}, ${m3Y}) rotate(50)`}>
            {renderS75Missile(0.72, true, 180)}
          </g>
        )}

        {/* WAVE 4: High-Altitude Intercept Salvo Pair (Mach 3.5 Streaks) */}
        {m4Visible && (
          <g>
            <g transform={`translate(${m4X}, ${m4Y}) rotate(48)`}>
              {renderS75Missile(0.65, true, 300)}
            </g>
            <g transform={`translate(${m4X - 110}, ${m4Y + 140}) rotate(48)`}>
              {renderS75Missile(0.58, true, 260)}
            </g>
          </g>
        )}
      </svg>

      {/* Dynamic Salvo Counter Dossier Pill (top >= 880) */}
      <div
        style={{
          position: 'absolute',
          top: 890,
          left: 60,
          padding: '12px 26px',
          backgroundColor: '#1E251E',
          border: '2px solid #E63946',
          borderRadius: 6,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ fontFamily: montserrat.fontFamily, fontSize: 32, color: '#F4B942' }}>
          S-75 SALVO: {String(salvoCount).padStart(2, '0')} / 14 MISSILES
        </div>
        <div style={{ fontFamily: montserrat.fontFamily, fontSize: 16, fontWeight: 700, color: '#EAE3D2', marginTop: 4 }}>
          SPEED: MACH 3.5 • WARHEAD: 195 KG FRAGMENTATION
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 7. SCENE 07: PROXIMITY WARHEAD DETONATION & INVERTED SPIN
// Visual Language: Flat 2D vector shapes, parallax curved Earth & indigo zenith.
// Detonation: Concentric hard-edged geometric blast rings (white, yellow, orange),
// rapid 2-3 frame camera shake & radial flash, stylized black fragmentation shrapnel.
// Breakup Choreography: Sliced stabilizer and wingtip with speed lines & dotted trajectories.
// HUD / Telemetry: Flashing bold red readouts: ALT: 70,500 FT, PITCH TRIM: FAILED, G-LIMIT EXCEEDED.
// =========================================================================
export const U2ExplosionDestructionVector: React.FC = () => {
  const frame = useCurrentFrame();

  // 1. Rapid 2-3 Frame Camera Shake (Violent initial shockwave, rapid decay)
  const shakeDecay = interpolate(frame, [0, 3, 10, 24], [1.8, 1.2, 0.4, 0.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const blastShakeX = Math.sin(frame * 4.6) * 36 * shakeDecay;
  const blastShakeY = Math.cos(frame * 5.2) * 28 * shakeDecay;

  // Initial 2-3 frame radial flash and radial blur decay
  const radialFlashAlpha = interpolate(frame, [0, 2, 5], [0.95, 0.6, 0.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const radialBlurStdDev = interpolate(frame, [0, 2, 5], [7, 3, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Parallax Background Offsets
  const zenithParallaxY = interpolate(frame, [0, 160], [-25, 25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const earthParallaxY = interpolate(frame, [0, 160], [25, -25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Multi-Tiered Organic Fireball Bloom & Wobble
  const blastScale =
    frame < 22
      ? interpolate(frame, [0, 8, 22], [0.42, 1.32, 1.05], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 1.05 + 0.03 * Math.sin(frame * 0.18);

  const coreFlash =
    frame < 16
      ? interpolate(frame, [0, 4, 16], [1.0, 1.0, 0.45], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0.3 + 0.1 * Math.sin(frame * 0.25);

  const fireballAlpha = interpolate(frame, [0, 90, 160], [1, 0.95, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const wobble = Math.sin(Math.floor(frame / 3) * 0.25) * 6;
  const cloudletDrift = interpolate(frame, [0, 160], [0, 75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const outerScales = [1.1, 0.92, 1.14, 0.9, 1.08, 0.94, 1.15, 0.91, 1.05, 0.95, 1.12, 0.96];
  const midScales = [1.08, 0.91, 1.07, 0.93, 1.12, 0.92, 1.06, 0.9, 1.1, 0.94];
  const innerScales = [1.1, 0.93, 1.08, 0.92, 1.14, 0.94, 1.06, 0.95];

  const outerPath = createStratosphereBlastLobe(235, 12, outerScales, wobble);
  const midPath = createStratosphereBlastLobe(170, 10, midScales, -wobble);
  const innerPath = createStratosphereBlastLobe(110, 8, innerScales, wobble * 0.5);

  const spikeAngles = [0, 26, 52, 78, 104, 130, 156, 182, 208, 234, 260, 286, 312, 338];
  const spikeLengths = [360, 395, 350, 410, 365, 390, 355, 400, 360, 395, 350, 405, 365, 385];

  const cloudlets = [
    { x: 240, y: -200, r: 24 },
    { x: -220, y: -190, r: 26 },
    { x: 300, y: 35, r: 28 },
    { x: -290, y: 25, r: 25 },
    { x: 240, y: 200, r: 24 },
    { x: -230, y: 190, r: 27 },
    { x: 30, y: -260, r: 22 },
    { x: 40, y: 255, r: 25 },
  ];

  // 4. Concentric Mach Shockwave Rings
  const shockR1 = interpolate(frame, [0, 50], [70, 580], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockAlpha1 = interpolate(frame, [0, 12, 50], [0.95, 0.65, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const shockR2 = interpolate(frame, [0, 42], [50, 460], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockAlpha2 = interpolate(frame, [0, 10, 42], [0.95, 0.55, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 5. Stylized Black Fragmentation Shrapnel (Slicing outward radially)
  const shrapnelProg = interpolate(frame, [0, 50], [0, 720], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shrapnelAlpha = interpolate(frame, [0, 8, 38, 55], [0.95, 1.0, 0.7, 0.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 6. Breakup Choreography
  // Main aircraft fuselage & left wing (Tumbling in inverted spin)
  const planeTumbleX = interpolate(frame, [0, 160], [0, -140], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const planeTumbleY = interpolate(frame, [0, 160], [0, 320], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const planeSpinDeg = interpolate(frame, [0, 160], [0, 360 * 2.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Sliced Horizontal Stabilizer (Empennage severed, drifting back-upward)
  const tailSeverProg = interpolate(frame, [0, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tailX = -Math.pow(tailSeverProg, 0.85) * 310;
  const tailY = -Math.pow(tailSeverProg, 0.85) * 200;
  const tailRot = tailSeverProg * -380;

  // Sliced Right Wingtip (Cleanly separated, fluttering down-right)
  const wingtipSeverProg = interpolate(frame, [0, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const wingtipX = Math.pow(wingtipSeverProg, 0.85) * 380;
  const wingtipY = Math.pow(wingtipSeverProg, 0.85) * 310;
  const wingtipRot = wingtipSeverProg * 500;

  // 7. HUD Emergency Flashing Cadence
  const alertBlink = frame % 8 < 5;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: `translate(${blastShakeX}px, ${blastShakeY}px)`,
        transformOrigin: 'center center',
      }}
    >
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          {/* Deep Indigo Zenith Gradient */}
          <linearGradient id="deepIndigoZenith" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050814" />
            <stop offset="45%" stopColor="#0D162B" />
            <stop offset="100%" stopColor="#152238" />
          </linearGradient>

          {/* Curved Earth Horizon Gradient */}
          <linearGradient id="curvedEarthGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1B2B" />
            <stop offset="100%" stopColor="#040910" />
          </linearGradient>

          {/* Rapid 2-3 Frame Radial Shock Blur Filter */}
          <filter id="radialBlastBlur">
            <feGaussianBlur stdDeviation={radialBlurStdDev} />
          </filter>

          {/* Volumetric Blast Core Aura */}
          <radialGradient id="u2BlastCoreAuraScene7" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#FDE047" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#F97316" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#EF4444" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* PARALLAX LAYER 1: Deep Indigo Zenith Sky Sheet */}
        <g transform={`translate(0, ${zenithParallaxY})`}>
          <rect x="0" y="0" width="1080" height="1920" fill="url(#deepIndigoZenith)" />
          {/* Stratospheric Star Points */}
          {[
            { cx: 120, cy: 940, r: 2.2 },
            { cx: 280, cy: 890, r: 1.8 },
            { cx: 820, cy: 920, r: 2.0 },
            { cx: 950, cy: 970, r: 1.6 },
            { cx: 480, cy: 880, r: 1.5 },
            { cx: 640, cy: 950, r: 2.0 },
          ].map((pt, i) => (
            <circle key={i} cx={pt.cx} cy={pt.cy} r={pt.r} fill="#FFFFFF" opacity={0.65} />
          ))}
        </g>

        {/* PARALLAX LAYER 2: Curved Earth Horizon with Flat Vector Oceanic & Land Contours */}
        <g transform={`translate(0, ${earthParallaxY})`}>
          {/* Earth Curvature Silhouette */}
          <path d="M -120 1760 Q 540 1520 1200 1760 L 1200 1920 L -120 1920 Z" fill="url(#curvedEarthGrad)" />
          {/* Luminous Cyan Atmospheric Ozone Rim */}
          <path d="M -120 1760 Q 540 1520 1200 1760" stroke="#00F5FF" strokeWidth="6" fill="none" opacity="0.9" />
          <path d="M -120 1760 Q 540 1520 1200 1760" stroke="#3A86FF" strokeWidth="18" fill="none" opacity="0.35" />

          {/* Flat 2D Vector Continental Landmass Silhouette (Urals & Asian Steppe below) */}
          <path
            d="M 220 1720 Q 320 1660 440 1710 Q 560 1680 640 1740 L 640 1920 L 220 1920 Z"
            fill="#122538"
            opacity="0.65"
          />
        </g>

        {/* DETONATION TREATMENT: Multi-Tiered Scalloped Fireball, Mach Shockwaves & Shrapnel */}
        <g transform="translate(540, 1260)">
          {/* Ambient Volumetric Blast Glow */}
          <circle cx="0" cy="0" r="420" fill="url(#u2BlastCoreAuraScene7)" opacity={fireballAlpha * 0.75} />

          {/* Rapid 2-3 Frame Radial Blast Flash */}
          {radialFlashAlpha > 0.01 && (
            <circle cx="0" cy="0" r="340" fill="#FFFFFF" opacity={radialFlashAlpha} />
          )}

          {/* Mach Shockwave Rings */}
          <g>
            {/* Cyan Atmospheric Shockwave */}
            <circle
              r={shockR1}
              fill="none"
              stroke="#38BDF8"
              strokeWidth={6}
              opacity={shockAlpha1}
            />
            {/* Primary Mach Detonation Front */}
            <circle
              r={shockR2}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={4.5}
              opacity={shockAlpha2}
            />
            {/* Concentric Geometric Octagon Shockwave */}
            <polygon
              points={`
                0,${-shockR2 * 0.78}
                ${shockR2 * 0.55},${-shockR2 * 0.55}
                ${shockR2 * 0.78},0
                ${shockR2 * 0.55},${shockR2 * 0.55}
                0,${shockR2 * 0.78}
                ${-shockR2 * 0.55},${shockR2 * 0.55}
                ${-shockR2 * 0.78},0
                ${-shockR2 * 0.55},${-shockR2 * 0.55}
              `}
              fill="none"
              stroke="#F59E0B"
              strokeWidth={3}
              opacity={shockAlpha2 * 0.85}
            />
          </g>

          {/* Scaled Multi-Tiered Scalloped Fireball Vector */}
          <g transform={`scale(${blastScale})`} opacity={fireballAlpha}>
            {/* Sharp Radiating Supersonic Fire Spikes */}
            <g>
              {spikeAngles.map((deg, idx) => {
                const len = spikeLengths[idx];
                return (
                  <g key={deg} transform={`rotate(${deg})`}>
                    <polygon
                      points={`0,-${len} -18,-160 18,-160`}
                      fill="#F97316"
                      stroke="#C2410C"
                      strokeWidth={2}
                    />
                    <polygon
                      points={`0,-${len - 35} -8,-180 8,-180`}
                      fill="#FDE047"
                    />
                  </g>
                );
              })}
            </g>

            {/* Outer Billowing Crimson Cloud Lobes (#DC2626 / #7F1D1D) */}
            <path
              d={outerPath}
              fill="#DC2626"
              stroke="#7F1D1D"
              strokeWidth={4}
            />

            {/* Mid-Tier Blazing Amber-Orange Cloud Lobes (#F97316 / #C2410C) */}
            <path
              d={midPath}
              fill="#F97316"
              stroke="#C2410C"
              strokeWidth={3.5}
            />

            {/* Inner Radiant Canary Yellow Cloud Lobes (#FDE047 / #D97706) */}
            <path
              d={innerPath}
              fill="#FDE047"
              stroke="#D97706"
              strokeWidth={2.5}
            />

            {/* Epicenter 8-Pointed White-Hot Core Flash Star */}
            <g transform={`scale(${1 + Math.sin(frame * 0.4) * 0.08})`}>
              <path
                d="M 0 -115 Q 16 -38 82 -82 Q 38 -16 115 0 Q 38 16 82 82 Q 16 38 0 115 Q -16 38 -82 82 Q -38 16 -115 0 Q -38 -16 -82 -82 Q -16 -38 0 -115 Z"
                fill="#FFFFFF"
                stroke="#FEF08A"
                strokeWidth={4}
              />
              <circle cx="0" cy="0" r="28" fill="#FFFFFF" />
              <circle cx="0" cy="0" r="18" fill="#FEF08A" opacity={coreFlash} />
            </g>

            {/* Detached Flying Cloudlets Drifting Into Stratosphere */}
            {cloudlets.map((cl, idx) => {
              const rad = Math.atan2(cl.y, cl.x);
              const dx = cl.x + Math.cos(rad) * cloudletDrift;
              const dy = cl.y + Math.sin(rad) * cloudletDrift;
              return (
                <g key={idx} transform={`translate(${dx}, ${dy})`}>
                  <ellipse
                    cx="0"
                    cy="0"
                    rx={cl.r}
                    ry={cl.r * 0.85}
                    fill="#F97316"
                    stroke="#C2410C"
                    strokeWidth={2}
                  />
                  <circle cx={-cl.r * 0.35} cy={-cl.r * 0.15} r={cl.r * 0.55} fill="#F97316" />
                </g>
              );
            })}
          </g>

          {/* Stylized Black Fragmentation Shrapnel Slicing Outward Across Frame */}
          {shrapnelAlpha > 0.01 && (
            <g opacity={shrapnelAlpha}>
              {[
                { angle: 18, len: 48, w: 12 },
                { angle: 55, len: 60, w: 14 },
                { angle: 92, len: 52, w: 11 },
                { angle: 135, len: 65, w: 15 },
                { angle: 172, len: 46, w: 10 },
                { angle: 210, len: 58, w: 14 },
                { angle: 250, len: 62, w: 15 },
                { angle: 290, len: 50, w: 12 },
                { angle: 325, len: 56, w: 13 },
                { angle: 358, len: 64, w: 16 },
              ].map((shard, idx) => {
                const rad = (shard.angle * Math.PI) / 180;
                const sx = Math.cos(rad) * shrapnelProg;
                const sy = Math.sin(rad) * shrapnelProg;
                return (
                  <g key={idx} transform={`translate(${sx}, ${sy}) rotate(${shard.angle})`}>
                    {/* Razor-Sharp Geometric Shrapnel Polygon */}
                    <polygon
                      points={`0,${-shard.len} ${shard.w},0 0,${shard.len * 0.4} ${-shard.w},0`}
                      fill="#0A0E14"
                      stroke="#FF3B30"
                      strokeWidth={2.2}
                    />
                    {/* Ballistic Ejection Ray Line */}
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2={shard.len * 2.0}
                      stroke="#FF6B35"
                      strokeWidth={2.5}
                      strokeDasharray="6 4"
                    />
                  </g>
                );
              })}
            </g>
          )}
        </g>

        {/* BREAKUP CHOREOGRAPHY: Dotted Debris Trajectories & Speed Lines */}
        <g transform="translate(540, 1260)">
          {/* Dotted Trajectory: Severed Horizontal Stabilizer (Arcs backward-upward to the left) */}
          <path
            d={`M 0 40 Q -120 -40 ${tailX} ${40 + tailY}`}
            stroke="#FF3B30"
            strokeWidth={3.5}
            strokeDasharray="8 6"
            fill="none"
            opacity="0.9"
          />

          {/* Dotted Trajectory: Severed Wingtip (Arcs outward-downward to the right) */}
          <path
            d={`M 260 -10 Q 380 120 ${260 + wingtipX} ${-10 + wingtipY}`}
            stroke="#00F5FF"
            strokeWidth={3.5}
            strokeDasharray="8 6"
            fill="none"
            opacity="0.9"
          />

          {/* Dynamic Speed Lines Parallel to Separation */}
          <g opacity={interpolate(frame, [0, 80], [0.9, 0.1], { extrapolateRight: 'clamp' })}>
            <line x1="-30" y1="40" x2="-220" y2="-60" stroke="#FFFFFF" strokeWidth={3} strokeDasharray="18 10" />
            <line x1="-60" y1="80" x2="-260" y2="-20" stroke="#FFE600" strokeWidth={2.5} strokeDasharray="14 8" />
            <line x1="280" y1="10" x2="450" y2="130" stroke="#FFFFFF" strokeWidth={3} strokeDasharray="18 10" />
            <line x1="320" y1="-20" x2="500" y2="90" stroke="#00F5FF" strokeWidth={2.5} strokeDasharray="14 8" />
          </g>

          {/* COMPONENT 1: Sliced Horizontal Stabilizer (Empennage) Tumble */}
          <g transform={`translate(${tailX}, ${40 + tailY}) rotate(${tailRot})`}>
            {/* Flat 2D Sliced Stabilizer Vector */}
            <path
              d="M -90 0 L 0 -12 L 90 0 L 82 18 L 0 8 L -82 18 Z"
              fill="#12161F"
              stroke="#FF3B30"
              strokeWidth={2.5}
            />
            {/* Sheared Mounting Spar & Red Fractured Ribs */}
            <rect x="-8" y="-14" width="16" height="8" fill="#E63946" />
            <line x1="-6" y1="-10" x2="6" y2="-10" stroke="#FFFFFF" strokeWidth="2" />
            {/* Vertical Tail Fin Shard */}
            <polygon points="0,-12 18,-55 0,-50" fill="#181F2B" stroke="#FF3B30" strokeWidth="1.5" />
          </g>

          {/* COMPONENT 2: Sliced Right Wingtip Tumble */}
          <g transform={`translate(${260 + wingtipX}, ${-10 + wingtipY}) rotate(${wingtipRot})`}>
            {/* Cleanly Separated Outer Wingtip Section (Aspect Ratio 10.6 Glider Foil) */}
            <path
              d="M 0 0 L 160 18 L 156 30 L 0 16 Z"
              fill="#12161F"
              stroke="#00F5FF"
              strokeWidth="2.5"
            />
            {/* Fractured Internal Wing Rib / Spar Cut */}
            <polygon points="0,0 12,8 0,16 -4,8" fill="#E63946" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="0" y2="16" stroke="#FF3B30" strokeWidth="3" />
            {/* Wingtip Pogo Outrigger Socket */}
            <circle cx="150" cy="24" r="3.5" fill="#FFE600" />
          </g>

          {/* COMPONENT 3: Main Aircraft Airframe (Inverted Tumbling Death-Spin) */}
          <g transform={`translate(${planeTumbleX}, ${planeTumbleY}) rotate(${planeSpinDeg})`}>
            {/* Slender Pencil Fuselage with Cockpit Canopy */}
            <path
              d="M 0 -140 C 12 -140 18 -70 18 35 L 14 80 L -14 80 L -18 35 C -18 -70 -12 -140 0 -140 Z"
              fill="#12161F"
              stroke="#3A4758"
              strokeWidth="3"
            />

            {/* Jagged Tail Sever Fracture (Where Stabilizer Cleanly Sliced Off) */}
            <polygon points="-14,80 14,80 10,96 -2,88 -12,98" fill="#E63946" stroke="#FF3B30" strokeWidth="2.5" />

            {/* Fully Intact Left Glider Wing (Flat 2D High-Contrast Silhouette) */}
            <path
              d="M -420 5 L -50 -25 L 0 -20 L -50 0 L -416 18 Z"
              fill="#181F2B"
              stroke="#3A4758"
              strokeWidth="2.5"
            />

            {/* Incomplete Right Wing (Clean Shear Cut at 65% Span) */}
            <path
              d="M 0 -20 L 50 -25 L 260 0 L 260 14 L 50 0 Z"
              fill="#181F2B"
              stroke="#3A4758"
              strokeWidth="2.5"
            />
            {/* Bright Red Internal Spar Shear Cut */}
            <line x1="260" y1="0" x2="260" y2="14" stroke="#FF3B30" strokeWidth="4.5" strokeLinecap="round" />
            <polygon points="260,0 272,7 260,14" fill="#E63946" />

            {/* Cheek Jet Air Intakes */}
            <path d="M -18 -35 L -30 -30 L -28 -5 L -16 -10 Z" fill="#080B0F" />
            <path d="M 18 -35 L 30 -30 L 28 -5 L 16 -10 Z" fill="#080B0F" />

            {/* Jettisoned Canopy Opening with Emergency Red Flashing Cockpit */}
            <ellipse cx="0" cy="-70" rx="8" ry="24" fill="#E63946" opacity="0.85" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        </g>
      </svg>

      {/* HUD / TELEMETRY OVERLAYS: Bold Red Flashing Catastrophic Readouts (top: 670 for safe headroom & no aircraft collision) */}
      <div
        style={{
          position: 'absolute',
          top: 670,
          left: 60,
          right: 60,
          padding: '18px 24px',
          backgroundColor: '#12090B',
          border: '3px solid #FF3B30',
          borderRadius: 8,
          boxShadow: alertBlink
            ? '0 0 35px rgba(255, 59, 48, 0.85), inset 0 0 20px rgba(255, 59, 48, 0.25)'
            : '0 12px 36px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Primary Flashing Failure Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid rgba(255, 59, 48, 0.45)',
            paddingBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: montserrat.fontFamily,
              fontSize: 30,
              color: alertBlink ? '#FF3B30' : '#FFFFFF',
              letterSpacing: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ color: '#FF3B30', fontSize: 32 }}>⚠</span> CATASTROPHIC FAILURE
          </span>
          <span
            style={{
              fontFamily: montserrat.fontFamily,
              fontSize: 18,
              fontWeight: 900,
              color: '#FFE600',
              backgroundColor: '#260B0E',
              padding: '4px 10px',
              borderRadius: 4,
              border: '1px solid #FF3B30',
            }}
          >
            SYS: 0% REDUNDANCY
          </span>
        </div>

        {/* The Exact 3 User-Requested Telemetry Readouts Flashing in Bold Red */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr 1.15fr',
            gap: 10,
            marginTop: 2,
          }}
        >
          {/* Readout 1: ALT: 70,500 FT */}
          <div
            style={{
              backgroundColor: '#1E1215',
              border: '2px solid rgba(255, 230, 0, 0.6)',
              borderRadius: 6,
              padding: '10px 12px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: montserrat.fontFamily, fontSize: 13, fontWeight: 700, color: '#A8B2C1', letterSpacing: 1.5 }}>
              TELEMETRY
            </div>
            <div
              style={{
                fontFamily: montserrat.fontFamily,
                fontSize: 24,
                color: '#FFE600',
                letterSpacing: 1,
                marginTop: 2,
              }}
            >
              ALT: 70,500 FT
            </div>
          </div>

          {/* Readout 2: PITCH TRIM: FAILED */}
          <div
            style={{
              backgroundColor: alertBlink ? 'rgba(255, 59, 48, 0.25)' : '#1E1215',
              border: '2px solid #FF3B30',
              borderRadius: 6,
              padding: '10px 12px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: montserrat.fontFamily, fontSize: 13, fontWeight: 700, color: '#FF9E99', letterSpacing: 1.5 }}>
              FLIGHT CONTROL
            </div>
            <div
              style={{
                fontFamily: montserrat.fontFamily,
                fontSize: 24,
                color: alertBlink ? '#FF3B30' : '#FFFFFF',
                letterSpacing: 1,
                marginTop: 2,
              }}
            >
              PITCH TRIM: <span style={{ color: '#FF3B30', textDecoration: 'underline' }}>FAILED</span>
            </div>
          </div>

          {/* Readout 3: G-LIMIT EXCEEDED */}
          <div
            style={{
              backgroundColor: alertBlink ? '#FF3B30' : '#2A0D10',
              border: '2px solid #FF3B30',
              borderRadius: 6,
              padding: '10px 12px',
              textAlign: 'center',
              boxShadow: alertBlink ? '0 0 16px rgba(255, 59, 48, 0.9)' : 'none',
            }}
          >
            <div
              style={{
                fontFamily: montserrat.fontFamily,
                fontSize: 13,
                color: alertBlink ? '#150608' : '#FF9E99',
                fontWeight: 800,
                letterSpacing: 1.5,
              }}
            >
              AIRFRAME LOAD
            </div>
            <div
              style={{
                fontFamily: montserrat.fontFamily,
                fontSize: 24,
                color: alertBlink ? '#FFFFFF' : '#FF3B30',
                letterSpacing: 1,
                marginTop: 2,
              }}
            >
              G-LIMIT EXCEEDED
            </div>
          </div>
        </div>

        {/* Secondary Sub-Telemetry Stream */}
        <div
          style={{
            fontFamily: montserrat.fontFamily,
            fontSize: 15,
            fontWeight: 700,
            color: '#B0BAC5',
            letterSpacing: 1,
            textAlign: 'center',
            borderTop: '1px dashed rgba(255,255,255,0.15)',
            paddingTop: 6,
          }}
        >
          EMPENNAGE SHEARED // ASYMMETRIC WING OVERLOAD // INVERTED FLAT SPIN DETECTED
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 8. SCENE 08: BAILOUT & DESTRUCT SWITCH TENSION TO PARACHUTE BLOOM
// Split-Screen Tension (Frames 0-135):
//   Top Panel: Animated character profile of Powers struggling in helmet & MC-3 suit.
//   Bottom Panel: Vector diagram of destruct switches (DESTRUCT 1 / 2) with gloved
//                 hand desperately stretching but failing to reach before being pulled out.
// High-Altitude Freefall to Parachute Bloom (Frames 125-277):
//   Burning U-2 fuselage spiraling down into background clouds while tiny white silhouette
//   of Powers freefalls until a large white parachute snaps open with bold graphic speed lines.
// =========================================================================
export const PowersBailoutAndCurareCoinCard: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1 (Frames 0 - 50): Split-Screen Tension
  const splitAlpha = interpolate(frame, [42, 50], [1, 0], { extrapolateRight: 'clamp' });
  const splitScale = interpolate(frame, [42, 50], [1, 1.05], { extrapolateRight: 'clamp' });

  // Phase 2 (Frames 44 - end): High-Altitude Freefall & Parachute Bloom
  const freefallAlpha = interpolate(frame, [44, 52], [0, 1], { extrapolateRight: 'clamp' });

  // 1. TOP PANEL: Powers Cockpit Struggle
  const cockpitShakeX = Math.sin(frame * 5.4) * (frame < 45 ? 7 : 0);
  const cockpitShakeY = Math.cos(frame * 4.6) * (frame < 45 ? 5 : 0);
  const headStrainDeg = interpolate(frame, [0, 15, 30, 44], [2, -6, -14, -22], { extrapolateRight: 'clamp' });
  const redAlertStrobe = frame % 8 < 4;

  // 2. BOTTOM PANEL: Destruct Switches & Straining Gloved Hand
  // Hand stretches from right (x = 940) toward DESTRUCT 2 switch (x = 450)
  // At peak extension (frame 28-32), hand reaches peak 655 (fingertip at 463, literally 13px from DESTRUCT 2).
  // At frame 30, red stamp slams down; at frame 32-44, -9G rips pilot backward and up.
  const handReachX = interpolate(
    frame,
    [0, 12, 22, 30, 42],
    [940, 780, 665, 655, 1060],
    { extrapolateRight: 'clamp' }
  );
  const handTrembleY = Math.sin(frame * 9.2) * (frame < 34 ? 6 : 0);
  const handLiftY = interpolate(frame, [32, 44], [0, -220], { extrapolateRight: 'clamp' });
  const stampSlam = interpolate(frame, [30, 34], [1.8, 1.0], { extrapolateRight: 'clamp' });

  // 3. PHASE 2: Burning Fuselage Spiraling into Clouds
  const planeSpiralX = interpolate(frame, [44, 160], [460, 210], { extrapolateRight: 'clamp' });
  const planeSpiralY = interpolate(frame, [44, 160], [740, 1600], { extrapolateRight: 'clamp' });
  const planeSpiralScale = interpolate(frame, [44, 160], [0.85, 0.22], { extrapolateRight: 'clamp' });
  const planeSpiralRot = frame * 7.5;
  const planeSpiralAlpha = interpolate(frame, [135, 160], [1, 0], { extrapolateRight: 'clamp' });

  // Tiny white silhouette of Powers in freefall (drops from 70k to 15k ft between frames 44 and 65)
  const freefallY = interpolate(frame, [44, 65], [750, 1120], { extrapolateRight: 'clamp' });
  const freefallAlt = Math.round(interpolate(frame, [44, 65], [70000, 15000], { extrapolateRight: 'clamp' }));

  // Parachute bloom snaps open at Frame 65!
  const isBloomed = frame >= 65;
  const bloomScale = interpolate(frame, [65, 69, 78, 88], [0.05, 1.4, 0.94, 1.0], { extrapolateRight: 'clamp' });
  const parachuteDecelAlpha = interpolate(frame, [65, 70, 95], [0, 1, 0], { extrapolateRight: 'clamp' });
  const pilotSwayDeg = isBloomed ? Math.sin((frame - 65) * 0.12) * 5.5 : 0;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* =========================================================================
          PHASE 1: SPLIT-SCREEN TENSION (Frames 0 - 138)
          ========================================================================= */}
      {splitAlpha > 0.01 && (
        <div
          style={{
            position: 'absolute',
            top: 640,
            left: 40,
            right: 40,
            height: 980,
            opacity: splitAlpha,
            transform: `scale(${splitScale})`,
            transformOrigin: 'center center',
            backgroundColor: '#0C1118',
            border: '3px solid #2B3B4C',
            borderRadius: 8,
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85)',
            overflow: 'hidden',
          }}
        >
          <svg viewBox="0 0 1000 980" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <defs>
              {/* Helmet Visor Elliptical Clip (Centered on Gary Powers face) */}
              <clipPath id="powersVisorClip">
                <ellipse cx="250" cy="230" rx="95" ry="115" />
              </clipPath>

              {/* Diagonal Warning Hazard Pattern */}
              <pattern id="hazardStripePattern" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect x="0" y="0" width="15" height="30" fill="#FFE600" />
                <rect x="15" y="0" width="15" height="30" fill="#141820" />
              </pattern>
            </defs>

            {/* -------------------------------------------------------------------
                TOP PANEL: Animated Profile of Powers Struggling (y: 0 to 485)
                ------------------------------------------------------------------- */}
            <g transform={`translate(${cockpitShakeX}, ${cockpitShakeY})`}>
              {/* Cockpit Shell Background */}
              <rect x="0" y="0" width="1000" height="485" fill="#111722" />

              {/* Jettisoned Canopy Opening: Upper Stratosphere Horizon visible above cockpit sill */}
              <path d="M 0 0 L 1000 0 L 1000 90 L 0 110 Z" fill="#060A14" />
              <line x1="0" y1="110" x2="1000" y2="90" stroke="#FF3B30" strokeWidth="3" strokeDasharray="16 8" />
              {/* Shattered canopy latches */}
              <rect x="180" y="100" width="24" height="12" fill="#E63946" />
              <rect x="520" y="93" width="24" height="12" fill="#E63946" />
              <rect x="840" y="86" width="24" height="12" fill="#E63946" />

              {/* Red Alarm Cockpit Strobe Light */}
              {redAlertStrobe && (
                <rect x="0" y="0" width="1000" height="485" fill="#FF3B30" opacity="0.18" />
              )}

              {/* Pilot Body & Torso: MC-3 Full-Pressure Suit */}
              <g transform="translate(145, 290) scale(1.2)">
                {/* Ejection Seat Headrest & Armor Bulkhead */}
                <rect x="-110" y="-140" width="80" height="260" rx="8" fill="#1E2733" stroke="#2D3A4B" strokeWidth="2.5" />
                <rect x="-95" y="-120" width="50" height="90" rx="6" fill="#3D4B5C" />
                <line x1="-110" y1="-30" x2="-30" y2="-30" stroke="#FF3B30" strokeWidth="3" />

                {/* Torso & Shoulders in High-Altitude Pressure Suit */}
                <path
                  d="M -50 40 L -10 18 L 90 25 L 160 180 L -70 180 Z"
                  fill="#2A382D"
                  stroke="#1C271E"
                  strokeWidth="3"
                />

                {/* Nylon Harness Straps & Chest Buckle */}
                <line x1="-10" y1="20" x2="50" y2="180" stroke="#161F17" strokeWidth="18" />
                <line x1="70" y1="25" x2="20" y2="180" stroke="#161F17" strokeWidth="18" />
                <circle cx="38" cy="95" r="16" fill="#788896" stroke="#1A222B" strokeWidth="2" />

                {/* Chest Oxygen Regulator Console */}
                <rect x="45" y="80" width="80" height="95" rx="6" fill="#1C262F" stroke="#2EC4B6" strokeWidth="2" />
                <circle cx="68" cy="112" r="13" fill="#131B22" stroke="#2EC4B6" strokeWidth="1.5" />
                <line x1="68" y1="112" x2="76" y2="105" stroke="#FFE600" strokeWidth="2.5" />
                <circle cx="102" cy="112" r="11" fill="#131B22" stroke="#2EC4B6" strokeWidth="1.5" />
                <line x1="102" y1="112" x2="96" y2="107" stroke="#FF5400" strokeWidth="2.5" />
                <text x="56" y="158" fill="#2EC4B6" fontFamily={montserrat.fontFamily} fontSize="11" fontWeight="bold">
                  O2 REG
                </text>
              </g>

              {/* Powers Articulated Strained Head & Helmet */}
              <g transform={`translate(250, 230) rotate(${headStrainDeg}) translate(-250, -230)`}>
                {/* Thick Corrugated Oxygen Hose */}
                <path
                  d="M 240 340 C 260 405, 195 405, 205 340"
                  stroke="#3D4E41"
                  strokeWidth="20"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 240 340 C 260 405, 195 405, 205 340"
                  stroke="#1F2820"
                  strokeWidth="20"
                  strokeDasharray="5 10"
                  fill="none"
                />

                {/* Neck Locking Ring & Collar Clamp */}
                <ellipse cx="240" cy="320" rx="78" ry="24" fill="#4A5666" stroke="#6D7E91" strokeWidth="3" />
                <rect x="198" y="314" width="22" height="12" fill="#FFE600" />

                {/* White MA-2 High-Altitude Pressure Helmet Shell */}
                <ellipse cx="245" cy="235" rx="118" ry="136" fill="#F2EFE9" stroke="#333E4D" strokeWidth="3.5" />
                <path d="M 145 250 Q 130 120 250 105 Q 360 120 355 240" fill="none" stroke="#D1CCC0" strokeWidth="5" />

                {/* Spherical Visor Aperture */}
                <ellipse cx="250" cy="230" rx="98" ry="118" fill="#0C131D" stroke="#24303E" strokeWidth="3.5" />

                {/* Gary Powers Parametric Vector Silhouette & Oxygen Mask Inside Helmet Visor */}
                <g clipPath="url(#powersVisorClip)">
                  <rect x="142" y="112" width="235" height="245" fill="#090D12" />
                  {/* Backlit Visor Interior Rim Glow */}
                  <ellipse cx="250" cy="220" rx="88" ry="102" fill="#16221E" opacity="0.75" />
                  {/* Pilot Brow & Eyes Silhouette */}
                  <path
                    d="M 185 188 Q 250 175 315 188 L 310 218 Q 250 208 190 218 Z"
                    fill="#1E293B"
                  />
                  <ellipse cx="220" cy="202" rx="14" ry="7" fill="#ECFDF5" opacity="0.82" />
                  <ellipse cx="280" cy="202" rx="14" ry="7" fill="#ECFDF5" opacity="0.82" />
                  <circle cx="220" cy="202" r="4.5" fill="#090D12" />
                  <circle cx="280" cy="202" r="4.5" fill="#090D12" />
                  {/* High-Altitude MS-22001 Oxygen Mask Vector */}
                  <path
                    d="M 205 225 L 250 206 L 295 225 L 308 295 Q 250 325 192 295 Z"
                    fill="#111827"
                    stroke="#38BDF8"
                    strokeWidth="2"
                    strokeOpacity="0.45"
                  />
                  <circle cx="250" cy="272" r="22" fill="#090D12" stroke="#4A5666" strokeWidth="3" />
                  {/* Visor Glare & Specular Reflection Sheen */}
                  <ellipse cx="230" cy="175" rx="70" ry="44" fill="none" stroke="#38BDF8" strokeWidth="3.5" opacity="0.65" transform="rotate(-20, 230, 175)" />
                  <ellipse cx="235" cy="180" rx="60" ry="32" fill="none" stroke="#ECFDF5" strokeWidth="2.5" opacity="0.85" transform="rotate(-20, 235, 180)" />
                  {/* Red Strobe Warning Glow on Visor */}
                  {redAlertStrobe && (
                    <ellipse cx="250" cy="230" rx="98" ry="118" fill="#EF4444" opacity="0.35" />
                  )}
                </g>

                {/* Visor Bezel & Center Locking Pivot Knobs */}
                <ellipse cx="250" cy="230" rx="100" ry="120" fill="none" stroke="#5D6D7E" strokeWidth="3.5" />
                <circle cx="150" cy="230" r="11" fill="#222C38" stroke="#FFE600" strokeWidth="2" />
                <circle cx="350" cy="230" r="11" fill="#222C38" stroke="#FFE600" strokeWidth="2" />
              </g>

              {/* COCKPIT DIAL CLUSTER & HUD READOUTS (Right Side: x = 480 to 970) */}
              <g transform="translate(480, 115)">
                {/* 3 Cockpit Instrument Dials */}
                {/* Dial 1: Altimeter */}
                <g transform="translate(65, 50)">
                  <circle cx="0" cy="0" r="44" fill="#0E141C" stroke="#3A4D60" strokeWidth="3" />
                  <circle cx="0" cy="0" r="40" fill="none" stroke="#60768C" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="0" x2="0" y2="-30" stroke="#FFE600" strokeWidth="3.5" strokeLinecap="round" transform="rotate(220)" />
                  <circle cx="0" cy="0" r="5" fill="#FFE600" />
                  <text x="0" y="16" fill="#A8B8C8" fontFamily={montserrat.fontFamily} fontSize="11" fontWeight="bold" textAnchor="middle">ALT</text>
                  <text x="0" y="62" fill="#FFE600" fontFamily={montserrat.fontFamily} fontSize="15" textAnchor="middle">70,500 FT</text>
                </g>

                {/* Dial 2: Variometer / Vertical Speed */}
                <g transform="translate(205, 50)">
                  <circle cx="0" cy="0" r="44" fill="#0E141C" stroke="#3A4D60" strokeWidth="3" />
                  <circle cx="0" cy="0" r="40" fill="none" stroke="#60768C" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="0" x2="0" y2="-30" stroke="#FF5400" strokeWidth="3.5" strokeLinecap="round" transform="rotate(130)" />
                  <circle cx="0" cy="0" r="5" fill="#FF5400" />
                  <text x="0" y="16" fill="#A8B8C8" fontFamily={montserrat.fontFamily} fontSize="11" fontWeight="bold" textAnchor="middle">VSI</text>
                  <text x="0" y="62" fill="#FF5400" fontFamily={montserrat.fontFamily} fontSize="14" textAnchor="middle">-12,000 FPM</text>
                </g>

                {/* Dial 3: G-Meter Pegged at -9.2G */}
                <g transform="translate(345, 50)">
                  <circle cx="0" cy="0" r="44" fill="#1C0A0D" stroke="#FF3B30" strokeWidth="3" />
                  <circle cx="0" cy="0" r="40" fill="none" stroke="#FF5252" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="0" x2="0" y2="-30" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" transform="rotate(290)" />
                  <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
                  <text x="0" y="16" fill="#FF9E99" fontFamily={montserrat.fontFamily} fontSize="11" fontWeight="bold" textAnchor="middle">G-LOAD</text>
                  <text x="0" y="62" fill="#FF3B30" fontFamily={montserrat.fontFamily} fontSize="16" textAnchor="middle">-9.2G</text>
                </g>

                {/* Live Cockpit Telemetry Box */}
                <g transform="translate(0, 142)">
                  <rect x="0" y="0" width="480" height="92" rx="6" fill="#141C26" stroke="#3D5066" strokeWidth="2" />
                  <text x="20" y="30" fill="#FFE600" fontFamily={montserrat.fontFamily} fontSize="15" fontWeight="bold">
                    PILOT: FRANCIS GARY POWERS
                  </text>
                  <text x="20" y="56" fill="#F4EFE6" fontFamily={barlow.fontFamily} fontSize="21" fontWeight="bold">
                    MC-3 PRESSURE: 5.0 PSI • COCKPIT OPEN
                  </text>
                  <text x="20" y="82" fill="#FF5252" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="bold">
                    CENTRIFUGAL FORCE: -9.2G (PINNED TO SILL)
                  </text>
                </g>

                {/* Flashing Negative-G Alert Pill */}
                <g transform="translate(0, 250)">
                  <rect
                    x="0"
                    y="0"
                    width="480"
                    height="70"
                    rx="4"
                    fill={redAlertStrobe ? '#800F15' : '#1C0B0E'}
                    stroke="#FF3B30"
                    strokeWidth="2.5"
                  />
                  <text
                    x="24"
                    y="44"
                    fill="#FFFFFF"
                    fontFamily={montserrat.fontFamily}
                    fontSize="24"
                    letterSpacing="1"
                  >
                    ⚠ NEGATIVE-G COCKPIT PIN
                  </text>
                </g>
              </g>

              {/* Stencil Label for Top Panel */}
              <text x="35" y="38" fill="#8E9AA8" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="bold" letterSpacing="1">
                COCKPIT ESCAPE STRUGGLE
              </text>
            </g>

            {/* -------------------------------------------------------------------
                CENTRAL TACTILE DIVIDER BAR: Hazard Chevrons (y: 485 to 505)
                ------------------------------------------------------------------- */}
            <rect x="0" y="485" width="1000" height="20" fill="url(#hazardStripePattern)" />
            <line x1="0" y1="485" x2="1000" y2="485" stroke="#FFE600" strokeWidth="2" />
            <line x1="0" y1="505" x2="1000" y2="505" stroke="#FFE600" strokeWidth="2" />

            {/* -------------------------------------------------------------------
                BOTTOM PANEL: Vector Diagram of Destruct Switches & Gloved Hand
                ------------------------------------------------------------------- */}
            <g transform="translate(0, 505)">
              {/* Avionics Console Surface */}
              <rect x="0" y="0" width="1000" height="475" fill="#131922" />

              {/* Corner Fastener Hex Bolts */}
              {[
                { x: 25, y: 30 },
                { x: 975, y: 30 },
                { x: 25, y: 445 },
                { x: 975, y: 445 },
              ].map((bolt, idx) => (
                <circle key={idx} cx={bolt.x} cy={bolt.y} r="6" fill="#3A4756" stroke="#10141A" strokeWidth="2" />
              ))}

              {/* Panel Header */}
              <text x="35" y="45" fill="#8E9AA8" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="bold" letterSpacing="1">
                DESTRUCT CONSOLE // APX-28 EXPLOSIVE
              </text>

              {/* Stenciled Yellow Hazard Plate behind switches */}
              <rect x="75" y="70" width="560" height="290" rx="8" fill="#1C2430" stroke="#FFE600" strokeWidth="2.5" />
              <rect x="85" y="80" width="540" height="270" fill="none" stroke="#FFE600" strokeWidth="1.5" strokeDasharray="8 6" />

              <text x="105" y="122" fill="#FFE600" fontFamily={montserrat.fontFamily} fontSize="23" letterSpacing="1">
                U-2 AIRFRAME SELF-DESTRUCT
              </text>
              <text x="105" y="150" fill="#A8B4C2" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="600">
                70-SECOND CLOCKWORK TIMER // PYROTECHNIC C-4 CHARGES
              </text>

              {/* SWITCH 1: DESTRUCT 1 */}
              <g transform="translate(210, 248)">
                {/* Switch Base Bezel */}
                <rect x="-75" y="-60" width="150" height="120" rx="6" fill="#0C1017" stroke="#3A4756" strokeWidth="2" />
                {/* Red Flip-Up Safety Guard Cage */}
                <rect x="-60" y="-48" width="120" height="96" rx="4" fill="#D32F2F" stroke="#FFFFFF" strokeWidth="2.5" />
                <rect x="-52" y="-40" width="104" height="80" fill="#B71C1C" />
                <text x="0" y="-14" fill="#FFFFFF" fontFamily={montserrat.fontFamily} fontSize="16" textAnchor="middle">
                  LIFT
                </text>
                {/* Chrome Toggle Lever */}
                <line x1="0" y1="24" x2="0" y2="-12" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
                <circle cx="0" cy="-14" r="11" fill="#E2E8F0" stroke="#1A202C" strokeWidth="2" />
                {/* Switch Label */}
                <text x="0" y="36" fill="#FFE600" fontFamily={montserrat.fontFamily} fontSize="17" textAnchor="middle">
                  DESTRUCT 1
                </text>
                {/* Amber Status Indicator */}
                <circle cx="0" cy="54" r="6" fill="#FFB703" />
              </g>

              {/* SWITCH 2: DESTRUCT 2 (Target switch the pilot strains to reach) */}
              <g transform="translate(450, 248)">
                {/* Switch Base Bezel */}
                <rect x="-75" y="-60" width="150" height="120" rx="6" fill="#0C1017" stroke="#3A4756" strokeWidth="2" />
                {/* Red Flip-Up Safety Guard Cage */}
                <rect x="-60" y="-48" width="120" height="96" rx="4" fill="#D32F2F" stroke="#FFFFFF" strokeWidth="2.5" />
                <rect x="-52" y="-40" width="104" height="80" fill="#B71C1C" />
                <text x="0" y="-14" fill="#FFFFFF" fontFamily={montserrat.fontFamily} fontSize="16" textAnchor="middle">
                  LIFT
                </text>
                {/* Chrome Toggle Lever */}
                <line x1="0" y1="24" x2="0" y2="-12" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
                <circle cx="0" cy="-14" r="11" fill="#E2E8F0" stroke="#1A202C" strokeWidth="2" />
                {/* Switch Label */}
                <text x="0" y="36" fill="#FFE600" fontFamily={montserrat.fontFamily} fontSize="17" textAnchor="middle">
                  DESTRUCT 2
                </text>
                {/* Amber Status Indicator */}
                <circle cx="0" cy="54" r="6" fill="#FFB703" />
              </g>

              {/* Status Indicator Callout */}
              <g transform="translate(330, 390)">
                <rect x="-160" y="-18" width="320" height="36" rx="4" fill="#18202A" stroke="#FF5400" strokeWidth="1.5" />
                <text x="0" y="6" fill="#FFB703" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="bold" textAnchor="middle">
                  STATUS: ARMED // UNTRIGGERED
                </text>
              </g>

              {/* Straining Pressurized Gloved Hand */}
              <g transform={`translate(${handReachX}, ${248 + handTrembleY + handLiftY}) scale(1.35)`}>
                {/* Arm / Gauntlet Sleeve: Olive MC-3 Pressure Suit Fabric */}
                <path
                  d="M 140 -45 L 50 -40 L -10 -28 L -45 -18 L -45 28 L -10 38 L 50 50 L 140 55 Z"
                  fill="#334235"
                  stroke="#1D261E"
                  strokeWidth="3.5"
                />

                {/* Wrist Pressure Seal Flange & Metal Clamp Ring */}
                <rect x="42" y="-42" width="18" height="96" rx="4" fill="#58697A" stroke="#2D3A47" strokeWidth="2.5" />

                {/* Bulky White Pressurized Flight Glove Palm */}
                <path
                  d="M 45 -36 L -25 -32 L -70 -20 L -70 26 L -25 36 L 45 42 Z"
                  fill="#EAE5D9"
                  stroke="#354037"
                  strokeWidth="3.5"
                />
                {/* Rubber Grip Ribs on Palm */}
                <line x1="-35" y1="-12" x2="-35" y2="18" stroke="#3D4B3F" strokeWidth="4.5" />
                <line x1="-18" y1="-18" x2="-18" y2="24" stroke="#3D4B3F" strokeWidth="4.5" />
                <line x1="0" y1="-24" x2="0" y2="28" stroke="#3D4B3F" strokeWidth="4.5" />

                {/* Straining, Outstretched Fingers Reaching Leftward toward Destruct 2 */}
                {/* Index Finger */}
                <path
                  d="M -70 -18 L -130 -16 L -124 -2 L -70 -2 Z"
                  fill="#FAF7EE"
                  stroke="#2E3830"
                  strokeWidth="2.5"
                />
                <circle cx="-126" cy="-9" r="6" fill="#3D4B3F" />

                {/* Middle Finger (Longest reach) */}
                <path
                  d="M -70 -2 L -142 0 L -136 14 L -70 12 Z"
                  fill="#FAF7EE"
                  stroke="#2E3830"
                  strokeWidth="2.5"
                />
                <circle cx="-138" cy="7" r="6" fill="#3D4B3F" />

                {/* Ring Finger */}
                <path
                  d="M -70 12 L -125 16 L -120 28 L -70 24 Z"
                  fill="#FAF7EE"
                  stroke="#2E3830"
                  strokeWidth="2.5"
                />
                <circle cx="-122" cy="22" r="5" fill="#3D4B3F" />

                {/* Thumb (Curled inward against G-force strain) */}
                <path
                  d="M -30 -32 L -65 -50 L -88 -44 L -58 -22 Z"
                  fill="#FAF7EE"
                  stroke="#2E3830"
                  strokeWidth="2.5"
                />

                {/* Dynamic Strain Speed Lines & Gap Sparks around Fingers (Active while straining) */}
                {frame < 34 && (
                  <g>
                    <line x1="-146" y1="-9" x2="-176" y2="-9" stroke="#FFE600" strokeWidth="2.5" strokeDasharray="4 4" />
                    <line x1="-152" y1="7" x2="-190" y2="7" stroke="#FFE600" strokeWidth="3" strokeDasharray="6 4" />
                    <line x1="-142" y1="22" x2="-172" y2="22" stroke="#FFE600" strokeWidth="2.5" strokeDasharray="4 4" />
                  </g>
                )}
              </g>

              {/* Red Failure Stamp Slamming Down when Pulled Out (Frame >= 30) */}
              {frame >= 30 && (
                <g transform={`translate(480, 248) scale(${stampSlam})`}>
                  <rect
                    x="-180"
                    y="-50"
                    width="360"
                    height="100"
                    rx="6"
                    fill="none"
                    stroke="#FF3B30"
                    strokeWidth="5"
                    strokeDasharray="14 8"
                    transform="rotate(-8)"
                  />
                  <rect
                    x="-172"
                    y="-42"
                    width="344"
                    height="84"
                    fill="rgba(180, 20, 25, 0.94)"
                    stroke="#FF3B30"
                    strokeWidth="2"
                    transform="rotate(-8)"
                  />
                  <text
                    x="0"
                    y="-12"
                    fill="#FFFFFF"
                    fontFamily={montserrat.fontFamily}
                    fontSize="23"
                    letterSpacing="2"
                    textAnchor="middle"
                    transform="rotate(-8)"
                  >
                    SWITCHES UNREACHED
                  </text>
                  <text
                    x="0"
                    y="18"
                    fill="#FFE600"
                    fontFamily={montserrat.fontFamily}
                    fontSize="15"
                    fontWeight="bold"
                    textAnchor="middle"
                    transform="rotate(-8)"
                  >
                    PULLED OUT BY -9G
                  </text>
                </g>
              )}
            </g>
          </svg>
        </div>
      )}

      {/* =========================================================================
          PHASE 2: HIGH-ALTITUDE FREEFALL TO PARACHUTE BLOOM (Frames 125 - 277)
          ========================================================================= */}
      {freefallAlpha > 0.01 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: freefallAlpha,
            pointerEvents: 'none',
          }}
        >
          <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              {/* Deep Indigo Stratospheric Zenith */}
              <linearGradient id="stratosphereSkyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#040712" />
                <stop offset="55%" stopColor="#0E182A" />
                <stop offset="85%" stopColor="#253A52" />
                <stop offset="100%" stopColor="#556F8C" />
              </linearGradient>

              {/* Burning Engine Smoke Gradient */}
              <linearGradient id="engineSmokeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF5400" />
                <stop offset="35%" stopColor="#8C250A" />
                <stop offset="100%" stopColor="#1B2228" />
              </linearGradient>
            </defs>

            {/* Stratosphere Background Sheet */}
            <rect x="0" y="0" width="1080" height="1920" fill="url(#stratosphereSkyGrad)" />

            {/* Stratospheric Star Points */}
            {[
              { cx: 140, cy: 720, r: 2.2 },
              { cx: 320, cy: 680, r: 1.8 },
              { cx: 760, cy: 710, r: 2.0 },
              { cx: 920, cy: 750, r: 1.6 },
              { cx: 480, cy: 650, r: 1.5 },
              { cx: 620, cy: 740, r: 2.0 },
            ].map((pt, i) => (
              <circle key={i} cx={pt.cx} cy={pt.cy} r={pt.r} fill="#FFFFFF" opacity={0.65} />
            ))}

            {/* Layered Cumulus Cloud Sea at Bottom (y: 1520 to 1920) */}
            <g>
              {/* Distant Cloud Horizon */}
              <path
                d="M -40 1620 Q 140 1560 320 1600 Q 520 1540 740 1590 Q 940 1550 1120 1610 L 1120 1920 L -40 1920 Z"
                fill="#6A829D"
                opacity="0.5"
              />
              {/* Midground Billowy Cloud Layer */}
              <path
                d="M -40 1680 Q 180 1620 400 1670 Q 640 1600 880 1660 Q 1020 1620 1120 1670 L 1120 1920 L -40 1920 Z"
                fill="#94A9C0"
                opacity="0.75"
              />
              {/* Foreground Dense White Cumulus Deck */}
              <path
                d="M -40 1750 Q 160 1680 360 1730 Q 560 1660 760 1720 Q 960 1670 1120 1730 L 1120 1920 L -40 1920 Z"
                fill="#DDE5EE"
              />
            </g>

            {/* -------------------------------------------------------------------
                BURNING U-2 FUSELAGE SPIRALING DOWN INTO BACKGROUND CLOUDS
                ------------------------------------------------------------------- */}
            {planeSpiralAlpha > 0.01 && (
              <g
                transform={`translate(${planeSpiralX}, ${planeSpiralY}) scale(${planeSpiralScale}) rotate(${planeSpiralRot})`}
                opacity={planeSpiralAlpha}
              >
                {/* Billowing Fiery Smoke Trail Behind Spiraling Airframe */}
                <ellipse cx="60" cy="-60" rx="95" ry="55" fill="url(#engineSmokeGrad)" opacity="0.85" />
                <ellipse cx="120" cy="-110" rx="140" ry="80" fill="#1C232B" opacity="0.75" />
                <ellipse cx="180" cy="-170" rx="190" ry="110" fill="#141920" opacity="0.6" />

                {/* Flame Embers */}
                <polygon points="20,-20 70,-45 40,-15 80,-30 10,-5" fill="#FFE600" />
                <polygon points="10,-10 50,-35 25,-8 60,-20 0,0" fill="#FF5400" />

                {/* Severed U-2 Fuselage Silhouette with Broken Wings */}
                <path
                  d="M 0 -130 C 12 -130 16 -60 16 35 L 12 70 L -12 70 L -16 35 C -16 -60 -12 -130 0 -130 Z"
                  fill="#11161F"
                  stroke="#FF3B30"
                  strokeWidth="2"
                />
                {/* Snapped Left Wing Stub */}
                <path d="M -16 5 L -160 15 L -150 25 L -14 18 Z" fill="#161E28" />
                {/* Sheared Right Wing Fracture */}
                <polygon points="14,10 45,15 14,20" fill="#E63946" stroke="#FFE600" strokeWidth="2" />
                {/* Exposed Burning Jet Engine Tail Cone */}
                <polygon points="-12,70 12,70 0,110" fill="#FF5400" />
              </g>
            )}

            {/* -------------------------------------------------------------------
                TINY WHITE SILHOUETTE OF POWERS IN FREEFALL (Before Parachute Bloom)
                ------------------------------------------------------------------- */}
            {!isBloomed && (
              <g transform={`translate(540, ${freefallY})`}>
                {/* High-Altitude Speed Lines Rushing Upward */}
                <line x1="-35" y1="50" x2="-35" y2="-120" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="18 12" opacity="0.75" />
                <line x1="35" y1="40" x2="35" y2="-130" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="18 12" opacity="0.75" />
                <line x1="0" y1="70" x2="0" y2="-150" stroke="#00F5FF" strokeWidth="2" strokeDasharray="14 10" opacity="0.85" />

                {/* Tiny Stark White Pilot Silhouette (Spread-Eagle Freefall) */}
                {/* Helmet Head */}
                <circle cx="0" cy="-22" r="9" fill="#FFFFFF" />
                {/* Torso */}
                <rect x="-8" y="-12" width="16" height="24" rx="4" fill="#FFFFFF" />
                {/* Outstretched Arms */}
                <line x1="-8" y1="-8" x2="-26" y2="-18" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
                <line x1="8" y1="-8" x2="26" y2="-18" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
                {/* Bent Freefall Legs */}
                <line x1="-6" y1="12" x2="-18" y2="30" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
                <line x1="6" y1="12" x2="18" y2="30" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />

                {/* Live Altimeter Dropping Tag */}
                <g transform="translate(45, -15)">
                  <rect x="0" y="0" width="160" height="32" rx="4" fill="#141C26" stroke="#2EC4B6" strokeWidth="1.5" />
                  <text x="10" y="21" fill="#FFE600" fontFamily={montserrat.fontFamily} fontSize="16">
                    {freefallAlt.toLocaleString()} FT
                  </text>
                </g>
              </g>
            )}

            {/* -------------------------------------------------------------------
                PARACHUTE SNAPPING OPEN (BLOOM) AT 15,000 FT (Frame >= 190)
                ------------------------------------------------------------------- */}
            {isBloomed && (
              <g transform="translate(540, 1140)">
                {/* Bold Graphic Speed Lines of Sudden Deceleration */}
                {parachuteDecelAlpha > 0.01 && (
                  <g opacity={parachuteDecelAlpha}>
                    {/* Upward Rushing White Deceleration Lines */}
                    {[-280, -200, -120, -50, 50, 120, 200, 280].map((lx, idx) => (
                      <line
                        key={idx}
                        x1={lx}
                        y1="120"
                        x2={lx}
                        y2="-340"
                        stroke="#FFFFFF"
                        strokeWidth="3.5"
                        strokeDasharray="28 16"
                      />
                    ))}

                    {/* Radial Deceleration Shock Burst Rays */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, idx) => {
                      const rad = (deg * Math.PI) / 180;
                      const x1 = Math.cos(rad) * 160;
                      const y1 = Math.sin(rad) * 120 - 150;
                      const x2 = Math.cos(rad) * 320;
                      const y2 = Math.sin(rad) * 240 - 150;
                      return (
                        <line
                          key={`ray-${idx}`}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#FFE600"
                          strokeWidth="2.5"
                          strokeDasharray="14 10"
                        />
                      );
                    })}
                  </g>
                )}

                {/* Blooming Parachute Canopy with Scale Snap */}
                <g transform={`scale(${bloomScale}) translate(0, -180)`}>
                  {/* Alternating Orange & White Hemispherical Gores */}
                  {/* Base Dome */}
                  <path
                    d="M -230 0 C -230 -220, 230 -220, 230 0 C 180 18, 140 18, 90 0 C 50 18, -50 18, -90 0 C -140 18, -180 18, -230 0 Z"
                    fill="#FFFFFF"
                    stroke="#1A222B"
                    strokeWidth="3.5"
                  />
                  {/* Safety Orange Central Gores */}
                  <path
                    d="M -135 -3 C -135 -200, 135 -200, 135 -3 C 90 14, 50 14, 0 0 C -50 14, -90 14, -135 -3 Z"
                    fill="#FF5400"
                    stroke="#1A222B"
                    strokeWidth="2.5"
                  />
                  {/* Center White Stripe Gore */}
                  <path
                    d="M -45 -1 C -45 -215, 45 -215, 45 -1 C 25 8, -25 8, -45 -1 Z"
                    fill="#FFFFFF"
                    stroke="#1A222B"
                    strokeWidth="2"
                  />
                  {/* Top Apex Vent Hole */}
                  <ellipse cx="0" cy="-210" rx="28" ry="8" fill="#11161F" />

                  {/* Radiating Suspension Rigging Lines (Converging down to pilot risers) */}
                  {[
                    -225, -180, -135, -90, -45, 0, 45, 90, 135, 180, 225
                  ].map((rx, idx) => (
                    <line
                      key={idx}
                      x1={rx}
                      y1="0"
                      x2={rx * 0.15}
                      y2="180"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      opacity="0.85"
                    />
                  ))}
                </g>

                {/* Suspended White Pilot Silhouette Under Canopy with Pendulum Sway */}
                <g transform={`rotate(${pilotSwayDeg}) translate(0, 30)`}>
                  {/* Dual Riser Straps */}
                  <line x1="-12" y1="-25" x2="-6" y2="0" stroke="#FFFFFF" strokeWidth="3" />
                  <line x1="12" y1="-25" x2="6" y2="0" stroke="#FFFFFF" strokeWidth="3" />

                  {/* Pilot Helmet */}
                  <circle cx="0" cy="-8" r="10" fill="#FFFFFF" stroke="#121820" strokeWidth="2" />
                  {/* Torso in Harness */}
                  <rect x="-9" y="2" width="18" height="28" rx="4" fill="#FFFFFF" stroke="#121820" strokeWidth="2" />
                  {/* Hands Holding Risers */}
                  <line x1="-9" y1="8" x2="-16" y2="-12" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
                  <line x1="9" y1="8" x2="16" y2="-12" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
                  {/* Dangling Legs */}
                  <line x1="-6" y1="30" x2="-12" y2="60" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                  <line x1="6" y1="30" x2="8" y2="60" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                {/* Telemetry Badge Pill at Bottom */}
                <g transform="translate(0, 140)">
                  <rect
                    x="-240"
                    y="0"
                    width="480"
                    height="50"
                    rx="6"
                    fill="#101824"
                    stroke="#2EC4B6"
                    strokeWidth="2.5"
                    filter="drop-shadow(0 8px 20px rgba(0,0,0,0.75))"
                  />
                  <text
                    x="0"
                    y="32"
                    fill="#F4EFE6"
                    fontFamily={montserrat.fontFamily}
                    fontSize="20"
                    letterSpacing="1"
                    textAnchor="middle"
                  >
                    15,000 FT BLOOM • DESCENT: 16 FT/S
                  </text>
                </g>
              </g>
            )}
          </svg>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 9. SCENE 09: KGB GROUND CAPTURE AT KOSULINO
// Russian collective farm landscape, captured by local villagers & KGB,
// display cloth showing confiscated gear: silenced .22 pistol, rubles, silk map.
// =========================================================================
export const KgbGroundCaptureVector: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Birch Trees & Russian Farm Fence (y > 1320) */}
        <g opacity="0.55">
          {/* White Birch Tree Trunks with Black Marks */}
          {[120, 240, 920, 1010].map((bx) => (
            <g key={bx} transform={`translate(${bx}, 1220)`}>
              <rect x="0" y="0" width="24" height="300" fill="#EAE3D2" stroke="#222B35" strokeWidth="1.5" />
              {[30, 80, 140, 210, 270].map((my) => (
                <line key={my} x1="0" y1={my} x2="16" y2={my + 4} stroke="#1B2228" strokeWidth="3" />
              ))}
            </g>
          ))}
          {/* Wooden Rail Fence */}
          <line x1="0" y1="1440" x2="1080" y2="1440" stroke="#4A3B2C" strokeWidth="8" />
          <line x1="0" y1="1475" x2="1080" y2="1475" stroke="#4A3B2C" strokeWidth="8" />
          {[80, 260, 440, 620, 800, 980].map((px) => (
            <rect key={px} x={px} y="1420" width="16" height="90" fill="#382C22" />
          ))}
        </g>

        {/* KGB Evidence Display Ground Sheet */}
        <g transform="translate(480, 1340)">
          <polygon points="0,0 520,-20 540,240 20,260" fill="#EAE3D2" stroke="#8E9AA8" strokeWidth="3" />
          <text x="30" y="35" fill="#8E1C22" fontFamily={montserrat.fontFamily} fontSize="17" fontWeight="bold">
            CONFISCATED CIA ESPIONAGE GEAR // KOSULINO
          </text>

          {/* High Standard Suppressed .22 Caliber Pistol */}
          <g transform="translate(80, 90)">
            {/* Long Cylindrical Sound Suppressor */}
            <rect x="0" y="0" width="110" height="16" rx="3" fill="#1C232A" stroke="#3D4B59" strokeWidth="2" />
            {/* Receiver & Slide */}
            <rect x="110" y="2" width="75" height="24" fill="#2B3642" stroke="#3D4B59" strokeWidth="2" />
            {/* Checkered Wood Grip */}
            <polygon points="150,26 175,26 160,80 135,80" fill="#5A3E2D" stroke="#3A281E" strokeWidth="2" />
            {/* Trigger Guard */}
            <path d="M 130 26 Q 130 50 148 45" stroke="#1C232A" strokeWidth="3" fill="none" />
          </g>

          {/* Stacks of Soviet Ruble Notes (7,500 Rubles) */}
          <g transform="translate(320, 60)">
            {[0, 6, 12, 18].map((dy) => (
              <rect key={dy} x={dy} y={dy} width="120" height="65" rx="3" fill="#88A28E" stroke="#3F5845" strokeWidth="2" />
            ))}
            <text x="35" y="45" fill="#1C3823" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="bold">
              7,500 ₽
            </text>
          </g>

          {/* Gold Sovereign Coins */}
          <g transform="translate(330, 160)">
            {[0, 24, 48, 72].map((cx) => (
              <circle key={cx} cx={cx} cy="0" r="14" fill="#F4B942" stroke="#B8860B" strokeWidth="2" />
            ))}
          </g>
        </g>
      </svg>

      {/* Die-Cut Cutout Puppet: Francis Gary Powers (Surrounded) */}
      <CutoutPuppet
        character="POWERS"
        outfit="HIGH_ALTITUDE_SUIT"
        initialPose="PITCHING"
        switchedPose="NEUTRAL"
        poseSwitchFrame={30}
        x={280}
        y={1220}
        scale={0.92}
      />
    </div>
  );
};

// =========================================================================
// 10. SCENE 10: WHITE HOUSE COVER STORY DOSSIER
// Official typed Washington press release: "NASA U-2 WEATHER RESEARCH AIRCRAFT"
// Stamped: "PILOT SUFFERED OXYGEN FAILURE OVER TURKEY", President Eisenhower puppet.
// =========================================================================
export const NasaCoverUpDossierCard: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Typed White House Press Release Dossier (top >= 880) */}
      <div
        style={{
          position: 'absolute',
          top: 890,
          left: 50,
          width: 580,
          padding: '24px 32px',
          backgroundColor: '#F7F4EA',
          border: '3px solid #D6CEBE',
          borderRadius: 6,
          boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header Ribbon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #2B2F38', paddingBottom: 10 }}>
          <span style={{ fontFamily: montserrat.fontFamily, fontSize: 22, fontWeight: 900, color: '#1B2432', letterSpacing: 1 }}>
            EXECUTIVE DISINFORMATION MEMO
          </span>
          <span style={{ fontFamily: montserrat.fontFamily, fontSize: 16, color: '#C1272D', fontWeight: 900 }}>
            MAY 3, 1960
          </span>
        </div>

        {/* Classified Redacted Content Bars */}
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: montserrat.fontFamily, fontSize: 16, fontWeight: 800, color: '#1E252E' }}>SUBJECT:</span>
            <span style={{ backgroundColor: '#1E252E', height: 16, width: 280, borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: montserrat.fontFamily, fontSize: 16, fontWeight: 800, color: '#1E252E' }}>INCIDENT:</span>
            <span style={{ backgroundColor: '#1E252E', height: 16, width: 340, borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: montserrat.fontFamily, fontSize: 16, fontWeight: 800, color: '#1E252E' }}>STATUS:</span>
            <span style={{ backgroundColor: '#1E252E', height: 16, width: 220, borderRadius: 2 }} />
          </div>
        </div>

        {/* Official Cover Story Stamp */}
        <div
          style={{
            marginTop: 22,
            display: 'inline-block',
            padding: '6px 20px',
            border: '3px solid #C1272D',
            color: '#C1272D',
            fontFamily: montserrat.fontFamily,
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 2,
            transform: 'rotate(-4deg)',
          }}
        >
          OFFICIAL COVER STORY
        </div>
      </div>

      {/* Die-Cut Cutout Puppet: President Dwight D. Eisenhower */}
      <CutoutPuppet
        character="EISENHOWER"
        outfit="PRESIDENTIAL_SUIT"
        initialPose="NEUTRAL"
        switchedPose="POINTING"
        poseSwitchFrame={30}
        x={820}
        y={1220}
        scale={0.92}
      />
    </div>
  );
};

// =========================================================================
// 11. SCENE 11: FAKE NASA U-2 TAIL MARKING SCHEMATIC
// Edwards AFB press showcase: U-2 hurriedly painted with NASA yellow tail band
// and civilian serial 'NASA 55741' to convince the international media.
// =========================================================================
export const FakeNasaU2SchematicVector: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Technical Blueprint Board */}
        <rect x="50" y="870" width="980" height="780" rx="8" fill="#101924" stroke="#4CC9F0" strokeWidth="2.5" />

        {/* Blueprint Title */}
        <text x="80" y="920" fill="#4CC9F0" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="bold">
          DECEPTION TAIL ART // EDWARDS AFB PRESS ROLLOUT
        </text>

        {/* Close-Up Vertical Stabilizer Schematic */}
        <g transform="translate(180, 960)">
          {/* Tall Vertical Tail Fin of U-2 */}
          <polygon
            points="0,480 80,480 340,60 250,20 0,260"
            fill="#EAE3D2"
            stroke="#2B3746"
            strokeWidth="3.5"
          />

          {/* Bright Yellow NASA Tail Band */}
          <polygon
            points="85,320 200,160 260,180 145,340"
            fill="#FFD166"
            stroke="#1B222C"
            strokeWidth="2.5"
          />

          {/* Black NASA Logotype Letters on Tail Band */}
          <text
            x="135"
            y="275"
            fill="#121820"
            fontFamily={montserrat.fontFamily}
            fontSize="48"
            transform="rotate(-52, 135, 275)"
          >
            NASA
          </text>

          {/* Fake Civilian Serial Number Painted Below */}
          <text x="40" y="420" fill="#1B2432" fontFamily={montserrat.fontFamily} fontSize="32" fontWeight="bold">
            55741
          </text>

          {/* Technical Blueprint Pointer Lines */}
          <g stroke="#4CC9F0" strokeWidth="2">
            <line x1="240" y1="170" x2="480" y2="120" />
            <circle cx="240" cy="170" r="4" fill="#4CC9F0" />
            <text x="495" y="125" fill="#4CC9F0" fontFamily={montserrat.fontFamily} fontSize="16" fontWeight="bold">
              CIVILIAN BAND APPLIED
            </text>

            <line x1="160" y1="420" x2="480" y2="380" />
            <circle cx="160" cy="420" r="4" fill="#4CC9F0" />
            <text x="495" y="385" fill="#4CC9F0" fontFamily={montserrat.fontFamily} fontSize="16" fontWeight="bold">
              FICTITIOUS SERIAL: 55741
            </text>
          </g>
        </g>

        {/* Classified Deception Stamp */}
        <g transform="translate(700, 890)">
          <WeatheredMilitaryStamp
            text="DISINFORMATION"
            subText="PUBLIC DECEPTION"
            color="#E63946"
          />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 12. SCENE 12: KHRUSHCHEV'S TRAP SPRINGS
// Grand Kremlin Palace Supreme Soviet Hall, gilded USSR coat of arms,
// red drapery, Khrushchev smiling smugly as Eisenhower locks into the lie.
// =========================================================================
export const KhrushchevSupremeSovietPodiumStage: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Supreme Soviet Grand Hall Red Velvet Drapery */}
        <path d="M 0 860 L 280 860 L 220 1520 L 0 1520 Z" fill="#781113" opacity="0.85" />
        <path d="M 800 860 L 1080 860 L 1080 1520 L 860 1520 Z" fill="#781113" opacity="0.85" />

        {/* Golden USSR Hammer, Sickle & Globe Coat of Arms */}
        <g transform="translate(540, 990)">
          {/* Sunburst Rays Behind Emblem */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2={Math.cos((deg * Math.PI) / 180) * 110}
              y2={Math.sin((deg * Math.PI) / 180) * 110}
              stroke="#F4B942"
              strokeWidth="3"
              opacity="0.35"
            />
          ))}

          {/* Gilded Wreath of Wheat Sheaves */}
          <ellipse cx="0" cy="0" rx="90" ry="90" fill="#8E1C22" stroke="#FFD166" strokeWidth="6" />
          {/* Red Star at Apex */}
          <polygon points="0,-105 8,-85 30,-85 12,-72 18,-50 0,-62 -18,-50 -12,-72 -30,-85 -8,-85" fill="#FFD166" />
          {/* Gold Hammer & Sickle Emblem */}
          <g transform="translate(-15, -20) scale(0.9)">
            <path d="M 0 0 L 35 -35 L 45 -25 L 10 10 Z" fill="#FFD166" />
            <path d="M -10 30 C -40 10 -40 -30 0 -50 C 20 -60 45 -55 45 -55 C 45 -55 20 -45 5 -30 C -15 -10 -10 15 10 30 Z" fill="#FFD166" />
          </g>
        </g>

        {/* Ornate Wooden Supreme Soviet Orator Rostrum */}
        <g transform="translate(390, 1380)">
          <polygon points="0,180 300,180 270,0 30,0" fill="#3D2619" stroke="#5A3A25" strokeWidth="4" />
          <rect x="40" y="20" width="220" height="40" fill="#24160E" stroke="#FFD166" strokeWidth="2" />
          {/* Microphones */}
          <line x1="80" y1="0" x2="110" y2="-45" stroke="#8E9AA8" strokeWidth="4" />
          <circle cx="112" cy="-48" r="8" fill="#2B3642" />
          <line x1="220" y1="0" x2="190" y2="-45" stroke="#8E9AA8" strokeWidth="4" />
          <circle cx="188" cy="-48" r="8" fill="#2B3642" />
        </g>
      </svg>

      {/* Die-Cut Cutout Puppet: Premier Nikita Khrushchev */}
      <CutoutPuppet
        character="KHRUSHCHEV"
        outfit="SOVIET_PREMIER_SUIT"
        initialPose="NEUTRAL"
        switchedPose="POINTING"
        poseSwitchFrame={30}
        x={540}
        y={1220}
        scale={1.05}
      />
    </div>
  );
};

// =========================================================================
// 13. SCENE 13: THE BOMBSHELL REVEAL (SECOND DROP - BAR 24 / FRAME 3323)
// "I MUST TELL YOU A SECRET... THE PILOT IS ALIVE AND WELL!"
// Explosive typography, impact shake, triumphant Khrushchev speech vector.
// =========================================================================
export const KhrushchevSpeechBombshellVector: React.FC = () => {
  const frame = useCurrentFrame();
  const textPop = interpolate(frame, [0, 8, 16], [0.8, 1.15, 1.0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Blinding Red Starburst Explosion Rays */}
        <g transform="translate(540, 1220)">
          {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((deg) => (
            <polygon
              key={deg}
              points={`0,0 ${Math.cos((deg * Math.PI) / 180) * 480},${Math.sin((deg * Math.PI) / 180) * 480} ${Math.cos(((deg + 10) * Math.PI) / 180) * 480},${Math.sin(((deg + 10) * Math.PI) / 180) * 480}`}
              fill={deg % 40 === 0 ? '#C1272D' : '#8E1C22'}
              opacity="0.3"
            />
          ))}
        </g>
      </svg>

      {/* Explosive Speech Quote Headline Card (top >= 880) */}
      <div
        style={{
          position: 'absolute',
          top: 890,
          left: 60,
          right: 60,
          padding: '24px 32px',
          backgroundColor: '#9E1C1C',
          border: '4px solid #FFD166',
          borderRadius: 8,
          boxShadow: '0 20px 60px rgba(193,39,45,0.7)',
          textAlign: 'center',
          transform: `scale(${textPop})`,
        }}
      >
        <div style={{ fontFamily: montserrat.fontFamily, fontSize: 32, color: '#FFF5D1', letterSpacing: 2 }}>
          SUPREME SOVIET BOMBSHELL
        </div>
        <div style={{ fontFamily: montserrat.fontFamily, fontSize: 20, fontWeight: 800, color: '#FFD166', marginTop: 10, letterSpacing: 2 }}>
          MOSCOW • MAY 7, 1960
        </div>
      </div>

      {/* Die-Cut Cutout Puppet: Khrushchev Gesturing in Triumph */}
      <CutoutPuppet
        character="KHRUSHCHEV"
        outfit="SOVIET_PREMIER_SUIT"
        initialPose="POINTING"
        switchedPose="SALUTE"
        poseSwitchFrame={30}
        x={540}
        y={1360}
        scale={1.12}
      />
    </div>
  );
};

// =========================================================================
// 14. SCENE 14: GORKY PARK WRECKAGE EXHIBITION
// Moscow Gorky Park Central Pavilion: shattered zinc-chromate green U-2 wings,
// glass vitrines displaying Hycon optical lenses, flight suit, gold rubles.
// =========================================================================
export const GorkyParkWreckageExhibitionVector: React.FC = () => {
  const frame = useCurrentFrame();
  const spotlightX = 460 + Math.sin(frame * 0.05) * 160;
  const lightPulse = 0.88 + 0.12 * Math.sin(frame * 0.08);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="exhibitSpotlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.32 * lightPulse} />
            <stop offset="60%" stopColor="#38BDF8" stopOpacity={0.08 * lightPulse} />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Gorky Park Exhibition Pavilion Trestle Architecture */}
        <g transform="translate(50, 900)">
          {/* Dynamic Inspection Spotlight Sweeping Across Pavilion */}
          <ellipse
            cx={spotlightX}
            cy="260"
            rx="280"
            ry="160"
            fill="url(#exhibitSpotlight)"
          />

          {/* Steel Exhibition Roof Truss */}
          <line x1="0" y1="0" x2="980" y2="0" stroke="#334155" strokeWidth="8" />
          {[0, 140, 280, 420, 560, 700, 840, 980].map((tx) => (
            <line key={tx} x1={tx} y1="0" x2={tx} y2="520" stroke="#1E293B" strokeWidth="4" opacity="0.6" />
          ))}

          {/* Raised Wooden Display Plinth for U-2 Wreckage */}
          <polygon points="20,380 960,380 920,470 60,470" fill="#1C1917" stroke="#334155" strokeWidth="3" />

          {/* Twisted Green-Zinc Chromate U-2 Fuselage & Wings Wreckage (Scaled Up 1.35x) */}
          <g transform="translate(100, 160) scale(1.35)">
            {/* Mangled Wing Section with USAF Star/Bars Insignia Stenciled */}
            <polygon
              points="0,110 200,40 380,75 520,20 560,65 360,135 120,130"
              fill="#2E4A38"
              stroke="#1C2E23"
              strokeWidth="3.5"
            />
            {/* Broken Tail Fin Section with Soviet Trophy Marker */}
            <polygon
              points="380,75 420,-10 470,10 440,70"
              fill="#23382B"
              stroke="#1C2E23"
              strokeWidth="3"
            />
            {/* Twisted Wing Ribs & Punctured Skin */}
            {[50, 140, 230, 320, 410, 490].map((rx) => (
              <line key={rx} x1={rx} y1="65" x2={rx + 22} y2="120" stroke="#1C2E23" strokeWidth="2.5" />
            ))}
            {/* Shrapnel Holes */}
            {[80, 130, 210, 290, 380, 460].map((hx, idx) => (
              <circle key={idx} cx={hx} cy={82 + (idx % 3) * 12} r={4.5 + (idx % 3)} fill="#0B1310" />
            ))}

            {/* USAF Star Insignia on Wreckage */}
            <circle cx="210" cy="82" r="26" fill="#0B1310" stroke="#ECFDF5" strokeWidth="2" />
            <polygon points="210,63 216,77 230,77 219,85 223,99 210,91 197,99 201,85 190,77 204,77" fill="#ECFDF5" />
          </g>

          {/* Glass Display Vitrine: Confiscated Cameras & Spy Gear */}
          <g transform="translate(120, 390)">
            <rect x="0" y="0" width="380" height="72" rx="4" fill="#0B1310" opacity="0.9" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="65" cy="36" r="24" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="65" cy="36" r="12" fill="#38BDF8" opacity="0.8" />
            <text x="110" y="44" fill="#ECFDF5" fontFamily={montserrat.fontFamily} fontSize="17" fontWeight="800" letterSpacing="1.5">
              HYCON OPTICAL LENS // RECOVERED
            </text>
          </g>

          {/* Crowd of Soviet Citizens Filing Past (Silhouettes with micro-motion) */}
          <g transform="translate(60, 495)" fill="#0F1012">
            {[20, 130, 240, 350, 480, 600, 710, 830, 920].map((cx, idx) => {
              const crowdSway = Math.sin(frame * 0.08 + idx * 0.7) * 2;
              return (
                <g key={idx} transform={`translate(${cx}, ${crowdSway})`}>
                  <circle cx="0" cy="-38" r="16" />
                  <path d="M -18 0 C -18 -22, 18 -22, 18 0 L 16 60 L -16 60 Z" />
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Sleek Moscow Exhibition Placard Tag (top >= 880) */}
      <div
        style={{
          position: 'absolute',
          top: 885,
          left: 60,
          padding: '10px 24px',
          backgroundColor: '#0B1310',
          border: '1.5px solid #38BDF8',
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
        }}
      >
        <span style={{ fontFamily: montserrat.fontFamily, fontSize: 18, fontWeight: 900, color: '#ECFDF5', letterSpacing: 2 }}>
          MOSCOW GORKY PARK // EXHIBIT NO. 1
        </span>
      </div>
    </div>
  );
};

// =========================================================================
// 15. SCENE 15: PARIS SUMMIT COLLAPSE
// May 16, 1960: Élysée Palace summit room. Khrushchev demands Eisenhower apologize.
// Eisenhower refuses. Khrushchev storms out, cancelling Soviet-US summit.
// =========================================================================
export const ParisSummitCollapseCard: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Torn Diplomatic Communique Paper (top >= 880) */}
      <div
        style={{
          position: 'absolute',
          top: 890,
          left: 60,
          right: 60,
          padding: '24px 32px',
          backgroundColor: '#F5EFE6',
          border: '3px solid #8E1C22',
          borderRadius: 6,
          boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #8E1C22', paddingBottom: 8 }}>
          <span style={{ fontFamily: montserrat.fontFamily, fontSize: 22, fontWeight: 900, color: '#8E1C22', letterSpacing: 2 }}>
            PARIS SUMMIT DIPLOMATIC FAILURE
          </span>
          <span style={{ fontFamily: montserrat.fontFamily, fontSize: 16, color: '#2B3746', fontWeight: 900 }}>
            MAY 16, 1960
          </span>
        </div>

        <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: montserrat.fontFamily, fontSize: 20, fontWeight: 800, color: '#1B232D' }}>
            TALKS COLLAPSED
          </span>
          <div
            style={{
              padding: '6px 18px',
              backgroundColor: '#8E1C22',
              color: '#F4F7FA',
              fontFamily: montserrat.fontFamily,
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              borderRadius: 3,
            }}
          >
            SUMMIT ABORTED
          </div>
        </div>
      </div>

      {/* Dual Cutout Puppets: Eisenhower & Khrushchev Confrontation */}
      <CutoutPuppet
        character="EISENHOWER"
        outfit="PRESIDENTIAL_SUIT"
        initialPose="NEUTRAL"
        switchedPose="STRUGGLING"
        poseSwitchFrame={30}
        x={330}
        y={1250}
        scale={0.92}
      />

      <CutoutPuppet
        character="KHRUSHCHEV"
        outfit="SOVIET_PREMIER_SUIT"
        initialPose="POINTING"
        switchedPose="PITCHING"
        poseSwitchFrame={30}
        x={750}
        y={1250}
        scale={0.95}
      />
    </div>
  );
};

// =========================================================================
// 16. SCENE 16: MOSCOW MILITARY TRIBUNAL
// Columned Hall of the Trade Unions: Francis Gary Powers tried by the Military
// Collegium of the Supreme Court of the USSR. Sentenced to 10 years imprisonment.
// =========================================================================
export const MoscowMilitaryTribunalCard: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Neoclassical Colonnade of Hall of Columns */}
        <g transform="translate(60, 920)" opacity="0.6">
          {[0, 160, 320, 480, 640, 800, 960].map((cx) => (
            <g key={cx} transform={`translate(${cx}, 0)`}>
              <rect x="0" y="40" width="36" height="480" fill="#EAE3D2" stroke="#2B3642" strokeWidth="2" />
              <polygon points="-8,40 44,40 36,15 0,15" fill="#C5BDAC" />
            </g>
          ))}
          <rect x="-20" y="0" width="1000" height="25" fill="#3D4B59" />
        </g>

        {/* Prisoner's Dock Railing */}
        <g transform="translate(360, 1340)">
          <rect x="0" y="0" width="360" height="180" rx="4" fill="#38261B" stroke="#5A3E2D" strokeWidth="3" />
          {[40, 100, 160, 220, 280, 320].map((bx) => (
            <line key={bx} x1={bx} y1="0" x2={bx} y2="180" stroke="#1D130E" strokeWidth="5" />
          ))}
        </g>
      </svg>

      {/* Official Soviet Verdict Dossier (top >= 880) */}
      <div
        style={{
          position: 'absolute',
          top: 890,
          left: 60,
          right: 60,
          padding: '24px 34px',
          backgroundColor: '#1E252E',
          border: '3px solid #E63946',
          borderRadius: 6,
          boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ fontFamily: montserrat.fontFamily, fontSize: 30, color: '#E63946', letterSpacing: 2 }}>
          MILITARY TRIBUNAL VERDICT
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <div style={{ fontFamily: montserrat.fontFamily, fontSize: 20, fontWeight: 800, color: '#F4EFE6', letterSpacing: 1.5 }}>
            ARTICLE 2 OF USSR CRIMINAL CODE
          </div>
          <div
            style={{
              padding: '6px 18px',
              border: '2px solid #E63946',
              color: '#E63946',
              fontFamily: montserrat.fontFamily,
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: 2,
              transform: 'rotate(-2deg)',
            }}
          >
            GUILTY
          </div>
        </div>
      </div>

      {/* Francis Gary Powers in Defendant Dock */}
      <CutoutPuppet
        character="POWERS"
        outfit="SERVICE_DRESS"
        initialPose="NEUTRAL"
        switchedPose="STRUGGLING"
        poseSwitchFrame={30}
        x={540}
        y={1220}
        scale={0.96}
      />
    </div>
  );
};

// =========================================================================
// 17. SCENE 17: GLIENICKE BRIDGE SPY SWAP ("BRIDGE OF SPIES")
// Feb 10, 1962: 5:44 AM frozen fog over Havel River between West Berlin and Potsdam.
// Steel truss bridge, searchlight beams, border line, Powers exchanged for Rudolf Abel.
// =========================================================================
export const GlienickeBridgeSpiesVector: React.FC = () => {
  const frame = useCurrentFrame();
  const searchlightSweep = Math.sin(frame * 0.08) * 18;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="searchlightBeam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF5D1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFF5D1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Cold Pre-Dawn Frozen Fog Horizon */}
        <rect x="0" y="1100" width="1080" height="820" fill="#0C141D" />

        {/* Searchlight Beams Cutting through Berlin Fog */}
        <g transform={`translate(160, 1020) rotate(${-25 + searchlightSweep})`}>
          <polygon points="0,0 -70,550 70,550" fill="url(#searchlightBeam)" />
        </g>
        <g transform={`translate(920, 1020) rotate(${25 - searchlightSweep})`}>
          <polygon points="0,0 -70,550 70,550" fill="url(#searchlightBeam)" />
        </g>

        {/* Famous Glienicke Steel Truss Arch Bridge Silhouettes */}
        <g transform="translate(0, 1240)">
          {/* Bridge Roadway Deck */}
          <rect x="0" y="180" width="1080" height="35" fill="#1C242D" stroke="#313E4A" strokeWidth="2" />

          {/* White Painted Boundary Dividing Line on Bridge Center */}
          <line x1="540" y1="180" x2="540" y2="215" stroke="#F4EFE6" strokeWidth="8" />

          {/* Heavy Steel Truss Arches */}
          <path
            d="M 40 180 Q 280 40 520 180"
            fill="none"
            stroke="#2E3C4A"
            strokeWidth="12"
          />
          <path
            d="M 560 180 Q 800 40 1040 180"
            fill="none"
            stroke="#2E3C4A"
            strokeWidth="12"
          />

          {/* Diagonal Truss Struts */}
          {[100, 180, 260, 340, 420, 500, 580, 660, 740, 820, 900, 980].map((tx) => (
            <line key={tx} x1={tx} y1="180" x2={tx} y2={100} stroke="#3D4E5F" strokeWidth="4" />
          ))}

          {/* Concrete Bridge Piers into Frozen Havel River */}
          <rect x="20" y="215" width="80" height="240" fill="#151C22" />
          <rect x="500" y="215" width="80" height="240" fill="#151C22" />
          <rect x="980" y="215" width="80" height="240" fill="#151C22" />
        </g>
      </svg>

      {/* Diplomatic Exchange Pill (top >= 880) */}
      <div
        style={{
          position: 'absolute',
          top: 890,
          left: 50,
          right: 50,
          padding: '16px 28px',
          backgroundColor: '#121A22',
          border: '2px solid #4CC9F0',
          borderRadius: 6,
          boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontFamily: montserrat.fontFamily, fontSize: 28, color: '#F4EFE6' }}>
          GLIENICKE BRIDGE • 05:44 AM
        </span>
        <span style={{ fontFamily: montserrat.fontFamily, fontSize: 18, fontWeight: 800, color: '#4CC9F0' }}>
          POWERS ⮀ RUDOLF ABEL
        </span>
      </div>

      {/* Francis Gary Powers (Walking West) */}
      <CutoutPuppet
        character="POWERS"
        outfit="HIGH_ALTITUDE_SUIT"
        initialPose="NEUTRAL"
        switchedPose="SALUTE"
        poseSwitchFrame={30}
        x={360}
        y={1260}
        scale={0.88}
      />

      {/* KGB Master Spy Rudolf Abel (Walking East) */}
      <CutoutPuppet
        character="ABEL"
        outfit="TRENCH_COAT"
        initialPose="NEUTRAL"
        switchedPose="POINTING"
        poseSwitchFrame={30}
        x={720}
        y={1260}
        scale={0.88}
      />
    </div>
  );
};

// =========================================================================
// 18. SCENE 18: SOVIET & US SPACE SURVEILLANCE STAGE
// Parametric KH-4 CORONA spy satellite in low Earth orbit with scanning cone,
// curved planetary ozone limb, and Lockheed SR-71 Blackbird in stratosphere.
// =========================================================================
export const SpySatelliteEraTransitionVector: React.FC = () => {
  const frame = useCurrentFrame();
  const scanConePulse = 0.22 + 0.08 * Math.sin(frame * 0.09);
  const orbitDash = -frame * 2.5;
  const flamePulse = 1 + 0.18 * Math.sin(frame * 0.35);
  const satSway = Math.sin(frame * 0.05) * 4;

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <defs>
          {/* Earth Atmosphere Gradient */}
          <radialGradient id="earthLimbGlow" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#1E3A8A" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
          </radialGradient>
          {/* Satellite Scan Cone */}
          <linearGradient id="satScanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity={scanConePulse} />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
          {/* SR-71 Mach Afterburner */}
          <linearGradient id="afterburnerGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Curved Planet Earth Horizon Arc (y = 1380 to 1490) */}
        <path
          d="M -100 1490 Q 540 1340 1180 1490 L 1180 1600 L -100 1600 Z"
          fill="#0F172A"
          stroke="#38BDF8"
          strokeWidth="3"
        />
        {/* Glowing Atmospheric Ozone Limb Ring */}
        <path
          d="M -100 1484 Q 540 1334 1180 1484"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="12"
          opacity="0.35"
        />

        {/* 2. Dotted Orbital Trajectory Vector slicing across space */}
        <path
          d="M 60 940 Q 540 1050 1020 900"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2"
          strokeDasharray="10 8"
          strokeDashoffset={orbitDash}
          opacity="0.45"
        />

        {/* 3. KH-4 CORONA Spy Satellite in Orbit (y: 920 - 1160) */}
        <g transform={`translate(280, ${970 + satSway}) scale(1.18)`}>
          {/* Scanning Translucent Radar Cone descending toward Earth */}
          <polygon
            points="0,30 -260,440 260,440"
            fill="url(#satScanGrad)"
          />

          {/* Golden Solar Arrays (Left & Right) */}
          <g fill="#D97706" stroke="#F59E0B" strokeWidth="1.5">
            {/* Left Array */}
            <rect x="-150" y="-14" width="100" height="28" rx="2" />
            <line x1="-100" y1="-14" x2="-100" y2="14" stroke="#B45309" strokeWidth="1.2" />
            {/* Right Array */}
            <rect x="50" y="-14" width="100" height="28" rx="2" />
            <line x1="100" y1="-14" x2="100" y2="14" stroke="#B45309" strokeWidth="1.2" />
          </g>

          {/* Agena Cylindrical Bus (Dark Slate) */}
          <rect x="-55" y="-20" width="110" height="40" rx="6" fill="#1E293B" stroke="#64748B" strokeWidth="2" />

          {/* Gold Re-entry Film Return Capsule on Front Nose */}
          <path d="M 55 -16 L 82 -8 L 82 8 L 55 16 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />

          {/* Panoramic Camera Optical Turret pointing down */}
          <circle cx="0" cy="20" r="16" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
          <circle cx="0" cy="20" r="8" fill="#38BDF8" opacity="0.85" />

          {/* Satellite Telemetry Tag */}
          <g transform="translate(-130, -46)">
            <rect x="0" y="0" width="260" height="30" rx="4" fill="#0B1310" stroke="#38BDF8" strokeWidth="1.5" opacity="0.9" />
            <text
              x="130"
              y="20"
              fill="#ECFDF5"
              fontFamily={montserrat.fontFamily}
              fontSize="13"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="1.5"
            >
              KH-4 CORONA // ORBIT 165 KM
            </text>
          </g>
        </g>

        {/* 4. Lockheed SR-71 Blackbird Supersonic Silhouette (y: 1180 - 1440, Scaled 1.45x) */}
        <g transform="translate(620, 1260) rotate(-7) scale(1.45)">
          {/* Supersonic Mach Shockwave Cone */}
          <path
            d="M 120 0 L -180 -120 M 120 0 L -180 120"
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity="0.55"
          />

          {/* Twin J58 Afterburner Exhaust Flames */}
          <g transform={`scale(${flamePulse}, 1)`}>
            <polygon points="-90,-32 -180,-32 -90,-26" fill="url(#afterburnerGrad)" />
            <polygon points="-90,26 -180,32 -90,32" fill="url(#afterburnerGrad)" />
          </g>

          {/* Parametric SR-71 Airframe Silhouette (Matte Obsidian) */}
          <path
            d="M 120 0 L 30 -16 L -10 -42 L -60 -44 L -65 -16 L -90 -16 L -90 0 L -90 16 L -65 16 L -60 44 L -10 42 L 30 16 Z"
            fill="#0F1012"
            stroke="#38BDF8"
            strokeWidth="2"
          />
          {/* Engine Nacelle Spikes */}
          <polygon points="-5,-42 12,-42 0,-38" fill="#38BDF8" opacity="0.8" />
          <polygon points="-5,42 12,42 0,38" fill="#38BDF8" opacity="0.8" />

          {/* Twin Canted Vertical Rudders */}
          <polygon points="-40,-38 -75,-48 -70,-34" fill="#1C1917" stroke="#64748B" strokeWidth="1.5" />
          <polygon points="-40,38 -75,48 -70,34" fill="#1C1917" stroke="#64748B" strokeWidth="1.5" />

          {/* SR-71 Speed Callout Tag */}
          <g transform="translate(-160, 56)">
            <rect x="0" y="0" width="180" height="26" rx="4" fill="#0B1310" stroke="#EF4444" strokeWidth="1.5" opacity="0.9" />
            <text
              x="90"
              y="18"
              fill="#ECFDF5"
              fontFamily={montserrat.fontFamily}
              fontSize="12"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="1.5"
            >
              SR-71 // MACH 3.2
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export const WavingFlagSovietUsStage: React.FC = () => {
  return <SpySatelliteEraTransitionVector />;
};

// =========================================================================
// 19. SCENE 19: EPILOGUE WEATHERED BRASS PLAQUE
// Heavy weathered brass memorial plaque with 4 corner screws, gold laurel leaves,
// engraved top-down Lockheed U-2 Dragon Lady silhouette and declassified mission stamp.
// =========================================================================
export const U2EpilogueBrassPlaqueCard: React.FC = () => {
  const frame = useCurrentFrame();
  const specularX = interpolate(frame, [0, 165], [-300, 1100], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* Weathered Military Brass Memorial Plaque (Pinned y = 880 to 1460) */}
      <div
        style={{
          position: 'absolute',
          top: 890,
          left: 60,
          right: 60,
          height: 560,
          background: 'linear-gradient(145deg, #382A14 0%, #1E170A 50%, #120E05 100%)',
          border: '4px solid #C4A25D',
          borderRadius: 8,
          boxShadow: '0 24px 60px rgba(0,0,0,0.85), inset 0 2px 4px rgba(255,255,255,0.15)',
          overflow: 'hidden',
        }}
      >
        {/* Dynamic Specular Sheen sweeping across brass */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 140,
            transform: `translateX(${specularX}px) skewX(-24deg)`,
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(244,208,111,0.22) 50%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* 4 Heavy Corner Hex Screws */}
        {[
          { top: 14, left: 14 },
          { top: 14, right: 14 },
          { bottom: 14, left: 14 },
          { bottom: 14, right: 14 },
        ].map((pos, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              ...pos,
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: '#A88438',
              border: '2px solid #4A3510',
              boxShadow: '0 2px 4px rgba(0,0,0,0.7)',
            }}
          />
        ))}

        {/* Inner Engraved Bevel Border */}
        <div
          style={{
            position: 'absolute',
            inset: 12,
            border: '1px solid rgba(196, 162, 93, 0.45)',
            borderRadius: 4,
            pointerEvents: 'none',
          }}
        />

        {/* Top Declassification Tag */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 28,
            fontFamily: montserrat.fontFamily,
            fontSize: 16,
            fontWeight: 800,
            color: '#C4A25D',
            letterSpacing: 4,
          }}
        >
          HISTORICAL DECLASSIFICATION
        </div>

        {/* Engraved Vector Planform of Lockheed U-2 "Dragon Lady" */}
        <div style={{ position: 'relative', width: '100%', height: 320, marginTop: 10 }}>
          <svg viewBox="0 0 600 320" style={{ width: '100%', height: '100%' }}>
            {/* Target Reticle / Compass Radial Rings */}
            <circle cx="300" cy="160" r="110" fill="none" stroke="#C4A25D" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <circle cx="300" cy="160" r="60" fill="none" stroke="#C4A25D" strokeWidth="1" strokeDasharray="2 4" opacity="0.3" />
            <line x1="160" y1="160" x2="440" y2="160" stroke="#C4A25D" strokeWidth="1" opacity="0.3" />
            <line x1="300" y1="40" x2="300" y2="280" stroke="#C4A25D" strokeWidth="1" opacity="0.3" />

            {/* Flight Path Vector Dotted Line */}
            <path d="M 80 250 L 520 70" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.75" />

            {/* Lockheed U-2 Planform Engraved Silhouette (Wingspan 80 ft, Slender Body) */}
            <g transform="translate(300, 160) rotate(-22)">
              {/* Massive Glider High-Aspect Wings */}
              <polygon
                points="-240,4 -15,-6 -8,-2 8,-2 15,-6 240,4 240,10 15,10 -15,10 -240,10"
                fill="#F4D06F"
                stroke="#C4A25D"
                strokeWidth="1.5"
              />
              {/* Slender Fuselage */}
              <path
                d="M 0 -85 C 5 -50, 7 0, 7 60 L 5 95 L -5 95 L -7 60 C -7 0, -5 -50, 0 -85 Z"
                fill="#F4D06F"
                stroke="#C4A25D"
                strokeWidth="1.5"
              />
              {/* Horizontal Stabilizer Tail */}
              <polygon
                points="-55,80 0,72 55,80 50,88 0,85 -50,88"
                fill="#F4D06F"
                stroke="#C4A25D"
                strokeWidth="1.5"
              />
              {/* Cockpit Canopy Teardrop */}
              <ellipse cx="0" cy="-40" rx="4" ry="12" fill="#1E170A" stroke="#C4A25D" strokeWidth="1" />
            </g>
          </svg>
        </div>

        {/* Bottom Coordinates & Mission Plaque Label */}
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <div
            style={{
              fontFamily: montserrat.fontFamily,
              fontSize: 18,
              fontWeight: 800,
              color: '#F4EFE6',
              letterSpacing: 3,
            }}
          >
            MAY 1, 1960 • SVERDLOVSK
          </div>
          <div
            style={{
              fontFamily: montserrat.fontFamily,
              fontSize: 13,
              fontWeight: 700,
              color: '#EF4444',
              letterSpacing: 2,
              marginTop: 6,
            }}
          >
            RECONNAISSANCE SQUADRON 10-10
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 1: SOVIET RADAR CLOSEUP LOCK (SPLIT_CONFRONTATION / HERO)
// =========================================================================
export const SovietRadarCloseupLock: React.FC = () => {
  const frame = useCurrentFrame();
  const sweepAngle = (frame * 4.5) % 360;
  const alertPulse = Math.sin(frame * 0.35);
  const reticleShake = frame % 4 === 0 ? (frame % 8 === 0 ? 3 : -3) : 0;
  const lockRingScale = interpolate(frame, [0, 38], [1.35, 1.0], CLAMP);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="radarCathodeGlow" cx="50%" cy="55%" r="48%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#064E3B" stopOpacity="0.65" />
            <stop offset="90%" stopColor="#022C22" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#061712" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="alertRedGlow" cx="50%" cy="55%" r="35%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity={0.25 + alertPulse * 0.15} />
            <stop offset="70%" stopColor="#7F1D1D" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="beamSweepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <circle cx="540" cy="1180" r="460" fill="url(#radarCathodeGlow)" />
        <circle cx="540" cy="1180" r="420" fill="url(#alertRedGlow)" />
        <circle cx="540" cy="1180" r="470" fill="none" stroke="#1F2937" strokeWidth="24" />
        <circle cx="540" cy="1180" r="455" fill="none" stroke="#374151" strokeWidth="6" />

        {/* Concentric Range Rings */}
        <circle cx="540" cy="1180" r="80" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.45" />
        <circle cx="540" cy="1180" r="150" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 4" opacity="0.45" />
        <circle cx="540" cy="1180" r="220" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.45" />
        <circle cx="540" cy="1180" r="290" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 4" opacity="0.45" />
        <circle cx="540" cy="1180" r="360" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.45" />
        <circle cx="540" cy="1180" r="430" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 4" opacity="0.45" />

        {/* Coordinate Crosshairs */}
        <line x1="80" y1="1180" x2="1000" y2="1180" stroke="#10B981" strokeWidth="2" opacity="0.6" />
        <line x1="540" y1="720" x2="540" y2="1640" stroke="#10B981" strokeWidth="2" opacity="0.6" />
        <line x1="215" y1="855" x2="865" y2="1505" stroke="#10B981" strokeWidth="1" strokeDasharray="4 8" opacity="0.35" />
        <line x1="215" y1="1505" x2="865" y2="855" stroke="#10B981" strokeWidth="1" strokeDasharray="4 8" opacity="0.35" />

        {/* Azimuth Angle Tick Marks */}
        <line x1="100" y1="1180" x2="115" y2="1180" stroke="#34D399" strokeWidth="2" />
        <line x1="965" y1="1180" x2="980" y2="1180" stroke="#34D399" strokeWidth="2" />
        <line x1="540" y1="740" x2="540" y2="755" stroke="#34D399" strokeWidth="2" />
        <line x1="540" y1="1605" x2="540" y2="1620" stroke="#34D399" strokeWidth="2" />

        {/* Radar Antenna Structural Lattice Paths */}
        <g>
          <path d="M 400 1180 L 480 1100 L 600 1100 L 680 1180" fill="none" stroke="#059669" strokeWidth="1.5" opacity="0.5" />
          <path d="M 400 1180 L 480 1260 L 600 1260 L 680 1180" fill="none" stroke="#059669" strokeWidth="1.5" opacity="0.5" />
          <path d="M 460 1140 L 620 1140" stroke="#059669" strokeWidth="1" opacity="0.4" />
          <path d="M 460 1220 L 620 1220" stroke="#059669" strokeWidth="1" opacity="0.4" />
          <path d="M 320 1180 L 380 1120" stroke="#10B981" strokeWidth="1.5" opacity="0.4" />
          <path d="M 760 1180 L 700 1120" stroke="#10B981" strokeWidth="1.5" opacity="0.4" />
          <path d="M 320 1180 L 380 1240" stroke="#10B981" strokeWidth="1.5" opacity="0.4" />
          <path d="M 760 1180 L 700 1240" stroke="#10B981" strokeWidth="1.5" opacity="0.4" />
          <path d="M 500 1160 L 580 1160 M 500 1200 L 580 1200" stroke="#10B981" strokeWidth="1" opacity="0.5" />
        </g>

        {/* Traced Soviet P-30 Radar Antenna Silhouette */}
        <g opacity="0.3" transform="translate(420, 1060)">
          <SovietRadarP30Silhouette scale={0.4} x={0} y={0} color="#34D399" />
        </g>

        {/* Rotating Radar Sweep Beam */}
        <g transform={`rotate(${sweepAngle}, 540, 1180)`}>
          <path d="M 540 1180 L 980 1100 A 440 440 0 0 1 980 1260 Z" fill="url(#beamSweepGrad)" opacity="0.3" />
          <path d="M 540 1180 L 980 1140 A 440 440 0 0 1 980 1220 Z" fill="#6EE7B7" opacity="0.2" />
          <line x1="540" y1="1180" x2="980" y2="1180" stroke="#A7F3D0" strokeWidth="3" />
        </g>

        {/* Target Blip & Violent Lock Reticle */}
        <g transform={`translate(${680 + reticleShake}, ${1040 + reticleShake}) scale(${lockRingScale})`}>
          <circle cx="0" cy="0" r="14" fill="#EF4444" opacity="0.9" />
          <circle cx="0" cy="0" r="28" fill="none" stroke="#F87171" strokeWidth="2.5" strokeDasharray="6 4" />
          <circle cx="0" cy="0" r="45" fill="none" stroke="#EF4444" strokeWidth="3" />
          <path d="M -55 0 L -25 0 M 25 0 L 55 0 M 0 -55 L 0 -25 M 0 25 L 0 55" stroke="#EF4444" strokeWidth="3" />
          <path d="M -45 -30 L -45 -45 L -30 -45" fill="none" stroke="#FCA5A5" strokeWidth="3" />
          <path d="M 45 -30 L 45 -45 L 30 -45" fill="none" stroke="#FCA5A5" strokeWidth="3" />
          <path d="M -45 30 L -45 45 L -30 45" fill="none" stroke="#FCA5A5" strokeWidth="3" />
          <path d="M 45 30 L 45 45 L 30 45" fill="none" stroke="#FCA5A5" strokeWidth="3" />
          <path d="M -12 -12 L 12 12 M -12 12 L 12 -12" stroke="#FFFFFF" strokeWidth="2" />
        </g>

        {/* Telemetry HUD & Status Readouts */}
        <g transform="translate(140, 920)">
          <rect x="0" y="0" width="280" height="70" rx="4" fill="#022C22" stroke="#10B981" strokeWidth="1.5" opacity="0.85" />
          <path d="M 10 10 L 10 60 M 270 10 L 270 60" stroke="#34D399" strokeWidth="2" />
          <text x="20" y="30" fill="#34D399" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="900" letterSpacing="1">
            ALT: 70,500 FT
          </text>
          <text x="20" y="55" fill="#A7F3D0" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="800">
            HDG: 042° MAG // 410 KT
          </text>
        </g>

        <g transform="translate(660, 920)">
          <rect x="0" y="0" width="280" height="70" rx="4" fill="#450A0A" stroke="#EF4444" strokeWidth="1.5" opacity="0.85" />
          <path d="M 10 10 L 10 60 M 270 10 L 270 60" stroke="#F87171" strokeWidth="2" />
          <text x="20" y="30" fill="#EF4444" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="900" letterSpacing="1">
            TARGET ACQUIRED
          </text>
          <text x="20" y="55" fill="#FCA5A5" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="800">
            PVO SVERDLOVSK SECTOR
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 2: S-75 DVINA MISSILE STREAK (VEHICLE_IN_TRANSIT / HERO)
// =========================================================================
export const S75DvinaMissileStreak: React.FC = () => {
  const frame = useCurrentFrame();
  const missileX = interpolate(frame, [0, 90], [-250, 750], CLAMP);
  const missileY = interpolate(frame, [0, 90], [1480, 980], CLAMP);
  const exhaustFlicker = (frame % 3) * 6;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="stratosphereGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#0F172A" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#020617" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="exhaustFlame" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0" />
            <stop offset="40%" stopColor="#F97316" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#FBBF24" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="missileBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1080" height="1920" fill="url(#stratosphereGlow)" />

        {/* High-Altitude Horizon Curvature & Stratosphere Isobars */}
        <path d="M 0 1480 Q 540 1440 1080 1480 L 1080 1920 L 0 1920 Z" fill="#090D16" />
        <path d="M 0 1400 Q 540 1360 1080 1400" fill="none" stroke="#1E293B" strokeWidth="2" strokeDasharray="8 8" />
        <path d="M 0 1320 Q 540 1280 1080 1320" fill="none" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="4 8" />
        <path d="M 0 1240 Q 540 1200 1080 1240" fill="none" stroke="#1E293B" strokeWidth="1" strokeDasharray="2 6" />
        <path d="M 0 1160 Q 540 1120 1080 1160" fill="none" stroke="#1E293B" strokeWidth="1" opacity="0.4" />
        <path d="M 0 1080 Q 540 1040 1080 1080" fill="none" stroke="#1E293B" strokeWidth="1" opacity="0.3" />

        {/* Tactical Trajectory Vectors */}
        <path d="M -100 1550 Q 300 1350 820 1020" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="10 8" opacity="0.6" />
        <path d="M -60 1570 Q 320 1360 840 1030" fill="none" stroke="#F97316" strokeWidth="1.5" opacity="0.4" />
        <line x1="820" y1="1020" x2="880" y2="980" stroke="#EF4444" strokeWidth="2" />
        <circle cx="820" cy="1020" r="16" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="820" cy="1020" r="6" fill="#EF4444" />

        {/* Tactical Waypoint Grids */}
        <line x1="780" y1="990" x2="860" y2="990" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="780" y1="1050" x2="860" y2="1050" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="790" y1="980" x2="790" y2="1060" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="850" y1="980" x2="850" y2="1060" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />

        {/* U-2 Distant Glider Silhouette */}
        <g transform="translate(800, 970)">
          <path d="M -110 0 L 110 0 L 0 -12 Z" fill="#334155" />
          <path d="M -12 -35 L 12 -35 L 4 25 L -4 25 Z" fill="#1E293B" />
          <path d="M -25 22 L 25 22 L 0 30 Z" fill="#334155" />
          <circle cx="0" cy="0" r="30" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
        </g>

        {/* S-75 Dvina Missile Streak Assembly */}
        <g transform={`translate(${missileX}, ${missileY}) rotate(-32)`}>
          {/* Supersonic Exhaust Plume */}
          <path d={`M -350 ${-25 - exhaustFlicker} Q -180 0 0 -12 L 0 12 Q -180 0 -350 ${25 + exhaustFlicker} Z`} fill="url(#exhaustFlame)" />
          <path d="M -260 -10 Q -120 0 0 -6 L 0 6 Q -120 0 -260 10 Z" fill="#FFFFFF" opacity="0.9" />

          {/* Shock Diamonds */}
          <polygon points="-60,-10 -40,0 -60,10 -80,0" fill="#FEF08A" opacity="0.8" />
          <polygon points="-120,-12 -95,0 -120,12 -145,0" fill="#FBBF24" opacity="0.7" />
          <polygon points="-180,-14 -150,0 -180,14 -210,0" fill="#F97316" opacity="0.6" />
          <polygon points="-240,-16 -210,0 -240,16 -270,0" fill="#DC2626" opacity="0.4" />

          {/* Traced S-75 Missile Silhouette Reference */}
          <g transform="translate(-120, -60)" opacity="0.35">
            <S75DvinaMissileSilhouette scale={0.45} x={0} y={0} color="#F8FAFC" />
          </g>

          {/* Missile Fuselage & Sustainer Stage */}
          <rect x="0" y="-12" width="160" height="24" rx="3" fill="url(#missileBodyGrad)" stroke="#334155" strokeWidth="2" />
          <path d="M 160 -12 L 230 0 L 160 12 Z" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
          <path d="M 210 -4 L 230 0 L 210 4 Z" fill="#DC2626" />

          {/* Forward Guidance Canards */}
          <polygon points="140,-12 170,-45 155,-12" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
          <polygon points="140,12 170,45 155,12" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
          <polygon points="145,-12 160,-28 152,-12" fill="#94A3B8" />
          <polygon points="145,12 160,28 152,12" fill="#94A3B8" />

          {/* Main Cruciform Mid-Body Wings */}
          <polygon points="40,-12 70,-80 20,-12" fill="#475569" stroke="#1E293B" strokeWidth="2" />
          <polygon points="40,12 70,80 20,12" fill="#475569" stroke="#1E293B" strokeWidth="2" />
          <polygon points="45,-12 65,-65 30,-12" fill="#64748B" />
          <polygon points="45,12 65,65 30,12" fill="#64748B" />

          {/* Aft Booster Fins */}
          <polygon points="-30,-14 -10,-95 -60,-14" fill="#334155" stroke="#0F172A" strokeWidth="2" />
          <polygon points="-30,14 -10,95 -60,14" fill="#334155" stroke="#0F172A" strokeWidth="2" />
          <rect x="-40" y="-14" width="40" height="28" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />

          {/* Airframe Panel Seams & Rivet Rings */}
          <line x1="30" y1="-12" x2="30" y2="12" stroke="#64748B" strokeWidth="1.5" />
          <line x1="80" y1="-12" x2="80" y2="12" stroke="#64748B" strokeWidth="1.5" />
          <line x1="120" y1="-12" x2="120" y2="12" stroke="#64748B" strokeWidth="1.5" />
          <circle cx="50" cy="0" r="2" fill="#F8FAFC" />
          <circle cx="100" cy="0" r="2" fill="#F8FAFC" />
        </g>

        {/* Telemetry Callout Card */}
        <g transform="translate(120, 1420)">
          <rect x="0" y="0" width="360" height="64" rx="4" fill="#020617" stroke="#DC2626" strokeWidth="1.5" opacity="0.9" />
          <path d="M 8 12 L 8 52 M 352 12 L 352 52" stroke="#EF4444" strokeWidth="2" />
          <text x="24" y="28" fill="#F87171" fontFamily={montserrat.fontFamily} fontSize="17" fontWeight="900" letterSpacing="1">
            V-750 (1D) SURFACE-TO-AIR
          </text>
          <text x="24" y="50" fill="#E2E8F0" fontFamily={montserrat.fontFamily} fontSize="13" fontWeight="800">
            SPEED: MACH 3.5 // RANGE: 45 KM
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 3: MISSILE DETONATION & CABIN LOSS (STRUCTURAL_FRACTURE / HERO)
// =========================================================================
export const U2MissileDetonationSpin: React.FC = () => {
  const frame = useCurrentFrame();
  const blastScale = interpolate(frame, [0, 20, 120], [0.2, 1.4, 2.2], CLAMP);
  const blastOpacity = interpolate(frame, [0, 15, 80, 120], [0.9, 1.0, 0.4, 0], CLAMP);
  const spinAngle = interpolate(frame, [0, 120], [0, 480], CLAMP);
  const planeFallY = interpolate(frame, [0, 120], [1050, 1420], CLAMP);
  const altimeterRoll = Math.round(interpolate(frame, [0, 120], [70500, 28000], CLAMP));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="blastFireCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#F97316" />
            <stop offset="85%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#18181B" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="shockwaveRingGrad" cx="50%" cy="50%" r="48%">
            <stop offset="70%" stopColor="#F87171" stopOpacity="0" />
            <stop offset="90%" stopColor="#FBBF24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Expanding High-Altitude Detonation Blast Shockwave */}
        <g transform={`translate(540, 1080) scale(${blastScale})`} opacity={blastOpacity}>
          <circle cx="0" cy="0" r="280" fill="url(#blastFireCore)" />
          <circle cx="0" cy="0" r="320" fill="url(#shockwaveRingGrad)" />

          {/* High-Velocity Shrapnel Star Spikes */}
          <path d="M 0 -360 L 25 -120 L 360 0 L 120 25 L 0 360 L -25 120 L -360 0 L -120 -25 Z" fill="#FEF08A" opacity="0.75" />
          <path d="M -240 -240 L -60 -60 L -240 60 L -60 60 L 240 240 L 60 60 L 240 -60 L 60 -60 Z" fill="#F97316" opacity="0.6" />
          <path d="M -180 -180 L -30 -30 L 180 180" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M 180 -180 L 30 -30 L -180 180" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="-380" y1="0" x2="380" y2="0" stroke="#FFFFFF" strokeWidth="4" />
          <line x1="0" y1="-380" x2="0" y2="380" stroke="#FFFFFF" strokeWidth="4" />
          <line x1="-270" y1="-270" x2="270" y2="270" stroke="#FBBF24" strokeWidth="3" />
          <line x1="-270" y1="270" x2="270" y2="-270" stroke="#FBBF24" strokeWidth="3" />
        </g>

        {/* Traced U-2 Crash Wreckage Silhouette */}
        <g opacity="0.4" transform={`translate(440, ${planeFallY - 120}) rotate(${spinAngle * 0.4})`}>
          <U2WreckageSverdlovskSilhouette scale={0.5} x={0} y={0} color="#EF4444" />
        </g>

        {/* Fractured U-2 Airframe Entering Inverted Flat Spin */}
        <g transform={`translate(540, ${planeFallY}) rotate(${spinAngle})`}>
          {/* Main Fuselage Body */}
          <path d="M -22 -140 L 22 -140 L 16 110 L -16 110 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
          <path d="M -16 -140 L 0 -175 L 16 -140 Z" fill="#334155" />

          {/* Intact Left Glider Wing */}
          <polygon points="-20,-20 -380,-60 -360,-40 -18,10" fill="#334155" stroke="#1E293B" strokeWidth="2.5" />
          <line x1="-80" y1="-25" x2="-80" y2="0" stroke="#64748B" strokeWidth="2" />
          <line x1="-160" y1="-35" x2="-160" y2="-5" stroke="#64748B" strokeWidth="2" />
          <line x1="-240" y1="-45" x2="-240" y2="-15" stroke="#64748B" strokeWidth="2" />
          <line x1="-320" y1="-55" x2="-320" y2="-25" stroke="#64748B" strokeWidth="2" />

          {/* Severed Right Wing Spar (Detonated by Shrapnel) */}
          <polygon points="20,-20 120,-35 140,-15 18,10" fill="#475569" stroke="#DC2626" strokeWidth="3" />
          <path d="M 120 -35 L 155 -50 L 135 -20 L 170 -15 L 140 -15" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />
          <line x1="60" y1="-22" x2="60" y2="2" stroke="#DC2626" strokeWidth="2" />
          <line x1="90" y1="-28" x2="90" y2="-8" stroke="#DC2626" strokeWidth="2" />

          {/* Shrapnel Shard Flight Paths */}
          <path d="M 100 -50 L 140 -80 L 120 -30 Z" fill="#EF4444" />
          <path d="M -80 80 L -120 120 L -60 110 Z" fill="#EF4444" />
          <path d="M -140 -60 L -180 -90 L -150 -40 Z" fill="#F59E0B" />
          <path d="M 60 100 L 90 140 L 40 120 Z" fill="#F59E0B" />

          {/* Decompression Vapor Jets */}
          <line x1="-30" y1="20" x2="-80" y2="40" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="30" y1="20" x2="80" y2="40" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="-20" y1="-40" x2="-60" y2="-80" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="20" y1="-40" x2="60" y2="-80" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />

          {/* Snapped Empennage / Horizontal Stabilizer */}
          <polygon points="-12,100 -70,140 -50,150 -6,110" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          <polygon points="12,100 40,125 30,135 6,110" fill="#334155" stroke="#DC2626" strokeWidth="2" />

          {/* Shrapnel Punctures & Fuel Spray Trails */}
          <circle cx="5" cy="-40" r="5" fill="#EF4444" />
          <circle cx="-8" cy="20" r="4" fill="#EF4444" />
          <circle cx="12" cy="60" r="4" fill="#EF4444" />
          <path d="M 140 -15 Q 220 20 300 80" fill="none" stroke="#F97316" strokeWidth="4" strokeDasharray="8 6" />
          <path d="M 120 -35 Q 200 -60 280 -80" fill="none" stroke="#94A3B8" strokeWidth="3" strokeDasharray="6 6" />
          <path d="M -16 110 Q -40 180 -80 250" fill="none" stroke="#64748B" strokeWidth="3" strokeDasharray="4 6" />
          <path d="M 0 -175 Q -50 -220 -90 -280" fill="none" stroke="#DC2626" strokeWidth="2" strokeDasharray="6 6" />
        </g>

        {/* Rapidly Rolling Altimeter HUD Gauge */}
        <g transform="translate(320, 1460)">
          <rect x="0" y="0" width="440" height="96" rx="8" fill="#020617" stroke="#EF4444" strokeWidth="3" />
          <rect x="12" y="12" width="416" height="72" fill="#450A0A" rx="4" />
          <path d="M 12 12 L 30 12 M 428 12 L 410 12" stroke="#EF4444" strokeWidth="3" />
          <path d="M 12 84 L 30 84 M 428 84 L 410 84" stroke="#EF4444" strokeWidth="3" />
          <text x="30" y="44" fill="#FCA5A5" fontFamily={montserrat.fontFamily} fontSize="16" fontWeight="900" letterSpacing="1">
            RAPID DECOMPRESSION // ALTITUDE
          </text>
          <text x="30" y="74" fill="#FFFFFF" fontFamily={montserrat.fontFamily} fontSize="32" fontWeight="900" letterSpacing="2">
            {`${altimeterRoll.toLocaleString()} FT`}
          </text>
          <path d="M 370 24 L 400 48 L 370 72 Z" fill="#EF4444" />
          <circle cx="340" cy="48" r="16" fill="#DC2626" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 4: NASA FABRICATED FLIGHT MAP OVER TURKEY (VECTOR_MAP)
// =========================================================================
export const NasaFabricatedFlightMap: React.FC = () => {
  const frame = useCurrentFrame();
  const panX = interpolate(frame, [0, 120], [0, -60], CLAMP);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="mapPaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>

        <rect x="80" y="880" width="920" height="600" fill="url(#mapPaperGrad)" rx="8" stroke="#334155" strokeWidth="3" />

        {/* Traced Operation Grand Slam Route Reference */}
        <g opacity="0.45" transform={`translate(${140 + panX}, 900)`}>
          <NasaFlightMapTurkeySilhouette scale={0.7} x={0} y={0} color="#38BDF8" />
        </g>

        {/* Coastline Outlines & Territorial Borders */}
        <path d="M 120 1280 Q 240 1240 380 1260 Q 520 1280 660 1220 Q 820 1190 980 1210" fill="none" stroke="#60A5FA" strokeWidth="3" opacity="0.7" />
        <path d="M 120 1020 Q 280 1040 440 990 Q 600 960 760 1010 Q 900 1030 980 980" fill="none" stroke="#60A5FA" strokeWidth="2.5" opacity="0.6" />
        <path d="M 380 1260 Q 420 1180 500 1160 Q 580 1140 660 1220" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 240 1080 Q 320 1120 400 1100 Q 480 1080 560 1120" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 500 1160 L 520 1130 L 560 1140" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
        <path d="M 680 1100 L 720 1080 L 750 1110" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
        <path d="M 780 1140 L 820 1120 L 850 1160" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
        <path d="M 160 1120 L 220 1150 L 200 1180" fill="none" stroke="#60A5FA" strokeWidth="1.5" />

        {/* Fabricated NASA Weather Route Vector */}
        <path d="M 320 1260 Q 480 1150 720 1080" fill="none" stroke="#FBBF24" strokeWidth="4.5" strokeDasharray="10 6" />
        <path d="M 720 1080 Q 800 1040 880 1020" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="6 6" />
        <path d="M 320 1260 L 260 1320" fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M 880 1020 L 920 990" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 3" />

        {/* Navigation Compass Rose */}
        <path d="M 880 940 L 890 910 L 900 940 L 930 950 L 900 960 L 890 990 L 880 960 L 850 950 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
        <path d="M 885 945 L 890 925 L 895 945 L 915 950 L 895 955 L 890 975 L 885 955 L 865 950 Z" fill="#FEF08A" />
        <circle cx="890" cy="950" r="35" fill="none" stroke="#FBBF24" strokeWidth="1" strokeDasharray="2 4" />

        {/* Latitude and Longitude Grid Lines */}
        <line x1="80" y1="1000" x2="1000" y2="1000" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="80" y1="1150" x2="1000" y2="1150" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="80" y1="1300" x2="1000" y2="1300" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="300" y1="880" x2="300" y2="1480" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="600" y1="880" x2="600" y2="1480" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 8" />

        {/* Staging Waypoints */}
        <g transform="translate(320, 1260)">
          <circle cx="0" cy="0" r="10" fill="#EF4444" />
          <path d="M -15 0 L 15 0" stroke="#FCA5A5" strokeWidth="2" />
          <path d="M 0 -15 L 0 15" stroke="#FCA5A5" strokeWidth="2" />
          <text x="18" y="6" fill="#F8FAFC" fontFamily={montserrat.fontFamily} fontSize="17" fontWeight="800">
            INCIRLIK AIR BASE (ADANA)
          </text>
        </g>

        <g transform="translate(720, 1080)">
          <circle cx="0" cy="0" r="9" fill="#FBBF24" />
          <path d="M -12 0 L 12 0" stroke="#FEF08A" strokeWidth="1.5" />
          <path d="M 0 -12 L 0 12" stroke="#FEF08A" strokeWidth="1.5" />
          <text x="18" y="6" fill="#FDE047" fontFamily={montserrat.fontFamily} fontSize="17" fontWeight="800">
            LAST CONTACT // LAKE VAN
          </text>
        </g>

        {/* Mission Legend Badge */}
        <g transform="translate(140, 1400)">
          <rect x="0" y="0" width="800" height="56" rx="4" fill="#020617" stroke="#3B82F6" strokeWidth="1.5" opacity="0.9" />
          <path d="M 12 16 L 24 28 L 12 40 Z" fill="#60A5FA" />
          <path d="M 788 16 L 776 28 L 788 40 Z" fill="#60A5FA" />
          <text x="36" y="36" fill="#93C5FD" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="800" letterSpacing="1">
            FABRICATED ROUTE: NASA CIVILIAN FLIGHT 55741
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 5: OFFICIAL STATEMENT STAMP CARD (QUOTE_CARD)
// =========================================================================
export const OfficialStatementStampCard: React.FC = () => {
  const frame = useCurrentFrame();
  const stampSlam = interpolate(frame, [0, 32, 38], [2.2, 1.0, 1.0], CLAMP);
  const stampOpacity = interpolate(frame, [0, 30, 32], [0, 0.2, 1.0], CLAMP);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect x="140" y="890" width="800" height="580" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="4" />
        <rect x="160" y="910" width="760" height="540" fill="none" stroke="#94A3B8" strokeWidth="1.5" />

        <g transform="translate(200, 960)">
          <circle cx="30" cy="20" r="24" fill="#1E3A8A" />
          <path d="M 18 20 L 42 20 M 30 8 L 30 32" stroke="#FFFFFF" strokeWidth="3" />
          <text x="75" y="24" fill="#0F172A" fontFamily={montserrat.fontFamily} fontSize="22" fontWeight="900" letterSpacing="1">
            NATIONAL AERONAUTICS & SPACE ADMIN.
          </text>
          <text x="75" y="46" fill="#475569" fontFamily={montserrat.fontFamily} fontSize="15" fontWeight="800" letterSpacing="2">
            PRESS RELEASE NO. 60-184 // IMMEDIATE RELEASE
          </text>
        </g>

        <g transform="translate(200, 1050)">
          <line x1="0" y1="0" x2="680" y2="0" stroke="#64748B" strokeWidth="8" strokeLinecap="round" opacity="0.3" />
          <line x1="0" y1="36" x2="680" y2="36" stroke="#64748B" strokeWidth="8" strokeLinecap="round" opacity="0.3" />
          <line x1="0" y1="72" x2="680" y2="72" stroke="#64748B" strokeWidth="8" strokeLinecap="round" opacity="0.3" />
          <line x1="0" y1="108" x2="680" y2="108" stroke="#64748B" strokeWidth="8" strokeLinecap="round" opacity="0.3" />
          <text x="0" y="260" fill="#334155" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="800">
            PILOT EXPERIENCED OXYGEN FAILURE OVER LAKE VAN, TURKEY.
          </text>
          <text x="0" y="295" fill="#334155" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="800">
            AIRCRAFT UNARMED AND SOLELY FOR WEATHER DATA COLLECTION.
          </text>
        </g>

        <g opacity="0.25" transform="translate(220, 1100)">
          <FakeNasaU2WeatherSilhouette scale={0.65} x={0} y={0} color="#0F172A" />
        </g>

        <g transform={`translate(540, 1180) rotate(-12) scale(${stampSlam})`} opacity={stampOpacity}>
          <rect x="-310" y="-65" width="620" height="130" fill="none" stroke="#DC2626" strokeWidth="8" rx="6" />
          <rect x="-295" y="-52" width="590" height="104" fill="#FEF2F2" fillOpacity="0.85" stroke="#EF4444" strokeWidth="3" />
          <text x="0" y="20" fill="#B91C1C" fontFamily={montserrat.fontFamily} fontSize="54" fontWeight="900" letterSpacing="4" textAnchor="middle">
            OFFICIAL STATEMENT
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 6: EISENHOWER PRESS DENIAL STAGE (SPLIT_CONFRONTATION / HERO)
// =========================================================================
export const EisenhowerPressDenialStage: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = frame % 25 < 3 ? 1.0 : 0.0;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="pressSpotlight" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.3 + flash * 0.4} />
            <stop offset="80%" stopColor="#78350F" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1C1917" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="80" y="880" width="920" height="600" fill="#451A03" rx="8" stroke="#78350F" strokeWidth="4" />
        <circle cx="540" cy="1160" r="380" fill="url(#pressSpotlight)" />

        {/* Fluted Columns & Wainscoting */}
        <rect x="140" y="880" width="40" height="600" fill="#78350F" stroke="#291102" strokeWidth="2" opacity="0.6" />
        <rect x="260" y="880" width="40" height="600" fill="#78350F" stroke="#291102" strokeWidth="2" opacity="0.6" />
        <rect x="780" y="880" width="40" height="600" fill="#78350F" stroke="#291102" strokeWidth="2" opacity="0.6" />
        <rect x="900" y="880" width="40" height="600" fill="#78350F" stroke="#291102" strokeWidth="2" opacity="0.6" />

        {/* Traced Eisenhower Portrait Silhouette */}
        <g opacity="0.25" transform="translate(180, 940)">
          <EisenhowerPortraitSilhouette scale={0.7} x={0} y={0} color="#FBBF24" />
        </g>

        {/* Press Microphone Cluster with 14 Detailed Paths */}
        <g transform="translate(540, 1340)">
          <rect x="-14" y="-80" width="28" height="60" rx="14" fill="#94A3B8" stroke="#F1F5F9" strokeWidth="2" />
          <path d="M -14 -60 L 14 -60 M -14 -40 L 14 -40" stroke="#64748B" strokeWidth="2" />
          <path d="M 0 -20 L 0 80" stroke="#64748B" strokeWidth="6" />

          {/* Left CBS Microphone */}
          <rect x="-90" y="-60" width="24" height="50" rx="12" fill="#64748B" stroke="#CBD5E1" strokeWidth="2" />
          <path d="M -90 -45 L -66 -45 M -90 -30 L -66 -30" stroke="#475569" strokeWidth="1.5" />
          <path d="M -78 -10 L -20 80" stroke="#475569" strokeWidth="5" />

          {/* Right NBC Microphone */}
          <rect x="66" y="-60" width="24" height="50" rx="12" fill="#64748B" stroke="#CBD5E1" strokeWidth="2" />
          <path d="M 66 -45 L 90 -45 M 66 -30 L 90 -30" stroke="#475569" strokeWidth="1.5" />
          <path d="M 78 -10 L 20 80" stroke="#475569" strokeWidth="5" />

          {/* Call Letter Plates */}
          <path d="M -88 -75 L -68 -75 L -68 -62 L -88 -62 Z" fill="#0F172A" stroke="#CBD5E1" strokeWidth="1" />
          <path d="M 68 -75 L 88 -75 L 88 -62 L 68 -62 Z" fill="#0F172A" stroke="#CBD5E1" strokeWidth="1" />
          <path d="M -50 0 L -50 30" stroke="#94A3B8" strokeWidth="2" />
          <path d="M 50 0 L 50 30" stroke="#94A3B8" strokeWidth="2" />
          <path d="M -30 -10 L -30 20" stroke="#64748B" strokeWidth="2" />
          <path d="M 30 -10 L 30 20" stroke="#64748B" strokeWidth="2" />
        </g>

        {/* Presidential Podium Eagle Medallion */}
        <polygon points="260,1480 320,1320 760,1320 820,1480" fill="#291102" stroke="#78350F" strokeWidth="4" />
        <path d="M 320 1320 L 760 1320 M 340 1350 L 740 1350" stroke="#92400E" strokeWidth="2" />
        <circle cx="540" cy="1400" r="32" fill="#78350F" stroke="#F59E0B" strokeWidth="2" />
        <path d="M 525 1400 L 555 1400 M 540 1385 L 540 1415" stroke="#FBBF24" strokeWidth="2" />
        <path d="M 530 1390 L 550 1410 M 530 1410 L 550 1390" stroke="#FBBF24" strokeWidth="1.5" />
      </svg>

      <div style={{ position: 'absolute', top: 920, left: 380, width: 320, height: 420 }}>
        <CutoutPuppet
          headSrc="plates/eisenhower_portrait.jpg"
          headScale={1.15}
          headAnchorX={160}
          headAnchorY={130}
          poseSwitchFrame={34}
        />
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 7: KREMLIN FIVE-DAY SILENCE STAGE (CROWD_TALLY)
// =========================================================================
export const KremlinFiveDaySilenceStage: React.FC = () => {
  const frame = useCurrentFrame();
  const currentDay = Math.min(5, Math.floor(frame / 20) + 1);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="kremlinRedAtmosphere" cx="50%" cy="60%" r="55%">
            <stop offset="0%" stopColor="#7F1D1D" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#450A0A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0B0505" stopOpacity="1" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="1080" height="1920" fill="url(#kremlinRedAtmosphere)" />

        {/* Traced Kremlin Spasskaya Tower Silhouette */}
        <g opacity="0.5" transform="translate(180, 890)">
          <KremlinMoscowRedSilhouette scale={0.72} x={0} y={0} color="#EF4444" />
        </g>

        {/* Kremlin Wall Crenellations & Spasskaya Clock Geometry */}
        <path d="M 80 1420 L 1000 1420 L 1000 1560 L 80 1560 Z" fill="#200505" stroke="#7F1D1D" strokeWidth="3" />
        <path d="M 120 1420 L 120 1380 L 160 1380 L 160 1420" fill="#200505" stroke="#7F1D1D" strokeWidth="2" />
        <path d="M 220 1420 L 220 1380 L 260 1380 L 260 1420" fill="#200505" stroke="#7F1D1D" strokeWidth="2" />
        <path d="M 320 1420 L 320 1380 L 360 1380 L 360 1420" fill="#200505" stroke="#7F1D1D" strokeWidth="2" />
        <path d="M 420 1420 L 420 1380 L 460 1380 L 460 1420" fill="#200505" stroke="#7F1D1D" strokeWidth="2" />
        <path d="M 520 1420 L 520 1380 L 560 1380 L 560 1420" fill="#200505" stroke="#7F1D1D" strokeWidth="2" />
        <path d="M 620 1420 L 620 1380 L 660 1380 L 660 1420" fill="#200505" stroke="#7F1D1D" strokeWidth="2" />
        <path d="M 720 1420 L 720 1380 L 760 1380 L 760 1420" fill="#200505" stroke="#7F1D1D" strokeWidth="2" />
        <path d="M 820 1420 L 820 1380 L 860 1380 L 860 1420" fill="#200505" stroke="#7F1D1D" strokeWidth="2" />
        <path d="M 920 1420 L 920 1380 L 960 1380 L 960 1420" fill="#200505" stroke="#7F1D1D" strokeWidth="2" />

        {/* Spasskaya Tower Spire & Ruby Star Paths */}
        <polygon points="540,880 520,960 560,960" fill="#991B1B" stroke="#DC2626" strokeWidth="2" />
        <polygon points="540,860 545,875 560,875 548,885 552,900 540,890 528,900 532,885 520,875 535,875" fill="#EF4444" stroke="#F87171" strokeWidth="1" />
        <path d="M 480 960 L 600 960 L 580 1020 L 500 1020 Z" fill="#450A0A" stroke="#7F1D1D" strokeWidth="2" />
        <path d="M 490 1020 L 590 1020 L 590 1080 L 490 1080 Z" fill="#200505" stroke="#7F1D1D" strokeWidth="2" />
        <path d="M 510 1040 Q 520 1020 530 1040 Z" fill="#991B1B" />
        <path d="M 550 1040 Q 560 1020 570 1040 Z" fill="#991B1B" />
        <path d="M 530 980 Q 540 960 550 980 Z" fill="#991B1B" />
        <path d="M 500 1100 Q 520 1080 540 1100 Z" fill="#7F1D1D" />
        <path d="M 540 1100 Q 560 1080 580 1100 Z" fill="#7F1D1D" />
        <path d="M 520 920 Q 540 900 560 920 Z" fill="#7F1D1D" />

        {/* Kremlin Wall Foundation Brick Lines */}
        <line x1="80" y1="1450" x2="1000" y2="1450" stroke="#450A0A" strokeWidth="1" />
        <line x1="80" y1="1480" x2="1000" y2="1480" stroke="#450A0A" strokeWidth="1" />
        <line x1="80" y1="1510" x2="1000" y2="1510" stroke="#450A0A" strokeWidth="1" />
        <line x1="80" y1="1540" x2="1000" y2="1540" stroke="#450A0A" strokeWidth="1" />

        {/* Spasskaya Clock Face & Pendulum Paths */}
        <circle cx="540" cy="1160" r="110" fill="#1C1917" stroke="#DC2626" strokeWidth="4" />
        <circle cx="540" cy="1160" r="95" fill="none" stroke="#F87171" strokeWidth="1.5" strokeDasharray="4 6" />
        <path d="M 540 1070 L 540 1090 M 540 1230 L 540 1250" stroke="#F87171" strokeWidth="3" />
        <path d="M 450 1160 L 470 1160 M 610 1160 L 630 1160" stroke="#F87171" strokeWidth="3" />
        <line x1="540" y1="1160" x2="580" y2="1130" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        <line x1="540" y1="1160" x2="540" y2="1100" stroke="#FCA5A5" strokeWidth="3" strokeLinecap="round" />
        <circle cx="540" cy="1160" r="8" fill="#DC2626" />

        {/* 5-Day Mechanical Silence Counter */}
        <g transform="translate(240, 1430)">
          <rect x="0" y="0" width="600" height="90" rx="8" fill="#0B0505" stroke="#DC2626" strokeWidth="2.5" />
          <path d="M 120 0 L 120 90 M 240 0 L 240 90 M 360 0 L 360 90 M 480 0 L 480 90" stroke="#7F1D1D" strokeWidth="1.5" />
          <text x="60" y="58" fill={1 <= currentDay ? '#EF4444' : '#450A0A'} fontFamily={montserrat.fontFamily} fontSize="34" fontWeight="900" textAnchor="middle">D1</text>
          <text x="180" y="58" fill={2 <= currentDay ? '#EF4444' : '#450A0A'} fontFamily={montserrat.fontFamily} fontSize="34" fontWeight="900" textAnchor="middle">D2</text>
          <text x="300" y="58" fill={3 <= currentDay ? '#EF4444' : '#450A0A'} fontFamily={montserrat.fontFamily} fontSize="34" fontWeight="900" textAnchor="middle">D3</text>
          <text x="420" y="58" fill={4 <= currentDay ? '#EF4444' : '#450A0A'} fontFamily={montserrat.fontFamily} fontSize="34" fontWeight="900" textAnchor="middle">D4</text>
          <text x="540" y="58" fill={5 <= currentDay ? '#EF4444' : '#450A0A'} fontFamily={montserrat.fontFamily} fontSize="34" fontWeight="900" textAnchor="middle">D5</text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 8: KHRUSHCHEV SUPREME SOVIET PODIUM (LONE_LEADER)
// =========================================================================
export const KhrushchevSupremeSovietStage: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="sovietHallLight" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#7F1D1D" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#2A0808" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0B0303" stopOpacity="1" />
          </radialGradient>
        </defs>

        <rect x="80" y="880" width="920" height="600" fill="url(#sovietHallLight)" rx="8" stroke="#7F1D1D" strokeWidth="4" />

        {/* Velvet Drapery Folds & Hall Architecture */}
        <path d="M 100 880 Q 200 1000 100 1120 Q 200 1240 100 1360" fill="none" stroke="#991B1B" strokeWidth="6" opacity="0.6" />
        <path d="M 980 880 Q 880 1000 980 1120 Q 880 1240 980 1360" fill="none" stroke="#991B1B" strokeWidth="6" opacity="0.6" />
        <line x1="80" y1="920" x2="1000" y2="920" stroke="#F59E0B" strokeWidth="4" />
        <line x1="80" y1="935" x2="1000" y2="935" stroke="#7F1D1D" strokeWidth="2" />

        {/* Golden Soviet Coat of Arms (Hammer & Sickle + Wheat Sheaves) */}
        <g transform="translate(540, 990)">
          <circle cx="0" cy="0" r="45" fill="#991B1B" stroke="#F59E0B" strokeWidth="2.5" />
          <path d="M -15 -10 A 20 20 0 1 1 5 15 L 18 10 A 26 26 0 1 0 -10 -18 Z" fill="#FBBF24" />
          <polygon points="-8,-6 20,22 15,26 -12,-2" fill="#FBBF24" />
          <polygon points="0,-35 4,-24 14,-24 6,-18 9,-8 0,-14 -9,-8 -6,-18 -14,-24 -4,-24" fill="#F59E0B" />
          <path d="M -35 25 Q -45 0 -35 -25 Q -30 0 -25 25" fill="#FBBF24" opacity="0.8" />
          <path d="M 35 25 Q 45 0 35 -25 Q 30 0 25 25" fill="#FBBF24" opacity="0.8" />
        </g>

        {/* Traced Khrushchev Silhouette Reference */}
        <g opacity="0.3" transform="translate(200, 940)">
          <KhrushchevPortraitSilhouette scale={0.65} x={0} y={0} color="#F59E0B" />
        </g>

        {/* Supreme Soviet Grand Orator Dais & Microphones */}
        <polygon points="260,1480 320,1300 760,1300 820,1480" fill="#1C1917" stroke="#7F1D1D" strokeWidth="4" />
        <path d="M 320 1300 L 760 1300 M 340 1330 L 740 1330" stroke="#991B1B" strokeWidth="2" />
        <rect x="490" y="1230" width="100" height="70" fill="#334155" stroke="#64748B" strokeWidth="2" />
        <circle cx="515" cy="1220" r="10" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
        <circle cx="565" cy="1220" r="10" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
        <path d="M 515 1230 L 515 1250 M 565 1230 L 565 1250" stroke="#64748B" strokeWidth="3" />
      </svg>

      <div style={{ position: 'absolute', top: 900, left: 380, width: 320, height: 420 }}>
        <CutoutPuppet
          headSrc="plates/khrushchev_portrait.jpg"
          headScale={1.15}
          headAnchorX={160}
          headAnchorY={130}
          poseSwitchFrame={35}
        />
      </div>
    </div>
  );
};

// =========================================================================
// SCENE 9: DOSSIER SLAMS THE TRAP (STRUCTURAL_FRACTURE / HERO)
// =========================================================================
export const DossierSlamsScatteredPhotos: React.FC = () => {
  const frame = useCurrentFrame();
  const slamProgress = interpolate(frame, [0, 35, 42], [2.4, 1.0, 1.0], CLAMP);
  const photoScatter = interpolate(frame, [35, 75], [0, 1.0], CLAMP);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="deskWoodAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B1D0E" />
            <stop offset="100%" stopColor="#120A05" />
          </radialGradient>
        </defs>

        <rect x="80" y="880" width="920" height="600" fill="url(#deskWoodAura)" rx="8" stroke="#542813" strokeWidth="4" />

        {/* Desk Surface Woodgrain Panels */}
        <line x1="80" y1="980" x2="1000" y2="980" stroke="#291102" strokeWidth="2" />
        <line x1="80" y1="1100" x2="1000" y2="1100" stroke="#291102" strokeWidth="2" />
        <line x1="80" y1="1240" x2="1000" y2="1240" stroke="#291102" strokeWidth="2" />
        <line x1="80" y1="1380" x2="1000" y2="1380" stroke="#291102" strokeWidth="2" />

        {/* Scattered Reconnaissance Photos Recovered from Downed U-2 */}
        <g transform={`translate(${360 - photoScatter * 160}, ${1060 + photoScatter * 80}) rotate(${-18 * photoScatter})`}>
          <rect x="-140" y="-95" width="280" height="190" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3" rx="4" />
          <rect x="-125" y="-80" width="250" height="140" fill="#1E293B" />
          <circle cx="0" cy="-10" r="30" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M -50 -10 L 50 -10 M 0 -40 L 0 20" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M -80 -60 L -60 -40 M -40 -60 L -20 -40" stroke="#64748B" strokeWidth="2" />
          <path d="M 20 -60 L 40 -40 M 60 -60 L 80 -40" stroke="#64748B" strokeWidth="2" />
          <text x="0" y="75" fill="#475569" fontFamily={montserrat.fontFamily} fontSize="12" fontWeight="800" textAnchor="middle">
            TYURATAM MISSILE SITE // EXP 084
          </text>
          <path d="M -130 -85 L -70 -85" stroke="#334155" strokeWidth="2" />
          <path d="M -130 -75 L -90 -75" stroke="#334155" strokeWidth="2" />
          <path d="M 70 85 L 130 85" stroke="#334155" strokeWidth="2" />
        </g>

        <g transform={`translate(${720 + photoScatter * 140}, ${1100 + photoScatter * 100}) rotate(${22 * photoScatter})`}>
          <rect x="-140" y="-95" width="280" height="190" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3" rx="4" />
          <rect x="-125" y="-80" width="250" height="140" fill="#0F172A" />
          <line x1="-80" y1="-50" x2="80" y2="30" stroke="#64748B" strokeWidth="4" />
          <line x1="-70" y1="-30" x2="90" y2="50" stroke="#64748B" strokeWidth="4" />
          <path d="M -100 20 L -60 20 L -80 -20 Z" fill="#334155" />
          <path d="M 40 -40 L 80 -40 L 60 -80 Z" fill="#334155" />
          <text x="0" y="75" fill="#475569" fontFamily={montserrat.fontFamily} fontSize="12" fontWeight="800" textAnchor="middle">
            MAYAK PLUTONIUM PLANT // EXP 192
          </text>
        </g>

        {/* Heavy KGB Declassified Dossier Folder Slam */}
        <g transform={`translate(540, 1170) scale(${slamProgress})`}>
          <rect x="-260" y="-170" width="520" height="340" fill="#D97706" rx="6" stroke="#92400E" strokeWidth="4" />
          <rect x="-240" y="-150" width="480" height="300" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <path d="M -260 0 L 260 0" stroke="#B45309" strokeWidth="3" strokeDasharray="8 6" />

          {/* Dossier Corner Tabs & Paper Binding Rivets */}
          <path d="M -260 -170 L -210 -170 L -230 -140 L -260 -140 Z" fill="#B45309" />
          <path d="M 260 -170 L 210 -170 L 230 -140 L 260 -140 Z" fill="#B45309" />
          <path d="M -260 170 L -210 170 L -230 140 L -260 140 Z" fill="#B45309" />
          <path d="M 260 170 L 210 170 L 230 140 L 260 140 Z" fill="#B45309" />
          <circle cx="-230" cy="-120" r="4" fill="#78350F" />
          <circle cx="230" cy="-120" r="4" fill="#78350F" />
          <circle cx="-230" cy="120" r="4" fill="#78350F" />
          <circle cx="230" cy="120" r="4" fill="#78350F" />
          <circle cx="-250" cy="-60" r="6" fill="#78350F" stroke="#B45309" strokeWidth="2" />
          <circle cx="-250" cy="60" r="6" fill="#78350F" stroke="#B45309" strokeWidth="2" />
          <line x1="-250" y1="-60" x2="-250" y2="60" stroke="#92400E" strokeWidth="3" />
          <path d="M -250 -60 Q -230 0 -250 60" fill="none" stroke="#F59E0B" strokeWidth="2" />
          <rect x="-220" y="-140" width="120" height="40" fill="#B45309" rx="3" />
          <line x1="-210" y1="-120" x2="-110" y2="-120" stroke="#FDE68A" strokeWidth="2" />
          <line x1="-210" y1="-110" x2="-140" y2="-110" stroke="#FDE68A" strokeWidth="1.5" />
          <circle cx="-40" cy="-20" r="15" fill="none" stroke="#F59E0B" strokeWidth="1" />
          <circle cx="40" cy="20" r="15" fill="none" stroke="#F59E0B" strokeWidth="1" />

          {/* Red Wax Seal & File Tie String */}
          <circle cx="160" cy="0" r="34" fill="#991B1B" stroke="#7F1D1D" strokeWidth="3" />
          <path d="M 148 -12 L 172 12 M 172 -12 L 148 12" stroke="#FEF2F2" strokeWidth="3" />
          <path d="M -240 0 L 126 0" stroke="#78350F" strokeWidth="4" />

          {/* Soviet Top Secret Classification Stamp */}
          <g transform="translate(-80, -50) rotate(-8)">
            <rect x="-110" y="-35" width="220" height="70" fill="none" stroke="#DC2626" strokeWidth="5" rx="4" />
            <path d="M -105 -30 L -90 -30 M 105 -30 L 90 -30" stroke="#DC2626" strokeWidth="2" />
            <path d="M -105 30 L -90 30 M 105 30 L 90 30" stroke="#DC2626" strokeWidth="2" />
            <text x="0" y="10" fill="#DC2626" fontFamily={montserrat.fontFamily} fontSize="26" fontWeight="900" letterSpacing="2" textAnchor="middle">
              СОВ. СЕКРЕТНО
            </text>
            <text x="0" y="26" fill="#DC2626" fontFamily={montserrat.fontFamily} fontSize="12" fontWeight="800" letterSpacing="1" textAnchor="middle">
              TOP SECRET // EVIDENCE NO. 1
            </text>
          </g>

          <text x="-210" y="100" fill="#78350F" fontFamily={montserrat.fontFamily} fontSize="16" fontWeight="900">
            CASE: CIA LOCKHEED U-2C SVERDLOVSK
          </text>
          <text x="-210" y="125" fill="#78350F" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="800">
            RECOVERED FILM SPOOLS: 1,200 FRAMES INTACT
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 10: CHECKMATE 1 - POWERS CAPTURED PHOTO (SPLIT_CONFRONTATION / HERO)
// =========================================================================
export const CheckmatePowersCapturedStage: React.FC = () => {
  const frame = useCurrentFrame();
  const scanLine = (frame * 12) % 480;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="kgbInterrogationAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        <rect x="80" y="880" width="920" height="600" fill="url(#kgbInterrogationAura)" rx="8" stroke="#334155" strokeWidth="4" />

        {/* Traced Francis Gary Powers Portrait Silhouette */}
        <g opacity="0.35" transform="translate(180, 930)">
          <PowersPortraitSilhouette scale={0.7} x={0} y={0} color="#F8FAFC" />
        </g>

        {/* Forensic Biometric Height & Alignment Grid */}
        <g transform="translate(180, 920)">
          <line x1="0" y1="0" x2="0" y2="520" stroke="#475569" strokeWidth="3" />
          <line x1="0" y1="50" x2="30" y2="50" stroke="#64748B" strokeWidth="2" />
          <line x1="0" y1="100" x2="30" y2="100" stroke="#64748B" strokeWidth="2" />
          <line x1="0" y1="150" x2="30" y2="150" stroke="#64748B" strokeWidth="2" />
          <line x1="0" y1="200" x2="30" y2="200" stroke="#64748B" strokeWidth="2" />
          <line x1="0" y1="250" x2="30" y2="250" stroke="#64748B" strokeWidth="2" />
          <line x1="0" y1="300" x2="30" y2="300" stroke="#64748B" strokeWidth="2" />
          <line x1="0" y1="350" x2="30" y2="350" stroke="#64748B" strokeWidth="2" />
          <line x1="0" y1="400" x2="30" y2="400" stroke="#64748B" strokeWidth="2" />
          <line x1="0" y1="450" x2="30" y2="450" stroke="#64748B" strokeWidth="2" />
          <line x1="0" y1="500" x2="30" y2="500" stroke="#64748B" strokeWidth="2" />
          <text x="35" y="55" fill="#94A3B8" fontFamily={montserrat.fontFamily} fontSize="12" fontWeight="800">190 CM</text>
          <text x="35" y="155" fill="#94A3B8" fontFamily={montserrat.fontFamily} fontSize="12" fontWeight="800">180 CM</text>
          <text x="35" y="255" fill="#94A3B8" fontFamily={montserrat.fontFamily} fontSize="12" fontWeight="800">170 CM</text>
          <text x="35" y="355" fill="#94A3B8" fontFamily={montserrat.fontFamily} fontSize="12" fontWeight="800">160 CM</text>
        </g>

        {/* Biometric Scanning Telemetry Overlay */}
        <g transform="translate(540, 1160)">
          <circle cx="0" cy="-60" r="70" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="6 4" />
          <circle cx="0" cy="-60" r="90" fill="none" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 4" />
          <path d="M -80 -60 L -60 -60 M 60 -60 L 80 -60" stroke="#EF4444" strokeWidth="2" />
          <path d="M 0 -140 L 0 -120 M 0 0 L 0 20" stroke="#EF4444" strokeWidth="2" />
          <path d="M -45 -105 L -35 -105 L -45 -95" fill="none" stroke="#FCA5A5" strokeWidth="2" />
          <path d="M 45 -105 L 35 -105 L 45 -95" fill="none" stroke="#FCA5A5" strokeWidth="2" />
          <path d="M -45 -15 L -35 -15 L -45 -25" fill="none" stroke="#FCA5A5" strokeWidth="2" />
          <path d="M 45 -15 L 35 -15 L 45 -25" fill="none" stroke="#FCA5A5" strokeWidth="2" />
          <path d="M -30 -90 L 30 -90 M 0 -100 L 0 -80" stroke="#38BDF8" strokeWidth="2" />
          <path d="M -25 -40 L 25 -40 M 0 -50 L 0 -30" stroke="#38BDF8" strokeWidth="2" />
          <path d="M -35 10 L 35 10 M 0 0 L 0 20" stroke="#38BDF8" strokeWidth="2" />
          <circle cx="-30" cy="-60" r="10" fill="none" stroke="#38BDF8" strokeWidth="1" />
          <circle cx="30" cy="-60" r="10" fill="none" stroke="#38BDF8" strokeWidth="1" />
          <circle cx="0" cy="40" r="8" fill="none" stroke="#38BDF8" strokeWidth="1" />
          <line x1="-90" y1="-150" x2="-70" y2="-150" stroke="#EF4444" strokeWidth="2" />
          <line x1="70" y1="-150" x2="90" y2="-150" stroke="#EF4444" strokeWidth="2" />
          <circle cx="310" cy="-160" r="45" fill="none" stroke="#DC2626" strokeWidth="3" strokeDasharray="6 3" />
          <circle cx="310" cy="-160" r="38" fill="none" stroke="#DC2626" strokeWidth="1" />
          <path d="M 290 -160 L 330 -160" stroke="#EF4444" strokeWidth="2" />
          <polygon points="310,-175 313,-167 321,-167 315,-162 317,-154 310,-159 303,-154 305,-162 299,-167 307,-167" fill="#DC2626" />
          <path d="M -40 -120 L -20 -120 M 20 -120 L 40 -120" stroke="#38BDF8" strokeWidth="1.5" />
          <path d="M -40 60 L -20 60 M 20 60 L 40 60" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="-60" cy="-60" r="4" fill="#EF4444" />
          <circle cx="60" cy="-60" r="4" fill="#EF4444" />
          <circle cx="0" cy="-10" r="4" fill="#38BDF8" />
          <path d="M -10 -10 L 10 -10 M 0 -20 L 0 0" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="-120" y1={`-180 + ${scanLine}`} x2="120" y2={`-180 + ${scanLine}`} stroke="#EF4444" strokeWidth="2" opacity="0.8" />
        </g>

        {/* Lubyanka Prison Intake Placard */}
        <g transform="translate(240, 1400)">
          <rect x="0" y="0" width="600" height="66" rx="4" fill="#0F172A" stroke="#EF4444" strokeWidth="2" />
          <path d="M 12 12 L 12 54 M 588 12 L 588 54" stroke="#F87171" strokeWidth="2" />
          <path d="M 20 20 L 30 20 M 580 20 L 570 20" stroke="#EF4444" strokeWidth="1.5" />
          <path d="M 20 46 L 30 46 M 580 46 L 570 46" stroke="#EF4444" strokeWidth="1.5" />
          <text x="30" y="30" fill="#F87171" fontFamily={montserrat.fontFamily} fontSize="17" fontWeight="900" letterSpacing="1">
            PILOT: POWERS, FRANCIS GARY // CAPTURED ALIVE
          </text>
          <text x="30" y="52" fill="#E2E8F0" fontFamily={montserrat.fontFamily} fontSize="13" fontWeight="800">
            KGB DETENTION // MOSCOW LUBYANKA PRISON
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 11: CHECKMATE - INTACT U-2 PLANE WRECKAGE EXHIBITION (VEHICLE_IN_TRANSIT / HERO)
// =========================================================================
export const U2WreckageExhibitionStage: React.FC = () => {
  const frame = useCurrentFrame();
  const spotPan = Math.sin(frame * 0.05) * 40;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="exhibitSpotlightGrad" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#0F172A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#020617" stopOpacity="1" />
          </radialGradient>
        </defs>

        <rect x="80" y="880" width="920" height="600" fill="url(#exhibitSpotlightGrad)" rx="8" stroke="#334155" strokeWidth="4" />

        {/* Moving Exhibit Overhead Searchlight Beam */}
        <g transform={`translate(${540 + spotPan}, 880)`}>
          <polygon points="0,0 -240,600 240,600" fill="#38BDF8" fillOpacity="0.08" />
          <line x1="0" y1="0" x2="-240" y2="600" stroke="#38BDF8" strokeWidth="1.5" opacity="0.3" strokeDasharray="6 6" />
          <line x1="0" y1="0" x2="240" y2="600" stroke="#38BDF8" strokeWidth="1.5" opacity="0.3" strokeDasharray="6 6" />
        </g>

        {/* Traced U-2 Crash Wreckage Silhouette on Plinth */}
        <g opacity="0.85" transform="translate(240, 960)">
          <U2WreckageSverdlovskSilhouette scale={0.7} x={0} y={0} color="#E2E8F0" />
        </g>

        {/* Exhibition Hall Steel Truss Ceiling Girder Paths */}
        <g transform="translate(100, 890)" opacity="0.5">
          <line x1="0" y1="0" x2="880" y2="0" stroke="#475569" strokeWidth="6" />
          <path d="M 0 0 L 55 40 L 110 0 L 165 40 L 220 0 L 275 40 L 330 0 L 385 40 L 440 0" stroke="#64748B" strokeWidth="2" fill="none" />
          <path d="M 440 0 L 495 40 L 550 0 L 605 40 L 660 0 L 715 40 L 770 0 L 825 40 L 880 0" stroke="#64748B" strokeWidth="2" fill="none" />
          <line x1="0" y1="40" x2="880" y2="40" stroke="#334155" strokeWidth="3" />
        </g>

        {/* Museum Exhibition Display Plinth */}
        <polygon points="160,1420 220,1320 860,1320 920,1420" fill="#1E293B" stroke="#475569" strokeWidth="3" />
        <path d="M 220 1320 L 860 1320 M 240 1350 L 840 1350" stroke="#334155" strokeWidth="2" />
        <line x1="200" y1="1380" x2="880" y2="1380" stroke="#334155" strokeWidth="1.5" />

        {/* Museum Overhead Spotlights */}
        <circle cx="200" cy="890" r="15" fill="#38BDF8" opacity="0.8" />
        <circle cx="400" cy="890" r="15" fill="#38BDF8" opacity="0.8" />
        <circle cx="680" cy="890" r="15" fill="#38BDF8" opacity="0.8" />
        <circle cx="880" cy="890" r="15" fill="#38BDF8" opacity="0.8" />

        {/* Technical Inspection Measurement Arrows */}
        <line x1="260" y1="1260" x2="820" y2="1260" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 6" />
        <path d="M 260 1250 L 260 1270 M 820 1250 L 820 1270" stroke="#F59E0B" strokeWidth="2" />
        <path d="M 270 1260 L 280 1255 L 280 1265 Z" fill="#F59E0B" />
        <path d="M 810 1260 L 800 1255 L 800 1265 Z" fill="#F59E0B" />

        {/* Wing Fracture Shards & Rib Paths */}
        <path d="M 320 1100 L 360 1080 L 350 1120 Z" fill="#475569" stroke="#334155" strokeWidth="1" />
        <path d="M 420 1090 L 450 1060 L 460 1100 Z" fill="#475569" stroke="#334155" strokeWidth="1" />
        <path d="M 620 1110 L 650 1080 L 660 1120 Z" fill="#475569" stroke="#334155" strokeWidth="1" />
        <path d="M 720 1100 L 760 1080 L 750 1120 Z" fill="#475569" stroke="#334155" strokeWidth="1" />
        <line x1="300" y1="1140" x2="380" y2="1140" stroke="#64748B" strokeWidth="2" />
        <line x1="700" y1="1140" x2="780" y2="1140" stroke="#64748B" strokeWidth="2" />

        {/* Floor Grid Perspective Lines */}
        <line x1="80" y1="1480" x2="1000" y2="1480" stroke="#1E293B" strokeWidth="2" />
        <line x1="200" y1="1420" x2="100" y2="1480" stroke="#1E293B" strokeWidth="2" />
        <line x1="540" y1="1420" x2="540" y2="1480" stroke="#1E293B" strokeWidth="2" />
        <line x1="880" y1="1420" x2="980" y2="1480" stroke="#1E293B" strokeWidth="2" />

        {/* Crowd Security Velvet Rope Stanchions */}
        <g transform="translate(140, 1430)">
          <rect x="0" y="0" width="16" height="50" rx="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="8" cy="-5" r="9" fill="#FBBF24" />
          <rect x="250" y="0" width="16" height="50" rx="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="258" cy="-5" r="9" fill="#FBBF24" />
          <rect x="520" y="0" width="16" height="50" rx="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="528" cy="-5" r="9" fill="#FBBF24" />
          <rect x="780" y="0" width="16" height="50" rx="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="788" cy="-5" r="9" fill="#FBBF24" />
          {/* Swag Velvet Ropes */}
          <path d="M 8 -5 Q 133 25 258 -5" fill="none" stroke="#DC2626" strokeWidth="5" />
          <path d="M 258 -5 Q 393 25 528 -5" fill="none" stroke="#DC2626" strokeWidth="5" />
          <path d="M 528 -5 Q 658 25 788 -5" fill="none" stroke="#DC2626" strokeWidth="5" />
        </g>

        {/* Soviet Exhibition Identification Placard */}
        <g transform="translate(240, 1420)">
          <rect x="0" y="0" width="600" height="56" rx="4" fill="#020617" stroke="#38BDF8" strokeWidth="2" />
          <path d="M 12 12 L 12 44 M 588 12 L 588 44" stroke="#38BDF8" strokeWidth="2" />
          <text x="30" y="26" fill="#38BDF8" fontFamily={montserrat.fontFamily} fontSize="17" fontWeight="900" letterSpacing="1">
            GORKY PARK EXHIBITION // MOSCOW MAY 1960
          </text>
          <text x="30" y="46" fill="#E2E8F0" fontFamily={montserrat.fontFamily} fontSize="13" fontWeight="800">
            WRECKAGE OF CIA LOCKHEED U-2C SERIAL 56-6693
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 12: CHECKMATE 2 - INTACT HYCON CAMERAS & FILM (STRUCTURAL_FRACTURE / HERO)
// =========================================================================
export const CheckmateIntactHyconFilmStage: React.FC = () => {
  const frame = useCurrentFrame();
  const spoolRotate = (frame * 3) % 360;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="lensGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#082F49" />
          </linearGradient>
        </defs>

        <rect x="80" y="880" width="920" height="600" fill="#0A0E17" rx="8" stroke="#1E293B" strokeWidth="4" />

        {/* Dual Giant Hycon B-Camera Precision Lens Assemblies */}
        <g transform="translate(360, 1140)">
          <circle cx="0" cy="0" r="140" fill="#1E293B" stroke="#475569" strokeWidth="8" />
          <circle cx="0" cy="0" r="115" fill="#0F172A" stroke="#334155" strokeWidth="4" />
          <circle cx="0" cy="0" r="90" fill="url(#lensGlassGrad)" stroke="#38BDF8" strokeWidth="3" />
          <path d="M -50 -50 A 70 70 0 0 1 50 -50" fill="none" stroke="#BAE6FD" strokeWidth="4" opacity="0.7" />
          <path d="M -30 -30 A 45 45 0 0 1 30 -30" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
          <path d="M -50 -50 L 0 -80 L 50 -50 L 80 0 L 50 50 L 0 80 L -50 50 L -80 0 Z" fill="none" stroke="#38BDF8" strokeWidth="2" />
          <path d="M -30 -30 L 0 -50 L 30 -30 L 50 0 L 30 30 L 0 50 L -30 30 L -50 0 Z" fill="none" stroke="#BAE6FD" strokeWidth="1.5" />
          <path d="M -70 -70 L -40 -100 L 0 -110 L 40 -100 L 70 -70 L 100 -40 L 110 0 L 100 40 L 70 70 L 40 100 L 0 110 L -40 100 L -70 70 L -100 40 L -110 0 L -100 -40 Z" fill="none" stroke="#475569" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="35" fill="#020617" />
          <path d="M -10 -10 L 10 10 M -10 10 L 10 -10" stroke="#38BDF8" strokeWidth="1.5" />
          <path d="M -60 0 L -40 0 M 40 0 L 60 0" stroke="#94A3B8" strokeWidth="2" />
          <path d="M 0 -60 L 0 -40 M 0 40 L 0 60" stroke="#94A3B8" strokeWidth="2" />
          <path d="M -80 -20 Q 0 -60 80 -20" fill="none" stroke="#BAE6FD" strokeWidth="1.5" opacity="0.6" />
          <line x1="-130" y1="0" x2="-115" y2="0" stroke="#94A3B8" strokeWidth="2" />
          <line x1="130" y1="0" x2="115" y2="0" stroke="#94A3B8" strokeWidth="2" />
          <line x1="0" y1="-130" x2="0" y2="-115" stroke="#94A3B8" strokeWidth="2" />
          <line x1="0" y1="130" x2="0" y2="115" stroke="#94A3B8" strokeWidth="2" />
        </g>

        {/* Unspooling Aerial Film Roll with Negative Frames */}
        <g transform="translate(700, 1140)">
          <g transform={`rotate(${spoolRotate})`}>
            <circle cx="0" cy="0" r="110" fill="#334155" stroke="#64748B" strokeWidth="4" />
            <circle cx="0" cy="0" r="40" fill="#0F172A" stroke="#94A3B8" strokeWidth="3" />
            <line x1="-100" y1="0" x2="100" y2="0" stroke="#94A3B8" strokeWidth="2" />
            <line x1="0" y1="-100" x2="0" y2="100" stroke="#94A3B8" strokeWidth="2" />
            <line x1="-70" y1="-70" x2="70" y2="70" stroke="#64748B" strokeWidth="2" />
            <line x1="-70" y1="70" x2="70" y2="-70" stroke="#64748B" strokeWidth="2" />
          </g>
        </g>

        {/* 9.5-inch Continuous Film Strip */}
        <g transform="translate(140, 1340)">
          <rect x="0" y="0" width="800" height="110" fill="#020617" stroke="#475569" strokeWidth="2" />
          <path d="M 0 25 L 800 25 M 0 85 L 800 85" stroke="#334155" strokeWidth="1" />
          <rect x="15" y="30" width="70" height="50" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
          <rect x="115" y="30" width="70" height="50" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
          <rect x="215" y="30" width="70" height="50" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
          <rect x="315" y="30" width="70" height="50" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
          <rect x="415" y="30" width="70" height="50" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
          <rect x="515" y="30" width="70" height="50" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
          <rect x="615" y="30" width="70" height="50" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
          <rect x="715" y="30" width="70" height="50" fill="#1E293B" stroke="#64748B" strokeWidth="1" />
          <circle cx="50" cy="12" r="3" fill="#94A3B8" />
          <circle cx="150" cy="12" r="3" fill="#94A3B8" />
          <circle cx="250" cy="12" r="3" fill="#94A3B8" />
          <circle cx="350" cy="12" r="3" fill="#94A3B8" />
          <circle cx="450" cy="12" r="3" fill="#94A3B8" />
          <circle cx="550" cy="12" r="3" fill="#94A3B8" />
          <circle cx="650" cy="12" r="3" fill="#94A3B8" />
          <circle cx="750" cy="12" r="3" fill="#94A3B8" />
          <circle cx="50" cy="98" r="3" fill="#94A3B8" />
          <circle cx="150" cy="98" r="3" fill="#94A3B8" />
          <circle cx="250" cy="98" r="3" fill="#94A3B8" />
          <circle cx="350" cy="98" r="3" fill="#94A3B8" />
          <circle cx="450" cy="98" r="3" fill="#94A3B8" />
          <circle cx="550" cy="98" r="3" fill="#94A3B8" />
          <circle cx="650" cy="98" r="3" fill="#94A3B8" />
          <circle cx="750" cy="98" r="3" fill="#94A3B8" />
        </g>

        {/* Soviet Technical Analysis Callout */}
        <g transform="translate(140, 910)">
          <rect x="0" y="0" width="480" height="56" rx="4" fill="#020617" stroke="#0284C7" strokeWidth="1.5" opacity="0.9" />
          <path d="M 8 12 L 8 44 M 472 12 L 472 44" stroke="#38BDF8" strokeWidth="2" />
          <path d="M 16 28 L 22 28 M 464 28 L 458 28" stroke="#38BDF8" strokeWidth="2" />
          <text x="30" y="28" fill="#38BDF8" fontFamily={montserrat.fontFamily} fontSize="17" fontWeight="900" letterSpacing="1">
            HYCON B-CAMERA // 36-INCH FOCAL LENGTH
          </text>
          <text x="30" y="48" fill="#E2E8F0" fontFamily={montserrat.fontFamily} fontSize="13" fontWeight="800">
            FILM RESOLUTION: 2.5 FT GROUND DETAIL FROM 70,000 FT
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 12: CHECKMATE 3 - POISON NEEDLE & CURARE COIN (SPLIT_CONFRONTATION / HERO)
// =========================================================================
export const CheckmatePoisonPinAliveStage: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="evidenceTrayGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0B132B" />
          </radialGradient>
        </defs>

        <rect x="80" y="880" width="920" height="600" fill="url(#evidenceTrayGlow)" rx="8" stroke="#334155" strokeWidth="4" />

        {/* Forensic Baize Cloth Grid Lines */}
        <line x1="80" y1="960" x2="1000" y2="960" stroke="#1E293B" strokeWidth="1" strokeDasharray="6 6" />
        <line x1="80" y1="1080" x2="1000" y2="1080" stroke="#1E293B" strokeWidth="1" strokeDasharray="6 6" />
        <line x1="80" y1="1200" x2="1000" y2="1200" stroke="#1E293B" strokeWidth="1" strokeDasharray="6 6" />
        <line x1="80" y1="1320" x2="1000" y2="1320" stroke="#1E293B" strokeWidth="1" strokeDasharray="6 6" />

        {/* Hollowed-Out 1921 Silver Dollar Concealment Coin */}
        <g transform="translate(340, 1160)">
          <circle cx="0" cy="0" r="110" fill="#94A3B8" stroke="#CBD5E1" strokeWidth="6" />
          <circle cx="0" cy="0" r="95" fill="#64748B" stroke="#475569" strokeWidth="2" />
          <path d="M -60 0 A 60 60 0 0 1 60 0" fill="none" stroke="#E2E8F0" strokeWidth="3" />
          <path d="M -40 -20 A 40 40 0 0 1 40 -20" fill="none" stroke="#CBD5E1" strokeWidth="2" />
          <path d="M -30 0 L -20 -15 L -10 -10 L 0 -25 L 10 -10 L 20 -15 L 30 0 L 20 15 L 0 20 L -20 15 Z" fill="#64748B" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M -90 -40 L -80 -35 M -90 40 L -80 35 M 90 -40 L 80 -35 M 90 40 L 80 35" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="0" cy="0" r="25" fill="#475569" stroke="#334155" strokeWidth="2" />
          <path d="M -15 0 L 15 0 M 0 -15 L 0 15" stroke="#CBD5E1" strokeWidth="1.5" />
          <text x="0" y="30" fill="#CBD5E1" fontFamily={montserrat.fontFamily} fontSize="14" fontWeight="900" letterSpacing="2" textAnchor="middle">
            UNITED STATES OF AMERICA
          </text>
          <text x="0" y="55" fill="#E2E8F0" fontFamily={montserrat.fontFamily} fontSize="16" fontWeight="900" letterSpacing="1" textAnchor="middle">
            ONE DOLLAR // 1921
          </text>
        </g>

        {/* Lethal Curare/Saxitoxin Concealment Needle */}
        <g transform="translate(680, 1160) rotate(45)">
          {/* Steel Needle Shaft */}
          <rect x="-6" y="-120" width="12" height="240" fill="#CBD5E1" stroke="#475569" strokeWidth="2" rx="3" />
          {/* Lethal Poison Tip */}
          <path d="M -6 -120 L 0 -160 L 6 -120 L 4 -100 L 0 -90 L -4 -100 Z" fill="#10B981" stroke="#059669" strokeWidth="2" />
          <circle cx="0" cy="-140" r="14" fill="#34D399" fillOpacity="0.3" />
          {/* Protective Sheath Groove */}
          <line x1="0" y1="-110" x2="0" y2="100" stroke="#475569" strokeWidth="2" />
          <line x1="-4" y1="-80" x2="4" y2="-80" stroke="#64748B" strokeWidth="1.5" />
          <line x1="-4" y1="-40" x2="4" y2="-40" stroke="#64748B" strokeWidth="1.5" />
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#64748B" strokeWidth="1.5" />
          <line x1="-4" y1="40" x2="4" y2="40" stroke="#64748B" strokeWidth="1.5" />
          <line x1="-4" y1="80" x2="4" y2="80" stroke="#64748B" strokeWidth="1.5" />
          <path d="M -6 -120 L -12 -110 L -6 -100" stroke="#10B981" strokeWidth="1.5" fill="none" />
          <path d="M 6 -120 L 12 -110 L 6 -100" stroke="#10B981" strokeWidth="1.5" fill="none" />
        </g>

        {/* Forensic Calipers & Reticles */}
        <circle cx="680" cy="1160" r="160" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 8" />
        <line x1="520" y1="1160" x2="840" y2="1160" stroke="#475569" strokeWidth="1" strokeDasharray="2 4" />
        <line x1="680" y1="1000" x2="680" y2="1320" stroke="#475569" strokeWidth="1" strokeDasharray="2 4" />
        <polygon points="680,980 675,995 685,995" fill="#10B981" />

        {/* Autopsy / Evidence Measurement Labels */}
        <line x1="180" y1="1040" x2="260" y2="1040" stroke="#475569" strokeWidth="2" />
        <line x1="180" y1="1060" x2="240" y2="1060" stroke="#475569" strokeWidth="1.5" />
        <line x1="820" y1="1040" x2="900" y2="1040" stroke="#475569" strokeWidth="2" />
        <line x1="840" y1="1060" x2="900" y2="1060" stroke="#475569" strokeWidth="1.5" />
        <rect x="180" y="990" width="80" height="30" fill="#020617" stroke="#10B981" strokeWidth="1.5" rx="3" />
        <rect x="820" y="990" width="80" height="30" fill="#020617" stroke="#10B981" strokeWidth="1.5" rx="3" />

        {/* Needle Release Spring Paths */}
        <path d="M 670 1220 L 690 1230 L 670 1240 L 690 1250" fill="none" stroke="#10B981" strokeWidth="2" />
        <path d="M 670 1080 L 690 1090 L 670 1100 L 690 1110" fill="none" stroke="#10B981" strokeWidth="2" />
        <circle cx="680" cy="1160" r="8" fill="#10B981" />
        <circle cx="680" cy="1160" r="22" fill="none" stroke="#34D399" strokeWidth="1.5" />
        <line x1="680" y1="1130" x2="680" y2="1190" stroke="#34D399" strokeWidth="1" />
        <line x1="650" y1="1160" x2="710" y2="1160" stroke="#34D399" strokeWidth="1" />

        {/* Coin Registration Notches */}
        <path d="M 330 1050 L 350 1050 M 340 1040 L 340 1060" stroke="#CBD5E1" strokeWidth="2" />
        <path d="M 330 1270 L 350 1270 M 340 1260 L 340 1280" stroke="#CBD5E1" strokeWidth="2" />
        <path d="M 230 1160 L 250 1160 M 240 1150 L 240 1170" stroke="#CBD5E1" strokeWidth="2" />
        <path d="M 430 1160 L 450 1160 M 440 1150 L 440 1170" stroke="#CBD5E1" strokeWidth="2" />

        {/* KGB Forensic Evidence Warning Placard */}
        <g transform="translate(180, 1400)">
          <rect x="0" y="0" width="720" height="66" rx="4" fill="#020617" stroke="#10B981" strokeWidth="2" />
          <path d="M 12 12 L 12 54 M 708 12 L 708 54" stroke="#34D399" strokeWidth="2" />
          <path d="M 20 20 L 30 20 M 700 20 L 690 20" stroke="#10B981" strokeWidth="1.5" />
          <path d="M 20 46 L 30 46 M 700 46 L 690 46" stroke="#10B981" strokeWidth="1.5" />
          <text x="30" y="30" fill="#34D399" fontFamily={montserrat.fontFamily} fontSize="17" fontWeight="900" letterSpacing="1">
            LETHAL SUICIDE DEVICE: SAXITOXIN / CURARE NEEDLE
          </text>
          <text x="30" y="52" fill="#E2E8F0" fontFamily={montserrat.fontFamily} fontSize="13" fontWeight="800">
            CONCEALED IN SILVER DOLLAR // UNUSED BY POWERS
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 13: EPILOGUE BRASS PLAQUE & GLIENICKE BRIDGE (LONE_LEADER / HERO)
// =========================================================================
export const U2EpilogueBrassPlaqueStage: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="plaqueBrassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="30%" stopColor="#D97706" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
        </defs>

        <rect x="80" y="880" width="920" height="600" fill="#1C1917" rx="8" stroke="#451A03" strokeWidth="4" />

        {/* Traced Rudolf Abel Bridge Swap Silhouette */}
        <g opacity="0.35" transform="translate(180, 910)">
          <RudolfAbelSilhouette scale={0.7} x={0} y={0} color="#FBBF24" />
        </g>

        {/* Glienicke Bridge Iron Truss Geometry */}
        <g transform="translate(120, 1120)" opacity="0.4">
          <line x1="0" y1="0" x2="840" y2="0" stroke="#94A3B8" strokeWidth="8" />
          <path d="M 0 0 L 60 -90 L 120 0 Z" fill="none" stroke="#64748B" strokeWidth="3" />
          <path d="M 120 0 L 180 -90 L 240 0 Z" fill="none" stroke="#64748B" strokeWidth="3" />
          <path d="M 240 0 L 300 -90 L 360 0 Z" fill="none" stroke="#64748B" strokeWidth="3" />
          <path d="M 360 0 L 420 -90 L 480 0 Z" fill="none" stroke="#64748B" strokeWidth="3" />
          <path d="M 480 0 L 540 -90 L 600 0 Z" fill="none" stroke="#64748B" strokeWidth="3" />
          <path d="M 600 0 L 660 -90 L 720 0 Z" fill="none" stroke="#64748B" strokeWidth="3" />
          <path d="M 720 0 L 780 -90 L 840 0 Z" fill="none" stroke="#64748B" strokeWidth="3" />
          <path d="M 60 -90 L 780 -90" stroke="#94A3B8" strokeWidth="4" />
          <line x1="60" y1="-90" x2="60" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="180" y1="-90" x2="180" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="300" y1="-90" x2="300" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="420" y1="-90" x2="420" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="540" y1="-90" x2="540" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="660" y1="-90" x2="660" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="780" y1="-90" x2="780" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="0" y1="0" x2="120" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="120" y1="0" x2="240" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="240" y1="0" x2="360" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="360" y1="0" x2="480" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="480" y1="0" x2="600" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="600" y1="0" x2="720" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="720" y1="0" x2="840" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="60" y1="-90" x2="180" y2="-90" stroke="#64748B" strokeWidth="3" />
          <path d="M 60 -90 L 120 -45 L 60 0" stroke="#64748B" strokeWidth="2" fill="none" />
          <path d="M 180 -90 L 240 -45 L 180 0" stroke="#64748B" strokeWidth="2" fill="none" />
          <circle cx="400" cy="1165" r="4" fill="#FBBF24" />
          <circle cx="400" cy="1435" r="4" fill="#FBBF24" />
        </g>

        {/* Engraved Commemorative Bronze Plaque */}
        <g transform="translate(140, 1160)">
          <rect x="0" y="0" width="800" height="280" rx="8" fill="url(#plaqueBrassGrad)" stroke="#F59E0B" strokeWidth="4" />
          <rect x="15" y="15" width="770" height="250" fill="none" stroke="#D97706" strokeWidth="2" strokeDasharray="8 4" />
          <path d="M 30 30 L 770 30 M 30 250 L 770 250" stroke="#FBBF24" strokeWidth="1" opacity="0.5" />
          <path d="M 30 30 L 30 250 M 770 30 L 770 250" stroke="#FBBF24" strokeWidth="1" opacity="0.5" />
          <path d="M 40 40 L 760 40 M 40 240 L 760 240" stroke="#B45309" strokeWidth="1" />
          <path d="M 40 40 L 40 240 M 760 40 L 760 240" stroke="#B45309" strokeWidth="1" />
          <path d="M 50 60 L 750 60" stroke="#78350F" strokeWidth="1" />
          <path d="M 50 220 L 750 220" stroke="#78350F" strokeWidth="1" />
          <circle cx="160" cy="1180" r="10" fill="#78350F" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="640" cy="1180" r="10" fill="#78350F" stroke="#F59E0B" strokeWidth="2" />
          <line x1="20" y1="1180" x2="80" y2="1180" stroke="#B45309" strokeWidth="2" />
          <line x1="720" y1="1180" x2="780" y2="1180" stroke="#B45309" strokeWidth="2" />

          {/* 4 Corner Brass Hex Screws */}
          <circle cx="28" cy="28" r="8" fill="#FBBF24" stroke="#78350F" strokeWidth="2" />
          <circle cx="772" cy="28" r="8" fill="#FBBF24" stroke="#78350F" strokeWidth="2" />
          <circle cx="28" cy="252" r="8" fill="#FBBF24" stroke="#78350F" strokeWidth="2" />
          <circle cx="772" cy="252" r="8" fill="#FBBF24" stroke="#78350F" strokeWidth="2" />

          <text x="400" y="70" fill="#FEF3C7" fontFamily={montserrat.fontFamily} fontSize="26" fontWeight="900" letterSpacing="3" textAnchor="middle">
            OPERATION GRAND SLAM // 1960
          </text>
          <text x="400" y="120" fill="#FDE68A" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="800" letterSpacing="2" textAnchor="middle">
            THE PARIS EAST-WEST PEACE SUMMIT COLLAPSED
          </text>
          <text x="400" y="155" fill="#FDE68A" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="800" letterSpacing="2" textAnchor="middle">
            1962: POWERS SWAPPED FOR SPYMASTER RUDOLF ABEL
          </text>
          <text x="400" y="210" fill="#F59E0B" fontFamily={montserrat.fontFamily} fontSize="20" fontWeight="900" letterSpacing="4" textAnchor="middle">
            BIRTH OF THE SPY SATELLITE ERA
          </text>
        </g>
      </svg>
    </div>
  );
};
