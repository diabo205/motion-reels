import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export interface SilhouetteCharacterProps {
  figureType?: 'COMMANDER' | 'PILOT' | 'SOLDIER' | 'DIPLOMAT' | 'SCIENTIST' | 'CUSTOM';
  accentColor?: string; // Default: Signal Red (#E63228) or Amber (#F59E0B)
  accentProp?: 'SCARF' | 'CAP_BAND' | 'MEDAL' | 'ARMBAND' | 'HEADPHONES' | 'TIE' | 'NONE';
  backlightType?: 'AMBER_FIRE' | 'AURORA_CYAN' | 'RADAR_GREEN' | 'ICE_WHITE' | 'NONE';
  positionX?: number; // Default: centered (540)
  positionY?: number; // Default: within artwork zone (y: 864 - 1498)
  scale?: number;
  facing?: 'LEFT' | 'RIGHT';
  customSvgPath?: string;
  customAccentPath?: string;
}

const BACKLIGHT_GRADIENTS: Record<string, string> = {
  AMBER_FIRE: 'radial-gradient(ellipse at 50% 55%, rgba(245, 158, 11, 0.42) 0%, rgba(220, 38, 38, 0.18) 45%, rgba(0, 0, 0, 0) 75%)',
  AURORA_CYAN: 'radial-gradient(ellipse at 50% 55%, rgba(56, 189, 248, 0.38) 0%, rgba(14, 165, 233, 0.16) 45%, rgba(0, 0, 0, 0) 75%)',
  RADAR_GREEN: 'radial-gradient(ellipse at 50% 55%, rgba(34, 197, 94, 0.32) 0%, rgba(21, 128, 61, 0.14) 45%, rgba(0, 0, 0, 0) 75%)',
  ICE_WHITE: 'radial-gradient(ellipse at 50% 55%, rgba(244, 247, 250, 0.35) 0%, rgba(148, 163, 184, 0.15) 45%, rgba(0, 0, 0, 0) 75%)',
  NONE: 'none',
};

export const SilhouetteCharacter: React.FC<SilhouetteCharacterProps> = ({
  figureType = 'COMMANDER',
  accentColor = '#E63228',
  accentProp = 'SCARF',
  backlightType = 'AMBER_FIRE',
  positionX = 540,
  positionY = 1180,
  scale = 1.0,
  facing = 'RIGHT',
  customSvgPath,
  customAccentPath,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing / wind micro-motion so frame never freezes
  const breathY = Math.sin(frame / 18) * 3;
  const scarfWave = Math.sin(frame / 8) * 4;

  const flipTransform = facing === 'LEFT' ? 'scaleX(-1)' : 'scaleX(1)';
  const backlight = BACKLIGHT_GRADIENTS[backlightType] || BACKLIGHT_GRADIENTS.AMBER_FIRE;

  return (
    <div
      style={{
        position: 'absolute',
        left: positionX - 300,
        top: positionY - 320,
        width: 600,
        height: 640,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 15,
      }}
    >
      {/* 1. Atmospheric Backlighting Glow */}
      {backlightType !== 'NONE' && (
        <div
          style={{
            position: 'absolute',
            width: 580 * scale,
            height: 580 * scale,
            background: backlight,
            borderRadius: '50%',
            filter: 'blur(28px)',
            opacity: 0.88,
            zIndex: 1,
          }}
        />
      )}

      {/* 2. Stark Flat Silhouette Vector */}
      <svg
        viewBox="0 0 400 500"
        width={400 * scale}
        height={500 * scale}
        style={{
          position: 'relative',
          zIndex: 2,
          transform: `${flipTransform} translateY(${breathY}px)`,
          filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.9))',
        }}
      >
        <g fill="#090D12">
          {customSvgPath ? (
            <path d={customSvgPath} />
          ) : figureType === 'PILOT' ? (
            // Aviator / Flight Helmet Silhouette
            <>
              {/* Helmet & Visor */}
              <circle cx="200" cy="115" r="58" />
              <path d="M 160 120 Q 200 135 240 120 L 235 95 Q 200 90 165 95 Z" fill="#141923" />
              {/* Oxygen mask & hose */}
              <path d="M 190 125 L 210 125 L 218 160 Q 200 172 182 160 Z" />
              <path d="M 200 165 Q 215 195 200 220" stroke="#090D12" strokeWidth="12" fill="none" />
              {/* Flight Jacket Torso & Shoulders */}
              <path d="M 115 220 C 130 175 160 160 200 160 C 240 160 270 175 285 220 L 310 380 L 90 380 Z" />
              {/* Parachute harness straps */}
              <path d="M 155 175 L 145 380 M 245 175 L 255 380" stroke="#161C24" strokeWidth="8" />
            </>
          ) : figureType === 'SOLDIER' ? (
            // Combat Soldier Silhouette with Steel Helmet
            <>
              {/* M1/Brodie/Soviet style combat helmet */}
              <path d="M 135 125 C 135 70 265 70 265 125 C 275 130 250 138 200 138 C 150 138 125 130 135 125 Z" />
              {/* Head / Chin Profile */}
              <circle cx="200" cy="130" r="38" />
              <path d="M 185 145 L 215 145 L 208 178 Q 200 182 192 178 Z" />
              {/* Greatcoat / Battle Tunic Torso */}
              <path d="M 110 215 C 130 175 165 170 200 170 C 235 170 270 175 290 215 L 325 460 L 75 460 Z" />
            </>
          ) : (
            // Default: Commander / Officer in Service Cap
            <>
              {/* Officer Peak Visor Cap */}
              <path d="M 142 98 C 145 68 255 68 258 98 L 268 112 C 235 116 165 116 132 112 Z" />
              {/* Cap Brim / Peak */}
              <path d="M 148 112 Q 200 126 262 112 L 258 118 Q 200 132 152 118 Z" fill="#030406" />
              {/* Head profile */}
              <circle cx="200" cy="135" r="36" />
              <path d="M 185 150 L 215 150 L 210 182 Q 200 188 190 182 Z" />
              {/* Trenchcoat / Uniform Torso */}
              <path d="M 105 210 C 130 175 165 172 200 172 C 235 172 270 175 295 210 L 330 460 L 70 460 Z" />
              {/* Lapel collar lines */}
              <path d="M 160 185 L 180 260 M 240 185 L 220 260" stroke="#171A21" strokeWidth="6" />
            </>
          )}
        </g>

        {/* 3. Single High-Impact Accent Prop (Color highlight) */}
        {accentProp !== 'NONE' && (
          <g fill={accentColor}>
            {customAccentPath ? (
              <path d={customAccentPath} />
            ) : accentProp === 'SCARF' ? (
              // Flying / Trench Scarf waving in the wind
              <g>
                <path d="M 170 170 C 190 162 210 162 230 170 C 235 182 225 192 200 192 C 175 192 165 182 170 170 Z" />
                <path
                  d={`M 220 185 Q ${245 + scarfWave} 220 250 270 L 235 272 Q ${230 + scarfWave * 0.7} 220 212 188 Z`}
                />
              </g>
            ) : accentProp === 'CAP_BAND' ? (
              // Colored Cap Band / Cockade
              <path d="M 148 98 Q 200 94 252 98 L 254 108 Q 200 104 146 108 Z" />
            ) : accentProp === 'MEDAL' ? (
              // Heroic Ribbon & Star on breast
              <g transform="translate(160, 230)">
                <rect width="24" height="28" rx="2" fill={accentColor} />
                <polygon points="12,32 16,42 26,42 18,48 21,58 12,52 3,58 6,48 -2,42 8,42" fill="#F59E0B" />
              </g>
            ) : accentProp === 'ARMBAND' ? (
              // High-Contrast Armband
              <path d="M 108 245 L 138 240 L 134 275 L 104 280 Z" />
            ) : accentProp === 'TIE' ? (
              // Diplomat Silk Tie
              <polygon points="196,182 204,182 208,270 200,285 192,270" />
            ) : null}
          </g>
        )}
      </svg>
    </div>
  );
};
