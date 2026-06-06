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
  { zh: "discuss", en: "探討、討論" }
];

let remaining = [...words];
let leftSlots = [];
let rightSlots = [];
let selected = null;
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
   INIT
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
    const el = createSlot(w.zh, "left");
    leftCol.appendChild(el);

    leftSlots.push({ word: w, el });
  });

  shuffled.forEach(w => {
    const el = createSlot(w.en, "right");
    rightCol.appendChild(el);

    rightSlots.push({ word: w, el });
  });
}

/* =========================
   SLOT
========================= */
function createSlot(text, side) {
  const div = document.createElement("div");
  div.className = `slot ${side}`;
  div.innerText = text;
  return div;
}

/* =========================
   RESET COLORS
========================= */
function clearColors() {
  document.querySelectorAll(".slot").forEach(el => {
    el.style.backgroundColor = "";
    el.style.color = "";
  });
}

/* =========================
   LEFT
========================= */
function selectLeft(slot) {
  clearColors();

  document.querySelectorAll(".left")
    .forEach(el => el.classList.remove("selected"));

  slot.el.classList.add("selected");
  selected = slot;
}

/* =========================
   RIGHT
========================= */
function selectRight(slot) {
  if (!selected) return;

  if (selected.word === slot.word) {
    // ✅ correct
    selected.el.style.backgroundColor = "#2e7d32";
    selected.el.style.color = "white";

    slot.el.style.backgroundColor = "#2e7d32";
    slot.el.style.color = "white";

    replaceLeftSlot(selected);
    replaceRightSlot(slot);

  } else {
    // ❌ wrong
    wrongCount++;

    selected.el.style.backgroundColor = "#c62828";
    slot.el.style.backgroundColor = "#c62828";

    selected.el.style.color = "white";
    slot.el.style.color = "white";
  }

  selected = null;
}

/* =========================
   🔥 KEY FIX: replace slot
========================= */
function replaceLeftSlot(slot) {
  const newWord = drawWord();
  if (!newWord) return;

  setTimeout(() => {
    slot.word = newWord;
    slot.el.innerText = newWord.zh;

    slot.el.style.backgroundColor = "";
    slot.el.style.color = "";
  }, 300);
}

function replaceRightSlot(slot) {
  const newWord = drawWord();
  if (!newWord) return;

  setTimeout(() => {
    slot.word = newWord;
    slot.el.innerText = newWord.en;

    slot.el.style.backgroundColor = "";
    slot.el.style.color = "";
  }, 300);
}
