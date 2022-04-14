import { KooraLoader } from './loader/KooraLoader'
import './style.css'
const a: number = 2

// console.log('hello', a)

async function run(){
	const loader = await new KooraLoader().load()
	loader.start()
}

run()

