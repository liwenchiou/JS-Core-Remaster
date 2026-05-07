// ⚔️ Day 21：【英雄挑戰】時空暫停術實戰 ⚔️

// 🛡️ 冒險者，今天我們要將昨天的「契約挑戰」進行現代化重構！
// 目標：使用 async / await 重新編寫購物流程，並加入 try...catch 護盾。

// ---
// 🏹 基礎裝備 (延用昨天的非同步任務)
// ---
function buyWeapon(money) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (money >= 100) {
        resolve("🛡️ 獲得【傳奇鋼盾】！");
      } else {
        reject("❌ 金幣不足，被趕出了商店。");
      }
    }, 1000);
  });
}

function upgradeWeapon(weapon) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        "✨ 強化後的 +" + (Math.floor(Math.random() * 9) + 1) + " " + weapon,
      );
    }, 500);
  });
}

// ---
// 🗡️ 任務 1：時空暫停重構 (Async/Await)
// ---
// ✍️ 職人修煉區：將以下邏輯改寫為 async/await 寫法
async function startAdventure(money) {
  console.log("🎬 冒險開始！正在進入商店...");

  /* 
  作答導引：
  1. 使用 try 區塊包圍邏輯。
  2. 使用 await 呼叫 buyWeapon 並存入變數。
  3. 使用 await 呼叫 upgradeWeapon 並傳入上一步的結果。
  4. 使用 catch 區塊接住失敗訊息。
  */

  // 這裡開始寫作...
}

// 執行修煉
startAdventure(150);
startAdventure(50); // 測試失敗案例

// ==========================================
// 🎯 任務鑑定提醒：
// 1. 初心者：語法重構術 (成就感發掘)：你是否感覺代碼從「垂直鏈條」變成了「水平清單」？
// 2. 冒險者：錯誤攔截機制 (理性挑戰)：你在 try...catch 中成功捕捉到「金幣不足」的慘劇了嗎？
// ==========================================
