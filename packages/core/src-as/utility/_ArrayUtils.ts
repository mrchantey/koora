
export function fill<T>(arr: StaticArray<T>, values: T[]): StaticArray<T>{
	for (let i = 0; i < arr.length; i += values.length){
		for (let j = 0; j < values.length; j++) {
			arr[i + j] = values[j]
		}
	}
	return arr
}

export function flatMapStatic<T>(arr: StaticArray<StaticArray<T>>): StaticArray<T>{
	if (arr.length === 0)
		return new StaticArray<T>(0)
	const nestedLen = arr[0].length
	const out = new StaticArray<T>(arr.length * nestedLen)
	for (let i = 0; i < arr.length; i++){
		for (let j = 0; j < nestedLen; j++) {
			const k = i * nestedLen + j
			out[k] = arr[i][j]
		}
	}
	return out
}
export function flatMap<T>(arr: Array<Array<T>>): StaticArray<T>{
	if (arr.length === 0)
		return new StaticArray<T>(0)
	const nestedLen = arr[0].length
	const out = new StaticArray<T>(arr.length * nestedLen)
	for (let i = 0; i < arr.length; i++){
		for (let j = 0; j < nestedLen; j++) {
			const k = i * nestedLen + j
			out[k] = arr[i][j]
		}
	}
	return out
}
export function jaggedFlatMap<T>(arr: StaticArray<StaticArray<T>>): Array<T>{
	const out = new Array<T>()
	for (let i = 0; i < arr.length; i++){
		for (let j = 0; j < arr[i].length; j++) {
			out.push(arr[i][j])
		}
	}
	return out
}

export function copy<T>(target: T, other: T): T{
	//@ts-ignore
	for (let i = 0; i < target.length; i++){
		//@ts-ignore
		target[i] = other[i]
	}
	return target
}

export function arrayToStatic<T>(a: T[]): StaticArray<T>{
	const b = new StaticArray<T>(a.length)
	for (let i = 0; i < a.length; i++){
		b[i] = a[i]
	}
	return b
}

export function arrayToTyped<T1, T2>(a: T1[]): T2{
	const b = instantiate<T2>(a.length)
	for (let i = 0; i < a.length; i++){
		//@ts-ignore
		b[i] = a[i]
	}
	return b
}


export function toTyped_u8(a: StaticArray<u8>): Uint8Array{
	const b = new Uint8Array(a.length)
	for (let i = 0; i < a.length; i++){
		b[i] = a[i]
	}
	return b
}
export function toTyped_u16(a: StaticArray<u16>): Uint16Array{
	const b = new Uint16Array(a.length)
	for (let i = 0; i < a.length; i++){
		b[i] = a[i]
	}
	return b
}
export function toTyped_u32(a: StaticArray<u32>): Uint32Array{
	const b = new Uint32Array(a.length)
	for (let i = 0; i < a.length; i++){
		b[i] = a[i]
	}
	return b
}
export function toTyped_i32(a: StaticArray<i32>): Int32Array{
	const b = new Int32Array(a.length)
	for (let i = 0; i < a.length; i++){
		b[i] = a[i]
	}
	return b
}
export function toTyped_f32(a: StaticArray<f32>): Float32Array{
	const b = new Float32Array(a.length)
	for (let i = 0; i < a.length; i++){
		b[i] = a[i]
	}
	return b
}


export function toString<T>(arr: T | null, nextLine: u32 = 1): string{
	let str = ''
	if (arr === null)
		return str
	//@ts-ignore
	for (let i = 0; i < arr.length; i++){
		if (i % nextLine === 0)
			str += '\n'
		//@ts-ignore
		str += `${arr[i]}, `
	}
	return str
}