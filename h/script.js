// script.js
const cardsContainer = document.querySelector('.cards-container');
const results = ["特大吉","大吉", "中吉", "小吉", "吉", "凶", "大凶"]; // 結果の種類

// 10枚のカードを生成
for (let i = 0; i < 50; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = "クリックして結果を表示"; // 初期表示のテキスト
    card.addEventListener('click', () => revealResult(card)); // クリックイベント追加
    cardsContainer.appendChild(card);
}

// 結果をランダムで表示する関数
function revealResult(card) {
    const randomResult = results[Math.floor(Math.random() * results.length)];
    card.textContent = randomResult; // カードに結果を表示
    card.style.background = randomResult === "大吉" ? "#ffd700" : "#e74c3c"; // 大吉なら金色、それ以外は赤
    card.style.color = "#fff";
    card.style.fontSize = "20px";
}
