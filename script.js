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
let slots = [];
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

function initGame() {
  const leftCol = document.getElementById("leftColumn");
  const rightCol = document.getElementById("rightColumn");

  leftCol.innerHTML = "";
  rightCol.innerHTML = "";

  slots = [];

  for (let i = 0; i < 5; i++) {
    const word = drawWord();

    const left = createSlot(word.zh, "left");
    const right = createSlot(word.en, "right");

    const slotObj = {
      word,
      leftEl: left,
      rightEl: right,
      matched: false
    };

    left.onclick = () => selectLeft(slotObj);
    right.onclick = () => selectRight(slotObj);

    leftCol.appendChild(left);
    rightCol.appendChild(right);

    slots.push(slotObj);
  }
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
function resetColors() {
  document.querySelectorAll(".slot").forEach(el => {
    el.style.backgroundColor = "";
    el.style.borderColor = "";
    el.style.color = "";
  });
}

/* =========================
   SELECT LEFT
========================= */
function selectLeft(slot) {
  resetColors();

  document.querySelectorAll(".left")
    .forEach(el => el.classList.remove("selected"));

  slot.leftEl.classList.add("selected");
  selected = slot;
}

/* =========================
   SELECT RIGHT
========================= */
function selectRight(slot) {
  if (!selected) return;

  const left = selected;
  const right = slot;

  if (left.word === right.word) {
    // ✅ correct
    left.matched = true;

    left.leftEl.style.backgroundColor = "#2e7d32";
    left.leftEl.style.color = "white";
    left.rightEl.style.backgroundColor = "#2e7d32";
    right.rightEl.style.color = "white";

    left.leftEl.classList.remove("selected");

    checkFinish();

  } else {
    // ❌ wrong
    wrongCount++;

    left.leftEl.style.backgroundColor = "#c62828";
    left.leftEl.style.color = "white";

    right.rightEl.style.backgroundColor = "#c62828";
    right.rightEl.style.color = "white";
  }

  selected = null;
}

/* =========================
   CHECK FINISH
========================= */
function checkFinish() {
  const allDone = slots.every(s => s.matched);

  if (allDone) {
    setTimeout(() => {
      alert(`完成！\n錯誤次數：${wrongCount}`);
    }, 200);
  }
}
