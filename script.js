// 1. 單字資料庫 (包含所有單字)
const wordBank = [
    { eng: "seek", ch: "尋找(v.)" },
    { eng: "audience", ch: "觀眾(n.)" },
    { eng: "series", ch: "系列(n.)" },
    { eng: "technology", ch: "科技(n.)" },
    { eng: "worth", ch: "值得... +Ving(adj.)" },
    { eng: "foundation", ch: "基金會(n.)" },
    { eng: "conference", ch: "會議(n.)" },
    { eng: "increasingly", ch: "越來越...(adv.)" },
    { eng: "organizer", ch: "籌辦人(n.)" },
    { eng: "broad", ch: "廣泛的(adj.)" },
    { eng: "range", ch: "範圍、系列(n.)" },
    { eng: "field", ch: "領域(n.)" },
    { eng: "philosophy", ch: "哲學(n.)" },
    { eng: "launch", ch: "發起(v.)" },
    { eng: "collection", ch: "收藏品(n.)" },
    { eng: "numerous", ch: "許多(adj.)+可數n." },
    { eng: "celebrity", ch: "名人(n.)" },
    { eng: "fascination", ch: "著迷(n.)" },
    { eng: "fiction", ch: "虛構的作品(n.)" },
    { eng: "discuss", ch: "討論(v.)" },
    { eng: "method", ch: "方式(n.)" },
    { eng: "as well as", ch: "和" },
    { eng: "for free", ch: "免費" },
    { eng: "at present", ch: "現在、當下" },
    { eng: "give... a try", ch: "嘗試" },
    { eng: "broaden one's horizons", ch: "拓寬某人的視野" }
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
        
        // 暫存目前的選取節點
        const currentEng = selectedEngSlot;
        const currentCh = selectedChSlot;
        
        selectedEngSlot = null;
        selectedChSlot = null;
        
        setTimeout(() => {
            // 1. 找出原本配對成功的單字在資料陣列中的索引位置
            const engIndex = activeEng.findIndex(w => w.eng === engWord);
            const chIndex = activeCh.findIndex(w => w.eng === chWord);
            
            // 2. 從單字池中抽出一張全新的字
            let nextWord = null;
            if (wordPool.length > 0) {
                nextWord = wordPool.pop();
                // 在內部陣列中直接替換掉舊單字
                activeEng[engIndex] = nextWord;
                activeCh[chIndex] = nextWord;
            } else {
                // 如果單字池空了，直接移除
                activeEng.splice(engIndex, 1);
                activeCh.splice(chIndex, 1);
            }
            
            // 3. 更新英文 DOM：完全不動其他 4 格，只在原位替換新字並重新觸發 fade-in
            if (nextWord) {
                currentEng.textContent = nextWord.eng;
                currentEng.dataset.word = nextWord.eng;
                currentEng.classList.remove('selected', 'fade-out', 'fade-in');
                void currentEng.offsetWidth; // 強制重繪以重置動畫
                currentEng.classList.add('fade-in');
            } else {
                currentEng.remove();
            }
            
            // 4. 更新中文 DOM：先處理被點擊的這一格，使其重組重生
            if (nextWord) {
                currentCh.textContent = nextWord.ch;
                currentCh.dataset.word = nextWord.eng;
                currentCh.classList.remove('selected', 'fade-out', 'fade-in');
                void currentCh.offsetWidth;
                currentCh.classList.add('fade-in');
            } else {
                currentCh.remove();
            }
            
            // 5. ✨ 只洗牌中文欄內部的文字內容，完全不破壞 DOM 結構與英文欄
            const chColumn = document.getElementById('chinese-column');
            const allChSlots = Array.from(chColumn.children);
            
            // 收集當前剩餘（包含剛剛重生）的所有中文格子的資料內容
            let currentChData = allChSlots.map(slot => ({
                text: slot.textContent,
                wordKey: slot.dataset.word
            }));
            
            // 隨機打亂這些資料
            shuffle(currentChData);
            
            // 將洗牌完的文字與 dataset 屬性依序倒回原本的中文格子中
            allChSlots.forEach((slot, index) => {
                slot.textContent = currentChData[index].text;
                slot.dataset.word = currentChData[index].wordKey;
            });
            
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
