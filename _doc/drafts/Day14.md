# Day 14：事件監聽：當使用者點下去後，瀏覽器發生了什麼？

> **本文同步分享於個人部落格：[Liwen Chiou | Digital Architect & Full-Stack Engineer](https://liwenchiou.github.io/liwenblog/#intro)**

---

### **📜 這裡的修煉規則：**
> **孩子，先別急著出發，既然來了就聽導師嘮叨幾句：**
> 在接下來的 30 天裡，我每天都會在卷軸末尾為你準備一個 **「實戰演武場 CodePen」**。這裡沒有競爭，只有你在修煉場揮汗留下的痕跡。當你完成後，就帶著這份收穫回到公會的 **「QuestBoard 佈告欄」** 與夥伴們分享吧。
> 記住，導師看重的從來不是完美的程式碼，而是你在那些挫折中，依然選擇握緊劍柄、再次嘗試的勇氣。

---

## 🛡️ 【公會委託：當他在門口踩了你的地雷】

[「導師，我已經在門口佈下陷阱了，但我該如何監視它？」
導師笑了笑說：「冒險者，身為專業的戰場指揮官，你只需要在那裡留下一個『自鳴笛 (addEventListener)』。隨便他什麼時候踩，笛聲會自動響起，還會順便告訴你，是誰踩的、在哪個座標踩的。」]

---

## 💡 【導師講義：圖解底層真相】

### 1. 陷阱觸發器 (Event Listener)
[在網頁開發中，互動的核心就是「監聽」。你並不用寫程式碼去「盯著」按鈕，你只需要告訴 JS：`當 (on) 某個動作發生時，請執行 (do) 下一個指令。`]

*   **target.addEventListener('type', callback)**：
    *   **target**：誰在哪裡（按鈕、輸入框）。
    *   **type**：觸發動作（點擊 click, 滑入 hover, 輸入 input）。
    *   **callback**：警報響起後的應對計畫。

> **導師的圖解心法：** 想像這是一張偵訊報告。當陷阱被踩中，系統會生成一份「事件物件表 (Event Object)」，裡面列滿了嫌疑犯的所有資料。

![原理邏輯圖](./images/Day14_logic_diagram.png)

<!-- 🎨 圖解提示詞 (導師專用，產後刪除)：
[元素：按鈕左側有一個擴音器圖標標註 addEventListener('click')；按鈕受點擊後的報告 (e) 標記：e.target (按鈕本人), e.type (click), e.clientX (點擊位置)。]
-->

---

## 🛖 【營火叮嚀：導師的經驗談】
> 很多冒險者還在用舊時代的 `onclick` 屬性寫在 HTML 裡。聽導師一句勸，那是很不專業的「強耦合代碼」。現代公會標準是把 HTML 同事（外觀）跟 JS 同事（邏輯）分開，所有的監聽通通都要寫在 JS 裡面。這不僅好維護，還能避免一個人學過頭、在代碼裡亂塞邏輯。

---

## ⚔️ 【演武場：從冒險者到勇者辛梅爾】

### 招式示範：監聽點擊與回饋
[展示「舊式標籤（Before）」與「現代監聽（After）」的對比。]

#### ❌ 冒險者：在 HTML 亂塞邏輯
```html
<button onclick="attack()">發動攻擊</button>
```

#### ✅ 勇者辛梅爾：在 JS 乾淨地掛載監聽
```javascript
// 1. 先定位標靶
const btn = document.querySelector('#attack-btn');

// 2. 安裝觸發器
btn.addEventListener('click', function(e) {
  // e 就是那份偵訊報告 (Event Object)
  console.log('陷阱被觸發了！');
  console.log('是誰點的：', e.target);
  e.target.textContent = '冷卻中...';
});
```

> **導師講評：** 你看，`e.target` 是最有用的線索。它讓你不但知道「發生了什麼」，還知道「是哪個標籤」觸發了這場鬧劇。

#### ⚠️ 【實戰雷區：沒關掉的警報器】
> 在 React 等組件化開發中，如果你忘記在「撤退（Unmount）」時關掉警報器，這會造成嚴重的「記憶體洩漏 (Memory Leak)」。老練的勇者在某些場合要學會 `removeEventListener`。

---

## 🏰 【勇者精英課：邁向職人的進階架構】
[在現代前端框架中（如 React），我們雖然不直接寫 `addEventListener`，但框架底層為你處理了「合成事件 (Synthetic Events)」。理解原生 JS 的事件機制，能讓你在處理複雜的表單互動或動態組件時，明白為什麼有時候 `e.stopPropagation()` 是你的救命恩人。]

---

## 📝 【夥伴筆記：今日修煉精華】
##### *這份筆記是你的隨身護身符，卡關時看一眼，真相就在裡面。*
- **addEventListener**：在標籤上掛一個警笛。
- **click / input / scroll**：常見的觸發條件。
- **e.target**：真正被使用者動到的那件寶物。
- **e.preventDefault()**：阻止標籤的本能動作 (例如連結不跳頁)。

---

## 🎯 【公會佈告欄：交付本日任務】
[📜 本日實戰任務：陷阱觸發大解密 (CodePen)](https://codepen.io/your-library/pen/day14)
[🛡️ 任務達成證明：QuestBoard 公會報到處](https://liwenchiou.github.io/QuestBoard-Remaster/)

### **⚔️ 任務鑑定條件：**
> 1. 完成 CodePen 中題目挑戰。
> 2. 將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
>    - **初心者**：在你的按鈕上掛載「自鳴笛 (監聽器)」後，看見使用者的一舉一動都能在 Console 觸發互動回饋，這種「即時反應感」最讓你感到驚喜的地方是什麼？
>    - **冒險者**：如果你的按鈕裝在一個會自動重新整理頁面的表單 (`<form>`) 裡，你會如何使用 `e.preventDefault()` 來中斷這場「系統預設」的強制跳頁動作？ —— *任務完成後，你的名字將永遠標記在公會的英雄榜上！*

---

## 📚 【圖書館卷軸：延伸學習】
- **MDN 官方文獻：** [Document.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
