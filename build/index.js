import Board from './Board.js';
import ITetromino from './ITetromino.js';
import { buildInitialHtmlBoard, updateTetrominoCells, nextTetromino, getCellsFromBoard, fillBoard, move, CellMovimentDirection, setControls, isPressed, isTickMoviment, willCollide } from './util.js';
import * as CONST from "./conts.js";
import { CellStatus } from './Cell.js';
setControls();
const board = new Board({ width: 12, height: 26 });
const htmlBoard = buildInitialHtmlBoard('board', board);
const tetrominos = [
    new ITetromino()
];
let tetromino = nextTetromino(tetrominos);
fillBoard(board, tetromino, CellStatus.Tetromino);
function update(deltatime) {
    if (isTickMoviment(deltatime, 50)) {
        const tetrominosCells = getCellsFromBoard(board, CellStatus.Tetromino);
        let newTetrominoCells = tetrominosCells;
        //if(isTickFall(deltatime, 250))
        //   newTetrominoCells =  move(board, tetrominosCells, CellMovimentDirection.Down)    
        if (isPressed(CONST.ARROW_RIGHT)) {
            newTetrominoCells = move(board, newTetrominoCells, CellMovimentDirection.Right);
        }
        if (isPressed(CONST.ARROW_LEFT) && !willCollide(board, newTetrominoCells, CellMovimentDirection.Left)) {
            newTetrominoCells = move(board, newTetrominoCells, CellMovimentDirection.Left);
        }
        updateTetrominoCells(board, tetrominosCells, CellStatus.Empty);
        updateTetrominoCells(board, newTetrominoCells, CellStatus.Tetromino);
    }
}
/*document.addEventListener("keydown", (event) =>{

    if
    console.log(event.key)
});*/
function render() {
    const cells = board.getCells().filter(f => f.getStatus() != CellStatus.Wall);
    cells.forEach(cell => {
        const cellSpan = document.querySelector(`[${CONST.DATA_ATTRIBUTE_NAME_ID}="${cell.getId()}"]`);
        cellSpan.innerHTML = cell.getStatus().toString();
        cellSpan.setAttribute(CONST.DATA_ATTRIBUTE_NAME_STATUS, cell.getStatus().toString());
    });
}
let lastTimestamp = 0;
function loop(timestamp) {
    const deltatime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    update(deltatime);
    render();
    // setInterval(function(){}, 500)
    // clearInterval()
    window.requestAnimationFrame(loop);
}
loop(0);
