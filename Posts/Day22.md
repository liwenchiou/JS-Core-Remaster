# Day 22：Fetch API 實戰：如何優雅地從外部搬運用資

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

「導師，我已經學會了暫停時空的魔法（Async/Await）。但我現在身處荒野，袋子裡空空如也，我需要向遠方的王國請求後勤支援（獲取資料）。該怎麼做呢？」

我從懷中掏出一隻銀色的 **「通訊信鴿 (Fetch API)」**，將一張寫著網址的紙條綁在它腿上，輕輕一送，信鴿便消失在雲端。

「孩子，這就是 `fetch`。它是現代前端最具威力的招式之一。它能讓你跨越海洋，與全世界的伺服器對話。但要注意，拿回資料的過程就像收包裹一樣，是有層次的。今天，我們要練習如何發送這隻信鴿，並學會優雅地拆開它帶回來的神祕包裹。」

---

## 💡 【導師講義：底層真相探究】

### 1. 什麼是 Fetch？（公會的跨國信鴿）

`fetch()` 是瀏覽器內建的原始動作，它會幫你發出網路請求。它回傳的本質依然是個 **Promise**，所以我們能用昨天學過的時空暫停術（Async/Await）來處理它。

### 2. 兩階段領包術：為什麼要兩次 Await？

這是所有新手最困惑的地方。為什麼不能一行搞定？

1. **第一階段：等包裹送到 (Response object)**
   信鴿飛回來了，給了你一個箱子。這時你只知道「有沒有送到（狀態碼）」，箱子還沒打開。
2. **第二階段：拆開包裝 (Parsing JSON)**
   你需要使用 `.json()` 這種解析咒語，強迫箱子把內容物轉換成 JavaScript 看得懂的物件。

```javascript
async function getSupplies() {
  // 1. 等信鴿飛回來
  const response = await fetch("https://api.example.com/items");

  // 2. 等拆箱完成
  const data = await response.json();

  console.log(data);
}
```

### 3. 防禦工事：信鴿也會迷路 (response.ok)

> **⚠️ 導師的警告：** `fetch` 有個奇怪的脾氣。即便伺服器跟你說「404 找不到檔案」，它還是會認為信鴿「飛回來了」，因此不會動用 `catch`。
>
> 你必須親自檢查 **`response.ok`**（或是看狀態碼是否為 200）。這就像是你收到了箱子，但打開前得先看看外面有沒有貼「查無此人」。

---

## 🛡️ 【本日圖解心法：兩階段領包術】

> **導師的圖解心法：** 想像你在窗口等物資。第一眼看到飛機飛過來丟下包裹（Response），但包裹是封死的，你看不見裡面的藥水。你必須拿出「拆箱刀 (.json())」，再次等待它解開，才能真正拿到裝備。

<!-- 🎨 圖解提示詞 (導師專用，產後刪除) ：
忘掉你前面產出的圖，按照我以下的提示詞重新產生：

Forget all previous output...
【核心圖解重點】：
「Fetch 兩階段流程圖。左側是冒險者發出 fetch 信號。第一步：await fetch() 箭頭指向一個封閉的箱子 (Response Object)，上面寫著 status: 200。第二步：await res.json() 箭頭指向箱子被打開，噴出金幣與裝備 (JSON Data)。」

【視覺場景】：
公會信鴿帶著包裹降落在桌面上，導師正拿著放大鏡檢查狀態碼。

【視覺規範】：
- 風格：Excalidraw 手繪感。
- 配色守護：粉藍色 #4DABF7 (網路請求)、亮橘色 #FF922B (等待解析)、亮綠色 #51CF66 (最終資料流)。
-->

![Fetch 兩階段領包圖](https://i.meee.com.tw/nwm2AbC.jpg)

---

## ⚔️ 【戰術對抗：學長與學弟的代碼對決】

### 招式示範：獲取外部任務資料

#### ❌ 冒險學弟：盲目直衝派 (不檢查狀態碼)

- **負能量評級**：🔴 網址打錯直接爆炸 / 🔴 404 的時候還在那邊 parse JSON

```javascript
async function getData() {
  const res = await fetch("https://wrong-api.com");
  const data = await res.json(); // 這裡可能會報錯
  console.log(data);
}
```

#### ✅ 勇者學長：嚴謹偵測派 (防備 404 的高手)

- **利潤評級**：🟢 像喝水一樣穩定的代碼 / 🟢 轉職高級開發者標配

```javascript
async function getData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    if (!res.ok) {
      throw new Error("物資被攔截了！狀態碼：" + res.status);
    }

    const data = await res.json();
    console.log("🏆 任務詳情：", data.title);
  } catch (err) {
    console.error("🌋 通訊中斷：", err.message);
  }
}
```

---

## 🛖 【營火叮嚀：導師的經驗談】

> 孩子，未來你在實戰中，如果發現資料一直讀不出來，別急著改代碼。先去點開瀏覽器的「**F12 -> Network (網路)**」面板。
>
> 那裡是信鴿的飛行日誌，它會告訴你信鴿飛去了哪、對方回了什麼，甚至連字體大小都不會騙你。**「學會看 Network 面板，你才真正擁有了連通世界的能力。」**

---

## 🎯 【實戰演武場】

1.  [📜 本日實戰任務：跨國物資搬運實作 (CodePen)](https://codepen.io/editor/liwenchiou/pen/019d6107-9fbd-7913-ac17-47a0ecaa5c15)
2.  將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：
    - **初心者：信鴿召喚術 (成就感發掘)**：
      - 1. 你是否成功從 `JSONPlaceholder` 獲取到一筆資料並顯示在 console 中？
    - **冒險者：防禦加護 (理性挑戰)**：**[⚡ 觀念辨析]**
      - 1. 故意把 API 網址打錯一個字，觀察你的 `try...catch` 有沒有抓到錯誤。
      - 2. 為什麼我們不能直接 `console.log(res)` 就看到資料，一定要經過 `.json()` 呢？

---

## 📚 【圖書館卷軸：延伸學習】

- **精深研究：** [MDN 使用 Fetch](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)
- **視覺化複習：** [什麼是 REST API？(圖解 GET/POST)](https://restfulapi.net/)
- **下站伏筆：** [預習 Day 23：JSON —— 異世界的通用溝通手札](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Objects/JSON)
