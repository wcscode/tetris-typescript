import { buildBoardArray, clearTetrominosFromBoard, fillBoardWithTetrominoInInitialPosition, formatToRenderConsole, getRandomTetromino, getTetromino, mapOfKeyAndMovements, move, putTetrominosInsideBoard, setInput } from "./util.js";
const pressedKeys = setInput();
const inputsMaps = mapOfKeyAndMovements();
let boards = buildBoardArray();
let tetromino = getRandomTetromino();
boards = fillBoardWithTetrominoInInitialPosition(boards, tetromino);
function update() {
    //console.clear();      
    tetromino = getTetromino(boards, tetromino.name);
    inputsMaps.forEach((direction, key) => {
        if (pressedKeys.has(key))
            tetromino.indices = move(tetromino, direction);
    });
    //tetrominosIndices = move(tetrominosIndices, "down");  
    boards = clearTetrominosFromBoard(boards);
    boards = putTetrominosInsideBoard(boards, tetromino);
    console.table(formatToRenderConsole(boards));
}
update();
//update();
//update();
//setInterval(update, UPDATE_FRAME_IN_MILLISECONDS);
