const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(
  /a\.download = `\$\{currentProblem\.id\}-visualization\.webm`/g,
  "a.download = `${currentProblem.id}-visualization.${format}`"
);
fs.writeFileSync('src/App.tsx', app);
