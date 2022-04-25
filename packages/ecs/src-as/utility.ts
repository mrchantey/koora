

export function allocateProxy <T>(): T{
	//@ts-ignore
	const stride = changetype<T>(0).stride
	return changetype<T>(heap.alloc(stride))
}