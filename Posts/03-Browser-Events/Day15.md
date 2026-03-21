# Day 15：【圖解】事件委派：一人領信，全家收件

> **本文同步分享於個人部落格：[Liwen Chiou | Digital Architect & Full-Stack Engineer](https://liwenchiou.github.io/liwenblog/#intro)**

---

### **📜 這裡的修煉規則：**
> **孩子，先別急著出發，既然來了就聽導師嘮叨幾句：**
> 在接下來的 30 天裡，我每天都會在卷軸末尾為你準備一個 **「實戰演武場 CodePen」**。這裡沒有競爭，只有你在修煉場揮汗留下的痕跡。當你完成後，就帶著這份收穫回到公會的 **「QuestBoard 佈告欄」** 與夥伴們分享吧。
> 記住，導師看重的從來不是完美的程式碼，而是你在那些挫折中，依然選擇握緊劍柄、再次嘗試的勇氣。

---

## 🛡️ 【公會委託：一人管理一整支軍隊】

[「導師，公會看板上新貼了 100 個任務，難道我要幫每個任務都配一個監聽士兵嗎？這樣我會累死、記憶體會爆掉啊！」
導師指著看板中心的大聲公說：「冒險者，身為專業的總管，你只需要在『公會門口 (父元素)』站一個人就夠了。只要有人踩在任意任務卡片上，聲音會一路『傳上來 (Bubble)』。你只要站在高處聽，就能知道是誰、在幹嘛。」]

---

## 💡 【導師講義：圖解底層真相】

### 1. 事件冒泡 (`Bubble`) 與 委派 (`Delegation`)
[當你點擊一個按鈕時，這個點擊事件並非只停留在按鈕上。它會像水底噴出的氣泡一樣，一路向上，經過父元素、阿公元素，直到 `document`。]

*   **傳統監聽**：幫 100 個按鈕掛 100 個 `addEventListener` (消耗記憶體、效能低)。
*   **優雅委派**：幫 1 個父容器掛 1 個監聽器，守株待兔！

#### 1. 為什麼「冒泡」會發生？在瀏覽器的 DOM 事件模型中，事件的傳遞其實分為三個階段：
- 捕獲階段 (Capture Phase)：由外向內找目標。
- 目標階段 (Target Phase)：到達你點擊的那個元素。
- 冒泡階段 (Bubble Phase)：由內向外傳回 window。

#### 2. 事件委派的核心：
`event.target` 要實現「優雅委派」，你必須認識事件物件（Event Object）中的兩個重要屬性：
- `e.currentTarget`：指的是「掛載監聽器」的那個元素（例如父容器）。
- `e.target`：指的是「真正觸發事件」的那個元素（例如你實際點到的按鈕）。

#### 假設你有一個清單，裡面有 100 個按鈕，你只需要在父層 `ul` 寫一次程式碼：
```JavaScript 
const list = document.querySelector(".button-list");

list.addEventListener("click", function(e) {
  // 檢查點擊的是不是按鈕 (過濾掉空白處)
  if (e.target.classList.contains("btn")) {
    console.log("點到了按鈕，內容是：", e.target.innerText);
    e.target.style.backgroundColor = "yellow";
  }
});
```
#### 事件委派的 3 大好處

| 好處       | 說明                                                                 |
|------------|----------------------------------------------------------------------|
| 節省記憶體 | 減少了 `EventListener` 的數量，對網頁效能大加分。                       |
| 動態元素支援 | 就算事後用 `JS` 新增按鈕，新按鈕也會自動擁有點擊功能。                   |
| 程式碼簡潔 | 邏輯集中處理，不需要在每個地方都寫一遍監聽。                           |

#### 4. 什麼時候要「阻止冒泡」？
有時候冒泡會造成困擾（例如點擊彈窗內的按鈕，卻意外觸發了彈窗外的關閉事件）。這時你可以使用：
```JavaScript
e.stopPropagation(); // 告訴瀏覽器：氣泡到此為止，別再往上傳了！
```

> **導師的圖解心法：** 想像這是一張組織圖。只要基層員工（子元素）被點擊，訊息就會層層遞交給上級主管（父元素）處理。

![原理邏輯圖](https://i.meee.com.tw/X6fJi45.jpg)

<!-- 🎨 圖解提示詞 (導師專用，產後刪除)：
[提示詞 A：主架構圖]
風格：Excalidraw 線條感、手繪冒險風
元素：
1. 底部有一個按鈕被點擊 (標記紅色點擊波紋)。
2. 從按鈕中心畫出一連串虛線氣泡 (Bubbling) 向正上方浮動，經過父層 <li>、阿公層 <ul>。
3. 在 <ul> 層級畫出一個大聲公圖標，標註「addEventListener('click')」。
4. 氣泡接觸到 <ul> 時發出「Ping!」的碰撞效果文字。
配色：黃色 (#FFD43B) 代表氣泡中的數據、藍色 (#4DABF7) 代表 <ul> 容器界限。

[提示詞 B：對決細節圖 - e.target vs e.currentTarget]
情境：一個裝著金幣 (<li>) 的寶箱 (<ul>)。
1. 一個巨大的指標 (e.target) 指向箱子裡最深處的「金幣本人」(真正被點擊到的)。
2. 另一個防禦光環 (e.currentTarget) 籠罩著整個「寶箱外殼」(掛載監聽的地點)。
3. 文字標記：e.target = 點到誰就是誰；e.currentTarget = 監聽器掛在哪就是誰。
-->

---

## 🛖 【營火叮嚀：導師的經驗談】
> 很多冒險者發現，當他們用 `innerHTML` 新增了任務卡片後，原本掛載的監聽器就「失靈了」。
> 那是因為那些士兵只負責盯著「當時就在場」的人。
> 如果你學會了「事件委派」，不管之後新增多少任務，只要大聲公還在，它依然能抓到那些新加入的成員。這就是大型專案高效能的秘密。

---

## ⚔️ 【演武場：從冒險者到勇者辛梅爾】

### 招式示範：事件委派實戰
[展示「個別監聽（Before）」與「父層委派（After）」的對比。]

#### ❌ 冒險者：幫每個任務配翻譯官
```javascript
const items = document.querySelectorAll('.list-item');
items.forEach(i => {
  i.addEventListener('click', () => console.log('被點了'));
});
// 如果列表有 1000 項，瀏覽器會很想哭
```

#### ✅ 勇者辛梅爾：只需一個大門警衛
```javascript
// 1. 抓取父容器 (例如 <ul>)
const listWrapper = document.querySelector('#list');

// 2. 委派大聲公
listWrapper.addEventListener('click', function(e) {
  // 3. 鎖定身分證：確認被點到的是不是 .btn 標籤
  if (e.target.nodeName === 'BUTTON') {
    console.log('抓到按鈕點擊了！內容是：' + e.target.textContent);
    e.target.closest('li').remove(); // 順便把父層的卡片移除
  }
});
```

> **導師講評：** 你看，`closest()` 是勇者的常用招式。它讓你就算點到按鍵裡的小圖示 (Icon) 或裝飾文字，也能自動「向上溯源」找到最接近的按鈕標籤。

```javascript
// ⚔️ 導師的進階招式：向心探測 closest()

/* 情境：
   <button class="del-btn">
     <i class="icon">🗑️</i> 刪除任務
   </button>
*/

list.addEventListener("click", (e) => {
  // ❌ 冒險者直覺：如果剛好點到內部的 <i>，這行會判斷失敗 (因為 i 沒有 class="del-btn")
  if (e.target.classList.contains("del-btn")) { console.log("點中外殼"); }

  // ✅ 勇者辛梅爾：不論點到 <i> 還是文字，都自動「向上追蹤」最近的 .del-btn
  const targetBtn = e.target.closest(".del-btn");

  if (targetBtn) {
    console.log("捕獲成功！這就是我們要的目標按鈕。");
  }
});
```



> **🏹 導師的辨析圖：誰才是真兇？**
>
> | 指令物件 | 身份 | 意義 |
> | :--- | :--- | :--- |
> | **`e.target`** | **真兇 (基層)** | 實際上「被點擊到」的那個最小元素。 |
> | **`e.currentTarget`** | **大門 (上級)** | 實際上「掛載監聽器」的那個元素。 |
> | **`e.target.closest()`** | **溯源魔法** | 從點擊處向上找，直到抓到指定的標籤為止。 |

#### ⚠️ 【實戰雷區：沒過濾的廣播】
> 在父層委派時，如果使用者點擊的是項目的「間隙 (Padding)」，也會觸發監聽！所以你必須養成判斷 `e.target` 或 `closest` 的好習慣，確保你沒有誤響那些你不打算控制的邏輯。


---

## 🏰 【勇者精英課：邁向職人的進階架構】
[在未來的高階自動化架構中，整個系統實際上就是建立在一個巨大的「事件委派」機制之上。理解委派，能讓你明白為什麼在處理萬筆資料的大型地圖時，優秀的系統依然能保持驚人的效能。這就是從「肌肉型選手」進化為「戰略型大師」的關鍵：不是增加感測器，而是優化感知的路徑。]

---

## 📝 【夥伴筆記：今日修煉精華】
##### *這份筆記是你的隨身護身符，卡關時看一眼，真相就在裡面。*
- **事件冒泡**：事件會由內而外擴散。
- **事件委派**：幫爸爸掛監聽，看著兒子被點擊。
- **`e.target`**：真正被使用者點擊到的基層單位。
- **e.target.closest()**：從點擊點向上尋找最接近的指定標籤。

---

## 🎯 【公會佈告欄：交付本日任務】
[📜 本日實戰任務：全自動任務看板 (CodePen)](https://codepen.io/editor/liwenchiou/pen/019d10af-816f-7146-bdce-6188a48b7eee)
[🛡️ 任務達成證明：QuestBoard 公會報到處](https://liwenchiou.github.io/QuestBoard-Remaster/)

### **⚔️ 任務鑑定條件：**
> 1. 完成 CodePen 中題目挑戰。
> 2. 將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
>    - **初心者**：學會使用「一人領信，全家收件」的委派術後，再也不用幫每個士兵配翻譯官了，你的代碼是不是獲得了從「勞力密集」轉向「管理層級」的輕盈感？
>    - **冒險者**：當你使用 `e.target.closest()` 向上溯源目標時，如果你點擊的是按鈕內部的「圖示 (icon)」，你是如何確保這場「訊息傳遞」依然能打中正確的邏輯標靶？ —— *任務完成後，你的名字將永遠標記在公會的英雄榜上！*

---

## 📚 【圖書館卷軸：延伸學習】
- **MDN 官方文獻：** [Event delegation in JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation)
