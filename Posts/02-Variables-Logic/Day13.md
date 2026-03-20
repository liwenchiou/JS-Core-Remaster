# Day 13：DOM 樹大探險：如何精準抓取網頁裡的元素？

> **本文同步分享於個人部落格：[Liwen Chiou | Digital Architect & Full-Stack Engineer](https://liwenchiou.github.io/liwenblog/#intro)**

---

### **📜 這裡的修煉規則：**
> **孩子，先別急著出發，既然來了就聽導師嘮叨幾句：**
> 在接下來的 30 天裡，我每天都會在卷軸末尾為你準備一個 **「實戰演武場 CodePen」**。這裡沒有競爭，只有你在修煉場揮汗留下的痕跡。當你完成後，就帶著這份收穫回到公會的 **「QuestBoard 佈告欄」** 與夥伴們分享吧。
> 記住，導師看重的從來不是完美的程式碼，而是你在那些挫折中，依然選擇握緊劍柄、再次嘗試的勇氣。

---

## 🛡️ 【公會委託：尋標任務：誰在哪個位置？】

導師，我寫的 HTML 已經蓋好這座城市了，但我該怎麼抓到躲在城堡三樓的那個小怪物，叫他改名成『勇者之王』？
導師揮揮手說：「冒險者，身為專業的尋寶人，你必須學會『座標精準定位』。這不是胡亂射箭，而是順著這棵名叫 `DOM` 的大樹，找到地圖上唯一的標記（`Selector`）。」

---

## 💡 【導師講義：圖解底層真相】

### 1. `HTML` 樹狀結構地圖 (The DOM Tree)
網頁裡的所有標籤（`<div>`, `<p>`, `<h1>`），在 `JS` 的腦中其實都長得像一棵倒過來的「樹」。根部是 `document`，每條分枝都是一層巢狀關係。

- **`document.querySelector()`**：最快導航，全圖只找「第一個」出現的目標。
- **`document.querySelectorAll()`**：掃描全場，我全都要！

### 2. `DOM` 樹：網頁的骨架
當瀏覽器讀取 `HTML` 時，它會把每個標籤轉換成一個 節點 (`Node`)。
這棵樹的結構決定了 `JS` 尋找元素的「路徑」。

- 根節點 (`Root`)：`document` 是所有東西的起點。
- 父子關係 (`Parent-Child`)：`<body>` 是 `<div>` 的父親；`<div>` 是 `<body>` 的孩子。
- 兄弟關係 (`Siblings`)：同一個 `<div>` 下的 `<h1>` 與 `<p>` 互為兄弟。

### 3. 定位術：`QuerySelector` 的導航邏輯
這兩個方法就像是你在 `DOM` 迷宮中的「探測雷達」，它們使用的是與 `CSS` 選擇器 完全相同的語法：

📍 `document.querySelector()`
行為：從 `document` 開始向下掃描，一旦發現符合條件的「第一個」目標，就立刻停止搜尋並回傳。
回傳值：一個 `Element` 物件（如果沒找到則回傳 `null`）。
隱藏陷阱：如果你想改掉畫面上「所有」小怪的顏色，但只用了這個方法，結果只會有一隻小怪變色。

📍 `document.querySelectorAll()`
行為：掃描整棵樹，把所有符合條件的元素通通抓起來。
回傳值：一個 `NodeList`（類陣列物件）。

導師叮嚀：抓回來的是一疊清單，你不能直接對清單下命令（例如 list.style.color = 'red' 會失敗），你必須用 `forEach` 巡邏一遍，逐一對裡面的成員下令。

### 📋 定位基準對照表

| 選擇器類型 | 範例語法                          | 導師建議                                                   |
|------------|-----------------------------------|------------------------------------------------------------|
| ID (`#`)     | `querySelector('#login-btn')`     | 最快、唯一。用於表單送出、登入按鈕等不重複元件。           |
| Class (`.`)  | `querySelectorAll('.card-item')`  | 最常用。用於列表、導覽列等具有相同樣式的群組。             |
| 屬性 (`[]`)  | `querySelector('[data-id="123"]')`| 進階招式。在處理 API 資料或特定標記時非常好用。            |

![原理邏輯圖](https://i.meee.com.tw/HzqPsSk.jpg)

### 4. 讀心術：如何讀取元素內容與數值？
抓到了元素，我們還需要能「讀取」它身上的資訊：

- **`.textContent`**：用來讀取或改寫標籤內的文字（純文字）。
- **`.value`**：**最關鍵！** 用來讀取輸入框 (`<input>`, `<select>`, `<textarea>`) 裡面當前填寫的數值。

```JavaScript
// 1. 讀取標題上的字
const title = document.querySelector('h1').textContent;

// 2. 讀取冒險者在輸入框打的名字
const playerName = document.querySelector('#name-input').value;
```

#### 1. 元素內容與結構：`.innerHTML`
用途：讀取或寫入標籤內部的「HTML 結構」。
與 `textContent` 的差異：`textContent` 只看純文字；`innerHTML` 則會解析 `HTML` 標籤。
```JavaScript
const box = document.querySelector('.info-box');
// 直接塞入一個帶有樣式的按鈕
box.innerHTML = `<button class="btn-primary">點我領取獎勵</button>`;
```
>⚠️ 導師警告： 處理使用者輸入的內容時，盡量避免使用 `innerHTML`，以防範 `XSS` 攻擊。

#### 2. 標籤的身分證：`.getAttribute()` / `.setAttribute()`
用途：讀取或修改 `HTML` 標籤上的任何屬性（如 `src`, `href`, `placeholder`, `disabled`）。
```JavaScript
const img = document.querySelector('#hero-avatar');
// 更換圖片路徑
img.setAttribute('src', 'new-boss.png'); 
// 讀取目前的超連結
const link = document.querySelector('a').getAttribute('href');
```
#### 3. 自定義數據：`.dataset` (最推薦的資料傳遞方式)
用途：讀取 `HTML` 中以 `data-` 開頭的自定義屬性。這在處理列表、`ID` 或狀態（如血量、魔力）時非常優雅。

```HTML
<div class="monster" data-id="99" data-type="slime"></div>
```
```JavaScript
const monster = document.querySelector('.monster');
console.log(monster.dataset.id);   // 輸出 "99"
console.log(monster.dataset.type); // 輸出 "slime"
```
#### 4. 樣式與類別：`.classList`
用途：控制 `CSS Class`。比起直接改 `style` 屬性，透過切換 `Class` 來控制外觀更符合現代開發規範。

常用方法：
`.add()`：增加類別
`.remove()`：移除類別
`.toggle()`：切換類別（有就刪掉，沒有就補上）
`.contains()`：檢查是否有某個類別

```JavaScript
const hero = document.querySelector('#player');
hero.classList.add('is-active');    // 讓勇者發光
hero.classList.toggle('is-dead');   // 切換死亡狀態
```
#### 📋 快速複習表

| 屬性名稱       | 讀取對象          | 常用場景                                                   |
|----------------|-------------------|------------------------------------------------------------|
| .textContent   | 標籤內的純文字    | 修改標題、描述文字                                         |
| .innerHTML     | 標籤內的 HTML     | 動態生成複雜的 HTML 結構（⚠️ 小心安全）                   |
| .value         | 表單輸入內容      | 取得使用者在 Input 框打的字                                |
| .classList     | CSS 類別清單      | 處理動畫、顯隱切換、樣式變更                               |
| .dataset       | data-* 屬性       | 儲存與標籤關聯的後端 ID 或數值                             |
| .src / .href   | 特定資源路徑      | 換圖、改連結                                               |



<!-- 🎨 圖解提示詞 (導師專用，產後刪除)：
[元素：一棵倒過來的樹；根部標註 document；樹枝分叉到 <body>, 然後到 <section>；標註一個紅圈在 `#hero`節點；標註一圈藍圈在 `.monster` 節點。]
-->

---

## 🛖 【營火叮嚀：導師的經驗談】
> 很多冒險者還在用舊時代的 `getElementById`、`getElementsByClassName`。聽導師一句勸，那些舊型號太囉嗦了。現代公會標準是 `querySelector`。它就像萬能定位儀，只要你懂一點 CSS 選擇器的邏輯，全場沒有你抓不到的目標。

---

## ⚔️ 【演武場：從冒險者到勇者辛梅爾】

### 招式示範：抓取與改寫內容
[展示「傳統手動（Before）」與「現代定位（After）」的對比。]

#### ❌ 冒險者：用舊型號定位
```javascript
const name = document.getElementById('nickname');
const lists = document.getElementsByClassName('item');
// 囉嗦、難記，且 lists 不是現代陣列
```

#### ✅ 勇者辛梅爾：精準單向與集合定位
```javascript
// 1. 抓取唯一目標 (ID 用 #)
const heroName = document.querySelector('#nickname');
heroName.textContent = '辛梅爾';

// 2. 抓取一組目標 (Class 用 .)
const monsters = document.querySelectorAll('.item');
monsters.forEach(m => m.style.color = 'red');
```

> **導師講評：** 你看，`querySelector` 的彈性在於你可以寫出複雜的 CSS 選擇器，像是 `section .active p`。只要選對了地方，改內容、改樣式，都只是彈指之間的事。

#### ⚠️ 【實戰雷區：它是 Array 嗎？】
> 當你用 `querySelectorAll` 抓回一群小怪時，它回傳的是 `NodeList`。它雖然長得像陣列，具備 `forEach`，但早期有些舊型號（IE/Edge）不支援它使用 `map` 或 `filter`。如果你需要更強的過濾，建議在前面加 `[...]` 把它展開成正港陣列！

---

## 🏰 【勇者精英課：邁向職人的進階架構】
在大型專案與現代 `UI` 元件系統中，我們很少直接操作 `DOM`。但在處理特定的元件底層、直接存取元素引用（`Element Reference`）或是一些老舊系統維護時，精準的 `DOM` 定位依然是不可或缺的「偵查術」。理解 `DOM Node` 與 `Element` 的區別，是你進化為高階冒險者的必經之路。

- `NodeList` 是一組只能看、不能改裝的展示櫃；而 `Array` 則是功能齊全的工具箱。
- `NodeList`：只提供基本的 `length` 屬性和 `forEach` 方法。
- `Array`：擁有 `map` (轉換資料)、`filter` (篩選資料)、`reduce` (累加資料) 等強大武器。

---

## 📝 【夥伴筆記：今日修煉精華】
##### *這份筆記是你的隨身護身符，卡關時看一眼，真相就在裡面。*
- **querySelector**：抓第一張寶藏圖。
- **querySelectorAll**：抓整區寶藏圖 (NodeList)。
- **textContent**：修改 NPC 的台詞。
- **value**：獲取輸入框裡的機密情報 (玩家輸入的值)。

---

## 🎯 【公會佈告欄：交付本日任務】
[📜 本日實戰任務：尋找迷路的小怪 (CodePen)](https://codepen.io/editor/liwenchiou/pen/019d0bc6-2634-7689-a9f2-ede41e27097b)
[🛡️ 任務達成證明：QuestBoard 公會報到處](https://liwenchiou.github.io/QuestBoard-Remaster/)

### **⚔️ 任務鑑定條件：**
> 1. 完成 CodePen 中題目挑戰。
> 2. 將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
>    - **初心者**：當你順著 DOM 樹那條看不見的神經線，精準抓到指定 NPC (元素) 並修改他的台詞時，你是否感受到自己正在介入瀏覽器「靈魂圖層」的掌控權？
>    - **冒險者**：當你用 `querySelectorAll` 抓回一群小怪時，如果你要對他們進行批量「過濾」或「變換」，為何將其展開為真實陣列 `Array` 會是更具權威且安全的作法？ —— *任務完成後，你的名字將永遠標記在公會的英雄榜上！*

---

## 📚 【圖書館卷軸：延伸學習】
- **MDN 官方文獻：** [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
