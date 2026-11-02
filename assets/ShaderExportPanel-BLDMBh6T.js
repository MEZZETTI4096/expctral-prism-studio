import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{i as n,w as r}from"./index-D8sZXyU7.js";import{c as i,i as a,o}from"./registry-Bj-Z5c6N.js";import{H as s,V as c,c as l,s as u}from"./graph-BAB0Q3-j.js";import{a as d,d as f,i as p,l as m,t as h}from"./segmented-control-Dk9eKg_Z.js";var g=e(t(),1),_=e=>e===void 0?null:Number(e);function v(e){let t=[],n=0,r=``;for(let i of e)i===`<`?n++:i===`>`&&n--,(i===`,`||i===`;`||i===`
`)&&n===0?(t.push(r),r=``):r+=i;t.push(r);let i=[];for(let e of t){let t=/^(?:@\S+\s+)*(\w+)\s*:\s*(.+)$/.exec(e.trim());t&&i.push({name:t[1],type:t[2].trim()})}return i}function y(e){let t=new Map;for(let n of e.matchAll(/struct\s+(\w+)\s*\{([^}]*)\}/g))t.set(n[1],v(n[2]));let n=[];for(let r of e.matchAll(/((?:@(?:group|binding)\(\s*\d+\s*\)\s*){2})var(?:<\s*([^>]+?)\s*>)?\s+(\w+)\s*:\s*([^;]+);/g)){let e=r[4].trim(),i=r[2]?.split(`,`)[0].trim();n.push({group:_(/@group\(\s*(\d+)/.exec(r[1])?.[1]),binding:_(/@binding\(\s*(\d+)/.exec(r[1])?.[1]),kind:i??(/^texture/.test(e)?`texture`:/^sampler/.test(e)?`sampler`:`handle`),name:r[3],type:e,fields:t.get(e)??[]})}return n}function ee(e){let t=[],n=/(?:layout\s*\(([^)]*)\)\s*)?uniform\s+(\w+)\s*\{([^}]*)\}\s*(\w*)\s*;/g;for(let r of e.matchAll(n)){let e=[];for(let t of r[3].matchAll(/(?:(?:highp|mediump|lowp)\s+)?(\w+)\s+(\w+)(\[[^\]]*\])?\s*;/g))e.push({name:t[2],type:t[1]+(t[3]??``)});t.push({group:null,binding:_(/binding\s*=\s*(\d+)/.exec(r[1]??``)?.[1]),kind:`block`,name:r[4]||r[2],type:r[2],fields:e})}for(let r of e.replace(n,``).matchAll(/(?:layout\s*\(([^)]*)\)\s*)?uniform\s+(?:(?:highp|mediump|lowp)\s+)?(\w+)\s+(\w+)(\[[^\]]*\])?\s*;/g))t.push({group:null,binding:_(/binding\s*=\s*(\d+)/.exec(r[1]??``)?.[1]),kind:`uniform`,name:r[3],type:r[2]+(r[4]??``),fields:[]});return t}function te(e,t){return t===`WGSL`?y(e):ee(e)}var b={f32:1,vec2f:2,vec3f:3,vec4f:4},ne=[`f32`,`f32`,`vec2f`,`vec3f`,`vec4f`],x=`fs_main`;function S(e){let t=Number(e);if(!Number.isFinite(t))throw new T(`parâmetro numérico inválido (NaN/infinito)`);let n=String(t);return/[.eE]/.test(n)?n:`${n}.0`}var C=e=>({code:S(e),type:`f32`});function re(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function w(e){let t=String(e).trim(),n=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t);if(!n)throw new T(`cor "${t}" fora do formato #rrggbb`);let r=n[1].length===3?[...n[1]].map(e=>e+e).join(``):n[1];return{code:`vec3f(${[0,2,4].map(e=>re(parseInt(r.slice(e,e+2),16)/255)).map(S).join(`, `)})`,type:`vec3f`}}var T=class extends Error{};function E(e,t){let n=b[e.type],r=b[t];return n===r?e.code:n>r?r===1?`(${e.code}).x`:`(${e.code}).${`xyz`.slice(0,r)}`:r===4&&n>1?`vec4f(${E(e,`vec3f`)}, 1.0)`:n===2?`vec3f(${e.code}, 0.0)`:`${t}(${e.code})`}function ie(...e){return ne[Math.max(...e.map(e=>b[e.type]))]}var D=(e,t,n)=>{let r=ie(t,n);return{code:`(${E(t,r)} ${e} ${E(n,r)})`,type:r}},O=(e,t)=>D(`+`,e,t),k=(e,t)=>D(`-`,e,t),A=(e,t)=>D(`*`,e,t),j=(e,t)=>D(`/`,e,t);function M(e,...t){let n=ie(...t);return{code:`${e}(${t.map(e=>E(e,n)).join(`, `)})`,type:n}}var N=(e,t)=>({code:`${e}(${t.code})`,type:t.type}),P=(e,t)=>({code:`(${e.code}).${t}`,type:`f32`}),F=e=>({code:E(e,`vec3f`),type:`vec3f`}),I=S(Math.PI*2),L=`vec3f(0.2126, 0.7152, 0.0722)`,R={hash21:{code:`fn prism_hash21(p: vec2f) -> f32 {
  return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453);
}`},hash22:{code:`fn prism_hash22(p: vec2f) -> vec2f {
  let q = vec2f(dot(p, vec2f(127.1, 311.7)), dot(p, vec2f(269.5, 183.3)));
  return fract(sin(q) * 43758.5453);
}`},valueNoise:{deps:[`hash21`],code:`fn prism_value_noise(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (f * -2.0 + 3.0);
  let a = prism_hash21(i);
  let b = prism_hash21(i + vec2f(1.0, 0.0));
  let c = prism_hash21(i + vec2f(0.0, 1.0));
  let d = prism_hash21(i + vec2f(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}`},fbm:{deps:[`valueNoise`],code:`fn prism_fbm(p: vec2f, octaves: i32) -> f32 {
  var sum = 0.0;
  var amp = 0.5;
  var freq = 1.0;
  for (var i = 0; i < octaves; i++) {
    sum = sum + prism_value_noise(p * freq) * amp;
    freq = freq * 2.0;
    amp = amp * 0.5;
  }
  return sum;
}`},worley:{deps:[`hash22`],code:`fn prism_worley_f1(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  var md = 8.0;
  for (var y = -1; y <= 1; y++) {
    for (var x = -1; x <= 1; x++) {
      let g = vec2f(f32(x), f32(y));
      let r = g + prism_hash22(i + g) - f;
      md = min(md, dot(r, r));
    }
  }
  return sqrt(md);
}`},mod:{code:`fn prism_mod(x: f32, y: f32) -> f32 {
  return x - y * floor(x / y);
}`},saturation:{code:`fn prism_saturation(c: vec3f, adjustment: f32) -> vec3f {
  return max(mix(vec3f(dot(c, ${L})), c, vec3f(adjustment)), vec3f(0.0));
}`},hue:{code:`fn prism_hue(c: vec3f, adjustment: f32) -> vec3f {
  let k = vec3f(0.57735, 0.57735, 0.57735);
  let cosAngle = cos(adjustment);
  return max(c * cosAngle + (cross(k, c) * sin(adjustment) + k * (dot(k, c) * (1.0 - cosAngle))), vec3f(0.0));
}`},linearToSrgb:{code:`fn prism_linear_to_srgb(linear: vec3f) -> vec3f {
  let c = clamp(linear, vec3f(0.0), vec3f(1.0));
  return select(1.055 * pow(c, vec3f(1.0 / 2.4)) - 0.055, c * 12.92, c <= vec3f(0.0031308));
}`}},z={code:`uv`,type:`vec2f`},B=`Domínio 3D (Posição) depende da malha, que o quad 2D não tem`,V=e=>e.domain===`3D (Posição)`;function H(e){let t=e.uv??z;if(t.type!==`vec2f`)throw new T(`a entrada UV/Coord precisa vir de um UV ou Mapping (vetor 2D)`);return t}var ae=e=>{let t=Math.max(1,Math.min(8,Number(e)));return Number.isFinite(t)?Math.ceil(t):1},U=e=>Number(e)*Math.PI/180;function W(e,t,n,r,i,a){let o=j(k(e,C(t)),{code:`(${S(n)} - ${S(t)})`,type:`f32`});return a&&(o=M(`clamp`,o,C(0),C(1))),O(A(o,{code:`(${S(i)} - ${S(r)})`,type:`f32`}),C(r))}var G={value:(e,t)=>({value:C(t.value)}),color:(e,t)=>({color:w(t.color)}),noise:(e,t,n)=>{if(V(t))throw new T(B);return n.helper(`fbm`),{value:{code:`prism_fbm(${A(H(e),C(t.scale)).code}, ${ae(t.octaves)})`,type:`f32`}}},voronoi:(e,t,n)=>{if(V(t))throw new T(B);return n.helper(`worley`),{value:{code:`prism_worley_f1(${A(H(e),C(t.scale)).code})`,type:`f32`}}},cells:(e,t,n)=>{if(V(t))throw new T(B);return n.helper(`worley`),{value:j(N(`floor`,A({code:`prism_worley_f1(${A(H(e),C(t.scale)).code})`,type:`f32`},C(t.steps))),C(t.steps))}},checker:(e,t,n)=>{n.helper(`mod`);let r=n.bind(A(A(H(e),C(t.scale)),C(2)));return{value:{code:`sign(prism_mod(floor(${r.code}.x) + floor(${r.code}.y), 2.0))`,type:`f32`}}},gradient:(e,t)=>{let n=H(e);switch(t.type){case`Linear Y`:return{value:P(n,`y`)};case`Radial`:return{value:M(`min`,A({code:`length(${k(n,C(.5)).code})`,type:`f32`},C(2)),C(1))};case`Angular`:return{value:O(j({code:`atan2(${k(P(n,`y`),C(.5)).code}, ${k(P(n,`x`),C(.5)).code})`,type:`f32`},{code:I,type:`f32`}),C(.5))};default:return{value:P(n,`x`)}}},wave:(e,t,n)=>{n.helper(`fbm`);let r=n.bind(H(e));return{value:O(A(N(`sin`,A(A(O(t.axis===`Y`?P(r,`y`):P(r,`x`),A({code:`prism_fbm(${A(r,C(4)).code}, 3)`,type:`f32`},C(t.distort))),C(t.frequency)),{code:I,type:`f32`})),C(.5)),C(.5))}},brick:(e,t,n)=>{let r=n.bind(A(H(e),C(t.scale))),i=N(`floor`,P(r,`y`)),a=n.bind(N(`fract`,O(P(r,`x`),A(i,C(.5))))),o=n.bind(N(`fract`,P(r,`y`))),s=C(t.mortar);return{value:A(A(M(`step`,s,a),M(`step`,s,k(C(1),a))),A(M(`step`,s,o),M(`step`,s,k(C(1),o))))}},dots:(e,t)=>{let n=k(N(`fract`,A(H(e),C(t.scale))),C(.5)),r=Number(t.radius);return{value:M(`smoothstep`,C(r),C(r-.03),{code:`length(${n.code})`,type:`f32`})}},mix:(e,t)=>({color:M(`mix`,e.a??w(`#000000`),e.b??w(`#ffffff`),e.fac??C(t.fac))}),colorRamp:(e,t)=>{let n=M(`smoothstep`,C(t.posA),C(t.posB),e.fac??C(.5));return{color:M(`mix`,w(t.colorA),w(t.colorB),n)}},gradientMap:(e,t)=>{let n={code:`dot(${F(e.in??w(`#808080`)).code}, ${L})`,type:`f32`};return{color:M(`mix`,w(t.colorA),w(t.colorB),n)}},brightnessContrast:(e,t)=>({color:O(O(A(k(e.in??w(`#808080`),C(.5)),C(t.contrast)),C(.5)),C(t.brightness))}),hsv:(e,t,n)=>(n.helper(`saturation`),n.helper(`hue`),{color:A({code:`prism_hue(prism_saturation(${F(e.in??w(`#808080`)).code}, ${S(t.sat)}), ${S(U(t.hue))})`,type:`vec3f`},C(t.val))}),hueShift:(e,t,r)=>(r.helper(`hue`),{color:{code:`prism_hue(${F(e.in??w(n.emerald)).code}, ${S(U(t.angle))})`,type:`vec3f`}}),posterize:(e,t)=>({color:j(N(`floor`,A(e.in??w(`#808080`),C(t.steps))),C(t.steps))}),luminance:(e,t)=>{let n={code:`dot(${F(e.in??w(`#808080`)).code}, ${L})`,type:`f32`};return{value:t.curve===`Linear`?n:M(`pow`,n,C(1/2.2))}},invert:e=>({color:k(C(1),e.in??w(`#000000`))}),levels:(e,t,n)=>{let r=M(`pow`,W(e.in??w(`#808080`),Number(t.inBlack),Number(t.inWhite),0,1,!0),C(1/Math.max(.001,Number(t.gamma)))),i=n.bind(W(r,0,1,Number(t.outBlack),Number(t.outWhite),!1));return{color:i,value:i.type===`f32`?i:{code:E(i,`f32`),type:`f32`}}},uv:()=>({uv:z}),mapping:(e,t)=>{let n=U(t.rotate),r=H(e),i=O({code:`(mat2x2f(cos(${S(n)}), sin(${S(n)}), -sin(${S(n)}), cos(${S(n)})) * ${k(r,C(.5)).code})`,type:`vec2f`},C(.5)),a={code:`vec2f(${S(t.offsetX)}, ${S(t.offsetY)})`,type:`vec2f`};return{uv:O(A(i,C(t.scale)),a)}},displacement:(e,t)=>({height:A(k(e.height??C(0),C(t.midlevel)),C(t.scale))}),separateRGB:(e,t,n)=>{let r=n.bind(F(e.in??w(`#000000`)));return{r:{code:`${r.code}.x`,type:`f32`},g:{code:`${r.code}.y`,type:`f32`},b:{code:`${r.code}.z`,type:`f32`}}},combineRGB:(e,t)=>{let n=n=>{let r=e[n]??C(t[n]);if(r.type!==`f32`)throw new T(`a entrada ${n.toUpperCase()} precisa ser um float`);return r.code};return{color:{code:`vec3f(${n(`r`)}, ${n(`g`)}, ${n(`b`)})`,type:`vec3f`}}},math:(e,t)=>{let n=e.a??C(t.a),r=e.b??C(t.b);switch(t.op){case`Add`:return{value:O(n,r)};case`Subtract`:return{value:k(n,r)};case`Power`:return{value:M(`pow`,n,r)};case`Min`:return{value:M(`min`,n,r)};case`Max`:return{value:M(`max`,n,r)};default:return{value:A(n,r)}}},clamp:(e,t)=>({value:M(`clamp`,e.in??C(0),C(t.min),C(t.max))}),remap:(e,t)=>({value:W(e.in??C(0),Number(t.inLow),Number(t.inHigh),Number(t.outLow),Number(t.outHigh),!1)}),step:(e,t)=>({value:M(`step`,C(t.edge),e.in??C(0))}),smoothstep:(e,t)=>({value:M(`smoothstep`,C(t.low),C(t.high),e.in??C(0))}),time:(e,t,n)=>{n.usesTime();let r=A({code:`u.time`,type:`f32`},C(t.speed));switch(t.mode){case`Saw`:return{value:N(`fract`,r)};case`Raw`:return{value:r};default:return{value:O(A(N(`sin`,A(O(r,C(.75)),C(Math.PI*2))),C(.5)),C(.5))}}},reroute:e=>({out:e.in??w(`#000000`)})},K=`depende da malha 3D (posição, normal ou câmera), que o quad 2D não tem`,q=`amostra vizinhos num render target (passo extra que o preview do Registry não tem)`,J="geometria sai em CPU, e o `.exp` e o preview do Registry são só 2D",Y=`depende de entrada ao vivo do app, que o preview do Registry não tem`,X=`nó de partículas (VFX): o preview do Registry é um fragment 2D`,oe={pointer:Y,camera:Y,viewport:Y,objectInfo:Y,audioInput:Y,primitive:J,deform:J,scatter:J,instanceInfo:`lê o atributo de cada instância, que o quad 2D não tem`,geometryOutput:J,data:`tabela numa textura: o preview do Registry só recebe resolution e time, sem texturas`,imageTexture:`textura de imagem: o preview do Registry só recebe resolution e time, sem texturas`,position:K,fresnel:K,normalMap:K,bump:K,sobelNormal:q,blur:q,particle:X,emitter:X,motion:X,turbulence:X,vortex:X,attractor:X,sizeOverLife:X,colorOverLife:X,fade:X,sprite:X,[o]:X};[...Object.keys(G)];function se(e){let t=(e,t=[])=>({wgsl:null,animated:!1,errors:e,unsupported:t});if(c(e))return t([`O grafo contém um ciclo.`]);let n=e.nodes.find(e=>e.type===i);if(!n)return t([e.nodes.some(e=>e.type===`vfxOutput`)?`Só grafos de material exportam para o Registry: o preview dele é um fragment 2D, sem partículas.`:`Adicione um node Material Output.`]);let r=new Map(e.nodes.map(e=>[e.id,e])),a=new Map;for(let t of e.edges){let e=a.get(t.target)??[];e.push(t),a.set(t.target,e)}let o=new Set,l=(a.get(n.id)??[]).filter(e=>e.targetHandle===`color`).map(e=>e.source);for(;l.length;){let e=l.pop();if(!o.has(e)){o.add(e);for(let t of a.get(e)??[])l.push(t.source)}}let u=new Set,d=e=>{if(!u.has(e)){for(let t of R[e].deps??[])d(t);u.add(e)}},f=[],p=!1,m=0,h={helper:d,bind:e=>{let t=`v${m++}`;return f.push(`  let ${t} = ${e.code};`),{code:t,type:e.type}},usesTime:()=>{p=!0}},g=new Map,_=e=>{let t={};for(let n of a.get(e)??[]){let e=g.get(n.source);e&&(t[n.targetHandle]=e[n.sourceHandle])}return t},v=[],y=[];for(let t of s(e)){if(!o.has(t))continue;let e=r.get(t),n=_(t);if(e.muted){let e=Object.values(n).find(e=>e!==void 0);g.set(t,new Proxy({},{get:()=>e}));continue}let i=G[e.type];if(!i){v.push({nodeId:t,type:e.type,reason:oe[e.type]??`tipo de nó desconhecido`});continue}try{let r=i(n,e.params,h),a={};for(let[e,t]of Object.entries(r))a[e]=h.bind(t);g.set(t,a)}catch(n){n instanceof T?v.push({nodeId:t,type:e.type,reason:n.message}):y.push(`Erro em ${e.type}: ${n.message}`)}}if(v.length||y.length)return t(y,v);d(`linearToSrgb`);let ee=_(n.id).color??{code:`vec3f(0.5, 0.5, 0.5)`,type:`vec3f`};return{wgsl:[`// Expctral Prism Studio · Base Color do grafo (sem luz), fragment de quad fullscreen`,`struct U { resolution: vec2f, time: f32 };`,`@group(0) @binding(0) var<uniform> u: U;`,``,...Object.keys(R).filter(e=>u.has(e)).map(e=>R[e].code+`
`),`@fragment`,`fn ${x}(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {`,`  // uv do quad com v = 1 no topo, como uma imagem`,`  let uv = vec2f(fragCoord.x / u.resolution.x, 1.0 - fragCoord.y / u.resolution.y);`,...f,`  return vec4f(prism_linear_to_srgb(${E(ee,`vec3f`)}), 1.0);`,`}`,``].join(`
`),animated:p,errors:[],unsupported:[]}}var ce=`@vertex
fn vs_main(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  let p = array(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  return vec4f(p[i], 0.0, 1.0);
}`,Z=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`);function le(e,t){let r=e=>e.replace(/\\/g,`\\\\`).replace(/`/g,"\\`").replace(/\$\{/g,"\\${");return`<!doctype html>
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- Gerado pelo Expctral Prism Studio · projeto ${Z(JSON.stringify(t.title))} · WGSL autocontido (2D) -->
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${Z(t.title)} · WGSL</title>
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
const VERTEX = \`${r(ce)}\`
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
    fragment: { module, entryPoint: '${x}', targets: [{ format }] },
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
`}var Q=r(),ue=[{id:`three`,label:`Backend do three`,hint:`O shader que o WebGPURenderer gerou para o viewer`},{id:`wgsl`,label:`WGSL autocontido (2D)`,hint:`Base Color sem luz, para quad de tela cheia (mesmo do .exp)`}],de=[{id:`fragment`,label:`Fragment`},{id:`vertex`,label:`Vertex`}],$=`expctral`;function fe(e){let t=u.getState().compiled,n=[[t?.material??void 0,`material do grafo`],[t?.vfx?.material,`partículas (VFX Output)`]];for(let[t,r]of n){if(!t)continue;let n=null;if(e.traverse(e=>{!n&&e.material===t&&(n=e)}),n)return{object:n,label:r}}return null}async function pe(){let e=f(),{scene:t,camera:n}=m;if(!e||!t||!n)return`O viewer 3D ainda não iniciou.`;let r=fe(t);if(!r)return`Nenhum objeto do viewer usa o material do grafo agora (preview isolado de um nó, ou o grafo não compila).`;let{vertexShader:i,fragmentShader:a}=await e.debug.getShaderAsync(t,n,r.object),o=!!e.backend.isWebGPUBackend;return!i||!a?`O renderer não devolveu o código deste objeto.`:{lang:o?`WGSL`:`GLSL`,vertex:i,fragment:a,object:r.label}}function me(){let[e,t]=(0,g.useState)(`three`);return(0,Q.jsxs)(`div`,{className:`shader-panel`,children:[(0,Q.jsx)(`div`,{className:`shader-panel__bar`,children:(0,Q.jsx)(h,{items:ue,value:e,onChange:t,label:`Origem do shader`})}),e===`three`?(0,Q.jsx)(he,{}):(0,Q.jsx)(_e,{})]})}function he(){let e=u(e=>e.compiled),[t,n]=(0,g.useState)(`fragment`),[r,i]=(0,g.useState)(null),[a,o]=(0,g.useState)(`lendo o shader do viewer…`);(0,g.useEffect)(()=>{let e=!1,t=setTimeout(()=>{pe().then(t=>{e||(typeof t==`string`?(i(null),o(t)):(i(t),o(``)))}).catch(t=>!e&&o(`erro ao ler o shader: ${t.message}`))},150);return()=>{e=!0,clearTimeout(t)}},[e]);let s=r?r[t]:``,c=(0,g.useMemo)(()=>r?te(s,r.lang):[],[r,s]),l=r?.lang===`GLSL`?`glsl`:`wgsl`;return(0,Q.jsxs)(`div`,{className:`shader-panel__body`,children:[(0,Q.jsxs)(`div`,{className:`shader-panel__row`,children:[(0,Q.jsx)(h,{items:de,value:t,onChange:n,label:`Estágio do shader`}),r&&(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`span`,{className:`shader-panel__meta`,children:[r.lang,` · `,r.object,` · `,s.split(`
`).length,` linhas`]}),(0,Q.jsx)(d,{size:`sm`,onClick:()=>void navigator.clipboard.writeText(s),children:`Copiar`}),(0,Q.jsxs)(d,{size:`sm`,onClick:()=>p(s,`${$}.${t}.${l}`),children:[`Baixar .`,l]})]})]}),a&&(0,Q.jsx)(`p`,{className:`shader-panel__note`,children:a}),(0,Q.jsxs)(`ul`,{className:`shader-panel__limits`,children:[(0,Q.jsx)(`li`,{children:`O shader do three depende dos bindings e do layout internos dele: não roda fora do three.`}),(0,Q.jsx)(`li`,{children:`Compute e storage buffers só existem em WGSL.`}),(0,Q.jsx)(`li`,{children:`O GLSL só aparece com ?webgl na URL (ou num navegador sem WebGPU).`})]}),r&&(0,Q.jsx)(ge,{bindings:c}),r&&(0,Q.jsx)(`pre`,{className:`code-fallback shader-panel__code`,children:s})]})}function ge({bindings:e}){return e.length?(0,Q.jsxs)(`details`,{className:`shader-panel__bindings`,children:[(0,Q.jsxs)(`summary`,{children:[e.length,` binding`,e.length===1?``:`s`,` e uniforms (lidos do texto)`]}),(0,Q.jsx)(`ul`,{children:e.map((e,t)=>(0,Q.jsxs)(`li`,{children:[(0,Q.jsxs)(`code`,{children:[e.group===null?``:`@group(${e.group}) `,e.binding===null?``:`@binding(${e.binding}) `,e.kind,` `,e.name,`: `,e.type]}),e.fields.length>0&&(0,Q.jsx)(`span`,{className:`shader-panel__fields`,children:e.fields.map(e=>`${e.name}: ${e.type}`).join(` · `)})]},`${e.name}-${t}`))})]}):(0,Q.jsx)(`p`,{className:`shader-panel__note`,children:`Nenhum binding reconhecido neste estágio.`})}function _e(){let{flat:e}=l(),{wgsl:t,animated:n,errors:r,unsupported:i}=(0,g.useMemo)(()=>se(e),[e]);return(0,Q.jsxs)(`div`,{className:`shader-panel__body`,children:[(0,Q.jsxs)(`p`,{className:`shader-panel__note`,children:[`Base Color do grafo, sem luz, num quad de tela cheia: `,`{ resolution, time }`,` em @group(0) @binding(0). É o mesmo WGSL do pacote .exp do Registry e roda sem o three.`]}),t?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`div`,{className:`shader-panel__row`,children:[(0,Q.jsxs)(`span`,{className:`shader-panel__meta`,children:[`WGSL · `,n?`animado (lê time)`:`estático`,` · `,t.split(`
`).length,` linhas`]}),(0,Q.jsx)(d,{size:`sm`,onClick:()=>void navigator.clipboard.writeText(t),children:`Copiar`}),(0,Q.jsx)(d,{size:`sm`,onClick:()=>p(t,`${$}.fragment.wgsl`),children:`Baixar .wgsl`}),(0,Q.jsx)(d,{size:`sm`,variant:`primary`,onClick:()=>p(le(t,{title:$,animated:n}),`${$}-wgsl.html`,`text/html`),title:`Um .html sem dependências: cria o device, o pipeline e o quad`,children:`Exemplo mínimo .html`})]}),(0,Q.jsx)(`pre`,{className:`code-fallback shader-panel__code`,children:t})]}):(0,Q.jsxs)(`div`,{className:`shader-panel__refusal`,role:`status`,children:[(0,Q.jsx)(`strong`,{children:`Este grafo não sai em WGSL autocontido.`}),(0,Q.jsxs)(`ul`,{children:[r.map(e=>(0,Q.jsx)(`li`,{children:e},e)),i.map(e=>(0,Q.jsxs)(`li`,{children:[a(e.type)?.label??e.type,` (`,e.nodeId,`): `,e.reason]},e.nodeId))]})]})]})}export{me as default};