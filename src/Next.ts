import { Cell } from "./Cell.js";
import ILoop from "./Engine/ILoop.js";
import { Piece } from "./Piece.js";
import Row from "./Row.js";
import * as CONST from "./const.js";

export default class Next implements ILoop
{
    private readonly _next: HTMLElement; 
    private readonly _nextId: string;  
    private readonly _numColumn: number;
    private readonly _numRow: number; 
    private _pieces: Piece[] = []; 
    private _nextsPieces: Array<number> = [];

    constructor({nextId, numColumn = 10, numRow = 17} : {nextId: string, numColumn: number, numRow: number}) 
    {
        this._nextId = nextId;

        const next: HTMLElement | null = document.getElementById(nextId);
        
        if(next == null)
            throw new Error('Object next not found');

        this._next = next;
        this._numColumn = numColumn;
        this._numRow = numRow; 
    }

    private _getRandom(){
        return Math.floor(Math.random() * this._pieces.length);
    }
    build(): void 
    {
        let index = 0;

        for (let y: number = 0; y < this._numRow; ++y) 
        {
            const row = new Row();

            for (let x: number = 0; x < this._numColumn; ++x) 
            {              
                const cell = new Cell(index, "empty");
                
                row.appendChild<Cell>(cell);

                index++;
            }
            
            this._next.appendChild<Row>(row);          
        }  
        
        this._nextsPieces = this.getNextPiece();
    }

    getNextPiece() 
    {
        const rnd = this._getRandom();

        this._pieces.forEach( (piece: Piece, index:number) => {
            piece.isNext = index == rnd ? true: false;             
        });
        
        //[rnd].isNext = true;
        const nextsPieces = this._pieces[rnd].getPieces()
       
        return nextsPieces;
    }

    add(pieces: Piece[])
    {
        this._pieces = pieces;
    }

    update(deltaTime: number): void 
    {
        let index = 0;

        for(let y: number = 1; y < this._numRow -1; ++y)
        {
            const row: Element = this._next.children[y];

            for(let x = 1; x < this._numColumn -1; ++x)
            {              
                if(this._nextsPieces[index] == 1)
                {
                    const cell: Element = this._next.children[y].children[x];                
                    cell.setAttribute(CONST.DATA_STATUS, CONST.DATA_STATUS_BUSY);
                }
              
                index++;              
            }
        }  
    }

    render(): void 
    {
        for(let y: number = 0; y < this._numRow; ++y)
        {
            const row: Element = this._next.children[y];

            for(let x = 0; x < this._numColumn; ++x)
            {
                const cell: Element = this._next.children[y].children[x];                

                if(cell.getAttribute(CONST.DATA_STATUS) === CONST.DATA_STATUS_BUSY)
                    cell.classList.add("busy");
            }
        }
    }
}