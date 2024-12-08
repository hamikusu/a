// script.js
const emojis = ["😄", "😂", "🥳", "🤩", "🤔", "😱", "💥", "🎉", "🔥", "🎈"];
const emojiElement = document.getElementById("emoji");
const hammerElement = document.getElementById("hammer");
const messageElement = document.getElementById("message");

function getRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}

// ゲーム開始時にランダムな絵文字を表示
function startGame() {
    emojiElement.textContent = getRandomEmoji();
    emojiElement.style.transform = "scale(1)"; // 初期サイズを戻す
    hammerElement.style.display = "none"; // ハンマーを非表示
    messageElement.textContent = ""; // メッセージをリセット
}

// 絵文字をクリックしたときの処理
emojiElement.addEventListener("click", () => {
    hammerElement.style.display = "block"; // ハンマーを表示
    emojiElement.style.transform = "scale(0)"; // 絵文字を小さくする
    messageElement.textContent = "💥 絵文字が爆発した！";
    
    setTimeout(() => {
        hammerElement.style.display = "none"; // 1秒後にハンマーを非表示
        startGame(); // 次の絵文字を表示
    }, 1000); // 1秒後に次の絵文字を表示
});

// ゲームを開始
startGame();
