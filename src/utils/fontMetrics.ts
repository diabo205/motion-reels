/**
 * TypeScript Glyph Advance-Width & Responsive 2-Line Fit Utility for Remotion Components.
 */

const MONT_BLACK_ADVANCE_EM: Record<string, number> = {
  ' ': 0.280, '!': 0.345, '"': 0.460, '#': 0.760, '$': 0.680, '%': 0.920, '&': 0.810,
  "'": 0.265, '(': 0.395, ')': 0.395, '*': 0.480, '+': 0.640, ',': 0.310, '-': 0.430,
  '.': 0.310, '/': 0.470, '0': 0.735, '1': 0.475, '2': 0.665, '3': 0.665, '4': 0.725,
  '5': 0.665, '6': 0.695, '7': 0.645, '8': 0.720, '9': 0.695, ':': 0.335, ';': 0.335,
  'A': 0.815, 'B': 0.785, 'C': 0.765, 'D': 0.835, 'E': 0.705, 'F': 0.675, 'G': 0.815,
  'H': 0.835, 'I': 0.375, 'J': 0.605, 'K': 0.805, 'L': 0.655, 'M': 0.985, 'N': 0.845,
  'O': 0.865, 'P': 0.755, 'Q': 0.865, 'R': 0.795, 'S': 0.705, 'T': 0.685, 'U': 0.825,
  'V': 0.795, 'W': 1.165, 'X': 0.785, 'Y': 0.745, 'Z': 0.715, '•': 0.480, '—': 1.000, '–': 0.600,
};

const INTER_EXTRABOLD_ADVANCE_EM: Record<string, number> = {
  ' ': 0.265, '!': 0.330, '"': 0.440, '#': 0.720, '$': 0.650, '%': 0.880, '&': 0.760,
  "'": 0.250, '(': 0.375, ')': 0.375, '*': 0.460, '+': 0.610, ',': 0.290, '-': 0.410,
  '.': 0.290, '/': 0.440, '0': 0.685, '1': 0.465, '2': 0.635, '3': 0.645, '4': 0.680,
  '5': 0.640, '6': 0.665, '7': 0.610, '8': 0.675, '9': 0.665, ':': 0.315, ';': 0.315,
  'A': 0.745, 'B': 0.715, 'C': 0.735, 'D': 0.765, 'E': 0.645, 'F': 0.615, 'G': 0.765,
  'H': 0.775, 'I': 0.335, 'J': 0.565, 'K': 0.735, 'L': 0.605, 'M': 0.915, 'N': 0.775,
  'O': 0.795, 'P': 0.685, 'Q': 0.795, 'R': 0.715, 'S': 0.675, 'T': 0.655, 'U': 0.765,
  'V': 0.725, 'W': 1.045, 'X': 0.715, 'Y': 0.695, 'Z': 0.665, '•': 0.450, '—': 0.950, '–': 0.560,
};

export function getGlyphAdvanceEm(char: string, fontFamily: 'Montserrat' | 'Inter' = 'Montserrat'): number {
  const upper = char.toUpperCase();
  const table = fontFamily === 'Inter' ? INTER_EXTRABOLD_ADVANCE_EM : MONT_BLACK_ADVANCE_EM;
  if (table[upper] !== undefined) return table[upper];
  const code = upper.codePointAt(0) || 0;
  if (code >= 0x2e80) return 1.02;
  return fontFamily === 'Inter' ? 0.72 : 0.78;
}

export function measureSingleLineWidthPx(
  text: string,
  fontSize: number,
  fontFamily: 'Montserrat' | 'Inter' = 'Montserrat',
  trackingEm = 0.04
): number {
  const chars = Array.from((text || '').toUpperCase());
  if (chars.length === 0) return 0;
  let totalEm = 0;
  for (let i = 0; i < chars.length; i++) {
    totalEm += getGlyphAdvanceEm(chars[i], fontFamily);
    if (i < chars.length - 1) totalEm += trackingEm;
  }
  return Math.ceil(totalEm * fontSize);
}

export function computeWrappedLines(
  text: string,
  fontSize: number,
  maxWidthPx = 952,
  fontFamily: 'Montserrat' | 'Inter' = 'Montserrat',
  trackingEm = 0.04
) {
  const explicitLines = (text || '').trim().split('\n');
  const wrappedLines: string[] = [];

  for (const rawLine of explicitLines) {
    const words = rawLine.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) continue;

    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
      const candidate = `${currentLine} ${words[i]}`;
      const candidateWidth = measureSingleLineWidthPx(candidate, fontSize, fontFamily, trackingEm);
      if (candidateWidth <= maxWidthPx) {
        currentLine = candidate;
      } else {
        wrappedLines.push(currentLine);
        currentLine = words[i];
      }
    }
    wrappedLines.push(currentLine);
  }

  return {
    lines: wrappedLines,
    lineCount: wrappedLines.length,
    maxLineWidthPx: wrappedLines.reduce(
      (max, l) => Math.max(max, measureSingleLineWidthPx(l, fontSize, fontFamily, trackingEm)),
      0
    ),
  };
}

export function resolveResponsiveFontSize(
  text: string,
  preferredFontSize: number,
  minFontSize: number,
  maxWidthPx = 952,
  maxLines = 2,
  fontFamily: 'Montserrat' | 'Inter' = 'Montserrat',
  trackingEm = 0.04
) {
  for (let size = preferredFontSize; size >= minFontSize; size -= 2) {
    const res = computeWrappedLines(text, size, maxWidthPx, fontFamily, trackingEm);
    if (res.lineCount <= maxLines && res.maxLineWidthPx <= maxWidthPx) {
      return { fontSize: size, ...res };
    }
  }
  const fallback = computeWrappedLines(text, minFontSize, maxWidthPx, fontFamily, trackingEm);
  return { fontSize: minFontSize, ...fallback };
}
