import { UPDATE_FRAME_IN_MILLISECONDS, } from "./const.js";
import { buildBoardArray, clearTetrominosFromBoard, getRandomTetromino, mapOfKeyAndMovements, setInput, setAction, putTetrominoInsideBoard, createDeepCopyFromTetromino, willCollide, buildDivBoard, render, tryKick, forceUserClickButton } from "./util.js";
const { pressedKeys, removedKeys } = setInput();
const inputsMaps = mapOfKeyAndMovements();
let board = buildBoardArray();
buildDivBoard(board, "board");
let tetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);
function update() {
    const preservedTetromino = createDeepCopyFromTetromino(tetromino);
    inputsMaps.forEach((action, key) => {
        if (pressedKeys.has(key)) {
            const tempTetromino = createDeepCopyFromTetromino(tetromino);
            tetromino = !willCollide(board, tempTetromino, action) ?
                setAction(tetromino, action) :
                tryKick(board, tetromino, action);
            forceUserClickButton(pressedKeys, removedKeys, "a");
            forceUserClickButton(pressedKeys, removedKeys, "s");
        }
    });
    board = clearTetrominosFromBoard(board, preservedTetromino);
    board = putTetrominoInsideBoard(board, tetromino);
    render(board, preservedTetromino, tetromino);
}
update();
//update();
//update();
setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);
