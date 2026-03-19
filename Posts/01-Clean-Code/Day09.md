# Day 09：陣列大戰：從傳統 for 迴圈進化到自動化連線 map 與 filter

> **本文同步分享於個人部落格：[Liwen Chiou | Digital Architect & Full-Stack Engineer](https://liwenchiou.github.io/liwenblog/#intro)**

---

### **📜 這裡的修煉規則：**
> **孩子，先別急著出發，既然來了就聽導師嘮叨幾句：**
> 在接下來的 30 天裡，我每天都會在卷軸末尾為你準備一個 **「實戰演武場 CodePen」**。這裡沒有競爭，只有你在修煉場揮汗留下的痕跡。當你完成後，就帶著這份收穫回到公會的 **「QuestBoard 佈告欄」** 與夥伴們分享吧。
> 記住，導師看重的從來不是完美的程式碼，而是你在那些挫折中，依然選擇握緊劍柄、再次嘗試的勇氣。

---

## 🛡️ 【公會委託：全自動化生產線】

> **公會的物資處理中心，一整隊冒險者正在揮汗如雨...**
> 
> 「一、二、三... 數到這裡，把壞掉的零件丟掉，再把剩下的零件拿去磨光。」這是一場極其低效的勞動。新夥伴，我看到你正拿著一把「舊式鐵鏟 (for 迴圈)」，手動在名單裡挖資料。
> 
> 這種操作不僅累人，最危險的是容易數錯編號（索引），導致名單最後一個人被漏掉。今天，我要帶你引進公會最新科技：**「全自動化生產線 (map/filter)」**。你只需要設定好「規則」，剩下的煩瑣細節，陣列會自己幫你完成。

---

## 💡 【導師講義：圖解底層真相】

### 1. 陣列魔法的三大職位
現代陣列方法的核心思維是：**「告訴陣列你要什麼結果，而不是教它怎麼走路。」**

#### 🛠️ 陣列三劍客：深度職位手冊
在 JavaScript 的冒險中，這三者最大的共同點是：它們都不會改動原始陣列（除了 forEach 可能會透過側寫改動外），而是專注於產生新結果。

- `forEach()`：熱血傳令兵 (Side Effect Expert)
傳令兵只負責「跑腿」，他拿到指令後會對每個人大喊或做事，但他不帶回任何結果（回傳值永遠是 undefined）。
核心特性：執行「副作用」（如修改 DOM、存入資料庫、印出 Log）。
隱藏手柄：除了 `item`，他還知道現在是「`第幾個`」以及「`整隊是誰`」。

```JavaScript
const warriors = ["辛梅爾", "海塔", "艾冉"];

warriors.forEach((name, index) => {
  // index 是隱藏的「序號」
  console.log(`第 ${index + 1} 位隊員是：${name}`);
});
// 🛡️ 雖然執行了，但 warriors 陣列本身完全沒變。
```

- `filter()`：嚴格篩選機 (The Gatekeeper)
篩選機就像是公會的「任務審查員」。他會對每個人進行 `true/false` 的測試，只有過關的人（回傳為 `true`）才能進入新名單。
核心特性：產出的新陣列長度通常會縮短（或等於原長度）。
關鍵思維：判定條件必須是一個「布林值（Boolean）」。

```JavaScript
const team = [
  { name: "辛梅爾", job: "勇者", alive: false },
  { name: "芙莉蓮", job: "魔法使", alive: true }
];

// 只留下還活著的隊員
const survivors = team.filter(member => member.alive); 
// [ { name: "芙莉蓮", ... } ]
```
- `map()`：全能加工廠 (The Transformer)
加工廠是最強大的職位。它保證進去多少人，出來就有多少人，但每個人的「樣貌」都會被重新定義。
核心特性：產出的新陣列長度絕對等於原陣列長度。
關鍵思維：適合用來從複雜物件中「抽取」特定資訊，或進行「數值轉換」。

```JavaScript
const monsters = [
  { species: "史萊姆", exp: 10 },
  { species: "紅龍", exp: 5000 }
];

// 擊敗後，只提取經驗值並加成
const expGains = monsters.map(m => m.exp * 1.5); 
// [15, 7500]
```
#### ⚔️ 進階連鎖技：Method Chaining
這才是現代 JavaScript 最迷人的地方！你可以像堆疊積木一樣，把這些職位串起來：「先篩選，後加工。」

```JavaScript
const shopItems = [
  { name: "生鏽劍", price: 100, quality: "Bad" },
  { name: "大天使之劍", price: 1000, quality: "Epic" },
  { name: "普通的杖", price: 200, quality: "Good" }
];

// 任務：找出品質不是 Bad 的武器，並通通打 9 折
const finalSale = shopItems
  .filter(item => item.quality !== "Bad")  // 1. 篩選 (剩 2 樣)
  .map(item => ({                          // 2. 加工 (改價格)
    ...item,
    salePrice: item.price * 0.9
  }));

console.log(finalSale);
```

> **導師的圖解心法：** 觀察圖中的輸送帶。`filter` 就像是一個篩網，刷掉不合格的礦石；而 `map` 就像是一台加工機，把每一塊礦石都打磨成發光的寶石。

![Day 09：陣列生產線](https://i.meee.com.tw/ceDc4tm.jpg)


---

## 🛖 【營火叮嚀：為什麼寫 for 迴圈的人常踩雷？】
> 導師看過太多冒險者因為 `i <= array.length` 還是 `i < array.length` 這種小細節，導致整個咒語崩潰。
> 
> **「細節越多，陷阱越多。」** 使用 `map` 或 `filter` 的最大好處，就是你完全不需要管那個該死的 `i` 是多少。這不僅讓程式碼更乾淨，最重要是它體現了 **「不可變性 (Immutability)」**：原版資料永遠不動，我們產出的永遠是新的、乾淨的結果。這在未來你處理複雜資料流轉化時，是存活的關鍵。

---

## ⚔️ 【演武場：從冒險者到勇者辛梅爾】

### 招式示範：全自動物資處理中心 (Array Data Transformation)

#### ❌ 冒險者：手動搬運工人 (for loop)
```javascript
const inventory = [
  { name: "生鏽劍", price: 100, isBroken: true },
  { name: "大天使之劍", price: 1000, isBroken: false }
];

const saleItems = [];
for (let i = 0; i < inventory.length; i++) {
  if (!inventory[i].isBroken) {
    saleItems.push(`${inventory[i].name} 特價：${inventory[i].price * 0.8}`);
  }
}
```

#### ✅ 勇者辛梅爾：生產線鏈式連發 (Map + Filter + Spread)
```javascript
const inventory = [
  { name: "生鏽劍", price: 100, isBroken: true },
  { name: "大天使之劍", price: 1000, isBroken: false },
  { name: "精靈杖", price: 500, isBroken: false }
];

// 1. 篩選堪用的武器 (filter)
// 2. 加工：複刻物件（Day 06 展開）並新增折扣價與鑑定報告 (map)
const finalInventory = inventory
  .filter(item => !item.isBroken)
  .map(item => ({
    ...item,
    salePrice: item.price * 0.8,
    report: `🛡️ 報告：${item.name} 已修復並準備上架。`
  }));

console.log(finalInventory);
```

> **導師講評：** 你看，勇者的寫法讀起來就像在讀人類的指令：「過濾，然後加工」。這就是 **「聲明式 (Declarative)」** 程式碼的威力，它讓你在處理複雜物件結構時，依然能優雅地施法。

---

#### ⚠️ 【實戰雷區：避開那些致命陷阱】
> **1. 忘記回傳 (Missing Return)**：這是在 `map` 與 `filter` 裡最常發生的「沈默悲劇」。如果你在大括號 `{ }` 裡忘記寫 `return`，結果會出現一堆 `undefined`。
> 記得 Day 03 學過的 **「極速吟唱 (Implicit Return)」** 嗎？省略大括號的一行代碼能幫你省去許多麻煩。
> **2. 靈魂連結副作用 (Direct Mutation)**：在 `map` 加工物件時，如果你直接寫 `item.price = 10`，這會直接破壞原始寶箱的資料。**「永遠回傳一個複刻後的新物件」**（利用 ...item），才是生產線純淨的保證。

---

## 🏰 【勇者精英課：終極鍊金術 reduce()】
如果你想把一整袋名單的資料 **「歸納、縮減」** 成一個具體的東西（比如總血量、或是一張複雜的統計表），那你需要 `reduce()`。
**核心心法：如果你只需要一個最終結果（而非一條名單），這就是你的終極武器。**
這招是全能的，它不論是過濾、加工還是計算總和，都能一招完成。在未來處理深層物件結構時，它是大師級的必備武器。

```JavaScript
const party = [
  { name: "辛梅爾", atk: 120 },
  { name: "芙莉蓮", atk: 500 },
  { name: "艾冉", atk: 300 }
];

const totalAtk = party.reduce((sum, member) => {
  return sum + member.atk;
}, 0); // 初始值設定為 0

console.log(`🔥 小隊總攻擊力：${totalAtk}`); // 920
```
---

## 📝 【夥伴筆記：今日修煉精華】
- **forEach()**：單純執行任務（副作用），不產生新名單。
- **map()**：生產新貨（新名單），長度不變，每個人的「長相」重新定義。
- **filter()**：精準篩選，名單變短，保留符合條件的人。
- **職位守則**：如果你要「拿一條新名單」就用 Map；如果你只是要「叫大家去敲門 (印 Log/存檔)」就用 forEach。
- **鍊式連鎖**：先過濾、後加工，如流水線般優雅串接指令。

---

## 🎯 【公會佈告欄：交付本日任務】
[📜 本日實戰任務：全自動物資處理中心實驗室 (CodePen)](https://codepen.io/editor/pen)
[🛡️ 任務達成證明：QuestBoard 公會報到處](https://liwenchiou.github.io/QuestBoard-Remaster/)

### **⚔️ 任務鑑定條件：**
> 1. 完成 CodePen 中題目挑戰。
> 2. 將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
>    - **初心者**：第一次試著把兩個方法「連在一起 (Chaining)」寫時，這讓你覺得方便嗎？
>    - **冒險者**：如果我們想篩選出寶箱中價格超過 100 的道具，你會用 map 還是 filter？為什麼？ —— *任務完成後，你的名字將永遠標記在公會的英雄榜上！*

---

## 📚 【圖書館卷軸：延伸學習】
- **MDN 官方文獻：** [Array.prototype.map() — 加工廠](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- **實戰導引：** [reduce() 徹底解析 — 終極鍊金術](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

---
*《JS 核心重構：勇者轉職傳說》| 生產線啟動、手工藝告終、準備挑戰 this 大 Boss*
