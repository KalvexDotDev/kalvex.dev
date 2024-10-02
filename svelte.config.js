import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Preprocessors
	preprocess: vitePreprocess(), // Handles SCSS, TypeScript, etc.

	kit: {
		// Define the adapter for your environment. Adapter-auto will choose the best one, but you can change it based on your needs.
		adapter: adapter(),
		
		// Path aliases
		alias: {
			$lib: resolve('./src/lib'),
			$components: resolve('./src/components'),
			$utils: resolve('./src/utils'),
			$stores: resolve('./src/stores') // Example for stores if you use Svelte stores
		},


	}
};

export default config;