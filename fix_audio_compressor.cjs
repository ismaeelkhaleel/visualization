const fs = require('fs');

let ae = fs.readFileSync('src/audio/audioEngine.ts', 'utf8');
ae = ae.replace(
  /export function scheduleAudioEvent\(\n  ctx: BaseAudioContext,\n  type: AudioEventType,\n  time: number\n\) \{/g,
  "export function scheduleAudioEvent(\n  ctx: BaseAudioContext,\n  type: AudioEventType,\n  time: number,\n  destination?: AudioNode\n) {"
);
ae = ae.replace(
  /  gain\.connect\(ctx\.destination\)/g,
  "  gain.connect(destination || ctx.destination)"
);
fs.writeFileSync('src/audio/audioEngine.ts', ae);

let vg = fs.readFileSync('src/video/videoGenerator.ts', 'utf8');
vg = vg.replace(
  /      const ctx = new OfflineAudioContext\(1, Math\.ceil\(totalDuration \* SAMPLE_RATE\) \+ SAMPLE_RATE, SAMPLE_RATE\)/g,
  `      const ctx = new OfflineAudioContext(1, Math.ceil(totalDuration * SAMPLE_RATE) + SAMPLE_RATE, SAMPLE_RATE)
      
      const compressor = ctx.createDynamicsCompressor()
      compressor.threshold.setValueAtTime(-12, 0)
      compressor.knee.setValueAtTime(12, 0)
      compressor.ratio.setValueAtTime(4, 0)
      compressor.attack.setValueAtTime(0.005, 0)
      compressor.release.setValueAtTime(0.1, 0)
      compressor.connect(ctx.destination)`
);
vg = vg.replace(
  /        scheduleAudioEvent\(ctx, eventType, time\)/g,
  "        scheduleAudioEvent(ctx, eventType, time, compressor)"
);
fs.writeFileSync('src/video/videoGenerator.ts', vg);

