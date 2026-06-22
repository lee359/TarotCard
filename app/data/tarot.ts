export type TarotCardData = {
  id?: string
  number: string
  name: string
  english: string
  symbol: string
  keywords: string
  meaning: string
}

export const defaultTarotDeck: TarotCardData[] = [
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
