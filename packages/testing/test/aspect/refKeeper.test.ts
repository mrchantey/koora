

type T = Array<u8>
class MyComponent{	
	static size: u32 = sizeof<usize>()
	
	static myPropRefKeeper: Map<u32, T> = new Map()

	get myProp(): T{ return changetype<T>(load<usize>(changetype<usize>(this))) }
	set myProp(val: T){ store<usize>(changetype<usize>(this), changetype<usize>(val)) }

	static handleAdd(comp: MyComponent, eid: u32): void{
		const val = instantiate<T>(0)
		MyComponent.myPropRefKeeper.set(eid, val)
		comp.myProp = val
	}
	static handleRemove(comp: MyComponent, eid: u32): void{
		MyComponent.myPropRefKeeper.delete(eid)
		comp.myProp = changetype<T>(0)
	}
}



describe('ref keeper', () => {

	test('values', () => {
		const myComponent = changetype<MyComponent>(heap.alloc(MyComponent.size))
		const arr = new Array<u8>(4)
		
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
		const eid = 0
		MyComponent.handleAdd(myComponent, eid)
		expect(MyComponent.myPropRefKeeper.get(eid)).toBe(myComponent.myProp)
		myComponent.myProp[1] = 99
		expect(myComponent.myProp.length).toBe(2)
		expect(myComponent.myProp[1]).toBe(99)
		MyComponent.handleRemove(myComponent, eid)
		expect(MyComponent.myPropRefKeeper.has(eid)).toBe(false)
	})
})
