import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { validateScene } from './scene.mjs';

const args = process.argv.slice(2);
if (!args.length || args.includes('--help')) {
  console.log('Usage: node render.mjs INPUT [--out-dir DIR] [--scale 2] [--browser PATH]\nINPUT: .excalidraw scene or .json skeleton with elements. Outputs editable scene, SVG, PNG and QA report.\nEXCALIDRAW_RUNTIME: directory containing installed renderer node_modules; PLAYWRIGHT_MODULE: optional existing Playwright module path.');
  process.exit(args.length ? 0 : 1);
}
const input = path.resolve(args[0]);
function option(name, fallback) { const i=args.indexOf(name); if(i<0)return fallback; if(!args[i+1])throw Error(`Missing ${name}`); return args[i+1]; }
const out = path.resolve(option('--out-dir',path.dirname(input)));
const scale = Number(option('--scale','2'));
if (!(scale > 0 && scale <= 4)) throw Error('Scale must be greater than 0 and at most 4');
const runtime = process.env.EXCALIDRAW_RUNTIME || path.dirname(fileURLToPath(import.meta.url));
const requireRuntime = createRequire(path.join(path.resolve(runtime),'package.json'));
const {build} = requireRuntime('esbuild');
const {chromium} = process.env.PLAYWRIGHT_MODULE ? await import(process.env.PLAYWRIGHT_MODULE) : requireRuntime('playwright');
const data = JSON.parse(await fs.readFile(input,'utf8'));
if(data.type === 'excalidraw') { const errors=validateScene(data); if(errors.length)throw Error(errors.join('\n')); }
else if(!Array.isArray(data.elements) || !data.elements.length)throw Error('Expected elements in skeleton');
await fs.mkdir(out,{recursive:true});
const temp = await fs.mkdtemp(path.join(os.tmpdir(),'excalidraw-render-'));
let browser, server;
try {
  await build({stdin:{contents:`import {convertToExcalidrawElements,exportToSvg} from '@excalidraw/excalidraw';
window.convertScene=convertToExcalidrawElements; window.exportScene=exportToSvg;`, resolveDir:runtime, loader:'js'},bundle:true,format:'iife',outfile:path.join(temp,'bundle.js'),define:{'process.env.NODE_ENV':'"production"'},logLevel:'silent'});
  const bundle=await fs.readFile(path.join(temp,'bundle.js'));
  const virgil=await fs.readFile(path.join(runtime,'node_modules/@excalidraw/excalidraw/dist/prod/fonts/Virgil/Virgil-Regular.woff2'));
  server=http.createServer((req,res)=>{
    if(req.url==='/fonts/Virgil/Virgil-Regular.woff2'){res.setHeader('content-type','font/woff2');res.end(virgil);}
    else if(req.url==='/bundle.js'){res.setHeader('content-type','text/javascript');res.end(bundle);}
    else {res.setHeader('content-type','text/html');res.end('<!doctype html><meta charset="utf-8"><style>body{margin:0}svg{display:block}</style><div id="root"></div><script>window.EXCALIDRAW_ASSET_PATH=location.origin+"/";</script><script src="/bundle.js"></script>');}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin=`http://127.0.0.1:${server.address().port}`;
  browser=await chromium.launch({headless:true,...(option('--browser')?{executablePath:option('--browser')}:{})});
  const page=await browser.newPage({viewport:{width:2000,height:1200},deviceScaleFactor:scale});
  const network=[];
  await page.route('**/*',route=>{
    if(route.request().url().startsWith(origin+'/') || route.request().url().startsWith('data:'))return route.continue();
    network.push(route.request().url());return route.abort();
  });
  await page.goto(origin);
  await page.waitForFunction(()=>!!window.exportScene);
  const result=await page.evaluate(async data=>{
    // Load before conversion so bound labels use the same metrics as the export.
    const font=new FontFace('Virgil','url(/fonts/Virgil/Virgil-Regular.woff2)');
    await font.load();document.fonts.add(font);
    let scene;
    if(data.type==='excalidraw')scene=data;
    else {
      const elements=window.convertScene(data.elements,{regenerateIds:false});
      // Stable generated labels, seeds and timestamps make repeated exports comparable.
      const remap=new Map();
      for(const e of elements)if(e.type==='text' && e.containerId)remap.set(e.id,e.containerId+'-label');
      const id=x=>remap.get(x)||x;
      const hash=s=>{let n=2166136261;for(const c of s)n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0;};
      for(const e of elements){e.id=id(e.id);if(e.containerId)e.containerId=id(e.containerId);for(const b of e.boundElements||[])b.id=id(b.id);e.seed=hash(e.id)%2147483647;e.versionNonce=hash(e.id+'v')%2147483647;e.updated=1;}
      const byId=new Map(elements.map(e=>[e.id,e]));
      // Explicit bindings preserve hand-routed polylines, unlike endpoint auto-layout.
      for(const b of data.bindings||[]) {
        const arrow=byId.get(b.arrow);
        for(const end of ['start','end'])if(b[end]) {
          const target=byId.get(b[end]);
          if(!arrow || !target)throw Error('Unknown binding '+JSON.stringify(b));
          arrow[end+'Binding']={elementId:target.id,focus:0,gap:1};
          target.boundElements=[...(target.boundElements||[]).filter(x=>x.id!==arrow.id),{id:arrow.id,type:'arrow'}];
        }
      }
      scene={type:'excalidraw',version:2,source:'https://excalidraw.com',elements,appState:{viewBackgroundColor:'#ffffff',...data.appState},files:data.files||{}};
    }
    const customFonts=[...new Set(scene.elements.filter(e=>e.type==='text' && ![1,2].includes(e.fontFamily)).map(e=>e.fontFamily))];
    if(customFonts.length)throw Error('Offline renderer supports local Virgil family 1 and Helvetica family 2; configure other families explicitly: '+customFonts);
    await document.fonts.ready;
    const svg=await window.exportScene({elements:scene.elements,appState:{...scene.appState,exportBackground:true,exportWithDarkMode:false},files:scene.files,exportPadding:0});
    document.getElementById('root').replaceChildren(svg);
    await document.fonts.ready;
    const errors=[];
    for(const text of svg.querySelectorAll('text')) {
      const r=text.getBoundingClientRect(), s=svg.getBoundingClientRect();
      if(r.left<s.left-1||r.top<s.top-1||r.right>s.right+1||r.bottom>s.bottom+1)errors.push('Text outside canvas: '+text.textContent);
    }
    return {scene,svg:new XMLSerializer().serializeToString(svg),width:Number(svg.getAttribute('width')),height:Number(svg.getAttribute('height')),errors};
  },data);
  const errors=[...validateScene(result.scene),...result.errors];
  if(errors.length)throw Error(errors.join('\n'));
  if(network.length)throw Error('Offline render attempted external resources: '+network.join(', '));
  const stem=path.basename(input).replace(/\.(excalidraw|json)$/,'');
  const target=path.join(out,stem);
  await fs.writeFile(target+'.excalidraw',JSON.stringify(result.scene,null,2)+'\n');
  await fs.writeFile(target+'.svg',result.svg);
  await page.locator('#root svg').screenshot({path:target+'.png',timeout:30000});
  const report={input,elements:result.scene.elements.length,width:result.width,height:result.height,scale,structuralErrors:[],externalRequests:network,visualReview:'required'};
  await fs.writeFile(target+'.qa.json',JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify({scene:target+'.excalidraw',svg:target+'.svg',png:target+'.png',...report}));
} finally {
  await browser?.close();
  if(server)await new Promise(resolve=>server.close(resolve));
  await fs.rm(temp,{recursive:true,force:true});
}
