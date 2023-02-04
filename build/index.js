import { buildBoardArray, clearTetrominosFromBoard, formatToRenderConsole, getRandomTetromino, mapOfKeyAndMovements, setInput, setAction, putTetrominoInsideBoard } from "./util.js";
const pressedKeys = setInput();
const inputsMaps = mapOfKeyAndMovements();
let board = buildBoardArray();
let tetromino = getRandomTetromino();
board = putTetrominoInsideBoard(board, tetromino);
function update() {
    //console.clear(); 
    inputsMaps.forEach((action, key) => {
        if (pressedKeys.has(key))
            tetromino = setAction(tetromino, action);
    });
    const oldTetromino = tetromino;
    //tetromino = setAction(tetromino, "rotateLeft");
    tetromino = setAction(tetromino, "right");
    board = clearTetrominosFromBoard(board, oldTetromino);
    board = putTetrominoInsideBoard(board, tetromino);
    console.table(formatToRenderConsole(board));
}
update();
//update();
//update();
//setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);
