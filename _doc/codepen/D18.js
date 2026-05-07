// ⚔️ Day 18：【期中實戰】勇者任務佈告欄 (RPG Todo List) ⚔️

// 🛡️ 冒險者，這是你 Phase 3 的修煉期中大考！
// 目標：建立一個能存檔的任務清單，並練習「資料驅動」架構。

// ---
// 🏹 勇者裝備 (DOM 元素與初始資料)
// ---
let quests = JSON.parse(localStorage.getItem("quest_board")) || [];
const questList = document.querySelector("#quest-list");
const questInput = document.querySelector("#quest-input");
const addBtn = document.querySelector("#add-btn");

// ---
// 🗡️ 核心技能 A：渲染佈告欄 (Render)
// 邏輯：清空目前清單 -> 跑迴圈根據 quests 陣列重新貼上 HTML -> 順便存入 LocalStorage
// ---
function renderQuests() {
  questList.innerHTML = "";

  quests.forEach((item, index) => {
    // 💡 提示：根據 item.isDone 狀態，決定是否加上 "done" 的 class 樣式
    const statusClass = item.isDone ? "done" : "";

    // 🏆 使用資料 index 作為傳遞參數，讓事件能找回對應的資料
    questList.innerHTML += `
      <li class="${statusClass}">
        <span onclick="toggleQuest(${index})">${item.title}</span>
        <button onclick="deleteQuest(${index})">放棄</button>
      </li>
    `;
  });

  // 🛡️ 執行存檔術 (LocalStorage)
  localStorage.setItem("quest_board", JSON.stringify(quests));
}

// ---
// 🗡️ 核心技能 B：接取新任務 (Create)
// ---
addBtn.addEventListener("click", () => {
  if (questInput.value.trim() === "") return;

  const newQuest = {
    title: questInput.value,
    isDone: false,
  };

  quests.push(newQuest);
  questInput.value = "";
  renderQuests();
});

// ---
// 🗡️ 核心技能 C：切換任務狀態 (Update)
// ---
window.toggleQuest = function (index) {
  // ✍️ 職人邏輯：先動資料，再動畫面
  quests[index].isDone = !quests[index].isDone;
  renderQuests();
};

// ---
// 🗡️ 核心技能 D：放棄任務 (Delete)
// ---
window.deleteQuest = function (index) {
  // ✍️ 職人邏輯：先動資料，再動畫面
  quests.splice(index, 1);
  renderQuests();
};

// 🗺️ 啟動：第一次進入頁面時渲染現有任務
renderQuests();
