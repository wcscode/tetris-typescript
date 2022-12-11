import { Cell, cellStatus } from "./Cell.js";
import ILoop from "./Engine/ILoop.js";
import Row from "./Row.js";

export default class Board implements ILoop
{
    private readonly _board: HTMLElement;   
    private readonly _numColumn: number;
    private readonly _numRow: number;
    private static _busy = [
         0,  1,  2,  7,  8,  9,
        10, 11, 12, 17, 18, 19,
        20, 21, 22, 27, 28, 29,
        30, 31, 32, 37, 38, 39,
    ];

    constructor({boardId, numColumn = 10, numRow = 17} : {boardId: string, numColumn: number, numRow: number}) 
    {
        const board: HTMLElement | null = document.getElementById(boardId);
        
        if(board == null)
            throw new Error('Object board not found');

        this._board = board;
        this._numColumn = numColumn;
        this._numRow = numRow; 
    }

    build(): void 
    {
        for (let y: number = 0; y < this._numRow; ++y) 
        {
            const row = new Row();

            for (let x: number = 0; x < this._numColumn; ++x) 
            {
                const index: number = parseInt(y.toString() + x.toString());
                const cellStatus: cellStatus = Board._busy.some((value => value == index)) ? 'fixed' : 'empty';                
                const cell = new Cell(index, cellStatus);
                
                row.appendChild<Cell>(cell);
            }
            
            this._board.appendChild<Row>(row);
        }
    }

    update(deltaTime: number): void 
    {

    }

    render(): void 
    {
        for(let y: number = 0; y < this._numRow; ++y)
        {
            const row: Element = this._board.children[y];

            for(let x = 0; x < this._numColumn; ++x)
            {
                const cell: Element = this._board.children[y].children[x];                

               // if(cell.getAttribute("data-busy") === "true")
                //    cell.classList.add("busy");
            }
        }
    }
}