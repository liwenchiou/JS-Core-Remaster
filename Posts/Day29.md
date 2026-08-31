# Day 29：【實戰】重鑄你的傳奇裝備：將「任務佈告欄」升級為聖劍版

> **本文同步分享於個人部落格：[Liwen Chiou | Digital Architect & Full-Stack Engineer](https://garden.liwen.studio/docs/learning/js-core-remaster)**

---

### **⚔️ 裝備重鑄：從 Vanilla 到 React ⚔️**

> **「導師，我準備好了。請讓我看看聖劍真正的威力。」**
>
> 記得 Day 18 那把讓你修到滿頭大汗的「純 JS 鐵劍」嗎？今天，我們要把那份邏輯熔煉，注入我們這 30 天學會的所有核心靈魂，重造成一把具備自動修復與高效能的 **React 聖劍**。
>
> **看好了，這不是取代，而是進化。**

---

## 🛡️ 【公會大廳：重鑄計畫書】

在重鑄之前，我們要先對 Day 18 的舊裝備進行「拆解」。

### 1. 拆解零件 (Component Thinking)

在純 JS 時代，我們把所有的東西都塞進一個大檔案。但在 React 的世界裡，我們要學會 **「分家」**：

- **Input 組件**：負責接收冒險者的指令。
- **List 組件**：負責呈現任務看板。
- **Item 組件**：負責單一任務的狀態與操作。

### 2. 注入靈魂 (State Logic)

我們不再手動去改 `li` 的文字。我們只管維護一個名為 `todos` 的資料陣列。

---

## 💡 【導師講義：技術連招對照】

讓我們看看同樣的功能，在聖劍的加持下發生了什麼變化。

### 招式一：新增任務

- **舊式 (Day 18)**：抓 input 值 -> 建立 element -> 設定 class -> appendChild 到父元素。
- **聖劍式 (Day 29)**：`setTodos([...todos, newTodo])`。
- **導師講評**：看見了嗎？這就是 **Day 06 的展開運算子** 與 **Day 27 的資料驅動** 的完美合體。你只要改了陣列，畫面就會自動噴出來。

### 招式二：刪除任務

- **舊式 (Day 18)**：找到按鈕 -> 找到 parent -> 呼叫 removeChild。
- **聖劍式 (Day 29)**：`setTodos(todos.filter(t => t.id !== id))`。
- **導師講評**：這就是 **Day 09 的 filter 術**。我們在濾掉資料，而不是在「砍掉 DOM」。

---

## 🛡️ 【本日圖解心法：組件化拆解圖】

> **導師的圖解心法：** 整個佈告欄被拆成了三個獨立的房間。資料 (State) 像水流一樣從最上層流向下層的組件。

<!-- 🎨 圖解提示詞 (導師專用，產後刪除) ：
Forget all previous output...
【核心圖解重點】：
「Day 29：React 組件化佈告欄。
最外層：App Container (State 核心)。
內層 A：TodoInput (發送 Add 指令)。
內層 B：TodoList (讀取資料陣列)。
內層 C：TodoItem (呈現單一任務，帶有 Delete 按鈕)。
箭頭：標示 Props (Day 04) 的流動路徑。」
配色規範：金色 #FAB005 (React 元件)、藍色 #4DABF7 (邏輯流)、黃色 #FFD43B (資料流)。
-->

![組件化拆解圖](https://i.meee.com.tw/ZiUJBxb.png)

---

## ⚔️ 【戰術對抗：聖劍的華麗姿態】

### 代碼實戰：任務佈告欄核心

```javascript
// 💡 這就是 React 的魔力：UI = f(state)
function TodoApp() {
  const [todos, setTodos] = useState([]); // 閉包記憶 (Day 07)

  const handleAdd = (text) => {
    const newTodo = { id: Date.now(), text };
    setTodos([...todos, newTodo]); // 展開複製 (Day 06)
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id)); // 陣列篩選 (Day 09)
  };

  return (
    <div className="todo-app">
      <TodoInput onAdd={handleAdd} />
      <TodoList items={todos} onDelete={handleDelete} />
    </div>
  );
}
```

---

## 🏰 【勇者精英課：從士兵到將軍的轉變】

在 Day 18，你是個在工地搬磚的「士兵」，你要親手搬動每一塊磚頭 (DOM)。
在 Day 29，你是個在沙盤前推演的「將軍」，你只管調整沙盤上的旗幟 (State)，剩下的搬磚活，React 僕人會幫你做到完美。

這就是為什麼職人們不喜歡直接操作 DOM。因為 **當你習慣了將軍的視角，你就再也回不去搬磚的日子了。**

---

## 🛖 【營火叮嚀：導師的經驗談】

> 第一次用 React 重寫專案時，我總想著要用 `document.querySelector`。那是我 10 年來的習慣，改不掉。
>
> 那天前輩把我的滑鼠拿走，跟我說：「導師，試著用資料去思考。如果這是一個沒有螢幕的電腦，你要怎麼在記憶體裡完成這個任務？」
>
> 當我想通的那一刻，我發現我不只是學會了 React，我是真正學會了如何寫出「純粹且乾淨」的邏輯。

---

## 🎯 【實戰演武場】

1.  [📜 本日實戰任務題目 (CodePen：重鑄聖劍佈告欄)](https://codepen.io/editor/liwenchiou/pen/019e0270-8b36-7cac-b4be-66d367e77e0e)
- [🛡️ 任務達成證明：QuestBoard 公會報到處](https://liwenchiou.github.io/QuestBoard-Remaster/)
2.  **任務需求**：
    - [ ] 觀察代碼，指出哪裡用到了「展開運算子 (...)」。
    - [ ] 試著增加一個「清空所有任務」的按鈕。提示：只要把 state 改成 `[]` 就行了！

---

## 📚 【圖書館卷軸：延伸學習】

- **精深研究：** [Thinking in React (官方必讀心法)](https://react.dev/learn/thinking-in-react)
- **視覺化學習：** [React 渲染生命週期可視化](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
