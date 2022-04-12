import { Configuration } from 'webpack'

export interface iWebpackConfig extends Configuration {
    devServer: any
}

interface ArgsBase {
    app: string|false
    entry: string
    html: string
    favicon: string | false
    out: string
    title: string
    description: string
    prod: boolean
    analyzeBundle: boolean
    analyzeCircular: boolean
    https: boolean
	host: string
}

export type DirtyArgs = Partial<ArgsBase>


export interface CleanArgs extends ArgsBase {
	entryPath: string
	templatePath: string
	outputPath: string
	faviconPath: string
}