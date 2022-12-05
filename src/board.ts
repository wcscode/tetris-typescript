import Cell from "./Cell.js";
import ILoop from "./ILoop.js";
import Row from "./Row.js";

export default class Board implements ILoop
{
    private readonly _board: HTMLElement;   
    private readonly _numColumn: number;
    private readonly _numRow: number;

    constructor(boardId: string, numColumn: number = 10, numRow: number = 17) 
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
                const cell = new Cell(index, false);
                
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

                if(cell.getAttribute("data-busy") === "true")
                    cell.classList.add("busy");
            }
        }
    }
}