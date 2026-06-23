<script setup lang="ts">
type TarotCard = {
  number: string
  name: string
  english: string
  symbol: string
  keywords: string
  meaning: string
}

const props = defineProps<{
  card?: TarotCard
  position: string
  revealed: boolean
  reversed?: boolean
  disabled?: boolean
  lockedMessage?: string
  clearFeedbackSignal?: number
}>()

const emit = defineEmits<{ flip: [] }>()
const feedbackVisible = ref(false)
const shakeActive = ref(false)
let feedbackTimer: ReturnType<typeof setTimeout> | undefined
let shakeTimer: ReturnType<typeof setTimeout> | undefined

function showLockedFeedback() {
  clearTimeout(feedbackTimer)
  clearTimeout(shakeTimer)
  feedbackVisible.value = true
  shakeActive.value = false

  requestAnimationFrame(() => {
    shakeActive.value = true
    shakeTimer = setTimeout(() => {
      shakeActive.value = false
    }, 650)
  })

  feedbackTimer = setTimeout(() => {
    feedbackVisible.value = false
  }, 3000)
}

function handleCardClick() {
  if (props.revealed) return

  if (props.disabled) {
    showLockedFeedback()
    return
  }

  emit('flip')
}

onBeforeUnmount(() => {
  clearTimeout(feedbackTimer)
  clearTimeout(shakeTimer)
})

watch(() => props.clearFeedbackSignal, () => {
  clearTimeout(feedbackTimer)
  clearTimeout(shakeTimer)
  shakeActive.value = false
  feedbackVisible.value = false
})
</script>

<template>
  <article class="card-slot">
    <span class="position">{{ position }}</span>
    <button
      class="tarot-card"
      :class="{ revealed, locked: disabled && !revealed }"
      :disabled="revealed"
      :aria-label="revealed ? `${position}：${card?.name}${reversed ? '逆位' : '正位'}` : disabled ? `${position}尚未能翻開，點擊查看順序提示` : `翻開${position}`"
      @click="handleCardClick"
    >
      <span
        class="card-motion animate__animated"
        :class="{ 'animate__flipInY': revealed, 'animate__headShake': shakeActive }"
      >
        <span class="card-inner">
          <span class="card-face card-back" aria-hidden="true">
            <span class="corner-star">✦</span>
            <span class="orbit orbit-one" />
            <span class="orbit orbit-two" />
            <span class="back-moon">☾</span>
            <span class="back-title">LUNA ARCANA</span>
            <span class="corner-star bottom">✦</span>
          </span>

          <span class="card-face card-front" :class="{ reversed }">
            <span class="card-number">{{ card?.number }}</span>
            <span
              class="card-symbol"
              :class="{ 'animate__animated animate__zoomIn': revealed }"
              aria-hidden="true"
            >{{ card?.symbol }}</span>
            <span class="card-name">{{ card?.name }}</span>
            <span class="card-english">{{ card?.english }}</span>
            <span class="card-keywords">{{ card?.keywords }}</span>
          </span>
        </span>
      </span>

      <Transition name="misclick-fade">
        <span v-if="feedbackVisible && lockedMessage" class="misclick-message" role="status">
          {{ lockedMessage }}
        </span>
      </Transition>
    </button>
    <p v-if="revealed" class="mini-meaning">
      <strong>{{ reversed ? '逆位' : '正位' }}</strong>
      {{ reversed ? `這份能量正處於受阻或內化狀態。${card?.meaning ?? ''}` : card?.meaning }}
    </p>
    <p v-else class="hint">點擊翻牌</p>
  </article>
</template>

<style scoped>
.card-slot { width: min(100%, 260px); text-align: center; }
.position {
  display: block; margin-bottom: 16px; color: var(--gold-light); font-size: 12px;
  letter-spacing: .28em; text-transform: uppercase;
}
.tarot-card {
  position: relative; width: 100%; aspect-ratio: 2 / 3.2; padding: 0; border: 0; background: transparent;
  cursor: pointer; perspective: 1200px; border-radius: 8px;
}
.tarot-card:focus-visible { outline: 2px solid var(--gold-light); outline-offset: 8px; }
.tarot-card:disabled, .tarot-card.locked { cursor: pointer; }
.card-motion {
  display: block; width: 100%; height: 100%; --animate-duration: .9s; transform-origin: center;
}
.locked .card-motion.animate__headShake { --animate-duration: .55s; }
.card-inner {
  position: relative; display: block; width: 100%; height: 100%; transition: transform .8s cubic-bezier(.2,.7,.2,1);
  transform-style: preserve-3d;
}
.revealed .card-inner { transform: rotateY(180deg); }
.card-face {
  position: absolute; inset: 0; display: flex; overflow: hidden; border: 1px solid var(--gold);
  border-radius: 8px; backface-visibility: hidden; box-shadow: 0 22px 60px rgba(0,0,0,.38);
}
.card-face::after { content: ''; position: absolute; inset: 7px; border: 1px solid var(--line); border-radius: 4px; pointer-events: none; }
.card-back {
  align-items: center; justify-content: center; flex-direction: column; gap: 10px;
  background: radial-gradient(circle at center, #302557 0 2%, transparent 3%), repeating-radial-gradient(ellipse at center, transparent 0 24px, rgba(212,179,106,.14) 25px 26px), #100d25;
}
.corner-star { position: absolute; top: 22px; color: var(--gold); font-size: 16px; }
.corner-star.bottom { top: auto; bottom: 22px; }
.orbit { position: absolute; width: 66%; aspect-ratio: 1; border: 1px solid rgba(212,179,106,.35); border-radius: 50%; }
.orbit-one { transform: rotate(28deg) scaleY(.42); }
.orbit-two { transform: rotate(-28deg) scaleY(.42); }
.back-moon { z-index: 1; font-family: serif; color: var(--gold-light); font-size: clamp(48px, 6vw, 72px); text-shadow: 0 0 22px rgba(240,217,156,.3); }
.back-title { z-index: 1; color: var(--gold); font-size: 9px; letter-spacing: .25em; }
.card-front {
  transform: rotateY(180deg); align-items: center; flex-direction: column; padding: 22px 18px;
  background: radial-gradient(circle at 50% 38%, rgba(212,179,106,.18), transparent 42%), linear-gradient(160deg, #292047, #121027 68%);
}
.card-front.reversed { transform: rotateY(180deg) rotate(180deg); }
.card-number { color: var(--gold); font-family: 'Noto Serif TC', serif; font-size: 12px; letter-spacing: .15em; }
.card-symbol { display: grid; flex: 1; place-items: center; color: var(--gold-light); font-family: Georgia, serif; font-size: clamp(68px, 9vw, 108px); line-height: 1; text-shadow: 0 0 35px rgba(240,217,156,.25); }
.card-name { font-family: 'Noto Serif TC', serif; font-size: clamp(20px, 2.4vw, 27px); font-weight: 600; letter-spacing: .16em; }
.card-english { margin-top: 5px; color: var(--gold); font-size: 9px; letter-spacing: .24em; }
.card-keywords { margin-top: 15px; padding-top: 13px; border-top: 1px solid var(--line); color: var(--muted); font-size: 11px; letter-spacing: .08em; }
.misclick-message {
  position: absolute; inset: 50% 16px auto; z-index: 4; display: block; padding: 14px 12px;
  border-top: 1px solid rgba(240,217,156,.5); border-bottom: 1px solid rgba(240,217,156,.5);
  background: rgba(9,8,23,.9); color: var(--gold-light); font-family: 'Noto Serif TC', serif;
  font-size: clamp(12px, 1.4vw, 14px); letter-spacing: .06em; line-height: 1.7; white-space: pre-line;
  transform: translateY(-50%);
  box-shadow: 0 10px 32px rgba(0,0,0,.38); pointer-events: none;
}
.misclick-fade-enter-active { transition: opacity .2s ease; }
.misclick-fade-leave-active { transition: opacity 1.15s ease; }
.misclick-fade-enter-from, .misclick-fade-leave-to { opacity: 0; }
.hint { margin: 14px 0 0; color: #747080; font-size: 12px; letter-spacing: .12em; }
.mini-meaning { margin: 14px auto 0; color: #c7c1cf; font-family: 'Noto Serif TC', serif; font-size: 13px; line-height: 1.8; }
.mini-meaning strong { display: block; margin-bottom: 3px; color: var(--gold); font-size: 10px; font-weight: 500; letter-spacing: .16em; }
@media (hover: hover) {
  .tarot-card:not(:disabled):hover .card-motion {
    animation-name: pulse;
    animation-duration: 1.35s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  .tarot-card:not(:disabled):hover .card-inner { transform: translateY(-10px) rotateZ(1deg); }
  .tarot-card.locked:hover .card-motion.animate__headShake {
    animation-name: headShake;
    animation-duration: .55s;
    animation-iteration-count: 1;
  }
}
</style>
