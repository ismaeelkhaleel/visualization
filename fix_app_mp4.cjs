const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// Update handleGenerateVideo
app = app.replace(
  /const handleGenerateVideo = async \(\) => \{/,
  "const handleGenerateVideo = async (format: 'webm' | 'mp4') => {"
);

app = app.replace(
  /const blob = await generateVideo\(currentProblem, currentSteps, setGenerationProgress, audioEnabled\)/,
  "const blob = await generateVideo(currentProblem, currentSteps, setGenerationProgress, audioEnabled, format)"
);

app = app.replace(
  /a\.download = `\$\{currentProblem\.id\}\.webm`/,
  "a.download = `${currentProblem.id}.${format}`"
);

// Update UI
app = app.replace(
  /<button\n              onClick=\{handleGenerateVideo\}\n            disabled=\{isGenerating\}\n            style=\{\{\n              width: '100%',\n              height: '36px',\n              background: isGenerating \? '#444' : '#10b981',\n              color: 'white',\n              border: 'none',\n              borderRadius: '7px',\n              cursor: isGenerating \? 'not-allowed' : 'pointer',\n              fontWeight: 600,\n              fontSize: '13px'\n            \}\}\n          >\n            \{isGenerating \? \(generationProgress \|\| 'Generating Video\.\.\.'\) : 'Generate Video'\}\n          <\/button>/,
  `          <button
              onClick={() => handleGenerateVideo('webm')}
              disabled={isGenerating}
              style={{
                flex: 1,
                height: '36px',
                background: isGenerating ? '#444' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '7px',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '13px'
              }}
            >
              {isGenerating ? 'Generating...' : 'WebM'}
            </button>
            <button
              onClick={() => handleGenerateVideo('mp4')}
              disabled={isGenerating}
              style={{
                flex: 1,
                height: '36px',
                background: isGenerating ? '#444' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '7px',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '13px'
              }}
            >
              {isGenerating ? 'Generating...' : 'MP4'}
            </button>`
);

// If there's a progress indicator, we should probably still show it. Let's add it below if it's generating.
app = app.replace(
  /          <\/button>\n          <\/div>\n        <\/div>\n      <\/div>/,
  `          </button>
          </div>
          {isGenerating && (
            <div style={{ marginTop: '8px', fontSize: '12px', color: theme.colors.textSecondary, textAlign: 'center' }}>
              {generationProgress}
            </div>
          )}
        </div>
      </div>`
);

fs.writeFileSync('src/App.tsx', app);
