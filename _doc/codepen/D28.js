// ⚔️ Day 28：實戰演武場 —— 從 JS 靈魂看穿 React 聖劍 ⚔️

// 🛡️ 冒險者，今天不需要你寫長長的代碼。
// 你的任務是「鑑定」。請觀察這兩段代碼，找出它們血脈相連的證據。

// ==========================================
// 📜 卷軸 A：純 JS 版本 (Day 18 的模式)
// ==========================================
function initVanillaCounter() {
  let count = 0;
  // 💡 必須手動抓取 HTML 裡的實體按鈕
  const btn = document.getElementById("vanilla-btn");

  btn.onclick = () => {
    count++;
    // 💔 必須手動「指名道姓」去修改 HTML 內容
    btn.textContent = `點擊次數：${count}`;
  };
}

// 啟動舊時代邏輯
initVanillaCounter();

// ==========================================
// 📜 卷軸 B：React 版本 (轉職後的型態)
// ==========================================
function ReactCounter() {
  // 💡 [鑑定點 1] 這裡的 [count, setCount] 利用了 Day 04 的什麼語法？
  // 💡 [鑑定點 2] useState 能夠記住 count，底層是利用了 Day 07 的什麼原理？
  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      目前的點擊次數：{count} 
    </button>
  ); 
  // 💡 [鑑定點 3] 這裡沒有看到任何 DOM 操作，這體現了 Day 27 的什麼心法？
}


// ==========================================
// 🏹 鑑定報告書
// ==========================================
/* 
   請在下方寫下你的鑑定發現：
   
   1. [鑑定點 1] 對應語法：
   2. [鑑定點 2] 對應原理：
   3. [鑑定點 3] 對應心法：
   
   4. 💬 導師加分題：
      在 ReactCounter 中，我們傳給 setCount 的是 (count + 1)。
      這跟 Day 06 提到的「不可變性 (Immutability)」有什麼關係？
*/

/* ✍️ 作答區
   1. 答：
   2. 答：
   3. 答：
   4. 答：
*/
