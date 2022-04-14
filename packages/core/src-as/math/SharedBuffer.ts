import { Vector1 } from './Vector1'
import { Vector3 } from './Vector3'



export class SharedBuffer_f32<T>{
	arr: Float32Array
	instances: T[] = []
	stride: u16
	get strideBytes(): u16 { return this.stride * <u16>Float32Array.BYTES_PER_ELEMENT }
	constructor(stride: u16){
		this.stride = stride
		this.arr = new Float32Array(0)
	}

	add(): T{
		const instance = instantiate<T>()
		this.instances.push(instance)
		this.resizeArray()
		return instance
	}
	resizeArray(): void{
		const newArray = new Float32Array(this.instances.length * this.stride)
		for (let i = 0; i < this.arr.length; i++){
			newArray[i] = this.arr[i]
		}
		this.arr = newArray
		this.updateInstanceBuffers()
	}
	updateInstanceBuffers(): void{
		for (let i = 0; i < this.instances.length; i++){
			//@ts-ignore
			this.instances[i].m = Float32Array.wrap(this.arr.buffer, this.strideBytes * i, this.stride)
		}
	}
}

export class SharedBufferVector1 extends SharedBuffer_f32<Vector1>{
	constructor(){ super(1) }}
export class SharedBufferVector3 extends SharedBuffer_f32<Vector3>{
	constructor(){ super(3) }}