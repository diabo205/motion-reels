/**
 * L2 Composition Layer: StructuralFractureScene Template
 * Archetype 4: Architectural facade, fortress, or bunker sustaining explosive detonation.
 */
import React from 'react';
import { ArchetypeScene, ArchetypeSceneProps } from './ArchetypeScene';

export interface StructuralFractureSceneProps extends Omit<ArchetypeSceneProps, 'archetype'> {
  structureArt: React.ReactNode;
}

export const StructuralFractureScene: React.FC<StructuralFractureSceneProps> = ({ structureArt, ...props }) => {
  return (
    <ArchetypeScene
      {...props}
      archetype="STRUCTURAL_FRACTURE"
      camera={{
        movement: 'IMPACT_SHAKE',
        intensity: Math.max(0.85, props.camera?.intensity || 0.85),
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {structureArt}
      </div>
    </ArchetypeScene>
  );
};
