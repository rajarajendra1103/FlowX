const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const bundlePath = path.resolve(__dirname, '../dist/index.global.js');

if (!fs.existsSync(bundlePath)) {
  console.error(`Error: Bundle file not found at ${bundlePath}`);
  process.exit(1);
}

const fileContents = fs.readFileSync(bundlePath);
const gzipped = zlib.gzipSync(fileContents);
const rawSizeKb = (fileContents.length / 1024).toFixed(2);
const gzippedSizeKb = (gzipped.length / 1024).toFixed(2);

console.log('--------------------------------------------------');
console.log('FlowX Core Bundle Size Check:');
console.log(`- Raw IIFE Size: ${rawSizeKb} KB (${fileContents.length} bytes)`);
console.log(`- Gzipped IIFE Size: ${gzippedSizeKb} KB (${gzipped.length} bytes)`);
console.log('--------------------------------------------------');

const LIMIT_BYTES = 15 * 1024; // 15KB

if (gzipped.length > LIMIT_BYTES) {
  console.error(`❌ FAILURE: Gzipped size of ${gzippedSizeKb} KB exceeds the 15KB limit!`);
  process.exit(1);
} else {
  console.log(`✅ SUCCESS: Bundle is well under the 15KB target!`);
  process.exit(0);
}
