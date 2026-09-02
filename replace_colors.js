import fs from 'fs';

const files = [
  'src/pages/Home.tsx',
  'src/pages/Obituaries.tsx',
  'src/pages/ObituaryDetails.tsx',
];

const colorMap = {
  '#006A63': '#411548',
  '#004F4D': '#300f35',
  '#023330': '#200a23',
  '#e6f4f1': '#f4e6f4',
  '#d0ebe5': '#ecd0ec',
  '#004c47': '#2d0e32',
  '#005c58': '#411548',
  '#f8fcfb': '#fcf8fc',
  '#f4fafa': '#faf4fa'
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  for (const [oldColor, newColor] of Object.entries(colorMap)) {
    content = content.split(oldColor).join(newColor);
    content = content.split(oldColor.toLowerCase()).join(newColor);
    content = content.split(oldColor.toUpperCase()).join(newColor);
  }
  fs.writeFileSync(file, content);
});
console.log('Colors replaced!');
