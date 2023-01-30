import Board from "./Board.js";
import { Cell, CellStatus } from "./Cell.js";
import * as CONST from "./conts.js";
import Tetromino from "./Tetromino.js";


function buildInitialHtmlBoard(boardId:string, board: Board): HTMLElement{

    const htmlBoard: HTMLElement | null = document.getElementById(boardId);

    if(htmlBoard == null) throw Error('Board container not found!');
   
    for(let y = 0; y < board.getHeight(); ++y){

        const rowDiv: HTMLElement = document.createElement('div');

        for(let x = 0; x < board.getWidth(); ++x){
       
            const cellSpan: HTMLElement = document.createElement('span');

            const cell: Cell = board.getCell(x, y);

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

function fillBoard(board:Board, tetromino: Tetromino){

    tetromino.getCells().forEach((cell:Cell) => {                
        board.getCell(cell.getX(), cell.getY()).setStatus(CellStatus.InMovement);
    })
}

function gravity(){

}
function move(){

}
function rotate(){

}
function checkCollision(){

}
function isGameOver(){

}
function destroyRow(){

}
function isTick(){

}
function freezeTetromino(){

}
function nextTetromino(tetrominos:Tetromino[]): Tetromino{
    return tetrominos[Math.floor(Math.random() * tetrominos.length)];
}
export {
    buildInitialHtmlBoard,
    fillBoard,
    //
    nextTetromino
}