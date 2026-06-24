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
      <MysticBackground />
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

      <div class="crystal-ball-scene animate__animated animate__fadeInUp" aria-hidden="true">
        <div class="crystal-ball-float">
          <span class="crystal-glow" />
          <div class="crystal-sphere">
            <span class="crystal-mist crystal-mist-one" />
            <span class="crystal-mist crystal-mist-two" />
            <span class="crystal-star crystal-star-one">✦</span>
            <span class="crystal-star crystal-star-two">·</span>
            <span class="crystal-star crystal-star-three">✧</span>
            <span class="crystal-shine" />
          </div>
          <span class="crystal-collar" />
          <span class="crystal-base" />
        </div>
        <span class="crystal-shadow" />
      </div>
    </section>

    <footer>
      <p>願你在每一次提問裡，更靠近真實的自己。</p>
      <small>© {{ new Date().getFullYear() }} LUNA ARCANA · 僅供自我探索與娛樂</small>
    </footer>
  </main>
</template>

<style scoped>
.about-page {
  --edge-height: clamp(50px, 7vh, 64px);
  --content-top-gap: clamp(34px, 5vh, 52px);
  --content-bottom-gap: clamp(70px, 10vh, 104px);
  display: grid;
  height: 100dvh;
  grid-template-rows: var(--edge-height) minmax(0, 1fr) var(--edge-height);
  background:
    radial-gradient(circle at 50% 24%, rgba(86, 64, 129, .35), transparent 30%),
    radial-gradient(circle at 12% 16%, rgba(212, 179, 106, .1), transparent 25%),
    #090817;
  color: var(--ink);
  overflow: clip;
}

.about-page::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 50% 40%, rgba(83, 58, 129, .16), transparent 50%),
    linear-gradient(125deg, transparent 25%, rgba(212, 179, 106, .025), transparent 76%);
}

.nav {
  position: relative;
  z-index: 1;
  display: flex;
  width: min(1080px, calc(100% - 48px));
  height: var(--edge-height);
  margin: 0 auto;
  padding: 0;
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
  isolation: isolate;
  display: grid;
  width: min(1040px, calc(100% - 40px));
  height: 100%;
  margin: 0 auto;
  padding: var(--content-top-gap) 0 var(--content-bottom-gap);
  grid-template-rows: auto auto;
  align-content: start;
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
  max-width: min(1100px, 100%);
  margin: clamp(12px, 2vh, 18px) auto 0;
  font-size: clamp(30px, 3.9vw, 46px);
  line-height: 1.24;
  letter-spacing: .055em;
  white-space: nowrap;
}

.lead {
  max-width: min(1100px, 100%);
  margin: clamp(10px, 1.8vh, 16px) auto 0;
  color: var(--muted);
  font-family: 'Noto Serif TC', serif;
  font-size: clamp(13px, 1.15vw, 15px);
  line-height: 1.65;
  letter-spacing: .025em;
  white-space: nowrap;
}

.principles {
  display: grid;
  width: 100%;
  margin: clamp(28px, 5vh, 44px) auto 0;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(16px, 2vw, 24px);
  animation-delay: .2s;
}

.principles article {
  min-height: clamp(138px, 19vh, 168px);
  padding: clamp(16px, 2.6vh, 22px) 24px;
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
  margin-top: clamp(12px, 2vh, 18px);
  color: var(--ink);
  font-size: 22px;
  letter-spacing: .12em;
}

.principles p {
  margin: clamp(10px, 1.8vh, 14px) 0 0;
  color: #c7c1cf;
  font-size: 14px;
  line-height: 1.9;
}

.crystal-ball-scene {
  position: absolute;
  bottom: clamp(8px, 1.8vh, 18px);
  left: 50%;
  width: 132px;
  height: 116px;
  margin-left: -66px;
  pointer-events: none;
  animation-delay: .45s;
}

.crystal-ball-float {
  position: absolute;
  inset: 0;
  animation: crystal-float 6s ease-in-out infinite;
}

.crystal-glow {
  position: absolute;
  top: 3px;
  left: 50%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(171, 132, 232, .28), rgba(97, 68, 151, .1) 50%, transparent 72%);
  filter: blur(5px);
  transform: translateX(-50%);
  animation: crystal-breathe 6s ease-in-out infinite;
}

.crystal-sphere {
  position: absolute;
  top: 4px;
  left: 50%;
  width: 76px;
  height: 76px;
  overflow: hidden;
  border: 1px solid rgba(231, 214, 255, .7);
  border-radius: 50%;
  background:
    radial-gradient(circle at 36% 28%, rgba(255, 255, 255, .36), transparent 12%),
    radial-gradient(circle at 52% 62%, rgba(105, 67, 166, .68), rgba(38, 27, 78, .58) 52%, rgba(13, 11, 30, .78) 78%);
  box-shadow:
    inset -10px -12px 22px rgba(8, 6, 26, .55),
    inset 8px 7px 18px rgba(224, 205, 255, .12),
    0 0 24px rgba(143, 101, 207, .22);
  transform: translateX(-50%);
}

.crystal-sphere::after {
  content: '';
  position: absolute;
  inset: 5px;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 50%;
}

.crystal-mist {
  position: absolute;
  width: 62px;
  height: 24px;
  border-radius: 50%;
  background: rgba(190, 158, 232, .2);
  filter: blur(6px);
  animation: crystal-mist 9s linear infinite;
}

.crystal-mist-one { top: 23px; left: -17px; transform: rotate(15deg); }
.crystal-mist-two { right: -24px; bottom: 12px; animation-direction: reverse; animation-delay: -4s; }

.crystal-star {
  position: absolute;
  color: rgba(244, 223, 165, .9);
  font-family: Georgia, serif;
  line-height: 1;
  text-shadow: 0 0 7px rgba(244, 223, 165, .72);
  animation: crystal-twinkle 3.2s ease-in-out infinite;
}

.crystal-star-one { top: 19px; left: 26px; font-size: 10px; }
.crystal-star-two { top: 35px; right: 20px; font-size: 17px; animation-delay: -1.1s; }
.crystal-star-three { bottom: 18px; left: 21px; font-size: 8px; animation-delay: -2.2s; }

.crystal-shine {
  position: absolute;
  top: 10px;
  left: 15px;
  width: 17px;
  height: 8px;
  border-top: 2px solid rgba(255, 255, 255, .62);
  border-radius: 50%;
  transform: rotate(-42deg);
}

.crystal-collar {
  position: absolute;
  top: 73px;
  left: 50%;
  z-index: -1;
  width: 52px;
  height: 13px;
  border: 1px solid rgba(212, 179, 106, .64);
  border-radius: 50%;
  background: linear-gradient(180deg, #342845, #171329);
  box-shadow: inset 0 2px 4px rgba(244, 218, 158, .14);
  transform: translateX(-50%);
}

.crystal-base {
  position: absolute;
  top: 80px;
  left: 50%;
  z-index: -2;
  width: 64px;
  height: 24px;
  border: 1px solid rgba(212, 179, 106, .52);
  border-radius: 8px 8px 50% 50%;
  background: linear-gradient(155deg, #332744, #110e22 70%);
  box-shadow: 0 8px 16px rgba(0, 0, 0, .28);
  transform: translateX(-50%);
}

.crystal-shadow {
  position: absolute;
  bottom: 1px;
  left: 50%;
  width: 78px;
  height: 12px;
  border-radius: 50%;
  background: rgba(0, 0, 0, .38);
  filter: blur(4px);
  transform: translateX(-50%);
  animation: crystal-shadow 6s ease-in-out infinite;
}

@keyframes crystal-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-9px); }
}

@keyframes crystal-breathe {
  0%, 100% { opacity: .65; transform: translateX(-50%) scale(.94); }
  50% { opacity: 1; transform: translateX(-50%) scale(1.08); }
}

@keyframes crystal-mist {
  from { transform: translateX(-15px) rotate(10deg); }
  to { transform: translateX(72px) rotate(25deg); }
}

@keyframes crystal-twinkle {
  0%, 100% { opacity: .32; transform: scale(.72); }
  50% { opacity: 1; transform: scale(1.16); }
}

@keyframes crystal-shadow {
  0%, 100% { opacity: .68; transform: translateX(-50%) scaleX(1); }
  50% { opacity: .38; transform: translateX(-50%) scaleX(.78); }
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

footer {
  position: relative;
  z-index: 1;
  display: grid;
  width: min(1080px, calc(100% - 48px));
  height: var(--edge-height);
  margin: 0 auto;
  padding: 0;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  align-items: center;
  border-top: 1px solid rgba(212, 179, 106, .1);
  color: #6f6b7b;
  font-size: 10px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  font-family: 'Noto Serif TC', serif;
  font-size: 12px;
  letter-spacing: .12em;
  text-decoration: none;
  opacity: .8;
}

.footer-mark {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid var(--gold);
  border-radius: 50%;
  color: var(--gold-light);
  font-family: Georgia, serif;
  font-size: 17px;
}

footer p {
  margin: 0;
  text-align: center;
  font-family: 'Noto Serif TC', serif;
}

footer > small {
  text-align: right;
}

@media (max-width: 760px) {
  .about-page {
    --edge-height: auto;
    --content-top-gap: 38px;
    --content-bottom-gap: 58px;
    height: auto;
    min-height: 100svh;
    overflow-x: hidden;
    overflow-y: auto;
    grid-template-rows: auto auto auto;
  }

  .nav {
    width: calc(100% - 32px);
    height: auto;
    padding: 18px 0;
    align-items: center;
    gap: 20px;
  }

  .brand {
    min-width: 0;
    font-size: 15px;
  }

  .nav-link {
    flex: 0 0 auto;
    font-size: 11px;
  }

  .about-hero {
    width: calc(100% - 32px);
    height: auto;
    padding: var(--content-top-gap) 0 var(--content-bottom-gap);
    align-content: start;
  }

  h1 {
    margin-top: 16px;
    font-size: clamp(30px, 9vw, 40px);
    line-height: 1.35;
    letter-spacing: .04em;
    white-space: normal;
  }

  .lead {
    margin-top: 16px;
    font-size: 14px;
    line-height: 1.9;
    white-space: normal;
  }

  .principles {
    margin-top: 32px;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .principles article {
    min-height: 0;
    padding: 22px 20px;
  }

  .principles h2 {
    margin-top: 12px;
    font-size: 21px;
  }

  .principles p {
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.85;
  }

  .crystal-ball-scene {
    position: relative;
    bottom: auto;
    left: auto;
    width: 122px;
    height: 112px;
    margin: 34px auto -20px;
  }

  footer {
    width: calc(100% - 32px);
    height: auto;
    padding: 20px 0 max(22px, env(safe-area-inset-bottom));
    grid-template-columns: 1fr;
    gap: 8px;
    text-align: center;
  }

  .footer-brand {
    justify-content: center;
  }

  footer > small {
    text-align: center;
    line-height: 1.6;
  }
}

@media (prefers-reduced-motion: reduce) {
  .crystal-ball-float,
  .crystal-glow,
  .crystal-mist,
  .crystal-star,
  .crystal-shadow {
    animation: none;
  }
}
</style>
