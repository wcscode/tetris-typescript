import Board from "./Board.js";
import { Cell, CellStatus } from "./Cell.js";
import * as CONST from "./conts.js";
import Tetromino from "./Tetromino.js";


export function buildInitialHtmlBoard(boardId:string, board: Board): HTMLElement{

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
            cellSpan.setAttribute(CONST.DATA_ATTRIBUTE_NAME_X, cell.getX().toString());
            cellSpan.setAttribute(CONST.DATA_ATTRIBUTE_NAME_Y, cell.getY().toString());     

            rowDiv.appendChild(cellSpan);
        }

        htmlBoard.appendChild(rowDiv);
    }
   
    return htmlBoard;
}

export function getCellsFromBoard(board:Board, status: CellStatus): Cell[] { return board.getCells().filter(cell => cell.getStatus() == status) };

export function updateTetrominoCells(board:Board, cells: Cell[], status:CellStatus): void{

    cells.forEach((cell:Cell) => {                
        board.getCell(cell.getX(), cell.getY()).setStatus(status);
    })
}

export function fillBoard(board:Board, tetromino: Tetromino, status:CellStatus): void{

    tetromino.getCells().forEach((cell:Cell) => {                
        board.getCell(cell.getX(), cell.getY()).setStatus(status);
    })
}

export enum CellMovimentDirection{
    Left,
    Right,
    Down
}

export function move(board: Board, cells:Cell[],  direction: CellMovimentDirection): Cell[] {

   let newCells: Cell[] = [];

   cells.forEach((cell: Cell) => {

    switch(direction){
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

function rotate(){

}

export function willCollide(board: Board, cells:Cell[],  direction: CellMovimentDirection): boolean{


    cells.forEach((cell: Cell) => {
 
        switch(direction){
            case CellMovimentDirection.Left: {
                        
                const status = board.getCell(cell.getX() - 1, cell.getY()).getStatus();
              
                //if(status == CellStatus.Wall){     
                //    console.log( 'ENTROE ' +board.getCell(cell.getX() - 1, cell.getY()).getStatus())             
                    return false;
              //  }
                break;
            }
            case CellMovimentDirection.Right: {
                const status = board.getCell(cell.getX() + 1 , cell.getY()).getStatus();
                
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

function isGameOver(){

}
function destroyRow(){

}

let amountTimestampMoviment: number = 0;

export function isTickMoviment(deltatime: number, milliseconds:number){
   
    amountTimestampMoviment += deltatime;

    if(amountTimestampMoviment > milliseconds){
               
        amountTimestampMoviment = 0;
        return true;
    }

    return false;
}

let amountTimestampFall: number = 0;

export function isTickFall(deltatime: number, milliseconds:number){
   
    amountTimestampFall += deltatime;

    if(amountTimestampFall > milliseconds){
               
        amountTimestampFall = 0;
        return true;
    }

    return false;
}

function freezeTetromino(){

}
export function nextTetromino(tetrominos:Tetromino[]): Tetromino{
    return tetrominos[Math.floor(Math.random() * tetrominos.length)];
}

const pressedKeys = new Set<string>();

export function setControls(): void{
    window.addEventListener('keydown', function(event){  
        pressedKeys.add(event.key);    
    });

    window.addEventListener('keyup', function(event){
        pressedKeys.delete(event.key);
    });
}

export function isPressed(key:string): boolean{    
    return pressedKeys.has(key);
}

export function hasKeyPressed(): boolean{
    return pressedKeys.size > 0;
}