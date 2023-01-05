import { Cell } from "./Cell.js";
import ILoop from "./Engine/ILoop.js";
import { Tetromino, ITetromino, LTetromino, OTetromino, STetromino  } from "./Tetromino.js";
import Row from "./Row.js";
import * as CONST from "./const.js";

export default class Next implements ILoop
{
    private readonly _next: HTMLElement; 
    private readonly _nextId: string;  
    private readonly _numColumn: number;
    private readonly _numRow: number; 
    private _nextTetromino: Tetromino;
    private _tetrominos: Tetromino[] = [];  
    private _nextsTetrominos: Array<number> = [];

    constructor({nextId, numColumn = 10, numRow = 17} : {nextId: string, numColumn: number, numRow: number}) 
    {
        this._nextId = nextId;

        const next: HTMLElement | null = document.getElementById(nextId);
        
        if(next == null)
            throw new Error('Object next not found');

        this._next = next;
        this._numColumn = numColumn;
        this._numRow = numRow; 

        this._tetrominos = [
            new ITetromino(),
            new OTetromino(),
            new LTetromino(),
            new STetromino()
        ];

        this._nextTetromino = this._tetrominos[this._getRandom()];
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
    }

    private _getRandom(): number
    {
        return Math.floor(Math.random() * this._tetrominos.length);
    }

    getNextTetromino(): Tetromino
    {
       return this._nextTetromino;
    }

    setNextTetromino(): void
    {
        this._nextTetromino = this._tetrominos[this._getRandom()];
    }

    update(deltaTime: number): void 
    {
        [1, 2, 3, 4].forEach((y: number) => 
        {        
            const row: Element = this._next.children[y];

            [1, 2, 3, 4].forEach((x: number) => 
            {              
                if(this._nextTetromino.getCellStatus(x - 1, y - 1) === 'busy')                
                    Cell.setStatus(this._next, x, y, 'busy');
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