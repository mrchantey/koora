import { MemoryLayout } from './MemoryLayout'
import { ClassFile, parseClass } from './parseClass'
import { appendPrimitiveLayouts } from './primitiveLayouts'
import { makeProxyInfo } from './proxyInfo'
import { appendReferenceLayouts } from './referenceLayouts'


const USIZE = 'u32'

export const makeProxyFromText = (text: string, parentBaseName: string) =>
	makeProxy(parseClass(text), parentBaseName)


export const makeProxy = (classFile: ClassFile, parentBaseName: string) => {
	
	const proxyInfo = makeProxyInfo(classFile)

	const primitiveLayoutStr = appendPrimitiveLayouts(proxyInfo)
	const referenceLayoutStr = appendReferenceLayouts(proxyInfo)

	const size = proxyInfo.align
	let sizeAligned = size
	while (sizeAligned % proxyInfo.maxAlign !== 0)
		sizeAligned++

	const classStr = 
`/* --- AUTO-GENERATED - Do not edit directly --- */
import { ${classFile.className} } from '../${parentBaseName}'
${classFile.prefix}
export class ${classFile.className}Proxy {
\tget stride(): u32{ return ${sizeAligned} }
${primitiveLayoutStr}
${referenceLayoutStr}
}
${classFile.suffix}
`



	return classStr
}