const fs = require('fs');
const potrace = require('potrace');

potrace.trace('projects/operation-cowboy-1945/plates/horse_sil_for_potrace.png', {
  threshold: 128,
  turdSize: 3,
  optCurve: true,
  alphaMax: 1.0,
  optTolerance: 0.2
}, (err, svg) => {
  if (err) throw err;
  fs.writeFileSync('projects/operation-cowboy-1945/plates/traced_silhouette.svg', svg);
  console.log('Silhouette traced! Size:', svg.length);
  const dMatches = svg.match(/d="([^"]+)"/g);
  console.log('Paths count:', dMatches ? dMatches.length : 0);
});
