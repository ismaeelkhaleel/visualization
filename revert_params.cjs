const fs = require('fs');

const dir = 'src/algorithms/';
fs.readdirSync(dir).forEach(f => {
  if (f.endsWith('.ts')) {
    let c = fs.readFileSync(dir + f, 'utf8');
    c = c.replace(/export function (.*?)\((.*?)\):/gs, (match, p1, p2) => {
      const newP2 = p2.split(',').map(p => {
        let trimmed = p.trim();
        if (trimmed.startsWith('_')) {
          trimmed = trimmed.substring(1);
        }
        return trimmed;
      }).join(', ');
      return "export function " + p1 + "(" + newP2 + "):";
    });
    fs.writeFileSync(dir + f, c);
  }
});
