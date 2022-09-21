import { createSignal, onMount } from 'solid-js';
import styles from './ThemeToggle.module.scss';

const DayIcon = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class={styles.DayIcon}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    ></path>
  </svg>
);

const NightIcon = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    class={styles.NightIcon}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    ></path>
  </svg>
);

const ThemeToggle = () => {
  const [theme, setTheme] = createSignal(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );

  onMount(() => {
    const initialTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
    const body = document.querySelector('body');

    body.dataset.theme = initialTheme;
  });

  const changeTheme = () => {
    const newTheme = theme() === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    const body = document.querySelector('body');

    body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button onClick={changeTheme} class={styles.ThemeToggle}>
      <Show when={theme() === 'dark'} fallback={<DayIcon />}>
        <NightIcon />
      </Show>
    </button>
  );
};

export default ThemeToggle;
