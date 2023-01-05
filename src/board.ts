import { Cell, cellStatus } from "./Cell.js";
import ILoop from "./Engine/ILoop.js";
import { Tetromino } from "./Tetromino.js";
import Row from "./Row.js";
import * as CONST from "./const.js";

export default class Board implements ILoop
{
    private readonly _board: HTMLElement; 
  //  private readonly _boardId: string;  
    private readonly _numColumn: number;
    private readonly _numRow: number;
    private _activesTetrominos: number[] = [];
    private _tetromino: Tetromino | undefined; 
    private static _busy = [
         0,  1,  2,  7,  8,  9,
        10, 11, 12, 17, 18, 19,
        20, 21, 22, 27, 28, 29,
        30, 31, 32, 37, 38, 39,
    ];
    private _tick: number = 0;   
    private _oldYPosition: number[] = [0, 1, 2, 3];

   
    constructor({boardId, numColumn = 10, numRow = 17} : {boardId: string, numColumn: number, numRow: number}) 
    {     
        const board: HTMLElement | null = document.getElementById(boardId);
        
        if(board == null)
            throw new Error('Object board not found');

        this._board = board;
        this._numColumn = numColumn;
        this._numRow = numRow; 
    }

   /* private _getRandom(): number
    {
        return Math.floor(Math.random() * this._tetrominos.length);
    }*/

    private _isTick(deltaTime?: number): boolean
    {
        if(deltaTime != undefined)
            this._tick += deltaTime;

        if(this._tick > .3)
        {          
            this._tick = 0;

            return true;
        }

        return false;
    }

   /* private _setActiveTetromino() : void 
    {
        let activeTetromino: Tetromino | undefined = this._tetrominos.find((Tetromino: Tetromino) => Tetromino.isNext);

        if(activeTetromino == null)
        {
            activeTetromino = this._tetrominos[this._getRandom()];
        }

        this._tetrominos.forEach( (Tetromino: Tetromino, index: number) => {           
            Tetromino.isActive = activeTetromino === Tetromino ? true : false;           
        });
       
        this._activesTetrominos = activeTetromino.getTetrominos();
    }*/

    private _setTetrominoStatus(yPosition: number[], cellStatus: cellStatus): void
    {
        let index = 0;
           
        yPosition.forEach((y: number) => 
        {            
            [3, 4, 5, 6].forEach((x: number) => 
            {              
                if(this._activesTetrominos[index] == 1)                    
                    Cell.setStatus(this._board, x, y, cellStatus);                    
            
                index++;              
            });
        }); 
    }

    private _willCollide(newYPosition: number[]): boolean
    {
        let index = 0;

        newYPosition.forEach((y: number) => 
        {    
         
            if(y >= this._numRow)    
            { 
                return true;         
            }           
                        
            [3, 4, 5, 6].forEach((x: number) => 
            {                     
                if(this._activesTetrominos[index] == 1)                    
                    if(Cell.getStatus(this._board, x, y) == 'busy')
                        return true;                    
            
                index++;              
            });
        }); 

        return false;
    }

    add(tetromino: Tetromino)
    {
        this._tetromino = tetromino;       
    }
    
    build(): void 
    {       
        let index = 0;

        for (let y: number = 0; y < this._numRow; ++y) 
        {
            const row = new Row();

            for (let x: number = 0; x < this._numColumn; ++x) 
            {                
                const cellStatus: cellStatus = Board._busy.some((value => value == index)) ? 'fixed' : 'empty';                
                const cell = new Cell(index, cellStatus);
                
                row.appendChild<Cell>(cell);

                index++;
            }
            
            this._board.appendChild<Row>(row);          
        }   
        
      //  this._setActiveTetromino();
    }
   
    update(deltaTime: number): void 
    {
        if(this._isTick(deltaTime))
        {
            this._setTetrominoStatus(this._oldYPosition, CONST.DATA_STATUS_EMPTY);

            let newYPosition = this._oldYPosition.map(m => m + 1);
            
            if(this._willCollide(newYPosition)){
                newYPosition = this._oldYPosition;
            }              

            this._setTetrominoStatus(newYPosition, CONST.DATA_STATUS_BUSY);

            this._oldYPosition = newYPosition;          
        }
    }

    render(): void 
    {  
        if(this._isTick())
        {   
            for(let y: number = 0; y < this._numRow; ++y)
            {
                const row: Element = this._board.children[y];

                for(let x = 0; x < this._numColumn; ++x)
                {
                    const cell: Element = this._board.children[y].children[x];                

                    if(cell.getAttribute(CONST.DATA_STATUS) === "true")
                        cell.classList.add("busy");
                }
            }
        }
    }
}