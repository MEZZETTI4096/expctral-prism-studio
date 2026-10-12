# Expctral Prism Studio — build publicado

Editor visual de shaders TSL / WebGPU do ecossistema **Expctral**.

**Online:** https://mezzetti4096.github.io/expctral-prism-studio/

Este repositório contém só o **build estático** servido pelo GitHub Pages.
- `/` página inicial · `/editor` ORBIT WORKSPACE (grafo + viewer WebGPU, fallback WebGL2) · `/archives`
- Projetos ficam salvos no próprio navegador (IndexedDB); nada é enviado a servidor.
- WebGPU exige navegador compatível (Chrome/Edge 113+); sem ele, o viewer usa WebGL2.
