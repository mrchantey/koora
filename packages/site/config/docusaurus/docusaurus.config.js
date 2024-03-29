// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

//@ts-ignore
const wasmScripts = require('./wasmScripts.json').scripts
// const root = process.cwd()
// const path = require('path');


/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Koora',
	tagline: 'AssemblyScript Game Framework',
	// url: 'https://mrchantey.github.io',
	url: 'https://koora.dev',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'mrchantey', // Usually your GitHub org/user name.
	projectName: 'koora', // Usually your repo name.
	deploymentBranch: 'gh-pages',
	trailingSlash: false,
	scripts: wasmScripts,
	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					// Please change this to your repo.
					editUrl: 'https://github.com/mrchantey/koora/tree/main/packages/site/',
				},
				blog: {
					showReadingTime: true,
					// Please change this to your repo.
					editUrl: 'https://github.com/mrchantey/koora/tree/main/packages/site/',
				},
				theme: {
					customCss: require.resolve('../../src/css/custom.css'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			//TODO
			metadata: [
				{ property: 'og:image', content: '/img/og-thumb.png' },
				{ property: 'og:image:type', content: 'image/png' },
				{ property: 'og:image:width', content: '1200' },
				{ property: 'og:image:height', content: '630' },			
			],
			colorMode: {
				respectPrefersColorScheme: true
			},
			navbar: {
				title: 'Koora',
				logo: {
					alt: 'Koora Logo',
					src: 'img/logo512.png',
				},
				items: [
					{
						label: 'Docs',
						type: 'doc',
						docId: 'index',
					},
					{
						label: 'Blog',
						to: '/blog',
					},
					// {
					// 	label: 'Examples',
					// 	to: '/examples',
					// },
					{
						href: 'https://github.com/mrchantey/koora',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			footer: {
				style: 'dark',
				links: [
					// {
					// 	// title: 'Community',
					// 	items: [
					// 		{
					// 			label: 'Assemblyscript Discord',
					// 			href: 'https://discordapp.com/invite/Assemblyscript',
					// 		},
					// 	],
					// },
				],
				copyright: `Copyright © ${new Date().getFullYear()} Koora`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
}

module.exports = config
