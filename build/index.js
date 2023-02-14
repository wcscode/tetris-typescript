import { UPDATE_FRAME_IN_MILLISECONDS, } from "./const.js";
import { buildBoardArray, clearTetrominosFromBoard, getRandomTetromino, setInput, setAction, putTetrominoInsideBoard, createDeepCopyFromTetromino, willCollide, buildDivBoard, render, tryKick, forceUserClickButton, isTickFall, freezeTetromino } from "./util.js";
const { pressedKeys, inputs } = setInput();
let board = buildBoardArray();
buildDivBoard(board, "board");
let tetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);
const tick = { count: 0, rate: 10 };
function update() {
    const preservedTetromino = createDeepCopyFromTetromino(tetromino);
    inputs.forEach((action, key) => {
        if (pressedKeys.has(key)) {
            const tempTetromino = createDeepCopyFromTetromino(tetromino);
            tetromino = !willCollide(board, tempTetromino, action) ?
                setAction(tetromino, action) :
                tryKick(board, tetromino, action);
        }
    });
    forceUserClickButton(pressedKeys, "a", "s");
    board = clearTetrominosFromBoard(board, preservedTetromino);
    board = putTetrominoInsideBoard(board, tetromino);
    if (isTickFall(tick)) {
        const tempTetromino = createDeepCopyFromTetromino(tetromino);
        if (willCollide(board, tempTetromino, "down")) {
            const freezedTetromino = freezeTetromino(tetromino);
            console.log(freezedTetromino);
            render(board, preservedTetromino, freezedTetromino);
            tetromino = getRandomTetromino();
        }
        else {
            tetromino = setAction(tetromino, "down");
        }
    }
    render(board, preservedTetromino, tetromino);
}
update();
//update();
//update();
setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);
