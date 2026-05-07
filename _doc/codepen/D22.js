// ⚔️ Day 22：【連線挑戰】向王國請求援兵 ⚔️

// 🛡️ 冒險者，今天我們要測試你與「外部世界」的連線能力！
// 我們將使用 JSONPlaceholder 這個模擬王國，來獲取一份「任務資料」。

// ---
// 🏹 任務 1：基礎連線
// 目標：獲取 ID 為 1 的待辦事項 (todos)
// ---
async function fetchTodo() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const card = document.querySelector("#quest-card");
  const spinner = document.querySelector("#loading-spinner");
  const errorBox = document.querySelector("#error-message");

  try {
    // 🐣 初始化 UI
    spinner.classList.remove("hidden");
    card.classList.add("hidden");
    errorBox.classList.add("hidden");

    // 1. ✍️ 職人修煉區：發出請求並等待回應
    const response = await fetch(url);

    // 2. ✍️ 職人修煉區：檢查 response.ok 是否成功
    if (!response.ok) {
      throw new Error(`連線失敗！狀態碼：${response.status}`);
    }

    // 3. ✍️ 職人修煉區：將回應解析為 JSON
    const data = await response.json();

    // 🏆 將資料渲染到畫面上
    renderQuest(data);
  } catch (error) {
    document.querySelector("#error-detail").textContent = error.message;
    errorBox.classList.remove("hidden");
  } finally {
    spinner.classList.add("hidden");
  }
}

// ---
// 🏹 任務 2：【實戰渲染術】將物資畫在螢幕上
// ---
function renderQuest(data) {
  const card = document.querySelector("#quest-card");
  const titleEl = document.querySelector("#quest-title");
  const idEl = document.querySelector("#quest-id");

  // ✍️ 職人修煉區：
  // 1. 將 data.title 放入 titleEl 的 textContent
  titleEl.textContent = data.title;
  // 2. 將 data.id 放入 idEl 的 textContent
  idEl.textContent = `#${data.id}`;

  // 顯示卡片
  card.classList.remove("hidden");
}

// 監聽按鈕點擊
document.querySelector("#fetch-btn").addEventListener("click", fetchTodo);

// 初始啟動
fetchTodo();

// ==========================================
// 🎯 任務鑑定提醒：
// 1. 初心者：信鴿召喚術 (成就感發掘)：你是否在 Console 看到了一串「{ userId: 1, id: 1, ... }」的資料？
// 2. 冒險者：防禦加護 (理性挑戰)：如果你斷開網路再跑一次，你的代碼會優雅地噴錯還是直接當機？
// ==========================================
