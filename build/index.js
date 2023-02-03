import { buildBoardArray, clearTetrominosFromBoard, fillBoardWithTetrominoInInitialPosition, formatToRenderConsole, getRandomTetromino, getTetromino, mapOfKeyAndMovements, putTetrominosInsideBoard, setInput, setAction } from "./util.js";
const pressedKeys = setInput();
const inputsMaps = mapOfKeyAndMovements();
let boards = buildBoardArray();
let tetromino = getRandomTetromino();
boards = fillBoardWithTetrominoInInitialPosition(boards, tetromino);
function update() {
    //console.clear();
    tetromino = getTetromino(boards, tetromino);
    inputsMaps.forEach((action, key) => {
        if (pressedKeys.has(key))
            tetromino = setAction(tetromino, action);
    });
    tetromino = setAction(tetromino, "rotateLeft");
    tetromino = setAction(tetromino, "right");
    boards = clearTetrominosFromBoard(boards, tetromino);
    boards = putTetrominosInsideBoard(boards, tetromino);
    console.table(formatToRenderConsole(boards));
}
update();
//update();
//update();
//setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);
