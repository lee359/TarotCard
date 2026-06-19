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
    </section>

    <footer>
      <NuxtLink class="brand footer-brand" to="/">
        <span class="brand-mark">☾</span>
        <span>月之秘語<small>LUNA ARCANA</small></span>
      </NuxtLink>
      <p>願你在每一次提問裡，更靠近真實的自己。</p>
      <small>© {{ new Date().getFullYear() }} LUNA ARCANA · 僅供自我探索與娛樂</small>
    </footer>
  </main>
</template>

<style scoped>
main { min-height: 100vh; overflow: hidden; background: var(--night); }
.hero { position: relative; min-height: 100svh; isolation: isolate; background: radial-gradient(circle at 50% 28%, rgba(86,64,129,.38), transparent 28%), radial-gradient(circle at 20% 20%, rgba(67,46,106,.2), transparent 30%), linear-gradient(180deg, #0e0b21, #090817); }
.hero::before { content: ''; position: absolute; inset: 0; z-index: -1; opacity: .55; background-image: radial-gradient(circle, rgba(240,217,156,.8) 0 1px, transparent 1.5px), radial-gradient(circle, rgba(240,217,156,.45) 0 1px, transparent 1.5px); background-position: 5% 12%, 74% 20%; background-size: 140px 140px, 210px 210px; mask-image: linear-gradient(to bottom, black, transparent 85%); }
.hero::after { content: ''; position: absolute; left: 50%; bottom: -120px; z-index: -1; width: 900px; height: 280px; border: 1px solid rgba(212,179,106,.12); border-radius: 50%; transform: translateX(-50%); box-shadow: 0 0 80px rgba(86,64,129,.1); }
.nav { display: flex; width: min(1160px, calc(100% - 48px)); margin: auto; padding: 28px 0; align-items: center; justify-content: space-between; }
.brand { display: flex; align-items: center; gap: 12px; color: var(--ink); font-family: 'Noto Serif TC', serif; font-size: 16px; letter-spacing: .14em; text-decoration: none; }
.brand-mark { display: grid; width: 37px; height: 37px; place-items: center; border: 1px solid var(--gold); border-radius: 50%; color: var(--gold-light); font-family: Georgia, serif; font-size: 22px; }
.brand small { display: block; margin-top: 3px; color: var(--gold); font-family: 'DM Sans', sans-serif; font-size: 7px; letter-spacing: .26em; }
.nav-link { color: var(--muted); font-size: 12px; letter-spacing: .15em; text-decoration: none; }
.nav-link:hover { color: var(--gold-light); }
.hero-content { display: flex; width: min(900px, calc(100% - 40px)); margin: auto; padding: 40px 0 90px; align-items: center; flex-direction: column; text-align: center; }
.eyebrow { display: flex; align-items: center; justify-content: center; gap: 13px; color: var(--gold); font-size: 9px; letter-spacing: .32em; }
.eyebrow span { width: 34px; height: 1px; background: var(--gold); opacity: .5; }
.moon { position: relative; display: grid; width: 120px; height: 120px; margin: 13px 0 6px; place-items: center; border: 1px solid rgba(212,179,106,.18); border-radius: 50%; color: var(--gold-light); font: 78px Georgia, serif; filter: drop-shadow(0 0 28px rgba(240,217,156,.18)); }
.moon > span { display: block; }
.moon::before, .moon::after { content: ''; position: absolute; width: 155px; height: 42px; border: 1px solid rgba(212,179,106,.25); border-radius: 50%; transform: rotate(24deg); }
.moon::after { transform: rotate(-24deg); }
h1 { margin: 0; font-family: 'Noto Serif TC', serif; font-size: clamp(38px, 5.5vw, 68px); font-weight: 600; letter-spacing: .08em; line-height: 1.3; }
.lead { margin: 22px 0 0; color: var(--muted); font-family: 'Noto Serif TC', serif; font-size: 15px; line-height: 2; letter-spacing: .06em; }
.hero-title { --animate-delay: .15s; animation-delay: var(--animate-delay); }
.hero-lead { --animate-delay: .3s; animation-delay: var(--animate-delay); }
.question-panel { width: min(620px, 100%); margin-top: 38px; --animate-delay: .45s; animation-delay: var(--animate-delay); }
.question-panel > p { color: #d2ccda; font-family: 'Noto Serif TC', serif; font-size: 14px; }
.question-tabs { display: grid; margin: 16px 0 25px; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--line); border-radius: 4px; overflow: hidden; }
.question-tabs button { padding: 13px 8px; border: 0; border-right: 1px solid var(--line); background: rgba(17,14,38,.55); color: var(--muted); cursor: pointer; font-size: 12px; letter-spacing: .08em; transition: .25s ease; }
.question-tabs button:last-child { border-right: 0; }
.question-tabs button:hover, .question-tabs button.active { background: var(--gold); color: #131025; }
.primary-button { display: flex; min-width: 245px; margin: auto; padding: 15px 22px; align-items: center; justify-content: center; gap: 55px; border: 1px solid var(--gold); background: var(--gold); color: #151129; cursor: pointer; letter-spacing: .14em; transition: .25s ease; }
.primary-button:hover { background: var(--gold-light); box-shadow: 0 0 30px rgba(212,179,106,.2); transform: translateY(-2px); }
.question-panel > small { display: block; margin-top: 15px; color: #6f6b7b; font-size: 10px; letter-spacing: .06em; }
footer { display: flex; padding: 55px max(24px, calc((100% - 1160px) / 2)); align-items: center; justify-content: space-between; gap: 30px; background: #070612; color: #6f6b7b; font-size: 11px; }
.footer-brand { opacity: .75; }
.footer-brand .brand-mark { width: 30px; height: 30px; font-size: 18px; }
footer > p { font-family: 'Noto Serif TC', serif; }
@media (max-width: 760px) {
  .nav { width: calc(100% - 32px); padding-top: 20px; }
  .nav-link { font-size: 11px; }
  .hero-content { padding-top: 25px; }
  .moon { width: 95px; height: 95px; font-size: 62px; }
  .moon::before, .moon::after { width: 125px; }
  h1 { letter-spacing: .04em; }
  .lead br { display: none; }
  .question-tabs { grid-template-columns: repeat(2,1fr); }
  .question-tabs button:nth-child(2) { border-right: 0; }
  .question-tabs button:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
  footer { flex-direction: column; text-align: center; }
}
</style>
