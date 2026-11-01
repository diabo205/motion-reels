/**
 * Formal Three-Layer Architecture Boundary Configuration (.eslintrc.js)
 *
 * Enforces:
 *   L0: Official Toolchain (Remotion, React)
 *   L1: Shared Kit (src/kit/) - Immutable engine primitives, base shots, design tokens
 *   L2: Composition & Templates (src/scenes/, projects/<id>/)
 *
 * Boundaries:
 *   1. projects/<id>/ and project vectors may NOT import from other projects/
 *   2. src/scenes/ may only import from src/kit/ (no project vectors, no business logic)
 *   3. src/kit/ may NOT import from src/scenes/ or projects/
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['import'],
  rules: {
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // 1. Kit cannot import from scenes or projects (L1 is immutable)
          {
            target: './src/kit',
            from: './src/scenes',
            message: 'L1 Kit primitives must be immutable and cannot import from L2 scenes.',
          },
          {
            target: './src/kit',
            from: './projects',
            message: 'L1 Kit primitives cannot import from projects.',
          },
          // 2. Scenes cannot import from projects or project vectors
          {
            target: './src/scenes',
            from: './projects',
            message: 'L2 scene templates must only import from src/kit; cannot import from projects.',
          },
          // 3. Projects cannot import from other projects
          {
            target: './projects/aleutian-campaign-1942',
            from: './projects/!(aleutian-campaign-1942)/**',
            message: 'Cross-project imports are strictly prohibited.',
          },
          {
            target: './projects/operation-cowboy-1945',
            from: './projects/!(operation-cowboy-1945)/**',
            message: 'Cross-project imports are strictly prohibited.',
          },
          {
            target: './projects/peshawar-2009',
            from: './projects/!(peshawar-2009)/**',
            message: 'Cross-project imports are strictly prohibited.',
          },
          {
            target: './projects/u2-incident-1960',
            from: './projects/!(u2-incident-1960)/**',
            message: 'Cross-project imports are strictly prohibited.',
          },
          {
            target: './projects/taiping-rebellion-1850',
            from: './projects/!(taiping-rebellion-1850)/**',
            message: 'Cross-project imports are strictly prohibited.',
          },
        ],
      },
    ],
  },
};
