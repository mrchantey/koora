---
sidebar_position: 1
---

# Introduction

Koora enables the creation of 3D games with AssemblyScript.

:::info Is Koora for me?
These are extremely early days for this library. If you're motivations are to actually produce a web-based game, chances are battle-hardened libraries like [three](https://threejs.org) and [babylon](https://babylonjs.com) will run circles around Koora in every way.

Otherwise, if you are interested in experimenting with game dev in AssemblyScript, read on intrepid adventurer! 🥳
:::
## Overview

The framework prioritizes modularity through an entity-component style architecture:

```ts

const world = new World()
	.addSystem<TransformSystem>()
	.addSystem<HealthSystem>()
	.addSystem<InputSystem>()

const player = world.createEntity()
	.add<Transform>()
	.add<Health>()
	.add<Camera>()
	.add<KeyboardController>()

const enemy = world.createEntity()
	.add<Transform>()
	.add<Health>()
	.add<AIController>()
```

:::info
Koora uses terminology like `Entity`, `Component` and `System`, but it does **not** use a strict ECS Architecture. Instead components can be accessed directly from entities, and they can also contain behaviors.
:::
