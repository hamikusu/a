const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ゲーム要素の設定
const GRID_SIZE = 50;
const PLAYER_SIZE = GRID_SIZE * 0.8;

let player = { x: 1, y: 4 };
let goal = { x: 6, y: 4 };
let treePosition = { x: 3, y: 4 }; // 木を育てる位置
let bridgeBuilt = false; // 木が橋になる状態

// マップデータ（0: 通路, 1: 障害物）
let map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
];

// ステージの描画
function drawGrid() {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 1) {
                ctx.fillStyle = "#666";
            } else {
                ctx.fillStyle = "#eee";
            }
            ctx.fillRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            ctx.strokeStyle = "#ccc";
            ctx.strokeRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        }
    }
}

// キャラクターを描画
function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(
        player.x * GRID_SIZE + GRID_SIZE * 0.1,
        player.y * GRID_SIZE + GRID_SIZE * 0.1,
        PLAYER_SIZE,
        PLAYER_SIZE
    );
}

// ゴールを描画
function drawGoal() {
    ctx.fillStyle = "green";
    ctx.fillRect(goal.x * GRID_SIZE, goal.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

// 木を描画
function drawTree() {
    if (!bridgeBuilt) {
        ctx.fillStyle = "darkgreen";
        ctx.fillRect(treePosition.x * GRID_SIZE, treePosition.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    } else {
        // 橋を描画
        ctx.fillStyle = "brown";
        ctx.fillRect(treePosition.x * GRID_SIZE, treePosition.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        // 橋の上を通れるようにマップを更新
        map[treePosition.y][treePosition.x] = 0;
    }
}

// ゲーム全体の描画
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawTree();
    drawGoal();
    drawPlayer();
}

// キャラクターの移動
function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    // マップの範囲内かチェック
    if (newX < 0 || newX >= map[0].length || newY < 0 || newY >= map.length) {
        return;
    }

    // 障害物があるかチェック
    if (map[newY][newX] === 1) {
        // 木の位置で橋ができていない場合
        if (newX === treePosition.x && newY === treePosition.y && !bridgeBuilt) {
            alert("木を育てて橋を作りました！");
            bridgeBuilt = true;
            draw();
        }
        return;
    }

    // プレイヤーを移動
    player.x = newX;
    player.y = newY;

    // ゴール判定
    if (player.x === goal.x && player.y === goal.y) {
        alert("ゴールしました！");
        // ゲームをリセット
        player = { x: 1, y: 4 };
        bridgeBuilt = false;
        // マップをリセット
        map[treePosition.y][treePosition.x] = 1;
        draw();
    }
}

// キー入力を処理
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            movePlayer(0, -1);
            break;
        case "ArrowDown":
            movePlayer(0, 1);
            break;
        case "ArrowLeft":
            movePlayer(-1, 0);
            break;
        case "ArrowRight":
            movePlayer(1, 0);
            break;
    }
    draw();
});

// 初期描画
draw();
