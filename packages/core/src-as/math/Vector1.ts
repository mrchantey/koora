







export class Vector1Base<T1, T2>{
	m: T1
	//@ts-ignore
	get value(): T2{ return this.m[0] }
	//@ts-ignore
	set value(value: T2){ this.m[0] = value }
	
	constructor(m: T1 = instantiate<T1>(1)){
		this.m = m
	}
	set(value: T2): Vector1Base<T1, T2>{
		this.value = value
		return this
	}
}
export class Vector1 extends Vector1Base<Float32Array, f32>{}