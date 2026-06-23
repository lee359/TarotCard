# 月之秘語專案結構

本專案使用 **Nuxt 4、Vue 3、TypeScript、Firebase Authentication 與 Cloud Firestore** 建置，提供塔羅占卜前台、作者頁面，以及具身分驗證的牌卡管理後台。

## 目錄結構

```text
nuxt-web/
├─ app/
│  ├─ assets/
│  │  └─ css/
│  │     └─ animate.min.css       # Animate.css 動畫套件
│  ├─ components/
│  │  ├─ AdminLoginModal.vue      # 管理員登入視窗
│  │  ├─ CardRulesModal.vue       # 塔羅規則說明彈出視窗
│  │  ├─ MysticBackground.vue     # 共用神秘學幾何與月相動態背景
│  │  └─ TarotCard.vue            # 塔羅卡翻牌、正逆位牌面、牌義及誤觸提示
│  ├─ composables/
│  │  └─ useAdminAccess.ts        # 查詢 Firestore 管理員權限
│  ├─ data/
│  │  └─ tarot.ts                 # 牌卡型別與預設塔羅牌組
│  ├─ middleware/
│  │  └─ admin.ts                 # /admin 路由驗證與權限檢查
│  ├─ pages/
│  │  ├─ about.vue                # 關於占卜頁面：/about
│  │  ├─ admin.vue                # 牌卡管理後台：/admin
│  │  ├─ author.vue               # 關於作者頁面：/author
│  │  ├─ index.vue                # 首頁：問題輸入、主題選擇與占卜流程建立
│  │  └─ reading.vue              # 三張牌占卜、正逆位抽取與結果解讀
│  ├─ plugins/
│  │  ├─ firebase.client.ts       # Firebase、Auth 與 Firestore 初始化
│  │  └─ visitor-tracking.client.ts # 每個前台工作階段記錄一次造訪
│  └─ app.vue                     # Nuxt 應用程式根元件
├─ docs/
│  ├─ CardRules.md                # 塔羅占卜與卡牌操作規則
│  └─ project-structure.md        # 本文件
├─ public/
│  ├─ images/
│  │  └─ author-profile.png       # 作者頁主視覺圖片
│  ├─ favicon.ico                 # 網頁圖示
│  └─ robots.txt                  # 搜尋引擎爬蟲設定
├─ .firebaserc                    # Firebase CLI 專案別名與專案 ID 對應
├─ firebase.json                  # Firebase CLI 與 Firestore 規則設定
├─ firestore.rules               # Firestore 存取安全規則
├─ nuxt.config.ts                # Nuxt、SEO、CSS、Firebase 環境變數設定
├─ package.json                  # npm 指令與套件依賴
├─ package-lock.json             # npm 套件版本鎖定
├─ README.md                     # 專案基本說明
└─ tsconfig.json                 # TypeScript 設定
```

下列項目由本機或建置流程產生，不列入版本控制：

```text
.env                             # 本機 Firebase 環境變數，不可提交
node_modules/                    # npm 套件
.nuxt/                           # Nuxt 開發與型別產物
.output/                         # Nuxt 正式建置產物
```

## 核心頁面

### `app/pages/index.vue`

網站首頁，提供塔羅問題輸入、占卜主題選擇與主要導覽。

- 使用者必須填寫問題並明確選擇主題，才會啟用「開始抽牌」。
- 問題最多 120 個字，會透過 `question` query 傳入 `/reading`。
- 建立一次性的 `flow` 識別碼，供完整占卜流程與主題完成次數統計使用。
- 導向 `/reading` 開始三張牌占卜。
- 導覽依序提供「規則說明」、「關於占卜」與「關於作者」。
- 點擊「規則說明」會開啟 `CardRulesModal.vue`，可透過右上角關閉鍵、背景或 Esc 離開。
- Footer 中央提供「管理員登入」，開啟 `AdminLoginModal.vue`。
- 中央月亮圓環具有環繞擺動動畫。
- 手機版改用自然頁面高度與垂直捲動，並放大導覽、輸入框、主題按鈕及主要操作區域。
- 網頁標題固定由 `nuxt.config.ts` 設定為「月之秘語 | 塔羅占卜」。

### `app/pages/reading.vue`

三張牌占卜頁面，依序呈現「過去、現在、未來」，並處理問題與牌面方向。

- 從 `/reading?topic=...&question=...&flow=...` 取得主題、問題與流程識別碼。
- 使用 `TarotCard.vue` 顯示三張隨機牌卡，每次洗牌會分別產生固定的正位或逆位狀態。
- 逆位牌會以上下顛倒的牌面呈現，並提供能量受阻、延遲或轉向內在的解讀提示。
- 必須由左至右依序翻牌；誤觸尚未解鎖的牌卡時會晃動並顯示提示。
- 三張牌翻完後顯示「查看結果」按鈕，不會自動彈出結果視窗。
- 點擊按鈕後開啟結果視窗，顯示原始問題、三張牌的正逆位及個別摘要，可透過右上角關閉按鈕退出。
- 重新抽牌時會重新產生三張牌及其正逆位狀態。
- 手機版將標題與「查看結果」改為單欄排列，清除桌面 Grid 定位，避免按鈕與其他內容重疊。

### `app/pages/author.vue`

作者介紹頁面，使用 `/images/author-profile.png` 作為主視覺，內容包含：

- 李東恩，LI, DONG-EN
- 中原大學電機工程學系
- Taiwan
- 2022 – 在學
- 個人網站：<https://web-project-seven-lyart.vercel.app/>

### `app/pages/about.vue`

說明塔羅占卜概念與三張牌陣的使用方式。

- 手機版使用自然頁面高度及垂直捲動，確保標題、說明卡片與 Footer 均可完整查看。
- 三張占卜原則卡片在窄螢幕下改為單欄排列。

### `app/pages/admin.vue`

管理員牌卡後台，套用 `admin` middleware，並設定為僅在客戶端渲染。

- 顯示目前通過驗證的管理員帳號。
- 顯示訪客累計瀏覽次數與最後造訪時間。
- 讀取 Firestore `tarotCards` collection。
- 新增、編輯與刪除塔羅牌資料。
- 資料庫為空時可匯入 `app/data/tarot.ts` 的預設牌組。
- 提供 Firebase Console 連結與登出功能。

## 共用模組

### `app/components/MysticBackground.vue`

非管理頁面共用的神秘學背景元件，使用儀式圓、星盤刻度、交錯軌道、月相及行星符號建立視覺層次。

- 套用於 `index.vue`、`reading.vue`、`about.vue` 與 `author.vue` 的主要 section。
- 使用緩慢旋轉、呼吸與漂浮動畫，避免干擾前景內容操作。
- 支援 `prefers-reduced-motion`，使用者要求減少動態效果時會停止背景動畫。
- `admin.vue` 不套用此背景。

### `app/components/TarotCard.vue`

單張塔羅牌元件，負責卡牌正反面、正逆位牌面方向、翻牌動畫、滑鼠浮動效果與點擊狀態。翻牌後會顯示「正位／逆位」及對應的簡短牌義；未依順序翻牌時會晃動並顯示文字提示。

正逆位由 `reading.vue` 在每次洗牌時產生，再透過 `reversed` prop 傳入本元件。此狀態只屬於當次占卜，不會寫回 `tarotCards` 或改變 Firestore 牌卡資料結構。

### `app/components/AdminLoginModal.vue`

使用 Firebase Authentication 的 Email/Password 登入。登入後會查詢 Firestore `admins/{uid}`，只有 `active: true` 的帳號能進入 `/admin`。

### `app/components/CardRulesModal.vue`

由首頁「規則說明」按鈕開啟的塔羅規則視窗，內容參考 `docs/CardRules.md`，包含開始占卜、洗牌牌位、正逆位、翻牌順序、查看結果與重新抽牌等規則。

- 使用 `Teleport` 將視窗掛載至 `body`，避免受到首頁版面層級限制。
- 支援右上角關閉鍵、點擊背景及 Esc 鍵關閉。
- 開啟期間鎖定背景頁面捲動。
- 手機版內容可垂直捲動。
- Footer 使用高亮警示區塊，提醒塔羅結果不取代專業建議。

### `app/plugins/firebase.client.ts`

從 Nuxt public runtime config 讀取 Firebase 設定，初始化並注入：

- `$firebaseApp`
- `$firebaseAuth`
- `$firestore`
- `$db`（`$firestore` 的別名）

若環境變數不完整，外掛會顯示警告並提供 `null`，避免首頁直接產生 500 錯誤。

### `app/composables/useAdminAccess.ts`

讀取 `admins/{uid}` 文件，確認使用者存在且 `active` 為 `true`。

### `app/middleware/admin.ts`

保護 `/admin` 路由。未登入或不具管理員權限時會導回首頁並開啟登入視窗；無權限帳號也會被登出。

### `app/data/tarot.ts`

定義 `TarotCardData` 型別及預設塔羅牌組，供占卜頁面與後台首次匯入使用。

## Firebase 設定

`nuxt.config.ts` 透過 public runtime config 對應下列環境變數：

```text
NUXT_PUBLIC_FIREBASE_API_KEY
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NUXT_PUBLIC_FIREBASE_PROJECT_ID
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NUXT_PUBLIC_FIREBASE_APP_ID
NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

本機將值放在 `.env`；部署至 Vercel 時，需在專案的 Environment Variables 建立相同名稱。Firebase Web API Key 會傳送至瀏覽器，實際資料安全由 Authentication、Firestore Rules 與 Firebase API Key 限制共同控管。

`.firebaserc` 保存 Firebase CLI 使用的專案別名，並將其對應至 Firebase 專案 `tarotcard-de49e`；`firebase.json` 則指定部署時使用根目錄的 `firestore.rules`。

### Firestore Collections

```text
admins/{uid}
├─ active: boolean
└─ 供前端與安全規則判斷管理員資格

tarotCards/{cardId}
├─ number: string
├─ name: string
├─ english: string
├─ symbol: string
├─ keywords: string
├─ meaning: string
├─ createdAt: timestamp
└─ updatedAt: timestamp

siteStats/visitors
├─ count: number
└─ lastVisitedAt: timestamp
```

`firestore.rules` 允許所有使用者讀取 `tarotCards`，但只有通過 `admins/{uid}.active == true` 驗證的使用者能新增、更新或刪除牌卡。訪客只能將 `siteStats/visitors` 的計數增加一，統計內容僅管理員可讀；管理員文件不可由前端自行建立或修改。

## 路由關係

```text
/
├─ 填寫問題並選擇主題
├─ 規則說明
│  └─ CardRulesModal.vue
├─ /reading?topic=主題&question=使用者問題&flow=流程識別碼
│  └─ TarotCard.vue × 3
├─ /about
├─ /author
│  └─ public/images/author-profile.png
└─ 管理員登入視窗
   └─ Firebase Authentication
      └─ Firestore admins/{uid} 權限驗證
         └─ /admin
            └─ Firestore tarotCards CRUD
```

## 開發指令

```powershell
npm install
npm run dev
npm run build
npm run preview
```

開發伺服器預設位於 <http://localhost:3000>；若連接埠已使用，Nuxt 會自動改用其他可用連接埠。
