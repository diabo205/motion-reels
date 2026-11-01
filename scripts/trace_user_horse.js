const fs = require('fs');
const potrace = require('potrace');

const imgPath = 'projects/operation-cowboy-1945/plates/horse_reference_user.jpg';

// Trace default (black parts)
potrace.trace(imgPath, {
  color: '#FFFFFF', // We can render the strokes/shadows in our chosen color
  threshold: 180,
  turdSize: 2,
  turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY,
  optCurve: true,
  alphaMax: 1.0,
  optTolerance: 0.2
}, (err, svg) => {
  if (err) {
    console.error(err);
    return;
  }
  fs.writeFileSync('projects/operation-cowboy-1945/plates/traced_horse.svg', svg);
  console.log('Traced SVG saved! Size:', svg.length);
  
  // Let's also inspect viewBox and paths in the traced SVG
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
  console.log('ViewBox:', viewBoxMatch ? viewBoxMatch[1] : 'none');
  
  // Extract the d attribute
  const dMatches = svg.match(/d="([^"]+)"/g);
  console.log('Number of paths:', dMatches ? dMatches.length : 0);
});
