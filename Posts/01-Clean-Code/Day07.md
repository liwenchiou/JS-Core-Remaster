# Day 07：【結界】記憶膠囊（閉包）與 IIFE 結界術：守護你的區域變數

> **本文同步分享於個人部落格：[Liwen Chiou | Digital Architect & Full-Stack Engineer](https://liwenchiou.github.io/liwenblog/#intro)**

---

### **📜 這裡的修煉規則：**
> **孩子，先別急著出發，既然來了就聽導師嘮叨幾句：**
> 在接下來的 30 天裡，我每天都會在卷軸末尾為你準備一個 **「實戰演武場 CodePen」**。這裡沒有競爭，只有你在修煉場揮汗留下的痕跡。當你完成後，就帶著這份收穫回到公會的 **「QuestBoard 佈告欄」** 與夥伴們分享吧。
> 記住，導師看重的從來不是完美的程式碼，而是你在那些挫折中，依然選擇握緊劍柄、再次嘗試的勇氣。

---

## 🛡️ 【公會委託：守護秘密的記憶膠囊】

> **公會的戰略會議室外，人多口雜...**
> 
> 「新夥伴，你在會議桌上隨手攤開的作戰地圖，剛才差點被隔壁村的間諜偷看了！」導師神情嚴肅，將那張地圖收進一個發光的透明球體中。
> 
> 在這個世界，有些情報（變數）不該讓所有人都能隨便修改。如果你把「剩餘藥水數量」公佈在公會告示牌上（全域變數），誰都能偷偷擦掉它、改成 0，那你連自己怎麼死的都不知道。
> 
> 今天，我要教你公會核心的 **「結界術」**。學會如何建立一個獨立的時空，在那裡，你的變數可以被外人看見，但絕對無法被外人隨便碰觸。這就是失傳已久的 **「記憶膠囊（閉包）」**。

---

## 💡 【導師講義：圖解底層真相】

### 1. 基礎結界：IIFE 立即執行的保護作用
在我們學會如何「跨時空」留住變數前，我們先學會如何「建立防牆」。
**IIFE (Immediately Invoked Function Expression)** 就像是一個 **「一次性拋棄式結界」**。
它在被宣告的瞬間就立刻啟動，並在執行完後立刻摧毀，目的是為了保護內部的變數不要流出去污染到外面的公會大廳（全域作用域）。

```javascript
(function() {
  const secret = "這是公會內部情報";
  console.log("🛡️ [結界啟動] 正在處理秘密資訊...");
})(); 

// 外面的人寫 console.log(secret) 會噴錯，因為結界已斷絕一切！
```
- 結界的「傳音管」：傳遞參數
IIFE 不僅能隔離，還能將外部的變數「固定」後傳進去。
這在處理非同步（如 for 迴圈搭配 setTimeout）時非常經典。
補充點： 它可以像傳送門一樣，把全域變數（如 window 或 jQuery）鎖定在區域內使用。
```JavaScript
(function(msg) {
  console.log("🛡️ 結界內收到指令：" + msg);
})("啟動防禦機制"); 

//🛡️ 結界內收到指令：啟動防禦機制
```
我們利用 IIFE 在每一次迴圈時，強行把當下的 i 值「捕捉」並鎖進結界裡：
```JavaScript
for (var i = 1; i <= 3; i++) {
  (function(lock_i) { // 這是傳音管的入口，把當下的 i 鎖進 lock_i
    setTimeout(function() {
      console.log("第 " + lock_i + " 秒發動技能");
    }, lock_i * 1000);
  })(i); // 這裡立即傳入當下的 i
}
// 結果：第 1 秒、第 2 秒、第 3 秒依序發動！
```
- 結界的「封印物」：回傳值
IIFE 執行完雖然會消失，但它可以留下一份禮物。
我們可以用它來建立一個只對外公開特定功能的物件。
補充點： 利用 IIFE 回傳一個物件，實現「封裝」。

```JavaScript
const guard = (function() {
  const hp = 100; // 外部無法修改
  return {
    checkStatus: () => console.log(`目前生命值：${hp}`)
  };
})();

guard.checkStatus(); // 100
// console.log(hp); // 報錯，成功保護私有變數
```
隱私金庫（錢包管理）
假設你在開發一個遊戲或電商系統，你不希望使用者的餘額（balance）隨便被 balance = 999999 這樣惡意修改，但你又需要提供「存款」與「查詢」的功能。

```JavaScript
const myWallet = (function() {
  // 🔒 這是結界內的私有變數，外部完全無法直觸
  let balance = 500; 

  // 🎁 回傳的「封印物」：只對外曝露特定的控制手柄
  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance += amount;
        console.log(`💰 成功存入 ${amount} 元`);
      }
    },
    checkBalance: function() {
      console.log(`🏦 當前帳戶餘額：${balance} 元`);
    }
  };
})();

myWallet.checkBalance();      // 🏦 當前帳戶餘額：500 元
myWallet.deposit(200);        // 💰 成功存入 200 元
myWallet.checkBalance();      // 🏦 當前帳戶餘額：700 元
console.log(myWallet.balance); // ❌ undefined（外部找不到這個變數）
```
3. 現代的替代方案：Block Scope (`{...}`)
在 ES6 之後，`let` 與 `const` 搭配大括號 `{}` 就能產生 區域作用域（Block Scope）。
補充點： 雖然 IIFE 很強大，但如果只是為了防止`變數污染`，現在更常直接使用 
```javascript
{ const a = 1; }
```
IIFE 現在更多用於需要「`立即回傳結果`」或「`獨立執行邏輯`」的場景。

- 簡單的大括號 `{ }` (Block Scope)
它只是一個「區域」，你沒辦法在開啟這道門的時候，順便塞一個值進去給它用。
它只能直接讀取外面的變數。

```JavaScript
const power = "⚡ 雷電";

{
  // 這裡只能「被動」讀取外面的 power
  console.log("取得力量：" + power); 
}
```
- IIFE (立即執行函數)
它本質上是一個 「函數」，所以它具備函數最強大的功能：「參數傳遞」與「值封裝」。
你可以把當下的狀態「丟」進去，讓內部的邏輯在一個穩定的環境下執行。

```JavaScript
(function(skill) {
  // 這裡的 skill 是被「傳進來」的，它被鎖定在這個時空裡
  console.log("🛡️ 結界內注入能量：" + skill);
})("🔥 火焰");
```

`{ }`： 只是把變數關起來，但不能像函數那樣「收禮物（參數）」。
`IIFE`： 不僅把變數關起來，還可以 「收禮物」並「回傳產品」 。

### 2. 記憶膠囊 (Closure)：跨越時空的變數存取
閉包就像是一個「附帶私人物資的咒語」。普通的咒語吟唱完，環境就會崩潰消失；但「記憶膠囊」能在環境消失後，依然讓特定的咒語抓著當初那個房間裡的變數不放。

在 `JavaScript` 的世界裡，當一個函式執行完畢，內部的變數通常會被「死神（`Garbage` `Collection`）」收走。
但閉包建立了一個特殊的聯繫，只要內層函式（咒語）還被外面的人持有，它當初誕生的那個環境（作用域）就不會被摧毀。

```JavaScript
function createCapsule() {
  let treasure = "💎 傳說級裝備"; // 這個變數本該在執行完後消失
  
  return function() {
    console.log("🎒 從膠囊中取出：" + treasure);
  };
}

const getTreasure = createCapsule(); 
// createCapsule 執行完了，按理說 treasure 應該消失了...
getTreasure(); // 但這裡依然能印出 💎 傳說級裝備！這就是閉包。
```
#### 實戰應用：私有變數的「保險箱」
我們可以利用它來製作「計數器」或「狀態追蹤」，且外人無法直接修改內部的數值。
這能避免全域變數被亂改的風險，達成真正的封裝。

```JavaScript
function createGuard() {
  let hp = 100; // 私有變數，外面改不到
  
  return {
    attacked: function(damage) {
      hp -= damage;
      console.log(`💥 受到傷害！剩餘血量：${hp}`);
    },
    getHP: function() {
      return hp;
    }
  };
}

const myGuard = createGuard();
myGuard.attacked(20); // 剩餘血量：80
console.log(myGuard.hp); // undefined (外人打不開保險箱)
```
#### 注意事項：膠囊太多的副作用（記憶體洩漏）
雖然記憶膠囊很強大，但如果不小心留了太多沒用的膠囊，會佔用大量的公會倉庫（記憶體）。
如果你不再需要那個閉包，記得要把持有它的變數設為 `null`，好讓死神過來收走它。

> **導師的圖解心法：** 觀察下面的圖，你可以看到當 `outer` 函式這個房間塌掉後，內部的 `inner` 函式卻用一條透明的絲線，死死拉住了房間裡的 `data`。這條絲線，就是閉包。

![Day 07：記憶膠囊運作圖](https://i.meee.com.tw/Ap8kqbQ.jpg)

---

## 🛖 【營火叮嚀：為什麼你的計數器會壞掉？】
> 導師看過很多冒險者，為了做一個「點擊次數」功能，就開心地寫了一個全域變數 `let count = 0`。結果沒多久，別人的咒語、甚至是一個路過的插件，也宣告了 `count`，你的數值就此混亂。
> 
> **「污染」是程式碼腐朽的根源。** 透過閉包，我們能將每個元件的 **「私有狀態 (Private Variable)」** 鎖在自己的小盒子裡。這就是為什麼未來你在施展某些「極意之術 🛡️」時，它能記住你上一次施法的狀態，卻不會影響到其他人。

---

## ⚔️ 【演武場：從冒險者到勇者辛梅爾】

### 招式示範：私有計數器 (Data Encapsulation)

#### ❌ 冒險者：漏洞百出的公開看板
```javascript
let goldInBag = 100; // 全部公會成員都能動它，極度危險！

function buyItem() {
  goldInBag -= 10;
}
```

#### ✅ 勇者辛梅爾：鎖在防護結界裡的物資袋
```javascript
function createWallet() {
  let innerGold = 100; // 🔒 被鎖在結界裡的秘密變數 (Private)
  
  return function() {
    innerGold -= 10;
    console.log(`🛡️ 秘密錢包餘額：${innerGold}`);
  };
}

const myWallet = createWallet(); 
myWallet(); // 輸出：90
myWallet(); // 輸出：80
// 外界完全無法透過任何手段修改 innerGold，安全感滿分！
```

---

#### ⚠️ 【實戰雷區：避開那些致命陷阱】
> **1. 記憶體肥大 (Memory Leak)**：既然閉包會讓變數「死不撒手」，如果你建立了一萬個閉包卻不再使用它們，那你的記憶體就會像堆滿廢棄裝備的倉庫一樣，最終導致讀取緩慢。記得在不需要時釋放掉（將引用的變數設為 `null`）。
> **2. 混亂的 IIFE 語法**：如果你看到一段長得像 `(function(){ ... })()` 的寫法，別被嚇到了，那對括弧 `( )` 只是為了把函式包成一個「表達式」以便立即發動而已。

---

## 🏰 【勇者精英課：記憶傳承的極致應用】
如果你好奇未來更高階的「狀態管理術」是如何記住數值的，那答案就在今天的課程裡。那些神祕技術的內部，就是利用閉包將你的狀態「釘」在一個特定的記憶體位置上。
學好閉包，你就不再只是「會用招式」，而是能看穿招式背後那條「透明絲線」的職人。

---

## 📝 【夥伴筆記：今日修煉精華】
##### *這份筆記是你的隨身護身符，卡關時看一眼，真相就在裡面。*
- **IIFE (結界術)**：立即執行，防止變數外流污染全域。
- **閉包 (Closure)**：函式加上它被宣告時的環境，組合而成的記憶膠囊。
- **私有變數**：利用閉包讓外界「看得到功能、改不到數據」。

---

## 🎯 【公會佈告欄：交付本日任務】
[📜 本日實戰任務：記憶膠囊與秘密錢包實驗室 (CodePen)]([在此插入網址](https://codepen.io/editor/liwenchiou/pen/019d061b-85b0-7ee9-8fd7-3e0f7d29c956))
[🛡️ 任務達成證明：QuestBoard 公會報到處](https://liwenchiou.github.io/QuestBoard-Remaster/)

### **⚔️ 任務鑑定條件：**
> 1. 完成 CodePen 中計數器與私有變數的挑戰。
> 2. 將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
>    - **初心者**：當你發現外面的程式碼「完全摸不到」錢包裡的數值時，這種安全障礙感讓你聯想到現實生活中的什麼？
>    - **冒險者**：如果我們同時呼叫兩次 `createWallet()` 產出兩個錢包，你覺得它們的餘額會互相影響嗎？為什麼？

---

## 📚 【圖書館卷軸：延伸學習】
- **MDN 官方文獻：** [閉包詳細解釋](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Closures)
- **實戰導引：** [IIFE 立即調用函式詳解](https://developer.mozilla.org/zh-TW/docs/Glossary/IIFE)

---
*《JS 核心重構：勇者轉職傳說》| 結界築起、秘密守護、邁向職人底層*
