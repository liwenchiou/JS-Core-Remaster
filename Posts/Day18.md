# Day 18：【期中實戰】純 JS 打造你的第一個「任務佈告欄」

> **本文同步分享於個人部落格：[Liwen Chiou | Digital Architect & Full-Stack Engineer](https://garden.liwen.studio/docs/learning/js-core-remaster)**

---

### **📜 這裡的修煉規則：**

> **孩子，在踏上今日的領地前，先坐下來喝杯酒吧。**
> 修煉的路很長，別急著奔跑，先聽聽這份卷軸裡的古老叮嚀。
>
> 我在每一站的盡頭都為你鋪設了 **「`實戰演武場 CodePen`」**。那不只是程式碼的拼湊，而是你在這場暴風雨中，試圖用邏輯點燃的一顆星火。
> 成功突圍後，別忘了帶著你的戰利品回到 **「`QuestBoard 佈告欄`」**。在那裡，你會發現自己從不孤單，公會的夥伴們都正舉杯等待你的歸來。
>
> 記住...
>
> 「 **導師看重的從來不是你的劍法有多華麗，而是當你被邏輯擊潰、滿身泥濘後，依然選擇握緊理性的劍柄，再次向真相發起衝鋒的勇氣。** 」

---

## 🛡️ 【公會大廳：導師的修煉導讀】

「今天，我們不教新的招式。我們要來一場盛大的集結。」

我指著公會中央的任務版，那裡是所有冒險者的起點。我們要在那裡練習軟體開發中最重要的四個動作：**C (新增)、R (讀取)、U (更新)、D (刪除)**。這一章，我們將拆解每一個動作的靈魂，教你如何用純 JS 的邏輯，讓資料與畫面同步舞動。

---

## 💡 【技術核心：CRUD 的深度引導】

### 1. [Read] 資料與畫面的「同步之舞」

在開始任何動作前，你必須先學會怎麼「看」。

**⚡ 核心心法：** 畫面的根源不是 HTML，而是你的 **`quests` 陣列**。
我們要寫一個 `renderQuests()` 函式。它的運作就像影分身：先清空牆面，再按名單重貼。

```javascript
function renderQuests() {
  questList.innerHTML = ""; // 1. 先清空舊牆面
  quests.forEach((item, index) => {
    // 2. 根據名單，一張一張貼上去
    questList.innerHTML += `<li>${item.title}</li>`;
  });
  // 3. 順便執行存檔術 (LocalStorage)
}
```

**導師提點：** 只要你的 `render` 邏輯寫得精準，接下來所有的操作都只需要「改資料 + 呼叫 render()」。

---

### 2. [Create] 捕捉冒險者的計畫

當小冒險者輸入內容並按下按鈕，就是 **C** 的時刻。

**⚡ 核心心法：** 不要直接把 `input` 內容塞進 DOM，而是要把內容轉化為一個 **「物件」** 並塞進陣列。

```javascript
addBtn.addEventListener("click", () => {
  // 1. 抓取卷軸內容 (Input Value)
  const newQuest = { title: questInput.value, isDone: false };
  // 2. 加入冒險清單 (Array Push)
  quests.push(newQuest);
  // 3. 重繪佈告欄 (Render!)
  renderQuests();
});
```

---

### 3. [Update] 任務的完成與轉換

當任務標記為「完成」，這涉及到修改資料中的狀態。

**⚡ 核心心法：** 透過 ID (Index) 找到資料夾中的那張紙，把 `isDone` 切換過來。

```javascript
window.toggleQuest = function (index) {
  // 1. 找到對應的任務資料，切換開關 (True/False 取反)
  quests[index].isDone = !quests[index].isDone;
  // 2. 重新渲染畫面
  renderQuests();
};
```

**導師提點：** 畫面上的劃線樣式，是根據 `isDone` 資料在 `render` 時動態決定的，這就是「資料驅動」。

---

### 4. [Delete] 放棄任務的決斷

有時候，冒險者必須捨去過期的計畫。

**⚡ 核心心法：** 從陣列中徹底移除它，並重新整理佈告欄。

```javascript
window.deleteQuest = function (index) {
  // 1. 從陣列中移除該項目
  quests.splice(index, 1);
  // 2. 重繪佈告欄
  renderQuests();
};
```

---

## 💡 【圖解：資料與畫面的單向導引】

<!-- 🎨 圖解提示詞 (導師專用，產後刪除) ：
忘掉你前面產出的圖，按照我以下的提示詞重新產生，這是一個公會導師正在教導新手冒險者的畫面：

Forget all previous output...
【核心圖解重點】：
「CRUD 與資料驅動循環 (CRUD Cycle)：左方是四個 RPG 圖標：羽毛筆 (C)、放大鏡 (R)、魔法墨水 (U)、焚毀火焰 (D)。這四個動作全部指向中間的一個金黃色箱子 (JavaScript Array)。箱子的另一頭連接著一個渲染漏斗 (Render Function)，漏斗底端噴灑出新的 UI 畫面。強調：動作 -> 改資料 -> 觸發渲染 -> 更新 UI。」

【視覺場景】：
公會導師正在示範這套優雅的循環。新手冒險者發現，他只需要去改動「金黃色箱子」裡的東西，右方的畫面就會自動變彩色或變灰暗。

【視覺規範】：
- 風格：Excalidraw 手繪感。
- 配色守護：黃色 #FFD43B (資料與圖標)、藍色 #4DABF7 (UI 畫面)、紅色 #FA5252 (渲染流動)。
-->

![CRUD 循環圖](https://i.meee.com.tw/cvRUgkT.jpg)

---

## 🏰 【勇者精英課：邁向職人的進階架構】

### 為什麼我們不直接動 DOM？

想像一下，如果你有一百個功能（過濾、排序、統計、分頁），如果你每動一下都要去手動 `appendChild` 或 `removeChild`，你的程式碼會變成一團亂麻。

透過「**資料驅動 (Data-driven)**」，你只需要保證 **資料 (Array)** 是正確的，畫面就永遠會是對的。這就是所有現代前端框架的底層密碼。

---

## 🛖 【營火叮嚀：導師的經驗談】

> 孩子，新手最常犯的錯就是「只改了資料，卻忘了呼叫 render」。
>
> 或者是「只改了畫面，卻忘了存入 LocalStorage」。
> 這種「三缺一」的失誤會造成資料幽靈。記住：**CRUD 的最後一步，永遠是同步畫面與存檔。**

---

## 🎯 【實戰演武場】

1.  [📜 本日實戰任務：純 JS 打造你的公會佈告欄 (CodePen)](https://codepen.io/editor/liwenchiou/pen/019d60e5-7abc-7e9c-b1e1-03c258a2931b)
2.  將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
    - **初心者：CRUD 完整體驗 (成就感發掘)**：
      - 1. 當你執行「刪除」動作時，你是直接刪掉 HTML 內容？還是從 Array 移除？
    - **冒險者：資料驅動的優勢 (理性挑戰)**：**[⚡ 觀念辨析]**
      - 1. 如果你在 `renderQuests` 裡忘記寫 `list.innerHTML = ""`，當你新增任務時會發生什麼恐怖的疊加現象？

---

## 📚 【圖書館卷軸：延伸學習】

- **現代主流架構：** [什麼是資料驅動 UI？](https://modernweb.com/what-is-data-driven-ui/)
- **Array 方法複習：** [splice, forEach, push (Day 06-08)](file:///Users/qiuliwen/Documents/工程師/project/JS-Core-Remaster/Posts/01-JS-Basics/README.md)
