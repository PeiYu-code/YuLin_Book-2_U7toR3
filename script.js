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
let slotsLeft = [];     // 左邊固定 5 個 slots 的狀態 (儲存單字物件)
let slotsRight = [];    // 右邊固定 5 個 slots 的狀態 (儲存單字物件)

let selectedEngIndex = null; // 改用索引來記錄選取位置
let successCount = 0;
let errorCount = 0;

// 宣告 DOM 變數
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
    selectedEngIndex = null;
    
    successScoreEl.textContent = successCount;
    errorScoreEl.textContent = errorCount;
    resultModal.classList.add("hidden");

    // 1. 先隨機抽出 5 個單字作為檯面基礎
    const currentWords = [];
    const initSize = Math.min(5, pool.length);
    for(let i = 0; i < initSize; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        currentWords.push(pool.splice(randomIndex, 1)[0]);
    }

    // 2. 左邊按原本抽出順序放，右邊中文把這 5 個順序打亂放（確保左右是一對一亂序）
    slotsLeft = [...currentWords];
    slotsRight = shuffle([...currentWords]);

    // 補滿 5 個位置（若不夠字，用 null 填補）
    while(slotsLeft.length < 5) slotsLeft.push(null);
    while(slotsRight.length < 5) slotsRight.push(null);

    updateRemainingCount();
    renderBoardFirstTime();
}

// 更新剩餘單字數顯示
function updateRemainingCount() {
    remainingCountEl.textContent = pool.length;
}

// 第一次或重置時，建立固定的 5 個 HTML Slot 節點
function renderBoardFirstTime() {
    engColumn.innerHTML = "";
    chColumn.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        // 建立英文 Slot
        const engSlot = document.createElement("div");
        engSlot.className = "slot";
        engSlot.dataset.index = i;
        engSlot.addEventListener("click", () => handleEngClick(i));
        engColumn.appendChild(engSlot);

        // 建立中文 Slot
        const chSlot = document.createElement("div");
        chSlot.className = "slot";
        chSlot.dataset.index = i;
        chSlot.addEventListener("click", () => handleChClick(i));
        chColumn.appendChild(chSlot);
    }
    
    // 更新這 5 個格子的內容
    refreshAllSlots();
}

// 根據 slotsLeft 和 slotsRight 陣列，更新畫面上所有格子的文字與顯示狀態
function refreshAllSlots() {
    const engSlots = engColumn.querySelectorAll(".slot");
    const chSlots = chColumn.querySelectorAll(".slot");

    for (let i = 0; i < 5; i++) {
        // 更新英文格子
        if (slotsLeft[i]) {
            engSlots[i].textContent = slotsLeft[i].eng;
            engSlots[i].style.visibility = "visible";
            engSlots[i].classList.remove("fade-out");
        } else {
            engSlots[i].style.visibility = "hidden"; // 沒字了就隱藏不佔位
        }

        // 更新中文格子
        if (slotsRight[i]) {
            chSlots[i].textContent = slotsRight[i].ch;
            chSlots[i].style.visibility = "visible";
            chSlots[i].classList.remove("fade-out");
        } else {
            chSlots[i].style.visibility = "hidden";
        }
    }
}

// 點選左邊英文 Slot (傳入索引 0~4)
function handleEngClick(index) {
    if (!slotsLeft[index]) return; // 空格子點擊無效

    const engSlots = engColumn.querySelectorAll(".slot");

    if (selectedEngIndex === index) {
        engSlots[index].classList.remove("selected");
        selectedEngIndex = null;
        return;
    }
    
    engSlots.forEach(s => s.classList.remove("selected"));
    engSlots[index].classList.add("selected");
    selectedEngIndex = index;
}

// 點選右邊中文 Slot (傳入索引 0~4)
function handleChClick(chIndex) {
    if (!slotsRight[chIndex]) return; // 空格子點擊無效

    if (selectedEngIndex === null) {
        alert("請先在左邊選擇一個英文單字！");
        return;
    }

    const engIndex = selectedEngIndex;
    const engSlots = engColumn.querySelectorAll(".slot");
    const chSlots = chColumn.querySelectorAll(".slot");

    const engWord = slotsLeft[engIndex];
    const chWord = slotsRight[chIndex];

    // 比對點選的英文與中文是否屬於同一個單字物件
    if (engWord.eng === chWord.eng) {
        // 配對成功
        successCount++;
        successScoreEl.textContent = successCount;
        
        engSlots[engIndex].classList.remove("selected");
        selectedEngIndex = null;

        // 只有這兩個格子單獨淡出
        engSlots[engIndex].classList.add("fade-out");
        chSlots[chIndex].classList.add("fade-out");

        setTimeout(() => {
            // 從字庫補新字
            if (pool.length > 0) {
                // 抽出一個新字
                const newWord = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
                
                // 直接原地塞進剛才空出來的左邊與右邊位置
                slotsLeft[engIndex] = newWord;
                slotsRight[chIndex] = newWord;

                // 重新整理文字內容
                refreshAllSlots();

                // 讓這兩個新補上字的格子播放淡入動畫
                engSlots[engIndex].classList.add("fade-in");
                chSlots[chIndex].classList.add("fade-in");
                
                // 動畫結束後移除淡入 class 以便下次使用
                setTimeout(() => {
                    engSlots[engIndex].classList.remove("fade-in");
                    chSlots[chIndex].classList.remove("fade-in");
                }, 500);

            } else {
                // 如果字庫沒字了，這兩個位置就變空 (null)
                slotsLeft[engIndex] = null;
                slotsRight[chIndex] = null;
                refreshAllSlots();
            }

            updateRemainingCount();

            // 檢查是否左欄 5 個 slots 都清空了（代表全部單字測試完畢）
            const isGameOver = slotsLeft.every(item => item === null);
            if (isGameOver) {
                showResult();
            }
        }, 500);

    } else {
        // 配對錯誤
        errorCount++;
        errorScoreEl.textContent = errorCount;

        engSlots[engIndex].classList.add("wrong");
        chSlots[chIndex].classList.add("wrong");

        setTimeout(() => {
            engSlots[engIndex].classList.remove("wrong", "selected");
            chSlots[chIndex].classList.remove("wrong");
            selectedEngIndex = null;
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
