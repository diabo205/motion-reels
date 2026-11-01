const fs = require('fs');
const potrace = require('potrace');

async function traceFile(filePath, options = {}) {
  return new Promise((resolve, reject) => {
    potrace.trace(filePath, {
      threshold: 128,
      turdSize: 3,
      optCurve: true,
      alphaMax: 1.0,
      optTolerance: 0.2,
      ...options
    }, (err, svg) => {
      if (err) reject(err);
      else resolve(svg);
    });
  });
}

async function main() {
  const posesData = [];

  for (let i = 1; i <= 4; i++) {
    const silPath = `projects/operation-cowboy-1945/plates/pose_${i}_sil.png`;
    const darkPath = `projects/operation-cowboy-1945/plates/pose_${i}_dark.png`;

    const silSvg = await traceFile(silPath);
    const darkSvg = await traceFile(darkPath);

    fs.writeFileSync(`projects/operation-cowboy-1945/plates/pose_${i}_sil.svg`, silSvg);
    fs.writeFileSync(`projects/operation-cowboy-1945/plates/pose_${i}_dark.svg`, darkSvg);

    const silDMatch = silSvg.match(/d="([^"]+)"/);
    const darkDMatch = darkSvg.match(/d="([^"]+)"/);

    const silD = silDMatch ? silDMatch[1] : '';
    const darkD = darkDMatch ? darkDMatch[1] : '';

    console.log(`Pose ${i}: Sil path length = ${silD.length}, Dark path length = ${darkD.length}`);
    posesData.push({ id: i, silD, darkD });
  }

  fs.writeFileSync(
    'projects/operation-cowboy-1945/plates/gallop_poses_data.json',
    JSON.stringify(posesData, null, 2)
  );
  console.log('Saved gallop_poses_data.json successfully!');
}

main().catch(console.error);
