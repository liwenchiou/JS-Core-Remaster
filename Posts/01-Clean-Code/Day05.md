# Day 05：【原理】改了 A 卻壞了 B？記憶體傳址與副本的真相

> **本文同步分享於個人部落格：[Liwen Chiou | Digital Architect & Full-Stack Engineer](https://liwenchiou.github.io/liwenblog/#intro)**

---

### **📜 這裡的修煉規則：**
> **孩子，先別急著出發，既然來了就聽導師嘮叨幾句：**
> 在接下來的 30 天裡，我每天都會在卷軸末尾為你準備一個 **「實戰演武場 CodePen」**。這裡沒有競爭，只有你在修煉場揮汗留下的痕跡。當你完成後，就帶著這份收穫回到公會的 **「QuestBoard 佈告欄」** 與夥伴們分享吧。
> 記住，導師看重的從來不是完美的程式碼，而是你在那些挫折中，依然選擇握緊劍柄、再次嘗試的勇氣。

---

## 🛡️ 【公會委託：消失的藍色裝備】
> **新夥伴，歡迎來到冒險中第一個讓人懷疑人生的路口：**
> 
> 你在公會租了一套「勇者藍」的傳奇皮甲（`basicArmor`）。想著明天的派對要出風頭，你對著它下了一道指令：`const myArmor = basicArmor;`，並開心地把 `myArmor` 染成了亮紅色。
> 
> 結果第二天，當你回到公會倉庫，發現公會長那套原本是藍色的 `basicArmor` 竟然也變成了刺眼的亮紅色！你被罰打掃巨龍排泄物一整個月。
> 
> 這不是什麼邪惡的詛咒，這是 JS 進階冒險者必須掌握的基礎原理——**「傳址（Pass by Reference）」**。

---

## 💡 【導師講義：圖解底層真相】

### 影印傳單 vs. 共用鑰匙
在 JS 世界中，資料的遞交方式有兩種完全不同的模式：

#### 基礎型別：影印傳單 (Pass by Value)
這包含 `Number`, `String`, `Boolean`, `Null`, `Undefined`, `Symbol` 與 `BigInt`。

當你將變數賦值給另一個變數時，JS 會在記憶體中開闢一個全新的空間來存放這個值的複本。

```JavaScript
let a = 10;
let b = a; // 影印一份 10 給 b
b = 20;    // 修改 b，a 依舊是 10

console.log(a,b); //10,20
```
![](https://i.meee.com.tw/Ptdmt89.jpg)
#### 物件型別：共用鑰匙 (Pass by Reference)
這包含 `Object`, `Array`, `Function`。

變數儲存的其實是記憶體位址（指標）。這就是為什麼當你修改 `myArmor` 的屬性時，原有的 `basicArmor` 也會跟著變動，因為它們指向的是同一個實體。

```JavaScript
const basicArmor = { color: 'silver' };
const myArmor = basicArmor; // 給出一把備份鑰匙
myArmor.color = 'gold';      // 進入同一個房間換掉盔甲顏色
console.log(basicArmor.color); // 輸出 'gold'
```

![](https://i.meee.com.tw/y6JXifY.jpg)
#### 進階觀念：重新賦值 (Re-assignment)
這是一個常見的陷阱。如果你不是修改物件的「內容」，而是給變數一個新的物件，這就像是「換了一把新鑰匙」，它會斷開與舊地址的連結。

```JavaScript
let roomA = { items: 'bed' };
let roomB = roomA; // 兩人都拿 A 房間鑰匙，此時 roomB={ items: 'bed' };

roomB = { items: 'sofa' }; // roomB 換了一把「新房間」的鑰匙，此時 roomB={ items: 'sofa' };
// 此時 roomA 依然指向原本的 'bed' 房間，兩者不再相關。
```

### 為什麼要區分這兩者？
在 JS 開發中，如果你分不清楚這兩者，最常遇到的問題就是 「副作用 (Side Effects)」。

- 基礎型別 (`Pass by Value`)：因為是複製品，所以你可以放心修改，不會影響到原本的資料來源。這在處理單純的數值運算或狀態標記時非常安全。
- 物件型別 (`Pass by Reference`)：當你把一個陣列或物件傳進函數（Function）裡修改時，原有的資料也會被改掉。這有時候是故意的（為了節省記憶體），但有時候會導致難以追蹤的 Bug。

## 🛖 【營火叮嚀：導師的經驗談】
> 導師見過太多優秀的冒險者，在開發大型專案時，因為沒搞懂「傳址」，導致在修改 A 模組的資料時，暗中捅壞了 B 模組的狀態。
> 
> 這種現象會讓你的程式變得非常難以調校（Debug），因為你永遠不知道是誰動了你的儲藏室。記住這句話：**「在 JS 裡，物件與陣列是有靈魂連結的，除非你手動斷開它。」**

---

## ⚔️ 【演武場：從冒險者到勇者辛梅爾】

### 招式示範：破解連結陷阱
當你想要幫隊友修改屬性，卻不想動到原來的資料庫時，千萬不要直接賦值。

#### ❌ 冒險者：危險的靈魂連結
```javascript
const originalHero = { name: "勇者", hp: 100 };
const cloneHero = originalHero; // ⚠️ 分身術失敗，這只是多一個標籤

cloneHero.hp = 0; // 慘了，originalHero 也要進墓地了
console.log(originalHero.hp); // 輸出：0
```

#### ✅ 勇者辛梅爾：利刃般的警覺
勇者知道，在還沒學會明天的「影印大法」前，必須人工手動重新建立容器：

```javascript
const originalHero = { name: "勇者", hp: 100 };

// 雖然麻煩，但這樣才是「新儲藏室」
const realCloneHero = {
    name: originalHero.name,
    hp: originalHero.hp
};

realCloneHero.hp = 0; 
console.log(originalHero.hp); // 輸出：100 (安全！)
```

---

#### ⚠️ 【實戰雷區：避開那些致命陷阱】
> **「函式傳參」也是傳址！**
> 很多人會把物件傳進 function 裡修改。記住，如果你在 function 裡面改了物件的屬性，function 外面的原版也會跟著變！這就是為什麼老手在寫函式時，通常會傾向於「回傳一個新物件」而不是直接修改帶進來的參數。

---

## 🏰 【勇者精英課：邁向職人的進階架構】
### 為什麼 `const` 宣告的物件還是能改？
這是一個非常經典的誤解。
```javascript
const player = { name: "A" }
```
*   `const` 保證的是你這把 **「鑰匙」** 不能換成別人的（你不能把 `player` 重新指向另一個物件）。
*   但 `const` 並不保證你不能拿這把鑰匙進去 **「換儲藏室裡的家具」**。如果你想連家具都不准動，那需要用到 `Object.freeze()` 這一類的封印術。

---

## 📝 【夥伴筆記：今日修煉精華】
##### *這份筆記是你的隨身護身符，卡關時看一眼，真相就在裡面。*
- **傳值 (Value)**：數字、字串等。是副本，改 A 不壞 B。
- **傳址 (Reference)**：陣列、物件等。是鑰匙，大家公用同一個空間。
- **副作用 (Side Effect)**：不經意改到其他變數的現象，是 BUG 的溫床。

---

## 🎯 【公會佈告欄：交付本日任務】
[📜 本日實戰任務：雙子座鎖鏈偵查實驗室 (CodePen)](https://codepen.io/editor/liwenchiou/pen/019d0040-eeba-70eb-8e4c-32eca31605b5)
[🛡️ 任務達成證明：QuestBoard 公會報到處](https://liwenchiou.github.io/QuestBoard-Remaster/)

### **⚔️ 任務鑑定條件：**
> 1. 完成 CodePen 中關於變數賦值後的交叉影響測試。
> 2. 將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
>    - **初心者**：當你看到原版裝備被「莫名其妙」改掉時，你的第一反應是什麼？
>    - **冒險者**：請試著推論，如果陣列裡面裝著物件，我們只用 `const b = a` 之後改動陣列裡面的物件，會發生什麼事？ —— *任務完成後，你的名字將永遠標記在公會的英雄榜上！*

---

## 📚 【圖書館卷軸：延伸學習】
- **MDN 官方文獻：** [JavaScript 的資料型別與結構](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Data_structures)
- **實戰導引：** 如何用 `Object.freeze` 徹底封印你的資料箱？
