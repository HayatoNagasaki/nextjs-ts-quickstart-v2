## このレポジトリについて

このレポジトリは Next.js プロジェクトを手っ取り早く開始するためのたたき台として使うことを目的に作っています。

以下の技術を使ったプロジェクトを想定しています。

- Next.js (version 13)
- TypeScript
- NextAuth.js
- Tailwind CSS
- Daisy UI
- Prisma

## ESLint と Prettier の関連ライブラリインストール

```
npm install --save-dev @typescript-eslint/eslint-plugin@5.48.1 eslint-config-prettier@8.6.0 eslint-plugin-simple-import-sort@8.0.0 prettier@2.8.3 npm-run-all@4.1.5
```

Tailwindcss のセットアップ

```
npm install --save-dev tailwindcss@3.2.4 postcss@8.4.21 autoprefixer@10.4.13

npx tailwindcss init -p
```
