import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

interface FeatureInfo{
	title: string
	Svg: any
	description: JSX.Element
}

const FeatureList: FeatureInfo[] = [
	{
		title: 'Game On!',
		Svg: require('@site/static/img/playCircleIcon.svg').default,
		description: (<>The portability of the web with the predictability of AssemblyScript</>),
	},
	{
		title: 'Open Source',
		Svg: require('@site/static/img/openSourceIcon.svg').default,
		description: (<>All source under MIT License and available on <a href='https://github.com/mrchantey/koora'>GitHub</a></>),
	},
	{
		title: 'On The Edge',
		Svg: require('@site/static/img/flaskIcon.svg').default,
		description: (<>The exciting world of WebAssembly is in active development</>),
	},
]

function Feature({ Svg, title, description }: FeatureInfo) {
	return (
		<div className={clsx('col col--4')}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	)
}

export default function HomepageFeatures(): JSX.Element {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	)
}
