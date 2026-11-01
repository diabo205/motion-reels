/**
 * L2 Composition Layer: VehicleInTransitScene Template
 * Archetype 3: Aircraft, naval vessel, or armor convoy with continuous micro-motion loop.
 */
import React from 'react';
import { ArchetypeScene, ArchetypeSceneProps } from './ArchetypeScene';

export interface VehicleInTransitSceneProps extends Omit<ArchetypeSceneProps, 'archetype'> {
  vehicleArt: React.ReactNode;
}

export const VehicleInTransitScene: React.FC<VehicleInTransitSceneProps> = ({ vehicleArt, ...props }) => {
  return (
    <ArchetypeScene {...props} archetype="VEHICLE_IN_TRANSIT">
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {vehicleArt}
      </div>
    </ArchetypeScene>
  );
};
