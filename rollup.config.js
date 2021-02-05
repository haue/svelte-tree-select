import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import sveltePreprocess from 'svelte-preprocess';

const pkg = require('./package.json');

export default {
	input: 'src/index.svelte',
	output: [
		{ file: pkg.module, 'format': 'es' },
		{ file: pkg.main, 'format': 'umd', name: 'svelte-tree-select' }
	],
	plugins: [
		svelte({
			compilerOptions: {
				dev: false,
				css: true
			},
			emitCss: false,
			preprocess: sveltePreprocess({
				postcss: {
					plugins: [require('tailwindcss'), require('autoprefixer')],
				},
			}),
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		terser()
	],
};
