import React from 'react';
import { useCurrentFrame, interpolate, Img, staticFile } from 'remotion';
import { loadFont as loadCaveat } from '@remotion/google-fonts/Caveat';
import { loadFont as loadCourierPrime } from '@remotion/google-fonts/CourierPrime';

const caveat = loadCaveat();
const courier = loadCourierPrime();

export type PuppetPose =
  | 'NEUTRAL'
  | 'SALUTE'
  | 'POINTING'
  | 'PITCHING'
  | 'STRUGGLING'
  | 'AIM_REVOLVER'
  | 'SWIMMING'
  | 'LEAPING'
  | 'GUT_SHOT'
  | 'EYE_CLUTCH'
  | 'HOLD_CLIPBOARD'
  | 'ARM_CLUTCH'
  | 'BITE_FINGERS'
  | 'SEVERED_FINGERS'
  | 'SURGEON_REFUSE'
  | 'SURGEON_SHOCKED';

export type PuppetOutfit =
  | 'FLIGHT_SUIT'
  | 'SERVICE_DRESS'
  | 'INSTRUCTOR_SUIT'
  | 'MUJIB_COAT'
  | 'KHAKI_GENERAL'
  | 'COMBAT_FATIGUES'
  | 'DIPLOMAT_SUIT'
  | 'POLITICIAN_SHERWANI'
  | 'CLINTON_PANTSUIT'
  | 'TALIBAN_VEST'
  | 'MILITANT_FATIGUES'
  | 'HIGH_ALTITUDE_SUIT'
  | 'SOVIET_PREMIER_SUIT'
  | 'PRESIDENTIAL_SUIT'
  | 'TRENCH_COAT'
  | 'BRITISH_OFFICER'
  | 'WW2_GREATCOAT'
  | 'TUSCAN_PEASANT'
  | 'CHINESE_TUNIC'
  | 'DOCTOR_COAT';

export interface BulletWoundsConfig {
  stomachHitFrame?: number;
  groinHitFrame?: number;
  eyeHitFrame?: number;
  earHitFrame?: number;
  armHitFrame?: number;
  biteHitFrame?: number;
  showSparks?: boolean;
}

export interface CutoutPuppetProps {
  character?:
    | 'MUJIB'
    | 'YAHYA'
    | 'TIKKA'
    | 'ZIA'
    | 'MINHAS'
    | 'INSTRUCTOR'
    | 'OFFICER'
    | 'CLINTON'
    | 'ZARDARI'
    | 'QURESHI'
    | 'TALIBAN'
    | 'ALQAEDA'
    | 'POWERS'
    | 'KHRUSHCHEV'
    | 'EISENHOWER'
    | 'ABEL'
    | 'CARTON_HERO'
    | 'CARTON_WWI'
    | 'CARTON_WWII'
    | 'CARTON_BOER'
    | 'DOCTOR'
    | 'MAO';
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  initialPose?: PuppetPose;
  switchedPose?: PuppetPose;
  poseSwitchFrame?: number;
  outfit?: PuppetOutfit;
  handwrittenLabel?: string;
  paperTagLabel?: string;
  ghostOnSwitch?: boolean;
  bulletWounds?: BulletWoundsConfig | boolean;
  children?: React.ReactNode;
}

const OUTFIT_COLORS: Record<PuppetOutfit, { torso: string; collar: string; accent: string }> = {
  FLIGHT_SUIT: { torso: '#233329', collar: '#162019', accent: '#F4B942' },
  SERVICE_DRESS: { torso: '#172230', collar: '#0E151F', accent: '#F4B942' },
  INSTRUCTOR_SUIT: { torso: '#2C1D1F', collar: '#1C1113', accent: '#E63946' },
  MUJIB_COAT: { torso: '#1C1E22', collar: '#EAE3D2', accent: '#C1272D' },
  KHAKI_GENERAL: { torso: '#4A4332', collar: '#2E291E', accent: '#F4B942' },
  COMBAT_FATIGUES: { torso: '#263829', collar: '#172419', accent: '#E63946' },
  DIPLOMAT_SUIT: { torso: '#1B263B', collar: '#E0E1DD', accent: '#415A77' },
  POLITICIAN_SHERWANI: { torso: '#111215', collar: '#EAE3D2', accent: '#C1272D' },
  CLINTON_PANTSUIT: { torso: '#204068', collar: '#F4EFE6', accent: '#F4B942' },
  TALIBAN_VEST: { torso: '#382B21', collar: '#E2D7C5', accent: '#C1272D' },
  MILITANT_FATIGUES: { torso: '#293325', collar: '#1B2317', accent: '#F4B942' },
  HIGH_ALTITUDE_SUIT: { torso: '#334036', collar: '#E07A5F', accent: '#F4A261' },
  SOVIET_PREMIER_SUIT: { torso: '#22252A', collar: '#D32F2F', accent: '#F4B942' },
  PRESIDENTIAL_SUIT: { torso: '#1B2432', collar: '#EAE3D2', accent: '#C1272D' },
  TRENCH_COAT: { torso: '#4A3E31', collar: '#2F251A', accent: '#D4A373' },
  BRITISH_OFFICER: { torso: '#3B3426', collar: '#2A251B', accent: '#DC2626' },
  WW2_GREATCOAT: { torso: '#2D281E', collar: '#1C1813', accent: '#F59E0B' },
  TUSCAN_PEASANT: { torso: '#5A4634', collar: '#EAE3D2', accent: '#8C6245' },
  CHINESE_TUNIC: { torso: '#334155', collar: '#1E293B', accent: '#DC2626' },
  DOCTOR_COAT: { torso: '#F5EFEB', collar: '#E2D9CE', accent: '#DC2626' },
};

const PHOTO_HEADS: Partial<Record<NonNullable<CutoutPuppetProps['character']>, string>> = {
  MINHAS: 'plates/rashid_minhas.jpg',
  MUJIB: 'plates/mujibur_rahman.jpg',
  YAHYA: 'plates/yahya_khan.png',
  ZIA: 'plates/ziaur_rahman.jpg',
  CLINTON: 'plates/hillary_clinton.jpg',
  ZARDARI: 'plates/asif_zardari.jpg',
  QURESHI: 'plates/shah_mahmood_qureshi.jpg',
  POWERS: 'plates/powers_portrait.jpg',
  KHRUSHCHEV: 'plates/khrushchev_portrait.jpg',
  EISENHOWER: 'plates/eisenhower_portrait.jpg',
  ABEL: 'plates/rudolf_abel.jpg',
  CARTON_HERO: 'plates/carton/carton_face.png',
  CARTON_WWI: 'plates/carton/carton_face.png',
  CARTON_WWII: 'plates/carton/carton_face.png',
  CARTON_BOER: 'plates/carton/carton_face.png',
  MAO: 'plates/carton/mao_and_chiang_1945.jpg',
};

export const CutoutPuppet: React.FC<CutoutPuppetProps> = ({
  character = 'MINHAS',
  x = 810,
  y = 1230,
  scale = 1.0,
  rotation = 0,
  initialPose = 'NEUTRAL',
  switchedPose,
  poseSwitchFrame = 64,
  outfit = 'FLIGHT_SUIT',
  handwrittenLabel,
  paperTagLabel,
  ghostOnSwitch = false,
  bulletWounds,
  children,
}) => {
  const frame = useCurrentFrame();
  const isCarton = character?.startsWith('CARTON_');

  // Determine active pose (switches on Beat 2 punchline frame!)
  const hasSwitched = switchedPose && frame >= poseSwitchFrame;
  const activePose: PuppetPose = hasSwitched ? switchedPose : initialPose;

  // Quantized 15fps stop-motion wiggle + pop on pose switch
  const steppedFrame = Math.floor(frame / 4);
  const wiggleDeg = (steppedFrame % 2 === 0 ? 1 : -1) * 1.4;
  const totalRotation = rotation + wiggleDeg;
  const switchPop =
    hasSwitched && frame - poseSwitchFrame < 6
      ? interpolate(frame - poseSwitchFrame, [0, 2, 6], [1.18, 1.05, 1.0], {
          extrapolateRight: 'clamp',
        })
      : 1.0;

  const isGhosted = ghostOnSwitch && frame >= poseSwitchFrame;
  const colors = OUTFIT_COLORS[outfit];

  // Resolve bullet wounds configuration
  const woundsConfig: BulletWoundsConfig | null = bulletWounds
    ? typeof bulletWounds === 'boolean'
      ? { stomachHitFrame: 22, groinHitFrame: 27, showSparks: true }
      : bulletWounds
    : null;

  const stomachHit = woundsConfig?.stomachHitFrame !== undefined && frame >= woundsConfig.stomachHitFrame;
  const stomachAge = woundsConfig?.stomachHitFrame !== undefined ? frame - woundsConfig.stomachHitFrame : -1;
  const stomachGrowth = interpolate(Math.max(0, stomachAge), [0, 24], [0.15, 1.0], {
    extrapolateRight: 'clamp',
  });

  const groinHit = woundsConfig?.groinHitFrame !== undefined && frame >= woundsConfig.groinHitFrame;
  const groinAge = woundsConfig?.groinHitFrame !== undefined ? frame - woundsConfig.groinHitFrame : -1;
  const groinGrowth = interpolate(Math.max(0, groinAge), [0, 26], [0.15, 1.0], {
    extrapolateRight: 'clamp',
  });

  const eyeHit = woundsConfig?.eyeHitFrame !== undefined && frame >= woundsConfig.eyeHitFrame;
  const eyeAge = woundsConfig?.eyeHitFrame !== undefined ? frame - woundsConfig.eyeHitFrame : -1;
  const eyeGrowth = interpolate(Math.max(0, eyeAge), [0, 24], [0.15, 1.0], {
    extrapolateRight: 'clamp',
  });

  const earHit = woundsConfig?.earHitFrame !== undefined && frame >= woundsConfig.earHitFrame;
  const earAge = woundsConfig?.earHitFrame !== undefined ? frame - woundsConfig.earHitFrame : -1;

  const armHit = woundsConfig?.armHitFrame !== undefined && frame >= woundsConfig.armHitFrame;
  const armAge = woundsConfig?.armHitFrame !== undefined ? frame - woundsConfig.armHitFrame : -1;
  const armGrowth = interpolate(Math.max(0, armAge), [0, 24], [0.15, 1.0], {
    extrapolateRight: 'clamp',
  });

  const biteHit = woundsConfig?.biteHitFrame !== undefined && frame >= woundsConfig.biteHitFrame;
  const biteAge = woundsConfig?.biteHitFrame !== undefined ? frame - woundsConfig.biteHitFrame : -1;
  const biteGrowth = interpolate(Math.max(0, biteAge), [0, 20], [0.2, 1.0], {
    extrapolateRight: 'clamp',
  });

  // Arm coordinates based on activePose
  const renderArms = (isOutline: boolean) => {
    const strokeCol = isOutline ? '#F4EFE6' : colors.torso;
    const strokeW = isOutline ? 56 : 34;
    const handCol = isOutline ? '#F4EFE6' : '#D9B391';
    const handR = isOutline ? 26 : 15;

    switch (activePose) {
      case 'BITE_FINGERS':
        return (
          <g>
            {/* Left arm: forearm angled up directly to mouth level */}
            <polyline
              points="-58,28 -52,-2 -4,-28"
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="-4" cy="-28" r={handR} fill={handCol} />

            {/* Non-outline inner details */}
            {!isOutline && (
              <g>
                {/* Field dressing wrap on left wrist */}
                <rect x="-16" y="-36" width="18" height="12" rx="2" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
                <ellipse cx="-7" cy="-30" rx="4" ry="2.5" fill="#DC2626" />
                {/* Shattered fingers hooked into jaws/teeth at mouth */}
                <path d="M -4 -28 L 2 -32 L 6 -30 L 0 -24 Z" fill="#D9B391" stroke="#991B1B" strokeWidth="1.5" />
              </g>
            )}

            {/* Right arm: reaches across chest to tightly steady/brace left wrist at mouth */}
            <polyline
              points="58,28 22,2 -6,-20"
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="-6" cy="-20" r={handR} fill={handCol} />
          </g>
        );
      case 'SEVERED_FINGERS':
        return (
          <g>
            {/* Left arm: recoils back down to chest level showing severed fingers */}
            <polyline
              points="-58,28 -48,52 -16,70"
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="-16" cy="70" r={handR} fill={handCol} />

            {/* Non-outline inner details for severed knuckle stumps */}
            {!isOutline && (
              <g>
                {/* Blood-soaked wrist gauze wrap */}
                <rect
                  x="-26"
                  y="62"
                  width="18"
                  height="14"
                  rx="2"
                  fill="#E2E8F0"
                  stroke="#7F1D1D"
                  strokeWidth="1.5"
                  transform="rotate(-15 -17 69)"
                />
                <ellipse cx="-17" cy="69" rx="5" ry="3" fill="#991B1B" />

                {/* Severed Palm Contour */}
                <ellipse cx="-16" cy="72" rx="12" ry="10" fill="#D9B391" />

                {/* Index finger stump - severed flesh and exposed bone core */}
                <ellipse cx="-20" cy="64" rx="4.5" ry="3.5" fill="#7F1D1D" stroke="#991B1B" strokeWidth="1" />
                <circle cx="-20" cy="64" r="1.8" fill="#F8FAFC" />

                {/* Middle finger stump - severed flesh and exposed bone core */}
                <ellipse cx="-13" cy="62" rx="4.5" ry="3.5" fill="#7F1D1D" stroke="#991B1B" strokeWidth="1" />
                <circle cx="-13" cy="62" r="1.8" fill="#F8FAFC" />

                {/* Remaining ring/pinky fingers curled inward */}
                <path d="M -9 70 Q -6 74 -10 78 Q -14 78 -12 73" fill="#C6946E" />
              </g>
            )}

            {/* Right arm: reaches across chest to tightly clamp left wrist to staunch blood */}
            <polyline
              points="58,28 14,56 -16,68"
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="-16" cy="68" r={handR} fill={handCol} />
          </g>
        );
      case 'SURGEON_REFUSE':
        return (
          <g>
            {/* Left arm: holding clipboard or hands down */}
            <line x1="-58" y1="28" x2="-85" y2="75" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="-85" cy="78" r={handR} fill={handCol} />
            {!isOutline && (
              <g>
                <rect x="-115" y="45" width="45" height="60" rx="3" fill="#6B4B32" stroke="#4A3422" strokeWidth="1.5" />
                <rect x="-110" y="52" width="35" height="48" fill="#FDFBF7" />
              </g>
            )}
            {/* Right arm: gesturing with palm outstretched in firm refusal */}
            <polyline
              points="58,28 102,10 115,-32"
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="115" cy="-35" r={handR} fill={handCol} />
            {!isOutline && (
              <ellipse cx="115" cy="-35" rx="14" ry="10" fill="#D9B391" transform="rotate(-30 115 -35)" />
            )}
          </g>
        );
      case 'SURGEON_SHOCKED':
        return (
          <g>
            {/* Both arms thrown high beside head in recoiling shock */}
            <line x1="-58" y1="28" x2="-96" y2="-68" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="-98" cy="-74" r={handR} fill={handCol} />
            <line x1="58" y1="28" x2="96" y2="-68" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="98" cy="-74" r={handR} fill={handCol} />
            {/* Dropped Surgical Forceps/Scalpel falling from hand */}
            {!isOutline && (
              <g transform="translate(108, -35) rotate(45)">
                <line x1="0" y1="0" x2="0" y2="28" stroke="#94A3B8" strokeWidth="2.5" />
                <line x1="-4" y1="6" x2="4" y2="6" stroke="#CBD5E1" strokeWidth="2" />
                <circle cx="-4" cy="28" r="3" fill="none" stroke="#94A3B8" strokeWidth="1.5" />
                <circle cx="4" cy="28" r="3" fill="none" stroke="#94A3B8" strokeWidth="1.5" />
              </g>
            )}
          </g>
        );
      case 'ARM_CLUTCH':
        return (
          <g>
            {/* Left arm: hangs down-inward with mangled shattered wrist at (-22, 92) */}
            <line x1="-58" y1="28" x2="-22" y2="88" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="-22" cy="92" r={handR} fill={handCol} />
            {/* Right arm: reaches across chest to tightly clamp onto the wounded left wrist */}
            <polyline
              points="58,28 15,62 -20,86"
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="-20" cy="86" r={handR} fill={handCol} />
          </g>
        );
      case 'HOLD_CLIPBOARD':
        return (
          <g>
            {/* Left arm holding clipboard with medical papers */}
            <line x1="-58" y1="28" x2="-85" y2="75" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="-85" cy="78" r={handR} fill={handCol} />
            {/* Clipboard backing */}
            <rect x="-115" y="45" width="45" height="60" rx="3" fill="#6B4B32" stroke="#4A3422" strokeWidth="1.5" />
            {/* Paper sheet */}
            <rect x="-110" y="52" width="35" height="48" fill="#FDFBF7" />
            {/* Red Geneva Cross on discharge form */}
            <rect x="-96" y="58" width="8" height="2" fill="#DC2626" />
            <rect x="-93" y="55" width="2" height="8" fill="#DC2626" />
            {/* Red Discharge Stamp lines */}
            <line x1="-105" y1="72" x2="-80" y2="72" stroke="#DC2626" strokeWidth="2" strokeDasharray="3, 1" />
            <line x1="-105" y1="80" x2="-84" y2="80" stroke="#71717A" strokeWidth="1.5" />
            {/* Right arm gesturing towards Carton */}
            <line x1="58" y1="28" x2="115" y2="52" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="118" cy="54" r={handR} fill={handCol} />
          </g>
        );
      case 'EYE_CLUTCH':
        return (
          <g>
            {/* Left arm thrown back in agony and recoil */}
            <line x1="-58" y1="28" x2="-120" y2="25" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="-125" cy="25" r={handR} fill={handCol} />
            {/* Right arm raised sharply to clutch face / shattered eye */}
            <polyline
              points="58,28 85,-22 28,-55"
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="26" cy="-58" r={handR} fill={handCol} />
          </g>
        );
      case 'GUT_SHOT':
        return (
          <g>
            {/* Left arm clutching stomach wound */}
            <line x1="-58" y1="28" x2="-14" y2="76" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="-14" cy="76" r={handR} fill={handCol} />
            {/* Right arm thrown back/up in violent recoil and agony */}
            <line x1="58" y1="28" x2="116" y2="-42" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="118" cy="-45" r={handR} fill={handCol} />
          </g>
        );
      case 'SALUTE':
        return (
          <g>
            {/* Left arm down */}
            <line x1="-62" y1="35" x2="-88" y2="125" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="-88" cy="130" r={handR} fill={handCol} />
            {/* Right arm raised in crisp salute to brow */}
            <polyline
              points="62,35 112,-10 72,-75"
              fill="none"
              stroke={strokeCol}
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="70" cy="-78" r={handR} fill={handCol} />
          </g>
        );
      case 'POINTING':
        return (
          <g>
            {/* Left arm down */}
            <line x1="-62" y1="35" x2="-88" y2="125" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="-88" cy="130" r={handR} fill={handCol} />
            {/* Right arm raised high waving/pointing (like reference 00:05 / 00:18) */}
            <line x1="62" y1="32" x2="108" y2="-75" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="110" cy="-82" r={handR} fill={handCol} />
          </g>
        );
      case 'PITCHING':
        return (
          <g>
            {/* Both arms spread wide horizontally (like reference 00:11 / 00:13 / 00:24) */}
            <line x1="-60" y1="35" x2="-135" y2="38" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="-142" cy="38" r={handR} fill={handCol} />
            <line x1="60" y1="35" x2="135" y2="38" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="142" cy="38" r={handR} fill={handCol} />
          </g>
        );
      case 'STRUGGLING':
        return (
          <g>
            {/* Both arms raised beside head in alarm/struggle (like reference 00:10 / 00:26 / 00:37) */}
            <line x1="-58" y1="28" x2="-92" y2="-68" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="-94" cy="-75" r={handR} fill={handCol} />
            <line x1="58" y1="28" x2="92" y2="-68" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="94" cy="-75" r={handR} fill={handCol} />
          </g>
        );
      case 'AIM_REVOLVER':
        return (
          <g>
            {/* Left pinned arm/sleeve */}
            <line x1="-62" y1="35" x2="-80" y2="95" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="-80" cy="100" r={handR} fill={handCol} />
            {/* Right arm extended forward holding Webley revolver */}
            <line x1="62" y1="32" x2="145" y2="10" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="148" cy="10" r={handR} fill={handCol} />
            {/* Webley Revolver */}
            <polygon points="144,4 178,4 178,16 158,16 154,26 144,24" fill="#1C1917" stroke="#3F3F46" strokeWidth="1" />
            {/* Muzzle Flash if armed */}
            <polygon points="178,10 198,4 192,10 205,10 192,14 198,18 178,12" fill="#F59E0B" />
            <circle cx="180" cy="10" r="4" fill="#FEF08A" />
          </g>
        );
      case 'SWIMMING':
        return (
          <g>
            {/* Swimming stroke pose */}
            <line x1="-58" y1="25" x2="-120" y2="-35" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="-124" cy="-38" r={handR} fill={handCol} />
            <line x1="58" y1="25" x2="115" y2="70" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="118" cy="74" r={handR} fill={handCol} />
          </g>
        );
      case 'LEAPING':
        return (
          <g>
            {/* Leaping pose reaching out */}
            <line x1="-58" y1="28" x2="-115" y2="-40" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="-118" cy="-44" r={handR} fill={handCol} />
            <line x1="58" y1="28" x2="125" y2="-15" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="128" cy="-18" r={handR} fill={handCol} />
          </g>
        );
      case 'NEUTRAL':
      default:
        return (
          <g>
            <line x1="-62" y1="35" x2="-82" y2="128" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="-82" cy="134" r={handR} fill={handCol} />
            <line x1="62" y1="35" x2="82" y2="128" stroke={strokeCol} strokeWidth={strokeW} strokeLinecap="round" />
            <circle cx="82" cy="134" r={handR} fill={handCol} />
          </g>
        );
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale * switchPop}) rotate(${totalRotation}deg)`,
        zIndex: 22,
        pointerEvents: 'none',
        opacity: isGhosted ? 0.42 : 1,
        filter: isGhosted
          ? 'grayscale(1) drop-shadow(0px 10px 18px rgba(0,0,0,0.6))'
          : 'drop-shadow(0px 14px 20px rgba(0, 0, 0, 0.78))',
      }}
    >
      {/* Optional Handwritten Cursive Character Label Above Head (like "Phyllis Gardner, Stanford") */}
      {handwrittenLabel && (
        <div
          style={{
            position: 'absolute',
            top: -42,
            left: '50%',
            transform: 'translateX(-50%) rotate(-3deg)',
            fontFamily: caveat.fontFamily,
            fontSize: 36,
            fontWeight: 700,
            color: '#EAE3D2',
            whiteSpace: 'nowrap',
            textShadow: '0 3px 10px rgba(0,0,0,0.95)',
          }}
        >
          {handwrittenLabel}
        </div>
      )}

      {/* Optional Torn Paper Name Tag Above Head (like "SHULTZ" / "WALL STREET JOURNAL") */}
      {paperTagLabel && (
        <div
          style={{
            position: 'absolute',
            top: -42,
            left: '50%',
            transform: 'translateX(-50%) rotate(-1.5deg)',
            backgroundColor: '#EAE3D2',
            padding: '5px 18px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.65)',
            clipPath: 'polygon(2% 0%, 98% 3%, 100% 95%, 97% 100%, 1% 97%, 0% 8%)',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              fontFamily: courier.fontFamily,
              fontSize: 21,
              fontWeight: 700,
              color: '#141619',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}
          >
            {paperTagLabel}
          </span>
        </div>
      )}

      {/* SVG Chibi Paper-Craft Body + Die-Cut White Sticker Border */}
      <svg
        width="360"
        height="420"
        viewBox="-180 -180 360 420"
        style={{ overflow: 'visible', display: 'block' }}
      >
        {/* LAYER 1: Thick White Paper Die-Cut Sticker Outline (#F4EFE6) */}
        <g>
          {/* Head Sticker Outline */}
          {!isCarton && <ellipse cx="0" cy="-72" rx="84" ry="94" fill="#F4EFE6" />}
          {/* Torso Sticker Outline */}
          <rect x="-78" y="-2" width="156" height="162" rx="34" fill="#F4EFE6" />
          {/* Legs & Shoes Sticker Outline */}
          <rect x="-64" y="135" width="54" height="75" rx="18" fill="#F4EFE6" />
          <rect x="10" y="135" width="54" height="75" rx="18" fill="#F4EFE6" />
          <ellipse cx="-42" cy="204" rx="36" ry="20" fill="#F4EFE6" />
          <ellipse cx="42" cy="204" rx="36" ry="20" fill="#F4EFE6" />
          {/* Arms Sticker Outline (Drawn on top of torso outline for clean silhouette) */}
          {renderArms(true)}
        </g>

        {/* LAYER 2: Chibi Paper-Craft Body Fill */}
        <g>
          {/* Legs */}
          <rect x="-54" y="138" width="36" height="62" rx="10" fill={colors.collar} />
          <rect x="18" y="138" width="36" height="62" rx="10" fill={colors.collar} />

          {/* Rounded Paper Shoes */}
          <ellipse cx="-40" cy="200" rx="26" ry="12" fill="#111317" />
          <ellipse cx="40" cy="200" rx="26" ry="12" fill="#111317" />

          {/* Stubby Torso Sweater / Flight Suit */}
          <rect x="-66" y="6" width="132" height="145" rx="26" fill={colors.torso} />

          {/* Center Seam & Collar Detail */}
          <line x1="0" y1="16" x2="0" y2="148" stroke="rgba(0,0,0,0.35)" strokeWidth="3" />
          <path d="M -28 8 L 0 28 L 28 8 Z" fill={colors.collar} />

          {/* Squadron / Rank Wing Badge on Chest */}
          <rect x="16" y="42" width="30" height="12" rx="3" fill={colors.accent} />
          <circle cx="-26" cy="48" r="9" fill={colors.accent} opacity="0.85" />

          {/* Articulated Arms - DRAWN ON TOP OF TORSO SO CROSS-BODY POSES ARE VISIBLE */}
          {renderArms(false)}
        </g>

        {/* LAYER 2.5: Ballistic Entry Holes, Spreading Blood Pools & Drips */}
        {woundsConfig && (
          <g id="bullet-damage-layer">
            {/* STOMACH WOUND */}
            {stomachHit && (
              <g id="stomach-wound">
                {/* 1. Organic Spreading Dark Blood Pool */}
                <path
                  d={`M ${-10 - 24 * stomachGrowth} 72 Q ${-10 - 18 * stomachGrowth} ${72 - 18 * stomachGrowth} -10 ${72 - 14 * stomachGrowth} Q ${-10 + 20 * stomachGrowth} ${72 - 16 * stomachGrowth} ${-10 + 26 * stomachGrowth} 72 Q ${-10 + 22 * stomachGrowth} ${72 + 20 * stomachGrowth} -10 ${72 + 18 * stomachGrowth} Q ${-10 - 22 * stomachGrowth} ${72 + 18 * stomachGrowth} ${-10 - 24 * stomachGrowth} 72 Z`}
                  fill="#3B0707"
                  opacity="0.9"
                />
                <ellipse cx="-10" cy="72" rx={18 * stomachGrowth} ry={13 * stomachGrowth} fill="#7F1D1D" />
                <ellipse cx="-10" cy="72" rx={12 * stomachGrowth} ry={8.5 * stomachGrowth} fill="#991B1B" />
                <ellipse cx="-11" cy="71" rx={6 * stomachGrowth} ry={4.5 * stomachGrowth} fill="#DC2626" opacity="0.85" />

                {/* 2. Torn Bullet Puncture Hole & Frayed Fibers */}
                <path
                  d="M -15 69 L -12 66 L -7 67 L -5 70 L -6 75 L -11 77 L -15 74 Z"
                  fill="#1C1814"
                  stroke="#0A0807"
                  strokeWidth="1.5"
                />
                <circle cx="-10" cy="72" r="4.2" fill="#030303" />

                {/* 3. Arterial Blood Drips Running Down Tunic */}
                {stomachAge > 4 && (
                  <path
                    d={`M -12 78 L -8 78 L -8 ${78 + Math.min(48, (stomachAge - 4) * 2.2)} Q -10 ${82 + Math.min(48, (stomachAge - 4) * 2.2)} -12 ${78 + Math.min(48, (stomachAge - 4) * 2.2)} Z`}
                    fill="#7F1D1D"
                  />
                )}
                {stomachAge > 4 && (
                  <circle cx="-10" cy={80 + Math.min(48, (stomachAge - 4) * 2.2)} r="3" fill="#991B1B" />
                )}
                {stomachAge > 9 && (
                  <path
                    d={`M -18 76 L -15 76 L -15 ${76 + Math.min(32, (stomachAge - 9) * 1.6)} Q -16.5 ${79 + Math.min(32, (stomachAge - 9) * 1.6)} -18 ${76 + Math.min(32, (stomachAge - 9) * 1.6)} Z`}
                    fill="#7F1D1D"
                  />
                )}
                {stomachAge > 14 && (
                  <path
                    d={`M -3 75 L 0 75 L 0 ${75 + Math.min(26, (stomachAge - 14) * 1.3)} Q -1.5 ${78 + Math.min(26, (stomachAge - 14) * 1.3)} -3 ${75 + Math.min(26, (stomachAge - 14) * 1.3)} Z`}
                    fill="#991B1B"
                  />
                )}

                {/* 4. High-Velocity Ballistic Entry Sparks & Starburst */}
                {woundsConfig.showSparks !== false && stomachAge >= 0 && stomachAge < 6 && (
                  <g>
                    <circle
                      cx="-10"
                      cy="72"
                      r={8 + stomachAge * 10}
                      stroke="#EF4444"
                      strokeWidth={3.5 * (1 - stomachAge / 6)}
                      fill="none"
                      opacity={1 - stomachAge / 6}
                    />
                    <polygon
                      points="-10,48 -6,67 12,72 -6,77 -10,96 -14,77 -32,72 -14,67"
                      fill="#FDE047"
                      opacity={1 - stomachAge / 6}
                    />
                    <circle cx="-10" cy="72" r={16 * (1 - stomachAge / 6)} fill="#FFFFFF" />
                  </g>
                )}
              </g>
            )}

            {/* GROIN WOUND */}
            {groinHit && (
              <g id="groin-wound">
                {/* 1. Organic Spreading Dark Blood Pool on Pelvis / Belt */}
                <path
                  d={`M ${8 - 26 * groinGrowth} 132 Q ${8 - 18 * groinGrowth} ${132 - 16 * groinGrowth} 8 ${132 - 13 * groinGrowth} Q ${8 + 22 * groinGrowth} ${132 - 15 * groinGrowth} ${8 + 28 * groinGrowth} 132 Q ${8 + 24 * groinGrowth} ${132 + 20 * groinGrowth} 8 ${132 + 18 * groinGrowth} Q ${8 - 22 * groinGrowth} ${132 + 18 * groinGrowth} ${8 - 26 * groinGrowth} 132 Z`}
                  fill="#3B0707"
                  opacity="0.92"
                />
                <ellipse cx="8" cy="132" rx={20 * groinGrowth} ry={13 * groinGrowth} fill="#7F1D1D" />
                <ellipse cx="8" cy="132" rx={14 * groinGrowth} ry={8.5 * groinGrowth} fill="#991B1B" />
                <ellipse cx="7" cy="131" rx={7 * groinGrowth} ry={4.5 * groinGrowth} fill="#DC2626" opacity="0.85" />

                {/* 2. Torn Bullet Entry Hole */}
                <ellipse cx="8" cy="132" rx="4.5" ry="3.8" fill="#030303" stroke="#1C1814" strokeWidth="1.5" />

                {/* 3. Arterial Streams Pouring Down Left & Right Trouser Legs */}
                {groinAge > 3 && (
                  <path
                    d={`M 6 138 L 14 138 L 17 ${138 + Math.min(58, (groinAge - 3) * 2.4)} L 10 ${138 + Math.min(58, (groinAge - 3) * 2.4)} Z`}
                    fill="#7F1D1D"
                  />
                )}
                {groinAge > 3 && (
                  <circle cx="13.5" cy={138 + Math.min(58, (groinAge - 3) * 2.4)} r="3.5" fill="#991B1B" />
                )}
                {groinAge > 6 && (
                  <path
                    d={`M 2 138 L -6 138 L -4 ${138 + Math.min(48, (groinAge - 6) * 2.0)} L 2 ${138 + Math.min(48, (groinAge - 6) * 2.0)} Z`}
                    fill="#7F1D1D"
                  />
                )}
                {groinAge > 6 && (
                  <circle cx="-1" cy={138 + Math.min(48, (groinAge - 6) * 2.0)} r="3" fill="#991B1B" />
                )}

                {/* 4. Ballistic Entry Flash at Groin */}
                {woundsConfig.showSparks !== false && groinAge >= 0 && groinAge < 6 && (
                  <g>
                    <circle
                      cx="8"
                      cy="132"
                      r={8 + groinAge * 10}
                      stroke="#F59E0B"
                      strokeWidth={3.5 * (1 - groinAge / 6)}
                      fill="none"
                      opacity={1 - groinAge / 6}
                    />
                    <polygon
                      points="8,110 11,127 28,132 11,137 8,154 5,137 -12,132 5,127"
                      fill="#FEF08A"
                      opacity={1 - groinAge / 6}
                    />
                    <circle cx="8" cy="132" r={15 * (1 - groinAge / 6)} fill="#FFFFFF" />
                  </g>
                )}
              </g>
            )}

            {/* SHATTERED LEFT ARM & HAND WOUND */}
            {armHit && (
              <g id="arm-shatter-wound">
                {/* 1. Shredded Torn Sleeve Cuff & Bone Fracture Core at (-22, 92) */}
                <ellipse cx="-22" cy="92" rx={20 * armGrowth} ry={15 * armGrowth} fill="#3B0707" opacity="0.95" />
                <ellipse cx="-22" cy="92" rx={14 * armGrowth} ry={10 * armGrowth} fill="#7F1D1D" />
                <ellipse cx="-22" cy="92" rx={9 * armGrowth} ry={6.5 * armGrowth} fill="#991B1B" />

                {/* Torn cloth fringe & jagged shrapnel puncture */}
                <polygon
                  points="-28,88 -20,84 -15,88 -14,96 -22,99 -29,95"
                  fill="#0A0606"
                  stroke="#1C1814"
                  strokeWidth="1.5"
                />
                <circle cx="-22" cy="92" r="4.2" fill="#020202" />

                {/* 2. Heavy Arterial Blood Streams Dripping from Mangled Hand onto Ground */}
                {armAge > 2 && (
                  <path
                    d={`M -25 96 L -20 96 L -21 ${96 + Math.min(65, (armAge - 2) * 2.5)} L -26 ${96 + Math.min(65, (armAge - 2) * 2.5)} Z`}
                    fill="#7F1D1D"
                  />
                )}
                {armAge > 2 && (
                  <circle cx="-23.5" cy={96 + Math.min(65, (armAge - 2) * 2.5)} r="3.5" fill="#991B1B" />
                )}
                {armAge > 6 && (
                  <path
                    d={`M -18 94 L -14 94 L -15 ${94 + Math.min(48, (armAge - 6) * 2.0)} L -19 ${94 + Math.min(48, (armAge - 6) * 2.0)} Z`}
                    fill="#991B1B"
                  />
                )}

                {/* 3. Ballistic Shrapnel Detonation Flash at Wrist */}
                {woundsConfig.showSparks !== false && armAge >= 0 && armAge < 6 && (
                  <g>
                    <circle
                      cx="-22"
                      cy="92"
                      r={8 + armAge * 10}
                      stroke="#EF4444"
                      strokeWidth={3.5 * (1 - armAge / 6)}
                      fill="none"
                      opacity={1 - armAge / 6}
                    />
                    <polygon
                      points="-22,70 -19,87 -2,92 -19,97 -22,114 -25,97 -42,92 -25,87"
                      fill="#FDE047"
                      opacity={1 - armAge / 6}
                    />
                    <circle cx="-22" cy="92" r={16 * (1 - armAge / 6)} fill="#FFFFFF" />
                  </g>
                )}
              </g>
            )}

            {/* BITTEN-OFF FINGERS TRAUMA */}
            {biteHit && (
              <g id="bite-damage-layer">
                {/* 1. Visceral Arterial Blood Spurt Arcing from Severed Knuckles */}
                {biteAge < 16 && (
                  <path
                    d={`M -18 68 Q ${-28 - biteAge * 2} ${45 - biteAge * 1.5} ${-38 - biteAge * 3} ${58 + biteAge * 2.5}`}
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth={Math.max(1, 3.5 - biteAge * 0.2)}
                    strokeDasharray="6, 3"
                    opacity={1 - biteAge / 18}
                  />
                )}

                {/* 2. Arterial Blood Streams Dripping from Severed Stump Down Tunic */}
                {biteAge > 1 && (
                  <path
                    d={`M -19 72 L -15 72 L -16 ${72 + Math.min(55, (biteAge - 1) * 2.4)} L -20 ${72 + Math.min(55, (biteAge - 1) * 2.4)} Z`}
                    fill="#7F1D1D"
                  />
                )}
                {biteAge > 1 && (
                  <circle cx="-18" cy={72 + Math.min(55, (biteAge - 1) * 2.4)} r="3.2" fill="#991B1B" />
                )}
                {biteAge > 5 && (
                  <path
                    d={`M -12 70 L -9 70 L -10 ${70 + Math.min(42, (biteAge - 5) * 1.8)} L -13 ${70 + Math.min(42, (biteAge - 5) * 1.8)} Z`}
                    fill="#991B1B"
                  />
                )}
                {biteAge > 5 && (
                  <circle cx="-11" cy={70 + Math.min(42, (biteAge - 5) * 1.8)} r="2.6" fill="#DC2626" />
                )}

                {/* 3. Ballistic Crunch Impact Flash at Mouth / Hand */}
                {woundsConfig.showSparks !== false && biteAge >= 0 && biteAge < 6 && (
                  <g>
                    <circle
                      cx="-4"
                      cy="-26"
                      r={6 + biteAge * 8}
                      stroke="#EF4444"
                      strokeWidth={3 * (1 - biteAge / 6)}
                      fill="none"
                      opacity={1 - biteAge / 6}
                    />
                    <polygon
                      points="-4,-44 0,-30 14,-26 0,-22 -4,-8 -8,-22 -22,-26 -8,-30"
                      fill="#FDE047"
                      opacity={1 - biteAge / 6}
                    />
                    <circle cx="-4" cy="-26" r={14 * (1 - biteAge / 6)} fill="#FFFFFF" />
                  </g>
                )}
              </g>
            )}
          </g>
        )}

        {/* LAYER 3: Illustrated Military Head for TIKKA, INSTRUCTOR, OFFICER */}
        {!PHOTO_HEADS[character] && (
          <g transform="translate(0, -72)">
            {/* Face Oval */}
            <ellipse cx="0" cy="0" rx="68" ry="76" fill="#C6946E" />
            {character === 'TIKKA' ? (
              <g>
                {/* Pakistan Army General Peaked Cap - Khaki crown, scarlet red band, gold general oak leaf */}
                <path d="M -72 -20 L 72 -20 L 62 -72 L -62 -72 Z" fill="#4A4332" />
                {/* Scarlet Red Staff Band */}
                <rect x="-70" y="-30" width="140" height="15" fill="#A82020" />
                {/* Gold Oak Leaf / Crest */}
                <circle cx="0" cy="-22" r="8" fill="#F4B942" stroke="#A46B10" strokeWidth="1" />
                <path d="M -12 -22 Q 0 -15 12 -22" stroke="#F4B942" strokeWidth="2.5" fill="none" />
                {/* Glossy Black Peaked Visor */}
                <path d="M -72 -16 Q 0 -2 72 -16 L 64 -24 L -64 -24 Z" fill="#0D0E11" />
                {/* Heavy Stern Eyebrows (General Tikka Khan) */}
                <path d="M -44 -10 L -12 -4" stroke="#1A1412" strokeWidth="6" strokeLinecap="round" />
                <path d="M 12 -4 L 44 -10" stroke="#1A1412" strokeWidth="6" strokeLinecap="round" />
                {/* Piercing Eyes */}
                <circle cx="-26" cy="4" r="5" fill="#1A1412" />
                <circle cx="26" cy="4" r="5" fill="#1A1412" />
                {/* Heavy Military Mustache */}
                <path d="M -28 24 Q 0 18 28 24 Q 0 34 -28 24 Z" fill="#1E1714" />
                {/* Firm Stern Jaw Line */}
                <line x1="-18" y1="40" x2="18" y2="40" stroke="#2B1810" strokeWidth="4.5" strokeLinecap="round" />
              </g>
            ) : character === 'INSTRUCTOR' ? (
              <g>
                <path d="M -68 -10 C -68 -85, 68 -85, 68 -10 Z" fill="#1E2733" />
                {/* Dark Instructor Visor */}
                <path d="M -56 -12 Q 0 12 56 -12 L 48 -36 Q 0 -22 -48 -36 Z" fill="#0B0F14" stroke="#E63946" strokeWidth="2.5" />
                {/* Stern Expression */}
                <line x1="-22" y1="36" x2="22" y2="32" stroke="#2B1810" strokeWidth="5" strokeLinecap="round" />
              </g>
            ) : character === 'TALIBAN' ? (
              <g>
                {/* Traditional Pashtun Woolen Pakol Cap */}
                <path d="M -64 -20 C -64 -78, 64 -78, 64 -20 Z" fill="#6A5949" />
                <ellipse cx="0" cy="-20" rx="66" ry="16" fill="#84715E" stroke="#524335" strokeWidth="2.5" />
                {/* Pakol Rim Folds */}
                <path d="M -45 -20 Q 0 -14 45 -20" stroke="#483A2E" strokeWidth="2" fill="none" />
                {/* Furrowed Brow */}
                <path d="M -42 -8 L -12 -2" stroke="#1A1412" strokeWidth="6" strokeLinecap="round" />
                <path d="M 12 -2 L 42 -8" stroke="#1A1412" strokeWidth="6" strokeLinecap="round" />
                {/* Piercing Eyes */}
                <circle cx="-24" cy="6" r="5" fill="#1A1412" />
                <circle cx="24" cy="6" r="5" fill="#1A1412" />
                {/* Mustache & Full Rugged Beard */}
                <path d="M -26 18 Q 0 10 26 18 Q 0 26 -26 18 Z" fill="#181310" />
                <path d="M -44 20 Q -48 76 0 88 Q 48 76 44 20 Q 30 42 -30 42 Z" fill="#181310" />
                {/* Nose Line */}
                <line x1="0" y1="6" x2="0" y2="18" stroke="#A87550" strokeWidth="3" strokeLinecap="round" />
              </g>
            ) : character === 'ALQAEDA' ? (
              <g>
                {/* Desert Keffiyeh / Shemagh Draped Headdress */}
                <path
                  d="M -68 -15 C -68 -85, 68 -85, 68 -15 L 78 55 L 52 55 L 50 -10 L -50 -10 L -52 55 L -78 55 Z"
                  fill="#EAE3D2"
                  stroke="#D0C8B6"
                  strokeWidth="2"
                />
                {/* Red Subtle Grid Accents on Headdress */}
                <line x1="-58" y1="-42" x2="58" y2="-42" stroke="#8E2A2B" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
                <line x1="-54" y1="-26" x2="54" y2="-26" stroke="#8E2A2B" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
                {/* Black Agal Headband Cord */}
                <line x1="-58" y1="-32" x2="58" y2="-32" stroke="#111316" strokeWidth="6" strokeLinecap="round" />
                <line x1="-54" y1="-24" x2="54" y2="-24" stroke="#111316" strokeWidth="5" strokeLinecap="round" />
                {/* Furrowed Eyebrows */}
                <path d="M -40 -6 L -10 -1" stroke="#14110E" strokeWidth="6" strokeLinecap="round" />
                <path d="M 10 -1 L 40 -6" stroke="#14110E" strokeWidth="6" strokeLinecap="round" />
                {/* Piercing Eyes */}
                <circle cx="-22" cy="7" r="5" fill="#14110E" />
                <circle cx="22" cy="7" r="5" fill="#14110E" />
                {/* Long Flowing Dark Beard */}
                <path d="M -24 16 Q 0 8 24 16 Q 0 24 -24 16 Z" fill="#14110E" />
                <path d="M -42 18 Q -46 84 0 96 Q 46 84 42 18 Q 28 42 -28 42 Z" fill="#14110E" />
                {/* Nose Line */}
                <line x1="0" y1="5" x2="0" y2="18" stroke="#A87550" strokeWidth="3" strokeLinecap="round" />
              </g>
            ) : character === 'DOCTOR' ? (
              <g>
                {/* British Army Doctor Officer Peaked Cap in Khaki with Maroon RAMC Staff Band */}
                <path d="M -70 -26 L 70 -26 L 58 -70 L -58 -70 Z" fill="#4A4332" />
                <rect x="-68" y="-36" width="136" height="15" fill="#881337" />
                {/* Gold RAMC Medical Crest (Rod of Asclepius) */}
                <circle cx="0" cy="-28" r="8" fill="#F4B942" stroke="#A46B10" strokeWidth="1" />
                <path d="M -2 -34 L 2 -34 L 1 -20 L -1 -20 Z" fill="#F4B942" />
                {/* Glossy Black Peaked Visor */}
                <path d="M -72 -26 Q 0 -12 72 -26 L 64 -34 L -64 -34 Z" fill="#0A0E14" />
                {/* Round Horn-Rimmed Medical Spectacles */}
                <circle cx="-24" cy="2" r="14" fill="none" stroke="#2B1A0E" strokeWidth="2.5" />
                <circle cx="24" cy="2" r="14" fill="none" stroke="#2B1A0E" strokeWidth="2.5" />
                <line x1="-10" y1="2" x2="10" y2="2" stroke="#2B1A0E" strokeWidth="2.5" />
                {/* Calm Intelligent Eyes behind Spectacles */}
                <circle cx="-24" cy="2" r="4.5" fill="#1A1412" />
                <circle cx="24" cy="2" r="4.5" fill="#1A1412" />
                {/* Trim British Military Mustache */}
                <path d="M -22 22 Q 0 16 22 22 Q 0 28 -22 22 Z" fill="#3D291F" />
                {/* Firm Medical Mouth */}
                <line x1="-14" y1="36" x2="14" y2="36" stroke="#2B1810" strokeWidth="3.5" strokeLinecap="round" />
              </g>
            ) : (
              <g>
                {/* Military / Police Officer Cap */}
                <path d="M -70 -26 L 70 -26 L 58 -70 L -58 -70 Z" fill="#243328" />
                <path d="M -72 -26 Q 0 -12 72 -26 L 64 -34 L -64 -34 Z" fill="#0A0E14" />
                <circle cx="0" cy="-48" r="9" fill="#E63946" />
                <circle cx="-24" cy="-2" r="6" fill="#1A1412" />
                <circle cx="24" cy="-2" r="6" fill="#1A1412" />
                <line x1="-18" y1="34" x2="18" y2="34" stroke="#2B1810" strokeWidth="4" strokeLinecap="round" />
              </g>
            )}
          </g>
        )}
      </svg>

      {/* LAYER 4: Archival Cutout Photo Head for Historical Figures */}
      {PHOTO_HEADS[character] && (
        <div
          style={{
            position: 'absolute',
            top: isCarton ? 12 : 24,
            left: '50%',
            width: isCarton ? 152 : 142,
            height: isCarton ? 184 : 164,
            transform: 'translateX(-50%)',
            borderRadius: isCarton ? '0px' : '50% 50% 46% 46%',
            overflow: isCarton ? 'visible' : 'hidden',
            border: isCarton ? 'none' : '2px solid rgba(20, 22, 25, 0.25)',
            backgroundColor: isCarton ? 'transparent' : '#D8CFC2',
            filter: isCarton
              ? 'drop-shadow(0px 0px 3px #F4EFE6) drop-shadow(0px 6px 12px rgba(0,0,0,0.65))'
              : undefined,
          }}
        >
          <Img
            src={staticFile(PHOTO_HEADS[character]!)}
            style={{
              width: '100%',
              height: isCarton ? '100%' : character === 'KHRUSHCHEV' ? '100%' : '128%',
              objectFit: isCarton ? 'contain' : 'cover',
              objectPosition: isCarton
                ? 'center bottom'
                : character === 'MUJIB'
                ? 'center 12%'
                : character === 'YAHYA'
                ? 'center 18%'
                : character === 'QURESHI'
                ? 'center 14%'
                : character === 'CLINTON'
                ? 'center 10%'
                : character === 'POWERS'
                ? 'center 12%'
                : character === 'KHRUSHCHEV'
                ? 'center 25%'
                : character === 'EISENHOWER'
                ? 'center 8%'
                : character === 'ABEL'
                ? 'center 16%'
                : character === 'MAO'
                ? 'center 12%'
                : 'center 15%',
              filter: isCarton ? 'contrast(1.08) brightness(1.02)' : 'contrast(1.15) brightness(1.02)',
            }}
          />

          {/* Eye, Ear & Bite Trauma Overlay */}
          {(eyeHit || earHit || biteHit) && (
            <svg
              viewBox="0 0 152 184"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'visible',
                pointerEvents: 'none',
              }}
            >
              {/* BITE BLOOD AT MOUTH & CHIN */}
              {biteHit && (
                <g id="bite-mouth-trauma">
                  {/* Blood smeared across lips & mustache */}
                  <ellipse cx="76" cy="140" rx={10 * biteGrowth} ry={5 * biteGrowth} fill="#450A0A" opacity="0.95" />
                  <ellipse cx="76" cy="140" rx={7 * biteGrowth} ry={3.5 * biteGrowth} fill="#7F1D1D" />
                  <ellipse cx="75" cy="139" rx={4 * biteGrowth} ry={2 * biteGrowth} fill="#DC2626" opacity="0.9" />

                  {/* Blood stream cascading down chin */}
                  {biteAge > 2 && (
                    <path
                      d={`M 74 143 L 78 143 L 77 ${143 + Math.min(32, (biteAge - 2) * 2.0)} L 73 ${143 + Math.min(32, (biteAge - 2) * 2.0)} Z`}
                      fill="#7F1D1D"
                    />
                  )}
                  {biteAge > 2 && (
                    <circle cx="75" cy={143 + Math.min(32, (biteAge - 2) * 2.0)} r="2.8" fill="#991B1B" />
                  )}

                  {/* Secondary blood trickle from corner of mouth */}
                  {biteAge > 5 && (
                    <path
                      d={`M 83 141 L 86 141 L 85 ${141 + Math.min(24, (biteAge - 5) * 1.6)} L 82 ${141 + Math.min(24, (biteAge - 5) * 1.6)} Z`}
                      fill="#991B1B"
                    />
                  )}

                  {/* Bite spark flash at lips */}
                  {woundsConfig.showSparks !== false && biteAge >= 0 && biteAge < 6 && (
                    <g>
                      <circle
                        cx="76"
                        cy="140"
                        r={4 + biteAge * 6}
                        stroke="#EF4444"
                        strokeWidth={2.5 * (1 - biteAge / 6)}
                        fill="none"
                        opacity={1 - biteAge / 6}
                      />
                      <circle cx="76" cy="140" r={8 * (1 - biteAge / 6)} fill="#FEF08A" />
                      <circle cx="76" cy="140" r={4 * (1 - biteAge / 6)} fill="#FFFFFF" />
                    </g>
                  )}
                </g>
              )}

              {/* SEVERED EAR GRAZE WOUND */}
              {(earHit || eyeHit) && (
                <g id="ear-graze">
                  <path d="M 124 92 L 138 94 L 132 104 L 122 98 Z" fill="#450A0A" />
                  <line x1="124" y1="94" x2="136" y2="97" stroke="#7F1D1D" strokeWidth="2.5" />
                  {/* Blood drip down neck from ear */}
                  {(earAge > 2 || eyeAge > 2) && (
                    <path
                      d={`M 126 98 L 130 98 L 129 ${98 + Math.min(50, Math.max(0, ((earAge > 2 ? earAge : eyeAge) - 2) * 1.8))} L 125 ${98 + Math.min(50, Math.max(0, ((earAge > 2 ? earAge : eyeAge) - 2) * 1.8))} Z`}
                      fill="#7F1D1D"
                    />
                  )}
                </g>
              )}

              {/* DESTROYED LEFT EYE TRAUMA */}
              {eyeHit && (
                <g id="eye-destroyed">
                  {/* 1. Organic Spreading Arterial Blood Pool over Eye Socket */}
                  <ellipse cx="98" cy="92" rx={20 * eyeGrowth} ry={15 * eyeGrowth} fill="#3B0707" opacity="0.95" />
                  <ellipse cx="98" cy="92" rx={14 * eyeGrowth} ry={11 * eyeGrowth} fill="#7F1D1D" />
                  <ellipse cx="98" cy="92" rx={9 * eyeGrowth} ry={7 * eyeGrowth} fill="#991B1B" />
                  <ellipse cx="96" cy="90" rx={5 * eyeGrowth} ry={3.5 * eyeGrowth} fill="#DC2626" opacity="0.9" />

                  {/* 2. Shattered Cavity & Jagged Puncture Edges */}
                  <polygon
                    points="88,88 95,83 105,85 108,92 104,100 94,99 88,93"
                    fill="#0A0606"
                    stroke="#1C0808"
                    strokeWidth="1.5"
                  />
                  <circle cx="98" cy="92" r="4.8" fill="#000000" />

                  {/* 3. Arterial Blood Runnels Cascading Down Cheek & Jaw */}
                  {eyeAge > 2 && (
                    <path
                      d={`M 96 98 L 100 98 L 99 ${98 + Math.min(55, (eyeAge - 2) * 2.2)} L 95 ${98 + Math.min(55, (eyeAge - 2) * 2.2)} Z`}
                      fill="#7F1D1D"
                    />
                  )}
                  {eyeAge > 2 && (
                    <circle cx="97.5" cy={98 + Math.min(55, (eyeAge - 2) * 2.2)} r="2.8" fill="#991B1B" />
                  )}

                  {eyeAge > 6 && (
                    <path
                      d={`M 106 95 L 109 95 L 108 ${95 + Math.min(68, (eyeAge - 6) * 2.0)} L 105 ${95 + Math.min(68, (eyeAge - 6) * 2.0)} Z`}
                      fill="#7F1D1D"
                    />
                  )}
                  {eyeAge > 6 && (
                    <circle cx="106.5" cy={95 + Math.min(68, (eyeAge - 6) * 2.0)} r="2.5" fill="#991B1B" />
                  )}

                  {eyeAge > 10 && (
                    <path
                      d={`M 88 96 L 91 96 L 90 ${96 + Math.min(38, (eyeAge - 10) * 1.5)} L 87 ${96 + Math.min(38, (eyeAge - 10) * 1.5)} Z`}
                      fill="#991B1B"
                    />
                  )}

                  {/* 4. Ballistic Entry Flash & Sparks */}
                  {woundsConfig.showSparks !== false && eyeAge >= 0 && eyeAge < 6 && (
                    <g>
                      <circle
                        cx="98"
                        cy="92"
                        r={8 + eyeAge * 10}
                        stroke="#EF4444"
                        strokeWidth={3.5 * (1 - eyeAge / 6)}
                        fill="none"
                        opacity={1 - eyeAge / 6}
                      />
                      <polygon
                        points="98,70 101,88 118,92 101,96 98,114 95,96 78,92 95,88"
                        fill="#FDE047"
                        opacity={1 - eyeAge / 6}
                      />
                      <circle cx="98" cy="92" r={16 * (1 - eyeAge / 6)} fill="#FFFFFF" />
                    </g>
                  )}
                </g>
              )}
            </svg>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
