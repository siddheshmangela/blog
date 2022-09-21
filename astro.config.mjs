import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.siddheshmangela.com',
  integrations: [mdx(), sitemap(), image(), solidJs()],
  vite: {
    ssr: {
      external: ['svgo']
    }
  }
});