import svelte from 'rollup-plugin-svelte';

export default {
	input: './src/index.js',
	external: name => /^[@a-z]/.test(name),
	plugins: [svelte()],
	output: [
		{ file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true },
		{ file: 'dist/index.es.js', format: 'esm', sourcemap: true },
	],
};
