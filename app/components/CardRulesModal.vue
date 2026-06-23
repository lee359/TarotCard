<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function close() {
  emit('update:modelValue', false)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

watch(() => props.modelValue, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', handleKeydown))

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <div v-if="modelValue" class="rules-overlay" role="presentation" @click.self="close">
        <article
          class="rules-dialog animate__animated animate__zoomIn animate__faster"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rules-title"
        >
          <button class="rules-close" type="button" aria-label="關閉規則說明" title="關閉" @click="close">
            <span aria-hidden="true">&times;</span>
          </button>

          <header>
            <p class="eyebrow"><span /> CARD READING GUIDE <span /></p>
            <h2 id="rules-title">塔羅占卜規則</h2>
            <p>寫下問題、選擇主題，再依直覺完成你的三張牌占卜。</p>
          </header>

          <div class="rules-content">
            <section>
              <b>01</b>
              <div><h3>開始占卜</h3><p>輸入 120 字以內的問題，並明確選擇「感情、事業、自我、今日指引」其中一個主題，才能開始抽牌。</p></div>
            </section>
            <section>
              <b>02</b>
              <div><h3>洗牌與牌位</h3><p>每次隨機抽出三張不重複的牌，依序代表「過去・根源」、「現在・課題」及「未來・指引」。</p></div>
            </section>
            <section>
              <b>03</b>
              <div><h3>正位與逆位</h3><p>每張牌會獨立以相同機率決定正位或逆位。逆位牌面上下顛倒，代表能量可能受阻、延遲或轉向內在。</p></div>
            </section>
            <section>
              <b>04</b>
              <div><h3>翻牌順序</h3><p>卡牌必須由左至右依序翻開。前一張牌尚未揭示時，下一張牌會維持鎖定並顯示提示。</p></div>
            </section>
            <section>
              <b>05</b>
              <div><h3>查看結果</h3><p>三張牌全部翻開後才能查看結果。結果會結合原始問題、牌位、卡牌名稱、正逆位及個別牌義。</p></div>
            </section>
            <section>
              <b>06</b>
              <div><h3>重新抽牌</h3><p>重新抽牌會沿用目前問題與主題，重新洗牌並判定正逆位，但不會重複增加本次流程的完成次數。</p></div>
            </section>
          </div>

          <footer role="note">
            <span aria-hidden="true">⚠</span>
            <strong>塔羅結果僅供自我探索與娛樂，不取代任何專業建議。</strong>
          </footer>
        </article>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.rules-overlay { position: fixed; inset: 0; z-index: 100; display: grid; padding: clamp(18px, 4vw, 42px); place-items: center; background: rgba(6,5,17,.8); backdrop-filter: blur(9px); }
.rules-dialog { position: relative; width: min(760px, 100%); max-height: min(86dvh, 760px); overflow-y: auto; padding: clamp(28px, 4vw, 48px); border: 1px solid var(--gold); background: radial-gradient(circle at 50% 0, rgba(86,64,129,.32), transparent 38%), linear-gradient(145deg, #211a3d, #0d0b20 72%); color: var(--ink); box-shadow: 0 35px 100px rgba(0,0,0,.55); }
.rules-dialog::before { content: ''; position: absolute; inset: 9px; pointer-events: none; border: 1px solid rgba(212,179,106,.14); }
.rules-close { position: absolute; top: 14px; right: 14px; z-index: 2; display: grid; width: 40px; height: 40px; padding: 0; place-items: center; border: 1px solid transparent; background: transparent; color: var(--muted); cursor: pointer; font: 30px/1 Arial, sans-serif; transition: .2s ease; }
.rules-close:hover { border-color: rgba(240,217,156,.45); background: rgba(240,217,156,.08); color: var(--gold-light); }
.rules-close:focus-visible { outline: 2px solid var(--gold-light); outline-offset: 2px; }
header { position: relative; text-align: center; }
.eyebrow { display: flex; margin: 0; align-items: center; justify-content: center; gap: 12px; color: var(--gold); font-size: 8px; letter-spacing: .28em; }
.eyebrow span { width: 28px; height: 1px; background: var(--gold); opacity: .6; }
h2 { margin: 12px 0 0; font-family: 'Noto Serif TC', serif; font-size: clamp(28px, 4vw, 40px); font-weight: 600; letter-spacing: .1em; }
header > p:last-child { margin: 10px 0 0; color: var(--muted); font-family: 'Noto Serif TC', serif; font-size: 13px; }
.rules-content { position: relative; display: grid; margin-top: 30px; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.rules-content section { display: grid; min-height: 132px; padding: 17px; grid-template-columns: 34px minmax(0, 1fr); gap: 10px; border: 1px solid var(--line); background: rgba(9,8,23,.46); }
.rules-content b { color: var(--gold); font-size: 10px; font-weight: 500; letter-spacing: .12em; }
.rules-content h3 { margin: 0; font-family: 'Noto Serif TC', serif; font-size: 15px; font-weight: 600; letter-spacing: .08em; }
.rules-content p { margin: 8px 0 0; color: #b8b1c0; font-size: 12px; line-height: 1.8; }
footer { position: relative; display: flex; margin-top: 24px; padding: 13px 16px; align-items: center; justify-content: center; gap: 10px; border: 1px solid rgba(212,179,106,.48); background: rgba(212,179,106,.1); color: var(--gold-light); font-size: 11px; line-height: 1.65; letter-spacing: .06em; text-align: center; box-shadow: inset 0 0 24px rgba(212,179,106,.04); }
footer span { color: var(--gold); font-size: 16px; }
footer strong { font-weight: 500; }
@media (max-width: 620px) {
  .rules-overlay { padding: 12px; align-items: end; }
  .rules-dialog { max-height: 88dvh; padding: 34px 20px 28px; }
  .rules-content { grid-template-columns: 1fr; }
  .rules-content section { min-height: 0; }
}
</style>
