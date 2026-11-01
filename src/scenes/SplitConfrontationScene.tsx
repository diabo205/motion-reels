/**
 * L2 Composition Layer: SplitConfrontationScene Template
 * Archetype 6: Dual opposing silhouettes or emblems divided along a sharp vertical/diagonal axis.
 */
import React from 'react';
import { ArchetypeScene, ArchetypeSceneProps } from './ArchetypeScene';

export interface SplitConfrontationSceneProps extends Omit<ArchetypeSceneProps, 'archetype'> {
  leftFigure: React.ReactNode;
  rightFigure: React.ReactNode;
  splitAxisColor?: string;
}

export const SplitConfrontationScene: React.FC<SplitConfrontationSceneProps> = ({
  leftFigure,
  rightFigure,
  splitAxisColor = 'rgba(255, 255, 255, 0.25)',
  ...props
}) => {
  return (
    <ArchetypeScene {...props} archetype="SPLIT_CONFRONTATION">
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Left Side */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%' }}>
          {leftFigure}
        </div>
        {/* Central Split Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: 2,
            backgroundColor: splitAxisColor,
            zIndex: 15,
          }}
        />
        {/* Right Side */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '50%' }}>
          {rightFigure}
        </div>
      </div>
    </ArchetypeScene>
  );
};
