import { createRoot } from 'react-dom/client'
import React from 'react'
import { toCanvas } from 'html-to-image'
import { Muxer as WebMMuxer, ArrayBufferTarget as WebMArrayBufferTarget } from 'webm-muxer'
import { Muxer as Mp4Muxer, ArrayBufferTarget as Mp4ArrayBufferTarget } from 'mp4-muxer'
import gsap from 'gsap'
import VideoRenderer from './VideoRenderer'
import type { VisualizationStep } from '../algorithms/types'
import type { ProblemDefinition } from '../data/problems'
import { theme } from '../theme'
import { scheduleAudioEvent, getAudioEventTypeForStep, SAMPLE_RATE } from '../audio/audioEngine'

export async function generateVideo(
  problem: ProblemDefinition,
  steps: VisualizationStep[],
  updateProgress: (msg: string) => void,
  audioEnabled: boolean = true,
  format: 'webm' | 'mp4' = 'webm',
  abortSignal?: AbortSignal
): Promise<Blob> {
    const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.top = '-9999px'
  container.style.left = '-9999px'
  document.body.appendChild(container)

  const root = createRoot(container)

  try {
    const fps = 30
    const stepDuration = 1.0 // 1 second per step is good for short-form
    const framesPerStep = Math.round(fps * stepDuration)
    const width = 360
    const height = 640

    const isMp4 = format === 'mp4'
    const TargetClass = isMp4 ? Mp4ArrayBufferTarget : WebMArrayBufferTarget
    const MuxerClass = isMp4 ? Mp4Muxer : WebMMuxer

    const muxerOptions: any = {
      target: new TargetClass(),
      video: {
        codec: isMp4 ? 'avc' : 'V_VP9',
        width: 720,
        height: 1280,
        frameRate: fps
      },
      fastStart: isMp4 ? 'in-memory' : undefined
    }
    if (audioEnabled) {
      muxerOptions.audio = {
        codec: isMp4 ? 'aac' : 'A_OPUS',
        sampleRate: SAMPLE_RATE,
        numberOfChannels: 1
      }
    }
    const muxer = new (MuxerClass as any)(muxerOptions)

    // @ts-ignore
    const videoConfig: any = {
      codec: isMp4 ? 'avc1.42E01F' : 'vp09.00.10.08',
      width: 720,
      height: 1280,
      bitrate: 7_000_000,
      ...(isMp4 ? { avc: { format: 'avc' } } : {})
    }

    const videoSupport = await globalThis.VideoEncoder.isConfigSupported(videoConfig)
    if (!videoSupport.supported) {
      throw new Error(`${isMp4 ? 'MP4 (H.264)' : 'WebM (VP9)'} export is not supported in this browser.`)
    }

    const encoder = new globalThis.VideoEncoder({
      output: (chunk: any, meta: any) => muxer.addVideoChunk(chunk, meta),
      error: (e: any) => console.error(e)
    })

    encoder.configure(videoConfig)

    let audioEncoder: any = null
    let audioBuffer: AudioBuffer | null = null

    if (audioEnabled) {
      // @ts-ignore
      audioEncoder = new globalThis.AudioEncoder({
        output: (chunk: any, meta: any) => muxer.addAudioChunk(chunk, meta),
        error: (e: any) => console.error(e)
      })
      const audioConfig = {
        codec: isMp4 ? 'mp4a.40.2' : 'opus',
        sampleRate: SAMPLE_RATE,
        numberOfChannels: 1,
        bitrate: 128_000,
      }
      
      const audioSupport = await globalThis.AudioEncoder.isConfigSupported(audioConfig)
      if (!audioSupport.supported) {
        throw new Error(`${isMp4 ? 'MP4 (AAC)' : 'WebM (Opus)'} audio export is not supported in this browser.`)
      }
      
      audioEncoder.configure(audioConfig)

      updateProgress('Rendering Audio...')
      const totalDuration = steps.length * stepDuration
      const ctx = new OfflineAudioContext(1, Math.ceil(totalDuration * SAMPLE_RATE) + SAMPLE_RATE, SAMPLE_RATE)
      
      const compressor = ctx.createDynamicsCompressor()
      compressor.threshold.setValueAtTime(-12, 0)
      compressor.knee.setValueAtTime(12, 0)
      compressor.ratio.setValueAtTime(4, 0)
      compressor.attack.setValueAtTime(0.005, 0)
      compressor.release.setValueAtTime(0.1, 0)
      compressor.connect(ctx.destination)
      
      for (let s = 0; s < steps.length; s++) {
        const isComplete = s === steps.length - 1
        const eventType = getAudioEventTypeForStep(steps[s], isComplete)
        const time = s * stepDuration
        scheduleAudioEvent(ctx, eventType, time, compressor)
      }
      
      audioBuffer = await ctx.startRendering()
    }

    gsap.globalTimeline.pause()
    gsap.globalTimeline.seek(0)


    for (let s = 0; s < steps.length; s++) {
      updateProgress(`Generating Video... Step ${s + 1} of ${steps.length}`)
      console.log(`[VideoGenerator] Started rendering Step ${s + 1}/${steps.length}`)
      
      const step = steps[s]
      
      await new Promise<void>(resolve => {
        root.render(
          React.createElement(VideoRenderer, {
            step,
            
            code: problem.visualization.code,
            algorithm: problem.id,
            isComplete: s === steps.length - 1
          })
        )
        // Wait for React to commit and GSAP tweens to initialize
        setTimeout(resolve, 150) 
      })

      const domNode = container.firstChild as HTMLElement

      // pre-warm html-to-image (loads fonts, styles)
      if (s === 0) {
        console.log('[VideoGenerator] Pre-warming html-to-image cache on Step 1...')
        await toCanvas(domNode, { width, height, pixelRatio: 2 })
        console.log('[VideoGenerator] Pre-warming completed.')
      }

      console.log(`[VideoGenerator] Generating ${framesPerStep} frames for Step ${s + 1}...`)
      for (let f = 0; f < framesPerStep; f++) {
        if (abortSignal?.aborted) throw new Error('Cancelled by user')
        
        if (f % 10 === 0) console.log(`[VideoGenerator] Encoded frame ${f}/${framesPerStep} (Step ${s + 1})`)
        const time = s * stepDuration + (f / fps)
        gsap.globalTimeline.seek(time)

        const highResCanvas = await toCanvas(domNode, { 
          width, 
          height,
          pixelRatio: 2, 
          backgroundColor: theme.colors.background,
        })

        // @ts-ignore
        const frame = new globalThis.VideoFrame(highResCanvas, { timestamp: time * 1_000_000 })
        encoder.encode(frame, { keyFrame: f % 30 === 0 })
        frame.close()
        
        // Wait if the encoder queue gets too large so we don't choke memory
        while (encoder.encodeQueueSize > 5) {
          await new Promise(r => setTimeout(r, 10))
        }

        // Yield the main thread occasionally to keep UI responsive
        if (f % 5 === 0) {
          await new Promise(r => setTimeout(r, 0))
        }
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
    }

    updateProgress('Encoding WebM...')
    console.log('Flushing video encoder...')
    await encoder.flush()
    console.log('Video encoder flushed.')
    if (audioEncoder) {
      console.log('Flushing audio encoder...')
      await audioEncoder.flush()
      console.log('Audio encoder flushed.')
    }
    console.log('Finalizing muxer...')
    muxer.finalize()
    console.log('Muxer finalized.')

    const buffer = (muxer.target as any).buffer
    console.log('Video generation complete. Buffer size:', buffer.byteLength)
    return new Blob([buffer], { type: isMp4 ? 'video/mp4' : 'video/webm' })
    
  } catch (error) {
    console.error('Error during video generation:', error)
    throw error
  } finally {
    console.log('Cleaning up rendering environment...')
    gsap.globalTimeline.play()
    root.unmount()
    document.body.removeChild(container)
  }
}
