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
let currentLeft = [];   // 目前左邊畫面的單字物件
let currentRight = [];  // 目前右邊畫面的單字物件

let selectedEngSlot = null;
let successCount = 0;
let errorCount = 0;

// 宣告 DOM 變數 (在 DOMContentLoaded 中賦值)
let engColumn, chColumn, remainingCountEl, successScoreEl, errorScoreEl, resultModal, finalSuccessEl, finalErrorsEl, restartBtn;

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
    // 右邊的中文一開始跟左邊一樣
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
        slot.className = "slot " + (item.isNew ? "fade-in" : "");
        slot.textContent = item.eng;
        slot.dataset.eng = item.eng;
        slot.addEventListener("click", () => handleEngClick(slot));
        engColumn.appendChild(slot);
        delete item.isNew; // 用完標籤後清除
    });

    // 生成中文 Slots
    shuffledCh.forEach(item => {
        const slot = document.createElement("div");
        slot.className = "slot " + (item.isNewCh ? "fade-in" : "");
        slot.textContent = item.ch;
        slot.dataset.eng = item.eng;
        slot.addEventListener("click", () => handleChClick(slot));
        chColumn.appendChild(slot);
        delete item.isNewCh; // 用完標籤後清除
    });
}

// 點選左邊英文 Slot
function handleEngClick(slot) {
    if (selectedEngSlot === slot) {
        slot.classList.remove("selected");
        selectedEngSlot = null;
        return;
    }
    document.querySelectorAll("#english-column .slot").forEach(s => s.classList.remove("selected"));
    slot.classList.add("selected");
    selectedEngSlot = slot;
}

// 點選右邊中文 Slot
function handleChClick(chSlot) {
    if (!selectedEngSlot) {
        alert("請先在左邊選擇一個英文單字！");
        return;
    }

    const engSlot = selectedEngSlot;
    
    if (engSlot.dataset.eng === chSlot.dataset.eng) {
        // 配對成功
        successCount++;
        successScoreEl.textContent = successCount;
        
        engSlot.classList.remove("selected");
        selectedEngSlot = null;

        engSlot.classList.add("fade-out");
        chSlot.classList.add("fade-out");

        setTimeout(() => {
            const matchedEng = engSlot.dataset.eng;
            
            currentLeft = currentLeft.filter(item => item.eng !== matchedEng);
            currentRight = currentRight.filter(item => item.eng !== matchedEng);

            if (pool.length > 0) {
                const nextWord = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
                nextWord.isNew = true;   // 加上標籤讓新補的字有淡入動畫
                nextWord.isNewCh = true;
                currentLeft.push(nextWord);
                currentRight.push(nextWord);
            }

            updateRemainingCount();

            if (currentLeft.length === 0) {
                showResult();
            } else {
                renderBoard();
            }
        }, 500);

    } else {
        // 配對錯誤
        errorCount++;
        errorScoreEl.textContent = errorCount;

        engSlot.classList.add("wrong");
        chSlot.classList.add("wrong");

        setTimeout(() => {
            engSlot.classList.remove("wrong", "selected");
            chSlot.classList.remove("wrong");
            selectedEngSlot = null;
        }, 500);
    }
}

// 顯示遊戲結束統計
function showResult() {
    finalSuccessEl.textContent = successCount;
    finalErrorsEl.textContent = errorCount;
    resultModal.classList.remove("hidden");
}

// 確保網頁載入完畢才綁定 DOM 元素並初始化
document.addEventListener("DOMContentLoaded", () => {
    engColumn = document.getElementById("english-column");
    chColumn = document.getElementById("chinese-column");
    remainingCountEl = document.getElementById("remaining-count");
    successScoreEl = document.getElementById("success-score");
    errorScoreEl = document.getElementById("error-score");
    resultModal = document.getElementById("result-modal");
    finalSuccessEl = document.getElementById("final-success");
    finalErrorsEl = document.getElementById("final-errors");
    restartBtn = document.getElementById("restart-btn");

    restartBtn.addEventListener("click", initGame);
    
    initGame();
});
