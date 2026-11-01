import React from 'react';
import { useCurrentFrame, interpolate, Img, staticFile } from 'remotion';
import { loadFont as loadCaveat } from '@remotion/google-fonts/Caveat';
import { loadFont as loadCourierPrime } from '@remotion/google-fonts/CourierPrime';

const caveat = loadCaveat();
const courier = loadCourierPrime();

export type PuppetPose = 'NEUTRAL' | 'SALUTE' | 'POINTING' | 'PITCHING' | 'STRUGGLING';
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
  | 'TRENCH_COAT';

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
    | 'ABEL';
  x?: number;
  y?: number;
  scale?: number;
  initialPose?: PuppetPose;
  switchedPose?: PuppetPose;
  poseSwitchFrame?: number;
  outfit?: PuppetOutfit;
  handwrittenLabel?: string;
  paperTagLabel?: string;
  ghostOnSwitch?: boolean;
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
};

export const CutoutPuppet: React.FC<CutoutPuppetProps> = ({
  character = 'MINHAS',
  x = 810,
  y = 1230,
  scale = 1.0,
  initialPose = 'NEUTRAL',
  switchedPose,
  poseSwitchFrame = 64,
  outfit = 'FLIGHT_SUIT',
  handwrittenLabel,
  paperTagLabel,
  ghostOnSwitch = false,
}) => {
  const frame = useCurrentFrame();

  // Determine active pose (switches on Beat 2 punchline frame!)
  const hasSwitched = switchedPose && frame >= poseSwitchFrame;
  const activePose: PuppetPose = hasSwitched ? switchedPose : initialPose;

  // Quantized 15fps stop-motion wiggle + pop on pose switch
  const steppedFrame = Math.floor(frame / 4);
  const wiggleDeg = (steppedFrame % 2 === 0 ? 1 : -1) * 1.4;
  const switchPop =
    hasSwitched && frame - poseSwitchFrame < 6
      ? interpolate(frame - poseSwitchFrame, [0, 2, 6], [1.18, 1.05, 1.0], {
          extrapolateRight: 'clamp',
        })
      : 1.0;

  const isGhosted = ghostOnSwitch && frame >= poseSwitchFrame;
  const colors = OUTFIT_COLORS[outfit];

  // Arm coordinates based on activePose
  const renderArms = (isOutline: boolean) => {
    const strokeCol = isOutline ? '#F4EFE6' : colors.torso;
    const strokeW = isOutline ? 56 : 34;
    const handCol = isOutline ? '#F4EFE6' : '#D9B391';
    const handR = isOutline ? 26 : 15;

    switch (activePose) {
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
        transform: `translate(-50%, -50%) scale(${scale * switchPop}) rotate(${wiggleDeg}deg)`,
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
          <ellipse cx="0" cy="-72" rx="84" ry="94" fill="#F4EFE6" />
          {/* Arms Sticker Outline */}
          {renderArms(true)}
          {/* Torso Sticker Outline */}
          <rect x="-78" y="-2" width="156" height="162" rx="34" fill="#F4EFE6" />
          {/* Legs & Shoes Sticker Outline */}
          <rect x="-64" y="135" width="54" height="75" rx="18" fill="#F4EFE6" />
          <rect x="10" y="135" width="54" height="75" rx="18" fill="#F4EFE6" />
          <ellipse cx="-42" cy="204" rx="36" ry="20" fill="#F4EFE6" />
          <ellipse cx="42" cy="204" rx="36" ry="20" fill="#F4EFE6" />
        </g>

        {/* LAYER 2: Chibi Paper-Craft Body Fill */}
        <g>
          {/* Articulated Arms */}
          {renderArms(false)}

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
        </g>

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

      {/* LAYER 4: Archival Cutout Photo Head for Historical Figures (MUJIB, YAHYA, ZIA, MINHAS) */}
      {PHOTO_HEADS[character] && (
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: '50%',
            width: 142,
            height: 164,
            transform: 'translateX(-50%)',
            borderRadius: '50% 50% 46% 46%',
            overflow: 'hidden',
            border: '2px solid rgba(20, 22, 25, 0.25)',
            backgroundColor: '#D8CFC2',
          }}
        >
          <Img
            src={staticFile(PHOTO_HEADS[character]!)}
            style={{
              width: '100%',
              height: character === 'KHRUSHCHEV' ? '100%' : '128%',
              objectFit: 'cover',
              objectPosition:
                character === 'MUJIB'
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
                  : 'center 15%',
              filter: 'contrast(1.15) brightness(1.02)',
            }}
          />
        </div>
      )}
    </div>
  );
};
