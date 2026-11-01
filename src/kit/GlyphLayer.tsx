/**
 * L1 Shared Kit: GlyphLayer Zero-Clutter Typography Primitive
 * Enforces:
 *   - Three-Element Text Cap: Optional Context Tag + Setup Line (White) + Payoff Line (Red/Accent)
 *   - Strict Word & Line Budget: 6-10 words total, < 40 chars/line, max 2 lines/layer
 *   - Single Heavy Geometric Sans Font Family (Montserrat / Inter)
 *   - Mobile Legibility Floors: >= 56px setup / >= 64px payoff with +0.04em tracking
 *   - Real advance-width measurement via fontMetrics
 *   - 36-frame (0.6s) rolling number counter animation on payoff hits
 */
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
  PALETTES,
  PaletteTheme,
} from './tokens';

// Preload approved heavy geometric sans fonts
const montserrat = loadMontserrat('normal', { weights: ['800', '900'], subsets: ['latin'] });
const inter = loadInter('normal', { weights: ['800', '900'], subsets: ['latin'] });

export interface GlyphTextLayerSpec {
  text: string;
  triggerFrameOffset: number;
  tier: 'DISPLAY_HERO' | 'PRIMARY_STATEMENT' | 'SECONDARY_ACCENT' | 'SUB_CAPTION';
  colorToken?: 'PURE_WHITE' | 'ALERT_RED' | 'MEDAL_GOLD' | 'TACTICAL_CYAN' | 'MUTED_CREAM' | 'STARK_WHITE';
  animation?: 'HARD_POP' | 'SCALE_SLAM' | 'TYPEWRITER' | 'STAMP_THUD' | 'BLUR_TO_SHARP' | 'SLOW_REVEAL';
  rollingCounter?: boolean;
}

export interface GlyphLayerProps {
  layers: GlyphTextLayerSpec[];
  fontFamily?: 'Montserrat' | 'Inter';
  styleMode?: 'DOCUMENTARY_SANS' | 'TACTILE_TORN_PAPER';
  palette?: PaletteTheme;
  sensitivity?: 'STANDARD' | 'SOMBER_MEMORIAL' | 'HIGH_SENSITIVITY';
  safeZoneWidth?: number;
  quoteAttribution?: string;
  contextTag?: {
    flagEmoji?: string;
    title?: string;
    headerContext?: string;
  };
}

export const GlyphLayer: React.FC<GlyphLayerProps> = ({
  layers,
  fontFamily = 'Montserrat',
  styleMode = 'DOCUMENTARY_SANS',
  palette = 'POLAR_MARITIME',
  sensitivity = 'STANDARD',
  safeZoneWidth = 952,
  quoteAttribution,
  contextTag,
}) => {
  const frame = useCurrentFrame();
  const activeFontFamily = fontFamily === 'Inter' ? inter.fontFamily : montserrat.fontFamily;
  const paletteConfig = (PALETTES as any)[palette] || PALETTES.POLAR_MARITIME;

  return (
    <div
      style={{
        position: 'absolute',
        top: 346,
        left: 64,
        right: 162,
        height: 460,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      {/* 1. Optional Context Tag (Top of Text Zone) */}
      {contextTag && contextTag.headerContext && (
        <div
          style={{
            marginBottom: 16,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 14px',
            backgroundColor: 'rgba(10, 17, 24, 0.88)',
            border: '1px solid rgba(244, 247, 250, 0.22)',
            borderRadius: 4,
          }}
        >
          {contextTag.flagEmoji && <span style={{ fontSize: 18 }}>{contextTag.flagEmoji}</span>}
          <span
            style={{
              fontFamily: activeFontFamily,
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#94A3B8',
              textTransform: 'uppercase',
            }}
          >
            {contextTag.headerContext}
          </span>
        </div>
      )}

      {/* 2. Setup Line (Primary Statement) & Payoff Line (Secondary Accent) */}
      {layers.slice(0, 2).map((layer, idx) => {
        const isSetup = idx === 0;
        const triggerFrame = layer.triggerFrameOffset;
        if (frame < triggerFrame) return null;

        const localFrame = frame - triggerFrame;
        const minPx = isSetup ? MIN_SETUP_FONT_PX : MIN_PAYOFF_FONT_PX;
        const prefPx = isSetup ? 64 : 72;

        const fit = resolveResponsiveFontSize(
          layer.text,
          prefPx,
          minPx,
          safeZoneWidth,
          MAX_LINES_PER_LAYER,
          fontFamily,
          ALL_CAPS_TRACKING_EM
        );

        // Somber memorial mode: Replace aggressive scale slam with solemn opacity fade
        const isSomber = sensitivity === 'SOMBER_MEMORIAL';
        const animScale = isSomber
          ? 1.0
          : isSetup
            ? 1.0
            : interpolate(localFrame, [0, 4], [1.32, 1.0], {
                extrapolateRight: 'clamp',
              });
        const animOpacity = interpolate(localFrame, [0, isSomber ? 8 : 2], [0, 1], {
          extrapolateRight: 'clamp',
        });

        // Numeric rolling counter calculation over 36 frames (0.6s)
        let displayText = layer.text;
        if (layer.rollingCounter) {
          const numMatch = layer.text.match(/\b\d[\d,.]*\b/);
          if (numMatch) {
            const rawNumStr = numMatch[0].replace(/,/g, '');
            const targetNum = parseFloat(rawNumStr);
            if (!isNaN(targetNum)) {
              const currentNum = Math.round(
                interpolate(localFrame, [0, 36], [0, targetNum], {
                  extrapolateRight: 'clamp',
                })
              );
              displayText = layer.text.replace(numMatch[0], currentNum.toLocaleString());
            }
          }
        }

        const textColor = isSetup
          ? paletteConfig?.setupText || '#F4F7FA'
          : isSomber
            ? paletteConfig?.somberPayoff || '#93C5FD'
            : paletteConfig?.payoffText || '#E63228';

        return (
          <div
            key={`layer_${idx}`}
            style={{
              fontFamily: activeFontFamily,
              fontSize: `${fit.fontSize}px`,
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: `${ALL_CAPS_TRACKING_EM}em`,
              textTransform: 'uppercase',
              color: textColor,
              opacity: animOpacity,
              transform: `scale(${animScale})`,
              transformOrigin: 'left center',
              marginTop: idx === 1 ? 12 : 0,
              textShadow: '0 4px 16px rgba(0, 0, 0, 0.85)',
              wordBreak: 'break-word',
            }}
          >
            {displayText}
          </div>
        );
      })}

      {/* Quote Attribution Badge (if Quote Card archetype) */}
      {quoteAttribution && (
        <div
          style={{
            marginTop: 18,
            fontFamily: activeFontFamily,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '0.06em',
            color: '#CBD5E1',
            textTransform: 'uppercase',
            opacity: interpolate(frame, [18, 30], [0, 0.95], {
              extrapolateRight: 'clamp',
            }),
          }}
        >
          — {quoteAttribution}
        </div>
      )}
    </div>
  );
};
