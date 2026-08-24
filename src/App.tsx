import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import VisualizationRenderer from './components/VisualizationRenderer/VisualizationRenderer'
import CodePanel from './components/CodePanel/CodePanel'
import StatusMessage from './components/StatusMessage/StatusMessage'
import { generateVideo } from "./video/videoGenerator"
import Controls from './components/Controls/Controls'

import { problems } from './data/problems'
import { getDailyProblem } from './data/dailyProblem'
import { theme } from './theme'

type AlgorithmName = (typeof problems)[number]['id']


function App() {

  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [algorithm, setAlgorithm] = useState<AlgorithmName>(() => getDailyProblem(problems).id as AlgorithmName)
  
  const currentProblem = problems.find((problem) => problem.id === algorithm)!
  const dailyProblem = getDailyProblem(problems)
  const [selectedCategory, setSelectedCategory] = useState<string>(() => dailyProblem.category)
  const isDaily = algorithm === dailyProblem.id

  const [inputValuesText, setInputValuesText] = useState<Record<string, string>>(() => {
    const defaultTexts: Record<string, string> = {}
    if (currentProblem.input) {
      currentProblem.input.fields.forEach(field => {
        const val = currentProblem.input!.defaultValues[field.key]
        defaultTexts[field.key] = globalThis.Array.isArray(val) ? val.join(', ') : String(val)
      })
    }
    return defaultTexts
  })

  const [generatedValues, setGeneratedValues] = useState<Record<string, any>>(
    currentProblem.input ? currentProblem.input.defaultValues : {}
  )
  const [inputError, setInputError] = useState('')

  const [isGenerating, setIsGenerating] = useState(false)
  
  const handleProblemChange = (nextAlgorithm: AlgorithmName) => {
    const nextProblem = problems.find((p) => p.id === nextAlgorithm)!
    
    const nextDefaultTexts: Record<string, string> = {}
    if (nextProblem.input) {
      nextProblem.input.fields.forEach(field => {
        const val = nextProblem.input!.defaultValues[field.key]
        nextDefaultTexts[field.key] = globalThis.Array.isArray(val) ? val.join(', ') : String(val)
      })
    }
    
    setInputValuesText(nextDefaultTexts)
    setGeneratedValues(nextProblem.input ? nextProblem.input.defaultValues : {})
    setInputError('')

    setIsPlaying(false)
    setCurrentStep(0)
    setAlgorithm(nextAlgorithm)
  }
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [generationProgress, setGenerationProgress] = useState('')

  const titleRef = useRef<HTMLDivElement | null>(null)
  const titleFirstRender = useRef(true)

  useLayoutEffect(() => {
    if (!titleRef.current) return

    if (titleFirstRender.current) {
      titleFirstRender.current = false
      return
    }

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
    )
  }, [algorithm])

  useEffect(() => {
    if (!isPlaying) return

    if (currentStep >= currentSteps.length - 1) {
      setIsPlaying(false)
      return
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1)
    }, 1000 / speed)

    return () => clearTimeout(timer)
  }, [currentStep, isPlaying, speed, algorithm])

  const currentSteps = currentProblem.getSteps(generatedValues)
    const visualization = currentProblem.visualization
  const step = currentSteps[currentStep]

  const handlePlay = () => {
    if (currentStep >= currentSteps.length - 1) {
      setCurrentStep(0)
    }
    setIsPlaying((prev) => !prev)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const handleGenerate = () => {
    setInputError('')
    if (!currentProblem.input) return

    const parsedValues: Record<string, any> = {}

    for (const field of currentProblem.input.fields) {
      const text = inputValuesText[field.key] || ''
      if (field.type === 'numberArray') {
        const values = text.split(',').map(v => v.trim()).filter(v => v !== '').map(Number)
        if (values.some(v => !Number.isFinite(v))) {
          setInputError(`Enter valid numbers for ${field.label}`)
          return
        }
        parsedValues[field.key] = values
      } else if (field.type === 'number') {
        const val = Number(text)
        if (!Number.isFinite(val)) {
          setInputError(`Enter a valid number for ${field.label}`)
          return
        }
        parsedValues[field.key] = val
      } else {
        parsedValues[field.key] = text
      }
    }

    if (currentProblem.input.validate) {
      const err = currentProblem.input.validate(parsedValues)
      if (err) {
        setInputError(err)
        return
      }
    }

    setIsPlaying(false)
    setCurrentStep(0)
    setGeneratedValues(parsedValues)
  }

  const handleGenerateVideo = async (format: 'webm' | 'mp4') => {
    setIsGenerating(true)
    setGenerationProgress('Starting...')
    setIsPlaying(false) // pause current playback
    
    try {
      const blob = await generateVideo(currentProblem, currentSteps, setGenerationProgress, audioEnabled, format)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `${currentProblem.id}-visualization.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (e: any) {
      console.error(e)
      alert('Video generation failed: ' + String(e.message || e))
    } finally {
      setIsGenerating(false)
      setGenerationProgress('')
    }
  }


  const allCategories = ['Arrays', 'Binary Search', 'Strings', 'Stack', 'Linked List', 'Trees', 'Graphs']
  const uniqueCategories = Array.from(new Set(problems.map(p => p.category)))
  const categories = uniqueCategories.sort((a, b) => {
    const indexA = allCategories.indexOf(a)
    const indexB = allCategories.indexOf(b)
    if (indexA === -1 && indexB === -1) return a.localeCompare(b)
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })
  
  const filteredProblems = problems.filter(p => p.category === selectedCategory)

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
        background: '#111',
        padding: '40px',
        boxSizing: 'border-box',
        flexWrap: 'wrap',
      }}
    >
      <div
        style={{
          width: '280px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          boxSizing: 'border-box',
          background: '#181818',
          border: '1px solid #292929',
          borderRadius: '12px',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '0.2px',
          }}
        >
          Algorithm Visualizer
        </div>

        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <select
            value={selectedCategory}
            disabled={isGenerating}
            onChange={(e) => {
              const newCategory = e.target.value
              setSelectedCategory(newCategory)
              const firstProblem = problems.find(p => p.category === newCategory)
              if (firstProblem) {
                handleProblemChange(firstProblem.id as AlgorithmName)
              }
            }}
            style={{
              width: '100%',
              height: '36px',
              padding: '0 10px',
              background: '#1a1a1a',
              color: 'white',
              border: '1px solid #303030',
              borderRadius: '7px',
              outline: 'none',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              opacity: isGenerating ? 0.5 : 1,
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23999999%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px top 50%',
              backgroundSize: '10px auto',
              fontWeight: 600,
            }}
          >
            {categories.map(cat => {
              const catCount = problems.filter(p => p.category === cat).length
              return (
                <option key={cat} value={cat}>
                  {cat} · {catCount} problem{catCount !== 1 ? 's' : ''}
                </option>
              )
            })}
          </select>

          <select
            value={algorithm}
            disabled={isGenerating}
            onChange={(e) => {
              handleProblemChange(e.target.value as AlgorithmName)
            }}
            style={{
              width: '100%',
              height: '36px',
              padding: '0 10px',
              background: '#111',
              color: 'white',
              border: '1px solid #303030',
              borderRadius: '7px',
              outline: 'none',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              opacity: isGenerating ? 0.5 : 1,
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px top 50%',
              backgroundSize: '10px auto',
              fontSize: '13px'
            }}
          >
            {filteredProblems.map((problem) => (
              <option key={problem.id} value={problem.id}>
                {problem.title}
              </option>
            ))}
          </select>
        </div>


        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '-6px',
            marginBottom: '4px',
          }}
        >
          <div style={{ color: '#888', fontSize: '11px' }}>
            {currentProblem.category} · {currentProblem.difficulty}
          </div>
          <div
            style={{
              color: isDaily ? '#10b981' : '#888',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            {isDaily ? "Today's Problem" : "Practice Problem"}
          </div>
        </div>

        {currentProblem.input && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {currentProblem.input.fields.map((field) => (
              <div key={field.key}>
                <div
                  style={{
                    color: '#777',
                    fontSize: '11px',
                    marginBottom: '4px',
                  }}
                >
                  {field.label}
                </div>
                <input
                  type={field.type === 'number' ? 'number' : 'text'}
                  value={inputValuesText[field.key] || ''}
                  disabled={isGenerating}
                  onChange={(e) => {
                    setInputValuesText(prev => ({
                      ...prev,
                      [field.key]: e.target.value
                    }))
                    setInputError('')
                  }}
                  style={{
                    width: '100%',
                    height: '36px',
                    padding: '0 10px',
                    background: '#111',
                    color: 'white',
                    border: '1px solid #303030',
                    borderRadius: '7px',
                    boxSizing: 'border-box',
                    opacity: isGenerating ? 0.5 : 1,
                  }}
                />
              </div>
            ))}

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              style={{
                width: '100%',
                height: '36px',
                background: '#2a2a2a',
                color: 'white',
                border: '1px solid #3a3a3a',
                borderRadius: '7px',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                opacity: isGenerating ? 0.5 : 1,
              }}
            >
              Generate
            </button>
            {inputError && (
              <div
                style={{
                  color: '#888',
                  fontSize: '10px',
                  textAlign: 'center',
                }}
              >
                {inputError}
              </div>
            )}
          </div>
        )}

        <Controls
          isPlaying={isPlaying}
          speed={speed}
          onPlay={handlePlay}
          onReset={handleReset}
          onSpeedChange={setSpeed}
          disabled={isGenerating}
        />
        
        <div style={{ marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              disabled={isGenerating}
              style={{
                width: '60px',
                height: '36px',
                background: audioEnabled ? theme.colors.active.bg : 'transparent',
                border: `1px solid ${audioEnabled ? theme.colors.active.border : theme.colors.neutral.border}`,
                color: theme.colors.textPrimary,
                borderRadius: '7px',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                flexShrink: 0
              }}
            >
              🔊 {audioEnabled ? 'ON' : 'OFF'}
            </button>
                      <button
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
            </button>
          </div>
          {isGenerating && (
            <div style={{ marginTop: '8px', fontSize: '12px', color: theme.colors.textSecondary, textAlign: 'center' }}>
              {generationProgress}
            </div>
          )}
        </div>
      </div>


      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {/* Title moved outside */}
        <div
          style={{
            width: '360px',
            height: '640px',
            flexShrink: 0,
            position: 'relative',
            background: `radial-gradient(ellipse at 50% 40%, #0c0c10 0%, ${theme.colors.videoBackground} 70%)`,
            border: `1px solid ${theme.colors.panelBorder}`,
            borderRadius: '14px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 80px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxSizing: 'border-box',
            padding: '24px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* 1. TITLE / EXPLANATION ZONE - 10% */}
            <div style={{
              height: '10%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#f5f5f5',
              fontSize: '18px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              textAlign: 'center',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}>
              <span ref={titleRef}>{visualization.title}</span>
            </div>

            {/* 2. VISUALIZATION ZONE - 45% */}
            <div
              style={{
                height: '45%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <VisualizationRenderer step={step} visualizationKey={algorithm} viewportWidth={312} viewportHeight={261} isComplete={currentStep === currentSteps.length - 1} />
            </div>

            {/* 3. STATUS ZONE - 15% */}
            <div
              style={{
                height: '15%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <StatusMessage message={step.message} />
            </div>

            {/* 4. CODEPANEL ZONE - 30% */}
            <div
              style={{
                height: '30%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <CodePanel code={currentProblem.visualization.code} activeLine={step.codeLine} />
            </div>
          </div>
        </div>

        {/* Progress Outside Card */}
        <div
          style={{
            width: '360px',
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '4px',
              background: theme.colors.neutral.bg,
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${((currentStep + 1) / currentSteps.length) * 100}%`,
                height: '100%',
                background: theme.colors.active.border,
                borderRadius: '999px',
                transition: `width ${theme.animation.durationMedium}s ${theme.animation.ease}`,
              }}
            />
          </div>

          <div
            style={{
              marginTop: '12px',
              color: theme.colors.textSecondary,
              fontSize: '12px',
              fontWeight: 500,
              textAlign: 'center',
              letterSpacing: '0.5px',
            }}
          >
            Step {currentStep + 1} / {currentSteps.length}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App