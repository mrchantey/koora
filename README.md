# koora

AssemblyScript Game Framework

visit [koora.dev](https://koora.dev)

**NOTE: This project is not in active development**

## Packages

- `./packages/ecs`
  - No-Dependency ECS Architecture
- `./packages/core`
  - Koora Core
  - WebGL
- `./packages/site`
  - Documentation
  - Blog
  - Examples

## Repo Guide

There are quite a few steps to getting up and running, but the end result is hot reloading across both wasm and web.

### Up and running - Core

To get up and running:
1. Terminal 1: `npm run watch-as -w packages/core`
   - This watches the `src-as` directory for changes
2. Terminal 2: `npm run watch-src -w packages/core`
   - This starts webpack in watch mode, watching the `src` directory
4. Terminal 3: `npm run start -w packages/core`
   - This starts `live-server`, watching the build directory
5. Visit `http://127.0.0.1:8080/?ktest`
	- The query parameter just starts some debug stuff to check all is working

### Up and running - Site

To get site up and running
1. Terminal 1: `npm run watch-build -w packages/core`
	- this will update the sites build whenever the core build changes
2. Terminal 2: `npm run start -w packages/site`
	- start docusaurus

### Up and running - Testing

To test ecs proxy generator:
1. `npm run make-proxies-test -w packages/ecs`

Unit tests
1. `npm run test -w packages/testing`

## TODO
- Material UBOs
- Sparse Set ECS
- SDF fonts
- Simple collision
