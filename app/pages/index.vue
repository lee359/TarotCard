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
const activeQuestion = ref<Question | null>(null)
const tarotQuestion = ref('')
const adminLoginOpen = ref(false)
const rulesOpen = ref(false)
const route = useRoute()
const nuxtApp = useNuxtApp()
const adminLoginMessage = computed(() => route.query.adminError === 'unauthorized'
  ? '此帳號沒有管理員權限。'
  : '')

function selectQuestion(question: Question) {
  activeQuestion.value = question
}

function startReading() {
  const question = tarotQuestion.value.trim()
  if (!activeQuestion.value || !question) return

  const flowId = crypto.randomUUID()
  sessionStorage.setItem('luna-arcana-reading-flow', JSON.stringify({
    id: flowId,
    topic: activeQuestion.value
  }))

  return navigateTo({
    path: '/reading',
    query: {
      topic: activeQuestion.value,
      flow: flowId,
      question
    }
  })
}

function openAdminLogin() {
  if (nuxtApp.$firebaseAuth?.currentUser) {
    return navigateTo('/admin')
  }

  adminLoginOpen.value = true
}

onMounted(() => {
  if (route.query.adminLogin === '1') {
    adminLoginOpen.value = true
  }
})
</script>

<template>
  <main>
    <section class="hero">
      <MysticBackground />
      <nav class="nav animate__animated animate__fadeInDown" aria-label="主要導覽">
        <NuxtLink class="brand" to="/" aria-label="月之秘語首頁">
          <span class="brand-mark">☾</span>
          <span>月之秘語<small>LUNA ARCANA</small></span>
        </NuxtLink>
        <div class="nav-actions">
          <button class="nav-link nav-button" type="button" @click="rulesOpen = true">規則說明</button>
          <NuxtLink class="nav-link" to="/about">關於占卜</NuxtLink>
          <NuxtLink class="nav-link" to="/author">關於作者</NuxtLink>
        </div>
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
          <label class="question-input-label" for="tarot-question">寫下你想釐清的問題</label>
          <input
            id="tarot-question"
            v-model="tarotQuestion"
            class="question-input"
            type="text"
            maxlength="120"
            autocomplete="off"
            placeholder="例如：我該如何面對目前的感情關係？"
          >
          <div class="question-tabs" role="group" aria-label="選擇占卜主題">
            <button
              v-for="question in questions"
              :key="question"
              type="button"
              :class="{ active: activeQuestion === question }"
              :aria-pressed="activeQuestion === question"
              @click="selectQuestion(question)"
            >
              {{ question }}
            </button>
          </div>
          <button
            class="primary-button"
            type="button"
            :disabled="!activeQuestion || !tarotQuestion.trim()"
            aria-describedby="topic-guidance"
            @click="startReading"
          >
            <span>開始抽牌</span><span aria-hidden="true">→</span>
          </button>
          <small id="topic-guidance" :class="{ 'selection-required': !activeQuestion || !tarotQuestion.trim() }" aria-live="polite">
            {{ !tarotQuestion.trim() ? '請先寫下問題' : !activeQuestion ? '請選擇一個占卜主題' : '問題僅用於本次牌面解讀' }}
          </small>
        </div>
      </div>

      <footer>
        <button class="footer-admin-link" type="button" @click="openAdminLogin">管理員登入</button>
        <p>願你在每一次提問裡，更靠近真實的自己。</p>
        <small>© {{ new Date().getFullYear() }} LUNA ARCANA · 僅供自我探索與娛樂</small>
      </footer>
    </section>

    <AdminLoginModal
      v-if="adminLoginOpen"
      v-model="adminLoginOpen"
      :initial-message="adminLoginMessage"
    />
    <CardRulesModal v-model="rulesOpen" />
  </main>
</template>

<style scoped>
main { height: 100dvh; overflow: clip; background: var(--night); }
.hero { --edge-height: clamp(50px, 7vh, 64px); position: relative; display: grid; height: 100dvh; overflow: clip; isolation: isolate; grid-template-rows: var(--edge-height) minmax(0, 1fr) var(--edge-height); background: radial-gradient(circle at 50% 28%, rgba(86,64,129,.38), transparent 28%), radial-gradient(circle at 20% 20%, rgba(67,46,106,.2), transparent 30%), linear-gradient(180deg, #0e0b21, #090817); }
.hero::before { content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none; background: radial-gradient(ellipse at 50% 46%, rgba(83,58,129,.18), transparent 46%), linear-gradient(115deg, transparent 20%, rgba(212,179,106,.025) 50%, transparent 80%); }
.hero::after { content: ''; position: absolute; left: 50%; bottom: 0; z-index: -1; width: min(900px, 88vw); height: 280px; border: 1px solid rgba(212,179,106,.12); border-radius: 50%; transform: translate(-50%, 55%); box-shadow: 0 0 80px rgba(86,64,129,.1); }
.nav { display: flex; width: min(1080px, calc(100% - 48px)); height: var(--edge-height); margin: 0 auto; padding: 0; align-items: center; justify-content: space-between; }
.brand { display: flex; align-items: center; gap: 12px; color: var(--ink); font-family: 'Noto Serif TC', serif; font-size: 16px; letter-spacing: .14em; text-decoration: none; }
.brand-mark { display: grid; width: 37px; height: 37px; place-items: center; border: 1px solid var(--gold); border-radius: 50%; color: var(--gold-light); font-family: Georgia, serif; font-size: 22px; }
.brand small { display: block; margin-top: 3px; color: var(--gold); font-family: 'DM Sans', sans-serif; font-size: 7px; letter-spacing: .26em; }
.nav-actions { display: flex; align-items: center; gap: 24px; }
.nav-link { color: var(--muted); font-size: 12px; letter-spacing: .15em; text-decoration: none; }
.nav-button { padding: 0; border: 0; background: transparent; cursor: pointer; font-family: inherit; }
.nav-link:hover { color: var(--gold-light); }
.nav-link:focus-visible { outline: 1px solid var(--gold-light); outline-offset: 5px; }
.hero-content { display: flex; width: min(740px, calc(100% - 40px)); margin: 0 auto; padding: clamp(6px, 1.5vh, 14px) 0 clamp(10px, 2vh, 18px); align-items: center; min-height: 0; flex-direction: column; justify-content: center; text-align: center; }
.eyebrow { display: flex; align-items: center; justify-content: center; gap: 13px; color: var(--gold); font-size: 9px; letter-spacing: .32em; }
.eyebrow span { width: 34px; height: 1px; background: var(--gold); opacity: .5; }
.moon { position: relative; display: grid; width: clamp(62px, 9vh, 86px); height: clamp(62px, 9vh, 86px); margin: clamp(4px, 1vh, 8px) 0 3px; place-items: center; border: 1px solid rgba(212,179,106,.18); border-radius: 50%; color: var(--gold-light); font: clamp(42px, 6.2vh, 56px) Georgia, serif; filter: drop-shadow(0 0 28px rgba(240,217,156,.18)); }
.moon > span { display: block; }
.moon::before, .moon::after {
  content: ''; position: absolute; top: 50%; left: 50%; width: clamp(96px, 15vh, 132px); height: clamp(28px, 4.5vh, 38px);
  border: 1px solid rgba(212,179,106,.28); border-radius: 50%; transform-origin: center;
  box-shadow: 0 0 14px rgba(212,179,106,.06); pointer-events: none;
}
.moon::before { animation: moon-orbit-sway-one 4.8s ease-in-out infinite; }
.moon::after { animation: moon-orbit-sway-two 5.6s ease-in-out -1.4s infinite; }
@keyframes moon-orbit-sway-one {
  0%, 100% { transform: translate(-50%, -50%) rotate(18deg) scaleX(.96); }
  50% { transform: translate(-50%, -50%) rotate(39deg) scaleX(1.04); }
}
@keyframes moon-orbit-sway-two {
  0%, 100% { transform: translate(-50%, -50%) rotate(-20deg) scaleX(1.03); }
  50% { transform: translate(-50%, -50%) rotate(-42deg) scaleX(.95); }
}
h1 { margin: 0; font-family: 'Noto Serif TC', serif; font-size: clamp(30px, 3.7vw, 48px); font-weight: 600; letter-spacing: .08em; line-height: 1.16; }
.lead { margin: clamp(8px, 1.4vh, 12px) 0 0; color: var(--muted); font-family: 'Noto Serif TC', serif; font-size: clamp(12px, 1.4vh, 14px); line-height: 1.65; letter-spacing: .06em; }
.hero-title { --animate-delay: .15s; animation-delay: var(--animate-delay); }
.hero-lead { --animate-delay: .3s; animation-delay: var(--animate-delay); }
.question-panel { width: min(560px, 100%); margin-top: clamp(12px, 2.2vh, 20px); --animate-delay: .45s; animation-delay: var(--animate-delay); }
.question-panel > p { color: #d2ccda; font-family: 'Noto Serif TC', serif; font-size: 14px; }
.question-input-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.question-input { width: 100%; margin-top: 10px; padding: clamp(10px, 1.7vh, 13px) 15px; border: 1px solid var(--line); border-radius: 4px; outline: none; background: rgba(12,10,29,.72); color: var(--ink); font-family: 'Noto Serif TC', serif; font-size: 12px; letter-spacing: .04em; transition: border-color .2s ease, box-shadow .2s ease; }
.question-input::placeholder { color: #6f6979; }
.question-input:focus { border-color: var(--gold); box-shadow: 0 0 0 2px rgba(212,179,106,.1), 0 0 24px rgba(86,64,129,.16); }
.question-tabs { display: grid; margin: 9px 0 12px; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--line); border-radius: 4px; overflow: hidden; }
.question-tabs button { position: relative; padding: clamp(9px, 1.6vh, 12px) 8px; overflow: hidden; border: 0; border-right: 1px solid var(--line); background: rgba(17,14,38,.55); color: var(--muted); cursor: pointer; font-size: 12px; letter-spacing: .08em; transition: color .25s ease, background .25s ease, transform .25s ease, box-shadow .25s ease; }
.question-tabs button::before { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(110deg, transparent 20%, rgba(255,241,199,.32) 48%, transparent 76%); transform: translateX(-125%); transition: transform .55s ease; }
.question-tabs button:last-child { border-right: 0; }
.question-tabs button:hover { z-index: 1; background: var(--gold); color: #131025; transform: translateY(-3px); box-shadow: 0 8px 22px rgba(212,179,106,.25), inset 0 0 0 1px rgba(255,244,207,.45); }
.question-tabs button:hover::before { transform: translateX(125%); }
.question-tabs button.active { background: var(--gold); color: #131025; box-shadow: inset 0 -3px 0 rgba(82,57,20,.3); }
.question-tabs button:focus-visible { z-index: 2; outline: 2px solid var(--gold-light); outline-offset: -3px; }
.primary-button { display: flex; min-width: 230px; margin: auto; padding: clamp(11px, 2vh, 14px) 22px; align-items: center; justify-content: center; gap: 55px; border: 1px solid var(--gold); background: var(--gold); color: #151129; cursor: pointer; letter-spacing: .14em; transition: .25s ease; }
.primary-button:hover:not(:disabled) { background: var(--gold-light); box-shadow: 0 0 30px rgba(212,179,106,.2); transform: translateY(-2px); }
.primary-button:disabled { border-color: var(--line); background: rgba(32,27,56,.72); color: #777181; cursor: not-allowed; opacity: .72; }
.question-panel > small { display: block; margin-top: 10px; color: #6f6b7b; font-size: 10px; letter-spacing: .06em; }
.question-panel > small.selection-required { color: var(--gold); }
footer { position: relative; z-index: 1; display: grid; width: min(1080px, calc(100% - 48px)); height: var(--edge-height); margin: 0 auto; padding: 0; grid-template-columns: 1fr auto 1fr; gap: 20px; align-items: center; border-top: 1px solid rgba(212,179,106,.1); color: #6f6b7b; font-size: 10px; }
footer p { margin: 0; font-family: 'Noto Serif TC', serif; }
.footer-admin-link { justify-self: start; padding: 0; border: 0; background: transparent; color: var(--muted); cursor: pointer; font-size: 12px; letter-spacing: .15em; text-decoration: none; transition: color .2s ease; }
.footer-admin-link:hover { color: var(--gold-light); }
.footer-admin-link:focus-visible { outline: 1px solid var(--gold-light); outline-offset: 5px; }
footer > small { justify-self: end; text-align: right; }
@media (max-width: 760px) {
  .hero { min-height: auto; }
  .nav { width: calc(100% - 32px); padding-top: 20px; }
  .nav-actions { gap: 14px; }
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
  .footer-admin-link { padding: 4px 0; font-size: 11px; }
  footer > small { justify-self: center; text-align: center; }
}
@media (prefers-reduced-motion: reduce) {
  .question-tabs button, .question-tabs button::before { transition: none; }
  .question-tabs button:hover { transform: none; }
}
</style>
