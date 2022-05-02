
export type EID = u32
export type CID = u32



export function allocateProxy <T>(): T{
	//@ts-ignore always has stride
	const stride = changetype<T>(0).stride
	return changetype<T>(heap.alloc(stride))
}