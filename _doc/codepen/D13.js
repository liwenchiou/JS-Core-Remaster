// ⚔️ Day 13：DOM 樹大探險：抓取與操作 ⚔️

// 🛡️ 冒險者，歡迎來到「DOM 定位儀」演武場！
// 今天我們不只要「找到」元素，還要「讀取」並「改變」它們。
// 請打開 Console 並開始你的修煉：

// ==========================================
// 練習1：尋標狙擊 (Single Selector & textContent)
// 任務：將 #target-npc 的文字改為「偵查完畢」
// ==========================================

/* 💡 情境說明：
   城堡中有一位帶著關鍵情報的 NPC (#target-npc)。
   請用 querySelector 抓到他，並修改他的 textContent。
*/

/* ✍️ 作答區 */
// const npc = ...


// ==========================================
// 練習2：群體變裝 (Multiple Selector & classList)
// 任務：將所有 .monster 加上「is-red」類別
// ==========================================

/* 💡 情境說明：
   一群怪獸 (.monster) 出現了！
   請用 querySelectorAll 抓取整群，
   並利用 forEach 為每一隻怪獸加上 classList.add('is-red')。
*/

/* ✍️ 作答區 */
// const monsters = ...


// ==========================================
// 練習3：讀取機密 (dataset & getAttribute)
// 任務：讀取 #boss 的 data-id 與 src 屬性
// ==========================================

/* 💡 情境說明：
   BOSS 身上藏著祕密 ID。
   請讀取 #boss 的 dataset.id 以及 getAttribute('src')。
*/

/* ✍️ 作答區 */
// const boss = document.querySelector('#boss');
// const bossId = ...
// const bossImg = ...


// ==========================================
// 練習4：讀心術 (Input .value)
// 任務：獲取 #player-name 輸入框的值
// ==========================================

/* 💡 情境說明：
   當玩家在輸入框輸入名字後，我們需要獲取這個值。
   請使用 .value 獲取輸入框的內容。
*/

/* ✍️ 作答區 */
// const playerName = ...


// 🚩 總結：
// 選取用 querySelector，改文字用 textContent，改外觀用 classList。
// 獲取輸入用 value，自定義資料看 dataset。
// 完成後，將你的「尋標與讀心術」成果貼至 QuestBoard 吧！
