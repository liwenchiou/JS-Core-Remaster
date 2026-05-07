// ⚔️ Day 29：實戰演武場 —— 聖劍重鑄：React 任務佈告欄 ⚔️

const { useState, useEffect } = React;

// ---
// 1. 🛡️ 子組件：任務輸入框
// ---
function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText(""); // 清空輸入框
  };

  return (
    <form onSubmit={handleSubmit} className="actions">
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="想要完成什麼委託？"
      />
      <button type="submit">🏹 發布任務</button>
    </form>
  );
}

// ---
// 2. 🛡️ 子組件：單一任務項目
// ---
function TodoItem({ item, onDelete }) {
  return (
    <div className="member-card">
      <span>{item.text}</span>
      {/* 💡 利用 Day 09 的 id 篩選邏輯來刪除 */}
      <button onClick={() => onDelete(item.id)} style={{ background: '#fa5252' }}>
        撤銷
      </button>
    </div>
  );
}

// ---
// 3. 🏰 主組件：任務佈告欄
// ---
function TodoApp() {
  // 💡 [Day 07 閉包應用] 利用 useState 記住任務清單
  const [todos, setTodos] = useState([]);

  // ✍️ 任務 A：新增邏輯
  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text };
    // 💡 [Day 06 展開運算子] 保持不可變性，複製一份再更新
    setTodos([...todos, newTodo]);
  };

  // ✍️ 任務 B：刪除邏輯
  const deleteTodo = (id) => {
    // 💡 [Day 09 filter 術] 篩選掉不想要的 id
    const newTodos = todos.filter(t => t.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="todo-container">
      <TodoInput onAdd={addTodo} />
      
      <div id="memberList">
        {todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>目前公會佈告欄是空的...</p>
        ) : (
          /* 💡 [Day 09 map 術] 遍歷陣列生成組件 */
          todos.map(todo => (
            <TodoItem key={todo.id} item={todo} onDelete={deleteTodo} />
          ))
        )}
      </div>
    </div>
  );
}

// ---
// 🏹 最終渲染：將聖劍掛載到 HTML 容器
// ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TodoApp />);
