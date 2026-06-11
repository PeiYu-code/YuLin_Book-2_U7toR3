// 1. 單字資料庫 (包含所有單字)
const wordBank = [
    { eng: "seek", ch: "尋找" },
    { eng: "audience", ch: "觀眾" },
    { eng: "technology", ch: "科技" },
    { eng: "economy", ch: "經濟" },
    { eng: "capital", ch: "首都/資金" },
    { eng: "indoor", ch: "室內的" },
    { eng: "outdoor", ch: "室外的" },
    { eng: "primary", ch: "主要的/初級的" },
    { eng: "secondary", ch: "次要的/中等的" },
    { eng: "medical", ch: "醫療的" },
    { eng: "industry", ch: "工業/產業" },
    { eng: "expert", ch: "專家" },
    { eng: "professor", ch: "教授" },
    { eng: "scientist", ch: "科學家" },
    { eng: "method", ch: "方法" },
    { eng: "system", ch: "系統/制度" },
    { eng: "culture", ch: "文化" },
    { eng: "society", ch: "社會" },
    { eng: "citizen", ch: "公民/市民" },
    { eng: "government", ch: "政府" },
    { eng: "policy", ch: "政策" },
    { eng: "program", ch: "節目/程式/計畫" },
    { eng: "project", ch: "計畫/專案" },
    { eng: "strategy", ch: "策略" },
    { eng: "resource", ch: "資源" },
    { eng: "source", ch: "來源" },
    { eng: "target", ch: "目標" },
    { eng: "task", ch: "任務" },
    { eng: "factor", ch: "因素" },
    { eng: "feature", ch: "特徵/特色" },
    { eng: "structure", ch: "結構/建築物" },
    { eng: "surface", ch: "表面" },
    { eng: "environment", ch: "環境" },
    { eng: "nature", ch: "自然/天性" },
    { eng: "region", ch: "地區" },
    { eng: "section", ch: "部分/區域" },
    { eng: "period", ch: "期間/句點" },
    { eng: "century", ch: "世紀" },
    { eng: "decade", ch: "十年" },
    { eng: "generation", ch: "世代" },
    { eng: "status", ch: "地位/狀態" },
    { eng: "degree", ch: "程度/度數/學位" },
    { eng: "level", ch: "水平/等級" },
    { eng: "range", ch: "範圍" },
    { eng: "amount", ch: "數量" },
    { eng: "rate", ch: "比率/速度" },
    { eng: "value", ch: "價值" }
    // 老師未來可以直接在這邊複製格式增加新單字：{ eng: "word", ch: "中文" }
];

// 2. 遊戲狀態變數
let wordPool = [];        // 從主資料庫抽出的 45/50 題單字池
let activeEng = [];       // 目前畫面上顯示的 5 個英文單字
let activeCh = [];        // 目前畫面上顯示的 5 個中文單字

let selectedEngSlot = null;
let selectedChSlot = null;

let remainingCount = 0;
let successScore = 0;
let errorScore = 0;

// 用來記錄這回合答錯過的單字 (使用 Set 確保同一單字不重複出現)
let wrongWordsSet = new Set();

// 3. 亂數洗牌函數 (Fisher-Yates Shuffle)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 4. 初始化遊戲
function initGame() {
    // 複製一份完整單字庫並洗牌
    let allWords = [...wordBank];
    shuffle(allWords);
    
    // 抽出 45 個單字作為本回合的測試池 (若不夠則以實際總數為準)
    const gameSize = Math.min(45, allWords.length);
    wordPool = allWords.slice(0, gameSize);
    
    remainingCount = wordPool.length;
    successScore = 0;
    errorScore = 0;
    wrongWordsSet.clear();
    
    updateScoreboard();
    
    // 從單字池中抽出最初的 5 個單字放到畫面上
    activeEng = [];
    activeCh = [];
    const initialDraw = Math.min(5, wordPool.length);
    for (let i = 0; i < initialDraw; i++) {
        const word = wordPool.pop();
        activeEng.push(word);
        activeCh.push(word);
    }
    
    // 初始狀態下：英文保持抽出順序，中文進行洗牌打亂
    shuffle(activeCh);
    
    // 渲染到畫面上
    renderColumns();
    
    // 隱藏結束視窗
    document.getElementById('result-modal').classList.add('hidden');
    
    selectedEngSlot = null;
    selectedChSlot = null;
}

// 5. 更新計分板
function updateScoreboard() {
    document.getElementById('remaining-count').textContent = remainingCount;
    document.getElementById('success-score').textContent = successScore;
    document.getElementById('error-score').textContent = errorScore;
}

// 6. 渲染欄位
function renderColumns() {
    const engColumn = document.getElementById('english-column');
    const chColumn = document.getElementById('chinese-column');
    
    engColumn.innerHTML = '';
    chColumn.innerHTML = '';
    
    // 渲染英文欄
    activeEng.forEach(word => {
        const slot = document.createElement('div');
        slot.className = 'slot fade-in';
        slot.textContent = word.eng;
        slot.dataset.type = 'eng';
        slot.dataset.word = word.eng;
        slot.addEventListener('click', handleEngClick);
        engColumn.appendChild(slot);
    });
    
    // 渲染中文欄
    activeCh.forEach(word => {
        const slot = document.createElement('div');
        slot.className = 'slot fade-in';
        slot.textContent = word.ch;
        slot.dataset.type = 'ch';
        slot.dataset.word = word.eng; // 用英文當作對應配對的 Key
        slot.addEventListener('click', handleChClick);
        chColumn.appendChild(slot);
    });
}

// 7. 點擊英文欄處理
function handleEngClick(e) {
    if (selectedEngSlot) {
        selectedEngSlot.classList.remove('selected');
    }
    selectedEngSlot = e.target;
    selectedEngSlot.classList.add('selected');
    
    // 如果此時中文也有被選取的，直接觸發檢查機制
    if (selectedChSlot) {
        checkMatch();
    }
}

// 8. 點擊中文欄處理
function handleChClick(e) {
    if (selectedChSlot) {
        selectedChSlot.classList.remove('selected');
    }
    selectedChSlot = e.target;
    selectedChSlot.classList.add('selected');
    
    // 如果此時英文也有被選取的，直接觸發檢查機制
    if (selectedEngSlot) {
        checkMatch();
    }
}

// 9. 檢查是否配對成功
function checkMatch() {
    const engWord = selectedEngSlot.dataset.word;
    const chWord = selectedChSlot.dataset.word;
    
    // 配對成功
    if (engWord === chWord) {
        selectedEngSlot.classList.add('fade-out');
        selectedChSlot.classList.add('fade-out');
        
        remainingCount--;
        successScore++;
        updateScoreboard();
        
        // 暫存目前的選取節點，避免計時器異步執行時出錯
        const currentEng = selectedEngSlot;
        const currentCh = selectedChSlot;
        
        selectedEngSlot = null;
        selectedChSlot = null;
        
        setTimeout(() => {
            // 從畫面活動陣列中移除剛剛過關的單字
            const engIndex = activeEng.findIndex(w => w.eng === engWord);
            activeEng.splice(engIndex, 1);
            
            const chIndex = activeCh.findIndex(w => w.eng === chWord);
            activeCh.splice(chIndex, 1);
            
            // 如果單字池還有牌，補上一張新單字到活動陣列中
            if (wordPool.length > 0) {
                const nextWord = wordPool.pop();
                activeEng.push(nextWord);
                activeCh.push(nextWord);
            }
            
            // ✨ 核心修正：每當補上新字，立即將目前的中文活動陣列徹底重新洗牌！
            // 這樣新字就不會出現在相同的格子位置，完全打破位置記憶的規律。
            shuffle(activeCh);
            
            // 重新渲染畫面
            renderColumns();
            
            // 判斷遊戲是否結束
            if (activeEng.length === 0) {
                showResult();
            }
        }, 500);
        
    } else {
        // 配對失敗
        errorScore++;
        updateScoreboard();
        
        // 記錄寫錯的英文單字與中文翻譯到錯誤清單中
        const wrongEngText = selectedEngSlot.textContent;
        const wrongChText = selectedChSlot.textContent;
        
        // 找出該英文正確的中文解釋
        const correctWordObj = wordBank.find(w => w.eng === wrongEngText);
        if (correctWordObj) {
            wrongWordsSet.add(`${correctWordObj.eng} (${correctWordObj.ch})`);
        }
        
        selectedEngSlot.classList.add('wrong');
        selectedChSlot.classList.add('wrong');
        
        const currentEng = selectedEngSlot;
        const currentCh = selectedChSlot;
        
        selectedEngSlot = null;
        selectedChSlot = null;
        
        setTimeout(() => {
            currentEng.classList.remove('selected', 'wrong');
            currentCh.classList.remove('selected', 'wrong');
        }, 500);
    }
}

// 10. 顯示結算畫面彈出視窗
function showResult() {
    document.getElementById('final-success').textContent = successScore;
    document.getElementById('final-error').textContent = errorScore;
    
    const wrongWordsList = document.getElementById('wrong-words-list');
    wrongWordsList.innerHTML = '';
    
    if (wrongWordsSet.size > 0) {
        document.getElementById('wrong-words-box').style.display = 'block';
        wrongWordsSet.forEach(wordStr => {
            const li = document.createElement('li');
            li.textContent = wordStr;
            wrongWordsList.appendChild(li);
        });
    } else {
        document.getElementById('wrong-words-box').style.display = 'none';
    }
    
    document.getElementById('result-modal').classList.remove('hidden');
}

// 11. 監聽重新開始按鈕與網頁載入
document.getElementById('restart-btn').addEventListener('click', initGame);
window.addEventListener('DOMContentLoaded', initGame);
