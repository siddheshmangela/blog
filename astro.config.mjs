import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import solidJs from "@astrojs/solid-js";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.siddheshmangela.com',
  integrations: [mdx(), sitemap(), image(), solidJs(), svelte()],
  vite: {
    ssr: {
      external: ['svgo']
    }
  }
});