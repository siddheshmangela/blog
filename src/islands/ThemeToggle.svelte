<script lang="ts">
  import { onMount } from 'svelte';

  const enum Theme {
    light = 'light',
    dark = 'dark',
  }

  const getInitialTheme = () =>
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';

  onMount(() => {
    const html = document.querySelector('html');
    const initialTheme = getInitialTheme();

    if (html && initialTheme) {
      if (initialTheme === Theme.dark) {
        html.classList.remove('theme--light');
        html.classList.add('theme--dark');
      } else {
        html.classList.remove('theme--dark');
        html.classList.add('theme--light');
      }
    }
  });

  let theme = getInitialTheme();

  const onThemeChange = () => {
    const newTheme = theme === Theme.dark ? Theme.light : Theme.dark;
    theme = newTheme;
    localStorage.setItem('theme', newTheme);

    const html = document.querySelector('html');

    if (html) {
      if (newTheme === Theme.dark) {
        html.classList.remove('theme--light');
        html.classList.add('theme--dark');
      } else {
        html.classList.remove('theme--dark');
        html.classList.add('theme--light');
      }
    }
  };
</script>

<button on:click={onThemeChange} title="Toggle theme">
  {#if theme === Theme.dark}
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      class="DayIcon"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  {:else}
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      class="NightIcon"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  {/if}
</button>

<style lang="scss">
  button {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
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
      right: 32px;
      width: 48px;
      height: 48px;
    }

    @media print {
      display: none;
    }
  }

  .DayIcon {
    width: 32px;
    height: 32px;
  }

  .NightIcon {
    width: 28px;
    height: 28px;
  }
</style>
