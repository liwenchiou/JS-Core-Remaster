# Day 24：錯誤處理：使用 Try...Catch 穿上你的復活保險甲

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

「導師，自從 Day 21 開始，我每次寫 `async` 都會乖乖照著您的吩咐，在外面套一層 `try...catch`。但說實話，我只是在模仿您的動作，我根本不知道那層銀色披風（復活保險甲）底層是怎麼運作的。

而且我發現，有時候即便我穿了甲，資料還是會出錯，甚至 Loading 的轉圈圈動畫會卡在那裡一輩子！我真的掌握這件裝備了嗎？」

我笑了笑，示意小冒險者脫下披風，放在工作檯上。

「孩子，模仿是學習的開始，但『理解』才是轉職的關鍵。之前你只是『穿著』它，今天我們要手把手把它『拆解』。我們要搞清楚那個名為 `error` 的物件裡裝了什麼情報，並且學會最重要的一招：**『戰場清理術 (Finally)』**，確保無論勝敗，你的程式碼都能維持工整。」

---

## 💡 【導師講義：底層真相探究】

### 1. 復活甲三部曲：Try, Catch, Finally

這是一套完整的生命週期，缺一不可：

- **`try { ... }`**：**「勇敢嘗試」**。把最可能爆炸、最危險的動作（如 Fetch、JSON 解析）放進來。
- **`catch (error) { ... }`**：**「落地緩衝」**。如果上面的代碼炸了，這裡會立刻接住它。你可以在這顯示「網路不穩，請稍後再試」。
- **`finally { ... }`**：**「戰後清理」**。這是最容易被忽略但最重要的。**無論成功還是失敗，這裡的代碼「保證執行」**。

### 2. 實戰必殺技：Finally 的真正用途

想像你在抓資料前，畫面上顯示了一個「轉圈圈 (Loading)」。

- 如果成功，你要關閉轉圈圈。
- 如果失敗，你也要關閉轉圈圈（不然使用者會在那裡等一輩子）。

**這就是 `finally` 的舞台！**

### 3. 主動預警：`throw new Error()`

有時候伺服器沒報錯，但回傳的資料「不合邏輯」（例如：血量是負數）。這時你可以主動引爆炸彈，跳到 `catch` 去處裡：

```javascript
if (data.hp < 0) {
  throw new Error("勇者數值異常，包裹有毒！");
}
```

---

## 🛡️ 【本日圖解心法：復活甲運作圖】

> **導師的圖解心法：** 想像你在走一條獨木橋（Try）。如果你掉下去了，下面有一張厚厚的安全網（Catch）接住你，並把你送回安全區。最後，不管你有沒有掉下去，公會管理員都會過來把橋鎖上（Finally），確保下一個冒險者的安全。

<!-- 🎨 圖解提示詞 (導師專用，產後刪除) ：
忘掉你前面產出的圖，按照我以下的提示詞重新產生：

Forget all previous output...
【核心圖解重點】：
「Try...Catch...Finally 生命週期圖。中心是一個寫著 "Runtime" 的跑道。Try 區塊是一個正在跑的勇者。路徑上有一個爆炸符號 (Error)。箭頭 A：成功跑完 -> 跳過 Catch。箭頭 B：觸發爆炸 -> 跌入 Catch 緩衝墊。底部是一個寬大的 Finally 平台，兩條箭頭最終都指向它，平台上面寫著 "Cleanup (關閉 Loading)"。」

【視覺場景】：
勇者雖然摔倒了，但在 Catch 墊子上優雅地站起來，拍拍灰塵，進入 Finally 階段。

【視覺規範】：
- 風格：Excalidraw 手繪感。
- 配色守護：粉藍色 #4DABF7 (Try 衝鋒)、亮橘色 #FF922B (Catch 緩衝)、深灰色 #495057 (Finally 保障)。
-->

![復活甲原理圖](https://i.meee.com.tw/wjzqtrc.jpg)

---

## ⚔️ 【戰術對抗：學長與學弟的代碼對決】

### 招式示範：完整的 Fetch 錯誤處理

#### ❌ 冒險學弟：僥倖派 (只顧成功)

- **負能量評級**：🔴 斷網直接噴紅字 / 🔴 loading 轉圈圈轉到死

```javascript
async function getSupplies() {
  showLoading(true);
  const res = await fetch("..."); // 如果這裡斷網，程式碼就卡死了
  const data = await res.json();
  showLoading(false);
}
```

#### ✅ 勇者學長：穩健派 (全方位防禦)

- **利潤評級**：🟢 極致的用戶體驗 / 🟢 面試官最愛的代碼範本

```javascript
async function getSupplies() {
  try {
    showLoading(true);
    const res = await fetch("https://api.guild.com/items");
    if (!res.ok) throw new Error("領取失敗！");

    const data = await res.json();
    console.log("物資：", data);
  } catch (err) {
    showErrorMessage("📢 公會警報：" + err.message);
  } finally {
    // 關鍵！無論成功失敗，都要關閉轉圈圈
    showLoading(false);
  }
}
```

---

## 🛖 【營火叮嚀：導師的經驗談】

> 孩子，導師教你一個「職人小技巧」。
>
> 在 `catch` 裡面，不要只是單純的 `console.log(error)`。試著寫下有層次的訊息，例如：「[Auth Service] 失敗：無效的金鑰」。當半年後的你回頭修 Bug 時，你會感謝現在這個考慮周全的自己。
>
> **「錯誤處理不是為了隱藏問題，而是為了在問題發生時，我們依然能對系統保有控制權。」**

---

## 🎯 【實戰演武場】

1.  [📜 本日實戰任務：復活甲穿戴實習 (CodePen)](https://codepen.io/editor/liwenchiou/pen/019d6117-8f5d-707b-95f8-113466ffddea)
2.  將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
    - **初心者：捕捉發動術 (成就感發掘)**：
      - 1. 你是否成功使用 `try...catch` 攔截了錯誤，而不是讓瀏覽器直接紅字噴錯？
    - **冒險者：清場大師 (理性挑戰)**：**[⚡ 觀念辨析]**
      - 1. 為什麼「關閉 Loading 動畫」最適合放在 `finally` 而不是 `try` 或 `catch` 裡？
      - 2. 故意在 `try` 裡面寫一段 `throw new Error("自爆！")`，觀察 catch 能不能領到這個訊息。

---

## 📚 【圖書館卷軸：延伸學習】

- **精深研究：** [MDN Try...Catch 語法](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/try...catch)
- **進階對決：** [如何自定義一個 Error 物件？](https://javascript.info/custom-errors)
- **下站伏筆：** [Phase 4 終極實戰：打造你自己的異世界氣象觀測站](https://openweathermap.org/api)
