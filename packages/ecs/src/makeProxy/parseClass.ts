
export interface ClassFile{
	prefix: string
	className: string
	properties: [string, string]
	suffix: string
}

export const parseClass = (file: string): ClassFile => {
	const prefixLines = file.split('\n')
		
	const middleLines = prefixLines.splice(prefixLines.indexOf(
		prefixLines.find(line => line.includes('class'))))
	//target syntax: export class MyClass {
	const className = middleLines.shift().split('class')[1].trim().split(' ')[0].replaceAll('{', '')
		
	const suffixLines = middleLines.splice(middleLines.indexOf(
		middleLines.find(line => line.includes('}'))))
	suffixLines.shift()

	const properties = middleLines
		.map(line => line.trim())
		.filter(line => line.length > 0)
		.map(line => line.split(':').map(token => token.trim())) as any as [string, string]
		
	return {
		prefix: prefixLines.join('\n'),
		className,
		properties,
		suffix: suffixLines.join('\n')
	}
}