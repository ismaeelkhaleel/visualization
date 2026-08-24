const fs = require('fs');

let vg = fs.readFileSync('src/video/videoGenerator.ts', 'utf8');

// Replace width and height in muxer and encoder
vg = vg.replace(
  /        codec: 'V_VP9',\n        width,\n        height,\n        frameRate: fps/g,
  "        codec: 'V_VP9',\n        width: 720,\n        height: 1280,\n        frameRate: fps"
);

vg = vg.replace(
  /      codec: 'vp09.00.10.08',\n      width,\n      height,\n      bitrate: 4_500_000,/g,
  "      codec: 'vp09.00.10.08',\n      width: 720,\n      height: 1280,\n      bitrate: 7_000_000,"
);

// Remove outCanvas creation
vg = vg.replace(
  /    const outCanvas = document\.createElement\('canvas'\)\n    outCanvas\.width = width\n    outCanvas\.height = height\n    const outCtx = outCanvas\.getContext\('2d', \{ alpha: false, willReadFrequently: true \}\)!\n    outCtx\.imageSmoothingEnabled = true\n    outCtx\.imageSmoothingQuality = 'high'\n/g,
  ''
);

// Remove drawImage and change VideoFrame input
vg = vg.replace(
  /        outCtx\.drawImage\(highResCanvas, 0, 0, width, height\)\n\n        \/\/ @ts-ignore\n        const frame = new globalThis\.VideoFrame\(outCanvas, \{ timestamp: time \* 1_000_000 \}\)/g,
  "        // @ts-ignore\n        const frame = new globalThis.VideoFrame(highResCanvas, { timestamp: time * 1_000_000 })"
);

fs.writeFileSync('src/video/videoGenerator.ts', vg);
