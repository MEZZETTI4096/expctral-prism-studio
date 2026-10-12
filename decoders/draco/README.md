# Draco 3D Data Compression

Draco is an open-source library for compressing and decompressing 3D geometric meshes and point clouds. It is intended to improve the storage and transmission of 3D graphics.

[Website](https://google.github.io/draco/) | [GitHub](https://github.com/google/draco)

## Contents

This folder contains the **glTF** variant only (`gltf/`), built for the [glTF mesh compression extension](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression). It is the one loaded by `src/core/paint/io.ts` (`setDecoderPath('/decoders/draco/gltf/')`); the default variant was removed because nothing used it.

* `gltf/draco_decoder.js` — Emscripten-compiled decoder, compatible with any modern browser.
* `gltf/draco_decoder.wasm` — WebAssembly decoder, compatible with newer browsers and devices.
* `gltf/draco_wasm_wrapper.js` — JavaScript wrapper for the WASM decoder.

Either variation may be used with `DRACOLoader`:

```js
var dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('path/to/decoders/');
```

Further [documentation on GitHub](https://github.com/google/draco/tree/master/javascript/example#static-loading-javascript-decoder).

## License

[Apache License 2.0](https://github.com/google/draco/blob/master/LICENSE)
