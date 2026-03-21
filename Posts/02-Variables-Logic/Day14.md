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


#### **語法結構：`target.addEventListener('type', listener)`**

- **`target` (監聽對象)**：你想在哪個 HTML 元素上裝設感應器？（例如：按鈕、輸入框）。
- **`type` (事件類型)**：你要偵測哪種觸發條件？（例如：點擊 `click`、輸入 `input`）。
- **`listener` (回呼函式)**：當條件達成時，你要執行哪一套應對計畫？

```javascript
/* ⚔️ 語法解構：感測器是如何安裝的？ */

// 1. [target]：選定你的監聽標靶 (監聽對象)
const btn = document.querySelector('#submit-btn');

// 2. 安裝感測器並定義計畫
btn.addEventListener(
    'click',    // [type]：要感測哪種動作？ (事件類型)
    (e) => {    // [listener]：感測到之後要做什麼？ (回呼函式)
        alert('按鈕被點擊了！');
    }
);
```

#### 常用事件觸發器 (Common Event Types)
- `change` (內容改變)
觸發時機：當元素的值改變且失去焦點時觸發（對於 `<select>` 下拉選單則是選取後立即觸發）。
應用場景：使用者選好地址的「縣市」後，自動載入對應的「行政區」資料。
```javascript
const citySelect = document.querySelector('#city');

// 當 (內容確定改變) 時，執行 (更新顯示內容)
citySelect.addEventListener('change', (e) => {
    console.log('選取的城市變更為：', e.target.value);
});
```
- `input` (即時輸入)
觸發時機：只要欄位內的文字有任何變動（增加、刪除、貼上）就會立即觸發。
應用場景：密碼強度即時檢測、搜尋框的自動補完功能。
```javascript
const searchBar = document.querySelector('#search');

// 當 (input) 發生時，執行 (印出目前打的字)
searchBar.addEventListener('input', (e) => {
    console.log('正在輸入：', e.target.value);
});
```
- `keyup` / `keydown` (鍵盤動作)
觸發時機：當使用者按下或放開鍵盤按鍵時。
應用場景：偵測使用者是否按下了 Enter 鍵來送出對話，或是製作網頁小遊戲的移動控制。
```javascript
const taskInput = document.querySelector('#task-input');

// 當 (按下鍵盤) 時，執行 (檢查是不是按了 Enter)
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        console.log('勇者按下了 Enter，準備送出任務！');
    }
});
```

> **🏹 導師的辨析圖：內容 vs 物理的對決**
>
> | 特性 | `input` (內容監控) | `keyup / keydown` (物理監控) |
> | :--- | :--- | :--- |
> | **關注對象** | **紙上的內容**（文字是否改變） | **手指的動作**（按鍵是否按下） |
> | **滑鼠貼上 / 語音輸入** | **會**觸發 (內容確實變了) | **不會**觸發 (手指沒碰鍵盤) |
> | **組合鍵 (Shift / Alt)** | **不會**觸發 (文字內容沒變) | **會**觸發 (按鍵有被按下) |
> | **最佳情境** | 密碼強度、即時搜尋建議 | 特定快速鍵、Enter 送出、動作遊戲 |

- `focus` & `blur` (焦點與失焦)
觸發時機：focus 是當游標點入輸入框時；blur 則是游標離開（點擊外面）時。
應用場景：點入欄位時顯示「輸入提示」，離開欄位時立刻檢查「格式是否正確」（例如 Email 沒寫 @）。
```javascript
const emailInput = document.querySelector('#email');

// 當 (游標進入/聚焦) 時，執行 (顯示提示)
emailInput.addEventListener('focus', () => {
    console.log('正在輸入 Email...');
});

// 當 (游標離開/失焦) 時，執行 (檢查有沒有寫 @)
emailInput.addEventListener('blur', (e) => {
    if (!e.target.value.includes('@')) {
        console.log('格式錯誤：請輸入正確的 Email');
    }
});
```

#### **📜 公會常用感測器 (Common Events) 一覽表**

| 事件類型 | 觸發時機 | 常見應用場景 |
| :--- | :--- | :--- |
| **`click`** | 滑鼠點擊元素時 | 按鈕發動技能、開啟折疊選單 |
| **`input`** | 輸入框內容 **「即時」** 改變時 | 搜尋框自動補完、即時字數統計 |
| **`change`** | 內容改變並 **「失去焦點」** 時 | 下拉選單選取、整箱物資清點完畢 |
| **`keydown`** | 按下鍵盤按鍵的那一刻 | 偵測 Enter 送出訊息、方向鍵移動 |
| **`focus`** | 游標點入、聚焦於元素時 | 顯示輸入框提示、高亮選中的欄位 |
| **`blur`** | 游標離開、失去焦點時 | 欄位格式檢查（例如檢查 Email） |

> **導師的圖解心法：** 想像這是一張偵訊報告。當陷阱被踩中，系統會生成一份「事件物件表 (Event Object)」，裡面列滿了嫌疑犯的所有資料。

![原理邏輯圖](https://i.meee.com.tw/pxlRNm0.jpg)

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
> 在未來的高階裝備架構中，如果你忘記在「移除物件（清場）」時關掉警報器，這會造成寶貴的「系統能量外洩 (Memory Leak)」。老練的勇者在某些場合要學會使用 `removeEventListener` 來回收能量。

---

## 🏰 【勇者精英課：邁向職人的進階架構】
[在未來的自動化大型架構中，雖然系統會幫你處理許多瑣碎的感應器細節，但理解原生 JS 的事件機制，能讓你在處理複雜的互動流程時，明白為什麼有時候 `e.stopPropagation()` 是你的救命恩人。]

---

## 📝 【夥伴筆記：今日修煉精華】
##### *這份筆記是你的隨身護身符，卡關時看一眼，真相就在裡面。*
- **`addEventListener`**：在標籤上掛一個警笛。
- **`click` / `input` / `keydown`**：常見的觸發條件。
- **`e.target`**：真正被使用者動到的那件寶物。
- **`e.preventDefault()`**：阻止標籤的本能動作 (例如連結不跳頁)。

---

## 🎯 【公會佈告欄：交付本日任務】
[📜 本日實戰任務：陷阱觸發大解密 (CodePen)](https://codepen.io/editor/liwenchiou/pen/019d1088-d0dc-7f8d-81d7-556fc47487f3)
[🛡️ 任務達成證明：QuestBoard 公會報到處](https://liwenchiou.github.io/QuestBoard-Remaster/)

### **⚔️ 任務鑑定條件：**
> 1. 完成 CodePen 中題目挑戰。
> 2. 將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
>    - **初心者**：在你的按鈕上掛載「自鳴笛 (監聽器)」後，看見使用者的一舉一動都能在 Console 觸發互動回饋，這種「即時反應感」最讓你感到驚喜的地方是什麼？
>    - **冒險者**：如果你的按鈕裝在一個會自動重新整理頁面的表單 (`<form>`) 裡，你會如何使用 `e.preventDefault()` 來中斷這場「系統預設」的強制跳頁動作？ —— *任務完成後，你的名字將永遠標記在公會的英雄榜上！*

---

## 📚 【圖書館卷軸：延伸學習】
- **MDN 官方文獻：** [Document.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
