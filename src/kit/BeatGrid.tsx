/**
 * L1 Shared Kit: BeatGrid Transient & Audio Synchronization Engine
 * Replaces static BPM beat grids with transient-driven audio sync.
 * Aligns scene cuts and payoff slams with Librosa/Aubio detected BASS_DROP, CYMBAL_CRASH, and ENERGY_PEAK events.
 */
import React, { createContext, useContext } from 'react';
import { PAYOFF_BEAT_WINDOW_FRAMES } from './tokens';

export type TransientType = 'BASS_DROP' | 'CYMBAL_CRASH' | 'ENERGY_PEAK' | 'BEAT_ONSET' | 'BEAT';

export interface TransientEvent {
  frame: number;
  type: TransientType;
  strength?: number;
  frequencyBand?: 'SUB_BASS' | 'MID' | 'HIGH';
}

export interface BeatGridData {
  analysisEngine?: string;
  bpm: number;
  beats?: Array<{ frame: number; timeSec?: number }>;
  transients?: TransientEvent[];
  transientStats?: {
    totalTransients: number;
    bassDropCount: number;
    cymbalCrashCount: number;
    energyPeakCount: number;
    onsetCount: number;
  };
}

export interface BeatTargetResult {
  offset: number;
  type: TransientType | 'TEMPO_GRID';
}

/**
 * Computes the frame-accurate payoff trigger frame offset inside a scene
 * based on Librosa/Aubio transient spectral flux analysis.
 */
export function computeExpectedBeatPayoffOffset(
  sceneStartFrame: number,
  beatGrid?: BeatGridData | null,
  archetype?: string,
  bpm = 120
): BeatTargetResult {
  const [minW, maxW] = PAYOFF_BEAT_WINDOW_FRAMES;

  if (beatGrid && Array.isArray(beatGrid.transients) && beatGrid.transients.length > 0) {
    const windowTransients = beatGrid.transients
      .filter((t) => t.frame >= sceneStartFrame + minW && t.frame <= sceneStartFrame + maxW)
      .map((t) => ({
        offset: t.frame - sceneStartFrame,
        type: t.type,
        strength: t.strength || 0,
      }));

    if (windowTransients.length > 0) {
      if (archetype === 'STRUCTURAL_FRACTURE') {
        const typePriority: Record<string, number> = {
          BASS_DROP: 4,
          CYMBAL_CRASH: 3,
          ENERGY_PEAK: 2,
          BEAT_ONSET: 1,
        };
        windowTransients.sort((a, b) => {
          const pA = typePriority[a.type] || 0;
          const pB = typePriority[b.type] || 0;
          if (pB !== pA) return pB - pA;
          if (b.strength !== a.strength) return b.strength - a.strength;
          return Math.abs(a.offset - 30) - Math.abs(b.offset - 30);
        });
        return { offset: windowTransients[0].offset, type: windowTransients[0].type };
      }

      const typePriority: Record<string, number> = {
        BASS_DROP: 3,
        CYMBAL_CRASH: 3,
        ENERGY_PEAK: 2,
        BEAT_ONSET: 1,
      };
      windowTransients.sort((a, b) => {
        const pA = typePriority[a.type] || 0;
        const pB = typePriority[b.type] || 0;
        if (pB !== pA) return pB - pA;
        return Math.abs(a.offset - 30) - Math.abs(b.offset - 30);
      });
      return { offset: windowTransients[0].offset, type: windowTransients[0].type };
    }
  }

  // Fallback to dynamic beats
  if (beatGrid && Array.isArray(beatGrid.beats) && beatGrid.beats.length > 0) {
    const candidates = beatGrid.beats
      .map((b) => b.frame - sceneStartFrame)
      .filter((offset) => offset >= minW && offset <= maxW);
    if (candidates.length > 0) {
      candidates.sort((a, b) => Math.abs(a - 30) - Math.abs(b - 30));
      return { offset: candidates[0], type: 'BEAT' };
    }
  }

  // Fallback to tempo grid
  const singleBeatFrames = Math.round((60 / (bpm || 120)) * 60);
  return {
    offset: Math.max(minW, Math.min(maxW, singleBeatFrames)),
    type: 'TEMPO_GRID',
  };
}

export const BeatGridContext = createContext<BeatGridData | null>(null);

export const BeatGridProvider: React.FC<{
  beatGrid: BeatGridData | null;
  children: React.ReactNode;
}> = ({ beatGrid, children }) => {
  return <BeatGridContext.Provider value={beatGrid}>{children}</BeatGridContext.Provider>;
};

export function useBeatSync(sceneStartFrame: number, archetype?: string, bpm = 120): BeatTargetResult {
  const grid = useContext(BeatGridContext);
  return computeExpectedBeatPayoffOffset(sceneStartFrame, grid, archetype, bpm);
}
