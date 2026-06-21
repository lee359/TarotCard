# 月之秘語專案結構

本專案使用 **Nuxt 4、Vue 3 與 TypeScript** 製作，主題為線上塔羅牌占卜。

## 專案樹狀圖

```text
nuxt-web/
├── app/
│   ├── components/
│   │   └── TarotCard.vue          # 塔羅牌正反面、翻牌動畫與單張牌義
│   ├── assets/
│   │   └── css/
│   │       └── animate.min.css    # Animate.css v4.1.1 官方動畫資源
│   ├── pages/
│   │   ├── about.vue              # 關於占卜的獨立頁面
│   │   ├── author.vue             # 作者資料、主視覺與個人網站入口
│   │   ├── index.vue              # 首頁主視覺與占卜主題選擇
│   │   └── reading.vue            # 三張牌翻牌與解讀頁面
│   ├── plugin/
│   │   └── firebase.client.ts     # 僅在瀏覽器載入的 Firebase 外掛
│   └── app.vue                    # Nuxt 根元件與全域樣式
├── doc/
│   └── project-structure.md       # 本文件
├── public/
│   ├── images/
│   │   └── author-profile.png     # 作者頁主視覺圖片
│   ├── favicon.ico                # 網站頁籤圖示
│   └── robots.txt                 # 搜尋引擎爬蟲規則
├── .env                           # Firebase 等環境變數，不應提交敏感資料
├── .gitignore                     # Git 忽略規則
├── nuxt.config.ts                 # Nuxt、SEO、語系及頁面標頭設定
├── package.json                   # 專案資訊、套件及 npm 指令
├── package-lock.json              # npm 套件版本鎖定檔
├── pnpm-lock.yaml                 # pnpm 套件版本鎖定檔
├── pnpm-workspace.yaml            # pnpm 工作區設定
├── README.md                      # 專案基本說明
└── tsconfig.json                  # TypeScript 設定
```

安裝套件或執行建置後，專案還可能包含以下自動產生的目錄：

```text
nuxt-web/
├── node_modules/                  # 已安裝的第三方套件
├── .nuxt/                         # Nuxt 開發與型別產物
└── .output/                       # npm run build 產生的正式環境輸出
```

這些目錄不屬於主要原始碼，通常不應手動修改或提交至 Git。

## 核心檔案說明

### `app/app.vue`

應用程式的根元件，透過 `<NuxtPage />` 顯示目前路由頁面，並定義全站色彩、字體與基礎樣式。

### `app/pages/index.vue`

Nuxt 檔案式路由的首頁，對應網站 `/` 路徑，負責：

- 感情、事業、自我與今日指引的主題選擇
- 將使用者導向 `/reading`
- 首頁主視覺、導覽與網站入口
- 提供前往 `/author` 與 `/about` 的導覽連結
- 頁面的 SEO 標題與描述

### `app/pages/reading.vue`

獨立的三張牌翻牌頁面，對應網站 `/reading` 路徑，負責：

- 從 `/reading?topic=感情` 這類網址讀取占卜主題
- 洗牌及隨機抽取三張牌
- 過去、現在、未來的依序翻牌流程
- 單張牌義與整體占卜訊息
- 重新抽牌及返回首頁更換主題

### `app/pages/about.vue`

獨立的「關於占卜」頁面，對應網站 `/about` 路徑，說明塔羅牌占卜的定位、使用提醒與三個閱讀原則。

### `app/pages/author.vue`

獨立的「關於作者」頁面，對應網站 `/author` 路徑，負責：

- 顯示作者姓名「李東恩」及英文名「LI, DONG-EN」
- 顯示中原大學電機工程學系、Taiwan 與 2022－在學等作者資料
- 使用 `/images/author-profile.png` 作為作者主視覺
- 提供前往 <https://web-project-seven-lyart.vercel.app/> 的個人網站連結
- 以桌面雙欄與行動裝置上下排列呈現響應式版面

### `app/components/TarotCard.vue`

可重複使用的塔羅牌元件。接收牌卡內容、位置及翻牌狀態，顯示牌背、牌面、關鍵字與解讀，並向父層頁面傳送翻牌事件。

### `app/assets/css/animate.min.css`

取自 [Animate.css 官方 GitHub v4.1.1](https://github.com/animate-css/animate.css/tree/v4.1.1) 的本地動畫樣式。網站使用其進場、縮放、脈動與離場動畫，並透過 `nuxt.config.ts` 全域載入。

### `app/plugin/firebase.client.ts`

建立 Firebase App 與 Firestore 實例。檔名中的 `.client` 表示此外掛只在瀏覽器端執行，避免伺服器端渲染時使用瀏覽器專屬功能。

### `nuxt.config.ts`

Nuxt 的主要設定檔，目前包含相容日期、開發工具、繁體中文語系、行動裝置 viewport 與瀏覽器主題色。

### `public/`

放置不需經過 Vite 處理的公開靜態檔案。此目錄內的檔案會直接對應網站根路徑，例如 `public/favicon.ico` 可透過 `/favicon.ico` 存取，`public/images/author-profile.png` 則可透過 `/images/author-profile.png` 存取。

## 執行方式

在專案根目錄安裝套件並啟動開發伺服器：

```powershell
npm install
npm run dev
```

"ctrl + C" 可停止開發伺服器

開啟 <http://localhost:3000> 即可查看網站。

建立正式環境版本：

```powershell
npm run build
```

預覽正式環境版本：

```powershell
npm run preview
```

## Nuxt 路由關係

```text
瀏覽器請求 /
    └── Nuxt app/app.vue
        └── <NuxtPage />
            └── app/pages/index.vue

瀏覽器請求 /about
    └── Nuxt app/app.vue
        └── <NuxtPage />
            └── app/pages/about.vue

瀏覽器請求 /author
    └── Nuxt app/app.vue
        └── <NuxtPage />
            └── app/pages/author.vue
                └── public/images/author-profile.png

瀏覽器請求 /reading
    └── Nuxt app/app.vue
        └── <NuxtPage />
            └── app/pages/reading.vue
                └── app/components/TarotCard.vue × 3
```

Nuxt 會依照 `app/pages/` 的檔案結構自動建立路由，因此不需要另外維護路由設定檔。
