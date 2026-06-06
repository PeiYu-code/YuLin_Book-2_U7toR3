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
let selectedLeft = null;

document.getElementById("startBtn").onclick = () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  initGame();
};

function initGame() {
  currentPairs = drawWords(5);
  render();
}

function drawWords(n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    if (remaining.length === 0) break;
    let index = Math.floor(Math.random() * remaining.length);
    result.push(remaining.splice(index, 1)[0]);
  }
  return result;
}

function render() {
  const leftCol = document.getElementById("leftColumn");
  const rightCol = document.getElementById("rightColumn");

  leftCol.innerHTML = "";
  rightCol.innerHTML = "";

  let shuffled = [...currentPairs].sort(() => Math.random() - 0.5);

  currentPairs.forEach(word => {
    const div = document.createElement("div");
    div.className = "slot left";
    div.innerText = word.zh;
    div.onclick = () => selectLeft(div, word);
    leftCol.appendChild(div);
  });

  shuffled.forEach(word => {
    const div = document.createElement("div");
    div.className = "slot right";
    div.innerText = word.en;
    div.onclick = () => selectRight(div, word);
    rightCol.appendChild(div);
  });
}

function selectLeft(div, word) {
  document.querySelectorAll(".left").forEach(el => el.classList.remove("selected"));
  div.classList.add("selected");
  selectedLeft = word;
}

function selectRight(div, word) {
  if (!selectedLeft) return;

  if (selectedLeft === word) {
    div.classList.add("matched");

    document.querySelectorAll(".left").forEach(el => {
      if (el.innerText === word.zh) el.classList.add("matched");
    });

    setTimeout(() => {
      currentPairs = currentPairs.filter(w => w !== word);

      if (remaining.length > 0) {
        let newWord = drawWords(1)[0];
        if (newWord) currentPairs.push(newWord);
      }

      if (currentPairs.length === 0) {
        alert("完成！");
      } else {
        render();
      }
    }, 400);
  }

  selectedLeft = null;
}
