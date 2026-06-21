<script setup lang="ts">
useSeoMeta({
  title: '關於作者｜月之秘語',
  description: '認識月之秘語的作者，並前往作者的個人網站。',
  ogTitle: '關於作者｜月之秘語',
  ogDescription: '認識月之秘語的作者，並前往作者的個人網站。',
  ogType: 'profile',
  ogImage: '/images/author-profile.png'
})
</script>

<template>
  <main class="author-page">
    <nav class="nav animate__animated animate__fadeInDown" aria-label="主要導覽">
      <NuxtLink class="brand" to="/" aria-label="月之秘語首頁">
        <span class="brand-mark">☾</span>
        <span>月之秘語<small>LUNA ARCANA</small></span>
      </NuxtLink>
      <div class="nav-actions">
        <NuxtLink class="nav-link" to="/">回到占卜</NuxtLink>
        <NuxtLink class="nav-link" to="/about">關於占卜</NuxtLink>
      </div>
    </nav>

    <section class="author-layout">
      <div class="author-content animate__animated animate__fadeInLeft">
        <p class="eyebrow"><span /> MEET THE CREATOR</p>
        <h1>關於作者</h1>
        <p class="author-name">
          <strong>李東恩</strong>
          <span>LI, DONG-EN</span>
        </p>
        <ul class="author-facts" aria-label="作者資料">
          <li><span aria-hidden="true">🏫</span>中原大學 電機工程學系</li>
          <li><span aria-hidden="true">📍</span>Taiwan</li>
          <li><span aria-hidden="true">🎓</span>2022 – 在學</li>
        </ul>
        <p class="lead">從創作與設計出發，打造一個能安靜聆聽內心的塔羅空間。</p>
        <a
          class="website-link"
          href="https://web-project-seven-lyart.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>前往個人網站</span>
          <small>web-project-seven-lyart.vercel.app</small>
        </a>
      </div>

      <figure class="author-visual animate__animated animate__fadeInRight">
        <img src="/images/author-profile.png" alt="作者主視覺">
        <figcaption>THE CREATOR BEHIND LUNA ARCANA</figcaption>
      </figure>
    </section>
  </main>
</template>

<style scoped>
.author-page {
  position: relative; display: grid; min-height: 100dvh; overflow: hidden; isolation: isolate;
  grid-template-rows: clamp(64px, 9vh, 78px) minmax(0, 1fr); background: #090817; color: var(--ink);
}
.author-page::before {
  content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: .5;
  background-image: radial-gradient(circle, rgba(240,217,156,.75) 0 1px, transparent 1.5px), radial-gradient(circle, rgba(143,119,184,.45) 0 1px, transparent 1.5px);
  background-position: 5% 12%, 74% 20%; background-size: 150px 150px, 220px 220px;
}
.nav {
  position: relative; z-index: 2; display: flex; width: min(1080px, calc(100% - 48px));
  height: 100%; margin: 0 auto; align-items: center; justify-content: space-between;
}
.brand { display: flex; align-items: center; gap: 12px; color: var(--ink); font-family: 'Noto Serif TC', serif; font-size: 16px; letter-spacing: .14em; text-decoration: none; }
.brand-mark { display: grid; width: 37px; height: 37px; place-items: center; border: 1px solid var(--gold); border-radius: 50%; color: var(--gold-light); font: 22px Georgia, serif; }
.brand small { display: block; margin-top: 3px; color: var(--gold); font-family: 'DM Sans', sans-serif; font-size: 7px; letter-spacing: .26em; }
.nav-actions { display: flex; align-items: center; gap: 24px; }
.nav-link { color: var(--muted); font-size: 12px; letter-spacing: .15em; text-decoration: none; }
.nav-link:hover { color: var(--gold-light); }
.author-layout {
  display: grid; width: min(1080px, calc(100% - 48px)); min-height: 0; margin: 0 auto;
  padding: clamp(28px, 5vh, 54px) 0 clamp(48px, 7vh, 70px); grid-template-columns: minmax(0, 1fr) minmax(300px, 410px);
  gap: clamp(54px, 9vw, 120px); align-items: center;
}
.author-content {
  width: min(480px, 100%); animation-delay: .12s;
}
.eyebrow { display: flex; align-items: center; gap: 12px; margin: 0; color: var(--gold); font-size: 9px; letter-spacing: .3em; }
.eyebrow span { width: 34px; height: 1px; background: var(--gold); }
h1 { margin: 18px 0 0; font-family: 'Noto Serif TC', serif; font-size: clamp(42px, 5vw, 64px); font-weight: 600; letter-spacing: .08em; line-height: 1.15; }
.author-name { display: flex; margin: 20px 0 0; align-items: baseline; gap: 14px; flex-wrap: wrap; }
.author-name strong { color: var(--ink); font-family: 'Noto Serif TC', serif; font-size: 24px; font-weight: 600; letter-spacing: .1em; }
.author-name span { color: var(--gold); font-family: 'DM Sans', sans-serif; font-size: 12px; letter-spacing: .14em; }
.author-facts { display: grid; margin: 18px 0 0; padding: 0; gap: 9px; list-style: none; }
.author-facts li { display: flex; align-items: center; gap: 10px; color: #c9c3d0; font-size: 13px; letter-spacing: .04em; }
.author-facts li > span { display: inline-grid; width: 22px; place-items: center; }
.lead { margin: 16px 0 0; color: #e1dce5; font-family: 'Noto Serif TC', serif; font-size: 14px; line-height: 1.9; }
.website-link {
  display: inline-flex; min-width: 270px; margin-top: 28px; padding: 13px 18px;
  align-items: flex-start; justify-content: center; flex-direction: column; border: 1px solid var(--gold);
  background: rgba(9, 8, 23, .82); color: var(--gold-light); text-decoration: none;
  transition: background .25s ease, color .25s ease, transform .25s ease;
}
.website-link span { font-size: 13px; letter-spacing: .14em; }
.website-link small { margin-top: 5px; color: var(--muted); font-size: 9px; letter-spacing: .04em; }
.website-link:hover { background: var(--gold); color: #151129; transform: translateY(-2px); text-shadow: none; }
.website-link:hover small { color: #352c28; }
.website-link:focus-visible { outline: 2px solid var(--gold-light); outline-offset: 3px; }
.author-visual { position: relative; width: 100%; margin: 0; animation-delay: .18s; }
.author-visual::before { content: ''; position: absolute; inset: -10px; z-index: -1; border: 1px solid rgba(212,179,106,.35); }
.author-visual img { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: center; border: 1px solid var(--gold); }
.author-visual figcaption { margin-top: 13px; color: var(--gold); font-size: 8px; letter-spacing: .22em; text-align: right; }
@media (max-width: 760px) {
  .author-page { height: auto; overflow-x: hidden; overflow-y: auto; }
  .nav { width: calc(100% - 32px); align-items: flex-start; padding-top: 16px; }
  .nav-actions { align-items: flex-end; flex-direction: column; gap: 8px; }
  .nav-link { font-size: 10px; }
  .author-layout { width: calc(100% - 40px); padding: 48px 0 70px; grid-template-columns: 1fr; gap: 42px; }
  .author-content { width: 100%; text-align: center; }
  .eyebrow { justify-content: center; }
  .author-name { justify-content: center; }
  .author-facts { width: fit-content; margin-right: auto; margin-left: auto; text-align: left; }
  .lead { max-width: 420px; margin-right: auto; margin-left: auto; }
  .website-link { align-items: center; min-width: min(270px, 100%); }
  .author-visual { width: min(82vw, 390px); justify-self: center; grid-row: 1; }
  .author-content { grid-row: 2; }
}
</style>
