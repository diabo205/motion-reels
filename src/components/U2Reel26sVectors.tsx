import React from 'react';
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
