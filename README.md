# orca_test_project

シンプルな Todo アプリ(HTML / CSS / JavaScript のみ、ビルド不要)。

## 機能

- Todo の追加・完了切り替え・個別削除
- フィルター(すべて / 未完了 / 完了)
- 完了数 / 全体数のカウンター
- 完了済み Todo の一括削除
- `localStorage` による保存(リロードしても残る)

## 使い方

`index.html` をブラウザで開くだけで動きます。

## ファイル構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | マークアップ |
| `styles.css` | スタイル |
| `app.js` | ロジック(状態管理・描画・保存) |
