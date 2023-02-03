import { BOARD_WIDTH, BOARD_HEIGHT, CELL_TETROMINO, CELL_EMPTY, CELL_WALL, I_TETROMINO,
//TETROMINO_LENGTH,
//  L_TETROMINO
 } from "./const.js";
;
function translate(tetromino, addCoord) {
    const newIndex = xyToIndex(addCoord, BOARD_WIDTH);
    tetromino.indices = tetromino.indices.map(index => index + newIndex);
    tetromino.coord = addVec2(tetromino.coord, addCoord);
    ;
    return tetromino;
}
function rotate(tetromino, direction) {
    tetromino.indices = tetromino.indices.map(index => index);
    return tetromino;
}
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
export function clearTetrominosFromBoard(boards, tetromino) {
    const { indices } = getTetromino(boards, tetromino);
    indices.forEach((indice) => boards[indice] = CELL_EMPTY);
    return boards;
}
export function putTetrominosInsideBoard(boards, tetromino) {
    for (let i = 0; i < tetromino.indices.length; i++) {
        boards[tetromino.indices[i]] = CELL_TETROMINO;
    }
    return boards;
}
export function getTetromino(boards, tetromino) {
    let index = boards.indexOf(CELL_TETROMINO);
    const indices = [];
    while (index !== -1) {
        indices.push(index);
        index = boards.indexOf(CELL_TETROMINO, index + 1);
    }
    return { name: tetromino.name, coord: tetromino.coord, indices: indices };
}
export function setAction(tetromino, action) {
    switch (action) {
        case "right":
            return translate(tetromino, { x: 1, y: 0 });
        case "left":
            return translate(tetromino, { x: 1, y: 0 });
        case "down":
            return translate(tetromino, { x: 0, y: 1 });
        default:
            return rotate(tetromino, action);
    }
}
export function fillBoardWithTetrominoInInitialPosition(boards, tetromino) {
    const sideLength = Math.sqrt(tetromino.indices.length);
    tetromino.indices.forEach((cell, index) => {
        const defaultCoord = indexToXy(index, sideLength);
        const offsetCoord = addVec2(defaultCoord, tetromino.coord);
        const boardIndex = xyToIndex(offsetCoord, BOARD_WIDTH);
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
            if (x == 0 || x == BOARD_WIDTH - 1 || y == BOARD_HEIGHT - 1)
                status = CELL_WALL;
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
            xBoards.push(boards[xyToIndex({ x, y }, BOARD_WIDTH)]);
        }
        newBoards[y] = xBoards;
    }
    return newBoards;
}
function xyToIndex(coord, maxX) {
    return coord.y * maxX + coord.x;
}
function addVec2(coord1, coord2) {
    return { x: coord1.x + coord2.x, y: coord1.y + coord2.y };
}
function indexToXy(index, maxX) {
    let y = Math.floor(index / maxX);
    let x = index - maxX * y;
    return { x, y };
}
