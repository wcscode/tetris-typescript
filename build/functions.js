export const setCellBusy = (board, x, y, busy) => {
    board.children[y].children[x].setAttribute("data-busy", busy.toString());
};
export const getCell = (board, x, y) => board.children[y].children[x];
export const countdownScene = (board, ct) => {
    board.children[0];
};
let accDeltaTime = 0;
let acc = 0;
export const counter = (dt, max = 10, slow = .6) => {
    accDeltaTime += dt;
    if (Math.trunc(accDeltaTime) > 1 * slow) {
        accDeltaTime = 0;
        ++acc;
    }
    if (acc > max)
        acc = 0;
    return acc;
};
let tick = 0;
let lastFrame = 0;
export const getDeltaTime = (timestamp) => {
    const dt = (timestamp - lastFrame) / 1000;
    lastFrame = timestamp;
    return dt;
};
