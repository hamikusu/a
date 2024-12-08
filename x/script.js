const targetArea = document.getElementById('target-area');
const target = document.getElementById('target');
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');

let score = 0;
let timeLeft = 30;
let gameInterval;
let targetSpeed = 1000; // 初期の動く速さ (ミリ秒)

function getRandomPosition() {
  const areaRect = targetArea.getBoundingClientRect();
  const targetSize = target.offsetWidth;

  const maxX = areaRect.width - targetSize;
  const maxY = areaRect.height - targetSize;

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  return { x, y };
}

function moveTarget() {
  const position = getRandomPosition();
  target.style.left = `${position.x}px`;
  target.style.top = `${position.y}px`;
}

function startGame() {
  score = 0;
  timeLeft = 30;
  targetSpeed = 1000;

  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  startButton.disabled = true;
  moveTarget();

  gameInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      alert(`ゲーム終了！スコア: ${score}`);
      startButton.disabled = false;
    }

    moveTarget();
  }, targetSpeed);
}

function hitTarget() {
  score++;
  scoreDisplay.textContent = score;

  // 難易度を上げる（ターゲットが速く動く）
  if (score % 5 === 0 && targetSpeed > 200) {
    targetSpeed -= 100; // ターゲットの速度が速くなる
    clearInterval(gameInterval);

    gameInterval = setInterval(() => {
      timeLeft--;
      timeDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(gameInterval);
        alert(`ゲーム終了！スコア: ${score}`);
        startButton.disabled = false;
      }

      moveTarget();
    }, targetSpeed);
  }
}

target.addEventListener('click', hitTarget);
startButton.addEventListener('click', startGame);
