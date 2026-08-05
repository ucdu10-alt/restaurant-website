# IMPLEMENTATION_PLAN.md — 実装計画

Phase 1（現状分析）は完了。本ドキュメントはPhase 2の成果物として、Phase 3以降の実装計画を定義する。

---

## フェーズ全体像

```
Phase 1 現状分析        [完了]
Phase 2 設計            [進行中：本ドキュメント含む5点のドキュメント作成]
Phase 3 共通基盤        [未着手：theme.liquid、ヘッダー、フッター等]
Phase 4 主要ページ      [未着手：15ページを順に実装]
Phase 5 Shopify機能連携 [未着手：メタフィールド／検索／カート等の接続]
Phase 6 品質確認        [未着手：横断的なQA]
```

各フェーズは前フェーズの成果物に依存するため、**基本的に順番通りに進める**。ただしPhase 4は1ページずつ独立して確認・報告できるため、フェーズ内で段階的にレビューを挟む。

---

## Phase 3：共通基盤

### 作業項目

| 項目 | ファイル | 依存 |
|---|---|---|
| レイアウト骨格 | `layout/theme.liquid` | DESIGN_SYSTEM.md確定後 |
| CSS変数定義 | `snippets/css-variables.liquid`（`theme.liquid`の`<head>`でinclude） | DESIGN_SYSTEM.md |
| ベースCSS（タイポグラフィ・グリッド・リセット） | `assets/base.css` | CSS変数 |
| 告知バー | `sections/announcement-bar.liquid` | レイアウト骨格 |
| ヘッダー（PC） | `sections/header.liquid` | レイアウト骨格 |
| モバイルナビゲーション（ドロワー） | `sections/mobile-navigation.liquid` | ヘッダー |
| フッター | `sections/footer.liquid` | レイアウト骨格 |
| パンくず | `snippets/breadcrumbs.liquid` | — |
| ボタン共通スタイル | `assets/base.css`内 | CSS変数 |
| フォーム共通スタイル | `assets/base.css`内 | CSS変数 |
| 価格表示 | `snippets/price.liquid` | CSS変数（数値表示ルール） |
| 商品カード | `snippets/product-card.liquid` | price, badge, favorite-button, add-to-cart-button |
| バッジ | `snippets/badge.liquid` | — |
| お気に入りボタン | `snippets/favorite-button.liquid` | localStorage設計（Phase 5と一部前倒し） |
| カート追加ボタン | `snippets/add-to-cart-button.liquid` | Shopify商品フォーム |
| 数量セレクター | `snippets/quantity-selector.liquid` | — |
| ローディング状態 | `snippets/loading-spinner.liquid` | — |
| 空表示 | `snippets/empty-state.liquid` | — |
| モーダル（共通） | Web Component（`assets/modal.js`）＋呼び出し用snippet | DESIGN_SYSTEM.md モーダル仕様 |
| ドロワー（共通） | 同上のWeb Componentを拡張 | モーダル |
| アイコン | `snippets/icon.liquid`（インラインSVGスプライト） | — |
| レスポンシブ画像 | `snippets/responsive-image.liquid` | Shopify画像配信仕様 |

### 優先順位

1. CSS変数・ベースCSS（全ての土台）
2. `theme.liquid`（骨格）
3. ヘッダー／フッター／告知バー（全ページ共通で見える部分）
4. モーダル・ドロワーの共通Web Component（カート・フィルター・ナビ全てで再利用するため早期に固める）
5. 商品カード関連snippet一式（Phase 4の一覧・トップページ双方で使うため）

### 完了条件

- `shopify theme dev`でエラーなく起動し、空のページでもヘッダー・フッターが正しく表示される
- ヘッダーのPC⇄モバイル切り替え、ドロワー開閉がキーボード操作・スクリーンリーダーで問題なく動作する
- 商品カードsnippetが商品データなしでもLiquidエラーを出さない（ダミー呼び出しでの確認）
- `prefers-reduced-motion`でアニメーションが無効化される

### リスク

- モーダル/ドロワーを1つのWeb Componentに共通化しすぎると、カート・フィルター・ナビそれぞれの挙動差異（フォーカス移動先、閉じた後の挙動）を吸収しきれない可能性 → オプション引数で挙動を制御できる設計にする

---

## Phase 4：主要ページ（指定順に実装）

各ページ完了時にモバイル／PC双方のスクリーンショット確認と、対応するLiquidテンプレート・セクションの一覧を報告する。

| 順 | ページ | 主なセクション | 依存 |
|---|---|---|---|
| 1 | トップページ | hero, image-with-text(料理/シーン), wine-type-grid, featured-collection(新着), featured-collection(おすすめ), brand-story, featured-articles, region-grid, newsletter | Phase 3全般 |
| 2 | 商品一覧 | collection-header, collection-product-grid, filter-group, active-filter | product-card, pagination |
| 3 | 商品詳細 | product-main, product-details, related-products, recently-viewed-products | taste-profile, pairing-list, product-media |
| 4 | 検索結果 | search-results | predictive-search-item, empty-state |
| 5 | カート | cart-main | quantity-selector, price |
| 6 | お気に入り | page.favorite.json＋専用JS | favorite-button（Phase 3実装済） |
| 7 | 特集一覧 | featured-articles一覧表示（blog.json） | — |
| 8 | 特集詳細 | article.json＋本文レイアウト | related-products |
| 9 | 生産者一覧 | page.producers.json | — |
| 10 | 生産者詳細 | metaobject/producer.json | related-products |
| 11 | About | page.about.json（brand-storyの拡張利用） | — |
| 12 | FAQ | page.faq.json（アコーディオン） | — |
| 13 | 配送・送料 | page.shipping.json | — |
| 14 | ギフト案内 | page.gift.json | — |
| 15 | 法定表示ページ群 | page.legal.json（共通レイアウト） | — |

### 完了条件（ページ共通）

- 対応するJSONテンプレートがテーマエディターでセクション順序・内容を編集できる
- モバイル320px〜デスクトップ1440px+で崩れがない
- 画像に適切なaltが入っている（テーマエディターでの入力を前提に、未入力時は商品名等から自動生成するフォールバックをLiquidで用意）
- Liquid/JSエラーがコンソールに出ない

---

## Phase 5：Shopify機能連携

| 項目 | 内容 | 依存 |
|---|---|---|
| 商品データ接続 | 商品カード・詳細ページを実データに接続 | 商品登録（SHOPIFY_SETUP.md） |
| コレクション接続 | 各section blockのコレクション選択をテーマエディターで可能に | コレクション作成 |
| メタフィールド表示 | `product-details`, `taste-profile`, `pairing-list`等に接続 | メタフィールド定義 |
| Metaobject接続 | Producer/Feature/Food pairing詳細ページ | metaobject定義 |
| Search & Discovery | フィルター・ソートの実接続 | アプリ設定 |
| Predictive Search | ヘッダー検索の予測候補 | アプリ設定 |
| 商品フォーム／バリエーション | Shopify標準フォームの組み込み | — |
| 在庫表示 | 在庫切れバッジ・カート追加ボタンの非活性化 | — |
| カート／チェックアウト | Cart APIまたはテーマ標準カートへの接続、チェックアウトボタン | Shopify決済設定 |
| 割引表示 | 自動割引・割引コードのUI反映 | Shopify割引設定 |
| ギフト対応情報表示 | `gift_available`メタフィールドの反映 | メタフィールド定義 |

### 完了条件

- 実際にShopify開発ストア上でカート追加→チェックアウトまで到達できる
- フィルターを組み合わせて絞り込み、意図した商品のみが表示される
- メタフィールド未入力の商品でも表示が崩れない（該当欄を非表示にするフォールバック）

---

## Phase 6：品質確認

DESIGN_SYSTEM.md・SHOPIFY_SETUP.mdの内容を踏まえ、以下を横断的に確認する。

| チェック項目 | 方法 |
|---|---|
| モバイル／PC表示 | 実機相当のビューポートで確認（320/480/768/1024/1280/1440px） |
| キーボード操作 | Tab/Shift+Tab/Enter/Escでの全操作確認 |
| スクリーンリーダー | 見出し階層、aria属性、フォーカス順序の確認 |
| Liquid/JSエラー | 全ページのコンソール確認 |
| CSS崩れ | 各ブレークポイントでの目視確認 |
| 画像最適化 | srcset/sizes、遅延読み込みの確認 |
| 表示速度／Core Web Vitals | Lighthouse計測（目標：Performance 85+/Accessibility 90+/Best Practices 90+/SEO 90+） |
| SEO | title/description/canonical/OGP/構造化データ確認 |
| テーマエディター編集性 | 全セクションがエディター上で編集・並び替え可能か確認 |

---

## 優先順位まとめ（依存関係グラフの要約）

```
DESIGN_SYSTEM.md ─┬─> CSS変数/ベースCSS ─> theme.liquid ─> header/footer/announcement-bar
                   └─> モーダル/ドロワーWeb Component
DATA_MODEL.md ─────> メタフィールド/metaobject定義（Shopify管理画面） ─> Phase 5接続
SITE_STRUCTURE.md ─> URL/テンプレート対応 ─> Phase 4の各JSONテンプレート作成
SHOPIFY_SETUP.md ──> 管理画面設定（ユーザー作業） ─> Phase 5の実データ接続
```

---

## 全体リスク（Phase 1からの再掲・詳細化）

| リスク | 影響度 | 対応 |
|---|---|---|
| Shopify開発ストア未接続での開発 | 中 | コードはテーマとして正しい構造を保証し、実接続確認はSHOPIFY_SETUP.mdの手順でユーザー側実施 |
| メタフィールド25項目の管理コスト | 中 | 必須/任意を明確化済み（DATA_MODEL.md）。CSV一括登録の雛形を用意 |
| Search & Discoveryフィルター数が多い | 中 | フィルター対象をDATA_MODEL.mdで絞り込み済み（○のみ有効化） |
| 酒類ECの法的要件 | 高 | 全て仮テキスト、専門家確認必須と明記。年齢確認UIは段階的設計（SITE_STRUCTURE.md 5節） |
| Lighthouseパフォーマンス目標未達 | 中 | Phase 3から画像・フォント最適化ルールを徹底、Phase 6で計測・是正 |
| デザインの「安売り感」への逸脱 | 低〜中 | DESIGN_SYSTEM.mdの禁止表現リストを各Phase完了報告時にチェック |

---

## 完了条件（初期版全体）

ユーザー指定の完了条件リストをそのまま採用し、Phase 6完了時点でチェックリストとして再掲・報告する。
