import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{i as n,w as r}from"./index-CUmFZGvc.js";import{i}from"./registry-D42I2yBH.js";import{n as a,r as o}from"./graph-Dr7ebYeb.js";import{a as s,d as c,f as l,l as u,n as d,p as f,t as p}from"./compileWgsl-CR8slkHS.js";var m=e(t(),1),h=e=>e===void 0?null:Number(e);function g(e){let t=[],n=0,r=``;for(let i of e)i===`<`?n++:i===`>`&&n--,(i===`,`||i===`;`||i===`
`)&&n===0?(t.push(r),r=``):r+=i;t.push(r);let i=[];for(let e of t){let t=/^(?:@\S+\s+)*(\w+)\s*:\s*(.+)$/.exec(e.trim());t&&i.push({name:t[1],type:t[2].trim()})}return i}function _(e){let t=new Map;for(let n of e.matchAll(/struct\s+(\w+)\s*\{([^}]*)\}/g))t.set(n[1],g(n[2]));let n=[];for(let r of e.matchAll(/((?:@(?:group|binding)\(\s*\d+\s*\)\s*){2})var(?:<\s*([^>]+?)\s*>)?\s+(\w+)\s*:\s*([^;]+);/g)){let e=r[4].trim(),i=r[2]?.split(`,`)[0].trim();n.push({group:h(/@group\(\s*(\d+)/.exec(r[1])?.[1]),binding:h(/@binding\(\s*(\d+)/.exec(r[1])?.[1]),kind:i??(/^texture/.test(e)?`texture`:/^sampler/.test(e)?`sampler`:`handle`),name:r[3],type:e,fields:t.get(e)??[]})}return n}function v(e){let t=[],n=/(?:layout\s*\(([^)]*)\)\s*)?uniform\s+(\w+)\s*\{([^}]*)\}\s*(\w*)\s*;/g;for(let r of e.matchAll(n)){let e=[];for(let t of r[3].matchAll(/(?:(?:highp|mediump|lowp)\s+)?(\w+)\s+(\w+)(\[[^\]]*\])?\s*;/g))e.push({name:t[2],type:t[1]+(t[3]??``)});t.push({group:null,binding:h(/binding\s*=\s*(\d+)/.exec(r[1]??``)?.[1]),kind:`block`,name:r[4]||r[2],type:r[2],fields:e})}for(let r of e.replace(n,``).matchAll(/(?:layout\s*\(([^)]*)\)\s*)?uniform\s+(?:(?:highp|mediump|lowp)\s+)?(\w+)\s+(\w+)(\[[^\]]*\])?\s*;/g))t.push({group:null,binding:h(/binding\s*=\s*(\d+)/.exec(r[1]??``)?.[1]),kind:`uniform`,name:r[3],type:r[2]+(r[4]??``),fields:[]});return t}function y(e,t){return t===`WGSL`?_(e):v(e)}var b=`@vertex
fn vs_main(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  let p = array(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  return vec4f(p[i], 0.0, 1.0);
}`,x=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`);function S(e,t){let r=e=>e.replace(/\\/g,`\\\\`).replace(/`/g,"\\`").replace(/\$\{/g,"\\${");return`<!doctype html>
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- Gerado pelo Expctral Prism Studio · projeto ${x(JSON.stringify(t.title))} · WGSL autocontido (2D) -->
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${x(t.title)} · WGSL</title>
<style>
  html, body { margin: 0; height: 100%; background: ${n.base}; color: ${n.textSecondary}; font: 14px system-ui, sans-serif; }
  canvas { display: block; width: 100vw; height: 100vh; }
  p { padding: 16px; }
</style>
</head>
<body>
<canvas id="prism"></canvas>
<script type="module">
// Base Color do grafo, sem luz. Precisa de WebGPU (Chrome/Edge 113+, Safari 26+).
const FRAGMENT = \`${r(e)}\`
const VERTEX = \`${r(b)}\`
const ANIMATED = ${t.animated}

const canvas = document.getElementById('prism')
const fail = (msg) => {
  canvas.remove()
  document.body.insertAdjacentHTML('beforeend', '<p></p>')
  document.querySelector('p').textContent = msg
}
const adapter = await navigator.gpu?.requestAdapter()
if (!adapter) {
  fail('Este navegador não tem WebGPU.')
} else {
  const device = await adapter.requestDevice()
  const context = canvas.getContext('webgpu')
  const format = navigator.gpu.getPreferredCanvasFormat()
  context.configure({ device, format, alphaMode: 'opaque' })
  const module = device.createShaderModule({ code: VERTEX + '\\n' + FRAGMENT })
  const pipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: { module, entryPoint: 'vs_main' },
    fragment: { module, entryPoint: '${p}', targets: [{ format }] },
    primitive: { topology: 'triangle-list' },
  })
  // struct U { resolution: vec2f, time: f32 } = 12 bytes, alinhado a 16
  const uniforms = device.createBuffer({ size: 16, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST })
  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: { buffer: uniforms } }],
  })
  const resize = () => {
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * devicePixelRatio))
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * devicePixelRatio))
  }
  const frame = (ms) => {
    resize()
    device.queue.writeBuffer(uniforms, 0, new Float32Array([canvas.width, canvas.height, ms / 1000, 0]))
    const encoder = device.createCommandEncoder()
    const pass = encoder.beginRenderPass({
      colorAttachments: [{ view: context.getCurrentTexture().createView(), loadOp: 'clear', storeOp: 'store' }],
    })
    pass.setPipeline(pipeline)
    pass.setBindGroup(0, bindGroup)
    pass.draw(3)
    pass.end()
    device.queue.submit([encoder.finish()])
    if (ANIMATED) requestAnimationFrame(frame)
  }
  // animado, o laço já redesenha; parado, redesenha ao mudar o tamanho
  if (!ANIMATED) addEventListener('resize', () => requestAnimationFrame(frame))
  requestAnimationFrame(frame)
}
<\/script>
</body>
</html>
`}var C=r(),w=[{id:`three`,label:`Backend do three`,hint:`O shader que o WebGPURenderer gerou para o viewer`},{id:`wgsl`,label:`WGSL autocontido (2D)`,hint:`Base Color sem luz, para quad de tela cheia (mesmo do .exp)`}],T=[{id:`fragment`,label:`Fragment`},{id:`vertex`,label:`Vertex`}],E=`expctral`;function D(e){let t=o.getState().compiled,n=[[t?.material??void 0,`material do grafo`],[t?.vfx?.material,`partículas (VFX Output)`]];for(let[t,r]of n){if(!t)continue;let n=null;if(e.traverse(e=>{!n&&e.material===t&&(n=e)}),n)return{object:n,label:r}}return null}async function O(){let e=f(),{scene:t,camera:n}=u;if(!e||!t||!n)return`O viewer 3D ainda não iniciou.`;let r=D(t);if(!r)return`Nenhum objeto do viewer usa o material do grafo agora (preview isolado de um nó, ou o grafo não compila).`;let{vertexShader:i,fragmentShader:a}=await e.debug.getShaderAsync(t,n,r.object),o=!!e.backend.isWebGPUBackend;return!i||!a?`O renderer não devolveu o código deste objeto.`:{lang:o?`WGSL`:`GLSL`,vertex:i,fragment:a,object:r.label}}function k(){let[e,t]=(0,m.useState)(`three`);return(0,C.jsxs)(`div`,{className:`shader-panel`,children:[(0,C.jsx)(`div`,{className:`shader-panel__bar`,children:(0,C.jsx)(c,{items:w,value:e,onChange:t,label:`Origem do shader`})}),e===`three`?(0,C.jsx)(A,{}):(0,C.jsx)(M,{})]})}function A(){let e=o(e=>e.compiled),[t,n]=(0,m.useState)(`fragment`),[r,i]=(0,m.useState)(null),[a,u]=(0,m.useState)(`lendo o shader do viewer…`);(0,m.useEffect)(()=>{let e=!1,t=setTimeout(()=>{O().then(t=>{e||(typeof t==`string`?(i(null),u(t)):(i(t),u(``)))}).catch(t=>!e&&u(`erro ao ler o shader: ${t.message}`))},150);return()=>{e=!0,clearTimeout(t)}},[e]);let d=r?r[t]:``,f=(0,m.useMemo)(()=>r?y(d,r.lang):[],[r,d]),p=r?.lang===`GLSL`?`glsl`:`wgsl`;return(0,C.jsxs)(`div`,{className:`shader-panel__body`,children:[(0,C.jsxs)(`div`,{className:`shader-panel__row`,children:[(0,C.jsx)(c,{items:T,value:t,onChange:n,label:`Estágio do shader`}),r&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(`span`,{className:`shader-panel__meta`,children:[r.lang,` · `,r.object,` · `,d.split(`
`).length,` linhas`]}),(0,C.jsx)(l,{size:`sm`,onClick:()=>void navigator.clipboard.writeText(d),children:`Copiar`}),(0,C.jsxs)(l,{size:`sm`,onClick:()=>s(d,`${E}.${t}.${p}`),children:[`Baixar .`,p]})]})]}),a&&(0,C.jsx)(`p`,{className:`shader-panel__note`,children:a}),(0,C.jsxs)(`ul`,{className:`shader-panel__limits`,children:[(0,C.jsx)(`li`,{children:`O shader do three depende dos bindings e do layout internos dele: não roda fora do three.`}),(0,C.jsx)(`li`,{children:`Compute e storage buffers só existem em WGSL.`}),(0,C.jsx)(`li`,{children:`O GLSL só aparece com ?webgl na URL (ou num navegador sem WebGPU).`})]}),r&&(0,C.jsx)(j,{bindings:f}),r&&(0,C.jsx)(`pre`,{className:`code-fallback shader-panel__code`,children:d})]})}function j({bindings:e}){return e.length?(0,C.jsxs)(`details`,{className:`shader-panel__bindings`,children:[(0,C.jsxs)(`summary`,{children:[e.length,` binding`,e.length===1?``:`s`,` e uniforms (lidos do texto)`]}),(0,C.jsx)(`ul`,{children:e.map((e,t)=>(0,C.jsxs)(`li`,{children:[(0,C.jsxs)(`code`,{children:[e.group===null?``:`@group(${e.group}) `,e.binding===null?``:`@binding(${e.binding}) `,e.kind,` `,e.name,`: `,e.type]}),e.fields.length>0&&(0,C.jsx)(`span`,{className:`shader-panel__fields`,children:e.fields.map(e=>`${e.name}: ${e.type}`).join(` · `)})]},`${e.name}-${t}`))})]}):(0,C.jsx)(`p`,{className:`shader-panel__note`,children:`Nenhum binding reconhecido neste estágio.`})}function M(){let e=o(e=>e.nodes),t=o(e=>e.edges),{wgsl:n,animated:r,errors:c,unsupported:u}=(0,m.useMemo)(()=>d(a(e,t)),[e,t]);return(0,C.jsxs)(`div`,{className:`shader-panel__body`,children:[(0,C.jsxs)(`p`,{className:`shader-panel__note`,children:[`Base Color do grafo, sem luz, num quad de tela cheia: `,`{ resolution, time }`,` em @group(0) @binding(0). É o mesmo WGSL do pacote .exp do Registry e roda sem o three.`]}),n?(0,C.jsxs)(C.Fragment,{children:[(0,C.jsxs)(`div`,{className:`shader-panel__row`,children:[(0,C.jsxs)(`span`,{className:`shader-panel__meta`,children:[`WGSL · `,r?`animado (lê time)`:`estático`,` · `,n.split(`
`).length,` linhas`]}),(0,C.jsx)(l,{size:`sm`,onClick:()=>void navigator.clipboard.writeText(n),children:`Copiar`}),(0,C.jsx)(l,{size:`sm`,onClick:()=>s(n,`${E}.fragment.wgsl`),children:`Baixar .wgsl`}),(0,C.jsx)(l,{size:`sm`,variant:`primary`,onClick:()=>s(S(n,{title:E,animated:r}),`${E}-wgsl.html`,`text/html`),title:`Um .html sem dependências: cria o device, o pipeline e o quad`,children:`Exemplo mínimo .html`})]}),(0,C.jsx)(`pre`,{className:`code-fallback shader-panel__code`,children:n})]}):(0,C.jsxs)(`div`,{className:`shader-panel__refusal`,role:`status`,children:[(0,C.jsx)(`strong`,{children:`Este grafo não sai em WGSL autocontido.`}),(0,C.jsxs)(`ul`,{children:[c.map(e=>(0,C.jsx)(`li`,{children:e},e)),u.map(e=>(0,C.jsxs)(`li`,{children:[i(e.type)?.label??e.type,` (`,e.nodeId,`): `,e.reason]},e.nodeId))]})]})]})}export{k as default};