import React from 'react';
import tracedData from './traced_carton_assets.json';

export const TRACED_PATHS = {
  sunderland: (tracedData as any).sunderland_flying_boat.path as string,
  train: (tracedData as any).polish_armoured_train.path as string,
  biplane: (tracedData as any).biplane_crash.path as string,
  vincigliata: (tracedData as any).vincigliata_fortress.path as string,
  victoriaCross: (tracedData as any).victoria_cross.path as string,
  cypresses: (tracedData as any).tuscany_cypresses.path as string,
};

export const TRACED_VIEWBOXES = {
  sunderland: (tracedData as any).sunderland_flying_boat.viewBox as string,
  train: (tracedData as any).polish_armoured_train.viewBox as string,
  biplane: (tracedData as any).biplane_crash.viewBox as string,
  vincigliata: (tracedData as any).vincigliata_fortress.viewBox as string,
  victoriaCross: (tracedData as any).victoria_cross.viewBox as string,
  cypresses: (tracedData as any).tuscany_cypresses.viewBox as string,
};

interface TracedElementProps {
  x?: number;
  y?: number;
  scale?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  flipX?: boolean;
}

export const SunderlandFlyingBoatGroup: React.FC<TracedElementProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  fill = '#2C3A47',
  stroke = '#182430',
  strokeWidth = 1,
  opacity = 1,
  flipX = false,
}) => (
  <g
    transform={`translate(${x}, ${y}) scale(${flipX ? -scale : scale}, ${scale})`}
    opacity={opacity}
  >
    <path
      d={TRACED_PATHS.sunderland}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      transform="translate(-480, -330)"
    />
  </g>
);

export const PolishArmouredTrainGroup: React.FC<TracedElementProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  fill = '#353F3A',
  stroke = '#1E2522',
  strokeWidth = 1,
  opacity = 1,
  flipX = false,
}) => (
  <g
    transform={`translate(${x}, ${y}) scale(${flipX ? -scale : scale}, ${scale})`}
    opacity={opacity}
  >
    <path
      d={TRACED_PATHS.train}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      transform="translate(-480, -342)"
    />
  </g>
);

export const BiplaneCrashGroup: React.FC<TracedElementProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  fill = '#423B33',
  stroke = '#241F1A',
  strokeWidth = 1,
  opacity = 1,
  flipX = false,
}) => (
  <g
    transform={`translate(${x}, ${y}) scale(${flipX ? -scale : scale}, ${scale})`}
    opacity={opacity}
  >
    <path
      d={TRACED_PATHS.biplane}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      transform="translate(-480, -320)"
    />
  </g>
);

export const VincigliataFortressGroup: React.FC<TracedElementProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  fill = '#3E342B',
  stroke = '#221C16',
  strokeWidth = 1,
  opacity = 1,
  flipX = false,
}) => (
  <g
    transform={`translate(${x}, ${y}) scale(${flipX ? -scale : scale}, ${scale})`}
    opacity={opacity}
  >
    <path
      d={TRACED_PATHS.vincigliata}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      transform="translate(-480, -360)"
    />
  </g>
);

export const VictoriaCrossMedalGroup: React.FC<TracedElementProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  fill = '#B45309',
  stroke = '#78350F',
  strokeWidth = 1.5,
  opacity = 1,
  flipX = false,
}) => (
  <g
    transform={`translate(${x}, ${y}) scale(${flipX ? -scale : scale}, ${scale})`}
    opacity={opacity}
  >
    <path
      d={TRACED_PATHS.victoriaCross}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      transform="translate(-480, -726)"
    />
  </g>
);

export const TuscanyCypressesGroup: React.FC<TracedElementProps> = ({
  x = 0,
  y = 0,
  scale = 1,
  fill = '#233020',
  stroke = '#141C12',
  strokeWidth = 1,
  opacity = 1,
  flipX = false,
}) => (
  <g
    transform={`translate(${x}, ${y}) scale(${flipX ? -scale : scale}, ${scale})`}
    opacity={opacity}
  >
    <path
      d={TRACED_PATHS.cypresses}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      transform="translate(-480, -320)"
    />
  </g>
);
