import React from 'react';

/**
 * Procedural Arc-Scalloped Cloud Lobes Generator.
 * Connects irregular radial vertices with circular SVG arcs (sweep-flag = 1)
 * to generate outward-bulging organic lobes with zero computer-blob aesthetics.
 */
export const createArcScallopedCloud = (
  baseRadius: number,
  lobeCount: number,
  radiiScale: number[],
  wobble: number = 0
): string => {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < lobeCount; i++) {
    const angle = (i / lobeCount) * Math.PI * 2 - Math.PI / 2;
    const r =
      baseRadius * (radiiScale[i % radiiScale.length] || 1.0) +
      Math.sin(angle * 2.5 + wobble) * 6;
    points.push({
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
    });
  }

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} `;
  for (let i = 0; i < lobeCount; i++) {
    const next = points[(i + 1) % lobeCount];
    const curr = points[i];
    const dx = next.x - curr.x;
    const dy = next.y - curr.y;
    const dist = Math.hypot(dx, dy);
    // Arc radius proportional to chord length produces bulging circular lobes
    const arcR = (dist * 0.62).toFixed(1);
    d += `A ${arcR} ${arcR} 0 0 1 ${next.x.toFixed(1)} ${next.y.toFixed(1)} `;
  }
  d += 'Z';
  return d;
};

/**
 * Parametric 8-Pointed Core Burst Star Generator.
 */
export const create8PointedStarPath = (radius: number = 115): string => {
  const r = radius;
  const q1 = r * 0.33;
  const q2 = r * 0.71;
  const q3 = r * 0.14;
  return `M 0 -${r.toFixed(1)} Q ${q3.toFixed(1)} -${q1.toFixed(1)} ${q2.toFixed(1)} -${q2.toFixed(1)} Q ${q1.toFixed(1)} -${q3.toFixed(1)} ${r.toFixed(1)} 0 Q ${q1.toFixed(1)} ${q3.toFixed(1)} ${q2.toFixed(1)} ${q2.toFixed(1)} Q ${q3.toFixed(1)} ${q1.toFixed(1)} 0 ${r.toFixed(1)} Q -${q3.toFixed(1)} ${q1.toFixed(1)} -${q2.toFixed(1)} ${q2.toFixed(1)} Q -${q1.toFixed(1)} ${q3.toFixed(1)} -${r.toFixed(1)} 0 Q -${q1.toFixed(1)} -${q3.toFixed(1)} -${q2.toFixed(1)} -${q2.toFixed(1)} Q -${q3.toFixed(1)} -${q1.toFixed(1)} 0 -${r.toFixed(1)} Z`;
};

export interface FireballTierColors {
  outerFill: string;
  outerStroke: string;
  midFill: string;
  midStroke: string;
  innerFill: string;
  innerStroke: string;
  starFill?: string;
  starStroke?: string;
  spikesOuter?: string;
  spikesInner?: string;
}

export interface ShockwaveParams {
  radius1: number;
  alpha1: number;
  stroke1?: string;
  radius2: number;
  alpha2: number;
  stroke2?: string;
}

export interface StylizedFireballProps {
  cx?: number;
  cy?: number;
  scale?: number;
  coreFlash?: number;
  wobble?: number;
  cloudletDrift?: number;
  tierColors?: FireballTierColors;
  shockwaves?: ShockwaveParams;
  showSpikes?: boolean;
  showCloudlets?: boolean;
  showSparks?: boolean;
}

/**
 * L1 Shared Kit: Stylized 2D Vector Explosion Fireball
 * Reusable across all documentary reels for high-retention graphic novel explosions.
 */
export const StylizedFireball: React.FC<StylizedFireballProps> = ({
  cx = 540,
  cy = 1100,
  scale = 1.0,
  coreFlash = 0.5,
  wobble = 0,
  cloudletDrift = 0,
  tierColors = {
    outerFill: '#DC2626',
    outerStroke: '#7F1D1D',
    midFill: '#F97316',
    midStroke: '#C2410C',
    innerFill: '#FDE047',
    innerStroke: '#D97706',
    starFill: '#FFFFFF',
    starStroke: '#FEF08A',
    spikesOuter: '#F97316',
    spikesInner: '#FDE047',
  },
  shockwaves,
  showSpikes = true,
  showCloudlets = true,
  showSparks = true,
}) => {
  // 12-lobe outer profile
  const outerScales = [1.08, 0.93, 1.12, 0.91, 1.07, 0.95, 1.14, 0.92, 1.06, 0.94, 1.1, 0.96];
  // 10-lobe mid profile
  const midScales = [1.07, 0.92, 1.06, 0.94, 1.11, 0.93, 1.05, 0.91, 1.09, 0.95];
  // 8-lobe inner profile
  const innerScales = [1.09, 0.94, 1.07, 0.93, 1.12, 0.95, 1.05, 0.96];

  const outerPath = createArcScallopedCloud(245, 12, outerScales, wobble);
  const midPath = createArcScallopedCloud(175, 10, midScales, -wobble);
  const innerPath = createArcScallopedCloud(115, 8, innerScales, wobble * 0.5);

  const spikeAngles = [0, 26, 52, 78, 104, 130, 156, 182, 208, 234, 260, 286, 312, 338];
  const spikeLengths = [370, 400, 360, 420, 375, 395, 365, 410, 370, 405, 355, 415, 375, 390];

  const cloudlets = [
    { x: 250, y: -210, r: 24 },
    { x: -230, y: -200, r: 26 },
    { x: 310, y: 35, r: 28 },
    { x: -300, y: 25, r: 25 },
    { x: 250, y: 210, r: 24 },
    { x: -240, y: 200, r: 27 },
    { x: 30, y: -270, r: 22 },
    { x: 40, y: 265, r: 25 },
  ];

  return (
    <g>
      {/* Shockwave Rings */}
      {shockwaves && (
        <g transform={`translate(${cx}, ${cy})`}>
          {shockwaves.alpha1 > 0.01 && (
            <circle
              r={shockwaves.radius1}
              fill="none"
              stroke={shockwaves.stroke1 || '#38BDF8'}
              strokeWidth={5}
              opacity={shockwaves.alpha1}
            />
          )}
          {shockwaves.alpha2 > 0.01 && (
            <circle
              r={shockwaves.radius2}
              fill="none"
              stroke={shockwaves.stroke2 || '#FFFFFF'}
              strokeWidth={3.5}
              opacity={shockwaves.alpha2}
            />
          )}
        </g>
      )}

      {/* Main Fireball Body */}
      <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
        {/* Layer 1: Radiating Fire Spikes */}
        {showSpikes && (
          <g>
            {spikeAngles.map((deg, idx) => {
              const len = spikeLengths[idx];
              return (
                <g key={deg} transform={`rotate(${deg})`}>
                  <polygon
                    points={`0,-${len} -20,-170 20,-170`}
                    fill={tierColors.spikesOuter || tierColors.midFill}
                    stroke={tierColors.midStroke}
                    strokeWidth={2}
                  />
                  <polygon
                    points={`0,-${len - 38} -9,-190 9,-190`}
                    fill={tierColors.spikesInner || tierColors.innerFill}
                  />
                </g>
              );
            })}
          </g>
        )}

        {/* Layer 2: Outer Crimson Cloud */}
        <path
          d={outerPath}
          fill={tierColors.outerFill}
          stroke={tierColors.outerStroke}
          strokeWidth={4}
        />

        {/* Layer 3: Mid Amber Cloud */}
        <path
          d={midPath}
          fill={tierColors.midFill}
          stroke={tierColors.midStroke}
          strokeWidth={3.5}
        />

        {/* Layer 4: Inner Canary Yellow Cloud */}
        <path
          d={innerPath}
          fill={tierColors.innerFill}
          stroke={tierColors.innerStroke}
          strokeWidth={2.5}
        />

        {/* Layer 5: Epicenter 8-Pointed Core Flash Star */}
        <g>
          <path
            d={create8PointedStarPath(115)}
            fill={tierColors.starFill || '#FFFFFF'}
            stroke={tierColors.starStroke || '#FEF08A'}
            strokeWidth={4}
          />
          <circle cx="0" cy="0" r="28" fill={tierColors.starFill || '#FFFFFF'} />
          <circle
            cx="0"
            cy="0"
            r="18"
            fill={tierColors.starStroke || '#FEF08A'}
            opacity={coreFlash}
          />
        </g>

        {/* Layer 6: Detached Flying Cloudlets */}
        {showCloudlets &&
          cloudlets.map((cl, idx) => {
            const rad = Math.atan2(cl.y, cl.x);
            const dx = cl.x + Math.cos(rad) * cloudletDrift;
            const dy = cl.y + Math.sin(rad) * cloudletDrift;
            return (
              <g key={idx} transform={`translate(${dx}, ${dy})`}>
                <ellipse
                  cx="0"
                  cy="0"
                  rx={cl.r}
                  ry={cl.r * 0.85}
                  fill={tierColors.midFill}
                  stroke={tierColors.midStroke}
                  strokeWidth={2}
                />
                <circle cx={-cl.r * 0.35} cy={-cl.r * 0.15} r={cl.r * 0.55} fill={tierColors.midFill} />
                <circle cx={cl.r * 0.35} cy={-cl.r * 0.15} r={cl.r * 0.55} fill={tierColors.midFill} />
                <ellipse cx="0" cy="-2" rx={cl.r * 0.55} ry={cl.r * 0.4} fill={tierColors.starStroke || '#FEF08A'} />
              </g>
            );
          })}

        {/* Layer 7: Radiating Speed Sparks */}
        {showSparks &&
          [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((ang) => (
            <line
              key={ang}
              x1={Math.cos((ang * Math.PI) / 180) * 290}
              y1={Math.sin((ang * Math.PI) / 180) * 290}
              x2={Math.cos((ang * Math.PI) / 180) * 350}
              y2={Math.sin((ang * Math.PI) / 180) * 350}
              stroke={tierColors.starStroke || '#FEF08A'}
              strokeWidth={3}
              strokeLinecap="round"
            />
          ))}
      </g>
    </g>
  );
};
