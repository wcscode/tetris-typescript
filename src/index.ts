import Board from './Board.js';
import ITetromino from './ITetromino.js';
import Tetromino from './Tetromino.js';
import { buildInitialHtmlBoard, updateTetrominoCells, nextTetromino, getCellsFromBoard, fillBoard, move, CellMovimentDirection, setControls, isPressed, hasKeyPressed, isTickFall, isTickMoviment, willCollide } from './util.js';
import * as CONST from "./conts.js";
import { Cell, CellStatus } from './Cell.js';

setControls();

const board: Board = new Board({width:12, height:26});
const htmlBoard = buildInitialHtmlBoard('board', board);

const tetrominos: Tetromino[] = [
    new ITetromino()
]
let tetromino = nextTetromino(tetrominos)

fillBoard(board, tetromino, CellStatus.Tetromino);


function update(deltatime: number){
    
   if(isTickMoviment(deltatime, 50)){
    
    const tetrominosCells = getCellsFromBoard(board, CellStatus.Tetromino);
    let newTetrominoCells:Cell[] = tetrominosCells;

 

    //if(isTickFall(deltatime, 250))
     //   newTetrominoCells =  move(board, tetrominosCells, CellMovimentDirection.Down)    

    if(isPressed(CONST.ARROW_RIGHT)){

        newTetrominoCells = move(board, newTetrominoCells, CellMovimentDirection.Right);
    }

    if(isPressed(CONST.ARROW_LEFT) && !willCollide(board, newTetrominoCells, CellMovimentDirection.Left)){
       
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


function render(){

    
    const cells: Cell[] = board.getCells().filter(f => f.getStatus() != CellStatus.Wall);

    cells.forEach(cell => {
 
    const cellSpan = document.querySelector(`[${CONST.DATA_ATTRIBUTE_NAME_ID}="${cell.getId()}"]`);

    cellSpan.innerHTML = cell.getStatus().toString();
    cellSpan.setAttribute(CONST.DATA_ATTRIBUTE_NAME_STATUS, cell.getStatus().toString());
   
   });
}

let lastTimestamp: number = 0;

function loop(timestamp: number) {

    const deltatime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
   
    
    update(deltatime);
    render();
   
   // setInterval(function(){}, 500)
   // clearInterval()
   window.requestAnimationFrame(loop);
}

loop(0);




