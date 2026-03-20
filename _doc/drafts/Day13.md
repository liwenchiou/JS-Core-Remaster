# Day 13：DOM 樹大探險：如何精準抓取網頁裡的元素？

> **本文同步分享於個人部落格：[Liwen Chiou | Digital Architect & Full-Stack Engineer](https://liwenchiou.github.io/liwenblog/#intro)**

---

### **📜 這裡的修煉規則：**
> **孩子，先別急著出發，既然來了就聽導師嘮叨幾句：**
> 在接下來的 30 天裡，我每天都會在卷軸末尾為你準備一個 **「實戰演武場 CodePen」**。這裡沒有競爭，只有你在修煉場揮汗留下的痕跡。當你完成後，就帶著這份收穫回到公會的 **「QuestBoard 佈告欄」** 與夥伴們分享吧。
> 記住，導師看重的從來不是完美的程式碼，而是你在那些挫折中，依然選擇握緊劍柄、再次嘗試的勇氣。

---

## 🛡️ 【公會委託：尋標任務：誰在哪個位置？】

[「導師，我寫的 HTML 已經蓋好這座城市了，但我該怎麼抓到躲在城堡三樓的那個小怪物，叫他改名成『勇者之王』？」
導師揮揮手說：「冒險者，身為專業的尋寶人，你必須學會『座標精準定位』。這不是胡亂射箭，而是順著這棵名叫 DOM 的大樹，找到地圖上唯一的標記（Selector）。」]

---

## 💡 【導師講義：圖解底層真相】

### 1. HTML 樹狀結構地圖 (The DOM Tree)
[網頁裡的所有標籤（<div>, <p>, <h1>），在 JS 的腦中其實都長得像一棵倒過來的「樹」。根部是 `document`，每條分枝都是一層巢狀關係。]

*   **document.querySelector()**：最快導航，全圖只找「第一個」出現的目標。
*   **document.querySelectorAll()**：掃描全場，我全都要！

> **導師的圖解心法：** 想像這是一張迷宮地圖。用 `#id` 是為了找「唯一的 NPC（本名）」；用 `.class` 是為了找「特定的職業（一群人）」。

![原理邏輯圖](./images/Day13_logic_diagram.png)

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
[在大型專案中，我們很少直接操作 DOM。但在 React 的 `useRef` 或一些老舊系統維護時，精準的 DOM 定位依然是不可或缺的「偵查術」。理解 DOM Node 與 Element 的區別，是你進化為高階冒險者的必經之路。]

---

## 📝 【夥伴筆記：今日修煉精華】
##### *這份筆記是你的隨身護身符，卡關時看一眼，真相就在裡面。*
- **querySelector**：抓第一張寶藏圖。
- **querySelectorAll**：抓整區寶藏圖 (NodeList)。
- **textContent**：修改 NPC 的台詞。
- **style**：修改 NPC 的外觀顏色或佈局。

---

## 🎯 【公會佈告欄：交付本日任務】
[📜 本日實戰任務：尋找迷路的小怪 (CodePen)](https://codepen.io/your-library/pen/day13)
[🛡️ 任務達成證明：QuestBoard 公會報到處](https://liwenchiou.github.io/QuestBoard-Remaster/)

### **⚔️ 任務鑑定條件：**
> 1. 完成 CodePen 中題目挑戰。
> 2. 將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
>    - **初心者**：當你順著 DOM 樹那條看不見的神經線，精準抓到指定 NPC (元素) 並修改他的台詞時，你是否感受到自己正在介入瀏覽器「靈魂圖層」的掌控權？
>    - **冒險者**：當你用 `querySelectorAll` 抓回一群小怪時，如果你要對他們進行批量「過濾」或「變換」，為何將其展開為真實陣列 `Array` 會是更具權威且安全的作法？ —— *任務完成後，你的名字將永遠標記在公會的英雄榜上！*

---

## 📚 【圖書館卷軸：延伸學習】
- **MDN 官方文獻：** [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
