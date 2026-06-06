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
let slots = []; // ⭐ 固定 5 個 slot
let selectedLeft = null;

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

    const pair = {
      word,
      leftEl: left,
      rightEl: right
    };

    left.onclick = () => selectLeft(pair);
    right.onclick = () => selectRight(pair);

    leftCol.appendChild(left);
    rightCol.appendChild(right);

    slots.push(pair);
  }
}

function createSlot(text, side) {
  const div = document.createElement("div");
  div.className = `slot ${side}`;
  div.innerText = text;
  return div;
}

function selectLeft(pair) {
  document.querySelectorAll(".left").forEach(el => el.classList.remove("selected"));
  pair.leftEl.classList.add("selected");
  selectedLeft = pair;
}

function selectRight(pair) {
  if (!selectedLeft) return;

  if (selectedLeft.word === pair.word) {
    replaceSlot(pair);
  }

  selectedLeft = null;
}

function replaceSlot(pair) {
  const newWord = drawWord();

  // fade out OLD
  pair.leftEl.classList.add("fade-out");
  pair.rightEl.classList.add("fade-out");

  setTimeout(() => {
    if (!newWord) {
      pair.leftEl.style.visibility = "hidden";
      pair.rightEl.style.visibility = "hidden";
      return;
    }

    // update data
    pair.word = newWord;

    // update text
    pair.leftEl.innerText = newWord.zh;
    pair.rightEl.innerText = newWord.en;

    // reset animation
    pair.leftEl.classList.remove("fade-out");
    pair.rightEl.classList.remove("fade-out");

    pair.leftEl.classList.add("fade-in");
    pair.rightEl.classList.add("fade-in");

    // rebind click
    pair.leftEl.onclick = () => selectLeft(pair);
    pair.rightEl.onclick = () => selectRight(pair);

  }, 300);
}
