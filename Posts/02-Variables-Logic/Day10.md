# Day 10：【圖解】this 到底是誰？變色龍盔甲的指向判定法

> **本文同步分享於個人部落格：[Liwen Chiou | Digital Architect & Full-Stack Engineer](https://liwenchiou.github.io/liwenblog/#intro)**

---

### **📜 這裡的修煉規則：**
> **孩子，先別急著出發，既然來了就聽導師嘮叨幾句：**
> 在接下來的 30 天裡，我每天都會在卷軸末尾為你準備一個 **「實戰演武場 CodePen」**。這裡沒有競爭，只有你在修煉場揮汗留下的痕跡。當你完成後，就帶著這份收穫回到公會的 **「QuestBoard 佈告欄」** 與夥伴們分享吧。
> 記住，導師看重的從來不是完美的程式碼，而是你在那些挫折中，依然選擇握緊劍柄、再次嘗試的勇氣。

---

## 🛡️ 【公會委託：變色龍盔甲的主人】

> **公會的大廳中央，放置著一套發出神祕光芒的盔甲...**
> 
> 「新夥伴，這套『變色龍盔甲 (`this`)』是公會最有名的聖物。它的神奇之處在於，它沒有固定的顏色，也沒有固定的主人。」導師指著那套盔甲。
> 
> 當戰士穿上它時，它就變成紅色且聽從戰士命令；當法師穿上它時，它就轉為藍色且聽從法師調遣。最尷尬的是，如果這套盔甲被隨便丟在全域沒人穿，它就會預設聽從「公會長 (Window)」的命令。
> 
> 很多冒險者會被 `this` 搞瘋，是因為他們在找「這段code在哪裡」，但其實你該找的是：**「現在是誰在用它？」**。

---

## 💡 【導師講義：圖解底層真相】

### 1. 變色龍判定法：誰呼叫，誰就是主人
在 JS 的世界裡，`this` 的指向並不是在寫咒語時決定的，而是在 **「發動咒語的瞬間（執行時）」** 決定的。

#### 判定三大金律：
1.  **物件呼叫**：如果咒語前面有名號 `obj.fn()`，那麼 `.` 點前面的人就是主人（宿主）。
    ```javascript
    const warrior = {
      name: "艾冉",
      attack() { console.log(this.name); }
    };
    warrior.attack(); // 輸出：艾冉 (點前面是 warrior)
    ```
2.  **簡易呼叫**：如果咒語前面沒人帶著，如 `fn()`，它就屬於最高領袖 (Window/Global)。但在嚴格模式下，它則是 `undefined`。
    ```javascript
    function shout() { console.log(this); }
    shout(); // 輸出：Window (或 undefined)
    ```
3.  **箭頭函式 (Inheritance)**：還記得 Day 03 嗎？箭頭函式沒有自己的 `this`，它直接繼承 **「宣告時外層執行環境」** 的主人。
    ```javascript
    const magic = {
      cast: () => { console.log(this); }
    };
    magic.cast(); // 輸出：Window (繼承外層的 Window)
    ```

#### 魔王的陷阱 —「回呼函式 (Callback)」中的 this
這是開發中最常出錯的地方。當你把物件的方法當作參數傳遞時，它常會變回「簡易呼叫」。

```JavaScript
const mage = {
  name: "辛梅爾",
  greet() {
    setTimeout(function() {
      console.log(this.name); // 猜猜看是誰？
    }, 100);
  }
};
mage.greet(); // 輸出：undefined (或空字串)
```
- 原因：setTimeout 內部的匿名函式屬於「簡易呼叫」，其 `this` 指向 `Window`。
- 解法：改用箭頭函式，因為箭頭函式會繼承 `greet()` 執行時的 `this`（即 `mage`）。

#### 除了被動判定，我們也可以用「契約」強制指定主人
#### 強制認主：bind / call / apply

| 方法   | 特點                                   | 範例呼叫方式                          | 是否立即執行 |
|--------|----------------------------------------|---------------------------------------|--------------|
| call() | 立即執行，參數逐一傳入                 | `fn.call(obj, arg1, arg2)`            | ✅            |
| apply()| 立即執行，參數以陣列形式傳入           | `fn.apply(obj, [arg1, arg2])`         | ✅            |
| bind() | 回傳一個新的函式，綁定好 `this`，不執行 | `const newFn = fn.bind(obj)`          | ❌            |

假設我們有一個通用的 attack 函式，以及兩位不同的戰士物件。

```JavaScript
// 通用的技能（咒語）
function attack(skill, damage) {
  console.log(`${this.name} 使用了 ${skill}，造成 ${damage} 點傷害！`);
}

// 兩位戰士（物件）
const warriorA = { name: "艾冉" };
const warriorB = { name: "休塔爾克" };
```
1. `call()`：點名立即發動
`call` 會立即執行函式。第一個參數是 `this` 的對象，後面的參數則一個一個傳入。
```JavaScript
// 強制讓 attack 的 this 指向 warriorA
attack.call(warriorA, "重擊", 50); 
// 輸出：艾冉 使用了 重擊，造成 50 點傷害！
```
2. `apply()`：團體裝備發動
`apply` 也會立即執行，唯一的差別是：除了第一個 `this` 對象外，後面的參數必須放在一個陣列 (`Array`) 裡面。
```JavaScript
// 適合當你的參數已經整理成一包陣列時
const skills = ["旋風斬", 80];
attack.apply(warriorB, skills); 
// 輸出：休塔爾克 使用了 旋風斬，造成 80 點傷害！
```
3. `bind()`：簽訂專屬契約（不立即發動）
`bind` 不會立即執行，它會回傳一個**「綁定好主人」的新函式**。這在處理非同步（如按鈕點擊、計時器）時最常用。
```JavaScript
// 為 warriorA 打造一個專屬的攻擊函式
const allenAttack = attack.bind(warriorA, "法術反制", 100);

// 之後在任何地方呼叫，主人永遠是 warriorA
setTimeout(allenAttack, 1000); 
// 1 秒後輸出：艾冉 使用了 法術反制，造成 100 點傷害！
```

#### 建構子判定 (`new` 關鍵字)
在 JavaScript 中，還有一種優先權極高的判定方式：當使用 new 運算子時，this 會指向該次產生的「新物件實例」。

```JavaScript
function Hero(name) {
  this.name = name;
}
const flamel = new Hero("弗拉梅爾"); 
console.log(flamel.name); // 輸出：弗拉梅爾
```
#### 總結優先權順序（由高到低）：
> 註：箭頭函式不參與此排序，它永遠看「宣告時的外層環境」。
- `new` 關鍵字（新生的分身）
- `bind` / `call` / `apply`（強制契約，注意 `bind` 為一次性綁定，後續無法再被變動）
- 物件呼叫 `obj.fn()`（點前面的主人）
- 簡易呼叫 `fn()`（預設領袖/undefined）


> **導師的圖解心法：** 觀察圖中的盔甲。當盔甲是在 `warrior.attack()` 裡出現時，這件盔甲 (`this`) 就是 warrior；當它在全域環境直接被呼叫，它就變成了路人。

![Day 10：this 指向判定圖](https://i.meee.com.tw/WHFEtyZ.jpg)

---

## 🛖 【營火叮嚀：為什麼 this 總是讓你吐血？】
> 導師看過無數冒險者在處理「點擊事件」或「回呼函式 (Callback)」時，一用 `this` 就噴出 `undefined`。
> 
> **「你沒帶它出門，它就不是你的。」** 很多人以為在物件裡寫了 `this`，這輩子它就跟定你了。錯！如果你把這個咒語交給別人（傳入外部函式執行），它就失去了物件對它的控制力。若你呼叫時失去了「門牌號碼 (.)」，它的 `this` 就會換人。

---

## ⚔️ 【演武場：從冒險者到勇者辛梅爾】

### 招式示範：看穿盔甲的主人 (Binding Context)

#### ❌ 冒險者：自作多情的誤判
```javascript
const hero = {
  name: "辛梅爾",
  shout: function() { console.log(`🛡️ 勇者：${this.name}`); }
};

const talk = hero.shout; // ⚠️ 把咒語「單獨」儲存起來
talk(); // 輸出：🛡️ 勇者：undefined (因為 talk 前面沒點)
```

#### ✅ 勇者辛梅爾：精準的強制綁定 (Bind)
```javascript
const hero = {
  name: "辛梅爾",
  shout: function() { console.log(`🛡️ 勇者：${this.name}`); }
};

const talk = hero.shout.bind(hero); // 🔒 預約咒語時，強行指定主人為 hero
talk(); // 輸出：🛡️ 勇者：辛梅爾 (門牌已鎖死！)
```

> **導師講評：** 你看，勇者利用 **`bind`** 完成了「靈魂鎖定」。無論這段咒語被傳到哪裡，它永遠知道自己的真正主人是誰。

---

#### ⚠️ 【實戰雷區：避開那些致命陷阱】
> **1. 遺失的 `Context`**：當你寫 `addEventListener('click', obj.fn)` 時，`obj.fn` 就失去了它的物件，導致 `this` 亂跑。
> **2. 強奪主權法**：**`call`** 與 **`apply`** 可以立即發動咒語並指定主人。兩者的差別在於傳送物資（參數）的方式：`call` 是一個一個傳，`apply` 則是打包成陣列（Array）傳。

---

## 🏰 【勇者精英課：掌握主流開發中的 this 陷阱】
在大型架構中，你可能會看到大量的事件綁定。這是因為在 JS 的方法 (`methods`) 裡，函數若脫離宿主，`this` 就會消失。若不手動 `bind`，當這個方法被放在外部發動時，盔甲的主人會變回路人。這就是為什麼現代職人更推薦使用 **「箭頭函式 + 特定物件結構」**，因為箭頭函式能自動繼承宣告時的宿主，讓你省去手動鎖定靈魂的手續。防止 `this` 遺失，是通往高階架構的必經之路。

---

## 📝 【夥伴筆記：今日修煉精華】
- **物件調用**：`obj.fn()`，`this` 為 `obj`。
- **簡易調用**：`fn()`，`this` 易變（通常為 window 或 undefined）。
- **手動調位**：使用 `call`, `apply`, `bind` 強制決定 `this` 的歸屬。
- **箭頭函式**：沒有靈魂的變色龍，主人永遠是宣告時的外層環境。

---

## 🎯 【公會佈告欄：交付本日任務】
[📜 本日實戰任務：變色龍盔甲判定實驗室 (CodePen)](https://codepen.io/editor/liwenchiou/pen/019d0a26-9ab3-747a-b6e8-c79c014cd865)
[🛡️ 任務達成證明：QuestBoard 公會報到處](https://liwenchiou.github.io/QuestBoard-Remaster/)

### **⚔️ 任務鑑定條件：**
> 1. 完成 CodePen 中題目挑戰。
> 2. 將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
>    - **初心者**：當你第一次發現「咒語脫離物件後會找不到主人」時，你有什麼防範計畫？
>    - **冒險者**：如果我們想讓一個傳入回呼函式的 `this` 乖乖指向我們的英雄，你除了 `bind` 之外，還會用哪招（Day 03 教過的）？ —— *任務完成後，你的名字將永遠標記在公會的英雄榜上！*

---

## 📚 【圖書館卷軸：延伸學習】
- **MDN 官方文獻：** [this 關鍵字詳解](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/this)
- **實戰導引：** [call, apply 與 bind 的三大不同點](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

---
*《JS 核心重構：勇者轉職傳說》| 身份確認、盔甲歸位、基礎階段修煉達成*
