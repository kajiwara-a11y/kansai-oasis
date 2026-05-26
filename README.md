# 阪急OASIS · AI 先導型モバイルアプリ プロトタイプ

Interactive prototype for Hankyu OASIS supermarket mobile app — variant C (AI-led).
Built with React 18 + Babel-standalone, served as static files (no build step).

## Pages

- `/` → `Prototype.html` — interactive prototype (5 tabs + sub screens)
- `/App.html` — design canvas (13 screens + 3-variant comparison)
- `/Admin.html` — admin console (2 variants)

## Local

Open `Prototype.html` directly in a browser, or run any static server:

```sh
npx serve .
```

## Deploy

Pushed to Vercel as a static site. `vercel.json` rewrites `/` → `/Prototype.html`.
