/**
 * L1 Shared Kit: WeatheredMilitaryStamp
 * Tactile double-bordered rubber ink stamp for confidential dossier and alert reveals.
 */
import React from 'react';

export interface WeatheredMilitaryStampProps {
  text: string;
  subText?: string;
  color?: string;
  slamProgress?: number;
  rotation?: number;
}

export const WeatheredMilitaryStamp: React.FC<WeatheredMilitaryStampProps> = ({
  text,
  subText,
  color = '#C1272D',
  slamProgress = 1.0,
  rotation = -11,
}) => {
  return (
    <g transform={`rotate(${rotation}) scale(${slamProgress})`}>
      {/* Outer Double-Bordered Distressed Rubber Ink Frame */}
      <rect
        x="-340"
        y="-92"
        width="680"
        height="184"
        fill="rgba(193, 39, 45, 0.14)"
        stroke={color}
        strokeWidth="10"
        rx="14"
        strokeDasharray="210 6 80 5 140 6"
      />
      <rect
        x="-324"
        y="-76"
        width="648"
        height="152"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        rx="8"
      />
      {/* Heavy Stamp Text */}
      <text
        y={subText ? 12 : 28}
        textAnchor="middle"
        fill={color}
        fontFamily="'Montserrat', 'Black Ops One', sans-serif"
        fontSize="82"
        fontWeight="900"
        letterSpacing="6"
      >
        {text}
      </text>
      {subText && (
        <text
          y="54"
          textAnchor="middle"
          fill="#EAE3D2"
          fontFamily="'Montserrat', monospace"
          fontSize="23"
          letterSpacing="2.5"
          fontWeight="800"
        >
          {subText}
        </text>
      )}
    </g>
  );
};
