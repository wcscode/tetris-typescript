import Board from './Board.js';
import ITetromino from './ITetromino.js';
import Tetromino from './Tetromino.js';
import { buildInitialHtmlBoard, fillBoard, nextTetromino } from './util.js';
import * as CONST from "./conts.js";
import { Cell, CellStatus } from './Cell.js';

const board: Board = new Board({width:12, height:26});
const htmlBoard = buildInitialHtmlBoard('board', board);

const tetrominos: Tetromino[] = [
    new ITetromino()
]
let tetromino = nextTetromino(tetrominos)

fillBoard(board, tetromino);

function update(timestamp: number){

}

console.log(htmlBoard);
function render(){

    const cells: Cell[] = board.getCells().filter(f => f.getStatus() != CellStatus.Wall);

    cells.forEach(cell => {
 
    const cellSpan = document.querySelector(`[${CONST.DATA_ATTRIBUTE_NAME_ID}="${cell.getId()}"]`);

    cellSpan.innerHTML = cell.getStatus().toString();
    cellSpan.setAttribute(CONST.DATA_ATTRIBUTE_NAME_STATUS, cell.getStatus().toString());

   });
}

function loop(timestamp: number) {
    update(timestamp);
    render();
   // setInterval(function(){}, 500)
   // clearInterval()
}

loop(0);
requestAnimationFrame(loop);

