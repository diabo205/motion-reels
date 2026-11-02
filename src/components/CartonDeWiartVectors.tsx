import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { CutoutPuppet } from './CutoutPuppet';
import { LipizzanerHorse } from './LipizzanerHorseAsset';
import { VictoriaCrossMedal } from './VictoriaCrossMedal';
import { PolishSovietWarMap } from './PolishSovietWarMap';
import { CossackTrainDuel } from './CossackTrainDuel';
import { TrainLeapScene } from './TrainLeapScene';
import { BiplaneCrashScene } from './BiplaneCrashScene';
import {
  SunderlandFlyingBoatGroup,
  VincigliataFortressGroup,
  VictoriaCrossMedalGroup,
  TuscanyCypressesGroup,
} from './TracedCartonAssets';

/**
 * Procedural Deterministic Pseudo-Random Generator (Seed-Based)
 * Ensures 100% frame determinism across all Remotion renders without Math.random()
 */
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Atmospheric Amber-Gold Battlefield Backlighting
 * Casts warm radiant volumetric glow behind characters and structures
 */
const AmberBattlefieldAura: React.FC<{
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  intensity?: number;
  id?: string;
  color?: string;
}> = ({
  cx = 540,
  cy = 1180,
  rx = 480,
  ry = 260,
  intensity = 0.85,
  id = 'cartonAmberAura',
  color = '#F59E0B',
}) => {
  const frame = useCurrentFrame();
  const flicker = 1 + Math.sin(frame * 0.18) * 0.05 + Math.cos(frame * 0.32) * 0.03;
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.85" />
          <stop offset="35%" stopColor="#D97706" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#B45309" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1C1917" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={`url(#${id})`}
        opacity={intensity * flicker}
      />
    </g>
  );
};

// =========================================================================
// 1. SCENE 01: CARTON_HERO_SILHOUETTE_HOOK (Hook - Lone Leader)
// Archival Cutout Puppet: Sir Adrian Carton de Wiart VC in British Officer Uniform
// Amber battlefield aura, floating gold embers, trench timber parapet & sandbags
// =========================================================================
export const CartonHeroSilhouetteHook: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();
  const emberDrift = (frame * 1.8) % 300;
  const pushIn = interpolate(frame, [0, 130], [1.0, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1140} rx={460} ry={280} intensity={0.9} id="hookAura" />

        {/* Floating battlefield gold/amber embers */}
        {[...Array(16)].map((_, idx) => {
          const seed = idx * 17.3;
          const baseX = 240 + pseudoRandom(seed) * 600;
          const baseY = 1450 - ((emberDrift + pseudoRandom(seed + 1) * 300) % 400);
          const r = 2.5 + pseudoRandom(seed + 2) * 3.5;
          const emberAlpha = interpolate(baseY, [1050, 1450], [0.1, 0.85], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <circle
              key={idx}
              cx={baseX + Math.sin(frame * 0.05 + idx) * 12}
              cy={baseY}
              r={r}
              fill="#FBBF24"
              opacity={emberAlpha}
            />
          );
        })}

        {/* Trench Earthworks with Weathered Timber Props and Sandbags */}
        <path
          d="M 0 1370 Q 280 1340 540 1360 T 1080 1350 L 1080 1920 L 0 1920 Z"
          fill="#2A1B14"
        />
        {/* Weathered trench timber beam */}
        <polygon points="120,1370 960,1355 960,1385 120,1400" fill="#3D291F" stroke="#5A3E2D" strokeWidth="2.5" />
        {/* Sandbag cluster on right */}
        <rect x="760" y="1335" width="110" height="40" rx="10" fill="#786248" stroke="#4A3B2B" strokeWidth="2" />
        <rect x="850" y="1325" width="110" height="40" rx="10" fill="#6B563E" stroke="#4A3B2B" strokeWidth="2" />
      </svg>

      {/* Prestige Archival Cutout Puppet: Sir Adrian Carton de Wiart VC */}
      <CutoutPuppet
        character="CARTON_HERO"
        outfit="BRITISH_OFFICER"
        initialPose="SALUTE"
        switchedPose="NEUTRAL"
        poseSwitchFrame={42}
        x={540}
        y={1160}
        scale={1.12 * pushIn}
        paperTagLabel="LT. COL. CARTON DE WIART VC"
      />
    </div>
  );
};

// =========================================================================
// 2. SCENE 02: BOER_WAR_RIVER_CROSSING_AMBUSH (Structural Fracture)
// South African Veld: Amber river, terracotta sandstone rocks, sniper crossfire
// =========================================================================
export const BoerWarRiverCrossingAmbush: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();
  const waterFlow = (frame * 2.2) % 180;

  // Kinetic Ballistic Impulse Timers
  const shot1Hit = frame >= 22;
  const shot2Hit = frame >= 27;
  const shot1Age = frame - 22;
  const shot2Age = frame - 27;

  // Ballistic Recoil Impulses (stomach hit @ frame 22, groin hit @ frame 27)
  const impulse1 = shot1Age >= 0 && shot1Age < 14 ? Math.sin((shot1Age / 14) * Math.PI) : 0;
  const impulse2 = shot2Age >= 0 && shot2Age < 16 ? Math.sin((shot2Age / 16) * Math.PI) : 0;

  // Puppet Physical Displacement & Stagger
  const puppetDx = -impulse1 * 22 + impulse2 * 14 + (shot1Hit ? Math.sin(frame * 0.35) * 3 : 0);
  const puppetDy = impulse1 * 6 + impulse2 * 18 + (shot1Hit ? Math.min(18, (frame - 22) * 0.4) : 0);
  const puppetRot = -impulse1 * 6 + impulse2 * 7 + (shot1Hit ? -3.5 : 0);

  const puppetX = 610 + puppetDx;
  const puppetY = 1220 + puppetDy;

  // Exact scene target coordinates of wounds
  const stomachTargetX = puppetX - 10;
  const stomachTargetY = puppetY + 69;
  const groinTargetX = puppetX + 8;
  const groinTargetY = puppetY + 127;

  // Supersonic Boer Mauser Tracers
  const tracer1T = interpolate(frame, [19.5, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const t1StartX = 1060;
  const t1StartY = 930;
  const t1EndX = t1StartX + (stomachTargetX - t1StartX) * tracer1T;
  const t1EndY = t1StartY + (stomachTargetY - t1StartY) * tracer1T;

  const tracer2T = interpolate(frame, [24.5, 27], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const t2StartX = 1090;
  const t2StartY = 970;
  const t2EndX = t2StartX + (groinTargetX - t2StartX) * tracer2T;
  const t2EndY = t2StartY + (groinTargetY - t2StartY) * tracer2T;

  // High-velocity blood mist progress
  const spray1Prog = interpolate(shot1Age, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const spray2Prog = interpolate(shot2Age, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tugela River Blood Staining Expansion
  const riverBloodT = interpolate(frame - 23, [0, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1200} rx={480} ry={240} intensity={0.8} id="boerAura" color="#D97706" />

        {/* Terracotta Transvaal Sandstone Boulders on Horizon */}
        <path d="M 0 1260 Q 240 1210 480 1250 T 1080 1240 L 1080 1920 L 0 1920 Z" fill="#6B3224" />
        <path d="M 0 1310 Q 540 1280 1080 1315 L 1080 1920 L 0 1920 Z" fill="#52241A" />

        {/* Muddy Amber Tugela River Currents */}
        <rect x="0" y="1320" width="1080" height="600" fill="#5A432F" />
        {[1340, 1390, 1440].map((wy, idx) => (
          <path
            key={idx}
            d={`M -200 ${wy} Q ${300 + ((waterFlow * 2) % 400)} ${wy - 14} 1280 ${wy}`}
            stroke="#8C6848"
            strokeWidth="3.5"
            fill="none"
            opacity="0.75"
          />
        ))}

        {/* Tugela River Blood Plume: Spreading downstream from Carton's wounds */}
        {riverBloodT > 0 && (
          <g id="river-blood-spill">
            <path
              d={`M ${puppetX - 10} 1345 Q ${puppetX - 80 - ((waterFlow * 1.5) % 250)} ${1380 + riverBloodT * 40} ${puppetX - 220 - ((waterFlow * 2) % 300)} ${1430 + riverBloodT * 50} Q ${puppetX - 90} 1480 ${puppetX + 20} 1420 Z`}
              fill="#6B1313"
              opacity={0.75 * riverBloodT}
            />
            <path
              d={`M ${puppetX - 25} 1365 Q ${puppetX - 110 - ((waterFlow * 1.8) % 220)} ${1410 + riverBloodT * 30} ${puppetX - 190 - ((waterFlow * 1.8) % 220)} 1450 Q ${puppetX - 50} 1460 ${puppetX + 10} 1400 Z`}
              fill="#881337"
              opacity={0.65 * riverBloodT}
            />
            {/* Pinkish foam highlight in the current */}
            <ellipse
              cx={puppetX - 60 - ((waterFlow * 2) % 200)}
              cy={1375}
              rx={36 * riverBloodT}
              ry={12 * riverBloodT}
              fill="#E11D48"
              opacity={0.45 * riverBloodT}
            />
          </g>
        )}

        {/* British Soldiers in Khaki Drill in River Crossing */}
        <g transform="translate(360, 1260) scale(0.85)">
          <ellipse cx="0" cy="0" rx="22" ry="14" fill="#6B5B3E" />
          <path d="M -18 6 L -25 60 L 25 60 L 18 6 Z" fill="#574932" />
          <ellipse cx="0" cy="-18" rx="28" ry="12" fill="#E2D9C8" stroke="#A89A84" strokeWidth="2" />
          <line x1="20" y1="20" x2="60" y2="-10" stroke="#3D291F" strokeWidth="4" />
        </g>

        {/* Boer Mauser Muzzle Flash Puffs on Transvaal Ridge */}
        {frame >= 20 && frame <= 24 && (
          <g transform={`translate(${t1StartX}, ${t1StartY})`}>
            <circle cx="0" cy="0" r={16 * (1 - (frame - 20) / 4)} fill="#FDE047" />
            <circle cx="0" cy="0" r={8 * (1 - (frame - 20) / 4)} fill="#FFFFFF" />
            <circle cx="-12" cy="-4" r={12 * ((frame - 20) / 4)} fill="#4B5563" opacity={0.6 * (1 - (frame - 20) / 4)} />
          </g>
        )}
        {frame >= 25 && frame <= 29 && (
          <g transform={`translate(${t2StartX}, ${t2StartY})`}>
            <circle cx="0" cy="0" r={18 * (1 - (frame - 25) / 4)} fill="#F59E0B" />
            <circle cx="0" cy="0" r={9 * (1 - (frame - 25) / 4)} fill="#FFFFFF" />
            <circle cx="-14" cy="-4" r={14 * ((frame - 25) / 4)} fill="#4B5563" opacity={0.6 * (1 - (frame - 25) / 4)} />
          </g>
        )}

        {/* Supersonic Boer Mauser Tracer 1 (Striking Carton's Stomach @ frame 22) */}
        {frame >= 20 && frame <= 23 && (
          <g id="tracer-1">
            <line
              x1={t1StartX}
              y1={t1StartY}
              x2={t1EndX}
              y2={t1EndY}
              stroke="#EF4444"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.85"
            />
            <line
              x1={t1StartX}
              y1={t1StartY}
              x2={t1EndX}
              y2={t1EndY}
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Supersonic Boer Mauser Tracer 2 (Striking Carton's Groin @ frame 27) */}
        {frame >= 25 && frame <= 28 && (
          <g id="tracer-2">
            <line
              x1={t2StartX}
              y1={t2StartY}
              x2={t2EndX}
              y2={t2EndY}
              stroke="#F59E0B"
              strokeWidth="5.5"
              strokeLinecap="round"
              opacity="0.85"
            />
            <line
              x1={t2StartX}
              y1={t2StartY}
              x2={t2EndX}
              y2={t2EndY}
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* High-Velocity Crimson Blood Mist Droplets (Bursting backward behind Carton) */}
        {shot1Age >= 0 && shot1Age < 14 && (
          <g id="shot1-blood-spray" opacity={1 - spray1Prog}>
            {[
              { dx: -38, dy: -18, r: 4.5 },
              { dx: -55, dy: -28, r: 3.5 },
              { dx: -70, dy: -12, r: 3.8 },
              { dx: -85, dy: -32, r: 3.0 },
              { dx: -45, dy: +12, r: 4.0 },
              { dx: -65, dy: +22, r: 3.2 },
              { dx: -95, dy: -4, r: 2.8 },
              { dx: -110, dy: -18, r: 2.2 },
            ].map((d, i) => (
              <circle
                key={i}
                cx={stomachTargetX + d.dx * spray1Prog}
                cy={stomachTargetY + d.dy * spray1Prog}
                r={d.r * (1 - spray1Prog * 0.3)}
                fill={i % 2 === 0 ? '#991B1B' : '#DC2626'}
              />
            ))}
          </g>
        )}

        {shot2Age >= 0 && shot2Age < 14 && (
          <g id="shot2-blood-spray" opacity={1 - spray2Prog}>
            {[
              { dx: -32, dy: +12, r: 4.8 },
              { dx: -48, dy: +26, r: 3.8 },
              { dx: -62, dy: +38, r: 3.2 },
              { dx: -75, dy: +18, r: 3.5 },
              { dx: -38, dy: -10, r: 3.0 },
              { dx: -82, dy: +44, r: 2.8 },
              { dx: -98, dy: +28, r: 2.4 },
            ].map((d, i) => (
              <circle
                key={i}
                cx={groinTargetX + d.dx * spray2Prog}
                cy={groinTargetY + d.dy * spray2Prog}
                r={d.r * (1 - spray2Prog * 0.3)}
                fill={i % 2 === 0 ? '#7F1D1D' : '#991B1B'}
              />
            ))}
          </g>
        )}

        {/* Foaming Water Geyser Impact Spray from Stray Bullet */}
        {frame >= 24 && frame <= 44 && (
          <g transform={`translate(${puppetX + 85}, 1320)`}>
            <ellipse cx="0" cy="0" rx={24} ry={8} fill="#FDFBF7" opacity="0.85" />
            <path
              d="M -18 0 Q -30 -55 0 -80 Q 30 -55 18 0 Z"
              fill="#FDFBF7"
              opacity="0.88"
            />
          </g>
        )}
      </svg>

      {/* Carton de Wiart Wounded in River Crossing: Staggering backwards under fire */}
      <CutoutPuppet
        character="CARTON_BOER"
        outfit="BRITISH_OFFICER"
        initialPose="NEUTRAL"
        switchedPose="GUT_SHOT"
        poseSwitchFrame={22}
        x={puppetX}
        y={puppetY}
        scale={0.96}
        rotation={puppetRot}
        bulletWounds={{
          stomachHitFrame: 22,
          groinHitFrame: 27,
          showSparks: true,
        }}
        paperTagLabel="TUGELA RIVER AMBUSH // 1899"
      />
    </div>
  );
};

// =========================================================================
// 3. SCENE 03: INDIA_CAVALRY_GALLOP_CHARGE (Vehicle In Transit)
// Authentic 4-pose Lipizzaner Equine gallop cycle with Carton mounted in uniform
// =========================================================================
export const IndiaCavalryGallopCharge: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();
  const dustScroll = (frame * 5.2) % 360;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1220} rx={460} ry={250} intensity={0.85} id="indiaAura" color="#F59E0B" />

        {/* Ground Plateau in Terracotta Sand */}
        <path d="M 0 1340 L 1080 1340 L 1080 1920 L 0 1920 Z" fill="#3D2619" />

        {/* Scrolling Golden Dust Plumes */}
        {[...Array(6)].map((_, i) => {
          const dx = 180 + ((i * 140 - dustScroll + 600) % 700);
          return (
            <ellipse
              key={i}
              cx={dx}
              cy={1335}
              rx={32 + Math.sin(frame * 0.1 + i) * 8}
              ry={16 + Math.cos(frame * 0.1 + i) * 5}
              fill="#D97706"
              opacity="0.6"
            />
          );
        })}
      </svg>

      {/* Dynamic Full-Speed 4-Pose Gallop Cycle Charger */}
      <div
        style={{
          position: 'absolute',
          left: 540,
          top: 1190,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      >
        <LipizzanerHorse
          width={620}
          height={620}
          animated={true}
          strideDurationFrames={20}
          bodyColor="#5A2E16"
          lineColor="#361B0D"
        />
      </div>

      {/* Carton de Wiart mounted on horse in Indian Cavalry Service Dress */}
      <CutoutPuppet
        character="CARTON_BOER"
        outfit="BRITISH_OFFICER"
        initialPose="SALUTE"
        switchedPose="SALUTE"
        x={520}
        y={1100}
        scale={0.86}
        paperTagLabel="4TH ROYAL IRISH DRAGOONS"
      />
    </div>
  );
};

// =========================================================================
// 4. SCENE 04: SOMALILAND_EXPEDITION_MAP_VECTOR (Vector Map)
// Antique cartography: Gulf of Aden in deep slate blue, Golis mountains in gold contours
// =========================================================================
export const SomalilandExpeditionMapVector: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();
  const vectorProgress = interpolate(frame, [0, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1180} rx={460} ry={260} intensity={0.7} id="somaliMapAura" />

        {/* Antique Map Grid Matrix */}
        {[960, 1080, 1200, 1320, 1440].map((gy) => (
          <line key={gy} x1="120" y1={gy} x2="960" y2={gy} stroke="#473A2B" strokeWidth="1" strokeDasharray="6, 6" />
        ))}
        {[240, 420, 600, 780, 960].map((gx) => (
          <line key={gx} x1={gx} y1="920" x2={gx} y2="1480" stroke="#473A2B" strokeWidth="1" strokeDasharray="6, 6" />
        ))}

        {/* Somaliland Landmass in Warm Ochre */}
        <path
          d="M 160 980 Q 380 1020 560 1090 T 960 1140 L 960 1480 L 160 1480 Z"
          fill="#3B2E1E"
          stroke="#785E3E"
          strokeWidth="3"
        />
        {/* Gulf of Aden in Deep Slate Navy */}
        <path
          d="M 160 920 L 960 920 L 960 1140 Q 740 1090 560 1090 T 160 980 Z"
          fill="#1E293B"
          opacity="0.9"
        />

        {/* Golis Mountains Elevation Contours in Gold */}
        <path
          d="M 280 1280 Q 420 1210 580 1230 T 820 1260"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2.5"
          strokeDasharray="8, 4"
        />
        <path
          d="M 320 1320 Q 460 1250 620 1270 T 860 1300"
          fill="none"
          stroke="#D97706"
          strokeWidth="2"
        />

        {/* Tactical Camel Corps Advance Arrow to Shimber Berris */}
        <path
          d="M 340 1050 Q 460 1140 640 1240"
          fill="none"
          stroke="#DC2626"
          strokeWidth="7"
          strokeDasharray="420"
          strokeDashoffset={420 * (1 - vectorProgress)}
        />
        {/* Target Fortress Marker in Crimson & Gold */}
        <g transform="translate(640, 1240)">
          <circle cx="0" cy="0" r="18" fill="none" stroke="#DC2626" strokeWidth="3.5" />
          <circle cx="0" cy="0" r="7" fill="#F59E0B" />
          <line x1="-26" y1="0" x2="26" y2="0" stroke="#DC2626" strokeWidth="2.5" />
          <line x1="0" y1="-26" x2="0" y2="26" stroke="#DC2626" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 5. SCENE 05: SHIMBER_BERRIS_FORT_DETONATION (Assault on Shimber Berris / Eye Trauma)
// 1914 Somaliland: Sniper crossfire from fort parapet, 3 bullets to face, left eye destroyed
// =========================================================================
export const ShimberBerrisFortDetonation: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();

  // Kinetic Ballistic Impulse Timers
  const eyeHit = frame >= 32;
  const eyeAge = frame - 32;

  // Ballistic Head Recoil Impulse
  const impulse = eyeAge >= 0 && eyeAge < 16 ? Math.sin((eyeAge / 16) * Math.PI) : 0;
  const puppetDx = -impulse * 26 + (eyeHit ? Math.sin(frame * 0.35) * 3 : 0);
  const puppetDy = impulse * 14 + (eyeHit ? Math.min(18, (frame - 32) * 0.4) : 0);
  const puppetRot = -impulse * 8 + (eyeHit ? -4.5 : 0);

  const puppetX = 540 + puppetDx;
  const puppetY = 1140 + puppetDy;
  const puppetScale = 1.15;

  // Exact scene target coordinates of Left Eye & Ear
  const eyeTargetX = puppetX + 25;
  const eyeTargetY = puppetY - 87;
  const earTargetX = puppetX + 62;
  const earTargetY = puppetY - 80;

  // Dervish sniper rifle on the fort parapet
  const sniperX = 960;
  const sniperY = 960;

  // Bullet 1: Ear graze (frames 26 to 28)
  const b1T = interpolate(frame, [25.5, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const b1EndX = sniperX + (earTargetX - sniperX) * b1T;
  const b1EndY = sniperY + (earTargetY - sniperY) * b1T;

  // Bullet 2: Temple graze (frames 28 to 30)
  const b2T = interpolate(frame, [27.5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const b2EndX = sniperX + (puppetX + 44 - sniperX) * b2T;
  const b2EndY = sniperY + (puppetY - 96 - sniperY) * b2T;

  // Bullet 3: THE FATAL SHOT TO LEFT EYE (frames 30 to 32)
  const b3T = interpolate(frame, [29.5, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const b3EndX = sniperX + (eyeTargetX - sniperX) * b3T;
  const b3EndY = sniperY + (eyeTargetY - sniperY) * b3T;

  // High-velocity exit blood spray from eye
  const sprayProg = interpolate(eyeAge, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1140} rx={480} ry={280} intensity={0.9} id="somaliAssaultAura" color="#DC2626" />

        {/* Somaliland Desert Horizon & Sandstone Escarpment */}
        <path d="M 0 1260 Q 340 1210 680 1250 T 1080 1230 L 1080 1920 L 0 1920 Z" fill="#451A03" />
        <path d="M 0 1320 Q 540 1280 1080 1315 L 1080 1920 L 0 1920 Z" fill="#2E1202" />

        {/* Shimber Berris Sandstone Fortress in the Background */}
        <path
          d="M 60 1340 L 60 1140 L 260 1140 L 280 1180 L 820 1180 L 840 1140 L 1020 1140 L 1020 1340 Z"
          fill="#3B2515"
          stroke="#5C3B22"
          strokeWidth="3"
          opacity="0.85"
        />
        {/* Ashlar Mortar Lines on Fort Wall */}
        {[1170, 1220, 1270, 1320].map((ly) => (
          <line key={ly} x1="60" y1={ly} x2="1020" y2={ly} stroke="#26170C" strokeWidth="2" strokeDasharray="30, 6" opacity="0.7" />
        ))}
        {/* Fort Parapet Battlements */}
        {[80, 140, 200, 880, 940].map((bx) => (
          <rect key={bx} x={bx} y="1100" width="36" height="42" fill="#4A2F1C" stroke="#5C3B22" strokeWidth="1.5" />
        ))}

        {/* Dervish Sniper Loophole & Gun Emplacement */}
        <g transform={`translate(${sniperX}, ${sniperY})`}>
          <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#140D08" stroke="#3D2516" strokeWidth="2" />
          {/* Muzzle flashes from fort loophole */}
          {frame >= 26 && frame <= 29 && (
            <circle cx="-12" cy="0" r={14 * (1 - (frame - 26) / 3)} fill="#FDE047" />
          )}
          {frame >= 28 && frame <= 31 && (
            <circle cx="-12" cy="0" r={16 * (1 - (frame - 28) / 3)} fill="#F59E0B" />
          )}
          {frame >= 30 && frame <= 33 && (
            <circle cx="-14" cy="0" r={22 * (1 - (frame - 30) / 3)} fill="#EF4444" />
          )}
        </g>

        {/* Bullet 1: Ear Graze Tracer Vector */}
        {frame >= 26 && frame <= 29 && (
          <line
            x1={sniperX}
            y1={sniperY}
            x2={b1EndX}
            y2={b1EndY}
            stroke="#EF4444"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        )}

        {/* Bullet 2: Temple Graze Tracer Vector */}
        {frame >= 28 && frame <= 31 && (
          <line
            x1={sniperX}
            y1={sniperY}
            x2={b2EndX}
            y2={b2EndY}
            stroke="#F59E0B"
            strokeWidth="5"
            strokeLinecap="round"
          />
        )}

        {/* Bullet 3: Fatal Shot to Left Eye Vector */}
        {frame >= 30 && frame <= 33 && (
          <g id="eye-fatal-tracer">
            <line
              x1={sniperX}
              y1={sniperY}
              x2={b3EndX}
              y2={b3EndY}
              stroke="#DC2626"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <line
              x1={sniperX}
              y1={sniperY}
              x2={b3EndX}
              y2={b3EndY}
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Ballistic Impact Shockwave & Starburst at Eye (@ Frame 32) */}
        {eyeAge >= 0 && eyeAge < 8 && (
          <g transform={`translate(${eyeTargetX}, ${eyeTargetY})`}>
            {/* Mach shockwave ring */}
            <circle
              cx="0"
              cy="0"
              r={12 + eyeAge * 16}
              stroke="#EF4444"
              strokeWidth={4 * (1 - eyeAge / 8)}
              fill="none"
              opacity={1 - eyeAge / 8}
            />
            {/* 8-point blinding flash star */}
            <polygon
              points="0,-48 10,-12 48,0 10,12 0,48 -10,12 -48,0 -10,-12"
              fill="#FDE047"
              opacity={1 - eyeAge / 8}
            />
            <circle cx="0" cy="0" r={22 * (1 - eyeAge / 8)} fill="#FFFFFF" />
          </g>
        )}

        {/* High-Velocity Arterial Blood Spray Mist (Blasting backward behind Carton's head) */}
        {eyeAge >= 0 && eyeAge < 16 && (
          <g id="eye-exit-blood-spray" opacity={1 - sprayProg}>
            {[
              { dx: -45, dy: -24, r: 5.5 },
              { dx: -68, dy: -36, r: 4.5 },
              { dx: -92, dy: -18, r: 4.8 },
              { dx: -115, dy: -42, r: 3.8 },
              { dx: -55, dy: +15, r: 5.0 },
              { dx: -82, dy: +26, r: 4.2 },
              { dx: -125, dy: -6, r: 3.5 },
              { dx: -140, dy: -22, r: 2.8 },
              { dx: -75, dy: -55, r: 4.0 },
              { dx: -105, dy: +8, r: 3.6 },
              { dx: -130, dy: +32, r: 3.0 },
            ].map((d, i) => (
              <circle
                key={i}
                cx={eyeTargetX + d.dx * sprayProg}
                cy={eyeTargetY + d.dy * sprayProg}
                r={d.r * (1 - sprayProg * 0.3)}
                fill={i % 2 === 0 ? '#991B1B' : '#DC2626'}
              />
            ))}
          </g>
        )}
      </svg>

      {/* Carton de Wiart Wounded in Eye: Advancing then clutching shattered eye under fire */}
      <CutoutPuppet
        character="CARTON_BOER"
        outfit="BRITISH_OFFICER"
        initialPose="AIM_REVOLVER"
        switchedPose="EYE_CLUTCH"
        poseSwitchFrame={32}
        x={puppetX}
        y={puppetY}
        scale={puppetScale}
        rotation={puppetRot}
        bulletWounds={{
          eyeHitFrame: 32,
          earHitFrame: 28,
          showSparks: true,
        }}
        paperTagLabel="SHIMBER BERRIS // 1914"
      />
    </div>
  );
};

// =========================================================================
// 6. SCENE 06: CARTON_BLACK_EYEPATCH_PROFILE (Lone Leader)
// Western Front 1915: British Army Field Hospital medical tent, R.A.M.C. Doctor puppet,
// Carton de Wiart donning the black silk eyepatch and refusing medical discharge
// =========================================================================
export const CartonBlackEyepatchProfile: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();
  const pushIn = interpolate(frame, [0, 160], [1, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const stampSlam = frame >= 32;
  const stampAge = frame - 32;
  const stampScale =
    stampSlam && stampAge < 8
      ? interpolate(stampAge, [0, 2, 8], [1.35, 1.08, 1.0], { extrapolateRight: 'clamp' })
      : 1.0;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1180} rx={480} ry={270} intensity={0.75} id="medicalTentAura" color="#D97706" />

        {/* Western Front Hospital Clearing Ground */}
        <path d="M 0 1280 Q 540 1250 1080 1280 L 1080 1920 L 0 1920 Z" fill="#2E2418" />
        <path d="M 0 1340 L 1080 1340 L 1080 1920 L 0 1920 Z" fill="#1C160F" />

        {/* Weathered Timber Duckboard Pathway */}
        {[1330, 1370, 1410].map((wy) => (
          <path key={wy} d={`M 140 ${wy} L 940 ${wy}`} stroke="#3D2F20" strokeWidth="6" strokeDasharray="38, 8" />
        ))}

        {/* =========================================================================
            BRITISH ARMY FIELD HOSPITAL / MEDICAL DRESSING TENT (Royal Army Medical Corps)
            ========================================================================= */}
        <g id="medical-tent" transform="translate(540, 1140)">
          {/* Tent Ground Shadow */}
          <ellipse cx="0" cy="180" rx="420" ry="40" fill="#0D0A07" opacity="0.6" />

          {/* Outer Canvas Tent Wall & Roof Pyramidal Profile */}
          <path
            d="M -390 170 L -290 -80 L 0 -150 L 290 -80 L 390 170 Z"
            fill="#D5C7B0"
            stroke="#9E8D74"
            strokeWidth="3.5"
          />

          {/* Canvas Fabric Shading & Seam Panels */}
          <path d="M -290 -80 L 0 -150 L 0 170 L -390 170 Z" fill="#C2B299" opacity="0.55" />
          <line x1="0" y1="-150" x2="0" y2="170" stroke="#87755D" strokeWidth="3" />
          <line x1="-145" y1="-115" x2="-195" y2="170" stroke="#A8977F" strokeWidth="2" strokeDasharray="16, 4" />
          <line x1="145" y1="-115" x2="195" y2="170" stroke="#A8977F" strokeWidth="2" strokeDasharray="16, 4" />

          {/* Dark Tent Interior Opening (Revealing warm lantern glow inside) */}
          <path
            d="M -110 170 L -80 -10 Q 0 -35 80 -10 L 110 170 Z"
            fill="#2A2117"
            stroke="#17120B"
            strokeWidth="2.5"
          />

          {/* Warm Amber Field Lantern Glow inside Tent */}
          <ellipse cx="0" cy="80" rx="95" ry="75" fill="#F59E0B" opacity="0.32" />
          <ellipse cx="0" cy="70" rx="45" ry="35" fill="#FEF08A" opacity="0.45" />

          {/* Canvas Guy Ropes & Wooden Pegs */}
          <line x1="-390" y1="170" x2="-440" y2="200" stroke="#6E5A44" strokeWidth="2.5" />
          <line x1="390" y1="170" x2="440" y2="200" stroke="#6E5A44" strokeWidth="2.5" />
          <line x1="-290" y1="-80" x2="-420" y2="60" stroke="#6E5A44" strokeWidth="2" />
          <line x1="290" y1="-80" x2="420" y2="60" stroke="#6E5A44" strokeWidth="2" />

          {/* R.A.M.C. GENEVA RED CROSS EMBLEM on Tent Canvas */}
          <g transform="translate(0, -78)">
            {/* White Circular Die-Cut Cloth Patch */}
            <circle cx="0" cy="0" r="38" fill="#FDFBF7" stroke="#D1C7B7" strokeWidth="2" />
            {/* Geneva Red Cross */}
            <rect x="-10" y="-26" width="20" height="52" fill="#DC2626" rx="2" />
            <rect x="-26" y="-10" width="52" height="20" fill="#DC2626" rx="2" />
          </g>

          {/* Medical Wooden Crates & Equipment Outside Tent */}
          <g transform="translate(-250, 130)">
            <rect x="0" y="0" width="70" height="42" fill="#5A432D" stroke="#3D2B1C" strokeWidth="2" />
            <line x1="0" y1="21" x2="70" y2="21" stroke="#3D2B1C" strokeWidth="1.5" />
            <line x1="12" y1="0" x2="12" y2="42" stroke="#3D2B1C" strokeWidth="1" />
            <line x1="58" y1="0" x2="58" y2="42" stroke="#3D2B1C" strokeWidth="1" />
            <rect x="18" y="14" width="34" height="14" fill="#3D2B1C" rx="2" />
            {/* Red Cross stencil on crate */}
            <rect x="33" y="16" width="4" height="10" fill="#DC2626" />
            <rect x="30" y="19" width="10" height="4" fill="#DC2626" />
          </g>

          <g transform="translate(190, 138)">
            <rect x="0" y="0" width="62" height="34" fill="#6B5138" stroke="#483422" strokeWidth="2" />
            <line x1="0" y1="17" x2="62" y2="17" stroke="#483422" strokeWidth="1.5" />
          </g>
        </g>

        {/* Dramatic Stamped Rejection Seal on Medical Discharge (Triggers @ Frame 32) */}
        {stampSlam && (
          <g transform={`translate(540, 1020) rotate(-8) scale(${stampScale})`}>
            <rect
              x="-110"
              y="-28"
              width="220"
              height="56"
              rx="4"
              fill="none"
              stroke="#DC2626"
              strokeWidth="4.5"
              strokeDasharray="12, 4"
            />
            <text
              x="0"
              y="9"
              textAnchor="middle"
              fill="#DC2626"
              fontSize="24"
              fontWeight="900"
              letterSpacing="2.5px"
              fontFamily="sans-serif"
            >
              DISCHARGE REFUSED
            </text>
          </g>
        )}
      </svg>

      {/* R.A.M.C. Medical Doctor Puppet on Left offering invalid discharge */}
      <CutoutPuppet
        character="DOCTOR"
        outfit="DOCTOR_COAT"
        initialPose="HOLD_CLIPBOARD"
        switchedPose="HOLD_CLIPBOARD"
        x={350}
        y={1200}
        scale={0.98 * pushIn}
        paperTagLabel="R.A.M.C. SURGEON"
      />

      {/* Adrian Carton de Wiart on Right: Refusing discharge and donning the iconic silk eyepatch */}
      <CutoutPuppet
        character="CARTON_WWI"
        outfit="BRITISH_OFFICER"
        initialPose="NEUTRAL"
        switchedPose="SALUTE"
        poseSwitchFrame={32}
        x={720}
        y={1185}
        scale={1.08 * pushIn}
        paperTagLabel="LOST EYE // ADRIAN REFUSED DISCHARGE"
      />
    </div>
  );
};

// =========================================================================
// 7. SCENE 07: YPRES_TRENCH_BARRAGE_SPLIT (Ypres Artillery Barrage & Left Arm Trauma)
// 1915 Second Battle of Ypres: Incoming Krupp artillery shell detonation in trench,
// shrapnel shreds Carton de Wiart's left wrist and hand, right hand clamping bleeding wound
// =========================================================================
export const YpresTrenchBarrageSplit: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();

  // Kinetic Ballistic Impulse Timers
  const armHit = frame >= 32;
  const armAge = frame - 32;

  // Artillery Shockwave Blast Recoil Impulse
  const impulse = armAge >= 0 && armAge < 16 ? Math.sin((armAge / 16) * Math.PI) : 0;
  const puppetDx = impulse * 20 + (armHit ? Math.sin(frame * 0.35) * 3 : 0);
  const puppetDy = impulse * 12 + (armHit ? Math.min(16, (frame - 32) * 0.35) : 0);
  const puppetRot = impulse * 6 + (armHit ? 3.5 : 0);

  const puppetX = 540 + puppetDx;
  const puppetY = 1180 + puppetDy;
  const puppetScale = 1.15;

  // Exact scene target coordinates of Carton's Left Wrist & Hand
  const handTargetX = puppetX - 25;
  const handTargetY = puppetY + 106;

  // German Krupp Heavy Artillery Shell Detonation Point on Parapet
  const detX = 740;
  const detY = 990;

  // Incoming Shell Trajectory (frames 28 to 31)
  const shellProgress = interpolate(frame, [27.5, 31], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shellStartX = 1060;
  const shellStartY = 680;
  const shellCurX = shellStartX + (detX - shellStartX) * shellProgress;
  const shellCurY = shellStartY + (detY - shellStartY) * shellProgress;

  // Artillery Shell Explosion Blast Progress
  const blastAge = frame - 31;
  const blastProgress = blastAge >= 0 ? interpolate(blastAge, [0, 6, 32], [0, 1, 0.4], { extrapolateRight: 'clamp' }) : 0;
  const shockwaveR = blastAge >= 0 ? interpolate(blastAge, [0, 24], [15, 260], { extrapolateRight: 'clamp' }) : 0;
  const shockwaveAlpha = blastAge >= 0 ? interpolate(blastAge, [0, 4, 24], [0, 0.9, 0], { extrapolateRight: 'clamp' }) : 0;

  // High-Velocity Shrapnel Vector to Hand (frame 31 to 33)
  const shrapnelT = interpolate(frame, [30.5, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shrapnelEndX = detX + (handTargetX - detX) * shrapnelT;
  const shrapnelEndY = detY + (handTargetY - detY) * shrapnelT;

  // Blood Mist Spray Progress from Hand
  const sprayProg = interpolate(armAge, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1180} rx={480} ry={270} intensity={0.88} id="ypresAura" color="#DC2626" />

        {/* Fiery Western Front Night Sky Horizon */}
        <path d="M 0 1200 Q 540 1160 1080 1200 L 1080 1920 L 0 1920 Z" fill="#2E2018" />
        <path d="M 0 1340 L 1080 1340 L 1080 1920 L 0 1920 Z" fill="#1C140E" />

        {/* =========================================================================
            YPRES TRENCH REVETMENTS, SANDBAG PARAPET & WEATHERED TIMBERS
            ========================================================================= */}
        {/* Full-Width Woven Burlap Sandbag Parapet Wall */}
        <g id="sandbag-parapet">
          {[
            { x: 40, y: 1120, w: 105, h: 36, c: '#6B563E' },
            { x: 135, y: 1120, w: 110, h: 36, c: '#786248' },
            { x: 235, y: 1120, w: 105, h: 36, c: '#5A4632' },
            { x: 330, y: 1120, w: 115, h: 36, c: '#6B563E' },
            { x: 435, y: 1120, w: 110, h: 36, c: '#786248' },
            { x: 535, y: 1120, w: 115, h: 36, c: '#5A4632' },
            { x: 640, y: 1120, w: 110, h: 36, c: '#6B563E' },
            { x: 740, y: 1120, w: 115, h: 36, c: '#786248' },
            { x: 845, y: 1120, w: 110, h: 36, c: '#5A4632' },
            { x: 945, y: 1120, w: 100, h: 36, c: '#6B563E' },
            // Second tier of sandbags
            { x: 80, y: 1090, w: 110, h: 34, c: '#786248' },
            { x: 180, y: 1090, w: 115, h: 34, c: '#5A4632' },
            { x: 285, y: 1090, w: 110, h: 34, c: '#6B563E' },
            { x: 385, y: 1090, w: 115, h: 34, c: '#786248' },
            { x: 490, y: 1090, w: 110, h: 34, c: '#5A4632' },
            { x: 590, y: 1090, w: 115, h: 34, c: '#6B563E' },
            { x: 695, y: 1090, w: 110, h: 34, c: '#786248' },
            { x: 795, y: 1090, w: 115, h: 34, c: '#5A4632' },
            { x: 900, y: 1090, w: 105, h: 34, c: '#6B563E' },
          ].map((sb, idx) => (
            <rect
              key={idx}
              x={sb.x}
              y={sb.y}
              width={sb.w}
              height={sb.h}
              rx="8"
              fill={sb.c}
              stroke="#3D2E21"
              strokeWidth="2.5"
            />
          ))}

          {/* Rusted Barbed Wire Pickets & Concertina Coils */}
          <line x1="140" y1="1020" x2="140" y2="1140" stroke="#27272A" strokeWidth="5" />
          <line x1="320" y1="1030" x2="320" y2="1140" stroke="#27272A" strokeWidth="5" />
          <line x1="880" y1="1020" x2="880" y2="1140" stroke="#27272A" strokeWidth="5" />
          <path d="M 60 1060 Q 200 1030 360 1070" stroke="#71717A" strokeWidth="3" fill="none" />
          <path d="M 340 1060 Q 520 1030 700 1060" stroke="#71717A" strokeWidth="3" fill="none" />
          <path d="M 680 1060 Q 860 1030 1020 1070" stroke="#71717A" strokeWidth="3" fill="none" />
        </g>

        {/* Weathered Timber Duckboards on Trench Floor */}
        {[1360, 1400, 1440].map((wy) => (
          <path key={wy} d={`M 80 ${wy} L 1000 ${wy}`} stroke="#423020" strokeWidth="7" strokeDasharray="42, 10" />
        ))}

        {/* =========================================================================
            INCOMING GERMAN KRUPP ARTILLERY SHELL & DETONATION INFERNO
            ========================================================================= */}
        {/* Incoming Artillery Shell Streak (Frames 28 to 31) */}
        {frame >= 28 && frame <= 31 && (
          <g id="incoming-howitzer-shell">
            <line
              x1={shellStartX}
              y1={shellStartY}
              x2={shellCurX}
              y2={shellCurY}
              stroke="#EA580C"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1={shellStartX}
              y1={shellStartY}
              x2={shellCurX}
              y2={shellCurY}
              stroke="#FEF08A"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* High-Explosive Parapet Detonation (From Frame 31 onward) */}
        {blastProgress > 0.01 && (
          <g transform={`translate(${detX}, ${detY})`}>
            {/* Mach shockwave ring expanding across trench */}
            <circle cx="0" cy="0" r={shockwaveR} fill="none" stroke="#FDE047" strokeWidth="4.5" opacity={shockwaveAlpha} />

            {/* Acute flame spikes */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
              <line
                key={ang}
                x1="0"
                y1="0"
                x2={Math.cos((ang * Math.PI) / 180) * 160 * blastProgress}
                y2={Math.sin((ang * Math.PI) / 180) * 160 * blastProgress}
                stroke="#DC2626"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ))}

            {/* Multi-tier blast lobes */}
            <ellipse cx="0" cy="0" rx={120 * blastProgress} ry={95 * blastProgress} fill="#EA580C" opacity="0.9" />
            <ellipse cx="-15" cy="-10" rx={85 * blastProgress} ry={70 * blastProgress} fill="#F97316" />
            <ellipse cx="10" cy="-15" rx={60 * blastProgress} ry={50 * blastProgress} fill="#FEF08A" />

            {/* Flying timber & shrapnel shards */}
            {[
              { x: -90, y: -70, w: 18, h: 18, c: '#4A3422' },
              { x: 80, y: -90, w: 16, h: 16, c: '#27272A' },
              { x: -120, y: 20, w: 22, h: 12, c: '#3F3F46' },
              { x: 95, y: 40, w: 15, h: 15, c: '#523926' },
            ].map((sh, idx) => (
              <rect
                key={idx}
                x={sh.x * blastProgress}
                y={sh.y * blastProgress}
                width={sh.w}
                height={sh.h}
                fill={sh.c}
                stroke="#18181B"
                strokeWidth="1.5"
                transform={`rotate(${frame * 5 + idx * 45})`}
              />
            ))}
          </g>
        )}

        {/* Shrapnel Vector Slashing Into Carton's Left Hand (Frames 31 to 33) */}
        {frame >= 31 && frame <= 33 && (
          <g id="shrapnel-vector">
            <line
              x1={detX}
              y1={detY}
              x2={shrapnelEndX}
              y2={shrapnelEndY}
              stroke="#DC2626"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <line
              x1={detX}
              y1={detY}
              x2={shrapnelEndX}
              y2={shrapnelEndY}
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Ballistic Shrapnel Entry Flash at Hand (@ Frame 32) */}
        {armAge >= 0 && armAge < 8 && (
          <g transform={`translate(${handTargetX}, ${handTargetY})`}>
            {/* Red shockwave ring */}
            <circle
              cx="0"
              cy="0"
              r={10 + armAge * 14}
              stroke="#EF4444"
              strokeWidth={4 * (1 - armAge / 8)}
              fill="none"
              opacity={1 - armAge / 8}
            />
            {/* Golden 8-point flash star */}
            <polygon
              points="0,-40 9,-10 40,0 9,10 0,40 -9,10 -40,0 -9,-10"
              fill="#FDE047"
              opacity={1 - armAge / 8}
            />
            <circle cx="0" cy="0" r={18 * (1 - armAge / 8)} fill="#FFFFFF" />
          </g>
        )}

        {/* High-Velocity Arterial Blood Spray Mist (Blasting outward from shattered hand) */}
        {armAge >= 0 && armAge < 16 && (
          <g id="hand-exit-blood-spray" opacity={1 - sprayProg}>
            {[
              { dx: -35, dy: +18, r: 5.5 },
              { dx: -55, dy: +32, r: 4.5 },
              { dx: -75, dy: +15, r: 4.8 },
              { dx: -90, dy: +42, r: 3.8 },
              { dx: -45, dy: -12, r: 4.2 },
              { dx: -68, dy: -24, r: 3.5 },
              { dx: -105, dy: +26, r: 3.2 },
              { dx: -120, dy: +12, r: 2.8 },
              { dx: -80, dy: +55, r: 4.0 },
              { dx: -100, dy: -8, r: 3.0 },
            ].map((d, i) => (
              <circle
                key={i}
                cx={handTargetX + d.dx * sprayProg}
                cy={handTargetY + d.dy * sprayProg}
                r={d.r * (1 - sprayProg * 0.3)}
                fill={i % 2 === 0 ? '#991B1B' : '#DC2626'}
              />
            ))}
          </g>
        )}
      </svg>

      {/* Adrian Carton de Wiart in the Trench: Pointing over the top, then clutching his shattered left hand */}
      <CutoutPuppet
        character="CARTON_WWI"
        outfit="BRITISH_OFFICER"
        initialPose="POINTING"
        switchedPose="ARM_CLUTCH"
        poseSwitchFrame={32}
        x={puppetX}
        y={puppetY}
        scale={puppetScale}
        rotation={puppetRot}
        bulletWounds={{
          armHitFrame: 32,
          showSparks: true,
        }}
        paperTagLabel="2ND BATTLE OF YPRES // 1915"
      />
    </div>
  );
};

// =========================================================================
// 8. SCENE 08: AMPUTATION_SEVERED_HAND_FRACTURE (Structural Fracture)
// Dressing Station: Pine table, surgical steel kidney dish, amber iodine flask, linen gauze,
// Doctor refuses amputation -> Adrian bites off his own fingers; severed fingers fly into dish
// =========================================================================
export const AmputationSeveredHandFracture: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();
  const pushIn = interpolate(frame, [0, 160], [1, 1.06], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const biteHitFrame = 32;
  const biteAge = frame - biteHitFrame;

  // Trajectory for severed Finger 1 (Index Finger)
  const flightDuration1 = 22;
  const t1 = Math.max(0, Math.min(flightDuration1, biteAge));
  const prog1 = t1 / flightDuration1;
  const finger1X = interpolate(prog1, [0, 1], [674, 515], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const finger1Y =
    interpolate(prog1, [0, 1], [1019, 1345], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) -
    Math.sin(prog1 * Math.PI) * 95;
  const finger1Rot = biteAge >= 0 ? (biteAge < flightDuration1 ? biteAge * 26 : 165) : 0;
  const finger1Visible = frame >= biteHitFrame;

  // Trajectory for severed Finger 2 (Middle Finger)
  const flightDuration2 = 26;
  const t2 = Math.max(0, Math.min(flightDuration2, biteAge));
  const prog2 = t2 / flightDuration2;
  const finger2X = interpolate(prog2, [0, 1], [682, 545], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const finger2Y =
    interpolate(prog2, [0, 1], [1024, 1350], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) -
    Math.sin(prog2 * Math.PI) * 125;
  const finger2Rot = biteAge >= 0 ? (biteAge < flightDuration2 ? biteAge * -28 : -85) : 0;
  const finger2Visible = frame >= biteHitFrame;

  // Blood pool growth in kidney dish
  const landedDishAge = Math.max(0, frame - (biteHitFrame + flightDuration1));
  const dishBloodGrowth = interpolate(landedDishAge, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1180} rx={480} ry={270} intensity={0.78} id="ampAura" color="#D97706" />

        {/* Field Dressing Station Canvas Wall Slopes */}
        <path d="M 0 860 L 540 760 L 1080 860 L 1080 1920 L 0 1920 Z" fill="#2E2317" />
        <line x1="540" y1="760" x2="540" y2="1340" stroke="#453322" strokeWidth="8" />
        {/* Slanted Canvas Seams */}
        <line x1="240" y1="815" x2="160" y2="1340" stroke="#3D2D1E" strokeWidth="3" strokeDasharray="16, 8" />
        <line x1="840" y1="815" x2="920" y2="1340" stroke="#3D2D1E" strokeWidth="3" strokeDasharray="16, 8" />

        {/* Hanging Brass Hurricane Lantern with Warm Amber Illumination */}
        <g transform="translate(540, 840)">
          <line x1="0" y1="-80" x2="0" y2="0" stroke="#78350F" strokeWidth="3" />
          <path d="M -16 0 L 16 0 L 12 10 L -12 10 Z" fill="#B45309" />
          <ellipse cx="0" cy="22" rx="14" ry="16" fill="#FEF3C7" opacity="0.85" />
          <circle cx="0" cy="22" r="8" fill="#F59E0B" />
          <rect x="-14" y="38" width="28" height="10" rx="3" fill="#92400E" />
          {/* Radial Ambient Glow */}
          <circle cx="0" cy="22" r="85" fill="#F59E0B" opacity="0.12" filter="blur(14px)" />
        </g>

        {/* Field Aid Station Dressing Table with Rich Pine Grain */}
        <path d="M 180 1340 L 900 1340 L 870 1480 L 210 1480 Z" fill="#4A3423" stroke="#332115" strokeWidth="3.5" />
        {/* Table Leg Timbers */}
        <rect x="230" y="1480" width="36" height="440" fill="#3D2819" stroke="#25160C" strokeWidth="2" />
        <rect x="814" y="1480" width="36" height="440" fill="#3D2819" stroke="#25160C" strokeWidth="2" />

        {/* Tabletop Sterile White Linen Cloth */}
        <rect x="200" y="1340" width="680" height="22" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />

        {/* Surgical Medical Instruments on Left near Surgeon */}
        {/* Bone Shears / Forceps */}
        <g transform="translate(360, 1346) rotate(12)">
          <line x1="-18" y1="0" x2="18" y2="0" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="-18" cy="-4" r="3.5" fill="none" stroke="#64748B" strokeWidth="1.5" />
          <circle cx="-18" cy="4" r="3.5" fill="none" stroke="#64748B" strokeWidth="1.5" />
        </g>

        {/* Stainless Steel Surgical Kidney Dish in Table Center */}
        <g transform="translate(530, 1352)">
          {/* Dish Drop Shadow */}
          <ellipse cx="0" cy="8" rx="72" ry="24" fill="rgba(0, 0, 0, 0.45)" />
          {/* Outer Polished Rim */}
          <path
            d="M -68 -4 Q 0 -18 68 -4 Q 78 8 58 18 Q 0 28 -58 18 Q -78 8 -68 -4 Z"
            fill="#CBD5E1"
            stroke="#94A3B8"
            strokeWidth="2.5"
          />
          {/* Inner Concave Basin */}
          <path
            d="M -60 -1 Q 0 -12 60 -1 Q 68 8 50 15 Q 0 22 -50 15 Q -68 8 -60 -1 Z"
            fill="#94A3B8"
            stroke="#64748B"
            strokeWidth="1.5"
          />
          {/* Metallic Specular Highlights */}
          <path d="M -48 -2 Q 0 -10 48 -2" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />

          {/* Blood Pooling inside Kidney Dish as Severed Fingers Land */}
          {dishBloodGrowth > 0 && (
            <g id="dish-blood-pool">
              <ellipse cx="2" cy="7" rx={42 * dishBloodGrowth} ry={12 * dishBloodGrowth} fill="#7F1D1D" opacity="0.95" />
              <ellipse cx="4" cy="7" rx={28 * dishBloodGrowth} ry={8 * dishBloodGrowth} fill="#991B1B" />
              <ellipse cx="6" cy="6" rx={14 * dishBloodGrowth} ry={4.5 * dishBloodGrowth} fill="#DC2626" opacity="0.9" />
              {/* Splatter Droplets along Rim */}
              <circle cx="-38" cy="12" r="2.5" fill="#991B1B" />
              <circle cx="36" cy="10" r="3" fill="#DC2626" />
              <circle cx="48" cy="2" r="2" fill="#7F1D1D" />
            </g>
          )}
        </g>

        {/* Amber Glass Iodine Bottle with Dropper on Right Tabletop */}
        <rect x="760" y="1308" width="34" height="48" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="2" />
        <rect x="770" y="1298" width="14" height="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
        <line x1="777" y1="1292" x2="777" y2="1298" stroke="#1E293B" strokeWidth="2.5" />
        {/* Rolled Cotton Gauze */}
        <rect x="705" y="1328" width="44" height="26" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
        <line x1="712" y1="1328" x2="712" y2="1354" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3, 2" />

        {/* HIGH-VELOCITY ARTERIAL SPRAY AT FRAME 32 CRUNCH HIT */}
        {biteAge >= 0 && biteAge < 14 && (
          <g transform="translate(674, 1019)">
            {[...Array(9)].map((_, i) => {
              const ang = -140 + i * 16;
              const rad = (ang * Math.PI) / 180;
              const dist = biteAge * (6.5 + (i % 3) * 3);
              return (
                <circle
                  key={i}
                  cx={Math.cos(rad) * dist}
                  cy={Math.sin(rad) * dist}
                  r={Math.max(1.5, 4.2 - biteAge * 0.28)}
                  fill={i % 2 === 0 ? '#DC2626' : '#991B1B'}
                  opacity={1 - biteAge / 14}
                />
              );
            })}
          </g>
        )}

        {/* BALLISTIC SEVERED FINGER 1 (Index Finger in Flight & Landed) */}
        {finger1Visible && (
          <g transform={`translate(${finger1X}, ${finger1Y}) rotate(${finger1Rot}) scale(${0.95 * pushIn})`}>
            {/* White Paper Sticker Outline */}
            <rect x="-8" y="-18" width="16" height="36" rx="8" fill="#F4EFE6" />
            {/* Caucasian Skin Flesh */}
            <rect x="-6" y="-16" width="12" height="32" rx="6" fill="#D9B391" />
            {/* Knuckle Creases */}
            <line x1="-4" y1="-3" x2="4" y2="-3" stroke="#B88A68" strokeWidth="1.2" />
            <line x1="-4" y1="5" x2="4" y2="5" stroke="#B88A68" strokeWidth="1.2" />
            {/* Ragged Severed Knuckle Base with Torn Red Flesh */}
            <path d="M -6 10 L -4 16 L 0 14 L 4 17 L 6 10 Z" fill="#7F1D1D" stroke="#991B1B" strokeWidth="1" />
            {/* Severed Bone Core */}
            <circle cx="0" cy="13" r="2.2" fill="#FFFFFF" />
            {/* Dripping Blood Bead */}
            <circle cx="0.5" cy="19" r="2.2" fill="#DC2626" />
          </g>
        )}

        {/* BALLISTIC SEVERED FINGER 2 (Middle Finger in Flight & Landed) */}
        {finger2Visible && (
          <g transform={`translate(${finger2X}, ${finger2Y}) rotate(${finger2Rot}) scale(${0.98 * pushIn})`}>
            {/* White Paper Sticker Outline */}
            <rect x="-8.5" y="-20" width="17" height="40" rx="8.5" fill="#F4EFE6" />
            {/* Caucasian Skin Flesh */}
            <rect x="-6.5" y="-18" width="13" height="36" rx="6.5" fill="#D9B391" />
            {/* Knuckle Creases */}
            <line x1="-4.5" y1="-4" x2="4.5" y2="-4" stroke="#B88A68" strokeWidth="1.2" />
            <line x1="-4.5" y1="6" x2="4.5" y2="6" stroke="#B88A68" strokeWidth="1.2" />
            {/* Ragged Severed Knuckle Base */}
            <path d="M -6.5 12 L -4 18 L 1 15 L 5 19 L 6.5 12 Z" fill="#7F1D1D" stroke="#991B1B" strokeWidth="1" />
            {/* Severed Bone Core */}
            <circle cx="0.5" cy="15" r="2.4" fill="#FFFFFF" />
            {/* Dripping Blood Bead */}
            <circle cx="1" cy="22" r="2.2" fill="#DC2626" />
          </g>
        )}
      </svg>

      {/* R.A.M.C. Surgeon Puppet on Left: Gesturing refusal, then recoiling in utter horror */}
      <CutoutPuppet
        character="DOCTOR"
        outfit="DOCTOR_COAT"
        initialPose="SURGEON_REFUSE"
        switchedPose="SURGEON_SHOCKED"
        poseSwitchFrame={32}
        x={310}
        y={1185}
        scale={0.96 * pushIn}
        paperTagLabel="R.A.M.C. SURGEON"
      />

      {/* Adrian Carton de Wiart Puppet on Right: Clamping teeth onto fingers, biting them off! */}
      <CutoutPuppet
        character="CARTON_WWI"
        outfit="BRITISH_OFFICER"
        initialPose="BITE_FINGERS"
        switchedPose="SEVERED_FINGERS"
        poseSwitchFrame={32}
        x={680}
        y={1170}
        scale={1.08 * pushIn}
        bulletWounds={{
          biteHitFrame: 32,
          showSparks: true,
        }}
        paperTagLabel="ADRIAN BIT HIS OWN FINGERS OFF"
      />
    </div>
  );
};

// =========================================================================
// 9. SCENE 09: SOMME_BATTALION_ADVANCE_TALLY (Crowd Tally)
// 1916 Battle of the Somme, La Boisselle:
// Adrian Carton de Wiart commands THREE full battalions simultaneously
// Massed advance of 57 soldiers across 3 battalions with regimental standards & live rolling tally
// =========================================================================
export const SommeLaBoisselleTally: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();
  const pushIn = interpolate(frame, [0, 160], [1, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const marchDriftSmall = (frame * 0.45) % 80;
  const marchDriftMed = (frame * 0.75) % 120;

  // Rolling counter: 1 to 3 battalions
  const battalionProgress = interpolate(frame, [26, 46], [1, 3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const displayBattalions = Math.round(battalionProgress);
  const commandLocked = frame >= 32;

  // Parametric British Soldier Generator
  const renderInfantryman = (
    bx: number,
    by: number,
    sc: number,
    animPhase: number,
    bayonetGleam: boolean,
    key: string | number
  ) => {
    const bob = Math.sin(frame * 0.16 + animPhase) * 3.5;
    return (
      <g key={key} transform={`translate(${bx}, ${by + bob}) scale(${sc * pushIn})`}>
        {/* Paper sticker die-cut outline */}
        <g>
          <ellipse cx="0" cy="0" rx="18" ry="28" fill="#F4EFE6" />
          <ellipse cx="0" cy="-32" rx="15" ry="15" fill="#F4EFE6" />
          <ellipse cx="0" cy="-38" rx="26" ry="10" fill="#F4EFE6" />
          <line x1="10" y1="12" x2="26" y2="-52" stroke="#F4EFE6" strokeWidth="8" strokeLinecap="round" />
          <line x1="26" y1="-52" x2="31" y2="-76" stroke="#F4EFE6" strokeWidth="7" strokeLinecap="round" />
        </g>
        {/* Khaki wool serge uniform torso */}
        <ellipse cx="0" cy="0" rx="14" ry="24" fill="#4A3F2C" />
        {/* Webbing belt & brace straps */}
        <line x1="-12" y1="-14" x2="12" y2="12" stroke="#6B5C47" strokeWidth="2.5" />
        <line x1="12" y1="-14" x2="-12" y2="12" stroke="#6B5C47" strokeWidth="2.5" />
        <rect x="-13" y="10" width="26" height="5" rx="1.5" fill="#524433" />
        {/* Ammo pouches */}
        <rect x="-11" y="7" width="7" height="8" rx="1" fill="#6B5C47" />
        <rect x="4" y="7" width="7" height="8" rx="1" fill="#6B5C47" />

        {/* Head oval */}
        <ellipse cx="0" cy="-30" rx="11" ry="11" fill="#C6946E" />
        {/* Olive-Green Steel Brodie Helmet */}
        <path d="M -16 -34 Q 0 -48 16 -34 Z" fill="#3D4530" />
        <ellipse cx="0" cy="-34" rx="21" ry="7" fill="#4B553D" stroke="#2E3524" strokeWidth="1.5" />
        {/* Helmet crest highlight */}
        <ellipse cx="-4" cy="-37" rx="8" ry="3" fill="#606C4E" opacity="0.6" />

        {/* Lee-Enfield .303 Rifle with Walnut Stock */}
        <line x1="8" y1="12" x2="25" y2="-48" stroke="#5A3825" strokeWidth="3.2" strokeLinecap="round" />
        {/* Blued-steel bolt & receiver */}
        <line x1="13" y1="-6" x2="19" y2="-24" stroke="#1E293B" strokeWidth="2.5" />
        {/* Polished Steel 17-inch Sword Bayonet */}
        <line x1="25" y1="-48" x2="30" y2="-72" stroke="#E2E8F0" strokeWidth="2.4" strokeLinecap="round" />
        {/* Bayonet point glint */}
        {bayonetGleam && <circle cx="30" cy="-72" r="3" fill="#FFFFFF" opacity="0.9" />}
      </g>
    );
  };

  // Foreground coordinates for the 3 distinct battalions:
  // Left: 8th Gloucesters (5 troops)
  const gloucesterTroops = [
    { x: 120, y: 1335, phase: 0.1 },
    { x: 180, y: 1355, phase: 0.9 },
    { x: 240, y: 1330, phase: 1.8 },
    { x: 300, y: 1360, phase: 2.7 },
    { x: 360, y: 1345, phase: 3.6 },
  ];
  // Center: 8th Royal Warwicks (5 troops advancing behind Carton)
  const warwickTroops = [
    { x: 420, y: 1350, phase: 0.5 },
    { x: 470, y: 1330, phase: 1.4 },
    { x: 610, y: 1330, phase: 2.3 },
    { x: 660, y: 1355, phase: 3.2 },
    { x: 710, y: 1340, phase: 4.1 },
  ];
  // Right: 10th Worcesters (5 troops)
  const worcesterTroops = [
    { x: 765, y: 1345, phase: 0.3 },
    { x: 815, y: 1360, phase: 1.2 },
    { x: 865, y: 1335, phase: 2.1 },
    { x: 915, y: 1355, phase: 3.0 },
    { x: 965, y: 1340, phase: 3.9 },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1160} rx={480} ry={270} intensity={0.82} id="sommeAura" color="#D97706" />

        {/* Somme Burning Battlefield Horizon Sky */}
        <path d="M 0 1140 Q 270 1110 540 1130 T 1080 1120 L 1080 1920 L 0 1920 Z" fill="#2E2218" />

        {/* Smoke Plumes from Heavy Artillery Barrages */}
        {[...Array(5)].map((_, i) => (
          <ellipse
            key={i}
            cx={140 + i * 200 + Math.sin(frame * 0.05 + i) * 15}
            cy={1100 + (i % 2) * 20}
            rx={55 + i * 8}
            ry={32 + (i % 3) * 6}
            fill="#3F2D1F"
            opacity="0.55"
          />
        ))}

        {/* TIER 1: Distant Horizon Skirmish Lines (24 Soldiers Bristling with Bayonets) */}
        {Array.from({ length: 24 }).map((_, i) => {
          const hx = 40 + i * 44 - marchDriftSmall;
          const hy = 1205 + (i % 3) * 6;
          return renderInfantryman(hx, hy, 0.44, i * 0.7, (frame + i * 6) % 30 < 4, `t1_${i}`);
        })}

        {/* Somme Chalk Mud Midground Ridge */}
        <path d="M 0 1240 Q 320 1200 640 1235 T 1080 1220 L 1080 1920 L 0 1920 Z" fill="#3D3023" />

        {/* TIER 2: Midground Advancing Battalion Formations (18 Soldiers) */}
        {Array.from({ length: 18 }).map((_, i) => {
          const mx = 60 + i * 56 - marchDriftMed;
          const my = 1265 + (i % 2) * 12;
          return renderInfantryman(mx, my, 0.68, i * 0.85, (frame + i * 5) % 25 < 3, `t2_${i}`);
        })}

        {/* Foreground Somme Parapet & Trench Duckboards */}
        <path d="M 0 1315 Q 280 1285 540 1310 T 1080 1295 L 1080 1920 L 0 1920 Z" fill="#4B3B2C" />
        <path d="M 0 1385 Q 360 1350 720 1390 L 1080 1365 L 1080 1920 L 0 1920 Z" fill="#332417" />

        {/* Barbed Wire Entanglements */}
        <line x1="80" y1="1310" x2="140" y2="1360" stroke="#78350F" strokeWidth="4" />
        <line x1="140" y1="1315" x2="200" y2="1365" stroke="#78350F" strokeWidth="4" />
        <path d="M 60 1340 Q 130 1320 220 1350" stroke="#94A3B8" strokeWidth="1.8" strokeDasharray="4, 6" fill="none" />
        <line x1="880" y1="1315" x2="940" y2="1365" stroke="#78350F" strokeWidth="4" />
        <path d="M 860 1335 Q 930 1315 1020 1345" stroke="#94A3B8" strokeWidth="1.8" strokeDasharray="4, 6" fill="none" />

        {/* TIER 3: Main Foreground Battalions (15 Prominent British Infantrymen) */}
        {/* Left Battalion: 8th Gloucestershire Regiment */}
        {gloucesterTroops.map((t, idx) =>
          renderInfantryman(t.x, t.y, 0.92, t.phase, (frame + idx * 4) % 20 < 4, `gloucester_${idx}`)
        )}
        {/* Center Battalion: 8th Royal Warwickshire Regiment */}
        {warwickTroops.map((t, idx) =>
          renderInfantryman(t.x, t.y, 0.92, t.phase, (frame + idx * 4 + 2) % 20 < 4, `warwick_${idx}`)
        )}
        {/* Right Battalion: 10th Worcestershire Regiment */}
        {worcesterTroops.map((t, idx) =>
          renderInfantryman(t.x, t.y, 0.92, t.phase, (frame + idx * 4 + 4) % 20 < 4, `worcester_${idx}`)
        )}

        {/* GOLD COMMAND COUPLING VECTORS (Connects Adrian to all 3 Battalions at frame >= 32) */}
        {commandLocked && (
          <g id="command-couplings">
            {/* Link to 8th Gloucesters (Left) */}
            <line x1="540" y1="1140" x2="210" y2="970" stroke="#F59E0B" strokeWidth="3.5" strokeDasharray="8, 4" />
            <circle cx="210" cy="970" r="5" fill="#F59E0B" />
            {/* Link to 8th Warwicks (Center) */}
            <line x1="540" y1="1140" x2="540" y2="938" stroke="#F59E0B" strokeWidth="3.5" strokeDasharray="8, 4" />
            <circle cx="540" cy="938" r="5" fill="#F59E0B" />
            {/* Link to 10th Worcesters (Right) */}
            <line x1="540" y1="1140" x2="860" y2="970" stroke="#F59E0B" strokeWidth="3.5" strokeDasharray="8, 4" />
            <circle cx="860" cy="970" r="5" fill="#F59E0B" />
          </g>
        )}

        {/* BATTALION 1 REGIMENTAL PLACARD (Left: 8th Gloucesters) */}
        <g transform="translate(210, 930)">
          <rect x="-105" y="-30" width="210" height="58" rx="4" fill="#EAE3D2" stroke="#F59E0B" strokeWidth="2.5" />
          <rect x="-105" y="-30" width="210" height="18" fill="#1E293B" />
          <text x="0" y="-17" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="900" letterSpacing="1.2px">
            8TH GLOUCESTERSHIRE
          </text>
          <text x="0" y="7" textAnchor="middle" fill="#141619" fontSize="12" fontWeight="800">
            CO: CARTON DE WIART
          </text>
          <text x="0" y="21" textAnchor="middle" fill="#B45309" fontSize="9.5" fontWeight="900">
            ● HOLDING FRONT LINE
          </text>
        </g>

        {/* BATTALION 2 REGIMENTAL PLACARD (Center: 8th Warwicks positioned higher to clear Carton's head) */}
        <g transform="translate(540, 880)">
          <rect
            x="-110"
            y="-30"
            width="220"
            height="58"
            rx="4"
            fill="#EAE3D2"
            stroke={commandLocked ? '#F59E0B' : '#DC2626'}
            strokeWidth="2.5"
          />
          <rect x="-110" y="-30" width="220" height="18" fill={commandLocked ? '#1E293B' : '#7F1D1D'} />
          <text x="0" y="-17" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="900" letterSpacing="1.2px">
            8TH ROYAL WARWICKSHIRE
          </text>
          <text x="0" y="7" textAnchor="middle" fill="#141619" fontSize="12" fontWeight="800">
            {commandLocked ? 'COMMAND ASSUMED' : 'CO KILLED IN ACTION'}
          </text>
          <text
            x="0"
            y="21"
            textAnchor="middle"
            fill={commandLocked ? '#B45309' : '#DC2626'}
            fontSize="9.5"
            fontWeight="900"
          >
            {commandLocked ? '● COMBINED ASSAULT' : '⚠ COMMAND VACANT'}
          </text>
        </g>

        {/* BATTALION 3 REGIMENTAL PLACARD (Right: 10th Worcesters) */}
        <g transform="translate(860, 930)">
          <rect
            x="-105"
            y="-30"
            width="210"
            height="58"
            rx="4"
            fill="#EAE3D2"
            stroke={commandLocked ? '#F59E0B' : '#DC2626'}
            strokeWidth="2.5"
          />
          <rect x="-105" y="-30" width="210" height="18" fill={commandLocked ? '#1E293B' : '#7F1D1D'} />
          <text x="0" y="-17" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="900" letterSpacing="1.2px">
            10TH WORCESTERSHIRE
          </text>
          <text x="0" y="7" textAnchor="middle" fill="#141619" fontSize="12" fontWeight="800">
            {commandLocked ? 'COMMAND ASSUMED' : 'CO KILLED IN ACTION'}
          </text>
          <text
            x="0"
            y="21"
            textAnchor="middle"
            fill={commandLocked ? '#B45309' : '#DC2626'}
            fontSize="9.5"
            fontWeight="900"
          >
            {commandLocked ? '● FLANK SECURED' : '⚠ COMMAND VACANT'}
          </text>
        </g>

        {/* LIVE ROLLING BATTALION TALLY PLACARD */}
        <g transform="translate(540, 1435)">
          {/* Card backing */}
          <rect x="-190" y="-34" width="380" height="68" rx="6" fill="#141619" stroke="#EAE3D2" strokeWidth="2.5" />
          {/* Label */}
          <text x="-160" y="7" textAnchor="start" fill="#F8FAFC" fontSize="14" fontWeight="900" letterSpacing="1.5px">
            BATTALIONS:
          </text>
          {/* Animated Integer */}
          <text
            x="70"
            y="10"
            textAnchor="middle"
            fill={displayBattalions === 3 ? '#EF4444' : '#F59E0B'}
            fontSize="40"
            fontWeight="900"
          >
            {displayBattalions} / 3
          </text>
          {/* Bottom Sub-Label */}
          <text x="0" y="24" textAnchor="middle" fill="#CBD5E1" fontSize="11" fontWeight="800" letterSpacing="1px">
            ~3,000 TROOPS UNITED UNDER ADRIAN CARTON DE WIART
          </text>
        </g>
      </svg>

      {/* Adrian Carton de Wiart in the Lead: Pointing cane forward, then raising Webley revolver high */}
      <CutoutPuppet
        character="CARTON_WWI"
        outfit="BRITISH_OFFICER"
        initialPose="POINTING"
        switchedPose="AIM_REVOLVER"
        poseSwitchFrame={32}
        x={540}
        y={1185}
        scale={1.12 * pushIn}
      />
    </div>
  );
};

// =========================================================================
// 10. SCENE 10: CARTON_SKULL_BULLET_SURVIVAL (Lone Leader)
// Sniper bullet piercing through back of skull & ear; Adrian survives & commands
// =========================================================================
export const CartonSkullBulletSurvival: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();

  // Pacing & transient triggers
  const hitFrame = 31; // Beat 2 / Bass drop hit frame
  const survivalFrame = 66; // Payoff survival & return frame
  const isHit = frame >= hitFrame;
  const isSurvived = frame >= survivalFrame;

  const hitAge = isHit ? frame - hitFrame : -1;
  const survivalAge = isSurvived ? frame - survivalFrame : -1;

  // Ballistic Recoil Impulse on Puppet
  const recoilProgress = interpolate(hitAge, [0, 2, 8, 22], [0, 1, 0.45, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const recoilY = recoilProgress * 24;
  const recoilRot = (frame < 45 ? -1 : 1) * recoilProgress * 4.5;

  // Camera impact shake
  const shakeAmp = interpolate(hitAge, [0, 2, 12], [14, 8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shakeX = Math.sin(Math.max(0, hitAge) * 3.8) * shakeAmp;
  const shakeY = Math.cos(Math.max(0, hitAge) * 4.2) * (shakeAmp * 0.7);

  // Supersonic sniper bullet vector (from enemy sniper nest to skull and through)
  // Cranial Entry: (497, 1057), Exit behind ear: (602, 1075)
  const sniperStartX = 140;
  const sniperStartY = 960;
  const skullEntryX = 497;
  const skullEntryY = 1057;
  const skullExitX = 602;
  const skullExitY = 1075;
  const bulletEndX = 980;
  const bulletEndY = 1140;

  // Tracer flight progress (frames 28-31)
  const tracerProgress = interpolate(frame, [28, 31], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bulletCurrentX = interpolate(tracerProgress, [0, 1], [sniperStartX, skullEntryX], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bulletCurrentY = interpolate(tracerProgress, [0, 1], [sniperStartY, skullEntryY], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Exit tracer flight (frames 31-34)
  const exitTracerProgress = interpolate(frame, [31, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitBulletCurrentX = interpolate(exitTracerProgress, [0, 1], [skullExitX, bulletEndX], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitBulletCurrentY = interpolate(exitTracerProgress, [0, 1], [skullExitY, bulletEndY], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shockwave expansion at exit
  const shockwaveR = interpolate(hitAge, [0, 12], [12, 140], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shockwaveOpacity = interpolate(hitAge, [0, 12], [0.95, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Paper tag text
  const tagLabel =
    frame < 31
      ? "DEVIL'S WOOD · SOMME 1916"
      : frame < 66
      ? 'PENETRATING SKULL WOUND'
      : 'RETURNED TO FRONT IN 3 WEEKS';

  // Golden victory aura rotation on survival
  const auraRot = interpolate(Math.max(0, survivalAge), [0, 60], [0, 45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const auraOpacity = interpolate(Math.max(0, survivalAge), [0, 12], [0, 0.9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Casualty report card pop on survival
  const cardScale = interpolate(Math.max(0, survivalAge), [0, 6, 12], [0.5, 1.08, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardOpacity = interpolate(Math.max(0, survivalAge), [0, 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      <svg
        viewBox="0 0 1080 1920"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          {/* Somme sky & trench gradient */}
          <linearGradient id="sommeSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2E333D" />
            <stop offset="45%" stopColor="#1C1E24" />
            <stop offset="100%" stopColor="#101216" />
          </linearGradient>

          {/* Golden Victory Aura Gradient on Survival */}
          <radialGradient id="victorySunburst" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#D97706" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. LAYER 1: Somme Battlefield Sky & Distant Dead Trees */}
        <rect x="0" y="0" width="1080" height="1920" fill="url(#sommeSkyGrad)" />

        {/* Devil's Wood Blasted Tree Stumps Silhouettes */}
        <g id="devils-wood-stumps" opacity="0.65">
          {/* Trunk 1 */}
          <path d="M 120 1200 L 132 820 L 146 760 L 138 820 L 148 1200 Z" fill="#18181B" />
          <path d="M 132 850 L 95 810 L 98 805 L 134 840 Z" fill="#18181B" />
          {/* Trunk 2 */}
          <path d="M 280 1200 L 292 880 L 285 830 L 302 880 L 310 1200 Z" fill="#18181B" />
          {/* Trunk 3 */}
          <path d="M 820 1200 L 834 810 L 848 750 L 842 810 L 852 1200 Z" fill="#18181B" />
          <path d="M 840 860 L 880 825 L 884 830 L 844 870 Z" fill="#18181B" />
          {/* Trunk 4 */}
          <path d="M 940 1200 L 955 860 L 948 810 L 968 860 L 975 1200 Z" fill="#18181B" />
        </g>

        {/* Distant Somme Parapet Mounds with White Chalk Clay */}
        <path
          d="M 0 1240 Q 240 1210 520 1235 T 1080 1220 L 1080 1920 L 0 1920 Z"
          fill="#27231E"
        />
        {/* Chalk clods on parapet */}
        <ellipse cx="220" cy="1235" rx="42" ry="14" fill="#A1A1AA" opacity="0.55" />
        <ellipse cx="780" cy="1230" rx="55" ry="16" fill="#A1A1AA" opacity="0.5" />
        <ellipse cx="440" cy="1245" rx="35" ry="12" fill="#D4D4D8" opacity="0.4" />

        {/* Midground Trench Burlap Sandbag Layers */}
        <g id="trench-sandbags">
          {[
            { x: 40, y: 1280, w: 90, h: 36, col: '#5C4A35' },
            { x: 135, y: 1276, w: 95, h: 36, col: '#6E5A44' },
            { x: 235, y: 1282, w: 88, h: 36, col: '#5C4A35' },
            { x: 740, y: 1275, w: 94, h: 36, col: '#6E5A44' },
            { x: 840, y: 1278, w: 92, h: 36, col: '#5C4A35' },
            { x: 938, y: 1272, w: 96, h: 36, col: '#6E5A44' },
            // Tier 2
            { x: 85, y: 1314, w: 96, h: 38, col: '#6E5A44' },
            { x: 185, y: 1312, w: 92, h: 38, col: '#5C4A35' },
            { x: 790, y: 1308, w: 96, h: 38, col: '#5C4A35' },
            { x: 890, y: 1312, w: 94, h: 38, col: '#6E5A44' },
          ].map((sb, i) => (
            <rect
              key={`sb-${i}`}
              x={sb.x}
              y={sb.y}
              width={sb.w}
              height={sb.h}
              rx={12}
              fill={sb.col}
              stroke="#2E2319"
              strokeWidth="2"
            />
          ))}
        </g>

        {/* Foreground Trench Timber Duckboards & Corrugated Iron */}
        <rect x="0" y="1420" width="1080" height="500" fill="#1C1713" />
        {/* Timber duckboard planks */}
        {[1440, 1485, 1530, 1575, 1620, 1665, 1710].map((py, idx) => (
          <g key={`plank-${idx}`}>
            <rect x="120" y={py} width="840" height="32" rx="4" fill="#3D2B1D" stroke="#251810" strokeWidth="2" />
            <circle cx="160" cy={py + 16} r="3" fill="#17100B" />
            <circle cx="920" cy={py + 16} r="3" fill="#17100B" />
          </g>
        ))}

        {/* Rusted Trench Barbed Wire Entanglement */}
        <g id="trench-barbed-wire" opacity="0.85">
          <line x1="80" y1="1230" x2="1000" y2="1245" stroke="#78350F" strokeWidth="2.5" />
          <line x1="60" y1="1255" x2="1020" y2="1265" stroke="#9A3412" strokeWidth="2.5" />
          {[120, 260, 400, 680, 820, 960].map((wx, wi) => (
            <g key={`wire-knot-${wi}`}>
              <line x1={wx - 10} y1={1225} x2={wx + 10} y2={1245} stroke="#B45309" strokeWidth="2" />
              <line x1={wx - 10} y1={1245} x2={wx + 10} y2={1225} stroke="#B45309" strokeWidth="2" />
              <line x1={wx} y1={1215} x2={wx} y2={1270} stroke="#451A03" strokeWidth="3.5" />
            </g>
          ))}
        </g>

        {/* Ambient Battlefield Backlighting Aura */}
        <AmberBattlefieldAura
          cx={540}
          cy={1180}
          rx={480}
          ry={280}
          intensity={0.88}
          id="sommeBattlefieldAura"
          color="#D97706"
        />

        {/* SURVIVAL VICTORY SUNBURST RAYS (on frame >= survivalFrame) */}
        {isSurvived && (
          <g
            id="victory-rays"
            transform={`translate(540, 1120) rotate(${auraRot})`}
            opacity={auraOpacity * 0.45}
          >
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <polygon
                key={`v-ray-${deg}`}
                points="0,0 -24,-520 24,-520"
                fill="url(#victorySunburst)"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>
        )}

        {/* 2. LAYER 2: BALLISTIC SNIPER ROUND TRAJECTORY & SHOCKWAVES */}
        {/* Enemy Sniper Muzzle Flash at Distance (frames 28-31) */}
        {frame >= 28 && frame <= 32 && (
          <g transform={`translate(${sniperStartX}, ${sniperStartY})`}>
            <circle cx="0" cy="0" r={22 * (1 - (frame - 28) / 5)} fill="#FFFFFF" />
            <circle cx="0" cy="0" r={45 * (1 - (frame - 28) / 5)} fill="rgba(245, 158, 11, 0.7)" />
            <line x1="-30" y1="0" x2="45" y2="0" stroke="#FEF08A" strokeWidth="3" />
          </g>
        )}

        {/* Inbound Supersonic Tracer (frames 28-31) */}
        {frame >= 28 && frame <= 31 && (
          <g id="inbound-tracer">
            {/* Mach Conical Shockwave */}
            <line
              x1={sniperStartX}
              y1={sniperStartY}
              x2={bulletCurrentX}
              y2={bulletCurrentY}
              stroke="rgba(239, 68, 68, 0.4)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Fiery Orange Outer Beam */}
            <line
              x1={sniperStartX}
              y1={sniperStartY}
              x2={bulletCurrentX}
              y2={bulletCurrentY}
              stroke="#EA580C"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Supersonic White-Hot Core */}
            <line
              x1={Math.max(sniperStartX, bulletCurrentX - 90)}
              y1={Math.max(sniperStartY, bulletCurrentY - 14)}
              x2={bulletCurrentX}
              y2={bulletCurrentY}
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Bullet Tip Star */}
            <circle cx={bulletCurrentX} cy={bulletCurrentY} r="7" fill="#FFFFFF" />
          </g>
        )}

        {/* Outbound Exit Tracer Through & Past Skull (frames 31-35) */}
        {frame >= 31 && frame <= 35 && (
          <g id="outbound-tracer">
            <line
              x1={skullExitX}
              y1={skullExitY}
              x2={exitBulletCurrentX}
              y2={exitBulletCurrentY}
              stroke="#EA580C"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1={skullExitX}
              y1={skullExitY}
              x2={exitBulletCurrentX}
              y2={exitBulletCurrentY}
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx={exitBulletCurrentX} cy={exitBulletCurrentY} r="6" fill="#FFFFFF" />
          </g>
        )}

        {/* Head Impact Detonation Flash & Expanding Shockwave Ring (frames 31-44) */}
        {isHit && hitAge <= 14 && (
          <g id="head-impact-detonation">
            {/* Expanding Shockwave Ring */}
            <circle
              cx={skullExitX}
              cy={skullExitY}
              r={shockwaveR}
              fill="none"
              stroke="#EF4444"
              strokeWidth={4 * (1 - hitAge / 14)}
              opacity={shockwaveOpacity}
            />
            {/* Blinding White Core Starburst on Impact Frame */}
            {hitAge <= 5 && (
              <g>
                <circle cx={skullEntryX} cy={skullEntryY} r={28 * (1 - hitAge / 6)} fill="#FFFFFF" />
                <circle cx={skullExitX} cy={skullExitY} r={38 * (1 - hitAge / 6)} fill="#FFFFFF" />
                <circle cx={skullExitX} cy={skullExitY} r={55 * (1 - hitAge / 6)} fill="rgba(251, 191, 36, 0.75)" />
                {/* 8-Pointed Flash Star */}
                <polygon
                  points={`${skullExitX},${skullExitY - 55} ${skullExitX + 14},${skullExitY - 14} ${skullExitX + 55},${skullExitY} ${skullExitX + 14},${skullExitY + 14} ${skullExitX},${skullExitY + 55} ${skullExitX - 14},${skullExitY + 14} ${skullExitX - 55},${skullExitY} ${skullExitX - 14},${skullExitY - 14}`}
                  fill="#FEF08A"
                  opacity={1 - hitAge / 6}
                />
              </g>
            )}

            {/* Flying Shrapnel / Bone / Cap Fabric Particles from Exit Blowout */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((si) => {
              const seed = 1010 + si;
              const angle = -0.3 + pseudoRandom(seed) * 1.2; // Bursting rightward
              const speed = 12 + pseudoRandom(seed + 1) * 22;
              const px = skullExitX + Math.cos(angle) * (speed * hitAge);
              const py = skullExitY + Math.sin(angle) * (speed * hitAge) + (0.5 * 1.4 * hitAge * hitAge);
              const pSize = 3.5 + pseudoRandom(seed + 2) * 4;
              const pCol = si % 2 === 0 ? '#DC2626' : si % 3 === 0 ? '#F8FAFC' : '#450A0A';
              return (
                <circle
                  key={`shrapnel-${si}`}
                  cx={px}
                  cy={py}
                  r={pSize * (1 - hitAge / 14)}
                  fill={pCol}
                  opacity={1 - hitAge / 14}
                />
              );
            })}
          </g>
        )}

        {/* 3. LAYER 3: R.A.M.C. CASUALTY REPORT HUD CARD (Frames 66-127) */}
        {isSurvived && (
          <g
            id="casualty-report-card"
            transform={`translate(540, 895) scale(${cardScale})`}
            opacity={cardOpacity}
          >
            {/* Drop Shadow Card Outline */}
            <rect
              x="-260"
              y="-48"
              width="520"
              height="96"
              rx="8"
              fill="#FBF9F5"
              stroke="#CBD5E1"
              strokeWidth="2.5"
              filter="drop-shadow(0px 10px 18px rgba(0,0,0,0.65))"
            />
            {/* Card Inner Red Cross Box */}
            <rect x="-245" y="-35" width="68" height="70" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1.5" />
            {/* Geneva Red Cross */}
            <rect x="-215" y="-23" width="8" height="46" rx="2" fill="#DC2626" />
            <rect x="-234" y="-4" width="46" height="8" rx="2" fill="#DC2626" />

            {/* Monospace Field Report Text */}
            <text x="-165" y="-20" fill="#64748B" fontSize="12" fontWeight="800" letterSpacing="1.5" fontFamily="monospace">
              ARMY FORM B. 103 // CASUALTY REPORT
            </text>
            <text x="-165" y="0" fill="#0F172A" fontSize="16" fontWeight="900" letterSpacing="0.8" fontFamily="monospace">
              WOUND: PENETRATING SKULL (1916)
            </text>
            <text x="-165" y="20" fill="#475569" fontSize="13" fontWeight="800" letterSpacing="0.5" fontFamily="monospace">
              STATUS: <tspan fill="#DC2626" fontWeight="900">SURVIVED</tspan> · RETURNED TO DUTY
            </text>

            {/* Crimson Field Seal / Rubber Stamp: "FIT FOR ACTION" */}
            <g transform="translate(180, 2) rotate(-12)">
              <rect
                x="-58"
                y="-20"
                width="116"
                height="40"
                rx="4"
                fill="none"
                stroke="#DC2626"
                strokeWidth="3"
                strokeDasharray="4 2"
              />
              <text
                x="0"
                y="-3"
                textAnchor="middle"
                fill="#DC2626"
                fontSize="12"
                fontWeight="900"
                letterSpacing="1"
                fontFamily="sans-serif"
              >
                FIT FOR ACTION
              </text>
              <text
                x="0"
                y="11"
                textAnchor="middle"
                fill="#DC2626"
                fontSize="10"
                fontWeight="800"
                letterSpacing="1.2"
                fontFamily="sans-serif"
              >
                RETURNED 1916
              </text>
            </g>
          </g>
        )}
      </svg>

      {/* 4. LAYER 4: SIR ADRIAN CARTON DE WIART CUTOUT PUPPET */}
      <CutoutPuppet
        character="CARTON_WWI"
        outfit="BRITISH_OFFICER"
        initialPose="AIM_REVOLVER"
        switchedPose="SKULL_HIT"
        poseSwitchFrame={31}
        secondSwitchedPose="SURVIVED_COMMAND"
        secondPoseSwitchFrame={66}
        bulletWounds={{
          skullHitFrame: 31,
          skullBandageFrame: 66,
          showSparks: true,
        }}
        x={540}
        y={1205 + recoilY}
        rotation={recoilRot}
        scale={1.16}
        paperTagLabel={frame < 66 ? tagLabel : undefined}
      />
    </div>
  );
};

// =========================================================================
// 11. SCENE 11: VICTORIA_CROSS_BRONZE_CARD (Quote Card)
// High-Precision Parametric Victoria Cross Citation Plaque & Medal
// =========================================================================
export const VictoriaCrossBronzeCard: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();

  // Entrance push-in scale
  const cardScale = interpolate(frame, [0, 40], [0.94, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Transient impact shake at frame 32 (when HIGHEST BRITISH GALLANTRY lands)
  const impactShake = interpolate(
    frame,
    [31, 33, 36, 40],
    [0, 5, -2, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Rotating tactile paper sunburst
  const rotSunburst = (frame * 0.35) % 360;

  // War Office red wax seal stamp animation (lands at frame 32 with stamp_slam)
  const sealScale = interpolate(frame, [29, 32, 36], [1.8, 0.95, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sealOpacity = interpolate(frame, [29, 31], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          transform: `translateY(${impactShake}px)`,
        }}
      >
        <defs>
          <linearGradient id="parchmentCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#251912" />
            <stop offset="50%" stopColor="#1E140E" />
            <stop offset="100%" stopColor="#170F0B" />
          </linearGradient>

          <linearGradient id="goldBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="30%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <radialGradient id="waxSealGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="40%" stopColor="#B91C1C" />
            <stop offset="85%" stopColor="#7F1D1D" />
            <stop offset="100%" stopColor="#450A0A" />
          </radialGradient>
        </defs>

        {/* 1. Volumetric Amber Battlefield Atmosphere */}
        <AmberBattlefieldAura cx={540} cy={1180} rx={480} ry={270} intensity={0.9} id="vcAura" color="#D97706" />

        {/* 2. Rotating Tactile Sunburst Gold Paper Rays */}
        <g transform={`translate(540, 1170) rotate(${rotSunburst})`} opacity="0.14">
          {[...Array(24)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={Math.cos((i * Math.PI) / 12) * 440}
              y2={Math.sin((i * Math.PI) / 12) * 440}
              stroke="#F59E0B"
              strokeWidth="14"
            />
          ))}
        </g>

        {/* 3. Archival War Office Docket / London Gazette Citation Plaque */}
        <g
          transform={`translate(540, 1170) scale(${cardScale})`}
          style={{ filter: 'drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.75))' }}
        >
          {/* Card Outer Shadow & Foundation */}
          <rect
            x="-330"
            y="-290"
            width="660"
            height="580"
            rx="8"
            fill="url(#parchmentCardGrad)"
            stroke="#451A03"
            strokeWidth="2"
          />

          {/* Double Gold Foil Border */}
          <rect
            x="-322"
            y="-282"
            width="644"
            height="564"
            rx="6"
            fill="none"
            stroke="url(#goldBorderGrad)"
            strokeWidth="1.8"
            opacity="0.8"
          />
          <rect
            x="-316"
            y="-276"
            width="632"
            height="552"
            rx="4"
            fill="none"
            stroke="#B45309"
            strokeWidth="0.8"
            opacity="0.5"
            strokeDasharray="6, 3"
          />

          {/* Dual Flanking Document Header Placards (Framing the crimson ribbon) */}
          <g transform="translate(0, -252)">
            {/* Left Header Placard */}
            <rect x="-305" y="-12" width="190" height="24" rx="3" fill="#150C07" stroke="#92400E" strokeWidth="1" />
            <text
              x="-210"
              y="4"
              textAnchor="middle"
              fill="#FDE68A"
              fontSize="11"
              fontFamily="Montserrat, sans-serif"
              fontWeight="800"
              letterSpacing="0.14em"
            >
              THE LONDON GAZETTE
            </text>

            {/* Right Header Placard */}
            <rect x="115" y="-12" width="190" height="24" rx="3" fill="#150C07" stroke="#92400E" strokeWidth="1" />
            <text
              x="210"
              y="4"
              textAnchor="middle"
              fill="#FDE68A"
              fontSize="11"
              fontFamily="Montserrat, sans-serif"
              fontWeight="800"
              letterSpacing="0.14em"
            >
              SUPPLEMENT NO. 29740
            </text>
          </g>

          {/* Lower Citation Documentation (Balanced across left-center to clear wax seal) */}
          <g transform="translate(-40, 202)">
            {/* Recipient Full Name */}
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fill="#FBBF24"
              fontSize="15.5"
              fontFamily="Montserrat, sans-serif"
              fontWeight="900"
              letterSpacing="0.05em"
            >
              CAPT. (T./LT.-COL.) ADRIAN CARTON DE WIART, D.S.O.
            </text>

            {/* Regiment */}
            <text
              x="0"
              y="22"
              textAnchor="middle"
              fill="#E2E8F0"
              fontSize="12.5"
              fontFamily="Montserrat, sans-serif"
              fontWeight="700"
              letterSpacing="0.1em"
            >
              8TH BATTALION · GLOUCESTERSHIRE REGIMENT
            </text>

            {/* Official Citation Action */}
            <text
              x="0"
              y="44"
              textAnchor="middle"
              fill="#EF4444"
              fontSize="11.5"
              fontFamily="Montserrat, sans-serif"
              fontWeight="800"
              letterSpacing="0.06em"
            >
              "FOR MOST CONSPICUOUS BRAVERY AT LA BOISSELLE, SOMME"
            </text>
          </g>

          {/* 4. War Office Red Embossed Wax Seal (Stamped at frame 32) */}
          {frame >= 29 && (
            <g
              transform={`translate(255, 218) scale(${sealScale})`}
              opacity={sealOpacity}
              style={{ filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.8))' }}
            >
              {/* Wax Seal Outer Ruffled Edge */}
              <circle cx="0" cy="0" r="30" fill="url(#waxSealGrad)" stroke="#450A0A" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="24" fill="none" stroke="#F87171" strokeWidth="1.2" opacity="0.6" />
              <circle cx="0" cy="0" r="22" fill="none" stroke="#450A0A" strokeWidth="1" />

              {/* Embossed Crown Monogram */}
              <path
                d="M -9 2 L 9 2 L 7 -5 L 3 -1 L 0 -7 L -3 -1 L -7 -5 Z"
                fill="#FEF08A"
                stroke="#7F1D1D"
                strokeWidth="0.8"
              />
              <circle cx="0" cy="-7" r="1.1" fill="#FFFFFF" />
              <circle cx="-7" cy="-5" r="0.9" fill="#FFFFFF" />
              <circle cx="7" cy="-5" r="0.9" fill="#FFFFFF" />

              {/* Seal Inscription */}
              <text
                x="0"
                y="13"
                textAnchor="middle"
                fill="#FEE2E2"
                fontSize="6"
                fontFamily="Montserrat, sans-serif"
                fontWeight="900"
                letterSpacing="0.14em"
              >
                WAR OFFICE
              </text>
            </g>
          )}

          {/* Corner Vintage Paper Clips / Brackets */}
          <path d="M -320 -260 L -320 -280 L -300 -280" fill="none" stroke="#D97706" strokeWidth="2" opacity="0.7" />
          <path d="M 320 -260 L 320 -280 L 300 -280" fill="none" stroke="#D97706" strokeWidth="2" opacity="0.7" />
          <path d="M -320 260 L -320 280 L -300 280" fill="none" stroke="#D97706" strokeWidth="2" opacity="0.7" />
          <path d="M 320 260 L 320 280 L 300 280" fill="none" stroke="#D97706" strokeWidth="2" opacity="0.7" />
        </g>

        {/* 5. HERO VICTORIA CROSS MEDAL (Multi-tiered bronze casting & crimson ribbon) */}
        <VictoriaCrossMedal
          x={540}
          y={1170}
          scale={1.08 * cardScale}
          shimmerTriggerFrame={32}
        />

        {/* 6. Floating Golden Sparkle Particles / Ambient Field Embers */}
        {[
          { x: 380, y: 980, r: 2.2, seed: 1 },
          { x: 700, y: 1040, r: 1.8, seed: 2 },
          { x: 340, y: 1260, r: 2.5, seed: 3 },
          { x: 720, y: 1300, r: 2.0, seed: 4 },
          { x: 420, y: 1380, r: 1.6, seed: 5 },
          { x: 660, y: 940, r: 2.4, seed: 6 },
        ].map((pt, i) => {
          const dy = Math.sin((frame + pt.seed * 30) * 0.08) * 8;
          const pAlpha = 0.3 + 0.5 * Math.sin((frame + pt.seed * 20) * 0.06);
          return (
            <circle
              key={`vc-sparkle-${i}`}
              cx={pt.x}
              cy={pt.y + dy}
              r={pt.r}
              fill="#FDE68A"
              opacity={pAlpha}
              style={{ filter: 'drop-shadow(0px 0px 4px #F59E0B)' }}
            />
          );
        })}
      </svg>
    </div>
  );
};

// =========================================================================
// 12. SCENE 12: POLISH_SOVIET_BORDER_MAP_VECTOR (Vector Map)
// Reconstructed from official 1920 operational maps: Battle of Warsaw & August 1920 Frontlines
// =========================================================================
export const PolishSovietBorderMapVector: React.FC<{ durationFrames?: number }> = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1170} rx={480} ry={270} intensity={0.75} id="polandMapAura" color="#D97706" />
        <PolishSovietWarMap x={540} y={1170} scale={1.0} />
      </svg>
    </div>
  );
};

// =========================================================================
// 13. SCENE 13: BIPLANE_SMOKING_CRASH_WRECK (Structural Fracture / Vehicle Wreckage)
// Authentic parametric biplane crash in Polish marshland + Adrian walking away unhurt
// =========================================================================
export const BiplaneSmokingCrashWreck: React.FC<{ durationFrames?: number }> = ({ durationFrames = 159 }) => {
  return <BiplaneCrashScene durationFrames={durationFrames} />;
};

// =========================================================================
// 14. SCENE 14: COSSACK_CAVALRY_VS_TRAIN_SPLIT (Kinetic Train-Top Duel)
// High-speed running gunfight on speeding Polish Armoured Train "Śmiały"
// Adrian Carton de Wiart fights one-handed with Webley revolver against Red Army Cossack cavalry
// =========================================================================
export const CossackCavalryVsTrainSplit: React.FC<{ durationFrames?: number }> = ({ durationFrames }) => {
  return <CossackTrainDuel durationFrames={durationFrames} />;
};

// =========================================================================
// 15. SCENE 15: ARMOURED_TRAIN_HIGH_SPEED_LEAP (Vehicle In Transit / Structural Fracture)
// Authentic parametric Polish Armoured Train P.P. "Śmiały" with Adrian Carton de Wiart
// executing a one-handed running leap back onto the moving footplate at Frame 32
// =========================================================================
export const ArmouredTrainHighSpeedLeap: React.FC<{ durationFrames?: number }> = ({ durationFrames }) => {
  return <TrainLeapScene durationFrames={durationFrames} />;
};

// =========================================================================
// 16. SCENE 16: CARTON_MAJOR_GENERAL_WW2 (Lone Leader)
// 1939 WWII Major General: Scarlet collar tabs, rank insignia, London blitz searchlights
// =========================================================================
export const CartonMajorGeneralWw2: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();
  const searchlightPan = Math.sin(frame * 0.05) * 80;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1180} rx={440} ry={250} intensity={0.75} id="ww2Aura" />

        {/* London Blitz Radiant Searchlight Beams */}
        <polygon
          points={`280,1400 ${480 + searchlightPan},880 ${540 + searchlightPan},880 320,1400`}
          fill="#BAE6FD"
          opacity="0.16"
        />
        <polygon
          points={`800,1400 ${620 - searchlightPan},880 ${680 - searchlightPan},880 840,1400`}
          fill="#BAE6FD"
          opacity="0.16"
        />
      </svg>

      {/* Major General Adrian Carton de Wiart in WWII Greatcoat */}
      <CutoutPuppet
        character="CARTON_WWII"
        outfit="WW2_GREATCOAT"
        initialPose="NEUTRAL"
        switchedPose="SALUTE"
        poseSwitchFrame={42}
        x={540}
        y={1180}
        scale={1.12}
        paperTagLabel="MAJ. GEN. CARTON DE WIART // 1939"
      />
    </div>
  );
};

// =========================================================================
// 17. SCENE 17: SUNDERLAND_FLYING_BOAT_FJORD (Vehicle In Transit)
// Traced authentic RAF Short Sunderland flying boat vector over Norwegian fjord
// =========================================================================
export const SunderlandFlyingBoatFjord: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();
  const waterWake = (frame * 3.5) % 180;
  const boatDriftY = Math.sin(frame * 0.08) * 8;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1180} rx={480} ry={250} intensity={0.7} id="sunderAura" color="#0284C7" />

        {/* Norwegian Fjord Mountains in Deep Slate Spruce */}
        <polygon points="0,1320 220,1080 440,1260 760,1040 1080,1280 1080,1920 0,1920" fill="#1E293B" />
        {/* Fjord Water in Deep Azure Navy */}
        <rect x="0" y="1320" width="1080" height="600" fill="#0C4A6E" />

        {/* Churning White Foam Water Wake */}
        {[1360, 1400].map((wy, idx) => (
          <line
            key={idx}
            x1="180"
            y1={wy}
            x2={920 - waterWake}
            y2={wy}
            stroke="#E0F2FE"
            strokeWidth="4"
            strokeDasharray="40, 20"
          />
        ))}

        {/* Traced High-Precision RAF Short Sunderland Flying Boat Vector */}
        <SunderlandFlyingBoatGroup
          x={540}
          y={1180 + boatDriftY}
          scale={0.88}
          fill="#2C3A47"
          stroke="#182430"
          strokeWidth={1.5}
        />
      </svg>
    </div>
  );
};

// =========================================================================
// 18. SCENE 18: BOMBER_OCEAN_IMPACT_SPLASH (Structural Fracture)
// Mediterranean ditching: Aquamarine waves, fractured wing, Carton swimming to shore
// =========================================================================
export const BomberOceanImpactSplash: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();
  const splashHeight = interpolate(frame - 32, [0, 8, 35], [0, 1, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1180} rx={480} ry={260} intensity={0.85} id="bomberSplashAura" color="#0284C7" />

        {/* Mediterranean Sea Waves */}
        <path d="M 0 1340 Q 280 1310 540 1340 T 1080 1320 L 1080 1920 L 0 1920 Z" fill="#0369A1" />

        {/* Sinking Bomber in RAF Camouflage */}
        <g transform="translate(420, 1310) rotate(32)">
          <path d="M -140 -20 L 60 -15 L 120 0 L 60 15 L -140 20 Z" fill="#334155" stroke="#1E293B" strokeWidth="3" />
          <line x1="-30" y1="-80" x2="-30" y2="80" stroke="#475569" strokeWidth="15" />
        </g>

        {/* Towering White Geyser Splash */}
        {splashHeight > 0.05 && (
          <g transform="translate(480, 1330)">
            <ellipse cx="0" cy="0" rx={85 * splashHeight} ry={22 * splashHeight} fill="#F0F9FF" opacity="0.85" />
            <path
              d={`M -45 0 Q -75 -${145 * splashHeight} 0 -${190 * splashHeight} Q 75 -${145 * splashHeight} 45 0 Z`}
              fill="#F0F9FF"
              opacity="0.9"
            />
          </g>
        )}
      </svg>

      {/* Carton de Wiart swimming to shore through stormy Mediterranean waves */}
      <CutoutPuppet
        character="CARTON_WWII"
        outfit="WW2_GREATCOAT"
        initialPose="SWIMMING"
        switchedPose="SWIMMING"
        x={680}
        y={1280}
        scale={0.92}
        paperTagLabel="PLANE DITCHED // SWAM 1 MILE ASHORE"
      />
    </div>
  );
};

// =========================================================================
// 19. SCENE 19: VINCIGLIATA_CASTLE_POW_SPLIT (Split Confrontation)
// Traced authentic Castello di Vincigliata vector + barred fortress prison window
// =========================================================================
export const VincigliataCastlePowSplit: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1180} rx={480} ry={250} intensity={0.7} id="vincAura" />

        {/* Split Line in Brass */}
        <line x1="540" y1="880" x2="540" y2="1480" stroke="#F59E0B" strokeWidth="3" strokeDasharray="10, 6" />

        {/* LEFT: Traced Authentic Castello di Vincigliata Fortress Vector */}
        <VincigliataFortressGroup
          x={320}
          y={1180}
          scale={0.55}
          fill="#4A3F34"
          stroke="#2C241D"
          strokeWidth={1.5}
        />

        {/* RIGHT: High Security Heavy Steel Barred Window */}
        <g transform="translate(680, 1040)">
          <rect x="0" y="0" width="240" height="320" rx="120" fill="#1E293B" stroke="#475569" strokeWidth="6" />
          {[35, 75, 115, 155, 195].map((bx) => (
            <line key={bx} x1={bx} y1="10" x2={bx} y2="310" stroke="#94A3B8" strokeWidth="8" />
          ))}
          <line x1="10" y1="110" x2="230" y2="110" stroke="#475569" strokeWidth="11" />
          <line x1="10" y1="210" x2="230" y2="210" stroke="#475569" strokeWidth="11" />
        </g>
      </svg>

      {/* Carton de Wiart imprisoned in Vincigliata planning breakout */}
      <CutoutPuppet
        character="CARTON_WWII"
        outfit="WW2_GREATCOAT"
        initialPose="NEUTRAL"
        switchedPose="NEUTRAL"
        x={720}
        y={1200}
        scale={0.92}
        paperTagLabel="CASTELLO DI VINCIGLIATA // POW"
      />
    </div>
  );
};

// =========================================================================
// 20. SCENE 20: BEDROCK_TUNNEL_BREAKOUT_FRACTURE (Structural Fracture)
// Subterranean cross section: Stratified Tuscan clay, timber props, one-handed tunneling
// =========================================================================
export const BedrockTunnelBreakoutFracture: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1180} rx={480} ry={250} intensity={0.8} id="tunnelAura" color="#D97706" />

        {/* Surface Grass Line */}
        <line x1="120" y1="1100" x2="960" y2="1100" stroke="#4D7C0F" strokeWidth="6" />
        {/* Stratified Tuscan Soil Layers */}
        <rect x="120" y="1100" width="840" height="120" fill="#854D0E" />
        <rect x="120" y="1220" width="840" height="240" fill="#4B3A2C" />

        {/* The Hand-Dug Tunnel Void */}
        <path
          d="M 220 1260 Q 380 1280 540 1240 T 780 1140 L 780 1100 L 730 1100 Q 560 1200 380 1240 T 220 1220 Z"
          fill="#1C1813"
          stroke="#5C4533"
          strokeWidth="3"
        />

        {/* Timber Shoring Props */}
        <line x1="360" y1="1230" x2="360" y2="1280" stroke="#78350F" strokeWidth="7" />
        <line x1="520" y1="1210" x2="520" y2="1255" stroke="#78350F" strokeWidth="7" />
      </svg>

      {/* Carton de Wiart escaping through hand-dug tunnel with one hand */}
      <CutoutPuppet
        character="CARTON_WWII"
        outfit="WW2_GREATCOAT"
        initialPose="LEAPING"
        switchedPose="LEAPING"
        x={580}
        y={1180}
        scale={0.92}
        paperTagLabel="DUG TUNNEL FOR 7 MONTHS WITH ONE HAND"
      />
    </div>
  );
};

// =========================================================================
// 21. SCENE 21: CARTON_PEASANT_DISGUISE_LEADER (Lone Leader)
// Traced authentic Tuscan Cypresses vector + Carton in peasant disguise
// =========================================================================
export const CartonPeasantDisguiseLeader: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1180} rx={460} ry={250} intensity={0.8} id="peasantAura" color="#F59E0B" />

        {/* Golden Tuscan Rolling Hills Horizon */}
        <path d="M 0 1340 Q 320 1280 640 1320 T 1080 1300 L 1080 1920 L 0 1920 Z" fill="#6B4B2A" />

        {/* Traced Authentic Tuscan Cypresses Vector */}
        <TuscanyCypressesGroup
          x={540}
          y={1220}
          scale={0.85}
          fill="#233020"
          stroke="#141C12"
          strokeWidth={1.5}
        />

        {/* Winding Country Dirt Road in Warm Sand */}
        <path d="M 440 1480 Q 520 1380 540 1320" stroke="#9C775D" strokeWidth="50" fill="none" />
      </svg>

      {/* Carton disguised as an Italian peasant evading Fascist patrols */}
      <CutoutPuppet
        character="CARTON_WWII"
        outfit="TUSCAN_PEASANT"
        initialPose="POINTING"
        switchedPose="NEUTRAL"
        poseSwitchFrame={42}
        x={540}
        y={1180}
        scale={1.08}
        paperTagLabel="PEASANT DISGUISE // 8 DAYS MUTE"
      />
    </div>
  );
};

// =========================================================================
// 22. SCENE 22: CARTON_VS_MAO_DIPLOMATIC_SPLIT (Split Confrontation)
// 1945 Chongqing conference: Dual Puppets: Sir Adrian Carton de Wiart vs. Chairman Mao
// =========================================================================
export const CartonVsMaoDiplomaticSplit: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1180} rx={480} ry={250} intensity={0.7} id="maoAura" />

        {/* Mahogany Negotiation Table across Center */}
        <rect x="180" y="1320" width="720" height="24" fill="#5A2508" stroke="#3D1804" strokeWidth="2.5" />

        {/* Center Split Axis */}
        <line x1="540" y1="880" x2="540" y2="1480" stroke="#F59E0B" strokeWidth="3" strokeDasharray="10, 6" />
      </svg>

      {/* Left Puppet: Sir Adrian Carton de Wiart (Churchill's Special Envoy) */}
      <CutoutPuppet
        character="CARTON_WWII"
        outfit="WW2_GREATCOAT"
        initialPose="POINTING"
        switchedPose="POINTING"
        x={350}
        y={1180}
        scale={1.0}
        paperTagLabel="CHURCHILL'S ENVOY"
      />

      {/* Right Puppet: Chairman Mao Zedong (Archival Photo Face + Mao Suit) */}
      <CutoutPuppet
        character="MAO"
        outfit="CHINESE_TUNIC"
        initialPose="NEUTRAL"
        switchedPose="SALUTE"
        poseSwitchFrame={45}
        x={730}
        y={1180}
        scale={1.0}
        paperTagLabel="CHAIRMAN MAO ZEDONG"
      />
    </div>
  );
};

// =========================================================================
// 23. SCENE 23: TOTAL_CAREER_WOUNDS_TALLY_BOARD (Crowd Tally)
// Tactical parchment board with brass corner plates, 11 wound points in crimson & gold
// =========================================================================
export const TotalCareerWoundsTallyBoard: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1180} rx={480} ry={260} intensity={0.75} id="tallyAura" />

        {/* Parchment Service Record Folio */}
        <rect x="180" y="940" width="720" height="500" rx="8" fill="#3B2A1C" stroke="#785536" strokeWidth="3" />
        {/* Polished Brass Corner Protectors */}
        <polygon points="180,940 220,940 180,980" fill="#F59E0B" />
        <polygon points="900,940 860,940 900,980" fill="#F59E0B" />

        {/* 11 Bullet Wounds with Glowing Red/Gold Targets */}
        {[
          { x: 420, y: 1040, label: 'EYE // 1914' },
          { x: 620, y: 1040, label: 'SKULL // 1916' },
          { x: 380, y: 1120, label: 'HAND // 1915' },
          { x: 660, y: 1120, label: 'EAR // 1916' },
          { x: 410, y: 1200, label: 'STOMACH // 1899' },
          { x: 630, y: 1200, label: 'GROIN // 1899' },
          { x: 400, y: 1280, label: 'HIP // 1917' },
          { x: 640, y: 1280, label: 'ANKLE // 1917' },
          { x: 420, y: 1350, label: 'LEG // 1918' },
          { x: 620, y: 1350, label: 'CRASH // 1920' },
          { x: 520, y: 1390, label: 'DITCH // 1941' },
        ].map((w, idx) => (
          <g key={idx} transform={`translate(${w.x}, ${w.y})`}>
            <circle cx="0" cy="0" r="9" fill="#DC2626" />
            <circle cx="0" cy="0" r="15" fill="none" stroke="#FBBF24" strokeWidth="2" opacity="0.85" />
          </g>
        ))}
      </svg>

      {/* Carton de Wiart standing proud beside his service tally */}
      <CutoutPuppet
        character="CARTON_HERO"
        outfit="BRITISH_OFFICER"
        initialPose="NEUTRAL"
        switchedPose="SALUTE"
        poseSwitchFrame={45}
        x={520}
        y={1180}
        scale={0.96}
        paperTagLabel="11 WOUNDS // 2 WORLD WARS"
      />
    </div>
  );
};

// =========================================================================
// 24. SCENE 24: HAPPY_ODYSSEY_MEMOIR_DOSSIER (Quote Card)
// 1950 Memoir Folio: Rich burgundy cloth binding, gold foil stamped lettering, laurel wreath
// =========================================================================
export const HappyOdysseyMemoirDossier: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1180} rx={460} ry={250} intensity={0.7} id="memoirAura" color="#F59E0B" />

        {/* Burgundy Cloth Binding with Gold Embossed Trim */}
        <g transform="translate(540, 1180)">
          <rect x="-340" y="-140" width="680" height="280" rx="8" fill="#4C0519" stroke="#78350F" strokeWidth="3" />
          <rect x="-320" y="-120" width="640" height="240" rx="4" fill="#310310" stroke="#B45309" strokeWidth="2" />

          {/* Gold Foil Laurel Wreath Frame */}
          <path
            d="M -260 -70 Q -280 0 -260 70 M 260 -70 Q 280 0 260 70"
            stroke="#F59E0B"
            strokeWidth="4"
            fill="none"
          />

          {/* Central Memorial Crest */}
          <circle cx="0" cy="-30" r="34" fill="#4C0519" stroke="#F59E0B" strokeWidth="3.5" />
          <line x1="-16" y1="-30" x2="16" y2="-30" stroke="#DC2626" strokeWidth="4.5" />
          <line x1="0" y1="-46" x2="0" y2="-14" stroke="#DC2626" strokeWidth="4.5" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 25. SCENE 25: CARTON_FINAL_SEAMLESS_LOOP_HERO (Lone Leader / Final Loop CTA)
// The Unbroken Legend tribute in golden sunburst, looping seamlessly back to Scene 1
// =========================================================================
export const CartonFinalSeamlessLoopHero: React.FC<{ durationFrames?: number }> = () => {
  const frame = useCurrentFrame();
  const pushIn = interpolate(frame, [0, 140], [1.0, 1.06], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <AmberBattlefieldAura cx={540} cy={1140} rx={480} ry={280} intensity={0.9} id="finalAura" color="#F59E0B" />

        {/* Horizon Ground in Terracotta Sandstone */}
        <path d="M 0 1370 Q 280 1340 540 1360 T 1080 1350 L 1080 1920 L 0 1920 Z" fill="#2A1B14" />
      </svg>

      {/* Hero Tribute matching Scene 1 for seamless loop */}
      <CutoutPuppet
        character="CARTON_HERO"
        outfit="BRITISH_OFFICER"
        initialPose="SALUTE"
        switchedPose="SALUTE"
        x={540}
        y={1160}
        scale={1.12 * pushIn}
        paperTagLabel="THE UNKILLABLE SOLDIER"
      />
    </div>
  );
};
