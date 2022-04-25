import { defaultMemoryLayoutMap, MemoryLayout, MemoryLayoutMap } from './MemoryLayout'
import { ClassFile } from './parseClass'

export interface ProxyInfo extends ClassFile{
	usize: string
	proxyName: string
	totalPadding: number
	maxAlign: number
	align: number
	memoryLayoutMap: MemoryLayoutMap
}

export const makeProxyInfo = (classFile: ClassFile): ProxyInfo => ({
	...classFile,
	usize: 'u32',
	proxyName: classFile.className + 'Proxy',
	totalPadding: 0,
	maxAlign: 0,
	align: 0,
	memoryLayoutMap: defaultMemoryLayoutMap()
})

export const getNextOffset = (proxyInfo: ProxyInfo, layout: MemoryLayout) => {
	if (layout.align !== 0)
		while (proxyInfo.align % layout.align !== 0){
			proxyInfo.align++
			proxyInfo.totalPadding++
		}
	const offset = proxyInfo.align
	proxyInfo.align += layout.size
	if (layout.align > proxyInfo.maxAlign)
		proxyInfo.maxAlign = layout.align
	return `changetype<usize>(this) + ${offset}`
}