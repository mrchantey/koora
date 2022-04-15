---
sidebar_position: 1
---

# Introduction

Koora enables the creation of 3D games with AssemblyScript.

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
