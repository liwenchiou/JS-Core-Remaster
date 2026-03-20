---
description: 同步檢查指定天數的文章 (.md) 與 演武場代碼 (.js)
---

# ⚔️ 任務全線鑑定指令 (Cross-Check DayXX)

此指令用於執行「文章內容」與「程式碼實作」的一致性檢查，確保不超綱、不露餡、且符合世界觀。

## 🛠️ 執行步驟

1.  **資料定位**：
    *   根據輸入的 `[DayXX]`，在 `Posts/` 目錄下自動搜尋對應的 `.md` 文章。
    *   在 `_doc/codepen/` 目錄下自動搜尋對應的 `DXX.js` 檔案。

2.  **文章審核 (@Reviewer)**：
    *   調用 `article-reviewer` Skill 進行品質鑑定。
    *   **重點**：校核「本日任務」區塊提及的練習，是否與 `.js` 檔案中的內容對齊。

3.  **代碼審核 (@VeteranTester/@Reviewer)**：
    *   對照 `codepen-generator` Skill 中的「零解答鎖定 (Zero-Answer Lock)」原則。
    *   檢查 `.js` 檔案是否包含「答案暗示」或「未教過的語法」。
    *   確認註解風格是否具備 RPG 冒險感。

4.  **綜合彙整報告 (@Secretary)**：
    *   合併文章與代碼的審核點。
    *   給予整體鑑定等級 (Legendary / Epic / Quest Failed)。
    *   標註所有不符合「教學天數守衛 (Curriculum Guard)」的地方。

---

## 💡 使用方式
輸入 `/check DayXX` 即可啟動「全線鑑定」自動化流程。
