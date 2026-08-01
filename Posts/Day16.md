# Day 16：瀏覽器小帳本：幫使用者存下他的個人設定（LocalStorage）

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

「導師，為什麼我辛苦幫梅大叔設定好的『黑夜模式』介面，只要他一重新整理網頁，整個公會大廳就又變回白茫茫一片，差點閃瞎他的眼啊！」

我拍掉手上的公文塵埃，指著櫃檯後面的一個皮革小帳本說：「冒險者，那是因為你的程式碼只存在於當前的『執行泡泡（記憶體）』中。一旦泡泡破了（頁面重整），一切都會歸零。

今天，我要教你如何動用瀏覽器的 **『自動存檔點 (Save Point)』**。我們會把使用者的心聲，一字一句刻在瀏覽器的皮革帳本上。即便勇者關掉電腦去睡覺，明天醒來，他的偏好依然會在。這就是 **LocalStorage** 的持久化魔法。」

---

## 💡 【導師講義：底層真相探究】

### 1. 儲存三兄弟大 PK

在瀏覽器的世界，我們有三種方式可以存檔，但它們的「保存期限」完全不同：

| 特性         |      **LocalStorage**       |  **SessionStorage**  |     **Cookie**     |
| :----------- | :-------------------------: | :------------------: | :----------------: |
| **保存期限** | **永久存檔** (手動清才消失) |    關掉分頁即消失    |  設定時間到期消失  |
| **容量大小** |        約 5MB (最大)        |        約 5MB        |     極小 (4KB)     |
| **主要用途** |     個人設定、待辦清單      | 臨時輸入、一次性狀態 | 廣告追蹤、身分驗證 |

> **🏹 導師的辨析：** 在現代前端開發中，除非你要處理跟伺服器通訊的密碼金鑰（Cookie），否則 90% 的本機存檔，我們都優先指派 **LocalStorage** 出動。

---

### 2. 存檔指令：增、刪、改、查

LocalStorage 的操作非常直觀，就像在用一把四段式機關鑰匙：

```javascript
// 1. 存入 (setItem)：鍵, 值
localStorage.setItem("heroName", "辛爾梅");

// 2. 讀取 (getItem)：直接拿鑰匙去取回數值
const myHero = localStorage.getItem("heroName"); // "辛爾梅"

// 3. 刪除 (removeItem)：單項排除
localStorage.removeItem("heroName");

// 4. 清空 (clear)：整個帳本燒掉重來
localStorage.clear();
```

> **導師的圖解心法：** 想像 LocalStorage 是一個巨大的壁掛櫃，每個櫃子都有一個專屬標籤（Key）。你存進去的是文字（Value），拿出來的也是文字。

---

### 3. 資料打包魔法：JSON 序列化

這是新手最容易踩到的陷阱：**LocalStorage 只能存「字串」**！如果你直接把一個物件存進去，它會變成無效的 `[object Object]`。

為了解決這個問題，我們需要「打包拆箱術」：

- **`JSON.stringify()` (打包)**：將物件幻化成字串，才能塞進櫃子。
- **`JSON.parse()` (拆箱)**：將字串召喚回物件，才能用點符號 (.) 取值。

```javascript
const heroData = { name: "辛爾梅", level: 99 };

// ❌ 錯誤做法：直接存
localStorage.setItem("save", heroData); // 毀了，裡面會變 "[object Object]"

// ✅ 正確做法：先打包再存
localStorage.setItem("save", JSON.stringify(heroData));

// 從櫃子拿出來時，記得拆箱
const getSave = JSON.parse(localStorage.getItem("save"));
console.log(getSave.name); // "辛爾梅"
```

<!-- 🎨 圖解提示詞 (導師專用，產後刪除) ：
忘掉你前面產出的圖，按照我以下的提示詞重新產生，這是一個公會導師正在教導新手冒險者的畫面：

【核心圖解重點】：
「資料打包與拆箱 (JSON Serialization)：畫面左側是一個閃閃發光的勇者資訊包 (Object)，中間是一個寫著『JSON.stringify()』的法陣/打包機。資料進入法陣後變成了長條狀的皮革捲軸 (String)。右側是巨大的 LocalStorage 儲存牆 (Storage Wall)，捲軸正被精準地放入對應 Key 的儲存槽中。取回時則反過來，經過『JSON.parse()』魔法將捲軸恢復成生動的勇者。」

【視覺場景】：
畫面呈現公會導師正耐心地向滿頭大汗的小冒險者解釋「為什麼箱子塞不進洞口，要先折疊起來」。導師的手指尖端正凝聚著 JSON 轉換的微光。
強調：導師的眼神充滿傳承感，強調「工具只是輔助，理解結構才是力量」。

【視覺規範】：
- 風格：Excalidraw 手繪感。
- 配色守護：黃色 #FFD43B (存檔卷軸/資料流)、紅色 #FA5252 (轉換法陣/執行路徑)。
-->

![存檔邏輯圖](https://i.meee.com.tw/U3tkCoA.png)

---

## ⚔️ 【戰術對抗：學長與學弟的代碼對決】

### 招式示範：持久化黑夜模式 (Dark Mode)

#### ❌ 冒險學弟：只管當下，不管未來

- **負能量評級**：🔴 重整即歸位 / 🔴 被使用者投訴閃瞎眼

```javascript
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  // 然後呢？沒有存檔，重整頁面後使用者又要點一次
});
```

#### ✅ 勇者學長：帳本紀錄，重啟無憂

- **利潤評級**：🟢 體驗極佳 / 🟢 專業持久化設計

```javascript
// 1. 初始化：頁面啟動時先讀取帳本
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
}

// 2. 切換時：同步寫入帳本
btn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
```

> **導師講評：** 學長的關鍵在於「雙向同步」：操作時存檔，讀取時應用。這就是專業應用程式的標配思維。

---

## 🏰 【勇者精英課：邁向職人的進階架構】

### 為什麼我們不存敏感資料？

雖然 LocalStorage 很好用，但它有一個致命傷：**任何這台電腦的腳本都能讀取它（XSS 攻擊風險）**。

因此，專業職人的守則第一條：**絕對不要在 LocalStorage 存下密碼、信用卡號或涉及資安的 Token**。帳本是用來存「喜好設定」的，不是用來裝「金庫鑰匙」的。

另外，LocalStorage 的 5MB 限制雖然看起來很大，但如果你存入過多高解析度圖片的 Base64 編碼，帳本很快就會爆掉。優雅的開發者會懂得斷捨離。

---

## 🛖 【營火叮嚀：導師的經驗談】

> 孩子，導師當年第一次寫 `JSON.parse` 時，因為沒考慮到「如果帳本裡根本沒這筆資料」的情況，導致程式直接崩潰。
>
> 記住，當 `localStorage.getItem()` 找不到鑰匙時，它會傳回 `null`。如果你對 `null` 進行 `JSON.parse` 沒問題，但如果你後續直接拿它來點屬性（例如 `data.name`），就會引發大災難。
>
> 養成習慣：**在操作存取回來的資料前，先用 Day 12 教過的邏輯判斷檢查它是否存在。**

---

**天色微亮，營火雖已燃盡，但你眼中卻閃爍著領悟的光芒。在前往演武場挑戰關卡前，我已經幫你把靈魂碎片精煉成了這份「戰術錦囊」。拿好它，今日的任務不再是負擔，而是你證明自我的舞台。去吧，公會的英雄榜在等著你的戰報。**

## 📝 【夥伴筆記：今日修煉精華】

##### _這份筆記是你的隨身護身符，卡關時看一眼，真相就在裡面。_

- **setItem/getItem**：存取大法，鑰匙與箱子的對應。
- **JSON.stringify**：將物件魔法打包成字串的唯一通道。
- **JSON.parse**：將存檔讀回並恢復成可以操作的物件。
- **不存敏感資料**：帳本是公共的，安全第一。

---

## 🎯 【實戰演武場】

1.  [📜 本日實戰任務：勇者的自動存檔點 (CodePen)](https://codepen.io/editor/liwenchiou/pen/019d60c6-a870-751a-af22-c3e834165e2e)
2.  將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
    - **初心者：存檔術啟動 (成就感發掘)**：
      - 1. 你是否成功打開 DevTools > Application 找到你的帳本並親手修改了數值？發現它也會同步改變網頁畫面的驚喜了嗎？
    - **冒險者：打包拆箱的真相 (理性挑戰)**：**[⚡ 觀念辨析]**
      - 1. 如果我們不用 `JSON.stringify` 直接把一個陣列存入 LocalStorage，拿出來時它會變什麼樣子？還能用 `forEach` 嗎？
3.  任務完成後，你的名字將永遠標記在公會的英雄榜上！

---

## 📚 【圖書館卷軸：延伸學習】

- **MDN 官方文獻：** [Window.localStorage 使用指南](https://developer.mozilla.org/zh-TW/docs/Web/API/Window/localStorage)
- **Web Storage 真相對比：** [LocalStorage vs SessionStorage](https://web.dev/learn/forms/storage/)
