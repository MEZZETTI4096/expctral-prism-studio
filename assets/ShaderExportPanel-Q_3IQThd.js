import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{t}from"./react-CZI7_Jkm.js";import{E as n,i as r}from"./index-pRZSI-oZ.js";import{i,o as a,p as o}from"./registry-BlYx6kdU.js";import{$ as s,c,et as l,s as u}from"./graph-CsKJnZfl.js";import{n as d,t as f}from"./button-axwQcYUG.js";import{c as p,i as m,t as h}from"./segmented-control-DF6El7xk.js";import"./Editor-Cz9ZxpHA.js";var g=e(t(),1),_=e=>e===void 0?null:Number(e);function v(e){let t=[],n=0,r=``;for(let i of e)i===`<`?n++:i===`>`&&n--,(i===`,`||i===`;`||i===`
`)&&n===0?(t.push(r),r=``):r+=i;t.push(r);let i=[];for(let e of t){let t=/^(?:@\S+\s+)*(\w+)\s*:\s*(.+)$/.exec(e.trim());t&&i.push({name:t[1],type:t[2].trim()})}return i}function y(e){let t=new Map;for(let n of e.matchAll(/struct\s+(\w+)\s*\{([^}]*)\}/g))t.set(n[1],v(n[2]));let n=[];for(let r of e.matchAll(/((?:@(?:group|binding)\(\s*\d+\s*\)\s*){2})var(?:<\s*([^>]+?)\s*>)?\s+(\w+)\s*:\s*([^;]+);/g)){let e=r[4].trim(),i=r[2]?.split(`,`)[0].trim();n.push({group:_(/@group\(\s*(\d+)/.exec(r[1])?.[1]),binding:_(/@binding\(\s*(\d+)/.exec(r[1])?.[1]),kind:i??(/^texture/.test(e)?`texture`:/^sampler/.test(e)?`sampler`:`handle`),name:r[3],type:e,fields:t.get(e)??[]})}return n}function ee(e){let t=[],n=/(?:layout\s*\(([^)]*)\)\s*)?uniform\s+(\w+)\s*\{([^}]*)\}\s*(\w*)\s*;/g;for(let r of e.matchAll(n)){let e=[];for(let t of r[3].matchAll(/(?:(?:highp|mediump|lowp)\s+)?(\w+)\s+(\w+)(\[[^\]]*\])?\s*;/g))e.push({name:t[2],type:t[1]+(t[3]??``)});t.push({group:null,binding:_(/binding\s*=\s*(\d+)/.exec(r[1]??``)?.[1]),kind:`block`,name:r[4]||r[2],type:r[2],fields:e})}for(let r of e.replace(n,``).matchAll(/(?:layout\s*\(([^)]*)\)\s*)?uniform\s+(?:(?:highp|mediump|lowp)\s+)?(\w+)\s+(\w+)(\[[^\]]*\])?\s*;/g))t.push({group:null,binding:_(/binding\s*=\s*(\d+)/.exec(r[1]??``)?.[1]),kind:`uniform`,name:r[3],type:r[2]+(r[4]??``),fields:[]});return t}function te(e,t){return t===`WGSL`?y(e):ee(e)}var b={f32:1,vec2f:2,vec3f:3,vec4f:4},ne=[`f32`,`f32`,`vec2f`,`vec3f`,`vec4f`],re=`fs_main`;function x(e){let t=Number(e);if(!Number.isFinite(t))throw new w(`parâmetro numérico inválido (NaN/infinito)`);let n=String(t);return/[.eE]/.test(n)?n:`${n}.0`}var S=e=>({code:x(e),type:`f32`});function ie(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function C(e){let t=String(e).trim(),n=/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(t);if(!n)throw new w(`cor "${t}" fora do formato #rrggbb`);let r=n[1].length===3?[...n[1]].map(e=>e+e).join(``):n[1];return{code:`vec3f(${[0,2,4].map(e=>ie(parseInt(r.slice(e,e+2),16)/255)).map(x).join(`, `)})`,type:`vec3f`}}var w=class extends Error{};function T(e,t){let n=b[e.type],r=b[t];return n===r?e.code:n>r?r===1?`(${e.code}).x`:`(${e.code}).${`xyz`.slice(0,r)}`:r===4&&n>1?`vec4f(${T(e,`vec3f`)}, 1.0)`:n===2?`vec3f(${e.code}, 0.0)`:`${t}(${e.code})`}function ae(...e){return ne[Math.max(...e.map(e=>b[e.type]))]}var E=(e,t,n)=>{let r=ae(t,n);return{code:`(${T(t,r)} ${e} ${T(n,r)})`,type:r}},D=(e,t)=>E(`+`,e,t),O=(e,t)=>E(`-`,e,t),k=(e,t)=>E(`*`,e,t),A=(e,t)=>E(`/`,e,t);function j(e,...t){let n=ae(...t);return{code:`${e}(${t.map(e=>T(e,n)).join(`, `)})`,type:n}}var M=(e,t)=>({code:`${e}(${t.code})`,type:t.type}),N=(e,t)=>({code:`(${e.code}).${t}`,type:`f32`}),P=e=>({code:T(e,`vec3f`),type:`vec3f`}),F=x(Math.PI*2),I=`vec3f(0.2126, 0.7152, 0.0722)`,L={hash21:{code:`fn prism_hash21(p: vec2f) -> f32 {
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
}`},wrap:{code:`fn prism_wrap(i: vec2f, period: vec2f) -> vec2f {
  return i - floor(i / period) * period;
}`},valueNoiseTile:{deps:[`hash21`,`wrap`],code:`fn prism_value_noise_tile(p: vec2f, period: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (f * -2.0 + 3.0);
  let a = prism_hash21(prism_wrap(i, period));
  let b = prism_hash21(prism_wrap(i + vec2f(1.0, 0.0), period));
  let c = prism_hash21(prism_wrap(i + vec2f(0.0, 1.0), period));
  let d = prism_hash21(prism_wrap(i + vec2f(1.0, 1.0), period));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}`},fbmTile:{deps:[`valueNoiseTile`],code:`fn prism_fbm_tile(p: vec2f, period: vec2f, octaves: i32) -> f32 {
  var sum = 0.0;
  var amp = 0.5;
  var freq = 1.0;
  for (var i = 0; i < octaves; i++) {
    sum = sum + prism_value_noise_tile(p * freq, period * freq) * amp;
    freq = freq * 2.0;
    amp = amp * 0.5;
  }
  return sum;
}`},worleyTile:{deps:[`hash22`,`wrap`],code:`fn prism_worley_f1_tile(p: vec2f, period: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  var md = 8.0;
  for (var y = -1; y <= 1; y++) {
    for (var x = -1; x <= 1; x++) {
      let g = vec2f(f32(x), f32(y));
      let r = g + prism_hash22(prism_wrap(i + g, period)) - f;
      md = min(md, dot(r, r));
    }
  }
  return sqrt(md);
}`},worleyCells:{deps:[`hash21`,`hash22`,`wrap`],code:`fn prism_worley_cells(p: vec2f, period: vec2f) -> vec3f {
  let i = floor(p);
  let f = fract(p);
  var f1 = 8.0;
  var f2 = 8.0;
  var id = 0.0;
  for (var y = -1; y <= 1; y++) {
    for (var x = -1; x <= 1; x++) {
      let g = vec2f(f32(x), f32(y));
      var cell = i + g;
      if (period.x > 0.0) { cell = prism_wrap(cell, period); }
      let r = g + prism_hash22(cell) - f;
      let d = dot(r, r);
      if (d < f1) {
        f2 = f1;
        id = prism_hash21(cell);
        f1 = d;
      } else {
        f2 = min(f2, d);
      }
    }
  }
  return vec3f(sqrt(f1), sqrt(f2), id);
}`},worleyEdge:{deps:[`hash22`,`wrap`],code:`fn prism_worley_point(n: vec2f, f: vec2f, g: vec2f, period: vec2f) -> vec2f {
  var cell = n + g;
  if (period.x > 0.0) { cell = prism_wrap(cell, period); }
  return g + prism_hash22(cell) - f;
}
fn prism_worley_edge(p: vec2f, period: vec2f) -> f32 {
  let n = floor(p);
  let f = fract(p);
  var md = 8.0;
  var mr = vec2f(0.0);
  var mg = vec2f(0.0);
  for (var y = -1; y <= 1; y++) {
    for (var x = -1; x <= 1; x++) {
      let g = vec2f(f32(x), f32(y));
      let r = prism_worley_point(n, f, g, period);
      let d = dot(r, r);
      if (d < md) {
        md = d;
        mr = r;
        mg = g;
      }
    }
  }
  var edge = 8.0;
  for (var y = -2; y <= 2; y++) {
    for (var x = -2; x <= 2; x++) {
      let r = prism_worley_point(n, f, mg + vec2f(f32(x), f32(y)), period);
      let diff = r - mr;
      let len = length(diff);
      if (len > 0.0001) { edge = min(edge, dot((mr + r) * 0.5, diff / len)); }
    }
  }
  return edge;
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
  return max(mix(vec3f(dot(c, ${I})), c, vec3f(adjustment)), vec3f(0.0));
}`},hue:{code:`fn prism_hue(c: vec3f, adjustment: f32) -> vec3f {
  let k = vec3f(0.57735, 0.57735, 0.57735);
  let cosAngle = cos(adjustment);
  return max(c * cosAngle + (cross(k, c) * sin(adjustment) + k * (dot(k, c) * (1.0 - cosAngle))), vec3f(0.0));
}`},linearToSrgb:{code:`fn prism_linear_to_srgb(linear: vec3f) -> vec3f {
  let c = clamp(linear, vec3f(0.0), vec3f(1.0));
  return select(1.055 * pow(c, vec3f(1.0 / 2.4)) - 0.055, c * 12.92, c <= vec3f(0.0031308));
}`}},oe={code:`uv`,type:`vec2f`},R=`Domínio 3D (Posição) depende da malha, que o quad 2D não tem`,z=e=>e.domain===`3D (Posição)`;function B(e){let t=e.uv??oe;if(t.type!==`vec2f`)throw new w(`a entrada UV/Coord precisa vir de um UV ou Mapping (vetor 2D)`);return t}var V=e=>{let t=Math.max(1,Math.min(8,Number(e)));return Number.isFinite(t)?Math.ceil(t):1},H=(e,t)=>({code:`vec2f(${x(e)}, ${x(t)})`,type:`vec2f`}),U=e=>Math.max(1,Math.floor(Number(e)+.5));function W(e,t,n){if(t.tile===!0){n.helper(`worleyTile`);let r=U(t.scale);return{code:`prism_worley_f1_tile(${k(B(e),S(r)).code}, ${H(r,r).code})`,type:`f32`}}return n.helper(`worley`),{code:`prism_worley_f1(${k(B(e),S(t.scale)).code})`,type:`f32`}}var G=e=>Number(e)*Math.PI/180;function K(e,t,n,r,i,a){let o=A(O(e,S(t)),{code:`(${x(n)} - ${x(t)})`,type:`f32`});return a&&(o=j(`clamp`,o,S(0),S(1))),D(k(o,{code:`(${x(i)} - ${x(r)})`,type:`f32`}),S(r))}var se={value:(e,t)=>({value:S(t.value)}),color:(e,t)=>({color:C(t.color)}),noise:(e,t,n)=>{if(z(t))throw new w(R);let r=Number(t.stretch??1)>0?Number(t.stretch??1):1,i=Number(t.scale)*r;if(t.tile===!0){n.helper(`fbmTile`);let r=H(U(t.scale),U(i));return{value:{code:`prism_fbm_tile(${k(B(e),r).code}, ${r.code}, ${V(t.octaves)})`,type:`f32`}}}return n.helper(`fbm`),{value:{code:`prism_fbm(${k(B(e),r===1?S(t.scale):H(Number(t.scale),i)).code}, ${V(t.octaves)})`,type:`f32`}}},voronoi:(e,t,n)=>{if(z(t))throw new w(R);let r=t.mode??`Distância`;if(r===`Distância`)return{value:W(e,t,n)};let i=t.tile===!0?U(t.scale):0,a=k(B(e),S(i||t.scale));if(r===`Bordas`)return n.helper(`worleyEdge`),{value:{code:`prism_worley_edge(${a.code}, ${H(i,i).code})`,type:`f32`}};n.helper(`worleyCells`);let o=n.bind({code:`prism_worley_cells(${a.code}, ${H(i,i).code})`,type:`vec3f`});return{value:(e=>({code:`(${o.code}).${e}`,type:`f32`}))(`z`)}},cells:(e,t,n)=>{if(z(t))throw new w(R);return{value:A(M(`floor`,k(W(e,t,n),S(t.steps))),S(t.steps))}},checker:(e,t,n)=>{n.helper(`mod`);let r=n.bind(k(k(B(e),S(t.scale)),S(2)));return{value:{code:`sign(prism_mod(floor(${r.code}.x) + floor(${r.code}.y), 2.0))`,type:`f32`}}},gradient:(e,t)=>{let n=B(e);switch(t.type){case`Linear Y`:return{value:N(n,`y`)};case`Radial`:return{value:j(`min`,k({code:`length(${O(n,S(.5)).code})`,type:`f32`},S(2)),S(1))};case`Angular`:return{value:D(A({code:`atan2(${O(N(n,`y`),S(.5)).code}, ${O(N(n,`x`),S(.5)).code})`,type:`f32`},{code:F,type:`f32`}),S(.5))};default:return{value:N(n,`x`)}}},wave:(e,t,n)=>{let r=t.tile===!0;n.helper(r?`fbmTile`:`fbm`);let i=n.bind(B(e));return{value:D(k(M(`sin`,k(k(D(t.axis===`Y`?N(i,`y`):N(i,`x`),k({code:r?`prism_fbm_tile(${k(i,S(4)).code}, vec2f(4.0, 4.0), 3)`:`prism_fbm(${k(i,S(4)).code}, 3)`,type:`f32`},S(t.distort))),S(r?U(t.frequency):t.frequency)),{code:F,type:`f32`})),S(.5)),S(.5))}},brick:(e,t,n)=>{n.helper(`hash21`);let r=S(t.scale),i=S(t.aspect??1),a=n.bind(k(B(e),r)),o=n.bind(M(`floor`,N(a,`y`))),s=n.bind(D(A(N(a,`x`),i),k(o,S(t.offset??.5)))),c=n.bind(M(`fract`,s)),l=n.bind(M(`fract`,N(a,`y`))),u=j(`clamp`,A(O(j(`min`,k(j(`min`,c,O(S(1),c)),i),j(`min`,l,O(S(1),l))),S(t.mortar)),S(Math.max(Number(t.bevel??0),1e-4))),S(0),S(1)),d=S(Number(t.scale)/Number(t.aspect??1)),f=n.bind(k(M(`floor`,A(o,r)),r)),p=n.bind(O(M(`floor`,s),k(f,S(t.offset??.5))));return{value:u,id:{code:`prism_hash21(vec2f(${O(p,k(M(`floor`,A(p,d)),d)).code}, ${O(o,f).code}))`,type:`f32`}}},dots:(e,t)=>{let n=O(M(`fract`,k(B(e),S(t.scale))),S(.5)),r=Number(t.radius);return{value:j(`smoothstep`,S(r),S(r-.03),{code:`length(${n.code})`,type:`f32`})}},mix:(e,t)=>({color:j(`mix`,e.a??C(`#000000`),e.b??C(`#ffffff`),e.fac??S(t.fac))}),blend:(e,t,n)=>{let r=n.bind(P(e.a??C(`#000000`))),i=n.bind(P(e.b??C(`#ffffff`))),a={code:`vec3f(1.0)`,type:`vec3f`},o=e=>O(a,k(e,k(O(a,r),O(a,i)))),s={Multiply:()=>k(r,i),Add:()=>D(r,i),Subtract:()=>O(r,i),Screen:()=>o(S(1)),Overlay:()=>j(`mix`,k(k(r,i),S(2)),o(S(2)),j(`step`,{code:`vec3f(0.5)`,type:`vec3f`},r)),Darken:()=>j(`min`,r,i),Lighten:()=>j(`max`,r,i),Difference:()=>M(`abs`,O(r,i)),Divide:()=>A(r,j(`max`,i,{code:`vec3f(0.0001)`,type:`vec3f`}))},c=S(t.opacity??1);return{color:j(`mix`,r,(s[String(t.mode)]??(()=>i))(),e.mask?k(c,e.mask):c)}},colorRamp:(e,t)=>{let n=j(`smoothstep`,S(t.posA),S(t.posB),e.fac??S(.5));return{color:j(`mix`,C(t.colorA),C(t.colorB),n)}},gradientMap:(e,t)=>{let n={code:`dot(${P(e.in??C(`#808080`)).code}, ${I})`,type:`f32`};return{color:j(`mix`,C(t.colorA),C(t.colorB),n)}},gradientMap4:(e,t,n)=>{let r=n.bind({code:`dot(${P(e.in??C(`#808080`)).code}, ${I})`,type:`f32`}),i=Number(t.posC??.33),a=Math.max(Number(t.posD??.66),i+.001),o=(e,t)=>j(`clamp`,A(O(r,S(e)),S(t)),S(0),S(1));return{color:j(`mix`,j(`mix`,j(`mix`,C(t.colorA),C(t.colorC),o(0,i)),C(t.colorD),o(i,a-i)),C(t.colorB),o(a,Math.max(1-a,.001)))}},heightBlend:(e,t,n)=>{let r=e.heightA??S(.5),i=e.heightB??S(.5),a=S(Math.max(1-Number(t.contrast??.9),1e-4)),o=n.bind(j(`clamp`,D(A(O(D(i,S(t.offset??0)),r),a),S(.5)),S(0),S(1)));return{color:j(`mix`,P(e.a??C(`#000000`)),P(e.b??C(`#ffffff`)),o),height:j(`mix`,r,i,o),mask:o}},brightnessContrast:(e,t)=>({color:D(D(k(O(e.in??C(`#808080`),S(.5)),S(t.contrast)),S(.5)),S(t.brightness))}),hsv:(e,t,n)=>(n.helper(`saturation`),n.helper(`hue`),{color:k({code:`prism_hue(prism_saturation(${P(e.in??C(`#808080`)).code}, ${x(t.sat)}), ${x(G(t.hue))})`,type:`vec3f`},S(t.val))}),hueShift:(e,t,n)=>(n.helper(`hue`),{color:{code:`prism_hue(${P(e.in??C(r.emerald)).code}, ${x(G(t.angle))})`,type:`vec3f`}}),posterize:(e,t)=>({color:A(M(`floor`,k(e.in??C(`#808080`),S(t.steps))),S(t.steps))}),luminance:(e,t)=>{let n={code:`dot(${P(e.in??C(`#808080`)).code}, ${I})`,type:`f32`};return{value:t.curve===`Linear`?n:j(`pow`,n,S(1/2.2))}},invert:e=>({color:O(S(1),e.in??C(`#000000`))}),levels:(e,t,n)=>{let r=j(`pow`,K(e.in??C(`#808080`),Number(t.inBlack),Number(t.inWhite),0,1,!0),S(1/Math.max(.001,Number(t.gamma)))),i=n.bind(K(r,0,1,Number(t.outBlack),Number(t.outWhite),!1));return{color:i,value:i.type===`f32`?i:{code:T(i,`f32`),type:`f32`}}},histogramScan:(e,t)=>{let n={code:`dot(${P(e.in??C(`#808080`)).code}, ${I})`,type:`f32`},r=Math.max(1-Number(t.contrast??.5),1e-4);return{value:j(`clamp`,A(O(n,S((1-Number(t.position??.5))*(r+1)-r)),S(r)),S(0),S(1))}},uv:()=>({uv:oe}),mapping:(e,t)=>{let n=G(t.rotate),r=B(e),i=D({code:`(mat2x2f(cos(${x(n)}), sin(${x(n)}), -sin(${x(n)}), cos(${x(n)})) * ${O(r,S(.5)).code})`,type:`vec2f`},S(.5)),a={code:`vec2f(${x(t.offsetX)}, ${x(t.offsetY)})`,type:`vec2f`};return{uv:D(k(i,S(t.scale)),a)}},directionalWarp:(e,t)=>{let n=G(t.angle??0),r=H(Math.cos(n),Math.sin(n));return{uv:D(B(e),k(r,e.amount?k(S(t.intensity),e.amount):S(t.intensity)))}},displacement:(e,t)=>({height:k(O(e.height??S(0),S(t.midlevel)),S(t.scale))}),separateRGB:(e,t,n)=>{let r=n.bind(P(e.in??C(`#000000`)));return{r:{code:`${r.code}.x`,type:`f32`},g:{code:`${r.code}.y`,type:`f32`},b:{code:`${r.code}.z`,type:`f32`}}},combineRGB:(e,t)=>{let n=n=>{let r=e[n]??S(t[n]);if(r.type!==`f32`)throw new w(`a entrada ${n.toUpperCase()} precisa ser um float`);return r.code};return{color:{code:`vec3f(${n(`r`)}, ${n(`g`)}, ${n(`b`)})`,type:`vec3f`}}},math:(e,t)=>{let n=e.a??S(t.a),r=e.b??S(t.b);switch(t.op){case`Add`:return{value:D(n,r)};case`Subtract`:return{value:O(n,r)};case`Power`:return{value:j(`pow`,n,r)};case`Min`:return{value:j(`min`,n,r)};case`Max`:return{value:j(`max`,n,r)};default:return{value:k(n,r)}}},clamp:(e,t)=>({value:j(`clamp`,e.in??S(0),S(t.min),S(t.max))}),remap:(e,t)=>({value:K(e.in??S(0),Number(t.inLow),Number(t.inHigh),Number(t.outLow),Number(t.outHigh),!1)}),step:(e,t)=>({value:j(`step`,S(t.edge),e.in??S(0))}),smoothstep:(e,t)=>({value:j(`smoothstep`,S(t.low),S(t.high),e.in??S(0))}),time:(e,t,n)=>{n.usesTime();let r=k({code:`u.time`,type:`f32`},S(t.speed));switch(t.mode){case`Saw`:return{value:M(`fract`,r)};case`Raw`:return{value:r};default:return{value:D(k(M(`sin`,k(D(r,S(.75)),S(Math.PI*2))),S(.5)),S(.5))}}},reroute:e=>({out:e.in??C(`#000000`)})},q=`depende da malha 3D (posição, normal ou câmera), que o quad 2D não tem`,J=`amostra vizinhos num render target (passo extra que o preview do Registry não tem)`,Y="geometria sai em CPU, e o `.exp` e o preview do Registry são só 2D",X=`depende de entrada ao vivo do app, que o preview do Registry não tem`,Z=`nó de partículas (VFX): o preview do Registry é um fragment 2D`,ce={pointer:X,camera:X,viewport:X,objectInfo:X,audioInput:X,primitive:Y,deform:Y,scatter:Y,instanceInfo:`lê o atributo de cada instância, que o quad 2D não tem`,geometryOutput:Y,data:`tabela numa textura: o preview do Registry só recebe resolution e time, sem texturas`,imageTexture:`textura de imagem: o preview do Registry só recebe resolution e time, sem texturas`,position:q,meshMap:q,fresnel:q,spectralDispersion:`depende da normal e da câmera da malha 3D e, na refração, do ambiente da cena`,normalMap:q,bump:q,sobelNormal:J,blur:J,heightAO:J,edgeWear:J,slopeBlur:J,particle:Z,emitter:Z,motion:Z,turbulence:Z,vortex:Z,attractor:Z,sizeOverLife:Z,colorOverLife:Z,fade:Z,sprite:Z,[a]:Z};[...Object.keys(se)];function le(e){let t=(e,t=[])=>({wgsl:null,animated:!1,errors:e,unsupported:t});if(s(e))return t([`O grafo contém um ciclo.`]);let n=e.nodes.find(e=>e.type===o);if(!n)return t([e.nodes.some(e=>e.type===`vfxOutput`)?`Só grafos de material exportam para o Registry: o preview dele é um fragment 2D, sem partículas.`:`Adicione um node Material Output.`]);let r=new Map(e.nodes.map(e=>[e.id,e])),i=new Map;for(let t of e.edges){let e=i.get(t.target)??[];e.push(t),i.set(t.target,e)}let a=new Set,c=(i.get(n.id)??[]).filter(e=>e.targetHandle===`color`).map(e=>e.source);for(;c.length;){let e=c.pop();if(!a.has(e)){a.add(e);for(let t of i.get(e)??[])c.push(t.source)}}let u=new Set,d=e=>{if(!u.has(e)){for(let t of L[e].deps??[])d(t);u.add(e)}},f=[],p=!1,m=0,h={helper:d,bind:e=>{let t=`v${m++}`;return f.push(`  let ${t} = ${e.code};`),{code:t,type:e.type}},usesTime:()=>{p=!0}},g=new Map,_=e=>{let t={};for(let n of i.get(e)??[]){let e=g.get(n.source);e&&(t[n.targetHandle]=e[n.sourceHandle])}return t},v=[],y=[];for(let t of l(e)){if(!a.has(t))continue;let e=r.get(t),n=_(t);if(e.muted){let e=Object.values(n).find(e=>e!==void 0);g.set(t,new Proxy({},{get:()=>e}));continue}let i=se[e.type];if(!i){v.push({nodeId:t,type:e.type,reason:ce[e.type]??`tipo de nó desconhecido`});continue}try{let r=i(n,e.params,h),a={};for(let[e,t]of Object.entries(r))a[e]=h.bind(t);g.set(t,a)}catch(n){n instanceof w?v.push({nodeId:t,type:e.type,reason:n.message}):y.push(`Erro em ${e.type}: ${n.message}`)}}if(v.length||y.length)return t(y,v);d(`linearToSrgb`);let ee=_(n.id).color??{code:`vec3f(0.5, 0.5, 0.5)`,type:`vec3f`};return{wgsl:[`// Expctral Prism Studio · Base Color do grafo (sem luz), fragment de quad fullscreen`,`struct U { resolution: vec2f, time: f32 };`,`@group(0) @binding(0) var<uniform> u: U;`,``,...Object.keys(L).filter(e=>u.has(e)).map(e=>L[e].code+`
`),`@fragment`,`fn ${re}(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {`,`  // uv do quad com v = 1 no topo, como uma imagem`,`  let uv = vec2f(fragCoord.x / u.resolution.x, 1.0 - fragCoord.y / u.resolution.y);`,...f,`  return vec4f(prism_linear_to_srgb(${T(ee,`vec3f`)}), 1.0);`,`}`,``].join(`
`),animated:p,errors:[],unsupported:[]}}var ue=`@vertex
fn vs_main(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  let p = array(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  return vec4f(p[i], 0.0, 1.0);
}`,de=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`);function fe(e,t){let n=e=>e.replace(/\\/g,`\\\\`).replace(/`/g,"\\`").replace(/\$\{/g,"\\${");return`<!doctype html>
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- Gerado pelo Expctral Prism Studio · projeto ${de(JSON.stringify(t.title))} · WGSL autocontido (2D) -->
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${de(t.title)} · WGSL</title>
<style>
  html, body { margin: 0; height: 100%; background: ${r.base}; color: ${r.textSecondary}; font: 14px system-ui, sans-serif; }
  canvas { display: block; width: 100vw; height: 100vh; }
  p { padding: 16px; }
</style>
</head>
<body>
<canvas id="prism"></canvas>
<script type="module">
// Base Color do grafo, sem luz. Precisa de WebGPU (Chrome/Edge 113+, Safari 26+).
const FRAGMENT = \`${n(e)}\`
const VERTEX = \`${n(ue)}\`
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
    fragment: { module, entryPoint: '${re}', targets: [{ format }] },
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
`}var Q=n(),pe=[{id:`three`,label:`Backend do three`,hint:`O shader que o WebGPURenderer gerou para o viewer`},{id:`wgsl`,label:`WGSL autocontido (2D)`,hint:`Base Color sem luz, para quad de tela cheia (mesmo do .exp)`}],me=[{id:`fragment`,label:`Fragment`},{id:`vertex`,label:`Vertex`}],$=`expctral`;function he(e){let t=u.getState().compiled,n=[[t?.material??void 0,`material do grafo`],[t?.vfx?.material,`partículas (VFX Output)`]];for(let[t,r]of n){if(!t)continue;let n=null;if(e.traverse(e=>{!n&&e.material===t&&(n=e)}),n)return{object:n,label:r}}return null}async function ge(){let e=d(),{scene:t,camera:n}=p;if(!e||!t||!n)return`O viewer 3D ainda não iniciou.`;let r=he(t);if(!r)return`Nenhum objeto do viewer usa o material do grafo agora (preview isolado de um nó, ou o grafo não compila).`;let{vertexShader:i,fragmentShader:a}=await e.debug.getShaderAsync(t,n,r.object),o=!!e.backend.isWebGPUBackend;return!i||!a?`O renderer não devolveu o código deste objeto.`:{lang:o?`WGSL`:`GLSL`,vertex:i,fragment:a,object:r.label}}function _e(){let[e,t]=(0,g.useState)(`three`);return(0,Q.jsxs)(`div`,{className:`shader-panel`,children:[(0,Q.jsx)(`div`,{className:`shader-panel__bar`,children:(0,Q.jsx)(h,{items:pe,value:e,onChange:t,label:`Origem do shader`})}),e===`three`?(0,Q.jsx)(ve,{}):(0,Q.jsx)(be,{})]})}function ve(){let e=u(e=>e.compiled),[t,n]=(0,g.useState)(`fragment`),[r,i]=(0,g.useState)(null),[a,o]=(0,g.useState)(`lendo o shader do viewer…`);(0,g.useEffect)(()=>{let e=!1,t=setTimeout(()=>{ge().then(t=>{e||(typeof t==`string`?(i(null),o(t)):(i(t),o(``)))}).catch(t=>!e&&o(`erro ao ler o shader: ${t.message}`))},150);return()=>{e=!0,clearTimeout(t)}},[e]);let s=r?r[t]:``,c=(0,g.useMemo)(()=>r?te(s,r.lang):[],[r,s]),l=r?.lang===`GLSL`?`glsl`:`wgsl`;return(0,Q.jsxs)(`div`,{className:`shader-panel__body`,children:[(0,Q.jsxs)(`div`,{className:`shader-panel__row`,children:[(0,Q.jsx)(h,{items:me,value:t,onChange:n,label:`Estágio do shader`}),r&&(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`span`,{className:`shader-panel__meta`,children:[r.lang,` · `,r.object,` · `,s.split(`
`).length,` linhas`]}),(0,Q.jsx)(f,{size:`sm`,onClick:()=>void navigator.clipboard.writeText(s),children:`Copiar`}),(0,Q.jsxs)(f,{size:`sm`,onClick:()=>m(s,`${$}.${t}.${l}`),children:[`Baixar .`,l]})]})]}),a&&(0,Q.jsx)(`p`,{className:`shader-panel__note`,children:a}),(0,Q.jsxs)(`ul`,{className:`shader-panel__limits`,children:[(0,Q.jsx)(`li`,{children:`O shader do three depende dos bindings e do layout internos dele: não roda fora do three.`}),(0,Q.jsx)(`li`,{children:`Compute e storage buffers só existem em WGSL.`}),(0,Q.jsx)(`li`,{children:`O GLSL só aparece com ?webgl na URL (ou num navegador sem WebGPU).`})]}),r&&(0,Q.jsx)(ye,{bindings:c}),r&&(0,Q.jsx)(`pre`,{className:`code-fallback shader-panel__code`,children:s})]})}function ye({bindings:e}){return e.length?(0,Q.jsxs)(`details`,{className:`shader-panel__bindings`,children:[(0,Q.jsxs)(`summary`,{children:[e.length,` binding`,e.length===1?``:`s`,` e uniforms (lidos do texto)`]}),(0,Q.jsx)(`ul`,{children:e.map((e,t)=>(0,Q.jsxs)(`li`,{children:[(0,Q.jsxs)(`code`,{children:[e.group===null?``:`@group(${e.group}) `,e.binding===null?``:`@binding(${e.binding}) `,e.kind,` `,e.name,`: `,e.type]}),e.fields.length>0&&(0,Q.jsx)(`span`,{className:`shader-panel__fields`,children:e.fields.map(e=>`${e.name}: ${e.type}`).join(` · `)})]},`${e.name}-${t}`))})]}):(0,Q.jsx)(`p`,{className:`shader-panel__note`,children:`Nenhum binding reconhecido neste estágio.`})}function be(){let{flat:e}=c(),{wgsl:t,animated:n,errors:r,unsupported:a}=(0,g.useMemo)(()=>le(e),[e]);return(0,Q.jsxs)(`div`,{className:`shader-panel__body`,children:[(0,Q.jsxs)(`p`,{className:`shader-panel__note`,children:[`Base Color do grafo, sem luz, num quad de tela cheia: `,`{ resolution, time }`,` em @group(0) @binding(0). É o mesmo WGSL do pacote .exp do Registry e roda sem o three.`]}),t?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`div`,{className:`shader-panel__row`,children:[(0,Q.jsxs)(`span`,{className:`shader-panel__meta`,children:[`WGSL · `,n?`animado (lê time)`:`estático`,` · `,t.split(`
`).length,` linhas`]}),(0,Q.jsx)(f,{size:`sm`,onClick:()=>void navigator.clipboard.writeText(t),children:`Copiar`}),(0,Q.jsx)(f,{size:`sm`,onClick:()=>m(t,`${$}.fragment.wgsl`),children:`Baixar .wgsl`}),(0,Q.jsx)(f,{size:`sm`,variant:`primary`,onClick:()=>m(fe(t,{title:$,animated:n}),`${$}-wgsl.html`,`text/html`),title:`Um .html sem dependências: cria o device, o pipeline e o quad`,children:`Exemplo mínimo .html`})]}),(0,Q.jsx)(`pre`,{className:`code-fallback shader-panel__code`,children:t})]}):(0,Q.jsxs)(`div`,{className:`shader-panel__refusal`,role:`status`,children:[(0,Q.jsx)(`strong`,{children:`Este grafo não sai em WGSL autocontido.`}),(0,Q.jsxs)(`ul`,{children:[r.map(e=>(0,Q.jsx)(`li`,{children:e},e)),a.map(e=>(0,Q.jsxs)(`li`,{children:[i(e.type)?.label??e.type,` (`,e.nodeId,`): `,e.reason]},e.nodeId))]})]})]})}export{_e as default};