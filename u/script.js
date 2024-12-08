let score = 0;
let selectedStars = [];
let targetPattern = [0, 1, 2, 3, 4]; // 正解の順番
let constellationName = "オリオン座"; // 星座の名前
let gameContainer, canvas, ctx;

// ゲーム開始
function startGame() {
    score = 0;
    document.getElementById("score").innerText = "スコア: " + score;
    document.getElementById("constellationName").innerText = "";
    gameContainer = document.getElementById("gameContainer");
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = gameContainer.clientWidth;
    canvas.height = gameContainer.clientHeight;

    gameContainer.innerHTML = '';
    selectedStars = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 星の配置
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = Math.random() * (gameContainer.clientHeight - 30) + 'px';
        star.style.left = Math.random() * (gameContainer.clientWidth - 30) + 'px';
        star.dataset.index = i;
        star.innerText = i + 1; // 星の順番を表示
        star.onclick = () => selectStar(star);
        gameContainer.appendChild(star);
    }
}

function selectStar(star) {
    const index = parseInt(star.dataset.index);

    // クリックした星が正しい順番かチェック
    if (index === targetPattern[selectedStars.length]) {
        selectedStars.push(star);
        star.style.backgroundColor = '#00FF00'; // 正解なら緑に

        // 星をつなぐ線を描画
        if (selectedStars.length > 1) {
            const prevStar = selectedStars[selectedStars.length - 2];
            drawLineBetweenStars(prevStar, star);
        }

        // 星座が完成したら得点を追加
        if (selectedStars.length === targetPattern.length) {
            score++;
            document.getElementById("score").innerText = "スコア: " + score;
            document.getElementById("constellationName").innerText = "完成！星座: " + constellationName;
            alert("星座完成！次の星座に挑戦！");
            startGame(); // 次のレベルへ
        }
    } else {
        alert("間違いです！もう一度挑戦しましょう！");
        startGame(); // リセット
    }
}

// 2つの星を線で結ぶ関数（修正版）
function drawLineBetweenStars(star1, star2) {
    const gameContainerRect = gameContainer.getBoundingClientRect();
    const rect1 = star1.getBoundingClientRect();
    const rect2 = star2.getBoundingClientRect();

    // 星の中心座標を計算
    const x1 = rect1.left + rect1.width / 2 - gameContainerRect.left;
    const y1 = rect1.top + rect1.height / 2 - gameContainerRect.top;
    const x2 = rect2.left + rect2.width / 2 - gameContainerRect.left;
    const y2 = rect2.top + rect2.height / 2 - gameContainerRect.top;

    // Canvas上に線を描画
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 2;
    ctx.stroke();
}
