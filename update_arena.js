const fs = require('fs');
const path = require('path');

const targetDirs = [
  path.join(__dirname, 'Posts'),
  path.join(__dirname, '../liwendocusaurus/docs/01-learning/js-core-remaster')
];

let modifiedCount = 0;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 若已包含 QuestBoard，則跳過
  if (content.includes('[🛡️ 任務達成證明：QuestBoard 公會報到處]')) {
    return;
  }

  // 找尋 實戰演武場 區塊
  const arenaRegex = /(## 🎯 【實戰演武場】[\s\S]*?)(?=## 📚 |---|$)/;
  const arenaMatch = content.match(arenaRegex);
  
  if (!arenaMatch) return;
  
  let arenaSection = arenaMatch[0];
  let originalArenaSection = arenaSection;
  
  // 找尋 CodePen 連結
  const codePenRegex = /(?:1\.\s*|- )?(\[📜[^\]]*CodePen[^\]]*\]\((https:\/\/codepen\.io[^\)]+)\))/;
  const match = arenaSection.match(codePenRegex);
  
  if (match) {
    const fullLink = match[1]; // e.g. [📜 本日實戰任務...](https...)
    const linkUrl = match[2];
    
    // 檢查是否有標準的 "1. ... 2. 將 CodePen 網址貼至..." 的結構
    const standardFormatRegex = /1\.\s*\[📜[^\]]*CodePen[^\]]*\]\([^\)]+\)[\s\n]*2\.\s*將 CodePen 網址貼至.*\n/;
    
    if (standardFormatRegex.test(arenaSection)) {
      // 替換為標準格式
      const newFormat = `- ${fullLink}\n- [🛡️ 任務達成證明：QuestBoard 公會報到處](https://liwenchiou.github.io/QuestBoard-Remaster/)\n\n### ⚔️ 任務鑑定條件：\n\n1. 完成 [📜 本日實戰任務 (CodePen)](${linkUrl})。\n2. 將 CodePen 網址貼至 **QuestBoard**，並回填鑑定報告：\n`;
      arenaSection = arenaSection.replace(standardFormatRegex, newFormat);
    } else {
      // 若非標準格式（如 Day 28），直接在下方補上 QuestBoard 連結，避免破壞其他內容
      arenaSection = arenaSection.replace(fullLink, `${fullLink}\n- [🛡️ 任務達成證明：QuestBoard 公會報到處](https://liwenchiou.github.io/QuestBoard-Remaster/)`);
    }

    content = content.replace(originalArenaSection, arenaSection);
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
    console.log(`✅ 已更新：${path.basename(filePath)}`);
  } else {
    console.log(`⚠️ 找不到 CodePen 連結：${path.basename(filePath)}`);
  }
}

targetDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    files.forEach(file => {
      processFile(path.join(dir, file));
    });
  }
});

console.log(`\n總共更新了 ${modifiedCount} 個檔案！`);
