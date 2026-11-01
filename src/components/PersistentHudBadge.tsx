import React from 'react';
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

const montserrat = loadMontserrat('normal', { weights: ['800', '900'], subsets: ['latin'] });
const inter = loadInter('normal', { weights: ['800', '900'], subsets: ['latin'] });

export const PersistentHudBadge: React.FC<{
  flagEmoji: string;
  title: string;
  headerContext?: string;
  styleMode?: 'DOCUMENTARY_SANS' | 'TACTILE_TORN_PAPER';
  fontFamily?: 'Montserrat' | 'Inter';
}> = ({
  flagEmoji,
  title,
  headerContext,
  styleMode = 'TACTILE_TORN_PAPER',
  fontFamily = 'Montserrat',
}) => {
  const docFont = fontFamily === 'Inter' ? inter.fontFamily : montserrat.fontFamily;

  if (styleMode === 'DOCUMENTARY_SANS') {
    if (!headerContext) return null;
    return (
      <div
        style={{
          position: 'absolute',
          top: 230,
          left: 64,
          right: 162,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 35,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            padding: '10px 36px',
            backgroundColor: 'rgba(10, 17, 24, 0.88)',
            border: '2px solid rgba(56, 189, 248, 0.45)',
            borderRadius: 6,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.65)',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#38BDF8',
              boxShadow: '0 0 10px #38BDF8',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: docFont,
              fontSize: 23,
              fontWeight: 900,
              color: '#F4F7FA',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {headerContext}
          </span>
        </div>
      </div>
    );
  }

  // Format headerContext into a compact chronological/location tag for the top-right black paper strip
  const rightTag = headerContext
    ? headerContext.includes('•')
      ? headerContext.split('•')[headerContext.split('•').length - 1].trim()
      : headerContext.trim()
    : '1971';

  return (
    <div
      style={{
        position: 'absolute',
        top: 200,
        left: 64,
        right: 162,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 35,
        pointerEvents: 'none',
      }}
    >
      {/* 1. Top-Left Cream Torn-Paper Subject Identity Strip */}
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 26px 10px 22px',
          backgroundColor: '#EAE3D2',
          color: '#141619',
          transform: 'rotate(-1.2deg)',
          boxShadow: '0 8px 18px rgba(0, 0, 0, 0.65), 0 2px 4px rgba(0, 0, 0, 0.35)',
          clipPath:
            'polygon(1% 4%, 98% 0%, 100% 22%, 99% 52%, 100% 82%, 98% 100%, 2% 97%, 0% 74%, 1% 42%, 0% 16%)',
          border: '1px solid rgba(20, 22, 25, 0.18)',
        }}
      >
        <span style={{ fontSize: 30, lineHeight: 1, whiteSpace: 'nowrap', flexShrink: 0 }}>
          {flagEmoji}
        </span>
        <span
          style={{
            fontFamily: docFont,
            fontSize: 26,
            fontWeight: 800,
            color: '#141619',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </span>
      </div>

      {/* 2. Top-Right Black Torn-Paper Era / Location Tag */}
      {rightTag && (
        <div
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 26px',
            backgroundColor: '#14171D',
            color: '#F4EFE6',
            transform: 'rotate(1.5deg)',
            boxShadow: '0 8px 18px rgba(0, 0, 0, 0.72), 0 2px 4px rgba(0, 0, 0, 0.45)',
            clipPath:
              'polygon(2% 0%, 99% 3%, 100% 28%, 98% 58%, 100% 88%, 97% 100%, 1% 96%, 0% 68%, 2% 36%, 0% 12%)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
          }}
        >
          <span
            style={{
              fontFamily: docFont,
              fontSize: 24,
              fontWeight: 800,
              color: '#F4EFE6',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {rightTag}
          </span>
        </div>
      )}
    </div>
  );
};
