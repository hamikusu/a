let time = 60;
const timerElement = document.getElementById("time");
const finishButton = document.getElementById("finish-btn");

// タイマー開始
const timer = setInterval(() => {
    time -= 1;
    timerElement.textContent = time;

    if (time <= 0) {
        clearInterval(timer);
        alert("時間切れ！料理を完成させられませんでした。");
    }
}, 1000);

// 材料を調理エリアにドラッグ＆ドロップ
function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.querySelector(`[data-name="${data}"]`);
    const pan = document.getElementById("pan");
    pan.appendChild(draggedElement.cloneNode(true));
}

// 材料をドラッグ開始
document.querySelectorAll(".ingredient").forEach(item => {
    item.addEventListener("dragstart", event => {
        event.dataTransfer.setData("text", event.target.dataset.name);
    });
});

// 完成ボタン
finishButton.addEventListener("click", () => {
    alert("料理が完成しました！スコア: " + (60 - time) + "点");
    clearInterval(timer);
});
