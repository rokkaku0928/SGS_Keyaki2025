# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 使用上の注意
このWebサイトに使われてるjsQRというQRコードを読み取るときに使うライブラリがhttpsの通信方式でしか作動しない関係でこのプログラムをローカルホストで立ち上げるには、自著署名証明書を作ってもらう必要がある。
## 実行するコマンドの順序
(以下のコマンドはこのリポジトリが入ってるフォルダ内にターミナルで入ってその中で実行してね)

1.choco install mkcert
2.mkcert -install
3.mkcert localhost

この順序でコマンドを打てばフォルダ内にlocalhost.pemとかができるはず
そしてnpm run devとかやったらすんなり動く（はず）。

注：最初のコマンドchocoはChocolateyといってWindows向けに開発されたオープンソースのパッケージ管理システムです。じつはこのインストールにもかなり骨が折れた（個人的に）なんですがこれを読んでる人はすんなりできると信じて祈るばかりです。

# 追記(自環境(Muuu-ame)以外の動作が確認できていないことを留意、また使用者本人のバージョンに合わせて対応すること)

## 開発環境

- Node.js: 24.22.3
- npm: 11.19.1
- React: 19
- Vite: 7.3.8

## セットアップ

### 1. Node.jsのバージョンを切り替え

nvm-windowsを使用する場合：

```powershell
nvm install 24.22.3
nvm use 24.22.3
```

### 2. 依存関係をインストール

```powershell
npm ci
```

### 3. 開発サーバーを起動

```powershell
npm run dev
```

### 4. 本番ビルド

```powershell
npm run build
```
