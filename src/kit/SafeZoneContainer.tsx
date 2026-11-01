/**
 * L1 Shared Kit: SafeZoneContainer
 * Enforces 9:16 mobile platform safe zones (default CONSERVATIVE_UNION, 4:5 Instagram safe).
 * Pins text to 18%-42% (y: 346..806px) and lower-third artwork to 45%-78% (y: 864..1498px).
 * Keeps bottom 22% (y: 1498..1920px) and right 15% (x: 918..1080px) clear of focal content.
 */
import React from 'react';
import { getSafeZoneProfile, SafeZoneProfileName } from './tokens';

export interface SafeZoneContainerProps {
  profile?: SafeZoneProfileName | string;
  showDebugOverlay?: boolean;
  children: React.ReactNode;
}

export const SafeZoneContainer: React.FC<SafeZoneContainerProps> & {
  TextSlot: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }>;
  ArtworkSlot: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }>;
  ContextSlot: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }>;
  CtaSlot: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }>;
} = ({ profile = 'CONSERVATIVE_UNION', showDebugOverlay = false, children }) => {
  const safeZone = getSafeZoneProfile(profile);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: 1080,
        height: 1920,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {children}

      {/* Optional Safe-Zone Debug Boundary Visualizer */}
      {showDebugOverlay && (
        <svg
          viewBox="0 0 1080 1920"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 999 }}
        >
          {/* Text Zone Box (18% - 42%) */}
          <rect
            x={safeZone.textZone.left}
            y={safeZone.textZone.top}
            width={safeZone.textZone.right - safeZone.textZone.left}
            height={safeZone.textZone.bottom - safeZone.textZone.top}
            fill="none"
            stroke="rgba(56, 189, 248, 0.45)"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
          {/* Artwork Zone Box (45% - 78%) */}
          <rect
            x={safeZone.artworkZone.left}
            y={safeZone.artworkZone.top}
            width={safeZone.artworkZone.right - safeZone.artworkZone.left}
            height={safeZone.artworkZone.bottom - safeZone.artworkZone.top}
            fill="none"
            stroke="rgba(245, 158, 11, 0.45)"
            strokeWidth="2"
            strokeDasharray="8 4"
          />
          {/* Bottom UI Buffer (Bottom 22%) */}
          <rect
            x="0"
            y={safeZone.bottomUiBuffer.top}
            width="1080"
            height={1920 - safeZone.bottomUiBuffer.top}
            fill="rgba(239, 68, 68, 0.12)"
          />
          {/* Right Action Stack Buffer (Right 15%) */}
          <rect
            x={safeZone.rightActionBuffer.left}
            y="0"
            width={1080 - safeZone.rightActionBuffer.left}
            height="1920"
            fill="rgba(239, 68, 68, 0.08)"
          />
        </svg>
      )}
    </div>
  );
};

// Sub-slots for layout discipline
SafeZoneContainer.TextSlot = ({ children, style }) => (
  <div
    style={{
      position: 'absolute',
      top: 346,
      left: 64,
      right: 162,
      bottom: 1114,
      pointerEvents: 'none',
      zIndex: 20,
      ...style,
    }}
  >
    {children}
  </div>
);

SafeZoneContainer.ArtworkSlot = ({ children, style }) => (
  <div
    style={{
      position: 'absolute',
      top: 864,
      left: 64,
      right: 162,
      bottom: 422,
      pointerEvents: 'none',
      zIndex: 10,
      ...style,
    }}
  >
    {children}
  </div>
);

SafeZoneContainer.ContextSlot = ({ children, style }) => (
  <div
    style={{
      position: 'absolute',
      top: 220,
      left: 64,
      right: 162,
      pointerEvents: 'none',
      zIndex: 25,
      ...style,
    }}
  >
    {children}
  </div>
);

SafeZoneContainer.CtaSlot = ({ children, style }) => (
  <div
    style={{
      position: 'absolute',
      top: 748,
      left: 64,
      right: 162,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 30,
      ...style,
    }}
  >
    {children}
  </div>
);
