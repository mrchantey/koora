import { getNextOffset, ProxyInfo } from './proxyInfo'





export const appendReferenceLayouts = (proxyInfo: ProxyInfo) => {

	const referenceLayouts = proxyInfo.properties
		.filter(([_, type]) => !proxyInfo.memoryLayoutMap[type])
		.map(([name, type]) => {
			const layout = proxyInfo.memoryLayoutMap[proxyInfo.usize]
			const offset = getNextOffset(proxyInfo, layout)
			const refKeeperName = `${name}RefKeeper`
			const mapStr = `\tstatic ${refKeeperName}: Map<u32, ${type}> = new Map()`
			const getter = `\tget ${name}(): ${type}{ return changetype<${type}>(load<usize>(${offset})) }`
			const setter = `\tset ${name}(val: ${type}){ store<usize>(${offset}, changetype<usize>(val)) }`
			const valueStr = [mapStr, getter, setter].join('\n')

			const instantiate = (type.includes('[') || type.includes('Array'))
				? `instantiate<${type}>(0)`//0 element array
				: `changetype<${type}>(0)`//null
			const onCreateStr = 
`\t\tconst ${name} = ${instantiate}
\t\t${proxyInfo.proxyName}.${refKeeperName}.set(eid, ${name})
\t\tproxy.${name} = ${name}
`

			const onRemoveStr = 
`\t\t${proxyInfo.proxyName}.${refKeeperName}.delete(eid)
\t\tproxy.${name} = changetype<T>(0)
`

			return { valueStr, onCreateStr, onRemoveStr }
		})

	return referenceLayouts.length === 0 ? '' : `
\t//references
${referenceLayouts.map(str => str.valueStr).join('\n')}

\t//handle create
\tstatic handleCreate(proxy: ${proxyInfo.proxyName}, eid: u32): void{
${referenceLayouts.map(str => str.onCreateStr).join('\n')}
\t}

\t//handle remove
\tstatic handleRemove(proxy: ${proxyInfo.proxyName}, eid: u32): void{
${referenceLayouts.map(str => str.onRemoveStr).join('\n')}
\t}	
`
}