const fs = require('fs');

let vg = fs.readFileSync('src/video/videoGenerator.ts', 'utf8');

// Imports
vg = vg.replace(
  /import \{ theme \} from '\.\.\/theme'/g,
  "import { theme } from '../theme'\nimport { scheduleAudioEvent, getAudioEventTypeForStep, SAMPLE_RATE } from '../audio/audioEngine'"
);

// function signature
vg = vg.replace(
  /export async function generateVideo\(\n  problem: ProblemDefinition,\n  steps: VisualizationStep\[\],\n  updateProgress: \(msg: string\) => void\n\): Promise<Blob> \{/g,
  "export async function generateVideo(\n  problem: ProblemDefinition,\n  steps: VisualizationStep[],\n  updateProgress: (msg: string) => void,\n  audioEnabled: boolean = true\n): Promise<Blob> {"
);

// Muxer config
vg = vg.replace(
  /    const muxer = new Muxer\(\{[\s\S]*?frameRate: fps\n      \}\n    \}\)/g,
  `    const muxerOptions: any = {
      target: new ArrayBufferTarget(),
      video: {
        codec: 'V_VP9',
        width: 720,
        height: 1280,
        frameRate: fps
      }
    }
    if (audioEnabled) {
      muxerOptions.audio = {
        codec: 'A_OPUS',
        sampleRate: SAMPLE_RATE,
        numberOfChannels: 1
      }
    }
    const muxer = new Muxer(muxerOptions)`
);

// audioEncoder setup
vg = vg.replace(
  /    encoder\.configure\(\{\n      codec: 'vp09\.00\.10\.08',\n      width: 720,\n      height: 1280,\n      bitrate: 7_000_000,\n    \}\)/g,
  `    encoder.configure({
      codec: 'vp09.00.10.08',
      width: 720,
      height: 1280,
      bitrate: 7_000_000,
    })

    let audioEncoder: any = null
    let audioBuffer: AudioBuffer | null = null

    if (audioEnabled) {
      // @ts-ignore
      audioEncoder = new globalThis.AudioEncoder({
        output: (chunk: any, meta: any) => muxer.addAudioChunk(chunk, meta),
        error: (e: any) => console.error(e)
      })
      audioEncoder.configure({
        codec: 'opus',
        sampleRate: SAMPLE_RATE,
        numberOfChannels: 1,
        bitrate: 128_000,
      })

      updateProgress('Rendering Audio...')
      const totalDuration = steps.length * stepDuration
      const ctx = new OfflineAudioContext(1, Math.ceil(totalDuration * SAMPLE_RATE) + SAMPLE_RATE, SAMPLE_RATE)
      
      for (let s = 0; s < steps.length; s++) {
        const isComplete = s === steps.length - 1
        const eventType = getAudioEventTypeForStep(steps[s], isComplete)
        const time = s * stepDuration
        scheduleAudioEvent(ctx, eventType, time)
      }
      
      audioBuffer = await ctx.startRendering()
    }`
);

// audio encoding in the loop
vg = vg.replace(
  /        frame\.close\(\)\n      \}\n    \}/g,
  `        frame.close()
      }

      if (audioEnabled && audioBuffer && audioEncoder) {
        const startFrame = Math.round(s * stepDuration * SAMPLE_RATE)
        const endFrame = Math.round((s + 1) * stepDuration * SAMPLE_RATE)
        const channelData = audioBuffer.getChannelData(0)
        const chunkLength = endFrame - startFrame
        
        if (chunkLength > 0 && startFrame < channelData.length) {
          const chunk = channelData.subarray(startFrame, Math.min(endFrame, channelData.length))
          const data = new Float32Array(chunk)
          // @ts-ignore
          const audioData = new globalThis.AudioData({
            format: 'f32',
            sampleRate: SAMPLE_RATE,
            numberOfFrames: data.length,
            numberOfChannels: 1,
            timestamp: s * stepDuration * 1_000_000,
            data: data
          })
          audioEncoder.encode(audioData)
          audioData.close()
        }
      }
    }`
);

// Flush audio encoder
vg = vg.replace(
  /    updateProgress\('Encoding WebM\.\.\.'\)\n    await encoder\.flush\(\)/g,
  `    updateProgress('Encoding WebM...')
    await encoder.flush()
    if (audioEncoder) {
      await audioEncoder.flush()
    }`
);

fs.writeFileSync('src/video/videoGenerator.ts', vg);
