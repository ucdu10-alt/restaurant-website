# SITE_STRUCTURE.md — サイト構造

匠 Wine Shopのページ構成、ナビゲーション、URL構造、テンプレート対応をまとめる。

---

## 1. サイトマップ

```
トップページ (/)
├── ワインを探す（商品一覧・コレクション） (/collections/*)
│   ├── ワインタイプ別 (/collections/red, /white, /rose, /orange, /sparkling, /sweet, /fortified)
│   ├── 国・地域別 (/collections/france, /italy, ... )
│   ├── 価格帯別 (/collections/price-under-3000, ...)
│   ├── 生産者別 (/collections/producer-xxx)
│   ├── シーン別 (/collections/scene-anniversary, ...)
│   ├── 料理別 (/collections/pairing-sushi, ...)
│   ├── 新着 (/collections/new-arrivals)
│   ├── ソムリエのおすすめ (/collections/sommelier-selection)
│   ├── ギフト (/collections/gift)
│   └── セール (/collections/sale)
├── 商品詳細 (/products/*)
├── 検索結果 (/search)
├── カート (/cart)
├── お気に入り (/pages/favorites)  ※localStorageベースのカスタムページ
├── 特集一覧 (/blogs/features)
├── 特集詳細 (/blogs/features/*)
├── 生産者一覧 (/pages/producers)
├── 生産者詳細 (/pages/producers/* または metaobject詳細ページ)
├── About (/pages/about)
├── FAQ (/pages/faq)
├── 配送・送料 (/pages/shipping)
├── ギフト案内 (/pages/gift)
└── 法定表示
    ├── 特定商取引法に基づく表記 (/pages/legal-notice)
    ├── 返品・キャンセル (/pages/returns)
    ├── 利用規約 (/pages/terms)
    ├── プライバシーポリシー (/pages/privacy)
    ├── 20歳未満の飲酒・販売禁止表示 (/pages/age-restriction)
    ├── 酒類販売管理者標識 (/pages/liquor-license)
    └── お問い合わせ (/pages/contact)
```

---

## 2. グローバルナビゲーション構造

Shopify管理画面の「Navigation（メニュー）」で管理する（`main-menu`）。SHOPIFY_SETUP.mdに設定手順を記載。

**PCヘッダー**
```
[ロゴ]   ワインを探す ▾ | 料理から探す ▾ | シーンから探す ▾ | 特集 | ギフト | About     [検索] [アカウント] [お気に入り] [カート]
```
- 「ワインを探す」「料理から探す」「シーンから探す」はメガメニュー/ドロップダウン対応（`header`セクションのblockで開閉制御、JSはWeb Component1つに集約）。
- ヘッダーは`position: sticky`。高さはスクロール後に縮小して圧迫感を減らす（DESIGN_SYSTEM.md準拠のトランジション時間）。

**モバイル**
- ロゴ／検索アイコン／カートアイコン／ハンバーガーメニューのみを表示する軽量ヘッダー。
- ハンバーガー→フルスクリーンドロワー。ナビゲーション項目はアコーディオンで展開。

**告知バー（announcement-bar）**
- ヘッダー上部の1行バー。テーマエディターでテキスト・リンク・表示ON/OFFを設定可能。送料無料ラインや酒類販売の注意書き等に利用想定。

---

## 3. URL構造の方針

| 種別 | パス | 備考 |
|---|---|---|
| 商品 | `/products/{handle}` | Shopify標準 |
| コレクション | `/collections/{handle}` | Shopify標準。ハンドルは英語スラッグで統一（例: `red-wine`, `france`） |
| 検索 | `/search?q=` | Shopify標準 |
| 特集 | `/blogs/features/{handle}` | Shopify Blog機能を「特集記事」として利用 |
| 固定ページ | `/pages/{handle}` | About・FAQ・配送・ギフト・法定表示・お気に入り |
| 生産者 | `/pages/producers`（一覧）+ 個別は metaobjectの`producer.{handle}`ページ、またはpages配下 | 詳細はSHOPIFY_SETUP.md「metaobject運用」参照。Online Store 2.0のmetaobject entry用テンプレート（`templates/metaobject/producer.json`）を使用 |

日本語ハンドル（URLに日本語が入る状態）は避け、英語スラッグに統一する（SEO・共有のしやすさのため）。

---

## 4. ページ ⇄ Shopifyテンプレート対応表

| ページ | Shopjyテンプレート | JSONテンプレートファイル |
|---|---|---|
| トップページ | index | `templates/index.json` |
| 商品一覧（各コレクション） | collection | `templates/collection.json` |
| 商品詳細 | product | `templates/product.json` |
| 検索結果 | search | `templates/search.json` |
| カート | cart | `templates/cart.json` |
| 特集一覧 | blog | `templates/blog.json` |
| 特集詳細 | article | `templates/article.json` |
| 生産者一覧 | page | `templates/page.producers.json` |
| 生産者詳細 | metaobject (producer) | `templates/metaobject/producer.json` |
| About | page | `templates/page.about.json` |
| FAQ | page | `templates/page.faq.json` |
| 配送・送料 | page | `templates/page.shipping.json` |
| ギフト案内 | page | `templates/page.gift.json` |
| お気に入り | page | `templates/page.favorite.json` |
| 法定表示各種 | page | `templates/page.legal.json`（共通レイアウト、本文のみ差し替え） |
| 404 | 404 | `templates/404.json` |

各テンプレートで使用するセクション構成の詳細はIMPLEMENTATION_PLAN.mdのPhase 4に記載する。

---

## 5. 年齢確認UIの配置方針

「訪問毎の大型モーダル」は採用しない。代わりに以下の段階で明確な確認を行う。

1. **フッター常設**：「20歳未満の飲酒・販売は法律で禁止されています」の明示（全ページ共通、`footer`セクション内）
2. **カート内**：チェックアウトボタンの直上に、年齢確認チェックボックス（未成年ではないことの自己申告）とリンク（酒類販売管理者標識ページへ）を表示。チェックが入るまでチェックアウトボタンは非活性
3. **注文完了・Shopify標準決済**：Shopify側の標準機能・配送業者側の年齢確認（成人確認配送オプション等）は運用面でSHOPIFY_SETUP.mdに手順を記載

これにより「毎回のポップアップで体験を妨げない」かつ「購入直前に明確な確認を行う」を両立する。

---

## 6. 関連商品・パーソナライズ表示の設計（AIなし・ルールベース）

商品詳細ページの関連商品は、以下の優先順でタグ／メタフィールド／コレクションの一致条件を用いたLiquidの`collections`または`search`ロジック（もしくは手動コレクション）で構成する。

1. 同じ`custom.pairing_foods`を持つ商品
2. 同じ`custom.producer`
3. 同じ`custom.region`
4. 価格帯が近い商品（`variants.price`の前後レンジ）
5. 最近見た商品（localStorage、`recently-viewed-products`セクション）

いずれもAI／レコメンドエンジンを使わず、Liquid内の条件分岐＋Shopifyの標準コレクション/検索機能で完結させる。
