/**
 * Copies the built /khush app into the root site's public/khush folder.
 * The root site is a plain CRA build, so the khush portfolio ships as
 * pre-built static assets served from /khush.
 */
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const targetDir = path.join(__dirname, '..', '..', 'public', 'khush');

if (!fs.existsSync(buildDir)) {
  console.error('No build/ directory. Run "npm run build" first.');
  process.exit(1);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.cpSync(buildDir, targetDir, { recursive: true });
console.log(`Copied ${buildDir} -> ${targetDir}`);
