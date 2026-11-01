/**
 * L2 Composition Layer: VectorMapScene Template
 * Archetype 5: Stylized tactical contours, water boundaries, and heading-aligned vectors.
 */
import React from 'react';
import { ArchetypeScene, ArchetypeSceneProps } from './ArchetypeScene';

export interface VectorMapSceneProps extends Omit<ArchetypeSceneProps, 'archetype'> {
  mapArt: React.ReactNode;
}

export const VectorMapScene: React.FC<VectorMapSceneProps> = ({ mapArt, ...props }) => {
  return (
    <ArchetypeScene {...props} archetype="VECTOR_MAP">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {mapArt}
      </div>
    </ArchetypeScene>
  );
};
