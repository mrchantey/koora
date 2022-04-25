

const myImports = require('./imports')

module.exports = {
	/**
   * A set of globs passed to the glob package that qualify typescript files for testing.
   */
	include: ['test/aspect/**/*.test.ts'],
	/**
   * A set of globs passed to the glob package that quality files to be added to each test.
   */
	add: ['test/aspect/**/*.include.ts'],
	/**
   * All the compiler flags needed for this test suite. Make sure that a binary file is output.
   */
	flags: {
		/** To output a wat file, uncomment the following line. */
		// "--textFile": ["output.wat"],
		/** A runtime must be provided here. */
		'--runtime': ['incremental'], // Acceptable values are: "incremental", "minimal", and "stub"
	},
	/**
   * A set of regexp that will disclude source files from testing.
   */
	disclude: [/node_modules/],
	/**
   * Add your required AssemblyScript imports here.
   */
	imports(memory, createImports, instantiateSync, binary) {
		let instance = undefined // Imports can reference this
		instance = instantiateSync(binary, createImports(myImports))
		return instance
	},
	/** Enable code coverage. */
	// coverage: ['src-asc/**/*.ts'],
	/**
   * Specify if the binary wasm file should be written to the file system.
   */
	outputBinary: false,
}
