<template>
  <div class="mystic-field" aria-hidden="true">
    <span class="mystic-aura" />
    <span class="ritual-circle ritual-circle-outer" />
    <span class="ritual-circle ritual-circle-inner" />
    <span class="orbit orbit-one" />
    <span class="orbit orbit-two" />
    <div class="moon-phases">
      <span>●</span><span>◐</span><span>○</span><span>◑</span><span>●</span>
    </div>
    <span class="mystic-glyph glyph-left">☿</span>
    <span class="mystic-glyph glyph-right">♄</span>
  </div>
</template>

<style scoped>
.mystic-field {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.mystic-aura {
  position: absolute;
  top: 48%;
  left: 50%;
  width: min(82vw, 980px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(101, 71, 151, .2), rgba(49, 34, 91, .08) 42%, transparent 69%);
  transform: translate(-50%, -50%);
}

.ritual-circle {
  position: absolute;
  top: 49%;
  left: 50%;
  aspect-ratio: 1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.ritual-circle-outer {
  width: min(74vw, 850px);
  opacity: .19;
  background: repeating-conic-gradient(from 3deg, rgba(212, 179, 106, .9) 0 1deg, transparent 1deg 15deg);
  mask: radial-gradient(circle, transparent 0 48.7%, #000 49% 49.6%, transparent 49.9% 53%, #000 53.2% 53.55%, transparent 53.8%);
  animation: mystic-rotate 90s linear infinite;
}

.ritual-circle-inner {
  width: min(49vw, 560px);
  opacity: .2;
  border: 1px solid rgba(212, 179, 106, .68);
  box-shadow: inset 0 0 70px rgba(96, 67, 145, .11), 0 0 48px rgba(96, 67, 145, .08);
  animation: mystic-breathe 8s ease-in-out infinite;
}

.ritual-circle-inner::before,
.ritual-circle-inner::after {
  content: '';
  position: absolute;
  inset: 14.6%;
  border: 1px solid rgba(162, 133, 199, .58);
}

.ritual-circle-inner::before { transform: rotate(45deg); }
.ritual-circle-inner::after { border-radius: 50%; }

.orbit {
  position: absolute;
  top: 49%;
  left: 50%;
  width: min(68vw, 780px);
  height: min(25vw, 280px);
  opacity: .17;
  border: 1px solid rgba(212, 179, 106, .72);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(13deg);
  animation: orbit-sway 12s ease-in-out infinite alternate;
}

.orbit-two {
  transform: translate(-50%, -50%) rotate(-24deg);
  animation-delay: -5s;
}

.moon-phases {
  position: absolute;
  top: clamp(74px, 12vh, 118px);
  left: 50%;
  display: flex;
  align-items: center;
  gap: clamp(18px, 3vw, 42px);
  color: rgba(212, 179, 106, .28);
  font: 13px Georgia, serif;
  letter-spacing: 0;
  transform: translateX(-50%);
}

.moon-phases::before,
.moon-phases::after {
  content: '';
  width: clamp(36px, 6vw, 76px);
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212, 179, 106, .3));
}

.moon-phases::after { transform: rotate(180deg); }

.mystic-glyph {
  position: absolute;
  bottom: 9%;
  color: rgba(162, 133, 199, .12);
  font: clamp(58px, 8vw, 112px) Georgia, serif;
  animation: glyph-float 9s ease-in-out infinite alternate;
}

.glyph-left { left: 5%; }
.glyph-right { right: 6%; animation-delay: -4s; }

@keyframes mystic-rotate {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@keyframes mystic-breathe {
  0%, 100% { opacity: .15; transform: translate(-50%, -50%) scale(.98); }
  50% { opacity: .25; transform: translate(-50%, -50%) scale(1.02); }
}

@keyframes orbit-sway {
  from { opacity: .11; }
  to { opacity: .21; }
}

@keyframes glyph-float {
  to { transform: translateY(-12px); }
}

@media (max-width: 760px) {
  .ritual-circle-outer { width: 126vw; }
  .ritual-circle-inner { width: 82vw; }
  .orbit { width: 116vw; height: 44vw; }
  .moon-phases { gap: 13px; }
  .mystic-glyph { opacity: .65; }
}

@media (prefers-reduced-motion: reduce) {
  .ritual-circle,
  .orbit,
  .mystic-glyph { animation: none; }
}
</style>
