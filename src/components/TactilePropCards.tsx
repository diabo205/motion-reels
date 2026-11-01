import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { loadFont as loadBlackOpsOne } from '@remotion/google-fonts/BlackOpsOne';
import { loadFont as loadCourierPrime } from '@remotion/google-fonts/CourierPrime';
import { loadFont as loadBarlowCondensed } from '@remotion/google-fonts/BarlowCondensed';
import { loadFont as loadCaveat } from '@remotion/google-fonts/Caveat';

const blackOps = loadBlackOpsOne();
const courier = loadCourierPrime();
const barlow = loadBarlowCondensed();
const caveat = loadCaveat();

const TORN_CARD_CLIP =
  'polygon(0.8% 2%, 32% 0%, 68% 2%, 99.2% 0%, 100% 35%, 99.3% 72%, 100% 98%, 98.8% 100%, 62% 98%, 28% 100%, 0.5% 98%, 0% 62%, 0.7% 24%)';

// ============================================================================
// 1. LIVE PAPER SIGN COUNTER (Inspired by Reference 00:01, 00:18, 00:52, 00:56)
// ============================================================================
export interface PaperSignCounterProps {
  tagText: string;
  startValue: number;
  endValue: number;
  prefix?: string;
  suffix?: string;
  subLabel?: string;
  x?: number;
  y?: number;
  width?: number;
  rollStartFrame?: number;
  rollDurationFrames?: number;
  stampText?: string;
  stampFrame?: number;
  highlightRedOnEnd?: boolean;
  showSignPoles?: boolean;
}

export const PaperSignCounter: React.FC<PaperSignCounterProps> = ({
  tagText,
  startValue,
  endValue,
  prefix = '',
  suffix = '',
  subLabel,
  x = 540,
  y = 1040,
  width = 880,
  rollStartFrame = 8,
  rollDurationFrames = 64,
  stampText,
  stampFrame = 76,
  highlightRedOnEnd = false,
  showSignPoles = true,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [rollStartFrame, rollStartFrame + rollDurationFrames],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );

  const currentVal = Math.round(interpolate(progress, [0, 1], [startValue, endValue], { extrapolateRight: 'clamp' }));
  const isFinished = progress >= 0.98;
  const valueColor = highlightRedOnEnd && isFinished ? '#C1272D' : '#141619';
  const valueFontSize = width < 680 ? 80 : 104;
  const subFontSize = width < 680 ? 22 : 28;

  const popScale = interpolate(frame, [0, 4], [0.85, 1.0], { extrapolateRight: 'clamp' });
  const stampScale =
    stampText && frame >= stampFrame
      ? interpolate(frame - stampFrame, [0, 4], [2.1, 1.0], { extrapolateRight: 'clamp' })
      : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        transform: `translate(-50%, -50%) scale(${popScale}) rotate(-1.2deg)`,
        zIndex: 18,
        pointerEvents: 'none',
      }}
    >
      {/* Optional Wooden Signpost Poles Underneath (like Reference 00:01) */}
      {showSignPoles && (
        <div
          style={{
            position: 'absolute',
            bottom: -110,
            left: '26%',
            width: 22,
            height: 130,
            backgroundColor: '#7A583B',
            boxShadow: '4px 6px 12px rgba(0,0,0,0.55)',
            zIndex: 1,
          }}
        />
      )}
      {showSignPoles && (
        <div
          style={{
            position: 'absolute',
            bottom: -110,
            left: '68%',
            width: 22,
            height: 130,
            backgroundColor: '#7A583B',
            boxShadow: '4px 6px 12px rgba(0,0,0,0.55)',
            zIndex: 1,
          }}
        />
      )}

      {/* Top-Left Tilted Black Torn-Paper Header Tag (like "FORBES, 2015") */}
      <div
        style={{
          position: 'absolute',
          top: -34,
          left: 36,
          backgroundColor: '#14171D',
          padding: '8px 26px',
          transform: 'rotate(-3.5deg)',
          boxShadow: '0 6px 14px rgba(0,0,0,0.7)',
          clipPath: TORN_CARD_CLIP,
          zIndex: 4,
        }}
      >
        <span
          style={{
            fontFamily: courier.fontFamily,
            fontSize: 24,
            fontWeight: 700,
            color: '#F4EFE6',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          {tagText}
        </span>
      </div>

      {/* Main Cream Torn-Paper Counter Placard */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#EAE3D2',
          padding: '34px 36px 28px 36px',
          clipPath: TORN_CARD_CLIP,
          boxShadow: '0 18px 32px rgba(0,0,0,0.75)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: blackOps.fontFamily,
            fontSize: valueFontSize,
            lineHeight: 1.0,
            color: valueColor,
            letterSpacing: '2px',
            fontVariantNumeric: 'tabular-nums',
            whiteSpace: 'nowrap',
          }}
        >
          {prefix}
          {currentVal.toLocaleString()}
          {suffix}
        </div>

        {subLabel && (
          <div
            style={{
              marginTop: 10,
              fontFamily: barlow.fontFamily,
              fontSize: subFontSize,
              fontWeight: 900,
              color: '#2B2F36',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {subLabel}
          </div>
        )}
      </div>

      {/* Optional Translucent Double-Bordered Red Ink Stamp Slam (Bottom-Right so it never obscures top header tag) */}
      {stampText && frame >= stampFrame && (
        <div
          style={{
            position: 'absolute',
            bottom: -58,
            right: 18,
            transform: `rotate(-6deg) scale(${stampScale})`,
            border: '6px solid #C1272D',
            borderRadius: 10,
            padding: '5px 20px',
            backgroundColor: 'rgba(193, 39, 45, 0.14)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.45)',
            zIndex: 6,
          }}
        >
          <div
            style={{
              border: '2.5px solid #C1272D',
              borderRadius: 5,
              padding: '3px 16px',
              fontFamily: blackOps.fontFamily,
              fontSize: 40,
              color: '#C1272D',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              lineHeight: 1.0,
              whiteSpace: 'nowrap',
            }}
          >
            {stampText}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 2. CASCADING PAPER STACK (Inspired by Reference 00:41, 00:47, 00:51)
// ============================================================================
export interface CascadingPaperItem {
  text: string;
  subText?: string;
  triggerFrame: number;
  accentRed?: boolean;
}

export const CascadingPaperStack: React.FC<{
  items: CascadingPaperItem[];
  x?: number;
  y?: number;
  width?: number;
  handwrittenFooter?: string;
}> = ({ items, x = 350, y = 1120, width = 520, handwrittenFooter }) => {
  const frame = useCurrentFrame();
  const tilts = [-2.1, 1.6, -1.2, 2.2];

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        zIndex: 19,
        pointerEvents: 'none',
      }}
    >
      {items.map((item, idx) => {
        const localFrame = frame - item.triggerFrame;
        if (localFrame < 0) return null;

        const scale = interpolate(localFrame, [0, 3], [1.35, 1.0], {
          extrapolateRight: 'clamp',
        });
        const tilt = tilts[idx % tilts.length];

        return (
          <div
            key={idx}
            style={{
              width: '100%',
              backgroundColor: '#EAE3D2',
              padding: '16px 28px',
              clipPath: TORN_CARD_CLIP,
              transform: `scale(${scale}) rotate(${tilt}deg)`,
              boxShadow: '0 10px 20px rgba(0,0,0,0.68)',
              borderLeft: item.accentRed ? '10px solid #C1272D' : '10px solid #16181C',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                fontFamily: blackOps.fontFamily,
                fontSize: 32,
                color: item.accentRed ? '#C1272D' : '#141619',
                letterSpacing: '1.8px',
                textTransform: 'uppercase',
              }}
            >
              {item.text}
            </div>
            {item.subText && (
              <div
                style={{
                  marginTop: 4,
                  fontFamily: courier.fontFamily,
                  fontSize: 21,
                  fontWeight: 700,
                  color: '#32363F',
                  letterSpacing: '1px',
                }}
              >
                {item.subText}
              </div>
            )}
          </div>
        );
      })}

      {handwrittenFooter && frame >= (items[items.length - 1]?.triggerFrame ?? 0) + 12 && (
        <div
          style={{
            marginTop: 6,
            fontFamily: caveat.fontFamily,
            fontSize: 40,
            fontWeight: 700,
            color: '#EAE3D2',
            transform: 'rotate(-2deg)',
            textShadow: '0 3px 10px rgba(0,0,0,0.9)',
          }}
        >
          {handwrittenFooter}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 3. HINGED CUTOUT DOOR REVEAL (Inspired by Reference 00:35 -> 00:37 Edison)
// ============================================================================
export const HingedCutoutReveal: React.FC<{
  exteriorTitle: string;
  exteriorSub: string;
  interiorTitle: string;
  interiorLines: string[];
  openFrame?: number;
  stampText?: string;
  x?: number;
  y?: number;
}> = ({
  exteriorTitle,
  exteriorSub,
  interiorTitle,
  interiorLines,
  openFrame = 64,
  stampText,
  x = 390,
  y = 1140,
}) => {
  const frame = useCurrentFrame();
  const isOpen = frame >= openFrame;
  const openProgress = interpolate(frame, [openFrame, openFrame + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const stampScale = interpolate(frame - (openFrame + 14), [0, 4], [2.1, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        width: 480,
        height: 460,
        zIndex: 18,
        pointerEvents: 'none',
      }}
    >
      {/* Die-Cut White Paper Sticker Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: '#EAE3D2',
          borderRadius: 22,
          padding: 18,
          boxShadow: '0 20px 38px rgba(0,0,0,0.82), 0 0 0 10px #F4EFE6',
        }}
      >
        {/* Interior Recessed Compartment (Revealed when door opens) */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#222831',
            borderRadius: 14,
            border: '4px solid #11151C',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              backgroundColor: '#EAE3D2',
              padding: '18px 22px',
              borderRadius: 8,
              width: '100%',
              textAlign: 'center',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.35)',
            }}
          >
            <div
              style={{
                fontFamily: barlow.fontFamily,
                fontSize: 36,
                fontWeight: 900,
                color: '#141619',
                letterSpacing: '2px',
                lineHeight: 1.15,
              }}
            >
              {interiorTitle}
            </div>
            {interiorLines.map((ln, i) => (
              <div
                key={i}
                style={{
                  marginTop: 6,
                  fontFamily: courier.fontFamily,
                  fontSize: 21,
                  fontWeight: 700,
                  color: '#C1272D',
                }}
              >
                {ln}
              </div>
            ))}
          </div>

          {/* 4 Indicator Nodes Inside Machine (matching Reference 00:37) */}
          <div style={{ display: 'flex', gap: 28, marginBottom: 14 }}>
            {[0, 1, 2, 3].map((dot) => (
              <div
                key={dot}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: dot % 2 === 0 ? '#E63946' : '#5BC0BE',
                  border: '3px solid #11151C',
                }}
              />
            ))}
          </div>
        </div>

        {/* Hinged Front Cover Door (Swings Open to the Right at openFrame!) */}
        {openProgress < 1 ? (
          <div
            style={{
              position: 'absolute',
              inset: 18,
              backgroundColor: '#EAE3D2',
              borderRadius: 14,
              border: '3px solid #C5B9A5',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '32px 24px',
              transformOrigin: 'right center',
              transform: `perspective(900px) rotateY(${openProgress * 75}deg)`,
              boxShadow: '-8px 8px 22px rgba(0,0,0,0.45)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: 220,
                backgroundColor: '#161B22',
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 18,
              }}
            >
              <div
                style={{
                  fontFamily: barlow.fontFamily,
                  fontSize: 48,
                  fontWeight: 900,
                  color: '#F8F9FA',
                  letterSpacing: '4px',
                }}
              >
                {exteriorTitle}
              </div>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  backgroundColor: '#2EC4B6',
                  boxShadow: '0 0 18px rgba(46,196,182,0.8)',
                }}
              />
            </div>
            <div
              style={{
                fontFamily: courier.fontFamily,
                fontSize: 30,
                fontWeight: 700,
                color: '#161B22',
                letterSpacing: '3px',
              }}
            >
              {exteriorSub}
            </div>
          </div>
        ) : (
          /* Swung-Open Cardboard Flap Protruding on Right Edge (compact width to clear puppet) */
          <svg
            width="135"
            height="480"
            viewBox="0 0 135 480"
            style={{ position: 'absolute', right: -118, top: -10, overflow: 'visible' }}
          >
            <polygon
              points="0,24 118,65 118,455 0,430"
              fill="#D8CFC0"
              stroke="#F4EFE6"
              strokeWidth="10"
              strokeLinejoin="round"
            />
            <polygon points="4,28 112,68 112,450 4,426" fill="#C9BFAE" stroke="#9E9484" strokeWidth="2" />
          </svg>
        )}

        {/* Optional Red Rubber Stamp Slam Across Open Compartment */}
        {stampText && isOpen && frame >= openFrame + 14 && (
          <div
            style={{
              position: 'absolute',
              bottom: -32,
              left: -24,
              transform: `rotate(-11deg) scale(${stampScale})`,
              border: '7px solid #C1272D',
              borderRadius: 10,
              padding: '6px 26px',
              backgroundColor: 'rgba(193, 39, 45, 0.14)',
              boxShadow: '0 8px 18px rgba(0,0,0,0.55)',
              zIndex: 10,
            }}
          >
            <div
              style={{
                border: '2.5px solid #C1272D',
                borderRadius: 5,
                padding: '4px 20px',
                fontFamily: blackOps.fontFamily,
                fontSize: 52,
                color: '#C1272D',
                letterSpacing: '5px',
              }}
            >
              {stampText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
