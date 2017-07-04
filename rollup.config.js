import svelte from 'rollup-plugin-svelte'

export default {
	entry: './src/index.js',
	sourceMap: true,
	plugins: [ svelte() ],
	targets: [
		{ dest: './dist/index.cjs.js', format: 'cjs' },
		{ dest: './dist/index.es.js', format: 'es' },
	],
}
