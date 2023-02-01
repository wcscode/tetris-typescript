import { BOARD_WIDTH, BOARD_HEIGHT, CELL_TETROMINO, CELL_EMPTY, I_TETROMINO,
//TETROMINO_LENGTH,
//  L_TETROMINO
 } from "./const.js";
export function mapOfKeyAndMovements() {
    const mapOfMovements = new Map();
    mapOfMovements.set("ArrowLeft", "left");
    mapOfMovements.set("ArrowRight", "right");
    mapOfMovements.set("ArrowDown", "down");
    mapOfMovements.set("a", "rotateLeft");
    mapOfMovements.set("s", "rotateRight");
    return mapOfMovements;
}
export function setInput() {
    const pressedKeys = new Set();
    document.addEventListener("keydown", function (event) {
        pressedKeys.add(event.key);
    });
    document.addEventListener("keyup", function (event) {
        pressedKeys.delete(event.key);
    });
    return pressedKeys;
}
export function clearTetrominosFromBoard(boards) {
    const { indices } = getTetromino(boards);
    indices.forEach((indice) => boards[indice] = CELL_EMPTY);
    return boards;
}
export function putTetrominosInsideBoard(boards, tetromino) {
    for (let i = 0; i < tetromino.indices.length; i++) {
        boards[tetromino.indices[i]] = CELL_TETROMINO;
    }
    return boards;
}
export function getTetromino(boards, tetrominoName) {
    let index = boards.indexOf(CELL_TETROMINO);
    const indices = [];
    while (index !== -1) {
        indices.push(index);
        index = boards.indexOf(CELL_TETROMINO, index + 1);
    }
    return { name: tetrominoName, indices: indices };
}
export function move(tetromino, direction) {
    switch (direction) {
        case "right":
            return translate(tetromino.indices, 1);
        case "left":
            return translate(tetromino.indices, -1);
        case "down":
            return translate(tetromino.indices, 1 + BOARD_WIDTH);
        default:
            return rotate(tetromino.indices, direction);
    }
}
export function fillBoardWithTetrominoInInitialPosition(boards, tetromino) {
    const sideLength = Math.sqrt(tetromino.indices.length);
    tetromino.indices.forEach((cell, index) => {
        const coordTetromino = indexToXy(index, sideLength);
        const boardIndex = xyToIndex(coordTetromino[0], coordTetromino[1], BOARD_WIDTH);
        boards[boardIndex] = cell;
    });
    return boards;
}
export function getRandomTetromino() {
    const tetrominos = [];
    tetrominos.push(I_TETROMINO);
    //tetrominos.push(L_TETROMINO);
    return tetrominos[Math.floor(Math.random() * tetrominos.length)];
}
export function buildBoardArray() {
    const boards = [];
    for (let y = 0; y < BOARD_HEIGHT; ++y) {
        for (let x = 0; x < BOARD_WIDTH; ++x) {
            let status = CELL_EMPTY;
            //  if(x == 0 || x == BOARD_WIDTH - 1 || y == BOARD_HEIGHT - 1) status = CELL_WALL; 
            boards.push(status);
        }
    }
    return boards;
}
export function formatToRenderConsole(boards) {
    const newBoards = [];
    for (let y = 0; y < BOARD_HEIGHT; ++y) {
        const xBoards = [];
        for (let x = 0; x < BOARD_WIDTH; ++x) {
            xBoards.push(boards[xyToIndex(x, y, BOARD_WIDTH)]);
        }
        newBoards[y] = xBoards;
    }
    return newBoards;
}
const xyToIndex = (x, y, maxX) => y * maxX + x;
const translate = (indices, position) => indices.map(index => index + position);
const rotate = (indices, direction) => indices.map(index => index);
function indexToXy(index, maxX) {
    let y = Math.floor(index / maxX);
    let x = index - maxX * y;
    return [x, y];
}
