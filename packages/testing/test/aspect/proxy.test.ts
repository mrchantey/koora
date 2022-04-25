import { CTimeProxy, CTransformProxy, allocateProxy, Transform } from './import'


describe('proxy', () => {
	
	beforeEach(() => {
		
	})

	test('simple proxy', () => {
		const proxy = allocateProxy<CTimeProxy>()
		proxy.start = 10
		expect(proxy.start).toBe(10)
		log(proxy)
	})
	
	test('reference proxy', () => {
		const eid = 0
		const proxy = allocateProxy<CTransformProxy>()
		CTransformProxy.handleCreate(proxy, eid)
		expect(proxy.parent).toBe(null)
		const parent = new Transform()
		//TODO update ref keeper on set
		//this should fail
		proxy.parent = parent
		const storedParent = CTransformProxy.parentRefKeeper.get(eid)
		expect(proxy.parent).not.toBe(null)
		if (storedParent)
			expect(parent).toBe(storedParent)
		else
			throw new Error('stored parent shouldnt be nuull')
		// if (storedParent)
		// expect()
		// log(proxy.parent)
		
	})
})