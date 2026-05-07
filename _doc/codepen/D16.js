// ⚔️ Day 16：【瀏覽器小帳本】LocalStorage ⚔️

// 🛡️ 冒險者，歡迎來到「自動存檔點」演武場！
// 在這裡，我們要學習如何把資料刻在瀏覽器的皮革帳本上。
// 即使勇者關掉分頁，明天醒來，你的資料依然會在那裡。

// ==========================================
// 練習1：基礎存檔與讀取 (Simple String)
// 任務：將輸入框的值存入 localStorage，並在頁面重整後顯示出來
// ==========================================

const inputField = document.querySelector("#hero-name");
const saveBtn = document.querySelector("#save-btn");
const displayName = document.querySelector("#display-name");

/* ✍️ 作答區 */
// 1. 掛載監聽器給 #save-btn
// 2. 使用 localStorage.setItem 將 #hero-name 的值存起來
// 3. 頁面啟動時，使用 localStorage.getItem 撈出資料並顯示

// ==========================================
// 練習2：物件打包與拆箱 (JSON Mastery)
// 任務：存入一個含有等級、生命值、金幣的物件，並正確讀取
// ==========================================

const heroStats = {
  level: 15,
  hp: 250,
  gold: 1000,
  items: ["銅牆鐵壁", "藥草"],
};

/* ✍️ 作答區 */
// 1. 將 heroStats 使用 JSON 打包存入 localStorage
// 2. 取回資料並使用 JSON 拆箱
// 3. console.log 出英雄的 items 列表，確認它是陣列型態

// ==========================================
// 練習3：【進階】黑夜模式記憶牆 (Pre-Quest for D18)
// 任務：當切換開關時，將使用者的選擇存檔，重整後載入偏好。
// ==========================================

const themeToggle = document.querySelector("#theme-toggle");

/* ✍️ 作答區 */
// 提示 1：當 toggle 狀態改變時紀錄
// 提示 2：如果存的是 'dark'，重整後 body 就要加上 .dark-mode

// ==========================================
// 🎯 任務鑑定提醒：
// 帳本是持久的，但 API 是字串的。打包 (stringify) 與拆箱 (parse) 是你最好的夥伴。
//
// 💡 請帶著你的 CodePen 網址回到 QuestBoard，並回填鑑定報告：
// 1. 初心者：存檔術啟動 (成就感發掘)：你是否成功打開 DevTools > Application 找到你的帳本並親手修改了數值？發現它也會同步改變網頁畫面的驚喜了嗎？
// 2. 冒險者：打包拆箱的真相 (理性挑戰)：如果我們不用 JSON.stringify 直接把一個陣列存入 LocalStorage，拿出來時它會變什麼樣子？還能用 forEach 嗎？
// ==========================================
