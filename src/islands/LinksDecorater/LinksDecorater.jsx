import { onMount } from 'solid-js';

const LinksDecorater = () => {
  onMount(() => {
    const main = document.querySelector('main');
    const article = main.querySelector('article');
    const anchors = article.querySelectorAll('a');
    const headingTags = article.querySelectorAll('h1, h2, h3, h4, h5, h6');

    anchors.forEach((a) => {
      a.target = '_blank';
    });

    headingTags.forEach((h) => {
      const headingId = h.getAttribute('id');

      if (headingId) {
        const anchor = document.createElement('a');

        anchor.classList.add('heading-link');
        anchor.setAttribute('href', `#${headingId}`);
        anchor.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>`;

        h.appendChild(anchor);
      }
    });
  });

  return <></>;
};

export default LinksDecorater;
