let damageLevel = 0;
const earth = document.getElementById("earth");
const button = document.getElementById("destroy-button");

button.addEventListener("click", () => {
    damageLevel++;
    if (damageLevel === 1) {
        earth.src = "earth_damaged1.png"; // 地球が少し壊れた画像
    } else if (damageLevel === 2) {
        earth.src = "earth_damaged2.png"; // 地球がさらに壊れた画像
    } else if (damageLevel === 3) {
        earth.src = "earth_destroyed.png"; // 完全に壊れた画像
        button.textContent = "地球は破壊された！";
        button.disabled = true; // ボタンを無効化
    }
});
