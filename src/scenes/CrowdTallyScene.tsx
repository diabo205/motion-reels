/**
 * L2 Composition Layer: CrowdTallyScene Template
 * Archetype 2: Rank-and-file silhouettes or tally clusters paired with rolling integer counters.
 */
import React from 'react';
import { ArchetypeScene, ArchetypeSceneProps } from './ArchetypeScene';

export interface CrowdTallySceneProps extends Omit<ArchetypeSceneProps, 'archetype'> {
  tallyArt: React.ReactNode;
}

export const CrowdTallyScene: React.FC<CrowdTallySceneProps> = ({ tallyArt, ...props }) => {
  return (
    <ArchetypeScene {...props} archetype="CROWD_TALLY">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {tallyArt}
      </div>
    </ArchetypeScene>
  );
};
