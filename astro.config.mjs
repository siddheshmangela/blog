import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import svelte from '@astrojs/svelte';
import headingAutoLinkRemarkPlugin from './plugins/heading-auto-link.mjs';
import linkOpenInNewTabRemarkPlugin from './plugins/link-open-in-new-tab.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.siddheshmangela.com',
  integrations: [
    mdx({
      remarkPlugins: [headingAutoLinkRemarkPlugin, linkOpenInNewTabRemarkPlugin],
    }),
    sitemap(),
    image(),
    svelte(),
  ],
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
