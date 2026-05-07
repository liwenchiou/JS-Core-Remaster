// ⚔️ Day 26：【效能神兵】防抖 (Debounce) 與節流 (Throttle) ⚔️

// 🛡️ 冒險者，當你的信鴿 (Fetch) 飛得太頻繁時，
// 你需要為你的動作加上「冷卻時間 (Cooldown)」。

// ==========================================
// 🏹 任務一：防抖大師 (Debounce)
// ==========================================
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    // ✍️ 任務 A：清空舊的計時器
    /* 在此實作 */

    // ✍️ 任務 B：重新設定計時器
    /* 在此實作 */
  };
}

const handleInput = debounce((e) => {
  console.log("✨ [Debounce] 搜尋關鍵字:", e.target.value);
}, 500);

// ==========================================
// 🏹 任務二：節流專家 (Throttle)
// ==========================================
function throttle(fn, delay) {
  let isCooldown = false;
  return function (...args) {
    // ✍️ 任務 C：檢查是否還在冷卻中
    // 💡 提示：節流的核心是「無視」而非「重來」，不需清掉計時器。
    /* 在此實作 */

    // ✍️ 任務 D：執行函式並開啟冷卻
    /* 在此實作 */

    // ✍️ 任務 E：設定計時器，在 delay 後將 isCooldown 轉回 false
    /* 在此實作 */
  };
}

const handleAttack = throttle(() => {
  console.log("⚔️ [Throttle] 勇者揮劍攻擊！");
}, 1000);

// ==========================================
// 🏹 綁定區：讓代碼與 UI 連線
// ==========================================
document.getElementById('search').addEventListener('input', handleInput);
document.getElementById('attackBtn').addEventListener('click', handleAttack);

// ==========================================
// 🏹 任務三：鑑定挑戰
// ==========================================
/* 
   根據今天的講義，回答以下問題：
   1. Debounce (防抖) 為什麼適合用在「視窗縮放 (Resize)」事件？
   2. Throttle (節流) 與 Debounce 的最大差異在於「第一次觸發」的反應，請簡述之。
*/

/* ✍️ 作答區
   1. 答：
   2. 答：
*/
