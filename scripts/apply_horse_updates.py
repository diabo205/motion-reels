import re

with open('src/components/CowboyVectors.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update CowboyMassLipizzanerStampede
stampede_pattern = r'export const CowboyMassLipizzanerStampede: React\.FC = \(\) => \{[\s\S]*?export const CowboySovietT34RidgeArrival'

new_stampede = '''export const CowboyMassLipizzanerStampede: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox="0 0 1080 1920" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <AmberHorizonGlow cx={540} cy={1280} rx={500} ry={280} intensity={1.0} />

        {/* Rolling Churned Dust Storm in Background */}
        <g opacity="0.45">
          <ellipse cx="380" cy="1360" rx="340" ry="70" fill="#78350F" />
          <ellipse cx="680" cy="1350" rx="360" ry="65" fill="#92400E" />
        </g>

        {/* --- Multiplane Galloping Lipizzaner Herd --- */}
        <g transform="translate(0, 0)">
          {/* 1. BACKGROUND HORSE (Leading in distance) */}
          {(() => {
            const hGallop = Math.sin((frame + 16) * 0.35) * 8;
            return (
              <g
                transform={`translate(480, ${930 - hGallop}) scale(0.55)`}
                opacity={0.7}
                filter="drop-shadow(0 0 14px rgba(254, 240, 138, 0.3))"
              >
                <LipizzanerHorse
                  width={554}
                  height={554}
                  bodyColor="#CBD5E1"
                  lineColor="#1E293B"
                  flipX={true}
                />
              </g>
            );
          })()}

          {/* 2. MIDGROUND HORSE (Flanking Left) */}
          {(() => {
            const hGallop = Math.sin((frame + 8) * 0.35) * 12;
            return (
              <g
                transform={`translate(60, ${970 - hGallop}) scale(0.68)`}
                opacity={0.88}
                filter="drop-shadow(0 0 18px rgba(254, 240, 138, 0.35))"
              >
                <LipizzanerHorse
                  width={554}
                  height={554}
                  bodyColor="#F1F5F9"
                  lineColor="#0F1012"
                  flipX={true}
                />
              </g>
            );
          })()}

          {/* 3. FOREGROUND LEAD HERO STALLION (Full Graphic Linocut Fidelity) */}
          {(() => {
            const hGallop = Math.sin(frame * 0.35) * 15;
            const hTilt = Math.sin(frame * 0.35) * 2;
            return (
              <g
                transform={`translate(220, ${900 - hGallop}) rotate(${hTilt} 277 277) scale(0.92)`}
                filter="drop-shadow(0 0 32px rgba(255, 255, 255, 0.55))"
              >
                <LipizzanerHorse
                  width={554}
                  height={554}
                  bodyColor="#FFFFFF"
                  lineColor="#0F1012"
                  flipX={true}
                />
              </g>
            );
          })()}

          {/* Galloping Motion Lines & Grassland Turf Line */}
          <g stroke="#F59E0B" strokeWidth="2.5" opacity="0.45" strokeDasharray="30 15">
            <line x1="80" y1="1450" x2="880" y2="1450" />
            <line x1="140" y1="1470" x2="820" y2="1470" strokeWidth="1.5" strokeDasharray="20 20" />
          </g>
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// 19. SCENE 19: THE SOVIET T-34S ARRIVE (Split Confrontation)
// Soviet T-34/85 tank on eastern ridge, too late, watching herd disappear.
// =========================================================================
export const CowboySovietT34RidgeArrival'''

code, count1 = re.subn(stampede_pattern, new_stampede, code)
print('Replaced CowboyMassLipizzanerStampede:', count1)

# 2. Update CowboyEpilogueSpanishRidingSchool horse inside wreath
epilogue_horse_pattern = r'\{\/\* Authentic Baroque Lipizzaner Capriole Leap[\s\S]*?Imperial Crown Emblem at Top of Wreath'
new_epilogue_horse = '''{/* Authentic Baroque Lipizzaner Graphic Linocut Silhouette */}
          <g transform="translate(-105, -115)">
            <LipizzanerHorse
              width={210}
              height={210}
              bodyColor="#FFFFFF"
              lineColor="#1C1917"
            />
          </g>

          {/* Imperial Crown Emblem at Top of Wreath'''

code, count2 = re.subn(epilogue_horse_pattern, new_epilogue_horse, code)
print('Replaced CowboyEpilogueSpanishRidingSchool horse:', count2)

with open('src/components/CowboyVectors.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print('Updated src/components/CowboyVectors.tsx successfully!')
