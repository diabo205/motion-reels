import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import {
  createGeoProjector,
  GeoCoordinates,
  GeoProjectorConfig,
  DEFAULT_TACTICAL_VIEWPORT,
  MapViewport,
} from './GeoJsonMapEngine';
import { ContestedTerritoryShading, TerritoryFaction, TerritoryPatternStyle } from './ContestedTerritoryShading';
import { AnimatedFrontline, ClashPoint } from './AnimatedFrontline';
import { TacticalMovementArrow } from './TacticalMovementArrow';
import { PulsatingBattleMarker, PulsatingBattleMarkerProps } from './PulsatingBattleMarker';
import { TroopUnitMarker, TroopUnitMarkerProps } from './TroopUnitMarker';

export interface TacticalTerritoryConfig {
  id: string;
  geojson?: any;
  path?: string;
  faction?: TerritoryFaction;
  customColor?: string;
  patternStyle?: TerritoryPatternStyle;
  label?: string;
  labelCenter?: [number, number];
}

export interface TacticalArrowConfig {
  id: string;
  path?: string;
  geoPoints?: GeoCoordinates[];
  strokeColor?: string;
  strokeWidth?: number;
  arrowHead?: 'CHEVRON' | 'SPEARHEAD' | 'PINCER' | 'DOT';
  animationMode?: 'FLOWING_DASHES' | 'PROGRESSIVE_DRAW' | 'PULSING_SOLID';
  flowSpeed?: number;
  label?: string;
}

export interface TacticalFrontlineConfig {
  id: string;
  path?: string;
  geoPoints?: GeoCoordinates[];
  alliedColor?: string;
  hostileColor?: string;
  style?: 'DUAL_RIBBON' | 'JAGGED_TEETH' | 'HAZARD_STRIPES' | 'GLOWING_LINE';
  clashPoints?: ClashPoint[];
}

export interface TacticalMarkerConfig extends Omit<PulsatingBattleMarkerProps, 'x' | 'y'> {
  id: string;
  geoCoords?: GeoCoordinates;
  x?: number;
  y?: number;
}

export interface TacticalUnitConfig extends Omit<TroopUnitMarkerProps, 'x' | 'y'> {
  id: string;
  geoCoords?: GeoCoordinates;
  x?: number;
  y?: number;
}

export interface GeoTacticalMapProps {
  geoJsonData?: any; // Base geography (continents, islands, coastlines)
  projectorConfig?: GeoProjectorConfig;
  viewport?: MapViewport;
  theme?: 'POLAR' | 'CRISIS' | 'ESPIONAGE' | 'DESERT';
  showGraticule?: boolean;
  showBathymetry?: boolean;
  showCompassRose?: boolean;
  showScaleBar?: boolean;
  theaterTitle?: string;
  territories?: TacticalTerritoryConfig[];
  frontlines?: TacticalFrontlineConfig[];
  arrows?: TacticalArrowConfig[];
  markers?: TacticalMarkerConfig[];
  units?: TacticalUnitConfig[];
  fontFamily?: string;
}

const THEME_PALETTES = {
  POLAR: {
    background: '#070D14',
    border: '#1E293B',
    graticule: 'rgba(56, 189, 248, 0.15)',
    landFill: '#0F172A',
    landStroke: '#38BDF8',
    waterGlow: 'rgba(56, 189, 248, 0.2)',
    accent: '#38BDF8',
  },
  CRISIS: {
    background: '#0F1012',
    border: '#292524',
    graticule: 'rgba(239, 68, 68, 0.14)',
    landFill: '#1C1917',
    landStroke: '#EF4444',
    waterGlow: 'rgba(239, 68, 68, 0.2)',
    accent: '#EF4444',
  },
  ESPIONAGE: {
    background: '#0B1310',
    border: '#1E293B',
    graticule: 'rgba(16, 185, 129, 0.15)',
    landFill: '#13211B',
    landStroke: '#34D399',
    waterGlow: 'rgba(56, 189, 248, 0.18)',
    accent: '#38BDF8',
  },
  DESERT: {
    background: '#14100C',
    border: '#292524',
    graticule: 'rgba(245, 158, 11, 0.15)',
    landFill: '#241D17',
    landStroke: '#F59E0B',
    waterGlow: 'rgba(245, 158, 11, 0.18)',
    accent: '#F59E0B',
  },
};

export const GeoTacticalMap: React.FC<GeoTacticalMapProps> = ({
  geoJsonData,
  projectorConfig = {},
  viewport = DEFAULT_TACTICAL_VIEWPORT,
  theme = 'POLAR',
  showGraticule = true,
  showBathymetry = true,
  showCompassRose = true,
  showScaleBar = true,
  theaterTitle,
  territories = [],
  frontlines = [],
  arrows = [],
  markers = [],
  units = [],
  fontFamily = 'Montserrat, Inter, sans-serif',
}) => {
  const frame = useCurrentFrame();
  const palette = THEME_PALETTES[theme] || THEME_PALETTES.POLAR;

  // Initialize the d3-geo projection engine
  const projector = useMemo(() => {
    return createGeoProjector({
      viewport,
      fitFeatures: geoJsonData,
      ...projectorConfig,
    });
  }, [geoJsonData, projectorConfig, viewport]);

  // Project base GeoJSON landmass
  const baseLandPath = useMemo(() => {
    if (!geoJsonData) return '';
    return projector.projectPath(geoJsonData);
  }, [geoJsonData, projector]);

  // Project Graticule lines
  const graticulePath = useMemo(() => {
    if (!showGraticule) return '';
    return projector.getGraticulePath([10, 10]);
  }, [showGraticule, projector]);

  // Compass Rose angle micro-oscillation
  const compassAngle = Math.sin(frame * 0.05) * 1.5;

  return (
    <g>
      {/* 1. Map Tactical Viewport Border & Background */}
      <rect
        x={viewport.x}
        y={viewport.y}
        width={viewport.width}
        height={viewport.height}
        rx="8"
        fill={palette.background}
        stroke={palette.border}
        strokeWidth="3"
      />

      {/* 2. Tactical Lat/Long Graticule Grid Lines */}
      {showGraticule && graticulePath && (
        <path
          d={graticulePath}
          fill="none"
          stroke={palette.graticule}
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
      )}

      {/* 3. Bathymetric Ocean Depth Contours */}
      {showBathymetry && (
        <g fill="none" stroke={palette.waterGlow} strokeWidth="1.5" opacity="0.6">
          <ellipse
            cx={viewport.x + viewport.width * 0.5}
            cy={viewport.y + viewport.height * 0.75}
            rx={viewport.width * 0.42}
            ry={viewport.height * 0.22}
            strokeDasharray="8 6"
          />
          <ellipse
            cx={viewport.x + viewport.width * 0.5}
            cy={viewport.y + viewport.height * 0.78}
            rx={viewport.width * 0.35}
            ry={viewport.height * 0.16}
          />
        </g>
      )}

      {/* 4. Projected GeoJSON Landmasses */}
      {baseLandPath && (
        <path
          d={baseLandPath}
          fill={palette.landFill}
          stroke={palette.landStroke}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      )}

      {/* 5. Contested Territory Shading Layers */}
      {territories.map((t) => {
        const pathString = t.path || (t.geojson ? projector.projectPath(t.geojson) : '');
        if (!pathString) return null;
        return (
          <ContestedTerritoryShading
            key={t.id}
            id={t.id}
            path={pathString}
            faction={t.faction}
            customColor={t.customColor}
            patternStyle={t.patternStyle || 'DIAGONAL_STRIPES'}
            label={t.label}
            labelCenter={t.labelCenter}
            fontFamily={fontFamily}
          />
        );
      })}

      {/* 6. Animated Tactical Frontlines */}
      {frontlines.map((fl) => {
        let pathString = fl.path || '';
        if (!pathString && fl.geoPoints && fl.geoPoints.length > 0) {
          const pts = fl.geoPoints.map((gp) => projector.project(gp));
          pathString = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
          for (let i = 1; i < pts.length; i++) {
            pathString += ` L ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`;
          }
        }
        if (!pathString) return null;
        return (
          <AnimatedFrontline
            key={fl.id}
            id={fl.id}
            path={pathString}
            alliedColor={fl.alliedColor}
            hostileColor={fl.hostileColor}
            style={fl.style || 'DUAL_RIBBON'}
            clashPoints={fl.clashPoints}
            fontFamily={fontFamily}
          />
        );
      })}

      {/* 7. Troop Movement Tactical Arrows */}
      {arrows.map((ar) => {
        let pathString = ar.path || '';
        if (!pathString && ar.geoPoints && ar.geoPoints.length > 0) {
          const pts = ar.geoPoints.map((gp) => projector.project(gp));
          pathString = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
          for (let i = 1; i < pts.length; i++) {
            pathString += ` L ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`;
          }
        }
        if (!pathString) return null;
        return (
          <TacticalMovementArrow
            key={ar.id}
            id={ar.id}
            path={pathString}
            strokeColor={ar.strokeColor || palette.accent}
            strokeWidth={ar.strokeWidth || 4}
            arrowHead={ar.arrowHead || 'CHEVRON'}
            animationMode={ar.animationMode || 'FLOWING_DASHES'}
            flowSpeed={ar.flowSpeed || 3.5}
            label={ar.label}
            fontFamily={fontFamily}
          />
        );
      })}

      {/* 8. Pulsating Battle Clash Markers */}
      {markers.map((m) => {
        let posX = m.x ?? 0;
        let posY = m.y ?? 0;
        if (m.geoCoords) {
          const [px, py] = projector.project(m.geoCoords);
          posX = px;
          posY = py;
        }
        return (
          <PulsatingBattleMarker
            key={m.id}
            x={posX}
            y={posY}
            color={m.color}
            size={m.size}
            label={m.label}
            sublabel={m.sublabel}
            pulseSpeed={m.pulseSpeed}
            ringCount={m.ringCount}
            showCrosshairs={m.showCrosshairs}
            impactFlash={m.impactFlash}
            impactFrame={m.impactFrame}
            fontFamily={fontFamily}
          />
        );
      })}

      {/* 9. Military Troop Echelon Markers */}
      {units.map((u) => {
        let posX = u.x ?? 0;
        let posY = u.y ?? 0;
        if (u.geoCoords) {
          const [px, py] = projector.project(u.geoCoords);
          posX = px;
          posY = py;
        }
        return (
          <TroopUnitMarker
            key={u.id}
            x={posX}
            y={posY}
            branch={u.branch}
            echelon={u.echelon}
            designation={u.designation}
            factionColor={u.factionColor || palette.accent}
            scale={u.scale}
            fontFamily={fontFamily}
          />
        );
      })}

      {/* 10. Tactical HUD Compass Rose (Top-Right) */}
      {showCompassRose && (
        <g
          transform={`translate(${viewport.x + viewport.width - 48}, ${viewport.y + 48}) rotate(${compassAngle})`}
          opacity="0.8"
        >
          <circle cx="0" cy="0" r="22" fill="none" stroke={palette.border} strokeWidth="1.5" />
          <polygon points="0,-20 5,-4 0,0 -5,-4" fill={palette.accent} />
          <polygon points="0,20 4,4 0,0 -4,4" fill="#94A3B8" />
          <text
            x="0"
            y="-24"
            textAnchor="middle"
            fill={palette.accent}
            fontFamily={fontFamily}
            fontSize="10"
            fontWeight="900"
          >
            N
          </text>
        </g>
      )}

      {/* 11. Tactical Scale Bar (Bottom-Left) */}
      {showScaleBar && (
        <g transform={`translate(${viewport.x + 24}, ${viewport.y + viewport.height - 24})`} opacity="0.8">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#F4F7FA" strokeWidth="2" />
          <line x1="0" y1="-5" x2="0" y2="5" stroke="#F4F7FA" strokeWidth="2" />
          <line x1="40" y1="-3" x2="40" y2="3" stroke="#F4F7FA" strokeWidth="1.5" />
          <line x1="80" y1="-5" x2="80" y2="5" stroke="#F4F7FA" strokeWidth="2" />
          <text
            x="40"
            y="-8"
            textAnchor="middle"
            fill="#94A3B8"
            fontFamily={fontFamily}
            fontSize="9"
            fontWeight="700"
            letterSpacing="0.05em"
          >
            100 NM
          </text>
        </g>
      )}

      {/* 12. Theater Title Badge (Top-Left) */}
      {theaterTitle && (
        <g transform={`translate(${viewport.x + 20}, ${viewport.y + 32})`}>
          <rect
            x="-6"
            y="-14"
            width={theaterTitle.length * 8.5 + 20}
            height="22"
            rx="3"
            fill="rgba(10, 17, 24, 0.9)"
            stroke={palette.border}
            strokeWidth="1"
          />
          <text
            x="4"
            y="1"
            fill="#F4F7FA"
            fontFamily={fontFamily}
            fontSize="10"
            fontWeight="800"
            letterSpacing="0.08em"
          >
            {theaterTitle.toUpperCase()}
          </text>
        </g>
      )}
    </g>
  );
};
