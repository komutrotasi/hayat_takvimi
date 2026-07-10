const fs = require('fs');
const appJs = fs.readFileSync('web/app.js', 'utf8');
const indexHtml = fs.readFileSync('web/index.html', 'utf8');

const regex = /getElementById\(['"]([^'"]+)['"]\)/g;
const idsInJs = [];
let match;
while ((match = regex.exec(appJs)) !== null) {
  idsInJs.push(match[1]);
}

const missing = idsInJs.filter(id => !indexHtml.includes(`id="${id}"`) && !indexHtml.includes(`id='${id}'`));
console.log('Missing IDs:', [...new Set(missing)]);
