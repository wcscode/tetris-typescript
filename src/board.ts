import { Cell, cellStatus } from "./Cell.js";
import ILoop from "./Engine/ILoop.js";
import Row from "./Row.js";

export default class Board implements ILoop
{
    private readonly _board: HTMLElement; 
    private readonly _boardId: string;  
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
        this._boardId = boardId;

        const board: HTMLElement | null = document.getElementById(boardId);
        
        if(board == null)
            throw new Error('Object board not found');

        this._board = board;
        this._numColumn = numColumn;
        this._numRow = numRow; 
    }

    getNumColumn()
    { 
       return this._numColumn; 
    }

    getNumRow()
    { 
       return this._numRow; 
    }

    getBoard(): HTMLElement
    {
        return this._board;
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
    }

    setCell(x: number, y: number): void
    {
        const index: number = this._numColumn * y + x;
       // console.log(index);

        const cell: HTMLElement | null = document.querySelector<HTMLElement>(`#${this._boardId} [data-id="${index}"]`);

        if(cell == null)
            throw new Error('Cell not found!');

        cell.dataset.status = "busy";       
    }

    getCell(x: number, y: number): Cell
    {
        return new Cell(0);
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

                if(cell.getAttribute("data-busy") === "true")
                    cell.classList.add("busy");
            }
        }
    }
}