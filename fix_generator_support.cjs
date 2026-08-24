const fs = require('fs');
let vg = fs.readFileSync('src/video/videoGenerator.ts', 'utf8');

vg = vg.replace(
  /    const encoder = new globalThis\.VideoEncoder\(\{\n      output: \(chunk: any, meta: any\) => muxer\.addVideoChunk\(chunk, meta\),\n      error: \(e: any\) => console\.error\(e\)\n    \}\)\n\n    encoder\.configure\(\{\n      codec: isMp4 \? 'avc1\.640028' : 'vp09\.00\.10\.08',\n      width: 720,\n      height: 1280,\n      bitrate: 7_000_000,\n      \.\.\.\(isMp4 \? \{ avc: \{ format: 'avc' \} \} : \{\}\)\n    \}\)/,
  `    const videoConfig: any = {
      codec: isMp4 ? 'avc1.640028' : 'vp09.00.10.08',
      width: 720,
      height: 1280,
      bitrate: 7_000_000,
      ...(isMp4 ? { avc: { format: 'avc' } } : {})
    }

    const videoSupport = await globalThis.VideoEncoder.isConfigSupported(videoConfig)
    if (!videoSupport.supported) {
      throw new Error(\`\${isMp4 ? 'MP4 (H.264)' : 'WebM (VP9)'} export is not supported in this browser.\`)
    }

    const encoder = new globalThis.VideoEncoder({
      output: (chunk: any, meta: any) => muxer.addVideoChunk(chunk, meta),
      error: (e: any) => console.error(e)
    })

    encoder.configure(videoConfig)`
);

vg = vg.replace(
  /      audioEncoder\.configure\(\{\n        codec: isMp4 \? 'mp4a\.40\.2' : 'opus',\n        sampleRate: SAMPLE_RATE,\n        numberOfChannels: 1,\n        bitrate: 128_000,\n      \}\)/,
  `      const audioConfig = {
        codec: isMp4 ? 'mp4a.40.2' : 'opus',
        sampleRate: SAMPLE_RATE,
        numberOfChannels: 1,
        bitrate: 128_000,
      }
      
      const audioSupport = await globalThis.AudioEncoder.isConfigSupported(audioConfig)
      if (!audioSupport.supported) {
        throw new Error(\`\${isMp4 ? 'MP4 (AAC)' : 'WebM (Opus)'} audio export is not supported in this browser.\`)
      }
      
      audioEncoder.configure(audioConfig)`
);

fs.writeFileSync('src/video/videoGenerator.ts', vg);
