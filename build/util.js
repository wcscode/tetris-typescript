import { BOARD_WIDTH, BOARD_HEIGHT, CELL_TETROMINO, CELL_EMPTY, CELL_WALL, I_TETROMINO, TETROMINO_LENGTH } from "./const.js";
export function fillBoardWithTetrominoInInitialPosition(boards, tetrominos) {
    //Try to center the tetromino
    const yFirstIndex = 0;
    const yLastIndex = yFirstIndex + TETROMINO_LENGTH;
    const xFirstIndex = BOARD_WIDTH / 2 - 2;
    const xLastIndex = xFirstIndex + TETROMINO_LENGTH;
    for (let y = yFirstIndex; y < yLastIndex; ++y) {
        for (let x = xFirstIndex; x < xLastIndex; ++x) {
            boards[y * TETROMINO_LENGTH + x] = CELL_TETROMINO;
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
            xBoards.push(boards[y * BOARD_WIDTH + x]);
        }
        newBoards[y] = xBoards;
    }
    return newBoards;
}
