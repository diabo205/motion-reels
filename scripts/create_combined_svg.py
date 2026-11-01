import re

with open('projects/operation-cowboy-1945/plates/traced_silhouette.svg', 'r') as f:
    sil_content = f.read()
sil_d = re.search(r'd="([^"]+)"', sil_content).group(1)

with open('projects/operation-cowboy-1945/plates/traced_horse.svg', 'r') as f:
    horse_content = f.read()
horse_d = re.search(r'd="([^"]+)"', horse_content).group(1)

combined_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="554" height="554" viewBox="0 0 554 554">
  <rect width="554" height="554" fill="#0F1012"/>
  <!-- Ambient Backlight -->
  <circle cx="277" cy="277" r="220" fill="#D97706" opacity="0.4"/>
  <!-- Layer 1: Body silhouette (Pure White Lipizzaner) -->
  <path d="{sil_d}" fill="#FFFFFF"/>
  <!-- Layer 2: Graphic Linocut Shadows / Mane / Hooves -->
  <path d="{horse_d}" fill="#0F1012" fill-rule="evenodd"/>
</svg>'''

with open('projects/operation-cowboy-1945/plates/combined_horse_test.svg', 'w') as f:
    f.write(combined_svg)

print('Saved combined_horse_test.svg successfully!')
