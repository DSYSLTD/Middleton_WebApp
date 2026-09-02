import fs from 'fs';
const lines = fs.readFileSync('src/pages/Home.tsx', 'utf8').split('\n');

const sectionToMove = lines.slice(321, 381);
const updatedLines = lines.slice(0, 321).concat(lines.slice(381));

updatedLines.splice(257, 0, ...sectionToMove);

fs.writeFileSync('src/pages/Home.tsx', updatedLines.join('\n'));
console.log('Reordered successfully.');
