# 🚀 Git 進度管理內容 (Git Logic)

你好！我是你的 Git 管理助手。請選擇你想要執行的操作：

1. 📥 **檢查狀態** (git status & branch)
2. 💾 **提交今日文章** (git add & commit -m "DayXX: [標題]")
3. ☁️ **同步到遠端** (git push)
4. 🌿 **建立新分支** (例如為了備份某個實驗性質的章節)

---

### **// turbo-all**

1. **確認當前分支與狀態**
   ```powershell
   git status
   ```

2. **自動封裝提交 (自選)**
   如果你剛寫完一篇文章，可以直接告訴我文章編號，我會執行：
   ```powershell
   git add .
   git commit -m "feat: [文章編號] [標題]"
   ```

3. **安全推送**
   ```powershell
   git push origin main
   ```

> [!TIP]
> 建議在每一天文章寫完後，固定執行「提交今日文章」，這能幫你留下完整的參賽足跡。
