import * as CONST from "./conts.js";
export function buildInitialHtmlBoard(boardId, board) {
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
            cellSpan.setAttribute(CONST.DATA_ATTRIBUTE_NAME_X, cell.getX().toString());
            cellSpan.setAttribute(CONST.DATA_ATTRIBUTE_NAME_Y, cell.getY().toString());
            rowDiv.appendChild(cellSpan);
        }
        htmlBoard.appendChild(rowDiv);
    }
    return htmlBoard;
}
export function getCellsFromBoard(board, status) { return board.getCells().filter(cell => cell.getStatus() == status); }
;
export function updateTetrominoCells(board, cells, status) {
    cells.forEach((cell) => {
        board.getCell(cell.getX(), cell.getY()).setStatus(status);
    });
}
export function fillBoard(board, tetromino, status) {
    tetromino.getCells().forEach((cell) => {
        board.getCell(cell.getX(), cell.getY()).setStatus(status);
    });
}
export var CellMovimentDirection;
(function (CellMovimentDirection) {
    CellMovimentDirection[CellMovimentDirection["Left"] = 0] = "Left";
    CellMovimentDirection[CellMovimentDirection["Right"] = 1] = "Right";
    CellMovimentDirection[CellMovimentDirection["Down"] = 2] = "Down";
})(CellMovimentDirection || (CellMovimentDirection = {}));
export function move(board, cells, direction) {
    let newCells = [];
    cells.forEach((cell) => {
        switch (direction) {
            case CellMovimentDirection.Left:
                newCells.push(board.getCell(cell.getX() - 1, cell.getY()));
                break;
            case CellMovimentDirection.Right:
                newCells.push(board.getCell(cell.getX() + 1, cell.getY()));
                break;
            default:
                newCells.push(board.getCell(cell.getX(), cell.getY() + 1));
        }
    });
    return newCells;
}
function rotate() {
}
export function willCollide(board, cells, direction) {
    cells.forEach((cell) => {
        switch (direction) {
            case CellMovimentDirection.Left: {
                const status = board.getCell(cell.getX() - 1, cell.getY()).getStatus();
                //if(status == CellStatus.Wall){     
                //    console.log( 'ENTROE ' +board.getCell(cell.getX() - 1, cell.getY()).getStatus())             
                return false;
                //  }
                break;
            }
            case CellMovimentDirection.Right: {
                const status = board.getCell(cell.getX() + 1, cell.getY()).getStatus();
                //  if(status == CellStatus.Wall){     
                //     console.log( 'ENTROE_R ' +board.getCell(cell.getX() + 1, cell.getY()).getStatus())             
                return true;
                //  }
                break;
            }
            //  default:{
            //      return board.getCell(cell.getX(), cell.getY() + 1).getStatus() != CellStatus.Empty ? true : false;
            //   }
        }
    });
    return false;
}
function isGameOver() {
}
function destroyRow() {
}
let amountTimestampMoviment = 0;
export function isTickMoviment(deltatime, milliseconds) {
    amountTimestampMoviment += deltatime;
    if (amountTimestampMoviment > milliseconds) {
        amountTimestampMoviment = 0;
        return true;
    }
    return false;
}
let amountTimestampFall = 0;
export function isTickFall(deltatime, milliseconds) {
    amountTimestampFall += deltatime;
    if (amountTimestampFall > milliseconds) {
        amountTimestampFall = 0;
        return true;
    }
    return false;
}
function freezeTetromino() {
}
export function nextTetromino(tetrominos) {
    return tetrominos[Math.floor(Math.random() * tetrominos.length)];
}
const pressedKeys = new Set();
export function setControls() {
    window.addEventListener('keydown', function (event) {
        pressedKeys.add(event.key);
    });
    window.addEventListener('keyup', function (event) {
        pressedKeys.delete(event.key);
    });
}
export function isPressed(key) {
    return pressedKeys.has(key);
}
export function hasKeyPressed() {
    return pressedKeys.size > 0;
}
