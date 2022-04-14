
export class Shader{
	vert: string
	frag: string
	varyings: string[]
	static new(vert: string, frag: string, varyings: string[] = []): Shader{
		return new Shader(vert, frag, varyings)
	}
	constructor(vert: string, frag: string, varyings: string[] = []){
		this.vert = vert
		this.frag = frag
		this.varyings = varyings
	}
}
