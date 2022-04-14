


export const autoBind = (obj: any) => {
	for (const field in obj){
		if (typeof obj[field] === 'function')
			obj[field] = obj[field].bind(obj)
	}
}


export const applyGLOverloads = (gl: WebGL2RenderingContext) => {
	const glOverloads = [
		['compressedTexImage3D', 2],
		['compressedTexSubImage3D', 2],
		['getActiveUniformBlockParameter', 2],
		['getActiveUniforms', 2],
		['texImage3D', 4],
		['texSubImage3D', 3],
		['bufferData', 7],
		['bufferSubData', 2],
		['compressedTexImage2D', 2],
		['compressedTexSubImage2D', 2],
		['readPixels', 3],
		['texImage2D', 5],
		['texSubImage2D', 5],
		['getBufferParameter', 2],
		['getProgramParameter', 2],
		['getShaderParameter', 2],
	]
	glOverloads.forEach(([key, count]) => {
		for (let i = 0; i < count; i++)
			gl[`${key}__${i + 1}`] = gl[key]
	})
}