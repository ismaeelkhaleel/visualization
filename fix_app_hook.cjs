const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// Insert hook after currentSteps
const stepsRegex = /const currentSteps = currentProblem\.getSteps\(generatedValues\)/;
app = app.replace(stepsRegex, `const currentSteps = currentProblem.getSteps(generatedValues)\n  const layout = useAdaptiveLayout(currentSteps, currentProblem.code)`);

fs.writeFileSync('src/App.tsx', app);
