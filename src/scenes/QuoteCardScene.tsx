/**
 * L2 Composition Layer: QuoteCardScene Template
 * Archetype 7: Primary-source intercept, telegram, or quote reveal with attribution badge.
 */
import React from 'react';
import { ArchetypeScene, ArchetypeSceneProps } from './ArchetypeScene';

export interface QuoteCardSceneProps extends Omit<ArchetypeSceneProps, 'archetype'> {
  quoteText: string;
  attribution: string;
  documentArt?: React.ReactNode;
}

export const QuoteCardScene: React.FC<QuoteCardSceneProps> = ({
  quoteText,
  attribution,
  documentArt,
  ...props
}) => {
  return (
    <ArchetypeScene
      {...props}
      archetype="QUOTE_CARD"
      quoteAttribution={attribution}
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
        {documentArt}
      </div>
    </ArchetypeScene>
  );
};
