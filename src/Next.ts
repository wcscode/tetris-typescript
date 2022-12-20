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
        
        this.setNextPiece();
    }

    private _getRandom(): number
    {
        return Math.floor(Math.random() * this._pieces.length);
    }

    setNextPiece(): void 
    {
        const rnd = this._getRandom();

        this._pieces.forEach( (piece: Piece, index: number) => {
            piece.isNext = index == rnd ? true: false;             
        });
        
        this._nextsPieces = this._pieces[rnd].getPieces();       
    }

    add(pieces: Piece[]): void
    {
        this._pieces = pieces;
    }

    update(deltaTime: number): void 
    {
        let index = 0;

        [1, 2, 3, 4].forEach((y: number) => 
        {        
            const row: Element = this._next.children[y];

            [1, 2, 3, 4].forEach((x: number) => 
            {              
                if(this._nextsPieces[index] == 1)
                {
                    const cell: Element = this._next.children[y].children[x];                
                    cell.setAttribute(CONST.DATA_STATUS, CONST.DATA_STATUS_BUSY);
                }
              
                index++;              
            });
        });  
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