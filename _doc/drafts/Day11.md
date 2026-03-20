# Day 11：類別 Class：幫你的程式碼穿上「制服」

> **本文同步分享於個人部落格：[Liwen Chiou | Digital Architect & Full-Stack Engineer](https://liwenchiou.github.io/liwenblog/#intro)**

---

### **📜 這裡的修煉規則：**
> **孩子，先別急著出發，既然來了就聽導師嘮叨幾句：**
> 在接下來的 30 天裡，我每天都會在卷軸末尾為你準備一個 **「實戰演武場 CodePen」**。這裡沒有競爭，只有你在修煉場揮汗留下的痕跡。當你完成後，就帶著這份收穫回到公會的 **「QuestBoard 佈告欄」** 與夥伴們分享吧。
> 記住，導師看重的從來不是完美的程式碼，而是你在那些挫折中，依然選擇握緊劍柄、再次嘗試的勇氣。

---

## 🛡️ 【公會委託：打造你的史萊姆軍團】

[導師看著你正滿頭大汗地在羊皮紙上手寫每一隻史萊姆的屬性：
「這隻史萊姆叫小綠，血量 10，攻擊力 2...」
「這隻叫小藍，血量 12，攻擊力 1...」
導師嘆了口氣說：「冒險者，如果你要面對一萬隻史萊姆，難道你要手寫一萬次嗎？你需要的是一張『製圖模板』，只要模板定好了，工廠就能一秒產出一整支制式軍隊。」]

---

## 💡 【導師講義：圖解底層真相】

### 1. 勇者模板 (Class) 與 史萊姆分身 (Instance)
[在 JS 的世界裡，`Class` 並不是什麼神祕的咒語，它就是一間**工廠**。你定義了工廠的規格書（Constructor），往後只要喊一聲 `new`，工廠就會照著規格生出一個活生生的物件。]

> **導師的圖解心法：** 想像中間有一個巨大的「史萊姆藍圖」，下方有三隻穿著相同制服的史萊姆。雖然每隻史萊姆的顏色（狀態）可能不同，但他們擁有的招式（方法）都是連回那張藍圖的。

![原理邏輯圖](./images/Day11_logic_diagram.png)

<!-- 🎨 圖解提示詞 (導師專用，產後刪除)：
[元素：一個藍色的立體模具 (Class: Slime)；模具內部標註 constructor(color, hp)；模具下方產出三個不同顏色的史萊姆 (Instances)；史萊姆身上冒出對話框標註 attack()；有一條紅色虛線 (Prototype Chain) 從史萊姆連回模具頂部]
-->

---

## 🛖 【營火叮嚀：導師的經驗談】
> 很多新手覺得 `Class` 只是把 `Object` 包起來而已，沒什麼大不了。但聽著，當你的小隊變大、系統變複雜時，如果沒有一個統一的「制服格式」，你會發現昨天寫的小綠跟今天寫的小藍，雖然都叫史萊姆，但小綠是用 `power` 當攻擊力，小藍卻是用 `atk`。這就是代碼生鏽的開始。`Class` 能強迫大家遵守同一種協定，讓你的代碼具備「封裝感」。

---

## ⚔️ 【演武場：從冒險者到勇者辛梅爾】

### 招式示範：類別宣告與實例化
[展示「手動重複（Before）」與「類別封裝（After）」的差異。]

#### ❌ 冒險者：手動製作每一隻怪
```javascript
const slime1 = {
  name: '小綠',
  hp: 10,
  attack: function() { console.log(this.name + ' 發動衝擊！'); }
};

const slime2 = {
  name: '小藍',
  hp: 15,
  attack: function() { console.log(this.name + ' 發動噴水！'); }
};
// 如果有 100 隻，你就崩潰了
```

#### ✅ 勇者辛梅爾：定義模板，一秒複製
```javascript
class Slime {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
  }
  
  attack(action) {
    console.log(`${this.name} 發動了 ${action}！目前血量 ${this.hp}`);
  }
}

const army = [
  new Slime('小綠', 10),
  new Slime('小藍', 15),
  new Slime('小紅', 20)
];

army.forEach(s => s.attack('撞擊'));
```

> **導師講評：** 你看，勇者的寫法讓「史萊姆」變成了一種**型態**。不管後面產出多少隻，我們只需要維護 `Slime` 這個 Class 的邏輯，這就是專業工匠的基礎。

#### ⚠️ 【實戰雷區：this 的叛變】
> 在 Class 的方法（Method）裡，`this` 通常指向 `new` 出來的那隻史萊姆。但如果你把這個方法交給別人（例如事件監聽），`this` 可能會突然遺失主人！請記住 Day 10 的教訓，必要時請使用箭頭函式或 `bind`。

---

## 🏰 【勇者精英課：邁向職人的進階架構】
[其實，JS 的 `Class` 只是一個「語法糖」。它的底層依然是我們之前提過的 `Prototype`。當你呼叫 `s.attack()` 時，JS 會先在 `s` 身上找，找不到再去 `Slime.prototype` 找。這就是為什麼一萬隻史萊姆可以共用一個 `attack` 函式卻不會消耗萬倍記憶體的秘密。]

---

## 📝 【夥伴筆記：今日修煉精華】
##### *這份筆記是你的隨身護身符，卡關時看一眼，真相就在裡面。*
- **Class**：程式碼的生產模板 (工廠)。
- **Constructor**：物件出生時的「出生證明」，用來設定初始屬性。
- **Instance**：從工廠生產出來的「實體商品」。

---

## 🎯 【公會佈告欄：交付本日任務】
[📜 本日實戰任務：史萊姆戰鬥模擬器 (CodePen)](https://codepen.io/your-library/pen/day11)
[🛡️ 任務達成證明：QuestBoard 公會報到處](https://liwenchiou.github.io/QuestBoard-Remaster/)

### **⚔️ 任務鑑定條件：**
> 1. 完成 CodePen 中題目挑戰。
> 2. 將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
>    - **初心者**：在學會使用 Class 這個「生產模板」後，看著那些屬性完全對齊、整齊劃一的史萊姆軍團，你是否感受到從「搬運工」晉升為「設計師」的秩序美感？這對你的代碼品味有什麼新的衝擊？
>    - **冒險者**：如果我們在 Slime.prototype 身上動手腳，為何所有已經出生的史萊姆分身都能同步獲得新招式？請根據你對「記憶體位址」與「原型繼承（Prototype）」的理解，嘗試破解這場集體進化的技術密碼。 —— *任務完成後，你的名字將永遠標記在公會的英雄榜上！*

---

## 📚 【圖書館卷軸：延伸學習】
- **MDN 官方文獻：** [Classes in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- **實戰導引：** [Prototype vs Class](https://javascript.info/class)
