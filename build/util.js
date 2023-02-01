import { BOARD_WIDTH, BOARD_HEIGHT, CELL_TETROMINO, CELL_EMPTY, CELL_WALL, I_TETROMINO, TETROMINO_LENGTH } from "./const.js";
const xyToIndex = (x, y, maxX) => y * maxX + x;
function indexToXy(index, maxX) {
    let y = Math.floor(index / maxX);
    let x = index - maxX * y;
    return [x, y];
}
export function clearTetrominosFromBoard(boards) {
    const tetrominosIndices = getTetrominosIndices(boards);
    tetrominosIndices.forEach((indice) => boards[indice] = CELL_EMPTY);
    return boards;
}
export function putTetrominosInsideBoard(boards, tetrominosIndices) {
    for (let i = 0; i < tetrominosIndices.length; i++) {
        boards[tetrominosIndices[i]] = CELL_TETROMINO;
    }
    return boards;
}
export function getTetrominosIndices(boards) {
    let index = boards.indexOf(CELL_TETROMINO);
    const indices = [];
    while (index !== -1) {
        indices.push(index);
        index = boards.indexOf(CELL_TETROMINO, index + 1);
    }
    return indices;
}
export function move(tetrominosIndices, direction) {
    switch (direction) {
        case "down":
            return tetrominosIndices.map(index => index + BOARD_WIDTH);
        case "right":
            return tetrominosIndices.map(index => index + 1);
        case "left":
            return tetrominosIndices.map(index => index - 1);
    }
}
export function fillBoardWithTetrominoInInitialPosition(boards, tetrominos) {
    for (let y = 0; y < TETROMINO_LENGTH; ++y) {
        for (let x = 0; x < TETROMINO_LENGTH; ++x) {
            const indexTetromino = xyToIndex(x, y, TETROMINO_LENGTH);
            const indexBoard = (indexTetromino + TETROMINO_LENGTH) + (y * TETROMINO_LENGTH) * 2;
            boards[indexBoard] = tetrominos[indexTetromino] == 1 ? CELL_TETROMINO : CELL_EMPTY;
        }
    }
}
export function getRandomTetromino() {
    const tetrominos = [];
    tetrominos.push(I_TETROMINO);
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
            xBoards.push(boards[xyToIndex(x, y, BOARD_WIDTH)]);
        }
        newBoards[y] = xBoards;
    }
    return newBoards;
}
