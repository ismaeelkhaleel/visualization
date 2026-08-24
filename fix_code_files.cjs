const fs = require('fs');
const files = fs.readdirSync('src/data').filter(f => f.endsWith('Code.ts'));

files.forEach(file => {
  let content = fs.readFileSync('src/data/' + file, 'utf8');
  if (content.includes('`class')) {
    const variableNameMatch = content.match(/export const (.*?) =/);
    if (variableNameMatch) {
      const varName = variableNameMatch[1];
      const stringContent = content.match(/=\s*\`(.*?)\`/s);
      if (stringContent) {
        const lines = stringContent[1].split('\n').map(line => "  '" + line.replace(/'/g, "\\'") + "',").join('\n');
        fs.writeFileSync('src/data/' + file, "export const " + varName + " = [\n" + lines + "\n]\n");
      }
    }
  }
});
