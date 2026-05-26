# 阪急OASIS · AI 先導型モバイルアプリ プロトタイプ

Interactive prototype for Hankyu OASIS supermarket mobile app — variant C (AI-led).
React 18 + Babel-standalone, served as static files (no build step).

## Screens

5 tabs (home / flyer / coupon / recipe / mypage) + 8 sub-screens
(product / shopping-list / aisle-map / recipe-detail / ai-chat / search / notif / barcode).

## Local

Open `Prototype.html` directly in a browser, or run any static server:

```sh
npx serve .
```

## Deploy

Hosted on Vercel — `vercel.json` rewrites `/` → `/Prototype.html`.
Redeploy: `npx vercel --prod`.
