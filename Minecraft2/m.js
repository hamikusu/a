// 初期設定
const grid = document.getElementById('crafting-grid');
const inventory = document.getElementById('inventory');
const resultElement = document.getElementById('result');

// 木の剣のクラフトレシピ (縦に木材2個 + 棒1個)
const swordRecipe = ['wood', null, null, 'wood', null, null, 'stick', null, null];

let craftingGrid = [null, null, null, null, null, null, null, null, null];

// ドラッグ対象のアイテム
let draggedItem = null;

// ドラッグ開始
inventory.addEventListener('dragstart', function(e) {
    if (e.target && e.target.matches('div[data-item]')) {
        draggedItem = e.target.getAttribute('data-item'); // ドラッグするアイテムを保存
        e.target.classList.add('dragging');
        setTimeout(() => {
            // ドラッグ中の要素を見えないようにする
            e.target.style.visibility = 'hidden';
        }, 0);
    }
});

// ドラッグ終了
inventory.addEventListener('dragend', function(e) {
    e.target.classList.remove('dragging');
    // ドラッグ終了時にアイテムを再表示
    e.target.style.visibility = 'visible';
});

// 作業台にドロップする前に通過を許可 (必須)
grid.addEventListener('dragover', function(e) {
    e.preventDefault(); // ドロップ可能にするため
});

// 作業台にドロップ
grid.addEventListener('drop', function(e) {
    e.preventDefault(); // デフォルトの動作を防止 (必須)
    
    if (e.target && e.target.matches('div[data-slot]')) {
        const slot = e.target.getAttribute('data-slot');
        if (craftingGrid[slot] === null && draggedItem !== null) {
            // グリッドにアイテムを配置
            craftingGrid[slot] = draggedItem;
            e.target.textContent = draggedItem === 'log' ? '🌳' : (draggedItem === 'wood' ? '🪵' : '🦯'); // アイコン表示
            
            // アイテムをドロップ後、draggedItemをリセット
            draggedItem = null;
            checkCrafting(); // クラフトチェック
        }
    }
});

// クラフトレシピを確認
function checkCrafting() {
    if (JSON.stringify(craftingGrid) === JSON.stringify(swordRecipe)) {
        resultElement.textContent = '作成アイテム: 木の剣 🗡️';
        craftingGrid.fill(null); // クラフト後、グリッドをリセット
        document.querySelectorAll('.grid div').forEach(div => div.textContent = '');
    } else {
        resultElement.textContent = '作成アイテム: なし';
    }
}

// グリッドをクリア
function clearGrid() {
    craftingGrid.fill(null);
    document.querySelectorAll('.grid div').forEach(div => div.textContent = '');
    resultElement.textContent = '作成アイテム: なし';
}
