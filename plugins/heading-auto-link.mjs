import { visit } from 'unist-util-visit';
import GithubSlugger from 'github-slugger';
const slugger = new GithubSlugger();

const LinkSvgIcon = `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"></path></svg>`;

const createHeading = (slug, text, depth) => {
  const tag = `h${depth}`;

  return `<${tag} id="${slug}">${text} <a class="heading-link" href="#${slug}" title="${slug}">${LinkSvgIcon}</a></${tag}>`;
};

function headingAutoLinkRemarkPlugin() {
  return function (tree) {
    visit(tree, 'heading', (node) => {
      // dynamic names are skipped
      if (node.children && node.children[0] && node.children[0].type === 'mdxTextExpression') {
        return node;
      }

      let text = '';

      visit(node, 'text', (textNode) => {
        text = textNode.value;
      });

      const slug = slugger.slug(text);
      const { depth = 1 } = node || {};

      const headingHtml = createHeading(slug, text, depth);

      node.type = 'html';
      node.children = undefined;
      node.value = headingHtml;

      return node;
    });
  };
}

export default headingAutoLinkRemarkPlugin;
