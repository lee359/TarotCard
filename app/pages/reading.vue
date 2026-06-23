<script setup lang="ts">
import { collection, doc, getDocs, increment, serverTimestamp, setDoc } from 'firebase/firestore'
type Question = '感情' | '事業' | '自我' | '今日指引'
type Card = { number: string; name: string; english: string; symbol: string; keywords: string; meaning: string }
type DrawnCard = Card & { reversed: boolean }

const READING_FLOW_KEY = 'luna-arcana-reading-flow'
const topicStatFields: Record<Question, string> = {
  感情: 'love',
  事業: 'career',
  自我: 'self',
  今日指引: 'daily'
}

useSeoMeta({
  title: '三張牌占卜｜月之秘語',
  description: '翻開三張塔羅牌，探索過去、現在與未來的指引。',
  ogTitle: '三張牌占卜｜月之秘語',
  ogDescription: '憑直覺翻開三張牌，接收此刻的塔羅訊息。',
  ogType: 'website'
})

const route = useRoute()
const questions: Question[] = ['感情', '事業', '自我', '今日指引']
const activeQuestion = computed<Question>(() => {
  const topic = route.query.topic
  return questions.includes(topic as Question) ? topic as Question : '感情'
})
const userQuestion = computed(() => {
  const question = route.query.question
  return typeof question === 'string' && question.trim()
    ? question.trim().slice(0, 120)
    : `關於「${activeQuestion.value}」的提問`
})
const revealed = ref([false, false, false])
const drawnCards = ref<DrawnCard[]>([])
const resultVisible = ref(false)
const resultRecorded = ref(false)
const recordingResult = ref(false)
const clearFeedbackSignal = ref(0)
const positions = ['過去 · 根源', '現在 · 課題', '未來 · 指引']
const lockedMessages = [
  '', 
  `要了解現在
得先回想過去`, 
  `欲知曉未來
要先理解現在`
];

const deck = ref<Card[]>([
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
])

const allRevealed = computed(() => revealed.value.every(Boolean))
const readingTitle = computed(() => {
  const card = drawnCards.value[2]
  return `${activeQuestion.value}的答案，正走向「${card?.name ?? '牌卡'}・${card?.reversed ? '逆位' : '正位'}」`
})

function orientationLabel(card?: DrawnCard) {
  return card?.reversed ? '逆位' : '正位'
}

function drawCards() {
  const shuffled = [...deck.value]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
  }
  drawnCards.value = shuffled.slice(0, 3).map(card => ({
    ...card,
    reversed: Math.random() < 0.5
  }))
  revealed.value = [false, false, false]
  resultVisible.value = false
  nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
}

async function loadDeck() {
  const { $firestore } = useNuxtApp()

  if ($firestore) {
    try {
      const snapshot = await getDocs(collection($firestore, 'tarotCards'))
      const remoteDeck = snapshot.docs.map(cardDoc => cardDoc.data() as Card)
      if (remoteDeck.length >= 3) deck.value = remoteDeck
    } catch (error) {
      console.warn('[Firestore] Using the built-in tarot deck.', error)
    }
  }

  drawCards()
}

function revealCard(index: number) {
  if (index <= 1) clearFeedbackSignal.value += 1
  revealed.value[index] = true
}

async function viewResult() {
  resultVisible.value = true

  if (resultRecorded.value || recordingResult.value) return

  const flowId = typeof route.query.flow === 'string' ? route.query.flow : ''
  const savedFlow = sessionStorage.getItem(READING_FLOW_KEY)
  if (!flowId || !savedFlow) return

  try {
    const flow = JSON.parse(savedFlow) as { id?: string, topic?: Question }
    if (flow.id !== flowId || flow.topic !== activeQuestion.value) return

    const { $firestore } = useNuxtApp()
    if (!$firestore) return

    recordingResult.value = true
    const selectedField = topicStatFields[activeQuestion.value]
    await setDoc(doc($firestore, 'siteStats', 'topicSelections'), {
      love: increment(selectedField === 'love' ? 1 : 0),
      career: increment(selectedField === 'career' ? 1 : 0),
      self: increment(selectedField === 'self' ? 1 : 0),
      daily: increment(selectedField === 'daily' ? 1 : 0),
      lastCompletedAt: serverTimestamp()
    }, { merge: true })

    resultRecorded.value = true
    sessionStorage.removeItem(READING_FLOW_KEY)
  } catch (error) {
    console.warn('[Firestore] Unable to record the selected topic.', error)
  } finally {
    recordingResult.value = false
  }
}

onMounted(loadDeck)
</script>

<template>
  <main>
    <nav class="nav animate__animated animate__fadeInDown" aria-label="主要導覽">
      <NuxtLink class="brand" to="/" aria-label="月之秘語首頁">
        <span class="brand-mark">☾</span>
        <span>月之秘語<small>LUNA ARCANA</small></span>
      </NuxtLink>
      <div class="nav-actions">
        <NuxtLink class="nav-link" to="/">更換主題</NuxtLink>
        <NuxtLink class="nav-link" to="/about">關於占卜</NuxtLink>
      </div>
    </nav>

    <section id="reading" class="reading-section animate__animated animate__fadeIn">
      <MysticBackground />
      <div class="section-heading animate__animated animate__fadeInUp">
        <p class="eyebrow"><span /> YOUR THREE-CARD SPREAD <span /></p>
        <div class="heading-title-row">
          <h1>{{ allRevealed ? '牌已為你揭示' : '憑直覺，依序翻開三張牌' }}</h1>
          <button
            v-if="allRevealed"
            class="view-result-button animate__animated animate__fadeInRight"
            type="button"
            @click="viewResult"
          >
            查看結果
          </button>
        </div>
        <p>{{ allRevealed ? '不必急著定義答案，先感受哪一句話最靠近你。' : `你的問題：${userQuestion}｜主題：${activeQuestion}` }}</p>
      </div>

      <div v-if="drawnCards.length" class="cards-grid">
        <TarotCard
          v-for="(position, index) in positions"
          :key="position"
          class="animate__animated animate__fadeInUp tarot-stagger"
          :style="{ '--card-delay': `${index * 180}ms` }"
          :position="position"
          :card="drawnCards[index]"
          :reversed="drawnCards[index]?.reversed"
          :revealed="revealed[index] ?? false"
          :disabled="index > 0 && !revealed[index - 1]"
          :locked-message="lockedMessages[index]"
          :clear-feedback-signal="clearFeedbackSignal"
          @flip="revealCard(index)"
        />
      </div>
      <p v-else class="loading">正在洗牌，請稍候片刻...</p>

      <Transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <div v-if="allRevealed && resultVisible" class="result-overlay">
          <article class="result-panel animate__animated animate__zoomIn">
            <button
              class="result-close"
              type="button"
              aria-label="關閉占卜結果"
              title="關閉"
              @click="resultVisible = false"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          <span class="result-icon">✦</span>
          <p class="result-label">給你的整體訊息</p>
          <blockquote class="result-question">「{{ userQuestion }}」</blockquote>
          <h2>{{ readingTitle }}</h2>
          <p>過去的「{{ drawnCards[0]?.name }}・{{ orientationLabel(drawnCards[0]) }}」提醒你理解來處；現在的「{{ drawnCards[1]?.name }}・{{ orientationLabel(drawnCards[1]) }}」請你看清課題。當你願意帶著這份覺察向前，「{{ drawnCards[2]?.name }}・{{ orientationLabel(drawnCards[2]) }}」所象徵的可能性便會展開。</p>
          <ul class="result-card-summary">
            <li v-for="(card, index) in drawnCards" :key="`${card.number}-${index}`">
              <strong>{{ positions[index] }}｜{{ card.name }}・{{ orientationLabel(card) }}</strong>
              <span>{{ card.reversed ? `能量可能受阻、延遲或轉向內在；${card.meaning}` : card.meaning }}</span>
            </li>
          </ul>
          <p class="affirmation">「我信任自己的節奏，也有勇氣選擇下一步。」</p>
          <div class="result-actions">
            <button class="secondary-button" @click="drawCards">重新抽牌 <span>↻</span></button>
            <NuxtLink class="text-link" to="/">更換占卜主題</NuxtLink>
          </div>
          </article>
        </div>
      </Transition>
    </section>

  </main>
</template>

<style scoped>
main { display: grid; min-height: 100dvh; overflow-x: clip; grid-template-rows: clamp(56px, 7.5vh, 70px) auto; background: radial-gradient(circle at 50% 28%, rgba(60,47,102,.22), transparent 35%), #0a0919; color: var(--ink); }
main::before { content: ''; position: fixed; inset: 0; pointer-events: none; background: radial-gradient(ellipse at 50% 36%, rgba(83,58,129,.2), transparent 48%), linear-gradient(150deg, rgba(212,179,106,.025), transparent 38%); }
.nav { position: relative; z-index: 1; display: flex; width: min(1080px, calc(100% - 48px)); margin: 0 auto; padding: clamp(9px, 1.5vh, 14px) 0; align-items: center; justify-content: space-between; }
.brand { display: flex; align-items: center; gap: 12px; color: var(--ink); font-family: 'Noto Serif TC', serif; font-size: 16px; letter-spacing: .14em; text-decoration: none; }
.brand-mark { display: grid; width: 37px; height: 37px; place-items: center; border: 1px solid var(--gold); border-radius: 50%; color: var(--gold-light); font-family: Georgia, serif; font-size: 22px; }
.brand small { display: block; margin-top: 3px; color: var(--gold); font-family: 'DM Sans', sans-serif; font-size: 7px; letter-spacing: .26em; }
.nav-actions { display: flex; align-items: center; gap: 24px; }
.nav-link { color: var(--muted); font-size: 12px; letter-spacing: .15em; text-decoration: none; }
.nav-link:hover { color: var(--gold-light); }
.reading-section { position: relative; z-index: 1; display: grid; min-height: calc(100dvh - clamp(56px, 7.5vh, 70px)); padding: clamp(4px, 1vh, 10px) 30px clamp(52px, 7vh, 76px); overflow: hidden; isolation: isolate; grid-template-rows: auto auto; align-content: start; }
.section-heading { width: min(100%, 900px); margin: 0 auto; padding-top: clamp(5px, 1.2vh, 12px); text-align: center; }
.eyebrow { display: flex; align-items: center; justify-content: center; gap: 13px; color: var(--gold); font-size: 9px; letter-spacing: .32em; }
.eyebrow span { width: 34px; height: 1px; background: var(--gold); opacity: .5; }
h1, h2 { margin: 0; font-family: 'Noto Serif TC', serif; font-weight: 600; }
.heading-title-row {
  display: grid; width: min(100%, 820px); margin: clamp(6px, 1.2vh, 10px) auto 0;
  grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(28px, 5vw, 62px); align-items: center;
}
.section-heading h1 { grid-row: 1; grid-column: 1 / -1; font-size: clamp(25px, 3.2vw, 36px); letter-spacing: .08em; line-height: 1.18; }
.section-heading > p:last-child { margin-top: clamp(6px, 1.2vh, 10px); color: var(--muted); font-family: 'Noto Serif TC', serif; font-size: 13px; }
.cards-grid { display: grid; width: min(100%, 940px); margin: clamp(14px, 2vh, 22px) auto 0; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(32px, 5.5vw, 76px); justify-items: center; align-items: start; }
.cards-grid :deep(.card-slot) { width: min(100%, 250px); }
.cards-grid :deep(.tarot-card) { width: min(100%, clamp(172px, 20.5vh, 205px)); }
.cards-grid :deep(.position) { margin-bottom: clamp(9px, 1.3vh, 13px); }
.cards-grid :deep(.mini-meaning) { margin-top: 17px; padding: 0 4px 12px; line-height: 1.85; }
.tarot-stagger { animation-delay: var(--card-delay); }
.loading { margin: 58px 0 0; color: var(--muted); text-align: center; letter-spacing: .12em; }
.view-result-button {
  z-index: 1; min-width: 134px; padding: 10px 18px; grid-row: 1; grid-column: 3; justify-self: center;
  border: 1px solid var(--gold); background: rgba(20, 17, 42, .88); color: var(--gold-light);
  cursor: pointer; font-family: 'Noto Serif TC', serif; font-size: 13px; letter-spacing: .14em;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .22); transition: background .2s ease, color .2s ease, transform .2s ease;
}
.view-result-button:hover { background: var(--gold); color: var(--night); transform: translateY(-2px); }
.view-result-button:focus-visible { outline: 2px solid var(--gold-light); outline-offset: 3px; }
.result-overlay {
  position: fixed; inset: 0; z-index: 20; display: grid; padding: clamp(24px, 5vw, 52px);
  place-items: center; background: rgba(10, 9, 25, .72); backdrop-filter: blur(8px);
}
.result-panel {
  position: relative; width: min(720px, 100%); max-height: min(78dvh, 620px); overflow-y: auto;
  padding: clamp(26px, 4vh, 40px) clamp(24px, 4vw, 44px); border: 1px solid var(--gold);
  background: linear-gradient(135deg, rgba(35,28,64,.95), rgba(15,13,33,.98));
  text-align: center; box-shadow: 0 30px 90px rgba(0,0,0,.45); --animate-duration: .65s;
}
.result-close {
  position: absolute; top: 12px; right: 12px; display: grid; width: 38px; height: 38px;
  padding: 0; place-items: center; border: 1px solid transparent; background: transparent;
  color: var(--muted); cursor: pointer; font-family: Arial, sans-serif; font-size: 30px;
  line-height: 1; transition: color .2s ease, border-color .2s ease, background .2s ease;
}
.result-close:hover { border-color: rgba(240,217,156,.45); background: rgba(240,217,156,.08); color: var(--gold-light); }
.result-close:focus-visible { outline: 2px solid var(--gold-light); outline-offset: 2px; }
.result-icon { color: var(--gold-light); font-size: 25px; }
.result-label { color: var(--gold); font-size: 9px; letter-spacing: .3em; }
.result-question { margin: 12px auto 0; color: #d7d0df; font-family: 'Noto Serif TC', serif; font-size: 13px; line-height: 1.7; }
.result-panel h2 { margin: 16px 0 20px; font-size: clamp(22px, 3vw, 31px); letter-spacing: .06em; }
.result-panel > p:not(.result-label):not(.affirmation) { color: #bdb8c7; font-family: 'Noto Serif TC', serif; font-size: 14px; line-height: 2; }
.result-card-summary { display: grid; margin: 20px 0 0; padding: 0; gap: 8px; list-style: none; text-align: left; }
.result-card-summary li { padding: 10px 12px; border-left: 1px solid var(--gold); background: rgba(212,179,106,.045); }
.result-card-summary strong, .result-card-summary span { display: block; }
.result-card-summary strong { color: var(--gold-light); font-family: 'Noto Serif TC', serif; font-size: 11px; letter-spacing: .06em; }
.result-card-summary span { margin-top: 4px; color: #aaa4b4; font-size: 11px; line-height: 1.65; }
.affirmation { margin: 26px 0; color: var(--gold-light); font-family: 'Noto Serif TC', serif; font-size: 16px; }
.result-actions { display: flex; align-items: center; justify-content: center; gap: 22px; flex-wrap: wrap; }
.secondary-button { display: flex; padding: 12px 22px; align-items: center; justify-content: center; gap: 55px; border: 1px solid var(--gold); background: transparent; color: var(--gold-light); cursor: pointer; font-size: 11px; letter-spacing: .14em; transition: .25s ease; }
.secondary-button:hover { background: var(--gold); color: var(--night); }
.text-link { color: var(--muted); font-size: 11px; letter-spacing: .14em; text-decoration: none; }
.text-link:hover { color: var(--gold-light); }
@media (max-width: 760px) {
  main { min-height: 100dvh; }
  .nav { width: calc(100% - 32px); padding-top: 20px; align-items: flex-start; gap: 20px; }
  .nav-actions { align-items: flex-end; flex-direction: column; gap: 10px; }
  .nav-link { font-size: 11px; }
  .reading-section { min-height: auto; padding: 70px 20px 90px; }
  .section-heading { padding-top: 0; }
  .heading-title-row { display: flex; width: 100%; margin-top: 10px; align-items: center; flex-direction: column; gap: 16px; }
  .section-heading h1 { width: 100%; grid-row: auto; grid-column: auto; }
  .view-result-button { width: min(220px, 100%); min-width: 0; margin: 0 auto; grid-row: auto; grid-column: auto; justify-self: auto; }
  .section-heading > p:last-child { margin-top: 12px; padding: 0 8px; line-height: 1.7; }
  .cards-grid { max-width: 320px; grid-template-columns: 1fr; gap: 55px; }
  .cards-grid :deep(.card-slot) { width: min(100%, 260px); }
  .cards-grid :deep(.tarot-card) { width: 100%; }
  .result-overlay { padding: 18px; align-items: end; }
  .result-panel { max-height: 82dvh; padding: 32px 22px; }
}
</style>
