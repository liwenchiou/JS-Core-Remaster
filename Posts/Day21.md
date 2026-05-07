# Day 21：Async / Await：用最直覺的寫法處理「還沒回來的資料」

> **本文同步分享於個人部落格：[Liwen Chiou | Digital Architect & Full-Stack Engineer](https://liwenchiou.github.io/liwenblog/#intro)**

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

「導師，雖然 Promise 的 `.then()` 解決了洋蔥地獄，但當我的任務變得非常複雜時，整排的鏈條看起來還是很壯觀（也挺累人的）。有沒有一種方法，能讓我像寫普通的同步程式碼一樣，寫完一行、等它跑完、再寫下一行？」

我微微一笑，打了個響指，公會的時間彷彿瞬間靜止。

「孩子，這就是 **『時空暫停術 (Async / Await)』**。它是 Promise 的終極進化版（語法糖）。它不改變非同步的本質，但它能讓你在程式碼的某個『泡泡』裡，強迫時間等拿到資料再繼續。今天，我們要學會如何拆掉繁瑣的鏈條，換上這套頂級的修煉裝束。」

---

## 💡 【導師講義：底層真相探究】

### 1. 語法糖的魔力：為什麼我們需要它？

`Async/Await` 唯一的目的就是：**讓非同步程式碼讀起來像同步程式碼。**

它解決了 `.then()` 的視覺斷層。你不再需要去想「下一步要接在哪個括號後面」，你只需要在任務前面加一個 `await`，它就會乖乖等在那裡。

### 2. 修煉門檻：必須擁有「時空泡泡 (Async)」

你不能在空曠的原野上隨便呼叫時空暫停。`await` 必須被包裹在一個標記為 `async` 的函式中：

```javascript
async function startQuest() {
  // 這裡就是「時空泡泡」，裡面可以使用 await
  const weapon = await buyWeapon();
  console.log(weapon);
}
```

### 3. 本日圖解心法：時空暫停泡泡

> **導師的圖解心法：** 想像你在公會大廳（Main Thread）中畫了一個發光的圓圈（Async Function）。當你在圓圈內發動 `await` 時，圓圈內的時間會暫停，但圓圈外的公會成員依然在正常活動。當 `await` 的任務帶回資料後，圓圈內的時間才會恢復流動。

<!-- 🎨 圖解提示詞 (導師專用，產後刪除) ：
忘掉你前面產出的圖，按照我以下的提示詞重新產生，這是一個公會導師正在教導新手冒險者的畫面：

Forget all previous output...
【核心圖解重點】：
「Async/Await 時空暫停泡泡：畫面中間是一個藍色半透明的防護罩 (Async Scope)。防護罩內，一名冒險者正站在寫著 "await" 的齒輪前，齒輪卡住了背景的時間流。防護罩外，公會的其他成員 (Event Loop) 正在正常走動、喝水、搬東西。防護罩內部的箭頭標示：等待 -> 拿到資料 -> 時間恢復。」

【視覺場景】：
公會導師站在防護罩邊緣，向新手解釋：雖然你在泡泡裡感覺時間停了，但外面的世界並沒有因為你而卡死。

【視覺規範】：
- 風格：Excalidraw 手繪感。
- 配色守護：淺藍色 #E7F5FF (防護罩/Async 範圍)、黃色 #FFD43B (await 齒輪)、深灰色 #495057 (背景 Event Loop 流動)。
-->

![時空暫停原理圖](https://i.meee.com.tw/pevcYPY.jpg)

---

## ⚔️ 【戰術對抗：學長與學弟的代碼對決】

### 招式示範：重構 Promise 鏈

#### ❌ 冒險學弟：傳統鏈式派 (`.then` 擁護者)

- **負能量評級**：🟡 雖然不醜，但邏輯層次感較重

```javascript
buyWeapon(100)
  .then((weapon) => upgradeWeapon(weapon))
  .then((final) => console.log(final))
  .catch((err) => console.log(err));
```

#### ✅ 勇者學長：現代時空派 (`Async/Await` 大師)

- **利潤評級**：🟢 邏輯像清單一樣直覺 / 🟢 轉職高級開發者必備

```javascript
async function handleQuest() {
  try {
    const weapon = await buyWeapon(100);
    const final = await upgradeWeapon(weapon);
    console.log(final);
  } catch (err) {
    // 這裡我們先預先穿上一層「緩衝墊」，防止當機
    console.log("任務失敗：" + err);
  }
}
```

> **導師講評：** 看到了嗎？學長的寫法沒有括號嵌套，沒有長長的鏈條。甚至連錯誤處理都變成了熟悉的 **`try...catch`**。
>
> 雖然我們在 **Day 24** 才會正式鍛造這件「復活保險甲」，但從今天起，請養成習慣：**只要有 `async` 的地方，就給它套上這層防護。**

---

## 🛖 【營火叮嚀：導師的經驗談】

> 孩子，導師當年最常犯的錯就是「忘記寫 `await`」。
>
> 如果你寫了 `const data = buyWeapon()` 而沒加 `await`，你會發現 `data` 裡面不是寶劍，而是一個「Pending 的球 (Promise Object)」。
>
> 記住：**async 函式就像一個自動打包機。即便你在裡面回傳一個普通字串，它出門時也會自動幫你包成一個 Promise 給別人。**

---

## 🎯 【實戰演武場】

1.  [📜 本日實戰任務：時空暫停術初體驗 (CodePen)](https://codepen.io/editor/liwenchiou/pen/019d6101-24f8-70fa-a084-61e796447aa7)
2.  將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
    - **初心者：語法重構術 (成就感發掘)**：
      - 1. 你是否成功將昨天的「購買武器」改寫為 `async/await` 版本？代碼是不是清爽了很多？
    - **冒險者：錯誤攔截機制 (理性挑戰)**：**[⚡ 觀念辨析]**
      - 1. 如果你在 `async` 函式中沒有寫 `try...catch`，當任務出錯時，這個「錯誤」會流向哪裡？（它依然會變成 Promise 的 reject 狀態嗎？）

---

## 📚 【圖書館卷軸：延伸學習】

- **精深研究：** [MDN Async function](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/async_function)
- **進階對決：** [為什麼 Async/Await 其實也是一種 Promise？](https://v8.dev/features/top-level-await)
- **下站伏筆：** [預習 Day 22：Fetch API —— 如何用 Async/Await 搬運異世界物資](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)
