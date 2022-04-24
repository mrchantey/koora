import { makeProxy, makeProxyFromText, parseClass } from 'packages/ecs/src'

const defaultProps = ['f32', 'Vector3']

const demoComponent = (props: string[] = defaultProps) =>
	`
import {Vector2,Vector3} from '../bla'

export class MyClass {
${props.map((type, index) => `\tval${index}:${type}`).join('\n')}
}
poo poo
`

describe('makeComponents', () => {
	
	beforeEach(() => {
		
	})

	test('parse class', () => {
		const classFile = parseClass(demoComponent())
		expect(classFile.properties.length).toBe(2)
	})
	test('make proxy - missing type', () => {
		expect(() => makeProxyFromText(demoComponent(['f128']))).toThrow()
	})
	test('make proxy - missing type', () => {
		const classFile = parseClass(demoComponent())
		const classProxy = makeProxy(classFile)
		// console.dir(demoComponent(['f32', 'f32']))
		// console.dir(classProxy)
	})
})