import * as f from './functions.js';
let board;
const MAX_X = 10;
const MAX_Y = 17;
function update(dt) {
    const ct = f.counter(dt, 10, .6);
}
const render = () => {
    for (let y = 0; y < MAX_Y; ++y) {
        const row = board.children[y];
        for (let x = 0; x < MAX_X; ++x) {
            const cell = board.children[y].children[x];
            if (cell.getAttribute("data-busy") === "true")
                cell.classList.add("busy");
        }
    }
};
const loopGame = (timestamp) => {
    const dt = f.getDeltaTime(timestamp);
    update(dt);
    render();
    window.requestAnimationFrame(loopGame);
};
const loadGame = () => {
    board = document.getElementById('board') || new HTMLElement();
    for (let y = 0; y < MAX_Y; ++y) {
        const row = document.createElement('div');
        row.className = "row";
        for (let x = 0; x < MAX_X; ++x) {
            const index = parseInt(y.toString() + x.toString());
            let cell = document.createElement('div');
            cell.className = "cell";
            cell.setAttribute("data-busy", "false");
            cell.setAttribute("data-id", index.toString());
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    loopGame(0);
};
//
window.addEventListener('load', loadGame);
