import puppeteer, { HTTPRequest } from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function run() {
  console.log("🚀 Puppeteer WASM swap script starting...");
  const wasmArg = process.argv[2] || '/Users/shah/Documents/wasmFiles/webassembly-test.wasm';
  const wasmPath = path.resolve(wasmArg);

  if (!fs.existsSync(wasmPath)) {
    console.error(`❌ File not found: ${wasmPath}`);
    process.exit(1);
  }

  const wasmBuffer = fs.readFileSync(wasmPath);
  console.log(`✅ Using WASM file: ${wasmPath}`);

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--disable-web-security'],
  });

  const page = await browser.newPage();
  await page.setRequestInterception(true);

  let wasmIntercepted = false;

  page.on('request', async (req: HTTPRequest) => {
    if (req.url().includes('webassembly-test.wasm')) {
      wasmIntercepted = true;
      console.log(`✅ Intercepted WASM request: ${req.url()}`);
      await req.respond({
        status: 200,
        contentType: 'application/wasm',
        body: wasmBuffer,
      });
    } else {
      await req.continue();
    }
  });

  await page.goto('https://app-staging.protegogapproposal.com/');

  if (!wasmIntercepted) {
    console.warn('⚠️ No WASM file was intercepted. Double-check the filename.');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
