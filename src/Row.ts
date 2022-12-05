import Cell from "./Cell";

export default class Row extends HTMLElement
{
   // private readonly _cells: Cell[];

    constructor()
    {    
        super();   
       // this._cells = cells;
        
        const row: HTMLDivElement = document.createElement('div');
        row.className = "row";
       // this._cells.forEach(cell => row.appendChild(cell));
    }
} 
customElements.define("board-row", Row);