
const func = () => 1

module.exports = {
	// gl: ,
	host: {
		log: console.log.bind(console),
		log_f64: console.log.bind(console),
		elapsed: func,
		now: func,
		set: func,
		get: func,
		remove: func
	},
}