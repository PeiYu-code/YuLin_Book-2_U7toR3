// 1. 單字庫：家教老師您日後更新單字，只需修改或增減這裡的內容即可！
const wordBank = [
    { eng: "apple", ch: "蘋果" },
    { eng: "banana", ch: "香蕉" },
    { eng: "computer", ch: "電腦" },
    { eng: "teacher", ch: "老師" },
    { eng: "student", ch: "學生" },
    { eng: "english", ch: "英文" },
    { eng: "school", ch: "學校" },
    { eng: "book", ch: "書本" }
];

// 遊戲狀態變數
let pool = [];          // 尚未使用的單字池
let currentLeft = [];   // 目前左邊畫面的 5 個單字物件
let currentRight = [];  // 目前右邊畫面的 5 個單字物件

let selectedEngSlot = null;
let successCount = 0;
let errorCount = 0;

// 綁定 DOM 元素
const engColumn = document.getElementById("english-column");
const chColumn = document.getElementById("chinese-column");
const remainingCountEl = document.getElementById("remaining-count");
const successScoreEl = document.getElementById("success-score");
const errorScoreEl = document.getElementById("error-score");
const resultModal = document.getElementById("result-modal");
const finalSuccessEl = document.getElementById("final-success");
const finalErrorsEl = document.getElementById("final-errors");
const restartBtn = document.getElementById("restart-btn");

// 洗牌函數 (Shuffle)
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 初始化/重置遊戲
function initGame() {
    pool = [...wordBank]; // 複製一份完整字庫
    successCount = 0;
    errorCount = 0;
    selectedEngSlot = null;
    
    successScoreEl.textContent = successCount;
    errorScoreEl.textContent = errorCount;
    resultModal.classList.add("hidden");

    // 初始抽出 5 個單字放上檯面 (若字庫不足 5 個則全拿)
    currentLeft = [];
    const initSize = Math.min(5, pool.length);
    for(let i = 0; i < initSize; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        currentLeft.push(pool.splice(randomIndex, 1)[0]);
    }
    // 右邊的中文一開始跟左邊一樣，但順序要打亂
    currentRight = [...currentLeft];

    updateRemainingCount();
    renderBoard();
}

// 更新剩餘單字數顯示
function updateRemainingCount() {
    remainingCountEl.textContent = pool.length;
}

// 渲染（繪製）左 5 右 5 的 Slots 畫面
function renderBoard() {
    engColumn.innerHTML = "";
    chColumn.innerHTML = "";

    // 隨機打亂目前要顯示的英文與中文順序
    const shuffledEng = shuffle([...currentLeft]);
    const shuffledCh = shuffle([...currentRight]);

    // 生成英文 Slots
    shuffledEng.forEach(item => {
        const slot = document.createElement("div");
        slot.className = "slot fade-in";
        slot.textContent = item.eng;
        slot.dataset.eng = item.eng; // 用來比對答案的 id
        slot.addEventListener("click", () => handleEngClick(slot));
        engColumn.appendChild(slot);
    });

    // 生成中文 Slots
    shuffledCh.forEach(item => {
        const slot = document.createElement("div");
        slot.className = "slot fade-in";
        slot.textContent = item.ch;
        slot.dataset.eng = item.eng; // 綁定正確答案的英文作為對應
        slot.addEventListener("click", () => handleChClick(slot));
        chColumn.appendChild(slot);
    });
}

// 點選左邊英文 Slot
function handleEngClick(slot) {
    // 如果點選已選中的，就取消選取
    if (selectedEngSlot === slot) {
        slot.classList.remove("selected");
        selectedEngSlot = null;
        return;
    }
    
    // 清除其他英文 slot 的選取狀態，並選取當前這個
    document.querySelectorAll("#english-column .slot").forEach(s => s.classList.remove("selected"));
    slot.classList.add("selected");
    selectedEngSlot = slot;
}

// 點選右邊中文 Slot
function handleChClick(chSlot) {
    // 必須先點選英文，才能點中文
    if (!selectedEngSlot) {
        alert("請先在左邊選擇一個英文單字！");
        return;
    }

    const engSlot = selectedEngSlot;
    
    // 比對 dataset 中的英文標籤是否一致
    if (engSlot.dataset.eng === chSlot.dataset.eng) {
        // 1. 配對成功
        successCount++;
        successScoreEl.textContent = successCount;
        
        // 取消選取樣式
        engSlot.classList.remove("selected");
        selectedEngSlot = null;

        // 觸發 Fade out 淡出效果
        engSlot.classList.add("fade-out");
        chSlot.classList.add("fade-out");

        // 等待淡出動畫結束 (0.5秒) 後，遞補新單字
        setTimeout(() => {
            const matchedEng = engSlot.dataset.eng;
            
            // 從目前的動態畫面上移除這組配對
            currentLeft = currentLeft.filter(item => item.eng !== matchedEng);
            currentRight = currentRight.filter(item => item.eng !== matchedEng);

            // 如果字庫（Pool）還有字，補一新字進去
            if (pool.length > 0) {
                const nextWord = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
                currentLeft.push(nextWord);
                currentRight.push(nextWord);
            }

            updateRemainingCount();

            // 檢查是否所有單字都用完且畫面上也清空了
            if (currentLeft.length === 0) {
                showResult();
            } else {
                // 重新洗牌並呈現在畫面上
                renderBoard();
            }
        }, 500);

    } else {
        // 2. 配對錯誤
        errorCount++;
        errorScoreEl.textContent = errorCount;

        // 閃爍紅色錯誤提示
        engSlot.classList.add("wrong");
        chSlot.classList.add("wrong");

        setTimeout(() => {
            engSlot.classList.remove("wrong", "selected");
            chSlot.classList.remove("wrong");
            selectedEngSlot = null; // 答錯後清除選取，讓學生重新點選
        }, 500);
    }
}

// 顯示遊戲結束統計
function showResult() {
    finalSuccessEl.textContent = successCount;
    finalErrorsEl.textContent = errorCount;
    resultModal.classList.remove("hidden");
}

// 重來按鈕點擊事件
restartBtn.addEventListener("click", initGame);

// 網頁載入後自動啟動遊戲
window.onload = initGame;
