import { MemoryLayout } from './MemoryLayout'
import { ClassFile, parseClass } from './parseClass'

export const makeProxyFromText = (text: string) =>
	makeProxy(parseClass(text))

export const makeProxy = (classFile: ClassFile) => {
	
	let totalPadding = 0
	let maxAlign = 0
	let align = 0
	const layouts = classFile.properties
		.map(([name, type]) => {
			const layout = MemoryLayout[type] as MemoryLayout
			if (!layout)
				throw new Error(`type not found: ${classFile.className}.${name} : ${type}`)
			if (layout.align !== 0)
				while (align % layout.align !== 0){
					align++
					totalPadding++
				}
			const offset = align
			align += layout.size
			if (layout.align > maxAlign)
				maxAlign = layout.align

			const getStr = layout.primitive 
				? `get ${name}(): ${type}{ return load<${type}>(changetype<usize>(this) + ${offset}) }`
				: `get ${name}(): ${type}{ return changetype<${type}>(changetype<usize>(this) + ${offset}) }`
			const setStr = layout.primitive 
				? `set ${name}(value: ${type}){ store<${type}>(changetype<usize>(this) + ${offset}, value) }`
				: `set ${name}(value: ${type}){ memory.copy(changetype<usize>(this) + ${offset}, changetype<usize>(value), ${layout.size}) }`
			const str = `\t${getStr}\n\t${setStr}`
			return { name, type, layout, offset, str }
		})
	const size = align
	let sizeAligned = size
	while (sizeAligned % maxAlign !== 0)
		sizeAligned++


	const classStr = `
${classFile.prefix}
export class ${classFile.className}Proxy {
\tget stride(): u32{ return ${sizeAligned} }
${layouts.map(({ str }) => str).join('\n')}

}
${classFile.suffix}
	`



	return classStr
}