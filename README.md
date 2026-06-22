# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Firebase 後台設定

1. 複製 `.env.example` 為 `.env`，填入 Firebase Web App 設定。
2. 在 Firebase Console 的 Authentication 啟用「電子郵件/密碼」，並建立管理員帳號。
3. 複製該帳號的 UID。
4. 在 Firestore 建立 `admins` collection，新增以 UID 為文件 ID 的文件：

```text
admins/{Firebase Authentication UID}
  active: true
  email: "管理員信箱（選填）"
```

`admins` 文件不能由網站自行建立，避免一般使用者將自己升級為管理員。

部署 Firestore 規則前，先登入 Firebase CLI 並選擇正確專案：

```bash
npx firebase-tools login
npx firebase-tools use tarotcard-de49e
npx firebase-tools deploy --only firestore:rules
```

完成後，從首頁 footer 的「管理員登入」進入後台。第一次可使用「匯入預設牌組」建立 `tarotCards` 資料；占卜頁會優先使用 Firestore 牌組，讀取失敗或少於三張時使用內建牌組。
