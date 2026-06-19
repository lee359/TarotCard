<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Noto+Serif+TC:wght@500;600;700&display=swap');

:root {
  color-scheme: dark;
  --ink: #f4eddb;
  --muted: #aaa6b6;
  --gold: #d4b36a;
  --gold-light: #f0d99c;
  --night: #090817;
  --violet: #17132e;
  --line: rgba(212, 179, 106, 0.28);
  font-family: 'DM Sans', 'Noto Serif TC', sans-serif;
  background: var(--night);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; overflow-x: clip; background: var(--night); color: var(--ink); }
button, input { font: inherit; }
button { color: inherit; }
::selection { background: var(--gold); color: var(--night); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
