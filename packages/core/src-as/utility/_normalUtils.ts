import { Vector3 } from '../math'

export function normalsFromTriangles(positions: Float32Array, indices: Uint16Array, normals: Float32Array): void{

	const vec1 = new Vector3()
		, vec2 = new Vector3()
		, vec3 = new Vector3()
		, right = new Vector3()
		, up = new Vector3()
		, fwd = new Vector3()

	//https://www.khronos.org/opengl/wiki/Calculating_a_Surface_Normal
	for (let i = 0; i < indices.length; i += 3){
		const vi1 = indices[i] * 3
		const vi2 = indices[i + 1] * 3
		const vi3 = indices[i + 2] * 3
		vec1.set(positions[vi1], positions[vi1 + 1], positions[vi1 + 2])
		vec2.set(positions[vi2], positions[vi2 + 1], positions[vi2 + 2])
		vec3.set(positions[vi3], positions[vi3 + 1], positions[vi3 + 2])
	
		Vector3.sub(vec2, vec1, right)
		Vector3.sub(vec3, vec1, up)
		Vector3.crossNormalized(right, up, fwd)
	
		normals[vi1] = fwd.x
		normals[vi1 + 1] = fwd.y
		normals[vi1 + 2] = fwd.z
	
		normals[vi2] = fwd.x
		normals[vi2 + 1] = fwd.y
		normals[vi2 + 2] = fwd.z
	
		normals[vi3] = fwd.x
		normals[vi3 + 1] = fwd.y
		normals[vi3 + 2] = fwd.z
	}		
}