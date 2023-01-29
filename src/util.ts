import Board from "./Board";
import { CellStatus } from "./Cell";

function buildInitialHtmlBoard(boardId:string, board: Board): HTMLElement{

    const htmlBoard: HTMLElement | null = document.getElementById(boardId);

    if(htmlBoard == null) throw Error('Board container not found!');

    for(let y = 0; y < board.getHeight(); ++y){

        const rowDiv: HTMLElement = document.createElement('div');

        for(let x = 0; x < board.getWidth(); ++x){
       
            const cellSpan: HTMLElement = document.createElement('span');

            const cellStatus = CellStatus.Empty;

            cellSpan.setAttribute('data-status', cellStatus.toString());
            cellSpan.innerHTML = cellStatus.toString();
            cellSpan.setAttribute('data-x', x.toString());
            cellSpan.setAttribute('data-y', y.toString());     

            rowDiv.appendChild(cellSpan);
        }

        htmlBoard.appendChild(rowDiv);
    }
   
    return htmlBoard;
}

function fillBoard(){

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
function nextTetromino(){

}
export {
    buildInitialHtmlBoard
}