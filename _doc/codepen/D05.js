// ⚔️ Day 05：實戰演武場 —— 雙子座鎖鏈偵查實驗室 ⚔️
// 導師：新夥伴，今天我們要偵訊那些「共用靈魂」的變數。
// 任務說明：請打開控制台 (Console)，觀察並修改代碼，找出傳址的真相。

// ==========================================
// 練習一：傳值與傳址的初次接觸 (Value vs Reference)
// ==========================================
/* 
   任務：
   1. 觀察 name1 與 name2 (字串)。
   2. 觀察 hero1 與 hero2 (物件)。
   3. 修改 name2 的值，看看 name1 會不會變？
   4. 修改 hero2.level 的值，看看 hero1 會不會變？
*/

let name1 = "辛梅爾";
let name2 = name1; 
name2 = "海塔"; 

const hero1 = { name: "辛梅爾", level: 1 };
const hero2 = hero1; 
// ✍️ 請在下方修改 hero2.level：


console.log("name1 (字串):", name1);
console.log("hero1 (物件):", hero1.level);


// ==========================================
// 練習二：共用鑰匙的災難 (Shared Key Trap)
// ==========================================
/* 
   任務：
   公會有一份物資名單 inventory。
   你不小心執行了 const myInventory = inventory。
   請在 myInventory 中加入一個新裝備 "生鏽的鐵劍" (push)。
   鑑定：這是否也影響了公會原本的 inventory？
*/

const inventory = ["法杖", "盾牌"];

// ✍️ 請在下方操作 myInventory：


console.log("公會原名單：", inventory);


// ==========================================
// 練習三：密室裡的變身術 (Function Argument Trap)
// ==========================================
/* 
   任務：
   完成 updateHP 函式。
   觀察當我們把 player1 傳進去後，發生了什麼事？
*/

const player1 = { name: "勇者", hp: 100 };

function updateHP(target) {
    // ✍️ 請在這裡將 target.hp 改成 0
    
}

updateHP(player1);
console.log("player1 的最終狀態：", player1.hp);


// ==========================================
// 練習四：精英偵查任務 —— 影子的影子 (Nested Challenge)
// ==========================================
/* 
   任務：
   思考題：如果我們有一個陣列裝著很多物件。
   const team = [{ name: "A" }, { name: "B" }];
   const backup = team;
   
   如果你改了 backup[0].name，為何 team 也會跟著變？
*/


// ==========================================
// 演武場結束！恭喜你領悟了傳址的真相，明天我們將學習如何「破除詛咒」。
// ==========================================
