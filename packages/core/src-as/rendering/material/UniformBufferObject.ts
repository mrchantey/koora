import { Uniform } from './Uniform'


export class UniformBufferObject{

	name: string
	block: string
	dynamic: bool = true
	uniformArr: Uniform[] = []
	uniformMap: Map<string, Uniform> = new Map()

	constructor(name: string, block: string, uniforms: Uniform[]){
		this.name = name
		this.block = block
		this.uniformArr = uniforms
		for (let i = 0; i < this.uniformArr.length; i++){
			this.uniformMap.set(this.uniformArr[i].name, this.uniformArr[i])
		}
	}

	// apply(): void{
	// imports.ubo.apply(this)
	// }
}