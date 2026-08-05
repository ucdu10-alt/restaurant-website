# DATA_MODEL.md — データモデル設計

商品・コレクション・メタフィールド・metaobjectの設計仕様。Shopify管理画面での作成手順はSHOPIFY_SETUP.mdを参照。

---

## 1. Shopify標準項目の使い方

| Shopify標準項目 | 用途 |
|---|---|
| Title（商品名） | ワイン名（例：「シャトー・マルゴー 2015」） |
| Description（商品説明） | 短めの紹介文のみ。詳細な味わい情報はメタフィールドに分離し、商品カードには出さない |
| Price / Compare at price | 通常価格／セール価格。`compare_at_price > price`のときセールバッジ・打ち消し線を表示 |
| Vendor（ベンダー） | 生産者名を暫定的に格納可（正式にはmetaobject Producerを正とする。移行手順はSHOPIFY_SETUP.md） |
| Product type（商品タイプ） | 大分類の補助（例：「赤ワイン」）。ワインタイプの主データは`custom.wine_type`メタフィールドとし、Product typeは検索補助・レポート用途 |
| Tags（タグ） | 自動コレクションの条件、簡易フィルター、内部管理用ラベルに使用（詳細は3節） |
| Images | 商品画像（最低2枚推奨：正面／裏ラベル、ホバー切り替え用） |
| Variants | 容量違い・ヴィンテージ違いなどがある場合のバリエーション軸 |
| Inventory | Shopify標準在庫管理をそのまま使用 |
| SEO title / description | 商品ごとに設定可能。既定はTitle・Descriptionから自動生成 |

---

## 2. タグ設計（自動コレクション・簡易フィルター用）

メタフィールドのlist型はShopify標準の自動コレクション条件やLiquidの`tag`ベース処理と相性が悪い場合があるため、**主要な絞り込み軸は「タグ」としても付与**し、メタフィールドを表示・詳細フィルター用の正データとする二重管理方針とする。

| タグ接頭辞 | 例 | 用途 |
|---|---|---|
| `type:` | `type:red`, `type:sparkling` | ワインタイプ（自動コレクション条件） |
| `country:` | `country:france` | 国別自動コレクション |
| `pairing:` | `pairing:sushi`, `pairing:cheese` | 料理別自動コレクション |
| `occasion:` | `occasion:anniversary`, `occasion:gift` | シーン別自動コレクション |
| `organic` | `organic` | 栽培方法フィルターの簡易フラグ |
| `new` | `new` | 新着表示の手動補助（基本は作成日ソートで足りるため補助的） |

タグは商品登録時にCSVまたは管理画面で付与する。SHOPIFY_SETUP.mdにタグ一覧の運用ルールを記載。

---

## 3. メタフィールド一覧（namespace: `custom`）

型はShopify標準のメタフィールド型を使用。「フィルター」列は、Shopify Search & Discoveryのストアフロントフィルターとして有効化する想定の有無（○＝Phase 5で有効化、△＝運用状況を見て検討、—＝対象外／表示専用）。

### 3-1. 基本情報

| 表示名 | key | データ型 | 必須/任意 | 入力例 | 使用ページ | フィルター |
|---|---|---|---|---|---|---|
| 生産者 | `producer` | metaobject reference（Producer） | 必須 | シャトー・マルゴー | 商品詳細／商品カード／一覧／フィルター | ○ |
| 国 | `country` | single_line_text_field | 必須 | フランス | 商品詳細／商品カード／一覧／フィルター | ○ |
| 地域 | `region` | single_line_text_field | 必須 | ボルドー | 商品詳細／一覧／フィルター | ○ |
| 地区・小地域 | `subregion` | single_line_text_field | 任意 | マルゴー村 | 商品詳細 | — |
| ヴィンテージ | `vintage` | number_integer | 必須 | 2015 | 商品詳細／商品カード／フィルター | ○ |
| 品種 | `grape_varieties` | list.single_line_text_field | 必須 | カベルネ・ソーヴィニヨン, メルロー | 商品詳細／フィルター | ○ |
| ワインタイプ | `wine_type` | single_line_text_field（固定値運用） | 必須 | 赤 | 商品詳細／商品カード／一覧／フィルター | ○ |
| 容量 | `bottle_size` | volume | 必須 | 750ml | 商品詳細／フィルター | ○ |
| アルコール度数 | `alcohol_percentage` | number_decimal | 任意 | 13.5 | 商品詳細 | — |

固定値運用の`wine_type`は「赤／白／ロゼ／オレンジ／スパークリング／甘口／酒精強化」の7種に統一し、管理画面の入力ゆれを避けるため商品登録時のチェックリストをSHOPIFY_SETUP.mdに用意する。

### 3-2. 味わい

| 表示名 | key | データ型 | 必須/任意 | 入力例 | 使用ページ | フィルター |
|---|---|---|---|---|---|---|
| ボディ | `body_level` | rating（1〜5） | 任意 | 4 | 商品詳細／フィルター | ○ |
| 甘辛度 | `sweetness_level` | rating（1〜5） | 任意 | 2 | 商品詳細／フィルター | ○ |
| 酸味 | `acidity_level` | rating（1〜5） | 任意 | 3 | 商品詳細／フィルター | ○ |
| 渋み（タンニン） | `tannin_level` | rating（1〜5） | 任意 | 4 | 商品詳細／フィルター | ○ |
| フレーバータグ | `flavor_tags` | list.single_line_text_field | 任意 | ブラックベリー, バニラ, スパイス | 商品詳細 | △ |

ボディ／甘辛度／酸味／渋みは`snippets/taste-profile.liquid`で5段階バーとして視覚化する（DESIGN_SYSTEM.mdの数値表示ルールに準拠）。

### 3-3. 提案情報

| 表示名 | key | データ型 | 必須/任意 | 入力例 | 使用ページ | フィルター |
|---|---|---|---|---|---|---|
| 相性のよい料理 | `pairing_foods` | list.metaobject reference（Food pairing） | 任意 | 寿司・刺身, チーズ | 商品詳細／関連商品／フィルター | ○ |
| おすすめのシーン | `occasions` | list.single_line_text_field | 任意 | 記念日, 贈り物 | 商品詳細／フィルター | ○ |
| 飲み頃温度 | `serving_temperature` | single_line_text_field | 任意 | 8〜10℃ | 商品詳細 | — |
| 飲み頃（年） | `drinking_window` | single_line_text_field | 任意 | 2024〜2032年 | 商品詳細 | — |
| デキャンタージュ | `decanting` | single_line_text_field | 任意 | 抽栓後30分推奨 | 商品詳細 | — |
| ソムリエコメント | `sommelier_comment` | multi_line_text_field | 任意 | 「凝縮感のある果実味と…」 | 商品詳細 | — |
| テイスティングノート | `tasting_note` | multi_line_text_field | 任意 | 「カシス、なめし革、杉の香り…」 | 商品詳細 | — |

### 3-4. 生産情報

| 表示名 | key | データ型 | 必須/任意 | 入力例 | 使用ページ | フィルター |
|---|---|---|---|---|---|---|
| 栽培方法 | `farming_method` | single_line_text_field（固定値運用） | 任意 | 有機栽培 | 商品詳細／フィルター | ○ |
| 有機認証 | `organic_certification` | single_line_text_field | 任意 | ECOCERT | 商品詳細 | — |
| 醸造方法 | `vinification` | multi_line_text_field | 任意 | 「野生酵母による自然発酵…」 | 商品詳細 | — |
| 熟成方法 | `aging_method` | multi_line_text_field | 任意 | 「フレンチオーク新樽18ヶ月」 | 商品詳細 | — |
| 生産者ストーリー | `producer_story` | multi_line_text_field | 任意 | （Producer metaobjectの紹介文を流用可） | 商品詳細 | — |

`farming_method`の固定値は「慣行栽培／有機栽培／ビオディナミ／リュットレゾネ」の4種を基本とする。

### 3-5. 販売情報

| 表示名 | key | データ型 | 必須/任意 | 入力例 | 使用ページ | フィルター |
|---|---|---|---|---|---|---|
| ギフト対応 | `gift_available` | boolean | 任意 | true | 商品詳細／商品カード／フィルター | ○ |
| 配送に関する注記 | `delivery_note` | multi_line_text_field | 任意 | 「冷蔵配送はオプションで対応」 | 商品詳細 | — |
| 保管方法 | `storage_note` | multi_line_text_field | 任意 | 「直射日光を避け13〜15℃で保管」 | 商品詳細 | — |
| アレルゲン情報 | `allergen_information` | list.single_line_text_field | 任意 | 亜硫酸塩 | 商品詳細 | — |

### 3-6. Shopify標準機能でカバーするフィルター

以下はカスタムメタフィールドを新設せず、Shopify標準データで対応する。

| フィルター | データソース |
|---|---|
| 価格 | Variantの価格（標準） |
| 在庫あり | Inventory（標準） |
| セール | `compare_at_price > price`（標準） |

---

## 4. Metaobject設計

### 4-1. Producer（生産者）

| フィールド | 型 | 必須 |
|---|---|---|
| 生産者名 | single_line_text_field | 必須 |
| 英語名 | single_line_text_field | 任意 |
| 国 | single_line_text_field | 必須 |
| 地域 | single_line_text_field | 任意 |
| ロゴ | file_reference（image） | 任意 |
| メイン画像 | file_reference（image） | 任意 |
| 紹介文 | multi_line_text_field | 任意 |
| 歴史 | multi_line_text_field | 任意 |
| 栽培方針 | multi_line_text_field | 任意 |
| 醸造方針 | multi_line_text_field | 任意 |
| 公式サイト | url | 任意 |
| 関連商品 | list.product_reference | 任意（Shopify側で自動的に「この生産者を参照している商品」を逆引きも可） |

生産者一覧ページ（`/pages/producers`）はこのmetaobjectの一覧を`{% for entry in shop.metaobjects.producer.values %}`相当で描画する。

### 4-2. Feature（特集）

| フィールド | 型 | 必須 |
|---|---|---|
| タイトル | single_line_text_field | 必須 |
| スラッグ | ハンドル（metaobject標準機能） | 自動 |
| アイキャッチ | file_reference（image） | 必須 |
| 導入文 | multi_line_text_field | 任意 |
| 本文 | rich_text_field | 任意 |
| 関連商品 | list.product_reference | 任意 |
| 関連コレクション | list.collection_reference | 任意 |
| 公開日 | date | 必須 |

**運用メモ**：季節の特集はShopifyの「記事（Blog）」機能とmetaobject Featureのどちらでも実装可能。記事機能はコメント・著者・SEOなど標準機能が充実しているため、**季節特集・読み物系は記事（Blog）、商品訴求主体の短い特集はmetaobject Feature**、という使い分けを推奨する（詳細はSHOPIFY_SETUP.mdの意思決定メモ参照）。

### 4-3. Food pairing（料理ペアリング）

| フィールド | 型 | 必須 |
|---|---|---|
| 料理名 | single_line_text_field | 必須 |
| 画像 | file_reference（image） | 必須 |
| 説明 | multi_line_text_field | 任意 |
| 対応商品 | list.product_reference | 任意 |
| 対応コレクション | list.collection_reference | 任意 |

トップページの「料理から探す」section blockおよび商品詳細の`custom.pairing_foods`から参照される。

---

## 5. コレクション設計

### 5-1. 自動コレクション（条件ベースで運用負荷が低いもの）

| コレクション | 条件 |
|---|---|
| 赤／白／ロゼ／オレンジ／スパークリングワイン | タグ `type:*` またはメタフィールド `custom.wine_type` |
| 国別（フランス、イタリア 等） | タグ `country:*` |
| 地域別 | タグ もしくは `custom.region` |
| 生産者別 | `custom.producer`（metaobject参照）またはVendor |
| 価格帯別 | 価格範囲条件 |
| セール | `compare_at_price > price` |
| 料理別 | タグ `pairing:*` |
| シーン別 | タグ `occasion:*` |
| 新着 | 商品作成日でソート（条件なし、または直近90日タグ） |

### 5-2. 手動コレクション（編集者のキュレーションが前提）

| コレクション | 理由 |
|---|---|
| ソムリエのおすすめ | 「審美眼による選定」というブランドの核。自動条件化しない |
| ギフト | 「ギフトに向くかどうか」は主観判断を伴うため、`gift_available`メタフィールドは目安にとどめ、最終的な掲載順・選定は手動 |
| 特集関連コレクション | 特集ごとに都度作成 |

---

## 6. 商品登録例

| 項目 | 入力値 |
|---|---|
| Title | シャトー・サンプル 2018 |
| Vendor | Château Sample |
| Product type | 赤ワイン |
| Tags | `type:red`, `country:france`, `pairing:beef`, `occasion:anniversary` |
| Price / Compare at price | ¥6,800 / ¥7,500 |
| `custom.producer` | （Producer metaobject「Château Sample」を参照） |
| `custom.country` | フランス |
| `custom.region` | ボルドー |
| `custom.vintage` | 2018 |
| `custom.grape_varieties` | カベルネ・ソーヴィニヨン, メルロー |
| `custom.wine_type` | 赤 |
| `custom.bottle_size` | 750ml |
| `custom.body_level` | 4 |
| `custom.sweetness_level` | 1 |
| `custom.acidity_level` | 3 |
| `custom.tannin_level` | 4 |
| `custom.pairing_foods` | （Food pairing「肉料理」を参照） |
| `custom.sommelier_comment` | 「凝縮感のある果実味と滑らかなタンニン。じっくり抽栓してからどうぞ。」 |
| `custom.gift_available` | true |

CSV雛形（開発・登録用）はSHOPIFY_SETUP.mdに配置する。

---

## 7. データ未登録時の扱い

商品・生産者データがまだ存在しない開発初期段階では、以下の方針を取る。

- テーマ側に大量の固定ダミー商品データをハードコードしない
- `product-grid`・`featured-collection`等のセクションは**0件時のempty state**（`snippets/empty-state.liquid`）を必ず実装する
- プレースホルダー画像（グレーの背景に「Coming soon」等）を`assets/`に1点用意する
- 開発確認用に、上記6節の登録例を含む数点のサンプル商品をCSVで登録できるようにする（SHOPIFY_SETUP.md）
