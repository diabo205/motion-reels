/**
 * GeoJSON / TopoJSON Tactical Projection Engine for 9:16 Canvas
 * Powered by d3-geo & topojson-client
 * 
 * Translates real geographic coordinates [longitude, latitude] into
 * pixel-accurate SVG paths within 1080x1920 mobile documentary canvases.
 */

import {
  geoMercator,
  geoOrthographic,
  geoAzimuthalEqualArea,
  geoConicEqualArea,
  geoEqualEarth,
  geoPath,
  geoGraticule,
  geoInterpolate,
  GeoProjection,
  GeoPermissibleObjects,
} from 'd3-geo';
import { feature as topojsonFeature, mesh as topojsonMesh } from 'topojson-client';

export type GeoCoordinates = [number, number]; // [longitude, latitude]
export type ProjectionType =
  | 'mercator'
  | 'orthographic'
  | 'azimuthalEqualArea'
  | 'conicEqualArea'
  | 'equalEarth';

export interface MapViewport {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Default safe-zone artwork bounds: x=60..910, y=880..1470 (width=850, height=590) */
export const DEFAULT_TACTICAL_VIEWPORT: MapViewport = {
  x: 60,
  y: 880,
  width: 850,
  height: 590,
};

export interface GeoProjectorConfig {
  projectionType?: ProjectionType;
  viewport?: MapViewport;
  fitFeatures?: any; // GeoJSON object to fit automatically
  center?: GeoCoordinates;
  scale?: number;
  rotate?: [number, number] | [number, number, number];
  precision?: number;
  clipAngle?: number;
}

export interface GeoProjector {
  projection: GeoProjection;
  pathGenerator: (object: GeoPermissibleObjects) => string;
  project: (coords: GeoCoordinates) => [number, number];
  projectPath: (object: any) => string;
  getGraticulePath: (step?: [number, number]) => string;
  viewport: MapViewport;
}

/**
 * Creates a calibrated d3-geo projector configured for the 1080x1920 canvas
 */
export function createGeoProjector(config: GeoProjectorConfig = {}): GeoProjector {
  const {
    projectionType = 'mercator',
    viewport = DEFAULT_TACTICAL_VIEWPORT,
    fitFeatures,
    center,
    scale,
    rotate,
    precision = 0.5,
    clipAngle,
  } = config;

  let proj: GeoProjection;

  switch (projectionType) {
    case 'orthographic':
      proj = geoOrthographic();
      break;
    case 'azimuthalEqualArea':
      proj = geoAzimuthalEqualArea();
      break;
    case 'conicEqualArea':
      proj = geoConicEqualArea();
      break;
    case 'equalEarth':
      proj = geoEqualEarth();
      break;
    case 'mercator':
    default:
      proj = geoMercator();
      break;
  }

  proj.precision(precision);

  if (clipAngle !== undefined && 'clipAngle' in proj) {
    (proj as any).clipAngle(clipAngle);
  }

  if (rotate) {
    proj.rotate(rotate as any);
  }

  if (fitFeatures) {
    proj.fitExtent(
      [
        [viewport.x + 20, viewport.y + 20],
        [viewport.x + viewport.width - 20, viewport.y + viewport.height - 20],
      ],
      fitFeatures
    );
  } else {
    if (center) {
      proj.center(center);
    }
    if (scale !== undefined) {
      proj.scale(scale);
    }
    proj.translate([
      viewport.x + viewport.width / 2,
      viewport.y + viewport.height / 2,
    ]);
  }

  const generator = geoPath().projection(proj);

  return {
    projection: proj,
    pathGenerator: (obj: GeoPermissibleObjects) => generator(obj) || '',
    project: (coords: GeoCoordinates) => {
      const p = proj(coords);
      return p ? [p[0], p[1]] : [0, 0];
    },
    projectPath: (obj: any) => generator(obj) || '',
    getGraticulePath: (step: [number, number] = [10, 10]) => {
      const grat = geoGraticule().step(step);
      return generator(grat()) || '';
    },
    viewport,
  };
}

/**
 * Decodes TopoJSON data into GeoJSON FeatureCollection
 */
export function decodeTopoJson(topoJsonData: any, objectName?: string): any {
  if (!topoJsonData || !topoJsonData.objects) return null;
  const targetKey = objectName || Object.keys(topoJsonData.objects)[0];
  const obj = topoJsonData.objects[targetKey];
  if (!obj) return null;
  return topojsonFeature(topoJsonData, obj);
}

/**
 * Interpolates coordinates along a great circle path between two geographic points
 */
export function interpolateGeoPath(
  start: GeoCoordinates,
  end: GeoCoordinates,
  steps = 30
): GeoCoordinates[] {
  const interpolator = geoInterpolate(start, end);
  const coords: GeoCoordinates[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    coords.push(interpolator(t) as GeoCoordinates);
  }
  return coords;
}

/**
 * Converts a sequence of GeoCoordinates into an SVG path string via a projector
 */
export function geoCoordinatesToSvgPath(
  coords: GeoCoordinates[],
  projector: (coords: GeoCoordinates) => [number, number],
  closed = false
): string {
  if (!coords || coords.length === 0) return '';
  const pts = coords.map((c) => projector(c));
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`;
  }
  if (closed) d += ' Z';
  return d;
}

// =========================================================================
// Real-world GeoJSON Theater Presets for Instant Tactical Maps
// =========================================================================

/** 1. 1942 Aleutian Campaign Theater: Real GPS Islands & Coastlines */
export const ALEUTIAN_THEATER_GEOJSON = {
  type: 'FeatureCollection',
  features: [
    // Alaska Mainland & Peninsula Coastline
    {
      type: 'Feature',
      properties: { name: 'Alaska Peninsula', faction: 'ALLIED' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-165.0, 54.5],
            [-164.2, 55.0],
            [-162.8, 55.4],
            [-160.5, 56.1],
            [-158.2, 57.0],
            [-156.0, 58.0],
            [-154.5, 59.2],
            [-153.0, 60.0],
            [-151.0, 60.5],
            [-151.0, 61.5],
            [-154.0, 61.8],
            [-157.0, 60.5],
            [-160.0, 59.2],
            [-162.0, 58.0],
            [-165.0, 56.0],
            [-165.0, 54.5],
          ],
        ],
      },
    },
    // Kamchatka Coastline (Siberia / Far East)
    {
      type: 'Feature',
      properties: { name: 'Kamchatka Peninsula', faction: 'NEUTRAL_SOVIET' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [163.0, 52.0],
            [160.0, 53.5],
            [159.0, 55.0],
            [161.0, 56.5],
            [163.5, 58.0],
            [161.0, 59.0],
            [158.0, 57.0],
            [156.0, 54.0],
            [157.0, 51.5],
            [163.0, 52.0],
          ],
        ],
      },
    },
    // Komandorski Islands (Battle of the Komandorski Islands)
    {
      type: 'Feature',
      properties: { name: 'Bering Island', faction: 'NEUTRAL_SOVIET' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [166.0, 55.1],
            [166.4, 55.3],
            [166.6, 54.9],
            [166.1, 54.8],
            [166.0, 55.1],
          ],
        ],
      },
    },
    // Attu Island (Operation Landcrab, Engineer Hill)
    {
      type: 'Feature',
      properties: { name: 'Attu Island', faction: 'CONTESTED' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [172.8, 52.95],
            [173.2, 53.0],
            [173.35, 52.85],
            [173.0, 52.8],
            [172.8, 52.95],
          ],
        ],
      },
    },
    // Kiska Island (Fortress Kiska, Operation Cottage)
    {
      type: 'Feature',
      properties: { name: 'Kiska Island', faction: 'AXIS' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [177.4, 52.05],
            [177.6, 52.1],
            [177.55, 51.9],
            [177.35, 51.95],
            [177.4, 52.05],
          ],
        ],
      },
    },
    // Adak Island (Forward Allied Naval & Air Base)
    {
      type: 'Feature',
      properties: { name: 'Adak Island', faction: 'ALLIED' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-176.7, 51.9],
            [-176.5, 51.95],
            [-176.4, 51.75],
            [-176.7, 51.7],
            [-176.7, 51.9],
          ],
        ],
      },
    },
    // Unalaska / Dutch Harbor (Target of Carrier Raid June 1942)
    {
      type: 'Feature',
      properties: { name: 'Dutch Harbor', faction: 'ALLIED' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-166.6, 53.95],
            [-166.3, 54.0],
            [-166.2, 53.7],
            [-166.7, 53.6],
            [-166.6, 53.95],
          ],
        ],
      },
    },
  ],
};

/** 2. 1945 Operation Cowboy: Central Europe, Bavaria, Bohemia (Hostau) */
export const OPERATION_COWBOY_GEOJSON = {
  type: 'FeatureCollection',
  features: [
    // Third Reich Bavarian Territory
    {
      type: 'Feature',
      properties: { name: 'Bavaria Sector', faction: 'AXIS' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [11.5, 49.0],
            [12.8, 49.8],
            [12.5, 50.2],
            [11.0, 50.1],
            [10.8, 49.2],
            [11.5, 49.0],
          ],
        ],
      },
    },
    // Czechoslovakian Borderland & Hostau Stud Farm
    {
      type: 'Feature',
      properties: { name: 'Bohemia / Hostau', faction: 'CONTESTED' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [12.5, 49.3],
            [13.4, 49.7],
            [13.6, 50.1],
            [12.8, 50.0],
            [12.5, 49.3],
          ],
        ],
      },
    },
    // Advancing Soviet Red Army Sector
    {
      type: 'Feature',
      properties: { name: 'Soviet Line of Demarcation', faction: 'ALLIED_SOVIET' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [13.6, 49.5],
            [14.5, 49.8],
            [14.8, 50.2],
            [13.8, 50.1],
            [13.6, 49.5],
          ],
        ],
      },
    },
  ],
};

/** 3. 1850 Taiping Rebellion: Yangtze River Corridor & Nanjing */
export const TAIPING_THEATER_GEOJSON = {
  type: 'FeatureCollection',
  features: [
    // Qing Imperial Stronghold
    {
      type: 'Feature',
      properties: { name: 'Qing Empire', faction: 'IMPERIAL' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [113.0, 31.5],
            [118.5, 32.5],
            [121.0, 32.2],
            [121.5, 30.5],
            [117.0, 29.5],
            [113.0, 31.5],
          ],
        ],
      },
    },
    // Taiping Heavenly Kingdom (Tianjing / Nanjing Hub)
    {
      type: 'Feature',
      properties: { name: 'Heavenly Kingdom', faction: 'TAIPING' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [116.5, 31.0],
            [119.5, 32.2],
            [120.5, 31.5],
            [118.2, 30.2],
            [116.5, 31.0],
          ],
        ],
      },
    },
    // Yangtze River Corridor
    {
      type: 'Feature',
      properties: { name: 'Yangtze River', type: 'RIVER' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [112.5, 30.0],
          [114.3, 30.6],
          [116.0, 29.8],
          [118.4, 31.5],
          [119.0, 32.1],
          [121.2, 31.4],
        ],
      },
    },
  ],
};

/** 4. 1960 U-2 Incident: Flight Route Operation Grand Slam */
export const U2_INCIDENT_GEOJSON = {
  type: 'FeatureCollection',
  features: [
    // Soviet Air Defense Sector (Ural Mountains & Sverdlovsk)
    {
      type: 'Feature',
      properties: { name: 'Soviet Air Defense Zone', faction: 'SOVIET_AIR_DEFENSE' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [55.0, 54.0],
            [65.0, 54.0],
            [68.0, 62.0],
            [56.0, 62.0],
            [55.0, 54.0],
          ],
        ],
      },
    },
    // Operation Grand Slam U-2 Flight Path (Peshawar -> Sverdlovsk -> Bodø)
    {
      type: 'Feature',
      properties: { name: 'Operation Grand Slam', type: 'FLIGHT_PATH' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [71.5, 34.0], // Peshawar, Pakistan
          [68.0, 39.0], // Hindu Kush crossing
          [64.5, 43.5], // Aral Sea / Baikonur Cosmodrome
          [60.6, 56.8], // Sverdlovsk (SAM Detonation site)
          [40.0, 65.0], // Intended Arkhangelsk leg
          [14.4, 67.3], // Intended destination Bodø, Norway
        ],
      },
    },
  ],
};
