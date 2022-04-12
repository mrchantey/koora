---
sidebar_position: 1
---

# The spinning cube!

Lets have a look at how to create a spinning cube! To get up and running quickly we can use the `defaultWorld` function, which will take care of the camera, lights and systems required for rendering.

```ts
const world = defaultWorld()
const cube = world.createEntity()
	.attach(new Mesh(CubeGeometry.default,new Material(litShader)))
```

Now we have what looks like a square, lets create a `Rotator` class and add it to our cube.
```ts
class Rotator extends BehaviorComponent{
	update(){
		const deltaTime = this.world.get<Time>().delta
		this.transform.rotation.x += 0.01 * deltaTime
	}
}
cube.add<Rotator>()
```

:::info
`entity.add<Rotator>()` is the same as `entity.attach(new Rotator())`

Under the hood the component is simply instantiated with no arguments in the constructor.
:::