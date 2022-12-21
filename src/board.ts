import { Cell, cellStatus } from "./Cell.js";
import ILoop from "./Engine/ILoop.js";
import { Piece } from "./Piece.js";
import Row from "./Row.js";
import * as CONST from "./const.js";

export default class Board implements ILoop
{
    private readonly _board: HTMLElement; 
  //  private readonly _boardId: string;  
    private readonly _numColumn: number;
    private readonly _numRow: number;
    private _activesPieces: number[] = [];
    private _pieces: Piece[] = []; 
    private static _busy = [
         0,  1,  2,  7,  8,  9,
        10, 11, 12, 17, 18, 19,
        20, 21, 22, 27, 28, 29,
        30, 31, 32, 37, 38, 39,
    ];
    private _tick: number = 0;


    constructor({boardId, numColumn = 10, numRow = 17} : {boardId: string, numColumn: number, numRow: number}) 
    {
      //  this._boardId = boardId;

        const board: HTMLElement | null = document.getElementById(boardId);
        
        if(board == null)
            throw new Error('Object board not found');

        this._board = board;
        this._numColumn = numColumn;
        this._numRow = numRow; 
    }

    private _getRandom(): number
    {
        return Math.floor(Math.random() * this._pieces.length);
    }
    private _isTick(deltaTime?: number): boolean
    {
        if(deltaTime != undefined)
            this._tick += deltaTime;

        if(this._tick > 2)
        {          
            this._tick = 0;

            return true;
        }

        return false;
    }

    setActivePiece() : void 
    {
        let activePiece: Piece | undefined = this._pieces.find((piece: Piece) => piece.isNext);

        if(activePiece == null)
        {
            activePiece = this._pieces[this._getRandom()];
        }

        this._pieces.forEach( (piece: Piece, index: number) => {           
            piece.isActive = activePiece === piece ? true : false;           
        });
       
        this._activesPieces = activePiece.getPieces();
    }

    add(pieces: Piece[])
    {
        this._pieces = pieces;
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
        
        this.setActivePiece();
    }

    update(deltaTime: number): void 
    {
        if(this._isTick(deltaTime))
        {
            let index = 0;

            [0, 1, 2, 3].forEach((y: number) => 
            { 
                const row: Element = this._board.children[y];

                [3, 4, 5, 6].forEach((x: number) => 
                {              
                    if(this._activesPieces[index] == 1)
                    {
                        const cell: Element = this._board.children[y].children[x];                
                        cell.setAttribute(CONST.DATA_STATUS, CONST.DATA_STATUS_BUSY);
                    }
                
                    index++;              
                });
            });  
        }
    }

    render(): void 
    {
    //  console.log('tick render')
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