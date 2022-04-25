import { getNextOffset, ProxyInfo } from './proxyInfo'




export const appendPrimitiveLayouts = (proxyInfo: ProxyInfo) => {
	
	const primitiveLayouts = proxyInfo.properties
		.filter(([_, type]) => !!proxyInfo.memoryLayoutMap[type])
		.map(([name, type]) => {
			const layout = proxyInfo.memoryLayoutMap[type]
			const offset = getNextOffset(proxyInfo, layout)
		
			const getStr = layout.primitive 
				? `get ${name}(): ${type}{ return load<${type}>(${offset}) }`
				: `get ${name}(): ${type}{ return changetype<${type}>(${offset}) }`
			const setStr = layout.primitive 
				? `set ${name}(value: ${type}){ store<${type}>(${offset}, value) }`
				: `set ${name}(value: ${type}){ memory.copy(${offset}, changetype<usize>(value), ${layout.size}) }`
			const str = `\t${getStr}\n\t${setStr}`
			return { name, type, layout, offset, str }
		})
	
	return `
\t//primitives
${primitiveLayouts.map(({ str }) => str).join('\n')}`
}