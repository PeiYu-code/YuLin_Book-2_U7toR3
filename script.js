const words = [
  { zh: "seek", en: "尋找" },
  { zh: "audience", en: "觀眾" },
  { zh: "series", en: "系列" },
  { zh: "technology", en: "科技" },
  { zh: "worth", en: "值得...的" },
  { zh: "foundation", en: "基金會" },
  { zh: "conference", en: "會議" },
  { zh: "increasingly", en: "越來越..." },
  { zh: "organizer", en: "籌辦者" },
  { zh: "broad", en: "廣泛的" },
  { zh: "range", en: "範圍、系列" },
  { zh: "field", en: "領域" },
  { zh: "philosophy", en: "哲學" },
  { zh: "launch", en: "發起" },
  { zh: "collection", en: "收藏" },
  { zh: "numerous", en: "許多的" },
  { zh: "celebrity", en: "名人" },
  { zh: "fascination", en: "著迷" },
  { zh: "fiction", en: "小說" },
  { zh: "discuss", en: "探討、討論" },
  { zh: "method", en: "方式" },
  { zh: "as well as", en: "和" },
  { zh: "for free", en: "免費" },
  { zh: "at present", en: "現在" },
  { zh: "give... a try", en: "嘗試" },
  { zh: "broaden one's horizons", en: "拓展某人的視野" }
];

let remaining = [...words];
let leftSlots = [];
let rightSlots = [];
let selectedLeft = null;
let wrongCount = 0;

document.getElementById("startBtn").onclick = () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  initGame();
};

function drawWord() {
  if (remaining.length === 0) return null;
  const i = Math.floor(Math.random() * remaining.length);
  return remaining.splice(i, 1)[0];
}

/* =========================
   INIT GAME
========================= */
function initGame() {
  const leftCol = document.getElementById("leftColumn");
  const rightCol = document.getElementById("rightColumn");

  leftCol.innerHTML = "";
  rightCol.innerHTML = "";

  leftSlots = [];
  rightSlots = [];

  const pool = [];

  for (let i = 0; i < 5; i++) {
    const w = drawWord();
    if (w) pool.push(w);
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  pool.forEach(w => {
    const div = createSlot(w.zh, "left");
    div.onclick = () => selectLeft(w, div);
    leftCol.appendChild(div);

    leftSlots.push({ word: w, el: div, matched: false });
  });

  shuffled.forEach(w => {
    const div = createSlot(w.en, "right");
    div.onclick = () => selectRight(w, div);
    rightCol.appendChild(div);

    rightSlots.push({ word: w, el: div, matched: false });
  });
}

/* =========================
   SLOT CREATION
========================= */
function createSlot(text, side) {
  const div = document.createElement("div");
  div.className = `slot ${side}`;
  div.innerText = text;
  return div;
}

/* =========================
   RESET COLORS (錯誤後點任意處恢復)
========================= */
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("slot")) {
    clearColors();
  }
});

function clearColors() {
  document.querySelectorAll(".slot").forEach(el => {
    el.style.backgroundColor = "";
    el.style.color = "";
  });
}

/* =========================
   SELECT LEFT
========================= */
function selectLeft(word, el) {
  clearColors();

  document.querySelectorAll(".left").forEach(x => x.classList.remove("selected"));
  el.classList.add("selected");

  selectedLeft = { word, el };
}

/* =========================
   SELECT RIGHT
========================= */
function selectRight(word, el) {
  if (!selectedLeft) return;

  if (selectedLeft.word === word) {
    // ✅ correct
    selectedLeft.el.style.backgroundColor = "#2e7d32";
    selectedLeft.el.style.color = "white";

    el.style.backgroundColor = "#2e7d32";
    el.style.color = "white";

    markMatched(selectedLeft.word);

    checkFinish();

  } else {
    // ❌ wrong
    wrongCount++;

    selectedLeft.el.style.backgroundColor = "#c62828";
    el.style.backgroundColor = "#c62828";

    selectedLeft.el.style.color = "white";
    el.style.color = "white";
  }

  selectedLeft = null;
}

/* =========================
   MARK MATCHED
========================= */
function markMatched(word) {
  leftSlots.forEach(s => {
    if (s.word === word) s.matched = true;
  });
  rightSlots.forEach(s => {
    if (s.word === word) s.matched = true;
  });
}

/* =========================
   CHECK FINISH
========================= */
function checkFinish() {
  const done = leftSlots.every(s => s.matched);

  if (done) {
    setTimeout(() => {
      alert(`完成！\n錯誤次數：${wrongCount}`);
    }, 200);
  }
}
