// ⚔️ Day 27：實戰演武場 —— 指揮官的「資料驅動」修煉 ⚔️

// 🛡️ 冒險者，今天我們要實作一個「冒險者小隊管理介面」。
// 記住黃金法則：不要動 DOM，只動資料 (State)！

// ---
// 1. ⚔️ 大腦 (State)：這是公會唯一的名冊
// ---
const state = {
  members: [
    { id: 1, name: "勇者 Himmel", job: "戰士", level: 50 },
    { id: 2, name: "法師 Fern", job: "法師", level: 42 },
  ],
};

// ---
// 2. 🛡️ 投影機 (Render)：將名冊具現化到網頁上
// ---
function render() {
  const memberListEl = document.getElementById("memberList");
  
  // ✍️ 任務 A：清空舊投影
  // 提示：innerHTML = ""
  /* 在此實作 */

  // ✍️ 任務 B：遍歷 state.members，生成 HTML 並填入 memberListEl
  // 提示：利用 Day 09 學過的 map 或 forEach
  state.members.forEach((member) => {
    const div = document.createElement("div");
    div.className = "member-card";
    div.innerHTML = `
      <h3>${member.name}</h3>
      <p>職業：${member.job} | 等級：${member.level}</p>
      <button onclick="removeMember(${member.id})">放逐隊員</button>
    `;
    memberListEl.appendChild(div);
  });

  // 💡 小提醒：在真實框架中，你連 createElement 都不用寫，
  // 但今天我們先手動感受「資料 -> 畫面」的轉換過程。
}

// ---
// 3. 🏹 戰略指令：修改資料的函式
// ---

// ✍️ 任務 C：新增隊員
function addMember(name, job) {
  const newId = Date.now();
  // 1. 請將新隊員推入 state.members 陣列
  /* 在此實作 */
  
  // 2. 💡 關鍵步驟：資料變了，記得重新呼叫哪一個函式？
  /* 在此實作 */
}

// ✍️ 任務 D：移除隊員
window.removeMember = function(id) {
  // 1. 利用 Day 09 的 filter 篩選掉該 id 的隊員
  /* 在此實作 */
  
  // 2. 💡 關鍵步驟：資料變了，重新投影！
  /* 在此實作 */
}

// ---
// 🏹 初始啟動
// ---
render();

// 💡 思考題：
// 如果我們要增加一個「一鍵升級所有隊員」的功能，
// 在「資料驅動」的模式下，你的程式碼流程會是怎樣的？
