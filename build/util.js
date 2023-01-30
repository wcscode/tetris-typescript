import { CellStatus } from "./Cell.js";
import * as CONST from "./conts.js";
function buildInitialHtmlBoard(boardId, board) {
    const htmlBoard = document.getElementById(boardId);
    if (htmlBoard == null)
        throw Error('Board container not found!');
    for (let y = 0; y < board.getHeight(); ++y) {
        const rowDiv = document.createElement('div');
        for (let x = 0; x < board.getWidth(); ++x) {
            const cellSpan = document.createElement('span');
            const cell = board.getCell(x, y);
            cellSpan.innerHTML = cell.getStatus().toString();
            cellSpan.setAttribute(CONST.DATA_ATTRIBUTE_NAME_STATUS, cell.getStatus().toString());
            cellSpan.setAttribute(CONST.DATA_ATTRIBUTE_NAME_ID, cell.getId());
            //cellSpan.setAttribute(CONST.DATA_ATTRIBUTE_NAME_X, cell.getX().toString());
            //cellSpan.setAttribute(CONST.DATA_ATTRIBUTE_NAME_Y, cell.getY().toString());     
            rowDiv.appendChild(cellSpan);
        }
        htmlBoard.appendChild(rowDiv);
    }
    return htmlBoard;
}
function fillBoard(board, tetromino) {
    tetromino.getCells().forEach((cell) => {
        board.getCell(cell.getX(), cell.getY()).setStatus(CellStatus.InMovement);
    });
}
function gravity() {
}
function move() {
}
function rotate() {
}
function checkCollision() {
}
function isGameOver() {
}
function destroyRow() {
}
function isTick() {
}
function freezeTetromino() {
}
function nextTetromino(tetrominos) {
    return tetrominos[Math.floor(Math.random() * tetrominos.length)];
}
export { buildInitialHtmlBoard, fillBoard, 
//
nextTetromino };
