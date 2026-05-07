// ⚔️ Day 20：【契約挑戰】簽下你的傳奇 Promise ⚔️

// 🛡️ 冒險者，這是 Phase 3 的最終試煉！
// 目標：模擬一個去商店「購買武器」的過程。
// 流程：店員收錢 (非同步 1秒) -> 檢查庫存 (隨機成功/失敗) -> 領取武器。

// ---
// 🗡️ 任務 1：建立你的第一個契約 (Promise)
// ---
function buyWeapon(money) {
  return new Promise((resolve, reject) => {
    console.log("💰 店員收下錢，正在後台檢查庫存...");

    // 模擬非同步等待 1.5 秒
    setTimeout(() => {
      if (money >= 100) {
        // 🟢 成功：資料傳遞出去
        resolve("🛡️ 獲得【傳奇鋼盾】！");
      } else {
        // 🔴 失敗：傳遞報錯原因
        reject("❌ 金幣不足，被趕出了商店。");
      }
    }, 1500);
  });
}

// ---
// 🗡️ 任務 2：執行契約
// ---
// ✍️ 職人修煉區：嘗試呼叫 buyWeapon 並使用 .then() 與 .catch() 處理結果

buyWeapon(120)
  .then((weapon) => {
    console.log("🎉 結果：" + weapon);
  })
  .catch((error) => {
    console.error("🌋 慘案發生：" + error);
  });

// ---
// 🗡️ 任務 3：【進階】連續契約 (Chaining)
// 邏輯：買完武器後，再去「強化武器」
// ---
function upgradeWeapon(weapon) {
  return new Promise((resolve) => {
    console.log("🔨 鐵匠正在強化 " + weapon + "...");
    setTimeout(() => {
      resolve(
        "✨ 強化後的 +" + (Math.floor(Math.random() * 9) + 1) + " " + weapon,
      );
    }, 1000);
  });
}

// ✍️ 挑戰區：嘗試把 buyWeapon 與 upgradeWeapon 串連起來！
// 提示：記得在第一個 .then 中 return 另一個 Promise。

/* 
代碼撰寫預覽：
buyWeapon(150)
  .then(weapon => upgradeWeapon(weapon))
  .then(finalResult => console.log("🏆 最終裝備：" + finalResult))
  .catch(err => console.log(err));
*/

// ==========================================
// 🎯 任務鑑定提醒：
// 1. 初心者：契約發動術 (成就感發掘)：你是否理解了 resolve 與 reject 分別對應到哪一個後續動作？
// 2. 冒險者：連續任務 (理性挑戰)：你成功避開了「回呼地獄」，用一條線直通到底了嗎？
// ==========================================
