function drawFortune() {
    const fortunes = ["大吉", "中吉", "小吉", "吉", "末吉", "凶"];
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const result = fortunes[randomIndex];

    // 結果を表示
    document.getElementById("result").textContent = `あなたの運勢は…「${result}」です！`;
}
