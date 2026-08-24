const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// State
app = app.replace(
  /  const \[isGenerating, setIsGenerating\] = useState\(false\)/,
  "  const [isGenerating, setIsGenerating] = useState(false)\n  const [audioEnabled, setAudioEnabled] = useState(true)"
);

// handleGenerateVideo
app = app.replace(
  /const blob = await generateVideo\(currentProblem, currentSteps, setGenerationProgress\)/,
  "const blob = await generateVideo(currentProblem, currentSteps, setGenerationProgress, audioEnabled)"
);

// UI Toggle
app = app.replace(
  /          <button\n            onClick=\{handleGenerateVideo\}/,
  `          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              disabled={isGenerating}
              style={{
                width: '60px',
                height: '36px',
                background: audioEnabled ? theme.colors.active.bg : 'transparent',
                border: \`1px solid \${audioEnabled ? theme.colors.active.border : theme.colors.neutral.border}\`,
                color: theme.colors.textPrimary,
                borderRadius: '7px',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                flexShrink: 0
              }}
            >
              \uD83D\uDD0A {audioEnabled ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={handleGenerateVideo}`
);
app = app.replace(
  /          <\/button>\n        <\/div>\n      <\/div>/,
  "          </button>\n          </div>\n        </div>\n      </div>"
);

fs.writeFileSync('src/App.tsx', app);
