import { visit } from 'unist-util-visit';

const createLink = (text, { title = null, url = '' }) => {
  return `<a href="${url}"
  ${title ? `title="${title}"` : ''} target="_blank">${text}</a>`;
};

function linkOpenInNewTabRemarkPlugin() {
  return function (tree) {
    visit(tree, 'link', (node) => {
      let text = '';

      visit(node, 'text', (textNode) => {
        text = textNode.value;
      });

      const linkHtml = createLink(text, { ...node });

      node.type = 'html';
      node.children = undefined;
      node.value = linkHtml;

      return node;
    });
  };
}

export default linkOpenInNewTabRemarkPlugin;
