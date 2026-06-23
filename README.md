# 專案主題：月之秘語（Luna Arcana）線上塔羅占卜

[![Nuxt](https://img.shields.io/badge/Nuxt-4.4.5-00DC82?logo=nuxt&logoColor=white)](https://nuxt.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.34-42B883?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-enabled-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.13.0-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Responsive](https://img.shields.io/badge/RWD-Mobile%20Friendly-8B6DB1?logo=css3&logoColor=white)](#5-功能與預期畫面)
[![GitHub last commit](https://img.shields.io/github/last-commit/lee359/nuxt-web?logo=github)](https://github.com/lee359/nuxt-web/commits/main)

## 1. 專案簡介

「月之秘語」是一個使用 **Nuxt 4、Vue 3、TypeScript、Firebase Authentication 與 Cloud Firestore** 建置的線上塔羅占卜網站。

使用者可輸入想釐清的問題，選擇「感情、事業、自我、今日指引」其中一個主題，再依序翻開代表過去、現在與未來的三張牌。每張牌會獨立產生正位或逆位，完成翻牌後可查看整體解讀與個別牌義。

專案亦包含管理員登入、Firestore 牌卡內容管理、訪客統計、占卜主題完成次數統計，以及桌面與手機版 RWD。

### 核心功能

- 問題輸入與四種占卜主題選擇。
- Fisher–Yates 隨機洗牌，每次抽出三張不重複牌卡。
- 過去／現在／未來三張牌陣。
- 每張牌獨立判定正位或逆位。
- 依序翻牌與誤觸提示動畫。
- 結果視窗顯示原始問題、正逆位與個別牌義。
- 規則說明視窗與神秘學動態背景。
- Firebase Authentication 管理員驗證。
- Firestore 牌卡 CRUD、訪客及主題完成次數統計。
- 桌面、平板與手機版響應式排版。

> 塔羅結果僅供自我探索與娛樂，不取代醫療、法律、財務或其他專業建議。

## 2. 環境需求

| 項目 | 建議版本或需求 |
| --- | --- |
| 作業系統 | Windows 10+／macOS 12+／Ubuntu 20.04+ |
| Node.js | 20 LTS 以上 |
| npm | 10 以上 |
| 瀏覽器 | 最新版 Chrome、Edge、Firefox 或 Safari |
| Firebase | Authentication 與 Cloud Firestore 專案 |
| Git | Clone 與版本控制使用 |

### 安裝 Node.js

前往 [Node.js 官方網站](https://nodejs.org/) 安裝 LTS 版本，完成後確認版本：

```powershell
node -v
npm -v
```

### Clone 專案與安裝套件

```powershell
git clone https://github.com/lee359/nuxt-web.git
cd nuxt-web
npm install
```

## 3. 環境變數與 Firebase 設定

### 建立 `.env`

在專案根目錄建立 `.env`，填入 Firebase Web App 設定：

```dotenv
NUXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NUXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NUXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

`.env` 含有本機環境設定，不應提交至 Git。若部署至 Vercel，請在專案的 Environment Variables 建立相同名稱。

### 啟用管理員登入

1. 在 Firebase Console 的 Authentication 啟用「電子郵件／密碼」。
2. 建立管理員帳號並複製該帳號 UID。
3. 在 Firestore 建立 `admins` collection。
4. 新增以管理員 UID 為文件 ID 的文件：

```text
admins/{Firebase Authentication UID}
├─ active: true
└─ email: "管理員信箱（選填）"
```

`admins` 文件不可由網站前端自行建立，避免一般使用者將自己提升為管理員。

### 部署 Firestore Rules

專案已透過 `firebase.json` 指定根目錄的 `firestore.rules`。可使用 Firebase CLI 登入並部署：

```powershell
npx firebase-tools login
npx firebase-tools deploy --only firestore:rules --project tarotcard-de49e
```

看到 `Deploy complete!` 才代表規則已成功部署。

## 4. 啟動與建置

### 開發模式

```powershell
npm run dev
```

開發伺服器預設位於 <http://localhost:3000>。若連接埠已被使用，Nuxt 會選擇其他可用連接埠。

### 正式建置

```powershell
npm run build
```

### 預覽正式版本

```powershell
npm run preview
```

### 產生靜態輸出

```powershell
npm run generate
```

### 常見問題

**Q：首頁顯示 Firebase 尚未設定？**

確認 `.env` 已建立、環境變數名稱正確，並重新啟動開發伺服器。

**Q：牌卡讀取失敗？**

確認 Firestore 已啟用且 Rules 已部署。占卜頁在遠端牌組無法使用或少於三張時，會改用內建牌組。

**Q：管理員無法登入後台？**

確認 Authentication 帳號已建立，且 Firestore 存在 `admins/{uid}`、`active` 為 `true`。

**Q：主題完成次數沒有增加？**

必須完成「輸入問題 → 點選主題 → 開始抽牌 → 翻完三張牌 → 查看結果」的完整流程，並確認最新 `firestore.rules` 已部署。

## 5. 功能與預期畫面

### 首頁 `/`

- 輸入 120 字以內的塔羅問題。
- 選擇感情、事業、自我或今日指引。
- 查看占卜規則、關於占卜及作者資訊。
- 只有問題與主題皆完成時，「開始抽牌」才會啟用。

### 占卜頁 `/reading`

- 依序翻開過去、現在與未來三張牌。
- 每張牌會以 50% 機率判定正位或逆位。
- 提前點擊未解鎖牌卡時會顯示順序提示。
- 三張牌翻完後可查看問題、整體訊息與個別牌義。

### 關於頁面

- `/about`：說明塔羅定位與使用原則。
- `/author`：顯示作者資料與個人網站連結。

### 管理後台 `/admin`

- 使用 Firebase Email/Password 登入。
- 只有 `admins/{uid}.active == true` 的帳號可進入。
- 新增、編輯、刪除及匯入塔羅牌資料。
- 查看訪客瀏覽次數與四種主題完成次數。
- 直接前往 Firebase Console 管理資料。

### RWD

首頁、占卜頁、關於頁與規則視窗皆包含手機版斷點設定；手機版採自然頁面高度與垂直捲動，避免固定 `100dvh` 導致內容裁切或元件重疊。

## 6. 專案結構

```text
nuxt-web/
├─ app/
│  ├─ assets/css/
│  │  └─ animate.min.css          # Animate.css 動畫套件
│  ├─ components/
│  │  ├─ AdminLoginModal.vue      # 管理員登入視窗
│  │  ├─ CardRulesModal.vue       # 塔羅規則說明視窗
│  │  ├─ MysticBackground.vue     # 神秘學幾何與月相動態背景
│  │  └─ TarotCard.vue            # 翻牌、正逆位、牌義及誤觸提示
│  ├─ composables/
│  │  └─ useAdminAccess.ts        # Firestore 管理員權限檢查
│  ├─ data/
│  │  └─ tarot.ts                 # 牌卡型別與預設牌組
│  ├─ middleware/
│  │  └─ admin.ts                 # /admin 路由保護
│  ├─ pages/
│  │  ├─ index.vue                # 首頁與占卜流程建立
│  │  ├─ reading.vue              # 三張牌占卜與結果
│  │  ├─ about.vue                # 關於占卜
│  │  ├─ author.vue               # 關於作者
│  │  └─ admin.vue                # Firebase 管理後台
│  ├─ plugins/
│  │  ├─ firebase.client.ts       # Firebase 初始化與注入
│  │  └─ visitor-tracking.client.ts # 工作階段訪客統計
│  └─ app.vue                     # Nuxt 根元件
├─ docs/
│  ├─ CardRules.md                # 卡牌與占卜規則
│  └─ project-structure.md        # 完整專案結構說明
├─ public/images/
│  └─ author-profile.png          # 作者頁主視覺
├─ .firebaserc                    # Firebase CLI 專案對應
├─ firebase.json                  # Firebase CLI 設定
├─ firestore.rules               # Firestore 安全規則
├─ nuxt.config.ts                # Nuxt、SEO、CSS 與環境設定
├─ package.json                  # scripts 與套件依賴
└─ README.md                     # 專案說明
```

完整檔案職責與路由關係請參閱 [`docs/project-structure.md`](docs/project-structure.md)。卡牌流程與判定規則請參閱 [`docs/CardRules.md`](docs/CardRules.md)。

## 7. Firestore 資料結構

```text
admins/{uid}
├─ active: boolean
└─ email: string（選填）

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

siteStats/topicSelections
├─ love: number
├─ career: number
├─ self: number
├─ daily: number
└─ lastCompletedAt: timestamp
```

## 8. 連結與參考資料

- GitHub Repository：<https://github.com/lee359/nuxt-web>
- [Nuxt 官方文件](https://nuxt.com/docs/getting-started/introduction)
- [Vue 官方文件](https://vuejs.org/guide/introduction.html)
- [Firebase Web 文件](https://firebase.google.com/docs/web/setup)
- [Shields.io Badge 產生器](https://shields.io/)
- [專案結構文件](docs/project-structure.md)
- [卡牌規則文件](docs/CardRules.md)

README badges 使用 [Shields.io](https://shields.io/) 產生。
