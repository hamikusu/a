const designCanvas = document.getElementById('designCanvas');
const stampCanvas = document.getElementById('stampCanvas');
const clearButton = document.getElementById('clearCanvas');
const saveButton = document.getElementById('saveHanko');
const backButton = document.getElementById('backToDesign');
const designSection = document.getElementById('design-section');
const stampSection = document.getElementById('stamp-section');

const designCtx = designCanvas.getContext('2d');
const stampCtx = stampCanvas.getContext('2d');

let isDrawing = false;
let savedHanko = null;

// ハンコ作成（絵を描く機能）
designCanvas.addEventListener('mousedown', () => (isDrawing = true));
designCanvas.addEventListener('mouseup', () => (isDrawing = false));
designCanvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  const rect = designCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  designCtx.fillStyle = 'black'; // ペンの色
  designCtx.beginPath();
  designCtx.arc(x, y, 5, 0, Math.PI * 2); // ペンサイズ
  designCtx.fill();
});

// キャンバスをクリア
clearButton.addEventListener('click', () => {
  designCtx.clearRect(0, 0, designCanvas.width, designCanvas.height);
});

// ハンコを保存
saveButton.addEventListener('click', () => {
  savedHanko = designCanvas.toDataURL(); // ハンコの画像データを保存
  alert('ハンコを保存しました！');
  designSection.style.display = 'none';
  stampSection.style.display = 'block';
});

// ハンコを押す
stampCanvas.addEventListener('click', (e) => {
  if (!savedHanko) {
    alert('ハンコを保存してください！');
    return;
  }
  const rect = stampCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const img = new Image();
  img.src = savedHanko;
  img.onload = () => {
    stampCtx.globalAlpha = 0.8; // 半透明で押す
    stampCtx.drawImage(img, x - 50, y - 50, 100, 100); // ハンコサイズ
  };
});

// デザイン画面に戻る
backButton.addEventListener('click', () => {
  stampSection.style.display = 'none';
  designSection.style.display = 'block';
});
