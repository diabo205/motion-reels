/**
 * L2 Composition Layer: LoneLeaderScene Template
 * Archetype 1: Stark silhouette of key leader or commander against atmospheric horizon backlighting.
 */
import React from 'react';
import { ArchetypeScene, ArchetypeSceneProps } from './ArchetypeScene';

export interface LoneLeaderSceneProps extends Omit<ArchetypeSceneProps, 'archetype'> {
  leaderFigure: React.ReactNode;
}

export const LoneLeaderScene: React.FC<LoneLeaderSceneProps> = ({ leaderFigure, ...props }) => {
  return (
    <ArchetypeScene {...props} archetype="LONE_LEADER">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {leaderFigure}
      </div>
    </ArchetypeScene>
  );
};
