// ⚔️ Day 23：【防禦挑戰】殘缺資料的救援行動 ⚔️

// 🛡️ 冒險者，今天我們要處理一包「受損的資料包裹」。
// 目標：在不讓程式碼崩潰的前提下，優雅地顯示勇者的屬性。

const damagedHeroData = {
  name: "艾爾登戰士",
  stats: {
    hp: 100,
    mp: 0, // 👈 測試 ?? 的關鍵點
  },
  // 🎒 缺少了 backpack 屬性！
  // 🎒 缺少了 equipment 屬性！
};

// ---
// 🏹 任務 1：遠程偵測 (Optional Chaining)
// ---
function checkHeroInventory(hero) {
  console.log("🔍 正在掃描勇者背囊...");

  // 1. ✍️ 職人修煉區：嘗試讀取 hero.backpack.mainItem
  // 要求：使用「可選鏈結 ?.」確保不會報錯，
  // 並且結合「空值合併 ??」在資料不存在時回傳預設字串："🎒 手手空空"

  // 請在此處實作 (定義 const item)：

  // console.log("背囊主位：", item);
}

// ---
// 🏹 任務 2：精準預設值 (Nullish Coalescing)
// ---
function checkHeroStats(hero) {
  console.log("📊 正在讀取數據...");

  // 2. ✍️ 職人修煉區：設定 HP 與 MP 的預設值
  // 要求：使用「空值合併 ??」進行防禦
  // - 當 HP 缺失時，預設值為 10
  // - 當 MP 缺失時，預設值為 5
  // [注意]：如果數據是 0，這代表勇者只是數值為 0，不應該被判定為缺失而跳到預設值！

  // 請在此處實作 (定義 const currentHP, currentMP)：

  // console.log(`HP: ${currentHP}, MP: ${currentMP}`);
}

// 執行測試
console.log("--- 測試 1：受損資料 ---");
checkHeroInventory(damagedHeroData);
checkHeroStats(damagedHeroData);

console.log("\n--- 測試 2：完全空物件 ---");
checkHeroInventory({});
checkHeroStats({});

// ==========================================
// 🎯 任務鑑定提醒：
// 1. 初心者：偵測發動術 (成就感發掘)：當你傳入空物件 {} 時，程式是不是依然平安運行沒報紅字？
// 2. 冒險者：預設值陷阱 (理性挑戰)：在測試 1 中，MP 是 0 還是預設的 5？如果是 0，恭喜你成功守護了數據！
// ==========================================
