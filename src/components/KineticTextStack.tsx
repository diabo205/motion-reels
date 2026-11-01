import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { resolveResponsiveFontSize } from '../utils/fontMetrics';
import {
  ALL_CAPS_TRACKING_EM,
  MIN_SETUP_FONT_PX,
  MIN_PAYOFF_FONT_PX,
  MAX_LINES_PER_LAYER,
  PIPELINE_CONSTANTS,
  getSafeZoneProfile,
} from '../config/constants';

// Initialize and load approved heavy geometric sans-serif fonts (800/900 weights, latin subset)
const montserrat = loadMontserrat('normal', { weights: ['800', '900'], subsets: ['latin'] });
const inter = loadInter('normal', { weights: ['800', '900'], subsets: ['latin'] });

export interface TextLayerSpec {
  text: string;
  triggerFrameOffset: number;
  tier: 'DISPLAY_HERO' | 'PRIMARY_STATEMENT' | 'SECONDARY_ACCENT' | 'SUB_CAPTION';
  colorToken: 'PURE_WHITE' | 'ALERT_RED' | 'MEDAL_GOLD' | 'TACTICAL_CYAN' | 'MUTED_CREAM' | 'STARK_WHITE';
  animation: 'HARD_POP' | 'SCALE_SLAM' | 'TYPEWRITER' | 'STAMP_THUD' | 'BLUR_TO_SHARP' | 'SLOW_REVEAL';
  handwrittenNote?: string;
  rollingCounter?: boolean;
}

export interface KineticTextStackProps {
  layers: TextLayerSpec[];
  fontFamily?: 'Montserrat' | 'Inter';
  styleMode?: 'DOCUMENTARY_SANS' | 'TACTILE_TORN_PAPER';
  sceneStartFrame?: number;
  palette?: 'POLAR_MARITIME' | 'CONFLICT_CRISIS' | 'ESPIONAGE_DOSSIER';
  sensitivity?: 'STANDARD' | 'SOMBER_MEMORIAL' | 'HIGH_SENSITIVITY';
  safeZoneProfile?: string;
  archetype?: string;
  quoteAttribution?: string;
}

const TORN_POLYGON_A =
  'polygon(0.8% 3%, 24% 0%, 52% 2%, 78% 0%, 99.2% 2%, 100% 28%, 99.4% 62%, 100% 96%, 98.5% 100%, 71% 98%, 42% 100%, 14% 98%, 0.4% 100%, 0% 68%, 0.6% 34%)';

const TORN_POLYGON_B =
  'polygon(0.5% 0%, 28% 2%, 61% 0%, 89% 2%, 99.5% 0%, 100% 34%, 99.2% 68%, 100% 98%, 99% 100%, 66% 98%, 33% 100%, 8% 97%, 0% 100%, 0.6% 64%, 0% 28%)';

export const KineticTextStack: React.FC<KineticTextStackProps> = ({
  layers,
  fontFamily = 'Montserrat',
  styleMode = 'DOCUMENTARY_SANS',
  sceneStartFrame = 0,
  palette = 'POLAR_MARITIME',
  sensitivity = 'STANDARD',
  safeZoneProfile = 'CONSERVATIVE_UNION',
  archetype,
  quoteAttribution,
}) => {
  const frame = useCurrentFrame();
  const safeZone = getSafeZoneProfile(safeZoneProfile);
  const maxSafeWidthPx = safeZone.textZone.right - safeZone.textZone.left;

  const activeFontFamily =
    fontFamily === 'Inter' ? inter.fontFamily : montserrat.fontFamily;

  const paletteConfig =
    PIPELINE_CONSTANTS.PALETTES[palette] || PIPELINE_CONSTANTS.PALETTES.POLAR_MARITIME;
  const isSomber =
    sensitivity === 'SOMBER_MEMORIAL' || sensitivity === 'HIGH_SENSITIVITY';

  return (
    <div
      style={{
        position: 'absolute',
        top: safeZone.textZone.top, // Pinned strictly to safe-zone bound (default y = 346px to 806px)
        left: safeZone.textZone.left,
        right: 1080 - safeZone.textZone.right,
        maxHeight: safeZone.textZone.bottom - safeZone.textZone.top,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 14,
        zIndex: 25,
        pointerEvents: 'none',
      }}
    >
      {layers.map((layer, idx) => {
        const localFrame = frame - layer.triggerFrameOffset;
        if (localFrame < 0) return null;

        const isHeroDisplay = layer.tier === 'DISPLAY_HERO';
        const isSetupLine =
          !isHeroDisplay &&
          (idx === 0 || layer.tier === 'PRIMARY_STATEMENT' || layer.animation === 'BLUR_TO_SHARP');
        const isPayoffLine =
          !isHeroDisplay &&
          !isSetupLine &&
          (layer.tier === 'SECONDARY_ACCENT' || layer.colorToken === 'ALERT_RED');

        // Optional Rolling Number Counter logic (counts up over 0.6s / 36 frames)
        let displayedText = layer.text;
        const numberMatch = displayedText.match(/\b\d+\b/);
        if (
          (layer.rollingCounter || isPayoffLine) &&
          numberMatch &&
          localFrame <= 36
        ) {
          const targetNum = parseInt(numberMatch[0], 10);
          const currentCount = Math.floor(
            interpolate(localFrame, [0, 36], [0, targetNum], {
              extrapolateRight: 'clamp',
            })
          );
          displayedText = displayedText.replace(/\b\d+\b/, String(currentCount));
        }

        // ==========================================================
        // 1. REVISED PRESTIGE DOCUMENTARY ZERO-CLUTTER SANS MODE
        // ==========================================================
        if (styleMode === 'DOCUMENTARY_SANS') {
          // Setup Line: Sharp on Global Frame 0 (poster/thumbnail protection);
          // 150ms blur-to-sharp entrance on subsequent frames/scenes
          if (isSetupLine) {
            const isPosterFrameZero = sceneStartFrame === 0 && frame === 0;
            const blurAmount = isPosterFrameZero
              ? 0
              : interpolate(localFrame, [0, 8], [5, 0], {
                  extrapolateRight: 'clamp',
                });
            const opacity = isPosterFrameZero
              ? 1
              : interpolate(localFrame, [0, 5], [0.2, 1], {
                  extrapolateRight: 'clamp',
                });

            const fit = resolveResponsiveFontSize(
              displayedText,
              64,
              MIN_SETUP_FONT_PX,
              maxSafeWidthPx,
              MAX_LINES_PER_LAYER,
              fontFamily,
              ALL_CAPS_TRACKING_EM
            );

            return (
              <div
                key={idx}
                style={{
                  fontFamily: activeFontFamily,
                  fontSize: fit.fontSize,
                  fontWeight: 900,
                  letterSpacing: `${ALL_CAPS_TRACKING_EM}em`,
                  lineHeight: 1.14,
                  color: paletteConfig.setupText,
                  textTransform: 'uppercase',
                  filter: `blur(${blurAmount}px) drop-shadow(0 4px 18px rgba(0,0,0,0.92))`,
                  opacity,
                  maxWidth: maxSafeWidthPx,
                }}
              >
                {fit.lines.slice(0, MAX_LINES_PER_LAYER).map((line, lIdx) => (
                  <div key={lIdx}>{line}</div>
                ))}
              </div>
            );
          }

          // Payoff Line: Beat-Quantized Scale Slam (or Somber Slow Reveal in SOMBER_MEMORIAL mode)
          if (isPayoffLine) {
            const useSomberReveal = isSomber || layer.animation === 'SLOW_REVEAL';
            const scale = useSomberReveal
              ? 1.0
              : interpolate(localFrame, [0, 3], [1.26, 1.0], {
                  extrapolateRight: 'clamp',
                });
            const opacity = useSomberReveal
              ? interpolate(localFrame, [0, 14], [0, 1], {
                  extrapolateRight: 'clamp',
                })
              : interpolate(localFrame, [0, 2], [0, 1], {
                  extrapolateRight: 'clamp',
                });

            const payoffColor = useSomberReveal
              ? paletteConfig.somberPayoff
              : paletteConfig.payoffText;

            const fit = resolveResponsiveFontSize(
              displayedText,
              72,
              MIN_PAYOFF_FONT_PX,
              maxSafeWidthPx,
              MAX_LINES_PER_LAYER,
              fontFamily,
              ALL_CAPS_TRACKING_EM
            );

            return (
              <div
                key={idx}
                style={{
                  fontFamily: activeFontFamily,
                  fontSize: fit.fontSize,
                  fontWeight: 900,
                  letterSpacing: `${ALL_CAPS_TRACKING_EM}em`,
                  lineHeight: 1.12,
                  color: payoffColor,
                  textTransform: 'uppercase',
                  transform: `scale(${scale})`,
                  opacity,
                  filter: useSomberReveal
                    ? 'drop-shadow(0 4px 16px rgba(0,0,0,0.95))'
                    : 'drop-shadow(0 6px 24px rgba(230, 50, 40, 0.4)) drop-shadow(0 4px 16px rgba(0,0,0,0.95))',
                  maxWidth: maxSafeWidthPx,
                }}
              >
                {fit.lines.slice(0, MAX_LINES_PER_LAYER).map((line, lIdx) => (
                  <div key={lIdx}>{line}</div>
                ))}
              </div>
            );
          }

          // Optional Top Context Tag / Sub-Caption in Clean Sans Pill
          return (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                padding: '8px 36px',
                backgroundColor: 'rgba(22, 38, 54, 0.85)',
                border: '1px solid rgba(244, 247, 250, 0.22)',
                borderRadius: 4,
                fontFamily: activeFontFamily,
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: `${ALL_CAPS_TRACKING_EM}em`,
                color: paletteConfig.setupText,
                textTransform: 'uppercase',
                backdropFilter: 'blur(6px)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.6)',
              }}
            >
              {displayedText}
            </div>
          );
        }

        // ==========================================================
        // 2. LEGACY TACTILE TORN-PAPER STACK (Retained with Approved Sans Font)
        // ==========================================================
        let scale = 1.0;
        if (layer.animation === 'SCALE_SLAM') {
          scale = interpolate(localFrame, [0, 3], [1.38, 1.0], { extrapolateRight: 'clamp' });
        } else if (layer.animation === 'STAMP_THUD') {
          scale = interpolate(localFrame, [0, 4], [1.72, 1.0], { extrapolateRight: 'clamp' });
        } else {
          scale = interpolate(localFrame, [0, 2], [1.1, 1.0], { extrapolateRight: 'clamp' });
        }

        if (isHeroDisplay) {
          const heroColor = layer.colorToken === 'ALERT_RED' ? '#E63946' : '#F7F4EB';
          const shadowColor = layer.colorToken === 'ALERT_RED' ? '#380609' : '#4A0E12';
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${scale}) rotate(-1deg)`,
                marginTop: 6,
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  fontFamily: activeFontFamily,
                  fontSize: 84,
                  fontWeight: 900,
                  letterSpacing: `${ALL_CAPS_TRACKING_EM}em`,
                  lineHeight: 1.04,
                  color: heroColor,
                  textTransform: 'uppercase',
                  textShadow: `0px 7px 0px ${shadowColor}, 0px 14px 0px #120405, 0px 20px 30px rgba(0,0,0,0.85)`,
                }}
              >
                {displayedText.split('\n').map((line, lIdx) => (
                  <div key={lIdx}>{line}</div>
                ))}
              </div>
            </div>
          );
        }

        if (isSetupLine) {
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${scale}) rotate(-0.7deg)`,
                filter: 'drop-shadow(0px 12px 18px rgba(0, 0, 0, 0.62))',
                maxWidth: 940,
              }}
            >
              <div
                style={{
                  backgroundColor: '#EAE3D2',
                  padding: '20px 38px 22px 38px',
                  clipPath: TORN_POLYGON_A,
                  border: '1px solid rgba(20, 22, 25, 0.15)',
                  minWidth: 640,
                }}
              >
                <div
                  style={{
                    fontFamily: activeFontFamily,
                    fontSize: 38,
                    fontWeight: 800,
                    color: '#16181C',
                    letterSpacing: `${ALL_CAPS_TRACKING_EM}em`,
                    lineHeight: 1.24,
                    textTransform: 'uppercase',
                  }}
                >
                  {displayedText.split('\n').map((line, lIdx) => (
                    <div key={lIdx}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${scale}) rotate(0.6deg)`,
              filter: 'drop-shadow(0px 14px 22px rgba(0, 0, 0, 0.72))',
              maxWidth: 940,
            }}
          >
            <div
              style={{
                backgroundColor: '#C1272D',
                padding: '18px 40px 20px 40px',
                clipPath: TORN_POLYGON_B,
                minWidth: 580,
              }}
            >
              <div
                style={{
                  fontFamily: activeFontFamily,
                  fontSize: 44,
                  fontWeight: 900,
                  color: '#F7F4EB',
                  letterSpacing: `${ALL_CAPS_TRACKING_EM}em`,
                  lineHeight: 1.16,
                  textTransform: 'uppercase',
                }}
              >
                {displayedText.split('\n').map((line, lIdx) => (
                  <div key={lIdx}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Optional Primary-Source Quote Attribution Pill (for QUOTE_CARD archetype) */}
      {(archetype === 'QUOTE_CARD' || quoteAttribution) && quoteAttribution && (
        <div
          style={{
            marginTop: 6,
            padding: '6px 36px',
            backgroundColor: 'rgba(15, 23, 42, 0.88)',
            border: `1px solid ${paletteConfig.accent}`,
            borderRadius: 4,
            fontFamily: activeFontFamily,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '0.06em',
            color: paletteConfig.accent,
            textTransform: 'uppercase',
          }}
        >
          — {quoteAttribution}
        </div>
      )}
    </div>
  );
};
