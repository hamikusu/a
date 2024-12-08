function jump() {
    const character = document.querySelector('.character');
    const speech = document.getElementById('speech');
    
    // ジャンプアニメーション
    character.style.transform = 'translateY(-50px)';
    setTimeout(() => {
        character.style.transform = 'translateY(0)';
    }, 300);

    // セリフを表示
    speech.textContent = "ジャンプしたよ！";
    
    // 1秒後にセリフを消す
    setTimeout(() => {
        speech.textContent = "";
    }, 1000);
}
