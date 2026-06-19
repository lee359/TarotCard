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
  disabled?: boolean
}>()

const emit = defineEmits<{ flip: [] }>()
</script>

<template>
  <article class="card-slot">
    <span class="position">{{ position }}</span>
    <button
      class="tarot-card"
      :class="{ revealed }"
      :disabled="disabled || revealed"
      :aria-label="revealed ? `${position}：${card?.name}` : `翻開${position}`"
      @click="emit('flip')"
    >
      <span
        class="card-motion animate__animated"
        :class="{ 'animate__flipInY': revealed }"
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

          <span class="card-face card-front">
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
    </button>
    <p v-if="revealed" class="mini-meaning">{{ card?.meaning }}</p>
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
  width: 100%; aspect-ratio: 2 / 3.2; padding: 0; border: 0; background: transparent;
  cursor: pointer; perspective: 1200px; border-radius: 8px;
}
.tarot-card:focus-visible { outline: 2px solid var(--gold-light); outline-offset: 8px; }
.tarot-card:disabled { cursor: default; }
.card-motion {
  display: block; width: 100%; height: 100%; --animate-duration: .9s; transform-origin: center;
}
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
.card-number { color: var(--gold); font-family: 'Noto Serif TC', serif; font-size: 12px; letter-spacing: .15em; }
.card-symbol { display: grid; flex: 1; place-items: center; color: var(--gold-light); font-family: Georgia, serif; font-size: clamp(68px, 9vw, 108px); line-height: 1; text-shadow: 0 0 35px rgba(240,217,156,.25); }
.card-name { font-family: 'Noto Serif TC', serif; font-size: clamp(20px, 2.4vw, 27px); font-weight: 600; letter-spacing: .16em; }
.card-english { margin-top: 5px; color: var(--gold); font-size: 9px; letter-spacing: .24em; }
.card-keywords { margin-top: 15px; padding-top: 13px; border-top: 1px solid var(--line); color: var(--muted); font-size: 11px; letter-spacing: .08em; }
.hint { margin: 14px 0 0; color: #747080; font-size: 12px; letter-spacing: .12em; }
.mini-meaning { margin: 14px auto 0; color: #c7c1cf; font-family: 'Noto Serif TC', serif; font-size: 13px; line-height: 1.8; }
@media (hover: hover) {
  .tarot-card:not(:disabled):hover .card-motion {
    animation-name: pulse;
    animation-duration: 1.35s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  .tarot-card:not(:disabled):hover .card-inner { transform: translateY(-10px) rotateZ(1deg); }
}
</style>
