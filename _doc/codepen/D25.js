// ⚔️ Day 25：【終極實戰】異世界氣象觀測站 ⚔️

// 🛡️ 冒險者，這是檢驗你 Phase 4 所有技能的時刻。
// 目標：串接 OpenWeather API，實作完整的「請求 -> 防禦 -> 渲染」流程。

// 🗝️ API KEY 取得教學請見 Day 25 文章。
// 💡 小技巧：在測試時，可以先用此 Demo Key：e966fc5e3bcc7773d1b8077a3be9beeb (由導師提供)
const API_KEY = "e966fc5e3bcc7773d1b8077a3be9beeb";

// ---
// 🏹 核心元件選取
// ---
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("errorMessage");
const weatherCard = document.getElementById("weatherInfo");

// ---
// 🏹 任務區：實作氣象獲取邏輯
// ---
async function fetchWeather(city) {
  // ✍️ 任務 A：UI 狀態切換
  // 要求：顯示 loadingEl，隱藏 errorEl 與 weatherCard

  /* 在此實作 */

  try {
    // ✍️ 任務 B：發送信鴿 (Fetch)
    // 1. 請在此處實作 await fetch，網址為：
    //    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    // 2. 檢查 response.ok，如果不成功則拋出 Error：「該領地不存在或信鴿迷路了」
    // 3. 解析 json 資料
    /* 在此實作 (取得 data) */
    // ✍️ 任務 C：呼叫渲染函式
    // renderWeather(data);
  } catch (err) {
    // ✍️ 任務 D：復活緩衝
    // 要求：顯示 errorEl，並將錯誤訊息 (err.message) 設定進去
    /* 在此實作 */
  } finally {
    // ✍️ 任務 E：戰後清理
    // 要求：無論成功失敗，隱藏 loadingEl
    /* 在此實作 */
  }
}

function renderWeather(data) {
  // ✍️ 任務 F：資料填充 (DOM 操作)
  // 請使用「可選鏈結 ?.」安全地從 data 中讀取並填入以下 ID 的文字內容：
  // 1. "cityName" -> 城市名
  // 2. "temperature" -> 溫度 (提示：Math.round 數值)
  // 3. "description" -> 天氣描述
  // 4. "humidity" -> 濕度
  // 5. "windSpeed" -> 風速
  /* 在此實作 */
  // ✍️ 任務 G：揭開面板
  // 要求：顯示 weatherCard
}

// ---
// 🏹 事件監聽
// ---
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

// 💡 挑戰：按 Enter 鍵也能搜尋？
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});
