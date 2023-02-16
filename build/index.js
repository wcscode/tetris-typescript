import { UPDATE_FRAME_IN_MILLISECONDS, } from "./const.js";
import { buildBoardArray, clearTetrominoFromBoard, getRandomTetromino, setInput, setAction, putTetrominoInsideBoard, createDeepCopyFromTetromino, willCollide, buildDivBoard, render, tryKick, isTickFall, freezeTetromino } from "./util.js";
const { pressedKeys, inputs, keydown, keyup } = setInput();
let board = buildBoardArray();
buildDivBoard(board, "board");
let tetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);
const tick = { count: 0, rate: 10 };
function update() {
    let preservedTetromino = createDeepCopyFromTetromino(tetromino);
    const tickFall = isTickFall(tick);
    if (tickFall)
        keydown("ArrowDown");
    inputs.forEach((action, key) => {
        if (pressedKeys.has(key)) {
            const tempTetromino = createDeepCopyFromTetromino(tetromino);
            if (willCollide(board, tempTetromino, action)) {
                switch (action) {
                    case "clockwise":
                    case "counterClockwise":
                        tetromino = tryKick(board, tempTetromino, tetromino, action);
                        break;
                    case "down":
                        if (tickFall) {
                            tetromino = freezeTetromino(tetromino);
                            board = putTetrominoInsideBoard(board, tetromino);
                            preservedTetromino = tetromino = getRandomTetromino();
                        }
                }
            }
            else {
                tetromino = setAction(tetromino, action);
            }
        }
    });
    keyup("a", "s");
    if (tickFall)
        keyup("ArrowDown");
    board = clearTetrominoFromBoard(board, preservedTetromino);
    board = putTetrominoInsideBoard(board, tetromino);
    render(board, tetromino);
}
update();
//update();
//update();
setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);
