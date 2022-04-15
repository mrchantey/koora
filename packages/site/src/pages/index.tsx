import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import { Canvas } from '../components'

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext()
	return (
		<header className={clsx('hero hero--primary', styles.heroBanner)}>
			<div className="container">
				<h1 className="hero__title">{siteConfig.title}</h1>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				<div className={styles.buttons}>
					<Link
						className="button button--primary button--lg"
						to="/docs">
						Docs
					</Link>
					<Link
						className="button button--secondary button--lg"
						to="/blog">
						Blog
					</Link>
				</div>
			</div>
		</header>
	)
}

export default function Home() {
	const { siteConfig } = useDocusaurusContext()
	return (
		<Layout
			title={`Welcome to ${siteConfig.title}`}
			// title={`${siteConfig.title}`}
			description="AssemblyScript Game Framework">
			<div className={styles.canvasContainer}>
				<Canvas className={styles.canvas}/>
				<HomepageHeader />
				<main>
					<HomepageFeatures />
				</main>
			</div>
		</Layout>
	)
}
