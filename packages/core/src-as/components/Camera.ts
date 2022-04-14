import { SpatialComponent } from '../base'
import { Matrix, TAU } from '../math'
import { Ubo, UniformName, Uniform_f32 } from '../rendering'
import { Viewport } from '../utility/Viewport'
import { WebGLUniformBufferObjectSystem } from '../WebGL2'

export class Camera extends SpatialComponent{

	viewport: Viewport
	view: Matrix
	projection: Matrix
	viewProjection: Matrix
	fillCanvas: bool = true
	private _fov: f32
	private _aspect: f32
	private _near: f32
	private _far: f32
	get fov(): f32{ return this._fov } set fov(val: f32){ this._fov = val; this._updatePerspective() }
	get aspect(): f32{ return this._aspect } set aspect(val: f32){ this._aspect = val; this._updatePerspective() }
	get nearClipPlane(): f32{ return this._near } set nearClipPlane(val: f32){ this._near = val; this._updatePerspective() }
	get farClipPlane(): f32{ return this._far } set farClipPlane(val: f32){ this._far = val; this._updatePerspective() }
	
	static fromProjectionMatrix(projectionMatrix: Matrix): Camera{
		const camera = new Camera()
		camera.projection = projectionMatrix
		//TODO calculate fov etc from matrix
		return camera
	}

	constructor(fov: f32 = TAU / 4, aspect: f32 = 16 / 9, near: f32 = 0.01, far: f32 = 1000){
		super()
		this._fov = fov; this._aspect = aspect; this._near = near; this._far = far
		this.view = new Matrix()
		this.viewport = new Viewport()
		this.projection = new Matrix()
		this.viewProjection = new Matrix()
		this._updatePerspective()
	}

	setFillCanvas(fillCanvas: bool): Camera{
		this.fillCanvas = fillCanvas
		return this
	}

	setViewport(x: u32, y: u32, width: u32, height: u32, aspect: f32 = <f32>width / <f32>height): Camera{
		this.viewport.x = x
		this.viewport.y = y
		this.viewport.width = width
		this.viewport.height = height
		this.aspect = aspect
		//TODO update projection matrix etc
		return this
	}
	
	_updatePerspective(): Camera{
		this.projection.perspective(this._fov, this._aspect, this._near, this._far)
		return this
	}

	update(): void{
		this.view.invert(this.transform.worldMatrix)
		Matrix.multiply(this.viewProjection, this.projection, this.view)
	}


	applyUbo(): void{
		(Ubo.camera.uniformMap.get(UniformName.View) as Uniform_f32).value = this.view.m;
		(Ubo.camera.uniformMap.get(UniformName.Projection) as Uniform_f32).value = this.projection.m;
		(Ubo.camera.uniformMap.get(UniformName.ViewProjection) as Uniform_f32).value = this.viewProjection.m;
		(Ubo.camera.uniformMap.get(UniformName.CameraModel) as Uniform_f32).value = this.transform.worldMatrix.m
	}
}