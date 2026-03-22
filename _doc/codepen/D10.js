// ⚔️ Day 10：【圖解】this 到底是誰？變色龍盔甲的指向判定法 ⚔️

/* 
  📜 勇者任務說明：
  「變色龍盔甲 (this)」會根據誰穿上它而改變對齊的主人。
  請按下鍵盤的 F12（或 Ctrl+Shift+I）開啟開發者工具 Console，
  觀察盔甲的靈魂指向，並在下方的作答區完成靈魂鎖定 (bind) 與契約簽訂 (call/apply)。
*/

// ==========================================
// 練習一：誰呼叫，盔甲就指向誰 (Implicit Binding)
/*
  情境：公會中有兩位戰士「艾冉」與「辛梅爾」。
  他們共用同一個攻擊技能 `showOwner`。
  請在作答區執行呼叫，讓 Console 分別輸出正確的冒險者名稱。
*/

function showOwner() {
  console.log(`🛡️ 盔甲主人已更換為：${this.name}`);
}

const warriorA = { name: "艾冉", execute: showOwner };
const warriorB = { name: "辛梅爾", execute: showOwner };

/* ✍️ 作答區 */
// 1.  請執行 warriorA 的 execute 技能：

// 2.  請執行 warriorB 的 execute 技能：

// ==========================================
// 練習二：遺失的門牌號碼 (Lost Context)
/*
  情境：休塔爾克把攻擊卷軸 `shout` 暫存給了導師 `storedAction`，
  但因為呼叫時失去了物件連結（點前面沒人），導致盔甲變回無主狀態。
  請利用 `bind` 進行靈魂鎖定，讓 `storedAction` 正確輸出休塔爾克的名字。
*/

const trainee = {
  name: "休塔爾克",
  shout() {
    console.log(`💥 少年戰士的咆哮：${this.name}`);
  },
};

/* ✍️ 作答區 */
// 1.  請在此將 trainee.shout 綁定 (bind) 給 trainee，並存入 storedAction 中：
let storedAction;

// 2.  執行 storedAction()：

// ==========================================
// 練習三：超時的盔甲 (setTimeout this)
/*
  情境：魔法師「弗拉梅爾」想要預約 1 秒後的吟唱。
  下方程式碼在 1 秒後會噴出 undefined，請修復它。
  解法提示：你可以改用「箭頭函式」或使用「bind」來確保 context 繼承。
*/

const mage = {
  name: "弗拉梅爾",
  cast() {
    console.log(`✨ 開始吟唱：${this.name}`);
    setTimeout(function () {
      // ⚠️ 這裡的 this 在 1 秒後會指向路人 (Window)
      console.log(`🔮 魔法增益：${this.name} 魔法增強 20%`);
    }, 1000);
  },
};

/* ✍️ 作答區 */
// 修改下方區塊，讓 setTimeout 內部的 this 能正確指向 mage
// 執行測試：mage.cast();

// ==========================================
// 練習四：召喚術與契約 (call / apply)
/*
  情境：這是一套「公會長專屬裝甲」，它能透過 `call` 或 `apply` 接取任何勇者的支援請求。
  請依照註解要求，使用不同的契約方式發動攻擊。
*/

function supportAttack(skill, damage) {
  console.log(
    `🏹 ${this.name} 請求支援！發動 ${skill}，造成 ${damage} 點傷害！`,
  );
}

const adventurer = { name: "勇者修道生" };

/* ✍️ 作答區 */
// 1.  使用 call()：強制讓 supportAttack 的主人變成 adventurer，
//     技能名稱傳入 "火球術"，傷害 100：

// 2.  使用 apply()：強制讓 supportAttack 的主人變成 adventurer，
//     技能與傷害打包成陣列 ["雷擊", 150] 傳入：

// ==========================================
// 🎯 任務鑑定提醒：
// 演武結束！你已經成功掌握了「變色龍盔甲」的操作精髓。記住：決定 this 指向的不是「這段程式碼寫在哪」，而是「誰發動了它」。
//
// 💡 請帶著你的 CodePen 網址回到 QuestBoard，並回填鑑定報告：
// 1.  初心者：變色龍盔甲鑑定 (成就感發掘)：今天第一次親眼看到 `this` 指向隨玩家不同而改變時，有沒有感受到一種「看穿代碼真實靈魂」的感覺？
// 2.  冒險者：靈魂鎖定之術 (理性挑戰)：bind、call、apply 同樣都能修正 this 的指向，但它們發動時機最大的不同是什麼？
// ==========================================
