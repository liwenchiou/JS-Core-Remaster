// ⚔️ Day 24：【生存挑戰】復活保險甲實務 ⚔️

// 🛡️ 冒險者，今天我們要測試你的代碼在「災難」面前的生存能力！
// 目標：實作一個具備完整生命週期 (Try/Catch/Finally) 的 Fetch 流程。

async function getHeroData() {
  console.log("⏳ 任務啟動：正在開啟載入中動畫 (Loading: ON)...");

  // 💡 故意使用一個不存在的網址，這一定會觸發網路請求錯誤
  const url = "https://jsonplaceholder.typicode.com/invalid-path-999";

  try {
    // ---
    // 🏹 任務 1：挑戰區 (Try)
    // ---
    console.log("✈️ 派出探測隊...");

    // ✍️ 職人修煉區 [A]：完成 fetch 流程
    // 1. 請在此處使用 await fetch(url) 拿回 response
    // 2. 檢查如果 !response.ok，請使用 throw new Error() 拋出訊息：「找不到異世界入口！」
    // 3. 解析 json 資料並用 console.log 輸出
  } catch (error) {
    // ---
    // 🏹 任務 2：防禦區 (Catch)
    // ---
    // ✍️ 職人修煉區 [B]：捕捉爆炸現場
    // 1. 請使用 console.error 輸出： 「📢 救難隊回報：」 加上 error 的 message 情報
  } finally {
    // ---
    // 🏹 任務 3：清理區 (Finally)
    // ---
    // ✍️ 職人修煉區 [C]：不管勝敗都要執行的善後
    // 1. 請輸出：「🏁 任務結束：關閉載入中動畫 (Loading: OFF)」
  }
}

// 執行挑戰
getHeroData();

// ==========================================
// 🎯 任務鑑定提醒：
// 1. 初心者：捕捉發動術 (成就感發掘)：你是否成功攔截了噴紅字，改成輸出「救難隊回報」？
// 2. 冒險者：清場大師 (理性挑戰)：故意把 url 改成正確的 (https://jsonplaceholder.typicode.com/todos/1)
//    測試看看即便「成功」了，Finally 裡面的「Loading: OFF」是不是依然有出現？
// ==========================================
