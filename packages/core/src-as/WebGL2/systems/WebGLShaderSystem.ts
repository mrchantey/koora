import { host } from '../../imports'
import { Shader } from '../../rendering'
import { stringOrEmpty } from '../../utility/stringUtils'
import { WebGLShader } from '../components'
import { gl } from '../imports'




export class WebGLShaderSystem{
	validate: bool = true
	shaderMap: Map<Shader, WebGLShader> = new Map()

	getOrCreate(shader: Shader): WebGLShader{
		if (this.shaderMap.has(shader))
			return this.shaderMap.get(shader)
		const instance = this.create(shader)
		this.shaderMap.set(shader, instance)
		return instance
	}
	
	compileShader(src: string, type: gl.ShaderType): gl.WebGLProgram{
		const shader = gl.createShader(type)
		gl.shaderSource(shader, src)
		gl.compileShader(shader)
		
		if (!gl.getShaderParameter__1(shader, gl.ShaderStatus.COMPILE_STATUS)){
			gl.deleteShader(shader)
			throw new Error('Error compiling shader : ' + src + '\n' + stringOrEmpty(gl.getShaderInfoLog(shader)))
		}
		return shader
	}
	create(shader: Shader): WebGLShader{
		const vShader = this.compileShader(shader.vert, gl.ShaderType.VERTEX_SHADER)
		const fShader = this.compileShader(shader.frag, gl.ShaderType.FRAGMENT_SHADER)
		const program = gl.createProgram()
		gl.attachShader(program, vShader)
		gl.attachShader(program, fShader)
	

		const useFeedback = shader.varyings.length > 0
		if (useFeedback)
			gl.transformFeedbackVaryings(program, shader.varyings, gl.TransformFeedback.SEPARATE_ATTRIBS)
	
		gl.linkProgram(program)
	
		if (!gl.getProgramParameter__1(program, gl.ShaderStatus.LINK_STATUS)){
			gl.deleteProgram(program)
			throw new Error('Error creating shader program.\n' + stringOrEmpty(gl.getProgramInfoLog(program)))
		}
	
		if (this.validate){
			gl.validateProgram(program)
			if (!gl.getProgramParameter__1(program, gl.ShaderStatus.VALIDATE_STATUS)){
				gl.deleteProgram(program)
				throw new Error('Error validating program\n' + stringOrEmpty(gl.getProgramInfoLog(program)))
			}
		}

		// is this nessecary?
		gl.detachShader(program, vShader) 
		gl.detachShader(program, fShader)
		gl.deleteShader(fShader)
		gl.deleteShader(vShader)

		const programId = host.set(program)

		return {
			programId,
			useFeedback
		}
	}
}