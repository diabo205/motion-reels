const fs = require('fs');

const fileContent = `import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat';
import { CutoutPuppet } from './CutoutPuppet';
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

const montserrat = loadMontserrat('normal', { weights: ['800', '900'], subsets: ['latin'] });
const CLAMP = { extrapolateRight: 'clamp' as const, extrapolateLeft: 'clamp' as const };

// =========================================================================
// SCENE 1: SOVIET RADAR CLOSEUP LOCK (THE HOOK - SPLIT_CONFRONTATION)
// =========================================================================
export const SovietRadarCloseupLock: React.FC = () => {
  const frame = useCurrentFrame();
  const sweepAngle = (frame * 4.5) % 360;
  const alertPulse = Math.sin(frame * 0.35);
  const reticleShake = frame % 4 === 0 ? (frame % 8 === 0 ? 3 : -3) : 0;

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

        {/* Rotating Radar Sweep Beam */}
        <g transform={\`rotate(\${sweepAngle}, 540, 1180)\`}>
          <path d="M 540 1180 L 980 1100 A 440 440 0 0 1 980 1260 Z" fill="url(#beamSweepGrad)" opacity="0.3" />
          <path d="M 540 1180 L 980 1140 A 440 440 0 0 1 980 1220 Z" fill="#6EE7B7" opacity="0.2" />
          <line x1="540" y1="1180" x2="980" y2="1180" stroke="#A7F3D0" strokeWidth="3" />
        </g>

        {/* Traced P-30 Radar Silhouette */}
        <g opacity="0.25">
          <SovietRadarP30Silhouette scale={0.4} x={160} y={1220} color="#047857" />
        </g>

        {/* Target Lock Reticle with 4 Corner Bracket Paths */}
        <g transform={\`translate(\${540 + reticleShake}, \${1080 + reticleShake})\`}>
          <circle cx="0" cy="0" r="14" fill="#EF4444" opacity={frame % 16 < 8 ? 0.9 : 0.3} />
          <circle cx="0" cy="0" r="32" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="8 4" />
          <path d="M -40 -20 L -40 -40 L -20 -40" fill="none" stroke="#EF4444" strokeWidth="3" />
          <path d="M 20 -40 L 40 -40 L 40 -20" fill="none" stroke="#EF4444" strokeWidth="3" />
          <path d="M 40 20 L 40 40 L 20 40" fill="none" stroke="#EF4444" strokeWidth="3" />
          <path d="M -20 40 L -40 40 L -40 20" fill="none" stroke="#EF4444" strokeWidth="3" />
          <path d="M -15 0 L 15 0" stroke="#FCA5A5" strokeWidth="2" />
          <path d="M 0 -15 L 0 15" stroke="#FCA5A5" strokeWidth="2" />
          <path d="M 0 0 L 60 -45 L 48 -42 L 55 -35 Z" fill="#EF4444" stroke="#F87171" strokeWidth="1" />
          <path d="M -50 -50 L -45 -45 M 50 -50 L 45 -45" stroke="#EF4444" strokeWidth="2" />
          <path d="M 50 50 L 45 45 M -50 50 L -45 45" stroke="#EF4444" strokeWidth="2" />
        </g>

        {/* Telemetry Display Substructure */}
        <g transform="translate(240, 1420)">
          <rect x="0" y="0" width="600" height="64" rx="4" fill="#041F1A" stroke="#059669" strokeWidth="1.5" opacity="0.85" />
          <path d="M 12 12 L 20 6 L 20 58 L 12 52 Z" fill="#10B981" />
          <path d="M 588 12 L 580 6 L 580 58 L 588 52 Z" fill="#10B981" />
          <path d="M 20 20 L 40 20 M 20 44 L 40 44" stroke="#047857" strokeWidth="2" />
          <path d="M 560 20 L 580 20 M 560 44 L 580 44" stroke="#047857" strokeWidth="2" />
          <text x="32" y="40" fill="#34D399" fontFamily={montserrat.fontFamily} fontSize="22" fontWeight="900" letterSpacing="2">
            ALT: 70,500 FT
          </text>
          <text x="320" y="40" fill="#F87171" fontFamily={montserrat.fontFamily} fontSize="20" fontWeight="800" letterSpacing="2">
            TARGET LOCK // SVERDLOVSK
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 2: S-75 DVINA MISSILE STREAK (VEHICLE_IN_TRANSIT)
// =========================================================================
export const S75DvinaMissileStreak: React.FC = () => {
  const frame = useCurrentFrame();
  const climb = interpolate(frame, [0, 116], [0, 180], CLAMP);
  const exhaustFlicker = Math.sin(frame * 0.8) * 12;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="s75PlumeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FBBF24" />
            <stop offset="70%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Tactical Depth Grid */}
        <g opacity="0.3">
          <line x1="80" y1="920" x2="1000" y2="920" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="80" y1="980" x2="1000" y2="980" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="80" y1="1040" x2="1000" y2="1040" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="80" y1="1100" x2="1000" y2="1100" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="80" y1="1160" x2="1000" y2="1160" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="80" y1="1220" x2="1000" y2="1220" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="80" y1="1280" x2="1000" y2="1280" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="80" y1="1340" x2="1000" y2="1340" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="80" y1="1400" x2="1000" y2="1400" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="4 4" />
        </g>

        {/* Supersonic Mach Shockwave Arc Rings */}
        <g transform={\`translate(540, \${1220 - climb})\`}>
          <path d="M -140 0 C -140 -25 140 -25 140 0 C 140 25 -140 25 -140 0 Z" fill="none" stroke="#38BDF8" strokeWidth="2.5" opacity="0.65" />
          <path d="M -190 70 C -190 35 190 35 190 70 C 190 105 -190 105 -190 70 Z" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
          <path d="M -240 150 C -240 100 240 100 240 150 C 240 200 -240 200 -240 150 Z" fill="none" stroke="#0369A1" strokeWidth="1.5" opacity="0.35" />
          <path d="M -90 -30 C -90 -50 90 -50 90 -30" stroke="#67E8F9" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M -280 210 C -280 150 280 150 280 210" stroke="#075985" strokeWidth="1.5" fill="none" opacity="0.3" />
        </g>

        {/* Traced S-75 Launcher Silhouette */}
        <g opacity="0.35" transform="translate(180, 1180)">
          <S75DvinaMissileSilhouette scale={0.55} x={0} y={0} color="#1E293B" />
        </g>

        {/* S-75 Dvina Missile Body */}
        <g transform={\`translate(540, \${1160 - climb})\`}>
          <path d="M 0 -180 L 16 -120 L 16 80 L -16 80 L -16 -120 Z" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
          <path d="M 0 -180 L 8 -120 L 8 80 L -8 80 L -8 -120 Z" fill="#E2E8F0" />
          <path d="M -16 -90 L -65 -75 L -16 -60 Z" fill="#475569" stroke="#64748B" strokeWidth="1.5" />
          <path d="M 16 -90 L 65 -75 L 16 -60 Z" fill="#475569" stroke="#64748B" strokeWidth="1.5" />
          <path d="M -16 40 L -95 85 L -95 110 L -16 90 Z" fill="#334155" stroke="#475569" strokeWidth="2" />
          <path d="M 16 40 L 95 85 L 95 110 L 16 90 Z" fill="#334155" stroke="#475569" strokeWidth="2" />
          <path d="M -14 80 L 14 80 L 20 110 L -20 110 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          <path d="M 0 -180 L 4 -120 L -4 -120 Z" fill="#EF4444" />
          <path d="M -12 -30 L 12 -30 L 12 -25 L -12 -25 Z" fill="#DC2626" />
          <path d="M -14 30 L 14 30 L 14 35 L -14 35 Z" fill="#DC2626" />
          <path d="M -6 -120 L 6 -120 M -6 -60 L 6 -60" stroke="#64748B" strokeWidth="1.5" />
          <path d="M -6 0 L 6 0 M -6 60 L 6 60" stroke="#64748B" strokeWidth="1.5" />

          {/* Searing Propellant Flame Tongues */}
          <path d={\`M -18 110 Q 0 170 0 \${280 + exhaustFlicker} Q 0 170 18 110 Z\`} fill="url(#s75PlumeGrad)" opacity="0.95" />
          <path d={\`M -10 110 Q 0 150 0 \${180 + exhaustFlicker * 0.5} Q 0 150 10 110 Z\`} fill="#FFFFFF" opacity="0.9" />
          <path d={\`M -5 110 Q 0 130 0 \${140 + exhaustFlicker * 0.3} Q 0 130 5 110 Z\`} fill="#FEF08A" opacity="0.95" />
          <path d="M -8 140 L 0 200 L 8 140 Z" fill="#F97316" opacity="0.8" />
        </g>

        {/* Telemetry HUD */}
        <g transform="translate(180, 1420)">
          <rect x="0" y="0" width="720" height="54" rx="4" fill="#0F172A" stroke="#1E40AF" strokeWidth="1.5" opacity="0.9" />
          <path d="M 10 10 L 22 27 L 10 44 Z" fill="#38BDF8" />
          <path d="M 710 10 L 698 27 L 710 44 Z" fill="#38BDF8" />
          <path d="M 24 27 L 50 27 M 670 27 L 696 27" stroke="#38BDF8" strokeWidth="2" />
          <text x="56" y="34" fill="#38BDF8" fontFamily={montserrat.fontFamily} fontSize="20" fontWeight="900" letterSpacing="2">
            VELOCITY: MACH 3.5
          </text>
          <text x="360" y="34" fill="#FBBF24" fontFamily={montserrat.fontFamily} fontSize="19" fontWeight="800" letterSpacing="2">
            S-75 GUIDANCE: ACTIVE LOCK
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 3: U-2 MISSILE DETONATION & UNCONTROLLED CABIN LOSS (STRUCTURAL_FRACTURE)
// =========================================================================
export const U2MissileDetonationSpin: React.FC = () => {
  const frame = useCurrentFrame();
  const spinAngle = interpolate(frame, [0, 120], [0, 240], CLAMP);
  const blastScale = interpolate(frame, [0, 35, 120], [0.4, 1.35, 1.8], CLAMP);
  const blastOpacity = interpolate(frame, [0, 35, 90, 120], [0.8, 1.0, 0.6, 0.2], CLAMP);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="stratBlastFire" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FBBF24" />
            <stop offset="60%" stopColor="#DC2626" />
            <stop offset="90%" stopColor="#7F1D1D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1A090B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Detonation Blast Lobes */}
        <g transform={\`translate(540, 1180) scale(\${blastScale})\`} opacity={blastOpacity}>
          <circle cx="0" cy="0" r="180" fill="url(#stratBlastFire)" />
          <path d="M 0 -160 L 25 -30 L 160 0 L 25 30 L 0 160 L -25 30 L -160 0 L -25 -30 Z" fill="#FFFFFF" opacity="0.85" />
          <path d="M -120 -120 L 0 -40 L 120 -120 L 40 0 L 120 120 L 0 40 L -120 120 L -40 0 Z" fill="#FBBF24" opacity="0.6" />
          <path d="M 0 0 C 40 -80 120 -80 140 -20 C 180 20 160 100 100 120 C 40 140 -40 140 -100 100 C -160 60 -160 -40 -100 -80 Z" fill="none" stroke="#FCA5A5" strokeWidth="3" opacity="0.7" />
          <path d="M -80 -40 C -40 -80 40 -80 80 -40 C 120 0 100 80 40 90 C -20 100 -80 60 -80 -40 Z" fill="#DC2626" opacity="0.5" />
        </g>

        {/* Traced U-2 Wreckage Contour */}
        <g opacity="0.3" transform="translate(180, 1100)">
          <U2WreckageSverdlovskSilhouette scale={0.7} x={0} y={0} color="#7F1D1D" />
        </g>

        {/* Shattered U-2 Airframe Tumbling in Flat Spin */}
        <g transform={\`translate(540, 1180) rotate(\${spinAngle})\`}>
          <path d="M 0 -140 L 14 -60 L 16 40 L 8 90 L -12 75 L -16 40 L -14 -60 Z" fill="#1E293B" stroke="#475569" strokeWidth="2.5" />
          <path d="M -14 -40 L -360 -10 L -355 10 L -14 -10 Z" fill="#0F172A" stroke="#334155" strokeWidth="2" />
          <path d="M 14 -40 L 240 -20 L 235 5 L 14 -10 Z" fill="#0F172A" stroke="#DC2626" strokeWidth="2" />
          <path d="M 240 -20 L 280 -10 L 270 12 L 235 5 Z" fill="#334155" opacity="0.7" />
          <path d="M -12 75 L -6 95 L 4 82 L 8 90" fill="none" stroke="#F87171" strokeWidth="3" />
          <path d="M -200 -25 L -200 0" stroke="#64748B" strokeWidth="1.5" />
          <path d="M -300 -17 L -300 5" stroke="#64748B" strokeWidth="1.5" />
          <path d="M -150 -20 L -150 -5" stroke="#64748B" strokeWidth="1.5" />
          <path d="M -250 -12 L -250 2" stroke="#64748B" strokeWidth="1.5" />
          <path d="M -14 -10 L -355 10 L -350 18 L -14 0 Z" fill="#334155" opacity="0.5" />
          <path d="M 0 -140 L 5 -70 L -5 -70 Z" fill="#475569" />
          <path d="M -8 -60 L 8 -60 L 8 -55 L -8 -55 Z" fill="#64748B" />
          <path d="M -10 10 L 10 10 L 10 15 L -10 15 Z" fill="#64748B" />
        </g>

        {/* Detached Shrapnel Shards Drifting Outward */}
        <path d="M 680 1020 L 710 1040 L 695 1055 Z" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.5" />
        <path d="M 380 1050 L 410 1065 L 390 1080 Z" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.5" />
        <path d="M 720 1280 L 750 1310 L 730 1325 Z" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.5" />
        <path d="M 360 1290 L 395 1315 L 370 1330 Z" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.5" />
        <path d="M 520 980 L 545 995 L 530 1010 Z" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.5" />
        <path d="M 560 1380 L 585 1395 L 570 1410 Z" fill="#FCA5A5" stroke="#DC2626" strokeWidth="1.5" />

        {/* Depressurization Alarm HUD */}
        <g transform="translate(180, 1420)">
          <rect x="0" y="0" width="720" height="54" rx="4" fill="#7F1D1D" stroke="#EF4444" strokeWidth="2" opacity="0.9" />
          <path d="M 16 14 L 28 38 L 4 38 Z" fill="#FDE047" />
          <path d="M 704 14 L 716 38 L 692 38 Z" fill="#FDE047" />
          <path d="M 14 26 L 18 26 M 702 26 L 706 26" stroke="#000000" strokeWidth="2" />
          <text x="44" y="34" fill="#FFFFFF" fontFamily={montserrat.fontFamily} fontSize="20" fontWeight="900" letterSpacing="2">
            WARNING: CABIN PRESSURE ZERO
          </text>
          <text x="440" y="34" fill="#FDE047" fontFamily={montserrat.fontFamily} fontSize="19" fontWeight="800" letterSpacing="2">
            NEGATIVE-G SPIN
          </text>
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
        <g opacity="0.45" transform={\`translate(\${140 + panX}, 900)\`}>
          <NasaFlightMapTurkeySilhouette scale={0.7} x={0} y={0} color="#38BDF8" />
        </g>

        {/* Coastline Outlines & Territorial Borders */}
        <path d="M 120 1280 Q 240 1240 380 1260 Q 520 1280 660 1220 Q 820 1190 980 1210" fill="none" stroke="#60A5FA" strokeWidth="3" opacity="0.7" />
        <path d="M 120 1020 Q 280 1040 440 990 Q 600 960 760 1010 Q 900 1030 980 980" fill="none" stroke="#60A5FA" strokeWidth="2.5" opacity="0.6" />
        <path d="M 380 1260 Q 420 1180 500 1160 Q 580 1140 660 1220" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 240 1080 Q 320 1120 400 1100 Q 480 1080 560 1120" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 500 1160 L 520 1130 L 560 1140" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
        <path d="M 680 1100 L 720 1080 L 750 1110" fill="none" stroke="#60A5FA" strokeWidth="1.5" />

        {/* Fabricated NASA Weather Route Vector */}
        <path d="M 320 1260 Q 480 1150 720 1080" fill="none" stroke="#FBBF24" strokeWidth="4.5" strokeDasharray="10 6" />
        <path d="M 720 1080 Q 800 1040 880 1020" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="6 6" />

        {/* Navigation Compass Rose */}
        <path d="M 880 940 L 890 910 L 900 940 L 930 950 L 900 960 L 890 990 L 880 960 L 850 950 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
        <path d="M 885 945 L 890 925 L 895 945 L 915 950 L 895 955 L 890 975 L 885 955 L 865 950 Z" fill="#FEF08A" />

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

        <g transform={\`translate(540, 1180) rotate(-12) scale(\${stampSlam})\`} opacity={stampOpacity}>
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
// SCENE 6: EISENHOWER PRESS DENIAL STAGE (LONE_LEADER)
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

        {/* Press Microphone Cluster with 8 Detailed Paths */}
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
        </g>

        <polygon points="260,1480 320,1320 760,1320 820,1480" fill="#291102" stroke="#78350F" strokeWidth="4" />
        <path d="M 320 1320 L 760 1320 M 340 1350 L 740 1350" stroke="#92400E" strokeWidth="2" />
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
  const dayValue = Math.min(5, Math.floor(interpolate(frame, [0, 90], [1, 5.9], CLAMP)));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="kremlinRedWash" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#7F1D1D" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0B1310" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="80" y="880" width="920" height="600" fill="#180507" rx="8" stroke="#7F1D1D" strokeWidth="3" />
        <circle cx="540" cy="1180" r="380" fill="url(#kremlinRedWash)" />

        {/* Traced Kremlin Spasskaya Tower Silhouette */}
        <g opacity="0.65" transform="translate(180, 890)">
          <KremlinMoscowRedSilhouette scale={0.75} x={0} y={0} color="#991B1B" />
        </g>

        {/* Kremlin Fortress Battlements */}
        <path d="M 120 1380 L 160 1380 L 170 1350 L 190 1380 L 230 1380 L 240 1350 L 260 1380 L 300 1380 L 310 1350 L 330 1380 L 370 1380" fill="#450A0A" stroke="#7F1D1D" strokeWidth="2" />
        <path d="M 710 1380 L 750 1380 L 760 1350 L 780 1380 L 820 1380 L 830 1350 L 850 1380 L 890 1380 L 900 1350 L 920 1380 L 960 1380" fill="#450A0A" stroke="#7F1D1D" strokeWidth="2" />
        <path d="M 500 1140 L 580 1140 L 580 1240 L 500 1240 Z" fill="#2A0808" stroke="#7F1D1D" strokeWidth="2" />
        <path d="M 520 1140 L 540 1110 L 560 1140 Z" fill="#991B1B" />
        <path d="M 510 1170 L 530 1170 M 550 1170 L 570 1170" stroke="#DC2626" strokeWidth="2" />
        <path d="M 510 1210 L 570 1210" stroke="#7F1D1D" strokeWidth="2" />

        {/* Illuminated Red Soviet Star atop Spire */}
        <g transform="translate(540, 970)">
          <circle cx="0" cy="0" r="28" fill="#EF4444" opacity={0.4 + Math.sin(frame * 0.25) * 0.2} />
          <path d="M 0 -18 L 5 -5 L 18 -5 L 8 4 L 12 18 L 0 9 L -12 18 L -8 4 L -18 -5 L -5 -5 Z" fill="#F87171" stroke="#EF4444" strokeWidth="1" />
          <path d="M 0 -12 L 0 6 M -6 -2 L 6 -2" stroke="#FEF08A" strokeWidth="1" />
        </g>

        {/* Tactile Day Tally Counter Board */}
        <g transform="translate(340, 1260)">
          <rect x="0" y="0" width="400" height="160" rx="8" fill="#030712" stroke="#DC2626" strokeWidth="4" />
          <rect x="15" y="15" width="370" height="130" fill="#111827" stroke="#374151" strokeWidth="2" />
          <path d="M 25 35 L 35 25 L 365 25 L 375 35" stroke="#DC2626" strokeWidth="2" fill="none" />
          <path d="M 25 125 L 35 135 L 365 135 L 375 125" stroke="#DC2626" strokeWidth="2" fill="none" />
          <path d="M 30 50 L 30 110 M 370 50 L 370 110" stroke="#4B5563" strokeWidth="2" />
          <text x="200" y="52" fill="#9CA3AF" fontFamily={montserrat.fontFamily} fontSize="18" fontWeight="900" letterSpacing="2" textAnchor="middle">
            KREMLIN SILENCE
          </text>
          <text x="200" y="120" fill="#EF4444" fontFamily={montserrat.fontFamily} fontSize="64" fontWeight="900" letterSpacing="3" textAnchor="middle">
            DAY {dayValue}
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 8: KHRUSHCHEV SUPREME SOVIET STAGE (LONE_LEADER)
// =========================================================================
export const KhrushchevSupremeSovietStage: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="kremlinSunburst" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#991B1B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1C1917" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="80" y="880" width="920" height="600" fill="#1C1917" rx="8" stroke="#B45309" strokeWidth="3" />
        <circle cx="540" cy="1160" r="380" fill="url(#kremlinSunburst)" />

        {/* Rotating Sunburst Rays */}
        <g transform={\`translate(540, 1100) rotate(\${frame * 0.3})\`}>
          <polygon points="0,0 440,0 440,40" fill="#F59E0B" opacity="0.12" />
          <polygon points="0,0 0,440 40,440" fill="#F59E0B" opacity="0.12" />
          <polygon points="0,0 -440,0 -440,-40" fill="#F59E0B" opacity="0.12" />
          <polygon points="0,0 0,-440 -40,-440" fill="#F59E0B" opacity="0.12" />
          <polygon points="0,0 311,311 340,280" fill="#F59E0B" opacity="0.12" />
          <polygon points="0,0 -311,-311 -340,-280" fill="#F59E0B" opacity="0.12" />
        </g>

        {/* Traced Khrushchev Full Silhouette Backdrop */}
        <g opacity="0.3" transform="translate(180, 930)">
          <KhrushchevOfficialFullSilhouette scale={0.7} x={0} y={0} color="#FBBF24" />
        </g>

        {/* Gilded Soviet Coat of Arms with Detailed Paths */}
        <g transform="translate(540, 1380)">
          <circle cx="0" cy="0" r="48" fill="#78350F" stroke="#F59E0B" strokeWidth="3" />
          <path d="M -16 -8 Q 0 -32 20 -18 Q 30 -6 16 12 L -6 32 L -14 26 L 4 10 Q 12 0 4 -10 Q -6 -16 -16 -8 Z" fill="#FBBF24" />
          <path d="M -8 -4 L 18 22 L 12 28 L -14 2 Z" fill="#FBBF24" />
          <path d="M -30 10 Q -38 -15 -20 -30 Q -24 -10 -15 15" stroke="#F59E0B" strokeWidth="2" fill="none" />
          <path d="M 30 10 Q 38 -15 20 -30 Q 24 -10 15 15" stroke="#F59E0B" strokeWidth="2" fill="none" />
        </g>

        <polygon points="220,1480 280,1320 800,1320 860,1480" fill="#451A03" stroke="#92400E" strokeWidth="4" />
        <path d="M 280 1320 L 800 1320 M 300 1350 L 780 1350" stroke="#B45309" strokeWidth="2" />
        <path d="M 320 1380 L 760 1380" stroke="#78350F" strokeWidth="2" />
      </svg>

      <div style={{ position: 'absolute', top: 920, left: 380, width: 320, height: 420 }}>
        <CutoutPuppet
          headSrc="plates/khrushchev_official_full.jpg"
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
// SCENE 9: DOSSIER SLAMS SCATTERED PHOTOS (STRUCTURAL_FRACTURE)
// =========================================================================
export const DossierSlamsScatteredPhotos: React.FC = () => {
  const frame = useCurrentFrame();
  const slam = interpolate(frame, [0, 35, 42], [2.0, 1.0, 1.0], CLAMP);
  const scatter = interpolate(frame, [35, 75], [0, 1], CLAMP);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect x="80" y="880" width="920" height="600" fill="#291102" rx="8" stroke="#78350F" strokeWidth="4" />

        {/* Fracturing Impact Shockwaves */}
        <g transform="translate(540, 1180)" opacity={frame >= 35 ? 0.8 : 0}>
          <path d="M -160 0 C -160 -80 160 -80 160 0 C 160 80 -160 80 -160 0 Z" fill="none" stroke="#DC2626" strokeWidth="4" strokeDasharray="8 6" />
          <path d="M -240 0 C -240 -120 240 -120 240 0 C 240 120 -240 120 -240 0 Z" fill="none" stroke="#F87171" strokeWidth="2" strokeDasharray="12 8" />
          <path d="M -100 -50 L 100 50 M -100 50 L 100 -50" stroke="#EF4444" strokeWidth="2" />
        </g>

        {/* Traced Khrushchev Portrait Backdrop */}
        <g opacity="0.25" transform="translate(180, 920)">
          <KhrushchevPortraitSilhouette scale={0.7} x={0} y={0} color="#DC2626" />
        </g>

        {/* Photo 1: Mayak Plutonium Complex */}
        <g transform={\`translate(\${300 - scatter * 90}, \${1100 - scatter * 60}) rotate(\${-15 - scatter * 10})\`}>
          <rect x="-100" y="-70" width="200" height="140" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
          <rect x="-90" y="-60" width="180" height="100" fill="#1E293B" />
          <path d="M -80 -40 L -40 -50 L -40 -10 L -80 -10 Z" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
          <path d="M 0 -45 L 60 -45 L 60 -10 L 0 -10 Z" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
          <path d="M -70 10 L -50 10 M 10 10 L 50 10" stroke="#CBD5E1" strokeWidth="2" />
          <text x="0" y="60" fill="#0F172A" fontFamily={montserrat.fontFamily} fontSize="13" fontWeight="900" textAnchor="middle">
            MAYAK PLUTONIUM FACILITY
          </text>
        </g>

        {/* Photo 2: Engels Strategic Airbase */}
        <g transform={\`translate(\${760 + scatter * 80}, \${1120 + scatter * 50}) rotate(\${12 + scatter * 12})\`}>
          <rect x="-100" y="-70" width="200" height="140" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
          <rect x="-90" y="-60" width="180" height="100" fill="#1E293B" />
          <path d="M -80 -10 L 80 -10" stroke="#E2E8F0" strokeWidth="6" strokeDasharray="14 6" />
          <path d="M -60 -40 L -20 -40 M 20 -40 L 60 -40" stroke="#64748B" strokeWidth="4" />
          <path d="M -70 20 L 70 20" stroke="#334155" strokeWidth="2" />
          <text x="0" y="60" fill="#0F172A" fontFamily={montserrat.fontFamily} fontSize="13" fontWeight="900" textAnchor="middle">
            ENGELS AIRBASE RUNWAYS
          </text>
        </g>

        {/* Central KGB Red-Star Confidential Dossier Folder */}
        <g transform={\`translate(540, 1180) scale(\${slam})\`}>
          <rect x="-240" y="-140" width="480" height="280" rx="8" fill="#7F1D1D" stroke="#DC2626" strokeWidth="5" />
          <rect x="-220" y="-120" width="440" height="240" fill="#991B1B" stroke="#B91C1C" strokeWidth="2" />
          <path d="M 0 -60 L 12 -20 L 50 -20 L 20 6 L 30 46 L 0 22 L -30 46 L -20 6 L -50 -20 L -12 -20 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
          <path d="M -200 40 L 200 40 M -200 60 L 200 60" stroke="#7F1D1D" strokeWidth="2" />
          <path d="M -200 -100 L -160 -100 M 160 -100 L 200 -100" stroke="#B91C1C" strokeWidth="2" />
          <path d="M -200 100 L -160 100 M 160 100 L 200 100" stroke="#B91C1C" strokeWidth="2" />
          <text x="0" y="80" fill="#FEF08A" fontFamily={montserrat.fontFamily} fontSize="24" fontWeight="900" letterSpacing="3" textAnchor="middle">
            СОВЕРШЕННО СЕКРЕТНО
          </text>
          <text x="0" y="104" fill="#FCA5A5" fontFamily={montserrat.fontFamily} fontSize="17" fontWeight="800" letterSpacing="2" textAnchor="middle">
            KGB DOSSIER // U-2 EVIDENCE
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 10: CHECKMATE PART I - POWERS CAPTURED (SPLIT_CONFRONTATION)
// =========================================================================
export const CheckmatePowersCapturedStage: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect x="80" y="880" width="920" height="600" fill="#0F172A" rx="8" stroke="#334155" strokeWidth="4" />

        {/* Traced Powers Portrait Silhouette */}
        <g opacity="0.5" transform="translate(180, 920)">
          <PowersPortraitSilhouette scale={0.7} x={0} y={0} color="#38BDF8" />
        </g>

        {/* Traced U-2 Wreckage Contour on Flank */}
        <g opacity="0.35" transform="translate(540, 1140)">
          <U2WreckageSverdlovskSilhouette scale={0.5} x={0} y={0} color="#EF4444" />
        </g>

        {/* Biometric Coordinate Crosshairs & Scanning Grid */}
        <g transform="translate(540, 1150)">
          <circle cx="0" cy="0" r="140" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6 4" />
          <path d="M -160 0 L 160 0 M 0 -160 L 0 160" stroke="#38BDF8" strokeWidth="1.5" />
          <path d="M -90 -50 L -90 -90 L -50 -90" fill="none" stroke="#F43F5E" strokeWidth="3" />
          <path d="M 50 -90 L 90 -90 L 90 -50" fill="none" stroke="#F43F5E" strokeWidth="3" />
          <path d="M 90 50 L 90 90 L 50 90" fill="none" stroke="#F43F5E" strokeWidth="3" />
          <path d="M -50 90 L -90 90 L -90 50" fill="none" stroke="#F43F5E" strokeWidth="3" />
          <path d="M -60 -20 L -20 -20 M 20 -20 L 60 -20" stroke="#38BDF8" strokeWidth="2" />
          <path d="M -40 30 L 40 30" stroke="#38BDF8" strokeWidth="2" />
          <path d="M -30 -60 L 30 -60" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M -30 60 L 30 60" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="2 2" />
        </g>

        {/* Confiscated Soviet Rubles & Gear */}
        <g transform="translate(240, 1340)">
          <rect x="0" y="0" width="120" height="60" fill="#15803D" stroke="#22C55E" strokeWidth="1.5" />
          <path d="M 10 10 L 110 50 M 10 50 L 110 10" stroke="#166534" strokeWidth="1" />
          <path d="M 10 30 L 110 30" stroke="#15803D" strokeWidth="1" />
          <text x="60" y="38" fill="#DCFCE7" fontFamily={montserrat.fontFamily} fontSize="16" fontWeight="900" textAnchor="middle">
            RUBLES
          </text>
        </g>

        {/* Evidence Callout Placard */}
        <g transform="translate(140, 1420)">
          <rect x="0" y="0" width="800" height="54" rx="4" fill="#020617" stroke="#0284C7" strokeWidth="2" opacity="0.9" />
          <path d="M 12 12 L 24 27 L 12 42 Z" fill="#38BDF8" />
          <path d="M 788 12 L 776 27 L 788 42 Z" fill="#38BDF8" />
          <text x="36" y="35" fill="#7DD3FC" fontFamily={montserrat.fontFamily} fontSize="19" fontWeight="900" letterSpacing="2">
            EVIDENCE 01: CAPTURED PILOT FRANCIS GARY POWERS
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 11: CHECKMATE PART II - INTACT HYCON FILM (VEHICLE_IN_TRANSIT)
// =========================================================================
export const CheckmateIntactHyconFilmStage: React.FC = () => {
  const frame = useCurrentFrame();
  const filmShift = (frame * 5) % 180;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect x="80" y="880" width="920" height="600" fill="#0F172A" rx="8" stroke="#1E40AF" strokeWidth="4" />

        {/* Traced Pressure Suit Silhouette */}
        <g opacity="0.3" transform="translate(180, 930)">
          <PowersPressureSuitSilhouette scale={0.7} x={0} y={0} color="#06B6D4" />
        </g>

        {/* Hycon Type B Camera Prism Geometry */}
        <g transform="translate(540, 1080)">
          <path d="M -120 40 L -60 -60 L 60 -60 L 120 40 L 60 110 L -60 110 Z" fill="#B45309" stroke="#F59E0B" strokeWidth="3" />
          <path d="M -60 -60 L 0 -110 L 60 -60 Z" fill="#78350F" stroke="#F59E0B" strokeWidth="2" />
          <path d="M -100 40 L 100 40 M -80 70 L 80 70" stroke="#D97706" strokeWidth="1.5" />
          <path d="M -50 -10 L 50 -10 M -40 20 L 40 20" stroke="#FBBF24" strokeWidth="1.5" />
          <circle cx="0" cy="20" r="54" fill="#1E293B" stroke="#38BDF8" strokeWidth="4" />
          <circle cx="0" cy="20" r="38" fill="#0284C7" stroke="#67E8F9" strokeWidth="2" opacity="0.8" />
        </g>

        {/* Unspooling Continuous 9.5-Inch Aerial Film Ribbon */}
        <g transform={\`translate(\${100 - filmShift}, 1240)\`}>
          <rect x="0" y="0" width="1100" height="120" fill="#1E293B" stroke="#64748B" strokeWidth="3" />
          <path d="M 0 20 L 1100 20 M 0 100 L 1100 100" stroke="#334155" strokeWidth="2" />
          <path d="M 50 35 L 180 35 L 180 85 L 50 85 Z" fill="#020617" stroke="#64748B" strokeWidth="1.5" />
          <path d="M 270 35 L 400 35 L 400 85 L 270 85 Z" fill="#020617" stroke="#64748B" strokeWidth="1.5" />
          <path d="M 490 35 L 620 35 L 620 85 L 490 85 Z" fill="#020617" stroke="#64748B" strokeWidth="1.5" />
          <path d="M 710 35 L 840 35 L 840 85 L 710 85 Z" fill="#020617" stroke="#64748B" strokeWidth="1.5" />
          <path d="M 930 35 L 1060 35 L 1060 85 L 930 85 Z" fill="#020617" stroke="#64748B" strokeWidth="1.5" />
          <path d="M 80 50 L 150 50 M 300 50 L 370 50 M 520 50 L 590 50" stroke="#475569" strokeWidth="2" />
        </g>

        {/* Evidence Callout Placard */}
        <g transform="translate(140, 1420)">
          <rect x="0" y="0" width="800" height="54" rx="4" fill="#020617" stroke="#F59E0B" strokeWidth="2" opacity="0.9" />
          <path d="M 12 12 L 24 27 L 12 42 Z" fill="#FBBF24" />
          <path d="M 788 12 L 776 27 L 788 42 Z" fill="#FBBF24" />
          <text x="36" y="35" fill="#FDE047" fontFamily={montserrat.fontFamily} fontSize="19" fontWeight="900" letterSpacing="2">
            EVIDENCE 02: INTACT HYCON CAMERAS & RECOVERED FILM ROLLS
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 12: CHECKMATE PART III - POISON PIN & PILOT ALIVE (LONE_LEADER)
// =========================================================================
export const CheckmatePoisonPinAliveStage: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="silverGleam" cx="45%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#334155" />
          </radialGradient>
        </defs>

        <rect x="80" y="880" width="920" height="600" fill="#090D12" rx="8" stroke="#1E293B" strokeWidth="4" />

        {/* Traced Powers Soviet Military Tribunal Silhouette */}
        <g opacity="0.4" transform="translate(180, 920)">
          <PowersSovietTrialSilhouette scale={0.7} x={0} y={0} color="#E2E8F0" />
        </g>

        {/* Split Hollow Silver Dollar Coin */}
        <g transform="translate(420, 1160)">
          <circle cx="0" cy="0" r="110" fill="url(#silverGleam)" stroke="#CBD5E1" strokeWidth="4" />
          <circle cx="0" cy="0" r="95" fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="6 3" />
          <path d="M -70 0 C -70 -50 70 -50 70 0 C 70 50 -70 50 -70 0 Z" fill="none" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M -40 -30 L 40 -30 M -40 30 L 40 30" stroke="#64748B" strokeWidth="1" />
          <path d="M -20 -15 L 20 -15 M -20 15 L 20 15" stroke="#64748B" strokeWidth="1" />
          <text x="0" y="6" fill="#1E293B" fontFamily={montserrat.fontFamily} fontSize="22" fontWeight="900" textAnchor="middle">
            LIBERTY • 1922
          </text>
        </g>

        {/* Grooved Curare Suicide Poison Needle */}
        <g transform="translate(680, 1160) rotate(45)">
          <path d="M -6 -120 L 6 -120 L 4 80 L -4 80 Z" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M -6 -120 L 6 -120 L 0 -150 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="1" />
          <path d="M -2 -110 L -2 70 M 2 -110 L 2 70" stroke="#CBD5E1" strokeWidth="1" />
          <path d="M -10 80 L 10 80 L 8 110 L -8 110 Z" fill="#64748B" stroke="#475569" strokeWidth="2" />
          <path d="M -8 90 L 8 90 M -8 100 L 8 100" stroke="#334155" strokeWidth="1" />
          <text x="24" y="-120" fill="#EF4444" fontFamily={montserrat.fontFamily} fontSize="17" fontWeight="900">
            CURARE TIP
          </text>
        </g>

        {/* Evidence Callout Placard */}
        <g transform="translate(140, 1420)">
          <rect x="0" y="0" width="800" height="54" rx="4" fill="#020617" stroke="#DC2626" strokeWidth="2" opacity="0.9" />
          <path d="M 12 12 L 24 27 L 12 42 Z" fill="#EF4444" />
          <path d="M 788 12 L 776 27 L 788 42 Z" fill="#EF4444" />
          <text x="36" y="35" fill="#FCA5A5" fontFamily={montserrat.fontFamily} fontSize="19" fontWeight="900" letterSpacing="2">
            EVIDENCE 03: CONCEALED SUICIDE PIN UNUSED • PILOT ALIVE
          </text>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// SCENE 13: EPILOGUE BRASS PLAQUE & GLIENICKE BRIDGE SWAP (STRUCTURAL_FRACTURE)
// =========================================================================
export const U2EpilogueBrassPlaqueStage: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="plaqueBrassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="30%" stopColor="#B45309" />
            <stop offset="60%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#451A03" />
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
        </g>

        {/* Engraved Commemorative Bronze Plaque */}
        <g transform="translate(140, 1160)">
          <rect x="0" y="0" width="800" height="280" rx="8" fill="url(#plaqueBrassGrad)" stroke="#F59E0B" strokeWidth="4" />
          <rect x="15" y="15" width="770" height="250" fill="none" stroke="#D97706" strokeWidth="2" strokeDasharray="8 4" />
          <path d="M 30 30 L 770 30 M 30 250 L 770 250" stroke="#FBBF24" strokeWidth="1" opacity="0.5" />
          <path d="M 30 30 L 30 250 M 770 30 L 770 250" stroke="#FBBF24" strokeWidth="1" opacity="0.5" />
          <path d="M 40 40 L 760 40 M 40 240 L 760 240" stroke="#B45309" strokeWidth="1" />
          <path d="M 40 40 L 40 240 M 760 40 L 760 240" stroke="#B45309" strokeWidth="1" />

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
`;

fs.writeFileSync('src/components/U2Reel26sVectors.tsx', fileContent, 'utf8');

// Now update src/components/U2IncidentVectors.tsx
let inc = fs.readFileSync('src/components/U2IncidentVectors.tsx', 'utf8');
const bodyStart = inc.indexOf('// =========================================================================\n// SCENE 1: SOVIET RADAR CLOSEUP LOCK');
if (bodyStart !== -1) {
  inc = inc.slice(0, bodyStart);
}

const newBodyStart = fileContent.indexOf('// =========================================================================\n// SCENE 1: SOVIET RADAR CLOSEUP LOCK');
inc = inc.trimEnd() + '\n\n' + fileContent.slice(newBodyStart);
fs.writeFileSync('src/components/U2IncidentVectors.tsx', inc, 'utf8');
console.log('Successfully generated enriched U2Reel26sVectors.tsx and updated U2IncidentVectors.tsx!');
