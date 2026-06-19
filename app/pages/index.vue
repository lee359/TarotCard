<script setup lang="ts">
type Question = '感情' | '事業' | '自我' | '今日指引'

useSeoMeta({
  title: '月之秘語｜線上塔羅占卜',
  description: '靜下心來，選擇主題後抽取三張塔羅牌，探索你的過去、現在與未來。',
  ogTitle: '月之秘語｜線上塔羅占卜',
  ogDescription: '一場安靜、私密的三張牌塔羅指引。',
  ogType: 'website'
})

const questions: Question[] = ['感情', '事業', '自我', '今日指引']
const activeQuestion = ref<Question>('感情')

function startReading() {
  return navigateTo({
    path: '/reading',
    query: { topic: activeQuestion.value }
  })
}
</script>

<template>
  <main>
    <section class="hero">
      <nav class="nav animate__animated animate__fadeInDown" aria-label="主要導覽">
        <NuxtLink class="brand" to="/" aria-label="月之秘語首頁">
          <span class="brand-mark">☾</span>
          <span>月之秘語<small>LUNA ARCANA</small></span>
        </NuxtLink>
        <NuxtLink class="nav-link" to="/about">關於占卜</NuxtLink>
      </nav>

      <div id="top" class="hero-content">
        <p class="eyebrow animate__animated animate__fadeIn"><span /> LISTEN TO YOUR INNER VOICE <span /></p>
        <div class="moon animate__animated animate__zoomIn" aria-hidden="true">
          <span class="animate__animated animate__pulse animate__infinite animate__slower">☾</span>
        </div>
        <h1 class="animate__animated animate__fadeInUp hero-title">答案，一直都在你心裡</h1>
        <p class="lead animate__animated animate__fadeInUp hero-lead">讓塔羅成為一面鏡子，映照此刻的你。<br>深呼吸，想著你的問題，然後選擇一個指引。</p>

        <div class="question-panel animate__animated animate__fadeInUp">
          <p>此刻，你想問的是——</p>
          <div class="question-tabs" role="group" aria-label="選擇占卜主題">
            <button
              v-for="question in questions"
              :key="question"
              :class="{ active: activeQuestion === question }"
              @click="activeQuestion = question"
            >
              {{ question }}
            </button>
          </div>
          <button class="primary-button" @click="startReading">
            <span>開始抽牌</span><span aria-hidden="true">→</span>
          </button>
          <small>你的選擇不會被儲存，每次占卜都是獨一無二的相遇</small>
        </div>
      </div>

      <footer>
        <NuxtLink class="footer-brand" to="/">
          <span class="footer-mark">☾</span>
          <span>月之秘語<small>LUNA ARCANA</small></span>
        </NuxtLink>
        <p>願你在每一次提問裡，更靠近真實的自己。</p>
        <small>© {{ new Date().getFullYear() }} LUNA ARCANA · 僅供自我探索與娛樂</small>
      </footer>
    </section>

  </main>
</template>

<style scoped>
main { height: 100dvh; overflow: clip; background: var(--night); }
.hero { --edge-height: clamp(50px, 7vh, 64px); position: relative; display: grid; height: 100dvh; overflow: clip; isolation: isolate; grid-template-rows: var(--edge-height) minmax(0, 1fr) var(--edge-height); background: radial-gradient(circle at 50% 28%, rgba(86,64,129,.38), transparent 28%), radial-gradient(circle at 20% 20%, rgba(67,46,106,.2), transparent 30%), linear-gradient(180deg, #0e0b21, #090817); }
.hero::before { content: ''; position: absolute; inset: 0; z-index: -1; opacity: .55; background-image: radial-gradient(circle, rgba(240,217,156,.8) 0 1px, transparent 1.5px), radial-gradient(circle, rgba(240,217,156,.45) 0 1px, transparent 1.5px); background-position: 5% 12%, 74% 20%; background-size: 140px 140px, 210px 210px; mask-image: linear-gradient(to bottom, black, transparent 85%); }
.hero::after { content: ''; position: absolute; left: 50%; bottom: 0; z-index: -1; width: min(900px, 88vw); height: 280px; border: 1px solid rgba(212,179,106,.12); border-radius: 50%; transform: translate(-50%, 55%); box-shadow: 0 0 80px rgba(86,64,129,.1); }
.nav { display: flex; width: min(1080px, calc(100% - 48px)); height: var(--edge-height); margin: 0 auto; padding: 0; align-items: center; justify-content: space-between; }
.brand { display: flex; align-items: center; gap: 12px; color: var(--ink); font-family: 'Noto Serif TC', serif; font-size: 16px; letter-spacing: .14em; text-decoration: none; }
.brand-mark { display: grid; width: 37px; height: 37px; place-items: center; border: 1px solid var(--gold); border-radius: 50%; color: var(--gold-light); font-family: Georgia, serif; font-size: 22px; }
.brand small { display: block; margin-top: 3px; color: var(--gold); font-family: 'DM Sans', sans-serif; font-size: 7px; letter-spacing: .26em; }
.nav-link { color: var(--muted); font-size: 12px; letter-spacing: .15em; text-decoration: none; }
.nav-link:hover { color: var(--gold-light); }
.hero-content { display: flex; width: min(740px, calc(100% - 40px)); margin: 0 auto; padding: clamp(6px, 1.5vh, 14px) 0 clamp(10px, 2vh, 18px); align-items: center; min-height: 0; flex-direction: column; justify-content: center; text-align: center; }
.eyebrow { display: flex; align-items: center; justify-content: center; gap: 13px; color: var(--gold); font-size: 9px; letter-spacing: .32em; }
.eyebrow span { width: 34px; height: 1px; background: var(--gold); opacity: .5; }
.moon { position: relative; display: grid; width: clamp(62px, 9vh, 86px); height: clamp(62px, 9vh, 86px); margin: clamp(4px, 1vh, 8px) 0 3px; place-items: center; border: 1px solid rgba(212,179,106,.18); border-radius: 50%; color: var(--gold-light); font: clamp(42px, 6.2vh, 56px) Georgia, serif; filter: drop-shadow(0 0 28px rgba(240,217,156,.18)); }
.moon > span { display: block; }
.moon::before, .moon::after { content: ''; position: absolute; width: clamp(96px, 15vh, 132px); height: clamp(28px, 4.5vh, 38px); border: 1px solid rgba(212,179,106,.25); border-radius: 50%; transform: rotate(24deg); }
.moon::after { transform: rotate(-24deg); }
h1 { margin: 0; font-family: 'Noto Serif TC', serif; font-size: clamp(30px, 3.7vw, 48px); font-weight: 600; letter-spacing: .08em; line-height: 1.16; }
.lead { margin: clamp(8px, 1.4vh, 12px) 0 0; color: var(--muted); font-family: 'Noto Serif TC', serif; font-size: clamp(12px, 1.4vh, 14px); line-height: 1.65; letter-spacing: .06em; }
.hero-title { --animate-delay: .15s; animation-delay: var(--animate-delay); }
.hero-lead { --animate-delay: .3s; animation-delay: var(--animate-delay); }
.question-panel { width: min(560px, 100%); margin-top: clamp(12px, 2.2vh, 20px); --animate-delay: .45s; animation-delay: var(--animate-delay); }
.question-panel > p { color: #d2ccda; font-family: 'Noto Serif TC', serif; font-size: 14px; }
.question-tabs { display: grid; margin: 10px 0 14px; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--line); border-radius: 4px; overflow: hidden; }
.question-tabs button { padding: clamp(9px, 1.6vh, 12px) 8px; border: 0; border-right: 1px solid var(--line); background: rgba(17,14,38,.55); color: var(--muted); cursor: pointer; font-size: 12px; letter-spacing: .08em; transition: .25s ease; }
.question-tabs button:last-child { border-right: 0; }
.question-tabs button:hover, .question-tabs button.active { background: var(--gold); color: #131025; }
.primary-button { display: flex; min-width: 230px; margin: auto; padding: clamp(11px, 2vh, 14px) 22px; align-items: center; justify-content: center; gap: 55px; border: 1px solid var(--gold); background: var(--gold); color: #151129; cursor: pointer; letter-spacing: .14em; transition: .25s ease; }
.primary-button:hover { background: var(--gold-light); box-shadow: 0 0 30px rgba(212,179,106,.2); transform: translateY(-2px); }
.question-panel > small { display: block; margin-top: 10px; color: #6f6b7b; font-size: 10px; letter-spacing: .06em; }
footer { position: relative; z-index: 1; display: grid; width: min(1080px, calc(100% - 48px)); height: var(--edge-height); margin: 0 auto; padding: 0; grid-template-columns: auto 1fr auto; gap: 20px; align-items: center; border-top: 1px solid rgba(212,179,106,.1); color: #6f6b7b; font-size: 10px; }
.footer-brand { display: flex; align-items: center; gap: 10px; color: var(--ink); font-family: 'Noto Serif TC', serif; font-size: 12px; letter-spacing: .12em; text-decoration: none; opacity: .8; }
.footer-brand small { display: block; margin-top: 2px; color: var(--gold); font-family: 'DM Sans', sans-serif; font-size: 6px; letter-spacing: .22em; }
.footer-mark { display: grid; width: 28px; height: 28px; place-items: center; border: 1px solid var(--gold); border-radius: 50%; color: var(--gold-light); font-family: Georgia, serif; font-size: 17px; }
footer p { margin: 0; text-align: center; font-family: 'Noto Serif TC', serif; }
footer > small { text-align: right; }
@media (max-width: 760px) {
  .hero { min-height: auto; }
  .nav { width: calc(100% - 32px); padding-top: 20px; }
  .nav-link { font-size: 11px; }
  .hero-content { justify-content: center; padding-top: 20px; }
  .moon { width: 95px; height: 95px; font-size: 62px; }
  .moon::before, .moon::after { width: 125px; }
  h1 { letter-spacing: .04em; }
  .lead br { display: none; }
  .question-tabs { grid-template-columns: repeat(2,1fr); }
  .question-tabs button:nth-child(2) { border-right: 0; }
  .question-tabs button:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
  footer { width: calc(100% - 32px); grid-template-columns: 1fr; gap: 4px; text-align: center; }
  .footer-brand { justify-content: center; }
  footer > small { text-align: center; }
}
</style>
