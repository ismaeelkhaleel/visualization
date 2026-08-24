const fs = require('fs');

let vg = fs.readFileSync('src/video/videoGenerator.ts', 'utf8');

vg = vg.replace(
  /import \{ Muxer, ArrayBufferTarget \} from 'webm-muxer'/g,
  "import { Muxer as WebMMuxer, ArrayBufferTarget as WebMArrayBufferTarget } from 'webm-muxer'\nimport { Muxer as Mp4Muxer, ArrayBufferTarget as Mp4ArrayBufferTarget } from 'mp4-muxer'"
);

vg = vg.replace(
  /export async function generateVideo\([\s\S]*?\): Promise<Blob> \{/,
  `export async function generateVideo(
  problem: ProblemDefinition,
  steps: VisualizationStep[],
  updateProgress: (msg: string) => void,
  audioEnabled: boolean = true,
  format: 'webm' | 'mp4' = 'webm'
): Promise<Blob> {`
);

vg = vg.replace(
  /    const muxerOptions: any = \{[\s\S]*?const muxer = new Muxer\(muxerOptions\)/,
  `    const isMp4 = format === 'mp4'
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
    const muxer = new MuxerClass(muxerOptions)`
);

vg = vg.replace(
  /    const encoder = new globalThis\.VideoEncoder\(\{\n      output: \(chunk: any, meta: any\) => muxer\.addVideoChunk\(chunk, meta\),\n      error: \(e: any\) => console\.error\(e\)\n    \}\)\n\n    encoder\.configure\(\{\n      codec: 'vp09\.00\.10\.08',\n      width: 720,\n      height: 1280,\n      bitrate: 7_000_000,\n    \}\)/,
  `    const encoder = new globalThis.VideoEncoder({
      output: (chunk: any, meta: any) => muxer.addVideoChunk(chunk, meta),
      error: (e: any) => console.error(e)
    })

    encoder.configure({
      codec: isMp4 ? 'avc1.640028' : 'vp09.00.10.08',
      width: 720,
      height: 1280,
      bitrate: 7_000_000,
    })`
);

vg = vg.replace(
  /      audioEncoder\.configure\(\{\n        codec: 'opus',\n        sampleRate: SAMPLE_RATE,\n        numberOfChannels: 1,\n        bitrate: 128_000,\n      \}\)/,
  `      audioEncoder.configure({
        codec: isMp4 ? 'mp4a.40.2' : 'opus',
        sampleRate: SAMPLE_RATE,
        numberOfChannels: 1,
        bitrate: 128_000,
      })`
);

vg = vg.replace(
  /    const buffer = \(muxer\.target as ArrayBufferTarget\)\.buffer\n    return new Blob\(\[buffer\], \{ type: 'video\/webm' \}\)/,
  `    const buffer = (muxer.target as any).buffer
    return new Blob([buffer], { type: isMp4 ? 'video/mp4' : 'video/webm' })`
);

fs.writeFileSync('src/video/videoGenerator.ts', vg);

