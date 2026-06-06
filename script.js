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
let currentPairs = [];
let leftSlots = [];
let rightSlots = [];
let selectedLeft = null;

document.getElementById("startBtn").onclick = () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  initGame();
};

function drawWords(n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    if (remaining.length === 0) break;
    let index = Math.floor(Math.random() * remaining.length);
    result.push(remaining.splice(index, 1)[0]);
  }
  return result;
}

function initGame() {
  currentPairs = drawWords(5);

  const leftCol = document.getElementById("leftColumn");
  const rightCol = document.getElementById("rightColumn");

  leftCol.innerHTML = "";
  rightCol.innerHTML = "";

  leftSlots = [];
  rightSlots = [];

  currentPairs.forEach((word, i) => {
    const leftDiv = createSlot(word.zh, "left", () => selectLeft(leftDiv, word));
    leftCol.appendChild(leftDiv);
    leftSlots.push({ el: leftDiv, word });

    const rightDiv = createSlot(word.en, "right", () => selectRight(rightDiv, word));
    rightCol.appendChild(rightDiv);
    rightSlots.push({ el: rightDiv, word });
  });

  shuffleRight();
}

function createSlot(text, side, onClick) {
  const div = document.createElement("div");
  div.className = `slot ${side} fade-in`;
  div.innerText = text;
  div.onclick = onClick;
  return div;
}

function shuffleRight() {
  rightSlots.sort(() => Math.random() - 0.5);
  const rightCol = document.getElementById("rightColumn");
  rightCol.innerHTML = "";
  rightSlots.forEach(obj => rightCol.appendChild(obj.el));
}

function selectLeft(div, word) {
  document.querySelectorAll(".left").forEach(el => el.classList.remove("selected"));
  div.classList.add("selected");
  selectedLeft = word;
}

function selectRight(div, word) {
  if (!selectedLeft) return;

  if (selectedLeft === word) {
    const index = currentPairs.findIndex(w => w === word);

    const leftObj = leftSlots[index];
    const rightObj = rightSlots.find(obj => obj.word === word);

    // fade out
    leftObj.el.classList.add("fade-out");
    rightObj.el.classList.add("fade-out");

    setTimeout(() => {
      if (remaining.length > 0) {
        const newWord = drawWords(1)[0];

        // 更新資料
        currentPairs[index] = newWord;
        leftObj.word = newWord;
        rightObj.word = newWord;

        // 更新文字
        leftObj.el.innerText = newWord.zh;
        rightObj.el.innerText = newWord.en;

        // reset animation
        leftObj.el.classList.remove("fade-out");
        rightObj.el.classList.remove("fade-out");

        leftObj.el.classList.add("fade-in");
        rightObj.el.classList.add("fade-in");

        // 更新 click 綁定
        leftObj.el.onclick = () => selectLeft(leftObj.el, newWord);
        rightObj.el.onclick = () => selectRight(rightObj.el, newWord);

        shuffleRight();

      } else {
        leftObj.el.style.visibility = "hidden";
        rightObj.el.style.visibility = "hidden";

        currentPairs.splice(index, 1);

        if (currentPairs.length === 0) {
          alert("完成！");
        }
      }
    }, 400);
  }

  selectedLeft = null;
}
