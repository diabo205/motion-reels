with open('src/components/CowboyVectors.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

start_marker = '        {/* --- Multiplane Galloping Lipizzaner Herd --- */}'
end_marker = '        </g>\n      </svg>\n    </div>\n  );\n};\n\n// =========================================================================\n// 19. SCENE 19: THE SOVIET T-34S ARRIVE'

replacement = '''        {/* --- Multiplane Galloping Lipizzaner Herd with 4-Pose Gallop Cycle --- */}
        <g transform="translate(0, 0)">
          {/* 1. BACKGROUND HORSE (Leading in distance, Staggered Stride) */}
          <g
            transform="translate(480, 930)"
            opacity={0.72}
            filter="drop-shadow(0 0 14px rgba(254, 240, 138, 0.3))"
          >
            <LipizzanerHorse
              width={480}
              height={390}
              bodyColor="#CBD5E1"
              lineColor="#1E293B"
              flipX={true}
              animated={true}
              strideDurationFrames={20}
              frameOffset={14}
            />
          </g>

          {/* 2. MIDGROUND HORSE (Flanking Left, Staggered Stride) */}
          <g
            transform="translate(40, 960)"
            opacity={0.88}
            filter="drop-shadow(0 0 18px rgba(254, 240, 138, 0.35))"
          >
            <LipizzanerHorse
              width={560}
              height={455}
              bodyColor="#F1F5F9"
              lineColor="#0F1012"
              flipX={true}
              animated={true}
              strideDurationFrames={22}
              frameOffset={7}
            />
          </g>

          {/* 3. FOREGROUND LEAD HERO STALLION (4-Pose Full-Extension Gallop Cycle) */}
          <g
            transform="translate(190, 890)"
            filter="drop-shadow(0 0 32px rgba(255, 255, 255, 0.55))"
          >
            <LipizzanerHorse
              width={680}
              height={550}
              bodyColor="#FFFFFF"
              lineColor="#0F1012"
              flipX={true}
              animated={true}
              strideDurationFrames={24}
              frameOffset={0}
            />
          </g>

          {/* Galloping Motion Lines & Grassland Turf Line */}
          <g stroke="#F59E0B" strokeWidth="2.5" opacity="0.45" strokeDasharray="30 15">
            <line x1="80" y1="1450" x2="880" y2="1450" />
            <line x1="140" y1="1470" x2="820" y2="1470" strokeWidth="1.5" strokeDasharray="20 20" />
          </g>'''

start_idx = code.find(start_marker)
end_idx = code.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_code = code[:start_idx] + replacement + '\n' + code[end_idx:]
    with open('src/components/CowboyVectors.tsx', 'w', encoding='utf-8') as f:
        f.write(new_code)
    print('Updated Scene 18 with 4-pose animated gallop cycle successfully!')
else:
    print('Error finding markers:', start_idx, end_idx)
