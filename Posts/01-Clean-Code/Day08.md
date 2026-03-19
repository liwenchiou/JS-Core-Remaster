# Day 08：物件導航：如何優雅地遍歷與操作你的寶箱

> **本文同步分享於個人部落格：[Liwen Chiou | Digital Architect & Full-Stack Engineer](https://liwenchiou.github.io/liwenblog/#intro)**

---

### **📜 這裡的修煉規則：**
> **孩子，先別急著出發，既然來了就聽導師嘮叨幾句：**
> 在接下來的 30 天裡，我每天都會在卷軸末尾為你準備一個 **「實戰演武場 CodePen」**。這裡沒有競爭，只有你在修煉場揮汗留下的痕跡。當你完成後，就帶著這份收穫回到公會的 **「QuestBoard 佈告欄」** 與夥伴們分享吧。
> 記住，導師看重的從來不是完美的程式碼，而是你在那些挫折中，依然選擇握緊劍柄、再次嘗試的勇氣。

---

## 🛡️ 【公會委託：寶箱清點術】

> **傍晚的公會倉庫，塞滿了今日繳回的戰利品...**
> 
> 「新夥伴，這是我剛收到的『地底巨魔寶物清單』，但它是一整顆發著光、無法拆解的混沌核心。我只需要知道裡面有哪些『武器』，其他的雜質我都不想要。」導師把清單塞進你手裡，那是一個擁有數十個屬性的龐大物件。
> 
> 你還在用 `lootBox.sword`、`lootBox.potion` 手工一個一個點名嗎？這在處理只有 3 個屬性的盒子時還行，但當面對上百個從「遠端王國（API）」傳來的混沌物資時，你需要更現代化的掃描儀。
> 
> 今天，我要教你如何優雅地遍歷物件，把裡面的秘密轉化為你可以隨意操作的清單。

---

## 💡 【導師講義：圖解底層真相】

### 1. 三大物件掃描儀 (Modern Object Methods)
物件不像陣列（Day 04）那樣有順序，它就像個充滿隔層的抽屜。若想對它進行大規模的操作，我們通常會先施展「變身魔法」，將抽屜的資訊轉化為陣列（名單）。

#### 🛠️ 掃描儀：

假設我們有一個遊戲道具物件：

```JavaScript
const lootBox = {
  id: "A102",
  name: "🔥 烈焰劍",
  price: 500,
  rarity: "Epic"
};
```
- `Object.keys()`：標籤提取器
只要「標籤名（`Key`）」。最常用於檢查屬性是否存在。
```JavaScript
const keys = Object.keys(lootBox);
// 結果：["id", "name", "price", "rarity"]
```
用途： 常用於動態檢查「這個物件有哪些屬性？」或者在前端渲染表格的「表頭」。

- `Object.values()`：內容物提取器
只要「內容物（Value）」。最適合用來計算數值總和。
```JavaScript
const values = Object.values(lootBox);
// 結果：["A102", "🔥 烈焰劍", 500, "Epic"]
```
用途： 當你不在乎屬性名稱，只想處理資料本身（例如：把所有價格加總）時最快。

- `Object.entries()`：成對打包器
我全都要！標籤名與內容物成對打包成二維陣列。
```JavaScript
const entries = Object.entries(lootBox);
/* 結果：[
  ["id", "A102"],
  ["name", "🔥 烈焰劍"],
  ["price", 500],
  ["rarity", "Epic"]
] */
```

- `Object.entries()` 最強大的地方在於它能讓你像遍歷陣列一樣輕鬆遍歷物件：
```JavaScript
// 掃描並印出詳細資訊
Object.entries(lootBox).forEach(([key, value]) => {
  console.log(`📦 掃描到項目 -> ${key}: ${value}`);
});
```
#### 物件掃描儀比較表
| 工具/方法             | 動作說明                          | 產出形式                  | 適合場景/用途                          |
|------------------------|-----------------------------------|---------------------------|-----------------------------------------|
| Object.keys()          | 掃描標籤                          | ['key1', 'key2']          | 確認「有哪些欄位」                      |
| Object.values()        | 掃描內容物                        | ['val1', 'val2']          | 計算「總數、總價」                      |
| Object.entries()       | 成對拆解                          | [['k1', 'v1'], ...]       | 進行複雜過濾或迴圈（最精華）            |



> **導師的圖解心法：** 觀察下面的圖，你可以看到物理上的物件（抽屜）被掃描儀掃過後，變出了一條條整齊的傳送帶（陣列）。這樣一來，我們就能對物件使用那些強大的「陣列魔法」了。

![Day 08：物件掃描術](https://i.meee.com.tw/YkbE4KQ.jpg)


---

## 🛖 【營火叮嚀：為什麼物件不能直接 map？】
> 導師知道你已經熟悉了陣列（Day 04），或許你曾想過：既然物件也是容器，能不能也像對待名單一樣，對它進行大規模的「搜尋或批次轉換」？
> 
> **「工具的錯位是錯誤的開始。」** 物件的本質是具備標籤的「箱子」，而非有序的「生產線」。如果你想對寶箱內容進行精密的加工（就像我們即將在 Day 09 學到的陣列魔法），最優雅的做法就是先施展 `Object.entries()` 將它炸開，轉入陣列的世界進行作業。這不僅是為了達成目標，更是為了維持資料結構的純潔性。

---

## ⚔️ 【演武場：從冒險者到勇者辛梅爾】

### 招式示範：混沌資料轉換 (Data Transformation)

#### ❌ 冒險者：雷達掃描法 (for...in)
> **導師註解**：這是舊公會常見的寫法，但它有個缺點：它會不小心掃到「祖先遺留的垃圾屬性 (Prototype)」，且語法略顯冗長。
```javascript
const loot = { sword: 10, potion: 5 };
for (let key in loot) {
  console.log(`${key} 數量：${loot[key]}`);
}
```

#### ✅ 勇者辛梅爾：全自動掃描術 (Object.entries)
```javascript
const loot = { sword: 10, potion: 5 };

// 將物件一次炸開，直接用解構處理 Key 與 Value
Object.entries(loot).forEach(([item, count]) => {
  console.log(`🛡️ 偵察報告：${item} 剩餘 ${count} 件`);
});
```

---

#### ⚠️ 【實戰雷區：避開那些致命陷阱】
> **1. Prototype 的干擾**：在使用 `for...in` 時，除非你加上 `hasOwnProperty` 檢查，否則你可能會抓到不屬於這個寶箱的標籤。 現代化寫法 `Object.keys()` 會自動幫你避開這些陷阱。
> **2. 陣列與物件的逆轉**：如果你用 `Object.entries` 處理完一箱物資後想再把它變回「寶箱」，請使用現代語法 **`Object.fromEntries(newArray)`**。

---

## 🏰 【勇者精英課：寶物打包術 JSON】
當你要把整箱寶物寄回遙遠的公會總部（API）或是存進 Day 16 的 LocalStorage 時，你必須把物件「序列化」成一個扁平的文字包。
*   **`JSON.stringify(obj)`**：把寶箱壓縮放進郵件包裹（字串）。
*   **`JSON.parse(string)`**：把收到的包裹拆開，變回可操作的立體寶箱。
此外，這套招式也是最簡單的「深拷貝（Deep Copy）」法，能幫你徹底斷開所有層級的靈魂連結。

---

## 📝 【夥伴筆記：今日修煉精華】
##### *這份筆記是你的隨身護身符，卡關時看一眼，真相就在裡面。*
- **Object.keys/values**：快速提取單一面向的名單。
- **Object.entries**：最彈性的開箱法，將物件導航至陣列世界。
- **JSON 轉化**：物件與字串之間的跨維度轉換，是資料持久化的唯一方式。

---

## 🎯 【公會佈告欄：交付本日任務】
[📜 本日實戰任務：寶箱全方位清點實驗室 (CodePen)](https://codepen.io/editor/liwenchiou/pen/019d0633-f066-7cf6-aba2-040197d7c33d)
[🛡️ 任務達成證明：QuestBoard 公會報到處](https://liwenchiou.github.io/QuestBoard-Remaster/)

### **⚔️ 任務鑑定條件：**
> 1. 完成 CodePen 中題目挑戰。
> 2. 將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
>    - **初心者**：當你第一次看到物件內容整齊地排成陣列「吐」出來時，你覺得哪個方法最有魔力？
>    - **冒險者**：如果我們想計算一個物件中所有數值屬性的總合，你會建議夥伴用 keys 還是 values？為什麼？ —— *任務完成後，你的名字將永遠標記在公會的英雄榜上！*

---

## 📚 【圖書館卷軸：延伸學習】
- **MDN 官方文獻：** [Object.keys()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- **實戰導引：** [Object.fromEntries() — 將清單轉回物件](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)

---
*《JS 核心重構：勇者轉職傳說》| 容器掃描完畢、清單就緒、準備進入生產線*
