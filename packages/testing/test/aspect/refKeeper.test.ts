

type T = StaticArray<u8>
class MyComponent{	
	static size: u32 = sizeof<usize>()
	
	static myPropRefKeeper: (T | null)[] = []

	get myProp(): T{ return changetype<T>(load<usize>(changetype<usize>(this))) }
	set myProp(val: T){ store<usize>(changetype<usize>(this), changetype<usize>(val)) }

	static handleAdd(comp: MyComponent, eid: u32): void{
		const val = instantiate<T>(0)
		MyComponent.myPropRefKeeper[eid] = val
		comp.myProp = val
	}
	static handleRemove(comp: MyComponent, eid: u32): void{
		MyComponent.myPropRefKeeper[eid] = null
		comp.myProp = changetype<T>(0)
	}
}



describe('ref keeper', () => {

	test('values', () => {
		const myComponent = changetype<MyComponent>(heap.alloc(MyComponent.size))
		const arr = new StaticArray<u8>(4)
		
		arr[0] = 1		
		arr[1] = 2
		arr[2] = 3
		arr[3] = 4
		
		myComponent.myProp = arr
		expect(myComponent.myProp[0]).toBe(1)
		expect(myComponent.myProp[1]).toBe(2)
		expect(myComponent.myProp.length).toBe(4)
	})
	
	test('handleAdd', () => {
		const myComponent = changetype<MyComponent>(heap.alloc(MyComponent.size))
		MyComponent.handleAdd(myComponent, 0)
		expect(myComponent.myProp.length).toBe(0)
	})
})
