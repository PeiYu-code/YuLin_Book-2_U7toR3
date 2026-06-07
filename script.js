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
