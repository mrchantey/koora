# koora
AssemblyScript Game Framework

visit [koora.dev](https://koora.dev)

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

Things are a little clunky at the moment, I was using as-pect but it is currently incompatible with AssemblyScript. 

To get up and running:
1. Terminal 1: `npm run watch-as -w packages/core`
   - This watches the `src-as` directory for changes
2. Terminal 2: `npm run watch-src -w packages/core`
   - This starts webpack in watch mode, watching the `src` directory
3. Terminal 3: `npm run start -w packages/core`
   - This starts `live-server`, watching the build directory
4. Visit `http://127.0.0.1:8080/?ktest`
	- The query parameter just starts some debug stuff to check all is working

FAQ
- Why not use `webpack-dev-server`?
  - its faster to not recompile the js when there is a change to the as

## TODO
- Material UBOs
- Sparse Set ECS
- SDF fonts
- Simple collision
