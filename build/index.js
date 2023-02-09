import { UPDATE_FRAME_IN_MILLISECONDS, } from "./const.js";
import { buildBoardArray, clearTetrominosFromBoard, getRandomTetromino, mapOfKeyAndMovements, setInput, setAction, putTetrominoInsideBoard, createDeepCopyFromTetromino, willCollide, buildDivBoard, render, tryKick } from "./util.js";
const pressedKeys = setInput();
const inputsMaps = mapOfKeyAndMovements();
let board = buildBoardArray();
buildDivBoard(board, "board");
let tetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);
function update() {
    const preservedTetromino = createDeepCopyFromTetromino(tetromino);
    inputsMaps.forEach((action, key) => {
        if (pressedKeys.has(key)) {
            if (!willCollide(board, tetromino, action))
                tetromino = setAction(tetromino, action);
            else
                tetromino = tryKick(board, tetromino, action);
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
