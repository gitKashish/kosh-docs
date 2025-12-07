// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import gruvbox from 'starlight-theme-gruvbox';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			plugins: [
				gruvbox(),
			],
			title: 'Kosh Docs',
			logo: {
				dark: './src/assets/kosh_mono_light.svg',
				light: './src/assets/kosh_mono.svg',
				replacesTitle: true,
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/gitKashish/kosh' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Installation', slug: 'guides/installation' },
						{ label: 'Getting Started', slug: 'guides/getting-started' },
						{ label: 'Add Your First Credential', slug: 'guides/add-credential'},
						{ label: 'Retrieve A Credential', slug: 'guides/retrieve-credential'},
						{ label: 'Manage Your Credentials', slug: 'guides/manage-credentials'}
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Technical Documentation',
					items: [
						{ label: 'Encryption Architecture', slug: 'technical/encryption' },
						{ label: 'Adaptive Search Algorithm', slug: 'technical/adaptive-search' },
					]
				}
			],
		}),
	],
});
