# バミリ計測メモ PWA v0.3.3

このフォルダをそのまま HTTPS で公開すると、PWA として動作します。

## いちばん簡単な使い方（GitHub Pages）
1. GitHub で新しい public リポジトリを作る
2. このフォルダ内のファイルを全部アップロードする
3. `index.html` をルートに置く
4. Settings → Pages で公開を ON にする
5. 出てきた `https://...github.io/.../` を iPhone / Android で開く
6. Safari / Chrome でホーム画面に追加する

## 注意
- PWA のオフライン起動は、最初に一度 HTTPS で開いて必要ファイルを読み込んだあとに効きます。
- 写真データの保存はブラウザ保存に依存するため、現場では ZIP 保存での退避を併用してください。
- `file://` 直開きでは PWA になりません。
