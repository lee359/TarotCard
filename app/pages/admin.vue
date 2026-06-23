<script setup lang="ts">
import { signOut } from 'firebase/auth'
import type { Auth } from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  writeBatch
} from 'firebase/firestore'
import type { Firestore } from 'firebase/firestore'
import { defaultTarotDeck } from '~/data/tarot'
import type { TarotCardData } from '~/data/tarot'

definePageMeta({ middleware: 'admin' })

useSeoMeta({
  title: '管理後台｜月之秘語',
  robots: 'noindex, nofollow'
})

const config = useRuntimeConfig()
const nuxtApp = useNuxtApp()
const firebaseAuth: Auth | null = nuxtApp.$firebaseAuth
const firestore: Firestore | null = nuxtApp.$firestore
const signingOut = ref(false)
const adminEmail = ref('已驗證帳號')
const visitorCount = ref<number | null>(null)
const lastVisitedAt = ref('尚無造訪紀錄')
const loadingVisitorStats = ref(true)
const cards = ref<TarotCardData[]>([])
const loadingCards = ref(true)
const saving = ref(false)
const importing = ref(false)
const editingId = ref<string | null>(null)
const feedback = ref('')
const form = reactive<TarotCardData>({
  number: '',
  name: '',
  english: '',
  symbol: '',
  keywords: '',
  meaning: ''
})
const firebaseConsoleUrl = computed(() => {
  const projectId = config.public.firebaseProjectId
  return projectId
    ? `https://console.firebase.google.com/project/${encodeURIComponent(projectId)}/firestore`
    : 'https://console.firebase.google.com/'
})

async function logout() {
  if (!firebaseAuth) return navigateTo('/')

  signingOut.value = true
  try {
    await signOut(firebaseAuth)
    await navigateTo('/')
  } finally {
    signingOut.value = false
  }
}

function resetForm() {
  editingId.value = null
  Object.assign(form, {
    number: '',
    name: '',
    english: '',
    symbol: '',
    keywords: '',
    meaning: ''
  })
}

function editCard(card: TarotCardData) {
  editingId.value = card.id ?? null
  Object.assign(form, {
    number: card.number,
    name: card.name,
    english: card.english,
    symbol: card.symbol,
    keywords: card.keywords,
    meaning: card.meaning
  })
  window.scrollTo({ top: 360, behavior: 'smooth' })
}

async function loadCards() {
  if (!firestore) return

  loadingCards.value = true
  feedback.value = ''
  try {
    const snapshot = await getDocs(collection(firestore, 'tarotCards'))
    cards.value = snapshot.docs
      .map(cardDoc => ({ id: cardDoc.id, ...cardDoc.data() } as TarotCardData))
      .sort((a, b) => a.name.localeCompare(b.name, 'zh-Hant'))
  } catch (error) {
    console.error('[Firestore] Unable to load tarot cards.', error)
    feedback.value = '無法讀取牌卡，請確認 Firestore 規則與網路連線。'
  } finally {
    loadingCards.value = false
  }
}

async function loadVisitorStats() {
  if (!firestore) {
    loadingVisitorStats.value = false
    return
  }

  try {
    const snapshot = await getDoc(doc(firestore, 'siteStats', 'visitors'))
    if (!snapshot.exists()) return

    const data = snapshot.data()
    visitorCount.value = typeof data.count === 'number' ? data.count : 0
    lastVisitedAt.value = data.lastVisitedAt?.toDate
      ? new Intl.DateTimeFormat('zh-TW', {
          dateStyle: 'medium',
          timeStyle: 'short'
        }).format(data.lastVisitedAt.toDate())
      : '等待伺服器更新時間'
  } catch (error) {
    console.error('[Firestore] Unable to load visitor statistics.', error)
    lastVisitedAt.value = '統計資料讀取失敗'
  } finally {
    loadingVisitorStats.value = false
  }
}

async function saveCard() {
  if (!firestore) return

  saving.value = true
  feedback.value = ''
  const payload = {
    number: form.number.trim(),
    name: form.name.trim(),
    english: form.english.trim(),
    symbol: form.symbol.trim(),
    keywords: form.keywords.trim(),
    meaning: form.meaning.trim(),
    updatedAt: serverTimestamp()
  }

  try {
    if (editingId.value) {
      await updateDoc(doc(firestore, 'tarotCards', editingId.value), payload)
      feedback.value = `已更新「${payload.name}」。`
    } else {
      await addDoc(collection(firestore, 'tarotCards'), {
        ...payload,
        createdAt: serverTimestamp()
      })
      feedback.value = `已新增「${payload.name}」。`
    }
    resetForm()
    await loadCards()
  } catch (error) {
    console.error('[Firestore] Unable to save tarot card.', error)
    feedback.value = '儲存失敗，請確認管理員權限與 Firestore 規則。'
  } finally {
    saving.value = false
  }
}

async function removeCard(card: TarotCardData) {
  if (!firestore || !card.id || !window.confirm(`確定要刪除「${card.name}」嗎？`)) return

  try {
    await deleteDoc(doc(firestore, 'tarotCards', card.id))
    feedback.value = `已刪除「${card.name}」。`
    await loadCards()
  } catch (error) {
    console.error('[Firestore] Unable to delete tarot card.', error)
    feedback.value = '刪除失敗，請確認管理員權限。'
  }
}

async function importDefaultDeck() {
  if (!firestore || cards.value.length || importing.value) return

  importing.value = true
  try {
    const batch = writeBatch(firestore)
    defaultTarotDeck.forEach((card) => {
      const cardRef = doc(collection(firestore, 'tarotCards'))
      batch.set(cardRef, { ...card, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
    })
    await batch.commit()
    feedback.value = `已匯入 ${defaultTarotDeck.length} 張預設牌卡。`
    await loadCards()
  } catch (error) {
    console.error('[Firestore] Unable to import the default deck.', error)
    feedback.value = '匯入失敗，請確認管理員權限與 Firestore 規則。'
  } finally {
    importing.value = false
  }
}

async function initializeAdminPage() {
  adminEmail.value = firebaseAuth?.currentUser?.email ?? '已驗證帳號'
  await Promise.all([loadCards(), loadVisitorStats()])
}

onMounted(() => {
  void initializeAdminPage()
})
</script>

<template>
  <main class="admin-page">
    <nav class="admin-nav animate__animated animate__fadeInDown" aria-label="管理後台導覽">
      <NuxtLink class="brand" to="/">
        <span class="brand-mark">☾</span>
        <span>月之秘語<small>ADMIN CONSOLE</small></span>
      </NuxtLink>
      <div class="nav-actions">
        <NuxtLink class="nav-link" to="/">查看前台</NuxtLink>
        <button class="logout-button" type="button" :disabled="signingOut" @click="logout">
          {{ signingOut ? '登出中' : '登出' }}
        </button>
      </div>
    </nav>

    <section class="admin-content animate__animated animate__fadeInUp">
      <header>
        <p class="eyebrow"><span /> FIRESTORE BACK OFFICE</p>
        <h1>管理後台</h1>
        <p>{{ adminEmail }}</p>
      </header>

      <div class="status-grid">
        <article class="visitor-stat">
          <span class="stat-symbol" aria-hidden="true">◎</span>
          <p>訪客瀏覽次數統計</p>
          <strong>{{ loadingVisitorStats ? '讀取中…' : (visitorCount ?? 0).toLocaleString('zh-TW') }}</strong>
          <small>最後造訪：{{ lastVisitedAt }}</small>
        </article>
      </div>

      <section class="firestore-section">
        <div>
          <p class="section-label">DATABASE</p>
          <h2>Firestore 資料管理</h2>
        </div>
        <a :href="firebaseConsoleUrl" target="_blank" rel="noopener noreferrer">
          <span>開啟 Firestore Console</span>
          <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section class="card-manager">
        <div class="manager-heading">
          <div>
            <p class="section-label">TAROT CARDS</p>
            <h2>牌卡內容管理</h2>
          </div>
          <button
            v-if="!loadingCards && cards.length === 0"
            class="outline-button"
            type="button"
            :disabled="importing"
            @click="importDefaultDeck"
          >
            {{ importing ? '匯入中…' : '匯入預設牌組' }}
          </button>
        </div>

        <p v-if="feedback" class="feedback" role="status">{{ feedback }}</p>

        <form class="card-form" @submit.prevent="saveCard">
          <label>編號<input v-model="form.number" required placeholder="例如：XVII"></label>
          <label>中文名稱<input v-model="form.name" required placeholder="例如：星星"></label>
          <label>英文名稱<input v-model="form.english" required placeholder="例如：THE STAR"></label>
          <label>符號<input v-model="form.symbol" required maxlength="4" placeholder="✧"></label>
          <label class="wide">關鍵字<input v-model="form.keywords" required placeholder="希望 · 療癒 · 靈感"></label>
          <label class="wide">牌義<textarea v-model="form.meaning" required rows="3" /></label>
          <div class="form-actions wide">
            <button class="primary-action" type="submit" :disabled="saving">
              {{ saving ? '儲存中…' : editingId ? '儲存修改' : '新增牌卡' }}
            </button>
            <button v-if="editingId" class="outline-button" type="button" @click="resetForm">取消編輯</button>
          </div>
        </form>

        <p v-if="loadingCards" class="empty-state">正在讀取 Firestore…</p>
        <p v-else-if="cards.length === 0" class="empty-state">Firestore 尚無牌卡，可匯入預設牌組或自行新增。</p>
        <div v-else class="card-list">
          <article v-for="card in cards" :key="card.id" class="card-row">
            <span class="card-symbol">{{ card.symbol }}</span>
            <div>
              <strong>{{ card.number }} · {{ card.name }}</strong>
              <small>{{ card.english }} ｜ {{ card.keywords }}</small>
            </div>
            <div class="row-actions">
              <button type="button" @click="editCard(card)">編輯</button>
              <button class="danger" type="button" @click="removeCard(card)">刪除</button>
            </div>
          </article>
        </div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.admin-page { position: relative; display: grid; min-height: 100dvh; overflow-x: hidden; isolation: isolate; grid-template-rows: 72px minmax(0, 1fr); background: #090817; color: var(--ink); }
.admin-page::before { content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: .45; background-image: radial-gradient(circle, rgba(240,217,156,.72) 0 1px, transparent 1.5px), radial-gradient(circle, rgba(143,119,184,.4) 0 1px, transparent 1.5px); background-position: 5% 12%, 74% 20%; background-size: 150px 150px, 220px 220px; }
.admin-nav { display: flex; width: min(1080px, calc(100% - 48px)); height: 72px; margin: 0 auto; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(212,179,106,.12); }
.brand { display: flex; align-items: center; gap: 12px; color: var(--ink); font-family: 'Noto Serif TC', serif; font-size: 16px; letter-spacing: .14em; text-decoration: none; }
.brand-mark { display: grid; width: 37px; height: 37px; place-items: center; border: 1px solid var(--gold); border-radius: 50%; color: var(--gold-light); font: 22px Georgia, serif; }
.brand small { display: block; margin-top: 3px; color: var(--gold); font-family: 'DM Sans', sans-serif; font-size: 7px; letter-spacing: .23em; }
.nav-actions { display: flex; align-items: center; gap: 22px; }
.nav-link, .logout-button { border: 0; background: transparent; color: var(--muted); cursor: pointer; font-size: 12px; letter-spacing: .14em; text-decoration: none; }
.nav-link:hover, .logout-button:hover { color: var(--gold-light); }
.logout-button:disabled { cursor: wait; opacity: .6; }
.admin-content { width: min(1080px, calc(100% - 48px)); margin: 0 auto; padding: clamp(48px, 8vh, 80px) 0 72px; }
.eyebrow { display: flex; align-items: center; gap: 12px; margin: 0; color: var(--gold); font-size: 9px; letter-spacing: .3em; }
.eyebrow span { width: 34px; height: 1px; background: var(--gold); }
h1, h2 { margin: 0; font-family: 'Noto Serif TC', serif; font-weight: 600; }
h1 { margin-top: 14px; font-size: clamp(38px, 5vw, 58px); letter-spacing: .08em; }
header > p:last-child { margin: 10px 0 0; color: var(--muted); font-size: 12px; letter-spacing: .06em; }
.status-grid { display: grid; margin-top: 42px; grid-template-columns: minmax(0, 1fr); }
.status-grid article { position: relative; min-height: 130px; padding: 24px; border: 1px solid var(--line); background: rgba(20,17,42,.72); }
.stat-symbol { position: absolute; top: 20px; right: 22px; color: var(--gold); font-size: 20px; }
.status-grid p { margin: 0; color: var(--muted); font-size: 11px; letter-spacing: .1em; }
.status-grid strong { display: block; margin-top: 24px; color: var(--gold-light); font-family: 'Noto Serif TC', serif; font-size: 20px; font-weight: 500; letter-spacing: .1em; }
.visitor-stat strong { margin-top: 14px; font-family: 'DM Sans', sans-serif; font-size: 30px; letter-spacing: 0; }
.visitor-stat small { display: block; margin-top: 6px; color: var(--muted); font-size: 9px; line-height: 1.5; letter-spacing: .04em; }
.firestore-section { display: flex; margin-top: 20px; padding: 28px 30px; align-items: center; justify-content: space-between; gap: 30px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.section-label { margin: 0 0 8px; color: var(--gold); font-size: 9px; letter-spacing: .25em; }
.firestore-section h2 { font-size: 24px; letter-spacing: .08em; }
.firestore-section a { display: flex; min-width: 245px; padding: 13px 18px; align-items: center; justify-content: space-between; gap: 28px; border: 1px solid var(--gold); color: var(--gold-light); font-size: 11px; letter-spacing: .12em; text-decoration: none; transition: .2s ease; }
.firestore-section a:hover { background: var(--gold); color: #151129; transform: translateY(-2px); }
.card-manager { margin-top: 36px; padding: 30px; border: 1px solid var(--line); background: rgba(20,17,42,.72); }
.manager-heading { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.manager-heading h2 { font-size: 26px; letter-spacing: .08em; }
.feedback { margin: 22px 0 0; padding: 12px 14px; border-left: 2px solid var(--gold); background: rgba(212,179,106,.08); color: var(--gold-light); font-size: 12px; }
.card-form { display: grid; margin-top: 26px; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
.card-form label { display: grid; gap: 8px; color: var(--muted); font-size: 11px; letter-spacing: .08em; }
.card-form input, .card-form textarea { width: 100%; padding: 11px 12px; border: 1px solid var(--line); outline: none; background: rgba(7,6,18,.72); color: var(--ink); font: inherit; resize: vertical; }
.card-form input:focus, .card-form textarea:focus { border-color: var(--gold); box-shadow: 0 0 0 2px rgba(212,179,106,.1); }
.card-form .wide { grid-column: 1 / -1; }
.form-actions { display: flex; gap: 12px; }
.primary-action, .outline-button { min-height: 42px; padding: 0 18px; border: 1px solid var(--gold); cursor: pointer; font-size: 11px; letter-spacing: .1em; transition: .2s ease; }
.primary-action { background: var(--gold); color: #151129; }
.outline-button { background: transparent; color: var(--gold-light); }
.primary-action:hover:not(:disabled), .outline-button:hover:not(:disabled) { background: var(--gold-light); color: #151129; transform: translateY(-1px); }
.primary-action:disabled, .outline-button:disabled { cursor: wait; opacity: .6; }
.empty-state { margin: 28px 0 0; padding: 28px; border: 1px dashed var(--line); color: var(--muted); text-align: center; }
.card-list { display: grid; margin-top: 28px; gap: 10px; }
.card-row { display: grid; padding: 15px 16px; grid-template-columns: 46px minmax(0, 1fr) auto; gap: 14px; align-items: center; border: 1px solid var(--line); background: rgba(7,6,18,.42); }
.card-symbol { display: grid; width: 40px; height: 40px; place-items: center; border: 1px solid rgba(212,179,106,.35); color: var(--gold-light); font-size: 22px; }
.card-row strong, .card-row small { display: block; }
.card-row strong { font-family: 'Noto Serif TC', serif; font-size: 15px; letter-spacing: .06em; }
.card-row small { margin-top: 5px; color: var(--muted); font-size: 10px; letter-spacing: .05em; }
.row-actions { display: flex; gap: 8px; }
.row-actions button { padding: 8px 12px; border: 1px solid var(--line); background: transparent; color: var(--muted); cursor: pointer; }
.row-actions button:hover { border-color: var(--gold); color: var(--gold-light); }
.row-actions .danger:hover { border-color: #b96f78; color: #e7a4a4; }
@media (max-width: 700px) {
  .admin-page { height: auto; overflow-x: hidden; overflow-y: auto; }
  .admin-nav { width: calc(100% - 32px); height: 86px; align-items: flex-start; padding-top: 16px; }
  .nav-actions { align-items: flex-end; flex-direction: column; gap: 8px; }
  .admin-content { width: calc(100% - 40px); padding-top: 48px; }
  .status-grid { grid-template-columns: 1fr; }
  .firestore-section { padding: 25px 0; align-items: stretch; flex-direction: column; }
  .firestore-section a { min-width: 0; }
  .card-manager { padding: 22px 16px; }
  .manager-heading { align-items: stretch; flex-direction: column; }
  .card-form { grid-template-columns: 1fr; }
  .card-form .wide { grid-column: auto; }
  .card-row { grid-template-columns: 40px minmax(0, 1fr); }
  .row-actions { grid-column: 1 / -1; justify-content: flex-end; }
}
</style>
