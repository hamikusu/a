const gameContainer = document.getElementById("game-container");
const scoreBoard = document.getElementById("score");
const bgMusic = document.getElementById("bg-music");
let score = 0;

// 音声ファイルのパス
const sounds = [
  "C.mp3", // ド
  "D.mp3", // レ
  "E.mp3", // ミ
  "F.mp3", // ファ
  "G.mp3", // ソ
  "A.mp3", // ラ
  "B.mp3", // シ
];

function playSound(noteIndex) {
  const audio = new Audio(sounds[noteIndex]);
  audio.play();
}

function createTile() {
  const tile = document.createElement("div");
  tile.classList.add("tile");

  // ランダムな横位置と音
  const randomX = Math.floor(Math.random() * 4) * 75;
  const soundIndex = Math.floor(Math.random() * sounds.length);

  tile.style.left = randomX + "px";
  tile.style.top = "0px";

  // ゲームエリアに追加
  gameContainer.appendChild(tile);

  // タイルが下に落ちるアニメーション
  const fallInterval = setInterval(() => {
    const currentTop = parseInt(tile.style.top.replace("px", ""));
    if (currentTop >= 500) {
      clearInterval(fallInterval);
      gameContainer.removeChild(tile);
      alert("ゲームオーバー！スコア: " + score);
      resetGame();
    } else {
      tile.style.top = currentTop + 5 + "px";
    }
  }, 50);

  // タイルをクリックでスコアアップ＆音再生
  tile.addEventListener("click", () => {
    clearInterval(fallInterval);
    gameContainer.removeChild(tile);
    score++;
    scoreBoard.textContent = score;
    playSound(soundIndex); // 音を再生
  });
}

function resetGame() {
  score = 0;
  scoreBoard.textContent = score;
  gameContainer.innerHTML = "";
  bgMusic.pause();
  bgMusic.currentTime = 0;
}

function startGame() {
  bgMusic.play();
  setInterval(createTile, 1000);
}

// ゲームスタート
startGame();
