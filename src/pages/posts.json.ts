import type { APIRoute } from 'astro';

interface ResolvedPost {
  frontmatter: {
    title?: string;
    description?: string;
    pubDate?: string;
  };
}

export const get: APIRoute = async function get() {
  try {
    const allPostFiles = await import.meta.glob('./*.mdx');
    const iterablePostFiles = Object.entries(allPostFiles);

    const allPosts = await Promise.all(
      iterablePostFiles.map(async ([path, resolver]) => {
        const resolvedPost = (await resolver()) as ResolvedPost;
        const { frontmatter } = resolvedPost;
        const { title = '', description = '', pubDate = '' } = frontmatter;
        const postPath = path.slice(2, -4);

        return {
          id: postPath,
          frontmatter: {
            title,
            description,
            pubDate,
          },
        };
      })
    );

    const sortedPosts = allPosts.sort((a, b) => {
      return new Date(b.frontmatter.pubDate).valueOf() - new Date(a.frontmatter.pubDate).valueOf();
    });

    return { body: JSON.stringify(sortedPosts) };
  } catch (error) {
    throw new Error('Something went wrong in json-resource.json route!');
  }
};
