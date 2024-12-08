// script.js
const questions = [
    "あ", "い", "う", "え", "お",
    "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ",
    "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の",
    "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も",
    "や", "ゆ", "よ",
    "ら", "り", "る", "れ", "ろ",
    "わ", "を", "ん",
    "あいうえお", "かきくけこ", "さしすせそ", "たちつてと",
    "なにぬねの", "はひふへほ", "まみむめも",
    "やゆよ", "らりるれろ", "わをん"
]; // 問題リスト（ひらがなと短いフレーズ）

let currentQuestionIndex;
const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const resultElement = document.getElementById("result");

// ランダムに問題を表示する関数
function showQuestion() {
    currentQuestionIndex = Math.floor(Math.random() * questions.length); // ランダムなインデックスを生成
    questionElement.textContent = `問題: ${questions[currentQuestionIndex]}`;
    answerInput.value = ""; // 入力欄をリセット
    answerInput.focus(); // 入力欄にフォーカス
    resultElement.textContent = ""; // 結果をクリア
}

// 正解判定の関数
function checkAnswer() {
    const userAnswer = answerInput.value;
    const correctAnswer = questions[currentQuestionIndex];

    if (userAnswer === correctAnswer) {
        resultElement.textContent = "正解！";
        resultElement.style.color = "lime";
        setTimeout(showQuestion, 1000); // 1秒後に次の問題を表示
    } else {
        resultElement.textContent = "間違いです。もう一度入力してください。";
        resultElement.style.color = "red";
    }
}

// 入力フィールドでエンターキーが押されたときにチェック
answerInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// 最初の問題を表示
showQuestion();
