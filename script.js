// 1. 單字庫：家教老師您日後更新單字，只需修改或增減這裡的內容即可！
const wordBank = [
    { eng: "seek", ch: "尋找 (v.)" },
    { eng: "audience", ch: "觀眾 (n.)" },
    { eng: "series", ch: "系列 (n.)" },
    { eng: "technology", ch: "科技 (n.)" },
    { eng: "worth", ch: "值得 (adj.)" },
    { eng: "foundation", ch: "基金會 (n.)" },
    { eng: "conference", ch: "會議 (n.)" },
    { eng: "increasingly", ch: "越來越... (adv.)" },
    { eng: "organizer", ch: "籌辦者 (n.)" },
    { eng: "broad", ch: "廣泛的 (adj.)" },
    { eng: "range", ch: "範圍、系列 (n.)" },
    { eng: "field", ch: "領域 (n.)" },
    { eng: "philosophy", ch: "哲學 (n.)" },
    { eng: "launch", ch: "發起 (v.)" },
    { eng: "collection", ch: "收藏 (n.)" },
    { eng: "numerous", ch: "許多的 (adj.)" },
    { eng: "celebrity", ch: "名人 (n.)" },
    { eng: "fascination", ch: "著迷 (n.)" },
    { eng: "fiction", ch: "小說、虛構的東西 (n.)" },
    { eng: "discuss", ch: "討論、探討 (v.)" },
    { eng: "method", ch: "方式 (n.)" },
    { eng: "as well as", ch: "和" },
    { eng: "for free", ch: "免費" },
    { eng: "at present", ch: "現在" },
    { eng: "give... a try", ch: "嘗試" },
    { eng: "broaden one's horizons", ch: "拓展某人的視野" },
    { eng: "exchange", ch: "交換 (n.)" },
    { eng: "expect", ch: "預期 (v.)" },
    { eng: "shelter", ch: "遮蔽、庇護 (v.)" },
    { eng: "fierce", ch: "強烈的 (adj.)" },
    { eng: "occupy", ch: "占據(時間或空間) (v.)" },
    { eng: "vehicle", ch: "車輛 (n.)" },
    { eng: "temporary", ch: "暫時的 (adj.)" },
    { eng: "assistant", ch: "助理 (n.)" },
    { eng: "curious", ch: "好奇的 (adj.)" },
    { eng: "originate", ch: "起源於 (v.)" },
    { eng: "event", ch: "事件 (n.)" },
    { eng: "elder", ch: "長輩 (n.)、年長的 (adj.)" },
    { eng: "neighborhood", ch: "鄰近地區 (n.)" },
    { eng: "cooperate", ch: "合作 (v.)" },
    { eng: "arrange", ch: "安排 (v.)" },
    { eng: "relax", ch: "放鬆 (v.)" },
    { eng: "container", ch: "容器 (n.)" },
    { eng: "stroll", ch: "散步 (v., n.)" },
    { eng: "aspect", ch: "方面 (n.)" },
    { eng: "spirit", ch: "精神、本質 (n.)" },
    { eng: "take part in", ch: "參加" },
    { eng: "take place", ch: "發生、舉行" },
    { eng: "come about", ch: "發生" },
    { eng: "help (...) out", ch: "幫助" },
    { eng: "hand out", ch: "發放" },
    { eng: "cradle", ch: "搖籃、發源地 (n.)" },
    { eng: "closet", ch: "衣櫃、壁櫥 (n.)" },
    { eng: "stool", ch: "凳子 (n.)" },
    { eng: "leopard", ch: "豹 (n.)" },
    { eng: "beast", ch: "野獸 (n.)" },
    { eng: "monster", ch: "怪獸 (n.)" },
    { eng: "elevator", ch: "電梯 (n.)" },
    { eng: "ray", ch: "光線、光芒 (n.)" },
    { eng: "housekeeper", ch: "管家 (n.)" },
    { eng: "household", ch: "家庭(的) (n., adj.)" },
    { eng: "plenty", ch: "大量、充足 (n.)" },
    { eng: "plenty of", ch: "許多 (接可數或不可數都可)" },
    { eng: "dumpling", ch: "餃子 (n.)" },
    { eng: "berry", ch: "莓果 (n.)" },
    { eng: "pea", ch: "豌豆 (n.)" },
    { eng: "bean", ch: "豆子 (n.)" },
    { eng: "shrink", ch: "縮小 (v.), 精神科醫生 (n.)" },
    { eng: "spaghetti", ch: "義大利直麵 (n.)" },
    { eng: "thirst", ch: "渴、渴望 (n. +for)" },
    { eng: "scale", ch: "規模、磅秤、魚鱗(n.)" },
    { eng: "awkward", ch: "尷尬的 (adj.)" },
    { eng: "rate", ch: "比率、速度 (n.); 評比 (v.)" },
    { eng: "bunch", ch: "一束、一綑 (n.)" },
    { eng: "trend", ch: "趨勢 (n.)" },
    { eng: "demand", ch: "強烈要求 (v.); 需求 (n.)" },
    { eng: "demanding", ch: "苛刻的、要求很多的 (adj.)" },
    { eng: "pregnancy", ch: "懷孕 (n.)" },
    { eng: "dip", ch: "浸泡、沾(醬) (v.)" },
    { eng: "roast", ch: "烤 (v.)" },
    { eng: "steam", ch: "蒸(v.); 蒸氣(n.)" },
    { eng: "gallon", ch: "加侖(n.)" },
    { eng: "whip", ch: "鞭打、攪打(鮮奶油或蛋)(v.)" },
    { eng: "dine", ch: "用餐(v.)" },
    { eng: "agree", ch: "同意(v.)" },
    { eng: "agreeable", ch: "令人愉悅的、和藹的(adj.)" },
    { eng: "disagree", ch: "不同意(v.)" },
    { eng: "rely", ch: "依賴(v. +on)" },
    { eng: "reliable", ch: "可靠的(adj.)" },
    { eng: "bush", ch: "灌木、矮樹叢(n.)" },
    { eng: "spoil", ch: "搞砸、溺愛、(食物)變壞(v.)" },
    { eng: "stubborn", ch: "固執的、(污漬)頑強的(adj.)" },
    { eng: "tend", ch: "傾向於(+to)、照顧(v.)" },
    { eng: "tendency", ch: "傾向(n.)" },
    { eng: "permit", ch: "允許(v.), 許可證(n.)" },
    { eng: "permission", ch: "允許(n.)" },
    { eng: "optimistic", ch: "樂觀的(adj.)" },
    { eng: "pessimistic", ch: "悲觀的(adj.)" },
    { eng: "innocent", ch: "無辜的、天真的(adj.)" },
    { eng: "innocence", ch: "清白、天真(n.)" },
    { eng: "sincere", ch: "真誠的(adj.)" },
    { eng: "meanwhile", ch: "同時(adv.)" },
    { eng: "constant", ch: "持續的、經常的(adj.)" },
    { eng: "nest", ch: "巢(n.)、築巢(v.)" },
    { eng: "crop", ch: "作物、收成(n.)" },
    { eng: "alphabet", ch: "字母(n.)" },
    { eng: "vocabulary", ch: "字彙(n.)" },
    { eng: "clinic", ch: "診所(n.)" },
    { eng: "remain", ch: "維持(v.)" },
    { eng: "experiment", ch: "實驗(v., n.)" },
    { eng: "headline", ch: "新聞頭條(n.)" },
    { eng: "log", ch: "圓木、航海或飛行日誌(n.); 登入、紀錄(v.)" },
    { eng: "explanation", ch: "解釋(n.)" },
    { eng: "explain", ch: "解釋(v.)" },
    { eng: "tutor", ch: "家教老師" }
    // ... 老師您可以陸續往下增加幾百個單字都沒問題
];

// 遊戲狀態變數
let pool = [];          // 本回隨機挑選出的 50 個單字池
let slotsLeft = [];     // 左邊固定 5 個 slots 的狀態
let slotsRight = [];    // 右邊固定 5 個 slots 的狀態

let selectedEngIndex = null; 
let successCount = 0;
let errorCount = 0;
let wrongWordsSet = new Set(); // 用來記錄本回答錯的英文單字（使用 Set 防止重複塞入相同單字）

// 宣告 DOM 變數
let engColumn, chColumn, remainingCountEl, successScoreEl, errorScoreEl, resultModal, finalSuccessEl, finalErrorsEl, restartBtn;
let wrongWordsBox, wrongWordsList;

// 洗牌函數 (Shuffle)
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 初始化/重置遊戲
function initGame() {
    successCount = 0;
    errorCount = 0;
    selectedEngIndex = null;
    wrongWordsSet.clear(); // 清空上一回的錯題紀錄
    
    successScoreEl.textContent = successCount;
    errorScoreEl.textContent = errorCount;
    resultModal.classList.add("hidden");

    // 【新邏輯】從龐大的大字庫（wordBank）中，隨機抽出 50 個單字作為本回測驗
    // 如果總單字量還不足 50 個，就直接全拿
    const tempBank = [...wordBank];
    const totalQuestions = Math.min(50, tempBank.length);
    pool = [];
    
    for (let i = 0; i < totalQuestions; i++) {
        const randomIndex = Math.floor(Math.random() * tempBank.length);
        pool.push(tempBank.splice(randomIndex, 1)[0]);
    }

    // 從這 50 個字中，先隨機抽出 5 個放上檯面
    const currentWords = [];
    const initSize = Math.min(5, pool.length);
    for(let i = 0; i < initSize; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        currentWords.push(pool.splice(randomIndex, 1)[0]);
    }

    // 左邊英文照原本順序，右邊中文打亂順序
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

// 建立固定的 5 個 HTML Slot 節點
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
    
    refreshAllSlots();
}

// 根據資料陣列更新畫面文字
function refreshAllSlots() {
    const engSlots = engColumn.querySelectorAll(".slot");
    const chSlots = chColumn.querySelectorAll(".slot");

    for (let i = 0; i < 5; i++) {
        if (slotsLeft[i]) {
            engSlots[i].textContent = slotsLeft[i].eng;
            engSlots[i].style.visibility = "visible";
            engSlots[i].classList.remove("fade-out");
        } else {
            engSlots[i].style.visibility = "hidden";
        }

        if (slotsRight[i]) {
            chSlots[i].textContent = slotsRight[i].ch;
            chSlots[i].style.visibility = "visible";
            chSlots[i].classList.remove("fade-out");
        } else {
            chSlots[i].style.visibility = "hidden";
        }
    }
}

// 點選左邊英文 Slot
function handleEngClick(index) {
    if (!slotsLeft[index]) return;

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

// 點選右邊中文 Slot
function handleChClick(chIndex) {
    if (!slotsRight[chIndex]) return;

    if (selectedEngIndex === null) {
        alert("請先在左邊選擇一個英文單字！");
        return;
    }

    const engIndex = selectedEngIndex;
    const engSlots = engColumn.querySelectorAll(".slot");
    const chSlots = chColumn.querySelectorAll(".slot");

    const engWord = slotsLeft[engIndex];
    const chWord = slotsRight[chIndex];

    if (engWord.eng === chWord.eng) {
        // 配對成功
        successCount++;
        successScoreEl.textContent = successCount;
        
        engSlots[engIndex].classList.remove("selected");
        selectedEngIndex = null;

        engSlots[engIndex].classList.add("fade-out");
        chSlots[chIndex].classList.add("fade-out");

        setTimeout(() => {
            if (pool.length > 0) {
                const newWord = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
                slotsLeft[engIndex] = newWord;
                slotsRight[chIndex] = newWord;

                refreshAllSlots();

                engSlots[engIndex].classList.add("fade-in");
                chSlots[chIndex].classList.add("fade-in");
                
                setTimeout(() => {
                    engSlots[engIndex].classList.remove("fade-in");
                    chSlots[chIndex].classList.remove("fade-in");
                }, 500);

            } else {
                slotsLeft[engIndex] = null;
                slotsRight[chIndex] = null;
                refreshAllSlots();
            }

            updateRemainingCount();

            const isGameOver = slotsLeft.every(item => item === null);
            if (isGameOver) {
                showResult();
            }
        }, 500);

    } else {
        // 配對錯誤
        errorCount++;
        errorScoreEl.textContent = errorCount;

        // 【新功能】偷偷把學生選錯的這個英文單字物件紀錄到錯題 Set 中
        wrongWordsSet.add(engWord);

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

    // 清空舊的錯題顯示內容
    wrongWordsList.innerHTML = "";

    // 如果有錯題，就把區塊打開並將錯字一個一個渲染進 <li> 標籤裡
    if (wrongWordsSet.size > 0) {
        wrongWordsBox.style.display = "block";
        wrongWordsSet.forEach(word => {
            const li = document.createElement("li");
            // 格式呈現： apple (蘋果)
            li.textContent = `${word.eng} (${word.ch})`;
            wrongWordsList.appendChild(li);
        });
    } else {
        // 全對的情況下隱藏紅色的錯題區塊
        wrongWordsBox.style.display = "none";
    }

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
    
    // 綁定錯題欄位
    wrongWordsBox = document.getElementById("wrong-words-box");
    wrongWordsList = document.getElementById("wrong-words-list");

    restartBtn.addEventListener("click", initGame);
    
    initGame();
});
