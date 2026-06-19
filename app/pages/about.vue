<script setup lang="ts">
useSeoMeta({
  title: '關於占卜｜月之秘語',
  description: '了解月之秘語的塔羅占卜定位：塔羅不是預言，而是協助你與自己對話的象徵工具。',
  ogTitle: '關於占卜｜月之秘語',
  ogDescription: '塔羅不是替你決定答案，而是讓你更靠近自己的感受與選擇。',
  ogType: 'website'
})
</script>

<template>
  <main class="about-page">
    <nav class="nav animate__animated animate__fadeInDown" aria-label="主要導覽">
      <NuxtLink class="brand" to="/" aria-label="月之秘語首頁">
        <span class="brand-mark">☾</span>
        <span>月之秘語<small>LUNA ARCANA</small></span>
      </NuxtLink>
      <NuxtLink class="nav-link" to="/">回到占卜</NuxtLink>
    </nav>

    <section class="about-hero animate__animated animate__fadeIn">
      <p class="eyebrow"><span /> A GENTLE REMINDER <span /></p>
      <h1>塔羅不是預言，是與自己對話的方式</h1>
      <p class="lead">牌卡提供的是象徵與視角，不替你做決定。請把最終選擇留在自己手中，也讓現實中的專業建議成為你的支持。</p>

      <div class="principles animate__animated animate__fadeInUp">
        <article>
          <b>01</b>
          <h2>保持開放</h2>
          <p>帶著好奇心看待牌面，讓不同角度補足你原本沒有注意到的線索。</p>
        </article>
        <article>
          <b>02</b>
          <h2>誠實感受</h2>
          <p>真正重要的，往往是你讀到訊息時心裡升起的反應與情緒。</p>
        </article>
        <article>
          <b>03</b>
          <h2>自主選擇</h2>
          <p>塔羅可以陪你整理問題，但人生的方向仍由你親手決定。</p>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 50% 24%, rgba(86, 64, 129, .35), transparent 30%),
    radial-gradient(circle at 12% 16%, rgba(212, 179, 106, .1), transparent 25%),
    #090817;
  color: var(--ink);
  overflow: hidden;
}

.about-page::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: .45;
  background-image: radial-gradient(circle, rgba(240, 217, 156, .8) 0 1px, transparent 1.5px);
  background-size: 170px 170px;
  mask-image: linear-gradient(to bottom, black, transparent 85%);
}

.nav {
  position: relative;
  z-index: 1;
  display: flex;
  width: min(1160px, calc(100% - 48px));
  margin: auto;
  padding: 28px 0;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ink);
  font-family: 'Noto Serif TC', serif;
  font-size: 16px;
  letter-spacing: .14em;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 37px;
  height: 37px;
  place-items: center;
  border: 1px solid var(--gold);
  border-radius: 50%;
  color: var(--gold-light);
  font-family: Georgia, serif;
  font-size: 22px;
}

.brand small {
  display: block;
  margin-top: 3px;
  color: var(--gold);
  font-family: 'DM Sans', sans-serif;
  font-size: 7px;
  letter-spacing: .26em;
}

.nav-link {
  color: var(--muted);
  font-size: 12px;
  letter-spacing: .15em;
  text-decoration: none;
}

.nav-link:hover {
  color: var(--gold-light);
}

.about-hero {
  position: relative;
  z-index: 1;
  width: min(980px, calc(100% - 40px));
  margin: auto;
  padding: 90px 0 120px;
  text-align: center;
}

.eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
  color: var(--gold);
  font-size: 9px;
  letter-spacing: .32em;
}

.eyebrow span {
  width: 34px;
  height: 1px;
  background: var(--gold);
  opacity: .5;
}

h1,
h2 {
  margin: 0;
  font-family: 'Noto Serif TC', serif;
  font-weight: 600;
}

h1 {
  max-width: 760px;
  margin: 20px auto 0;
  font-size: clamp(34px, 5vw, 58px);
  line-height: 1.35;
  letter-spacing: .08em;
}

.lead {
  max-width: 720px;
  margin: 24px auto 0;
  color: var(--muted);
  font-family: 'Noto Serif TC', serif;
  font-size: 15px;
  line-height: 2.1;
  letter-spacing: .05em;
}

.principles {
  display: grid;
  margin: 62px auto 42px;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  animation-delay: .2s;
}

.principles article {
  min-height: 220px;
  padding: 30px 26px;
  border: 1px solid var(--line);
  background: linear-gradient(150deg, rgba(35, 28, 64, .72), rgba(13, 11, 30, .78));
  text-align: left;
  box-shadow: 0 18px 55px rgba(0, 0, 0, .2);
}

.principles b {
  color: var(--gold);
  font-size: 11px;
  letter-spacing: .2em;
}

.principles h2 {
  margin-top: 24px;
  color: var(--ink);
  font-size: 22px;
  letter-spacing: .12em;
}

.principles p {
  margin: 16px 0 0;
  color: #c7c1cf;
  font-size: 14px;
  line-height: 1.9;
}

.primary-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 52px;
  min-width: 245px;
  padding: 15px 22px;
  border: 1px solid var(--gold);
  background: var(--gold);
  color: #151129;
  text-decoration: none;
  letter-spacing: .14em;
  transition: .25s ease;
  animation-delay: .35s;
}

.primary-link:hover {
  background: var(--gold-light);
  box-shadow: 0 0 30px rgba(212, 179, 106, .2);
  transform: translateY(-2px);
}

@media (max-width: 760px) {
  .nav {
    width: calc(100% - 32px);
    padding-top: 20px;
  }

  .about-hero {
    padding: 64px 0 88px;
  }

  h1 {
    letter-spacing: .04em;
  }

  .principles {
    grid-template-columns: 1fr;
  }
}
</style>
