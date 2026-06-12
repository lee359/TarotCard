<script setup lang="ts">
import type { ObjectDirective } from 'vue'

type Question = '感情' | '事業' | '自我' | '今日指引'
type Card = { number: string; name: string; english: string; symbol: string; keywords: string; meaning: string }

useSeoMeta({
  title: '月之秘語｜線上塔羅占卜',
  description: '靜下心來，抽取三張塔羅牌，探索你的過去、現在與未來。',
  ogTitle: '月之秘語｜線上塔羅占卜',
  ogDescription: '一場安靜、私密的三張牌塔羅指引。',
  ogType: 'website'
})

const questions: Question[] = ['感情', '事業', '自我', '今日指引']
const activeQuestion = ref<Question>('感情')
const phase = ref<'intro' | 'drawing' | 'reading'>('intro')
const revealed = ref([false, false, false])
const drawnCards = ref<Card[]>([])
const positions = ['過去 · 根源', '現在 · 課題', '未來 · 指引']

const vReveal: ObjectDirective<HTMLElement, string> = {
  mounted(element, binding) {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || !('IntersectionObserver' in window)
    ) {
      element.classList.add('animate__animated')
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      element.classList.add('animate__animated', binding.value)
      observer.unobserve(element)
    }, { threshold: 0.18 })

    observer.observe(element)
  }
}

const deck: Card[] = [
  { number: '0', name: '愚者', english: 'THE FOOL', symbol: '☼', keywords: '啟程 · 自由 · 信任', meaning: '保持初衷。未知不是阻礙，而是邀請你輕盈前行的空間。' },
  { number: 'I', name: '魔術師', english: 'THE MAGICIAN', symbol: '∞', keywords: '意志 · 創造 · 行動', meaning: '你需要的資源其實已在手中，現在是將想法落地的時刻。' },
  { number: 'II', name: '女祭司', english: 'THE HIGH PRIESTESS', symbol: '☾', keywords: '直覺 · 沉靜 · 秘密', meaning: '先別急著尋求外界答案，安靜下來，你的直覺早已知情。' },
  { number: 'III', name: '皇后', english: 'THE EMPRESS', symbol: '♀', keywords: '豐盛 · 滋養 · 美感', meaning: '允許自己接收善意與豐盛，也別忘了照顧真正重要的關係。' },
  { number: 'VI', name: '戀人', english: 'THE LOVERS', symbol: '♡', keywords: '選擇 · 關係 · 契合', meaning: '重要的不是迎合，而是做出與內心價值一致的選擇。' },
  { number: 'VII', name: '戰車', english: 'THE CHARIOT', symbol: '✦', keywords: '決心 · 推進 · 掌控', meaning: '收回分散的注意力。當方向一致，阻力也會成為前進的力量。' },
  { number: 'VIII', name: '力量', english: 'STRENGTH', symbol: '♌', keywords: '勇氣 · 溫柔 · 韌性', meaning: '真正的力量不是壓制，而是帶著耐心接住自己的不安。' },
  { number: 'X', name: '命運之輪', english: 'WHEEL OF FORTUNE', symbol: '⊕', keywords: '轉機 · 循環 · 機遇', meaning: '局勢正在轉動。保持彈性，新的入口會在意想不到之處出現。' },
  { number: 'XI', name: '正義', english: 'JUSTICE', symbol: '⚖', keywords: '平衡 · 真相 · 責任', meaning: '誠實衡量因果，清楚的界線會替你帶來真正的自由。' },
  { number: 'XVII', name: '星星', english: 'THE STAR', symbol: '✧', keywords: '希望 · 療癒 · 靈感', meaning: '最黑的夜裡仍有光。相信緩慢修復的力量，願景正在靠近。' },
  { number: 'XVIII', name: '月亮', english: 'THE MOON', symbol: '☽', keywords: '潛意識 · 迷霧 · 感受', meaning: '眼前未必全貌。容許情緒流過，等迷霧散去再做決定。' },
  { number: 'XIX', name: '太陽', english: 'THE SUN', symbol: '☀', keywords: '清晰 · 喜悅 · 成功', meaning: '坦然展現自己。當你不再縮小光芒，好消息也更容易被看見。' }
]

const allRevealed = computed(() => revealed.value.every(Boolean))
const readingTitle = computed(() => {
  const name = drawnCards.value[2]?.name ?? '牌卡'
  return `${activeQuestion.value}的答案，正走向「${name}」`
})

function beginReading() {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
  }
  drawnCards.value = shuffled.slice(0, 3)
  revealed.value = [false, false, false]
  phase.value = 'drawing'
  nextTick(() => document.querySelector('#reading')?.scrollIntoView({ behavior: 'smooth' }))
}

function revealCard(index: number) {
  revealed.value[index] = true
  if (revealed.value.every(Boolean)) phase.value = 'reading'
}

function resetReading() {
  phase.value = 'intro'
  revealed.value = [false, false, false]
  drawnCards.value = []
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <main>
    <section class="hero" :class="{ compact: phase !== 'intro' }">
      <nav class="nav animate__animated animate__fadeInDown" aria-label="主要導覽">
        <a class="brand" href="#top" aria-label="月之秘語首頁">
          <span class="brand-mark">☾</span>
          <span>月之秘語<small>LUNA ARCANA</small></span>
        </a>
        <a class="nav-link" href="#about">關於占卜</a>
      </nav>

      <div id="top" class="hero-content">
        <p class="eyebrow animate__animated animate__fadeIn"><span /> LISTEN TO YOUR INNER VOICE <span /></p>
        <div class="moon animate__animated animate__zoomIn" aria-hidden="true"><span class="animate__animated animate__pulse animate__infinite animate__slower">☾</span></div>
        <h1 class="animate__animated animate__fadeInUp hero-title">答案，一直都在你心裡</h1>
        <p class="lead animate__animated animate__fadeInUp hero-lead">讓塔羅成為一面鏡子，映照此刻的你。<br>深呼吸，想著你的問題，然後選擇一個指引。</p>

        <div v-if="phase === 'intro'" class="question-panel animate__animated animate__fadeInUp">
          <p>此刻，你想問的是——</p>
          <div class="question-tabs" role="group" aria-label="選擇占卜主題">
            <button v-for="question in questions" :key="question" :class="{ active: activeQuestion === question }" @click="activeQuestion = question">
              {{ question }}
            </button>
          </div>
          <button class="primary-button" @click="beginReading">
            <span>開始抽牌</span><span aria-hidden="true">→</span>
          </button>
          <small>你的選擇不會被儲存，每次占卜都是獨一無二的相遇</small>
        </div>
      </div>
    </section>

    <section v-if="phase !== 'intro'" id="reading" class="reading-section animate__animated animate__fadeIn">
      <div class="section-heading animate__animated animate__fadeInUp">
        <p class="eyebrow"><span /> YOUR THREE-CARD SPREAD <span /></p>
        <h2>{{ allRevealed ? '牌已為你揭示' : '憑直覺，依序翻開三張牌' }}</h2>
        <p>{{ allRevealed ? '不必急著定義答案，先感受哪一句話最靠近你。' : `你所詢問的主題：${activeQuestion}` }}</p>
      </div>

      <div class="cards-grid">
        <TarotCard
          v-for="(position, index) in positions"
          :key="position"
          class="animate__animated animate__fadeInUp tarot-stagger"
          :style="{ '--card-delay': `${index * 180}ms` }"
          :position="position"
          :card="drawnCards[index]"
          :revealed="revealed[index]"
          :disabled="index > 0 && !revealed[index - 1]"
          @flip="revealCard(index)"
        />
      </div>

      <Transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <article v-if="allRevealed" class="result-panel">
          <span class="result-icon">✦</span>
          <p class="result-label">給你的整體訊息</p>
          <h3>{{ readingTitle }}</h3>
          <p>過去的「{{ drawnCards[0]?.name }}」提醒你理解來處；現在的「{{ drawnCards[1]?.name }}」請你看清課題。當你願意帶著這份覺察向前，「{{ drawnCards[2]?.name }}」所象徵的可能性便會展開。</p>
          <p class="affirmation">「我信任自己的節奏，也有勇氣選擇下一步。」</p>
          <button class="secondary-button" @click="resetReading">重新占卜 <span>↻</span></button>
        </article>
      </Transition>
    </section>

    <section id="about" v-reveal="'animate__fadeInUp'" class="about-section reveal-section">
      <p class="eyebrow"><span /> A GENTLE REMINDER <span /></p>
      <h2>塔羅不是預言，是與自己對話的方式</h2>
      <p>牌卡提供的是象徵與視角，不替你做決定。請把最終選擇留在自己手中，也讓現實中的專業建議成為你的支持。</p>
      <div class="principles">
        <span><b>01</b> 保持開放</span><span><b>02</b> 誠實感受</span><span><b>03</b> 自主選擇</span>
      </div>
    </section>

    <footer>
      <a class="brand footer-brand" href="#top"><span class="brand-mark">☾</span><span>月之秘語<small>LUNA ARCANA</small></span></a>
      <p>願你在每一次提問裡，更靠近真實的自己。</p>
      <small>© {{ new Date().getFullYear() }} LUNA ARCANA · 僅供自我探索與娛樂</small>
    </footer>
  </main>
</template>

<style scoped>
main { min-height: 100vh; overflow: hidden; background: var(--night); }
.hero { position: relative; min-height: 100svh; isolation: isolate; background: radial-gradient(circle at 50% 28%, rgba(86,64,129,.38), transparent 28%), radial-gradient(circle at 20% 20%, rgba(67,46,106,.2), transparent 30%), linear-gradient(180deg, #0e0b21, #090817); transition: min-height .6s ease; }
.hero.compact { min-height: 530px; }
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
h1, h2, h3 { margin: 0; font-family: 'Noto Serif TC', serif; font-weight: 600; }
h1 { font-size: clamp(38px, 5.5vw, 68px); letter-spacing: .08em; line-height: 1.3; }
.lead { margin: 22px 0 0; color: var(--muted); font-family: 'Noto Serif TC', serif; font-size: 15px; line-height: 2; letter-spacing: .06em; }
.hero-title { --animate-delay: .15s; animation-delay: var(--animate-delay); }
.hero-lead { --animate-delay: .3s; animation-delay: var(--animate-delay); }
.question-panel { width: min(620px, 100%); margin-top: 38px; }
.question-panel { --animate-delay: .45s; animation-delay: var(--animate-delay); }
.question-panel > p { color: #d2ccda; font-family: 'Noto Serif TC', serif; font-size: 14px; }
.question-tabs { display: grid; margin: 16px 0 25px; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--line); border-radius: 4px; overflow: hidden; }
.question-tabs button { padding: 13px 8px; border: 0; border-right: 1px solid var(--line); background: rgba(17,14,38,.55); color: var(--muted); cursor: pointer; font-size: 12px; letter-spacing: .08em; transition: .25s ease; }
.question-tabs button:last-child { border-right: 0; }
.question-tabs button:hover, .question-tabs button.active { background: var(--gold); color: #131025; }
.primary-button, .secondary-button { display: flex; align-items: center; justify-content: center; gap: 55px; margin: auto; border: 1px solid var(--gold); cursor: pointer; letter-spacing: .14em; transition: .25s ease; }
.primary-button { min-width: 245px; padding: 15px 22px; background: var(--gold); color: #151129; }
.primary-button:hover { background: var(--gold-light); box-shadow: 0 0 30px rgba(212,179,106,.2); transform: translateY(-2px); }
.question-panel > small { display: block; margin-top: 15px; color: #6f6b7b; font-size: 10px; letter-spacing: .06em; }
.reading-section { position: relative; padding: 105px 30px 125px; background: radial-gradient(circle at 50% 28%, rgba(60,47,102,.22), transparent 35%), #0a0919; }
.section-heading { max-width: 700px; margin: auto; text-align: center; }
.section-heading h2, .about-section h2 { margin-top: 18px; font-size: clamp(27px, 4vw, 42px); letter-spacing: .08em; }
.section-heading > p:last-child { margin-top: 14px; color: var(--muted); font-family: 'Noto Serif TC', serif; font-size: 14px; }
.cards-grid { display: grid; max-width: 920px; margin: 58px auto 0; grid-template-columns: repeat(3, 1fr); gap: 48px; justify-items: center; align-items: start; }
.tarot-stagger { animation-delay: var(--card-delay); }
.result-panel { max-width: 760px; margin: 85px auto 0; padding: 48px 55px; border: 1px solid var(--line); background: linear-gradient(135deg, rgba(35,28,64,.75), rgba(15,13,33,.8)); text-align: center; box-shadow: 0 25px 80px rgba(0,0,0,.25); }
.result-icon { color: var(--gold-light); font-size: 25px; }
.result-label { color: var(--gold); font-size: 9px; letter-spacing: .3em; }
.result-panel h3 { margin: 16px 0 20px; font-size: clamp(22px, 3vw, 31px); letter-spacing: .06em; }
.result-panel > p:not(.result-label):not(.affirmation) { color: #bdb8c7; font-family: 'Noto Serif TC', serif; font-size: 14px; line-height: 2; }
.affirmation { margin: 26px 0; color: var(--gold-light); font-family: 'Noto Serif TC', serif; font-size: 16px; }
.secondary-button { padding: 12px 22px; background: transparent; color: var(--gold-light); font-size: 11px; }
.secondary-button:hover { background: var(--gold); color: var(--night); }
.about-section { padding: 110px 25px; border-top: 1px solid rgba(212,179,106,.1); background: #0d0b1e; text-align: center; }
.reveal-section { opacity: 0; }
.reveal-section.animate__animated { opacity: 1; }
.about-section > p:not(.eyebrow) { max-width: 670px; margin: 24px auto 0; color: var(--muted); font-family: 'Noto Serif TC', serif; font-size: 14px; line-height: 2.1; }
.principles { display: flex; max-width: 700px; margin: 48px auto 0; justify-content: space-between; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.principles span { flex: 1; padding: 22px 12px; color: #c7c1cf; font-size: 12px; letter-spacing: .12em; }
.principles b { margin-right: 10px; color: var(--gold); font-size: 9px; }
footer { display: flex; padding: 55px max(24px, calc((100% - 1160px) / 2)); align-items: center; justify-content: space-between; gap: 30px; background: #070612; color: #6f6b7b; font-size: 11px; }
.footer-brand { opacity: .75; }.footer-brand .brand-mark { width: 30px; height: 30px; font-size: 18px; }
footer > p { font-family: 'Noto Serif TC', serif; }
@media (max-width: 760px) {
  .nav { width: calc(100% - 32px); padding-top: 20px; }.nav-link { display: none; }
  .hero-content { padding-top: 25px; }.hero.compact { min-height: 470px; }
  .moon { width: 95px; height: 95px; font-size: 62px; }.moon::before,.moon::after { width: 125px; }
  h1 { letter-spacing: .04em; }.lead br { display: none; }
  .question-tabs { grid-template-columns: repeat(2,1fr); }.question-tabs button:nth-child(2) { border-right: 0; }.question-tabs button:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
  .cards-grid { max-width: 320px; grid-template-columns: 1fr; gap: 55px; }
  .reading-section { padding: 85px 20px; }.result-panel { padding: 38px 24px; }
  .principles { flex-direction: column; }.principles span + span { border-top: 1px solid var(--line); }
  footer { flex-direction: column; text-align: center; }
}
</style>
