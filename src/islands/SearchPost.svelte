<script lang="ts">
  interface Post {
    frontmatter: {
      title: string;
      description: string;
      pubDate: string;
    };
    id: string;
  }

  let showSearch = false;
  let searchText = '';
  let posts: Post[] = [];

  const fetchPosts = async () => {
    if (posts.length) {
      return;
    }

    const response = await fetch('/posts.json');
    const postsData = await response.json();

    posts = [...postsData];
  };

  const onOpen = () => {
    const isDesktop = window.matchMedia('(min-width: 1100px)');
    showSearch = true;

    const body = document.querySelector('body');

    if (body) {
      body.style.overflow = 'hidden';

      if (isDesktop) {
        body.style.paddingRight = '17px';
      }
    }
  };

  const onClose = () => {
    showSearch = false;
    posts = [];
    searchText = '';
    const body = document.querySelector('body');

    if (body) {
      body.style.overflow = 'initial';
      body.style.paddingRight = '0';
    }
  };

  $: postsFiltered = searchText
    ? posts.filter(
        (p) =>
          p &&
          p.frontmatter &&
          p.frontmatter.title.trim().toLowerCase().includes(searchText.trim().toLowerCase())
      )
    : [];
</script>

<button on:click={onOpen} title="Activate search">
  <svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
</button>

{#if showSearch}
  <div class="search-dialog">
    <div class="modal" on:click={onClose} />
    <div class="search-box" role="dialog" aria-label="Search box">
      <div class="search-input">
        <input
          type="search"
          placeholder="🔎 Search post.."
          bind:value={searchText}
          on:input={fetchPosts}
          tabindex="0"
        />
      </div>

      <ul class="search-result">
        {#if postsFiltered.length}
          {#each postsFiltered as post}
            <li>
              <a href={`/${post.id}`} id={post.id} tabindex="0">
                <div class="title">{post.frontmatter.title}</div>
                <time datetime={post.frontmatter.pubDate}>
                  {new Date(post.frontmatter.pubDate).toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </a>
            </li>
          {/each}
        {:else if posts.length}
          <li class="nope">No result found</li>
        {:else if searchText}
          <li class="nope">Searching...</li>
        {/if}
      </ul>
    </div>
  </div>
{/if}

<style lang="scss">
  button {
    position: absolute;
    top: 16px;
    right: 64px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 200;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    background-color: transparent;
    color: inherit;
    cursor: pointer;

    @media (min-width: 1100px) {
      position: fixed;
      top: 32px;
      right: 90px;
      width: 48px;
      height: 48px;
    }

    @media print {
      display: none;
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .search-dialog {
    display: flex;
    z-index: 300;
    position: fixed;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: flex-start;
    color: inherit;

    .modal {
      background-color: var(--color-bg-modal);
      display: flex;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .search-box {
    z-index: 300;
    box-shadow: var(--shadow-elevation-medium);
    width: calc(100% - 32px);
    background-color: var(--color-bg-main);
    max-height: 90vh;
    border-radius: 10px;
    margin-top: 2vh;
    overflow: hidden;

    @media (min-width: 1100px) {
      max-width: 650px;
      margin-top: 150px;
    }

    .search-input {
      display: flex;
      padding: 16px;
    }

    input {
      border: none;
      outline: none;
      margin: 0;
      padding: 0;
      display: block;
      border-radius: 6px;
      height: 56px;
      padding: 16px;
      width: 100%;
      background-color: var(--color-bg-dark);
      font-size: 1.1rem;
      color: inherit;
    }

    .search-result {
      margin: 0;
      padding: 0;
      max-height: 360px;
      display: block;
      overflow-x: auto;

      li {
        display: block;

        font-size: 1.1rem;

        &.nope {
          padding: 10px 16px;
        }

        a {
          color: inherit;
          font-weight: bold;
          padding: 10px 16px;
          display: block;
          cursor: pointer;
          width: 100%;
          text-decoration: none;
          &:hover {
            background-color: var(--color-bg-dark);
          }

          &:focus {
            background-color: var(--color-bg-dark);
          }
        }

        time {
          font-style: italic;
          font-size: 1rem;
          font-weight: normal;
        }
      }
    }
  }
</style>
